(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{601:function(t,e,n){"use strict";n.r(e);var r=n(874),i=n(664);for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);n(824);var a=n(74),c=Object(a.a)(i.default,r.a,r.b,!1,null,"6cd98f61",null);c.options.__file="src/pages/project/imgLazyLoad/imgLazyLoad.vue",e.default=c.exports},664:function(t,e,n){"use strict";n.r(e);var r=n(665),i=n.n(r);for(var o in r)"default"!==o&&function(t){n.d(e,t,function(){return r[t]})}(o);e.default=i.a},665:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(628);e.default={name:"imgLazyLoad",data:function(){return{throttled:"",viewHeight:0}},methods:{getImg:function(t){return n(763)("./lazy-"+t+".jpg")},previewImg:function(){for(var t=document.querySelectorAll("img[data-src]"),e=0;e<t.length;e++)t[e]&&t[e].offsetTop-r.Scroll.scrollTop()<this.viewHeight&&(console.log("1"),t[e].src=t[e].getAttribute("data-src"),t[e].removeAttribute("data-src"))}},mounted:function(){var t=this;this.throttled=(0,r.throttle)(function(){t.previewImg()},200),this.viewHeight=document.documentElement.clientHeight,window.addEventListener("scroll",this.throttled,!0)},destroyed:function(){window.removeEventListener("scroll",this.throttled,!0)}}},666:function(t,e,n){},823:function(t,e,n){t.exports=n.p+"img/loading.60aecda764962fd2d5346b7aaf31726d.gif"},824:function(t,e,n){"use strict";var r=n(666);n.n(r).a},874:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"imgLazyLoad"},t._l(14,function(e,i){return r("div",{key:i},[r("img",{attrs:{src:n(823),"data-src":t.getImg(e)}})])}),0)},i=[];r._withStripped=!0,n.d(e,"a",function(){return r}),n.d(e,"b",function(){return i})}}]);
//# sourceMappingURL=16.78471b62cf7cb24ce307.js.map