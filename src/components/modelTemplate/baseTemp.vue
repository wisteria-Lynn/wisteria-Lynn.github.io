<template>
    <div>
		<v-header :pathType="pathType" :position="position"></v-header>
		<slot name="content"></slot>
		<v-footer></v-footer>
	</div>
</template>

<script>
    export default {
        name: "baseTemp",
		props: ['pathType','position'],
    }
</script>

<style scoped>

</style>
