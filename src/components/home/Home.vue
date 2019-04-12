<template>
	<div class="home">
		<div class="home-header">
			<router-link to='/scan'><i class="el-icon-picture-outline" style="color: #da261a;"></i></router-link>
			<div class="header-title">丰趣海淘</div>
			<div class="header-wrap">
				<router-link to='/search'><i class="el-icon-search"></i></router-link>
				<router-link to='/message'><i class="el-icon-bell"></i></router-link>
			</div>
		</div>

		<div class="home-main-swiper">
			<div class="swiper-container">
				<div class="swiper-wrapper">
					<div class="swiper-slide swiper-no-swiping"><home-index></home-index></div>
					
					<div class="swiper-slide swiper-no-swiping">Slide 2</div>
					<div class="swiper-slide swiper-no-swiping">Slide 3</div>
					<div class="swiper-slide swiper-no-swiping">Slide 4</div>
					<div class="swiper-slide swiper-no-swiping">Slide 5</div>
					<div class="swiper-slide swiper-no-swiping">Slide 6</div>
				</div>
				<!-- 如果需要分页器 -->
				<div class="swiper-pagination"></div>

			</div>
		</div>


		<router-view></router-view>

	</div>
</template>

<script>
	//引入swiper
	import Swiper from 'swiper';
	import HomeNavBar from '@/components/home/HomeNavBar'
	
	import HomeIndex from '@/components/home/HomeIndex'

	export default {
		name: 'HelloWorld',
		data() {
			return {
				
				
			}
		},
		created(){
			
		},
		methods: {
			
		},
		mounted() {
			
			var swiper = new Swiper('.swiper-container', {
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
					renderBullet: function(index, className) {
						var text = '';
						switch (index) {
							case 0:
								text = '首页';
								break;
							case 1:
								text = '美妆';
								break;
							case 2:
								text = '母婴家居';
								break;
							case 3:
								text = '轻奢数码';
								break;
							case 4:
								text = '健康';
								break;
							case 5:
								text = '直购';
								break;
						}
						return '<span style="background-color: inherit;border-radius: 0; font-size:0.23rem; width: 16.666%; height: 0.8rem; line-height:0.8rem; " class="' +
							className + '">' + text + '</span>';
					},
				},
			});
			
		},
		components: {
			'home-navbar': HomeNavBar,
			'home-index': HomeIndex
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	@import '../../../node_modules/swiper/dist/css/swiper.css';
	$primary-color: #da261a;


	.home-header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 0.75rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;
		z-index: 999;
	}

	.home-header a {
		display: block;
		color: $primary-color;
	}

	.home-header i {
		transform: scale(0.5)
	}
	.swiper-slide{
		
		z-index: 99;
	}

	.header-wrap {
		display: flex;
	}

	.header-title {
		text-align: center;
		color: $primary-color;
		font-size: 0.37rem;
		font-weight: bold;
		margin-left: 1rem;
	}

	// swiper样式
	.home-main-swiper{
		.swiper-container {
			position: relative;
			width: 100%;
			padding-bottom: 0.9rem;
		}
		
		.swiper-pagination {
			display: flex;
			height: 0.8rem;
			justify-content: space-around;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			background-color: #fff;
			margin-top: -1px;
			
			position: fixed;
			top: 0.75rem;
			left: 0;
		}
		
		.swiper-wrapper {
			padding-top: 1.55rem;
			width: 100%;
		}
	}
	
</style>
