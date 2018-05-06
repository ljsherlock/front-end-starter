"use strict";define("utils/util",[],function(){window,document,document.documentElement,document.getElementsByTagName("body")[0],window.innerWidth,window.innerHeight;return{isArray:function(e){return"[object Array]"===Object.prototype.toString.call(e)},isFunction:function(e){return"[object Function]"===Object.prototype.toString.call(e)},makeArray:function(e){return null!=e.length?Array.prototype.slice.call(e,0).filter(function(e){return void 0!==e}):[]},set_cookie:function(e,n){var t=new Date;t.setTime(t.getTime()+864e6);var o=t.toUTCString();document.cookie=e+"="+encodeURI(n)+"; expires="+o+"; path=/"},hasCookie:function(e){if(this.getCookie(e))return!0},getCookie:function(e){if(this.hasCookie(e)){var n="; "+document.cookie,t=n.split("; "+e+"=");if(2==t.length)return t.pop().split(";").shift()}return!1},delete_cookie:function(e){return this.hasCookie(e)&&(document.cookie=e+"=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"),!1},supportSVG:function(){return!(!document.createElementNS||!document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect)},generate_id:function(e){var n="0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split(""),t="";e||(e=Math.floor(Math.random()*n.length));for(var o=0;o<e;o++)t+=n[Math.floor(Math.random()*n.length)];return t},fitToWindow:function(e){var n=this.d.querySelector(e),t=this.w.innerHeight;n&&(n.style.height=t+"px")},fullscreen:function(e){this.fitToWindow(e),window.onresize=function(){this.fitToWindow(e)}},dekstop_nav__hide:function(){function e(){var e=$(window).scrollTop();Math.abs(t-e)<=o||(0==e?($("header").removeClass("header--hide-it"),$("header").removeClass("header--fixed"),$("header").find(".nav__menu").addClass("flex-row__flex-col--center").removeClass("flex-row__flex-col--centered")):e>t&&e>0?($("header").addClass("header--hide-it").removeClass("header--fixed"),$("header").find(".nav__menu").addClass("flex-row__flex-col--centered").removeClass("flex-row__flex-col--center")):e+$(window).height()<i?$("header").removeClass("header--hide-it"):($("header").removeClass("header--hide-it"),$("header").addClass("header--fixed")),t=e)}var n,t=0,o=5,i=$("header nav#mainMenu").outerHeight();$(window).scroll(function(e){n=!0}),setInterval(function(){n&&(e(),n=!1)},250)},loadScript:function(e,n){var t=document.createElement("script");t.src=e,t.onload=function(){n()},t.onerror=function(){n(new Error("Failed to load script "+e))},document.head.appendChild(t)},param:function(e){var n="";for(var t in e)e.hasOwnProperty(t)&&(n.length>0&&(n+="&"),n+=encodeURI(t+"="+e[t]));return n},perf:function(){var e=function(e){window.onload=function(){window.performance=window.performance||window.mozPerformance||window.msPerformance||window.webkitPerformance||{};var n,t=window.performance.timing,o=(new Date).getTime();if(t){e=e||1e3;var i=t.navigationStart,r=document.createElement("div");r.setAttribute("id","results"),n=o-i,r.innerHTML=o-i+"ms",r.className+=n>e?" overBudget":" underBudget",document.body.appendChild(r)}}};window.perfBar=e},debouncer:function(e,n,t){var o;return function(){var i=this,r=arguments,d=function(){o=null,t||e.apply(i,r)},a=t&&!o;clearTimeout(o),o=setTimeout(d,n),a&&e.apply(i,r)}},getScrollXY:function(){var e=0,n=0;return"number"==typeof window.pageYOffset?(n=window.pageYOffset,e=window.pageXOffset):document.body&&(document.body.scrollLeft||document.body.scrollTop)?(n=document.body.scrollTop,e=document.body.scrollLeft):document.documentElement&&(document.documentElement.scrollLeft||document.documentElement.scrollTop)&&(n=document.documentElement.scrollTop,e=document.documentElement.scrollLeft),[e,n]},getDocHeight:function(){var e=document;return Math.max(e.body.scrollHeight,e.documentElement.scrollHeight,e.body.offsetHeight,e.documentElement.offsetHeight,e.body.clientHeight,e.documentElement.clientHeight)},affixFileName:function(e,n){return e.substring(0,e.lastIndexOf("."))+n+e.substring(e.lastIndexOf("."))}}}),define("/Users/admin/www/front-end-starter/js/utils/Events.js",["utils/util"],function(e){var n={actionAfterTyping:function(t,o){var i;return e.addEventHandler(t,"keyup",function(){clearTimeout(i),i=setTimeout(function(){n.actionAfterTypingCallback(function(){o()})},1500)}),i},actionAfterTypingCallback:function(e){e()},bindOneNeedsPrefixes:{animationend:!0},bindOneprefixes:["webkit","moz","ms","o"],bindOne:function(e,t,o,i){t.trim().split(/\s+/).forEach(function(t){function r(){d&&n.bindOneprefixes.forEach(function(e){this.removeEventListener(e+t,r,i)},this),this.removeEventListener(t,r,i),o.call(this,event)}var d=n.bindOneNeedsPrefixes[t.toLowerCase()];d&&n.bindOneprefixes.forEach(function(n){e.addEventListener(n+t,r,i)}),e.addEventListener(t,r,i)})},delegate:function(e,n,t,o){e.addEventListener(n,function(e){for(var n=e.target;n&&n!==this;)"function"==typeof n.matches?n.matches(t)&&o.call(n,e):n.matchesSelector(t)&&o.call(n,e),n=n.parentNode})},domReady:function(e){/comp|inter|loaded/.test(document.readyState)?e():document.addEventListener("DOMContentLoaded",function(){e()},!1)},preventForm:function(e){e.addEventListener("submit",function(e){e.preventDefault()})},addLoadEvent:function(e){var n=window.onload;"function"!=typeof window.onload?window.onload=e:window.onload=function(){n&&n(),e()}},addEventHandler:function(e,n,t){e.addEventListener?e.addEventListener(n,t,!1):e.attachEvent&&e.attachEvent("on"+n,t)},onChange:function(n){e.addEventHandler(n,"change",function(){callback()})}};return n});