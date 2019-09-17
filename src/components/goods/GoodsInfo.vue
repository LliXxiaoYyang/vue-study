<template>
  <div class="goodsinfo-container">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>
    <!-- 轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunbotuList="lunbotu" :isFull="false"></swiper>
        </div>
      </div>
    </div>
    <!-- 商品的购买区域-->
    <div class="mui-card">
      <div class="mui-card-header">{{ goodsinfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价:
            <del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价:
            <span class="now_price">￥{{goodsinfo.sell_price}}</span>
          </p>
          <p>
            购买数量:
            <numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>

            <!-- 分析，如何实现加入购物车的时候，拿到选择的数量 -->
            <!-- 1.按钮属于goodsinfo页面，数字属于numbox组件 -->
            <!-- 子组件向父组件传值，（事件调用机制） -->
            <!-- 事件调用的本质：父向子传递方法，子调用这个方法，同时吧数据当做参数传递给这个方法 -->
          </p>
        </div>
      </div>
    </div>
    <!--商品的参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号:{{goodsinfo.goods_no}}</p>
          <p>库存情况:{{goodsinfo.stock_quantity}}</p>
          <p>上架时间:{{goodsinfo.add_time|dataFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import swiper from "../suncomponent/swiper.vue";
import numbox from "../suncomponent/goodsinfo_numberbox.vue";

export default {
  data() {
    return {
      id: this.$route.params.id,
      lunbotu: [],
      goodsinfo: {}, //获取到的商品的信息
      ballFlag: false, //控制小球
      selectedCount: 1 // 保存用户选择的数量
    };
  },
  created() {
    this.getLunbotu();
    this.getGoodsInfo();
  },
  methods: {
    getLunbotu() {
      this.$http
        .get("http://www.liulongbin.top:3005/api/getthumimages/" + this.id)
        .then(result => {
          if (result.body.status === 0) {
            //先循环轮播图数组的每一项，为item添加img属性，因为轮播图组件只认识item.img_url 不认识item.src
            result.body.message.forEach(item => {
              item.img_url = item.src;
            });
            this.lunbotu = result.body.message;
          }
        });
    },
    getGoodsInfo() {
      //获取商品信息
      this.$http
        .get("http://www.liulongbin.top:3005/api/goods/getinfo/" + this.id)
        .then(result => {
          if (result.body.status === 0) {
            this.goodsinfo = result.body.message[0];
          }
        });
    },
    goDesc(id) {
      //点击使用编程式导航跳转到 图文介绍页
      this.$router.push({ name: "goodsdesc", params: { id } });
    },
    goComment(id) {
      //点击跳转到评论页面
      this.$router.push({ name: "goodscomment", params: { id } });
    },
    addToShopCar() {
      this.ballFlag = !this.ballFlag;
      //{id:商品的id,count:要购买的数量,price:商品的单价,selected:false}
      //拼接出一个要保存到store中car数组里的商品信息对象
      var goodsinfo = {
        id: this.id,
        count: this.selectedCount,
        price: this.goodsinfo.sell_price,
        selected: true
      };
      //调用store中的mutations来讲商品加入购物车
      this.$store.commit("addToCar", goodsinfo);
    },
    beforeEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      el.offsetWidth;
      //不能把小球的位置写死 要求横纵坐标位移的距离
      //获取徽标和小球的位置 domObject.getBoundingClientRect()

      //获取小球的位置

      const ballPosition = this.$refs.ball.getBoundingClientRect();
      //获取徽标的位置
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();

      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;

      el.style.transform = `translate(${xDist}px,${yDist}px)`;
      el.style.transition = "all 1s cubic-bezier(.4,-0.3,1,.68)";
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },
    getSelectedCount(count) {
      //当子组件吧选中的数量传递给父组件的时候，把选中的值保存到data上
      this.selectedCount = count;
    }
  },
  components: {
    swiper,
    numbox
  }
};
</script>

<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;

  .now_price {
    font-size: 16px;
    color: red;
    font-weight: bold;
  }
  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }
  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 390px;
    left: 140px;
  }
}
</style>