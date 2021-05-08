<template>
  <div id="tableBox" class="otherPart" style="float: left">
    <!-- 弹出框 -->
    <div class="popup" v-show="loading">
      <!-- loading图 -->
      <loading></loading>
    </div>
    <!-- --- -->
    <h1>仿真数据分析</h1>
    <div class="fusionsPart" style="float:left;position:relative;">
      <div class="funsion">
        <p class="tableTitle">融合数据</p>
        <div class="fusionContent">
          <ul class="fusionslibs"></ul>
        </div>
      </div>
      <div class="funsion" style="margin-top:3.5%;">
        <!-- <p class="tableTitle">融合数据</p> -->
        <ul style="height:6%;border-bottom:1px solid #cccccc">
          <li
            v-for="(item, index) in myTab"
            :key="index"
            :id="tabShow == index?'tabShow':''"
            @click="tabChange(item,index)"
            class="tabTitle"
          >{{item.title}}</li>
        </ul>
        <div class="tabBox" id="boxShow">
          <div class="colorBox"></div>
          <div class="ellipse">
            <div class="ellipseLong">{{this.ellipseLong}}</div>
            <div class="ellipseShort">{{this.ellipseShort}}</div>
            <canvas id="canvas" style="display:block;margin:auto;width:100%;height:100%"></canvas>
          </div>
        </div>
        <div class="tabBox">
          <canvas id="ellips" style="width:100%;height:100%;"></canvas>
        </div>
      </div>
    </div>
    <div class="tarcksPart" style="float:left;position:relative;">
      <!-- <div class="tableSearch">
      </div>-->
      <div class="tracks">
        <!-- <p class="tableTitle">原始轨迹数据</p> -->
        <ul style="height:8%;border-bottom:1px solid #cccccc">
          <li
            v-for="(item, index) in fullTab"
            :key="index"
            :id="fullTabShow == index?'tabShow':''"
            class="tabTitle"
            @click="fullTabChange(item,index)"
          >{{item.title}}</li>
        </ul>
        <div class="tableOneBox" id="fullBoxShow">
          <table class="oneBoxDetail">
            <tr style="width:100%">
              <td style="width:4%">计数</td>
              <td style="width:8%">时间</td>
              <td style="width:8%">CEP</td>
              <td style="width:8%">椭圆倾角</td>
              <td style="width:8%">椭圆长半轴</td>
              <td style="width:8%">椭圆短半轴</td>
              <td style="width:8%">航向</td>
              <td style="width:8%">高度</td>
              <td style="width:8%">纬度</td>
              <td style="width:8%">经度</td>
              <td style="width:8%">传感器ID</td>
              <td style="width:8%">速度</td>
            </tr>
          </table>
          <div class="tableFirstBox">
            <table id="tbodyOneTracks">
              <tr v-for="(item,index) in fusionData" :key="index" style="width:101%">
                <td style="width:4%">{{item.Cnt}}</td>
                <td style="width:8%">{{item.Time}}</td>
                <td style="width:8%">{{Number(item.CEP).toFixed(2)}}</td>
                <td style="width:8%">{{Number(item.EllipseAngle).toFixed(2)}}</td>
                <td style="width:8%">{{Number(item.HalfLongAxis).toFixed(2)}}</td>
                <td style="width:8%">{{Number(item.HalfShortAxis).toFixed(2)}}</td>
                <td style="width:8%">{{item.Heading}}</td>
                <td style="width:8%">{{Number(item.Hei).toFixed(3)}}</td>
                <td style="width:8%">{{Number(item.Lat).toFixed(2)}}</td>
                <td style="width:8%">{{Number(item.Lon).toFixed(2)}}</td>
                <td style="width:8%">{{item.SensorsIdString}}</td>
                <td style="width:8%">{{item.Velocity}}</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="tableOneBox">
          <table class="oneBoxDetail">
            <tr>
              <td style="width:3%">计数</td>
              <td style="width:8%">时间</td>
              <td style="width:5%">传感器ID</td>
              <td style="width:5%">航迹类型</td>
              <td style="width:5%">传感器名称</td>
              <td style="width:5%">测向角</td>
              <td style="width:6%">测向误差</td>
              <td style="width:5%">椭圆倾角</td>
              <td style="width:4%">椭圆长半轴</td>
              <td style="width:4%">椭圆短半轴</td>
              <td style="width:4%">高度</td>
              <td style="width:6%">纬度</td>
              <td style="width:6%">经度</td>
              <td style="width:8%">侦察平台经度</td>
              <td style="width:8%">侦察平台维度</td>
              <td style="width:8%">侦察平台高度</td>
              <td style="width:4%">速度</td>
              <td style="width:4%">航向</td>
            </tr>
          </table>

          <div class="tableSecondBox">
            <table id="tbodyOneTracks">
              <tr v-for="(item,index) in original" :key="index">
                <td style="width:3%">{{item.Cnt}}</td>
                <td style="width:8%">{{item.Time}}</td>
                <td style="width:5%">{{item.sensorID}}</td>
                <td style="width:5%">{{item.TraceType}}</td>
                <td style="width:5%">{{item.sensorName}}</td>
                <td style="width:5%;overflow:hidden">{{Number(item.DOA).toFixed(1)}}</td>
                <td style="width:6%">{{item.DOASigma}}</td>
                <td style="width:5%">{{item.EllipseAngle}}</td>
                <td style="width:4%">{{item.HalfLongAxis}}</td>
                <td style="width:4%">{{item.HalfShortAxis}}</td>
                <td style="width:4%">{{Number(item.Hei).toFixed(2)}}</td>
                <td style="width:6%">{{Number(item.Lat).toFixed(2)}}</td>
                <td style="width:6%">{{Number(item.Lon).toFixed(2)}}</td>
                <td style="width:8%">{{item.PlatHei}}</td>
                <td style="width:8%">{{Number(item.PlatLat).toFixed(2)}}</td>
                <td style="width:8%">{{Number(item.PlatLon).toFixed(2)}}</td>
                <td style="width:4%">{{item.Velocity}}</td>
                <td style="width:4%">{{item.Heading}}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="tracks">
        <p class="tableTitle">侦察甘特图</p>
        <div id="Gant"></div>
      </div>
      <div class="tableThree">
        <p class="tableTitle">融合</p>
        <div id="RightBottomBox"></div>
      </div>
    </div>
  </div>
</template>

<script>
import loading from './loading'
export default {
  components: {
    loading
  },
  data() {
    return {
      width: "", //存放圆和椭圆盒子的宽
      height: "", //存放圆和椭圆盒子的高
      sensorArr: {}, //接收計算結果
      fusionLibs: [],
      tabShow: 0,  //选项卡默认第一个高亮
      fullTabShow: 0,
      milulationResult: '',  //保存仿真结果
      original: '', //表格原始结果
      chartData: '',  //折线图数据
      ellipseLong: '',//误差椭圆长轴显示
      ellipseShort: '',//误差椭圆短轴显示
      timeData: [], //折线图横轴数据
      testData: [], //折线图纵轴数据
      fusionData: [],//表格融合结果
      // dataIndex :'', //折线图所点击的下标
      myTab: [
        //选项卡
        { title: "融合数据" },
        { title: "数据" }
      ],
      fullTab: [
        //选项卡
        { title: "融合轨迹数据" },
        { title: "原始轨迹数据" }
      ],

      // 甘特
      tasks: [],  //甘特图数据
      gantt: '',//甘特渲染    
      ganttflag: true,

    };
  },

  created() {
    // this.milulationResult = JSON.parse(localStorage.getItem('miluResult'))
  },
  mounted() {
    if (this.$store.state.sessionObj) {
      this.sensorArr = this.$store.state.sessionObj
    }
    this.original = this.milulationResult.OriginalMixed  //表格原始轨迹数据
    this.chartData = this.milulationResult.FusionResult  //折线图数据（表格融合轨迹数据）
    this.fusionData = this.milulationResult.FusionResult  //表格融合轨迹数据
    this.serEchart()  //折线图的初始化

    this.width = document.querySelector(".ellipse").clientWidth;
    this.height = document.querySelector(".ellipse").clientHeight;
    this.ellipse(this.chartData[1]);

    //甘特
    // this.addGant(this.chartData[0]);

    //甘特
    this.$nextTick(() => {
      if (this.chartData.length > 0) { //甘特判断
        let Gant = this.chartData;
        this.addGant(Gant[0], Gant[Gant.length - 1]);  //初始化画甘特
        for (let i = 1; i < Gant.length; i++) {
          this.smartPic(Gant[i]);
        }
      }
    })

  },

  methods: {
    //选项卡变更
    tabChange(item, index) {
      this.tabShow = index
      var tabBox = document.getElementsByClassName("tabBox");
      for (var i = 0; i < tabBox.length; i++) {
        tabBox[i].id = "";
      }
      tabBox[index].id = "boxShow";
    },

    //融合轨迹数据和原始轨迹数据的切换
    fullTabChange(item, index) {
      this.fullTabShow = index
      var fullTabbOX = document.getElementsByClassName("tableOneBox");
      for (var i = 0; i < fullTabbOX.length; i++) {
        fullTabbOX[i].id = "";
      }
      fullTabbOX[index].id = "fullBoxShow";
    },


    //画椭圆
    ellipse(res) {
      var solidlong = this.width / 40
      // var solidshort = this.width / 40
      var long = ''
      var short = ''
      if (res.HalfLongAxis <= 20000) {
        long = res.HalfLongAxis / 1000 * solidlong;
        short = res.HalfShortAxis / 1000 * solidlong;
        this.ellipseLong = ""
        this.ellipseShort = ""
      } else if (res.HalfLongAxis > 20000) {
        this.ellipseLong = "长半轴 " + res.HalfLongAxis.toFixed(2) + 'm'
        this.ellipseShort = "短半轴 " + res.HalfShortAxis.toFixed(2) + 'm'
        // this.resAngle = "误差方向 " + res.res.EllipseAngle+ ''
        long = this.width * 3 / 8;
        var multiple = res.HalfLongAxis / long  //看一下长轴缩小了多少被倍，短轴也跟着缩小缩小多少倍
        short = res.HalfShortAxis / multiple
      }

      var angle = res.EllipseAngle;
      var canvas = document.getElementById("canvas");
      var ctx = canvas.getContext("2d");
      canvas.width = this.width;
      canvas.height = this.height;
      if (ctx.ellipse) {
        ctx.ellipse(this.width / 2 - 3, this.height / 2, long, short, (angle * Math.PI) / 180, 0, Math.PI * 2
        );
        ctx.fillStyle = this.colorC(res.HalfLongAxis / 1000);
        ctx.strokeStyle = "#ffffff";
        ctx.fill();
        ctx.stroke();
      } else {
        alert("no ellipse!");
      }
    },

    //椭圆跟圆的颜色变化
    colorC(res) {
      if (eval(17.5) < parseInt(res) && parseInt(res) <= eval(20)) {
        var color = "rgba(255, 217, 52, 0.3)";
        return color;
      } else if (eval(15) < parseInt(res) && parseInt(res) <= eval(17.5)) {
        var color = "rgba(255, 217, 52, 0.8)";
        return color;
      } else if (eval(12.5) < parseInt(res) && parseInt(res) <= eval(15)) {
        var color = "rgba(60, 232, 72, 0.3)";
        return color;
      } else if (eval(10) < parseInt(res) && parseInt(res) <= eval(12.5)) {
        var color = "rgba(60, 232, 72, 0.8)";
        return color;
      } else if (eval(7.5) < parseInt(res) && parseInt(res) <= eval(10)) {
        var color = " rgba(69, 182, 255, 0.3)";
        return color;
      } else if (eval(5) < parseInt(res) && parseInt(res) <= eval(7.5)) {
        var color = " rgba(69, 182, 255, 0.8)";
        return color;
      } else if (eval(2.5) < parseInt(res) && parseInt(res) <= eval(5)) {
        var color = "rgba(255, 25, 25, 0.2)";
        return color;
      } else if (0 < res && parseInt(res) <= eval(2.5)) {
        var color = "rgba(255, 25, 25, 0.8)";
        return color;
      } else if (eval(20) < parseInt(res)) {
        var color = "rgba(117, 119, 122, 0.5)";
        return color;
      }
    },

    //先将折线图渲染至DOM
    serEchart() {
      var _self = this
      for (var i = 0; i < this.chartData.length; i++) {
        this.timeData.push(this.chartData[i].Cnt)   //横轴数据
        this.testData.push(this.chartData[i].CEP)   //纵轴数据
      }

      let myChart = this.$echarts.init(
        document.getElementById("RightBottomBox")
      );

      this.difOption = {
        // backgroundColor: '#333',
        legend: {
          data: ["误差"],
          textStyle: {
            color: "#ffffff",
            fontSize: 14,
            fontFamily: "PingFangSC",
            fontWeight: 300
          }
        },
        grid: {
          top: 30,
          width: "84%",
          height: "70%"
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.timeData,
          axisTick: {
            inside: true,
            lineStyle: {
              color: "#10899A"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#06D3CD"
            }
          },
          axisLabel: {
            rotate: 0,
            color: "#06D3CD",
            fontFamily: "PingFangSC",
            fontSize: 13,
            fontWeight: 300,
            // interval: 5
          }
        },
        yAxis: {
          type: "value",
          name: "误差曲线/m",
          // max: ,
          splitNumber: 6,
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#06D3CD"
            }
          },
          axisTick: {
            lineStyle: {
              color: "#10899A"
            }
          },
          axisLabel: {
            showMaxLabel: false,
            color: "#06D3CD",
            fontFamily: "PingFangSC",
            fontSize: 14,
            fontWeight: 300
          }
        },
        series: [
          {
            name: "网点数",
            data: this.testData,
            type: "line",
            smooth: 0.4,
            symbolSize: 6,
            lineStyle: {
              color: "rgba(230, 169, 91, 0.6)",
              width: 1,
            },
            itemStyle: {
              borderWidth: 1,
              borderColor: "#FF5624"
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#FF5624"
                  },
                  {
                    offset: 1,
                    color: "rgba(8,228,222,0.3)"
                  }
                ])
              }
            }
          }
        ]
      };
      myChart.on('click', function (params) {
        _self.selectData(params.dataIndex)
      })
      myChart.setOption(this.difOption);
    },
    selectData(index) {   //点击折线图查找对应得数据并显示
      this.fusionData = [];
      this.fusionData.push(this.chartData[index]); //融合轨迹的表格变化
      this.ellipse(this.chartData[index])
    },
    //甘特图 颜色 SensorsIdString Time
    colorChange(y) {
      if (y == 1) {
        var color = "SUCCEEDED"
        return color;
      } else if (y == 2) {
        var color = "RUNNING"
        return color;
      } else if (y == 0) {
        var color = "KILLED"
        return color;
      }
    },
    addGant(res, end) {
      // window.gantt = this.gantt;

      // window.d3 = this.d3;
      //平台id分割
      var sensorId = res.SensorsIdString.split('|');
      sensorId = Array.from(new Set(sensorId));
      console.log(sensorId);

      var taskNames = [];
      if (sensorId.length == 0) taskNames = ["384A雷达-华阳礁 [18]", "815A电子侦察船 [20]", "运侦-8-贵阳 [51]"];
      for (var i in sensorId) {
        // var _name = `${res.sensorName} [${sensorId[i]}]`;
        taskNames.push(sensorId[i]);
      }

      for (let i = 0; i < sensorId.length; i++) {
        //封装甘特信息
        var objectSmart = {
          "startDate": new Date(res.Time),
          "endDate": new Date(res.Time),
          "taskName": sensorId[i],//平台id
          "status": this.colorChange(i),// 设置颜色
          "end": new Date(end.Time)
        }

        this.tasks.push(objectSmart);
      }


      var taskStatus = {
        "SUCCEEDED": "bar",
        "FAILED": "bar-failed",
        "RUNNING": "bar-running",
        "KILLED": "bar-killed"
      };




      var format = "%H:%M";

      if (this.ganttflag) {
        this.ganttflag = false;
        this.gantt = d3.gantt().taskTypes(taskNames).taskStatus(taskStatus).tickFormat(format);
        this.gantt(this.tasks);
        return;
      }
      // console.log(this.gantt);

      this.gantt.redraw(this.tasks);
    },

    smartPic(res) {
      // let gantt = this.gantt;
      // console.log("甘特图：", this.gantt);

      var taskflag = false;

      var sensorId = res.SensorsIdString.split('|');
      sensorId = Array.from(new Set(sensorId));

      for (let i in sensorId) {
        var startTime = new Date(res.Time);


        for (let l in this.tasks) {
          if (this.tasks[l].taskName == sensorId[i]) {
            if (startTime - this.tasks[l].endDate < 300000) {
              this.tasks[l].endDate = startTime;
              this.gantt.redraw(this.tasks);
              taskflag = true;
            }
          }
        }

        if (!taskflag) {
          var objectSmart = { //对象封装
            "startDate": startTime,
            "endDate": startTime,
            "taskName": sensorId[i],
            "status": this.colorChange(sensorId[i]),
          }
          var taskNames = this.gantt.taskTypes();
          taskNames.push(sensorId[i]);
          this.tasks.push(objectSmart);

          // gantt.taskTypes(taskNames)
          this.gantt.taskTypes(taskNames);
          this.gantt.redraw(this.tasks);  //渲染gant
        }
      }
    }

  },
  computed: {
    loading() {
      console.log(this.$store.state.loading);
      return this.$store.state.loading
    },
    miluResultData() {
      if (JSON.parse(localStorage.getItem('miluResult'))) {
        this.milulationResult = JSON.parse(localStorage.getItem('miluResult'))
        // alert('有值了')
        this.$store.state.loading -= 1   //使仿真计算结果等待loading图消失

      }
    }
  },
  watch: {
    miluResultData() {
      // console.log(JSON.parse(localStorage.getItem('miluResult')))
    }
  },
};
</script>

<style>
@import "../css/milulation";
/* @import "../css/gantt.css";  甘特css */

/* 甘特css */
/* html,body,#wrapper {
	width: 100%;
	height: 50%;
	margin: 0px;
} */

.chart {
  font-family: Arial, sans-serif;
  font-size: 12px;
  overflow: auto;
}

.axis path,
.axis line {
  fill: none;
  stroke: #06d3cd;
  shape-rendering: crispEdges;
}
.axis text {
  font-family: sans-serif;
  font-size: 11px;
  fill: #06d3cd;
}

.bar {
  fill: #33b5e5;
}

.bar-failed {
  fill: #cc0000;
}

.bar-running {
  fill: #669900;
}

.bar-succeeded {
  fill: #33b5e5;
}

.bar-killed {
  fill: #ffbb33;
}

#forkme_banner {
  display: block;
  position: absolute;
  top: 0;
  right: 10px;
  z-index: 10;
  padding: 10px 50px 10px 10px;
  color: #fff;
  background: #0090ff no-repeat 95% 50%;
  font-weight: 700;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  text-decoration: none;
}

#twittme_banner {
  display: block;
  position: absolute;
  top: 0;
  right: 180px;
  z-index: 10;
  padding: 10px 50px 10px 10px;
  color: #fff;
  background: #0090ff no-repeat 95% 50%;
  font-weight: 700;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  text-decoration: none;
}
/* -------------------还有没仿真数据返回时的弹出框------------ */
.popup {
  position: fixed;
  background-color: rgba(77, 76, 76, 0.35);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  /*  pointer-events: none; 此设置能使弹出层遮住的情况底下的点击事件仍能被点击有效 */
  /* pointer-events: none; */
  transition: all 0.3s;
}
/* 短轴 */
.ellipseShort {
  color: #ffffff;
  letter-spacing: 1px;
  position: absolute;
  top: 6%;
  left: 0%;
}
/* 长轴 */
.ellipseLong {
  color: #ffffff;
  letter-spacing: 1px;
  position: absolute;
  top: 2%;
  left: 0%;
}
</style>