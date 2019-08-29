import Vue from 'vue'
import App from './App.vue'
import router from './router'
import footer from "./components/footer/footer.vue"
import'mint-ui/lib/style.css'
//注册网页脚
Vue.component("app-footer",footer);
Vue.config.productionTip = false;
import './lib/mui/css/mui.css'
// 导入 MUI 的样式表，扩展图标样式，购物车图标
// 还需要加载图标字体文件
import './lib/mui/css/icons-extra.css'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI);

//引入vue-resource
import vueResource from 'vue-resource';
Vue.use(vueResource);
Vue.http.options.withCredentials = true;

//引入vuex
import Vuex from "vuex";
Vue.use(Vuex);
var store=new Vuex.Store({
      state:{shopCartCount:0,sumMoney:0},
      mutations:{
      	addShopCartCount(state,param){
      		state.shopCartCount +=param;
      	},
      	subShopCartCount(state,param){
      	if(state.shopCartCount>0)
      		state.shopCartCount +=param;
      	},
      	clearShopCartCount(state){
      		state.shopCartCount=0;
      	},
      	setSumMoney(state,param){
      		state.sumMoney=param;
      	}
      },
      getters:{
      	getShopCartCount(state){
      		return state.shopCartCount;
      	},
      	getsumMoney(state){
      		return state.sumMoney;
      	}
      	
      }
})
Vue.filter('datetimeFilter',function(val){
	 var date=new Date(val);
	 var y=date.getFullYear();
	 var m=date.getMonth()+1;
	 var d=date.getDate();
	 var h=date.getHours();
	 var min=date.getMinutes();
	 var s=date.getSeconds();
	 m<10?m='0'+m:m=m;
	 d<10?d='0'+d:d=d;
	 h<10?h='0'+h:h=h;
	 min<10?min='0'+min:min=min;
	 s<10?s='0'+s:s=s;
	 return `${y}-${m}-${d} ${h}:${min}:${s}`;
})
new Vue({
  router,
  render: h => h(App),
  store,
  created(){
  		     this.$http.get("http://127.0.0.1:3000/islogin").then(result1=>{
	  			  if(result1.body.ok===1){
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
  			});
  }
}).$mount('#app')
