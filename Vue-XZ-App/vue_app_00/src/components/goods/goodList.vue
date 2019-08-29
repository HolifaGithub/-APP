<template>
	<div id="app-goodlist">
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
	</div>
</template>

<script>
	export default{
		data(){
			return{
				productList:[]
			}
		},
		created(){
			this.$http.get('http://127.0.0.1:3000/getproductlist').then(result=>{
				this.productList=result.body;
			})
		},
		methods:{
			toGoodInfo(lid){
				this.$router.push(`/home/goodinfo?lid=${lid}`);
			}
		}
	}
</script>

<style scoped>
	*{padding: 0;margin: 0;box-sizing: border-box;}
	#app-goodlist{display: flex;justify-content: flex-start;flex-wrap: wrap;}
	#app-goodlist div.good-item{border: 1px solid skyblue;box-shadow: 0 0 8px #ccc;border-radius: 9px;cursor: pointer;margin: 7px 3px 0 2px;}
	#app-goodlist div.good-item img {width: 180px;border-bottom: 1px solid skyblue;}
	#app-goodlist div.good-item h4.good-title{font-size: 12px;color: deepskyblue;width: 180px;text-align: center;}
	#app-goodlist div.good-item h4.good-title img{width: 22px;}
	#app-goodlist div.good-item div.good-info{margin-top: 10px;}
	#app-goodlist div.good-item  span.now{font-weight: bold;color: red;font-size: 18px;margin-right: 10px;}
	#app-goodlist div.good-item  s.old{font-size: 16px;}
	#app-goodlist div.good-item p.good-selled{color: #555;font-weight: bold;margin-left: 5px}
	#app-goodlist div.good-item p.good-sell{color: red;font-weight: bold;background-color: yellow;padding-left: 5px;}
	#app-goodlist div.good-item p.good-sell span:first-child{margin-right: 40px;}
	#app-goodlist div.good-item p.good-price{margin-left: 5px;}
	#app-goodlist div.good-item p.good-price b{color: #555;}
	#app-goodlist div.good-item{background-color: rgba()}
</style>