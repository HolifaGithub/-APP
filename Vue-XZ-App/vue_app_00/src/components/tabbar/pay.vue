<template>
	<div class="app-pay">
		<header class="mui-bar mui-bar-nav">
			<router-link class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" to='/home'></router-link>
			<h1 class="mui-title">学子商城 Pay（在线支付）</h1>
		</header>
		<div id="dcontent" class="mui-content">
			<div class="mui-content-padded">
				<p>
					请选择一种支付方式付款！<br />	
					Please choose a payment method!
				</p>
				<ul class="mui-table-view">
					<li class="mui-table-view-cell">
						支付方式: 
						<div class="pay-style">
						<input type="radio" name="style" id="zhifubao" value="zhifubao" v-model="choose"/>	
						<label for="zhifubao">
						<img src="http://127.0.0.1:3000/img/pay/zhifubao.png"  />
						</label>
						<input type="radio" name="style" id="wechat" value="wechat" v-model="choose" /> 
						<label for="wechat">
						<img src="http://127.0.0.1:3000/img/pay/wechat.jpg" />
						</label>
						</div>
					</li>
					<li class="mui-table-view-cell">
						订单号: <span id="bill_no">{{oid}}</span>
					</li>
					<li class="mui-table-view-cell">
						支付金额: <span id="total_fee">{{$store.getters.getsumMoney.toFixed(2)}}元</span>
					</li>
					<li class="mui-table-view-cell">
						支付状态:<span id="status">{{payState}}</span>
					</li>
				</ul>
				<mt-button type="primary" @click="backShopCart">返回购物车</mt-button>
                <mt-button type="danger" @click="pay">立即付款</mt-button>
			</div>
		</div>
	    <mt-popup v-model="popupVisible" position="bottom">
           <div class="payimg">
			   <mt-header title="安全支付"></mt-header>
			   <div class="sum">支付金额:{{$store.getters.getsumMoney.toFixed(2)}}元</div>
           	   <div class="title">请扫描下图二维码付款</div>
           	   <img src="http://127.0.0.1:3000/img/pay/zhifubaopay.jpg" alt="" v-if="choose==='zhifubao'" />
           	   <img src="http://127.0.0.1:3000/img/pay/wechatpay.jpg" alt="" v-else />
           </div>
        </mt-popup>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				sum:0,
				shopCartList:[],
				payState:"未支付",
				oid:0,
				choose:'zhifubao',
				popupVisible:false
			}
		},
		methods:{
			getOrderId(){
				var OrderId;
				var date=new Date();
				var year=date.getFullYear().toString();
				var month=(date.getMonth()+1).toString();
				var day=date.getDate().toString();
				var h=date.getHours().toString();
				var m=date.getMinutes().toString();
				var s=date.getSeconds().toString();
				if(month<10){
					month='0'+month;
				}
				 if(day<10){
					day='0'+10;
				}
				 if(h<10){
					h='0'+10;
				}
				 if(m<10){
					m='0'+10;
				}
				 if(s<10){
				 	s='0'+s;
				 }
				var randomString='';
				for(var i=0;i<18;i++){
				var randomNumber=Math.ceil(Math.random()*9);
				var randomLetterNumber=Math.floor(Math.random()*26);
				var randomCapitalLetter=String.fromCharCode(65+randomLetterNumber);
				var randomLowcaseLetter=String.fromCharCode(97+randomLetterNumber);
				var randomArr=[randomNumber,randomCapitalLetter,randomLowcaseLetter];
				var random=Math.floor(Math.random()*3);
				var choose=randomArr[random];
				randomString+=choose;
				}
			   OrderId=year+month+day+h+m+s+randomString;
			  return OrderId;
			},
			backShopCart(){
				this.$router.push('/home/shopcart');
			},
			pay(){
				this.$indicator.open("加载中");
				setTimeout(()=>{
					this.$indicator.close();
					this.popupVisible=true;
				},1000);
			}
		},
		created(){
			     this.$http.get('http://127.0.0.1:3000/getshopcart').then(result=>{
				 this.shopCartList=result.body;
				 this.oid=this.getOrderId();
			})			    
		}
	}
</script>

<style>
	#dcontent div.mui-content-padded div.pay-style img{width:85px;vertical-align:middle;margin-right:65px;}
	#dcontent div.mui-content-padded label[for='wechat'] img{width: 77px;}
    #status{color: red;margin-left: 10px;}
    #dcontent button.mint-button.mint-button--danger.mint-button--normal{margin-left: 140px;margin-top: 22px;}
    #dcontent button.mint-button.mint-button--primary.mint-button--normal{margin-top: 22px;margin-bottom: 26px;}
    div.mint-popup.mint-popup-bottom div.payimg img{width: 140px;}
    div.mint-popup.mint-popup-bottom div.payimg div.title{text-align: center;}
    div.mint-popup.mint-popup-bottom{width: 100%;border-radius: 8px;text-align: center;}
    div.app-pay ul.mui-table-view li.mui-table-view-cell:first-child{color: #007AFF;font-weight: bold;font-size: 20px;}
    div.app-pay ul.mui-table-view li.mui-table-view-cell:nth-child(2),div.app-pay li.mui-table-view-cell:nth-child(3){padding: 30px 5px;color: #007AFF;font-weight: bold;font-size: 20px;}
 div.app-pay ul.mui-table-view li.mui-table-view-cell:nth-child(4){color: red;padding: 30px 5px;font-weight: bold;font-size: 20px;}
</style>