<template>
    <div class="yl-header">
		<el-row>
			<el-col class="yl-header-left" :xs="{span:22,offset:1}" :md='{span: 22,offset: 1}' :lg={span:18,offset:3}>
				<router-link to="/"><span>渔火&nbsp;·&nbsp;</span></router-link>
				<span>我的地盘</span>
			</el-col>
		</el-row>
	</div>
</template>

<script>
    export default {
        name: "YUheader"
    }
</script>

<style lang="less">
	.yl-theme-blue{
		.yl-header{
			.yl-header-left{
				span:nth-child(1){
					color:@themeBlue;
				}
			}
		}
	}
	.yl-theme-orange{
		.yl-header{
			.yl-header-left{
				span:nth-child(1){
					color:@themeOrange;
				}
			}
		}
	}
	.yl-header{
		height:6rem;
		background:#fff;
		border-bottom:1px solid #ccc;
		.yl-header-left{
			line-height: 6rem;
			span{
				font-size:2.4rem;
			}
			span:nth-child(2){}
		}
	}
	@media (max-width: 768px) {
		.yl-header{

		}
	}
</style>
