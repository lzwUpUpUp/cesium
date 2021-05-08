import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import CesiumViewer from '@/components/cesiumviewer'
import login from "@/components/login"   //登录页
import mainPage from "@/components/mainPage"  //主要页面
import milulation from "@/components/milulation"  //仿真页面
import armsPage from "@/components/armsPage"  //武器库
import targetPage from "@/components/targetPage"  //目标库
import sensorPage from "@/components/sensorPage"  //传感器库
import rulesPage from "@/components/rulesPage"  //规则库
import picPage from "@/components/picPage"  
import tablePage from "@/components/tablePage"  






Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // redirect: '/login',
      redirect: '/mainPage',
    },
    {
      path: '/login',
      component: login,
    },
    {
      path: '/milulation',
      component: milulation,
    },
    {
      path: '/armsPage',
      component: armsPage,
    },
    {
      path: '/rulesPage',
      component: rulesPage,
    },
    {
      path: '/sensorPage',
      component: sensorPage,
    },
    {
      path: '/picPage',
      name: 'picPage',
      component: picPage,
    },
    {
      path: '/tablePage',
      name: 'tablePage',
      component: tablePage,
    },
    {
      path: '/targetPage',
      component: targetPage,
    },
    {
      path: '/mainPage',
      component: mainPage,
    },
    {
      path: '/CesiumViewer',
      name: 'CesiumViewer',
      component: CesiumViewer
    },
  ]
})
