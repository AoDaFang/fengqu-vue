import request from './request.js'

//获取轮播列表的接口
//GET
var adsListUrl = 'home/adslist'
// http://localhost:3000/home/adslist

//获取闪购商品
var ltnGoodsUrl= 'goods/ltngoods'
// http://localhost:3000/goods/ltngoods


//获取上方导航条的方法
function adsList(params) {
    return request.request({
        url: adsListUrl,
        method: 'get',
        params: params
    })
}


//获取闪购商品
function ltnGoods(params) {
    return request.request({
        url: ltnGoodsUrl,
        method: 'get',
        params: params
    })
}



export default {
    adsList, ltnGoods
}