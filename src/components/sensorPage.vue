<template>
  <div class="sensorPart">
    <!--提醒弹窗  -->
    <div id="paintBox" ref="paintBox"></div>
    <!-- ------------------新增------------ -->
    <div class="increase" ref="increaseBox">
      <p class="increase-title">新增</p>
      <p class="weapon">
        <span>传感器名称 :</span> &nbsp;
        <input type v-model="insensorName" />
      </p>
      <!-- <p class="weapon">
        <span>传感器ID :</span> &nbsp;
        <input type v-model="insensorId"  />
      </p>-->
      <p class="weapon">
        <span>传感器类型 :</span> &nbsp;
        <input type v-model="insensorType" />
      </p>
      <p class="weapon">
        <span>平台名称 :</span> &nbsp;
        <input type v-model="inplatName" />
      </p>
      <p class="weapon">
        <span>平台ID :</span> &nbsp;
        <input type v-model="inplatId" />
      </p>
      <p class="weapon">
        <span>平台类型 :</span> &nbsp;
        <input type v-model="inplatType" />
      </p>
      <p class="weapon">
        <span>定位能力 :</span> &nbsp;
        <input type v-model="inposFlag" />
      </p>
      <p class="weapon">
        <span>测向能力 :</span> &nbsp;
        <input type v-model="indoaFlag" />
      </p>
      <p class="weapon">
        <span>时差定位能力 :</span> &nbsp;
        <input type v-model="intdFlag" />
      </p>
      <p class="weapon">
        <span>测速能力 :</span> &nbsp;
        <input type v-model="invelFlag" />
      </p>
      <p class="weapon">
        <span>侧向误差 :</span> &nbsp;
        <input type v-model="inpa" />
      </p>
      <p class="weapon">
        <span>测距误差 :</span> &nbsp;
        <input type v-model="inpd" />
      </p>
      <p class="weapon">
        <span>测速误差 :</span> &nbsp;
        <input type v-model="inpv" />
      </p>
      <p class="weapon">
        <span>时差误差 :</span> &nbsp;
        <input type v-model="inptd" />
      </p>
      <p class="weapon">
        <span>定位误差协方差矩阵Pxx :</span> &nbsp;
        <input type v-model="inpxx" />
      </p>
      <p class="weapon">
        <span>定位误差协方差矩阵Pyy :</span> &nbsp;
        <input type v-model="inpyy" />
      </p>
      <p class="weapon">
        <span>定位误差协方差矩阵Pxy :</span> &nbsp;
        <input type v-model="inpxy" />
      </p>
      <p class="weapon">
        <span>侦察起始频率 :</span> &nbsp;
        <input type v-model="infreqBegin" />
      </p>
      <p class="weapon">
        <span>侦察截止频率 :</span> &nbsp;
        <input type v-model="infreqEnd" />
      </p>
      <p class="weapon">
        <span>主视场方位中心 :</span> &nbsp;
        <input type v-model="inprimaryFOVCenter" />
      </p>
      <p class="weapon">
        <span>主视场方位宽度 :</span> &nbsp;
        <input type v-model="inprimaryFOVWidth" />
      </p>
      <p class="weapon">
        <span>第二视场方位中心 :</span> &nbsp;
        <input type v-model="insencendanryFOVCenter" />
      </p>
      <p class="weapon">
        <span>第二视场方位宽度 :</span> &nbsp;
        <input type v-model="insencendanryFOVWidth" />
      </p>
      <p class="weapon">
        <span>主视场俯仰最小值 :</span> &nbsp;
        <input type v-model="inprimaryFOVElevationMin" />
      </p>
      <p class="weapon">
        <span>主视场俯仰最大值 :</span> &nbsp;
        <input type v-model="inprimaryFOVElevationMax" />
      </p>
      <p class="weapon">
        <span>最大速度 :</span> &nbsp;
        <input type v-model="invelMax" />
      </p>
      <p class="weapon">
        <span>最大高度 :</span> &nbsp;
        <input type v-model="inheiMaxl" />
      </p>
      <p class="weapon">
        <span>探测/侦察最近距离 :</span> &nbsp;
        <input type v-model="indisMin" />
      </p>
      <p class="weapon">
        <span>探测/侦察最远距离 :</span> &nbsp;
        <input type v-model="indisMax" />
      </p>
      <p class="weapon">
        <span>平台经度 :</span> &nbsp;
        <input type v-model="inlon" />
      </p>
      <p class="weapon">
        <span>平台纬度 :</span> &nbsp;
        <input type v-model="inlat" />
      </p>
      <p class="weapon">
        <span>平台高度 :</span> &nbsp;
        <input type v-model="inhei" />
      </p>
      <p class="bottom">
        <span @click="inSure" class="inSure">确认</span>
        <span @click="inCancel" class="inCancel">取消</span>
      </p>
    </div>
    <!-- ------------------修改------------ -->
    <div class="edit" ref="editBox">
      <p class="edit-title">修改</p>
      <!-- <p class="weapon">
        <span>传感器序号 :</span> &nbsp;
        <input type v-model="rowid" onfocus="this.blur()" />
      </p>-->
      <p class="weapon">
        <span>传感器名称 :</span> &nbsp;
        <input type v-model="edsensorName" />
      </p>
      <p class="weapon">
        <span>传感器ID :</span> &nbsp;
        <input type v-model="edsensorId" onfocus="this.blur()" />
      </p>
      <p class="weapon">
        <span>传感器类型 :</span> &nbsp;
        <input type v-model="edsensorType" />
      </p>
      <p class="weapon">
        <span>平台名称 :</span> &nbsp;
        <input type v-model="edplatName" />
      </p>
      <p class="weapon">
        <span>平台ID :</span> &nbsp;
        <input type v-model="edplatId" />
      </p>
      <p class="weapon">
        <span>平台类型 :</span> &nbsp;
        <input type v-model="edplatType" />
      </p>
      <p class="weapon">
        <span>定位能力 :</span> &nbsp;
        <input type v-model="edposFlag" />
      </p>
      <p class="weapon">
        <span>测向能力 :</span> &nbsp;
        <input type v-model="eddoaFlag" />
      </p>
      <p class="weapon">
        <span>时差定位能力 :</span> &nbsp;
        <input type v-model="edtdFlag" />
      </p>
      <p class="weapon">
        <span>测速能力 :</span> &nbsp;
        <input type v-model="edvelFlag" />
      </p>
      <p class="weapon">
        <span>侧向误差 :</span> &nbsp;
        <input type v-model="edpa" />
      </p>
      <p class="weapon">
        <span>测距误差 :</span> &nbsp;
        <input type v-model="edpd" />
      </p>
      <p class="weapon">
        <span>测速误差 :</span> &nbsp;
        <input type v-model="edpv" />
      </p>
      <p class="weapon">
        <span>时差误差 :</span> &nbsp;
        <input type v-model="edptd" />
      </p>
      <p class="weapon">
        <span>定位误差协方差矩阵Pxx :</span> &nbsp;
        <input type v-model="edpxx" />
      </p>
      <p class="weapon">
        <span>定位误差协方差矩阵Pyy :</span> &nbsp;
        <input type v-model="edpyy" />
      </p>
      <p class="weapon">
        <span>定位误差协方差矩阵Pxy :</span> &nbsp;
        <input type v-model="edpxy" />
      </p>
      <p class="weapon">
        <span>侦察起始频率 :</span> &nbsp;
        <input type v-model="edfreqBegin" />
      </p>
      <p class="weapon">
        <span>侦察截止频率 :</span> &nbsp;
        <input type v-model="edfreqEnd" />
      </p>
      <p class="weapon">
        <span>主视场方位中心 :</span> &nbsp;
        <input type v-model="edprimaryFOVCenter" />
      </p>
      <p class="weapon">
        <span>主视场方位宽度 :</span> &nbsp;
        <input type v-model="edprimaryFOVWidth" />
      </p>
      <p class="weapon">
        <span>第二视场方位中心 :</span> &nbsp;
        <input type v-model="edsencendanryFOVCenter" />
      </p>
      <p class="weapon">
        <span>第二视场方位宽度 :</span> &nbsp;
        <input type v-model="edsencendanryFOVWidth" />
      </p>
      <p class="weapon">
        <span>主视场俯仰最小值 :</span> &nbsp;
        <input type v-model="edprimaryFOVElevationMin" />
      </p>
      <p class="weapon">
        <span>主视场俯仰最大值 :</span> &nbsp;
        <input type v-model="edprimaryFOVElevationMax" />
      </p>
      <p class="weapon">
        <span>最大速度 :</span> &nbsp;
        <input type v-model="edvelMax" />
      </p>
      <p class="weapon">
        <span>最大高度 :</span> &nbsp;
        <input type v-model="edheiMaxl" />
      </p>
      <p class="weapon">
        <span>探测/侦察最近距离 :</span> &nbsp;
        <input type v-model="eddisMin" />
      </p>
      <p class="weapon">
        <span>探测/侦察最远距离 :</span> &nbsp;
        <input type v-model="eddisMax" />
      </p>
      <p class="weapon">
        <span>平台经度 :</span> &nbsp;
        <input type v-model="edlon" />
      </p>
      <p class="weapon">
        <span>平台纬度 :</span> &nbsp;
        <input type v-model="edlat" />
      </p>
      <p class="weapon">
        <span>平台高度 :</span> &nbsp;
        <input type v-model="edhei" />
      </p>
      <p class="bottom">
        <span @click="edSure" class="edSure">确认</span>
        <span @click="edCancel" class="edCancel">取消</span>
      </p>
    </div>
    <div class="tableSearch">
      <div class="sensorBack backTablePage" @click="boxShow">新增</div>
    </div>
    <div class="sensorPartOne">
      <p class="targetTitle">侦察平台</p>
      <div class="sensorFirstBox">
        <table class="allSensorBox">
          <thead>
            <tr>
              <th>序号</th>
              <th>传感器名称</th>
              <th>传感器ID</th>
              <th>传感器类型</th>
              <th>平台名称</th>
              <th>平台ID</th>
              <th>平台类型</th>
              <th>定位能力</th>
              <th>侧向能力</th>
              <th>时差定位能力</th>
              <th>测速能力</th>
              <th>测向误差</th>
              <th>测距误差</th>
              <th>测速误差</th>
              <th>时差误差</th>
              <th>定位误差协方差矩阵Pxx</th>
              <th>定位误差协方差矩阵Pyy</th>
              <th>定位误差协方差矩阵Pxy</th>
              <th>侦查起始频率</th>
              <th>侦查截止频率</th>
              <th>主现场方位中心</th>
              <th>主现场方位宽度</th>
              <th>第二现场方位中心</th>
              <th>第二现场方位宽度</th>
              <th>主视场俯仰最小值</th>
              <th>主视场俯仰最大值</th>
              <th>最大速度</th>
              <th>最大高度</th>
              <th>探测/侦察最远距离</th>
              <th>探测/侦察最近距离</th>
              <th>平台经度</th>
              <th>平台纬度</th>
              <th>平台高度</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody id="sensorTbodyOne">
            <tr
              v-for="(item , index ) in sensorData"
              :key="index"
              :class="[item.platId]"
              :id="num== index ? 'tbodyClickTwo' :''"
              @dblclick="getDatail(item,index)"
            >
              <td>{{item.rowid}}</td>
              <td>{{item.SensorName}}</td>
              <td>{{item.SensorId}}</td>
              <td>{{item.SensorType}}</td>
              <td>{{item.PlatName}}</td>
              <td>{{item.PlatId}}</td>
              <td>{{item.PlatType}}</td>
              <td>{{item.POSFlag}}</td>
              <td>{{item.DOAFlag}}</td>
              <td>{{item.TDFlag}}</td>
              <td>{{item.VELFlag}}</td>
              <td>{{item.Pa}}</td>
              <td>{{item.Pd}}</td>
              <td>{{item.Pv}}</td>
              <td>{{item.Ptd}}</td>
              <td>{{item.Pxx}}</td>
              <td>{{item.Pyy}}</td>
              <td>{{item.Pxy}}</td>
              <td>{{item.FreqBegin}}</td>
              <td>{{item.FreqEnd}}</td>
              <td>{{item.PrimaryFOVCenter}}</td>
              <td>{{item.PrimaryFOVWidth}}</td>
              <td>{{item.SencendanryFOVCenter}}</td>
              <td>{{item.SencendanryFOVWidth}}</td>
              <td>{{item.PrimaryFOVElevationMin}}</td>
              <td>{{item.PrimaryFOVElevationMax}}</td>
              <td>{{item.VelMax}}</td>
              <td>{{item.HeiMax}}</td>
              <td>{{item.DisMin}}</td>
              <td>{{item.DisMax}}</td>
              <td>{{item.Lon}}</td>
              <td>{{item.Lat}}</td>
              <td>{{item.Hei}}</td>
              <td>
                <span id="editSensor" @click="editTarget(item,index)">编辑</span>
                <span id="deleteSensor" @click="deleteTarget(item,index)">删除</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="sensorPartTwo">
      <p class="targetTitle">航空航天侦察</p>
      <div class="sensorSecondBox">
        <table class="sensorDetailFirst">
          <thead>
            <tr>
              <th>装备编号</th>
              <th>装备名称</th>
              <th>装备类型</th>
              <th>成像分辨率</th>
              <th>侦察频段</th>
              <th>工作模式</th>
              <th>部署平台</th>
              <th>类型</th>
              <th>军种兵</th>
              <th>CEP</th>
              <th>误差椭圆长半轴</th>
              <th>误差椭圆短半轴</th>
              <th>误差椭圆方向</th>
            </tr>
          </thead>
          <tbody id="sensorTbodyTwo">
            <tr v-for="(item , index ) in airData" :key="index" :class="[item.platid]">
              <td>{{item.sensorId}}</td>
              <td>{{item.sensorName}}</td>
              <td>{{item.sensorType}}</td>
              <td>{{item.imgResolutionRatio}}</td>
              <td>{{item.investigationBand}}</td>
              <td>{{item.workMode}}</td>
              <td>{{item.deploymentPlat}}</td>
              <td>{{item.type}}</td>
              <td>{{item.armyType}}</td>
              <td>{{item.cep}}</td>
              <td>{{item.halfLongAxis}}</td>
              <td>{{item.halfShortAxis}}</td>
              <td>{{item.ellipseAngle}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="sensorPartThree">
      <p class="targetTitle">技术侦察</p>
      <div class="sensorThirdBox">
        <table class="sensorDetailSecond">
          <thead>
            <tr>
              <th>装备编号</th>
              <th>装备名称</th>
              <th>装备类型</th>
              <th>最小探测距离</th>
              <th>最大探测距离</th>
              <th>频段</th>
              <th>带宽</th>
              <th>部署平台</th>
              <th>类型</th>
              <th>军兵种</th>
              <th>CEP</th>
              <th>误差椭圆长半轴</th>
              <th>误差椭圆短半轴</th>
              <th>误差椭圆方向</th>
            </tr>
          </thead>
          <tbody id="sensorTbodyThree">
            <tr v-for="(item , index ) in technologyData" :key="index" :class="[item.platid]">
              <td>{{item.sensorId}}</td>
              <td>{{item.sensorName}}</td>
              <td>{{item.sensorType}}</td>
              <td>{{item.minDis}}</td>
              <td>{{item.maxDis}}</td>
              <td>{{item.band}}</td>
              <td>{{item.bandWidth}}</td>
              <td>{{item.deploymentPlat}}</td>
              <td>{{item.type}}</td>
              <td>{{item.armyType}}</td>
              <td>{{item.cep}}</td>
              <td>{{item.halfLongAxis}}</td>
              <td>{{item.halfShortAxis}}</td>
              <td>{{item.ellipseAngle}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="sensorPartFour">
      <p class="targetTitle">电子对抗侦察</p>
      <div class="sensorFouthBox">
        <table class="sensorDetailThird">
          <thead>
            <tr>
              <th>装备编号</th>
              <th>装备名称</th>
              <th>装备类型</th>
              <th>最小探测距离</th>
              <th>最大探测距离</th>
              <th>频段</th>
              <th>带宽</th>
              <th>部署平台</th>
              <th>类型</th>
              <th>军兵种</th>
              <th>CEP</th>
              <th>误差椭圆长半轴</th>
              <th>误差椭圆短半轴</th>
              <th>误差椭圆方向</th>
            </tr>
          </thead>
          <tbody id="sensorTbodyFour">
            <tr v-for="(item , index ) in electriData" :key="index" :class="[item.id]">
              <td>{{item.sensorId}}</td>
              <td>{{item.sensorName}}</td>
              <td>{{item.sensorType}}</td>
              <td>{{item.minDis}}</td>
              <td>{{item.maxDis}}</td>
              <td>{{item.band}}</td>
              <td>{{item.bandWidth}}</td>
              <td>{{item.deploymentPlat}}</td>
              <td>{{item.type}}</td>
              <td>{{item.armyType}}</td>
              <td>{{item.cep}}</td>
              <td>{{item.halfLongAxis}}</td>
              <td>{{item.halfShortAxis}}</td>
              <td>{{item.ellipseAngle}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="sensorPartFive">
      <p class="targetTitle">雷达侦察</p>
      <div class="sensorfifthBox">
        <table class="sensorDetailFouth">
          <thead>
            <tr>
              <th>装备编号</th>
              <th>装备名称</th>
              <th>装备类型</th>
              <th>最小探测距离</th>
              <th>最大探测距离</th>
              <th>频段</th>
              <th>扫描周期</th>
              <th>部署平台</th>
              <th>类型</th>
              <th>军兵种</th>
              <th>CEP</th>
              <th>误差椭圆长半轴</th>
              <th>误差椭圆短半轴</th>
              <th>误差椭圆方向</th>
            </tr>
          </thead>
          <tbody id="sensorTbodyFour">
            <tr v-for="(item , index ) in radarData" :key="index" :class="[item.id]">
              <td>{{item.sensorId}}</td>
              <td>{{item.sensorName}}</td>
              <td>{{item.sensorType}}</td>
              <td>{{item.minDis}}</td>
              <td>{{item.maxDis}}</td>
              <td>{{item.band}}</td>
              <td>{{item.scanPeroid}}</td>
              <td>{{item.deploymentPlat}}</td>
              <td>{{item.type}}</td>
              <td>{{item.armyType}}</td>
              <td>{{item.cep}}</td>
              <td>{{item.halfLongAxis}}</td>
              <td>{{item.halfShortAxis}}</td>
              <td>{{item.ellipseAngle}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import gloablUrl from "../Url/url"; //后台请求接口
import axios from "axios";

export default {
  data() {
    return {
      num: -1,
      sensorData: [], //侦察库数据
      airData: [], //航空航天数据
      technologyData: [], //技术侦察表数据
      electriData: [], //电子对抗
      radarData: [], //雷达表数据

      // 新增
      insensorName: "",  //传感器名称
      insensorId: "",    //传感器ID
      insensorType: "",   //传感器类型
      inplatName: "",     //平台名称
      inplatId: "",         //平台ID
      inplatType: "",       //平台类型
      inposFlag: "",         //定位能力
      indoaFlag: "",         //侧向能力
      intdFlag: "",          //时差定位能力
      invelFlag: "",         //测速能力
      inpa: "",               //侧向误差
      inpd: "",                //测距误差
      inpv: "",                 //测速误差
      inptd: "",                //时差误差
      inpxx: "",                 //定位误差协方差矩阵Pxx
      inpyy: "",                 //定位误差协方差矩阵Pyy
      inpxy: "",                 //定位误差协方差矩阵Pxy
      infreqBegin: "",           //侦察起始频率
      infreqEnd: "",             //侦察截止频率
      inprimaryFOVCenter: "",    //主视场方位中心
      inprimaryFOVWidth: "",      //主视场方位宽度
      insencendanryFOVCenter: "",//第二视场方位中心
      insencendanryFOVWidth: "",//第二视场方位宽度
      inprimaryFOVElevationMin: "",  //主视场俯仰最小值
      inprimaryFOVElevationMax: "",   //主视场俯仰最大值
      invelMax: "",                      //最大速度
      inheiMaxl: "",                       //最大高度
      indisMin: "",                         //探测/侦察最近距离
      indisMax: "",                        //探测/侦察最远距离
      inlon: "",                             //平台经度
      inlat: "",                             //平台纬度
      inhei: "",                             //平台高度


      // 编辑
      edsensorName: "",  //传感器名称
      edsensorId: "",    //传感器ID
      edsensorType: "",   //传感器类型
      edplatName: "",     //平台名称
      edplatId: "",         //平台ID
      edplatType: "",       //平台类型
      edposFlag: "",         //定位能力
      eddoaFlag: "",         //侧向能力
      edtdFlag: "",          //时差定位能力
      edvelFlag: "",         //测速能力
      edpa: "",               //侧向误差
      edpd: "",                //测距误差
      edpv: "",                 //测速误差
      edptd: "",                //时差误差
      edpxx: "",                 //定位误差协方差矩阵Pxx
      edpyy: "",                 //定位误差协方差矩阵Pyy
      edpxy: "",                 //定位误差协方差矩阵Pxy
      edfreqBegin: "",           //侦察起始频率
      edfreqEnd: "",             //侦察截止频率
      edprimaryFOVCenter: "",    //主视场方位中心
      edprimaryFOVWidth: "",      //主视场方位宽度
      edsencendanryFOVCenter: "",//第二视场方位中心
      edsencendanryFOVWidth: "",//第二视场方位宽度
      edprimaryFOVElevationMin: "",  //主视场俯仰最小值
      edprimaryFOVElevationMax: "",   //主视场俯仰最大值
      edvelMax: "",                      //最大速度
      edheiMaxl: "",                       //最大高度
      eddisMin: "",                         //探测/侦察最近距离
      eddisMax: "",                        //探测/侦察最远距离
      edlon: "",                             //平台经度
      edlat: "",                             //平台纬度
      edhei: "",                             //平台高度
    };
  },

  mounted() {
    this.sensorPart(); //数据请求
  },

  methods: {
    sensorPart() {
      this.$axios({
        typr: "get",
        url: gloablUrl.URL.testUrl + "/index/getSensors"
      }).then(res => {
        console.log('传感器', res);
        this.sensorData = res.data.data;
        console.log('sensorData', this.sensorData);

      });
    },

    //双击将平台id传给后端 ,拿取航空航天侦察表，技术侦查表，电子对抗侦察表，雷达侦察表
    getDatail(item, index) {
      this.num = index;
      var tid = item.platId;
      // this.$axios({
      //   typr: "get",
      //   url: gloablUrl.URL.testUrl + "/getFourSensorList",
      //   data: "tid=" + tid
      // }).then(res => {
      //   console.log(res);
      //   this.airData = res.data.data.sysSpaceEquipments; //航空航天表数据的渲染
      //   this.technologyData = res.data.data.sysElectronicEquipments; //电子对抗侦察表数据的渲染
      //   this.electriData = res.data.data.sysTechnologyEquipments; //技术侦察表数据的渲染
      //   this.radarData = res.data.data.sysRadarEquipments; //雷达侦察表数据的渲染
      // });
    },



    //编辑单个传感器
    editTarget(item, index) {
      this.$refs.editBox.style.display = "block"
      // input赋值
      this.rowid = item.rowid  //传感器序号
      this.edsensorName = item.SensorName  //传感器名称
      this.edsensorId = item.SensorId   //传感器ID
      this.edsensorType = item.SensorType   //传感器类型
      this.edplatName = item.PlatName     //平台名称
      this.edplatId = item.PlatId       //平台ID
      this.edplatType = item.PlatType       //平台类型
      this.edposFlag = item.POSFlag        //定位能力
      this.eddoaFlag = item.DOAFlag         //侧向能力
      this.edtdFlag = item.TDFlag          //时差定位能力
      this.edvelFlag = item.VELFlag         //测速能力
      this.edpa = item.Pa              //侧向误差
      this.edpd = item.Pd                //测距误差
      this.edpv = item.Pv                 //测速误差
      this.edptd = item.Ptd                //时差误差
      this.edpxx = item.Pxx                 //定位误差协方差矩阵Pxx
      this.edpyy = item.Pyy                 //定位误差协方差矩阵Pyy
      this.edpxy = item.Pxy                 //定位误差协方差矩阵Pxy
      this.edfreqBegin = item.FreqBegin           //侦察起始频率
      this.edfreqEnd = item.FreqEnd             //侦察截止频率SencendanryFOVWidth
      this.edprimaryFOVCenter = item.PrimaryFOVWidth   //主视场方位中心
      this.edprimaryFOVWidth = item.PrimaryFOVWidth     //主视场方位宽度
      this.edsencendanryFOVCenter = item.SencendanryFOVCenter   //第二视场方位中心
      this.edsencendanryFOVWidth = item.SencendanryFOVWidth     //第二视场方位宽度
      this.edprimaryFOVElevationMin = item.PrimaryFOVElevationMin  //主视场俯仰最小值
      this.edprimaryFOVElevationMax = item.PrimaryFOVElevationMax   //主视场俯仰最大值
      this.edvelMax = item.VelMax                      //最大速度
      this.edheiMaxl = item.HeiMax                       //最大高度
      this.eddisMin = item.DisMin                         //探测/侦察最近距离
      this.eddisMax = item.DisMax                       //探测/侦察最远距离
      this.edlon = item.Lon                          //平台经度
      this.edlat = item.Lat                           //平台纬度
      this.edhei = item.Hei                            //平台高度
    },


    //编辑确认按钮
    edSure() {
      //input赋值
      // let rowid = this.rowid //传感器序号
      let sensorName = this.edsensorName //传感器名称
      let sensorId = this.edsensorId  //传感器ID
      let sensorType = this.edsensorType   //传感器类型
      let platName = this.edplatName      //平台名称
      let platId = this.edplatId      //平台ID
      let platType = this.edplatType       //平台类型
      let posFlag = this.edposFlag        //定位能力
      let doaFlag = this.eddoaFlag         //侧向能力
      let tdFlag = this.edtdFlag         //时差定位能力
      let velFlag = this.edvelFlag         //测速能力
      let pa = this.edpa               //侧向误差
      let pd = this.edpd                 //测距误差
      let pv = this.edpv                  //测速误差
      let ptd = this.edptd                 //时差误差
      let pxx = this.edpxx                  //定位误差协方差矩阵Pxx
      let pyy = this.edpyy                  //定位误差协方差矩阵Pyy
      let pxy = this.edpxy                 //定位误差协方差矩阵Pxy
      let freqBegin = this.edfreqBegin           //侦察起始频率
      let freqEnd = this.edfreqEnd             //侦察截止频率SencendanryFOVWidth
      let primaryFOVCenter = this.edprimaryFOVCenter   //主视场方位中心
      let primaryFOVWidth = this.edprimaryFOVWidth      //主视场方位宽度
      let sencendanryFOVCenter = this.edsencendanryFOVCenter    //第二视场方位中心
      let sencendanryFOVWidth = this.edsencendanryFOVWidth   //第二视场方位宽度
      let primaryFOVElevationMin = this.edprimaryFOVElevationMin  //主视场俯仰最小值
      let primaryFOVElevationMax = this.edprimaryFOVElevationMax   //主视场俯仰最大值
      let velMax = this.edvelMax                  //最大速度
      let heiMaxl = this.edheiMaxl                   //最大高度
      let disMin = this.eddisMin                     //探测/侦察最近距离
      let disMax = this.eddisMax                       //探测/侦察最远距离
      let lon = this.edlon                         //平台经度
      let lat = this.edlat                          //平台纬度
      let hei = this.edhei                           //平台高度
      let url = gloablUrl.URL.testUrl + "/index/saveSensor";


      axios
        .post(url, {
          sensorId,    //传感器ID
          sensorName,  //传感器名称
          sensorType,  //传感器类型
          platName,    //平台名称
          platId,      //平台ID
          platType,        //平台类型
          posFlag,        //定位能力
          doaFlag,       //侧向能力
          tdFlag,       //时差定位能力
          velFlag,        //测速能力
          pa,       //侧向误差
          pd,      //测距误差
          pv,        //测速误差
          ptd,      //时差误差
          pxx,       //定位误差协方差矩阵Pxx
          pyy,      //定位误差协方差矩阵Pyy
          pxy,    //定位误差协方差矩阵Pxy
          freqBegin,     //侦察起始频率
          freqEnd,   //侦察截止频率
          primaryFOVCenter,  //主视场方位中心
          primaryFOVWidth, //主视场方位宽度
          primaryFOVElevationMin, //主视场俯仰最小值
          primaryFOVElevationMax, //主视场俯仰最大值
          velMax,    //最大速度
          heiMaxl,     //最大高度
          disMin,          //探测/侦察最近距离
          disMax,    //探测/侦察最远距离
          lon,   //平台经度
          lat,     //平台纬度
          hei,      //平台高度
        })
        .then(res => {
          console.log('编辑', res);

          this.sensorPart(); //数据刷新
          this.$refs.increaseBox.style.display = "none"
          if (res.data.status == 1) {
            this.paintShowFunction()
            this.$refs.paintBox.innerHTML = "编辑成功"
            this.timeDispare()
          } else {
            this.paintShowFunction()
            this.$refs.paintBox.style.color = "red";
            this.$refs.paintBox.innerHTML = "编辑失败"
            this.timeDispare()
          }
        });
    },



    //编辑取消按钮
    edCancel() {
      this.$refs.editBox.style.display = "none"
    },


    //删除单个目标接口
    deleteTarget(item, index) {
      var sure = confirm('确认删除此目标？')
      if (sure == true) {
        this.$axios({
          typr: "get",
          url: gloablUrl.URL.testUrl + "/index/deleteSensor?rowId=" + item.SensorId
        }).then(res => {
          this.sensorPart(); //数据刷新
          this.$refs.increaseBox.style.display = "none"
          if (res.data.status == 1) {
            this.paintShowFunction()
            this.$refs.paintBox.innerHTML = "删除成功"
            this.timeDispare()
          } else {
            this.paintShowFunction()
            this.$refs.paintBox.style.color = "red";
            this.$refs.paintBox.innerHTML = "删除失败"
            this.timeDispare()
          }
        });
      }
    },

    // 新增弹窗出现
    boxShow() {
      this.$refs.increaseBox.style.display = "block"
    },

    //新增确定按钮
    inSure() {
      // let rowid = this.rowid //传感器序号
      let sensorName = this.insensorName //传感器名称
      let sensorId = this.insensorId  //传感器ID
      let sensorType = this.insensorType   //传感器类型
      let platName = this.inplatName      //平台名称
      let platId = this.inplatId      //平台ID
      let platType = this.inplatType       //平台类型
      let posFlag = this.inposFlag        //定位能力
      let doaFlag = this.indoaFlag         //侧向能力
      let tdFlag = this.intdFlag         //时差定位能力
      let velFlag = this.invelFlag         //测速能力
      let pa = this.inpa               //侧向误差
      let pd = this.inpd                 //测距误差
      let pv = this.inpv                  //测速误差
      let ptd = this.inptd                 //时差误差
      let pxx = this.inpxx                  //定位误差协方差矩阵Pxx
      let pyy = this.inpyy                  //定位误差协方差矩阵Pyy
      let pxy = this.inpxy                 //定位误差协方差矩阵Pxy
      let freqBegin = this.infreqBegin           //侦察起始频率
      let freqEnd = this.infreqEnd             //侦察截止频率Sencendan
      let primaryFOVCenter = this.inprimaryFOVCenter   //主视场方位中
      let primaryFOVWidth = this.inprimaryFOVWidth      //主视场方位宽
      let sencendanryFOVCenter = this.insencendanryFOVCenter    //第二
      let sencendanryFOVWidth = this.insencendanryFOVWidth   //第二视
      let primaryFOVElevationMin = this.inprimaryFOVElevationMin  //主
      let primaryFOVElevationMax = this.inprimaryFOVElevationMax   //
      let velMax = this.invelMax                  //最大速度
      let heiMaxl = this.inheiMaxl                   //最大高度
      let disMin = this.indisMin                     //探测/侦察最近距
      let disMax = this.indisMax                       //探测/侦察最远
      let lon = this.inlon                         //平台经度
      let lat = this.inlat                          //平台纬度
      let hei = this.inhei                           //平台高度
      let url = gloablUrl.URL.testUrl + "/index/saveSensor";


      axios
        .post(url, {
          sensorName,  //传感器名称
          sensorId,    //传感器ID
          sensorType,  //传感器类型
          platName,    //平台名称
          platId,      //平台ID
          platType,        //平台类型
          posFlag,        //定位能力
          doaFlag,       //侧向能力
          tdFlag,       //时差定位能力
          velFlag,        //测速能力
          pa,       //侧向误差
          pd,      //测距误差
          pv,        //测速误差
          ptd,      //时差误差
          pxx,       //定位误差协方差矩阵Pxx
          pyy,      //定位误差协方差矩阵Pyy
          pxy,    //定位误差协方差矩阵Pxy
          freqBegin,     //侦察起始频率
          freqEnd,   //侦察截止频率
          primaryFOVCenter,  //主视场方位中心
          primaryFOVWidth, //主视场方位宽度
          primaryFOVElevationMin, //主视场俯仰最小值
          primaryFOVElevationMax, //主视场俯仰最大值
          velMax,    //最大速度
          heiMaxl,     //最大高度
          disMin,          //探测/侦察最近距离
          disMax,    //探测/侦察最远距离
          lon,   //平台经度
          lat,     //平台纬度
          hei,      //平台高度
        })
        .then(res => {
          this.sensorPart(); //数据刷新
          this.$refs.increaseBox.style.display = "none"
          if (res.data.status == 1) {
            this.paintShowFunction()
            this.$refs.paintBox.innerHTML = "添加成功"
            this.timeDispare()
          } else {
            this.paintShowFunction()
            this.$refs.paintBox.style.color = "red";
            this.$refs.paintBox.innerHTML = "添加失败"
            this.timeDispare()
          }

        });
    },
    //新增取消按钮
    inCancel() {
      this.$refs.increaseBox.style.display = "none"
    },

    //  弹窗出现
    paintShowFunction() {
      this.$refs.paintBox.style.opacity = "1";
      this.$refs.paintBox.style.top = "2%";
    },

    //  弹窗消失
    timeDispare() {
      setTimeout(() => {
        this.$refs.paintBox.style.opacity = "0";
        this.$refs.paintBox.style.top = "1%";
      }, 4000)
    }


  },
};
</script>

<style>
.sensorPart {
  width: 100%;
  height: 100%;
  /* display: none; */
  position: absolute;
  background-color: #020317;
}

/* 新增窗口 */
.increase {
  width: 580px;
  height: 640px;
  background-color: #191c25;
  position: absolute;
  left: 35%;
  top: 10%;
  display: none;
  z-index: 1000;
  overflow: scroll;
  overflow-x: hidden;
}
.increase-title {
  color: #ffffff;
  font-size: 18px;
  height: 4%;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 2px;
}

.inSure {
  display: inline-block;
  width: 60px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #ffffff;
  letter-spacing: 3px;
  cursor: pointer;
  border: 1px solid #ffffff;
  border-radius: 4px;
}
.inCancel {
  display: inline-block;
  width: 60px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #ffffff;
  letter-spacing: 3px;
  cursor: pointer;
  border: 1px solid #ffffff;
  border-radius: 4px;
}

.increase::-webkit-scrollbar {
  width: 4px;
  /* height:px; */
}
.increase::-webkit-scrollbar-track {
  background: rgb(122, 122, 122);
  border-radius: 2px;
}

.increase::-webkit-scrollbar-thumb {
  background: #bfbfbf;
  border-radius: 10px;
}

.increase::-webkit-scrollbar-thumb:hover {
  background: #f8f8f8;
}

.increase::-webkit-scrollbar-corner {
  background: #434b43;
}

.increase option {
  background-color: rgb(143, 140, 140);
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 2px;
}

/* 修改窗口 */
.edit {
  width: 580px;
  height: 640px;
  background-color: #191c25;
  position: absolute;
  left: 35%;
  top: 10%;
  display: none;
  z-index: 1000;
  overflow: scroll;
  overflow-x: hidden;
}
.edit-title {
  color: #ffffff;
  font-size: 18px;
  height: 4%;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 2px;
}
.bottom {
  width: 100%;
  height: 60px;
  margin-top: 20px;
}
.edSure {
  /* position: absolute; */
  display: inline-block;
  width: 60px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #ffffff;
  letter-spacing: 3px;
  /* left: 35%;
  bottom: 1.5%; */
  cursor: pointer;
  border: 1px solid #ffffff;
  border-radius: 4px;
}
.edCancel {
  /* position: absolute; */
  display: inline-block;
  width: 60px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #ffffff;
  letter-spacing: 3px;
  /* right: 35%;
  bottom: 1.5%; */
  cursor: pointer;
  border: 1px solid #ffffff;
  border-radius: 4px;
}

.edit::-webkit-scrollbar {
  width: 4px;
  /* height:px; */
}
.edit::-webkit-scrollbar-track {
  background: rgb(122, 122, 122);
  border-radius: 2px;
}

.edit::-webkit-scrollbar-thumb {
  background: #bfbfbf;
  border-radius: 10px;
}

.edit::-webkit-scrollbar-thumb:hover {
  background: #f8f8f8;
}

.edit::-webkit-scrollbar-corner {
  background: #434b43;
}

.edit option {
  background-color: rgb(143, 140, 140);
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 2px;
}

/* 编辑按钮 */
#editSensor {
  width: 50px;
  height: 28px;
  color: #ffffff;
  display: inline-block;
  border: 1px solid #ffffff;
  border-radius: 4px;
  cursor: pointer;
  line-height: 28px;
  letter-spacing: 1px;
  margin-top: 2px;
  margin-bottom: 2px;
}
/* 删除按钮 */
#deleteSensor {
  width: 50px;
  height: 28px;
  color: #e41e1e;
  display: inline-block;
  border: 1px solid #ffffff;
  border-radius: 4px;
  cursor: pointer;
  line-height: 28px;
  letter-spacing: 1px;
}

#tbodyClickTwo {
  background-color: rgba(199, 199, 199, 0.5);
}
.tableSearch {
  width: 100%;
  height: 6%;
  /* background-color: pink; */
  position: relative;
}
.sensorBack {
  width: 70px;
  height: 25px;
  background-image: url("../images/imgs/2.png");
  background-size: 100% 100%;
  color: #ffffff;
  line-height: 25px;
  font-size: 15px;
  letter-spacing: 2px;
  text-align: center;
  position: absolute;
  left: 4%;
  top: 34%;
  cursor: pointer;
}

.sensorPartOne {
  width: 98%;
  height: 17.5%;
  /* background-color: rgba(31, 44, 102,0.5); */
  position: relative;
  left: 1%;
  /* margin-top: 0.6%; */
  /* background-color: rgba(148, 145, 145, 0.2); */
  background-color: rgba(83, 135, 214, 0.2);
  background-image: url("../images/imgs/biankuang.png");
  background-size: 100% 100%;
}
.sensorPartTwo {
  width: 98%;
  height: 17.5%;
  /* background-color: rgba(31, 44, 102,0.5); */
  left: 1%;
  position: relative;
  margin-top: 0.6%;
  background-color: rgba(83, 135, 214, 0.2);
  background-image: url("../images/imgs/biankuang.png");
  background-size: 100% 100%;
}
.sensorPartThree {
  width: 98%;
  height: 17.5%;
  position: relative;
  margin-top: 0.6%;
  left: 1%;
  background-color: rgba(83, 135, 214, 0.2);
  background-image: url("../images/imgs/biankuang.png");
  background-size: 100% 100%;
}
.sensorPartFour {
  width: 98%;
  height: 17.5%;
  position: relative;
  margin-top: 0.6%;
  left: 1%;
  background-color: rgba(83, 135, 214, 0.2);
  background-image: url("../images/imgs/biankuang.png");
  background-size: 100% 100%;
}
.sensorPartFive {
  width: 98%;
  height: 17.5%;
  position: relative;
  margin-top: 0.6%;
  left: 1%;
  background-color: rgba(83, 135, 214, 0.2);
  background-image: url("../images/imgs/biankuang.png");
  background-size: 100% 100%;
}
.targetTitle {
  color: #ffffff;
  font-size: 16px;
  letter-spacing: 2px;
  margin-left: 12px;
  margin-bottom: 4px;
  letter-spacing: 1px;
  margin-top: 2px;
  border-bottom: 1px solid #bdbdbd;
}
.sensorFirstBox {
  width: 100%;
  height: 80%;
  /* background-color: rgba(119, 118, 118, 0.5); */
  /* background-color: #171F45; */
  box-sizing: border-box;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 4px;
  padding-bottom: 4px;
  overflow: auto;
  color: #ffffff;
}
.sensorFirstBox::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.sensorFirstBox::-webkit-scrollbar-track {
  background: rgb(122, 122, 122);
  border-radius: 2px;
}

.sensorFirstBox::-webkit-scrollbar-thumb {
  background: rgb(205, 206, 207);
  border-radius: 10px;
}

.sensorFirstBox::-webkit-scrollbar-thumb:hover {
  background: #f8f8f8;
}

.targetFirstBox::-webkit-scrollbar-corner {
  background: #434b43;
}

.allSensorBox {
  /* height: 8%; */
  width: 200%;
  border-collapse: collapse;
}
.allSensorBox thead tr th {
  border: 1px solid #a9a9a9;
  text-align: center;
  height: 26px;
  background-color: rgba(199, 199, 199, 0.1);
  font-size: 15px;
}
.allSensorBox tbody {
  /* display: inline-block;
   
    height: 100px;
    overflow-y: scroll; */
}

.allSensorBox td {
  border: 1px solid #a9a9a9;
  text-align: center;
  height: 24px;
  font-size: 14px;
}
.allSensorBox tr:nth-child(2n) {
  background-color: rgba(199, 199, 199, 0.1);
  /* background-color: #1D264F; */
}
.sensorSecondBox {
  width: 100%;
  height: 80%;
  box-sizing: border-box;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 4px;
  padding-bottom: 4px;
  overflow: auto;
  color: #ffffff;
}
.sensorSecondBox::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.sensorSecondBox::-webkit-scrollbar-track {
  background: rgb(122, 122, 122);
  border-radius: 2px;
}

.sensorSecondBox::-webkit-scrollbar-thumb {
  background: rgb(205, 206, 207);
  border-radius: 10px;
}

.sensorSecondBox::-webkit-scrollbar-thumb:hover {
  background: #f8f8f8;
}

.sensorSecondBox::-webkit-scrollbar-corner {
  background: #434b43;
}
.sensorDetailFirst {
  height: 8%;
  width: 100%;
  border-collapse: collapse;
}
.sensorDetailFirst thead tr th {
  border: 1px solid #a9a9a9;
  text-align: center;
  height: 26px;
  background-color: rgba(199, 199, 199, 0.1);
  font-size: 15px;
}
.sensorDetailFirst td {
  border: 1px solid #a9a9a9;
  text-align: center;
  height: 24px;
  font-size: 14px;
}
.sensorDetailFirst tr:nth-child(2n) {
  background-color: rgba(199, 199, 199, 0.1);
  /* background-color: #1D264F; */
}
.sensorThirdBox {
  width: 100%;
  height: 80%;
  box-sizing: border-box;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 4px;
  padding-bottom: 4px;
  overflow: auto;
  color: #ffffff;
}
.sensorThirdBox::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.sensorThirdBox::-webkit-scrollbar-track {
  background: rgb(122, 122, 122);
  border-radius: 2px;
}

.sensorThirdBox::-webkit-scrollbar-thumb {
  background: rgb(205, 206, 207);
  border-radius: 10px;
}

.sensorThirdBox::-webkit-scrollbar-thumb:hover {
  background: #f8f8f8;
}

.sensorThirdBox::-webkit-scrollbar-corner {
  background: #434b43;
}
.sensorDetailSecond {
  height: 8%;
  width: 100%;
  border-collapse: collapse;
}
.sensorDetailSecond thead tr th {
  border: 1px solid #a9a9a9;
  text-align: center;
  height: 26px;
  background-color: rgba(199, 199, 199, 0.1);
  font-size: 15px;
}
.sensorDetailSecond td {
  border: 1px solid #a9a9a9;
  text-align: center;
  height: 24px;
  font-size: 14px;
}
.sensorDetailSecond tr:nth-child(2n) {
  background-color: rgba(199, 199, 199, 0.1);
  /* background-color: #1D264F; */
}
#sensorDetailSecond {
  background-color: rgba(199, 199, 199, 0.5);
}

.sensorFouthBox {
  width: 100%;
  height: 80%;
  box-sizing: border-box;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 4px;
  padding-bottom: 4px;
  overflow: auto;
  color: #ffffff;
}
.sensorFouthBox::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.sensorFouthBox::-webkit-scrollbar-track {
  background: rgb(122, 122, 122);
  border-radius: 2px;
}

.sensorFouthBox::-webkit-scrollbar-thumb {
  background: rgb(205, 206, 207);
  border-radius: 10px;
}

.sensorFouthBox::-webkit-scrollbar-thumb:hover {
  background: #f8f8f8;
}

.sensorFouthBox::-webkit-scrollbar-corner {
  background: #434b43;
}
.sensorDetailThird {
  height: 8%;
  width: 100%;
  border-collapse: collapse;
}
.sensorDetailThird thead tr th {
  border: 1px solid #a9a9a9;
  text-align: center;
  height: 26px;
  background-color: rgba(199, 199, 199, 0.1);
  font-size: 15px;
}
.sensorDetailThird td {
  border: 1px solid #a9a9a9;
  text-align: center;
  height: 24px;
  font-size: 14px;
}
.sensorDetailThird tr:nth-child(2n) {
  background-color: rgba(199, 199, 199, 0.1);
  /* background-color: #1D264F; */
}
#sensorDetailThird {
  background-color: rgba(199, 199, 199, 0.5);
}

.sensorfifthBox {
  width: 100%;
  height: 80%;
  box-sizing: border-box;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 4px;
  padding-bottom: 4px;
  overflow: auto;
  color: #ffffff;
}
.sensorfifthBox::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.sensorfifthBox::-webkit-scrollbar-track {
  background: rgb(122, 122, 122);
  border-radius: 2px;
}

.sensorfifthBox::-webkit-scrollbar-thumb {
  background: rgb(205, 206, 207);
  border-radius: 10px;
}

.sensorfifthBox::-webkit-scrollbar-thumb:hover {
  background: #f8f8f8;
}

.sensorfifthBox::-webkit-scrollbar-corner {
  background: #434b43;
}
.sensorDetailFouth {
  height: 8%;
  width: 100%;
  border-collapse: collapse;
}
.sensorDetailFouth thead tr th {
  border: 1px solid #a9a9a9;
  text-align: center;
  height: 26px;
  background-color: rgba(199, 199, 199, 0.1);
  font-size: 15px;
}
.sensorDetailFouth td {
  border: 1px solid #a9a9a9;
  text-align: center;
  height: 24px;
  font-size: 14px;
}
.sensorDetailFouth tr:nth-child(2n) {
  background-color: rgba(199, 199, 199, 0.1);
  /* background-color: #1D264F; */
}
#sensorDetailFouth {
  background-color: rgba(199, 199, 199, 0.5);
}

/* 新增窗口和编辑窗口的文本内容样式 */
.weapon {
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  font-size: 16px;
  color: #ffffff;
  letter-spacing: 1px;
  text-align: left;
}
.weapon span {
  width: 196px;
  display: inline-block;
  height: 100%;
  float: left;
}
.weapon input {
  height: 20px;
  border-width: 2px;
  border-style: inset;
  border-color: initial;
  -o-border-image: initial;
  border-image: initial;
  background-color: rgb(76, 75, 77);
  padding-left: 4px;
  color: #ffffff;
  margin-left: 4%;
  /* margin-top: 1%; */
  width: 50%;
}
.weapon select {
  background-color: rgb(143, 140, 140);
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 2px;
  margin-left: 4%;
  width: 70px;
  color: #ffffff;
}

/* -------消息弹窗------- */
#paintBox {
  position: absolute;
  width: 12%;
  height: 4%;
  border-radius: 12px;
  background-image: url("../images/imgs/newsBox.png");
  background-size: 100% 100%;
  left: 45%;
  top: 1%;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #2945aa;
  z-index: 1500;
  opacity: 0;
  letter-spacing: 1px;
  transition: all 0.6s ease-in-out;
}
</style>