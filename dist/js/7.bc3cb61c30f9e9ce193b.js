(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{604:function(t,n,e){"use strict";e.r(n);var i=e(725),r=e(656);for(var u in r)"default"!==u&&function(t){e.d(n,t,function(){return r[t]})}(u);e(705),e(706);var o=e(53),a=Object(o.a)(r.default,i.a,i.b,!1,null,"5d1d81ad",null);a.options.__file="src/pages/novel/novelIndex.vue",n.default=a.exports},656:function(t,n,e){"use strict";e.r(n);var i=e(657),r=e.n(i);for(var u in i)"default"!==u&&function(t){e.d(n,t,function(){return i[t]})}(u);n.default=r.a},657:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={name:"novelIndex",data:function(){return{novelList:[{title:"解祤忧",img:e(704),id:0,des:"他一生"}]}},methods:{toReadIt:function(t){this.$router.push({path:"/novel/novelDetail",query:{id:t}})}}}},658:function(t,n,e){},659:function(t,n,e){},704:function(t,n,e){t.exports=e.p+"img/novel-1.3a3728886684f9ceb7bd56d2756575bb.png"},705:function(t,n,e){"use strict";var i=e(658);e.n(i).a},706:function(t,n,e){"use strict";var i=e(659);e.n(i).a},725:function(t,n,e){"use strict";var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"novelIndex"},[e("headerOne"),t._v(" "),t.$route.path.split("/").length<=2?e("div",{staticClass:"panel"},t._l(t.novelList,function(n){return e("div",{staticClass:"novelWrap"},[e("img",{attrs:{src:n.img},on:{click:function(e){t.toReadIt(n.id)}}}),t._v(" "),e("span",[t._v(t._s(n.title))]),t._v(" "),e("div",[t._v(t._s(n.des))])])}),0):t._e(),t._v(" "),e("router-view")],1)},r=[];i._withStripped=!0,e.d(n,"a",function(){return i}),e.d(n,"b",function(){return r})}}]);
//# sourceMappingURL=7.bc3cb61c30f9e9ce193b.js.map