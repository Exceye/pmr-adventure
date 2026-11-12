onerror=(m,s,l)=>{const e=document.getElementById('er');e.style.display='block';e.textContent='Error: '+m+' (baris '+l+')'};
const $=i=>document.getElementById(i),cv=$('c'),g=cv.getContext('2d'),buf=document.createElement('canvas'),b=buf.getContext('2d');
let W,H,D,S,LW,LH;
function rs(){D=devicePixelRatio||1;W=innerWidth;H=innerHeight;cv.width=W*D;cv.height=H*D;S=Math.max(2,Math.round(Math.min(W,H)/190));LW=Math.ceil(W/S);LH=Math.ceil(H/S);buf.width=LW;buf.height=LH}
addEventListener('resize',rs);rs();
/* ---------- helper gambar pixel ---------- */
let X=b;
const B=(c,x,y,w,h)=>{X.fillStyle=c;X.fillRect(x,y,w,h)};
const R=(x,y,w,h)=>({x,y,w,h}),hit=(a,c)=>a.x<c.x+c.w&&a.x+a.w>c.x&&a.y<c.y+c.h&&a.y+a.h>c.y;
function draw(w,h,fn){const c=document.createElement('canvas');c.width=w;c.height=h;const o=X;X=c.getContext('2d');fn();X=o;return c}
const dk=(c,a)=>{const n=parseInt(c.slice(1),16);return'rgb('+[n>>16,n>>8&255,n&255].map(v=>Math.round(v*a)).join()+')'};
const circ=(cx,cy,rx,ry,c)=>{for(let y=-ry;y<=ry;y++){const w=Math.round(rx*Math.sqrt(Math.max(0,1-y*y/(ry*ry+.01))));B(c,cx-w,cy+y,w*2,1)}};
/* ---------- karakter ---------- */
function chr(gd,dir,f,p){return draw(16,24,()=>{
 if(dir==3){X.translate(16,0);X.scale(-1,1)}
 const fm=gd=='f',A=f==1?1:0,Q=f==3?1:0,fl=f==1?-1:f==3?1:0,sh=p.shirt,vs=p.vest,cl=p.cl,hr=p.hair,sk=p.skin,sd=dir==1||dir==3;
 if(sd){B(cl,6+fl,18,3,4);B(cl,8-fl,18,3,4);if(fm)B(cl,4,17,9,5);B('#e8e8ee',6+fl,22,4,2);B('#e8e8ee',8-fl,22,4,2);
  B(sh,5,11,7,7);B(vs,5,12,6,6);if(p.pt){B('#fff',8,13,3,3);B(vs,9,13,1,3);B(vs,8,14,3,1)}
  B(sh,6+fl,12,3,5);B(sk,6+fl,17,3,1);
  B(sk,6,4,7,7);if(fm){B(hr,3,1,10,4);B(hr,3,4,5,9);B(hr,6,3,3,2)}else{B(hr,4,1,9,4);B(hr,4,4,3,5);B(hr,10,3,3,2)}
  B('#1b1b25',10,7,2,2);B('#f0a6a0',9,9,1,1)}
 else{B(cl,4,18,4,4-A);B(cl,8,18,4,4-Q);if(fm)B(cl,3,17,10,5);B('#e8e8ee',4,22-A,4,2);B('#e8e8ee',8,22-Q,4,2);
  B(sh,2,12+Q,2,5);B(sh,12,12+A,2,5);B(sk,2,17+Q,2,1);B(sk,12,17+A,2,1);B(sh,4,11,8,7);B(vs,4,12,8,6);
  if(dir==0){B(sh,6,11,4,2);if(p.pt){B('#fff',9,13,3,3);B(vs,10,13,1,3);B(vs,9,14,3,1)}
   B(sk,4,4,8,7);if(fm){B(hr,3,1,10,4);B(hr,3,4,2,9);B(hr,11,4,2,9);B(hr,3,11,10,2)}else{B(hr,3,1,10,4);B(hr,3,4,1,3);B(hr,12,4,1,3);B(hr,4,4,3,1);B(hr,9,4,3,1)}
   B('#1b1b25',5,7,2,2);B('#1b1b25',9,7,2,2);B('#fff',5,7,1,1);B('#fff',9,7,1,1);B('#f0a6a0',4,9,1,1);B('#f0a6a0',11,9,1,1)}
  else{if(p.pt){B('#fff',5,12,6,5);B(vs,7,13,2,4);B(vs,6,14,4,2)}
   if(fm){B(hr,3,1,10,12)}else{B(hr,3,1,10,9);B(sk,5,10,6,1)}}}})}
const PAL={m:{hair:'#2b1c18',skin:'#f3c99f',shirt:'#f4f4f4',vest:'#c8283a',cl:'#243060',pt:1},f:{hair:'#262f5e',skin:'#f3c99f',shirt:'#f4f4f4',vest:'#c8283a',cl:'#243060',pt:1}};
const SP={};for(const q of'mf')SP[q]=[0,1,2,3].map(d=>[0,1,2,3].map(f=>chr(q,d,f,PAL[q])));
const NPCS=[['Bu Sari','f','#6b3b5a','#e8a9c0','#6a4a7a','#e8b890'],['Pak Budi','m','#2a2a2a','#6fa0d8','#5a4a3a','#d9a373'],['Mbak Rina','f','#2e7d5a','#f2e6a0','#3a5a4a','#f0c8a0'],
 ['Pak Joko','m','#8a8a8a','#8fbf6a','#4a3a2a','#c8956a'],['Nenek Ani','f','#b8b8c8','#c99ad8','#5a4a6a','#e0b088'],['Dik Rafi','m','#4a2a1a','#f0a050','#2a4a8a','#f0c090']]
 .map(n=>({n:n[0],img:chr(n[1],0,0,{hair:n[2],shirt:n[3],vest:n[3],cl:n[4],skin:n[5],pt:0})}));
/* ---------- sprite dunia ---------- */
function houseSpr(rc,wc){return draw(80,72,()=>{
 B('rgba(0,0,0,.25)',6,66,72,5);B('#7a7a84',50,4,8,18);B('#5f5f69',50,4,8,3);
 B(wc,6,32,68,36);B('rgba(0,0,0,.1)',6,56,68,4);B('#8d8d96',6,62,68,6);B('#74747e',6,62,68,1);
 for(let r=0;r<32;r++){const w=Math.round(4+r*2.35);B(r%5==4?dk(rc,.78):rc,40-w/2,2+r,w,1);if(r%5!=4)B(dk(rc,1.12),40-w/2,2+r,Math.min(w,3),1)}
 B(dk(rc,.55),0,33,80,3);B('rgba(0,0,0,.2)',6,36,68,3);
 B('#5b3a22',35,16,10,10);B('#8fd0f0',36,17,8,8);B('#5b3a22',39,17,2,8);
 B('#3a2418',33,43,14,25);B('#7b4a26',34,44,12,24);B('#5b3a22',39,44,2,24);B('#ffd23f',43,56,2,2);
 for(const x of[12,54]){B('#5b3a22',x,40,14,13);B('#8fd0f0',x+1,41,12,11);B('#5b3a22',x+6,41,2,11);B('#5b3a22',x+1,46,12,1);B('#d6f1ff',x+2,42,3,2);B('#7b4a26',x,54,14,4);B('#ff6b8a',x+2,53,2,2);B('#ffd23f',x+6,53,2,2);B('#fff',x+10,53,2,2)}
 B('#9a9aa4',31,66,18,3);B('#fff',37,33,6,6);B('#d62828',39,34,2,4);B('#d62828',38,35,4,2)})}
function mansionSpr(){return draw(224,128,()=>{
 B('rgba(0,0,0,.25)',8,118,212,8);const nv='#2f3d6b';
 B('#e3d9c4',8,56,208,64);B('#ece3d0',64,42,96,78);B('rgba(0,0,0,.08)',8,112,208,8);
 for(const x of[4,144]){B(nv,x,30,76,28);for(let y=34;y<56;y+=4)B('#27345c',x,y,76,1);B('#1f2a50',x,56,76,3)}
 for(let r=0;r<38;r++){const w=Math.round(40+r*2.95);B(r%4==3?'#27345c':'#33427a',112-w/2,4+r,w,1)}
 B('#1f2a50',0,42,224,0);B('#1f2a50',62,42,100,4);B('#7a7a84',24,18,8,14);B('#7a7a84',192,18,8,14);
 B('#fff',107,16,10,10);B('#d62828',110,17,4,8);B('#d62828',108,19,8,4);
 for(const x of[80,104,128]){B('#fff7e8',x,52,16,18);B('#8fd0f0',x+2,54,12,14);B('#fff7e8',x+7,54,2,14)}
 for(const x of[16,40,168,192]){B('#fff7e8',x,70,16,20);B('#8fd0f0',x+2,72,12,16);B('#fff7e8',x+7,72,2,16)}
 for(const x of[76,140]){B('#fff7e8',x,86,16,22);B('#8fd0f0',x+2,88,12,18);B('#fff7e8',x+7,88,2,18)}
 B('#bdb4a0',70,76,84,3);for(let x=72;x<154;x+=5)B('#d8d0be',x,70,2,6);
 B('#cfc7b3',94,78,5,40);B('#cfc7b3',125,78,5,40);
 B('#3a2418',98,86,28,34);B('#7b4a26',100,88,11,32);B('#7b4a26',113,88,11,32);B('#ffd23f',108,104,2,3);B('#ffd23f',114,104,2,3);B('#8fd0f0',102,82,20,4);
 B('#9a9aa4',90,118,44,5);B('#c8283a',103,118,18,10)})}
function treeSpr(){return draw(32,44,()=>{circ(16,41,11,3,'rgba(0,0,0,.25)');B('#6b4423',13,28,6,14);B('#54351b',13,28,2,14);
 circ(16,20,15,16,'#2b7a3a');circ(15,17,12,12,'#349a48');circ(11,12,7,6,'#4fb85a');B('#2b7a3a',20,26,6,2)})}
function pineSpr(){return draw(24,40,()=>{circ(12,37,8,2,'rgba(0,0,0,.25)');B('#6b4423',10,30,4,8);
 for(let i=0;i<3;i++){const y=4+i*9,w=7+i*3;for(let r=0;r<14;r++){const ww=Math.round(2+r*(w-2)/13);B(r%4==3?'#1f5e2e':'#2b7a3a',12-ww,y+r,ww*2,1)}}})}
function fountainSpr(){return draw(32,34,()=>{circ(16,28,15,5,'rgba(0,0,0,.2)');circ(16,24,15,7,'#9a9aa4');circ(16,23,13,6,'#c8c8d0');circ(16,23,11,5,'#3a9be0');circ(14,22,5,2,'#8fd4f5');
 B('#9a9aa4',14,10,4,12);circ(16,10,6,2,'#c8c8d0');circ(16,9,4,1,'#6cc0f0');B('#8fd4f5',15,2,2,8);B('#8fd4f5',11,6,1,5);B('#8fd4f5',20,6,1,5)})}
function wellSpr(){return draw(24,28,()=>{circ(12,25,10,3,'rgba(0,0,0,.2)');B('#8d8d96',3,14,18,11);B('#6e6e78',3,14,18,2);B('#3a8fd1',5,16,14,3);
 B('#6b4423',3,4,2,12);B('#6b4423',19,4,2,12);B('#c8452f',1,0,22,5);B('#a8321f',1,4,22,2)})}
function lampSpr(){return draw(8,28,()=>{B('#3a3a44',3,10,2,17);B('#3a3a44',1,26,6,2);B('#3a3a44',0,2,8,2);B('#ffd23f',1,4,6,7);B('#fff3a0',3,5,2,4)})}
function bushSpr(){return draw(18,12,()=>{circ(9,6,8,5,'#2b7a3a');circ(8,5,6,4,'#3c9a48');B('#ff6b8a',4,3,2,2);B('#fff',11,5,2,2)})}
