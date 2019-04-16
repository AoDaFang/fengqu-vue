<template>
	<div class="goods">
		<div class="header">
			<i class="el-icon-arrow-left" @click="$router.go(-1)"></i>
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
			<i class="el-icon-star-on" @click="isStar = !isStar" style="color: #ff0400;" v-if="isStar"></i>

			<router-link to="/cart">
				<i class="el-icon-goods"></i>
				<el-badge :value="$store.state.cartList.length" class="item">

				</el-badge>
			</router-link>

			<button class="buy-btn" @click="isShowMask=true">直接购买</button>
			<button class="cart-btn" @click="isShowMask=true">加入购物车</button>
		</div>

		<!-- 遮罩 -->
		<div class="mask" v-if="isShowMask" @click="isShowMask=false"></div>
		<!-- 购买遮罩 -->
		<div class="info-mask" v-if="isShowMask">
			<div class="mask-goods-info">
				<div class="mask-goods-img"><img :src="goods.img_url" alt=""></div>
				<div class="mask-goods-wrap">
					<div class="mask-goods-name">{{goods.name}}</div>
					<div class="mask-goods-price">￥{{goods.price}}</div>
				</div>
			</div>


			<div class="select-item">
				<div class="select-item-title">型号</div>
				<div style="display: flex; padding: 0.2rem;">
					<input type="radio" id="q1" name="A1" />
					<label for="q1">
						脱脂
					</label>

					<input type="radio" id="q2" name="A1" />
					<label for="q2">
						全脂
					</label>
				</div>
			</div>

			<div class="select-item" style="display: flex; flex-direction: column;">
				<div class="select-item-title">数量选择</div>
				<el-input-number size="mini" v-model="count_goods" :min="1" width="1.21rem" height="0.33rem"></el-input-number>
			</div>

			<div style="display: flex;justify-content: center; padding-top: 0.2rem; border-top: 1px solid #eee;">
				<button class="submit" @click="submit">确定</button>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'HelloWorld',
		data() {
			return {
				isStar: false, //模拟 星星数据
				isShowMask: false,
				count_goods: 0,
				user: {},
				goods_id: "",
				goods: {}
			}
		},
		created: function() {
			this.goods_id = this.$route.params.id
			this.user = JSON.parse(window.localStorage.getItem("user"))
			this.getData()
		},
		methods: {
			getData: async function() {
				var dict = {
					id:this.goods_id
				}
				var res = await this.api.homeApi.goodsDetail(dict)
				this.goods = res.item
			},
			submit: async function() {
				var dict = {
					user_id: this.user.id,
					goods_id: this.goods_id,
					num: this.count_goods
				}

				var res = await this.api.cartApi.add(dict)
				if (res.code == 1) {
					this.$message({
						message: '添加成功',
						type: 'success'
					});
					this.isShowMask = false
				}else{
					this.$message({
						message: '添加失败',
						type: 'error'
					});
				}
			}
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.goods {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.header {
		/* position: fixed;
		top: 0;
		left: 0; */

		display: flex;
		align-content: center;
		height: 0.8rem;
		border-bottom: 1px solid #eee;
		background-color: #fff;
		z-index: 1;
	}

	.header .el-icon-arrow-left {
		font-size: 0.37rem;
		color: #d12f2f;
		line-height: 0.8rem;
		margin-left: 0.3rem;
	}

	.header div {
		font-size: 0.32rem;
		font-weight: bold;
		font-family: "黑体";
		line-height: 0.8rem;
		margin-left: 2.53rem;
	}

	.goods-img {
		height: 7.5rem;
		width: 100%;
		border-bottom: 1px solid #eee;
		margin-top: 0.8rem;
	}

	.goods-img img {
		width: 100%;
		height: 100%;
	}

	.goods-price {
		height: 1rem;
		line-height: 1rem;
		color: #cb1320;
		font-size: 0.3rem;
		padding-left: 0.3rem;
	}

	.goods-name {
		font-size: 0.25rem;
		padding: 0.2rem;
	}

	.footer {
		width: 100%;
		height: 1.03rem;
		border-top: 1px solid #eee;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		align-items: center;
	}

	.footer i {
		font-size: 0.5rem;
		margin-left: 0.2rem;
		line-height: 1.03rem;
	}

	.footer .el-badge {
		position: absolute;
		left: 1.15rem;
		top: -0.25rem;
	}

	.footer a {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.footer button {
		outline: none;
		height: 0.8rem;
		border-radius: 5px;
	}

	.buy-btn {
		width: 2.36rem;
		color: #993229;
		border: 1px solid #993229;
		background-color: #fff;
		margin-left: 0.5rem;
	}

	.cart-btn {
		width: 2.8rem;
		background-color: #e42118;
		color: #fff;
		border: none;
		margin-left: 0.2rem;
	}

	.mask {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
		z-index: 2;
	}

	.info-mask {
		position: fixed;
		bottom: 0;
		left: 0;
		height: 6.84rem;
		width: 100%;
		background-color: #fff;
		z-index: 3;
	}

	.mask-goods-info {
		display: flex;
		align-items: center;
	}

	.mask-goods-img {
		width: 1.28rem;
		height: 1.28rem;
		border-radius: 5px;
		border: 1px solid #eee;
	}

	.mask-goods-img img {
		width: 100%;
		height: 100%;
	}

	.mask-goods-wrap {
		font-size: 0.25rem;
		width: 5.48rem;
		margin-left: 0.2rem;
	}

	.mask-goods-name {
		overflow: hidden;
		text-align: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.mask-goods-price {
		font-size: 0.33rem;
		color: #ba332a;
		font-size: bold;
		margin-left: 0.1rem;
	}

	.select-item {
		border-top: 1px solid #eee;
	}

	.select-item input {
		display: none;
		transition: all 0.1s;
	}

	.select-item label {
		padding: 0 0.2rem;
		height: 0.45rem;
		border-radius: 5px;
		overflow: hidden;
		text-align: center;
		line-height: 0.45rem;
		margin: 0px 20px;
		color: #333;
		font-size: 12px;
		font-weight: 400;
		display: inline-block;
		cursor: pointer;
		transition: all 0.3s;
		border: 1px solid #eee;
	}

	.select-item input:checked+label {
		color: #fff;
		background-color: #e72217;
	}

	.select-item-title {
		font-size: 0.24rem;
		padding: 0.25rem;
	}

	.submit {
		width: 7.09rem;
		height: 0.86rem;
		background-color: #e42311;
		border: none;
		color: #fff;
		border-radius: 5px;
	}
</style>
