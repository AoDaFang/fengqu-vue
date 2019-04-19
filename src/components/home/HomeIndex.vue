<template>
	<div class="home-index">

		<!-- index页轮播	 -->
		<div class="index-swiper">
			<el-carousel style="z-index: 999; position: relative; border-radius: 10px; overflow: hidden; " :interval="5000" arrow="always"
			 height="2.82rem">
				<el-carousel-item v-for="(item,index) in ads_list" :key="index">
					<img :src="item.img_url" alt="">
				</el-carousel-item>
			</el-carousel>
		</div>

		<!-- 活动大按钮 -->
		<div class="active-big-btn">
			<div class="big-btn-item">
				<img src="../../img/out_btn.jpg" alt="">
				<span>积分签到</span>
			</div>
			<div class="big-btn-item">
				<img src="../../img/out_btn.jpg" alt="">
				<span>新人1119礼</span>
			</div>
			<div class="big-btn-item">
				<img src="../../img/out_btn.jpg" alt="">
				<span>邀请有礼</span>
			</div>
			<div class="big-btn-item">
				<img src="../../img/out_btn.jpg" alt="">
				<span>PLUS会员</span>
			</div>
			<div class="big-btn-item">
				<img src="../../img/out_btn.jpg" alt="">
				<span>力度升级</span>
			</div>
			<div class="big-btn-item">
				<img src="../../img/out_btn.jpg" alt="">
				<span>春夏出行</span>
			</div>
			<div class="big-btn-item">
				<img src="../../img/out_btn.jpg" alt="">
				<span>疯狂捡漏</span>
			</div>
			<div class="big-btn-item">
				<img src="../../img/out_btn.jpg" alt="">
				<span>全民拼团</span>
			</div>
		</div>

		<div class="new-start">
			<img src="../../img/new_start.png" alt="">
		</div>

		<!-- 闪购 -->
		<div class="lightning">
			<div class="lightning_title">
				<div>正在闪购</div>
				<div>仅剩
					<span>{{ltn_hour}}</span>:
					<span>{{ltn_minute}}</span>:
					<span>{{ltn_second}}</span>
				</div>
			</div>
			<div class="lightning_goods">
				<div class="lightning_goods_item" v-for="(item, index) in ltn_goods_list" :key="index">
					<div class="ltn_item_img">
						<img :src="item.img_url" alt="">
					</div>
					<div class="ltn_item_info">
						<div class="ltn_item_name">{{item.name}}</div>
						<div class="ltn_progress">
							<div class="ltn_progress_in" :style="'width:' + item.progress + '%;'"></div>
						</div>
						<div class="ltn_progress_num">还剩{{item.progress}}%</div>
						<div class="ltn_item_price">￥{{item.price}}</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 活动按钮 -->
		<div class="active-huge-btn">
			<div>
				<img src="../../img/home_active_btn1.jpg" alt="">
			</div>
			<div>
				<img src="../../img/home_active_btn2.jpg" alt="">
			</div>
		</div>
		
		<!-- 首页活动块 -->
		<div class="home_active_wrap" v-for="(item, index) of home_active_list" :key="index">
			<div class="home_active_img"><img :src="item.img_url" alt=""></div>
			<div class="home_active_goods_list">
				<div class="home_active_goods_item" v-for="(goods, index_in) in item.list" :key="index_in">
					<router-link :to="'/goodsdetail/' + goods.id">
						<div><img :src="goods.img_url" alt=""></div>
						<div class="home_active_goods_name">{{goods.name}}</div>
						<div class="home_active_goods_price">￥{{goods.price}}</div>
					</router-link>
				</div>
			</div>
		</div>
		
		<!-- 商品列表 -->
		<div class="goods-list">
			<div class="goods-item" v-for="(item, index) in goods_list" :key="index">
				<div class="goods-item-img"><img :src="item.img_url" alt=""></div>
				<div class="goods-item-name">{{item.name}}</div>
				<div class="goods-item-price">￥{{item.price}}</div>
			</div>
			
		</div>

	</div>
</template>

<script>
	import Swiper from 'swiper';
	export default {
		name: 'HelloWorld',
		data() {
			return {
				ads_list: [],//轮播图
				ltn_goods_list: [],//闪购
				home_active_list:[],//大活动块
				goods_list:[],//商品列表

				//闪购倒计时
				ltn_hour: "07",
				ltn_minute: "01",
				ltn_second: "02",
				
				page:1,
				size:6,
			}
		},
		created: function() {
			this.getAdsList()
			this.dealLightningTime()
			this.getLtnGoods()
			this.getHomeActive();
			this.getGoodsList()
		},
		mounted: function() {},
		methods: {
			//下载轮播图
			getAdsList: async function() {
				var res = await this.api.homeApi.adsList()
				if (res.code == 1) {
					this.ads_list = res.list;
				} else {
					console.log("轮播图数据下载出错")
				}
			},

			//下载闪购商品
			getLtnGoods: async function() {
				var res = await this.api.homeApi.ltnGoods()
				if (res.code == 1) {
					this.ltn_goods_list = res.list;

				} else {
					console.log("闪购数据下载出错")
				}
			},
			//下载活动列表
			getHomeActive: async function () {
				var res = await this.api.homeApi.homeActive();
				if (res.code == 1) {
					this.home_active_list = res.list;
				
				} else {
					console.log("活动列表数据下载出错")
				}
			},
			//下载商品列表
			getGoodsList: async function(){
				var dict = {
					page:this.page,
					size:this.size
				}
				var res = await this.api.homeApi.goodsList(dict);
				
				//若请求第一页
				if(this.page == 1){
					if (res.code == 1) {
						this.goods_list = res.list;
					} else {
						console.log("商品数据下载出错")
					}
				}else{//若请求其他页面
					if (res.code == 1) {
						var new_list = this.goods_list.concat(res.list);
						this.goods_list = new_list
					} else {
						console.log("商品数据下载出错")
					}
				}
				
				
			},
			

			//处理闪购倒计时 lightning
			dealLightningTime: function() {
				setInterval(() => {
					var hour = this.ltn_hour;
					var minute = this.ltn_minute;
					var second = this.ltn_second;

					second--;
					if (second < 10) {
						second = "0" + second
						if (second == 0) {
							second = 59
							minute--;

							if (minute < 10) {
								minute = "0" + minute
								if (minute == 0) {
									minute = 59;
									hour--;

									if (hour < 10) {
										hour = "0" + hour
										if (hour == 0) {
											return
										}
									}
								}
							}
						}
					}


					this.ltn_hour = hour;
					this.ltn_minute = minute;
					this.ltn_second = second;

				}, 1000)
			}
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.home-index {}

	.home-index-swiper .swiper-slide {
		background-color: yellow;
	}
	.index-swiper{
		padding-left: 0.15rem;
		padding-right: 0.15rem;
	}
	.el-carousel {
		margin-top: 0.1rem;
		border-radius: 5px;
		overflow: hidden;
	}

	.el-carousel img {
		height: 2.82rem;
		width: 100%;
	}


	.active-big-btn {
		display: flex;
		width: 100%;
		flex-wrap: wrap;

	}

	.big-btn-item {
		min-width: 25%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 0.2rem;

	}

	.big-btn-item img {
		height: 0.74rem;
		width: 0.74rem;
	}

	.big-btn-item span {
		margin-top: 0.1rem;
		font-size: 0.3rem;
	}

	.new-start {
		margin: 0.15rem auto;
	}

	.new-start img {
		width: 100%;
	}


	.lightning_title {
		font-size: 0.3rem;
		font-weight: bold;
		display: flex;
		justify-content: space-between;
		padding: 0.15rem;
	}

	.lightning_title span {
		display: inline-block;
		color: #fff;
		background-color: #000000;
		width: 0.43rem;
		text-align: center;
		border-radius: 3px;
	}

	.lightning_goods {
		display: flex;
		overflow: scroll;
		width: 100%;
		margin-top: 10px;
	}

	.lightning_goods::-webkit-scrollbar {
		width: 0;
		height: 0;
		opacity: 0;
		display: none;
	}

	.lightning_goods_item {
		min-width: 4.28rem;
		height: 2.30rem;
		border: 1px solid #f0f0f0;
		font-size: 0.20rem;
		display: flex;
	}

	.ltn_item_img img {
		width: 2.16rem;
		height: 2.16rem;
	}

	.ltn_item_info {
		margin-left: 0.3rem;
	}

	.ltn_item_name {
		font-size: 0.23rem;
		font-weight: bold;
		width: 1.53rem;
		margin-top: 0.27rem;

		overflow: hidden;
		text-align: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		/*! autoprefixer: off */
		-webkit-box-orient: vertical;
		/* autoprefixer: on */
	}

	.ltn_progress {
		width: 1.5rem;
		height: 0.15rem;
		border-radius: 10px;
		background-color: #fbecec;
		margin-top: 0.4rem;
	}

	.ltn_progress_in {
		height: 0.15rem;
		border-radius: 10px;
		background-color: #e3393f;
	}

	.ltn_item_price {
		font-size: 0.23rem;
		font-weight: bold;
		color: #d22220;
		margin-top: 0.2rem;
	}

	.active-huge-btn {
		display: flex;
		justify-content: space-around;
		margin-top: 0.3rem;
	}

	.active-huge-btn div {
		width: 3.3rem;
		height: 1.7rem;
	}

	.active-huge-btn img {
		width: 100%;
		height: 100%;
	}
	
	.home_active_wrap{
		width: 100%;
		height: 6.3rem;
		position: relative;
		margin-top: 0.2rem;
	}
	.home_active_img{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 6.3rem;
	}
	.home_active_img>img{
		width: 100%;
		height: 100%;	
	}
	.home_active_goods_list{
		position: absolute;
		top: 2.75rem;
		left: 0.23rem;
		height: 3.25rem;
		width: 7.25rem;
		overflow-x: scroll;
		background-color: #fff;
		display: flex;
		flex-wrap: nowrap;
		z-index: 999;
	}
	.home_active_goods_list::-webkit-scrollbar {
		width: 0;
		height: 0;
		opacity: 0;
		display: none;
	}
	.home_active_goods_item{
		width: 2.1rem;
		border-right: 1px solid #e5e5e5;
		box-sizing: border-box;
		font-size: 0.2rem;
		padding: 0.05rem;
	}
	.home_active_goods_item img{
		width: 2rem;
	}
	.home_active_goods_name{
		overflow: hidden;
		text-align: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		/*! autoprefixer: off */
		-webkit-box-orient: vertical;
		/* autoprefixer: on */
	}
	.home_active_goods_price{
		font-size: 0.21rem;
		color: #923125;
		font-weight: bold;
		margin-top: 0.2rem;
	}
	.goods-list{
		display: flex;
		flex-wrap: wrap;
		margin-top: 0.2rem;
		margin-left: 0.2rem;
	}
	.goods-item{
		min-width: 3.54rem;
		height: 5.39rem;
		border-top: 0.01rem  solid #e5e5e5;
		border-bottom: 0.01rem  solid #e5e5e5;
		box-sizing: border-box;
	}
	.goods-item:nth-child(odd){
		border-right: 0.01rem solid #e5e5e5;
	}
	.goods-item{
		font-size: 0.3rem;
	}
	.goods-item-img{
		height: 3.59rem;
		width: 3.54rem;
		margin: 0 auto;
	}
	.goods-item-img img{
		width: 100%;
		height: 100%;
	}
	.goods-item-name{
		overflow: hidden;
		text-align: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		/*! autoprefixer: off */
		-webkit-box-orient: vertical;
		/* autoprefixer: on */
		width: 3.14rem;
		margin: 0.2rem auto;
	}
	.goods-item-price{
		color: #d12923;
		font-weight: bold;
		margin-left: 0.2rem;
	}
</style>
