<template>
	<div id="app">
		<router-view />
		<tab-bar></tab-bar>
	</div>
</template>

<script>
	import Tabbar from '@/components/Tabbar'
	export default {
		name: "App",
		components: {
			'tab-bar': Tabbar
		},
		created() { //监听界面跳转，如果是主页几个界面则设置axios的值显示底部导航栏

			this.$router.beforeEach((to, from, next) => {
				console.log(789)
				if (to.path == "/home") {
					this.$store.commit("setisShowTabbar", true);
					console.log(123)
				} else {
					this.$store.commit("setisShowTabbar", false);
					console.log(456)
				}
				next();

			})
		}
	};
</script>

<style>
	#app{
		background-color: #fff;;
	}
	.swiper-pagination-bullet-active{
		border-bottom: 2px solid #da261a;
	}
	a{
		text-decoration: none;
		color: #000;
	}
</style>
