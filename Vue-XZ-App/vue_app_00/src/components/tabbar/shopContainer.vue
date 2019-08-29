<template>
	<div class="app-shopcontainer">
		<div class="mui-card" >
			<div class="mui-card-header ">购物车列表</div>
			<div class="mui-card-content" v-for="(item,i) in shopCartItems" :key="i">
				<div class="mui-card-content-inner">
				<ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media">
						<div class="mui-media-body">		
							<div class="title">
								<img :src="`http://127.0.0.1:3000/${item.md}`"/>
							<div>{{item.title}}</div> 
							</div> 
							<br />
							<span class="price">单价：&yen;{{item.price.toFixed(2)}}</span>
							<div class="size">规格：{{item.spec}}</div>
							<p class='mui-ellipsis'>
							数量：	
				           <div class="mui-numbox" data-numbox-min='1' data-numbox-max='9'>
								<button class="mui-btn mui-btn-numbox-minus" type="button"  @click="subCount(item.iid)">-</button>
								<input id="test" class="mui-input-numbox" type="number" v-model="item.count"/>
								<button class="mui-btn mui-btn-numbox-plus" type="button" @click="addCount(item.iid)">+</button>
					       </div>
							</p>
						</div>
					</a>
				</li>
			</ul>
			</div>
			<hr />
			</div>
			<br /><br />
			<div class="mui-card-footer">总价:{{getSum.toFixed(2)}}元
			<mt-button  type="danger" @click="goPay">去付款</mt-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				shopCartItems:[],
				count:0,
				sum:0
			}
		},
		created(){
			this.getCartItems();
		},
		methods:{
	   getCartItems(){
			this.$http.get("http://127.0.0.1:3000/getshopcart").then(result=>{
			this.shopCartItems=result.body;
			})
			},
			updateCart(iid,count){
				this.$http.get(`http://127.0.0.1:3000/updateCart?iid=${iid}&count=${count}`).then(result=>{
					if(result.body.ok===1){
						this.getCartItems();
					}
				})
			},
			addCount(iid){
             for(var item of this.shopCartItems){
             	if(item.iid===iid){
             		if(item.count<999){
                  		item.count++;
                  		this.updateCart(item.iid,item.count);
                  		this.getCartItems();
                  		this.$store.commit("addShopCartCount",1);
                         break;
             		}
             	}
             }
			},
			subCount(iid){
             for(var item of this.shopCartItems){
             	if(item.iid===iid){
             		if(item.count>=1){
             			if(item.count===1){
             				confirm("确认要移除该商品吗?");
             			}
                  		item.count--; 
                  		this.updateCart(item.iid,item.count);
                  		this.getCartItems();
                  		this.$store.commit("subShopCartCount",-1);
                  		break;
             		}
             	}
             }
			},
			goPay(){
				this.$router.push('/home/pay');
				this.$store.commit("setSumMoney",this.sum); 
			}
		},
		computed:{
			getSum(){
				this.sum=0;
			   for(var i of this.shopCartItems){
			     this.sum+=i.count*i.price;  
			  }
				return this.sum;
			}
		}
	}
</script>

<style scoped>
	div.mui-card div.mui-card-header{font-size: 17px;font-weight: bold;background-color:#87CEEB;text-align: center;}
	div.mui-card {margin-top: 0;width: 100%;margin-left: -2px;}
	div.mui-card div.mui-card-content{height: 250px;}
	div.mui-card div.mui-card-content div.title img{vertical-align: bottom;border: 1px solid #007AFF;width: 65px;float: left;}
	div.mui-card div.mui-card-content div.title div{color: #007AFF;margin-left: 90px;}
	div.mui-card div.mui-card-content span.price{font-size: 16px;}
	div.mui-card div.mui-card-content div.size{font-size:16px;}
	div.mui-card div.mui-card-content p.mui-ellipsis{font-size: 16px;font-weight: bold;}
	div.mui-card-footer{font-size: 18px;font-weight: bold;line-height: 2;position: fixed;bottom: 50px;background-color: #87CEEB;width: 100%;color: #000;}
</style>