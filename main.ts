import{readFileSync as R,mkdirSync as M,readdirSync as D,writeFileSync as W}from'node:fs';
let v=process.env,I=v.MAKEFUN_INPUT_DIR??'/input',O=v.MAKEFUN_OUTPUT_DIR??'/output',d;
for(d of D(I)){
const Z=I+'/'+d,P=R(Z+'/program.bin'),N=R(Z+'/input.bin');
let p=0,s=[],c=[],m=[],o='',n=0,q=0,e,k,l,a,b,t,x,y,L=P.length,Y=O+'/'+d,J=[()=>a+b|0,()=>a-b|0,()=>Math.imul(a,b),()=>a/b|0,()=>a%b|0,()=>x/y|0,()=>x%y|0,()=>-a|0,()=>a&b,()=>a|b,()=>a^b,()=>~a,()=>a<<b,()=>a>>b,()=>a>>>b|0,,()=>a==b|0,()=>a<b|0,()=>x<y|0],h=x=>s.push(x),T=z=>{throw z},f=w=>s.length>255?T(3):h(w),g=()=>{s.length<2&&T(2);b=s.pop();a=s.pop()},u=()=>s.length?a=s.pop():T(2),S=[()=>T(0),()=>f(P[p+1]<<24>>24),()=>f(P.readInt32LE(p+1)),u,()=>{u();h(a);h(a);s.length>256&&T(3)},()=>{g();h(b);h(a)},()=>{s.length<2&&T(2);f(s.at(-2))},()=>{s.length<3&&T(2);h(s.splice(-3,1)[0])}];
try{for(;;){
if(++n>1e6|p<0|p>=L)T(9+(n>1e6));k=P[p];l=k<2?k:k==2?4:k>47&&k<52?2:0;
p+l>=L&&T(9);
if(k<8)S[k]();
else if(k>15&&k<35&&k!=31){k-23?k-27?g():u():u();k>18&&k<23&&!b&&T(4);x=a>>>0;y=b>>>0;h(J[k-16]())}
else if(k>47&&k<53){
if(k<51){k>48&&u();p+=(k==49)^!!a|k==48?3+P.readInt16LE(p+1):3}
else if(k==51){c.push(p+3);c[64]&&T(7);p=P[p+1]|P[p+2]<<8}
else{p=c.pop()??T(8)}continue;
}else if(k>63&&k<66){k-64?g():u();t=k-64?b:a;t>>>0>255&&T(6);k-64?m[t]=a:h(m[t]|0)}
else if(k>79&&k<84){
if(k<82){u();b=k==80?''+a:String.fromCharCode(a&255);o.length+b.length>65536&&T(11);o+=b}
else k==82?f(N[q++]??-1):(u(),T(a&255))}else T(5);
p+=1+l;
}}catch(x){e=x}
M(Y,{recursive:!0});W(Y+'/stdout.bin',o,'latin1');W(Y+'/exit.txt',e+'');
}
