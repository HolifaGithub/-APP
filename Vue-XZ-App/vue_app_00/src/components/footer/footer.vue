<template>
<!--底部导航栏-->
	<nav class="mui-bar mui-bar-tab">
	<router-link :class="`mui-tab-item ${index?'mui-active':''}`" to="/">
		<span class="mui-icon mui-icon-home" @click="changeActive('index')"></span>
		<span class="mui-tab-label">首页</span>
	</router-link>
	<router-link :class="`mui-tab-item ${user?'mui-active':''}`" to="/home/login"  >
		<span class="mui-icon  mui-icon-contact" @click="changeActive('user')"></span>
		<span class="mui-tab-label">用户</span>
	</router-link>
	<a :class="`mui-tab-item ${shopCart?'mui-active':''}`"  @click="checkLogin ">
		<span class="mui-icon mui-icon-extra mui-icon-extra-cart"  @click="changeActive('shopCart')"><span class="mui-badge">{{$store.getters.getShopCartCount}}</span></span>
		<span class="mui-tab-label">购物车</span>
	</a>
	<router-link :class="`mui-tab-item ${search?'mui-active':''}`" to="/home/search">
		<span class="mui-icon mui-icon-search" @click="changeActive('search')"></span>
		<span class="mui-tab-label">搜索</span>
	</router-link>
   </nav>
</template>

<script>
	import {Toast} from "mint-ui"
	export default{
		data(){
			return {
				isLogin:false,
				index:true,
				user:false,
				shopCart:false,
				search:false
				
			}
		},
  	   methods:{
		  	checkLogin(){
		  		this.$http.get("http://127.0.0.1:3000/islogin").then(result=>{
		  			if(result.body.ok===0)
		  			   this.isLogin=false;
		  			else if(result.body.ok===1)
		  			   this.isLogin=true;
		  			if(!this.isLogin){
		  				Toast({
						  message: '您尚未登录，请先登录！',
						  duration:1000
						});
		  				setTimeout(()=>{
		  				   this.$router.push(`/home/login?back=/home/shopcart`);
		  				},1000);
		  			}
		  			else{
		  				this.$router.push('/home/shopcart')
		  			}
		  		})
		  	},
		  	changeActive(option){
				if(option==="index"){
		  			this.index=true;
		  			this.user=false;
		  			this.shopCart=false;
		  			this.search=false;
		  		}
		        else if(option==="user"){
		  			this.index=false;
		  			this.user=true;
		  			this.shopCart=false;
		  			this.search=false;
		  		}
		        else if(option==="shopCart"){
		  			this.index=false;
		  			this.user=false;
		  			this.shopCart=true;
		  			this.search=false;
		        }
		        else if(option==="search"){
		  			this.index=false;
		  			this.user=false;
		  			this.shopCart=false;
		  			this.search=true;		        	
		        }	
		  	}
		  }
	}
</script>

<style>
	 .mui-bar-tab .mui-tab-item-tao.mui-active {
    color: #007aff;
 }
.mui-bar-tab .mui-tab-item-tao {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-tao .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-tao .mui-icon~.mui-tab-label {
   font-size:11px;
   display:block;
   overflow:hidden;
   text-overflow:ellipsis;

}
</style>