<template>
  <div class="photo-container">
    <h3>{{photoInfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间:{{photoInfo.add_time|dataFormat}}</span>
      <span>点击:{{photoInfo.click}}次</span>
    </p>
    <hr />

    <!-- 缩略图区域 -->

    <div class = "thumbs">
      <img
      class="preview-img"
      v-for="(item,index) in list"
      :src="item.src"
      height="100"
      @click="$preview.open(index,list)"
      :key="item.src"
    />
</div>
    <!-- <div class="thumbs">
        <vue-preview :slides="list" class="imgPrev"></vue-preview>
  </div> -->

    <!-- 图片内容区域 -->
    <div class="content" v-html="photoInfo.content"></div>

    <!-- 防止一个现成的评论子组件 -->
    <cmt-box :id="id"></cmt-box>
  </div>
</template>

<script>
//1.导入评论子组件
import comment from "../suncomponent/comment.vue";

export default {
  data() {
    return {
      id: this.$route.params.id, //从路由中获取到的图片ID
      photoInfo: {}, //图片详情
      list: [] //缩略图的数组
    };
  },
  created() {
    this.getPhotoInfo();
    this.getThumbs();
  },
  methods: {
    getPhotoInfo() {
      this.$http
        .get("http://www.liulongbin.top:3005/api/getimageInfo/" + this.id)
        .then(result => {
          if (result.body.status === 0) {
            this.photoInfo = result.body.message[0];
          }
        });
    },
    getThumbs() {
      //获取缩略图
      this.$http
        .get("http://www.liulongbin.top:3005/api/getthumimages/" + this.id)
        .then(result => {
          if (result.body.status === 0) {
            //循环每个图片数据，补全图片的宽和高
            result.body.message.forEach(item => {
              item.w = 600;
              item.h = 400;
            });
            //把完整吃数据保存到list中
            this.list = result.body.message;
          }
        });
    }
  },
  components: {
    //注册子组件
    "cmt-box": comment
  }
};
</script>

<style lang="scss" scoped>
.photo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
  .content {
    font-size: 13px;
    line-height: 30x;
  }
  .thumbs{
    img{
      margin:10px;
      box-shadow: 0 0 8px #999;
    }
  }
}
</style>