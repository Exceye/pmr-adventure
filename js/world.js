/* ---------- tata letak kampung ---------- */
const HS=[[72,24,'#c8452f','#efe3c8'],[616,24,'#e07a2f','#e8dcc0'],[168,140,'#3f6fc4','#f0e4cc'],[520,140,'#8a4fb8','#e8dcc0'],[136,300,'#e0a62a','#efe3c8'],[552,300,'#8a5232','#f0e4cc']];
const PATHS=[R(352,144,64,396),R(64,208,640,32),R(64,400,640,32),R(104,92,16,116),R(648,92,16,116),R(168,368,16,32),R(584,368,16,32)];
const MX=272,MY=16,GARD=R(600,452,120,56),PEN=R(48,448,120,64);
const OUT={w:768,h:576,bx:[44,724,24,520],solids:[],objs:[],doors:[],id:'out'};
const ospr=(img,x,y,ox,oy,by)=>({y:by,d:(cx,cy)=>b.drawImage(img,Math.round(x-cx),Math.round(y-cy))});
const mans=mansionSpr(),fnt=fountainSpr(),wl=wellSpr(),lp=lampSpr(),bsh=bushSpr(),T1=treeSpr(),T2=pineSpr();
OUT.solids.push(R(MX+4,0,216,MY+120),R(368+2,182,28,14),R(686,176,20,10),GARD,PEN,R(344,148,6,8),R(426,148,6,8));
OUT.objs.push(ospr(mans,MX,MY,0,0,MY+120),ospr(fnt,368,168,0,0,200),ospr(wl,684,160,0,0,186),ospr(lp,342,128,0,0,156),ospr(lp,424,128,0,0,156));
OUT.doors.push({r:R(MX+98,MY+118,28,6),to:6,sx0:MX+112,sy0:MY+138});
HS.forEach((h,i)=>{const sp=houseSpr(h[2],h[3]);OUT.solids.push(R(h[0]+2,h[1],76,68));OUT.objs.push(ospr(sp,h[0],h[1],0,0,h[1]+68));
 OUT.doors.push({r:R(h[0]+33,h[1]+66,14,6),to:i,sx0:h[0]+40,sy0:h[1]+84})});
{let s=5;const rn=()=>(s=s*16807%2147483647)/2147483647,blk=[...OUT.solids,GARD,PEN,...PATHS,R(MX,MY,224,150),R(360,160,48,50)].map(r=>R(r.x-18,r.y-24,r.w+36,r.h+48));
 for(let i=0;i<260&&OUT.objs.length<75;i++){const x=40+rn()*690,y=40+rn()*480,t=R(x-16,y-34,32,40);if(blk.some(r=>hit(t,r)))continue;
  const pine=rn()<.3;OUT.solids.push(R(x-4,y-5,8,5));OUT.objs.push(ospr(pine?T2:T1,x-(pine?12:16),y-(pine?38:42),0,0,y));blk.push(R(x-24,y-30,48,36))}
 for(let y=60;y<540;y+=46){OUT.objs.push(ospr(T1,-4,y-42,0,0,y),ospr(T1,740,y-42,0,0,y+10))}
 OUT.objs.sort((a,c)=>a.y-c.y);
 const free=(x,y)=>!PATHS.some(p=>x>=p.x-4&&x<p.x+p.w+4&&y>=p.y-4&&y<p.y+p.h+4)&&!OUT.solids.some(r=>x>=r.x-4&&x<r.x+r.w+4&&y>=r.y-4&&y<r.y+r.h+4);
 OUT.layer=draw(768,576,()=>{
  for(let y=0;y<576;y+=16)for(let x=0;x<768;x+=16)B(((x+y)>>4)%2?'#62a84c':'#5ba046',x,y,16,16);
  for(let i=0;i<650;i++){const x=rn()*768|0,y=rn()*576|0;B('#4c8f3c',x,y,2,1);B('#4c8f3c',x+1,y-1,1,1)}
  B('#7a5a3a',0,546,768,6);B('#3a8fd1',0,552,768,24);for(let i=0;i<40;i++)B('#7cc4ec',rn()*760|0,556+(rn()*16|0),8,1);
  PATHS.forEach(p=>B('#b8934f',p.x-1,p.y-1,p.w+2,p.h+2));PATHS.forEach(p=>B('#dcbd7e',p.x,p.y,p.w,p.h));
  for(let i=0;i<900;i++){const p=PATHS[rn()*PATHS.length|0];B('#c9a566',p.x+(rn()*p.w|0),p.y+(rn()*p.h|0),2,1)}
  for(let i=0;i<260;i++){const x=rn()*740+14|0,y=rn()*510+14|0;if(free(x,y)){B(['#fff','#ffd166','#ff8fab','#c9a0ff'][i%4],x,y,2,2);B('#3d8f35',x,y+2,1,2)}}
  B('#7a4f2a',GARD.x,GARD.y,GARD.w,GARD.h);for(let r=0;r<4;r++)for(let c=0;c<10;c++){B('#3f9a38',GARD.x+6+c*11,GARD.y+6+r*12,7,6);B('#ffb02e',GARD.x+8+c*11,GARD.y+4+r*12,3,3)}
  B('#6fae52',PEN.x,PEN.y,PEN.w,PEN.h);for(let x=PEN.x;x<PEN.x+PEN.w;x+=8){B('#8a5a2b',x,PEN.y,3,10);B('#8a5a2b',x,PEN.y+PEN.h-10,3,10)}
  for(let y=PEN.y;y<PEN.y+PEN.h;y+=8){B('#8a5a2b',PEN.x,y,3,10);B('#8a5a2b',PEN.x+PEN.w-3,y,3,10)}B('#a8723a',PEN.x,PEN.y+3,PEN.w,2);B('#a8723a',PEN.x,PEN.y+PEN.h-6,PEN.w,2);
  B('#c8283a',60,462,34,20);B('#8a1f2a',56,458,42,6);B('#3a2418',72,470,10,12);
  for(const c of[[110,486],[126,476],[100,500]]){B('#fff',c[0],c[1],7,5);B('#fff',c[0]+5,c[1]-3,3,4);B('#e63946',c[0]+6,c[1]-5,2,2);B('#ffb02e',c[0]+8,c[1]-2,2,1)}
  const post=(x,y)=>{B('#6b4423',x,y,4,14);B('#a8723a',x,y,2,14);B('#c98f52',x,y,4,2)};
  for(let x=32;x<736;x+=16){post(x,8);if(x<344||x>=424)post(x,524)}
  for(let y=24;y<524;y+=16){post(32,y);post(732,y)}
  B('#8a5a2b',32,12,708,3);B('#8a5a2b',32,18,708,3);B('#8a5a2b',32,528,312,3);B('#8a5a2b',32,534,312,3);B('#8a5a2b',424,528,316,3);B('#8a5a2b',424,534,316,3);
  B('#8a5a2b',34,8,3,520);B('#8a5a2b',733,8,3,520);
  for(const x of[340,414]){B('#8d8d96',x,508,14,32);B('#6e6e78',x,508,14,3);B('#ffd23f',x+4,500,6,8)}
  B('#a8723a',368,552,32,24);for(let y=552;y<576;y+=4)B('#7b4a26',368,y,32,1);
  for(const bs of[[56,150],[700,300],[250,500],[480,500],[40,330],[690,430],[470,120]])if(free(bs[0],bs[1]))X.drawImage(bsh,bs[0],bs[1])})}
/* ---------- interior ---------- */
const frame=(w,h,gp)=>{B('#a8723a',0,0,w,8);B('#8a5a2b',0,6,w,2);B('#a8723a',0,0,8,h);B('#a8723a',w-8,0,8,h);B('#8a5a2b',7,8,1,h);B('#8a5a2b',w-9,8,1,h);
 for(const s of[[0,gp[0]],[gp[1],w]]){B('#a8723a',s[0],h-16,s[1]-s[0],16);B('#7b4a26',s[0],h-4,s[1]-s[0],4);B('#c98f52',s[0],h-16,s[1]-s[0],2)}};
const floor=(w,h,y0,c1,c2)=>{for(let y=y0;y<h;y+=8){const o=((y-y0)/8)%2;B(o?c2:c1,0,y,w,8);B('rgba(0,0,0,.12)',0,y,w,1);for(let x=o?24:4;x<w;x+=40)B('rgba(0,0,0,.12)',x,y,1,8)}};
const wall=(w,y0)=>{B('#f1e0c2',0,0,w,y0);B('#e6d3b0',8,8,w-16,4);B('#8a5a2b',8,y0-8,w-16,8);B('#a8723a',8,y0-8,w-16,2)};
const win=(x,y,w,h)=>{B('#5b3a22',x,y,w,h);B('#8fd0f0',x+2,y+2,w-4,h-4);B('#4da05a',x+2,y+h-8,w-4,6);B('#6dbb74',x+4,y+h-10,10,4);B('#5b3a22',x+w/2-1,y,2,h);B('#5b3a22',x,y+h/2-1,w,2);B('#d6f1ff',x+4,y+4,4,2)};
const plant=(x,y)=>{B('rgba(0,0,0,.2)',x+1,y+20,14,2);B('#d8d8e0',x+3,y+14,10,8);B('#b0b0ba',x+3,y+14,10,2);B('#6b4423',x+4,y+14,8,2);circ(x+8,y+8,7,6,'#3a8f3a');circ(x+6,y+6,4,4,'#4fb85a');B('#2b7a3a',x+11,y+11,3,3)};
const bed=(x,y,c)=>{B('#7b4a26',x,y,56,50);B('#5b3a22',x,y+46,56,4);B('#f4f4f4',x+3,y+3,50,14);B('#dcdce4',x+3,y+14,50,3);B(c,x+3,y+18,50,28);B(dk(c,.75),x+3,y+18,50,3)};
const table=(x,y,w,h)=>{B('rgba(0,0,0,.18)',x+2,y+h,w,4);B('#6b4423',x+2,y+h-6,4,6);B('#6b4423',x+w-6,y+h-6,4,6);B('#a8723a',x,y,w,h-8);B('#c98f52',x,y,w,2);B('#7b4a26',x,y+h-8,w,4)};
const shelf=(x,y,w,h)=>{B('#7b4a26',x,y,w,h);B('#5b3a22',x+2,y+2,w-4,h-4);const cs=['#c8283a','#3f6fc4','#e0a62a','#4da05a','#8a4fb8'];for(let r=0;r<Math.floor((h-4)/12);r++){for(let k=0;k<(w-6)/3;k++)B(cs[(k+r*2)%5],x+3+k*3,y+4+r*12,2,9);B('#7b4a26',x+2,y+13+r*12,w-4,2)}};
const rug=(x,y,w,h,c,bc)=>{B(bc,x,y,w,h);B(c,x+3,y+3,w-6,h-6);B(bc,x+6,y+6,w-12,1);B(bc,x+6,y+h-7,w-12,1)};
const lantern=(x,y)=>{B('#3a3a44',x+3,y,2,4);B('#ffd23f',x,y+4,8,10);B('#fff3a0',x+2,y+6,4,6);B('#3a3a44',x,y+14,8,2)};
const painting=(x,y,w,h)=>{B('#7b4a26',x,y,w,h);B('#9ed0f0',x+2,y+2,w-4,h-4);for(let r=0;r<h/3;r++)B('#7a8fb0',x+w/2-r-1,y+h-8-r,r*2+2,1);B('#4da05a',x+2,y+h-8,w-4,6)};
function houseRoom(i){const w=320,h=208,L=draw(w,h,()=>{floor(w,h,40,'#c99a5b','#c08f50');wall(w,48);win(136,12,48,26);painting(222,14,26,20);
 B('#7b4a26',16,16,70,3);B('#cfd2d8',16,20,70,3);B('#f1e0c2',18,10,6,8);B('#c8283a',28,10,6,8);plant(64,2);
 B('#8a5a2b',16,32,64,22);B('#cfd2d8',16,30,64,6);B('#7d8794',22,31,18,4);B('#2d2d35',52,31,20,4);B('#8a5a2b',20,40,26,1);B('#8a5a2b',50,40,26,1);
 B('#aeb7c6',84,18,20,36);B('#8e98a8',84,32,20,1);B('#6b7584',100,24,2,6);B('#6b7584',100,36,2,8);
 frame(w,h,[144,176]);
 bed(240,48,['#3f6fc4','#c8283a','#4da05a','#8a4fb8','#e0a62a','#e07a2f'][i]);B('#a8723a',222,46,16,14);B('#7b4a26',222,56,16,4);plant(222,28);
 shelf(14,88,24,40);plant(16,160);plant(284,160);rug(108,100,104,60,'#3f6fc4','#2a4a8a');table(128,108,64,32);B('#e8e8f0',152,102,10,8);B('#fff',154,98,2,2);B('#ff8fab',158,98,2,2);
 table(112,122,12,12);table(196,122,12,12);B('#a8723a',148,184,24,8)}),
 sol=[R(0,0,w,48),R(0,0,8,h),R(w-8,0,8,h),R(0,192,144,16),R(176,192,144,16),R(16,48,64,6),R(84,48,20,6),R(240,48,56,48),R(222,48,16,12),R(14,100,24,28),R(128,112,64,28),R(112,126,12,10),R(196,126,12,10),R(18,178,12,6),R(286,178,12,6),R(62,48,12,4),R(226,48,12,2)];
 const n=NPCS[i],np={x:160,y:92};sol.push(R(154,88,12,5));
 return{w,h,layer:L,solids:sol,bx:[10,w-10,30,208],spawn:[160,178],doors:[{r:R(144,190,32,16),to:'out'}],npc:np,n,
  objs:[{y:np.y,d:(cx,cy)=>{circ(Math.round(np.x-cx),Math.round(np.y-cy),6,2,'rgba(0,0,0,.25)');b.drawImage(n.img,Math.round(np.x-8-cx),Math.round(np.y-23-cy));
   const bo=Math.round(Math.sin(Date.now()/250)*2),bx=Math.round(np.x-cx),by=Math.round(np.y-cy-32+bo);circ(bx,by,5,5,'#ffd23f');B('#222',bx-1,by-3,2,4);B('#222',bx-1,by+2,2,1)}}]}}
function mansionRoom(){const w=448,h=288,L=draw(w,h,()=>{floor(w,h,40,'#c99a5b','#c08f50');wall(w,48);win(80,12,40,24);win(328,12,40,24);painting(200,10,48,28);lantern(176,16);lantern(264,16);
 rug(144,64,160,118,'#b8202e','#d9a82a');rug(208,176,32,100,'#b8202e','#d9a82a');
 B('rgba(0,0,0,.25)',190,138,68,4);B('#9a9aa4',192,106,64,32);B('#c8c8d0',192,106,64,6);B('#b0b0ba',196,112,56,22);B('#8d8d96',192,134,64,4);
 frame(w,h,[208,240]);
 bed(24,52,'#c8283a');B('#a8723a',84,56,16,14);B('#ffd23f',88,46,8,8);B('#fff3a0',89,47,6,6);
 B('#e6d3b0',330,50,64,26);B('#cbbd9a',330,60,64,16);B('#e6d3b0',326,56,8,20);B('#e6d3b0',390,56,8,20);B('#8a5a2b',340,82,44,16);B('#a8723a',340,82,44,3);
 B('#6b4423',404,60,30,16);B('#2d2d35',408,38,22,22);B('#4a90c8',410,40,18,16);
 plant(146,64);plant(286,64);shelf(24,138,26,36);shelf(398,150,26,36);table(56,210,64,32);table(44,222,12,12);table(120,222,12,12);plant(22,246);plant(408,246);plant(150,236);plant(282,236)}),
 sol=[R(0,0,w,48),R(0,0,8,h),R(w-8,0,8,h),R(0,272,208,16),R(240,272,208,16),R(24,52,56,44),R(84,56,16,12),R(330,50,64,26),R(404,58,30,18),R(148,78,12,8),R(288,78,12,8),R(24,142,26,30),R(398,154,26,30),R(56,218,64,24),R(44,230,12,8),R(120,230,12,8),R(24,260,12,6),R(410,260,12,6),R(152,250,12,6),R(284,250,12,6),R(190,114,68,22)];
 const cp={x:224,y:130};
 return{w,h,layer:L,solids:sol,bx:[10,w-10,30,288],spawn:[224,244],doors:[{r:R(208,262,32,16),to:'out'}],chest:cp,
  objs:[{y:cp.y,d:(cx,cy)=>{const x=Math.round(cp.x-cx),y=Math.round(cp.y-cy),t=Date.now();X=b;
   if(opened){const a=.18+.08*Math.sin(t/200);circ(x,y-16,34,22,`rgba(255,235,120,${a})`);B('#a8202e',x-11,y-23,22,5);B('#3a0d0a',x-10,y-18,20,4);B('#fff3a0',x-9,y-16,18,3)}else B('#a8202e',x-11,y-18,22,8);
   B('#5b1a12',x-11,y-11,22,12);B('#c8283a',x-10,y-10,20,10);B('#ffd23f',x-10,y-10,3,10);B('#ffd23f',x+7,y-10,3,10);if(!opened){B('#ffd23f',x-11,y-18,22,2);B('#ffd23f',x-5,y-18,3,8);B('#ffd23f',x+3,y-18,3,8)}B('#ffd23f',x-2,y-13,4,5);B('#5b1a12',x-1,y-11,2,2);
   if(opened)for(let k=0;k<6;k++){const an=t/500+k*1.05,sx=Math.round(x+Math.cos(an)*(16+k*2)),sy=Math.round(y-18+Math.sin(an*1.3)*(12+k)),on=Math.floor(t/150+k)%2;B('#fff6a0',sx,sy,2,2);if(on){B('#fff6a0',sx-1,sy,4,1);B('#fff6a0',sx,sy-1,2,4)}}}}]}}
