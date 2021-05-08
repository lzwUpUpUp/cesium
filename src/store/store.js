import Vue from 'vue'
import Vuex from 'vuex'
// import http from "@/http/httpRequest.js"


Vue.use(Vuex)




const store = new Vuex.Store({
    state: {
        pointData: [],
        sessionObj: {},
        targetTrajectory: [],  //存放目标轨迹
        sensorTrajectory:[], //存放所有传感器的规划轨迹
        miluResult:'',
        loading : 1 ,//仿真计算结果等待loading图
        listoryNews:[], //保存中间地图弹窗的消息并显示
        ownObject:{},  // 传感器详情
        targetObject:{},  // 目标详情
        targetMess:{},
    },
    getters: {
        refleashText(state) {
            return state.refleash
        },
        getOwn(state){
            return state.ownObject;
        },
        getRonhe(state){
            return state.targetObject;
        },
        getTarget(state){

            let list = [];
            for(var i in state.targetObject){
                list.push(state.targetObject[i]);
            }
            list.sort((a,b)=>{return a.DanderLevel-b.DanderLevel});
            // console.log(list)
            return list;
        }
    },
    mutations: {
        ownPush(state,obj){
            // 对象深拷贝
            state.ownObject = JSON.parse(JSON.stringify(obj));
        },
        targetPush(state,obj){
            // 对象深拷贝
            state.targetObject = JSON.parse(JSON.stringify(obj));
        },
        // targetIn(state,obj){
        //     // 对象深拷贝
        //     state.targetMess = JSON.parse(JSON.stringify(obj));
        // }
        
    },

    actions: {

    }
})

export default store;