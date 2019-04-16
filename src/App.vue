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
		
		beforeCreate: async function(){
			
		},
		async created() { //监听界面跳转，如果是主页几个界面则设置axios的值显示底部导航栏
			//store中获取cart
			this.$store.dispatch("requestCartList")
		}
	};
</script>

<style>
	
	html{
		height: 100%;
	}
	body{
		height: 100%;
	}
	#app{
		height: 100%;
	}
	
	
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
	body{
		margin: 0;
	}
</style>
