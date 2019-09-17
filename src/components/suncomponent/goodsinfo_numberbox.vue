<template>
<!-- 不知道什么时候能拿到max值，用watch属性来监听，不管match触发几次，最后一次肯定是一个合法的max数值 -->
  <div class="mui-numbox" data-numbox-min='1' data-numbox-max='max'>
					<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
					<input id="test" class="mui-input-numbox" type="number" value="1" 
          @change="countChanged" ref="numbox"/>
					<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
				</div>
</template>

<script>
import mui from '../../lib/mui/js/mui.js'

export default {
  mounted(){
    //初始化数字选择框组件
    mui(".mui-numbox").numbox();
  },
  methods:{
    countChanged(){
      //每当文本框的数据被改变的时候，立刻把最新的数据通过事件调用传递给父组件

      this.$emit("getcount",parseInt(this.$refs.numbox.value));
    }
  },
  props:["max"],
  watch:{
    //属性监听
    max:function(newVal,oldVal){
      mui(".mui-numbox").numbox().setOption("max",newVal);
    }
  }
}
</script>

<style lang="scss" scoped>
  
</style>