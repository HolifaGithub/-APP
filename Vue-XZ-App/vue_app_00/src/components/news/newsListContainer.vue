<template>
	<div class="app-newslist">
		<ul class="mui-table-view">
			<li class="mui-table-view-cell mui-media" v-for="item in list" :key="item.id">
					<router-link :to="`/home/newsinfo?id=${item.id}`">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							{{item.title}}
							<p class='mui-ellipsis'>
								<span>{{item.ctime|datetimeFilter}}</span>
								<span>点击:{{item.point}}次</span>
							</p>
						</div>
					</router-link>
			</li>
		</ul>
		<mt-button type="primary" size="large" @click="getMore" :class="`${getMoreIsHide?'hide':''}`">加载更多</mt-button>
		<div class="no-more" :class="noMoreIsHide">没有更多了~</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				list:[],
				pageIndex:0, //当前页数
				pageSize:5,//页大小
				pageCount:0, //总页数
				hasMore:true,
				noMoreIsHide:{
					hide:true
				},
				getMoreIsHide:false
			}
		},
		methods:{
			getMore(){
				this.pageIndex++;
				if(this.hasMore){
			  				var url="http://127.0.0.1:3000/newslist?pno="+this.pageIndex+"&pageSize="+this.pageSize;
				this.$http.get(url).then((result)=>{
                 this.pageCount=result.body.pageCount;
                  if(this.pageIndex>=this.pageCount){
                  	this.hasMore=false;
                  	this.noMoreIsHide.hide=false;
                  	this.getMoreIsHide=true;
                  }
				   var newList=this.list.concat(result.body.data);
				   this.list=newList;
				})		
				}
			}
		},
		created(){
			this.getMore();
		}
	}
</script>

<style>
ul.mui-table-view	p.mui-ellipsis{display: flex;justify-content: space-between;}
div.app-newslist div.no-more{text-align: center;color: #555;font-size: 15px;}
div.app-newslist div.no-more.hide{display: none;}
div.app-newslist button.mint-button.mint-button--primary.mint-button--large.hide{display: none;}
</style>