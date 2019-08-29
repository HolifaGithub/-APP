<template>
	<div id="app-search">
		<div class="search-input">
		<input type="text" v-model="value"  placeholder="关键字搜索"  @keyup.13="search()">
		<a><span class="mui-icon mui-icon-search"></span></a>
		</div>
		<div class="good-item" v-for="(item,i) in productList" :key="i" @click="toGoodInfo(item.lid)">
			<img :src="`http://127.0.0.1:3000/${item.md}`"/>
			<h4 class="good-title"><img src="http://127.0.0.1:3000/img/favicon.ico" />{{item.title}}</h4>
			<div class="good-info">
				<p class="good-price">
					<b>价格：</b>
					<span class="now">&yen;{{item.price}}</span>
					<s class="old">&yen;{{item.prev_price}}</s>
				</p>
				<p class="good-selled">
					<span>已售出：</span>
					<span>{{item.sold_count}}件</span>
				</p>
				<p class="good-sell">
					<span>热卖中</span>
					<span>剩余:{{item.remain_count}}件</span>
				</p>
			</div>
		</div>
		<mt-button type="primary" size="large" @click="getMore" v-show="hasMore">加载更多</mt-button>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	export default{
		data(){
			return {
			 productList:'',
			 value:'',
			 pno:0,
			 hasMore:false,
			 pageCount:0
			}
		},
		created(){
//			this.$http.get('http://127.0.0.1:3000/getproductlist').then(result=>{
//				this.productList=result.body;
//			})
		},
		methods:{
			toGoodInfo(lid){
				this.$router.push(`/home/goodinfo?lid=${lid}`);
			},
			search(){
				if(this.value!==''){
				this.$http.get('http://127.0.0.1:3000/search?pno='+this.pno+'&kw='+this.value).then(result=>{
					this.productList=result.body.data;
					if(this.productList.length>0){
		            this.pageCount=result.body.pageCount;
					if(this.pno<this.pageCount-1&&this.pageCount!==undefined){
						this.hasMore=true;
					}
				}
	           else{
		    				Toast('暂未搜索到相关的商品!');     	
		           }
				})
			}
			},
			getMore(){
			if(this.value!==''){
				this.pno++;
				this.$http.get('http://127.0.0.1:3000/search?pno='+this.pno+'&kw='+this.value).then(result=>{
					 this.productList=this.productList.concat(result.body.data);
					 if(this.pno===this.pageCount-1){
						this.hasMore=false;
					      }
						})
					}	
			}
		}
	}
</script>

<style scoped>
	*{padding: 0;margin: 0;box-sizing: border-box;}
	#app-search{display: flex;justify-content: flex-start;flex-wrap: wrap;}
	#app-search div.good-item{border: 1px solid skyblue;box-shadow: 0 0 8px #ccc;border-radius: 9px;cursor: pointer;margin: 7px 3px 0 2px;}
	#app-search div.good-item img {width: 180px;border-bottom: 1px solid skyblue;}
	#app-search div.good-item h4.good-title{font-size: 12px;color: deepskyblue;width: 180px;text-align: center;}
	#app-search div.good-item h4.good-title img{width: 22px;}
	#app-search div.good-item div.good-info{margin-top: 10px;}
	#app-search div.good-item  span.now{font-weight: bold;color: red;font-size: 18px;margin-right: 10px;}
	#app-search div.good-item  s.old{font-size: 16px;}
	#app-search div.good-item p.good-selled{color: #555;font-weight: bold;margin-left: 5px}
	#app-search div.good-item p.good-sell{color: red;font-weight: bold;background-color: yellow;padding-left: 5px;}
	#app-search div.good-item p.good-sell span:first-child{margin-right: 40px;}
	#app-search div.good-item p.good-price{margin-left: 5px;}
	#app-search div.good-item p.good-price b{color: #555;}
	#app-search div.good-item{background-color: rgba()}
	
	div.search-input input{height: 50px;width:340px;margin-top:2px;}
	div.search-input input+a{display: inline-block;width: 34px;height: 43px;position: relative;top: -8px;cursor: pointer;background-color: #eee}
</style>