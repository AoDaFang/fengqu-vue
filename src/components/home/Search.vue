<template>
	<div class="search">
		<div class="search-head">
			<div class="search-ipt">
				<i class="el-icon-search"></i>
				<input type="text" v-model="search_ipt" v-on:keyup.enter="search">
			</div>
			<div class="cancel" @click="dealCancel">取消</div>
		</div>
		
		<div class="search-main">
			
			<div class="search-mian-item" v-if="search_history.length != 0">
				<div class="search-mian-title">搜索历史</div>
				<div class="search-mian-content">
					<div v-for="(item, index) in search_history" :key="index" @click="search_ipt=item">
						{{item}}
					</div>
					
				</div>
			</div>
			
			
			<div class="search-mian-item">
				<div class="search-mian-title">热门搜索</div>
				<div class="search-mian-content">
					<div @click="search_ipt='Nordstrom'">Nordstrom</div>
					<div @click="search_ipt='PLUS专享'">PLUS专享</div>
					<div @click="search_ipt='面膜'">面膜</div>
					<div @click="search_ipt='防晒'">防晒</div>
					<div @click="search_ipt='奶粉'">奶粉</div>
					<div @click="search_ipt='香水'">香水</div>
					<div @click="search_ipt='口红'">口红</div>
					<div @click="search_ipt='化妆品'">化妆品</div>
					<div @click="search_ipt='零食'">零食</div>
				</div>
			</div>
		</div>
		
		<div class="search-goods" v-if="goods_list.length != 0">
			<div class="search-goods-item" v-for="(item, index) in goods_list" :key="index">
				<div class="goods-item-img">
					<img :src="item.img_url" alt="">
				</div>
				<div class="goods-item-info">
					<div class="goods-item-name">{{item.name}}</div>
					<div class="goods-item-price">￥{{item.price}}</div>
				</div>
			</div>
		</div>
		
		<div class="search-goods" style="font-size: 0.4rem; text-align: center; color: #666; padding-top: 0.5rem;" v-if="isShowNoGoods">
			没有相应商品
		</div>
		
		
	</div>
</template>

<script>
	export default {
		name: 'HelloWorld',
		data() {
			return {
				search_ipt:"Nordstrom",
				search_history:[],
				goods_list:[],
				isShowNoGoods:false
			}
		},
		methods: {
			dealCancel:function(){
				this.$router.replace('/')
			},
			search:async function(){
				//历史记录的处理
				if(!window.localStorage.getItem("search_history")){
					var arr = [];
					arr.push(this.search_ipt)
					window.localStorage.setItem("search_history",arr)
					this.search_history = arr
				}else{
					var temp = window.localStorage.getItem("search_history").split(',')
					for(var i = 0; i<temp.length; i++){
						if(temp[i] == this.search_ipt){
							temp.splice(i,1)
							break;
						}
					}
					temp.unshift(this.search_ipt)
					if(temp.length > 10){
						temp = temp.slice(0,10)
					}
					
					window.localStorage.setItem("search_history",temp)
					this.search_history = temp
				}
				
				//开始请求搜索
				var dict = {
					name : this.search_ipt
				}
				var res = await this.api.homeApi.goodsSearch(dict);
				if(res.code == 0){
					this.goods_list = []
					this.isShowNoGoods = true
				}else{
					this.goods_list = res.list
					this.isShowNoGoods = false
				}
			}
		},
		created:function(){
			var temp_arr = window.localStorage.getItem("search_history")
			//若不存在则不进行分割，不然报错
			if(temp_arr){
				this.search_history = temp_arr.split(',')
			}
			
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.search-head{
		width: 100%;
		border-bottom: 1px solid #ebebeb;
		height: 0.8rem;
		display: flex;
		align-items: center;
	}
	.search-ipt{
		width: 6.5rem;
		border-radius: 20px;
		background-color: #e5e5e5;
		height: 0.58rem;
		display: flex;
		align-items: center;
		margin-left: 0.1rem;
	}
	.search-ipt input{
		width: 5.12rem;
		background-color: #e5e5e5;
		outline: none;
		border: none;
		margin-left: 0.1rem;
	}
	.cancel{
		font-size: 0.24rem;
		font-weight: bold;
		margin-left: 0.2rem;
		color: #b9564c;
	}
	.el-icon-search{
		font-size: 0.4rem;
		color: #979797;
		margin-left: 0.2rem;
	}
	
	.search-main{
		padding: 0.2rem;
	}
	.search-mian-title{
		font-size: 0.27rem;
		color: #909090;
	}
	.search-mian-item{
		overflow: hidden;
		margin-top: 0.2rem;
	}
	.search-mian-content>div{
		float: left;
		font-size: 0.27rem;
		border:1px solid #c7c7c7;
		border-radius: 0.4rem;
		padding: 0.15rem;
		margin-left: 0.2rem;
		text-align: center;
		margin-top: 0.2rem;
		
		min-width: 0.6rem;
		max-width: 2rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.search-goods{
		border-top: 1px solid #e9e9e9;
		margin-top: 0.1rem;
	}
	.search-goods-item{
		width: 100%;
		height: 2.45rem;
		display: flex;
	}
	.goods-item-img{
		width: 2.5rem;
		height: 2.24rem;
	}
	.goods-item-img img{
		width: 100%;
	}
	.goods-item-info{
		width: 5rem;
		height: 2.24rem;
		border-bottom: 1px solid #e9e9e9;
		font-size: 0.22rem;
		margin-left: 0.3rem;
	}
	.goods-item-name{
		width: 3.62rem;
		overflow: hidden;
		text-align: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		margin-top: 0.3rem;
		
	}
	.goods-item-price{
		font-size: 0.3rem;
		font-weight: bold;
		color: #a84636;
		margin-top: 0.3rem;
		margin-left: 0.1rem;
	}
</style>
