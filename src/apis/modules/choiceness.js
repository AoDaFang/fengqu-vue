import request from './request.js'

//获取精选列表的接口
//GET
var choicenessListUrl = 'proxy'
//https://m.wanzhoumo.com/proxy?api_path=%2Factivity%2Fhomelist&pagesize=15&offset=0&city_id=10898
// api_path=%2Factivity%2Fhomelist 验证参数 
// pagesize=15  每页大小
// offset=0     开始的索引
// city_id=10898  城市id

//获取上方导航条的接口
//get
var navListUrl = 'proxy'
// https://m.wanzhoumo.com/proxy?api_path=%2Fnavtabs%2F10898&v=3.0&fields_version=3.3
// api_path=%2Fnavtabs%2F10898
// v=3.0
// fields_version=3.3



//获取精选列表的方法
function choicenessList(params) {
    return request.request({
        url: choicenessListUrl,
        method: 'get',
        params: params
    })
}
//获取上方导航条的方法
function navList(params) {
    return request.request({
        url: navListUrl,
        method: 'get',
        params: params
    })
}




export default {
    choicenessList, navList, 
}