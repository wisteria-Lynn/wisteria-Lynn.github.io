(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{594:function(t,e,i){"use strict";i.r(e);var n=i(716),o=i(622);for(var s in o)"default"!==s&&function(t){i.d(e,t,function(){return o[t]})}(s);i(690);var r=i(53),a=Object(r.a)(o.default,n.a,n.b,!1,null,"36918c96",null);a.options.__file="src/pages/demo/indexAnima.vue",e.default=a.exports},622:function(t,e,i){"use strict";i.r(e);var n=i(623),o=i.n(n);for(var s in n)"default"!==s&&function(t){i.d(e,t,function(){return n[t]})}(s);e.default=o.a},623:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(612);e.default={name:"indexAnima",data:function(){return{imgs:[],dataWrap:[]}},methods:{getImg:function(t){return i(669)("./lazy-"+t+".jpg")},previewImg:function(){for(var t=0;t<this.imgs.length;t++)console.log(this.imgs[t].offsetTop,n.Scroll.scrollTop(),this.viewHeight),console.log(t+" "+this.imgs[t].offsetTop-n.Scroll.scrollTop()<this.viewHeight-20),this.imgs[t].offsetTop-n.Scroll.scrollTop()<this.viewHeight+30&&(n.dom.hasClass(this.imgs[t],"anmial")||n.dom.addClass(this.imgs[t],"anmial"))}},mounted:function(){var t=this;this.dataWrap=document.querySelectorAll(".dataWrap"),this.imgs=document.querySelectorAll("img"),this.viewHeight=document.documentElement.clientHeight,this.throttled=(0,n.throttle)(function(){t.previewImg()},200),this.previewImg(),window.addEventListener("scroll",this.throttled,!0)},destroyed:function(){window.removeEventListener("scroll",this.throttled,!0)}}},624:function(t,e,i){},690:function(t,e,i){"use strict";var n=i(624);i.n(n).a},716:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"indexAnima"},[t._l(14,function(e,n){return i("div",{key:n,staticClass:"dataWrap"},[i("img",{attrs:{src:t.getImg(e)}})])}),t._v(" "),i("div",{staticStyle:{height:"300px"}})],2)},o=[];n._withStripped=!0,i.d(e,"a",function(){return n}),i.d(e,"b",function(){return o})}}]);
//# sourceMappingURL=14.425c98fc2290271aa503.js.map