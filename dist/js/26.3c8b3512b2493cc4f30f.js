(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{594:function(t,n,e){"use strict";e.r(n);var i=e(868),r=e(643);for(var o in r)"default"!==o&&function(t){e.d(n,t,function(){return r[t]})}(o);e(815);var u=e(74),s=Object(u.a)(r.default,i.a,i.b,!1,null,null,null);s.options.__file="src/pages/login/codeLogin.vue",n.default=s.exports},643:function(t,n,e){"use strict";e.r(n);var i=e(644),r=e.n(i);for(var o in i)"default"!==o&&function(t){e.d(n,t,function(){return i[t]})}(o);n.default=r.a},644:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=e(624);n.default={name:"codeLogin",methods:{codeLogin:function(){var t=this,n=this.$route.query.uid;n?(0,i.UidLogin)({uid:n}).then(function(n){0===n.code?t.layer.msg("允许登录"):t.layer.msg(n.message)}):this.layer.msg("发生错误！")}}}},645:function(t,n,e){},815:function(t,n,e){"use strict";var i=e(645);e.n(i).a},868:function(t,n,e){"use strict";var i=function(){var t=this.$createElement,n=this._self._c||t;return n("div",{staticClass:"yl-codeLogin yl-flex-center"},[n("div",{staticClass:"tc"},[n("p",[this._v("渔火·流莹离")]),this._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:this.codeLogin}},[this._v("允许登录")])],1)])},r=[];i._withStripped=!0,e.d(n,"a",function(){return i}),e.d(n,"b",function(){return r})}}]);
//# sourceMappingURL=26.3c8b3512b2493cc4f30f.js.map