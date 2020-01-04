<template>
    <div class="x-wechat" style="height:100%;">
		<router-view :key="$route.fullPath"></router-view>
	</div>
</template>

<script>
    export default {
        name: "wechat"
    }
</script>

<style scoped>

</style>
