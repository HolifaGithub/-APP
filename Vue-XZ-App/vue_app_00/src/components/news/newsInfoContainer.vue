<template>
	<div class="app-newsinfo">
		<h3 class="info-title">{{info.title}}</h3>
		<div class="info-content">{{info.content}}</div>
		<comment :id="id"></comment>
	</div>
</template>

<script>
	import comment from "../sub/comment.vue"
	export default{
		data(){
			return {
				info:{},
				id:this.$route.query.id
			}
		},
		created(){
			this.getNewsInfo();
		},
		methods:{
			getNewsInfo(){
				var url="http://127.0.0.1:3000/newsinfo";
				this.$http.get(url).then(result=>{
					this.info=result.body;
				})
			}
		},
		components:{
			comment
		}
	}
</script>

<style>
	div.app-newsinfo h3.info-title{text-align: center;}
	div.app-newsinfo div.info-content{text-indent: 20px;}
</style>