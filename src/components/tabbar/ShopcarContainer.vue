<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <!-- 商品列表项区域 -->
      <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch 
            v-model="$store.getters.getGoodsSelected[item.id]"
            @change="selectedChange(item.id,$store.getters.getGoodsSelected[item.id])"
            ></mt-switch>
            <img :src="item.thumb_path" />
            <div class="info">
              <h1>{{ item.title }}</h1>
              <p>
                <span class="price">￥{{item.sell_price}}</span>

                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                <!-- 问题：如何从购物车获取商品数量 -->
                <!-- 1.我们可以创建一个空对象，然后后循环购物车中所有商品的数据，把当前循环的这条商品数据的ID作为对象的属性名，count值作为对象的属性值，这样，当把所有商品循环一遍，就会得到一个对象{80：1，90：2} -->
                <a href="#" @click.prevent="remove(item.id,i)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 商品结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计（不含运费）</p>
            <p>已勾选商品 <span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span> 件，总价 <span class="red">￥{{$store.getters.getGoodsCountAndAmount.amount}}</span></p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import numbox from "../suncomponent/shopcar_numbox.vue";
export default {
  data() {
    return {
      goodslist: [] //购物车中的数据
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      //1.获取到store中所有商品的ID，拼接出一个用逗号分隔的字符串
      var idArr = [];
      this.$store.state.car.forEach(item => idArr.push(item.id));
      //如果购物车中没有商品，就直接返回，不需要请求数据，的否则会报错
      if (idArr.length <= 0) {
        return;
      }
      //获取购物车商品列表
      this.$http
        .get(
          "http://www.liulongbin.top:3005/api/goods/getshopcarlist/" +
            idArr.join(",")
        )
        .then(result => {
          if (result.body.status === 0) {
            this.goodslist = result.body.message;
          }
        });
    },
    remove(id,index){
      // 点击删除，把商品从store中根据传递的ID删除，同时，把当前组件中的goodsinfo中没对应要删除的商品，使用index来删除
      this.goodslist.splice(index,1);
      this.$store.commit('removeFromCar',id);
    },
    selectedChange(id,val){
      this.$store.commit('updateGoodsSelected',{id,selected:val})
    }
  },
  components: {
    numbox
  }
};
</script>

<style lang="scss" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goods-list {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
    }
    img {
      width: 60px;
      height: 60px;
    }
    h1 {
      font-size: 13px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      
      .price {
        color: red;
        font-weight: bold;
        
      }
    }
  }
  .jiesuan{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red{
      color: red;
      font-weight: bold;
      font-size: 16px;
    }
  }
}
</style>