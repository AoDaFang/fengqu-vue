<template>
	<div class="login">
		<div class="login-header">
			<div class="header-cancel" @click="$router.go(-1);">取消</div>
			<div class="header-title">登录</div>
		</div>
		<div class="login-mian">
			<input type="text" placeholder="手机号/邮箱" v-model="phone">
			<input type="password" placeholder="密码" v-model="password">
			<button @click="dealLogin">登录</button>
			<button style="color: #e95d57;" @click="$router.push({name: 'Register'});">注册</button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'HelloWorld',
		data() {
			return {
				phone: "",
				password: ""
			}
		},
		methods: {
			dealLogin: async function() {
				if (!this.phone) {
					this.$message.error('请填写邮箱或者手机号');
					return
				}
				if (!this.password) {
					this.$message.error('请填写密码');
					return
				}
				var dict = {
					phone: this.phone,
					password: this.password
				}
				var res = await this.api.userApi.login(dict)
				
				window.localStorage.user = JSON.stringify(res.user)
				
				if (res.code == 1) {
					this.$message({
						message: '登录成功',
						type: 'success'
					});
					window.localStorage.setItem("isLogin", true)
					this.$router.push('/')
				}else{
					this.$message({
						message: '登录失败',
						type: 'error'
					});
				}
			}
		},
		created() {
			console.log('login')
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.login {
		height: 100%;
	}

	.login-header {
		overflow: hidden;
		height: 0.8rem;
		width: 100%;
		background-color: #fff;
	}

	.header-cancel {
		font-size: 0.22rem;
		color: #e95d57;
		float: left;
		font-weight: bold;
		line-height: 0.8rem;
		margin-left: 0.34rem;
	}

	.header-title {
		font-size: 0.3rem;
		line-height: 0.8rem;
		font-weight: bold;
		margin-left: 3.5rem;
	}

	.login-mian {
		margin-top: 0.5rem;
	}

	.login-mian input {
		display: block;
		width: 100%;
		border: none;
		border-bottom: 1px solid #666;
		height: 0.7rem;
		background-color: #fff !important;
		outline: none;
		text-indent: 2em;
	}

	.login-mian input:nth-child(1) {
		border-top: 1px solid #666;
	}

	.login-mian button {
		width: 7rem;
		border: none;
		border: 1px solid #aaa;
		background-color: #fff;
		outline: none;
		height: .7rem;
		margin-left: 0.25rem;
		border-radius: 0.1rem;
	}

	input:-internal-autofill-selected {
		background-color: #fff !important;
	}
</style>
