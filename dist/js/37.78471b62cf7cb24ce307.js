(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{614:function(t,a,e){"use strict";e.r(a);var i=e(887),s=e(709);for(var n in s)"default"!==n&&function(t){e.d(a,t,function(){return s[t]})}(n);e(842);var r=e(74),o=Object(r.a)(s.default,i.a,i.b,!1,null,"441f8fcc",null);o.options.__file="src/pages/wechat/chatLogin.vue",a.default=o.exports},709:function(t,a,e){"use strict";e.r(a);var i=e(710),s=e.n(i);for(var n in i)"default"!==n&&function(t){e.d(a,t,function(){return i[t]})}(n);a.default=s.a},710:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=e(624),s=e(757);a.default={name:"chatLogin",data:function(){return{activeName:"login",loginName:"",registName:"",animals:1}},methods:{LoginChat:function(){var t=this;this.loginName?(0,i.chatLogin)({name:this.loginName}).then(function(a){if(0!==a.code)t.layer.msg((0,s.codeText)(a.code));else{var e={openID:a.data.openID,chatname:a.data.chatname,avatar:a.data.avatar,sort:a.data.sort};t.$store.dispatch("saveChatUserInfo",e),sessionStorage.setItem("chatUserInfo",JSON.stringify(e)),sessionStorage.setItem("websocketLink","1"),t.$router.push({path:"/wechat/chat"})}}).catch(function(a){t.layer.msg(a)}):this.layer.msg("请输入登陆名")},registerChat:function(){var t=this;this.registName?this.registName.length>15?this.layer.msg("注册名最多为15个字符"):(0,i.chatRegist)({name:this.registName}).then(function(a){0!==a.code?t.layer.msg((0,s.codeText)(a.code)):(t.layer.msg("注册成功，请登录"),t.activeName="login",t.loginName=t.registName)}).catch(function(a){t.layer.msg(a)}):this.layer.msg("请输入注册名")},animalsAdd:function(){this.animals++}},created:function(){this.isMobileBrowser()&&(this.layer.msg("请用电脑登录聊天界面"),this.$router.push("/"))}}},711:function(t,a,e){},842:function(t,a,e){"use strict";var i=e(711);e.n(i).a},887:function(t,a,e){"use strict";var i=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"chatLogin chat bg-color--hui",staticStyle:{"min-height":"100%"}},[i("div",{staticClass:"chat-header tc",staticStyle:{height:"15%","line-height":"4.5",color:"#fff","font-size":"32px"}},[t._v("\n\t\t渔火聊天室\n\t")]),t._v(" "),i("div",{staticClass:"chat-wrap all-wrap"},[i("div",{staticClass:"chat-frame bg-color--white"},[i("div",{staticClass:"fram-animals"},[i("img",{directives:[{name:"show",rawName:"v-show",value:t.animals%3==0,expression:"animals%3 === 0"}],staticClass:"animal-1",attrs:{src:e(706),alt:""}}),t._v(" "),i("img",{directives:[{name:"show",rawName:"v-show",value:t.animals%3==1,expression:"animals%3 === 1"}],staticClass:"animal-2",attrs:{src:e(707),alt:""}}),t._v(" "),i("img",{directives:[{name:"show",rawName:"v-show",value:t.animals%3==2,expression:"animals%3 === 2"}],staticClass:"animal-3",attrs:{src:e(708),alt:""}})]),t._v(" "),"login"===t.activeName?i("el-row",{staticClass:"frame-login"},[i("el-input",{attrs:{placeholder:"请输入登录名"},on:{focus:t.animalsAdd},model:{value:t.loginName,callback:function(a){t.loginName=a},expression:"loginName"}}),t._v(" "),i("el-button",{on:{click:t.LoginChat}},[t._v("登录")]),t._v(" "),i("el-button",{on:{click:function(a){t.activeName="register"}}},[t._v("注册")])],1):t._e(),t._v(" "),"register"===t.activeName?i("el-row",{staticClass:"frame-register tc"},[i("el-input",{attrs:{placeholder:"请输入注册姓名"},on:{focus:t.animalsAdd},model:{value:t.registName,callback:function(a){t.registName=a},expression:"registName"}}),t._v(" "),i("el-button",{on:{click:t.registerChat}},[t._v("注册")]),t._v(" "),i("span",{staticStyle:{"font-size":"14px","text-decoration":"underline"},on:{click:function(a){t.activeName="login"}}},[t._v("有账号？去登录")])],1):t._e()],1)])])},s=[];i._withStripped=!0,e.d(a,"a",function(){return i}),e.d(a,"b",function(){return s})}}]);
//# sourceMappingURL=37.78471b62cf7cb24ce307.js.map