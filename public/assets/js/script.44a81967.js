let e,t,n;// Variables for DOM manipulation;
const c=document.getElementById("js-hamburguerMenu"),l=document.querySelectorAll(".js-themeButton"),d=document.getElementById("js-inputCounter"),s=document.getElementById("js-watchMinutero"),u=document.getElementById("js-watchSegundero"),o=document.getElementById("js-buttonPlus"),a=document.getElementById("js-buttonMinus"),m=document.getElementById("js-buttonPlay"),r=document.getElementById("js-buttonPause"),i=document.getElementById("js-buttonReset"),g=document.getElementById("js-resetData"),E=document.getElementById("js-cycleCheck"),I=document.getElementById("js-pauseCheck"),v=document.getElementById("js-soundCheck"),y=document.getElementById("js-cycleTime"),h=document.getElementById("js-workTime"),j=document.getElementById("js-pauseTime");// Variables for Script manipulation;
let B=0,k=0,f=60,b=!1,L=0,T=0,x=0;// value of the counter input
function M(e){document.body.className=e,localStorage.setItem("theme",e)}//-Functions-
//--Watch Manipulation Functions--
function p(e=0,t=!1){// function for updating input value on DOM & internal value using -1, 0, +1 as step values;
// if oldValue=true, then take that value;
let n=t?k:+d.value+e;d.value=S(n,60),w(B=+d.value,"-")}function w(e,t){"-"!=e&&s.setAttribute("style","--i:"+e),"-"!=t&&u.setAttribute("style","--i:"+t)}function A(){// this de reset function that reset all status to their default, except de old value
b=!1,clearInterval(e),clearInterval(t),f=60,p(0,!0),w("-",60)}//--Data manipulation functions--
function C(e,t,n){// this function update all possibles data input from the watch
L=+L+e,T=+T+t,x=+x+n,y.innerText=S(+L),h.innerText=S(Math.floor(+T/60))+":"+S(+T%60),j.innerText=S(Math.floor(+x/60))+":"+S(+x%60)}//--Functionalities Functions--
function S(e,t=99){return e<0||""==e?e="00":e<10?e="0"+e:e>t&&(e=t),e}//-DOM manipulation: eventListeners if controls buttons;-
o.addEventListener("click",e=>{p(1),k=b?k:B}),a.addEventListener("click",e=>{p(-1),k=b?k:B}),d.addEventListener("input",e=>{p(0),k=b?k:B}),m.addEventListener("click",n=>{b||0==B||(// This function is responsible for running the timer
b=!0,clearInterval(t),e=setInterval(function(){switch(// Decrease the countdown timer by 1 second
--f,!0){case 0==B:E.checked?(// Update the value counter and data
p(0,!0),C(1,1,0)):(A(),function(){// Deploy an alert when timer is zero, and use a sound if requested
if(v.checked){var e=document.getElementById("tone");e.play(),e.onended=function(){alert("Time Over!")}}else alert("Time Over!")}//# sourceMappingURL=script.44a81967.js.map
());break;case 0==f:// Reset the countdown timer to 60 seconds and update the value counter
f=60,p(-1)}// Update the displayed time
w("-",f)},1e3))}),r.addEventListener("click",n=>{b&&(// this is the pause function, that pause the timer, and, counts the paused time
b=!1,clearInterval(e),I.checked&&(t=setInterval(function(){C(0,0,1)},6e4)))}),i.addEventListener("click",e=>{A()}),g.addEventListener("click",e=>{L=0,T=0,x=0,y.innerText="--",h.innerText="--:--",j.innerText="--:--"}),//-Hamburger Menu EventListeners-
c.addEventListener("click",e=>{//open and close the menu
c.classList.toggle("active")}),document.addEventListener("click",e=>{// if clicked outside the menu, close the menu
null===e.target.closest("#js-hamburguerMenu")&&null===e.target.closest("#js-menuItems")&&c.classList.remove("active")}),//-Theme manipulation EventListeners & Functions-
l.forEach(e=>{e.addEventListener("click",t=>{M(e.getAttribute("data-theme"))})}),"theme-ocean"!=(n=localStorage.getItem("theme"))&&"theme-sunset"!=n&&(n="theme-desert"),M(n);
//# sourceMappingURL=script.44a81967.js.map
