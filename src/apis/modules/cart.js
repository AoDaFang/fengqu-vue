import request from './request.js'

//获取购物车列表
//get
var cartListUrl = 'cart'
// http://localhost:3000/cart


//在商品详情页点击添加购物车进行的操作，添加购物信息(没有这条购物车信息的情况下)  或者增加购物车数量
//POST
var addUrl = 'cart/addgoods'
// http://localhost:3000/cart/addgoods
// var dict = {
// 	user_id:1,
// 	goods_ud:1,
// 	num:2
// }

//修改商品数量
//POST
var modifyUrl = 'cart/modifycount'
// http://localhost:3000/cart/modifycount
// var dict = {
// 	user_id:1,
// 	goods_ud:1,
// 	num:2
// }


//删除商品的接口
//delete
var deleteUrl = 'cart'
// http://localhost:3000/cart

//获取列表
function cartList(params) {
    return request.request({
        url: cartListUrl,
        method: 'get',
        params: params
    })
}

//添加或者修改
function add(params){
	return request.request({
	    url: addUrl,
	    method: 'post',
	    params: params
	})
}
//修改
function modify(params){
	return request.request({
	    url: modifyUrl,
	    method: 'post',
	    params: params
	})
}

//删除
function deleteItem(params){
	return request.request({
	    url: deleteUrl,
	    method: 'delete',
	    params: params
	})
}




export default {
    cartList, add, deleteItem,
	modify, 
}