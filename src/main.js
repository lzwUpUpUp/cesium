// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
// import 'ysc'
import axios from 'axios'
import store from './store/store'
Vue.prototype.$axios = axios //全局请求

window.$ = $;

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

// 引入甘特
// import '../static/gantt-chart-d3'
// import '../static/d3.v3.min.js'


//新版本的cesium 不支持以前的import 方式导入  这是个坑
var Cesium = require('cesium/Cesium');
var widgets = require('cesium/Widgets/widgets.css');

//此处将cesium 赋给全局
Vue.prototype.Cesium = Cesium
Vue.prototype.widgets = widgets

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
