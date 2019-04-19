<template>
	<div class="hello">
		
		<router-link to="/login">登录</router-link>
		
		<router-link to="/register">注册</router-link>
		
		<div @click="dealLogout">退出登录</div>
	</div>
</template>

<script>
	export default {
		name: 'HelloWorld',
		data() {
			return {}
		},
		methods: {
			dealLogout:function(){
				window.localStorage.clear()
				this.$message({
					message: '退出登录成功',
					type: 'success'
				});
				//在store中获取list
				this.$store.dispatch("requestCartList")
			}
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
