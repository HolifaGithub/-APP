<template>
	<div class="app-homecontainer">
		<!--顶部导航条-->
		<!--<mt-header fixed title="学子商城"></mt-header>-->
		<!--轮播图-->
		<mt-swipe :auto="4000" >
			<mt-swipe-item v-for="i in imgList" :key="i.id"><img :src="i.imgUrl" alt="" /></mt-swipe-item>
		</mt-swipe>
		<!--六宫格-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
		            	<router-link to="/home/newslist">
		                    <img src="../../img/menu1.png"/>
		                    <div class="mui-media-body">新闻资讯</div>
		            	</router-link>
		            </li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
		            	<a >
		                    <img src="../../img/menu2.png"/>
		                    <div class="mui-media-body">点餐</div>
		            	</a>
		            </li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
		            	<a href="#" @click.prevent="jumpGoodList()">
		                    <img src="../../img/menu3.png"/>
		                    <div class="mui-media-body">商品</div>
		            	</a>
		            </li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" @click="checkIsLogin">
		            	<a>
		                    <img src="../../img/menu4.png"/>
		                    <div class="mui-media-body">支付</div>
		            	</a>
		            </li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../img/menu5.png"/>
		                    <div class="mui-media-body">成功</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
		            	<router-link to="/home/goodlist">
		                    <img src="../../img/menu6.png"/>
		                    <div class="mui-media-body">列表</div>
		            	</router-link>
		            </li>
		    </ul> 
	</div>
</template>

<script>
	import {Toast} from "mint-ui";	
	export default {
		data(){
			return {
				imgList:[]
			}
		},
		methods:{
			getImage(){
				var url='http://127.0.0.1:3000/imageList';
				this.$http.get(url).then(result=>{
					this.imgList=result.body;
				})
			},
			jumpGoodList(){
				this.$router.push('/home/goodlist');
			},
			checkIsLogin(){
				this.$http.get('http://127.0.0.1:3000/islogin').then(result=>{
			     if(result.body.ok===1){
			     this.$router.push('/home/pay');
			     }
			     else{
			     	Toast({
			     		message:'您尚未登录，请先登录！',
			     		duration:1000
			     	});
			     	setTimeout(()=>{
			     		this.$router.push('/home/login');
			     	},1000);
			     }
			     
			})			
			}
		},
		created(){
			this.getImage();
		}
	}
</script>

<style>
	div.app-homecontainer  .mint-swipe{height: 180px;}
	div.app-homecontainer  .mint-swipe img{width: 100%;}
	div.app-homecontainer ul li{cursor: pointer;}
	/*六宫格*/
	.app-homecontainer .mui-table-view.mui-grid-view.mui-grid-9{
		background-color: #fff;
		border: 0;
	}
	.app-homecontainer .mui-table-view.mui-grid-view.mui-grid-9 img{width: 60px;height: 60px;}
	.app-homecontainer .mui-table-view.mui-grid-view.mui-grid-9 div.mui-media-body{font-size: 13px;}
</style>