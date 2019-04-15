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

Vue.use(Router)

export default new Router({
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
