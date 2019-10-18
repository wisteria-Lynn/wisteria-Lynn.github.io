<template>
    <div class="x-remark">
		<v-panel-one>
			<h3 class="tc"> - {{remark.title}} -</h3>
			<template v-for="item in remark.list">
				<div class="p-avatar">
					<img :src="item.avatar">
					<span>{{item.name}}</span>
				</div>
				<div class="p-remark">
					{{item.remark}}
				</div>
			</template>
		</v-panel-one>
	</div>
</template>

<script>
    export default {
        name: "remark",
		props:['remark']
    }
</script>

<style scoped lang="less">
	.x-remark{
		h3{
			color:#bf900b;
			margin-bottom:10px;
		}
		.p-avatar{
			margin-bottom:10px;
			line-height: 35px;
			img{
				border-radius: 50%;
				width:25px;
				vertical-align: middle;
			}
		}
	}
</style>
