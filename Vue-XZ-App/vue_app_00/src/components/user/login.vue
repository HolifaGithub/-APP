<template>
	<div class="app-login">
		<div class="login" v-if="show">
			<div class="login-bg">
				 <h3>学子商城登录</h3>
				<img src="http://127.0.0.1:3000/img/register/bg.png" />
				</div>
				<form class="mui-input-group">
					<div class="mui-input-row">
						<label>用户名<img src="http://127.0.0.1:3000/img/login/yhm.png"/></label>
						<input type="text" class="mui-input-clear" placeholder="请输入用户名" v-model="uname">
					</div>
					<div class="mui-input-row mui-password">
						<label>密&nbsp;&nbsp;&nbsp;&nbsp;码<img src="http://127.0.0.1:3000/img/login/mm.png"/></label>
						<input type="password" class="mui-input-password" placeholder="请输入密码" v-model="upwd">
					</div>
					<div class="mui-button-row">
						<button type="button" class="mui-btn mui-btn-primary" @click="login">登录</button>&nbsp;&nbsp;
						<button type="button" class="mui-btn mui-btn-danger" @click="clear">取消</button>
					</div>
				</form>		
		</div>
		<div class="logined" v-else>
			<div class="welcome">Hello,{{uname}}</div>
			 <mt-button  type="danger" size="large" @click="signout">退出登录</mt-button>
		</div>
		
	</div>
</template>

<script>
	export default{
		data(){
			return {
				uname:'',
				upwd:'',
				back:'',
				show:true
			}
		},
		methods:{
			clear(){
				this.uname='';
				this.upwd='';
			},
			login(){
				this.$http.post("http://127.0.0.1:3000/signin",{uname:this.uname,upwd:this.upwd},{emulateJSON:true}).then(result=>{
					if(result.body.ok===1){
						if(this.back!==undefined){
							  this.$router.push(this.back);	
						}
						else{
							  this.$router.push('/home');		
						}
					  				  this.$http.get('http://127.0.0.1:3000/getshopcart').then(result2=>{
								var shopCartItems=result2.body;
								var count=0;
								var sum=0;
								for(var item of shopCartItems){
									count+=item.count;
									sum +=item.price*item.count;
								}
								this.$store.commit("addShopCartCount",count);
								this.$store.commit("setSumMoney",sum); 
  				  });
					}
				})
			},
			signout(){
				this.$http.get('http://127.0.0.1:3000/signout').then(result=>{
					this.checkIsLogin();
				})
			},
			checkIsLogin(){
				this.$http.get("http://127.0.0.1:3000/islogin").then(result=>{
				if(result.body.ok===1){
					this.uname=result.body.uname;
					this.show=false;
				}
				else{
			    this.show=true;
				this.$store.commit('clearShopCartCount');
				}

			})			
			}
		},
		created(){
			this.back=this.$route.query.back;
            this.checkIsLogin();
		}
	}
</script>

<style>
	body{background-image: url(http://127.0.0.1:3000/img/login/bg.jpg);}
	div.app-login div.login-bg h3{color: #eee;background-color:#484848;text-align: center;margin-bottom: 0;height: 50px;line-height: 2;margin-top: 0;}
	div.app-login div.login-bg img{width: 100%;}
	div.app-login form.mui-input-group{	background-color: #F6F7F9;height: 150px;padding-top: 20px;}
	div.app-login form.mui-input-group img{vertical-align: middle;margin-left: 5px;margin-top: -5px;}
	div.app-login div.logined div.welcome{color: #555;font-size: 28px;text-align: center;background-color: #F3F9F9;height: 200px;line-height:7;font-weight: bold;}
	div.app-login div.logined button{cursor:pointer;}
</style>