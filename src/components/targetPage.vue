<template>
  <div class="targetPart">
    <!--提醒弹窗  -->
    <div id="paintBox" ref="paintBox"></div>
    <!-- ----------新增------------ -->
    <div class="increase" ref="increaseBox">
      <p class="increase-title">新增</p>
      <p class="weapon">
        <span>目标名称 :</span> &nbsp;
        <input type="text" v-model="intargetName" />
      </p>
      <p class="weapon">
        <span>国际 :</span> &nbsp;
        <input type="text" v-model="inNationality" />
      </p>
      <!-- <p class="weapon">
        <span>目标编号 :</span> &nbsp;
        <input type="text" v-model="inbeNumber" onfocus="this.blur()"   />
      </p>-->
      <p class="weapon">
        <span>平台内码 :</span> &nbsp;
        <input type="text" v-model="inptnm" />
      </p>
      <p class="weapon">
        <span>目标优先级 :</span> &nbsp;
        <select name id v-model="edpriority">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
        </select>
      </p>
      <p class="weapon">
        <span>威胁度 :</span> &nbsp;
        <input type v-model="indanderLevel" />
      </p>
      <p class="weapon">
        <span>符号环境 :</span> &nbsp;
        <input type v-model="insymbolEnvironmentInt" />
      </p>
      <p class="weapon">
        <span>目标分类 :</span> &nbsp;
        <input type v-model="intargetClassifiationInt" />
      </p>
      <p class="weapon">
        <span>目标身份 :</span> &nbsp;
        <input type v-model="insymbolldentifyInt" />
      </p>
      <p class="weapon">
        <span>最大速度 :</span> &nbsp;
        <input type v-model="invelMax" />
      </p>
      <p class="weapon">
        <span>最高高度 :</span> &nbsp;
        <input type v-model="inheiMax" />
      </p>
      <p class="weapon">
        <span>电子特性 :</span> &nbsp;
        <input type v-model="ineLSignals" />
      </p>
      <p class="weapon">
        <span>通信特性 :</span> &nbsp;
        <input type v-model="inrFSignals" />
      </p>
      <span @click="inSure" class="inSure">确认</span>
      <span @click="inCancel" class="inCancel">取消</span>
    </div>
    <!-- -------------编辑---------- -->
    <div class="edit" ref="editBox">
      <p class="edit-title">修改</p>
      <!-- <p class="weapon">
        <span>目标ID :</span> &nbsp;
        <input type="text" v-model="edrowid" onfocus="this.blur()" />
      </p>-->
      <p class="weapon">
        <span>目标名称 :</span> &nbsp;
        <input type="text" v-model="edtargetName" />
      </p>
      <p class="weapon">
        <span>国际 :</span> &nbsp;
        <input type="text" v-model="edNationality" />
      </p>
      <p class="weapon">
        <span>目标编号 :</span> &nbsp;
        <input type="text" v-model="edbeNumber" onfocus="this.blur()" />
      </p>
      <p class="weapon">
        <span>平台内码 :</span> &nbsp;
        <input type="text" v-model="edptnm" />
      </p>
      <p class="weapon">
        <span>目标优先级 :</span> &nbsp;
        <!-- <input type v-model="edpriority" /> -->
        <select name id v-model="edpriority">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
        </select>
      </p>
      <p class="weapon">
        <span>威胁程度 :</span> &nbsp;
        <input type v-model="eddanderLevel" />
      </p>
      <p class="weapon">
        <span>符号环境 :</span> &nbsp;
        <input type v-model="edsymbolEnvironmentInt" />
      </p>
      <p class="weapon">
        <span>目标分类 :</span> &nbsp;
        <input type v-model="edtargetClassifiationInt" />
      </p>
      <p class="weapon">
        <span>目标身份 :</span> &nbsp;
        <input type v-model="edsymbolldentifyInt" />
      </p>
      <p class="weapon">
        <span>最大速度 :</span> &nbsp;
        <input type v-model="edvelMax" />
      </p>
      <p class="weapon">
        <span>最高高度 :</span> &nbsp;
        <input type v-model="edheiMax" />
      </p>
      <p class="weapon">
        <span>电子特性 :</span> &nbsp;
        <input type v-model="edeLSignals" />
      </p>
      <p class="weapon">
        <span>通信特性 :</span> &nbsp;
        <input type v-model="edrFSignals" />
      </p>
      <span @click="edSure" class="edSure">确认</span>
      <span @click="edCancel" class="edCancel">取消</span>
    </div>
    <div class="tableSearch">
      <div class="targetBack backTablePage" @click="boxShow">新增</div>
    </div>
    <div class="targetPartOne">
      <p class="targetTitle">目标库</p>
      <div class="targetFirstBox">
        <table class="allTargetBox">
          <thead>
            <tr>
              <th>目标名称</th>
              <th>国际</th>
              <th>目标编号</th>
              <th>平台内码</th>
              <th>目标优先级</th>
              <th>威胁度</th>
              <th>符号环境</th>
              <th>目标分类</th>
              <th>目标身份</th>
              <th>最大速度</th>
              <th>最大高度</th>
              <th>电子特性</th>
              <th>通信特性</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody id="targetTbodyOne">
            <tr
              v-for="(item , index ) in targetData"
              :key="index"
              :class="[item.tid]"
              :id="num== index ? 'tbodyClickTwo' :''"
              @dblclick="getDatail(item,index)"
            >
              <td>{{item.TargetName}}</td>
              <td>{{item.Nationality}}</td>
              <td>{{item.BENumber}}</td>
              <td>{{item.PTNM}}</td>
              <td>{{item.Priority}}</td>
              <td>{{item.DanderLevel}}</td>
              <td>{{item.SymbolEnvironmentInt}}</td>
              <td>{{item.TargetClassifiationInt}}</td>
              <td>{{item.SymbolldentifyInt}}</td>
              <td>{{Number(item.VelMax).toFixed(2)}}</td>
              <td>{{Number(item.HeiMax).toFixed(2)}}</td>
              <td  :title = item.ELSignals>{{item.ELSignals}}</td>
              <td :title = item.RFSignals >{{item.RFSignals}}</td>
              <td>
                <span id="editSensor" @click="editTarget(item,index)">编辑</span>
                <span id="deleteSensor" @click="deleteTarget(item,index)">删除</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="targetPartTwo">
      <p class="targetTitle">雷达特性表</p>
      <div class="targetSecondBox">
        <table class="targetDetailFirst">
          <thead>
            <tr>
              <th>雷达编号</th>
              <th>雷达名称</th>
              <th>雷达类型</th>
              <th>最小载频</th>
              <th>最大载频</th>
              <th>载频类型</th>
              <th>最小重周</th>
              <th>最大重周</th>
              <th>重周类型</th>
              <th>最小脉宽</th>
              <th>最大脉宽</th>
              <th>最小扫描速率</th>
              <th>最大扫描速率</th>
              <th>扫描方式</th>
            </tr>
          </thead>
          <tbody id="targetTbodyTwo">
            <tr v-for="(item , index ) in radarData" :key="index" :class="[item.id]">
              <td>{{item.radarNumber}}</td>
              <td>{{item.radarName}}</td>
              <td>{{item.radarType}}</td>
              <td>{{item.rfMin}}</td>
              <td>{{item.rfMax}}</td>
              <td>{{item.rfType}}</td>
              <td>{{item.priMin}}</td>
              <td>{{item.priMax}}</td>
              <td>{{item.priType}}</td>
              <td>{{item.pulseWidthMin}}</td>
              <td>{{item.pulseWidthMax}}</td>
              <td>{{item.scanningMin}}</td>
              <td>{{item.scanningMax}}</td>
              <td>{{item.scanningType}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="targetPartThree">
      <p class="targetTitle">通信特性表</p>
      <div class="targetThirdBox">
        <table class="targetDetailSecond">
          <thead>
            <tr>
              <th>信号类型</th>
              <th>带宽</th>
              <th>偏振极化模</th>
              <th>上行/下行</th>
              <th>信号频率</th>
              <th>调制方式</th>
              <th>调制速率</th>
            </tr>
          </thead>
          <tbody id="targetTbodyThree">
            <tr v-for="(item , index ) in communicationData" :key="index" :class="[item.id]">
              <td>{{item.rfsig}}</td>
              <td>{{item.bandWidth}}</td>
              <td>{{item.polarizeMode}}</td>
              <td>{{item.upOrDown}}</td>
              <td>{{item.rf}}</td>
              <td>{{item.debugeType}}</td>
              <td>{{item.debugeRate}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="targetPartFour">
      <p class="targetTitle">敌我识别表</p>
      <div class="targetFouthBox">
        <table class="targetDetailThird">
          <thead>
            <tr>
              <th>国别</th>
              <th>3A码</th>
              <th>地址码</th>
              <th>呼号</th>
              <th>机尾号</th>
            </tr>
          </thead>
          <tbody id="targetTbodyFour">
            <tr v-for="(item , index ) in enemy" :key="index" :class="[item.id]">
              <td>{{item.nationality}}</td>
              <td>{{item.threeA}}</td>
              <td>{{item.addressCode}}</td>
              <td>{{item.callNum}}</td>
              <td>{{item.tail}}</td>
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
      targetData: [], //总目标数据
      radarData: [], //雷达数据
      communicationData: [], //通信数据
      enemy: [],//敌我数据

      // 新增
      intargetName: '',                //目标名称
      inNationality: '',                      //国际
      inbeNumber: '',                         //目标编号
      inptnm: '',                             //平台内码
      inpriority: 1,                         //目标优先级
      indanderLevel: '',                 //威胁度
      insymbolEnvironmentInt: '',             //符号环境
      intargetClassifiationInt: '',           //目标分类
      insymbolldentifyInt: '',                //目标身份
      invelMax: '',                            //最大速度
      inheiMax: '',                              //最大高度
      ineLSignals: '',                            //电子特性
      inrFSignals: '',                           //通信特性

      // 编辑
      edrowid: '',              //目标Id
      edtargetName: '',                //目标名称
      edNationality: '',                      //国际
      edbeNumber: '',                         //目标编号
      edptnm: '',                             //平台内码
      edpriority: '',                         //目标优先级
      eddanderLevel: '',                 //威胁度
      edsymbolEnvironmentInt: '',             //符号环境
      edtargetClassifiationInt: '',           //目标分类
      edsymbolldentifyInt: '',                //目标身份
      edvelMax: '',                            //最大速度
      edheiMax: '',                              //最大高度
      edeLSignals: '',                            //电子特性
      edrFSignals: '',                           //通信特性

    };
  },

  mounted() {
    this.targetPart(); //数据请求
  },

  methods: {
    targetPart() {
      this.$axios({
        typr: "get",
        url: gloablUrl.URL.testUrl + "/index/targets"
      }).then(res => {
        this.targetData = res.data.data;
      });
    },

    //双击将目标的tid传给后端 ,拿取雷达特性表，通信特性表，敌我识别表
    getDatail(item, index) {
      this.num = index;
      var tid = item.tid;
      // this.$axios({
      //   typr: "get",
      //   url: gloablUrl.URL.testUrl + "/getTargetDetail",
      //   data: "tid=" + tid
      // }).then(res => {
      //   console.log(res);
      //   this.radarData = res.data.data.radarCharacteristicsList; //雷达数据
      //   this.communicationData = res.data.data.rfsigCharacteristicsList; //通信数据
      //   this.enemy = res.data.data.identifyCharacteristicsList; //敌我数据
      // });
    },


    //编辑单个传感器
    editTarget(item, index) {
      this.$refs.editBox.style.display = "block"
      // input赋值
      this.edrowid = item.rowid
      this.edtargetName = item.TargetName
      this.edNationality = item.Nationality
      this.edbeNumber = item.BENumber
      this.edptnm = item.PTNM
      this.edpriority = item.Priority
      this.eddanderLevel = item.DanderLevel
      this.edsymbolEnvironmentInt = item.SymbolEnvironmentInt
      this.edtargetClassifiationInt = item.TargetClassifiationInt
      this.edsymbolldentifyInt = item.SymbolldentifyInt
      this.edvelMax = item.VelMax
      this.edheiMax = item.HeiMax
      this.edeLSignals = item.ELSignals
      this.edrFSignals = item.RFSignals
    },



    //编辑确认按钮
    edSure() {
      // input取值
      let rowid = this.edrowid                   //目标序号
      let targetName = this.edtargetName                   //目标名称
      let Nationality = this.edNationality                     //国际
      let beNumber = this.edbeNumber                        //目标编号
      let ptnm = this.edptnm                             //平台内码
      let priority = this.edpriority                      //目标优先级
      let danderLevel = this.eddanderLevel                  //威胁度
      let symbolEnvironmentInt = this.edsymbolEnvironmentInt           //符号环境
      let targetClassifiationInt = this.edtargetClassifiationInt          //目标分类
      let symbolldentifyInt = this.edsymbolldentifyInt                //目标身份
      let velMax = this.edvelMax                               //最大速度
      let heiMax = this.edheiMax                              //最大高度
      let eLSignals = this.edeLSignals                           //电子特性
      let rFSignals = this.edrFSignals                           //通信特性
      let url = gloablUrl.URL.testUrl + "/index/saveTarget";


      axios
        .post(url, {
         beNumber,  //目标编码
         targetName,
         Nationality,
         ptnm,
         priority,
         danderLevel,
         symbolEnvironmentInt,
         targetClassifiationInt,
         symbolldentifyInt,
         velMax,
         heiMax,
         eLSignals,
         rFSignals,
        })
        .then(res => {
          this.$refs.editBox.style.display = "none"
          this.targetPart(); //数据刷新
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
          url: gloablUrl.URL.testUrl + "/index/deletTarget?rowId=" + item.BENumber
        }).then(res => {
          this.targetPart(); //数据刷新
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
      // input取值
      // let rowid = this.edrowid                   //目标名称
      let targetName = this.intargetName                   //目标名称
      let Nationality = this.inNationality                     //国际
      let beNumber = this.inbeNumber                        //目标编号
      let ptnm = this.inptnm                             //平台内码
      let priority = this.inpriority                      //目标优先级
      let danderLevel = this.indanderLevel                  //威胁度
      let symbolEnvironmentInt = this.insymbolEnvironmentInt           //符号环境
      let targetClassifiationInt = this.intargetClassifiationInt          //目标分类
      let symbolldentifyInt = this.insymbolldentifyInt                //目标身份
      let velMax = this.invelMax                               //最大速度
      let heiMax = this.inheiMax                              //最大高度
      let eLSignals = this.ineLSignals                           //电子特性
      let rFSignals = this.inrFSignals                           //通信特性
      let url = gloablUrl.URL.testUrl + "/index/saveTarget";


      axios
        .post(url, {
          beNumber,
          targetName,
          Nationality,
          ptnm,
          priority,
          danderLevel,
          symbolEnvironmentInt,
          targetClassifiationInt,
          symbolldentifyInt,
          velMax,
          heiMax,
          eLSignals,
          rFSignals,
        })
        .then(res => {
          this.$refs.increaseBox.style.display = "none"
          this.targetPart(); //数据刷新
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

  }
};
</script>

<style >
.targetPart {
  width: 100%;
  height: 100%;
  /* display: none; */
  position: absolute;
  background-color: #020317;
}
#tbodyClickTwo {
  background-color: rgba(199, 199, 199, 0.5);
}

/* 新增窗口 */
.increase {
  width: 580px;
  height: 568px;
  background-color: #191c25;
  position: absolute;
  left: 35%;
  top: 20%;
  display: none;
  z-index: 1000;
}
.increase-title {
  color: #ffffff;
  font-size: 18px;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 2px;
}
.inSure {
  position: absolute;
  display: inline-block;
  width: 60px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #ffffff;
  letter-spacing: 3px;
  left: 35%;
  bottom: 6%;
  cursor: pointer;
  border: 1px solid #ffffff;
  border-radius: 4px;
}
.inCancel {
  position: absolute;
  display: inline-block;
  width: 60px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #ffffff;
  letter-spacing: 3px;
  right: 35%;
  bottom: 6%;
  cursor: pointer;
  border: 1px solid #ffffff;
  border-radius: 4px;
}
/* 修改窗口 */
.edit {
  width: 580px;
  height: 568px;
  background-color: #191c25;
  position: absolute;
  left: 35%;
  top: 20%;
  display: none;
  z-index: 1000;
}
.edit-title {
  color: #ffffff;
  font-size: 18px;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 2px;
}
.edSure {
  position: absolute;
  display: inline-block;
  width: 60px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #ffffff;
  letter-spacing: 3px;
  left: 35%;
  bottom: 6%;
  cursor: pointer;
  border: 1px solid #ffffff;
  border-radius: 4px;
}
.edCancel {
  position: absolute;
  display: inline-block;
  width: 60px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #ffffff;
  letter-spacing: 3px;
  right: 35%;
  bottom: 6%;
  cursor: pointer;
  border: 1px solid #ffffff;
  border-radius: 4px;
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

.tableSearch {
  width: 100%;
  height: 6%;
  /* background-color: pink; */
  position: relative;
}
.targetBack {
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
.targetPartOne {
  width: 98%;
  height: 22%;
  /* background-color: rgba(31, 44, 102,0.5); */
  position: relative;
  left: 1%;
  /* margin-top: 0.6%; */
  /* background-color: rgba(148, 145, 145, 0.2); */
  background-color: rgba(83, 135, 214, 0.2);
  background-image: url("../images/imgs/biankuang.png");
  background-size: 100% 100%;
}
.targetPartTwo {
  width: 98%;
  height: 22%;
  /* background-color: rgba(31, 44, 102,0.5); */
  left: 1%;
  position: relative;
  margin-top: 0.6%;
  background-color: rgba(83, 135, 214, 0.2);
  background-image: url("../images/imgs/biankuang.png");
  background-size: 100% 100%;
}
.targetPartThree {
  width: 98%;
  height: 22%;
  position: relative;
  margin-top: 0.6%;
  left: 1%;
  background-color: rgba(83, 135, 214, 0.2);
  background-image: url("../images/imgs/biankuang.png");
  background-size: 100% 100%;
}
.targetPartFour {
  width: 98%;
  height: 22%;
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
.targetFirstBox {
  width: 100%;
  height: 86%;
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
.targetFirstBox::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.targetFirstBox::-webkit-scrollbar-track {
  background: rgb(122, 122, 122);
  border-radius: 2px;
}

.targetFirstBox::-webkit-scrollbar-thumb {
  background: rgb(205, 206, 207);
  border-radius: 10px;
}

.targetFirstBox::-webkit-scrollbar-thumb:hover {
  background: #f8f8f8;
}

.targetFirstBox::-webkit-scrollbar-corner {
  background: #434b43;
}

.allTargetBox {
  /* height: 8%; */
  width: 100%;
  border-collapse: collapse;
  /* table内容过长，自动换行 */
  table-layout: fixed;
  word-break: break-all;
}
.allTargetBox thead tr th {
  border: 1px solid #a9a9a9;
  text-align: center;
  height: 26px;
  background-color: rgba(199, 199, 199, 0.1);
  font-size: 15px;
}
.allTargetBox tbody {
  /* display: inline-block;
   
    height: 100px;
    overflow-y: scroll; */
}

.allTargetBox td {
  border: 1px solid #a9a9a9;
  text-align: center;
  height: 24px;
  font-size: 14px;
}
.allTargetBox tr:nth-child(2n) {
  background-color: rgba(199, 199, 199, 0.1);
  /* background-color: #1D264F; */
}
.targetSecondBox {
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
.targetSecondBox::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.targetSecondBox::-webkit-scrollbar-track {
  background: rgb(122, 122, 122);
  border-radius: 2px;
}

.targetSecondBox::-webkit-scrollbar-thumb {
  background: rgb(205, 206, 207);
  border-radius: 10px;
}

.targetSecondBox::-webkit-scrollbar-thumb:hover {
  background: #f8f8f8;
}

.targetSecondBox::-webkit-scrollbar-corner {
  background: #434b43;
}
.targetDetailFirst {
  height: 8%;
  width: 100%;
  border-collapse: collapse;
}
.targetDetailFirst thead tr th {
  border: 1px solid #a9a9a9;
  text-align: center;
  height: 26px;
  background-color: rgba(199, 199, 199, 0.1);
  font-size: 15px;
}
.targetDetailFirst td {
  border: 1px solid #a9a9a9;
  text-align: center;
  height: 24px;
  font-size: 14px;
}
.targetDetailFirst tr:nth-child(2n) {
  background-color: rgba(199, 199, 199, 0.1);
  /* background-color: #1D264F; */
}
.targetThirdBox {
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
.targetThirdBox::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.targetThirdBox::-webkit-scrollbar-track {
  background: rgb(122, 122, 122);
  border-radius: 2px;
}

.targetThirdBox::-webkit-scrollbar-thumb {
  background: rgb(205, 206, 207);
  border-radius: 10px;
}

.targetThirdBox::-webkit-scrollbar-thumb:hover {
  background: #f8f8f8;
}

.targetThirdBox::-webkit-scrollbar-corner {
  background: #434b43;
}
.targetDetailSecond {
  height: 8%;
  width: 100%;
  border-collapse: collapse;
}
.targetDetailSecond thead tr th {
  border: 1px solid #a9a9a9;
  text-align: center;
  height: 26px;
  background-color: rgba(199, 199, 199, 0.1);
  font-size: 15px;
}
.targetDetailSecond td {
  border: 1px solid #a9a9a9;
  text-align: center;
  height: 24px;
  font-size: 14px;
}
.targetDetailSecond tr:nth-child(2n) {
  background-color: rgba(199, 199, 199, 0.1);
  /* background-color: #1D264F; */
}
#targetDetailSecond {
  background-color: rgba(199, 199, 199, 0.5);
}

.targetFouthBox {
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
.targetFouthBox::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.targetFouthBox::-webkit-scrollbar-track {
  background: rgb(122, 122, 122);
  border-radius: 2px;
}

.targetFouthBox::-webkit-scrollbar-thumb {
  background: rgb(205, 206, 207);
  border-radius: 10px;
}

.targetFouthBox::-webkit-scrollbar-thumb:hover {
  background: #f8f8f8;
}

.targetFouthBox::-webkit-scrollbar-corner {
  background: #434b43;
}
.targetDetailThird {
  height: 8%;
  width: 100%;
  border-collapse: collapse;
}
.targetDetailThird thead tr th {
  border: 1px solid #a9a9a9;
  text-align: center;
  height: 26px;
  background-color: rgba(199, 199, 199, 0.1);
  font-size: 15px;
}
.targetDetailThird td {
  border: 1px solid #a9a9a9;
  text-align: center;
  height: 24px;
  font-size: 14px;
}
.targetDetailThird tr:nth-child(2n) {
  background-color: rgba(199, 199, 199, 0.1);
  /* background-color: #1D264F; */
}
#targetDetailThird {
  background-color: rgba(199, 199, 199, 0.5);
}

#targetTbodyOne td{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
  width: 124px;
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