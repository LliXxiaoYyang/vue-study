<template>
  <!-- 不知道什么时候能拿到max值，用watch属性来监听，不管match触发几次，最后一次肯定是一个合法的max数值 -->
  <div class="mui-numbox" data-numbox-min="1" data-numbox-max="max" style="height:25px;">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      id="test"
      class="mui-input-numbox"
      type="number"
      :value="initcount"
      @change="countChanged"
      ref="numbox"
      readonly
    />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.js";

export default {
  mounted() {
    //初始化数字选择框组件
    mui(".mui-numbox").numbox();
  },
  methods: {
    countChanged() {
      //数量被改变了
      //每当数量值改变，则立即吧最新的数量同步到购物车的store中，覆盖之前的数量值
      this.$store.commit("updateGoodsInfo", {
        id: this.goodsid,
        count: this.$refs.numbox.value
      });
    }
  },
  props: ["initcount", "goodsid"]
};
</script>

<style lang="scss" scoped>
</style>