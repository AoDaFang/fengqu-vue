<template>
	<div class="home-index">

		<!-- index页轮播	 -->
		<el-carousel style="z-index: 999; position: relative; border-radius: 10px; overflow: hidden; " :interval="5000" arrow="always"
		 height="2.82rem">
			<el-carousel-item v-for="(item,index) in ads_list" :key="index">
				<img :src="item.img_url" alt="">
			</el-carousel-item>
		</el-carousel>

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

	</div>
</template>

<script>
	import Swiper from 'swiper';
	export default {
		name: 'HelloWorld',
		data() {
			return {
				ads_list: [],
				ltn_goods_list: [],

				//闪购倒计时
				ltn_hour: "07",
				ltn_minute: "01",
				ltn_second: "02",
			}
		},
		created: function() {
			this.getAdsList()
			this.dealLightningTime()
			this.getLtnGoods()
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
					console.log(this.ltn_goods_list)

				} else {
					console.log("闪购数据下载出错")
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
<style scoped>
	.home-index {}

	.home-index-swiper .swiper-slide {
		background-color: yellow;
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
		z-index: 99999999999999999;
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
	
	.ltn_item_info{
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
		-webkit-box-orient: vertical;
	}
	.ltn_progress{
		width: 1.5rem;
		height: 0.15rem;
		border-radius: 10px;
		background-color: #fbecec;
		margin-top: 0.4rem;
	}
	.ltn_progress_in{
		height: 0.15rem;
		border-radius: 10px;
		background-color: #e3393f;
	}
	.ltn_item_price{
		font-size: 0.23rem;
		font-weight: bold;
		color: #d22220;
		margin-top: 0.2rem;
	}
	
	.active-huge-btn{
		display: flex;
		justify-content: space-around;
		margin-top: 0.3rem;
	}
	.active-huge-btn div{
		width: 3.3rem;
		height: 1.7rem;
	}
	.active-huge-btn img{
		width: 100%;
		height: 100%;
	}
</style>
