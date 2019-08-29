<template>
	<div class="app-comment">
		<hr />
		<!--发表评论区域-->
		<h4>发表评论</h4>
		<textarea placeholder="最多评论120个字" maxlength="120" v-model="msg" @keyup.13="postMessage"></textarea>
		<mt-button size="large" @click="postMessage()" type="primary">发表评论</mt-button>
		<!--显示评论区域-->
		<div class="comment-list" v-for="(item,i) in list" :key="i.id">
			<div class="comment-info">
				第{{commentCount-i}}楼 &nbsp; 用户:{{item.user_name}}
				&nbsp;&nbsp;&nbsp;&nbsp;时间：{{item.ctime|datetimeFilter}}
				<hr />
			</div>
			<div class="comment-body">
				{{item.content}}
			</div>
		</div>
		<mt-button size="large" @click="getMore" :class="getMoreIsHide" type="primary">加载更多</mt-button>
		<div class="no-more" :class="noMoreIsHide">没有更多了~</div>
	</div>
</template>

<script>
	import {Toast} from "mint-ui"
	export default{
		data(){
			return {
			   msg:'',
			   pageIndex:0, //当前页数
			   pageSize:5,//页大小
			   pageCount:0, //总页数
			   hasMore:true,
			   list:[],
			   noMoreIsHide:{
					hide:true
				},
				getMoreIsHide:{
					hide:false
			},
			commentCount:0
			}
		},
		props:["id"],
		methods:{
			postMessage(){
				var nid=this.id;
				var msg=this.msg;
				if(msg.trim().length===0){
					Toast("评论内容不能为空！");
					return;
				}
				var url="http://127.0.0.1:3000/postcomment";
				this.$http.post(url,{nid:nid,msg:msg},{emulateJSON:true}).then(result=>{
					var msg=result.body.msg;
					Toast(msg);
					this.msg='';
					this.pageIndex=0;
					this.list=[];
					this.getMore();
				})
			},
			getMore(){
				this.pageIndex++;
				if(this.hasMore){
				  this.$http.get('http://127.0.0.1:3000/getcomment',{params:{
				  	 nid:this.id,
				  	 pageSize:this.pageSize,
				  	 pno:this.pageIndex
				  }}).then(result=>{
				  	this.pageCount=result.body.pageCount;
				  	if(this.pageIndex>=this.pageCount){
				  		this.hasMore=false;
	                  	this.noMoreIsHide.hide=false;
                  		this.getMoreIsHide.hide=true;
                  		this.list.reverse();
				  	}
				  	this.commentCount=result.body.commentCount;
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

<style scoped>
	div.app-comment textarea{height: 100px;display: inline-block;margin-bottom: 0;padding-bottom: 0;border-bottom: 0;font-size: 16px;}
	div.app-comment button.mint-button{margin-bottom: 10px;}
	div.app-comment div.comment-list {border: 1px solid #555;margin-bottom: 10px;}
	div.app-comment div.comment-list div.comment-info{margin-bottom: 5px;background-color: skyblue}
	div.app-comment div.comment-list div.comment-body{margin-bottom: 10px;text-indent: 2em;}
	div.app-comment div.no-more{text-align: center;}
	div.app-comment div.no-more.hide{display: none;}
	div.app-comment button.mint-button.hide{display: none;}
</style>