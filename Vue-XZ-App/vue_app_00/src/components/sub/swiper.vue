<template>
	<div class="app-swiper">
		<mt-swipe :auto="3000">
			<mt-swipe-item v-for="(item,i) in pics" :key="i"><img :src="`http://127.0.0.1:3000/${item.md}`"/></mt-swipe-item>
		</mt-swipe>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				pics:[],
				info:[]
			}
		},
		props:['lid'],
		created(){
			this.$http.get(`http://127.0.0.1:3000/getproductdetail?lid=${this.lid}`).then(result=>{
			this.pics=result.body.pics;
			this.info=result.body.info;
            this.$emit('get',this.info);
			});
		}
	}
</script>

<style scoped>
	div.app-swiper  .mint-swipe{height: 280px;}
	div.app-swiper  .mint-swipe img{width: 100%;}
</style>