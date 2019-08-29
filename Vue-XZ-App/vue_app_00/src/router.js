import Vue from 'vue'
import Router from 'vue-router'
import HelloContainer from "./components/HelloWorld.vue"
import homeContainer from "./components/tabbar/HomeContainer.vue"
import newsListContainer from "./components/news/newsListContainer.vue"
import newsInfoContainer from ".//components/news/newsInfoContainer.vue"
import shopContainer from "./components/tabbar/shopContainer.vue"
import goodList from "./components/goods/goodList.vue"
import goodInfo from "./components/goods/goodInfo.vue"
import login from "./components/user/login.vue"
import pay from "./components/tabbar/pay.vue"
import search from './components/goods/search.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {path:'/',redirect:'/home'},
    {path:'/home',component:homeContainer},
    {path:'/home/newslist',component:newsListContainer},
    {path:'/home/newsinfo',component:newsInfoContainer},
    {path:'/home/shopcart',component:shopContainer},
    {path:'/home/goodlist',component:goodList},
    {path:'/home/goodinfo',component:goodInfo},
    {path:'/home/login',component:login},
    {path:'/home/pay',component:pay},
    {path:'/home/search',component:search}
  ]
})
