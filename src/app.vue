<template>
    <div id="app">
        <router-view :key="$route.fullPath"></router-view>
    </div>
</template>
<style lang="less" type="text/less">
  /*<!--公共css样式可以此处导入-->*/
	@import "./assets/css/layout.css";
    @import "./assets/less/layout.less";
  @import "assets/font/fontFamily.css";
   @import "./assets/less/chat.less";
</style>
<script>
  export default {
  	name:'app',
    data() {
      return {
		  // provide / inject 组合刷新重加载当前页
		  isRouterAlive:true
	  }
    },
	  provide(){
		  return {
			  reload:this.reload
		  }
	  },
	  methods:{
		  reload(){
			  this.isRouterAlive = false;
			  this.$nextTick(()=>{
				  this.isRouterAlive = true
			  })
		  }
	  },
	  watch: {
		  '$route': () => {
			  window.scrollTo(0, 0)
		  }
	  }
  }
</script>
