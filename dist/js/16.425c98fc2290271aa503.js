(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{602:function(e,t,n){"use strict";n.r(t);var i=n(725),o=n(651);for(var s in o)"default"!==s&&function(e){n.d(t,e,function(){return o[e]})}(s);n(702);var r=n(53),u=Object(r.a)(o.default,i.a,i.b,!1,null,"32a9c0ff",null);u.options.__file="src/pages/project/addLister/addLister.vue",t.default=u.exports},651:function(e,t,n){"use strict";n.r(t);var i=n(652),o=n.n(i);for(var s in i)"default"!==s&&function(e){n.d(t,e,function(){return i[e]})}(s);t.default=o.a},652:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default={name:"addLister",data:function(){return{key:"",keyCode:"",mouseX:"",mouseY:"",scroll:"",time:30,timeInteval:""}},methods:{handleKeyup:function(e){var t=e||window.event||arguments.callee.caller.arguments[0];if(t){var n=t.key,i=t.keyCode;this.key=n,this.keyCode=i,this.time=30}},handleScroll:function(){var e=document.body.scrollTop||document.documentElement.scrollTop;e&&(this.scroll=e,this.time=30)},handleMousemove:function(){var e=event||window.event,t=e.clientX,n=e.clientY;this.mouseX=t,this.mouseY=n,this.time=30}},mounted:function(){var e=this;this.timeInteval=setInterval(function(){e.time--,e.time<0&&(clearInterval(e.timeInteval),e.$store.dispatch("loginOut"),e.$router.push({path:"/login",query:{redirect:e.$route.fullPath}}))},1e3),window.addEventListener("keyup",this.handleKeyup),window.addEventListener("scroll",this.handleScroll),window.addEventListener("mousemove",this.handleMousemove)},destroyed:function(){clearInterval(this.timeInteval),window.removeEventListener("keyup",this.handleKeyup),window.removeEventListener("scroll",this.handleScroll),window.removeEventListener("mousemove",this.handleMousemove)}}},653:function(e,t,n){},702:function(e,t,n){"use strict";var i=n(653);n.n(i).a},725:function(e,t,n){"use strict";var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"addLister"},[n("div",[e._v("您一直没有操作，即将在"+e._s(e.time)+"s后退出")]),e._v(" "),n("div",[e._v("您按下了键盘："+e._s(e.key)+" 键盘码："+e._s(e.keyCode))]),e._v(" "),n("div",[e._v("鼠标移动：x:"+e._s(e.mouseX)+" y:"+e._s(e.mouseY))]),e._v(" "),n("div",[e._v("滚动条："+e._s(e.scroll))])])},o=[];i._withStripped=!0,n.d(t,"a",function(){return i}),n.d(t,"b",function(){return o})}}]);
//# sourceMappingURL=16.425c98fc2290271aa503.js.map