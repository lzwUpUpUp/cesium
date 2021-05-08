<template>
  <div class="picPart">
    <div class="picPartLeft">
      <div class="partLeftTop">
        <a href="###">
          <!-- <router-link @click="deleteMag" to="tablePage" class="goBakcTable">返回</router-link> -->
          <div @click="deleteMag" class="goBakcTable">返回</div>
        </a>
        <!-- <select
          name
          id="targetChoose"
          onmousedown="if(this.options.lengtd>3){this.size=4}"
          onblur="this.size=1"
          onchange="this.size=1"
        >
          <option value disabled selected hidden>--请选择--</option>
          <option value="目标一" class="option">目标一</option>
          <option value="目标一" class="option">目标二</option>
        </select>-->
        <div class="tree well">
          <ul style="padding-left:20px;">
            <li>
              <span>
                <i class="icon-folder-open"></i> 目标名称
              </span>
              <a href="###" class="targetNumberCand">{{targetMsg.TargetName1}}</a>
              <ul>
                <li>
                  <span>
                    <i class="icon-minus-sign"></i> 批号Id
                  </span>
                  <a href class="tid">{{targetMsg.FusionID}}</a>
                </li>
                <li>
                  <span>
                    <i class="icon-minus-sign"></i>时间
                  </span>
                  <a href class="dataTime">{{targetMsg.TimeStamp}}</a>
                  <!-- <ul>
                                            <li>
                                                <span><i class="icon-leaf"></i> Grand Child</span> <a href="">Goes
                                                    somewhere</a>
                                            </li>
                  </ul>-->
                </li>
                <li>
                  <span>
                    <i class="icon-minus-sign"></i> 置信度
                  </span>
                  <a href class="confidence">{{targetMsg.Confidence1}}</a>
                </li>
                <li>
                  <span>
                    <i class="icon-minus-sign"></i> 侦察传感器
                  </span>
                  <a href class="sensorId">{{targetMsg.SensorName}}</a>
                </li>
                <li>
                  <span>
                    <i class="icon-minus-sign"></i> 协同手段
                  </span>
                  <a href class="nationality">{{targetMsg.SensorType}}</a>
                </li>
                <li>
                  <span>
                    <i class="icon-minus-sign"></i> 国别
                  </span>
                  <a href class="nationality">{{targetMsg.Nationality}}</a>
                </li>
                <li>
                  <span>
                    <i class="icon-minus-sign"></i> 身份
                  </span>
                  <a href class="nationality">{{targetMsg.Identify}}</a>
                </li>
                <li>
                  <span>
                    <i class="icon-minus-sign"></i> 环境
                  </span>
                  <a href class="nationality">{{targetMsg.Environment}}</a>
                </li>
                <li>
                  <span>
                    <i class="icon-minus-sign"></i> 经度
                  </span>
                  <a href class="lonT">{{Number(targetMsg.Lon).toFixed(2)}}</a>
                </li>
                <li>
                  <span>
                    <i class="icon-minus-sign"></i> 纬度
                  </span>
                  <a href class="latT">{{Number(targetMsg.Lat).toFixed(2)}}</a>
                </li>
                <li>
                  <span>
                    <i class="icon-minus-sign"></i> 高度
                  </span>
                  <a href class="heiT">{{Number(targetMsg.Hei).toFixed(2)}}</a>
                </li>
                <li>
                  <span>
                    <i class="icon-minus-sign"></i> CEP
                  </span>
                  <a href class="heiT">{{Number(targetMsg.CEP).toFixed(2)}}</a>
                </li>
                <li>
                  <span>
                    <i class="icon-minus-sign"></i>航速
                  </span>
                  <a href class="vel">{{Number(targetMsg.Vel).toFixed(2)}}</a>
                </li>
                <li>
                  <span>
                    <i class="icon-minus-sign"></i>航向
                  </span>
                  <a href class="heading">{{Number(targetMsg.Heading).toFixed(2)}}</a>
                </li>
                <li>
                  <span>
                    <i class="icon-minus-sign"></i>电子信号
                  </span>
                  <a href class="zp">{{targetMsg.ElnotNums}}</a>
                </li>
                <li>
                  <span>
                    <i class="icon-minus-sign"></i>通信信号
                  </span>
                  <a href class="rfsigType">{{targetMsg.RFSigNums}}</a>
                </li>
                <li>
                  <span>
                    <i class="icon-minus-sign"></i>敌我识别信号
                  </span>
                  <a href class="rfsigType">{{targetMsg.IFF}}</a>
                </li>
                <li>
                  <span>
                    <i class="icon-minus-sign"></i>疑似目标1
                  </span>
                  <a href class="beNumberCandl">{{targetMsg.TargetName2}}</a>
                </li>
                <li>
                  <span>
                    <i class="icon-minus-sign"></i>置信度1
                  </span>
                  <a href class="confidence1">{{targetMsg.Confidence2}}</a>
                </li>
                <li>
                  <span>
                    <i class="icon-minus-sign"></i>疑似目标2
                  </span>
                  <a href class="beNumberCand2">{{targetMsg.TargetName3}}</a>
                </li>
                <li>
                  <span>
                    <i class="icon-minus-sign"></i>置信度2
                  </span>
                  <a href class="confidence2">{{targetMsg.Confidence3}}</a>
                </li>
                <li>
                  <span>
                    <i class="icon-minus-sign"></i>误差椭圆长半轴
                  </span>
                  <a href class="halfLongAxis">{{targetMsg.HalfLongAxis}}</a>
                </li>
                <li>
                  <span>
                    <i class="icon-minus-sign"></i>误差椭圆短半轴
                  </span>
                  <a href class="HalfShortAxis">{{targetMsg.HalfShortAxis}}</a>
                </li>
                <li>
                  <span>
                    <i class="icon-minus-sign"></i>误差椭圆方向
                  </span>
                  <a href class="ellipseAngle">{{targetMsg.EllipseAngle}}</a>
                </li>
                <li>
                  <span>
                    <i class="icon-minus-sign"></i>首发信息
                  </span>
                  <a href class="ellipseAngle">{{targetMsg.FirstInfo}}</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div class="partLeftBottom">
        <ul id="partLeftBottomTitle">
          <!-- titleShow -->
          <li
            v-for="(item,index) in shapeTab"
            @click="tabOn(index) "
            :key="index"
            :class="{'titleShow':tabNum == index}"
          >
            <a href="###">{{item.title}}</a>
          </li>
        </ul>
        <!-- 椭圆盒子 -->
        <div class="picBox" id="picBoxShow">
          <div class="colorBox"></div>
          <div class="ellipse">
            <div class="ellipseLong">{{this.ellipseLong}}</div>
            <div class="ellipseShort">{{this.ellipseShort}}</div>
            <!-- <div class="resAngle">{{this.resAngle}}</div> -->
            <canvas id="canvas" style="display:block;margin:auto;width:100%;height:100%"></canvas>
          </div>
        </div>
        <!-- 圆盒子 -->
        <div class="picBox">
          <div class="colorBox"></div>
          <div class="circular">
            <div class="circleWidthTop">{{this.circleWidth}}</div>
            <div class="circleWidth">{{this.circleWidth}}</div>
            <canvas id="canCircular" style="display:block;margin:auto;width:100%;height:100%"></canvas>
          </div>
        </div>
        <div class="picBox picBoxSpecial">
          <div id="piePic"></div>
        </div>
      </div>
    </div>
    <div class="picPartRight">
      <div class="PartRightTop">
        <p>
          <span>数据</span>
        </p>
        <div class="RightTopBox">
          <table class="RightTopDetail" style="width:200%">
            <tr>
              <td style="width:2%">批号id</td>
              <td style="width:4%">时间</td>
              <td style="width:4%">类型</td>
              <td style="width:2%">传感器id</td>
              <td style="width:4%">传感器名称</td>
              <td style="width:2%">侦察手段</td>
              <td style="width:2%">经度</td>
              <td style="width:2%">纬度</td>
              <td style="width:3%">高度(m)</td>
              <td style="width:3%">航速(km/s)</td>
              <td style="width:2%">航向</td>
              <td style="width:4%">测向角</td>
              <td style="width:4%">测向误差</td>
              <td style="width:4%">CEP误差</td>
              <td style="width:3%">敌我识别码</td>
              <td style="width:3%">频率(MHz)</td>
              <td style="width:4%">调制类型</td>
              <td style="width:4%">带宽(kHz)</td>
              <td style="width:4%">脉宽(us</td>
              <td style="width:4%">脉周(us)</td>
              <td style="width:2%">国别</td>
              <td style="width:2%">身份</td>
              <td style="width:2%">环境</td>
              <td style="width:4%">疑似目标1</td>
              <td style="width:4%">置信度1</td>
              <td style="width:4%">疑似目标2</td>
              <td style="width:4%">置信度2</td>
              <td style="width:4%">疑似目标3</td>
              <td style="width:4%">置信度3</td>
            </tr>
          </table>
          <div
            class="tableFourBox"
            style="overflow-x: hidden;
                   overflow-y: scroll;
                   width: 200%;
                   height: 88%;
                   color: #ffffff;"
          >
            <table id="tbodyFour" style="width:100%;">
              <tr v-for="(item,index) in tableData" :key="index">
                <td style="width:2%">{{item.TID}}</td>
                <td style="width:4%">{{item.TimeStamp}}</td>
                <td style="width:4%">{{item.TraceType}}</td>
                <td style="width:2%">{{item.SensorID}}</td>
                <td style="width:4%">{{item.SensorName}}</td>
                <td style="width:2%">{{item.SensorType}}</td>
                <td style="width:2%">{{Number(item.Lon).toFixed(2)}}</td>
                <td style="width:2%">{{Number(item.Lat).toFixed(2)}}</td>
                <td style="width:3%">{{Number(item.Hei).toFixed(2)}}</td>
                <td style="width:3%">{{Number(item.Vel).toFixed(2)}}</td>
                <td style="width:2%">{{Number(item.Heading).toFixed(2)}}</td>
                <td style="width:4%">{{item.DOA}}</td>
                <td style="width:4%">{{item.DOASigma}}</td>
                <td style="width:4%">{{Number(item.cep).toFixed(2)}}</td>
                <td style="width:3%">{{item.IFF}}</td>
                <td style="width:3%">{{item.CenterFreq}}</td>
                <td style="width:4%">{{item.SigType}}</td>
                <td style="width:4%">{{item.BandWidth}}</td>
                <td style="width:4%">{{item.PulseWidth}}</td>
                <td style="width:4%">{{item.PulsePeriod}}</td>
                <td style="width:2%">{{item.Nationality}}</td>
                <td style="width:2%">{{item.Identify}}</td>
                <td style="width:2%">{{item.Environment}}</td>
                <td style="width:4%">{{item.TargetName1}}</td>
                <td style="width:4%">{{item.Confidence1}}</td>
                <td style="width:4%">{{item.TargetName2}}</td>
                <td style="width:4%">{{item.Confidence2}}</td>
                <td style="width:4%">{{item.TargetName3}}</td>
                <td style="width:4%">{{item.Confidence3}}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="PartRightMiddle">
        <p>
          <span>协同关系图</span>
        </p>
        <!-- <div id="RightMiddleBox"></div> -->
        <div id="Gant"></div>
      </div>
      <div class="PartRightBottom">
        <p>
          <span>误差曲线图</span>
        </p>
        <div id="RightBottomBox"></div>
      </div>
    </div>
  </div>
</template>

<script>
// import Echarts from 'echart'
import gloablUrl from "../Url/url"; //后台请求接口

export default {
  name: "picPage",
  data() {
    return {
      width: "", //存放圆和椭圆盒子的宽
      height: "", //存放圆和椭圆盒子的高
      echartflag: 1, //判断是否初始化折线图
      difTime: "",//用来存放三个小时的时间
      targetMsg: {},
      timeData: [], //误差曲线图的X轴数据
      testData: [], //误差曲线图的y轴数据
      difOption: "", //误差曲线图
      start: '',//曲线图开始时间
      circleWidth: '', //超过20KM之后显示具体长度
      tabNum: 0,
      ellipseLong: '',//误差椭圆长轴显示
      ellipseShort: '',//误差椭圆短轴显示
      resAngle: '', //误差椭圆误差方向
      setTime: '',  //定时器
      tableData: [], //表格数据
      shapeTab: [
        { title: "椭圆误差" },
        { title: "圆概率偏差" },
        { title: "持续追踪情况" }
      ],
      id: "", //用来与后台交互的id
      time: "", //和时间
      seriesData: [],  //存放初始终止时间数据
      // 甘特
      gantflag: 1,// 判断是否初始化甘特图
      tasks: [],  //甘特图数据
      gantt: '',//甘特渲染    
      ganttflag: true,
      // gantt: window.laydate,
    };
  },

  mounted() {
    this.width = document.querySelector(".ellipse").clientWidth;
    this.height = document.querySelector(".ellipse").clientHeight;

    this.serEchart(); //渲染折线图
    this.id = this.$route.params.tid || this.$route.query.tid;
    this.time = this.$route.params.time || this.$route.query.time;
    this.allData(); //请求所有数据
    this.setTime = setInterval(() => {
      this.allData();
    }, 4000);
  },
  methods: {
    tabOn(index) {
      //左侧中部选项卡,点击高亮
      this.tabNum = index;
      this.picBox = document.getElementsByClassName("picBox");
      for (var i = 0; i < this.picBox.length; i++) {
        this.picBox[i].id = "";
      }
      this.picBox[index].id = "picBoxShow";
    },

    //数据请求
    allData() {
      this.$axios({
        typr: "get",
        url: gloablUrl.URL.testUrl + "/index/getTargetId?fusionId=" + this.id
      }).then(res => {

        this.tableData = res.data.data.originalTarget; // 表格数据
        this.targetMsg = res.data.data.rightDataInfo; //树形数据、折线图数据
        this.ellipse(res.data.data.rightDataInfo); // 椭圆
        if (res.data.data.rightDataInfo !== 0 && this.echartflag == '1') {
          console.log(this.targetMsg);
          var echart = res.data.data.rightDataInfo;
          this.echartInit(echart);  //初始化折线图
          this.echartflag = 2
        } else if (this.echartflag == '2') {
          var echart = res.data.data.rightDataInfo;
          // for (let i = 0; i < echart.length; i++) {
          //   //开始第二次画折线图
          //   this.difEchartMsg(echart[i].cep, new Date(echart[i].TimeStamp).getTime());
          // }
          //开始第二次画折线图
          this.difEchartMsg(echart.CEP, new Date(echart.TimeStamp).getTime());
        }

        //甘特
        if (res.data.data.originalTarget !== 0 && this.gantflag == '1') { //甘特判断
          let Gant = res.data.data.originalTarget;
          this.addGant(Gant[0]);  //初始化画甘特
          for (let i = 1; i < Gant.length; i++) {
            this.smartPic(Gant[i]);
          }
          this.gantflag = 2;
        } else {
          let Gant = res.data.data.originalTarget;
          for (let i = 0; i < Gant.length; i++) {
            this.smartPic(Gant[i])
          }
        }
      });
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
        this.ellipseLong = "长半轴 " + res.HalfLongAxis + 'm'
        this.ellipseShort = "短半轴 " + res.HalfShortAxis + 'm'
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

    //画圆
    circle(res) {
      var canvas = document.getElementById("canCircular");
      var ctx = canvas.getContext("2d");
      canvas.width = this.width;
      canvas.height = this.height;
      var solidWidth = this.width / 40
      var selectColor = res;
      var widthC = ''
      if (res <= 20000) {
        this.circleWidth = ''
        widthC = res / 1000 * solidWidth;
      } else if (res > 20000) {
        this.circleWidth = res.toFixed(2) + 'm'
        widthC = this.width * 3 / 8;
      }
      //  var heightC = widthC * 1.2
      if (ctx.arc) {
        ctx.arc(this.width / 2 - 3, this.height / 2, widthC, 0, Math.PI * 2);
        ctx.fillStyle = this.colorC(selectColor / 1000);
        ctx.strokeStyle = "#ffffff";
        ctx.fill();
        ctx.stroke();
      } else {
        alert("no arc!");
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


    formatTime(i) {
      if (i < 10) {
        i = "0" + i;
        return i;
      }
      return i;
    },

    //初始化折线图
    echartInit(res) {
      //请求当前目标的误差值
      this.diftime = new Date(res.TimeStamp)   //中国标准时间

      this.start = this.diftime.getTime();    //时间戳
      //三小时分为4部分
      //第一部分
      var Firsthours = this.diftime.getHours()
      var Firstminutes = this.formatTime(this.diftime.getMinutes())
      var firstTime = Firsthours + ":" + Firstminutes;
      //第二部分
      // var Secondthis = new Date(new Date(res.TimeStamp).getTime() + 1000 * 60 * 45)
      var Secondthis = new Date(new Date(res.TimeStamp).getTime() + 1000 * 60 * 2)
      var Secondhours = Secondthis.getHours()
      var Secondtminutes = this.formatTime(Secondthis.getMinutes())
      var SecondTime = Secondhours + ":" + Secondtminutes;

      //第三部分
      // var Thirdthis = new Date(new Date(res.TimeStamp).getTime() + 1000 * 60 * 90)
      var Thirdthis = new Date(new Date(res.TimeStamp).getTime() + 1000 * 60 * 4)
      var Thirdhours = Thirdthis.getHours()
      var Thirdminutes = this.formatTime(Thirdthis.getMinutes())
      var ThirdTime = Thirdhours + ":" + Thirdminutes;
      //第四部分
      // var Fourthis = new Date(new Date(res.TimeStamp).getTime() + 1000 * 60 * 135)
      var Fourthis = new Date(new Date(res.TimeStamp).getTime() + 1000 * 60 * 6)
      var Fourhours = Fourthis.getHours()
      var Fourminutes = this.formatTime(Fourthis.getMinutes())
      var FourTime = Fourhours + ":" + Fourminutes;

      //第五部分
      // var Firethis = new Date(new Date(res.TimeStamp).getTime() + 1000 * 60 * 180)
      var Firethis = new Date(new Date(res.TimeStamp).getTime() + 1000 * 60 * 8)
      var Firehours = Firethis.getHours()
      var Fireminutes = this.formatTime(Firethis.getMinutes())
      var FireTime = Firehours + ":" + Fireminutes;


      //第六部分
      var sixthis = new Date(new Date(res.TimeStamp).getTime() + 1000 * 60 * 10)
      var sixhours = sixthis.getHours()
      var sixminutes = this.formatTime(sixthis.getMinutes())
      var sixTime = sixhours + ":" + sixminutes;


      this.timeData.push(firstTime)

      for (var i = 0; i < 19; i++) {   //10分钟的,两分钟为一段，6秒为一个间隔
        this.timeData.push("")
      }


      this.timeData.push(SecondTime)

      for (var i = 0; i < 19; i++) {
        this.timeData.push("")
      }
      this.timeData.push(ThirdTime)

      for (var i = 0; i < 19; i++) {
        this.timeData.push("")
      }
      this.timeData.push(FourTime)

      for (var i = 0; i < 19; i++) {
        this.timeData.push("")
      }
      this.timeData.push(FireTime)
      for (var i = 0; i < 19; i++) {
        this.timeData.push("")
      }
      this.timeData.push(sixTime)
      this.testData.push(res.CEP)

      let myChart = this.$echarts.init(
        document.getElementById("RightBottomBox")
      );

      myChart.setOption(this.difOption);
      this.circle(res.cep)//画圆
    },

    //第二次画折线图
    difEchartMsg(res, time) {
      // if (this.start - 10000 <= time && time <= this.start + 10000) {
      //   this.testData.push(res)
      //   let myChart = this.$echarts.init(
      //     document.getElementById("RightBottomBox")
      //   );
      //   myChart.setOption(this.difOption);
      //   this.start = this.start + 60000;
      // }
      if (time - this.start >= 6000) {   //如果要改成10分钟的，，间隔为6秒，将60000改成6000
        var num = Math.round((time - this.start) / 6000)  //四舍五入
        for (var i = 0; i < num; i++) {
          this.testData.push(res)
        }

        let myChart = this.$echarts.init(
          document.getElementById("RightBottomBox")
        );
        myChart.setOption(this.difOption);
        this.start = time
        this.circle(res)//画圆
      }
    },

    //先将折线图渲染至DOM
    serEchart() {
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
            interval: 0
          }
        },
        yAxis: {
          type: "value",
          name: "误差大小/m",
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
              color: "transparent"
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

      myChart.setOption(this.difOption);
    },

    //点击返回键清除数据
    deleteMag() {
      clearInterval(this.setTime);  //清除定时器
      this.echartflag = 1;  //初始化判断回归1
      //得用清空数组的方法去清空testData,timeData,否则echart不会重新渲染
      this.testData.splice(0, this.testData.length)
      this.timeData.splice(0, this.timeData.length)
      //清空完之后在渲染一次误差图，实现清空误差曲线
      let myChart = this.$echarts.init(
        document.getElementById("RightBottomBox")
      );
      myChart.setOption(this.difOption);
      this.tableData = []  // 清除表格数据
      this.targetMsg = [] //和树形图数据

      this.$router.push({
        name: 'tablePage',
      })
    },

    //甘特图 颜色
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
    addGant(res) {
      // window.gantt = this.gantt;

      // window.d3 = this.d3;
      //平台id分割
      var sensorId = res.SensorID.split('|');
      var taskNames = [];
      if (sensorId.length == 0) taskNames = ["384A雷达-华阳礁 [18]", "815A电子侦察船 [20]", "运侦-8-贵阳 [51]"];
      for (var i in sensorId) {
        var _name = `${res.SensorName} [${sensorId[i]}]`;
        taskNames.push(_name);
      }


      //封装甘特信息
      var objectSmart = {
        "startDate": new Date(res.TimeStamp),
        "endDate": new Date(res.TimeStamp),
        "taskName": taskNames[0],//平台id
        "status": this.colorChange(1),// 设置颜色
      }
      this.tasks.push(objectSmart);

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

      var sensorId = res.SensorID.split('|');


      for (let i in sensorId) {
        var startTime = new Date(res.TimeStamp);
        
        var _name = `${res.SensorName} [${sensorId[i]}]`;


        for (let l in this.tasks) {
          if (this.tasks[l].taskName == _name) {
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
            "taskName": _name,
            "status": this.colorChange(_name),
          }
          var taskNames = this.gantt.taskTypes();
          taskNames.push(_name);
          this.tasks.push(objectSmart);

          // gantt.taskTypes(taskNames)
          this.gantt.taskTypes(taskNames);
          this.gantt.redraw(this.tasks);  //渲染gant
        }
      }
    }
  }
};
</script>

<style>
@import "../css/tree.css";
@import "../css/gantt.css";
a {
  text-decoration: none;
}
.picPart {
  width: 100%;
  height: 100%;
  padding-top: 10px;
  /* display: none; */
  position: absolute;
  background-color: #020317;
  box-sizing: border-box;
}
.picPart .picPartLeft {
  width: 28%;
  height: 100%;
  float: left;
}
.partLeftTop {
  width: 100%;
  height: 49%;
  /* background-image: url("../images/imgs/组\ 10@2x\(2\).png");
    background-size: 100% 100%; */
  background-color: rgba(83, 135, 214, 0.2);
  margin-bottom: 10px;
  background-image: url("../images/imgs/biankuang.png");
  background-size: 100% 100%;
}
.partLeftTop .well {
  width: 95%;
  height: 88%;
  overflow: auto;
  margin-left: 8px;
}
.partLeftTop .well::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.partLeftTop .well::-webkit-scrollbar-track {
  background: rgb(122, 122, 122);
  border-radius: 2px;
}

.partLeftTop .well::-webkit-scrollbar-thumb {
  background: rgb(205, 206, 207);
  border-radius: 10px;
}
.partLeftTop .well::-webkit-scrollbar-thumb:hover {
  background: #f8f8f8;
}

.partLeftTop .well::-webkit-scrollbar-corner {
  background: #434b43;
}
.partLeftBottom {
  width: 100%;
  height: 49%;
  background-image: url("../images/imgs/biankuang.png");
  background-size: 100% 100%;
  background-color: rgba(83, 135, 214, 0.2);
  position: relative;
  overflow: hidden;
}
.goBakcTable {
  display: inline-block;
  width: 88px;
  height: 24px;
  margin-left: 10px;
  line-height: 24px;
  text-align: center;
  color: #ffffff;
  border: 1px solid #5268af;
  background-color: rgba(199, 199, 199, 0.1);
  margin-top: 4px;
}

#targetChoose {
  border: 1px solid #5268af;
  background-color: rgba(199, 199, 199, 0.1);
  /* height: 24px; */
  padding-left: 2px;
  color: #ffffff;
  margin-left: 8px;
  margin-top: 4px;
  position: absolute;
  padding-bottom: 4px;
  padding-top: 2px;
}
#targetChoose option {
  background-color: rgb(143, 140, 140);
  padding-top: 2px;
  padding-bottom: 2px;
}
#targetChoose::-webkit-scrollbar-track {
  background: rgb(122, 122, 122);
  border-radius: 2px;
}

#targetChoose::-webkit-scrollbar-thumb {
  background: #bfbfbf;
  border-radius: 10px;
}

#targetChoose::-webkit-scrollbar-thumb:hover {
  background: #f8f8f8;
}

#targetChoose::-webkit-scrollbar-corner {
  background: #434b43;
}
.well {
  width: 100%;
  height: 90%;
  /* background-color: pink; */
  margin-top: 8px;
  color: #ffffff;
}
.well a {
  color: #ffffff;
}
#partLeftBottomTitle {
  width: 90%;
  height: 30px;
  margin-top: 8px;
  margin-left: 20px;
  margin-bottom: 2px;
  border-bottom: 1px solid #727171;
}
#partLeftBottomTitle li {
  list-style: none;
  float: left;
  width: 32%;
  text-align: center;
  font-size: 12px;
  line-height: 28px;
}
#partLeftBottomTitle li a {
  color: #ffffff;
}
#partLeftBottomTitle .titleShow {
  border-bottom: 2px solid #ffffff;
}
.picBox {
  width: 100%;
  height: 90%;
  /* display: none; */
  position: absolute;
  top: 100%;
}
.picBox:nth-child(3) {
  /* background-image: url("../images/imgs/坐标轴.png");
    background-size: 84% 84%;
    background-repeat: no-repeat;
    background-position: right; */
}
.picBox:nth-child(2) {
  /* background-image: url("../images/imgs/坐标轴.png"); */
  /* background-size: 84% 84%;
    background-position: right;
    background-repeat: no-repeat; */
}
.ellipse {
  width: 80%;
  height: 100%;
  float: left;
  background-image: url("../images/imgs/ellipse.png");
  background-size: 100% 99%;
  background-repeat: no-repeat;
  margin-left: 8%;
}
.colorBox {
  width: 10%;
  height: 100%;
  background-image: url("../images/imgs/colorBox.png");
  float: left;
  background-size: 100% 80%;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  left: 10px;
}
.circular {
  width: 80%;
  height: 100%;
  float: left;
  background-image: url("../images/imgs/ellipse.png");
  background-size: 100% 99%;
  background-repeat: no-repeat;
  margin-left: 8%;
  position: relative;
}
/* 短轴 */
.ellipseShort {
  color: #ffffff;
  letter-spacing: 1px;
  position: absolute;
  top: 6%;
  left: 18%;
}
/* 长轴 */
.ellipseLong {
  color: #ffffff;
  letter-spacing: 1px;
  position: absolute;
  top: 2%;
  left: 18%;
}
.resAngle {
  color: #ffffff;
  letter-spacing: 1px;
  position: absolute;
  top: 10%;
  left: 18%;
}
.circleWidth {
  position: absolute;
  top: 48%;
  color: #ffffff;
  right: 6%;
}
.circleWidthTop {
  position: absolute;
  top: 6%;
  color: #ffffff;
  right: 44%;
}
#picBoxShow {
  top: 10%;
  /* bottom: */
}
#piePic {
  width: 100%;
  height: 100%;
}
.picPart .picPartRight {
  width: 70%;
  height: 100%;
  margin-left: 14px;
  float: left;
}
.PartRightTop {
  width: 100%;
  height: 32%;
  margin-bottom: 10px;
  /* background-color: pink; */
  background-color: rgba(83, 135, 214, 0.2);
  background-image: url("../images/imgs/biankuang.png");
  background-size: 100% 100%;
}
.PartRightTop p {
  color: #ffffff;
  width: 96%;
  margin-left: 11px;
  border-bottom: 1px solid #727171;
  height: 26px;
}
.PartRightTop p span {
  color: #ffffff;
  width: 40px;
  border-bottom: 2px solid #ffffff;
  height: 26px;
  line-height: 26px;
  display: inline-block;
  text-align: center;
}
.RightTopBox {
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
.RightTopBox::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.RightTopBox::-webkit-scrollbar-track {
  /* background: rgb(212, 211, 211); */
  background: rgb(122, 122, 122);
  border-radius: 2px;
}

.RightTopBox::-webkit-scrollbar-thumb {
  /* background: rgb(205, 206, 207); */
  background: rgb(205, 206, 207);
  border-radius: 10px;
}

.RightTopBox::-webkit-scrollbar-thumb:hover {
  /* background: #f8f8f8; */
  background: #f8f8f8;
}

.RightTopBox::-webkit-scrollbar-corner {
  /* background: #434b43; */
  background: #f8f8f8;
}
.tableFourBox::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.tableFourBox::-webkit-scrollbar-track {
  /* background: rgb(212, 211, 211); */
  background: rgb(122, 122, 122);
  border-radius: 2px;
}

.tableFourBox::-webkit-scrollbar-thumb {
  /* background: rgb(205, 206, 207); */
  background: rgb(205, 206, 207);
  border-radius: 10px;
}

.tableFourBox::-webkit-scrollbar-thumb:hover {
  /* background: #f8f8f8; */
  background: #f8f8f8;
}

.tableFourBox::-webkit-scrollbar-corner {
  /* background: #434b43; */
  background: #f8f8f8;
}
.RightTopDetail {
  /* height: 8%; */
  width: 240%;
  padding-right: 8px;
  /* border-collapse: collapse; */
}
.RightTopDetail thead tr th {
  border: 1px solid #a9a9a9;
  text-align: center;
  height: 26px;
  background-color: rgba(199, 199, 199, 0.1);
  font-size: 15px;
  /* padding-left: 6px;
    padding-right: 6px; */
}
.RightTopDetail td {
  border: 1px solid #a9a9a9;
  text-align: center;
  height: 24px;
  font-size: 14px;
  /* padding-left: 6px;
    padding-right: 6px; */
}
#tbodyFour td {
  border: 1px solid #a9a9a9;
  text-align: center;
  height: 24px;
  font-size: 14px;
  /* padding-left: 6px;
    padding-right: 6px; */
}
#tbodyFour tr:nth-child(2n) {
  background-color: rgba(199, 199, 199, 0.1);
  /* background-color: #1D264F; */
}
.RightTopDetail {
  background-color: rgba(199, 199, 199, 0.1);
}
.PartRightMiddle {
  width: 100%;
  height: 32%;
  margin-bottom: 11px;
  background-color: rgba(83, 135, 214, 0.2);
  background-image: url("../images/imgs/biankuang.png");
  background-size: 100% 100%;
  position: relative;
}
.PartRightMiddle p {
  color: #ffffff;
  width: 96%;
  margin-left: 11px;
  border-bottom: 1px solid #727171;
  height: 26px;
}
.PartRightMiddle p span {
  color: #ffffff;
  width: 100px;
  border-bottom: 2px solid #ffffff;
  height: 26px;
  line-height: 26px;
  display: inline-block;
  text-align: center;
}
#Gant {
  width: 98%;
  /* width: 92%; */
  height: 80%;
  box-sizing: border-box;
  padding-top: 30px;
  padding-bottom: 4px;
  overflow: auto;
  color: #ffffff;
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
#RightMiddleBox {
  width: 85%;
  height: 80%;
  box-sizing: border-box;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 4px;
  padding-bottom: 4px;
  overflow: auto;
  color: #ffffff;
  /* background-color: pink; */
  position: absolute;
  /* top: -12%; */
  left: 6%;
}
.RightMiddleBox::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.RightMiddleBox::-webkit-scrollbar-track {
  background: rgb(212, 211, 211);
  border-radius: 2px;
}

.RightMiddleBox::-webkit-scrollbar-thumb {
  background: rgb(205, 206, 207);
  border-radius: 10px;
}

.RightMiddleBox::-webkit-scrollbar-thumb:hover {
  background: #f8f8f8;
}

.RightMiddleBox::-webkit-scrollbar-corner {
  background: #434b43;
}
.PartRightBottom {
  width: 100%;
  height: 32%;
  background-color: rgba(83, 135, 214, 0.2);
  background-image: url("../images/imgs/biankuang.png");
  background-size: 100% 100%;
}
.PartRightBottom::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.PartRightBottom::-webkit-scrollbar-track {
  background: rgb(212, 211, 211);
  border-radius: 2px;
}

.PartRightBottom::-webkit-scrollbar-thumb {
  background: rgb(205, 206, 207);
  border-radius: 10px;
}

.PartRightBottom::-webkit-scrollbar-thumb:hover {
  background: #f8f8f8;
}

.PartRightBottom::-webkit-scrollbar-corner {
  background: #434b43;
}
.PartRightBottom p {
  color: #ffffff;
  width: 96%;
  margin-left: 11px;
  border-bottom: 1px solid #727171;
  height: 26px;
}
.PartRightBottom p span {
  color: #ffffff;
  width: 84px;
  border-bottom: 2px solid #ffffff;
  height: 26px;
  line-height: 26px;
  display: inline-block;
  text-align: center;
}
#RightBottomBox {
  width: 100%;
  height: 88%;
  box-sizing: border-box;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 4px;
  padding-bottom: 4px;
  overflow: auto;
  color: #ffffff;
  /* background-color: pink; */
}
.RightMiddleBox::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.RightMiddleBox::-webkit-scrollbar-track {
  background: rgb(212, 211, 211);
  border-radius: 2px;
}

.RightMiddleBox::-webkit-scrollbar-thumb {
  background: rgb(205, 206, 207);
  border-radius: 10px;
}

.RightMiddleBox::-webkit-scrollbar-thumb:hover {
  background: #f8f8f8;
}

.RightMiddleBox::-webkit-scrollbar-corner {
  background: #434b43;
}
.RightMiddleBox {
  width: 100%;
  height: 32%;
  background-color: rgba(83, 135, 214, 0.2);
  background-image: url("../images/imgs/biankuang.png");
  background-size: 100% 100%;
}
.RightMiddleBox::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.RightMiddleBox::-webkit-scrollbar-track {
  background: rgb(212, 211, 211);
  border-radius: 2px;
}

.RightMiddleBox::-webkit-scrollbar-thumb {
  background: rgb(205, 206, 207);
  border-radius: 10px;
}

.RightMiddleBox::-webkit-scrollbar-thumb:hover {
  background: #f8f8f8;
}

.RightMiddleBox::-webkit-scrollbar-corner {
  background: #434b43;
}
</style>