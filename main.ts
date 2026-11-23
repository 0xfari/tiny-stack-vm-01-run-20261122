import{readFileSync as R,mkdirSync as M,readdirSync as D,writeFileSync as W}from'fs'
let v,{MAKEFUN_INPUT_DIR:I='/input',MAKEFUN_OUTPUT_DIR:O='/output'}=process.env,d
for(d of D(I)){
const Z=I+'/'+d,P=R(Z+'/program.bin'),N=R(Z+'/input.bin')
let p=0,s=[],c=[],m=[],o='',n=0,q=0,e,l,a,b,t,Y=O+'/'+d,f=w=>s.push(w)>256&&T(3),T=z=>{throw e=z|0},g=()=>a=u(b=u()),u=()=>a=s.pop()??T(2),S=[T,()=>f(P[p]<<24>>24),()=>f(P.readInt32LE(p)),u,()=>f(u(),f(a)),()=>{g(),f(b),f(a)},()=>f(s.at(-2)??T(2)),()=>{s[2]??T(2),f(s.splice(-3,1)[0])}]
try{for(;;){
v=P[p++];l=+'014'[v]||v>47&v<52&&2;(p+l>P.length|p<0|++n>1e6)&&T(9+(n>1e6))
v<8?S[v]():v>15&v<35&&v-31?(v-23&v-27?g():u(),v<19|v>22|b||T(4),t=a>>>0,d=b>>>0,f([a+b|0,a-b|0,Math.imul(a,b),a/b|0,a%b,t/d|0,t%d|0,-a|0,a&b,a|b,a^b,~a,a<<b,a>>b,a>>>b|0,0,a==b|0,a<b|0,t<d|0][v-16])):v>47&v<53?(v<51?(v>48&&u(),p+=(v==49)^!!a|v==48&&P.readInt16LE(p)):v-51?p=c.pop()??T(8):(c.push(p+2)>64&&T(7),p=(P[p]|P[p+1]<<8)-2)):v>63&v<66?(v-64?g():u(),t=v-64?b:a,t>>8&&T(6),v-64?m[t]=a:f(m[t]|0)):v>79&v<84?(v<82?(u(),b=v-80?String.fromCharCode(a&255):''+a,(o+b).length>65536?T(11):o+=b):v==82?f(N[q++]??-1):T(u()&255)):T(5)
p+=l
}}catch{}
M(Y,{recursive:!0});W(Y+'/stdout.bin',o,'latin1');W(Y+'/exit.txt',e+'')
}