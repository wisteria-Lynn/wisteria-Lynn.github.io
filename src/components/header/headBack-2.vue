<template>
    <div class="headback-2">
		<router-link :to="url"><i class="el-icon-arrow-left"></i></router-link>
		<span>{{$route.meta.title || ''}}</span>
	</div>
</template>

<script>
    export default {
        name: "headBack-2",
		props:['url'],
    }
</script>

<style scoped lang="less">
	.headback-2{
		/*position: fixed;*/
		padding:0 20px;
		line-height: 60px;
		margin-bottom:20px;
		background:#fff;
		font-size:20px;
		z-index:2;
		span{
			display: inline-block;
			margin-left:10px;
		}
	}
	@media (max-width: 768px) {
		.headback-2{
			margin-bottom:10px !important;
		}
	}
</style>
