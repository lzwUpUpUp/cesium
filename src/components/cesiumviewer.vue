<template>
  <div class="container">
    <div id="cesiumContainer"></div>
    <div style="position: absolute;z-index:100" class="repeatTime">
      <input type="text" id="repeatStart" placeholder="开始时间" />
      <input type="text" id="repeatEnd" placeholder="结束时间" />
      <!-- <div style="position:absolute;background-color: red;" @click="Resuscitation()">复盘</div> -->
      <div class="toolBar">
        <div class="toolType">
          <span>传感器类型:</span>
          <input type="checkbox" v-model="swtichtag5" @change="switchLayer(5, '实时')" />海
          <input type="checkbox" v-model="swtichtag6" @change="switchLayer(6, '实时')" />陆
          <input type="checkbox" v-model="swtichtag7" @change="switchLayer(7, '实时')" />空
          <input type="checkbox" v-model="swtichtag8" @change="switchLayer(8, '实时')" />天
        </div>
        <div class="toolType">
          <span>目标类型:</span>
          <input type="checkbox" v-model="swtichtag11" @change="switchLayer(11, '实时')" />融合
          <input type="checkbox" v-model="swtichtag12" @change="switchLayer(12, '实时')" />原始
          <input type="checkbox" v-model="swtichtag13" @change="switchLayer(13, '实时')" />测向线
        </div>
        <div class="toolType">
          <span>目标身份:</span>
          <input
            type="checkbox"
            v-model="swtichtag1"
            :disabled="!swtichtag11"
            @change="switchLayer(1, '实时')"
          />我方
          <input
            type="checkbox"
            v-model="swtichtag2"
            :disabled="!swtichtag11"
            @change="switchLayer(2, '实时')"
          />敌方
          <input
            type="checkbox"
            v-model="swtichtag3"
            :disabled="!swtichtag11"
            @change="switchLayer(3, '实时')"
          />中立
          <input
            type="checkbox"
            v-model="swtichtag4"
            :disabled="!swtichtag11"
            @change="switchLayer(4, '实时')"
          />未知
        </div>
        <div class="toolType">
          <span>目标环境:</span>
          <input type="checkbox" v-model="swtichtag9" @change="switchLayer(9, '实时')" />空中
          <input type="checkbox" v-model="swtichtag10" @change="switchLayer(10, '实时')" />海面
          <input type="checkbox" v-model="swtichtag14" @change="switchLayer(14, '实时')" />未知
        </div>
        <div class="toolType">
          <span>航迹:</span>
          <input type="checkbox" v-model="tracetag1" @change="switchLayer('平轨迹', '实时')" />平台
          <input
            type="checkbox"
            v-model="tracetag2"
            v-bind:disabled="!swtichtag12"
            @change="switchLayer('原轨迹', '实时')"
          />原始
          <input type="checkbox" v-model="tracetag3" @change="switchLayer('己轨迹', '实时')" />我方
          <input type="checkbox" v-model="tracetag4" @change="switchLayer('敌轨迹', '实时')" />敌方
          <input type="checkbox" v-model="tracetag5" @change="switchLayer('中轨迹', '实时')" />中立
          <input type="checkbox" v-model="tracetag6" @change="switchLayer('未轨迹', '实时')" />未知
        </div>
        <div class="toolType">
          <span>误差椭圆:</span>
          <input
            type="checkbox"
            v-model="swtichtag15"
            :disabled="!swtichtag11"
            @change="switchLayer(15, '实时')"
          />融合误差
          <input
            type="checkbox"
            v-model="swtichtag16"
            v-bind:disabled="!swtichtag12"
            @change="switchLayer(16, '实时')"
          />原始误差
        </div>
        <div class="toolType">
          <span>标识:</span>
          <input type="checkbox" v-model="swtichtag20" @change="switchLayer(20,'实时')" />传感器
          <input
            type="checkbox"
            v-model="swtichtag21"
            v-bind:disabled="!swtichtag12"
            @change="switchLayer(21,'实时')"
          />原始目标
          <input
            type="checkbox"
            v-model="swtichtag22"
            :disabled="!swtichtag11"
            @change="switchLayer(22,'实时')"
          />
          融合目标
        </div>
        <!-- <div class="toolType">
          <span>方案:</span>
          <input type="checkbox" v-model="plan_1" @change="switchLayer(17,'实时')" />方案一
          <input type="checkbox" v-model="plan_2" @change="switchLayer(18,'实时')" />方案二
          <input type="checkbox" v-model="plan_3" @change="switchLayer(19,'实时')" />
          方案三
        </div>-->
      </div>

      <!-- <div id="mes" style="position:absolute;background-color: darkred;" @click="emitClick(1)">画点</div> -->

      <!-- <div
        style="position:absolute;background-color: red;margin-left: 100px"
        @click="mouseMoveRect()"
      >画矩形</div>-->
      <!-- <div
        style="position:absolute;background-color: red;margin-left: 150px"
        @click="emitClick(6)"
      >传感器照</div>
      <div
        style="position:absolute;background-color: red;margin-left: 220px"
        @click="emitClick(7)"
      >目标被照</div>-->
      <!-- <div
        style="position:absolute;background-color: red;margin-left: 300px"
        @click="emitClick(4,1)"
      >目标关联</div>
      <div
        style="position:absolute;background-color: red;margin-left: 380px"
        @click="emitClick(4,2)"
      >目标解除关联</div>-->

      <!--    <div style="position:absolute;background-color: red;margin-left: 300px" @click="emitClick(5)">规划目标</div>-->
    </div>

    <!-- 目标预警显示信息 -->
    <div id="AlertMessage">
      <ul class="showtime" :class="{ animations: animate }">
        <li :id="item.id" class="limess" v-for="(item, index) in alertList" :key="index">
          <div id="AlertMess">
            <p>批号:{{ item.id }}</p>
            <span class="twos">{{item.grade}}</span>
          </div>
          <p>消息来源:{{ item.source }}</p>
          <p>消息时间:{{item.timeStr}}</p>
          <p>
            消息内容:
            <span v-html="item.msg"></span>
          </p>
        </li>
      </ul>
    </div>

    <div class="labelshow">
      <p>经度：{{labelLon}}/{{labelLon1}}</p>
      <p>纬度：{{labelLat}}/{{labelLat1}}</p>
    </div>

    <!-- 传感器显示列表  ownObject $store.getters.getOwn -->
    <div id="platformList" class="common">
      <ul>
        <li v-for="(item,i) in $store.getters.getOwn" :key="i" v-show="platTypeShow==i">
          <div v-for="(obj,j) in item" :key="j" v-show="platIdShow==j">
            <p>
              <span>ID:</span>
              <span>{{obj.PlatID}}</span>
            </p>
            <p>
              <span>名称:</span>
              <span>{{obj.PlatName}}</span>
            </p>
            <p>
              <span>类型:</span>
              <span>{{obj.PlatType}}</span>
            </p>
            <p>
              <span>经度:</span>
              <span>{{obj.Lon}}</span>
            </p>
            <p>
              <span>纬度:</span>
              <span>{{obj.Lat}}</span>
            </p>
            <p>
              <span>高度:</span>
              <span>{{obj.Hei}}</span>
            </p>
            <p>
              <span>速度:</span>
              <span>{{obj.Vel}}km/h</span>
            </p>
            <p>
              <span>航向:</span>
              <span>{{obj.Heading}}</span>
            </p>
            <p>
              <span>时间:</span>
              <span>{{obj.MsgTime}}</span>
            </p>
            <p style="display:none">
              <span>传感器列表:</span>
              <span>{{obj}}</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
    <!-- 融合目标信息  targetObject-->
    <div id="targetList" class="common" refs="targetList" v-drag>
      <ul>
        <li v-for="(tar,i) in $store.getters.getRonhe" :key="i" v-show="targetIDShow==i">
          <div>
            <p>
              <span>融合批号:</span>
              <span>{{tar.FusionID}}</span>
            </p>
            <p>
              <span>目标名称:</span>
              <span>{{tar.TargetName1 ||'未知'}}</span>
            </p>
            <p style="overflow: hidden;">
              <span class="hiddenText">传感器名称:</span>
              <span class="hiddenText" :title="tar.SensorName">{{tar.SensorName}}</span>
            </p>
            <p>
              <span>协同手段:</span>
              <span>{{tar.SensorType}}</span>
            </p>
            <p>
              <span>危险等级:</span>
              <span>{{tar.DanderLevel}}</span>
            </p>
            <p>
              <span>身份:</span>
              <span>{{tar.Identify}}</span>
            </p>
            <p>
              <span>经度:</span>
              <span>{{tar.Lon}}</span>
            </p>
            <p>
              <span>纬度:</span>
              <span>{{tar.Lat}}</span>
            </p>
            <p>
              <span>高度:</span>
              <span>{{tar.Hei}}</span>
            </p>
            <p>
              <span>速度:</span>
              <span>{{tar.Vel}}km/h</span>
            </p>
            <p>
              <span>航向:</span>
              <span>{{tar.Heading}}</span>
            </p>
            <p>
              <span>CEP误差:</span>
              <span>{{tar.CEP}}</span>
            </p>
            <p>
              <span>敌我识别码:</span>
              <span>{{tar.IFF}}</span>
            </p>
            <p>
              <span>时间:</span>
              <span>{{tar.TimeStamp}}</span>
            </p>
            <p class="details">
              <span @click="targetDetailEvent(1,tar.FusionID)">航迹关联详情</span>
              <span @click="targetDetailEvent(2,tar.FusionID)">目标识别详情</span>
            </p>
            <p class="editBtn">
              <!-- <input type="button" value="编辑" @click="editPoup(tar)" /> -->
              <span @click="editPoup(tar,1)">编辑名称</span>
              <span @click="editPoup(tar,2)">编辑优先级</span>
              <span @click="targetPicPage(tar)">详情</span>
            </p>
            <p class="details">
              <span @click="planMisson(tar)">规划</span>
            </p>
            <div style="overflow-y:auto;max-height:240px;overflow-x: hidden;">
              <p class="Detail" v-for="(mess,index) in targetDetailList" :key="index">
                <span :title="mess.msg" v-html="mess.msg"></span>
                <span>{{mess.time}}</span>
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- <div id="targetDetails">
      <div>
        <h3>hahah</h3>
        <p>
          <span>详情1:</span>
          <span>456456456456456456</span>
        </p>
        <p>
          <span>详情1:</span>
          <span>456</span>
        </p>
        <p>
          <span>详情1:</span>
          <span>456</span>
        </p>
        <p>
          <span>详情1:</span>
          <span>456</span>
        </p>
        <p>
          <span>详情1:</span>
          <span>456</span>
        </p>
        <p>
          <span>详情1:</span>
          <span>456</span>
        </p>
        <p>
          <span>取消</span>
        </p>
      </div>
    </div>-->

    <!-- 测向线信息  -->
    <div id="directionLineList" class="common">
      <ul>
        <li v-for="(item,i) in beamLine['测向线']" :key="i" v-show="directionLineShow==i">
          <div>
            <p>
              <span>编号:</span>
              <span>{{item.TID}}</span>
            </p>
            <p>
              <span>传感器名称:</span>
              <span>{{item.SensorName}}</span>
            </p>
            <p>
              <span>侦察手段:</span>
              <span>{{item.SensorType}}</span>
            </p>
            <p>
              <span>测向角:</span>
              <span>{{item.DOA}}</span>
            </p>
            <p>
              <span>频率:</span>
              <span>{{item.CenterFreq}}</span>
            </p>
            <p>
              <span>敌我识别码:</span>
              <span>{{item.IFF}}</span>
            </p>
            <p>
              <span>信号类型:</span>
              <span>{{item.SigType}}</span>
            </p>
            <p>
              <span>信号带宽:</span>
              <span>{{item.BandWidth}}kHz</span>
            </p>
            <p>
              <span>脉冲周期:</span>
              <span>{{item.PulsePeriod}}us</span>
            </p>
            <p>
              <span>脉冲宽度:</span>
              <span>{{item.PulseWidth}}us</span>
            </p>
            <p>
              <span>时间:</span>
              <span>{{item.TimeStamp}}</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
    <!-- 定位航迹 -->
    <div id="TrackList" class="common">
      <ul>
        <li v-for="(item,i) in beamLine['定位航迹']" :key="i" v-show="trackShow==i">
          <div>
            <p>
              <span>目标批号:</span>
              <span>{{item.TID}}</span>
            </p>
            <p>
              <span>传感器名称:</span>
              <span>{{item.SensorName || '未知'}}</span>
            </p>
            <p>
              <span>侦察手段:</span>
              <span>{{item.SensorType}}</span>
            </p>
            <p>
              <span>经度:</span>
              <span>{{item.Lon}}</span>
            </p>
            <p>
              <span>纬度:</span>
              <span>{{item.Lat}}</span>
            </p>
            <p>
              <span>高度:</span>
              <span>{{item.Hei}}</span>
            </p>
            <p>
              <span>速度:</span>
              <span>{{item.Vel}}km/h</span>
            </p>
            <!-- <p v-show="item.Environment=='空中'"> -->
            <p>
              <span>航向:</span>
              <span>{{item.Heading}}</span>
            </p>
            <p>
              <span>频率:</span>
              <span>{{item.CenterFreq}}</span>
            </p>
            <p>
              <span>敌我识别码:</span>
              <span>{{item.IFF}}</span>
            </p>
            <p>
              <span>时间:</span>
              <span>{{item.TimeStamp}}</span>
            </p>
          </div>
        </li>
      </ul>
    </div>

    <!-- 信息修改弹窗 @change="targetChange($event)" 
    @change="poupSelect($event)"   onblur="this.size=1"-->
    <div id="poup" class="poupCommon" v-show="poupObject.length && poupTag ==1">
      <ul>
        <li v-for="(item,index) in poupObject" :key="index">
          <div>
            <p>
              <span>ID:</span>
              <input type="text" v-model="item.FusionID" disabled />
            </p>
            <p>
              <span>名称:</span>
              <select
                class="targetOption"
                id="targetChoose"
                onmousedown="if(this.options.length>7){this.size=8}"
                onchange="this.size=1"
                v-model="target_Val"
                @change="poupSelect($event)"
              >
                <option value disabled selected hidden>{{item.TargetName1?item.TargetName1:'未知'}}</option>
                <option
                  v-for="(obj, index) in targetData"
                  :key="index"
                  :value="obj.TargetName"
                  :class="obj.BENumber"
                >{{ obj.TargetName }}</option>
              </select>
            </p>
            <p>
              <span>代号:</span>
              <input type="text" v-model="poup_Benumber" />
            </p>

            <p class="poupBtn">
              <span @click="poupSure(item,1)">确定</span>
              <span @click="poupCancel()">取消</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
    <!-- 修改危险等级 -->
    <div id="poup" class="poupCommon" v-show="poupObject.length && poupTag ==2">
      <ul>
        <li v-for="(item,index) in poupObject" :key="index">
          <div>
            <p>
              <span>ID:</span>
              <input type="text" v-model="item.FusionID" disabled />
            </p>
            <p>
              <span>优先级:</span>
              <input type="text" v-model="item.DanderLevel" />
            </p>
            <p>
              <span @click="poupSure(item,2)">确定</span>
              <span @click="poupCancel()">取消</span>
            </p>
          </div>
        </li>
      </ul>
    </div>

    <!-- 关联解除关联弹窗 -->
    <div id="relevance" class="connection" v-show="open_connect" v-drag>
      <div v-show="relevance_flag ==1">
        <label>关联1</label>
        <input type="text" v-model="relevance_id1" />
        <label>关联2</label>
        <input type="text" v-model="relevance_id2" />
      </div>
      <div v-show="relevance_flag == 2">
        <label>解关联</label>
        <input type="text" v-model="relevance_id3" />
      </div>
      <div>
        <span @click="emitClick(4,1)">目标关联</span>
        <span @click="emitClick(4,2)">目标解除关联</span>
        <span @click="sureConnect">确定</span>
        <span @click="cancelConnect">取消</span>
      </div>
    </div>

    <!-- 操作成功 -->
    <div class="poupSuccess" v-show="success_flag">
      <div>操作成功</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import gloabl from "../Url/url";
// import PolyLinePrimitive from '../Url/test'

export default {
  name: "cesiumviewer",
  props: ["leftChange"],
  data() {
    return {

      labelEntity: "", //全局经纬度显示
      labelLon: "", // 经度，
      labelLat: "",//纬度，
      labelLon1: "",//纬度，
      labelLat1: "",//纬度，
      start: "", //开始时间
      start2: "", //备份开始时间
      stop: "", //结束时间
      handler: "", //鼠标点击监听
      handlerInteract: "", // 交互传感器、目标、侧向线
      realTime: "", // 实时定时器
      realFlag: true, //定时同步请求设置
      /*己方*/
      ownObject: {}, //己方信息暂存
      owmPlatId: [], // 己方平台存储
      ownFlag: false, //  己方出现唯一判断
      pathTrack: {}, //轨迹存放
      /* 敌方 中立 未知 */
      targetObject: {}, //敌方信息暂存
      targetTid: [],  // 敌方id存放
      freindId: [],  // 友方id存放
      neutralityId: [], //中立id存放
      unknownId: [], //  身份未知id存放
      env_unknown: [],// 环境未知id存放
      targetFlag: true, //敌、中立唯一判断
      /* 海陆空天显影 */
      oceanId: [],
      landId: [],
      airForceId: [],
      skyId: [],
      /*空中目标和海绵目标*/
      airTargetId: [],
      oceanTargetId: [],
      /* 定位航迹、融合航迹、测向线 */
      directionLineId: {}, // 测向线id
      locationId: [], // 定位航迹id
      fusionsId: [],//融合航迹id
      /*测向线 */
      beamLine: {}, //测向线等信息暂存
      lineFlag: false, // 测向线信息唯一判断
      lineTotal: {}, //测向线存放
      // 误差椭圆id
      errorRonhe: [],//融合误差
      errorDingwei: [],//定位误差
      // 轨迹id
      trackObj: {},
      /* 预警 */
      alertList: [], // 敌方信息出现弹窗
      alertflag: false, // 敌方显示隐藏flag弹窗
      animate: false, // 预警动画
      animatetimer: null,
      /*工具 */
      linePoint: [], //画点模型存放
      lineArray: [], //画矩形的点
      linesdata: [], // 测距暂存对象

      open_connect: false, //关联接关联弹窗
      relevance_flag: 1, // 关联获取id存放
      relevance_id1: "",
      relevance_id2: "",
      relevance_id3: "",
      targetTravel: [], // 规划轨迹
      NewTarget: "", // 规划目标
      num: 0,
      /*消隐*/
      swtichtag1: true,  //  切换平台
      swtichtag2: true,  //  切换敌军
      swtichtag3: true,  //  切换中立
      swtichtag4: true, // 切换未知
      swtichtag5: true,  //  切换海基
      swtichtag6: true,  //  切换陆基
      swtichtag7: true,  //  切换空基
      swtichtag8: true, // 切换天基
      swtichtag9: true, // 切换空中目标
      swtichtag10: true, // 切换海面目标
      swtichtag11: true, // 切换融合航迹F
      swtichtag12: false, // 切换定位航迹
      swtichtag13: true, // 切换测向线
      swtichtag14: true, //环境未知切换
      swtichtag15: true, //融合误差椭圆
      swtichtag16: false, //定位误差椭圆
      swtichtag20: true, //平台文字标识
      swtichtag21: false, //原始目标标识
      swtichtag22: true, //融合目标标识


      tracetag1: false, // 平台航迹
      tracetag2: false, // 原始轨迹
      tracetag3: false, // 我方/友方/己方轨迹控制
      tracetag4: true, // 敌军轨迹
      tracetag5: false, // 中立轨迹
      tracetag6: false, // 未知轨迹



      /**方案1，2，3图层 */
      plan_list1: [],
      plan_list2: [],
      plan_list3: [],
      plan_1: false,
      plan_2: false,
      plan_3: false,
      // 旋转角修正
      rotateDeg: 90,


      /*复盘*/
      ResusceList: {},// 复盘数据拼接
      plat: {}, // 复盘平台分类存储
      origin: {}, // 定位航迹分类存储
      RfreindId: [],  // 己方平台单独提取
      RtargetTid: [],  // 敌方id存放
      RneutralityId: [], //中立id存放
      RunknownId: [], //  未知id存放

      /*测试划线 */
      positions: [],
      poly: undefined,
      options: {},

      // 交互id暂存
      interactiveId: "",
      // 目标所对应传感器存储
      targetDetect: {},


      // 点击地图平台，显示平台详细信息flag
      platTypeShow: '', //平台类型
      platIdShow: '',  // 平台id
      // 点击地图目标，显示目标详细信息flag
      targetIDShow: '',  //目标id
      // 点击地图测向线 ，显示测向线信息
      directionLineShow: '',
      // 点击地图定位航迹，显示详细信息
      trackShow: '',

      poupObject: [],
      poupTag: 0, // 弹窗修改置信度和名称  1为修改名称，2为修改置信度

      targetDetailList: [],


      targetData: [], // 请求目标所有名称
      target_Val: '', //弹窗目标名称修改
      poup_Benumber: '', //弹窗修改的benumebr
      success_flag: false,  //操作成功弹窗
    }
  },
  mounted() {


    //  laydate在mainpage 已经引用
    laydate.render({
      //时间选择器的渲染
      elem: "#repeatStart",
      type: "datetime",
      max: this.getNowFormatDate()
    });
    laydate.render({
      //时间选择器的渲染
      elem: "#repeatEnd",
      type: "datetime",
      max: this.getNowFormatDate()
    });


    // 模拟飞机飞行
    var obj = {
      Lon: 115,
      Lat: 12,
      FusionID: "k6565",
      Heading: -90,
      TargetName1: 'hhhh',
      HalfLongAxis: 300000,
      HalfShortAxis: 150000,
      EllipseAngle: '30',
      Identify: "未知",
      Environment: '空中',
    };

    var obj1 = {
      Lon: 115,
      Lat: 8,
      FusionID: "move1",
      Heading: 100,
      TargetName1: 'aaa',
      HalfLongAxis: 300000,
      HalfShortAxis: 150000,
      EllipseAngle: '10',
      Identify: "未知",
      Environment: "未知"
    }





    this.$nextTick(() => {
      this.initCesium();

      // 计划方案
      // this.getAllPlan();

      this.realTime = setInterval(() => {
        // console.log(this.realFlag);

        this.realFlag && this.demandService();
      }, 3000);


      // this.addModel(obj, 2);
      // this.addModel(obj1, 2);
      // this.env_unknown.push('move1');

      // setTimeout(() => {
      //   obj1.Environment = '水面';
      //   if (this.env_unknown.indexOf('move1') !== -1) {
      //     this.changeModel(obj1);
      //   }



      //   console.log(this.env_unknown);

      // }, 5000);

      // setTimeout(() => {
      //   obj1.Identify = '敌方';
      //   var entity = viewer.entities.getById(obj1.FusionID);

      //   // 更改轨迹颜色
      //   this.changeTraceColor(obj1.FusionID, obj1);
      //   // 删除所在数组分类
      //   this.deleIden(obj1.FusionID);
      //   // 重新添加数组分类
      //   this.changeIden(obj1.Identify, obj1.FusionID);

      //   let colors = this.changeColor(obj1.Identify);
      //   // 模型颜色
      //   entity.billboard.color = colors;
      //   // 模型字体颜色
      //   entity.label.fillColor = colors;

      //   entity.show = this.changeEnvShow(obj1.Environment) && this.changeIdenShow(obj1.Identify);
      //   let ellipseId = `e${obj1.FusionID}`;
      //   var errorEntity = viewer.entities.getById(ellipseId);
      //   // 椭圆误差移动
      //   if (errorEntity) {
      //     errorEntity.show = entity.show;

      //     let colors = this.changeColor(obj1.Identify);
      //     errorEntity.ellipse.outlineColor = colors;
      //   }
      // }, 10000)




      // // this.RscanStation("move1","k6565");
      // this.test("k6565", 115, 12);
      // this.test("move1", 115, 20);



    });


    // this.alertReceive()


  },
  beforeDestroy() {
    viewer.entities.removeAll();
  },
  methods: {
    // 测试代码
    test(id, a, b) {
      var a = a,
        b = b;
      setInterval(() => {
        var Cesium = this.Cesium;
        var entity = viewer.entities.getById(id);
        var heading = Cesium.Math.toRadians(100);
        var pitch = 0;
        var roll = 0;
        var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
        var positions = Cesium.Cartesian3.fromDegrees(a, b, 0);
        var orientation = Cesium.Transforms.headingPitchRollQuaternion(positions, hpr);
        entity.position = positions;
        entity.orientation = orientation;

        var saveLine = []; //存线
        saveLine.push(Number(a));
        saveLine.push(Number(b));
        var oldlon = a - 0.01;
        var oldlat = b - 0.01;
        saveLine.push(oldlon);
        saveLine.push(oldlat);

        //自定义轨迹ID
        var pathId = "p" + id;
        var pathentity = viewer.entities.getById(pathId);

        if (!pathentity) {
          var objs = { arr: saveLine, id: pathId };
          this.addPath(objs); //轨迹连线
        } else {
          // 如果位置和上一次相等，就不做操作
          if (a != oldlon || b != oldlat) {
            this.changePath(pathentity, a, b);
          }
        }
        a = a - 0.01;
        b = b - 0.01;

      }, 50);
    },

    //  地图初始化
    initCesium() {
      var GeoUrl = gloabl.URL.GeoUrl; //地图默认ip
      var Cesium = this.Cesium;
      Window.Cesium = Cesium;
      var cesiumContainer = document.getElementById("cesiumContainer");
      window.viewer = new Cesium.Viewer("cesiumContainer", {
        //加载在线谷歌地图
        //imageryProvider: new Cesium.UrlTemplateImageryProvider({
        //  url: "http://www.google.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}"
        //}),
        imageryProvider: new Cesium.WebMapServiceImageryProvider({
          url: GeoUrl + "/geoserver/World/wms",
          layers: "World:totalworld",
          parameters: {
            service: "WMS",
            format: "image/png",
            transparent: true
          }
        }),
        // terrainProvider: Cesium.createWorldTerrain(),

        homeButton: false, //主页按钮
        baseLayerPicker: false, //图层
        navigationHelpButton: false, //帮助信息按钮
        geocoder: false, //  搜索工具
        infoBox: false,
        timeline: true, // 指定当前时间  允许用户跳转到待定的事件
        animation: true, // 控制播放视图动画
        sceneModePicker: true,
        selectionIndicator: false, // 取消点击有绿框
        shouldAnimate: true,
        navigationInstructionsInitiallyVisible: false,
        // navigation: false,
        // terrainExaggeration:50.0,  //地形夸张度
      });

      var options = {
        camera: viewer.scene.camera,
        canvas: viewer.scene.canvas,
        clampToGround: true //开启贴地,
      };

      // tilingScheme: new Cesium.GeographicTilingScheme();
      // viewer.scene.globe.depthTestAgainstTerrain = true;  //注释防止图片显示不全

      //去除掉 版权信息
      viewer._cesiumWidget._creditContainer.style.display = "none";
      //时间轴动态显示隐藏
      viewer.animation.container.style.visibility = "hidden";
      viewer.timeline.container.style.visibility = "hidden";
      // viewer.timeline.container.style.visibility = 'visible';
      // viewer.animation.container.style.visibility = 'visible';

      var start = Cesium.JulianDate.fromDate(new Date());
      // var test = viewer.clock.currentTime;
      // var start = new Cesium.JulianDate.fromDate(new Date());
      this.start = Cesium.JulianDate.addHours(start, 8, new Cesium.JulianDate());
      this.start2 = this.start;
      // console.log(test,start,this.start,'开始时间')

      // 结束时间
      this.stop = Cesium.JulianDate.fromDate(new Date(2020, 10, 1));
      viewer.clock.startTime = this.start.clone();
      viewer.clock.stopTime = this.stop.clone();
      viewer.clock.currentTime = this.start.clone();
      //  相机聚焦
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
          112.3394,
          10.8314,
          1500000.0
        ),
        orientation: {
          // heading: Cesium.Math.toRadians(90.0), // east, default value is 0.0 (north) //东西南北朝向
          pitch: Cesium.Math.toRadians(-90), // default value (looking down)  //俯视仰视视觉
          roll: 0.0 // default value
        }
      });
      viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
        Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
      );

      this.handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

      // 启动地图全局点击
      this.globalClick();
      // this.addmodel();

      // 启动鼠标全局显示移动
      this.handleLabel();
    },

    //  规划demo
    addmodel() {
      var radar;
      //var viewer = this.viewer;
      var Cesium = this.Cesium;
      var start = this.start;
      var start2 = this.start2;
      var stop = this.stop;
      var url1 = "../../static/sensors.json"; /*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
      var request1 = new XMLHttpRequest();
      request1.open("get", url1); /*设置请求方法与路径*/
      request1.send(null); /*不发送数据到服务器*/
      request1.onload = function () {
        /*XHR对象获取到返回信息后执行*/
        radar = JSON.parse(request1.responseText); //读取轨迹数据
        // console.log(radar);
        for (var i = 0; i < radar.data.length; i++) {
          viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(
              radar.data[i].lon,
              radar.data[i].lat,
              250
            ),
            // name: radar.data.name,
            box: {
              dimensions: new Cesium.Cartesian3(10000.0, 10000.0, 500),
              outline: true,
              outlineColor: Cesium.Color.WHITE,
              outlineWidth: 2,
              material: Cesium.Color.fromRandom({ alpha: 0.5 })
            }
          });
        }
      };
      //添加原始航迹
      var url3 = "../../static/targets.json"; /*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
      var request3 = new XMLHttpRequest();
      request3.open("get", url3); /*设置请求方法与路径*/
      request3.send(null); /*不发送数据到服务器*/
      request3.onload = function () {
        /*XHR对象获取到返回信息后执行*/
        var trackY = JSON.parse(request3.responseText); //读取轨迹数据
        var position2 = computeFlighty(trackY.tracks);

        function computeFlighty(source) {
          // 取样位置 相当于一个集合
          var property = [];
          for (var i = 0; i < source.length; i++) {
            var positionl = Cesium.Cartesian3.fromDegrees(
              source[i].lon,
              source[i].lat,
              20000
            );
            // 添加位置，和时间对应
            property.push(source[i].lon, source[i].lat, 20000);
          }
          return property;
        }

        var Line = viewer.entities.add({
          name: "aGlowLine",
          polyline: {
            positions: Cesium.Cartesian3.fromDegreesArrayHeights(position2),
            width: 3,
            material: new Cesium.PolylineGlowMaterialProperty({
              glowPower: 0.3,
              // color: Cesium.Color.BLUE.withAlpha(0.9),
              color: Cesium.Color.RED
            })
          }
        });
      };

      //加载复盘数据
      var url2 = "../../static/track_fustion.json"; /*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
      var request2 = new XMLHttpRequest();
      request2.open("get", url2); /*设置请求方法与路径*/
      request2.send(null); /*不发送数据到服务器*/
      request2.onload = function () {
        /*XHR对象获取到返回信息后执行*/
        var json = JSON.parse(request2.responseText); //读取轨迹数据
        //console.log(json);
        //加载飞行轨迹
        //设置时间轴
        function computeFlight(source) {
          // 取样位置 相当于一个集合
          var property = new Cesium.SampledPositionProperty();
          for (var i = 0; i < source.length; i++) {
            var time = Cesium.JulianDate.addSeconds(
              start2,
              source[i].timestamp,
              new Cesium.JulianDate()
            );
            // var position = Cesium.Cartesian3.fromDegrees(source[i].stationLon, source[i].stationLat, 0);
            var position = Cesium.Cartesian3.fromDegrees(
              source[i].targetLon,
              source[i].targetLat,
              20000
            );
            // 添加位置，和时间对应
            property.addSample(time, position);
            if (i == 0) {
              start = time;
            }
            if (i == source.length - 1) {
              stop = time;
            }
          }
          //onsole.log(property);
          return property;
        }

        var position = computeFlight(json.data.fusions);
        //Actually create the entity
        viewer.clock.startTime = start.clone();
        viewer.clock.stopTime = stop.clone();
        viewer.clock.currentTime = start.clone();
        viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; //Loop at the end
        viewer.clock.multiplier = 10;
        //Set timeline to simulation bounds
        viewer.timeline.zoomTo(start, stop);
        var entity = viewer.entities.add({
          //Set the entity availability to the same interval as the simulation time.
          availability: new Cesium.TimeIntervalCollection([
            new Cesium.TimeInterval({
              start: start,
              stop: stop
            })
          ]),
          //Use our computed positions
          position: position,
          //Automatically compute orientation based on position movement.
          orientation: new Cesium.VelocityOrientationProperty(position),
          //Load the Cesium plane model to represent the entity
          // model: {
          //   uri: '../../static/Cesium/models/CesiumAir/Cesium_Air.glb',
          //   minimumPixelSize: 64
          // },
          billboard: {
            image: require("../assets/cesiumImages/weizhi.png"),
            scale: 0.5,
            color: Cesium.Color.WHITE.withAlpha(1)
          },
          //Show the path as a pink line sampled in 1 second increments.
          path: {
            resolution: 1,
            material: new Cesium.PolylineGlowMaterialProperty({
              glowPower: 0.1,
              color: Cesium.Color.YELLOW
            }),
            width: 2
          }
        });
        // console.log(entity);
        var model = entity;
        //加载扫描动画
        var radar_scanf = json.data.tracks;
        var data = "";
        for (var j = 0; j < radar.data.length; j++) {
          var timelist = [];
          for (var l = 0; l < radar_scanf.length; l++) {
            if (radar_scanf[l].stationId == radar.data[j].id) {
              var ttime = Cesium.JulianDate.addSeconds(
                start2,
                radar_scanf[l].timestamp,
                new Cesium.JulianDate()
              );
              timelist.push([ttime]);
              console.log(timelist, "列表");
            }
          }
          // console.log(timelist);
          if (timelist.length > 0) {
            data = {
              circle: [0.03, radar.data[j].lon + 0.1, radar.data[j].lat + 0.1, 30],
              observer: [radar.data[j].lon, radar.data[j].lat, 500], //观察点，也就是光源点，需要改成雷达站
              timelist: timelist,
              material: Cesium.Color.RED.withAlpha(0.5) //光的材质
              //,number:100//数字越小速度越快
            };
            var entityCList = createLightScanFollowEntity(viewer, data, model); //监听可能后面不好做判断，或者判断结果与实际不符
            // var entityCList = createLightScan(viewer, data); //返回的是所有面的数组 如果需要清除的画，就通过此清除
          }
        }

        function createLightScanFollowEntity(viewer, data, model) {
          //生成分割点
          var point = createLightScan_getCirclePoints(data.circle[0], data.circle[1], data.circle[2], data.circle[3]);
          //生成 entityCList 圆锥
          var entityCList = createLightScan_entityCList(viewer, point, data);
          // 实时获取模型的经纬度。
          var onoff = 1;
          viewer.scene.postRender.addEventListener(function () {
            var center = "";
            for (var p = 0; p < data.timelist.length; p++) {
              var ttime2 = data.timelist[p];
              if (viewer.clock.currentTime.dayNumber == ttime2[0].dayNumber)
                if (Math.round(viewer.clock.currentTime.secondsOfDay) == ttime2[0].secondsOfDay) {
                  if (onoff == 0) {
                    for (var h = 0; h < entityCList.length; h++) {
                      viewer.entities.add(entityCList[h]);
                    }
                    onoff = 1;
                  }
                  center = model.position.getValue(viewer.clock.currentTime); //获取模型当前位置 //世界坐标（笛卡尔坐标）
                }
              // var stations=model.position.
            }
            if (center) {
              var ellipsoid = viewer.scene.globe.ellipsoid;
              var cartographic = ellipsoid.cartesianToCartographic(center);
              var lon = Cesium.Math.toDegrees(cartographic.longitude);
              var lat = Cesium.Math.toDegrees(cartographic.latitude);
              var height = cartographic.height;
              //console.log(lon+";"+lat+";"+height);
              var X0 = lon - data.circle[1],
                Y0 = lat - data.circle[2],
                Z0 = height - 500; //差值
              for (var i = 0; i < entityCList.length; i++) {
                if (i == entityCList.length - 1) {
                  f(entityCList[i], [point[i].x, point[i].y, point[0].x, point[0].y], X0, Y0, Z0);
                } else {
                  f(entityCList[i], [point[i].x, point[i].y, point[i + 1].x, point[i + 1].y], X0, Y0, Z0);
                }
              }
            } else {
              for (var h = 0; h < entityCList.length; h++) {
                viewer.entities.remove(entityCList[h]);
              }
              onoff = 0;
            }
          });

          //修改每一个entity
          function f(entity, arr, X0, Y0, Z0) {
            entity.polygon.hierarchy = new Cesium.CallbackProperty(function () {
              //回调函数
              return new Cesium.PolygonHierarchy(
                Cesium.Cartesian3.fromDegreesArrayHeights([
                  data.observer[0], data.observer[1], data.observer[2], //观察点
                  arr[0] + X0, arr[1] + Y0, Z0, arr[2] + X0, arr[3] + Y0, Z0])
              );
            }, false);
          }

          return entityCList;
        }

        function createLightScan_getCirclePoints(r, ox, oy, count) {
          var point = []; //结果
          var radians = (Math.PI / 180) * Math.round(360 / count), //弧度
            i = 0;
          for (; i < count; i++) {
            var x = ox + r * Math.sin(radians * i),
              y = oy + r * Math.cos(radians * i);
            point.unshift({ x: x, y: y }); //为保持数据顺时针
          }
          return point;
        }

        //生成 entityCList面--形成圆锥
        function createLightScan_entityCList(viewer, point, data) {
          var lon = data.observer[0],
            lat = data.observer[1],
            h = data.observer[2];
          var entityCList = [];
          //创建 面
          for (var i = 0; i < point.length; i++) {
            // viewer.entities.add({ //切割的点
            //     position : Cesium.Cartesian3.fromDegrees(point[i].x,point[i].y),
            //     point : {
            //         color : Cesium.Color.RED,
            //         pixelSize : 8
            //     }
            // });
            var hierarchy;
            if (i == point.length - 1) {
              hierarchy = new Cesium.PolygonHierarchy(
                Cesium.Cartesian3.fromDegreesArrayHeights([lon, lat, h, point[i].x, point[i].y, 0, point[0].x, point[0].y, 0]));
            } else {
              hierarchy = new Cesium.PolygonHierarchy(
                Cesium.Cartesian3.fromDegreesArrayHeights([lon, lat, h, point[i].x, point[i].y, 0, point[i + 1].x, point[i + 1].y, 0]));
            }

            var entityC = viewer.entities.add({
              name: "三角形",
              polygon: {
                hierarchy: hierarchy,
                outline: false,
                perPositionHeight: true, //允许三角形使用点的高度
                material: data.material
              }
            });
            entityCList.push(entityC);
          }
          return entityCList;
        }
      };
    },


    //转换时间戳格式、
    timeFormat(t) {

      var time = new Date(Number(t));
      return `${time.getFullYear()}年${time.getMonth()}月${time.getDate()}日${time.getHours()}时${time.getMinutes()}分`
    },

    //  触发点击事件
    emitClick(num, tag) {
      var Cesium = this.Cesium;
      let flag = 1;

      // 清除矩形、点、测距线
      this.removeMap();
      // 目标关联接关联切换
      this.relevance_flag = tag == 1 ? 1 : 2;

      this.handler.setInputAction(movement => {
        //获取坐标
        var points = this.changeCoord(movement); // 坐标转换
        switch (num) {
          case 1:
            this.createPoint(points);
            break; // 添加点
          case 2:
            this.createPoygon(points);
            break; // 划线 画矩形
          case 3:
            // this.DistanceSave(points);
            this.stadiometry();
            break; //测距
          case 4:
            this.getIdModel(movement, tag);  //tag判断是 关联还是解关联
            break; // 获取id
          case 5:
            this.createTravel(points);
            break;
          case 6:
            // 平台照到的目标高亮
            this.Platform_target(movement);
            break;
          case 7:
            // 当前目标照到的传感器高亮
            this.Target_platform(movement);
            break;
        }
        //  取消点击
        if (flag == 1) {
          this.cancelhandle(num);
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },

    //  取消点击
    cancelhandle(num) {
      var Cesium = this.Cesium;
      this.handler.setInputAction(v => {
        // alert("取消点击");
        if (num == 2) {
          // 结束绘制
          this.Endline();
        }
        if (num == 5) {
          //  结束规划
          this.EndTravel();
        }
        if (num == 7 || num == 6) {
          // 目标平台恢复原样
          this.hightlightTarget(this.interactiveId, 0);
          this.hightlightPlat(this.interactiveId, 0);
          this.platTypeShow = ''; //平台类型
          this.platIdShow = '';  // 平台id
          // 点击地图目标，显示目标详细信息flag
          this.targetIDShow = '';  //目标id
        }
        this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
        this.handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    },

    //  坐标转换
    changeCoord(v) {
      var Cesium = this.Cesium;

      var cartesian = viewer.camera.pickEllipsoid(v.position, viewer.scene.globe.ellipsoid);
      var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
      var lon = Cesium.Math.toDegrees(cartographic.longitude).toFixed(5);
      var lat = Cesium.Math.toDegrees(cartographic.latitude).toFixed(5);
      var point = [Number(lon), Number(lat)];
      this.linePoint.push(point);

      // var pick1 = new Cesium.Cartesian2(v.position.x, v.position.y); //屏幕坐标->世界坐标
      // var cartesian = viewer.scene.globe.pick(
      //   viewer.camera.getPickRay(pick1),
      //   viewer.scene
      // ); //屏幕坐标->世界坐标 （两步）
      // var cartographic = Cesium.Cartographic.fromCartesian(cartesian); //世界坐标->地理坐标
      // var point = [(cartographic.longitude / Math.PI) * 180,(cartographic.latitude / Math.PI) * 180]; //地理坐标->经纬度坐标
      // // console.log(point);
      // this.linePoint.push(point);
      // //  addTr(linePoint);
      return point;
    },

    // 添加点
    createPoint(worldPosition) {
      var Cesium = this.Cesium;
      var point = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(
          worldPosition[0],
          worldPosition[1],
          0.0
        ),
        point: {
          color: Cesium.Color.RED,
          pixelSize: 5
        }
      });
      this.linePoint.push(point);
      var pointObj = {};
      var time = sessionStorage.getItem("startTime");
      var date = new Date(this.spiltDate(time)).getTime() / 1000;
      pointObj["lon"] = JSON.parse(worldPosition[0].toFixed(3));
      pointObj["lat"] = JSON.parse(worldPosition[1].toFixed(3));
      pointObj["timestamp"] = date + this.num;
      pointObj["alt"] = 0;
      this.$store.state.pointData.push(pointObj);
      this.num = this.num + 50;
      return point;
    },

    //截取字符串开始日期
    spiltDate(str) {
      var startTime = str.substring(0, 19);
      return startTime;
    },

    // formatDate(myDate) {
    //   var sYear = myDate.getFullYear();
    //   var sMonth = myDate.getMonth() + 1;
    //   var sDate = myDate.getDate();
    //   var hour = myDate.getHours();
    //   var minutes = myDate.getMinutes();
    //   var second = myDate.getSeconds();
    //
    //   return (
    //     sYear +
    //     "." +
    //     sMonth +
    //     "." +
    //     sDate +
    //     " " +
    //     hour +
    //     ":" +
    //     minutes +
    //     ":" +
    //     second
    //   );
    // },

    //  划线，画多边形
    createPoygon(points) {
      var Cesium = this.Cesium;
      this.lineArray.push(points[0]);
      this.lineArray.push(points[1]);
      this.linePoint.push(
        viewer.entities.add({
          position: Cesium.Cartesian3.fromDegrees(points[0], points[1], 0.0),
          point: {
            color: Cesium.Color.RED,
            pixelSize: 5
          }
        })
      );
    },

    //  结束划线
    Endline() {
      var Cesium = this.Cesium;
      var line = this.lineArray;
      line.push(line[0]);
      line.push(line[1]);
      var redLine = viewer.entities.add({
        name: "Red line on terrain",
        id: "Poygons",
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArray(line),
          width: 3,
          followSurface: false, //取消弯曲
          material: Cesium.Color.RED,
          clampToGround: true
        }
      });
      this.$emit("tranlonlat", line);
      // this.$parent.tranlonlat(line);
      for (var i = 0; i < this.linePoint.length; i++) {
        viewer.entities.remove(this.linePoint[i]);
      }
      this.lineArray = [];
      return redLine;
    },

    // 测距离
    DistanceSave(points) {
      this.lineArray.push(points[0]);
      this.lineArray.push(points[1]);
      console.log(this.lineArray)
      if (this.lineArray.length == 4) {
        //只测距两个点
        this.createDistance(this.lineArray);
        // console.log(distanceArray)
        this.lineArray = [];
        // handler1.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);  //关闭点击事件
        return;
      }
    },

    //  测距触发的方法
    createDistance(distanceArray) {
      var Cesium = this.Cesium;
      var GReen = new Cesium.Color(0.05882, 0.90196, 0.04705, 1);
      var point1 = new Cesium.Cartesian3.fromDegrees(distanceArray[0], distanceArray[1], 0.0);
      var point2 = new Cesium.Cartesian3.fromDegrees(distanceArray[2], distanceArray[3], 0.0);
      var linesMath = Cesium.Cartesian3.distance(point1, point2); //计算两点距离
      linesMath = this.getFloat(linesMath / 1000, 4); //保留四位
      var lineDistance = {
        position: Cesium.Cartesian3.fromDegrees(
          distanceArray[0],
          distanceArray[1],
          0.0
        ),
        polyline: {
          //划线
          positions: Cesium.Cartesian3.fromDegreesArray(distanceArray),
          width: 3,
          followSurface: false, //取消弯曲
          material: Cesium.Color.RED,
          clampToGround: true
        },
        label: {
          text: linesMath + "KM",
          font: "12pt Source Han Sans CN", //字体样式
          fillColor: GReen, //字体颜色
          backgroundColor: Cesium.Color.AQUA, //背景颜色
          //showBackground:true,                //是否显示背景颜色
          style: Cesium.LabelStyle.FILL, //label样式
          outlineWidth: 1,
          verticalOrigin: Cesium.VerticalOrigin.CENTER, //垂直位置
          horizontalOrigin: Cesium.HorizontalOrigin.LEFT, //水平位置
          pixelOffset: new Cesium.Cartesian2(5, 0) //偏移
        }
      };
      this.linesdata.push(viewer.entities.add(lineDistance)); //划线
      // viewer.entities.remove(linesdata)
    },

    //  轨迹绘制
    createTravel(points) {
      var Cesium = this.Cesium;
      this.lineArray.push(points[0]);
      this.lineArray.push(points[1]);
      this.targetTravel.push(
        viewer.entities.add({
          position: Cesium.Cartesian3.fromDegrees(points[0], points[1], 0.0),
          point: {
            color: Cesium.Color.YELLOW,
            pixelSize: 5
          }
        })
      );
    },

    //  结束轨迹绘制
    EndTravel() {
      var Cesium = this.Cesium;
      this.NewTarget = viewer.entities.add({
        name: "targetravel",
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArray(this.lineArray),
          width: 3,
          followSurface: false, //取消弯曲
          material: Cesium.Color.RED,
          clampToGround: true
        }
      });
      for (var i in this.targetTravel) {
        viewer.entities.remove(this.targetTravel[i]);
      }

      this.$store.state.targetTrajectory = this.lineArray;
      this.lineArray = [];
      this.targetTravel = [];
      // this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
      return this.NewTarget;
    },

    //  移除重画轨迹以及添加目标
    RemoveTarTravel() {
      viewer.entities.remove(this.NewTarget);
    },


    //  移除地图界面工具交互信息
    removeMap() {
      var entity = viewer.entities.getById("Poygons");
      let poyEntity = viewer.entities.getById('多边形');
      if (poyEntity) viewer.entities.remove(poyEntity);
      //  清除矩形
      if (entity) {
        viewer.entities.remove(entity);

      }
      // 清除点
      for (var j = 0; j < this.linePoint.length; j++) {
        viewer.entities.remove(this.linePoint[j]);
      }
      // 清除测距
      for (let j = 0; j < this.linesdata.length; j++) {
        viewer.entities.remove(this.linesdata[j]);
      }
    },

    //  保留小数点后几位
    getFloat(number, n) {
      n = n ? parseInt(n) : 0;
      if (n <= 0) {
        return Math.round(number);
      }
      number = Math.round(number * Math.pow(10, n)) / Math.pow(10, n); //四舍五入
      number = Number(number).toFixed(n); //补足位数
      return number;
    },

    // 动态显影敌友中立
    switchLayer(num, iden) {
      if (iden == '实时')
        switch (num) {
          case 1: this.comSwitchLayer(this.freindId, this.swtichtag1); break;  // 己方
          case 2: this.comSwitchLayer(this.targetTid, this.swtichtag2); break;  // 敌方
          case 3: this.comSwitchLayer(this.neutralityId, this.swtichtag3); break;  // 中立
          case 4: this.comSwitchLayer(this.unknownId, this.swtichtag4); break; // 未知
          case 5: this.comSwitchLayer(this.oceanId, this.swtichtag5); break; // 海
          case 6: this.comSwitchLayer(this.landId, this.swtichtag6); break; // 路
          case 7: this.comSwitchLayer(this.airForceId, this.swtichtag7); break; // 空
          case 8: this.comSwitchLayer(this.skyId, this.swtichtag8); break; // 天
          case 9: this.comSwitchLayer(this.airTargetId, this.swtichtag9); break; // 空中目标
          case 10: this.comSwitchLayer(this.oceanTargetId, this.swtichtag10); break; // 海面目标
          case 11: this.comSwitchLayer(this.fusionsId, this.swtichtag11); break; // 融合航迹
          case 12: this.comSwitchLayer(this.locationId, this.swtichtag12); break; // 定位航迹
          case 13: this.comSwitchLayer([], this.swtichtag13, '测向'); break; // 测向线
          case 14: this.comSwitchLayer(this.env_unknown, this.swtichtag14); break;//环境未知
          case 15: this.comSwitchLayer(this.errorRonhe, this.swtichtag15); break;  //融合误差椭圆
          case 16: this.comSwitchLayer(this.errorDingwei, this.swtichtag16); break; //定位误差椭圆
          case 17: this.planSwitchLayer(this.plan_list1, this.plan_1); break; //方案一
          case 18: this.planSwitchLayer(this.plan_list2, this.plan_2); break; //方案二
          case 19: this.planSwitchLayer(this.plan_list3, this.plan_3); break; //方案三
          case 20: this.comSwitchText(this.owmPlatId, this.swtichtag20); break; //平台文字标识
          case 21: this.comSwitchText(this.locationId, this.swtichtag21); break; //原始目标标识
          case 22: this.comSwitchText(this.fusionsId, this.swtichtag22); break; //融合目标标识

          case '平轨迹': this.traceSwitch(this.owmPlatId, this.tracetag1); break; // 平台
          case '原轨迹': this.traceSwitch(this.locationId, this.tracetag2); break; // 原始
          case '己轨迹': this.traceSwitch(this.freindId, this.tracetag3); break;  // 己方
          case '敌轨迹': this.traceSwitch(this.targetTid, this.tracetag4); break;  // 敌方
          case '中轨迹': this.traceSwitch(this.neutralityId, this.tracetag5); break;  // 中立
          case '未轨迹': this.traceSwitch(this.unknownId, this.tracetag6); break; // 未知



        }
      else {
        switch (num) {
          case 1: this.comSwitchLayer(this.RfreindId, this.swtichtag1); break;  // 己方
          case 2: this.comSwitchLayer(this.RtargetTid, this.swtichtag2); break;  // 敌方
          case 3: this.comSwitchLayer(this.RneutralityId, this.swtichtag3); break;  // 中立
          case 4: this.comSwitchLayer(this.RunknownId, this.swtichtag4); break; // 未知
        }
      }
    },

    //动态显影敌友中立等数组公用方法
    comSwitchLayer(list, tag, lineflag) {
      var entity, pid, path, eid, errorEntity;
      var lineList = this.directionLineId;

      for (var l = 0; l < list.length; l++) {
        // 获取模型
        entity = viewer.entities.getById(list[l]);


        // 模型显影
        if (entity) {
          entity.show = tag;
          if (entity.label) entity.label.show = tag;
        }
        // 获取轨迹模型 并隐藏显示
        if (this.trackObj[list[l]]) {
          this.trackObj[list[l]].forEach((item, index) => {
            var path = viewer.entities.getById(item);
            if (path) path.show = tag;
          })
        }

        //获取定位融合航迹按钮的误差椭圆
        eid = `e${list[l]}`;
        errorEntity = viewer.entities.getById(eid);
        if (errorEntity) {
          entity.name == '融合' ? this.swtichtag15 = tag : this.swtichtag16 = tag;
          entity.name == '融合' ? this.swtichtag22 = tag : this.swtichtag21 = tag;


          errorEntity.show = tag;
        }


        // 海陆空的测向线
        for (var i in lineList) {
          if (list[l] == i) {
            for (var j = 0; j < lineList[i].length; j++) {
              var lineEntity = viewer.entities.getById(lineList[i][j]);
              if (lineEntity) lineEntity.show = tag;
            }
          }
        }
      }
      //所有测向线
      if (lineflag == '测向') {
        // 所属平台
        for (var i in lineList) {
          // 获取测向线
          lineList[i].forEach((item, index) => {
            var lineEntity = viewer.entities.getById(item);
            if (lineEntity)
              lineEntity.show = tag;

          })
        }
      }

    },

    // 动态显示标识文字
    comSwitchText(list, tag) {
      for (var l = 0; l < list.length; l++) {
        // 获取模型
        let entity = viewer.entities.getById(list[l]);


        // 模型显影
        if (entity) {
          entity.label.show = tag;
        }
      }
    },

    // 方案图层切换
    planSwitchLayer(list, tag) {
      list.forEach((item, index) => {
        let id = `${item}`;
        let ids = `${item}s`;
        let idt = `${item}t`
        // console.log(id, ids);
        let entity = viewer.entities.getById(id);
        let outerEntity = viewer.entities.getById(ids);
        let lineEntity = viewer.entities.getById(idt);
        if (entity) {
          entity.show = tag ? true : false;
        }
        if (outerEntity) {
          outerEntity.show = tag ? true : false;

        }
        if (lineEntity) {
          lineEntity.show = tag ? true : false;

        }

      })
    },


    // 轨迹图层增加和消失
    traceSwitch(list, tag) {
      let Cesium = this.Cesium;
      if (tag) {
        for (var i = 0; i < list.length; i++) {
          let id = list[i];
          let pathId;
          if (!this.trackObj[id]) {
            pathId = `${id}_0`;
          }
          let traceModel = viewer.entities.getById(id);
          if (traceModel) {
            var getColor = traceModel.model ? traceModel.model.color : traceModel.billboard.color;
            var getPoi = traceModel.position.getValue(viewer.clock.currentTime);
            let arr = [];
            arr.push(getPoi.clone(), getPoi.clone());
            viewer.entities.add({
              show: show, //新增
              id: pathId,
              polyline: {
                positions: arr,
                width: 1,
                followSurface: false, //取消弯曲
                material: getColor._value,
                clampToGround: true
              }
            });
          }
        }
      } else {
        // 获取轨迹模型 并删除
        for (var i = 0; i < list.length; i++) {
          for (var j in this.trackObj) {
            if (list[i] == j && this.trackObj[j]) {
              this.trackObj[j].forEach((item, index) => {
                var pathentity = viewer.entities.getById(item);
                if (pathentity) {
                  viewer.entities.remove(pathentity);
                }
              });
              delete this.trackObj[j];
              j--;
            }
          }
        }
      }
    },



    //  数据请求 同步请求
    async demandService() {
      this.realFlag = false;
      var testUrl = gloabl.URL.testUrl + "/index/getMapIndex";

      await axios.get(testUrl).then(res => {

        if (res.status == 200) {
          if (res.data.data.plateforms.length)
            this.ownMessage(res.data.data.plateforms); //平台传感器

          if (res.data.data.fusionTraces.length)
            this.targetMessage(res.data.data.fusionTraces); // 融合点

          if (res.data.data.originalTraces.length)
            this.directionLine(res.data.data.originalTraces); // 测向线
          this.realFlag = true;

        }
        // console.log(this.demand_flag);
      }).catch(err => {
        console.log(err);

      });
    },

    //  复盘时间
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate =
        date.getFullYear() +
        seperator1 +
        month +
        seperator1 +
        strDate +
        " " +
        date.getHours() +
        seperator2 +
        date.getMinutes() +
        seperator2 +
        date.getSeconds();
      return currentdate;
    },

    //  复盘请求
    Resuscitation() {
      var Cesium = this.Cesium;
      var sDates = $("#repeatStart").val();
      var eDates = $("#repeatEnd").val();
      console.log(sDates, eDates);
      var startDate = new Date(sDates).getTime();
      var endDate = new Date(eDates).getTime();

      // var startDate = new Date("2020-04-03 23:19:53").getTime();
      // var endDate = new Date("2020-04-03 23:25:53").getTime();

      if (!startDate && !endDate) {
        alert("请输入复盘开始时间");
        return false;
      }
      if (startDate == endDate) {
        alert("开始时间和结束时间不能相同");
        return false;
      }
      if (startDate > endDate) {
        alert("开始时间必须小于结束时间");
        return false;
      }

      //时间轴显示
      viewer.timeline.container.style.visibility = "visible";
      viewer.animation.container.style.visibility = "visible";
      viewer.entities.removeAll(); //清空地图数据

      // 时间赋值到全局中
      this.start = startDate;
      this.stop = endDate;

      // 时间隔100秒请求一次 
      var startTemp = startDate;
      var endTemp = startDate + 100000;
      var flag = false;

      // 数据分段请求返回，避免数据量过大   递归
      this.ResusceInterface(startTemp, endTemp, endDate);

    },

    // 复盘接口
    async ResusceInterface(startDate, endDate, EndDate) {
      // console.log(startDate, endDate)
      var Cesium = this.Cesium;
      // startDate ,timeNum   请求的开始时间和请求速率
      // var url = gloabl.URL.testUrl + "/index?startDate=" + startDate + "&timeNum=" + timeNum;


      //  请求开始时间和结束时间
      var url = gloabl.URL.testUrl + "/findMapData?startDate=" + startDate + "&endDate=" + endDate;
      await axios.get(url).then(res => {
        // console.log(res);
        if (!this.ResusceList["plateforms"]) {
          this.ResusceList["plateforms"] = [];  //平台传感器
          this.ResusceList["fusionTraces"] = [];  // 融合
          this.ResusceList["originalTraces"] = [];  // 定位航迹和测向线

          this.ResusceList["plateforms"] = this.ResusceList["plateforms"].concat(res.data.plateforms);
          this.ResusceList["fusionTraces"] = this.ResusceList["fusionTraces"].concat(res.data.fusionTraces);
          this.ResusceList["originalTraces"] = this.ResusceList["originalTraces"].concat(res.data.originalTraces);  // 定位航迹和测向线

        } else {
          this.ResusceList["plateforms"] = this.ResusceList["plateforms"].concat(res.data.plateforms);
          this.ResusceList["fusionTraces"] = this.ResusceList["fusionTraces"].concat(res.data.fusionTraces);
          this.ResusceList["originalTraces"] = this.ResusceList["originalTraces"].concat(res.data.originalTraces);  // 定位航迹和测向线
        }
        // console.log("复盘数据", this.ResusceList);

        // 递归跳出
        if (EndDate == 'break') {
          console.log(startDate, endDate)
          this.GetResusce(this.start, this.stop, this.ResusceList);
          return true;
        }
        startDate = endDate + 1000;
        endDate = endDate + 100000;


        if (endDate < EndDate) {
          this.ResusceInterface(startDate, endDate, EndDate);
        } else {
          this.ResusceInterface(startDate, EndDate, 'break');
        }
      }).catch(err => {
        console.log(err);
      });
    },

    // 复盘接口数据调用
    GetResusce(startDate, endDate, list) {
      var Cesium = this.Cesium;
      // startDate ,timeNum   请求的开始时间和请求速率
      // console.log("复盘数据2", list);
      var Resuscelist = list;
      // startDate = new Date(viewer.clock.currentTime).getTime();
      // 设置时间轴的复盘起始时间和结束时间  
      this.start = Cesium.JulianDate.fromDate(new Date(startDate));
      this.start = Cesium.JulianDate.addHours(this.start, 8, new Cesium.JulianDate());
      this.stop = Cesium.JulianDate.fromDate(new Date(endDate));
      this.stop = Cesium.JulianDate.addHours(this.stop, 8, new Cesium.JulianDate());

      this.formatTime();

      if (list["plateforms"].length)
        this.formatPlatforms(list["plateforms"]); //平台传感器
      // this.ownMessage(list["plateforms"]);

      if (list["fusionTraces"].length)
        // this.targetMessage(list["fusionTraces"]); // 融合点
        this.formatFusion(list["fusionTraces"]); // 融合点

      // 定位航迹复盘
      if (list["originalTraces"].length) {
        var newlist = list["originalTraces"];
        var obj = {};  //提取定位航迹
        for (var i in newlist) {
          if (!obj[newlist[i].traceType]) {
            obj[newlist[i].traceType] = [];
            obj[newlist[i].traceType].push(newlist[i]);
          } else {
            obj[newlist[i].traceType].push(newlist[i]);
          }
        }
        this.formatOrigin(obj["定位航迹"]);
      }
      // this.directionLine(list["originalTraces"]); // 测向线

    },

    //切换实时
    Reallive() {
      viewer.entities.removeAll(); //清空地图数据
      //时间轴动态显示隐藏
      viewer.animation.container.style.visibility = "hidden";
      viewer.timeline.container.style.visibility = "hidden";
      this.realTime = setInterval(function () {
        //重新开启实时定时器
        this.demandService();
      }, 2000);
    },

    //  己方信息
    ownMessage(res) {
      var Cesium = this.Cesium;

      var Lists = res;

      for (let i = 0; i < Lists.length; i++) {
        let tid = Lists[i].PlatID;
        var entity = viewer.entities.getById(tid);
        //己方消失隐藏
        if (Number(Lists[i].DisappearFlag) >= 2) {
          if (entity) this.CommonRemove(tid);  //移除轨迹和平台
          continue;
        }


        if (this.ownObject[Lists[i].PlatType] == undefined) {
          this.ownObject[Lists[i].PlatType] = {};
        }

        if (this.ownObject[Lists[i].PlatType][tid] == undefined) {
          this.ownObject[Lists[i].PlatType][tid] = Lists[i];
          this.$store.commit('ownPush', this.ownObject);
          if (!entity) {
            //第一次打点
            this.owmPlatId.push(tid)
            this.addModel(Lists[i], 1);
          }
          continue; // 不执行下面语句，继续循环
        }

        var a = Number(Lists[i].Lon);
        var b = Number(Lists[i].Lat);
        var old = this.ownObject[Lists[i].PlatType][tid];
        var positions = Cesium.Cartesian3.fromDegrees(a, b, 10);
        if (entity) {
          if (Lists[i].PlatType == "空基") {
            // console.log(a,b)
            // entity.show = true;
            let head = Lists[i].Heading - this.rotateDeg;
            var heading = Cesium.Math.toRadians(head);
            var pitch = 0;
            var roll = 0;
            var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);

            var orientation = Cesium.Transforms.headingPitchRollQuaternion(positions, hpr);
            entity.position = positions;
            entity.orientation = orientation;
          }
          if (Lists[i].PlatType == "海基") {
            // entity.show = true;
            entity.position = positions
          }
          if (Lists[i].PlatType == "天基") {
            // entity.show = true;
            entity.position = positions
          }

          //文本修改
          let text = `${tid} \n ${Lists[i].PlatName}\n  ${Lists[i].MsgTime}`;
          entity.label.text = text;

          // 侦测范围跟随
          // var detectId = `e${tid}`;
          // var detectEntity = viewer.entities.getById(detectId);
          // if (detectEntity) {
          //   detectEntity.position = positions;
          // }

          if (this.tracetag1)
            this.commonTrace(old, Lists[i], tid);

          // this.ownObject[Lists[i].PlatType][tid] = Lists[i];
          //更新对象
          Object.assign(this.ownObject[Lists[i].PlatType][tid], Lists[i]);

          this.$store.commit('ownPush', this.ownObject);
        }
        // console.log(this.ownObject);

      }



    },

    //  敌方信息
    targetMessage(res) {
      // console.log(res);
      var Cesium = this.Cesium;
      for (var i in res) {
        var iden = res[i].Identify; //敌友
        var tid = res[i].FusionID; //目标tid
        var tarName = res[i].targetName; //目标名字
        var env = res[i].Environment; //空、水
        var sensorlist = res[i].SensorID.split('|');
        // 获取模型id
        var entity = viewer.entities.getById(tid);
        //分类存储 该目标被哪个传感器照到
        this.targetDetect[tid] = Object.assign([], sensorlist);


        //目标消失隐藏

        if (Number(res[i].DisappearFlag) >= 2) {
          if (entity) {
            this.CommonRemove(tid);  //移除轨迹和目标
          }
          continue;
        }

        if (this.targetObject[tid] == undefined) {
          this.targetObject[tid] = res[i];
          // this.targetMess[tid] = res[i];

          this.$store.commit('targetPush', this.targetObject);
          // this.$store.commit('targetIn', this.targetMess);

          if (!entity) {
            this.addModel(res[i], 2);
          }
          continue;
        }


        // 误差椭圆部分
        let ellipseId = `e${tid}`;
        var errorEntity = viewer.entities.getById(ellipseId);



        if (entity) {
          var a = Number(res[i].Lon);
          var b = Number(res[i].Lat);
          var old = this.targetObject[tid];

          let positions = Cesium.Cartesian3.fromDegrees(a, b, 10);

          // 环境未知或者身份未知 变已知

          if (env == "空中") {
            // 判断当前环境与环境未知数组有相同id，匹配到相同的id，对当前目标环境进行转换
            if (this.env_unknown.indexOf(tid) !== -1) {
              this.changeModel(res[i]);
            } else {
              if (old.Identify != iden) {
                // 更改轨迹颜色
                this.changeTraceColor(tid, res[i]);
                // 删除所在数组分类
                this.deleIden(tid);
                // 重新添加数组分类
                this.changeIden(iden, tid);

                let colors = this.changeColor(iden);
                // 模型颜色
                entity.model.color = colors;
                // 模型字体颜色
                entity.label.fillColor = colors;
                entity.show = this.changeEnvShow(env) && this.changeIdenShow(iden);


              }
              let head = res[i].Heading - this.rotateDeg;

              var heading = Cesium.Math.toRadians(head);
              var hpr = new Cesium.HeadingPitchRoll(heading, 0, 0);

              let orientation = Cesium.Transforms.headingPitchRollQuaternion(positions, hpr);
              entity.orientation = orientation;
              // 模型位置
              entity.position = positions;

            }
          }

          if (env == "水面") {
            if (this.env_unknown.indexOf(tid) !== -1) {
              this.changeModel(res[i]);
            } else {
              if (old.Identify != iden) {
                // 更改轨迹颜色
                this.changeTraceColor(tid, res[i]);
                // 删除所在数组分类
                this.deleIden(tid);
                // 重新添加数组分类
                this.changeIden(iden, tid);
                let colors = this.changeColor(iden);
                // 模型颜色
                entity.billboard.color = colors;
                // 模型字体颜色
                entity.label.fillColor = colors;
              }
              // 模型位置修改
              entity.position = positions;
              // 模型身份变更后的显示隐藏
              entity.show = this.changeEnvShow(env) && this.changeIdenShow(iden);


            }
          }
          if (env == "未知") {
            if (old.Identify != iden) {
              // 更改轨迹颜色
              this.changeTraceColor(tid, res[i]);
              // 删除所在数组分类
              this.deleIden(tid);
              // 重新添加数组分类
              this.changeIden(iden, tid);
              let colors = this.changeColor(iden);
              // 模型颜色
              entity.billboard.color = colors;
              // 模型字体颜色
              entity.label.fillColor = colors;
              entity.show = this.changeEnvShow(env) && this.changeIdenShow(iden);

            }
            entity.position = positions;
          }

          // 椭圆误差移动
          if (errorEntity) {
            errorEntity.ellipse.semiMinorAxis = Number(res[i].HalfShortAxis);
            errorEntity.ellipse.semiMajorAxis = Number(res[i].HalfLongAxis);
            errorEntity.position = positions;
            let Angle = res[i].EllipseAngle - this.rotateDeg;
            errorEntity.ellipse.rotation = Cesium.Math.toRadians(Angle);
            let colors = this.changeColor(iden);
            errorEntity.ellipse.outlineColor = colors;

            // 椭圆误差显影
            errorEntity.show = entity.show;

          }

          let _text = res[i].TargetName1 || "未知";
          let text = `${tid} \n ${_text} \n  ${res[i].TimeStamp}`;
          entity.label.text = text;


          // if (old.TargetName1 != res[i].TargetName1) {
          //   entity.label.text = `${tid} \n ${res[i].TargetName1} \n  ${res[i].TimeStamp}`;
          // }
          // 创建轨迹
          if (this.tracetag3 && iden == '我方')
            this.commonTrace(old, res[i], tid);
          if (this.tracetag4 && iden == '敌方')
            this.commonTrace(old, res[i], tid);
          if (this.tracetag5 && iden == '中立')
            this.commonTrace(old, res[i], tid);
          if (this.tracetag6 && iden == '未知')
            this.commonTrace(old, res[i], tid);


          if (this.targetObject[tid]) {
            Object.assign(this.targetObject[tid], res[i]);
          }
          this.$store.commit('targetPush', this.targetObject);

        }
      }
    },

    //  测向线 定位航迹
    directionLine(res) {
      var Cesium = this.Cesium;
      // console.log(res);
      var list;
      for (let i = 0; i < res.length; i++) {
        var ids; // id唯一
        var TraceType = res[i].TraceType;
        ids = res[i].TID;
        var entity;
        var tlineId;
        var a = Number(res[i].Lon);
        var b = Number(res[i].Lat);
        list = this.RotateLine(res[i]);

        if (TraceType == "定位航迹") {
          entity = viewer.entities.getById(ids);
          if (!this.swtichtag12) continue;
        } else {
          tlineId = "t" + ids;
          entity = viewer.entities.getById(tlineId);
        }

        //测向线 目标消失隐藏
        if (Number(res[i].DisappearFlag) >= 2) {
          if (entity) {
            if (TraceType == '定位航迹') this.CommonRemove(ids);
            if (TraceType == '测向线') this.CommonRemove(tlineId);
          }
          // entity.show = false; //id 隐藏
          continue;
        }

        if (this.beamLine[TraceType] == undefined) {
          this.beamLine[TraceType] = {};
        }
        if (this.beamLine[TraceType][ids] == undefined) {
          this.beamLine[TraceType][ids] = res[i];

          if (!entity) {
            if (TraceType == "定位航迹") {
              this.locationId.push(ids);//存定位航迹的所有id
              this.addModel(res[i], 3);
            } else if (TraceType == "测向线") {
              //测向线封装 旋转计算

              var objs = { arr: list, tid: tlineId };
              if (!this.directionLineId[res[i].SensorID]) {
                // 测向线有唯一平台
                this.directionLineId[res[i].SensorID] = [tlineId];
              } else {
                this.directionLineId[res[i].SensorID].push(tlineId);
              }
              this.addDirectionLine(objs); // 添加测向线
            }
          }
          continue;
        }



        // 误差椭圆部分
        let ellipseId = `e${ids}`;
        var errorEntity = viewer.entities.getById(ellipseId);
        if (entity) {
          if (TraceType == "定位航迹") {
            if (res[i].Environment == "空中") {
              let head = res[i].Heading - this.rotateDeg;
              var heading = Cesium.Math.toRadians(head);
              var hpr = new Cesium.HeadingPitchRoll(heading, 0, 0);
              let positions = Cesium.Cartesian3.fromDegrees(a, b, 10);
              let orientation = Cesium.Transforms.headingPitchRollQuaternion(positions, hpr);
              entity.orientation = orientation;
              entity.position = positions;
            }
            if (res[i].Environment == "水面") {
              // entity.show = true;
              entity.position = Cesium.Cartesian3.fromDegrees(a, b, 10);
            }
            if (res[i].Environment == "未知") {
              // entity.show = true;
              entity.position = Cesium.Cartesian3.fromDegrees(a, b, 10);
            }

            // 文字更新
            let text = `${ids} \n  ${res[i].TimeStamp}`;
            entity.label.text = text;
            //误差椭圆
            if (errorEntity) {
              errorEntity.ellipse.semiMinorAxis = Number(res[i].HalfShortAxis);
              errorEntity.ellipse.semiMajorAxis = Number(res[i].HalfLongAxis);
              errorEntity.position = Cesium.Cartesian3.fromDegrees(a, b, 10);
              let Angle = res[i].EllipseAngle - this.rotateDeg;

              errorEntity.ellipse.rotation = Cesium.Math.toRadians(Angle);
            }
            // 上一条数据信息
            var older = this.beamLine[TraceType][ids];

            if (older.TargetName1 != res[i].TargetName1) {
              entity.label.text = `${ids} \n ${res[i].TargetName1} \n  ${res[i].TimeStamp}`;
            }

            //定位轨迹动画连线
            if (this.tracetag2)
              this.commonTrace(older, res[i], ids);

          } else if (TraceType == "测向线") {
            entity.polyline.positions = Cesium.Cartesian3.fromDegreesArray(list);
          }
          // this.beamLine[TraceType][ids] = res[i];
          // 跟新对象
          Object.assign(this.beamLine[TraceType][ids], res[i]);

        }
      }
      // this.lineFlag = true;
      // console.log(this.directionLineId);
    },

    //第一次信息出现定位
    addModel(obj, judge) {
      var Cesium = this.Cesium;
      if (obj.PlatType == "空基") {
        this.PlaneModel(obj, judge);
        return;
      }
      if (obj.PlatType == "海基") {
        this.ShipsModel(obj, judge);
        return;
      }
      if (obj.PlatType == "天基") {
        this.SkyModel(obj, judge);
        return;
      }
      if (obj.PlatType == "地基" || obj.PlatType == "陆基") {
        this.RoadModel(obj, judge);
        return;
      }
      // 敌军 中立  定位航迹也用这个
      if (obj.Environment == "空中") {
        this.PlaneModel(obj, judge);
        return;
      }
      if (obj.Environment == "水面") {
        this.ShipsModel(obj, judge);
        return;
      }
      //环境未知打点
      if (obj.Environment == "未知") {
        this.unEnvModel(obj, judge);
        return;
      }
    },
    //  公共绘制轨迹
    commonTrace(oldObj, newObj, id) {
      var saveLine = []; //存线
      var iden = newObj.Identify; //敌友
      let a = Number(newObj.Lon);
      let b = Number(newObj.Lat);

      //自定义轨迹ID,轨迹模型
      let pathId, pathentity;

      if (!this.trackObj[id]) {
        pathId = `${id}_0`;
        this.trackObj[id] = [pathId];
      } else {
        // 取该对象的最后一个
        pathId = this.trackObj[id][this.trackObj[id].length - 1];
      }
      pathentity = viewer.entities.getById(pathId);

      if (!pathentity) {
        saveLine.push(Number(oldObj.Lon));
        saveLine.push(Number(oldObj.Lat));
        saveLine.push(a);
        saveLine.push(b);
        var objs = { arr: saveLine, iden: iden, id: pathId, env: newObj.Environment };
        this.addPath(objs); //轨迹连线
      } else {
        if (a != oldObj.Lon || b != oldObj.Lat) {
          // 轨迹动画衔接
          this.changePath(pathId, oldObj, newObj);
        }
      }

    },

    //  轨迹连线 （第一次连线）
    addPath(obj) {
      var Cesium = this.Cesium;
      var colorer = Cesium.Color.RED;
      var show;
      show = this.changeEnvShow(obj.env) && this.changeIdenShow(obj.iden);
      colorer = this.changeColor(obj.iden);
      if (obj.iden == "目标") { //定位
        show = this.swtichtag12;
        colorer = eval(`Cesium.Color.${gloabl.URL.lineColor}`);
      }


      var travel = viewer.entities.getById(obj.id);
      // console.log(obj.arr)
      if (!travel) {
        viewer.entities.add({
          show: show, //新增
          id: obj.id,
          polyline: {
            positions: Cesium.Cartesian3.fromDegreesArray(obj.arr),
            width: 1,
            followSurface: false, //取消弯曲
            material: colorer,
            clampToGround: true
          }
        });
      }
    },



    moni(x, y) {
      let arrs = [];
      for (var i = 0; i < 1000; i++) {
        x -= 0.01;
        y -= 0.01;
        arrs.push(x, y);
      }
      return arrs;
    },
    addlist(arr) {
      let Cesium = this.Cesium;

      let colorer = colorer = eval(`Cesium.Color.${gloabl.URL.lineColor}`);
      viewer.entities.add({
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArray(arr),
          width: 1,
          followSurface: false, //取消弯曲
          material: colorer,
          clampToGround: true
        }
      });
    },

    /**
     * 轨迹连线超过 阈值进行新封装  exp: p10_0 ,p10_1;  trackObj:{p10:[p10_0]}
     *  @num 拼接轨迹的尾数
     *  @path 轨迹id
     *  @pathId 轨迹id
     */

    increasePath(id, old, obj) {
      // id = this.trackObj[path][this.trackObj[path].length-1]
      let oldNum = Number(id.split('_')[1]);
      let num = ++oldNum;
      let tid = Number(id.split('_')[0]);
      let path = `${tid}`
      let pathId = `${tid}_${num}`;

      if (this.trackObj[path].length - 1 > 5) {
        viewer.entities.removeById(this.trackObj[path][0]);
        this.trackObj[path].shift();
        // console.log(this.trackObj[path])
      }
      // 封装轨迹对象
      !this.trackObj[path] ? this.trackObj[path] = [pathId] : this.trackObj[path].push(pathId);
      var saveLine = []; //存线
      saveLine.push(Number(old.Lon));
      saveLine.push(Number(old.Lat));
      saveLine.push(Number(obj.Lon));
      saveLine.push(Number(obj.Lat));
      // 创建新轨迹
      let iden;
      if (obj.TraceType == '定位航迹') iden = "目标";
      else iden = obj.Identify;
      this.addPath({ arr: saveLine, iden: iden, id: pathId, env: obj.Environment });
    },


    //轨迹连线（动态）
    changePath(pathId, older, obj) {
      let Cesium = this.Cesium;
      let path = viewer.entities.getById(pathId);
      // 获取当前path的经纬度 - 转回84
      var cartogarr = path.polyline.positions.getValue();
      let _to84 = this.Cartesian3_to84(cartogarr);
      if (_to84.length >= 100) {
        this.increasePath(pathId, older, obj);
        // console.log(_to84.length, pathId);
        return;
      }
      _to84.push(Number(obj.Lon), Number(obj.Lat));
      // console.log(_to84.length);
      // 轨迹点重新赋值
      path.polyline.positions = Cesium.Cartesian3.fromDegreesArray(_to84);
    },

    //  测向线
    addDirectionLine(obj) {
      var Cesium = this.Cesium;
      var colorer = eval(`Cesium.Color.${gloabl.URL.lineColor}`);
      var lineEntity = viewer.entities.getById(obj.tid);
      var name = '测向线';
      let show = this.swtichtag13 ? true : false;


      if (!lineEntity)
        viewer.entities.add({
          show: show, //新增
          id: obj.tid,
          name: name,
          polyline: {
            positions: Cesium.Cartesian3.fromDegreesArray(obj.arr),
            width: 1,
            followSurface: false, //取消弯曲
            material: colorer,
            clampToGround: true
          }
        });
      // }
    },

    //  计算测向线旋转角度
    RotateLine(obj) {
      var array = [];
      var lon = Number(obj.Lon);
      var lat = Number(obj.Lat);
      let x = 4 * Math.sin((Number(obj.DOA) * Math.PI) / 180);
      let y = 4 * Math.cos((Number(obj.DOA) * Math.PI) / 180);
      x = lon + x;
      y = lat + y;

      array.push(lon);
      array.push(lat);
      array.push(Number(x));
      array.push(Number(y));
      return array;
    },

    //  空基
    PlaneModel(obj, judge) {
      var Cesium = this.Cesium;
      var x, y, id, heads, colors, name, show;
      var text; // 空基名称
      let _top, _left; //文本偏移量
      _top = 40; // 默认定位航迹和融合目标
      _left = 0;
      x = Number(obj.Lon);
      y = Number(obj.Lat);
      show = true;
      //  平台
      if (judge == 1) {
        id = obj.PlatID; //平台id
        heads = obj.Heading;  //平台航向
        name = "己方";
        colors = eval(`Cesium.Color.${gloabl.URL.mineColor}`);
        show = this.swtichtag7;
        //平台名称
        text = `${id} \n ${obj.PlatName}\n  ${obj.MsgTime}`;
        // 侦测范围
        // this.detectionRange(obj);
        // 存平台空基id
        this.airForceId.push(id);
      }
      //  敌方 和 友军
      if (judge == 2) {
        id = obj.FusionID;
        heads = obj.Heading;
        name = "融合";
        let _text = obj.TargetName1 || "未知";
        text = `${id} \n ${_text} \n  ${obj.TimeStamp}`;
        // 目标颜色
        colors = this.changeColor(obj.Identify);
        show = this.changeEnvShow(obj.Environment) && this.changeIdenShow(obj.Identify);

        // 目标身份存储
        this.changeIden(obj.Identify, id);

        this.airTargetId.push(id);
        // 误差椭圆
        this.errorEllipse(obj, judge, show);

      }
      //  定位航迹的信息
      if (judge == 3) {
        id = obj.TID;
        heads = obj.Heading - this.rotateDeg;
        name = "定位航迹";
        text = `${id} \n  ${obj.TimeStamp}`;
        show = this.swtichtag12;
        colors = eval(`Cesium.Color.${gloabl.URL.lineColor}`); // 绿色
        // 误差椭圆
        this.errorEllipse(obj, judge, show);

      }
      var url = "../../static/Cesium/models/CesiumAir/Cesium_Air.glb";

      var heading = Cesium.Math.toRadians(heads);
      var pitch = 0;
      var roll = 0;
      var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
      var positions = Cesium.Cartesian3.fromDegrees(x, y, 10);
      var orientation = Cesium.Transforms.headingPitchRollQuaternion(
        positions,
        hpr
      );
      var planemodel = {
        // name: url,
        show: show,
        id: id,
        name: name,
        position: positions,
        orientation: orientation,
        model: {
          uri: url,
          minimumPixelSize: 50,
          // maximumScale: 100000,
          color: colors,
          scale: 20
        },
        label: {
          text: text,
          font: "10pt Source Han Sans CN", //字体样式
          fillColor: colors, //字体颜色
          style: Cesium.LabelStyle.FILL, //label样式
          outlineWidth: 1,
          verticalOrigin: Cesium.VerticalOrigin.CENTER, //垂直位置
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER, //水平位置
          pixelOffset: new Cesium.Cartesian2(_left, _top) //偏移
        }
      };



      if (judge == 3) {
        return viewer.entities.add(planemodel);
      } else {
        viewer.entities.add(planemodel);
      }

    },

    //  海基
    ShipsModel(obj, judge) {
      var Cesium = this.Cesium;
      var x, y, id, colors, images, show;
      let _top, _left; //文本偏移量
      _top = 35; // 默认定位航迹和融合目标
      _left = 0;
      x = Number(obj.Lon);  //经纬度
      y = Number(obj.Lat);
      // console.log(Cesium.Cartesian3.fromDegrees(x, y, 10),'dian');
      // console.log(Cesium.Cartesian3.fromDegreesArray([x, y,x+1,y+1]),'xian')

      let text; // 海基名称
      show = true;  // 默认显示
      if (judge == 1) {
        id = obj.PlatID; // 平台id
        // 平台名称
        text = `${id} \n ${obj.PlatName} \n ${obj.NativeTime}`;
        name = "己方";
        show = this.swtichtag5;
        images = require("../assets/cesiumImages/target.png");
        colors = eval(`Cesium.Color.${gloabl.URL.mineColor}.withAlpha(1)`);
        // 侦测范围
        // this.detectionRange(obj);
        // 存平台海基id
        this.oceanId.push(id);
      }
      //  敌方 和 友军
      if (judge == 2) {
        id = obj.FusionID; //融合id
        let _text = obj.TargetName1 || "未知";  // 平台名称
        text = `${id} \n ${_text} \n  ${obj.TimeStamp}`;
        name = "融合";
        show = this.changeEnvShow(obj.Environment) && this.changeIdenShow(obj.Identify);

        images = require("../assets/cesiumImages/target.png");
        // 目标颜色
        colors = this.changeColor(obj.Identify);
        // 目标身份存储
        this.changeIden(obj.Identify, id);

        this.oceanTargetId.push(id);
        // 误差椭圆
        this.errorEllipse(obj, judge, show);

      }
      //  定位航迹的信息
      if (judge == 3) {
        id = obj.TID;
        name = "定位航迹";
        let _text = "定位航迹";  // 平台名称
        text = `${id} \n ${_text} \n  ${obj.TimeStamp}`;
        show = this.swtichtag12;
        images = require("../assets/cesiumImages/target.png");
        colors = eval(`Cesium.Color.${gloabl.URL.lineColor}.withAlpha(1)`);
        // 误差椭圆
        this.errorEllipse(obj, judge, show);
      }

      var ship = {
        show: show,
        id: id,
        name: name,
        position: Cesium.Cartesian3.fromDegrees(x, y, 10),
        billboard: {
          image: images,
          scale: 0.5,
          color: colors,
        },
        label: {
          text: text,
          font: "10pt Source Han Sans CN", //字体样式
          fillColor: colors, //字体颜色
          style: Cesium.LabelStyle.FILL, //label样式
          outlineWidth: 1,
          verticalOrigin: Cesium.VerticalOrigin.CENTER, //垂直位置
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER, //水平位置
          pixelOffset: new Cesium.Cartesian2(_left, _top) //偏移
        }
      };
      var entity = viewer.entities.getById(id);
      if (judge == 3) {
        return viewer.entities.add(ship);
      } else {
        viewer.entities.add(ship);
      }
    },

    //  天基
    SkyModel(obj, judge) {
      var Cesium = this.Cesium;
      var x, y, id, show;
      id = obj.PlatID; // 平台id

      let text = `${id} \n ${obj.PlatName}`;//平台名称
      //  敌方 和 友军
      if (judge == 1) {
        x = Number(obj.Lon);  // 平台经纬度
        y = Number(obj.Lat);
        name = "己方";
        show = this.swtichtag8;
        // 存平台天基id
        this.skyId.push(id);
      }

      viewer.entities.add({
        show: show,
        id: id,
        name: name,
        position: Cesium.Cartesian3.fromDegrees(x, y, 10),
        billboard: {
          image: require("../assets/cesiumImages/weixin.png"),
          scale: 0.5,
          color: Cesium.Color.WHITE.withAlpha(1)
        },
        label: {
          text: text,
          font: "10pt Source Han Sans CN", //字体样式
          fillColor: eval(`Cesium.Color.${gloabl.URL.mineColor}`), //字体颜色
          style: Cesium.LabelStyle.FILL, //label样式
          outlineWidth: 1,
          verticalOrigin: Cesium.VerticalOrigin.CENTER, //垂直位置
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER, //水平位置
          pixelOffset: new Cesium.Cartesian2(0, 20) //偏移
        }
      });
    },

    //  地基
    RoadModel(obj, judge) {
      var Cesium = this.Cesium;
      var x, y, id, show;
      id = obj.PlatID;
      let text = `${id} \n ${obj.PlatName}`;//平台名称
      //  敌方 和 友军
      if (judge == 1) {
        x = Number(obj.Lon);
        y = Number(obj.Lat);
        name = "己方";
        show = this.swtichtag6;
        // 存平台地基id
        this.landId.push(id);
        // 侦测范围
        // this.detectionRange(obj);
      }
      viewer.entities.add({
        show: show,
        id: id,
        name: name,
        position: Cesium.Cartesian3.fromDegrees(x, y, 10),
        billboard: {
          image: require("../assets/cesiumImages/talou.png"),
          scale: 0.5,
          color: Cesium.Color.RED.withAlpha(1)
        },
        label: {
          text: text,
          font: "10pt Source Han Sans CN", //字体样式
          fillColor: eval(`Cesium.Color.${gloabl.URL.mineColor}`), //字体颜色
          // backgroundColor: Cesium.Color.AQUA, //背景颜色
          //showBackground:true,                //是否显示背景颜色
          style: Cesium.LabelStyle.FILL, //label样式
          outlineWidth: 1,
          verticalOrigin: Cesium.VerticalOrigin.CENTER, //垂直位置
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER, //水平位置
          pixelOffset: new Cesium.Cartesian2(0, 35) //偏移
        }
      });
    },

    // 环境未知打点
    unEnvModel(obj, judge) {
      var Cesium = this.Cesium;

      let id = obj.FusionID;
      // 存所有融合数据的tid;
      this.fusionsId.push(id);
      let _text = "未知";
      let text = `${id} \n ${_text} \n  ${obj.TimeStamp}`;
      this.env_unknown.push(id); // 环境未知
      let show = this.changeEnvShow(obj.Environment) && this.changeIdenShow(obj.Identify);
      // 目标颜色
      let colors = this.changeColor(obj.Identify);
      // 目标身份存储
      this.changeIden(obj.Identify, id);

      viewer.entities.add({
        //未知数据显示
        show: show,
        name: '融合',
        id: id,
        position: Cesium.Cartesian3.fromDegrees(Number(obj.Lon), Number(obj.Lat), 10),
        billboard: {
          image: require("../assets/cesiumImages/weizhi.png"),
          scale: 0.5,
          color: colors
        },
        label: {
          text: text,
          font: "10pt Source Han Sans CN", //字体样式
          fillColor: colors, //字体颜色
          style: Cesium.LabelStyle.FILL, //label样式
          outlineWidth: 1,
          verticalOrigin: Cesium.VerticalOrigin.CENTER, //垂直位置
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER, //水平位置
          pixelOffset: new Cesium.Cartesian2(0, 30) //偏移
        }
      });
      // 构建误差椭圆
      this.errorEllipse(obj, judge, show);

    },

    // 误差椭圆
    errorEllipse(obj, tag, show) {
      let Cesium = this.Cesium;
      let id = `e${obj.FusionID}`;
      let x = Number(obj.Lon);
      let y = Number(obj.Lat);
      let short = Number(obj.HalfShortAxis);
      let long = Number(obj.HalfLongAxis);
      let _color;
      let EllipseAngle = obj.EllipseAngle - this.rotateDeg;

      if (obj.Identify == "敌方")
        _color = eval(`Cesium.Color.${gloabl.URL.targetColor}.withAlpha(1)`);
      if (obj.Identify == "未知") //身份未知
        _color = eval(`Cesium.Color.${gloabl.URL.unknownColor}.withAlpha(1)`);
      if (obj.Identify == "中立")
        _color = eval(`Cesium.Color.${gloabl.URL.neutralColor}.withAlpha(1)`); //中立粉色
      if (obj.Environment == "未知") //环境未知
        _color = eval(`Cesium.Color.${gloabl.URL.unknownColor}.withAlpha(1)`);


      if (tag == 3) { //定位航迹
        id = `e${obj.TID}`;

        _color = eval(`Cesium.Color.${gloabl.URL.lineColor}.withAlpha(1)`);
        this.errorDingwei.push(id);
      } else {
        this.errorRonhe.push(id);
      }

      let entity = viewer.entities.getById(id);
      if (entity) return;

      viewer.entities.add({
        description: "ellipse",
        name: '误差',
        id: id,
        show: show,
        position: Cesium.Cartesian3.fromDegrees(x, y, 0),
        rotation: Cesium.Math.toRadians(EllipseAngle),
        ellipse: {
          semiMinorAxis: short,
          semiMajorAxis: long,
          height: 1,
          outline: true,
          outlineWidth: 1,
          outlineColor: _color,
          material: Cesium.Color.RED.withAlpha(0.0),
        }
      });
    },


    /**
     * 未知及环境身份目标的图标替换
     */
    changeModel(obj) {
      let id = obj.FusionID;
      let _unknownEntity = viewer.entities.getById(id);
      if (_unknownEntity) {
        viewer.entities.remove(_unknownEntity);
        this.TargetRemove(id);
        this.addModel(obj, 2);
        // 轨迹颜色替换
        this.changeTraceColor(id, obj);
      }
    },
    // 改变目标的颜色
    changeColor(iden) {
      let Cesium = this.Cesium;
      let colors;


      if (iden == '己方' || iden == '友方' || iden == "我方") {
        colors = eval(`Cesium.Color.${gloabl.URL.owmColor}`); //己方色
      }
      if (iden == '敌方') {
        colors = eval(`Cesium.Color.${gloabl.URL.targetColor}`); //敌方黄色
      }
      if (iden == '中立') {
        colors = eval(`Cesium.Color.${gloabl.URL.neutralColor}`); //中立粉色
      }
      if (iden == "未知") {
        colors = eval(`Cesium.Color.${gloabl.URL.unknownColor}`); //未知色
      }

      return colors;
    },
    // 改变身份显示
    changeIdenShow(iden) {
      let idenShow;
      if (iden == '己方' || iden == '友方' || iden == "我方") {
        idenShow = this.swtichtag1;
      }
      if (iden == '敌方') {
        idenShow = this.swtichtag2;//敌方
      }
      if (iden == '中立') {
        idenShow = this.swtichtag3; //中立
      }
      if (iden == "未知") {
        idenShow = this.swtichtag4; //未知
      }

      return idenShow;
    },

    // 改变环境的显示
    changeEnvShow(env) {
      let envShow;
      if (env == '空中') {
        envShow = this.swtichtag9 && this.swtichtag11;//空中
      }
      if (env == '水面') {
        envShow = this.swtichtag10 && this.swtichtag11;//水面
      }
      if (env == '未知') {
        envShow = this.swtichtag14 && this.swtichtag11; //未知
      }

      return envShow;
    },
    // 改变轨迹颜色
    changeTraceColor(item, obj) {
      // 轨迹颜色更替
      if (this.trackObj[item]) {
        this.trackObj[item].forEach((mess, i) => {
          var pathentity = viewer.entities.getById(mess);
          if (pathentity) {
            pathentity.polyline.material = this.changeColor(obj.Identify);
          }
        })
      }
    },
    // 移除所属分类
    deleIden(id) {
      // 移除存储的id
      this.fusionsId = this.fusionsId.filter(item => item != id);
      this.freindId = this.freindId.filter(item => item != id);
      this.targetTid = this.targetTid.filter(item => item != id);
      this.neutralityId = this.neutralityId.filter(item => item != id);
      this.unknownId = this.unknownId.filter(item => item != id);
    },

    // 改变目标所属分类
    changeIden(iden, id) {
      // 存所有融合数据的tid;
      this.fusionsId.push(id);
      // 身份中立
      if (iden == "中立") this.neutralityId.push(id);
      //  身份敌方
      if (iden == "敌方") this.targetTid.push(id);
      //  身份未知
      if (iden == "未知") this.unknownId.push(id);
      // 身份为己方和友方
      if (iden == '己方' || iden == '友方' || iden == "我方") this.freindId.push(id);
    },



    /**
     * 传感器侦测范围
     */
    detectionRange(obj) {
      let Cesium = this.Cesium;
      let id = `e${obj.PlatID}`;
      let x = Number(obj.Lon);
      let y = Number(obj.Lat);
      // let short = Number(obj.HalfShortAxis);
      // let long = Number(obj.HalfLongAxis);
      let radius = 300000;
      let _color, show;
      // let EllipseAngle = obj.EllipseAngle - this.rotateDeg;
      show = true;
      _color = eval(`Cesium.Color.${gloabl.URL.mineColor}.withAlpha(1)`);

      viewer.entities.add({
        description: "circle",
        name: '范围',
        id: id,
        show: show,
        position: Cesium.Cartesian3.fromDegrees(x, y, 0),
        // rotation: Cesium.Math.toRadians(EllipseAngle),
        ellipse: {
          semiMinorAxis: radius,
          semiMajorAxis: radius,
          height: 1,
          outline: true,
          outlineWidth: 1,
          outlineColor: _color,
          material: Cesium.Color.RED.withAlpha(0.1),
        }
      });
    },


    //  飞机出现 闪烁  闭包
    Blink(id) {
      var flag = 1;
      let number = 1;
      var blink = setInterval(() => {
        number++;
        var entity = viewer.entities.getById(id);
        if (!entity) {
          clearInterval(blink);
          return;
        }

        if (entity.model) {
          if (flag == 1) {
            entity.model.minimumPixelSize = 100;
            flag = 2;
          } else {
            entity.model.minimumPixelSize = 50;
            flag = 1;
          }
        } else {
          if (flag == 1) {
            entity.billboard.scale = 1;
            flag = 2;
          } else {
            entity.billboard.scale = 0.5;
            flag = 1;
          }
        }
        if (number > 6) {
          if (entity.model) entity.model.minimumPixelSize = 50;
          else entity.billboard.scale = 0.5;
          clearInterval(blink);
        }
      }, 1000);
    },

    // 预警接收socket信息
    alertReceive(obj) {
      if (obj.level == 3) {
        this.alertList.push(obj);
        // this.fusionsId.some((item, index) => {
        //   if (obj.id == item) {
        //     this.Blink(item);
        //   }
        // });
        if (this.animatetimer && this.alertList.length != 0) return;
        this.animatetimer = setInterval(this.alertScroll, 5000);
      }
    },

    //  预警弹窗动画
    alertScroll() {
      this.animate = true;
      setTimeout(() => {
        // this.alertList.push(this.alertList[0]);
        this.alertList.shift();
        this.animate = false;
      }, 1000);
      if (this.alertList.length == 0) {
        clearInterval(this.animatetimer);
        this.animatetimer = null;
      }
    },

    // 打开关联解关联窗口
    openConnection() {
      this.open_connect = true;
    },

    //  选中获取id
    //  选中获取id  关联
    getIdModel(movement, tag) {
      var Cesium = this.Cesium;
      var entity;  //模型
      var pick = viewer.scene.pick(movement.position);
      let ids;
      // console.log(tag)
      var cartesian = viewer.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);
      var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
      var lon = Number(Cesium.Math.toDegrees(cartographic.longitude).toFixed(5));
      var lat = Number(Cesium.Math.toDegrees(cartographic.latitude).toFixed(5));
      if (Cesium.defined(pick) && pick.id.id) {
        // 点击获取的id
        var id = pick.id.id;
        let entity = viewer.entities.getById(id);

        if (entity.name == "测向线") {
          id = id.split('t')[1];
          // console.log(id);
        }
        // 关联
        if (tag == 1) {
          if (this.relevance_id1) {
            this.relevance_id2 = id;
          } else {
            this.relevance_id1 = id;
          }
        } else {
          this.relevance_id3 = id;
        }

        //相机定位
        // viewer.camera.setView({
        //   destination: Cesium.Cartesian3.fromDegrees(lon, lat, 2500000)
        // });
      }
    },


    // 关联 解关联接口 open_connect 关闭弹窗flag
    relevanceApi() {
      let ids = `${this.relevance_id1},${this.relevance_id2}`;

      let url = gloabl.URL.testUrl + '/index/association?ids=' + ids;
      // console.log(ids)
      axios.get(url).then(res => {
        console.log(res, '关联结果');
        this.open_connect = false;
      }).catch(err => {
        console.log(err);
      });
    },

    // 解除关联接口
    deasasingAPi() {
      let id = this.relevance_id3;
      let url = gloabl.URL.testUrl + '/index/deasasing?id=' + id;
      axios.get(url).then(res => {
        // 调用方法使模型消失
        // this.CommonRemove(id);
        this.open_connect = false;
        console.log(res, '解除关联结果');

      }).catch(err => {
        console.log(err);

      })
    },

    // 确认关联接关联 relevance_flag =1为接关联
    sureConnect() {
      if (this.relevance_flag == 1) {
        this.relevanceApi();
      } else {
        this.deasasingAPi();//解关联
      }
      this.cancelConnect(4);
      // 还原位置
      $('.connection')[0].style.left = '40%';
      $('.connection')[0].style.top = '40%';

    },
    // 取消弹窗
    cancelConnect() {
      this.relevance_id1 = "";
      this.relevance_id2 = "";
      this.relevance_id3 = "";
      this.open_connect = false;
      this.cancelhandle(4); //取消点击事件
      // 还原位置
      $('.connection')[0].style.left = '40%';
      $('.connection')[0].style.top = '40%';
    },

    // 共同移除的模型方法
    CommonRemove(id) {
      let entity = viewer.entities.getById(id);


      // this.TraceRemove(id);

      let identify = entity.name;
      switch (identify) {
        case '己方': this.platRemove(id); break;
        case '融合': this.TargetRemove(id); break;
        case '测向线': this.LineRemove(id); break;
        case '定位航迹': this.TraceRemove(id); break;
      }

      // 获取轨迹模型 并删除
      if (this.trackObj[id]) {
        this.trackObj[id].forEach((item, index) => {
          var pathentity = viewer.entities.getById(item);
          if (pathentity) viewer.entities.remove(pathentity);
        })
      }

      //移除目标 侧向线
      if (entity) {
        viewer.entities.remove(entity);
        // viewer.entities.removeById(id)
      }


      // 误差椭圆和侦察范围
      // 平台侦测范围删除
      let detectEntity = viewer.entities.getById(`e${id}`);
      if (detectEntity) viewer.entities.remove(detectEntity);

    },

    //模型移除_融合目标 
    TargetRemove(id) {
      // 移除存储的id
      this.deleIden(id);
      this.airTargetId = this.airTargetId.filter(item => item != id);
      this.oceanTargetId = this.oceanTargetId.filter(item => item != id);
      this.env_unknown = this.env_unknown.filter(item => item != id);


      // 误差椭圆
      this.errorRonhe = this.errorRonhe.filter(item => item != `e${id}`);



      for (var i in this.targetObject) {
        if (i == id) {  //判断id和FusionID 移除FusionID属性
          delete this.targetObject[i];
          // delete this.targetMess[i];
        }
      }
    },
    // 模型移除_定位航迹
    TraceRemove(id) {
      // 移除定位航迹id
      this.locationId = this.locationId.filter(item => item != id);
      // 误差椭圆移除id
      this.errorDingwei = this.errorDingwei.filter(item => item != `e${id}`);


      for (var i in this.beamLine) {
        for (var j in this.beamLine[i]) {
          if (j == id) { //判断id和TID
            delete this.beamLine[i][j];
            return;
          }
        }
      }
    },
    // 模型移除_测向线
    LineRemove(id) {
      var tid = id.split('t')[1];
      for (var i in this.beamLine) {
        for (var j in this.beamLine[i]) {
          if (j == tid) {  //判断id和TID
            delete this.beamLine[i][j];
            return;
          }
        }
      }
    },
    // 模型移除_平台
    platRemove(id) {

      // 移除平台id
      this.oceanId = this.oceanId.filter(item => item != id);
      this.landId = this.landId.filter(item => item != id);
      this.airForceId = this.airForceId.filter(item => item != id);
      this.skyId = this.airForcskyIdeId.filter(item => item != id);

      for (var i in this.ownObject) {
        for (var j in this.ownObject[i]) {
          if (j == id) {  ////判断id和PlatID
            delete this.ownObject[i][j];
            return;
          }
        }
      }
    },





    /* 目标和平台/传感器互动功能 */
    // 全局交互（一）  绑定 点击事件
    globalClick() {
      let Cesium = this.Cesium;
      // 交互全局事件开启
      this.handlerInteract = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      // 左键获取id
      this.handlerInteract.setInputAction(movement => {
        // var points = this.changeCoord(movement);

        this.globalInteraction(movement);

      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

      // 右键取消
      this.handlerInteract.setInputAction(movement => {
        if (this.interactiveId) {
          // 目标平台传感器，测向线恢复原样
          this.clearClick();
          this.$emit('clearSingleHightLight');
        }
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    },

    // 全局交互（二）每个对象对应相应的事件
    globalInteraction(movement, fusionsId) {
      let Cesium = this.Cesium;
      let pick = viewer.scene.pick(movement.position);
      if ((Cesium.defined(pick) && pick.id.id) || fusionsId) {
        let id = fusionsId || pick.id.id;
        // console.log(id);
        // 点击id
        let entity = viewer.entities.getById(id);
        // 通过id的名称标识判定 传感器 侧向线 定位航迹 融合目标
        let identify = entity.name;
        // console.log(Object.keys(old),old)

        //清空原本已经高亮的模型
        this.clearClick();

        switch (identify) {
          case '己方':
            this.hightlightPlat(id, 1);
            //遍历更换list的信息
            for (var i in this.ownObject) {
              for (var j in this.ownObject[i]) {
                if (this.ownObject[i][j].PlatID == id) {
                  this.platIdShow = id; //传感器id
                  this.platTypeShow = i; //类型
                }
              }
            }
            // 记录上一次id
            this.interactiveId = { '己方': id };
            break;
          case '融合':
            // 目标变大
            this.hightlightTarget(id, 1);
            var targetObject = this.targetObject;

            for (var i in targetObject) {
              if (targetObject[i].FusionID == id) {
                this.targetIDShow = id;
              }
            }
            // 记录上一次id
            this.interactiveId = { '融合': id };
            break;
          case '测向线':
            this.hightlightDirection(id, 1);
            this.interactiveId = { '测向线': id };
            break;
          case '定位航迹':
            this.hightlightTrack(id, 1);
            this.interactiveId = { '定位航迹': id };
            break;
        }
      }
    },
    // 右键清空高亮 以及详细信息弹窗
    clearClick() {
      // 上一次点击的id
      let old = this.interactiveId;
      let oldIden = Object.keys(old)[0];
      if (oldIden == '己方') {
        this.hightlightPlat(old[oldIden], 0);
      } else if (oldIden == '融合') {
        this.hightlightTarget(old[oldIden], 0);
      } else if (oldIden == '测向线') {
        this.hightlightDirection(old[oldIden], 0);
      } else if (oldIden == '定位航迹') {
        this.hightlightTrack(old[oldIden], 0);
      }

      this.platTypeShow = ''; //平台类型
      this.platIdShow = '';  // 平台id
      // 点击地图目标，显示目标详细信息flag
      this.targetIDShow = '';  //目标id
      // 点击地图测向线，显示信息的flag
      this.directionLineShow = "";
      // 点击地图定位航迹，显示详情信息的flag
      this.trackShow = '';

      // 地图的目标融合定位详情清空
      this.targetDetailList = [];
    },



    // 变大变小 目标为主体，平台为辅的模型，
    hightlightTarget(id, targetflag) {
      let Cesium = this.Cesium;
      var entity;  //目标模型
      let _left, _top;//字体偏移量
      let _bigSize = "16pt Source Han Sans CN";
      let _smallSize = "10pt Source Han Sans CN";
      // 目标变大 变小
      entity = viewer.entities.getById(id);
      this.commonChange(entity, targetflag);
      // 点击目标，与之相关的平台传感器变大 变小
      if (this.targetDetect[id]) {
        this.targetDetect[id].forEach((item, index) => {
          //平台模型-->targetDetect存储了目标所对应的平台
          var target = viewer.entities.getById(item);  
          if (target) {
            target.show = true;
            target.label.show = true;

            if (targetflag == 1) {
              if (target.model) {
                target.model.minimumPixelSize = 100;
                _left = 0; _top = 80;
              }
              else {
                target.billboard.scale = 1;
                _left = 0; _top = 50;
              }
              target.label.font = _bigSize;
              target.label.pixelOffset = new Cesium.Cartesian2(_left, _top);
              // 绑定波束  传感器照到的所有目标
              this.RscanStation(item, id);
            } else if (targetflag == 0) {
              if (target.model) {
                target.model.minimumPixelSize = 50;
                _left = 0; _top = 40;
              }
              else {
                target.billboard.scale = 0.5;
                _left = 0; _top = 35;
              }
              target.label.font = _smallSize;
              target.label.pixelOffset = new Cesium.Cartesian2(_left, _top);
            }
          }
        });
      }
    },

    // 变大变小，平台为主体，目标为辅的模型
    hightlightPlat(id, platflag) {
      let Cesium = this.Cesium;

      var entity;  //平台模型
      var list = this.targetDetect;
      // 传感器变大变小

      let _left, _top;//字体偏移量
      let _bigSize = "16pt Source Han Sans CN";
      let _smallSize = "10pt Source Han Sans CN";
      entity = viewer.entities.getById(id);

      this.commonChange(entity, platflag);
      // 点击传感器 与之相关的 目标变大变小
      for (var i in list) {
        for (var j = 0; j < list[i].length; j++) {
          if (id == list[i][j]) {
            var plat = viewer.entities.getById(i); //获取目标id
            if (plat) {
              plat.show = true;
              plat.label.show = true;
              // 目标的放大缩小
              if (platflag == 1) {
                if (plat.model) {
                  plat.model.minimumPixelSize = 100;
                  _left = 0; _top = 80;
                }
                else {
                  plat.billboard.scale = 1;
                  _left = 0; _top = 50;
                }
                plat.label.font = _bigSize;
                plat.label.pixelOffset = new Cesium.Cartesian2(_left, _top);

                // 绑定波束  传感器照到的所有目标
                this.RscanStation(id, i);
              } else {
                if (plat.model) {
                  plat.model.minimumPixelSize = 50;
                  _left = 0; _top = 40;
                }
                else {
                  plat.billboard.scale = 0.5;
                  _left = 0; _top = 35;
                }
                plat.label.font = _smallSize;
                plat.label.pixelOffset = new Cesium.Cartesian2(_left, _top);
              }
            }
          }
        }
      }
    },

    // 不用遍历 点击的目标或者传感器变大变小
    commonChange(entity, targetflag) {
      let Cesium = this.Cesium;
      let _left, _top;//字体偏移量
      let _bigSize = "16pt Source Han Sans CN";
      let _smallSize = "10pt Source Han Sans CN";
      if (entity) {
        entity.show = true;
        entity.label.show = true;
        if (targetflag == 1) {
          if (entity.model) {
            entity.model.minimumPixelSize = 100;
            _left = 0; _top = 80;
          }
          else {
            _left = 0; _top = 50;
            entity.billboard.scale = 1;
          }
          entity.label.font = _bigSize;
          entity.label.pixelOffset = new Cesium.Cartesian2(_left, _top);
        } else if (targetflag == 0) {
          if (entity.model) {
            entity.model.minimumPixelSize = 50;
            _left = 0; _top = 40;
          }
          else {
            entity.billboard.scale = 0.5;
            _left = 0; _top = 35;
          }
          entity.label.font = _smallSize;
          entity.label.pixelOffset = new Cesium.Cartesian2(_left, _top);
        }
      }
    },


    // 测向线变大变小
    hightlightDirection(id, Directionflag) {
      let Cesium = this.Cesium;
      let entity;
      entity = viewer.entities.getById(id);
      if (entity) {
        // 变大标识
        if (Directionflag == 1) {
          let ids = id.split('t')[1];
          // console.log(id.split('t'))
          this.directionLineShow = ids;
          entity.polyline.width = 3;
          entity.polyline.material = eval(`Cesium.Color.${gloabl.URL.mineColor}`);
        } else {
          entity.polyline.width = 1;
          entity.polyline.material = eval(`Cesium.Color.${gloabl.URL.lineColor}`);
        }
      }
    },

    // 定位航迹变大变小
    hightlightTrack(id, Trackflag) {
      let Cesium = this.Cesium;
      let entity = viewer.entities.getById(id);
      let _left, _top;//字体偏移量
      let _bigSize = "16pt Source Han Sans CN";
      let _smallSize = "10pt Source Han Sans CN";
      if (entity) {
        if (Trackflag == 1) {
          this.trackShow = id;
          if (entity.model) {
            entity.model.minimumPixelSize = 100;
            _left = 0; _top = 80;
          }
          else {
            _left = 0; _top = 50;
            entity.billboard.scale = 1;
          }
          entity.label.font = _bigSize;
          entity.label.pixelOffset = new Cesium.Cartesian2(_left, _top);
        } else if (Trackflag == 0) {
          if (entity.model) {
            entity.model.minimumPixelSize = 50;
            _left = 0; _top = 40;
          }
          else {
            entity.billboard.scale = 0.5;
            _left = 0; _top = 35;
          }
          entity.label.font = _smallSize;
          entity.label.pixelOffset = new Cesium.Cartesian2(_left, _top);
        }
      }
    },


    // 笛卡尔转84 经纬坐标
    Cartesian3_to84(array) {
      var Cesium = this.Cesium;
      var list = [];
      for (var i = 0; i < array.length; i++) {
        var cartesian = new Cesium.Cartesian3(array[i].x, array[i].y, array[i].z);
        var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        var lat = Cesium.Math.toDegrees(cartographic.latitude).toFixed(6);
        var lon = Cesium.Math.toDegrees(cartographic.longitude).toFixed(6);
        list.push(Number(lon), Number(lat));
      }
      // console.log(list);
      return list;
    },

    // 鼠标移动划线
    mouseMoveLine(tag, index) {
      var _this = this;
      var Cesium = _this.Cesium;
      var polylines = viewer.entities.getById('轨迹绘制');
      if (polylines) {
        viewer.entities.remove(polylines);
      }

      var colors;
      // tag为1就是目标的轨迹颜色
      if (tag == 1)
        colors = Cesium.Color.RED;
      else
        colors = Cesium.Color.cornflowerBlue;

      var PolyLinePrimitive = (function () {
        function _(positions) {
          this.options = {
            id: '轨迹绘制',
            polyline: {
              show: true,
              positions: [],
              material: colors,
              width: 1,
            },
          };
          this.positions = positions;
          this._init();
        }
        _.prototype._init = function () {
          var _self = this;
          var _update = function () {
            return _self.positions;
          };
          //实时更新polyline.positions
          this.options.polyline.positions = new Cesium.CallbackProperty(_update, false);
          viewer.entities.add(this.options);
        };
        return _;
      })();
      var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      var positions = [];
      var poly = undefined;

      handler.setInputAction(function (movement) {
        var cartesian = viewer.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);
        if (positions.length == 0) {
          positions.push(cartesian.clone());
        }
        positions.push(cartesian);
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

      handler.setInputAction(function (movement) {
        var cartesian = viewer.camera.pickEllipsoid(movement.endPosition, viewer.scene.globe.ellipsoid);
        if (positions.length >= 2) {
          if (!Cesium.defined(poly)) {
            poly = new PolyLinePrimitive(positions);
          } else {
            positions.pop();
            cartesian.y += (1 + Math.random());
            positions.push(cartesian);
          }
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

      handler.setInputAction(function (movement) {
        positions.pop();
        var line = _this.Cartesian3_to84(positions);

        handler.destroy();

        if (tag == 1) {
          _this.$store.state.targetTrajectory = line;
        } else if (tag == 2) {
          var lineDate = ""
          for (var i = 0; i < line.length - 1; i += 2) {
            lineDate += line[i] + ',' + line[i + 1] + '|'
          }
          _this.$store.state.sensorTrajectory[index]['trace'] = lineDate
        }

      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    },




    // 划面，多边形
    mouseMovepoly() {
      var _this = this;
      var Cesium = _this.Cesium;
      var polygon = viewer.entities.getById('多边形');
      if (polygon) {
        // 存在多边形就删掉
        viewer.entities.remove(polygon);
      }
      var PolygonPrimitive = (function () {
        function _(positions) {
          this.options = {
            id: '多边形',
            polygon: {
              hierarchy: [],
              outline: false,
              perPositionHeight: true, //允许三角形使用点的高度
              material: Cesium.Color.RED.withAlpha(0.4),
            }
          };
          this.hierarchys = positions;
          this._init();
        }
        _.prototype._init = function () {
          var _self = this;
          var _update = function () {
            var list = [];
            list = _this.Cartesian3_to84(_self.hierarchys);
            return { positions: Cesium.Cartesian3.fromDegreesArray(list) }
            // return _self.hierarchys;
          };
          //实时更新polygon.hierarchy
          this.options.polygon.hierarchy = new Cesium.CallbackProperty(_update, false);
          viewer.entities.add(this.options);
        };
        return _;
      })();
      var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      var positions = [];
      var poly = undefined;

      handler.setInputAction(function (movement) {
        var cartesian = viewer.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);
        if (positions.length == 0) {
          positions.push(cartesian.clone());
        }
        positions.push(cartesian);
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

      handler.setInputAction(function (movement) {
        var cartesian = viewer.camera.pickEllipsoid(movement.endPosition, viewer.scene.globe.ellipsoid);
        if (positions.length >= 2) {
          if (!Cesium.defined(poly)) {
            poly = new PolygonPrimitive(positions);
          } else {
            positions.pop();
            cartesian.y += (1 + Math.random());
            positions.push(cartesian);
          }
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

      handler.setInputAction(function (movement) {
        positions.pop();

        var line = _this.Cartesian3_to84(positions);

        console.log(line)
        handler.destroy();
        _this.$emit("tranlonlat", line);

      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    },


    // 画矩形
    mouseMoveRect: function () {
      let _self = this;
      let Cesium = _self.Cesium;
      let pointsArr = [];
      _self.shape = {
        points: [],
        rect: null,
        entity: null
      };
      var tempPosition;
      var handle = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      //鼠标左键单击画点
      handle.setInputAction(function (click) {
        tempPosition = _self.getPointFromWindowPoint(click.position);
        //选择的点在球面上
        if (tempPosition) {
          if (_self.shape.points.length == 0) {
            pointsArr.push(tempPosition);
            _self.shape.points.push(viewer.scene.globe.ellipsoid.cartesianToCartographic(tempPosition));
            _self.shape.rect = Cesium.Rectangle.fromCartographicArray(_self.shape.points);
            _self.shape.rect.east += 0.000001;
            _self.shape.rect.north += 0.000001;
            _self.shape.entity = viewer.entities.add({
              rectangle: {
                coordinates: _self.shape.rect,
                material: Cesium.Color.BLACK.withAlpha(0.4),
                outline: true,
                outlineWidth: 8,
                outlineColor: Cesium.Color.RED,
                height: 0
              }
            });
            _self.bufferEntity = _self.shape.entity;
          }
          else {

            handle.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
            handle.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
          }
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      //鼠标移动
      handle.setInputAction(function (movement) {
        if (_self.shape.points.length == 0) {
          return;
        }
        var moveEndPosition = _self.getPointFromWindowPoint(movement.endPosition);
        //选择的点在球面上
        if (moveEndPosition) {
          pointsArr[1] = moveEndPosition;
          _self.shape.points[1] = viewer.scene.globe.ellipsoid.cartesianToCartographic(moveEndPosition);
          _self.shape.rect = Cesium.Rectangle.fromCartographicArray(_self.shape.points);
          if (_self.shape.rect.west == _self.shape.rect.east)
            _self.shape.rect.east += 0.000001;
          if (_self.shape.rect.south == _self.shape.rect.north)
            _self.shape.rect.north += 0.000001;
          _self.shape.entity.rectangle.coordinates = _self.shape.rect;
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    },

    getPointFromWindowPoint(point) {
      if (viewer.scene.terrainProvider.constructor.name == "EllipsoidTerrainProvider") {
        return viewer.camera.pickEllipsoid(point, viewer.scene.globe.ellipsoid);
      } else {
        var ray = viewer.scene.camera.getPickRay(point);
        return viewer.scene.globe.pick(ray, viewer.scene);
      }
    },

    //任务调用区域，渲染
    drawPolygon(array) {
      var Cesium = this.Cesium;
      var polygon = viewer.entities.getById('多边形');
      if (polygon) {
        // 存在多边形就删掉
        viewer.entities.remove(polygon);
      }
      if (array.length == 0) return;
      viewer.entities.add({
        id: '多边形',
        polygon: {
          hierarchy: new Cesium.Cartesian3.fromDegreesArray(array),
          outline: false,
          perPositionHeight: true, //允许三角形使用点的高度
          material: Cesium.Color.YELLOW.withAlpha(0.4),
        }
      })
    },

    // 区域调用触发 矩形
    drawrect(array) {
      var Cesium = this.Cesium;
      var Rect = viewer.entities.getById('矩形');
      if (Rect) {
        // 存在多边形就删掉
        viewer.entities.remove(Rect);
      }
      viewer.entities.add({
        id: '矩形',
        rectangle: {
          coordinates: Cesium.Rectangle.fromCartographicArray(array),
          material: Cesium.Color.BLACK.withAlpha(0.4),
          outline: true,
          outlineWidth: 8,
          outlineColor: Cesium.Color.RED,
          height: 0
        }
      })
    },


    //移除轨迹绘制 
    removeTrace() {
      var polylines = viewer.entities.getById('轨迹绘制');
      if (polylines) {
        viewer.entities.remove(polylines);
      }
    },



    // 任务规划目标飞行轨迹以及波束照射
    targetfusion(fusions, tracks, radar, res) {
      var Cesium = this.Cesium;
      //添加模型位置，和时间对应  返回响应位置的时间轴
      var position = this.computeFlight(fusions);
      viewer.clock.shouldAnimate = true;
      // 设置始时钟始时间
      viewer.clock.startTime = this.start.clone();
      // 设置时钟当前时间
      viewer.clock.currentTime = this.start.clone();
      // 设置始终停止时间
      viewer.clock.stopTime = this.stop.clone();
      // 时间速率，数字越大时间过的越快
      viewer.clock.multiplier = 10;
      // 时间轴
      viewer.timeline.zoomTo(this.start, this.stop);
      // 循环执行,即为2，到达终止时间，重新从起点时间开始
      viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP;

      //创建target飞机模型以及加载扫描动画
      this.createModelReplay(position, tracks, radar, res);
    },

    //创建target飞机模型以及加载扫描动画
    //创建target飞机模型以及加载扫描动画
    createModelReplay(position, radar_scanf, radar) {
      var Cesium = this.Ceisum;
      var entity = viewer.entities.add({
        //Set the entity availability to the same interval as the simulation time.
        availability: new Cesium.TimeIntervalCollection([
          new Cesium.TimeInterval({
            start: this.start,
            stop: this.stop
          })
        ]),
        position: position,
        orientation: new Cesium.VelocityOrientationProperty(position),
        model: {
          uri: "../../static/Cesium/models/CesiumAir/Cesium_Air.glb",
          minimumPixelSize: 64
        },
        //Show the path as a pink line sampled in 1 second increments.
        path: {
          resolution: 1,
          material: new Cesium.PolylineGlowMaterialProperty({
            glowPower: 0.1,
            color: Cesium.Color.YELLOW
          }),
          width: 2
        }
      });
      var model = entity;
      //加载扫描动画
      // var radar_scanf = json.data.tracks;   //请求返回的数据
      // var radar = json.data.tracks;   //请求返回的数据
      var data = "";
      for (var j = 0; j < radar.data.length; j++) {
        var timelist = [];
        for (var l = 0; l < radar_scanf.length; l++) {
          if (radar_scanf[l].stationId == radar.data[j].id) {
            var ttime = Cesium.JulianDate.addSeconds(
              start2,
              radar_scanf[l].timestamp,
              new Cesium.JulianDate()
            );
            timelist.push([ttime]);
          }
        }

        if (timelist.length > 0) {
          data = {
            circle: [0.03, radar.data[j].lon + 0.1, radar.data[j].lat + 0.1, 30],
            observer: [radar.data[j].lon, radar.data[j].lat, 500], //观察点，也就是光源点，需要改成雷达站
            timelist: timelist,
            material: Cesium.Color.RED.withAlpha(0.5), //光的材质
            //,number:100//数字越小速度越快
            id: radar.data[j].id
          };
          var entityCList = this.createLightScanFollowEntity(
            viewer,
            data,
            model
          ); //监听可能后面不好做判断，或者判断结果与实际不符
          // var entityCList = createLightScan(viewer, data); //返回的是所有面的数组 如果需要清除的画，就通过此清除
        }
      }
    },

    // 平台分类  供复盘所用
    formatPlatforms(res) {
      var Cesium = this.Cesium;
      this.plat = {};
      for (let i = 0; i < res.length; i++) {
        if (!this.plat[res[i].platId]) {
          this.plat[res[i].platId] = [];
          this.plat[res[i].platId].push(res[i]);
        } else {
          this.plat[res[i].platId].push(res[i]);
        }
      }
      console.log(this.plat, "分类数组对象");

      for (var j in this.plat) {
        var position = this.computeFlight(this.plat[j]);
        var image, color;

        this.RfreindId.push(Number(j)); // 存id

        if (this.plat[j][0].type == "海基") {
          color = Cesium.Color.WHITE.withAlpha(1);
          image = require("../assets/cesiumImages/ship5.png");
          this.createbill(Number(j), position, image);
        } else if (this.plat[j][0].type == "空基") {
          color = Cesium.Color.RED;
          this.createModel(Number(j), position, color);
        } else if (this.plat[j][0].type == "地基") {
          image = require("../assets/cesiumImages/talou.png");
          color = Cesium.Color.RED.withAlpha(1);
          this.createbill(Number(j), position, image, color);
        }
      }
    },

    //  融合数据分类，供复盘所用
    formatFusion(res) {
      var Cesium = this.Cesium;
      var timeObj = {}; //时间存储
      var tarObj = {}; // 融合目标分类

      for (var i = 0; i < res.length; i++) {
        // 获取平台id
        var ids = res[i].sensorId;
        var list = ids.split("|");
        if (list[0] == "") continue;
        // 添加相应时间戳
        for (let j = 0; j < list.length; j++) {
          // 时间
          if (!timeObj[res[i].tid]) {
            timeObj[res[i].tid] = {}; // 存时间

            tarObj[res[i].tid] = []; // 存对象  去重id
            tarObj[res[i].tid].push(res[i]);
          } else {
            // var len = tarObj[res[i].tid].length;
            // var old = tarObj[res[i].tid][len - 1];
            // if (Math.abs(old.lon - res[i].lon) < 0.005 && Math.abs(old.lat - res[i].lat) < 0.005)
            tarObj[res[i].tid].push(res[i]);
          }

          if (!timeObj[res[i].tid][list[j]]) {
            timeObj[res[i].tid][list[j]] = [];
            // 计算时间，添加时间
            var ttime = Cesium.JulianDate.fromDate(new Date(res[i].timeDouble * 1000));
            ttime = Cesium.JulianDate.addHours(ttime, 8, new Cesium.JulianDate());
            timeObj[res[i].tid][list[j]].push([ttime]);
          } else {
            var ttime = Cesium.JulianDate.fromDate(
              new Date(res[i].timeDouble * 1000)
            );
            ttime = Cesium.JulianDate.addHours(ttime, 8, new Cesium.JulianDate());

            var len = timeObj[res[i].tid][list[j]].length;
            var old = timeObj[res[i].tid][list[j]][len - 1];
            // console.log(ttime.secondsOfDay,old[0].secondsOfDay)
            //  时间相差不到5秒计算添加
            if (Math.abs(ttime.secondsOfDay - old[0].secondsOfDay) > 5)
              timeObj[res[i].tid][list[j]].push([ttime]);

          }
        }
      }

      //  时间轴定数
      // this.formatTime();

      console.log(timeObj, tarObj, "分类数组对象");
      for (var l in timeObj) {
        //添加位置，和时间对应
        var position = this.computeFlight(tarObj[l]);
        //创建target飞机模型以及加载扫描动画
        var model;
        var image, color;
        if (tarObj[l][0].environment == "水面") {
          if (tarObj[l][0].identify == "中立") {
            this.RneutralityId.push(Number(l));  // 中立id存储，用来显影
            image = require("../assets/cesiumImages/ship5.png");
          } else {
            this.RtargetTid.push(Number(l));  // 敌方id存储，用来显影
            image = require("../assets/cesiumImages/target.png");
          }
          model = this.createbill(Number(l), position, image);
        } else if (tarObj[l][0].environment == "空中") {
          if (tarObj[l][0].identify == "中立") {
            this.RneutralityId.push(Number(l));  // 中立id存储，用来显影
            color = Cesium.Color.ORANGE;
          } else {
            this.RtargetTid.push(Number(l));  // 敌方id存储，用来显影
            color = Cesium.Color.BLUE;
          }
          model = this.createModel(Number(l), position, color);
        }

        for (var h in timeObj[l]) {
          // console.log(l, h, timeObj[l][h])  l为targerId， h为sensorId
          if (timeObj[l][h].length > 0) {
            var data = "";
            var lon = this.plat[h][0].lon;
            var lat = this.plat[h][0].lat;

            // console.log(lon, lat, h, l);
            data = {
              circle: [0.03, lon + 0.1, lat + 0.1, 30],
              observer: [lon, lat, 500], //观察点，也就是光源点，需要改成雷达站
              timelist: timeObj[l][h],
              material: Cesium.Color.RED.withAlpha(0.5), //光的材质
              //,number:100//数字越小速度越快
              id: Number(h)
            };
            var entityCList = this.createLightScanFollowEntity(viewer, data, model);
            //监听可能后面不好做判断，或者判断结果与实际不符
          }
        }
      }
    },

    // 原始定位航迹复盘
    formatOrigin(res) {
      var Cesium = this.Cesium;
      this.origin = {};
      for (let i = 0; i < res.length; i++) {
        if (!this.origin[res[i].tid]) {
          this.origin[res[i].tid] = [];
          this.origin[res[i].tid].push(res[i]);
        } else {
          this.origin[res[i].tid].push(res[i]);
        }
      }
      console.log(this.origin, "分类数组对象");

      for (var j in this.origin) {
        var position = this.computeFlight(this.origin[j]);
        var image, color;

        if (this.origin[j][0].environment == "水面") {
          color = Cesium.Color.WHITE.withAlpha(1);
          image = require("../assets/cesiumImages/ship5.png");
          this.createbill(Number(j), position, image);
        } else if (this.origin[j][0].environment == "空中") {
          color = Cesium.Color.ORANGE;
          this.createModel(Number(j), position, color);
        } else if (this.origin[j][0].environment == "未知") {
          this.RunknownId.push(Number(j));  // 未知id存储，用来显影
          image = require("../assets/cesiumImages/weizhi.png");
          color = Cesium.Color.RED.withAlpha(1);
          this.createbill(Number(j), position, image, color);
        }
      }
    },

    // 计算飞行位移，确定复盘时间
    //加载飞行轨迹
    //设置时间轴
    computeFlight(source) {
      var Cesium = this.Cesium;
      // 取样位置 相当于一个集合
      var property = new Cesium.SampledPositionProperty();
      for (var i = 0; i < source.length; i++) {
        // var time = Cesium.JulianDate.addSeconds(start2, source[i].timestamp, new Cesium.JulianDate());
        var time = Cesium.JulianDate.fromDate(
          new Date(source[i].timeDouble * 1000)
        );
        time = Cesium.JulianDate.addHours(time, 8, new Cesium.JulianDate());

        var position = Cesium.Cartesian3.fromDegrees(
          source[i].lon,
          source[i].lat,
          20000
        );
        // 添加位置，和时间对应
        property.addSample(time, position);
      }
      return property;
    },
    //波束方法封装
    createLightScanFollowEntity(viewer, data, model) {
      var Cesium = this.Cesium;
      //生成分割点
      var point = this.createLightScan_getCirclePoints(
        data.circle[0],
        data.circle[1],
        data.circle[2],
        data.circle[3]
      );
      //生成 entityCList 圆锥
      var entityCList = this.createLightScan_entityCList(viewer, point, data);
      // 实时获取模型的经纬度。
      var onoff = 1;
      viewer.scene.postRender.addEventListener(function () {
        var center = "";
        for (var p = 0; p < data.timelist.length; p++) {
          var ttime2 = data.timelist[p];
          // var time = Cesium.JulianDate.addHours(viewer.clock.currentTime, 8, new Cesium.JulianDate());
          //   console.log(viewer.clock.currentTime.dayNumber,ttime2[0].dayNumber)
          //   console.log(Math.round(viewer.clock.currentTime.secondsOfDay),ttime2[0].secondsOfDay)
          if (viewer.clock.currentTime.dayNumber == ttime2[0].dayNumber)
            if (Math.round(viewer.clock.currentTime.secondsOfDay) - ttime2[0].secondsOfDay < 5) {
              //匹配时间戳
              if (onoff == 0) {
                for (var h = 0; h < entityCList.length; h++) {
                  // entityCList[h].show = true;
                  viewer.entities.add(entityCList[h]);
                }
                onoff = 1;
              }

              var entityPlatforms = viewer.entities.getById(data.id);  //拿平台的位置
              if (model.show && entityPlatforms.show) //如果是隐藏了，不拿位置,波束就会消失
                center = model.position.getValue(viewer.clock.currentTime); //获取模型当前位置 //世界坐标（笛卡尔坐标）
            }

          // var stations=model.position.
        }
        if (center) {
          var ellipsoid = viewer.scene.globe.ellipsoid;
          var cartographic = ellipsoid.cartesianToCartographic(center); //坐标转换
          var lon = Cesium.Math.toDegrees(cartographic.longitude); //经度
          var lat = Cesium.Math.toDegrees(cartographic.latitude); //纬度
          var height = cartographic.height;
          // console.log(lon+";"+lat+";"+height);
          var X0 = lon - data.circle[1],
            Y0 = lat - data.circle[2],
            Z0 = height - 500; //差值
          for (var i = 0; i < entityCList.length; i++) {
            if (i == entityCList.length - 1) {
              f(entityCList[i], [point[i].x, point[i].y, point[0].x, point[0].y], X0, Y0, Z0);
            } else {
              f(entityCList[i], [point[i].x, point[i].y, point[i + 1].x, point[i + 1].y], X0, Y0, Z0);
            }
          }
        } else {
          for (var h = 0; h < entityCList.length; h++) {

            viewer.entities.remove(entityCList[h]); //移除光束
            // entityCList[h].show = false;
          }
          onoff = 0;
        }
      });

      //修改每一个entity
      function f(entity, arr, X0, Y0, Z0) {
        entity.polygon.hierarchy = new Cesium.CallbackProperty(function () {
          //回调函数
          var model = viewer.entities.getById(data.id);
          var center = model.position.getValue(viewer.clock.currentTime);
          if (center) {
            var ellipsoid = viewer.scene.globe.ellipsoid;
            var cartographic = ellipsoid.cartesianToCartographic(center); //坐标转换
            data.observer[0] = Cesium.Math.toDegrees(cartographic.longitude); //经度
            data.observer[1] = Cesium.Math.toDegrees(cartographic.latitude); //纬度
            data.observer[2] = cartographic.height;
          }

          // console.log(lon,lat,height)
          return new Cesium.PolygonHierarchy(
            Cesium.Cartesian3.fromDegreesArrayHeights([
              data.observer[0], data.observer[1], data.observer[2], //观察点
              arr[0] + X0, arr[1] + Y0, Z0, arr[2] + X0, arr[3] + Y0, Z0])
          );
          // return new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArrayHeights(
          //   [
          //     data.observer[0], data.observer[1], data.observer[2],//观察点
          //     arr[0] + X0, arr[1] + Y0, Z0,
          //     arr[2] + X0, arr[3] + Y0, Z0
          //   ]))
        }, false);
      }

      return entityCList;
    },
    //生成分割点
    createLightScan_getCirclePoints(r, ox, oy, count) {
      var Cesium = this.Cesium;

      var point = []; //结果
      var radians = (Math.PI / 180) * Math.round(360 / count), //弧度
        i = 0;
      for (; i < count; i++) {
        var x = ox + r * Math.sin(radians * i),
          y = oy + r * Math.cos(radians * i);
        point.unshift({ x: x, y: y }); //为保持数据顺时针
      }
      return point;
    },
    //生成 entityCList面--形成圆锥
    createLightScan_entityCList(viewer, point, data) {
      var Cesium = this.Cesium;
      var lon = data.observer[0],
        lat = data.observer[1],
        h = data.observer[2];
      var entityCList = [];
      //创建 面
      for (var i = 0; i < point.length; i++) {
        // viewer.entities.add({ //切割的点
        //     position : Cesium.Cartesian3.fromDegrees(point[i].x,point[i].y),
        //     point : {
        //         color : Cesium.Color.RED,
        //         pixelSize : 8
        //     }
        // });
        var hierarchy;
        var hierarchy;
        if (i == point.length - 1) {
          hierarchy = new Cesium.PolygonHierarchy(
            Cesium.Cartesian3.fromDegreesArrayHeights([lon, lat, h, point[i].x, point[i].y, 0, point[0].x, point[0].y, 0]));
        } else {
          hierarchy = new Cesium.PolygonHierarchy(
            Cesium.Cartesian3.fromDegreesArrayHeights([lon, lat, h, point[i].x, point[i].y, 0, point[i + 1].x, point[i + 1].y, 0]));
        }

        var entityC = viewer.entities.add({
          name: "三角形",
          show: true,
          polygon: {
            hierarchy: hierarchy,
            outline: false,
            perPositionHeight: true, //允许三角形使用点的高度
            material: data.material
          }
        });
        entityCList.push(entityC);
      }

      return entityCList;
    },

    //创建target飞机模型以及加载扫描动画
    createModel(id, position, color) {
      var Cesium = this.Cesium;
      var entity = viewer.entities.add({
        //Set the entity availability to the same interval as the simulation time.
        availability: new Cesium.TimeIntervalCollection([
          new Cesium.TimeInterval({
            start: this.start,
            stop: this.stop
          })
        ]),
        show: true,
        //Use our computed positions
        position: position,
        //Automatically compute orientation based on position movement.
        orientation: new Cesium.VelocityOrientationProperty(position),
        //Load the Cesium plane model to represent the entity
        id: id,
        model: {
          uri: "../../static/Cesium/models/CesiumAir/Cesium_Air.glb",
          minimumPixelSize: 30,
          color: color
        },
        //Show the path as a pink line sampled in 1 second increments.
        path: {
          resolution: 1,
          material: new Cesium.PolylineGlowMaterialProperty({
            glowPower: 0.1,
            color: Cesium.Color.YELLOW
          }),
          width: 2
        }
      });
      return entity;
    },

    //创建海基地基空基模型以及加载扫描动画
    createbill(id, position, image, color) {
      var Cesium = this.Cesium;
      var entity = viewer.entities.add({
        //Set the entity availability to the same interval as the simulation time.
        availability: new Cesium.TimeIntervalCollection([
          new Cesium.TimeInterval({
            start: this.start,
            stop: this.stop
          })
        ]),
        show: true,
        //Use our computed positions
        position: position,
        //Automatically compute orientation based on position movement.
        // orientation: new Cesium.VelocityOrientationProperty(position),
        //Load the Cesium plane model to represent the entity
        id: id,
        billboard: {
          image: image,
          scale: 0.25,
          color: color
        },
        //Show the path as a pink line sampled in 1 second increments.
        path: {
          resolution: 1,
          material: new Cesium.PolylineGlowMaterialProperty({
            glowPower: 0.1,
            color: Cesium.Color.YELLOW
          }),
          width: 2
        }
      });
      return entity;
    },

    formatTime() {
      var Cesium = this.Cesium;
      viewer.clock.shouldAnimate = true;
      // 设置始时钟始时间
      viewer.clock.startTime = this.start.clone();
      // 设置时钟当前时间
      viewer.clock.currentTime = this.start.clone();
      // 设置始终停止时间
      viewer.clock.stopTime = this.stop.clone();
      // 时间速率，数字越大时间过的越快
      viewer.clock.multiplier = 5;
      // 时间轴
      viewer.timeline.zoomTo(this.start, this.stop);
      // 循环执行,即为2，到达终止时间，重新从起点时间开始
      // viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP;
      // 不循环，到终点停止
      viewer.clock.clockRange = Cesium.ClockRange.CLAMPED;
    },

    //select 选择按钮  划区域
    Drawpolygon(respoint) {
      var Cesium = this.Cesium;
      viewer.entities.add({
        id: "zonepolygon",
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArray(respoint),
          width: 3,
          followSurface: false, //取消弯曲
          material: Cesium.Color.BLUE,
          clampToGround: true
        }
      });
      //相机定位
      viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(respoint[0], respoint[1], 2500000)
      });
    },

    // 波束封装
    scanStation(ids, lons, lats, stationlon, stationlat, model) {
      var Cesium = this.Cesium;
      var data = {
        circle: [0.1, lons + 1, lats + 1, 30]// 第一个参数 0.003表示半径，第二个第三个分别表示底座圆心的坐标,第四个表示切割成多少个点。组成多少个面。越多会越卡 尽量实际项目不影响效果，越少越好。
        , observer: [stationlon, stationlat, 5000]//观察点，也就是光源点
        , material: Cesium.Color.RED.withAlpha(0.5),//光的材质
        id: ids,
      };

      //生成分割点
      var point = this.createLightScan_getCirclePoints(data.circle[0], data.circle[1], data.circle[2], data.circle[3]);
      //生成 entityCList 圆锥
      var entityCList = this.createLightScan_entityCList(viewer, point, data);

      // console.log('entity', EntityCList)
      var onoff = 1;


      // 实时获取模型的经纬度。
      viewer.scene.postRender.addEventListener(function () {
        var center = model.position.getValue(viewer.clock.currentTime);
        // var center = Cesium.Cartesian3.fromDegrees(lons, lats, 0);//需要改实时获取的飞机坐标;//获取模型当前位置 //世界坐标（笛卡尔坐标）
        if (onoff == 0) {
          for (var h = 0; h < entityCList.length; h++) {
            // entityCList[h].show = true;
            viewer.entities.add(entityCList[h]);
          }
          onoff = 1;
        }
        if (center) {
          var ellipsoid = viewer.scene.globe.ellipsoid;
          var cartographic = ellipsoid.cartesianToCartographic(center);
          var lon = Cesium.Math.toDegrees(cartographic.longitude);
          var lat = Cesium.Math.toDegrees(cartographic.latitude);
          //var height=cartographic.height;
          //console.log(lon+";"+lat+";"+height);
          var X0 = lon - data.circle[1], Y0 = lat - data.circle[2]; //差值
          for (var i = 0; i < entityCList.length; i++) {
            if (i == (entityCList.length - 1)) {
              f(data, entityCList[i], [point[i].x, point[i].y, point[0].x, point[0].y], X0, Y0);
            } else {
              f(data, entityCList[i], [point[i].x, point[i].y, point[i + 1].x, point[i + 1].y], X0, Y0);
            }
          }
        } else {
          for (var h = 0; h < entityCList.length; h++) {

            viewer.entities.remove(entityCList[h]); //移除光束
            // entityCList[h].show = false;
          }
          onoff = 0;
        }
      });

      //修改每一个entity
      function f(data, entity, arr, X0, Y0) {
        entity.polygon.hierarchy = new Cesium.CallbackProperty(function () { //回调函数
          var model = viewer.entities.getById(data.id);
          var center = model.position.getValue(viewer.clock.currentTime);
          if (center) {
            var ellipsoid = viewer.scene.globe.ellipsoid;
            var cartographic = ellipsoid.cartesianToCartographic(center); //坐标转换
            data.observer[0] = Cesium.Math.toDegrees(cartographic.longitude); //经度
            data.observer[1] = Cesium.Math.toDegrees(cartographic.latitude); //纬度
            data.observer[2] = cartographic.height;
          }

          return new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArrayHeights(
            [
              data.observer[0], data.observer[1], data.observer[2],//观察点
              arr[0] + X0, arr[1] + Y0, 0,
              arr[2] + X0, arr[3] + Y0, 0
            ]))
        }, false)
      }
      return entityCList;
    },
    //生成 entityCList面--形成圆锥
    createLightScan_entityCList(viewer, point, data) {
      let Cesium = this.Cesium;
      var lon = data.observer[0], lat = data.observer[1], h = data.observer[2];
      var entityCList = [];
      //创建 面
      for (var i = 0; i < point.length; i++) {
        var hierarchy;
        if (i == (point.length - 1)) {
          hierarchy = new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArrayHeights(
            [
              lon, lat, h,
              point[i].x, point[i].y, 0,
              point[0].x, point[0].y, 0
            ]))
        } else {
          hierarchy = new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArrayHeights(
            [
              lon, lat, h,
              point[i].x, point[i].y, 0,
              point[i + 1].x, point[i + 1].y, 0
            ]))
        }

        var entityC = viewer.entities.add({
          name: "三角形",
          polygon: {
            hierarchy: hierarchy,
            outline: false,
            perPositionHeight: true,//允许三角形使用点的高度
            material: data.material
          }
        });
        entityCList.push(entityC);
      }

      return entityCList
    },
    //生成分割点
    createLightScan_getCirclePoints(r, ox, oy, count) {
      var point = []; //结果
      var radians = (Math.PI / 180) * Math.round(360 / count), //弧度
        i = 0;
      for (; i < count; i++) {
        var x = ox + r * Math.sin(radians * i),
          y = oy + r * Math.cos(radians * i);
        point.unshift({ x: x, y: y }); //为保持数据顺时针
      }
      return point;
    },

    // 图表点击
    targetConnect(obj) {
      var item = obj.SensorID.split("|"); //获取sensorId

      if (item.length == 1) {
        return;
      }
      if (origalLine.length > 0) {  //清空之前的数据
        for (var i in origalLine) {
          viewer.entities.remove(origalLine[i]);
        }
        origalLine = [];
      }
      for (var l in item) {
        var target = viewer.entities.getById(item[l]);
        if (target) {
          var ellipsoid = viewer.scene.globe.ellipsoid;
          var cartesian = target.position.getValue();
          var cartographic = ellipsoid.cartesianToCartographic(cartesian); //坐标转换
          var lon = Number(Cesium.Math.toDegrees(cartographic.longitude)); //经度
          var lat = Number(Cesium.Math.toDegrees(cartographic.latitude)); //纬度
          var point = [lon, lat, Number(obj.Lon), Number(obj.Lat)];
          // this.addLine(point);  // 划线
          // 创建波束
          var entities = this.scanStation(item[l], Number(obj.Lon), Number(obj.Lat), lon, lat, target);
        }
      }
    },


    // 鼠标移动显示的经纬度（一）
    handleLabel() {
      let Cesium = this.Cesium;
      // this.labelEntity = viewer.entities.add({
      //   label: {
      //     show: false,
      //     showBackground: true,
      //     font: "16px monospace",
      //     horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
      //     verticalOrigin: Cesium.VerticalOrigin.TOP,
      //     pixelOffset: new Cesium.Cartesian2(15, 0),
      //   },
      // });
      this.handleMove();
    },

    //鼠标移动显示获取经纬（二）
    handleMove() {
      let Cesium = this.Cesium;
      var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      handler.setInputAction((movement) => {
        var cartesian = viewer.camera.pickEllipsoid(
          movement.endPosition,
          viewer.scene.globe.ellipsoid
        );
        if (cartesian) {
          var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
          var longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(4);
          var latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(4);
          var lons = longitudeString.split('.');
          var lats = latitudeString.split('.');

          var lonfen = this.computefenmiao(lons)._fen;
          var lonmiao = this.computefenmiao(lons)._miao;
          var latfen = this.computefenmiao(lats)._fen;
          var latmiao = this.computefenmiao(lats)._miao;

          this.labelLon = parseInt(longitudeString) > 0 ? `${lons[0]}°${lonfen}′${lonmiao}′′E` : `${lons[0]}°${latfen}′${lonmiao}′′W`;
          this.labelLat = parseInt(latitudeString) > 0 ? `${lats[0]}°${latfen}′${latmiao}′′N` : `${lats[0]}°${latfen}′${latmiao}′′S`;
          this.labelLon1 = parseInt(longitudeString) > 0 ? `${longitudeString}E` : `${longitudeString}W`;

          this.labelLat1 = parseInt(latitudeString) > 0 ? `${latitudeString}N` : `${latitudeString}S`;

          // this.labelEntity.position = cartesian;
          // this.labelEntity.label.show = true;
          // let text = `lon:  ${longitudeString} \nlat:  ${latitudeString}`;
          // this.labelEntity.label.text = text;

        } else {
          // this.labelEntity.label.show = false;
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    },

    // 计算经纬度秒分
    computefenmiao(val) {
      let _fen = parseInt(Number(`0.${val[1]}`) * 60);
      let _miao = parseInt(Number(`0.${val[1]}`) * 3600 - _fen * 60);
      return { _fen, _miao };
    },


    // 编辑弹窗 名称/优先级度
    editPoup(item, tag) {
      if (this.poupObject.length == 1) return;
      this.poupObject.push(item);
      this.poupTag = tag == 1 ? 1 : 2;
      // console.log(this.target_Val)
      this.getTargetName();
    },

    //获取目标名称
    getTargetName() {
      let url = gloabl.URL.testUrl + "/index/targets";
      axios.get(url).then(res => {
        this.targetData = res.data.data;
      })
    },
    // 下拉选择监听
    poupSelect(e) {
      // 填充代号
      this.poup_Benumber = this.targetData[e.target.selectedIndex - 1].BENumber;
      // console.log(this.poup_Benumber)
    },

    /**
     * url 请求路径
     * targetID 目标id
     * targetName 目标编号 
     * priority 优先级
     * beNumber 目标代号 BENumber
     */

    //弹窗确认 提交目标名称tag=1;提交优先级tag =2
    poupSure(item, tag) {
      let url, targetID, targetName, priority, beNumber;
      targetID = item.FusionID;
      // console.log(targetID);
      if (tag == 1) {
        url = gloabl.URL.testUrl + "/index/specifledTarget";
        targetName = this.target_Val;
        beNumber = this.poup_Benumber;
        axios.post(url, { targetID, targetName, beNumber }).then(res => {
          this.success_flag = res.data.code == 200 ? true : false;
          // console.log(res.data);
        })
      } else {
        url = gloabl.URL.testUrl + "/index/specifledPriority";
        priority = item.DanderLevel;
        axios.post(url, { targetID, priority }).then(res => {
          this.success_flag = res.data.code == 200 ? true : false;
        })
      }
      this.poupObject = [];
      this.poup_Benumber = "";
      this.target_Val = "";

      setTimeout(() => {
        this.success_flag = false;
      }, 2000);

    },

    //弹窗取消
    poupCancel() {
      this.poupObject = [];
      this.poup_Benumber = "";
      this.target_Val = "";
    },

    // 目标跳转详情
    targetPicPage(item) {
      let routeData = this.$router.resolve({
        // name: 'picPage',
        // params: { tid: item.FusionID, time: item.TimeStamp }
        path: '/picPage',
        query: { tid: item.FusionID, time: item.TimeStamp }
      });
      window.open(routeData.href, '_blank');
    },

    // 目标识别详情方法，航迹关联详情方法
    targetDetailEvent(type, id) {

      let url = gloabl.URL.testUrl + '/index/findMessage?type=' + type + '&id=' + id;
      axios.get(url).then(res => {
        if (res.data.code === 200) {
          this.targetDetailList = res.data.data;
          // console.log(res.data.data);
        }
      })
    },

    //规划方法跳转
    planMisson(item) {
      this.$emit('planMisson', item, 1);
    },




    /**
     * 调用波束方法 ，对信息数据进行封装
     * platId  平台id
     * targetId 目标id
     * lons 目标经度
     * lats 目标纬度
     * stationlon 平台经度
     * stationlat 平台纬度
     */

    // 波束
    RscanStation(platId, targetId) {
      let Cesium = this.Cesium;
      var ellipsoid = viewer.scene.globe.ellipsoid;

      // 平台
      let plat = viewer.entities.getById(platId);
      var platCenter = plat.position.getValue(viewer.clock.currentTime);
      var cartographic = ellipsoid.cartesianToCartographic(platCenter); //坐标转换
      let lons = Cesium.Math.toDegrees(cartographic.longitude);
      let lats = Cesium.Math.toDegrees(cartographic.latitude);

      // 目标
      var model = viewer.entities.getById(targetId);
      var targetCenter = model.position.getValue(viewer.clock.currentTime);
      var cartographic1 = ellipsoid.cartesianToCartographic(targetCenter); //坐标转换
      let stationlon = Cesium.Math.toDegrees(cartographic1.longitude);
      let stationlat = Cesium.Math.toDegrees(cartographic1.latitude);

      var data = {
        circle: [0.05, lons, lats, 30]// 第一个参数 0.003表示半径，第二个第三个分别表示底座圆心的坐标,第四个表示切割成多少个点。组成多少个面。越多会越卡 尽量实际项目不影响效果，越少越好。
        , observer: [stationlon, stationlat, 500]//观察点，也就是光源点
        , material: Cesium.Color.RED.withAlpha(0.5)//光的材质
        , id: platId
      };

      //生成分割点
      var point = createLightScan_getCirclePoints(data.circle[0], data.circle[1], data.circle[2], data.circle[3]);
      //生成 entityCList 圆锥
      var entityCList = createLightScan_entityCList(viewer, point, data);


      var onoff = 1;
      // 实时获取模型的经纬度。
      viewer.scene.postRender.addEventListener(callbackFun);

      //修改每一个entity
      function f(data, entity, arr, X0, Y0) {
        entity.polygon.hierarchy = new Cesium.CallbackProperty(function () {
          //回调函数
          var model = viewer.entities.getById(data.id);
          var center = model.position.getValue(viewer.clock.currentTime);
          if (center) {
            var ellipsoid = viewer.scene.globe.ellipsoid;
            var cartographic = ellipsoid.cartesianToCartographic(center); //坐标转换
            data.observer[0] = Cesium.Math.toDegrees(cartographic.longitude); //经度
            data.observer[1] = Cesium.Math.toDegrees(cartographic.latitude); //纬度
          }
          return new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArrayHeights(
            [
              data.observer[0], data.observer[1], data.observer[2],//观察点
              arr[0] + X0, arr[1] + Y0, 0,
              arr[2] + X0, arr[3] + Y0, 0
            ]))
        }, false)
      }

      return entityCList;

      function createLightScan_getCirclePoints(r, ox, oy, count) {
        var point = []; //结果
        var radians = (Math.PI / 180) * Math.round(360 / count), //弧度
          i = 0;
        for (; i < count; i++) {
          var x = ox + r * Math.sin(radians * i),
            y = oy + r * Math.cos(radians * i);
          point.unshift({ x: x, y: y }); //为保持数据顺时针
        }
        return point;
      }

      //生成 entityCList面--形成圆锥
      function createLightScan_entityCList(viewer, point, data) {
        var lon = data.observer[0], lat = data.observer[1], h = data.observer[2];
        var entityCList = [];
        //创建 面
        for (var i = 0; i < point.length; i++) {
          var hierarchy;
          if (i == (point.length - 1)) {
            hierarchy = new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArrayHeights(
              [
                lon, lat, h,
                point[i].x, point[i].y, 0,
                point[0].x, point[0].y, 0
              ]))
          } else {
            hierarchy = new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArrayHeights(
              [
                lon, lat, h,
                point[i].x, point[i].y, 0,
                point[i + 1].x, point[i + 1].y, 0
              ]))
          }

          var entityC = viewer.entities.add({
            name: "三角形",
            polygon: {
              hierarchy: hierarchy,
              outline: false,
              perPositionHeight: true,//允许三角形使用点的高度
              material: data.material
            }
          });
          entityCList.push(entityC);
        }

        return entityCList;
      }

      // 实时获取模型的经纬度。 回调函数
      function callbackFun() {
        // var center = Cesium.Cartesian3.fromDegrees(lons, lats, 0);//需要改实时获取的飞机坐标;//获取模型当前位置 //世界坐标（笛卡尔坐标）
        model = viewer.entities.getById(targetId);
        if (!model) {
          // 删除监听
          viewer.scene.postRender.removeEventListener(callbackFun);
          for (var h = 0; h < entityCList.length; h++) {
            viewer.entities.remove(entityCList[h]); //移除光束
          }
          return;
        }

        if (model.model && model.model.minimumPixelSize == 50) {
          // 删除监听
          viewer.scene.postRender.removeEventListener(callbackFun);
          for (var h = 0; h < entityCList.length; h++) {
            viewer.entities.remove(entityCList[h]); //移除光束
          }
        } else if (model.billboard && model.billboard.scale == 0.5) {
          for (var h = 0; h < entityCList.length; h++) {
            viewer.entities.remove(entityCList[h]); //移除光束
          }
          // 删除监听
          viewer.scene.postRender.removeEventListener(callbackFun);
        }

        // 目标被隐藏 时删掉光速
        if (!model.show || !plat.show) {
          for (var h = 0; h < entityCList.length; h++) {
            viewer.entities.remove(entityCList[h]); //移除光束
          }
          onoff = 0
        }



        if (onoff == 0) {
          if (model.show && plat.show) {
            for (var h = 0; h < entityCList.length; h++) {
              // entityCList[h].show = true;
              viewer.entities.add(entityCList[h]);
            }
            onoff = 1;
          }
        }
        var center = model.position.getValue(viewer.clock.currentTime);

        // console.log(center);

        if (center) {
          var ellipsoid = viewer.scene.globe.ellipsoid;
          var cartographic = ellipsoid.cartesianToCartographic(center);
          var lon = Cesium.Math.toDegrees(cartographic.longitude);
          var lat = Cesium.Math.toDegrees(cartographic.latitude);
          //var height=cartographic.height;
          //console.log(lon+";"+lat+";"+height);
          var X0 = lon - data.circle[1], Y0 = lat - data.circle[2]; //差值
          for (var i = 0; i < entityCList.length; i++) {
            if (i == (entityCList.length - 1)) {
              f(data, entityCList[i], [point[i].x, point[i].y, point[0].x, point[0].y], X0, Y0);
            } else {
              f(data, entityCList[i], [point[i].x, point[i].y, point[i + 1].x, point[i + 1].y], X0, Y0);
            }
          }
        } else {
          for (var h = 0; h < entityCList.length; h++) {

            viewer.entities.remove(entityCList[h]); //移除光束
          }
          onoff = 0;
        }
      }

    },

    // 测距---随鼠标显示信息
    /*
    @activeShapePoints 线数组
    @activeShape 线回调模型
    @floatingPoint 线起点
    @startPog 起点坐标
    @isConstant 回调参数
    @labels 显示测距文本
    */
    stadiometry() {
      let _this = this;
      let Cesium = _this.Cesium;
      var activeShapePoints = [];
      var activeShape;
      var floatingPoint;
      let startPog;
      var scratch = new Cesium.Cartographic();
      var geodesic = new Cesium.EllipsoidGeodesic();
      let isConstant = false;
      var labels;

      //创建点
      function createP(worldPosition) {
        var point = viewer.entities.add({
          position: worldPosition,
          point: {
            color: Cesium.Color.WHITE,
            pixelSize: 5,
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          },
        });
        return point;
      }

      //划线
      function drawShape(positionData) {
        var shape;

        shape = viewer.entities.add({
          polyline: {
            positions: positionData,
            clampToGround: true,
            width: 1,
          },
        });
        return shape;
      }


      // 动态获取距离
      function getLength(time, result) {
        // Get the end position from the polyLine's callback.
        let endPog = Cesium.Cartographic.fromCartesian(activeShapePoints[1]);
        geodesic.setEndPoints(startPog, endPog);
        var lengthInMeters = Math.round(geodesic.surfaceDistance);

        console.log('持续触发中')
        return (lengthInMeters / 1000).toFixed(1) + " km";
      }

      // 动态取中间值
      function getMidpoint(time, result) {
        // Get the end position from the polyLine's callback.

        let endPog = Cesium.Cartographic.fromCartesian(activeShapePoints[1]);

        geodesic.setEndPoints(startPog, endPog);
        var midpointCartographic = geodesic.interpolateUsingFraction(
          0.5,
          scratch
        );

        return Cesium.Cartesian3.fromRadians(
          midpointCartographic.longitude,
          midpointCartographic.latitude
        );
      }

      // 添加文本显示文字
      function addlabel() {
        var text;
        text = viewer.entities.add({
          // id: '距离文本',
          position: new Cesium.CallbackProperty(getMidpoint, isConstant),
          label: {
            // This callback updates the length to print each frame.
            text: new Cesium.CallbackProperty(getLength, isConstant),
            font: "20px sans-serif",
            pixelOffset: new Cesium.Cartesian2(0.0, 20),
          },
        });
        return text;
      }
      // 固定文本
      function bindlabel() {
        var text;
        text = viewer.entities.add({
          // id: '距离文本2',
          position: getMidpoint(),
          label: {
            // This callback updates the length to print each frame.
            text: getLength(),
            font: "20px sans-serif",
            pixelOffset: new Cesium.Cartesian2(0.0, 20),
          },
        });
        return text;
      }

      // 鼠标左键
      var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      handler.setInputAction(function (movement) {
        // var earthPosition = viewer.scene.pickPosition(movement.position);
        var earthPosition = viewer.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);

        if (Cesium.defined(earthPosition)) {
          if (activeShapePoints.length === 0) {  // 数组为0时，创建起点
            floatingPoint = createP(earthPosition);
            activeShapePoints.push(earthPosition);
            // 设置起始点
            startPog = Cesium.Cartographic.fromCartesian(activeShapePoints[0]);
            // 构建回调函数点
            var dynamicPositions = new Cesium.CallbackProperty(function () {

              return activeShapePoints;
            }, false);
            // 创建动态文本
            labels = addlabel();
            // 创建动态线条
            activeShape = drawShape(dynamicPositions);
          }

          // 点击固定文本
          if (activeShapePoints.length >= 2) {
            activeShapePoints.push(earthPosition);
            terminateShape();
          }
          activeShapePoints.push(earthPosition);

        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

      // 鼠标移动监听
      handler.setInputAction(function (event) {

        console.log(event.position);
        if (Cesium.defined(floatingPoint)) {
          // var newPosition = viewer.scene.pickPosition(event.endPosition);
          var newPosition = viewer.camera.pickEllipsoid(event.endPosition, viewer.scene.globe.ellipsoid);


          if (Cesium.defined(newPosition)) {

            floatingPoint.position.setValue(newPosition);
            activeShapePoints.pop();
            activeShapePoints.push(newPosition);

          }
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

      // Redraw the shape so it's not dynamic and remove the dynamic shape.
      function terminateShape() {
        viewer.entities.remove(floatingPoint);
        viewer.entities.remove(activeShape);
        viewer.entities.remove(labels);
        // viewer.entities.removeById('距离文本');

        labels = undefined;
        floatingPoint = undefined;
        activeShape = undefined;

        activeShape = drawShape(activeShapePoints);
        labels = bindlabel();
        _this.linesdata.push(activeShape)
        _this.linesdata.push(labels)
        activeShapePoints = [];
        handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
      }

      handler.setInputAction(function (event) {
        viewer.entities.remove(floatingPoint);
        viewer.entities.remove(activeShape);
        // viewer.entities.removeById('距离文本2');
        viewer.entities.remove(labels);
        handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        handler.destroy();

      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    },



    // 方案功能
    // 方案请求   //type:1:圆,2:多边形,3:环,4:跑道

    getAllPlan() {
      let url = gloabl.URL.testUrl + '/taskPlanPilot/findList';
      axios.get(url).then(res => {
        if (res.data.code === 200) {
          let message = res.data.data;
          for (var i = 0; i < message.length; i++) {
            let obj = message[i];
            if (obj.planId == 1) {
              let graphicsId = `_${obj.planId}${obj.graphicsId}`;
              let platId = `_${obj.planId}${obj.platId}`
              this.plan_list1.push(graphicsId);
              this.plan_list1.push(platId);
              this.choosePlanGraph(obj, obj.type);
              continue;
            }
            if (obj.planId == 2) {
              let graphicsId = `_${obj.planId}${obj.graphicsId}`;
              let platId = `_${obj.planId}${obj.platId}`
              this.plan_list2.push(graphicsId);
              this.plan_list2.push(platId);
              this.choosePlanGraph(obj, obj.type);
              continue;
            }
            if (obj.planId == 3) {
              let graphicsId = `_${obj.planId}${obj.graphicsId}`;
              let platId = `_${obj.planId}${obj.platId}`
              this.plan_list3.push(graphicsId);
              this.plan_list3.push(platId);
              this.choosePlanGraph(obj, obj.type);
              continue;
            }
          }
        }

        // 
      })
    },

    // 方案空基
    planAirModel(obj) {
      let Cesium = this.Cesium;
      var id, heads, colors, name, show;
      var text; // 空基名称
      let _top, _left; //文本偏移量
      _top = 40; // 默认定位航迹和融合目标
      _left = 0;

      let arr = [];
      let platTrace = obj.platTrace.split('|');

      for (var i = 0; i < platTrace.length; i++) {
        let x = Number(platTrace[i].split(',')[0]);
        let y = Number(platTrace[i].split(',')[1]);
        arr.push(x, y);
      }

      // 轨迹
      this.planTraceModel(obj, arr);

      let x = Number(arr[arr.length - 2]);  //经纬度
      let y = Number(arr[arr.length - 1]);

      show = false;
      id = `_${obj.planId}${obj.platId}`; //平台id
      heads = 60;  //平台航向
      name = "方案平台";
      colors = eval(`Cesium.Color.${obj.color}`);
      // 平台名称
      text = `${id} \n ${obj.platName}`;

      var url = "../../static/Cesium/models/CesiumAir/Cesium_Air.glb";
      var heading = Cesium.Math.toRadians(heads);

      var hpr = new Cesium.HeadingPitchRoll(heading, 0, 0);
      var positions = Cesium.Cartesian3.fromDegrees(x, y, 10);
      var orientation = Cesium.Transforms.headingPitchRollQuaternion(
        positions,
        hpr
      );
      viewer.entities.add({
        // name: url,
        show: show,
        id: id,
        name: name,
        position: positions,
        orientation: orientation,
        model: {
          uri: url,
          minimumPixelSize: 50,
          // maximumScale: 100000,
          color: colors,
          scale: 20
        },
        label: {
          text: text,
          font: "10pt Source Han Sans CN", //字体样式
          fillColor: colors, //字体颜色
          style: Cesium.LabelStyle.FILL, //label样式
          outlineWidth: 1,
          verticalOrigin: Cesium.VerticalOrigin.CENTER, //垂直位置
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER, //水平位置
          pixelOffset: new Cesium.Cartesian2(_left, _top) //偏移
        }
      })
    },

    // 方案海基
    planShipModel(obj) {
      var Cesium = this.Cesium;
      var x, y, id, colors, images, show;

      let arr = [];
      let platTrace = obj.platTrace.split('|');

      for (var i = 0; i < platTrace.length; i++) {
        let x = Number(platTrace[i].split(',')[0]);
        let y = Number(platTrace[i].split(',')[1]);
        arr.push(x, y);
      }
      // 轨迹
      this.planTraceModel(obj, arr);


      let _top, _left; //文本偏移量
      _top = 35; // 默认定位航迹和融合目标
      _left = 0;

      x = Number(arr[arr.length - 2]);  //经纬度
      y = Number(arr[arr.length - 1]);

      let text; // 海基名称
      show = false;  // 默认显示
      id = `_${obj.planId}${obj.platId}`; // 平台id
      // 平台名称
      text = `${id} \n ${obj.platName}`;
      name = "方案平台";
      images = require("../assets/cesiumImages/target.png");
      colors = eval(`Cesium.Color.${obj.color}.withAlpha(1)`);
      viewer.entities.add({
        show: show,
        id: id,
        name: name,
        position: Cesium.Cartesian3.fromDegrees(x, y, 10),
        billboard: {
          image: images,
          scale: 0.5,
          color: colors,
        },
        label: {
          text: text,
          font: "10pt Source Han Sans CN", //字体样式
          fillColor: colors, //字体颜色
          style: Cesium.LabelStyle.FILL, //label样式
          outlineWidth: 1,
          verticalOrigin: Cesium.VerticalOrigin.CENTER, //垂直位置
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER, //水平位置
          pixelOffset: new Cesium.Cartesian2(_left, _top) //偏移
        }
      })
    },

    //方案 陆基
    planRoadModel(obj) {
      var Cesium = this.Cesium;
      var x, y, id;
      id = `_${obj.planId}${obj.platId}`; // 平台id    
      let text = `${id} \n ${obj.platName}`;//平台名称
      x = Number(obj.half.split(',')[0]);
      y = Number(obj.half.split(',')[1]);

      let color = eval(`Cesium.Color.${gloabl.URL.targetColor}.withAlpha(1)`);

      name = "方案平台";
      viewer.entities.add({
        show: false,
        id: id,
        name: name,
        position: Cesium.Cartesian3.fromDegrees(x, y, 10),
        billboard: {
          image: require("../assets/cesiumImages/talou.png"),
          scale: 0.5,
          color: color
        },
        label: {
          text: text,
          font: "10pt Source Han Sans CN", //字体样式
          fillColor: eval(`Cesium.Color.${gloabl.URL.targetColor}`), //字体颜色
          // backgroundColor: Cesium.Color.AQUA, //背景颜色
          //showBackground:true,                //是否显示背景颜色
          style: Cesium.LabelStyle.FILL, //label样式
          outlineWidth: 1,
          verticalOrigin: Cesium.VerticalOrigin.CENTER, //垂直位置
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER, //水平位置
          pixelOffset: new Cesium.Cartesian2(0, 35) //偏移
        }
      });
    },

    planSkyModel(obj) {
      var Cesium = this.Cesium;
      var x, y, id;

      let arr = [];
      let platTrace = obj.platTrace.split('|');

      for (var i = 0; i < platTrace.length; i++) {
        let x = Number(platTrace[i].split(',')[0]);
        let y = Number(platTrace[i].split(',')[1]);
        arr.push(x, y);
      }
      // 轨迹
      this.planTraceModel(obj, arr);

      id = `_${obj.planId}${obj.platId}`; // 平台id    

      let text = `${id} \n ${obj.platName}`;//平台名称

      x = Number(arr[arr.length - 2]);  //经纬度
      y = Number(arr[arr.length - 1]);
      name = "方案平台";


      viewer.entities.add({
        show: false,
        id: id,
        name: name,
        position: Cesium.Cartesian3.fromDegrees(x, y, 10),
        billboard: {
          image: require("../assets/cesiumImages/weixin.png"),
          scale: 0.5,
          color: Cesium.Color.WHITE.withAlpha(1)
        },
        label: {
          text: text,
          font: "10pt Source Han Sans CN", //字体样式
          fillColor: eval(`Cesium.Color.${obj.color}`), //字体颜色
          style: Cesium.LabelStyle.FILL, //label样式
          outlineWidth: 1,
          verticalOrigin: Cesium.VerticalOrigin.CENTER, //垂直位置
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER, //水平位置
          pixelOffset: new Cesium.Cartesian2(0, 20) //偏移
        }
      });
    },

    // 方案轨迹
    planTraceModel(obj, arr) {
      var Cesium = this.Cesium;
      let traceId = `_${obj.planId}${obj.graphicsId}t`;
      let show = false;
      var colorer = eval(`Cesium.Color.${obj.color}.withAlpha(1)`);

      viewer.entities.add({
        show: show, //新增
        id: traceId,
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArray(arr),
          width: 2,
          followSurface: false, //取消弯曲
          material: colorer,
          clampToGround: true
        }
      });
    },

    // 方案模型渲染
    choosePlanMode(obj, type) {
      switch (type) {
        case '空基': this.planAirModel(obj); break;
        case '海基': this.planShipModel(obj); break;
        case '陆基': this.planRoadModel(obj); break;
        case '天基': this.planSkyModel(obj); break;

      }
    },

    // 方案图形渲染
    choosePlanGraph(obj, num) {

      switch (num) {
        case 1: this.planCircleRange(obj); break;
        case 2: this.planPolygon(obj); break;
        case 3: this.planDoubleCircle(obj); break;
        case 4: this.planCorridor(obj); break;
      }
    },

    // 圆
    planCircleRange(obj) {

      let Cesium = this.Cesium;
      let id = `_${obj.planId}${obj.graphicsId}`;

      let x = Number(obj.half.split(',')[0]);
      let y = Number(obj.half.split(',')[1]);
      let radius = obj.radius1;
      let show;

      show = false;
      let _outcolor = eval(`Cesium.Color.${obj.color}.withAlpha(1)`);
      let areaColor = eval(`Cesium.Color.${obj.color}.withAlpha(0.03)`);

      viewer.entities.add({
        description: "circle",
        name: '方案圆',
        id: id,
        show: show,
        position: Cesium.Cartesian3.fromDegrees(x, y, 0),
        // rotation: Cesium.Math.toRadians(EllipseAngle),
        ellipse: {
          semiMinorAxis: radius,
          semiMajorAxis: radius,
          height: 1,
          outline: true,
          outlineWidth: 1,
          outlineColor: _outcolor,
          material: areaColor,
        }
      });

      // 建立模型
      this.choosePlanMode(obj, obj.platType);

    },

    //同心圆
    planDoubleCircle(obj) {
      let Cesium = this.Cesium;
      let id = `_${obj.planId}${obj.graphicsId}`;
      let ids = `_${obj.planId}${obj.graphicsId}s`;
      let show = false;

      let x = Number(obj.half.split(',')[0]), y = Number(obj.half.split(',')[1]);
      let radius1 = obj.radius1;
      let radius2 = obj.radius2;
      let position = Cesium.Cartesian3.fromDegrees(x, y, 0);
      let _outcolor = eval(`Cesium.Color.${obj.color}.withAlpha(1)`);
      let areaColor = eval(`Cesium.Color.${obj.color}.withAlpha(0.03)`);
      viewer.entities.add({
        description: "circle1",
        name: '方案圆1',
        id: id,
        show: show,
        position: position,
        ellipse: {
          semiMinorAxis: radius1,
          semiMajorAxis: radius1,
          height: 1,
          outline: true,
          outlineWidth: 1,
          outlineColor: _outcolor,
          material: new Cesium.Color(0.1333, 0.1647, 0.3254, 0.3),//地图颜色
        }
      });

      viewer.entities.add({
        description: "circle2",
        name: '方案圆2',
        id: ids,
        show: show,
        position: position,
        ellipse: {
          semiMinorAxis: radius2,
          semiMajorAxis: radius2,
          height: 1,
          outline: true,
          outlineWidth: 1,
          outlineColor: _outcolor,
          material: areaColor
        }
      });
      // 建立模型
      this.choosePlanMode(obj, obj.platType);
    },

    // 多边形
    planPolygon(obj) {
      let Cesium = this.Cesium;
      let id = `_${obj.planId}${obj.graphicsId}`;
      let arr = [];
      let half = obj.half.split('|');
      let show = false;

      for (var i = 0; i < half.length; i++) {
        let x = Number(half[i].split(',')[0]);
        let y = Number(half[i].split(',')[1]);
        arr.push(x, y);
      }

      let _color = eval(`Cesium.Color.${obj.color}.withAlpha(0)`);
      let lineColor = eval(`Cesium.Color.${obj.color}.withAlpha(1)`);
      viewer.entities.add({
        name: '方案多边形',
        id: id,
        show: show,
        polygon: {
          hierarchy: Cesium.Cartesian3.fromDegreesArray(arr),
          outline: true,
          outlineWidth: 10,
          outlineColor: lineColor,
          perPositionHeight: true,
          material: _color,
        }
      });

    },

    // 拐点圆柱
    planCorridor(obj) {
      let Cesium = this.Cesium;
      let id = `_${obj.planId}${obj.graphicsId}`;

      let arr = [];
      let show = false;
      let half = obj.half.split('|');
      for (var i = 0; i < half.length; i++) {
        let x = Number(half[i].split(',')[0]);
        let y = Number(half[i].split(',')[1]);
        arr.push(x, y);
      }
      let _color = eval(`Cesium.Color.${obj.color}.withAlpha(0.4)`);

      let positions = Cesium.Cartesian3.fromDegreesArray(arr);
      viewer.entities.add({
        id: id,
        name: '轨迹圆柱',
        show: show,
        corridor: {
          positions: positions,
          width: obj.radius1,
          material: _color,
          height: 1,
        }
      });
      // 建立模型
      this.choosePlanMode(obj, obj.platType);
    },


    //bar界面点击交互高亮显示
    barHightLight(item) {
      // console.log(item);
      let Cesium = this.Cesium;

      // 经纬度转为笛卡尔坐标
      let position = Cesium.Cartesian3.fromDegrees(Number(item.Lon), Number(item.Lat), 0);

      // 笛卡尔坐标转换成屏幕坐标
      let windowPos = Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, position);
      let movement = { position: windowPos };
      this.globalInteraction(movement, item.FusionID);

      //相机聚焦模型
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
          Number(item.Lon),
          Number(item.Lat),
          1000000.0
        ),
        orientation: {
          pitch: Cesium.Math.toRadians(-90), // default value (looking down)  //俯视仰视视觉
          roll: 0.0 // default value
        }
      });

    },

  },
  directives: {
    drag(el) {
      let drag;
      el.onmousedown = e => {
        // 判断左键
        if (e.button == 0) {
          let left, top, parentHei, parentWid;

          // 计算鼠标相对元素的偏移量
          let X = e.clientX - el.offsetLeft;
          let Y = e.clientY - el.offsetTop;


          var Root = document.getElementById(el.id);

          // 元素的父节点的宽高获取
          parentWid = Root.parentNode.clientWidth;
          parentHei = Root.parentNode.clientHeight || Root.parentNode.parentNode.clientHeight;

          el.onmousemove = e => {

            left = e.clientX - X;
            top = e.clientY - Y;

            // 元素边界控制
            left = Math.min(left, parentWid - el.offsetWidth);
            left = Math.max(0, left);

            top = Math.min(top, parentHei - el.offsetHeight);
            top = Math.max(0, top);

            // 设置元素位置
            el.style.left = `${left}px`;
            el.style.top = `${top}px`;
          }
          el.onmouseup = e => {
            // 设置元素位置
            el.style.left = `${left}px`;
            el.style.top = `${top}px`;

            el.onmousemove = null;
            el.onmouseup = null;
          }
        }
      }
    }
  },

  /**
   * 数据数组监听 当数组增加减少的时候
   */
  watch: {
    // 原始目标控制
    // swtichtag12(val) {
    //   // 动态禁用定位航迹误差椭圆
    //   document.getElementsByName("location")[0].disabled = !val;
    //   document.getElementsByName("location2")[0].disabled = !val;
    //   // document.getElementsByName("location3")[0].disabled = !val;
    // },
    // 鼠标拖动的div位置控制
    leftChange(val) {
      var targetList = document.getElementById('targetList');
      var relevance = document.getElementById('relevance');

      if (targetList.style.left) {
        let leftval = targetList.style.left.split('px');
        var newVal = val * Number(leftval[0]);
        let newLeft = val < 1 ? newVal - 75 : newVal + 75;
        targetList.style.left = newLeft > 0 ? `${newLeft}px` : `0px`;
      }
      if (relevance.style.left) {
        let leftval2 = relevance.style.left.split('px');
        var newVal2 = val * Number(leftval2[0]);
        let newLeft2 = val < 1 ? newVal2 - 100 : newVal2 + 100;
        relevance.style.left = newLeft2 > 0 ? `${newLeft2}px` : `0px`;
      }
    },
    // 敌方轨迹
    tracetag2(val) {
      // if (!val) {
      //   for (var i = 0; i < this.trackObj; i++) {
      //     if (this.trackObj[i]) {
      //       this.trackObj[i].forEach((item, index) => {
      //         var pathentity = viewer.entities.getById(item);
      //         if (pathentity) viewer.entities.remove(pathentity);
      //       })
      //     }
      //   }
      // }
    }


  },
  computed: {

  }
};
</script>

<style scoped>
p,
ul,
li,
div,
a,
span,
h1,
h2,
h3,
h4,
h5,
input {
  margin: 0px;
  padding: 0px;
}

.container {
  width: 100%;
}

html,
body,
#cesiumContainer {
  width: 100%;
  height: 100%;
  position: absolute;
  margin: 0;
  padding: 0;
  overflow: hidden;
  list-style: none;
}

.cesium-widget-credits {
  display: none !important;
  visibility: hidden !important;
}

.repeatTime input {
  padding: 3px;
  margin: 5px;
}

#repeatStart,
#repeatEnd {
  display: none;
}

/* 工具栏 */
.toolBar {
  color: white;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
}

.toolBar span {
}

.toolType {
  border: 1px solid #bcbecc;
  margin-left: 10px;
  margin-top: 5px;
  padding: 5px;
}

.hiddenText {
  display: inline-block;
  float: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 预警栏目 */
#AlertMessage {
  position: absolute;
  width: 330px;
  /* height:100px; */
  top: 100px;
  left: 25px;
  z-index: 1000;
  padding: 15px;
  overflow: hidden;
  height: 325px;
}

.labelshow {
  position: absolute;
  bottom: 150px;
  z-index: 100;
  /* background-color: rgba(0, 0, 0, 0.3); */
  width: 230px;
  text-align: left;
  padding: 5px;
  color: white;
}

.showtime {
  list-style: none;
  padding: 0;
  position: relative;
  /* display: flex;
  justify-content: center;
  align-items: center; */
}

/* 阻尼里面的滚动 */
.showtime1 {
  list-style: none;
  margin: 0;
  padding: 0;
  transition: all 0.5s ease;
  height: 100%;
  overflow: auto;
  position: relative;
}

.AlertMess {
  position: relative;
}

.limess {
  /* display: none; */
  transition: all 0.5s ease;
  padding: 5px;
  margin-bottom: 15px;
  position: relative;
  background-color: #020317;
  box-shadow: 0px 0px 10px #ce6d45;
  text-align: center;
  color: white;
  font-size: 8px;
  letter-spacing: 1px;
  line-height: 24px;
  height: 150px;
  border-radius: 10px;
}
/* .limess div,
.limess p,
.limess span:nth-of-type(1) {
  padding: 5px;
} */

.limess p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.twos {
  position: absolute;
  right: 10px;
  color: red;
}

.showtime .titleId {
  float: left;
  padding-left: 10px;
}

.animations {
  margin-top: -175px;
  transition: all 0.5s ease;
}

/* 平台信息显示 */
.common {
  /* background-color: #bf7979; */
  color: #ffffff;
  box-shadow: 0px 0px 5px #cfb5b5;
  text-align: center;
  position: absolute;
  /* top: 278px; */
  top: 25%;
  left: 75%;
  /* right: 30px; */
  width: 350px;
  z-index: 1001;
  cursor: move;
  transition: 0.2s all;
}
.common ul {
  list-style: none;
}
.common li {
  border: 1px solid #7e7e7e;
  /* box-shadow: 0px 0px 8px 5px #959595; */
}
.common li div {
  background: linear-gradient(90deg, #525252, transparent);
}
.common p {
  border-bottom: 1px solid #7e7e7e;
  display: flex;
}

.common span {
  display: table-cell;
  padding: 5px;
  /* width: 80px; */
}
.common span:nth-child(2n + 1) {
  /* background: #222a53; */
  /* width: 95px; */
  display: block;
  width: 35%;
  /* border-left: 1px solid white; */
}

.common span:nth-child(2n) {
  /* text-align: center;
  width: 200px;
  border-right: 1px solid white; */

  text-align: center;
  /* background: #1b1b39; */
  width: 65%;
  display: block;
}

.common .details {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 4px;
}

.common .details span {
  width: 35%;
  background: rgba(147, 149, 158, 0.5);
  border: none;
  cursor: pointer;
}

.common .editBtn {
  padding: 10px 4px;
}
.common .editBtn span {
  width: 27.33%;
  margin: auto;
  display: inline-block;
  border: none;
  background: rgba(147, 149, 158, 0.5);
  cursor: pointer;
}

/* 目标识别详情及关联详情 */
.common .Detail {
  width: 345px;
}
.common .Detail span {
  width: 305px;
  font-size: 13px;
  border: none;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

#targetDetails {
  z-index: 1000;
  position: absolute;
  top: 10%;
  width: 300px;
  height: 30%;
  background-color: rgba(25, 28, 37, 0.8);
  color: white;
}
#targetDetails h3 {
  padding: 5px;
}
#targetDetails p {
  width: 80%;
  margin: auto;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  box-sizing: border-box;
  overflow: hidden;
  background-color: rgba(181, 191, 209, 0.2);
  margin-top: 5px;
  /* border: 1px solid #9c9c9c; */
}
#targetDetails p span {
  width: 50%;
  padding: 5px;
  margin-top: 3px;
  display: inline-block;
  /* float: left; */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

#targetDetails p span:nth-of-type(odd) {
  text-align: right;
  /* background: #222a53; */
}

#targetDetails p span:nth-of-type(even) {
  text-align: left;
  /* background: #1b1b39; */
}

#poup,
.connection,
.poupSuccess {
  z-index: 1000;
  position: absolute;
  top: 40%;
  left: 40%;
  /* transform: translate(-50%,-50%); */
  width: 20%;
  height: 20%;
}

.poupCommon ul {
  padding: 10px;
  height: auto;
  background-color: #757782;
}
.poupCommon p {
  margin-bottom: 10px;
  display: flex;
  position: relative;
}
.poupCommon p:last-child {
  justify-content: center;
  align-items: center;
}
.poupCommon span {
  /* float: left; */
  display: inline-block;
  width: 20%;
  line-height: 24px;
}
.poupCommon input[type="text"] {
  width: 70%;
  height: 20px;
  padding-left: 5px;
  border-width: 2px;
  border-style: inset;
  border-color: initial;
  border-image: initial;
  background-color: rgb(76, 75, 77);
  color: #ffffff;
}

#targetChoose {
  /* border: 1px solid #5268af; */
  background-color: rgba(199, 199, 199, 0.1);
  padding-left: 2px;
  color: #ffffff;
  width: 40%;
  position: absolute;
  left: 20%;
  padding: 3px 2px;
  z-index: 10;
}

#targetChoose option {
  background-color: rgb(143, 140, 140);
  padding: 3px 5px;
}

.poupBtn span {
  cursor: pointer;
  /* background-color: rgba(240, 234, 234, 0.1); */
}

input[type="button"] {
  padding: 5px;
}

.connection {
  color: white;
  padding: 10px;
  width: 530px;
  height: 150px;
  background-color: rgba(25, 28, 37, 0.8);
  cursor: move;
}

.connection span {
  display: inline-block;
  width: 28%;
  height: 26px;
  border: 1px solid #5268af;
  background-color: rgba(240, 234, 234, 0.1);
  text-align: center;
  line-height: 26px;
  color: #ffffff;
  margin-left: 16%;
  float: left;
  margin-top: 15px;
  cursor: pointer;
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 4px;
  /* height: 110px; */
  background-color: #f5f5f5;
}

::-webkit-scrollbar-track {
  background: rgb(122, 122, 122);
  border-radius: 2px;
}

::-webkit-scrollbar-thumb {
  background: #bfbfbf;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #f8f8f8;
}

::-webkit-scrollbar-corner {
  background: #434b43;
}

/* 弹窗操作成功 */
.poupSuccess {
  background: #222a53;
  font-weight: bold;
  color: white;
  box-shadow: 0px 0px 15px #eeefee inset;
  height: 10%;
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
