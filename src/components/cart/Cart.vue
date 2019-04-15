<template>
	<div class="cart">
		<div class="cart-head">
			<b>购物车</b>
			<span @click="isEdit = !isEdit">编辑</span>
		</div>
		<!-- 商品列表 -->
		<div class="goods-list">
			<div class="goods-item"  v-for="(item, index) in goods_list" :key="index">
				<div class="goods-select">
					<i class="el-icon-success" v-if="item.isSelected" @click="dealCancelSelectGoods(index)"></i>
					<div class="no-selected-icon" v-if="!item.isSelected" @click="dealSelectGoods(index)"></div>
				</div>
				<div class="goods-img">
					<img :src="item.goods_detail.img_url" alt="">
				</div>
				<div class="goods-info">
					<div class="info-name">{{item.goods_detail.name}}</div>
					<div class="info-money">
						<div class="info-price">￥{{item.goods_detail.price}}</div>
						<div class="info-num">
							<div v-if="!isEdit">x{{item.num}}</div>
							<el-input-number v-if="isEdit" size="mini" v-model="item.num" :min="1" width="1.21rem" height="0.33rem"  @change="dealModifyNum(index, item.num)"></el-input-number>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<!-- 结算按钮 -->
		<div class="pay">
			<div class="all-selected">
				<i class="el-icon-success" v-if="isAllSelected" @click="dealCancelAllSelected"></i>
				<div class="no-selected-icon" v-if="!isAllSelected" @click="dealAllSelected"></div>
			</div>
			<div style="margin-left: 0.2rem;">全选</div>
			<div class="money-wrap">
				<div class="money" v-if="!isEdit">
					<div class="money-num">￥{{sum}}</div>
					<button>结算</button>
				</div>
				<div class="delete-goods" v-if="isEdit">
					<button @click="dealDeleteGoods">删除选中商品</button>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'HelloWorld',
		data() {
			return {
				isEdit:false,
				goods_list:[],
				isAllSelected:true,
				user:{}
			}
		},
		created: async function() {
			await this.$store.dispatch("requestCartList")
			console.log(this.$store.cartList)
			
			//判定是否登录
			if (!window.localStorage.getItem("isLogin")) {
				this.$router.push({
					path: '/login'
				})

				this.$message({
					message: '请登录',
					type: 'warning'
				});
			}
			this.getCartList()
			this.user = JSON.parse(localStorage.user)
		},
		methods: {
			getCartList: async function(){
				var res = await this.api.cartApi.cartList()
				
				for(var item of res.list){
					item.isSelected =true
				}
				
				this.goods_list = res.list
			},
			//更改商品数量
			dealModifyNum:async function(index,value){
				var dict = {
					user_id : this.user.id,
					goods_id : this.goods_list[index].goods_detail.id,
					num:value
				}
				var res = await this.api.cartApi.add(dict)
				console.log(res)
			},
			
			//选择商品
			dealSelectGoods:function(index){
				this.goods_list[index].isSelected = true;
				var temp_flag = true
				for(var item of this.goods_list){
					if(item.isSelected == false){
						temp_flag = false
					}
				}
				this.isAllSelected = true;
			},
			//取消选择商品
			dealCancelSelectGoods:function(index){
				this.goods_list[index].isSelected = false;
				this.isAllSelected = false;
			},
			//全选
			dealAllSelected:function(){
				this.isAllSelected = true;
				for(var item of this.goods_list){
					item.isSelected = true
				}
			},
			//取消全选
			dealCancelAllSelected:function(){
				this.isAllSelected = false;
				for(var item of this.goods_list){
					item.isSelected = false
				}
			},
			//删除选中商品
			dealDeleteGoods: async function(){
				for(var item of this.goods_list){
					if(item.isSelected == true){
						var dict = {
							user_id : item.user_id,
							goods_id:item.goods_id
						}
						var res = await this.api.cartApi.deleteItem(dict)
					}
				}
				this.getCartList()
			}
		},
		computed:{
			
			sum:function(){
				var sum = 0;
				for(var item of this.goods_list){
					if(item.isSelected == true){
						sum += item.goods_detail.price * item.num
					}
				}
				return sum
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
	.cart{
		width: 100%;
		background-color: #f2f2f2;
		height: 100%;
	}
	.cart-head {
		width: 100%;
		height: 0.8rem;
		border-bottom: 1px solid #eee;
		background-color: #fff;
		display: flex;
	}
	.cart-head b{
		margin-left: 3.26rem;
		font-size: 0.3rem;
		line-height: 0.8rem;
	}
	.cart-head span{
		margin-left: 2.33rem;
		font-size: 0.24rem;
		color: #94614b;
		line-height: 0.8rem;
	}
	.goods-item{
		height: 2rem;
		width: 100%;
		margin-bottom: 0.18rem;
		background-color: #fff;
		display: flex;
	}
	.goods-select{
		width: 0.61rem;
		height: 1.7rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.goods-img{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.el-icon-success{
		font-size: 0.4rem;
		color: #ff5c57;
	}
	.no-selected-icon{
		width: 0.4rem;
		height: 0.4rem;
		border-radius: 50%;
		border:1px solid #666;
		box-sizing: border-box;
	}
	.goods-img{
		height: 1.7rem;
		width: 1.42rem;
	}
	.goods-img img{
		width: 100%;
	}
	
	.goods-info{
		width: 5.43rem;
		height: 1.7rem;
		font-size: 0.23rem;
		margin-top: 0.3rem;
	}
	.info-name{
		text-align: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.info-money{
		display: flex;
		align-items: center;
		margin-top: 0.25rem;
		justify-content: space-between;
	}
	.info-price{
		font-size: 0.24rem;
		color: #d36466;
		font-weight: bold;
		height: 0.6rem;
	}
	.info-num{
		margin-right: 0.2rem;
		margin-bottom: 0.2rem;
		line-height: 0.6rem;
	}
	.pay{
		position: fixed;
		left: 0;
		bottom: 0.9rem;
		height: 1rem;
		width: 100%;
		display: flex;
		align-items: center;
		background-color: #fff;
		border-bottom: 1px solid #eee;
		font-size: .24rem;
	}
	.all-selected{
		display: flex;
		align-items: center;
		margin-left: 0.2rem;
	}
	.money-wrap{
		margin-left: 2.88rem;
		
	}
	.money{
		display: flex;
		align-items: center;
		width: 3.12rem;
		display: flex;
		justify-content: space-between;
	}
	.money-num{
		font-size: 0.3rem;
		color: #bc645b;
		font-weight: bold;
		
	}
	.money button{
		width: 1.88rem;
		height: 0.86rem;
		background-color: #e62114;
		color: #fff;
		border: none;
		outline: none;
		border-radius: 5px;
		margin-left: 0.1rem;
	}
	.delete-goods button{
		width: 2rem;
		height: 0.86rem;
		border:1px solid #e62114;
		color: #e62114;
		outline: none;
		border-radius: 5px;
		margin-left: 0.1rem;
		background-color: #fff;
	}
</style>
