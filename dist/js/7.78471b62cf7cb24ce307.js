(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{604:function(t,i,e){"use strict";e.r(i);var o=e(877),r=e(673);for(var n in r)"default"!==n&&function(t){e.d(i,t,function(){return r[t]})}(n);e(831);var s=e(74),p=Object(s.a)(r.default,o.a,o.b,!1,null,"d1be327e",null);p.options.__file="src/pages/project/cropper/cropper.vue",i.default=p.exports},673:function(t,i,e){"use strict";e.r(i);var o=e(674),r=e.n(o);for(var n in o)"default"!==n&&function(t){e.d(i,t,function(){return o[t]})}(n);i.default=r.a},674:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var o,r=e(827),n=(o=r)&&o.__esModule?o:{default:o};i.default={name:"cropper",components:{"v-cropper":n.default},data:function(){return{cropperShow:!1,cropperOptions:{dialogVisible:!1,img:""},cropperFile:"",viewerOptions:{toolbar:!0,url:"data-source"},dialogVisible:!1,avatarImageUrl:"",imgurl:"",picsList:[]}},methods:{changeUpload:function(t,i){var e=this;this.$nextTick(function(){e.cropperOptions={dialogVisible:!0,img:t.raw},e.cropperShow=!0})},preview:function(){this.$el.querySelector(".images").$viewer.show()},outCropper:function(){this.cropperShow=!1,this.cropperOptions={dialogVisible:!1,img:""}},getCropperImage:function(t){console.log("裁剪确定按钮"),this.cropperFile=t,this.avatarImageUrl=window.URL.createObjectURL(t),this.cropperShow=!1,this.cropperOptions={dialogVisible:!1,img:""}}}}},675:function(t,i,e){"use strict";e.r(i);var o=e(676),r=e.n(o);for(var n in o)"default"!==n&&function(t){e.d(i,t,function(){return o[t]})}(n);i.default=r.a},676:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var o=e(828);i.default={name:"cropperMode",components:{VueCropper:o.VueCropper},props:{type:{type:String,default:""},cropperOptions:{type:Object,required:!0,default:function(){return{}}}},data:function(){return{originalGraph:"",cropperFile:"",isReset:!1,isComfire:!1,isClipping:!1,option:{img:"",info:!0,outputSize:.8,outputType:"jpg",canScale:!1,autoCropWidth:10,autoCropHeight:10,canMoveBox:!0,original:!0,centerBox:!0,infoTrue:!0}}},mounted:function(){if(this.cropperOptions.img){var t=Object.prototype.toString.call(this.cropperOptions.img);if(console.log(t),"[object File]"===t||"[object Blob]"===t)this.originalGraph=window.URL.createObjectURL(this.cropperOptions.img);else{if("[object String]"!==t)return this.out(),void this.$message.error("请传入file|blob|base64图片！");if(!(this.cropperOptions.img.split(",")[0].indexOf("base")>-1))return this.out(),void this.$message.error("请传入file|blob|base64图片！");this.originalGraph=window.URL.createObjectURL(this.dataURLtoBlob(this.cropperOptions.img))}var i={};"avatar"===this.type?(i={autoCrop:!0,fixed:!0,fixedNumber:[1,1]},this.isClipping=!0,this.isReset=!1,this.isComfire=!1):i={autoCrop:!1,fixed:!1},this.option=Object.assign({info:!0,outputSize:.8,outputType:"jpg",canScale:!1,autoCropWidth:10,autoCropHeight:10,fixedBox:!1,full:!1,canMoveBox:!0,original:!0,centerBox:!0,infoTrue:!0},i,this.cropperOptions),this.option.img=this.originalGraph,console.log(this.option)}else this.$message.error("请传入图片！")},methods:{startCut:function(){this.isClipping=!0,this.option.autoCrop=!0},cut:function(){var t=this;this.isReset=!0,this.isComfire=!0,this.$refs.cropper.getCropBlob(function(i){t.option.autoCrop=!1,t.isClipping=!1,t.cropperFile=new window.File([i],t.cropperOptions.img.name,{type:i.type}),t.option.img=window.URL.createObjectURL(i)})},submit:function(){""!==this.cropperFile?this.$emit("submit",this.cropperFile):this.$message.error("请裁剪之后再确认！")},out:function(){this.$emit("out")},reset:function(){this.isReset=!1,this.isComfire=!1,this.isClipping=!1,this.option.autoCrop=!1,this.option.img=this.originalGraph},dataURLtoBlob:function(t){for(var i=t.split(","),e=i[0].match(/:(.*?);/)[1],o=atob(i[1]),r=o.length,n=new Uint8Array(r);r--;)n[r]=o.charCodeAt(r);return new Blob([n],{type:e})}}}},677:function(t,i,e){},678:function(t,i,e){},679:function(t,i,e){},827:function(t,i,e){"use strict";e.r(i);var o=e(897),r=e(675);for(var n in r)"default"!==n&&function(t){e.d(i,t,function(){return r[t]})}(n);e(829),e(830);var s=e(74),p=Object(s.a)(r.default,o.a,o.b,!1,null,"1777106e",null);p.options.__file="src/components/cropper/cropperMode.vue",i.default=p.exports},829:function(t,i,e){"use strict";var o=e(677);e.n(o).a},830:function(t,i,e){"use strict";var o=e(678);e.n(o).a},831:function(t,i,e){"use strict";var o=e(679);e.n(o).a},877:function(t,i,e){"use strict";var o=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"x-cropper"},[e("el-upload",{attrs:{action:"","list-type":"picture-card","auto-upload":!1,"on-preview":t.preview,"on-change":t.changeUpload}},[e("i",{staticClass:"el-icon-upload"})]),t._v(" "),e("img",{attrs:{src:t.avatarImageUrl}}),t._v(" "),t.cropperShow?e("v-cropper",{attrs:{cropperOptions:t.cropperOptions,type:"avatar"},on:{out:t.outCropper,submit:t.getCropperImage}}):t._e(),t._v(" "),e("div",{directives:[{name:"viewer",rawName:"v-viewer",value:t.viewerOptions,expression:"viewerOptions"}],staticClass:"viewerShow"},[e("img",{staticClass:"head-picImg",attrs:{src:t.imgurl}})])],1)},r=[];o._withStripped=!0,e.d(i,"a",function(){return o}),e.d(i,"b",function(){return r})},897:function(t,i,e){"use strict";var o=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("el-dialog",{attrs:{id:"cropper_dialog","custom-class":"form-dialog",title:"裁剪图片",showClose:!1,closeOnClickModal:!1,closeOnPressEscape:!1,visible:t.cropperOptions.dialogVisible},on:{"update:visible":function(i){t.$set(t.cropperOptions,"dialogVisible",i)}}},[e("div",{staticClass:"dialog-body"},[e("div",{staticClass:"cropper",staticStyle:{"text-align":"center"}},[e("vueCropper",{ref:"cropper",attrs:{img:t.option.img,outputSize:t.option.size,outputType:t.option.outputType,info:t.option.info,full:t.option.full,canMove:t.option.canMove,canMoveBox:t.option.canMoveBox,original:t.option.original,autoCrop:t.option.autoCrop,fixed:t.option.fixed,fixedNumber:t.option.fixedNumber,centerBox:t.option.centerBox,infoTrue:t.option.infoTrue,fixedBox:t.option.fixedBox}})],1)]),t._v(" "),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{attrs:{disabled:!t.isReset},on:{click:t.reset}},[t._v("恢复原图")]),t._v(" "),e("el-button",{directives:[{name:"show",rawName:"v-show",value:!t.isClipping,expression:"!isClipping"}],on:{click:t.startCut}},[t._v("开始裁剪")]),t._v(" "),e("el-button",{directives:[{name:"show",rawName:"v-show",value:t.isClipping,expression:"isClipping"}],on:{click:t.cut}},[t._v("确认裁剪")]),t._v(" "),e("el-button",{attrs:{disabled:t.isClipping||!t.isComfire},on:{click:t.submit}},[t._v("确定")]),t._v(" "),e("el-button",{on:{click:t.out}},[t._v("退出")])],1)])},r=[];o._withStripped=!0,e.d(i,"a",function(){return o}),e.d(i,"b",function(){return r})}}]);
//# sourceMappingURL=7.78471b62cf7cb24ce307.js.map