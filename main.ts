import F from"node:fs"
let{MAKEFUN_INPUT_DIR:I="/input",MAKEFUN_OUTPUT_DIR:O="/output"}=process.env,W="01146:;?0000000099999995999599909990000000000000044000000000000058000000000000004414",Y="+,-,,/,%,/,%,,&,|,^,,<<,>>,>>>,,==,<,<".split(","),R=F.readFileSync,S=F.writeFileSync,a,y
for(let d of F.readdirSync(I)){
let P=R(I+"/"+d+"/program.bin"),Q=R(I+"/"+d+"/input.bin"),s=[],c=[],m=[],o="",j=0,p=0,e=-1,D=O+"/"+d
for(let n=1e6;n--&&e<0;){
let b=P[p],L=b==1?1:b==2?4:b>47&&b<52?2:0,g=(P[p+1]|P[p+2]<<8)<<16>>16
if(p>>>0>=P.length||p+L>=P.length){e=9;break}
let q=W.charCodeAt(b)-48,u=q>>2,v=q&3
if(s.length<u){e=2;break}
if(s.length-u+v>256){e=3;break}
let x=p+1+L
if(b==0)e=0
else if(b<3)s.push(P.readIntLE(p+1,b==1?1:4))
else if(b>2&&b<8){b==3?s.pop():b%2?s.push(s.splice((1-b)/2,1)[0]):s.push(s.at(1-b/2))}
else if(q==9){y=s.pop(),a=s.pop()
if(b>18&&b<23&&y==0)e=4
else{if(b>20&&b<23||b==34){a>>>=0;y>>>=0}s.push(b==18?Math.imul(a,y):eval(`a${Y[b-16]}y`)|0)}}
else if(b==23||b==27)s.push(b==23?-s.pop()|0:~s.pop())
else if(b>47&&b<51){if(b==48||(s.pop()==0)==(b==49)){p=x+g;continue}}
else if(b==51){if(c[63])e=7;else{c.push(x);p=g&65535;continue}}
else if(b==52){if(!c.length)e=8;else{p=c.pop();continue}}
else if(b>63&&b<66){a=s.pop();if(a>>>0>255)e=6;else b==64?s.push(m[a]||0):m[a]=s.pop()}
else if(b>79&&b<82){let v=s.pop(),t=b==80?v+"":String.fromCharCode(v&255);if(o.length+t.length>65536)e=11;else o+=t}
else if(b==82)s.push(Q[j++]??-1)
else if(b==83)e=s.pop()&255
else e=5
p=x
}
if(e<0)e=10
F.mkdirSync(D,{recursive:true})
S(D+"/stdout.bin",o,"latin1")
S(D+"/exit.txt",e+"")
}
