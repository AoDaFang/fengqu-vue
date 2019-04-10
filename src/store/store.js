import Vue from 'vue'

//vuex
import Vuex from 'vuex'

//引入interface文件
// import api from '@/interface/interface.js'

//加载Vuex
Vue.use(Vuex)

//导入axios VueAxios
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

const store = new Vuex.Store({
	//state,表示状态，作用是储存各个组件共用的数据
	state: {
		
	},


	//getters,表示获取定时器，添加一个函数，用于获取state中的数据
	//调用方式
	// {{ $store.getters.getNavTitle }}
	// this.$store.getters.getNavTitle
	getters: {
		getNavTitle: function(state) { //***注意这个参数***
			return state.navTitle
		},
		
		
	},


	//3.mutations ，修改state中的数据，  需要在这里写函数
	// 调用方式
	// this.$store.commit("setNavTitle","book")
	mutations: {
		
		
		
		//设置，左侧导航栏是否折叠
		setisFlex: function(state, title) {
			state.isFlex = title
		},

	},

	//4.action 表示动作， 要求异步修改state中的值, 需要在这里编写函数
	actions: {
		requestBookList: function() {
			var url = api.bookListUrl
			axios.get(url).then(res => {

				//调用mutations中的方法
				this.commit("setBookList", res.data.result)
			}).catch(error => {
				console.log(error)
			})
		}
	}
})


export default store;
