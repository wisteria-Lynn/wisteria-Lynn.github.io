<template>
    <div class="novelDetail">
		<div class="panel">
			<div class="novelTitle t-center">{{novelInfo.title}}</div>
			<div class="novelTxt" v-html="html">
			</div>
		</div>
	</div>
</template>

<script>
	import {novel} from '../../../static/js/novel-1001'
    export default {
        name: "novelDetail",
		data(){
        	return{
        		novelInfo:novel[0],
				html:''
			}
		},
		created(){
        	let txt= novel[0].txt.split('\n\n')
			this.html = ''
			for(let i = 0;i<txt.length;i++){
				this.html+=`<p>${txt[i]}</p>`
			}
		}
    }
</script>

<style lang="less">
	.panel{
		min-height:300px;
		width:95%;
		margin:20px 5%;
		background:#fff;
		.novelTitle{
			padding-top:30px;
			font-size:20px;
			font-weight: 600;
		}
		.novelTxt{
			text-indent:1.5em;
			width:90%;
			margin:auto;
			p{
				margin:20px;
			}
		}
	}
	@media (max-width: 768px) {
		.panel {
			width:100%;
			margin:20px 0;
		}
	}
</style>
