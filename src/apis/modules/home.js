import request from './request.js'

//获取轮播列表的接口
//GET
var adsListUrl = 'home/adslist'
// http://localhost:3000/home/adslist

//获取闪购商品
//Get
var ltnGoodsUrl= 'goods/ltngoods'
// http://localhost:3000/goods/ltngoods

//获取活动列表
//GET
var homeActiveUrl = 'home/homeactive'
//http://localhost:3000/home/homeactive

//获取商品列表
//Get
var goodsListUrl = 'goods'
// http://localhost:3000/goods

//搜索商品接口
//GET
var goodsSearchUrl = 'goods/search'
//http://localhost:3000/goods/search?name=%E8%9B%8B%E7%99%BD

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
//获取闪购商品
function homeActive(params) {
    return request.request({
        url: homeActiveUrl,
        method: 'get',
        params: params
    })
}
//获取商品列表
function goodsList(params) {
    return request.request({
        url: goodsListUrl,
        method: 'get',
        params: params
    })
}
//搜索商品
function goodsSearch(params) {
    return request.request({
        url: goodsSearchUrl,
        method: 'get',
        params: params
    })
}


export default {
    adsList, ltnGoods, homeActive,
	goodsList, goodsSearch, 
}