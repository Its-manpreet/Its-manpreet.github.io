
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const rm=matchMedia('(prefers-reduced-motion:reduce)').matches,fine=matchMedia('(pointer:fine)').matches;
const CH=[{bg:'#05060d',ac:'#d7ff3f',sh:0,sd:1,n:'Hello'},{bg:'#150a04',ac:'#ffb347',sh:1,sd:-1,n:'Quoter'},{bg:'#04111d',ac:'#5cc8ff',sh:2,sd:1,n:'CloudKeep'},{bg:'#12071d',ac:'#c58bff',sh:3,sd:-1,n:'Discord Bridge'},{bg:'#1a0812',ac:'#ff7a9c',sh:4,sd:1,n:'Also built'},{bg:'#04140d',ac:'#7dffb2',sh:5,sd:-1,n:'Now'},{bg:'#05060d',ac:'#d7ff3f',sh:6,sd:1,n:'Contact'}];
$('.name').innerHTML=[...'Dhaliwal'].map(c=>`<span><i>${c}</i></span>`).join('');
$('#cp').onclick=async e=>{const b=e.target;try{await navigator.clipboard.writeText('manpreetdhaliwal1482008@gmail.com');b.textContent='Copied'}catch(x){b.textContent='Select the email'}setTimeout(()=>b.textContent='Copy',1800)};

/* live numbers: fetches data/live.json when hosted, otherwise shows the snapshot from 13 Nov 2026 */
const SNAP={"generated_at":"2026-11-13T14:11:41Z","hackatime":{"total_seconds":99678,"week_seconds":9868,"top_language":"JavaScript","days":[{"date":"2026-10-05","seconds":0},{"date":"2026-10-06","seconds":0},{"date":"2026-10-07","seconds":120},{"date":"2026-10-08","seconds":2901},{"date":"2026-10-09","seconds":8042},{"date":"2026-10-10","seconds":1045},{"date":"2026-10-11","seconds":120},{"date":"2026-10-12","seconds":3530},{"date":"2026-10-13","seconds":240},{"date":"2026-10-14","seconds":1205},{"date":"2026-10-15","seconds":0},{"date":"2026-10-16","seconds":0},{"date":"2026-10-17","seconds":8787},{"date":"2026-10-18","seconds":12755},{"date":"2026-10-19","seconds":6360},{"date":"2026-10-20","seconds":8961},{"date":"2026-10-21","seconds":2665},{"date":"2026-10-22","seconds":4385},{"date":"2026-10-23","seconds":9090},{"date":"2026-10-24","seconds":5438},{"date":"2026-10-25","seconds":6689},{"date":"2026-10-26","seconds":0},{"date":"2026-10-27","seconds":1314},{"date":"2026-10-28","seconds":487},{"date":"2026-10-29","seconds":486},{"date":"2026-10-30","seconds":2447},{"date":"2026-10-31","seconds":326},{"date":"2026-11-01","seconds":488},{"date":"2026-11-02","seconds":0},{"date":"2026-11-03","seconds":833},{"date":"2026-11-04","seconds":1100},{"date":"2026-11-05","seconds":0},{"date":"2026-11-06","seconds":0},{"date":"2026-11-07","seconds":0},{"date":"2026-11-08","seconds":0},{"date":"2026-11-09","seconds":274},{"date":"2026-11-10","seconds":6773},{"date":"2026-11-11","seconds":1705},{"date":"2026-11-12","seconds":991},{"date":"2026-11-13","seconds":124}]},"github":{"commits_30d":12,"recent_commits":[{"repo":"Discord-portal-bot","message":"Added report command, fixed some bugs","date":"2026-10-25T18:33:11Z","url":"https://github.com/Its-manpreet/Discord-portal-bot/commit/6ef585e73b993d4609545c6911fa9473104b16d3"},{"repo":"Discord-portal-bot","message":"fixed some bugs, made minor imporvements, started working on a moderation system","date":"2026-10-25T14:06:52Z","url":"https://github.com/Its-manpreet/Discord-portal-bot/commit/f8783a35c1b4da7ee6669695bb0216f2d275aaff"},{"repo":"Discord-portal-bot","message":"Added help command, made small readme, made random linking functional","date":"2026-10-24T09:50:50Z","url":"https://github.com/Its-manpreet/Discord-portal-bot/commit/268908b1a8eb3de2b84034df25d69373028ac46f"},{"repo":"terminalchat","message":"did some stuff","date":"2026-10-19T15:14:27Z","url":"https://github.com/Its-manpreet/terminalchat/commit/f4877e9af1a7fdfd8ac5a5cd317ca19dfd4b40d2"}],"public_repos":10}};
const hm=s=>{const m=Math.round(s/60);return m>=60?Math.floor(m/60)+'h '+String(m%60).padStart(2,'0')+'m':m+'m'};
function applyLive(d){const h=d.hackatime||{},g=d.github||{};
 $('#sw').textContent=hm(h.week_seconds||0);$('#sa').textContent=hm(h.total_seconds||0);$('#sl').textContent=h.top_language||'—';
 if(typeof g.commits_30d==='number')$('#sc').textContent=g.commits_30d;
 const lr=$('#lastrepo');
 if(lr){const c=(g.recent_commits||[])[0];
  lr.innerHTML=c?`Last commit: <b style="color:var(--tx);font-weight:500">${c.repo}</b> · ${new Date(c.date).toLocaleDateString('en-GB',{day:'numeric',month:'short'})}`
                :`<span style="opacity:.6">Reading GitHub…</span>`}
 $('#upd').textContent='Updated '+new Date(d.generated_at).toLocaleDateString('en-GB',{day:'numeric',month:'short'});
 const days=(h.days||[]).slice(-40),mx=Math.max(...days.map(x=>x.seconds),1);
 $('#bars').innerHTML=days.map(x=>`<i class="bar" data-cur="${new Date(x.date).toLocaleDateString('en-GB',{day:'numeric',month:'short'})} · ${hm(x.seconds)}" style="height:${Math.max(4,x.seconds/mx*100)}%"></i>`).join('')}
applyLive(SNAP);fetch('data/live.json').then(r=>r.json()).then(applyLive).catch(()=>{});

/* the guide: a calm line that hugs the text and thins out ahead of you, as if heading into the screen */
const pcv=$('#pcv'),pcx=pcv.getContext('2d'),dot=$('#dot'),STEP=4,TR=120,AH=190;
let pts=[],W=0,H=0,dpr=1,anchors=[[0,0],[1,1]],mi=[],idxT=0,idxF=0,accol='#d7ff3f',fr=0,prog=0;

function route(){W=innerWidth;H=innerHeight;dpr=Math.min(devicePixelRatio||1,2);pcv.width=W*dpr;pcv.height=H*dpr;
 const mob=W<=900,band=W*.5,els=$$('.ch .tx');
 /* the guide always lives in the gutter: text ends at 46vw on the left and starts at 54vw on
    the right, so ~50vw is empty in every chapter. It only breathes a few pixels around it. */
 const X=els.map((t,i)=>mob?W*.92:band+(i%2?-W*.055:W*.055));
 /* the line is a journey map drawn inside one viewport: it enters top-right, settles into the
    gutter, then descends through every chapter and leaves at the bottom. x stays in the gutter
    so it never crosses a text column. */
 const nn=CH.length,y0=.30*H,stepY=(.80-.30)*H/(nn-1);
 const P=[[W*.88,.20*H]];
 X.forEach((x,i)=>{const y=y0+i*stepY;
   if(i){/* between chapters the line swings out into the empty half: visible travel, still clear of text */
     const out=W*(i%2?.60:.40);P.push([out,y0+(i-.5)*stepY])}
   P.push([x,y])});
 P.push([band,.9*H]);
 const raw=[];for(let i=0;i<P.length-1;i++){const p0=P[i-1]||P[i],p1=P[i],p2=P[i+1],p3=P[i+2]||p2,
  c1=[p1[0]+(p2[0]-p0[0])/6,p1[1]+(p2[1]-p0[1])/6],c2=[p2[0]-(p3[0]-p1[0])/6,p2[1]-(p3[1]-p1[1])/6];
  for(let k=i?1:0;k<=24;k++){const t=k/24,u=1-t;raw.push([u*u*u*p1[0]+3*u*u*t*c1[0]+3*u*t*t*c2[0]+t*t*t*p2[0],u*u*u*p1[1]+3*u*u*t*c1[1]+3*u*t*t*c2[1]+t*t*t*p2[1]])}}
 const cum=[0];for(let i=1;i<raw.length;i++)cum[i]=cum[i-1]+Math.hypot(raw[i][0]-raw[i-1][0],raw[i][1]-raw[i-1][1]);
 const n=Math.floor(cum[cum.length-1]/STEP);pts=[];let j=0;for(let k=0;k<=n;k++){const s=k*STEP;while(j<raw.length-2&&cum[j+1]<s)j++;const f=(s-cum[j])/((cum[j+1]-cum[j])||1);pts.push([raw[j][0]+(raw[j+1][0]-raw[j][0])*f,raw[j][1]+(raw[j+1][1]-raw[j][1])*f])}
 const mx=document.documentElement.scrollHeight-H;mi=X.map((x,i)=>{const yy=y0+i*stepY;let b=0,bd=1e9;pts.forEach((p,k)=>{const d=Math.hypot(p[0]-x,p[1]-yy);if(d<bd){bd=d;b=k}});return b});
 anchors=[[0,0]];$$('.ch').forEach((c,i)=>anchors.push([Math.min(.999,Math.max(.001,(c.offsetTop+c.offsetHeight/2-H/2)/mx)),mi[i]]));anchors.push([1,pts.length-1]);
 anchors.sort((a,b)=>a[0]-b[0]);setP(prog)}
function setP(p){prog=p;let a=anchors[0],b=anchors[anchors.length-1];for(let i=0;i<anchors.length-1;i++)if(p>=anchors[i][0]&&p<=anchors[i+1][0]){a=anchors[i];b=anchors[i+1];break}
 idxT=a[1]+(b[1]-a[1])*((p-a[0])/((b[0]-a[0])||1))}
function draw(){if(pts.length<4)return;if(++fr%8==0)accol=getComputedStyle(document.documentElement).getPropertyValue('--ac').trim()||accol;
 if(!isFinite(idxF)||!isFinite(idxT)){idxF=idxT=0}
 idxF+=(idxT-idxF)*.16;const c=pcx,n=pts.length-1,id=Math.min(n-1,Math.max(1,Math.round(idxF)||1));c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,W,H);c.lineCap='round';c.strokeStyle=c.fillStyle=accol;
 for(let k=Math.max(1,id-TR);k<=id;k++){const t=(k-(id-TR))/TR;c.globalAlpha=t*t*.95;c.lineWidth=.5+t*2.6;c.beginPath();c.moveTo(pts[k-1][0],pts[k-1][1]);c.lineTo(pts[k][0],pts[k][1]);c.stroke()}
 for(let k=id+6,stp=4;k<=Math.min(n,id+AH);k+=stp,stp*=1.05){const j2=Math.floor(k),t=(k-id)/AH;c.globalAlpha=(1-t)*(1-t)*.8;c.beginPath();c.arc(pts[j2][0],pts[j2][1],2.4*(1-t)+.3,0,7);c.fill()}
 c.globalAlpha=1;const p=pts[id],q=pts[Math.min(n,id+2)],r=pts[Math.max(0,id-2)];dot.style.transform=`translate3d(${p[0]}px,${p[1]}px,0) rotate(${Math.atan2(q[1]-r[1],q[0]-r[0])}rad)`;
 /* the dot names the chapter it is standing in */
 let bn=0,bd=1e9;mi.forEach((m,i)=>{const d=Math.abs(m-idxF);if(d<bd){bd=d;bn=i}});
 const near=Math.max(0,1-bd/26),tg2=$('#ptag');tg2.textContent=CH[bn].n;tg2.style.opacity=near.toFixed(2);
 tg2.style.transform=`translate3d(${p[0]+26}px,${p[1]-26}px,0) scale(${(.86+near*.14).toFixed(2)})`}
let lenis,shape=0,side=1,acHex=CH[0].ac,vel=0;
function setCh(i){const c=CH[i];shape=c.sh;side=c.sd;acHex=c.ac;gsap.to(document.body,{backgroundColor:c.bg,duration:1.4});gsap.to(document.documentElement,{'--ac':c.ac,duration:1.2})}
addEventListener('resize',()=>{route();window.ScrollTrigger&&ScrollTrigger.refresh()});
if(rm||!window.gsap){route();dot.hidden=true;$('#cur').remove();$('#ptag').style.opacity=1}
else{
 gsap.registerPlugin(ScrollTrigger,Draggable);
 if(fine&&window.Lenis){lenis=new Lenis({lerp:.085});lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(t=>lenis.raf(t*1000));gsap.ticker.lagSmoothing(0)}
 addEventListener('load',()=>{route();document.fonts&&document.fonts.ready.then(route);ScrollTrigger.refresh();startSky()});
 gsap.ticker.add(draw);
 ScrollTrigger.create({start:0,end:'max',onUpdate:s=>{setP(s.progress);const pb=document.getElementById('prog');if(pb)pb.style.width=(s.progress*100).toFixed(2)+'%'}});
 /* name: letters rise in, then lean toward the pointer with a falloff; the mask is dropped after the intro so nothing clips */
 const sp=$$('.name span'),it=sp.map(s=>$('i',s)),sv=it.map(()=>0);let nx=-999,ny=-999,intro=false;
 gsap.from(it,{yPercent:110,duration:1.4,ease:'expo.out',stagger:.06,delay:.2,onComplete(){intro=true;sp.forEach(s=>s.style.overflow='visible')}});
 addEventListener('mousemove',e=>{nx=e.clientX;ny=e.clientY});document.addEventListener('mouseleave',()=>{nx=ny=-999});
 gsap.ticker.add(()=>{if(!intro)return;it.forEach((el,k)=>{
  const R=330,r=sp[k].getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2,d=Math.hypot(nx-cx,(ny-cy)*.9),t=Math.max(0,1-d/R);
  const was=sv[k];sv[k]+=(t-sv[k])*.09;if(sv[k]<.0015&&was<.0015){gsap.set(el,{clearProps:'transform,color'});return}
  const v=sv[k],dx=Math.max(-1,Math.min(1,(nx-cx)/R)),dy=Math.max(-1,Math.min(1,(ny-cy)/R));
  /* linear falloff: right under the pointer it leans hard, far away it hardly moves, and it eases home */
  /* colour only bites close in; neighbours just lean, so the word stays white overall */
  const cv2=Math.max(0,(v-.4)/.6);
  gsap.set(el,{skewX:damp(-dx*30*v),skewY:dy*17*v,rotate:dx*5*v,yPercent:dy*7*v,
   scaleY:1+(Math.abs(dx)*.1+.06*Math.abs(dy))*v,
   color:gsap.utils.interpolate('#efeee9',acHex,Math.min(1,cv2*1.2))})})});
 const damp=v=>Math.max(-16,Math.min(16,v));
 $$('.ch').forEach((c,i)=>{
  ScrollTrigger.create({trigger:c,start:'top 55%',end:'bottom 55%',onToggle:s=>s.isActive&&setCh(i)});
  gsap.fromTo($('.gh',c),{yPercent:30,xPercent:i%2?-10:10},{yPercent:-30,xPercent:i%2?10:-10,ease:'none',scrollTrigger:{trigger:c,start:'top bottom',end:'bottom top',scrub:true}});
  gsap.fromTo($('.tx',c),{yPercent:6},{yPercent:-6,ease:'none',scrollTrigger:{trigger:c,start:'top bottom',end:'bottom top',scrub:true}});
  $$('.rv',c).forEach((e,k)=>gsap.from(e,{y:40,opacity:0,duration:1.1,ease:'expo.out',delay:k*.06,scrollTrigger:{trigger:c,start:'top 60%',once:true}}))});
 Draggable.create('.chip',{type:'x,y',bounds:'#c0',
  onPress(){this._t=performance.now();this._px=this.x;this._py=this.y;this._vx=this._vy=0;gsap.killTweensOf(this.target);gsap.to(this.target,{scale:1.1,zIndex:9,duration:.2})},
  onDrag(){const n=performance.now(),dt=Math.max(16,n-this._t);this._vx=(this.x-this._px)/dt*1000;this._vy=(this.y-this._py)/dt*1000;this._px=this.x;this._py=this.y;this._t=n},
  onRelease(){const d=this,stale=performance.now()-this._t>90,vx=stale?0:this._vx,vy=stale?0:this._vy;gsap.to(this.target,{scale:1,duration:.4,ease:'expo.out'});
   if(Math.abs(vx)+Math.abs(vy)>80)gsap.to(this.target,{x:this.x+vx*.4,y:this.y+vy*.4,duration:1.1,ease:'power3.out',onUpdate:()=>d.update(true)})}});
 setCh(0);
 if(fine){document.documentElement.classList.add('cx');
  const cu=$('#cur'),ar=$('svg',cu),lb=$('.lb',cu),qx=gsap.quickTo(cu,'x',{duration:.14,ease:'power3.out'}),qy=gsap.quickTo(cu,'y',{duration:.14,ease:'power3.out'});
  let ang=-.785,tg=-.785,ax=0,ay=0,hov=false,last=0;gsap.set(cu,{x:-100,y:-100});
  addEventListener('mousemove',e=>{qx(e.clientX);qy(e.clientY);if(Math.hypot(e.clientX-ax,e.clientY-ay)>10){tg=Math.atan2(e.clientY-ay,e.clientX-ax);ax=e.clientX;ay=e.clientY;last=performance.now()}});
  document.addEventListener('mouseover',e=>{const t=e.target.closest('a,button,.chip,.mk,.bar');hov=!!t;cu.classList.toggle('h',hov);if(t)lb.textContent=t.dataset.cur||(t.matches('button')?'Copy':'Open')});
  addEventListener('mousedown',()=>cu.classList.add('dn'));addEventListener('mouseup',()=>cu.classList.remove('dn'));
  gsap.ticker.add(()=>{const to=(hov||performance.now()-last>700)?-.785:tg;let d=((to-ang+Math.PI*3)%(Math.PI*2))-Math.PI;ang+=d*.2;ar.style.rotate=ang+'rad'})}
 else $('#cur').remove();
}

/* sky: stars fly past with scroll; a point-mesh morphs per chapter */
function startSky(){
 const cv=$('#cv');
 /* probe on a throwaway canvas: taking a context on #cv would lock it to one type and
    make three's WebGLRenderer fail with "existing context of a different type" */
 try{const probe=document.createElement('canvas');
   if(!(probe.getContext('webgl2')||probe.getContext('webgl'))){document.documentElement.classList.add('nosky');return}}catch(e){document.documentElement.classList.add('nosky');return}
 const loadThree=()=>import('./assets/vendor/three.module.min.js')
  .catch(()=>import('https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.min.js'));
 loadThree().then(T=>{const N=160,R=1.45,S=[[],[],[],[],[],[],[]],h=i=>{const x=Math.sin(i*12.9898)*43758.5453;return x-Math.floor(x)};
  const nm=(a,R)=>{let c=[0,0,0];for(let i=0;i<a.length;i++)c[i%3]+=a[i];c=c.map(v=>v/(a.length/3));let m=0;for(let i=0;i<a.length;i+=3){for(let k=0;k<3;k++)a[i+k]-=c[k];m=Math.max(m,Math.hypot(a[i],a[i+1],a[i+2]))}for(let i=0;i<a.length;i++)a[i]*=R/m};
  for(let i=0;i<N;i++){const t=i/N*Math.PI*2,r=2+Math.cos(3*t);S[0].push(r*Math.cos(2*t),r*Math.sin(2*t),Math.sin(3*t)*1.4)}
  for(let c=0;c<40;c++)for(let r=0;r<4;r++){const u=c/40*Math.PI*2,v=(r/3-.5)*1.2,k=1+v*Math.cos(u/2);S[1].push(k*Math.cos(u),k*Math.sin(u),v*Math.sin(u/2)*1.3)}
  for(let r=0;r<5;r++)for(let j=0;j<32;j++){const a=j/32*Math.PI*2,rr=.95-r*.06;S[2].push(Math.cos(a)*rr,.8-r*.4,Math.sin(a)*rr)}
  for(let i=0;i<80;i++){const t=i/80*Math.PI*2;S[3].push(-.5+Math.cos(t)*.85,Math.sin(t)*.85,0)}
  for(let i=0;i<80;i++){const t=i/80*Math.PI*2;S[3].push(.5+Math.cos(t)*.85,0,Math.sin(t)*.85)}
  for(let x=0;x<5;x++)for(let y=0;y<8;y++)for(let z=0;z<4;z++)S[4].push((x-2)*.5+(h(x*32+y*4+z)-.5)*.08,(y-3.5)*.35,(z-1.5)*.5);
  for(let i=0;i<80;i++){const t=i/80*Math.PI*4,y=(i/80-.5)*3.2;S[5].push(Math.cos(t)*.6,y,Math.sin(t)*.6)}
  for(let i=0;i<80;i++){const t=i/80*Math.PI*4+Math.PI,y=(i/80-.5)*3.2;S[5].push(Math.cos(t)*.6,y,Math.sin(t)*.6)}
  /* final chapter: an orrery - three tilted rings of dust around a small core, read instantly */
  [[.55,0,54],[.95,.52,53],[1.35,-.42,53]].forEach(([rad,tilt,cnt])=>{
    for(let i=0;i<cnt;i++){const a=i/cnt*Math.PI*2,cz=Math.cos(tilt),sz=Math.sin(tilt),
      x=Math.cos(a)*rad, z=Math.sin(a)*rad;
      S[6].push(x, z*sz + (h(i+rad*97)-.5)*.03, z*cz)}});
  for(let i=0;i<6;i++){const a=h(i+11)*6.283,r=h(i+22)*.1;S[6].push(Math.cos(a)*r,(h(i+33)-.5)*.05,Math.sin(a)*r)}
  S.forEach((a,i)=>nm(a,i==6?1.75:R));
  /* link threshold per shape, measured: ~1.75x the median nearest-neighbour spacing */
  const TH=S.map(a=>{const nn=a.length/3,ds=[];for(let i=0;i<Math.min(nn,50);i++){let m=1e9;
    for(let j=0;j<nn;j++){if(i===j)continue;const dx=a[i*3]-a[j*3],dy=a[i*3+1]-a[j*3+1],dz=a[i*3+2]-a[j*3+2],d=dx*dx+dy*dy+dz*dz;if(d<m)m=d}
    ds.push(m)}ds.sort((x,y)=>x-y);const med=ds[ds.length>>1]||.01;return Math.pow(Math.sqrt(med)*1.45,2)});
  /* the galaxy is drawn as two arm chains rather than a neighbour mesh: dust follows the arms */
  const GALP=[];[[0,54],[54,107],[107,160]].forEach(([a,b])=>{for(let i=a;i<b-1;i++)GALP.push([i,i+1]);GALP.push([b-1,a])});
  const rd=new T.WebGLRenderer({canvas:cv,alpha:true,antialias:true});rd.setPixelRatio(Math.min(devicePixelRatio,1.75));
  const sc=new T.Scene(),cam=new T.PerspectiveCamera(60,1,.1,100);sc.add(cam);
  const tc=document.createElement('canvas');tc.width=tc.height=64;const x2=tc.getContext('2d');x2.beginPath();x2.arc(32,32,30,0,7);x2.fillStyle='#fff';x2.fill();const tex=new T.CanvasTexture(tc);
  const mkStars=(n,size,op)=>{const A=new Float32Array(n*3);for(let i=0;i<n;i++){A[i*3]=(Math.random()-.5)*60;A[i*3+1]=(Math.random()-.5)*36;A[i*3+2]=-Math.random()*80}
   const g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(A,3));const m=new T.PointsMaterial({color:0xffffff,size,map:tex,alphaTest:.3,transparent:true,opacity:op});const p=new T.Points(g,m);p.frustumCulled=false;sc.add(p);return{A,g,m}};
  const far=mkStars(1500,.09,.85),hue=mkStars(120,.18,1);
  const g=new T.Group();cam.add(g);g.position.z=-7;
  const P=new Float32Array(S[0]),MAX=900,L2=new Float32Array(MAX*6),acT=new T.Color();let th=.2;
  const pg=new T.BufferGeometry();pg.setAttribute('position',new T.BufferAttribute(P,3));const lg=new T.BufferGeometry();lg.setAttribute('position',new T.BufferAttribute(L2,3));
  const pts2=new T.Points(pg,new T.PointsMaterial({color:0xffffff,size:.085,map:tex,alphaTest:.3,transparent:true})),ln=new T.LineSegments(lg,new T.LineBasicMaterial({color:0xffffff,transparent:true,opacity:.5}));pts2.frustumCulled=ln.frustumCulled=false;
  g.add(pts2,ln);
  let mx=0,my=0,ly=scrollY,vw=10;addEventListener('mousemove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
  const rs=()=>{const w=innerWidth,hh=innerHeight;rd.setSize(w,hh,false);cam.aspect=w/hh;cam.updateProjectionMatrix();vw=2*Math.tan(Math.PI/6)*7*cam.aspect};addEventListener('resize',rs);rs();
  const step=(o,v)=>{for(let i=0;i<o.A.length;i+=3){o.A[i+2]+=v;if(o.A[i+2]>2)o.A[i+2]-=82}o.g.attributes.position.needsUpdate=true};
  const loop=t=>{requestAnimationFrame(loop);const d=Math.min(Math.abs(scrollY-ly),70);ly=scrollY;vel+=(d-vel)*.1;const v=.02+vel*.012;
   step(far,v);step(hue,v*1.3);acT.set(acHex);ln.material.color.lerp(acT,.05);hue.m.color.lerp(acT,.05);
   const tg=S[shape],mob=innerWidth<=900,b=Math.sin(t*.001)*.02;th+=(TH[shape]-th)*.05;
   for(let i=0;i<N*3;i++)P[i]+=(tg[i]*(1+b)-P[i])*.05;
   const wantLines=shape!==6?1:0;ln.material.opacity+=((wantLines?.5:.6)-ln.material.opacity)*.05;
   let k=0;if(shape===6){for(const [i,j] of GALP){if(k>=MAX)break;const o=k*6;L2[o]=P[i*3];L2[o+1]=P[i*3+1];L2[o+2]=P[i*3+2];L2[o+3]=P[j*3];L2[o+4]=P[j*3+1];L2[o+5]=P[j*3+2];k++}}
   else for(let i=0;i<N&&k<MAX;i++)for(let j=i+1;j<N&&k<MAX;j++){const dx=P[i*3]-P[j*3],dy=P[i*3+1]-P[j*3+1],dz=P[i*3+2]-P[j*3+2];if(dx*dx+dy*dy+dz*dz<th){const o=k*6;L2[o]=P[i*3];L2[o+1]=P[i*3+1];L2[o+2]=P[i*3+2];L2[o+3]=P[j*3];L2[o+4]=P[j*3+1];L2[o+5]=P[j*3+2];k++}}
   lg.setDrawRange(0,k*2);lg.attributes.position.needsUpdate=pg.attributes.position.needsUpdate=true;
   const tx=mob?0:side*vw*.30,ty=mob?vw*.2:0,sc2=mob?.7:1.05;g.position.x+=(tx-g.position.x)*.08;g.position.y+=(ty-g.position.y)*.08;g.scale.setScalar(sc2);
   const tilt=shape==6?.62:.35+Math.sin(t*.0004)*.15;g.rotation.x+=(tilt-g.rotation.x)*.04;
   g.rotation.y+=(shape==6?.0025:.004)+vel*.004;cam.rotation.y+=(-mx*.12-cam.rotation.y)*.04;cam.rotation.x+=(-my*.08-cam.rotation.x)*.04;rd.render(sc,cam)};
  requestAnimationFrame(loop)}).catch(err=>{console.warn('[sky] three.js did not load — using the CSS starfield instead.',err);document.documentElement.classList.add('nosky')})}
