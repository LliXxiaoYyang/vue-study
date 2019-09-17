
import Vue from 'vue'

//导入路由包
import VueRouter from 'vue-router'
//安装路由包
Vue.use(VueRouter)

//注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)

//每次刚进入网站，肯定会调用main.js在刚调用的时候，先从本地存储中吧购物车数据读出来，放到store中
var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
  state: {//this.$store.state.***
    car: car//将购物车中商品的数据，用一个数组存储起来，在car数组中，存储一些商品的对象，暂时设计成
    //{id:商品的id,count:要购买的数量,price:商品的单价,selected:false}
  },
  mutations: {//this.$store.commit('方法名称'，'按需传递唯一的参数')
    addToCar(state, goodsinfo) {
      //点击加入购物车，把商品信息保存到store的car中
      // 分析：
      // 1.如果购物车中，之前就有对应的商品，那就更新数量就好
      // 2.如果没有就吧商品信息push到car中

      //假设购物车中没有对应商品
      var flag = false

      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count += parseInt(goodsinfo.count)
          flag = true
          return true
        }
      })
      //如果最终循环结束得到的flag还是false，就把商品数据push到car中
      if (!flag) {
        state.car.push(goodsinfo)
      }

      //当更新car之后，把car数组，存储到本地的localStorage中
      localStorage.setItem('car', JSON.stringify(state.car))

    },
    updateGoodsInfo(state, goodsinfo) {
      //修改购物车中商品的数量值

      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })
      //当修改完商品的数量，把最新的购物车数据保存到本地存储中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    removeFromCar(state, id) {
      //根据ID从store中的购物车中删除对应的那条商品数据
      state.car.some((item, i) => {
        if (item.id == id) {
          state.car.splice(i, 1)
          return true
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsSelected(state, info) {
      state.car.forEach(item => {
        if (item.id == info.id) {
          item.selected = info.selected
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    }

  },
  getters: {//this.$store.getters.***
    //相当于计算属性，也相当于filters
    getAllCount(state) {
      var c = 0;
      state.car.forEach(item => {
        c += item.count
      })
      return c
    },
    getGoodsCount(state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.count
      })
      return o
    },
    getGoodsSelected(state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.selected
      })
      return o
    },
    getGoodsCountAndAmount(state) {
      var o = {
        count: 0,//总数量
        amount: 0//总价
      }
      state.car.forEach(item => {
        if (item.selected) {
          o.count += item.count
          o.amount += item.price * item.count
        }
      })
      return o
    }

  }

})


//导入格式化时间的插件
import moment from 'moment'
//定义全局的过滤器
Vue.filter('dataFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
})

//导入vue-resource
import VueResource from 'vue-resource'
//安装vue-resource
Vue.use(VueResource)




//导入mui样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

/* //导入mint-ui组件
import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.component(Header.name,Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name,Button);
Vue.use(Lazyload); */

import MintUI from "mint-ui"
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

//安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)


import router from './router.js'

import app from './App.vue'

var vm = new Vue({
  el: '#app',
  data: {},
  methods: {

  },
  render: c => c(app),
  router,
  store//挂载store状态管理对象
})