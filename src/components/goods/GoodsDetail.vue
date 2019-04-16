<template>
	<div class="goods">
		<div class="header">
			<i class="el-icon-arrow-left" @click="$router.go(-1)" ></i>
			<div>商品详情</div>
		</div>
		<div class="goods-img">
			<img :src="goods.img_url" alt="">
		</div>
		<div class="goods-price">
			￥{{goods.price}}
		</div>
		<div class="goods-name">
			{{goods.name}}
		</div>
		
		
		<div class="footer">
			<i class="el-icon-star-off" @click="isStar = !isStar" v-if="!isStar"></i>
			<i class="el-icon-star-on" @click="isStar = !isStar" v-if="isStar"></i>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'HelloWorld',
		data() {
			return {
				isStar:false,//模拟 星星数据
				goods:{
					id:1,
					name:"【莹润饱满 喝出紧致肌】法国Floreve馥洛薇 胶原蛋白口服液(小紫针) 14支/盒 美白抗衰",
					price:"538",
					img_url:"https://img0.fengqucdn.com/fq/sku_info/watermark/online/613332/2ecbca2461632bcff45a4d7c17804a0c.jpeg@320h_320w_1c_1e",
				}
			}
		},
		created:function(){
			console.log(this.$route.params.id)
		},
		methods: {
			getData:function(){
				
			}
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.header{
		display: flex;
		align-content: center;
		height: 0.8rem;
		border-bottom: 1px solid #eee;
		position: fixed;
		top: 0;
		left: 0;
		background-color: #fff;
	}
	.header .el-icon-arrow-left{
		font-size: 0.37rem;
		color: #d12f2f;
		line-height: 0.8rem;
		margin-left: 0.3rem;
	}
	.header div{
		font-size: 0.32rem;
		font-weight: bold;
		font-family: "黑体";
		line-height: 0.8rem;
		margin-left: 2.53rem;
	}
	.goods-img{
		height: 7.5rem;
		width: 100%;
		border-bottom: 1px solid #eee;
		margin-top: 0.8rem;
	}
	.goods-img img{
		width: 100%;
		height: 100%;
	}
	.goods-price{
		height: 1rem;
		line-height: 1rem;
		color: #cb1320;
		font-size: 0.3rem;
		padding-left: 0.3rem;
	}
	.goods-name{
		font-size: 0.25rem;
		padding: 0.2rem;
	}
	.footer{
		width: 100%;
		height: 1.03rem;
		border-top: 1px solid #eee;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		
	}
	
</style>
