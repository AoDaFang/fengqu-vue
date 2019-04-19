<template>
	<div class="register">
		<div class="header">
			<i class="el-icon-arrow-left"></i>
			<span>注册</span>
		</div>

		<div class="main">
			<div class="ipt-item">
				<input type="text" v-model="phone" placeholder="手机号码">
			</div>
			<div class="ipt-item">
				<input type="text" v-model="code" placeholder="图片验证码">
				<div class="sys-code">{{sys_code}}</div>
				<i class="el-icon-refresh" @click="createSysCode"></i>
			</div>
			<div class="ipt-item">
				<input type="text" v-model="msg_code" placeholder="短信验证码">
				<button class="send-msg" @click="dealMsg">发送验证码</button>
			</div>
			<div class="ipt-item">
				<input type="text" v-model="password" placeholder="密码(6~18位数字字母组合)">
			</div>
		</div>

		<button class="submit" @click="submit">注册</button>


	</div>
</template>

<script>
	export default {
		name: 'HelloWorld',
		data() {
			return {
				phone: "",
				code: "",
				sys_code: "",
				msg_code: "",
				password: ""
			}
		},
		created: function() {
			this.createSysCode()
			
		},
		methods: {
			createSysCode: function() {
				this.sys_code = "" + parseInt(Math.random() * 10) + parseInt(Math.random() * 10) + parseInt(Math.random() * 10) +
					parseInt(Math.random() * 10)
			},
			submit: async function() {
				if(!this.phone){
					 this.$message.error('请填写电话号码');
					 return
				}
				if(!this.code){
					 this.$message.error('请填写验证码');
					 return
				}
				if(!this.msg_code){
					 this.$message.error('请填写短信验证码');
					 return
				}
				if(!this.password){
					 this.$message.error('请填写密码');
					 return
				}
				if(this.sys_code != this.code){
					 this.$message.error('验证码错误');
					 return
				}
				
				var dict = {
					phone:this.phone,
					password:this.password,
					msg:this.msg_code
				}
				
				var res = await this.api.userApi.register(dict)
				console.log(res)
				
			},
			dealMsg: async function(){
				if(!this.phone){
					 this.$message.error('请填写电话号码');
					 return
				}
				if(!this.code){
					 this.$message.error('请填写验证码');
					 return
				}
				if(this.sys_code != this.code){
					 this.$message.error('验证码错误');
					 return
				}
				var dict = {
					phone:this.phone,
				}
				
				var res = await this.api.userApi.msg(dict)
				console.log(res)
			}
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.header {
		height: 0.8rem;
		display: flex;
		align-items: center;
	}

	.header i {
		color: #d4383e;
		font-size: 0.37rem;
		font-weight: bold;
		margin-left: 0.3rem;

	}

	.header span {
		font-size: 0.37rem;
		font-weight: bold;
		margin-left: 2.81rem;
	}

	.main {
		border-bottom: 1px solid #e6e6e6;
	}

	.ipt-item {
		width: 100%;
		height: 0.8rem;
		border-top: 1px solid #e6e6e6;
		display: flex;
		align-items: center;
	}

	.sys-code {
		width: 1.37rem;
		font-size: 0.4rem;
		background-color: #eee;
		height: 0.6rem;
		line-height: 0.6rem;
		text-align: center;

	}

	.ipt-item input {
		height: 0.8rem;
		text-indent: 2em;
		border: none;
		outline: none;
		box-sizing: border-box;
		width: 5.1rem;
	}

	.el-icon-refresh {
		font-size: 0.36rem;
		margin-left: 0.2rem;
	}

	.send-msg {
		width: 1.85rem;
		height: 0.54rem;
		background-color: #fff;
		border: 1px solid #8c8c8c;
		border-radius: 5px;
		outline: none;
	}

	.submit {
		height: 0.7rem;
		width: 7rem;
		margin-left: 0.25rem;
		background-color: #d4383e;
		color: #Fff;
		border: none;
		outline: none;
		border-radius: 5px;
	}
</style>
