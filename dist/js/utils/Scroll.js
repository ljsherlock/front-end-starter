define("/Users/admin/www/front-end-starter/js/utils/Scroll.js",[],function(){return{scrollToItem:function(e,o){var t=document.querySelector(e),r=document.querySelector(scrollToId),n=t.scrollTop,l=r.offsetTop-t.scrollTop;n<r.offsetTop&&r.offsetTop>t.scrollHeight-t.clientHeight&&(l=t.scrollHeight-t.clientHeight-t.scrollTop);var c=0,s=Math.round(30);!function e(){var o=easeOutCubic(c,n,l,s);t.scrollTop=o,++c<s&&requestAnimationFrame(e)}()},linearEase:function(e,o,t,r){return t*e/r+o},easeOutCubic:function(e,o,t,r){return t*(Math.pow(e/r-1,3)+1)+o}}});