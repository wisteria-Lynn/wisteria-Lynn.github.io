<template>
    <div class="viewerMode" v-if="cropperStore.viewerShow">
		<viewer :options="viewerOption" :images="images">
			<img v-for="src in images" :src="src" :key="src">
		</viewer>
		<div class="viewerMode-foot">
			<span @click="toCut">去裁剪</span>
			<span @click="out">退出</span>
		</div>
	</div>
</template>

<script>
    export default {
        name: "viewerMode",
		computed: {
			cropperStore() {
				return this.$store.state.CROPPER
			},
			images(){
				return this.$store.state.CROPPER.imgUrl
			}
		},
		data(){
        	return{
				viewerOption: {
					'inline': true,
					'button': false,
					'navbar': false,
					'title': true,
					'toolbar': true,
					'tooltip': true,
					'movable': true,
					'zoomable': true,
					'rotatable': true,
					'scalable': true,
					'transition': true,
					'fullscreen': false,
					'keyboard': true,
					'url': 'data-source'
				},
			}
		},
		methods:{
			toCut(){
				this.$store.dispatch('cropperAction', {
					viewerShow:false,
					cropperShow:true,
					imgUrl:this.cropperStore.imgUrl,
					cropperImg:''
				})
			},
			out(){
				this.$store.dispatch('cropperAction', {
					viewerShow:false,
					cropperShow:false,
					imgUrl:[],
					cropperImg:''
				})
			}
		}
    }
</script>
<style lang="less">
	.viewer-backdrop{
		height:100% !important;
	}
	.viewerMode{
		img{
			display: none;
		}
		.viewer-prev,.viewer-play,.viewer-next,.viewer-one-to-one{
			display: none;
		}
	}
	.viewer-canvas > img{
		display: block;
		/*width:80% !important;*/
	}
</style>
<style scoped lang="less">
	.viewerMode{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		background: rgba(0,0,0,.5);
	}
	.viewerMode-foot{
		position: fixed;
		display: inline-block;
		top: 20px;
		right: 20px;
		color: #Fff;
		height: 24px;
		z-index: 1400;
		span{
			display:inline-block;
			background: #1e1e1e;
			padding: 5px 10px;
			border-radius: 4px;
			cursor: pointer;
		}
	}
</style>
