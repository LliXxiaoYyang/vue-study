<template>
  <div>
    <!-- 轮播图区域 -->
    <!-- <mt-swipe :auto="3000">
      <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
        <img :src="item.img_url" alt="">
      </mt-swipe-item>
    </mt-swipe> -->
    <swiper :lunbotuList="lunbotuList" :isFull="true"></swiper>
    <!-- 九宫格到6宫格的改造工程 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
		  <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
		          <!-- <span class="mui-icon mui-icon-home"></span> -->
              <img src="../../images/menu1.png" alt="">
		          <div class="mui-media-body">新闻资讯</div></router-link></li>
		  <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
		          <!-- <span class="mui-icon mui-icon-email"><span class="mui-badge">5</span></span> -->
              <img src="../../images/menu2.png" alt="">
		          <div class="mui-media-body">图片分享</div></router-link></li>
		  <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodslist">
		          <!-- <span class="mui-icon mui-icon-chatbubble"></span> -->
              <img src="../../images/menu3.png" alt="">
		          <div class="mui-media-body">商品购买</div></router-link></li>
		  <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		          <!-- <span class="mui-icon mui-icon-location"></span> -->
              <img src="../../images/menu4.png" alt="">
		          <div class="mui-media-body">留言反馈</div></a></li>
		  <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		          <!-- <span class="mui-icon mui-icon-search"></span> -->
              <img src="../../images/menu5.png" alt="">
		          <div class="mui-media-body">视频专区</div></a></li>
		  <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		          <!-- <span class="mui-icon mui-icon-phone"></span> -->
              <img src="../../images/menu6.png" alt="">
		          <div class="mui-media-body">联系我们</div></a></li>
		  
		        </ul> 
    
  </div>
</template>

<script>
import {Toast} from 'mint-ui'
import swiper from '../suncomponent/swiper.vue'

export default {
  data() {
    return {
      lunbotuList:[]//保存轮播图的数组
    }
  },
  created(){
    this.getLunbotu();
  },
  methods: {
    getLunbotu(){
      //获取轮播图数据的方法
      this.$http.get("http://www.liulongbin.top:3005/api/getnewslist").then(result=>{
        // 成功时
        if(result.body.status===0){
          this.lunbotuList = result.body.message;
          // console.log(this.lunbotuList);
        }else{//失败时
          Toast('加载轮播图失败。。。。')
        }
        
        });
    }
  },
  components:{
    swiper 
  }
}
</script>

<style lang="scss" scoped>
  .mint-swipe{
    height:200px;

    .mint-swipe-item{
      &:nth-child(1){
        background-color: red;
      }
      &:nth-child(2){
        background-color: lightblue;
      }
      &:nth-child(3){
        background-color: lightcyan;
      }
      img{
        width: 100%;
        height: 100%;
      }
  }
  }
  .mui-grid-view.mui-grid-9{
    background-color: #fff;
    border: none;
    img{
      width: 60px;
      height: 60px;
    }
  }
  .mui-media-body{
    font-size: 13px;
  }
  .mui-grid-view.mui-grid-9 .mui-table-view-cell{
    border: none;
  }
</style>