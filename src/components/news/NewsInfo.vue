<template>
  <div class="newsinfo-container">
    <!-- 大标题 -->
    <h3 class="title">{{newsinfo.title}}</h3>
    <!-- 子标题 -->
    <p class="subtitle">
      <span>发表时间:{{newsinfo.add_time|dataFormat}}</span>
      <span>点击：{{newsinfo.click}}次</span>
    </p>

    <hr>
    <!-- 内容区域 -->
    <div class="content" v-html="newsinfo.content"></div>

    <!-- 评论区域 -->
    <comment-box :id="this.id"></comment-box>
  </div>
</template>

<script>
import {Toast} from 'mint-ui';
//1.导入评论子组件
import comment from '../suncomponent/comment.vue'
export default {
  data(){
    return {
      id:this.$route.params.id,
      newsinfo:{}
    }
  },
  created(){
    this.getNewsInfo();
  },
  methods:{
    getNewsInfo(){//获取新闻详情
    this.$http.get('http://www.liulongbin.top:3005/api/getnew/'+this.id).then(result=>{
      if (result.body.status===0){
          this.newsinfo = result.body.message[0];
      }else{Toast('获取新闻失败')}
    })

    }
  },
  components:{
    //注册子组件结点
    commentBox:comment
  }
}
</script>

<style lang="scss">
  .newsinfo-container{
    padding: 0 4px;
    .title{
      font-size: 16px;
      text-align: center;
      margin:15px 0;
      color: red;
    }
    .subtitle{
      font-size: 13px;
      color:#226aff;
      display:flex;
      justify-content: space-between;
    }
    .content{
      img{
        width:100%;
      }
    }
  }
</style>