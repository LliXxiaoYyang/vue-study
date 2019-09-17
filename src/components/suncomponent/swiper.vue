<template>
  <div>
    <mt-swipe :auto="4000">
      <!-- 在组件中用v-for的话一定要用key -->
      <!-- 谁使用这个轮播图组件，谁传递lunbotuList -->
      <!-- 此时的lunbotuList是由父组件传值 -->
      <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
        <img :src="item.img_url" alt="" :class="{full:isFull}">
      </mt-swipe-item>
    </mt-swipe>
  </div>

<!-- 分析：为什么商品评论中的轮播图那么丑 -->
<!-- 1.首页中的图片，他的宽和高都是100% -->
<!-- 2.商品详情页中，轮播图的宽高如果也用100%，页面不好看 -->
<!-- 3.期望是高100%，宽度自适应 -->
<!-- 4.首页和商品详情页轮播图的区别就是宽度100%和自适应 -->
<!-- 5. -->
</template>

<script>
export default {
  props:["lunbotuList","isFull"]
}
</script>

<style lang="scss" scoped>
.mint-swipe{
  height:200px;

  .mint-swipe-item{
    text-align: center;
    
    img{
      // width: 100%;
      height: 100%;
    }
}
}
.full{
  width:100%;
}
</style>