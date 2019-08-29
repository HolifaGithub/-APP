<template>
 <div class="app-container">
	<!--顶部导航条-->
	<mt-header fixed title="学子商城"></mt-header>
    <router-view></router-view>
    <app-footer></app-footer>
 </div>
</template>

<style>
   .app-container{
     padding-top:40px;
     padding-bottom:50px;
     overflow-x:hidden;
   }
</style>
