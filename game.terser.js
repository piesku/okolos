!function(){function t(t,i){let n=t.i.t();for(let e of i)e(t,n);return n}function i(t,i,n){let e=t.createShader(i);if(t.shaderSource(e,n),t.compileShader(e),!t.getShaderParameter(e,35713))throw Error(t.getShaderInfoLog(e));return e}function n(t,i,n,e){return t[0]=i,t[1]=n,t[2]=e,t}function e(t,i){return t[0]=i[0],t[1]=i[1],t[2]=i[2],t}function o(t,i,n){return t[0]=i[0]+n[0],t[1]=i[1]+n[1],t[2]=i[2]+n[2],t}function r(t,i,n){return t[0]=i[0]-n[0],t[1]=i[1]-n[1],t[2]=i[2]-n[2],t}function s(t,i,n){return t[0]=i[0]*n,t[1]=i[1]*n,t[2]=i[2]*n,t}function l(t,i){return t[0]=-i[0],t[1]=-i[1],t[2]=-i[2],t}function h(t,i){let n=i[0],e=i[1],o=i[2],r=n*n+e*e+o*o;return r>0&&(r=1/Math.sqrt(r)),t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t}function u(t,i){return t[0]*i[0]+t[1]*i[1]+t[2]*i[2]}function f(t,i,n){let e=i[0],o=i[1],r=i[2],s=n[3]*e+n[7]*o+n[11]*r+n[15]||1;return t[0]=(n[0]*e+n[4]*o+n[8]*r+n[12])/s,t[1]=(n[1]*e+n[5]*o+n[9]*r+n[13])/s,t[2]=(n[2]*e+n[6]*o+n[10]*r+n[14])/s,t}function a(t,i,n){let e=i[0],o=i[1],r=i[2];return t[0]=n[0]*e+n[4]*o+n[8]*r,t[1]=n[1]*e+n[5]*o+n[9]*r,t[2]=n[2]*e+n[6]*o+n[10]*r,t}function c(t){return Math.hypot(t[0],t[1],t[2])}function d(t,i){let n=i[0],e=i[1],o=i[2],r=i[3],s=i[4],l=i[5],h=i[6],u=i[7],f=i[8],a=i[9],c=i[10],d=i[11],v=i[12],m=i[13],_=i[14],g=i[15],p=n*l-e*s,y=n*h-o*s,w=n*u-r*s,M=e*h-o*l,A=e*u-r*l,x=o*u-r*h,T=f*m-a*v,b=f*_-c*v,F=f*g-d*v,S=a*_-c*m,$=a*g-d*m,X=c*g-d*_,C=p*X-y*$+w*S+M*F-A*b+x*T;return C?(C=1/C,t[0]=(l*X-h*$+u*S)*C,t[1]=(o*$-e*X-r*S)*C,t[2]=(m*x-_*A+g*M)*C,t[3]=(c*A-a*x-d*M)*C,t[4]=(h*F-s*X-u*b)*C,t[5]=(n*X-o*F+r*b)*C,t[6]=(_*w-v*x-g*y)*C,t[7]=(f*x-c*w+d*y)*C,t[8]=(s*$-l*F+u*T)*C,t[9]=(e*F-n*$-r*T)*C,t[10]=(v*A-m*w+g*p)*C,t[11]=(a*w-f*A-d*p)*C,t[12]=(l*b-s*S-h*T)*C,t[13]=(n*S-e*b+o*T)*C,t[14]=(m*y-v*M-_*p)*C,t[15]=(f*M-a*y+c*p)*C,t):null}function v(t,i,n){let e=i[0],o=i[1],r=i[2],s=i[3],l=i[4],h=i[5],u=i[6],f=i[7],a=i[8],c=i[9],d=i[10],v=i[11],m=i[12],_=i[13],g=i[14],p=i[15],y=n[0],w=n[1],M=n[2],A=n[3];return t[0]=y*e+w*l+M*a+A*m,t[1]=y*o+w*h+M*c+A*_,t[2]=y*r+w*u+M*d+A*g,t[3]=y*s+w*f+M*v+A*p,y=n[4],w=n[5],M=n[6],A=n[7],t[4]=y*e+w*l+M*a+A*m,t[5]=y*o+w*h+M*c+A*_,t[6]=y*r+w*u+M*d+A*g,t[7]=y*s+w*f+M*v+A*p,y=n[8],w=n[9],M=n[10],A=n[11],t[8]=y*e+w*l+M*a+A*m,t[9]=y*o+w*h+M*c+A*_,t[10]=y*r+w*u+M*d+A*g,t[11]=y*s+w*f+M*v+A*p,y=n[12],w=n[13],M=n[14],A=n[15],t[12]=y*e+w*l+M*a+A*m,t[13]=y*o+w*h+M*c+A*_,t[14]=y*r+w*u+M*d+A*g,t[15]=y*s+w*f+M*v+A*p,t}function m(t,i){return t[0]=i[12],t[1]=i[13],t[2]=i[14],t}function _(t,i,n){var e,o;t.o=i,t.l&&0===n.u.h&&(function(t,i,n,e,o){let r,s=1/Math.tan(i/2);t[0]=s/n,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=s,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=-1,t[12]=0,t[13]=0,t[15]=0,null!=o&&o!==1/0?(r=1/(e-o),t[10]=(o+e)*r,t[14]=2*o*e*r):(t[10]=-1,t[14]=-2*e)}((e=n.u).u,(o=t.v/t.m)>1?e._:e._/o,o,e.g,e.p),d(e.M,e.u));let r=t.i.A[i];!function(t,i){t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15]}(n.T,r.F),v(n.S,n.u.u,n.T),m(n.$,r.i)}function g(t,i,n){t.o=i;let e=t.i.A[i],o=t.X.getViewerPose(t.C);n.P=[];for(let t of o.views){let i={I:t,T:[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],S:[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],$:[0,0,0]};v(i.T,e.i,t.transform.matrix),m(i.$,i.T),d(i.T,i.T),v(i.S,t.projectionMatrix,i.T),n.P.push(i)}}function p(t,i){let n,e,o,r,s,l;m(i.V,t),n=r=i.V[0],e=s=i.V[1],o=l=i.V[2];let h=[0,0,0];for(let u=0;u<8;u++){let a=ft[u];h[0]=a[0]*i.k[0],h[1]=a[1]*i.k[1],h[2]=a[2]*i.k[2],f(h,h,t),h[0]<n&&(n=h[0]),h[0]>r&&(r=h[0]),h[1]<e&&(e=h[1]),h[1]>s&&(s=h[1]),h[2]<o&&(o=h[2]),h[2]>l&&(l=h[2])}i.L=[n,e,o],i.R=[r,s,l],i.W[0]=(r-n)/2,i.W[1]=(s-e)/2,i.W[2]=(l-o)/2}function y(t,i){let n=t.V[0]-i.V[0],e=t.W[0]+i.W[0]-Math.abs(n),o=t.V[1]-i.V[1],r=t.W[1]+i.W[1]-Math.abs(o),s=t.V[2]-i.V[2],l=t.W[2]+i.W[2]-Math.abs(s);return e<r&&e<l?[e*Math.sign(n),0,0]:r<l?[0,r*Math.sign(o),0]:[0,0,l*Math.sign(s)]}function w(t,i){return t.L[0]<i.R[0]&&t.R[0]>i.L[0]&&t.L[1]<i.R[1]&&t.R[1]>i.L[1]&&t.L[2]<i.R[2]&&t.R[2]>i.L[2]}function M(t,i,n){for(let e=0;e<n;e++){let n=i[e],o=t.B&n.Y,r=n.B&t.Y;if((o||r)&&w(t,n)){let i=y(t,n);o&&t.H.push({K:n.D,N:i}),r&&n.H.push({K:t.D,N:l([0,0,0],i)})}}}function A(t,i,n,e,o){return(t-i)/(n-i)*(o-e)+e}function x(t,i,n,e,o){return t[0]=i,t[1]=n,t[2]=e,t[3]=o,t}function T(t,i,n){let e=i[0],o=i[1],r=i[2],s=i[3],l=n[0],h=n[1],u=n[2],f=n[3];return t[0]=e*f+s*l+o*u-r*h,t[1]=o*f+s*h+r*l-e*u,t[2]=r*f+s*u+e*h-o*l,t[3]=s*f-e*l-o*h-r*u,t}function b(t,i,n){let e=n/2;return t[0]=Math.sin(e)*i[0],t[1]=Math.sin(e)*i[1],t[2]=Math.sin(e)*i[2],t[3]=Math.cos(e),t}function F(t,i,n,e){let o,r,s,l,h,u=i[0],f=i[1],a=i[2],c=i[3],d=n[0],v=n[1],m=n[2],_=n[3];return r=u*d+f*v+a*m+c*_,r<0&&(r=-r,d=-d,v=-v,m=-m,_=-_),1-r>1e-6?(o=Math.acos(r),s=Math.sin(o),l=Math.sin((1-e)*o)/s,h=Math.sin(e*o)/s):(l=1-e,h=e),t[0]=l*u+h*d,t[1]=l*f+h*v,t[2]=l*a+h*m,t[3]=l*c+h*_,t}function S(t,i){let n=t.i.G[i],e=t.i.U[i];if(1===e.h){let i=t.q.left;if(null==i?void 0:i.gamepad){let e=i.gamepad.buttons[1];if(e){let i=t.i.A[n.G[0]];i.j[2]=A(e.value,0,1,1,.5),b(i.O,at,-e.value),i.J=!0}}}if(2===e.h){let i=t.q.right;if(null==i?void 0:i.gamepad){let e=i.gamepad.buttons[1];if(e){let i=t.i.A[n.G[0]];i.j[2]=A(e.value,0,1,1,.5),b(i.O,at,e.value),i.J=!0}}}}function $(t,i){let n=t.i.A[i];if(0===t.i.Z[i].h){let e=t.i.tt[i],s=t.i.G[i].G[0],l=t.i.A[s],h=t.i.A[t.i.G[s].G[1]],u=t.q.left;if(null==u?void 0:u.gamepad){let i=-u.gamepad.axes[2];if(i){let t=[i,0,0];a(t,t,h.i),t[1]=0,o(e.it,e.it,t)}let s=-u.gamepad.axes[3];if(s){let t=[0,0,s];a(t,t,h.i),t[1]=0,o(e.it,e.it,t)}let l=u.gamepad.buttons[1];if(l&&l.value>.5){let i=t.X.getPose(u.gripSpace,t.C);ct?(m(vt,i.transform.matrix),r(mt,dt,vt),o(n.nt,n.nt,mt),n.J=!0):(ct=!0,m(dt,i.transform.matrix))}else ct&&(ct=!1)}let f=t.q.right;if(null==f?void 0:f.gamepad){let i=-f.gamepad.axes[2];if(i){let t=[i,0,0];a(t,t,h.i),t[1]=0,o(e.it,e.it,t)}let s=-f.gamepad.axes[3];if(s){let t=[0,0,s];a(t,t,h.i),t[1]=0,o(e.it,e.it,t)}let l=f.gamepad.buttons[1];if(l&&l.value>.5){let i=t.X.getPose(f.gripSpace,t.C);_t?(m(pt,i.transform.matrix),r(yt,gt,pt),o(n.nt,n.nt,yt),n.J=!0):(_t=!0,m(gt,i.transform.matrix))}else _t&&(_t=!1)}if(c(e.it)>0){let t=.03,i=5;l.nt[1]=(Math.sin(i*n.nt[0])+Math.sin(i*n.nt[2]))*t,l.J=!0}}}function X(t,i){let n=t.i.A[i],e=t.i.U[i];if(0===e.h){let i=t.X.getViewerPose(t.C);return n.i=i.transform.matrix,void(n.J=!0)}if(1!==e.h)if(2!==e.h);else{let i=t.q.right;if(i){let e=t.X.getPose(i.gripSpace,t.C);e&&(n.i=e.transform.matrix,n.J=!0)}}else{let i=t.q.left;if(i){let e=t.X.getPose(i.gripSpace,t.C);e&&(n.i=e.transform.matrix,n.J=!0)}}}function C(t,i,n){let e=t.i.et[i];m(wt,t.i.A[i].i),1===e.h&&h(wt,wt),t.ot[4*n+0]=wt[0],t.ot[4*n+1]=wt[1],t.ot[4*n+2]=wt[2],t.ot[4*n+3]=e.h,t.rt[4*n+0]=e.st[0],t.rt[4*n+1]=e.st[1],t.rt[4*n+2]=e.st[2],t.rt[4*n+3]=e.lt}function P(t,i,e){let r=t.i.A[i],l=t.i.tt[i];if(0!==l.it[0]||0!==l.it[1]||0!==l.it[2]){let i=Math.min(1,c(l.it));a(l.it,l.it,r.i),void 0!==r.ht&&a(l.it,l.it,t.i.A[r.ht].F),h(l.it,l.it),s(l.it,l.it,i*l.ut*e),o(r.nt,r.nt,l.it),r.J=!0,n(l.it,0,0,0)}1!==l.ft[3]&&(F(l.ft,Mt,l.ft,Math.min(1,l.ct/Math.PI*e)),T(r.O,l.ft,r.O),r.J=!0,x(l.ft,0,0,0,1)),1!==l.dt[3]&&(F(l.dt,Mt,l.dt,Math.min(1,l.ct/Math.PI*e)),T(r.O,r.O,l.dt),r.J=!0,x(l.dt,0,0,0,1))}function I(t,i,r){let l=t.i.A[i],h=t.i.vt[i];if(1===h.h){e(h._t,h.gt),s(h.yt,h.yt,r),o(h._t,h._t,h.yt),h._t[1]+=-9.81*r;let t=[0,0,0];s(t,h._t,r),o(l.nt,l.nt,t),l.J=!0,n(h.yt,0,0,0)}}function V(t,i,n){let o=t.i.vt[i];if(2===o.h){let l=[0,0,0];m(l,t.i.A[i].i);let h=[0,0,0];r(h,l,o.wt),s(o._t,h,1/n),e(o.wt,l)}}function k(t,i){let n=t.i.A[i],r=t.i.Mt[i],l=t.i.vt[i];if(1===l.h){l.At=!0;let i=!1;for(let f=0;f<r.H.length;f++){let a=r.H[f];if(256&t.i.xt[a.K]){i=!0,o(n.nt,n.nt,a.N),n.J=!0;let r=t.i.vt[a.K];switch(r.h){case 0:h(xt,a.N),s(xt,xt,-2*u(l._t,xt)),o(l.gt,l._t,xt);break;case 1:case 2:e(l.gt,r._t)}s(l.gt,l.gt,l.Tt),a.N[1]>0&&l.gt[1]<1&&(l.gt[1]=0,l.At=!1)}}i||e(l.gt,l._t)}}function L(t,i){let n=null,e=null;for(let o=0;o<t.i.xt.length;o++)if(640==(640&t.i.xt[o])){let r=t.i.A[o],s=t.i.bt[o];s.Ft!==n&&(n=s.Ft,1===s.h)&&R(t,s.Ft,i),s.St!==e&&(e=s.St,t.$t.frontFace(s.St)),1===s.h&&W(t,r,s)}}function R(t,i,n){t.$t.useProgram(i.Xt),t.$t.uniformMatrix4fv(i.Ct.S,!1,n.S),t.$t.uniform3fv(i.Ct.Pt,n.$),t.$t.uniform4fv(i.Ct.ot,t.ot),t.$t.uniform4fv(i.Ct.rt,t.rt)}function W(t,i,n){t.$t.uniformMatrix4fv(n.Ft.Ct.i,!1,i.i),t.$t.uniformMatrix4fv(n.Ft.Ct.F,!1,i.F),t.$t.uniform4fv(n.Ft.Ct.It,n.It),t.$t.uniform4fv(n.Ft.Ct.Vt,n.Vt),t.$t.uniform1f(n.Ft.Ct.kt,n.kt),t.$t.bindVertexArray(n.Lt),t.$t.drawElements(n.Ft.Rt,n.Bt.Wt,5123,0),t.$t.bindVertexArray(null)}function B(t,i){for(let i=0;i<t.i.xt.length;i++)if(512==(512&t.i.xt[i])){let n=t.i.A[i];n.J&&z(t,i,n)}}function z(t,i,n){if(n.J=!1,t.X&&16&t.i.xt[i]||function(t,i,n,e){let o=i[0],r=i[1],s=i[2],l=i[3],h=o+o,u=r+r,f=s+s,a=o*h,c=o*u,d=o*f,v=r*u,m=r*f,_=s*f,g=l*h,p=l*u,y=l*f,w=e[0],M=e[1],A=e[2];t[0]=(1-(v+_))*w,t[1]=(c+y)*w,t[2]=(d-p)*w,t[3]=0,t[4]=(c-y)*M,t[5]=(1-(a+_))*M,t[6]=(m+g)*M,t[7]=0,t[8]=(d+p)*A,t[9]=(m-g)*A,t[10]=(1-(a+v))*A,t[11]=0,t[12]=n[0],t[13]=n[1],t[14]=n[2],t[15]=1}(n.i,n.O,n.nt,n.j),void 0!==n.ht&&v(n.i,t.i.A[n.ht].i,n.i),d(n.F,n.i),2&t.i.xt[i]){let n=t.i.G[i];for(let e of n.G)if(512&t.i.xt[e]){let n=t.i.A[e];n.ht=i,z(t,e,n)}}}function E(t,...i){return t.reduce(((t,n)=>t+function(t){let i=t.shift();return"boolean"==typeof i||null==i?"":Array.isArray(i)?i.join(""):i}(i)+n))}function Y(...i){return(n,e)=>{let o=[];for(let e of i){let i=t(n,e);o.push(i)}n.i.xt[e]|=2,n.i.G[e]={G:o}}}function H(t=[0,0,0],i=[0,0,0,1],n=[1,1,1]){return(e,o)=>{e.i.xt[o]|=512,e.i.A[o]={i:[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],F:[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],nt:t,O:i,j:n,J:!0}}}function K(t){return(i,n)=>{i.i.xt[n]|=16,i.i.U[n]={h:t}}}function D(t,i,n,e=0,o=[1,1,1,1],r=2304){return(s,l)=>{if(!bt.has(i)){let n=s.$t.createVertexArray();s.$t.bindVertexArray(n),s.$t.bindBuffer(q,i.zt),s.$t.enableVertexAttribArray(t.Ct.Et),s.$t.vertexAttribPointer(t.Ct.Et,3,5126,!1,0,0),s.$t.bindBuffer(q,i.Yt),s.$t.enableVertexAttribArray(t.Ct.Ht),s.$t.vertexAttribPointer(t.Ct.Ht,3,5126,!1,0,0),s.$t.bindBuffer(j,i.Kt),s.$t.bindVertexArray(null),bt.set(i,n)}s.i.xt[l]|=128,s.i.bt[l]={h:1,Ft:t,Bt:i,Dt:n[3]<1?1:0,St:r,Lt:bt.get(i),It:n,Vt:o,kt:e}}}function N(t){return[(t,i)=>{t.i.xt[i]|=8,t.i.Z[i]={h:0}},(t,i)=>{t.i.xt[i]|=64,t.i.tt[i]={ut:2,ct:0,it:[0,0,0],ft:[0,0,0,1],dt:[0,0,0,1]}},Y([H(void 0,[0,1,0,0]),Y([H(),(t,i)=>{t.i.xt[i]|=1,t.i.o[i]={h:1,P:[]}}],[H(),K(0)],[H(),K(1),Y([H(void 0,void 0,[-1,1,1]),D(t.Nt,t.Gt,[1,1,.3,1],0,[1,1,1,1],2305)])],[H(),K(2),Y([H(),D(t.Nt,t.Gt,[1,1,.3,1],0,[1,1,1,1],2304)])])])]}function G(t=[1,1,1],i=1){return(n,e)=>{n.i.xt[e]|=32,n.i.et[e]={h:1,st:t,lt:i**2}}}const U=35044,q=34962,j=34963,O=document.getElementById("update"),J=document.getElementById("delta"),Q=document.getElementById("fps"),Z=1/60;let tt=Float32Array.from([-.5,-.5,.5,-.5,.5,.5,-.5,.5,-.5,-.5,-.5,-.5,-.5,-.5,-.5,-.5,.5,-.5,.5,.5,-.5,.5,-.5,-.5,.5,-.5,-.5,.5,.5,-.5,.5,.5,.5,.5,-.5,.5,.5,-.5,.5,.5,.5,.5,-.5,.5,.5,-.5,-.5,.5,-.5,-.5,-.5,.5,-.5,-.5,.5,-.5,.5,-.5,-.5,.5,.5,.5,-.5,-.5,.5,-.5,-.5,.5,.5,.5,.5,.5]),it=Float32Array.from([-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,0,-1,0,0,-1,0,0,-1,0,0,-1,1,0,0,1,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,1,0,0,1,0,0,1,0,0,1,0]),nt=Float32Array.from([.666667,.333333,.333333,.333333,.333333,0,.666667,0,.333333,.666667,0,.666667,0,.333333,.333333,.333333,.333333,.333333,0,.333333,0,0,.333333,0,.333333,.666667,.333333,.333333,.666667,.333333,.666667,.666667,1,.333333,.666667,.333333,.666667,0,1,0,.333333,.666667,.333333,1,0,1,0,.666667]),et=Float32Array.from([]),ot=Uint16Array.from([23,22,20,22,21,20,19,18,16,18,17,16,15,14,12,14,13,12,11,10,8,10,9,8,7,6,4,6,5,4,3,2,0,2,1,0]),rt=Float32Array.from([-.001385,.0289,.08506,.012262,.02891,.084294,.008816,.03592,-.006425,-.008054,.035631,-.005256,-.008054,.035631,-.005256,.008816,.03592,-.006425,.010208,-.054815,-.008776,-.006663,-.055104,-.007608,-.006663,-.055104,-.007608,.010208,-.054815,-.008776,.012769,-.050857,.082463,-877e-6,-.050867,.083229,-877e-6,-.050867,.083229,.012769,-.050857,.082463,.012262,.02891,.084294,-.001385,.0289,.08506,-.008054,.035631,-.005256,-.006663,-.055104,-.007608,-877e-6,-.050867,.083229,-.001385,.0289,.08506,.010208,-.054815,-.008776,.008816,.03592,-.006425,.012262,.02891,.084294,.012769,-.050857,.082463,-.010561,.034481,-.00819,.005581,.036289,-.012904,-.007908,.039624,-.057817,-.02405,.037816,-.053103,-.02405,.037816,-.053103,-.007908,.039624,-.057817,-.006305,.020333,-.059731,-.022448,.018524,-.055017,-.022448,.018524,-.055017,-.006305,.020333,-.059731,.007184,.016998,-.014818,-.008958,.015189,-.010104,-.008958,.015189,-.010104,.007184,.016998,-.014818,.005581,.036289,-.012904,-.010561,.034481,-.00819,-.02405,.037816,-.053103,-.022448,.018524,-.055017,-.008958,.015189,-.010104,-.010561,.034481,-.00819,-.006305,.020333,-.059731,-.007908,.039624,-.057817,.005581,.036289,-.012904,.007184,.016998,-.014818,-.008492,.008946,-.009729,.007589,.010819,-.014622,-.008373,.012793,-.066324,-.024454,.01092,-.06143,-.024454,.01092,-.06143,-.008373,.012793,-.066324,-.006521,-.006527,-.067633,-.022602,-.0084,-.06274,-.022602,-.0084,-.06274,-.006521,-.006527,-.067633,.009441,-.008501,-.015931,-.006641,-.010374,-.011038,-.006641,-.010374,-.011038,.009441,-.008501,-.015931,.007589,.010819,-.014622,-.008492,.008946,-.009729,-.024454,.01092,-.06143,-.022602,-.0084,-.06274,-.006641,-.010374,-.011038,-.008492,.008946,-.009729,-.006521,-.006527,-.067633,-.008373,.012793,-.066324,.007589,.010819,-.014622,.009441,-.008501,-.015931,-.007242,-.014884,-.010548,.009032,-.014337,-.015124,-.002639,-.013896,-.05658,-.018912,-.014444,-.052005,-.018912,-.014444,-.052005,-.002639,-.013896,-.05658,-.002139,-.03151,-.056908,-.018412,-.032057,-.052333,-.018412,-.032057,-.052333,-.002139,-.03151,-.056908,.009532,-.031951,-.015452,-.006741,-.032498,-.010876,-.006741,-.032498,-.010876,.009532,-.031951,-.015452,.009032,-.014337,-.015124,-.007242,-.014884,-.010548,-.018912,-.014444,-.052005,-.018412,-.032057,-.052333,-.006741,-.032498,-.010876,-.007242,-.014884,-.010548,-.002139,-.03151,-.056908,-.002639,-.013896,-.05658,.009032,-.014337,-.015124,.009532,-.031951,-.015452,-.025175,.037965,-.05345,-.01111,.03996,-.06263,-.033807,.04235,-.096885,-.047871,.040354,-.087705,-.047871,.040354,-.087705,-.033807,.04235,-.096885,-.03251,.023066,-.09909,-.046574,.021071,-.08991,-.046574,.021071,-.08991,-.03251,.023066,-.09909,-.009813,.020677,-.064835,-.023878,.018681,-.055655,-.023878,.018681,-.055655,-.009813,.020677,-.064835,-.01111,.03996,-.06263,-.025175,.037965,-.05345,-.047871,.040354,-.087705,-.046574,.021071,-.08991,-.023878,.018681,-.055655,-.025175,.037965,-.05345,-.03251,.023066,-.09909,-.033807,.04235,-.096885,-.01111,.03996,-.06263,-.009813,.020677,-.064835,-.025824,.011507,-.061474,-.011587,.013391,-.070407,-.034379,.014488,-.106501,-.048617,.012604,-.097568,-.048617,.012604,-.097568,-.034379,.014488,-.106501,-.032811,-.004837,-.108078,-.047049,-.006721,-.099145,-.047049,-.006721,-.099145,-.032811,-.004837,-.108078,-.010019,-.005934,-.071984,-.024257,-.007818,-.063051,-.024257,-.007818,-.063051,-.010019,-.005934,-.071984,-.011587,.013391,-.070407,-.025824,.011507,-.061474,-.048617,.012604,-.097568,-.047049,-.006721,-.099145,-.024257,-.007818,-.063051,-.025824,.011507,-.061474,-.032811,-.004837,-.108078,-.034379,.014488,-.106501,-.011587,.013391,-.070407,-.010019,-.005934,-.071984,-.019676,-.014397,-.052382,-.005143,-.013823,-.061015,-.025188,-.013764,-.094755,-.039721,-.014337,-.086122,-.039721,-.014337,-.086122,-.025188,-.013764,-.094755,-.024684,-.031529,-.095086,-.039217,-.032102,-.086453,-.039217,-.032102,-.086453,-.024684,-.031529,-.095086,-.004639,-.031588,-.061346,-.019171,-.032161,-.052713,-.019171,-.032161,-.052713,-.004639,-.031588,-.061346,-.005143,-.013823,-.061015,-.019676,-.014397,-.052382,-.039721,-.014337,-.086122,-.039217,-.032102,-.086453,-.019171,-.032161,-.052713,-.019676,-.014397,-.052382,-.024684,-.031529,-.095086,-.025188,-.013764,-.094755,-.005143,-.013823,-.061015,-.004639,-.031588,-.061346,-.009989,.051511,.065661,-561e-6,.065343,.064337,-.015486,.071823,.02576,-.024915,.057991,.027085,-.024915,.057991,.027085,-.015486,.071823,.02576,815e-6,.059916,.017453,-.008614,.046083,.018777,-.008614,.046083,.018777,815e-6,.059916,.017453,.015741,.053436,.056029,.006312,.039604,.057354,.006312,.039604,.057354,.015741,.053436,.056029,-561e-6,.065343,.064337,-.009989,.051511,.065661,-.024915,.057991,.027085,-.008614,.046083,.018777,.006312,.039604,.057354,-.009989,.051511,.065661,815e-6,.059916,.017453,-.015486,.071823,.02576,-561e-6,.065343,.064337,.015741,.053436,.056029,-.006725,-.038551,-.010014,.009467,-.038227,-.01489,-.001353,-.039097,-.050876,-.017545,-.039421,-.046,-.017545,-.039421,-.046,-.001353,-.039097,-.050876,-955e-6,-.054994,-.050612,-.017147,-.055318,-.045736,-.017147,-.055318,-.045736,-955e-6,-.054994,-.050612,.009864,-.054125,-.014626,-.006328,-.054449,-.009749,-.006328,-.054449,-.009749,.009864,-.054125,-.014626,.009467,-.038227,-.01489,-.006725,-.038551,-.010014,-.017545,-.039421,-.046,-.017147,-.055318,-.045736,-.006328,-.054449,-.009749,-.006725,-.038551,-.010014,-955e-6,-.054994,-.050612,-.001353,-.039097,-.050876,.009467,-.038227,-.01489,.009864,-.054125,-.014626,-.017719,-.039433,-.047417,-.002918,-.039345,-.055601,-.018668,-.039437,-.084087,-.033469,-.039526,-.075902,-.033469,-.039526,-.075902,-.018668,-.039437,-.084087,-.018572,-.055552,-.084087,-.033373,-.05564,-.075903,-.033373,-.05564,-.075903,-.018572,-.055552,-.084087,-.002821,-.055459,-.055602,-.017623,-.055548,-.047418,-.017623,-.055548,-.047418,-.002821,-.055459,-.055602,-.002918,-.039345,-.055601,-.017719,-.039433,-.047417,-.033469,-.039526,-.075902,-.033373,-.05564,-.075903,-.017623,-.055548,-.047418,-.017719,-.039433,-.047417,-.018572,-.055552,-.084087,-.018668,-.039437,-.084087,-.002918,-.039345,-.055601,-.002821,-.055459,-.055602,-.025987,.058941,.023445,-.01855,.073332,.019022,-.036803,.072894,-.013094,-.04424,.058503,-.008671,-.04424,.058503,-.008671,-.036803,.072894,-.013094,-.020471,.061648,-.022223,-.027908,.047257,-.017799,-.027908,.047257,-.017799,-.020471,.061648,-.022223,-.002218,.062086,.009893,-.009655,.047695,.014317,-.009655,.047695,.014317,-.002218,.062086,.009893,-.01855,.073332,.019022,-.025987,.058941,.023445,-.04424,.058503,-.008671,-.027908,.047257,-.017799,-.009655,.047695,.014317,-.025987,.058941,.023445,-.020471,.061648,-.022223,-.036803,.072894,-.013094,-.01855,.073332,.019022,-.002218,.062086,.009893]),st=Float32Array.from([-.005,.9971,.076,-.005,.9971,.076,-.005,.9971,.076,-.005,.9971,.076,-.0695,.0248,-.9973,-.0695,.0248,-.9973,-.0695,.0248,-.9973,-.0695,.0248,-.9973,.0126,-.9989,.0444,.0126,-.9989,.0444,.0126,-.9989,.0444,.0126,-.9989,.0444,.056,-.0226,.9982,.056,-.0226,.9982,.056,-.0226,.9982,.056,-.0226,.9982,-.9976,-.0128,.0684,-.9976,-.0128,.0684,-.9976,-.0128,.0684,-.9976,-.0128,.0684,.9994,.0119,-.0328,.9994,.0119,-.0328,.9994,.0119,-.0328,.9994,.0119,-.0328,-.0824,.9917,.0984,-.0824,.9917,.0984,-.0824,.9917,.0984,-.0824,.9917,.0984,-.2869,.0709,-.9553,-.2869,.0709,-.9553,-.2869,.0709,-.9553,-.2869,.0709,-.9553,.0824,-.9917,-.0984,.0824,-.9917,-.0984,.0824,-.9917,-.0984,.0824,-.9917,-.0984,.2869,-.0709,.9553,.2869,-.0709,.9553,.2869,-.0709,.9553,.2869,-.0709,.9553,-.9544,-.1069,.2787,-.9544,-.1069,.2787,-.9544,-.1069,.2787,-.9544,-.1069,.2787,.9544,.1069,-.2787,.9544,.1069,-.2787,.9544,.1069,-.2787,.9544,.1069,-.2787,-.0952,.9932,.0673,-.0952,.9932,.0673,-.0952,.9932,.0673,-.0952,.9932,.0673,-.2948,.0365,-.9549,-.2948,.0365,-.9549,-.2948,.0365,-.9549,-.2948,.0365,-.9549,.0952,-.9932,-.0673,.0952,-.9932,-.0673,.0952,-.9932,-.0673,.0952,-.9932,-.0673,.2948,-.0365,.9549,.2948,-.0365,.9549,.2948,-.0365,.9549,.2948,-.0365,.9549,-.9508,-.1107,.2893,-.9508,-.1107,.2893,-.9508,-.1107,.2893,-.9508,-.1107,.2893,.9508,.1107,-.2893,.9508,.1107,-.2893,.9508,.1107,-.2893,.9508,.1107,-.2893,-.0284,.9994,.0186,-.0284,.9994,.0186,-.0284,.9994,.0186,-.0284,.9994,.0186,-.271,.0102,-.9625,-.271,.0102,-.9625,-.271,.0102,-.9625,-.271,.0102,-.9625,.0284,-.9994,-.0186,.0284,-.9994,-.0186,.0284,-.9994,-.0186,.0284,-.9994,-.0186,.271,-.0102,.9625,.271,-.0102,.9625,.271,-.0102,.9625,.271,-.0102,.9625,-.9622,-.0324,.2705,-.9622,-.0324,.2705,-.9622,-.0324,.2705,-.9622,-.0324,.2705,.9622,.0324,-.2705,.9622,.0324,-.2705,.9622,.0324,-.2705,.9622,.0324,-.2705,-.0667,.9913,.1133,-.0667,.9913,.1133,-.0667,.9913,.1133,-.0667,.9913,.1133,-.5514,.0581,-.8322,-.5514,.0581,-.8322,-.5514,.0581,-.8322,-.5514,.0581,-.8322,.0667,-.9913,-.1133,.0667,-.9913,-.1133,.0667,-.9913,-.1133,.0667,-.9913,-.1133,.5514,-.0581,.8322,.5514,-.0581,.8322,.5514,-.0581,.8322,.5514,-.0581,.8322,-.8316,-.118,.5427,-.8316,-.118,.5427,-.8316,-.118,.5427,-.8316,-.118,.5427,.8316,.118,-.5427,.8316,.118,-.5427,.8316,.118,-.5427,.8316,.118,-.5427,-.0806,.9934,.0811,-.0806,.9934,.0811,-.0806,.9934,.0811,-.0806,.9934,.0811,-.5338,.0257,-.8453,-.5338,.0257,-.8453,-.5338,.0257,-.8453,-.5338,.0257,-.8453,.0806,-.9934,-.0811,.0806,-.9934,-.0811,.0806,-.9934,-.0811,.0806,-.9934,-.0811,.5338,-.0257,.8453,.5338,-.0257,.8453,.5338,-.0257,.8453,.5338,-.0257,.8453,-.8418,-.1114,.5282,-.8418,-.1114,.5282,-.8418,-.1114,.5282,-.8418,-.1114,.5282,.8418,.1114,-.5282,.8418,.1114,-.5282,.8418,.1114,-.5282,.8418,.1114,-.5282,-.0284,.9994,.0186,-.0284,.9994,.0186,-.0284,.9994,.0186,-.0284,.9994,.0186,-.5108,.0015,-.8597,-.5108,.0015,-.8597,-.5108,.0015,-.8597,-.5108,.0015,-.8597,.0284,-.9994,-.0186,.0284,-.9994,-.0186,.0284,-.9994,-.0186,.0284,-.9994,-.0186,.5108,-.0015,.8597,.5108,-.0015,.8597,.5108,-.0015,.8597,.5108,-.0015,.8597,-.8592,-.0339,.5104,-.8592,-.0339,.5104,-.8592,-.0339,.5104,-.8592,-.0339,.5104,.8592,.0339,-.5104,.8592,.0339,-.5104,.8592,.0339,-.5104,.8592,.0339,-.5104,-.7468,.5455,.3806,-.7468,.5455,.3806,-.7468,.5455,.3806,-.7468,.5455,.3806,-.3565,.1548,-.9214,-.3565,.1548,-.9214,-.3565,.1548,-.9214,-.3565,.1548,-.9214,.7468,-.5455,-.3806,.7468,-.5455,-.3806,.7468,-.5455,-.3806,.7468,-.5455,-.3806,.3565,-.1548,.9214,.3565,-.1548,.9214,.3565,-.1548,.9214,.3565,-.1548,.9214,-.5615,-.8237,.0789,-.5615,-.8237,.0789,-.5615,-.8237,.0789,-.5615,-.8237,.0789,.5615,.8237,-.0789,.5615,.8237,-.0789,.5615,.8237,-.0789,.5615,.8237,-.0789,-.025,.9995,-.0166,-.025,.9995,-.0166,-.025,.9995,-.0166,-.025,.9995,-.0166,-.2879,-.0231,-.9574,-.2879,-.0231,-.9574,-.2879,-.0231,-.9574,-.2879,-.0231,-.9574,.025,-.9995,.0166,.025,-.9995,.0166,.025,-.9995,.0166,.025,-.9995,.0166,.2879,.0231,.9574,.2879,.0231,.9574,.2879,.0231,.9574,.2879,.0231,.9574,-.9573,-.0191,.2883,-.9573,-.0191,.2883,-.9573,-.0191,.2883,-.9573,-.0191,.2883,.9573,.0191,-.2883,.9573,.0191,-.2883,.9573,.0191,-.2883,.9573,.0191,-.2883,-.006,1,1e-4,-.006,1,1e-4,-.006,1,1e-4,-.006,1,1e-4,-.4839,-.0028,-.8751,-.4839,-.0028,-.8751,-.4839,-.0028,-.8751,-.4839,-.0028,-.8751,.006,-1,-1e-4,.006,-1,-1e-4,.006,-1,-1e-4,.006,-1,-1e-4,.4839,.0028,.8751,.4839,.0028,.8751,.4839,.0028,.8751,.4839,.0028,.8751,-.8751,-.0052,.4839,-.8751,-.0052,.4839,-.8751,-.0052,.4839,-.8751,-.0052,.4839,.8751,.0052,-.4839,.8751,.0052,-.4839,.8751,.0052,-.4839,.8751,.0052,-.4839,-.7482,.5152,.4182,-.7482,.5152,.4182,-.7482,.5152,.4182,-.7482,.5152,.4182,-.4941,-.0119,-.8693,-.4941,-.0119,-.8693,-.4941,-.0119,-.8693,-.4941,-.0119,-.8693,.7482,-.5152,-.4182,.7482,-.5152,-.4182,.7482,-.5152,-.4182,.7482,-.5152,-.4182,.4941,.0119,.8693,.4941,.0119,.8693,.4941,.0119,.8693,.4941,.0119,.8693,-.4429,-.857,.2634,-.4429,-.857,.2634,-.4429,-.857,.2634,-.4429,-.857,.2634,.4429,.857,-.2634,.4429,.857,-.2634,.4429,.857,-.2634,.4429,.857,-.2634]),lt=Float32Array.from([.375,0,.625,0,.625,.25,.375,.25,.375,.25,.625,.25,.625,.5,.375,.5,.375,.5,.625,.5,.625,.75,.375,.75,.375,.75,.625,.75,.625,1,.375,1,.125,.5,.375,.5,.375,.75,.125,.75,.625,.5,.875,.5,.875,.75,.625,.75,.375,0,.625,0,.625,.25,.375,.25,.375,.25,.625,.25,.625,.5,.375,.5,.375,.5,.625,.5,.625,.75,.375,.75,.375,.75,.625,.75,.625,1,.375,1,.125,.5,.375,.5,.375,.75,.125,.75,.625,.5,.875,.5,.875,.75,.625,.75,.375,0,.625,0,.625,.25,.375,.25,.375,.25,.625,.25,.625,.5,.375,.5,.375,.5,.625,.5,.625,.75,.375,.75,.375,.75,.625,.75,.625,1,.375,1,.125,.5,.375,.5,.375,.75,.125,.75,.625,.5,.875,.5,.875,.75,.625,.75,.375,0,.625,0,.625,.25,.375,.25,.375,.25,.625,.25,.625,.5,.375,.5,.375,.5,.625,.5,.625,.75,.375,.75,.375,.75,.625,.75,.625,1,.375,1,.125,.5,.375,.5,.375,.75,.125,.75,.625,.5,.875,.5,.875,.75,.625,.75,.375,0,.625,0,.625,.25,.375,.25,.375,.25,.625,.25,.625,.5,.375,.5,.375,.5,.625,.5,.625,.75,.375,.75,.375,.75,.625,.75,.625,1,.375,1,.125,.5,.375,.5,.375,.75,.125,.75,.625,.5,.875,.5,.875,.75,.625,.75,.375,0,.625,0,.625,.25,.375,.25,.375,.25,.625,.25,.625,.5,.375,.5,.375,.5,.625,.5,.625,.75,.375,.75,.375,.75,.625,.75,.625,1,.375,1,.125,.5,.375,.5,.375,.75,.125,.75,.625,.5,.875,.5,.875,.75,.625,.75,.375,0,.625,0,.625,.25,.375,.25,.375,.25,.625,.25,.625,.5,.375,.5,.375,.5,.625,.5,.625,.75,.375,.75,.375,.75,.625,.75,.625,1,.375,1,.125,.5,.375,.5,.375,.75,.125,.75,.625,.5,.875,.5,.875,.75,.625,.75,.375,0,.625,0,.625,.25,.375,.25,.375,.25,.625,.25,.625,.5,.375,.5,.375,.5,.625,.5,.625,.75,.375,.75,.375,.75,.625,.75,.625,1,.375,1,.125,.5,.375,.5,.375,.75,.125,.75,.625,.5,.875,.5,.875,.75,.625,.75,.375,0,.625,0,.625,.25,.375,.25,.375,.25,.625,.25,.625,.5,.375,.5,.375,.5,.625,.5,.625,.75,.375,.75,.375,.75,.625,.75,.625,1,.375,1,.125,.5,.375,.5,.375,.75,.125,.75,.625,.5,.875,.5,.875,.75,.625,.75,.375,0,.625,0,.625,.25,.375,.25,.375,.25,.625,.25,.625,.5,.375,.5,.375,.5,.625,.5,.625,.75,.375,.75,.375,.75,.625,.75,.625,1,.375,1,.125,.5,.375,.5,.375,.75,.125,.75,.625,.5,.875,.5,.875,.75,.625,.75,.375,0,.625,0,.625,.25,.375,.25,.375,.25,.625,.25,.625,.5,.375,.5,.375,.5,.625,.5,.625,.75,.375,.75,.375,.75,.625,.75,.625,1,.375,1,.125,.5,.375,.5,.375,.75,.125,.75,.625,.5,.875,.5,.875,.75,.625,.75]),ht=Float32Array.from([]),ut=Uint16Array.from([263,262,260,262,261,260,259,258,256,258,257,256,255,254,252,254,253,252,251,250,248,250,249,248,247,246,244,246,245,244,243,242,240,242,241,240,239,238,236,238,237,236,235,234,232,234,233,232,231,230,228,230,229,228,227,226,224,226,225,224,223,222,220,222,221,220,219,218,216,218,217,216,215,214,212,214,213,212,211,210,208,210,209,208,207,206,204,206,205,204,203,202,200,202,201,200,199,198,196,198,197,196,195,194,192,194,193,192,191,190,188,190,189,188,187,186,184,186,185,184,183,182,180,182,181,180,179,178,176,178,177,176,175,174,172,174,173,172,171,170,168,170,169,168,167,166,164,166,165,164,163,162,160,162,161,160,159,158,156,158,157,156,155,154,152,154,153,152,151,150,148,150,149,148,147,146,144,146,145,144,143,142,140,142,141,140,139,138,136,138,137,136,135,134,132,134,133,132,131,130,128,130,129,128,127,126,124,126,125,124,123,122,120,122,121,120,119,118,116,118,117,116,115,114,112,114,113,112,111,110,108,110,109,108,107,106,104,106,105,104,103,102,100,102,101,100,99,98,96,98,97,96,95,94,92,94,93,92,91,90,88,90,89,88,87,86,84,86,85,84,83,82,80,82,81,80,79,78,76,78,77,76,75,74,72,74,73,72,71,70,68,70,69,68,67,66,64,66,65,64,63,62,60,62,61,60,59,58,56,58,57,56,55,54,52,54,53,52,51,50,48,50,49,48,47,46,44,46,45,44,43,42,40,42,41,40,39,38,36,38,37,36,35,34,32,34,33,32,31,30,28,30,29,28,27,26,24,26,25,24,23,22,20,22,21,20,19,18,16,18,17,16,15,14,12,14,13,12,11,10,8,10,9,8,7,6,4,6,5,4,3,2,0,2,1,0]);const ft=[[.5,.5,.5],[.5,.5,-.5],[-.5,.5,-.5],[-.5,.5,.5],[.5,-.5,.5],[.5,-.5,-.5],[-.5,-.5,-.5],[-.5,-.5,.5]],at=[0,1,0];let ct=!1,dt=[0,0,0],vt=[0,0,0],mt=[0,0,0],_t=!1,gt=[0,0,0],pt=[0,0,0],yt=[0,0,0],wt=[0,0,0];const Mt=[0,0,0,1];let At,xt=[0,0,0];class Tt extends class{constructor(t=1e4){this.xt=[],this.Ut=[],this.qt=t}t(){return this.Ut.length>0?this.Ut.pop():this.xt.push(0)-1}jt(t){this.xt[t]=0,this.Ut.push(t)}}{constructor(){super(...arguments),this.o=[],this.G=[],this.Mt=[],this.Z=[],this.U=[],this.et=[],this.tt=[],this.bt=[],this.vt=[],this.A=[]}}const bt=new WeakMap;let Ft=new class extends class extends class{constructor(){this.Ot=0,this.Jt=0,this.v=window.innerWidth,this.m=window.innerHeight,this.l=!0,this.Qt={MouseX:0,MouseY:0},this.Zt={MouseX:0,MouseY:0},this.ti={Mouse:0,Mouse0:0,Mouse1:0,Mouse2:0,Touch0:0,Touch1:0},this.ii={},this.ni=document.querySelector("main"),document.addEventListener("visibilitychange",(()=>document.hidden?this.ei():this.oi())),this.ni.addEventListener("contextmenu",(t=>t.preventDefault())),this.ni.addEventListener("mousedown",(t=>{this.Qt["Mouse"+t.button]=1,this.Zt["Mouse"+t.button]=1})),this.ni.addEventListener("mouseup",(t=>{this.Qt["Mouse"+t.button]=0,this.Zt["Mouse"+t.button]=-1})),this.ni.addEventListener("mousemove",(t=>{this.Qt.MouseX=t.clientX,this.Qt.MouseY=t.clientY,this.Zt.MouseX=t.movementX,this.Zt.MouseY=t.movementY})),this.ni.addEventListener("wheel",(t=>{t.preventDefault(),this.Zt.WheelY=t.deltaY})),this.ni.addEventListener("touchstart",(t=>{t.target===this.ni&&t.preventDefault(),1===t.touches.length&&(this.ii={});for(let i=0;i<t.touches.length;i++)this.ii[t.touches[i].identifier]=i;for(let i=0;i<t.changedTouches.length;i++){let n=t.changedTouches[i],e=this.ii[n.identifier];this.Qt["Touch"+e]=1,this.Qt[`Touch${e}X`]=n.clientX,this.Qt[`Touch${e}Y`]=n.clientY,this.Zt["Touch"+e]=1,this.Zt[`Touch${e}X`]=0,this.Zt[`Touch${e}Y`]=0}})),this.ni.addEventListener("touchmove",(t=>{t.target===this.ni&&t.preventDefault();for(let i=0;i<t.changedTouches.length;i++){let n=t.changedTouches[i],e=this.ii[n.identifier];this.Zt[`Touch${e}X`]=n.clientX-this.Qt[`Touch${e}X`],this.Zt[`Touch${e}Y`]=n.clientY-this.Qt[`Touch${e}Y`],this.Qt[`Touch${e}X`]=n.clientX,this.Qt[`Touch${e}Y`]=n.clientY}})),this.ni.addEventListener("touchend",(t=>{t.target===this.ni&&t.preventDefault();for(let i=0;i<t.changedTouches.length;i++){let n=this.ii[t.changedTouches[i].identifier];this.Qt["Touch"+n]=0,this.Zt["Touch"+n]=-1}})),this.ni.addEventListener("touchcancel",(t=>{for(let i=0;i<t.changedTouches.length;i++){let n=this.ii[t.changedTouches[i].identifier];this.Qt["Touch"+n]=0,this.Zt["Touch"+n]=-1}})),window.addEventListener("keydown",(t=>{t.repeat||(this.Qt[t.code]=1,this.Zt[t.code]=1)})),window.addEventListener("keyup",(t=>{this.Qt[t.code]=0,this.Zt[t.code]=-1}))}oi(){let t=0,i=performance.now(),n=e=>{let o=(e-i)/1e3;for(this.ri(o),t+=o;t>=Z;)t-=Z,this.si(Z);this.li(o),this.hi(o),i=e,this.Ot=requestAnimationFrame(n)};this.ei(),n(i)}ei(){cancelAnimationFrame(this.Ot),this.Ot=0}ri(t){this.Jt=performance.now();let i=Math.abs(this.Zt.MouseX)+Math.abs(this.Zt.MouseY);this.ti.Mouse+=i,1===this.Qt.Mouse0&&(this.ti.Mouse0+=i),1===this.Qt.Mouse1&&(this.ti.Mouse1+=i),1===this.Qt.Mouse2&&(this.ti.Mouse2+=i),1===this.Qt.Touch0&&(this.ti.Touch0+=Math.abs(this.Zt.Touch0X)+Math.abs(this.Zt.Touch0Y)),1===this.Qt.Touch1&&(this.ti.Touch1+=Math.abs(this.Zt.Touch1X)+Math.abs(this.Zt.Touch1Y))}si(t){}li(t){}hi(t){this.l=!1,-1===this.Zt.Mouse0&&(this.ti.Mouse0=0),-1===this.Zt.Mouse1&&(this.ti.Mouse1=0),-1===this.Zt.Mouse2&&(this.ti.Mouse2=0),-1===this.Zt.Touch0&&(this.ti.Touch0=0),-1===this.Zt.Touch1&&(this.ti.Touch1=0);for(let t in this.Zt)this.Zt[t]=0;let i=performance.now()-this.Jt;O&&(O.textContent=i.toFixed(1)),J&&(J.textContent=(1e3*t).toFixed(1)),Q&&(Q.textContent=(1/t).toFixed())}}{constructor(){super(),this.ui=document.querySelector("#billboard"),this.fi=this.ui.getContext("2d"),this.ai=document.querySelector("#scene"),this.$t=this.ai.getContext("webgl2"),this.Audio=new AudioContext,this.$t.enable(2929),this.$t.enable(2884),this.$t.blendFunc(770,771)}}{constructor(){super(),this.i=new Tt,this.ci=!1,this.q={},this.Nt=function(t){let n=function(t,n,e){let o=t.createProgram();if(t.attachShader(o,i(t,35633,"#version 300 es\n\n\n\nconst int MAX_LIGHTS = 8;\n\nuniform mat4 pv;\nuniform mat4 world;\nuniform mat4 self;\nuniform vec3 eye;\nuniform vec4 diffuse_color;\nuniform vec4 specular_color;\nuniform float shininess;\nuniform vec4 light_positions[MAX_LIGHTS];\nuniform vec4 light_details[MAX_LIGHTS];\n\nin vec4 attr_position;\nin vec3 attr_normal;\n\nout vec4 vert_color;\n\nvoid main() {\nvec4 vert_position = world * attr_position;\nvec3 vert_normal = normalize((vec4(attr_normal, 0.0) * self).xyz);\ngl_Position = pv * vert_position;\n\nvec3 view_dir = eye - vert_position.xyz;\nvec3 view_normal = normalize(view_dir);\n\n\nvec3 light_acc = diffuse_color.rgb * 0.1;\n\nfor (int i = 0; i < MAX_LIGHTS; i++) {\nif (light_positions[i].w == 0.0) {\nbreak;\n}\n\nvec3 light_color = light_details[i].rgb;\nfloat light_intensity = light_details[i].a;\n\nvec3 light_normal;\nif (light_positions[i].w == 1.0) {\n\nlight_normal = light_positions[i].xyz;\n} else {\nvec3 light_dir = light_positions[i].xyz - vert_position.xyz;\nfloat light_dist = length(light_dir);\nlight_normal = light_dir / light_dist;\n\nlight_intensity /= (light_dist * light_dist);\n}\n\nfloat diffuse_factor = dot(vert_normal, light_normal);\nif (diffuse_factor > 0.0) {\n\nlight_acc += diffuse_color.rgb * diffuse_factor * light_color * light_intensity;\n\nif (shininess > 0.0) {\n\nvec3 h = normalize(light_normal + view_normal);\nfloat specular_angle = max(dot(h, vert_normal), 0.0);\nfloat specular_factor = pow(specular_angle, shininess);\n\n\nlight_acc += specular_color.rgb * specular_factor * light_color * light_intensity;\n}\n}\n}\n\nvert_color = vec4(light_acc, diffuse_color.a);\n}\n")),t.attachShader(o,i(t,35632,"#version 300 es\n\nprecision mediump float;\n\nin vec4 vert_color;\n\nout vec4 frag_color;\n\nvoid main() {\nfrag_color = vert_color;\n}\n")),t.linkProgram(o),!t.getProgramParameter(o,35714))throw Error(t.getProgramInfoLog(o));return o}(t);return{Rt:4,Xt:n,Ct:{S:t.getUniformLocation(n,"pv"),i:t.getUniformLocation(n,"world"),F:t.getUniformLocation(n,"self"),It:t.getUniformLocation(n,"diffuse_color"),Vt:t.getUniformLocation(n,"specular_color"),kt:t.getUniformLocation(n,"shininess"),Pt:t.getUniformLocation(n,"eye"),ot:t.getUniformLocation(n,"light_positions"),rt:t.getUniformLocation(n,"light_details"),Et:t.getAttribLocation(n,"attr_position"),Ht:t.getAttribLocation(n,"attr_normal")}}}(this.$t),this.di=function(t){let i=t.createBuffer();t.bindBuffer(q,i),t.bufferData(q,tt,U);let n=t.createBuffer();t.bindBuffer(q,n),t.bufferData(q,it,U);let e=t.createBuffer();t.bindBuffer(q,e),t.bufferData(q,nt,U);let o=t.createBuffer();t.bindBuffer(q,o),t.bufferData(q,et,U);let r=t.createBuffer();return t.bindBuffer(j,r),t.bufferData(j,ot,U),{zt:i,vi:tt,Yt:n,mi:it,_i:e,gi:nt,pi:o,yi:et,Kt:r,wi:ot,Wt:ot.length}}(this.$t),this.Gt=function(t){let i=t.createBuffer();t.bindBuffer(q,i),t.bufferData(q,rt,U);let n=t.createBuffer();t.bindBuffer(q,n),t.bufferData(q,st,U);let e=t.createBuffer();t.bindBuffer(q,e),t.bufferData(q,lt,U);let o=t.createBuffer();t.bindBuffer(q,o),t.bufferData(q,ht,U);let r=t.createBuffer();return t.bindBuffer(j,r),t.bufferData(j,ut,U),{zt:i,vi:rt,Yt:n,mi:st,_i:e,gi:lt,pi:o,yi:ht,Kt:r,wi:ut,Wt:ut.length}}(this.$t),this.ot=new Float32Array(32),this.rt=new Float32Array(32),navigator.xr&&async function(t){await t.$t.makeXRCompatible(),t.ci=await navigator.xr.isSessionSupported("immersive-vr")}(this)}oi(){let t=performance.now(),i=(n,e)=>{let o=(n-t)/1e3;t=n,e?(this.X=e,this.Ot=this.X.session.requestAnimationFrame(i)):(this.X=void 0,this.Ot=requestAnimationFrame(i)),this.ri(o),this.li(o),this.hi(o)};this.Ot=this.Mi?this.Mi.requestAnimationFrame(i):requestAnimationFrame(i)}ei(){this.Mi?this.Mi.cancelAnimationFrame(this.Ot):cancelAnimationFrame(this.Ot),this.Ot=0}ri(t){if(super.ri(t),this.X){this.q={};for(let t of this.X.session.inputSources)t.gripSpace&&(this.q[t.handedness]=t)}}li(t){!function(t,i){if(t.X)for(let i=0;i<t.i.xt.length;i++)528==(528&t.i.xt[i])&&X(t,i)}(this),function(t,i){if(t.X)for(let i=0;i<t.i.xt.length;i++)530==(530&t.i.xt[i])&&S(t,i)}(this),function(t,i){if(t.X)for(let i=0;i<t.i.xt.length;i++)520==(520&t.i.xt[i])&&$(t,i)}(this),function(t,i){for(let n=0;n<t.i.xt.length;n++)576==(576&t.i.xt[n])&&P(t,n,i)}(this,t),function(t,i){for(let n=0;n<t.i.xt.length;n++)768==(768&t.i.xt[n])&&I(t,n,i)}(this,t),B(this),function(t,i){for(let n=0;n<t.i.xt.length;n++)768==(768&t.i.xt[n])&&V(t,n,i)}(this,t),function(t,i){let n=[],e=[];for(let i=0;i<t.i.xt.length;i++)if(516==(516&t.i.xt[i])){let o=t.i.A[i],r=t.i.Mt[i];r.H=[],r.Ai?(r.Ai=!1,p(o.i,r)):r.xi?(p(o.i,r),e.push(r)):n.push(r)}for(let t=0;t<e.length;t++)M(e[t],n,n.length),M(e[t],e,t)}(this),function(t,i){for(let i=0;i<t.i.xt.length;i++)772==(772&t.i.xt[i])&&k(t,i)}(this),B(this),function(t,i){t.v==window.innerWidth&&t.m==window.innerHeight||(t.l=!0),t.l&&(t.v=t.ai.width=t.ui.width=window.innerWidth,t.m=t.ai.height=t.ui.height=window.innerHeight)}(this),function(t,i){t.o=void 0;for(let i=0;i<t.i.xt.length;i++)if(513==(513&t.i.xt[i])){let n=t.i.o[i];if(1===n.h&&t.X)return void g(t,i,n);if(0===n.h&&!t.X)return void _(t,i,n)}}(this),function(t,i){t.ot.fill(0),t.rt.fill(0);let n=0;for(let i=0;i<t.i.xt.length;i++)544==(544&t.i.xt[i])&&C(t,i,n++)}(this),function(t,i){let n=t.i.o[t.o];1===n.h?function(t,i){let n=t.X.session.renderState.baseLayer;t.$t.bindFramebuffer(36160,n.framebuffer),t.$t.clear(16640);for(let e of i.P){let i=n.getViewport(e.I);t.$t.viewport(i.x,i.y,i.width,i.height),L(t,e)}}(t,n):function(t,i){t.$t.bindFramebuffer(36160,null),t.$t.clear(16640),t.l&&t.$t.viewport(0,0,t.v,t.m),L(t,i)}(t,n)}(this),function(t,i){let n=function(t){return E` <div>${function(t){return E`
<div
style="
position: absolute;
bottom: 1vmin;
right: 1vmin;
background: #000;
color: #fff;
font: 13px Arial;
"
>
${t.X?E`
<button
onclick="$(${1})"
style="
padding: 1vmin;
background: #000;
color: #fff;
border: none;
"
>
Exit VR
</button>
`:window.isSecureContext?navigator.xr?t.ci?E`
<button
onclick="$(${0})"
style="
padding: 1vmin;
background: #000;
color: #fff;
border: none;
"
>
Enter VR
</button>
`:'<div style="padding: 1vmin">WebXR headset not found</div>':'<div style="padding: 1vmin">WebXR not supported</div>':'<div style="padding: 1vmin">WebXR requires HTTPS</div>'}
</div>
`}(t)}</div> `}(t);n!==At&&(t.ni.innerHTML=At=n)}(this)}};!function(i){i.i=new Tt,i.o=void 0,i.l=!0,i.$t.clearColor(.9,.9,.9,1),t(i,[Y([H(void 0,[0,1,0,0]),(t,i)=>{t.i.xt[i]|=1,t.i.o[i]={h:0,u:{h:0,_:1,g:.1,p:1e3,u:[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],M:[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]},T:[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],S:[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],$:[0,0,0]}}]),H([1,2,5],[0,1,0,0])]),t(i,[...N(i),H([1,2,5],[0,1,0,0])]),t(i,[H([2,4,3]),G([1,1,1],1)]),t(i,[H(void 0,void 0,[7,1,7]),D(i.Nt,i.di,[1,1,.3,1])]),t(i,[H([0,1,0]),D(i.Nt,i.di,[1,1,.3,1])])}(Ft),Ft.oi(),window.$=function(t,i,n){switch(i){case 0:t.ci&&async function(t){let i=await navigator.xr.requestSession("immersive-vr");i.updateRenderState({baseLayer:new XRWebGLLayer(i,t.$t)}),t.C=await i.requestReferenceSpace("local"),t.ei(),t.Mi=i,t.oi(),t.Mi.addEventListener("end",(()=>{t.ei(),t.Mi=void 0,t.C=void 0,t.X=void 0,t.l=!0,t.oi()}))}(t);break;case 1:t.X&&t.X.session.end()}}.bind(null,Ft),window.game=Ft}();
