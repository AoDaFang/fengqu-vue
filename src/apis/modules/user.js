import request from './request.js'

//登录接口
//POST
var loginUrl = 'user/login'

//注册接口
//POST
var registerUrl = 'user/register'

//获取验证码
//GET
var msgUrl = 'user/msgcode'
// http://localhost:3000/user/msgcode?phone=123456

//登录
function login(params) {
    return request.request({
        url: loginUrl,
        method: 'post',
        params: params
    })
}

//注册
function register(params) {
    return request.request({
        url: registerUrl,
        method: 'post',
        params: params
    })
}

//短信
function msg(params) {
    return request.request({
        url: msgUrl,
        method: 'get',
        params: params
    })
}



export default {
    login, register, msg
}