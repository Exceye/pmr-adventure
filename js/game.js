/* ---------- game ---------- */
const P={x:384,y:300,d:0,st:0};
let sc=OUT,gender='m',keys={},joy={x:0,y:0},dlg=false,cool=0,opened=false,playing=false,near=null,fa=0,pend=null,last=0;
const rooms=[],fb=(x,y)=>R(x-5,y-6,10,6);
function setScene(id,x,y){sc=id==='out'?OUT:(rooms[id]=rooms[id]||(id==6?mansionRoom():houseRoom(id)));
 if(x==null){x=sc.spawn[0];y=sc.spawn[1]}P.x=x;P.y=y;cool=30;
 $('loc').textContent=id==='out'?'📍 Kampung Harapan':id==6?'📍 Mansion Pusat':'📍 Rumah '+(id+1)+' · '+NPCS[id].n}
function mv(dx,dy){const bx=sc.bx;let nx=P.x+dx;if(nx>bx[0]&&nx<bx[1]&&!sc.solids.some(r=>hit(fb(nx,P.y),r)))P.x=nx;
 let ny=P.y+dy;if(ny>bx[2]&&ny<bx[3]&&!sc.solids.some(r=>hit(fb(P.x,ny),r)))P.y=ny}
function step(dt){
 if(pend){fa+=dt*6;if(fa>=1){fa=1;if(sc===OUT)setScene(pend.to);else setScene('out',OUT.doors[sc.n?NPCS.indexOf(sc.n):6].sx,OUT.doors[sc.n?NPCS.indexOf(sc.n):6].sy);pend=null}}else if(fa>0)fa=Math.max(0,fa-dt*5);
 near=null;if(sc.npc&&Math.hypot(P.x-sc.npc.x,P.y-sc.npc.y)<30)near='npc';if(sc.chest&&Math.hypot(P.x-sc.chest.x,P.y-sc.chest.y)<34)near='chest';
 $('act').style.display=near&&!dlg&&playing?'block':'none';$('act').textContent=near=='chest'?'Buka Peti':'Bicara';
 if(dlg||!playing||pend)return;
 let dx=joy.x+((keys.ArrowRight||keys.d)?1:0)-((keys.ArrowLeft||keys.a)?1:0),dy=joy.y+((keys.ArrowDown||keys.s)?1:0)-((keys.ArrowUp||keys.w)?1:0);
 const m=Math.hypot(dx,dy);if(m>1){dx/=m;dy/=m}
 if(m>.12){const v=62*dt;mv(dx*v,dy*v);P.st+=dt*8;P.d=Math.abs(dx)>Math.abs(dy)?(dx>0?1:3):(dy>0?0:2)}else P.st=0;
 if(cool>0){cool--;return}
 for(const d of sc.doors)if(hit(fb(P.x,P.y),d.r)){pend=d;break}}
function act(){
 if(dlg){dlg=false;$('dlg').style.display='none';return}
 if(!near||!playing)return;let h;
 if(near=='npc')h=`<b>${sc.n.n}</b>Halo, ${$('nm').dataset.n}! Aku punya 5 pertanyaan seputar PMR untukmu. Setiap jawaban benar bernilai 15 poin. <small>(Kuis hadir di tahap berikutnya)</small>`;
 else{opened=true;h=`<b>🎉 Easter Egg Ditemukan!</b>Peti besar terbuka! Isinya: tandu emas, kotak P3K legendaris, dan sebuah surat: “Terima kasih sudah menjadi petugas PMR sejati. Siap menolong, tanpa pamrih!” ✚<small>Ketuk untuk menutup</small>`}
 $('dlg').innerHTML=h;$('dlg').style.display='block';dlg=true;$('act').style.display='none'}
$('dlg').onclick=act;$('act').onclick=act;
addEventListener('keydown',e=>{keys[e.key]=true;if(['e',' ','Enter'].includes(e.key)&&playing)act()});
addEventListener('keyup',e=>keys[e.key]=false);
let jp=null,jo={x:0,y:0};const jb=$('jb'),jk=$('jk');
cv.addEventListener('pointerdown',e=>{if(jp!==null||!playing||dlg)return;jp=e.pointerId;jo={x:e.clientX,y:e.clientY};
 jb.style.cssText=`display:block;left:${jo.x-50}px;top:${jo.y-50}px`;jk.style.cssText=`display:block;left:${jo.x-22}px;top:${jo.y-22}px`});
addEventListener('pointermove',e=>{if(e.pointerId!==jp)return;let vx=e.clientX-jo.x,vy=e.clientY-jo.y;const l=Math.hypot(vx,vy),k=l>50?50/l:1;
 vx*=k;vy*=k;joy={x:vx/50,y:vy/50};jk.style.left=jo.x+vx-22+'px';jk.style.top=jo.y+vy-22+'px'});
const up=e=>{if(e.pointerId!==jp)return;jp=null;joy={x:0,y:0};jb.style.display=jk.style.display='none'};
addEventListener('pointerup',up);addEventListener('pointercancel',up);
function player(cx,cy){X=b;const f=P.st>0?[0,1,0,3][Math.floor(P.st)%4]:0,x=Math.round(P.x)-cx,y=Math.round(P.y)-cy;
 circ(x,y,6,2,'rgba(0,0,0,.25)');b.drawImage(SP[gender][P.d][f],x-8,y-23)}
function loop(t){const dt=Math.min(.05,(t-last)/1000||0);last=t;step(dt);X=b;
 b.fillStyle='#14311f';b.fillRect(0,0,LW,LH);
 const px=Math.round(P.x),py=Math.round(P.y);
 const cx=sc.w<=LW?Math.round((sc.w-LW)/2):Math.max(0,Math.min(sc.w-LW,px-(LW>>1))),cy=sc.h<=LH?Math.round((sc.h-LH)/2):Math.max(0,Math.min(sc.h-LH,py-12-(LH>>1)));
 b.drawImage(sc.layer,-cx,-cy);
 let done=false;for(const o of sc.objs){if(!done&&o.y>P.y){player(cx,cy);done=true}o.d(cx,cy)}if(!done)player(cx,cy);
 if(fa>0){b.fillStyle=`rgba(0,0,0,${fa})`;b.fillRect(0,0,LW,LH)}
 g.imageSmoothingEnabled=false;g.setTransform(1,0,0,1,0,0);g.fillStyle='#14311f';g.fillRect(0,0,cv.width,cv.height);g.drawImage(buf,0,0,LW*S*D,LH*S*D);
 requestAnimationFrame(loop)}
document.querySelectorAll('.g').forEach(x=>x.onclick=()=>{document.querySelectorAll('.g').forEach(y=>y.classList.remove('on'));x.classList.add('on');gender=x.dataset.g});
try{$('ni').value=localStorage.getItem('pmrName')||'';const sg=localStorage.getItem('pmrG');if(sg)document.querySelector(`.g[data-g=${sg}]`).click()}catch(e){}
$('go').onclick=()=>{const n=$('ni').value.trim();if(!n){$('ni').focus();$('ni').placeholder='Nama wajib diisi';return}
 try{localStorage.setItem('pmrName',n);localStorage.setItem('pmrG',gender)}catch(e){}
 $('nm').textContent='🩺 Petugas '+n;$('nm').dataset.n=n;$('st').style.display='none';$('hud').style.display='block';setScene('out',384,300);playing=true};
const LB=[];
function showLB(on){$('lbp').style.display=on?'flex':'none';if(!on)return;
 let r='';for(let i=0;i<5;i++){const e=LB[i];r+=`<div class="lr"><span>${i+1}</span><span>${e?e.n:'—'}</span><span>${e?e.s:0} poin</span></div>`}$('lbl').innerHTML=r}
$('lb').onclick=()=>showLB(true);$('lbx').onclick=()=>showLB(false);
$('pm').src=SP.m[0][0].toDataURL();$('pf').src=SP.f[0][0].toDataURL();
$('loc').textContent='📍 Kampung Harapan';P.x=384;P.y=300;requestAnimationFrame(loop);
