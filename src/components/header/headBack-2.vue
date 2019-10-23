<template>
    <div class="headback-2" :class="[position === 'fixed'?'fixed':'normal']">
		<el-row>
			<el-col :span="12">
				<router-link :to="url"><i class="el-icon-arrow-left"></i></router-link>
				<span>{{$route.meta.title || ''}}</span>
			</el-col>
			<el-col :span="12" class="tr">
				<slot></slot>
			</el-col>
		</el-row>
	</div>
</template>

<script>
    export default {
        name: "headBack-2",
		props:['url','position'],
    }
</script>

<style scoped lang="less">
	.headback-2{
		&.normal{
			margin-bottom:20px;
		}
		&.fixed{
			position: fixed;
			width: calc(100% - 40px);
		}
		padding:0 20px;
		line-height: 60px;
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
