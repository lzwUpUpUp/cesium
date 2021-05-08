<template>
  <div class="tablePart">
    <div class="tableSearch"></div>
    <div class="tableOne">
      <p class="tableTitle">测向线</p>
      <div class="tableOneBox">
        <table class="oneBoxDetail">
          <thead>
            <tr>
              <th>批号</th>
              <th>时间</th>
              <th>置信度</th>
              <th>传感器id</th>
              <th>传感器名称</th>
              <th>侦察手段</th>
              <th>测向角(deg)</th>
              <th>测向误差(deg)</th>
              <th>敌我识别码</th>
              <th>频率(MHz)</th>
              <th>调制类型</th>
              <th>带宽(kHz)</th>
              <th>脉宽(us)</th>
              <th>脉周(us)</th>
              <th>国别</th>
              <th>身份</th>
              <th>环境</th>
              <th>疑似目标1</th>
              <th>置信度1</th>
              <th>疑似目标2</th>
              <th>置信度2</th>
              <th>疑似目标3</th>
              <th>置信度3</th>
            </tr>
          </thead>
          <tbody id="tbodyOne">
            <tr
              v-for="(item , index ) in originalData"
              :key="index"
              :class="[item.timestamp]"
              :id="num== index ? 'tbodyClickTwo' :''"
              @click="firstChange(item,index)"
            >
              <td>{{item.TID}}</td>
              <td>{{item.TimeStamp}}</td>
              <td>{{item.Confidence1}}</td>
              <td>{{item.SensorID}}</td>
              <td>{{item.SensorName}}</td>
              <td>{{item.SensorType}}</td>
              <td>{{item.DOA}}</td>
              <td>{{item.DOASigma}}</td>
              <td>{{item.IFF}}</td>
              <td>{{item.CenterFreq}}</td>
              <td>{{item.SigType}}</td>
              <td>{{item.BandWidth}}</td>
              <td>{{item.PulseWidth}}</td>
              <td>{{item.PulsePeriod}}</td>
              <td>{{item.Nationality}}</td>
              <td>{{item.Identify}}</td>
              <td>{{item.Environment}}</td>
              <td>{{item.TargetName1}}</td>
              <td>{{item.Confidence1}}</td>
              <td>{{item.TargetName2}}</td>
              <td>{{item.Confidence2}}</td>
              <td>{{item.TargetName3}}</td>
              <td>{{item.Confidence3}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="tableTwo">
      <p class="tableTitle">原始目标</p>
      <div class="tableTwoBox">
        <table class="TwoBoxDetail">
          <thead>
            <tr>
              <th>批号</th>
              <th>时间</th>
              <th>传感器id</th>
              <th>传感器名称</th>
              <th>侦察手段</th>
              <th>经度</th>
              <th>纬度</th>
              <th>高度(m)</th>
              <th>速度(m/s)</th>
              <th>航向</th>
              <th>误差椭圆长半轴</th>
              <th>误差椭圆短半轴</th>
              <th>误差椭圆倾角</th>
              <th>敌我识别码</th>
              <th>频率(MHz)</th>
              <th>调制类型</th>
              <th>带宽(kHz)</th>
              <th>脉宽(us)</th>
              <th>脉周(us)</th>
              <th>国别</th>
              <th>身份</th>
              <th>环境</th>
              <th>疑似目标1</th>
              <th>置信度1</th>
              <th>疑似目标2</th>
              <th>置信度2</th>
              <th>疑似目标3</th>
              <th>置信度3</th>
            </tr>
          </thead>
          <tbody id="tbodyTwo">
            <tr
              v-for="(item , index ) in unknownData"
              :key="index"
              :class="[item.timestamp]"
              :id="secondNum== index ? 'tbodyClickTwo' :''"
              @click="secondChange(item,index)"
            >
              <td>{{item.TID}}</td>
              <td>{{item.TimeStamp}}</td>
              <td>{{item.SensorID}}</td>
              <td>{{item.SensorName}}</td>
              <td>{{item.SensorType}}</td>
              <td>{{Number(item.Lon).toFixed(4)}}</td>
              <td>{{Number(item.Lat).toFixed(4)}}</td>
              <td>{{Number(item.Hei).toFixed(4)}}</td>
              <td>{{Number(item.Vel).toFixed(4)}}</td>
              <td>{{Number(item.Heading).toFixed(4)}}</td>
              <td>{{item.HalfLongAxis}}</td>
              <td>{{item.HalfShortAxis}}</td>
              <td>{{item.EllipseAngle}}</td>
              <td>{{item.IFF}}</td>
              <td>{{item.CenterFreq}}</td>
              <td>{{item.SigType}}</td>
              <td>{{item.BandWidth}}</td>
              <td>{{item.PulseWidth}}</td>
              <td>{{item.PulsePeriod}}</td>
              <td>{{item.Nationality}}</td>
              <td>{{item.Identify}}</td>
              <td>{{item.Environment}}</td>
              <td>{{item.TargetName1}}</td>
              <td>{{item.Confidence1}}</td>
              <td>{{item.TargetName2}}</td>
              <td>{{item.Confidence2}}</td>
              <td>{{item.TargetName3}}</td>
              <td>{{item.Confidence3}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="tableThree">
      <p class="tableTitle">融合目标</p>
      <div class="tableThreeBox">
        <table class="threeBoxDetail">
          <thead>
            <tr>
              <th>批号</th>
              <th>时间</th>
              <th>目标名称</th>
              <th>置信度</th>
              <th>传感器id</th>
              <th>传感器名称</th>
              <th>协同手段</th>
              <th>经度</th>
              <th>纬度</th>
              <th>高度(m)</th>
              <th>航速(m/s)</th>
              <th>航向</th>
              <th>误差椭圆长半轴</th>
              <th>误差椭圆短半轴</th>
              <th>误差椭圆倾角</th>
              <th>敌我识别码</th>
              <th>国别</th>
              <th>身份</th>
              <th>环境</th>
              <!-- <th>首发信息</th> -->
              <th>疑似目标2</th>
              <th>置信度2</th>
              <th>疑似目标3</th>
              <th>置信度3</th>
            </tr>
          </thead>
          <tbody id="tbodyThree">
            <tr
              v-for="(item , index ) in fusionData"
              :key="index"
              :class="[item.timestamp]"
              :id="thirdNum== index ? 'tbodyClickTwo' :''"
              @click="thirdChange(item,index)"
              @dblclick="ToPicPage(item)"
            >
              <td>{{item.FusionID}}</td>
              <td>{{item.TimeStamp}}</td>
              <td>{{item.TargetName1}}</td>
              <td>{{item.Confidence1}}</td>
              <td>{{item.SensorID}}</td>
              <td :title="item.SensorName">{{item.SensorName}}</td>
              <td :title="item.SensorType">{{item.SensorType}}</td>
              <td>{{Number(item.Lon).toFixed(4)}}</td>
              <td>{{Number(item.Lat).toFixed(4)}}</td>
              <td>{{Number(item.Hei).toFixed(4)}}</td>
              <td>{{Number(item.Vel).toFixed(4)}}</td>
              <td>{{Number(item.Heading).toFixed(4)}}</td>
              <td>{{item.HalfLongAxis}}</td>
              <td>{{item.HalfShortAxis}}</td>
              <td>{{item.EllipseAngle}}</td>
              <td>{{item.IFF}}</td>
              <td>{{item.Nationality}}</td>
              <td>{{item.Identify}}</td>
              <td>{{item.Environment}}</td>
              <!-- <td :title="item.FirstInfo">{{item.FirstInfo}}</td> -->
              <td>{{item.TargetName2}}</td>
              <td>{{item.Confidence2}}</td>
              <td>{{item.TargetName3}}</td>
              <td>{{item.Confidence3}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import gloablUrl from "../Url/url"; //后台请求接口

export default {
  data() {
    return {
      time: "", //定时器
      num: -1,
      secondNum: -1,
      thirdNum: -1,
      originalData: [], ////测向线数据
      unknownData: [], ////定位航迹数据
      fusionData: [] ////融合数据
    };
  },

  mounted() {
    this.picPart();
    var time = setInterval(() => {
      this.picPart();
    }, 3000);
  },

  methods: {
    picPart() {
      this.$axios({
        typr: "get",
        url: gloablUrl.URL.testUrl + "/index/getTableIndex"
      }).then(res => {
        this.originalData = []  //更新模式
        this.unknownData = []
        for (var i = 0; i < res.data.data.originalTraces.length; i++) {
          if (res.data.data.originalTraces[i].TraceType == '测向线') {
            this.originalData.push(res.data.data.originalTraces[i])
          } else if (res.data.data.originalTraces[i].TraceType == '定位航迹') {
            this.unknownData.push(res.data.data.originalTraces[i])
          }
        }
        this.fusionData = res.data.data.fusionTraces;
      });
    },

    firstChange(item, index) {
      this.num = index;
      this.secondNum = -1;
      this.thirdNum = -1;
    },
    secondChange(item, index) {
      this.num = -1;
      this.secondNum = index;
      this.thirdNum = -1;
    },
    thirdChange(item, index) {
      this.num = -1;
      this.secondNum = -1;
      this.thirdNum = index;
    },

    ToPicPage(item) {
      this.$router.push({
        name: 'picPage',
        params: { tid: item.FusionID, time: item.TimeStamp, }
      })
    }
  }
};
</script>

<style >
.tablePart {
  background-color: #020317;
  width: 100%;
  height: 100%;
  position: absolute;
}
.tableSearch {
  width: 100%;
  height: 1%;
  /* background-color: pink; */
  position: relative;
}
#tbodyClickTwo {
  background-color: rgba(199, 199, 199, 0.5);
}
.searchChild {
  width: 18%;
  height: 100%;
  float: left;
  color: #ffffff;
  box-sizing: border-box;
  padding-left: 4px;
  padding-top: 10px;
  /* text-align: center; */
}
.searchChildSpan {
  /* float: left; */
  /* position: relative;
    top: 4px; */
  color: #ffffff;
}
.makeSure {
  width: 70px;
  height: 25px;
  display: inline-block;
  border: 1px solid #6578be;
  /* background-image: url('../images/imgs/组\ 2.png');
    background-size: 100% 100%; */
  color: #ffffff;
  line-height: 25px;
  font-size: 15px;
  letter-spacing: 2px;
  text-align: center;
  position: absolute;
  right: 2%;
  background-color: rgba(48, 64, 207, 0.4);
  top: 22%;
}
.tableOne {
  width: 98%;
  height: 32%;
  /* background-color: rgba(31, 44, 102,0.5); */
  position: relative;
  left: 1%;
  /* margin-top: 0.6%; */
  /* background-color: rgba(148, 145, 145, 0.2); */
  background-color: rgba(83, 135, 214, 0.2);
  background-image: url("../images/imgs/biankuang.png");
  background-size: 100% 100%;
}
.tableTwo {
  width: 98%;
  height: 32%;
  /* background-color: rgba(31, 44, 102,0.5); */
  left: 1%;
  position: relative;
  margin-top: 0.6%;
  background-color: rgba(83, 135, 214, 0.2);
  background-image: url("../images/imgs/biankuang.png");
  background-size: 100% 100%;
}
.tableThree {
  width: 98%;
  height: 32%;
  position: relative;
  margin-top: 0.6%;
  left: 1%;
  background-color: rgba(83, 135, 214, 0.2);
  background-image: url("../images/imgs/biankuang.png");
  background-size: 100% 100%;
}
.tableTitle {
  color: #ffffff;
  font-size: 16px;
  letter-spacing: 2px;
  margin-left: 12px;
  margin-bottom: 4px;
  letter-spacing: 1px;
  margin-top: 2px;
  border-bottom: 1px solid #bdbdbd;
}
.tableOneBox {
  width: 100%;
  height: 88%;
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
.tableOneBox::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.tableOneBox::-webkit-scrollbar-track {
  background: rgb(122, 122, 122);
  border-radius: 2px;
}

.tableOneBox::-webkit-scrollbar-thumb {
  background: rgb(205, 206, 207);
  border-radius: 10px;
}

.tableOneBox::-webkit-scrollbar-thumb:hover {
  background: #f8f8f8;
}

.tableOneBox::-webkit-scrollbar-corner {
  background: #434b43;
}

.searchTwo {
  background-color: rgba(199, 199, 199, 0.1);
  border: 1px solid #5268af;
}
.searchFour {
  /* width: 60px;
    border-width: 2px;
    border-style: inset;
    border-color: initial;
    border-image: initial;
    background-color: rgb(76, 75, 77); */
  background-color: rgba(199, 199, 199, 0.1);
  border: 1px solid #5268af;
  padding-left: 4px;
  height: 24px;
  color: #ffffff;
  /* color: #ffffff; */
  width: 34px;
}
#objectType {
  /* border-width: 2px;
    border-style: inset;
    border-color: initial;
    border-image: initial;
    height: 24px; */
  border: 1px solid #5268af;
  background-color: rgba(199, 199, 199, 0.1);
  height: 24px;
  padding-left: 2px;
  color: #ffffff;
}

.option {
  background-color: rgb(143, 140, 140);
}

.oneBoxDetail {
  /* height: 8%; */
  width: 100%;
  /* border-collapse: collapse; */
}
.oneBoxDetail thead tr th {
  border: 1px solid #a9a9a9;
  text-align: center;
  height: 26px;
  background-color: rgba(199, 199, 199, 0.1);
  font-size: 15px;
}
.oneBoxDetail tbody {
  /* display: inline-block;
   
    height: 100px;
    overflow-y: scroll; */
}

.oneBoxDetail td {
  border: 1px solid #a9a9a9;
  text-align: center;
  height: 24px;
  font-size: 14px;
}
.oneBoxDetail tr:nth-child(2n) {
  background-color: rgba(199, 199, 199, 0.1);
  /* background-color: #1D264F; */
}
.tableTwoBox {
  width: 100%;
  height: 88%;
  box-sizing: border-box;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 4px;
  padding-bottom: 4px;
  overflow: auto;
  color: #ffffff;
}
.tableTwoBox::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.tableTwoBox::-webkit-scrollbar-track {
  background: rgb(122, 122, 122);
  border-radius: 2px;
}

.tableTwoBox::-webkit-scrollbar-thumb {
  background: rgb(205, 206, 207);
  border-radius: 10px;
}

.tableTwoBox::-webkit-scrollbar-thumb:hover {
  background: #f8f8f8;
}

.tableTwoBox::-webkit-scrollbar-corner {
  background: #434b43;
}
.TwoBoxDetail {
  height: 8%;
  width: 100%;
  /* border-collapse: collapse; */
}
.TwoBoxDetail thead tr th {
  border: 1px solid #a9a9a9;
  text-align: center;
  height: 26px;
  background-color: rgba(199, 199, 199, 0.1);
  font-size: 15px;
}
.TwoBoxDetail td {
  border: 1px solid #a9a9a9;
  text-align: center;
  height: 24px;
  font-size: 14px;
}
.TwoBoxDetail tr:nth-child(2n) {
  background-color: rgba(199, 199, 199, 0.1);
  /* background-color: #1D264F; */
}
.tableThreeBox {
  width: 100%;
  height: 88%;
  box-sizing: border-box;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 4px;
  padding-bottom: 4px;
  overflow: auto;
  color: #ffffff;
}
.tableThreeBox::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.tableThreeBox::-webkit-scrollbar-track {
  background: rgb(122, 122, 122);
  border-radius: 2px;
}

.tableThreeBox::-webkit-scrollbar-thumb {
  background: rgb(205, 206, 207);
  border-radius: 10px;
}

.tableThreeBox::-webkit-scrollbar-thumb:hover {
  background: #f8f8f8;
}

.tableThreeBox::-webkit-scrollbar-corner {
  background: #434b43;
}
.threeBoxDetail {
  height: 8%;
  width: 100%;
  /* border-collapse: collapse; */
}

/* 超出出现省略号 */
.threeBoxDetail td {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.threeBoxDetail thead tr th {
  border: 1px solid #a9a9a9;
  text-align: center;
  height: 26px;
  background-color: rgba(199, 199, 199, 0.1);
  font-size: 15px;
}
.threeBoxDetail td {
  border: 1px solid #a9a9a9;
  text-align: center;
  height: 24px;
  font-size: 14px;
}
.threeBoxDetail tr:nth-child(2n) {
  background-color: rgba(199, 199, 199, 0.1);
  /* background-color: #1D264F; */
}
#tbodyClickOne {
  background-color: rgba(199, 199, 199, 0.5);
}

#tbodyClickThree {
  background-color: rgba(199, 199, 199, 0.5);
}
#tbodyClickTwo {
  background-color: rgba(199, 199, 199, 0.5);
}
</style>