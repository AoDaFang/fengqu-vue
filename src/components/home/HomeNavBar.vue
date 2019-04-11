<template>
	<div class="swiper-container">
		<div class="swiper-wrapper">
			<div class="swiper-slide">Slide 1</div>
			<div class="swiper-slide">Slide 2</div>
			<div class="swiper-slide">Slide 3</div>
		</div>
		<!-- 如果需要分页器 -->
		<div class="swiper-pagination"></div>

		<!-- 如果需要导航按钮 -->
		<div class="swiper-button-prev"></div>
		<div class="swiper-button-next"></div>

		<!-- 如果需要滚动条 -->
		<div class="swiper-scrollbar"></div>
	</div>
</template>

<script>
	import Swiper from 'swiper'
	export default {
		name: "swiper",
		data() {
			return {
				navList: [{
						name: '热门答疑'
					},
					{
						name: '北清状元'
					}
				],
				nowIndex: 0,
			}
		},
		components: {},
		mounted() {
			new Swiper('.swiper-container', {
				loop: true,
				// 如果需要分页器
				pagination: '.swiper-pagination',
				// 如果需要前进后退按钮
				nextButton: '.swiper-button-next',
				prevButton: '.swiper-button-prev',
				// 如果需要滚动条
				scrollbar: '.swiper-scrollbar',
			})
		},
		methods: {
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.navlist {
		width: 100%;
		height: 40px;
		border-bottom: 1px solid rgba(151, 151, 151, 0.1);
		position: relative;
	}

	.navli {
		padding: 10px 0px;
		text-align: center;
		float: left;
		margin: 0 1.2rem;
	}

	.navli i {
		font-style: normal;
		font-size: 16px;
	}

	.activeT {
		color: #00ba6b;
		padding-bottom: .3rem;
		border-bottom: 2px solid #00ba6b;
	}

	.swiper_con {
		width: 100%;
		margin-bottom: 40px;
		position: relative;
	}

	.choosegrand {
		position: absolute;
		top: -3;
		right: 0;
	}

	.show {
		display: block;
	}

	.none {
		display: none;
	}
</style>
