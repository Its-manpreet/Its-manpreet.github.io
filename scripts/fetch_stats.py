#!/usr/bin/env python3
"""Print live.json for the portfolio.

Sources, both public:
  * Hackatime  https://hackatime.hackclub.com/api/v1/users/MSDhaliwal
  * GitHub     api.github.com, user Its-manpreet

Run locally:   python3 scripts/fetch_stats.py
In Actions:    GITHUB_TOKEN is set automatically and lifts the rate limit.

Writes data/live.json. Nothing here needs a secret to run by hand.
"""

from __future__ import annotations

import json
import os
import sys
import urllib.error
import urllib.request
from datetime import datetime, timedelta, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "data" / "live.json"

GH_USER = "Its-manpreet"
HACKATIME_USER = "MSDhaliwal"
UA = "dhaliwal-portfolio/1.0 (+https://msdhaliwal.in)"
WEEKS = 52


def get(url: str, token: str | None = None, timeout: int = 30):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/vnd.github+json"})
    if token:
        req.add_header("Authorization", f"Bearer {token}")
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return json.load(r)


def iso_week_start(d: datetime) -> datetime:
    d = d.astimezone(timezone.utc)
    monday = d - timedelta(days=d.weekday())
    return monday.replace(hour=0, minute=0, second=0, microsecond=0)


def hackatime() -> dict:
    base = f"https://hackatime.hackclub.com/api/v1/users/{HACKATIME_USER}"
    out: dict = {"username": HACKATIME_USER}

    all_time = get(f"{base}/stats")
    d = all_time.get("data", {})
    out["total_seconds"] = int(d.get("total_seconds") or 0)
    langs = d.get("languages") or []
    # "Other" is a bucket, not a language; keep it but never let it be the headline
    real = [l for l in langs if l.get("name") not in ("Other", "Ignore List")]
    real.sort(key=lambda l: l.get("total_seconds") or 0, reverse=True)
    out["languages"] = [
        {"name": l.get("name"), "seconds": int(l.get("total_seconds") or 0)} for l in real[:10]
    ]
    if out["languages"]:
        out["top_language"] = out["languages"][0]["name"]
        out["top_language_seconds"] = out["languages"][0]["seconds"]

    week_start = (datetime.now(timezone.utc) - timedelta(days=7)).strftime("%Y-%m-%d")
    week = get(f"{base}/stats?start_date={week_start}")
    out["week_seconds"] = int((week.get("data") or {}).get("total_seconds") or 0)

    # per-project totals, last 30 days (used nowhere loud, useful in json)
    try:
        projects = get(f"{base}/projects").get("projects") or []
        out["project_count"] = len(projects)
    except urllib.error.HTTPError:
        pass

    # daily buckets from heartbeat spans — the plot is day-by-day, because that
    # is the shape the tracker actually has
    since_d = datetime.now(timezone.utc) - timedelta(days=130)
    spans = get(f"{base}/heartbeats/spans?start_date={since_d.strftime('%Y-%m-%d')}").get("spans") or []
    daily: dict[str, float] = {}
    for s in spans:
        try:
            start = datetime.fromtimestamp(float(s["start_time"]), timezone.utc)
            dur = float(s.get("duration") or 0)
        except (KeyError, TypeError, ValueError):
            continue
        if dur <= 0:
            continue
        key = start.strftime("%Y-%m-%d")
        daily[key] = daily.get(key, 0.0) + dur

    today = datetime.now(timezone.utc)
    first_day = min((datetime.strptime(k, "%Y-%m-%d").replace(tzinfo=timezone.utc) for k in daily), default=today)
    # start a few days before the first heartbeat so the history has an edge
    cursor = max(since_d, first_day - timedelta(days=2)).replace(hour=0, minute=0, second=0, microsecond=0)
    days = []
    while cursor.date() <= today.date():
        key = cursor.strftime("%Y-%m-%d")
        days.append({"date": key, "seconds": int(round(daily.get(key, 0)))})
        cursor += timedelta(days=1)
    out["days"] = days

    return out


def github(token: str | None) -> dict:
    out: dict = {"username": GH_USER}
    user = get(f"https://api.github.com/users/{GH_USER}", token)
    out["public_repos"] = user.get("public_repos")
    out["followers"] = user.get("followers")

    repos = get(f"https://api.github.com/users/{GH_USER}/repos?per_page=100&sort=pushed", token)
    repos = [r for r in repos if not r.get("fork")]
    out["stars"] = sum(r.get("stargazers_count", 0) for r in repos)
    out["repos_tracked"] = len(repos)

    since = (datetime.now(timezone.utc) - timedelta(days=30)).strftime("%Y-%m-%dT%H:%M:%SZ")
    commits_30 = 0
    recent = []
    for r in repos:
        name = r["name"]
        try:
            cs = get(
                f"https://api.github.com/repos/{GH_USER}/{name}/commits"
                f"?author={GH_USER}&since={since}&per_page=100",
                token,
            )
        except urllib.error.HTTPError:
            continue
        if isinstance(cs, list):
            commits_30 += len(cs)
            for c in cs[:3]:
                commit = c.get("commit", {})
                recent.append(
                    {
                        "repo": name,
                        "message": (commit.get("message") or "").split("\n")[0][:110],
                        "date": (commit.get("author") or {}).get("date") or "",
                        "url": c.get("html_url") or "",
                    }
                )
    recent.sort(key=lambda c: c["date"], reverse=True)
    out["commits_30d"] = commits_30
    out["recent_commits"] = recent[:8]
    return out


def main() -> int:
    token = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN")
    data = {"generated_at": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")}
    problems = []
    for name, fn in (("hackatime", hackatime), ("github", lambda: github(token))):
        try:
            data[name] = fn()
        except Exception as exc:  # keep the last good section rather than nuking the file
            problems.append(f"{name}: {exc}")
            if OUT.exists():
                try:
                    old = json.loads(OUT.read_text())
                    if name in old:
                        data[name] = old[name]
                except json.JSONDecodeError:
                    pass
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(data, indent=2) + "\n")
    print(f"wrote {OUT} ({OUT.stat().st_size} bytes)")
    for p in problems:
        print("warn:", p, file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
