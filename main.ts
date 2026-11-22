import{readFileSync,readdirSync,mkdirSync,writeFileSync}from'node:fs';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
const F=[
(a,b)=>a+b,
(a,b)=>a-b,
Math.imul,
(a,b)=>a/b,
(a,b)=>a%b,
(a,b)=>(a>>>0)/(b>>>0),
(a,b)=>(a>>>0)%(b>>>0),
0,
(a,b)=>a&b,
(a,b)=>a|b,
(a,b)=>a^b,
0,
(a,b)=>a<<(b&31),
(a,b)=>a>>(b&31),
(a,b)=>a>>>(b&31),
0,
(a,b)=>a==b?1:0,
(a,b)=>a<b?1:0,
(a,b)=>(a>>>0)<(b>>>0)?1:0];
function R(p,n){
 const D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),o=new Uint8Array(65536);
 let s=0,c=0,pc=0,t=0,l=0,q=0;
 const W=e=>[o.slice(0,l),e];
 try{for(;;){
  if(t===1e6)throw 10;
  if(pc<0||pc>=p.length)throw 9;
  const a=p[pc],m=a==1?1:a==2?4:a>47&&a<52?2:0;
  if(pc+m>=p.length)throw 9;
  t++;const g=pc+1+m;pc=g;
  if(a<8){
   if(a==0)return W(0);
   if(a<3){if(s>255)throw 3;D[s++]=a==1?p.readInt8(g-1):p.readInt32LE(g-4);}
   else if(a==3){if(s<1)throw 2;s--;}
   else if(a==4){if(s<1)throw 2;if(s>255)throw 3;D[s]=D[s-1];s++;}
   else if(a==5){if(s<2)throw 2;const v=D[s-1];D[s-1]=D[s-2];D[s-2]=v;}
   else if(a==6){if(s<2)throw 2;if(s>255)throw 3;D[s]=D[s-2];s++;}
   else{if(s<3)throw 2;const v=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=v;}
  }else if(a<16)throw 5;
  else if(a<35){
   if(a==23){if(s<1)throw 2;D[s-1]=-D[s-1];}
   else if(a==27){if(s<1)throw 2;D[s-1]=~D[s-1];}
   else if(a==31)throw 5;
   else{if(s<2)throw 2;const b=D[s-1],v=D[s-2];if(!b&&a>18&&a<23)throw 4;s-=2;D[s++]=F[a-16](v,b);}
  }else if(a<48)throw 5;
  else if(a<53){
   const r=a<52?p.readInt16LE(g-2):0;
   if(a==48)pc=g+r;
   else if(a<51){if(s<1)throw 2;const v=D[--s];if((a==49)===(v==0))pc=g+r;}
   else if(a==51){if(c===64)throw 7;C[c++]=g;pc=p[g-2]|p[g-1]<<8;}
   else{if(c===0)throw 8;pc=C[--c];}
  }else if(a<64)throw 5;
  else if(a<66){
   if(a==64){if(s<1)throw 2;const v=D[s-1];if(v<0||v>255)throw 6;D[s-1]=M[v];}
   else{if(s<2)throw 2;const v=D[s-1];if(v<0||v>255)throw 6;s-=2;M[v]=D[s];}
  }else if(a<80)throw 5;
  else if(a<84){
   if(a==80){if(s<1)throw 2;const b=Buffer.from(''+D[s-1]);if(l+b.length>65536)throw 11;s--;o.set(b,l);l+=b.length;}
   else if(a==81){if(s<1)throw 2;if(l+1>65536)throw 11;o[l++]=D[--s]&255;}
   else if(a==82){if(s>255)throw 3;D[s++]=q<n.length?n[q++]:-1;}
   else{if(s<1)throw 2;return W(D[--s]&255);}
  }else throw 5;
 }}catch(e){return W(e)}
}
for(const d of readdirSync(I).sort()){
 const[r,e]=R(readFileSync(I+'/'+d+'/program.bin'),readFileSync(I+'/'+d+'/input.bin'));
 mkdirSync(O+'/'+d,{recursive:true});
 writeFileSync(O+'/'+d+'/stdout.bin',r);
 writeFileSync(O+'/'+d+'/exit.txt',e+'\n');
}
