<template>
  <div class="rulesPart">
            <div class="tableSearch">
                <div class="rulesBack backTablePage">返回</div>
            </div>
            <div class="rulesPartOne">
                <p class="rulesTitle">规则库</p>
                <div class="rulesFirstBox">
                    <table class="allRulesBox">
                        <thead>
                            <tr>
                                <th>目标名称</th>
                                <th>目标编号</th>
                                <th>目标类别</th>
                                <th>目标类型</th>
                                <th>国别</th>
                                <th>威胁程度</th>
                                <th>最大速度</th>
                            </tr>
                        </thead>
                        <tbody id="targetTbodyOne">

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
      armsData: [] //武器库地方数据
    };
  },

  mounted() {
    this.armsPart(); //数据请求
  },

  methods: {
    armsPart() {
      this.$axios({
        typr: "get",
        url: gloablUrl.URL.testUrl + "/getSysWeaponsAttack"
      }).then(res => {
        console.log(res);
        this.armsData = res.data.data;
      });
    }
  }
};
</script>

<style>
.rulesPart{
    width: 100%;
    height: 100%;
    /* display: none; */
    position: absolute;
     background-color: #020317;

 }
 .rulesBack{
    width: 100%;
    height: 6%;
    /* background-color: pink; */
    position: relative;
 }
 .rulesBack{
       width: 70px;
       height: 25px;
       background-image: url('../images/imgs/2.png');
       background-size: 100% 100%;
       color: #ffffff;
       line-height: 25px;
       font-size: 15px;
       letter-spacing: 2px;
       text-align: center;
       position: absolute;
       right: 4%;
       top: 2%;
       
       cursor: pointer;
 }
 
 .rulesPartOne{
      width: 98%;
      height: 93%;
      /* background-color: rgba(31, 44, 102,0.5); */
      position: relative;
      left: 1%;
      top: 6%;
      /* margin-top: 0.6%; */
      /* background-color: rgba(148, 145, 145, 0.2); */
      background-color: rgba(83, 135, 214, 0.2);
      background-image: url("../images/imgs/biankuang.png");
      background-size: 100% 100%;
 }
 
 .rulesTitle{
     color: #ffffff;
     font-size: 16px;
     letter-spacing: 2px;
     margin-left: 12px;
     margin-bottom: 4px;
     letter-spacing: 1px;
     margin-top: 2px;
     border-bottom: 1px solid #bdbdbd;
 }
 .rulesFirstBox{
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
 .rulesFirstBox::-webkit-scrollbar {
     width: 6px;
     height:6px;
 
 }
 
 .rulesFirstBox::-webkit-scrollbar-track {
     background: rgb(122, 122, 122);
     border-radius: 2px;
 }
 
 .rulesFirstBox::-webkit-scrollbar-thumb {
    background: rgb(205, 206, 207);
    border-radius: 10px;
 }
 
 .rulesFirstBox::-webkit-scrollbar-thumb:hover {
    background: #f8f8f8;
 }
 
 .rulesFirstBox::-webkit-scrollbar-corner {
    background: #434b43;
 }
 
 .allRulesBox{
/* height: 8%; */
    width: 100%;
    border-collapse: collapse;   

 }
 .allRulesBox thead tr th{
    border: 1px solid #a9a9a9;
    text-align: center;
    height: 26px;
    background-color: rgba(199, 199, 199, 0.1);
    font-size: 15px;
 }
 .allRulesBox tbody{
 /* display: inline-block;
 
 height: 100px;
 overflow-y: scroll; */
 }
 
 .allRulesBox td{
    border: 1px solid #a9a9a9;
    text-align: center;
    height: 24px;
    font-size: 14px;
 }
 .allRulesBox tr:nth-child(2n){
    background-color: rgba(199, 199, 199, 0.1)
   /* background-color: #1D264F; */
 
 }
</style>