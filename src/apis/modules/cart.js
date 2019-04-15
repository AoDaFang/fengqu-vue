import request from './request.js'

//获取购物车列表
//get
var cartListUrl = 'cart'
// http://localhost:3000/cart


//添加或者修改商品的接口
//POST
var addUrl = 'cart'
// http://localhost:3000/cart

//添加或者修改商品的接口
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

//删除
function deleteItem(params){
	return request.request({
	    url: deleteUrl,
	    method: 'delete',
	    params: params
	})
}




export default {
    cartList, add, deleteItem
}