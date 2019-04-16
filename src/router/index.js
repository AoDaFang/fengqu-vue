import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import Scan from '@/components/home/Scan'
import Message from '@/components/home/Message'
import Search from '@/components/home/Search'
import User from '@/components/user/User'
import Login from '@/components/user/Login'
import Register from '@/components/user/Register'
import Cart from '@/components/cart/Cart'
import Amusing from '@/components/amusing/Amusing'
import Classification from '@/components/classification/Classification'
import GoodsDetail from '@/components/goods/GoodsDetail'

//引入store
import store from '@/store/store.js'

Vue.use(Router)

var r =  new Router({
	routes: [{
			path: '/',
			name: 'index',
			redirect: '/home'
		},
		{
			path: '/scan',
			name: 'Scan',
			component: Scan
		},
		{
			path: '/search',
			name: 'Search',
			component: Search
		},
		{
			path: '/message',
			name: 'Message',
			component: Message
		},
		{
			path: '/cart',
			name: 'Cart',
			component: Cart
		},
		{
			path: '/goodsdetail/:id',
			name: 'GoodsDetail',
			component: GoodsDetail
		},
		{
			path: '/amusing',
			name: 'Amusing',
			component: Amusing
		},
		{
			path: '/classification',
			name: 'Classification',
			component: Classification
		},


		{
			path: '/home',
			name: 'Home',
			component: Home,
			children: [
					
			]
		},
		{
			path:'/user',
			name:'User',
			component:User,
		},
		{
			path:"/login",
			name:"Login",
			component:Login
		},
		,
		{
			path:"/register",
			name:"Register",
			component:Register
		}
	]
})

// 路由守卫
r.beforeEach((to, from, next) => {
	if (to.path == "/home") {
		store.commit("setisShowTabbar", true);
	} 
	else if (to.path == "/cart") {
		store.commit("setisShowTabbar", true);
	} 
	else if (to.path == "/classification") {
		store.commit("setisShowTabbar", true);
	}
	else if (to.path == "/amusing") {
		store.commit("setisShowTabbar", true);
	}
	else if (to.path == "/user") {
		store.commit("setisShowTabbar", true);
	}
	else {
		store.commit("setisShowTabbar", false);
	}
	next();
});


export default r;