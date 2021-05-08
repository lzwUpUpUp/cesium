<template>
  <div class="armsPart">
    <!--提醒弹窗  -->
    <div id="paintBox" ref="paintBox"></div>
    <div class="tableSearch">
      <div class="armsBack backTablePage" @click="boxShow">新增</div>
    </div>
    <div class="armsPartOne">
      <div class="increase" ref="increaseBox">
        <!-- ---------------新增------------------ -->
        <p class="increase-title">新增</p>
        <p class="weapon">
          <span>武器ID :</span> &nbsp;
          <input type="text" v-model="inweaponID" />
        </p>
        <p class="weapon">
          <span>武器名称 :</span> &nbsp;
          <input type="text" v-model="inweaponName" />
        </p>
        <p class="weapon">
          <span>攻击最小距离 :</span> &nbsp;
          <input type="text" v-model="indisMin" /> /km
        </p>
        <p class="weapon">
          <span>攻击最大距离 :</span> &nbsp;
          <input type="text" v-model="indisMax" />/km
        </p>
        <p class="weapon">
          <span>时间精度要求 :</span> &nbsp;
          <input type v-model="intimePrecesion" /> /s
        </p>
        <p class="weapon">
          <span>置信度要求 :</span> &nbsp;
          <input type v-model="inprobability" />
        </p>
        <p class="weapon">
          <span>距离精度要求 :</span> &nbsp;
          <input type v-model="indisPrecesion" />
        </p>
        <p class="weapon">
          <span>是否可以对空 :</span> &nbsp;
          <input type="checkbox" v-model="intoAirFlag" style="margin-top:4px" />
        </p>
        <p class="weapon">
          <span>是否可以对海 :</span> &nbsp;
          <input type="checkbox" v-model="intoSeaFlag" style="margin-top:4px" />
        </p>
        <span @click="inSure" class="inSure">确认</span>
        <span @click="inCancel" class="inCancel">取消</span>
      </div>
      <!-- ---------------编辑------------------ -->
      <div class="edit" ref="editBox">
        <p class="edit-title" ref="editBox">修改</p>
        <!-- <p class="weapon">
          <span>武器编码:</span> &nbsp;
          <input type="text" onfocus="this.blur()" v-model="derowid"  />
        </p>-->
        <p class="weapon">
          <span>武器ID :</span> &nbsp;
          <input type="text" v-model="deweaponID" onfocus="this.blur()" />
        </p>
        <p class="weapon">
          <span>武器名称 :</span>&nbsp;
          <input type="text" v-model="deweaponName" />
        </p>
        <p class="weapon">
          <span>攻击最小距离 :</span>&nbsp;
          <input type="text" v-model="dedisMin" /> /km
        </p>
        <p class="weapon">
          <span>攻击最大距离 :</span> &nbsp;
          <input type v-model="dedisMax" /> /km
        </p>
        <p class="weapon">
          <span>时间精度要求 :</span> &nbsp;
          <input type v-model="detimePrecesion" /> /s
        </p>
        <p class="weapon">
          <span>置信度要求 :</span> &nbsp;
          <input type v-model="deprobability" />
        </p>
        <p class="weapon">
          <span>距离精度要求 :</span>&nbsp;
          <input type v-model="dedisPrecesion" />
        </p>
        <p class="weapon">
          <span>是否可以对空 :</span> &nbsp;
          <input type="checkbox" v-model="detoAirFlag" style="margin-top:4px" />
        </p>
        <p class="weapon">
          <span>是否可以对海 :</span> &nbsp;
          <input type="checkbox" v-model="detoSeaFlag" style="margin-top:4px" />
        </p>
        <span @click="edSure" class="edSure">确认</span>
        <span @click="edCancel" class="edCancel">取消</span>
      </div>
      <p class="armsTitle">武器库</p>
      <div class="armsBox">
        <table class="allArmsBox">
          <thead>
            <tr>
              <th>编号</th>
              <th>武器名称</th>
              <th>武器ID</th>
              <th>攻击最小距离/km</th>
              <th>攻击最大距离/km</th>
              <th>是否可以对空</th>
              <th>是否可以对海</th>
              <th>时间精度要求/s</th>
              <th>距离精度要求</th>
              <th>置信度要求</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody id="sensorTbodyOne">
            <tr v-for="(item , index ) in armsData" :key="index" :class="[item.platId]">
              <td>{{item.rowid}}</td>
              <td>{{item.WeaponName}}</td>
              <td>{{item.WeaponID}}</td>
              <td>{{item.DisMin}}</td>
              <td>{{item.DisMax}}</td>
              <td>{{item.ToAirFlag = 1 ? "是":"否"}}</td>
              <td>{{item.ToSeaFlag = 1 ? "是":"否"}}</td>
              <td>{{item.TimePrecesion}}</td>
              <td>{{item.DisPrecesion}}</td>
              <td>{{item.Probability}}</td>
              <td>
                <span id="editSensor" @click="editWeapon(item,index)">编辑</span>
                <span id="deleteSensor" @click="deleteWeapon(item,index)">删除</span>
              </td>
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
      armsData: [], //武器库地方数据
      // 新增
      inweaponID: '',  //新增 武器ID
      inweaponName: '',//新增 武器名称
      indisMin: '',//新增 攻击最小距离
      indisMax: '',//新增 攻击最大距离
      indisMax: '',//新增 武器ID
      intimePrecesion: '',//新增时间精度要求
      inprobability: '',//新增置信度要求
      indisPrecesion: '',//新增距离精度要求
      intoSeaFlag: '', //是否可以对海
      intoAirFlag: '', //是否可以对空

      // 编辑
      derowid: '',//武器编码
      deweaponID: '',  //编辑 武器ID
      deweaponName: '',//编辑 武器名称
      dedisMin: '',//编辑 攻击最小距离
      dedisMax: '',//编辑 攻击最大距离
      detimePrecesion: '',//编辑时间精度要求
      deprobability: '',//编辑置信度要求
      dedisPrecesion: '',//编辑距离精度要求
      detoSeaFlag: '', //是否可以对海
      detoAirFlag: '', //是否可以对空
    };
  },

  mounted() {
    this.armsPart(); //数据请求
  },

  methods: {
    armsPart() {
      this.$axios({
        typr: "get",
        url: gloablUrl.URL.testUrl + "/index/getWeapon"
      }).then(res => {
        console.log(res);
        this.armsData = res.data.data;
      });
    },

    // 新增页面出现
    boxShow() {
      this.$refs.increaseBox.style.display = "block"
    },

    //编辑单个传感器信息
    editWeapon(item, index) {
      this.$refs.editBox.style.display = "block"
      // input赋值
      // this.derowid = item.rowid
      this.deweaponID = item.WeaponID
      this.deweaponName = item.WeaponsName
      this.dedisMin = item.DisMin
      this.dedisMax = item.DisMax
      this.detimePrecesion = item.ToSeaFlag
      this.deprobability = item.Probability
      this.dedisPrecesion = item.DisPrecesion
      this.detoSeaFlag = item.ToAirFlag
      this.detoAirFlag = item.ToAirFlag

    },

    // 删除单个武器
    deleteWeapon(item, index) {
      var sure = confirm('确认删除此传感器？')
      if (sure == true) {
        this.$axios({
          typr: "get",
          url: gloablUrl.URL.testUrl + "/index/deleteWeapon?rowId=" + item.WeaponID
        }).then(res => {
          this.armsPart(); //数据刷新
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



    //编辑确认按钮
    edSure() {
      // input取值
      let rowid = this.derowid                              //武器编码
      let weaponName = this.deweaponName                    //武器名称
      let weaponID = this.deweaponID                  //武器ID
      let disMin = this.dedisMin                              //攻击最小距离
      let disMax = this.dedisMax                              //攻击最大距离
      let toAirFlag;                             //是否可以对空
      let toSeaFlag;                              //是否可以对海
      let timePrecesion = this.detimePrecesion                          //时间精度要求
      let disPrecesion = this.dedisPrecesion                         //距离精度要求
      let probability = this.deprobability   //置信度要求
      let url = gloablUrl.URL.testUrl + "/index/saveWeapon";

      axios
        .post(url, {
          rowid,
          weaponName,
          weaponID,
          disMin,
          disMax,
          toAirFlag,
          toSeaFlag,
          timePrecesion,
          disPrecesion,
          probability,
        })
        .then(res => {
          this.$refs.editBox.style.display = "none"
          this.armsPart(); //数据刷新
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
    //新增确定按钮
    inSure() {
      let toAirFlag;                             //是否可以对空
      let toSeaFlag;                             //是否可以对海
      if (this.intoAirFlag) {
        toAirFlag = 1
      } else {
        toAirFlag = 2
      }

      if (this.intoSeaFlag) {
        toSeaFlag = 1
      } else {
        toSeaFlag = 2
      }
      // input取值
      let weaponName = this.inweaponName                    //武器名称
      let weaponID = this.inweaponID                  //武器ID
      let disMin = this.indisMin                              //攻击最小距离
      let disMax = this.indisMax                              //攻击最大距离
      let timePrecesion = this.intimePrecesion                          //时间精度要求
      let disPrecesion = this.indisPrecesion                         //距离精度要求
      let probability = this.inprobability   //置信度要求
      let url = gloablUrl.URL.testUrl + "/index/saveWeapon";

      axios
        .post(url, {
          weaponName,
          weaponID,
          disMin,
          disMax,
          toAirFlag,
          toSeaFlag,
          timePrecesion,
          disPrecesion,
          probability,
        })
        .then(res => {
          this.armsPart(); //数据刷新
          this.$refs.increaseBox.style.display = "none"
          if (res.data.status == 1) {  //请求成功
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

<style>
.armsPart {
  width: 100%;
  height: 100%;
  /* display: none; */
  position: absolute;
  /* top: 100%; */
  background-color: #020317;
}
.tableSearch {
  width: 100%;
  height: 6%;
  /* background-color: pink; */
  position: relative;
}
.armsBack {
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

.armsPartOne {
  width: 98%;
  height: 93%;
  /* background-color: rgba(31, 44, 102,0.5); */
  position: relative;
  left: 1%;
  /* margin-top: 0.6%; */
  /* background-color: rgba(148, 145, 145, 0.2); */
  background-color: rgba(83, 135, 214, 0.2);
  background-image: url("../images/imgs/biankuang.png");
  background-size: 100% 100%;
}
/* 新增窗口 */
.increase {
  width: 580px;
  height: 414px;
  background-color: #191c25;
  position: absolute;
  left: 35%;
  top: 20%;
  display: none;
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
  height: 414px;
  background-color: #191c25;
  position: absolute;
  left: 35%;
  top: 20%;
  display: none;
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

.armsTitle {
  color: #ffffff;
  font-size: 16px;
  letter-spacing: 2px;
  margin-left: 12px;
  margin-bottom: 4px;
  letter-spacing: 1px;
  margin-top: 2px;
  border-bottom: 1px solid #bdbdbd;
}
.armsBox {
  width: 100%;
  height: 97%;
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
.armsBox::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.armsBox::-webkit-scrollbar-track {
  background: rgb(122, 122, 122);
  border-radius: 2px;
}

.armsBox::-webkit-scrollbar-thumb {
  background: rgb(205, 206, 207);
  border-radius: 10px;
}

.armsBox::-webkit-scrollbar-thumb:hover {
  background: #f8f8f8;
}

.armsBox::-webkit-scrollbar-corner {
  background: #434b43;
}

.allArmsBox {
  /* height: 8%; */
  width: 100%;
  border-collapse: collapse;
}
.allArmsBox thead tr th {
  border: 1px solid #a9a9a9;
  text-align: center;
  height: 26px;
  background-color: rgba(199, 199, 199, 0.1);
  font-size: 15px;
}
.allArmsBox tbody {
  /* display: inline-block;

height: 100px;
overflow-y: scroll; */
}

.allArmsBox td {
  border: 1px solid #a9a9a9;
  text-align: center;
  height: 24px;
  font-size: 14px;
}
.allArmsBox tr:nth-child(2n) {
  background-color: rgba(199, 199, 199, 0.1);
  /* background-color: #1D264F; */
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