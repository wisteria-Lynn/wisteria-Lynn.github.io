<template>
    <div class="addLister">
		<div>您一直没有操作，即将在{{time}}s后退出</div>
		<div>您按下了键盘：{{key}} 键盘码：{{keyCode}}</div>
		<div>鼠标移动：x:{{mouseX}} y:{{mouseY}}</div>
		<div>滚动条：{{scroll}}</div>
	</div>
</template>

<script>
	const dataTime = 30
    export default {
        name: "addLister",
		data(){
        	return{
        		key:'',
				keyCode:'',
				mouseX:'',
				mouseY:'',
				scroll:'',
				time:dataTime,
				timeInteval:''
			}
		},
		methods:{
			// 键盘事件
			handleKeyup(event){
				const e = event || window.event || arguments.callee.caller.arguments[0]
				if(!e) return
				const {key,keyCode} = e
				this.key = key
				this.keyCode = keyCode
				this.time = dataTime
			},
			//  滑轮事件
			handleScroll(){
				let e = document.body.scrollTop||document.documentElement.scrollTop
				if(!e) return
				this.scroll = e
				this.time = dataTime
			},
			handleMousemove(){
				const e = event || window.event
				const {clientX,clientY} = e
				this.mouseX = clientX
				this.mouseY = clientY
				this.time = dataTime
			}
		},
		mounted () {
        	this.timeInteval = setInterval(()=>{
        		this.time--
				if(this.time < 0){
					clearInterval(this.timeInteval)
					this.$store.dispatch('loginOut')
					this.$router.push({path:'/login',query: {redirect: this.$route.fullPath}})
				}
			},1000)
			window.addEventListener('keyup',this.handleKeyup)
			window.addEventListener('scroll',this.handleScroll)
			window.addEventListener('mousemove',this.handleMousemove)
		},
		destroyed () {
			clearInterval(this.timeInteval)
			window.removeEventListener('keyup',this.handleKeyup)
			window.removeEventListener('scroll',this.handleScroll)
			window.removeEventListener('mousemove',this.handleMousemove)
		},
    }
</script>

<style scoped>

</style>
