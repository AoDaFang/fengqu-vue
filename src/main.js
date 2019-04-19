// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store/store.js'

//引入axios 
import axios from 'axios'
import VueAxios from 'vue-axios'

//引入rem布局
import rem from '@/remjs/rem-config.js'

//引入mock
require('./mock.js')

//引入mui
import './assets/css/mui.css'
import mui from './assets/js/mui.js'
Vue.prototype.mui = mui

//引入element ui
import ElementUI from 'element-ui'; 
import 'element-ui/lib/theme-chalk/index.css'; 
Vue.use(ElementUI);

//引入接口
import api from '@/apis/index.js'
Vue.prototype.api = api;


//引入swiper样式
import 'swiper/dist/css/swiper.css';

//导入axios
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
