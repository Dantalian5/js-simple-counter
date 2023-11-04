let e,t;// Variables for DOM manipulation;
const n=document.getElementById("js-hamburguerMenu"),c=document.getElementById("js-inputCounter"),l=document.getElementById("js-watchMinutero"),s=document.getElementById("js-watchSegundero"),d=document.getElementById("js-buttonPlus"),u=document.getElementById("js-buttonMinus"),a=document.getElementById("js-buttonPlay"),i=document.getElementById("js-buttonPause"),r=document.getElementById("js-buttonReset"),o=document.getElementById("js-resetData"),m=document.getElementById("js-cycleCheck"),E=document.getElementById("js-pauseCheck"),g=document.getElementById("js-cycleTime"),I=document.getElementById("js-workTime"),v=document.getElementById("js-pauseTime");// Variables for Script manipulation;
let y=0,j=0,B=60,k=!1,h=0,b=0,L=0;// value of the counter input
function T(){k=!1,clearInterval(e),clearInterval(t),B=60,M(0,!0),f("-",60)}function f(e,t){"-"!=e&&l.setAttribute("style","--i:"+e),"-"!=t&&s.setAttribute("style","--i:"+t)}function x(e,t,n,c=!1){h=+h+e,b=+b+t,console.log(L=+L+n),g.innerText=p(+h),I.innerText=p(Math.floor(+b/60))+":"+p(+b%60),v.innerText=p(Math.floor(+L/60))+":"+p(+L%60)}// function for updating input value on DOM & internal value using -1, 0, +1 as step values;
function M(e=0,t=!1){let n;n=t?j:+c.value+e,c.value=p(n,60),f(y=+c.value,"-")}function p(e,t=99){switch(!0){case e<0||""==e:e=0;case e<10:e="0"+e;break;case e>t:e=t}return e}// hamburguer menu function;
n.addEventListener("click",e=>{n.classList.toggle("active")}),document.addEventListener("click",e=>{null===e.target.closest("#js-hamburguerMenu")&&null===e.target.closest("#js-menuItems")&&n.classList.remove("active")}),// timer function;
// DOM manipulation: eventListeners if controls buttons;
c.addEventListener("input",e=>{M(0),k||(j=y)}),d.addEventListener("click",e=>{M(1),k||(j=y)}),u.addEventListener("click",e=>{M(-1),k||(j=y)}),a.addEventListener("click",n=>{k||0==y||(k=!0,clearInterval(t),e=setInterval(function(){switch(--B,!0){case 0==y:m.checked?(M(0,!0),x(1,1,0)):(T(),document.getElementById("tone").play(),alert("Time Over!"));break;case 0==B:B=60,M(-1)}//setMarkers(watchSegundero, segundero);
f("-",B)},1e3))}),i.addEventListener("click",n=>{k&&(k=!1,clearInterval(e),E.checked&&(t=setInterval(function(){x(0,0,1)},6e4)))}),r.addEventListener("click",e=>{T()}),o.addEventListener("click",e=>{h=0,b=0,L=0,g.innerText="--",I.innerText="--:--",v.innerText="--:--"});//todo: minimize script, collapse internal function and create more readable structure
//todo: add theme feacture
//todo: add help to the page
//todo: fix opengraph, (help on vercel)
//# sourceMappingURL=script.44a81967.js.map

//# sourceMappingURL=script.44a81967.js.map
