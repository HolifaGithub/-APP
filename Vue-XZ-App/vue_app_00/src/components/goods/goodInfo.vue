<template>
	<div class="app-goodinfo">
		<!--商品轮播区域-->
		<div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
				<swiper-box :lid=lid @get="getInfo"></swiper-box>
				</div>
			</div>
		</div>
		<!--商品购买区域-->
		<div class="mui-card">
			<div class="mui-card-header">{{info.title}}
			</div>
			<div class="sub-title">{{info.subtitle}}
				<div class="count">
					<span>月销量: {{info.sold_count}} 件</span>
					<span>剩余量：{{info.remain_count}} 件</span>
				</div>
			</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p class=" price">
					<span class="now">销售价：&yen;{{parseInt(info.price).toFixed(2)}}</span>
					市场价：<s>&yen;{{info.prev_price}}</s>
					</p>
					<span>
						购买数量：
					</span>
					<div class="mui-numbox" data-numbox-min='1' data-numbox-max='9'>
					<button class="mui-btn mui-btn-numbox-minus" type="button" @click="num(-1)">-</button>
					<input id="test" class="mui-input-numbox" type="number" v-model="val" />
					<button class="mui-btn mui-btn-numbox-plus" type="button" @click="num(+1)">+</button>
				   </div>
				   <br />
				   	<br />
				   <mt-button  type="primary" @click="goPay">立即购买</mt-button>
				   <mt-button  type="danger" @click="addCart">加入购物车</mt-button>
				</div>
			</div>
			<div class="mui-card-footer">{{info.promise}}</div>
		</div>
		<!--商品参数区域-->
		<div class="mui-card">
			<div class="mui-card-header">商品详情：</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<div class="params">
					<div>类型：{{info.category}}</div>
					<div>名称:{{info.lname}}</div>
					<div>系统:{{info.os}}</div>
					<div>cpu:{{info.cpu}}</div>
					<div>内存:{{info.memory}}</div>
					<div>硬盘:{{info.disk}}</div>
					<div>显卡:{{info.video_card}}</div>
					<div>显存:{{info.video_memory}}</div>
					</div>
				</div>
			</div>
			<div class="mui-card-footer" v-html="info.details"></div>
		</div>
	</div>
</template>

<script>
	import swiper from "../sub/swiper.vue";
	import {Toast} from "mint-ui";
//	import mui from "../../lib/js/mui.js";
	export default{
		data(){
			return{
				lid:0,
				info:[],
				val:1
			}
		},
		created(){
			this.lid=this.$route.query.lid;
			},
		components:{
			"swiper-box":swiper
		},
		methods:{
			getInfo(info){
				this.info=info;
			},
			num(i){
				if(i===-1){
					if(this.val>1){
						this.val -=1;					
					}
				}
				else{
					if(this.val<999){
						this.val +=1;
					}
				}
			},
			addCart(){
				this.$http.get('http://127.0.0.1:3000/islogin').then(result=>{
					if(result.body.ok===1){
		this.$http.get(`http://127.0.0.1:3000/addcart?lid=${this.lid}&count=${this.val}`)
				.then(result=>{
					if(result.body.ok===1){
						Toast("添加成功！");
					    this.$store.commit("addShopCartCount",this.val); 
					}
				})
				}
					else{
						Toast("您尚未登录，请先登录！");
						setTimeout(()=>{
							this.$router.push('/home/login');
						},1000);
					}
				})

			},
			goPay(){
		this.$http.get('http://127.0.0.1:3000/islogin').then(result=>{
					if(result.body.ok===1){
						this.$router.push('/home/pay');
					}
					else{
					Toast("您尚未登录，请先登录！");
						setTimeout(()=>{
							this.$router.push('/home/login');
						},1000);		
					}
					})
			}
		}
	}
</script>

<style>
  div.app-goodinfo div.mui-card div.mui-card-header{color:#555;font-weight: bold;}
  div.app-goodinfo div.mui-card div.sub-title{color: #555;margin:0 5px;}
  div.app-goodinfo div.mui-card div.sub-title div.count span:first-child{margin-right: 130px;margin-left: 10px;}
   div.app-goodinfo div.mui-card div.sub-title div.count span{color: #007AFF;}
  div.app-goodinfo div.mui-card  div.mui-card-content p.price span.now{color: #007AFF;font-size: 18px;font-weight: bold;margin-right: 30px;}
  div.app-goodinfo div.mui-card  div.mui-card-content div.params{display: flex;justify-content:space-around;flex-wrap: wrap;}
  div.app-goodinfo div.mui-card  div.mui-card-content div.params div{width: 50%;color: #555;}
  div.app-goodinfo div.mui-card:nth-child(3)   div.mui-card-header{background-color:#26A2FF;color: #eee;}
  div.app-goodinfo div.mui-card  div.mui-card-footer{width:100%;padding: 0;}
  div.content_tpl div.formwork img{width: 100%;}
  button.mint-button.mint-button--primary.mint-button--normal{margin:0 2px;}
</style>