<script src="../main.js"></script>
<template>
  <div class="loginBody">
    <div class="Box" id="temp">
      <input type="text" name id="userName" placeholder="请输入账号" v-model="userName" />
      <input type="password" name id="userPassword" placeholder="请输入密码" v-model="passWord" />
      <div class="intoPage" @click="getInto()">登录</div>
    </div>
  </div>
</template>

<script>
import gloablUrl from "../Url/url";
export default {
  data() {
    return {
      userName: "", //用户名
      passWord: "", //用户密码
      token: "" //判断字段
    };
  },
  created() {
    var _this = this;
    document.onkeydown = function(e) {
      e = window.event || e;
      if (e.code == "Enter" || e.code == "Num Enter") {
        _this.getInto();
      }
    };
  },
  methods: {
    getInto() {
      if (this.passWord == "" || this.userName == "") {
        alert("请填写完整信息");
      } else {
        
        this.$axios({
          method: "POST",
          url: gloablUrl.URL.loginUrl + "/login",
          data: "userName=" + this.userName + "&password=" + this.passWord
        }).then(res => {

          if (res.data.status == "1") {
            sessionStorage.setItem("token", this.userName);
            this.$router.push({ path: "/mainPage" });
          } else {
            alert("账号或密码错误");
            this.passWord ="", this.userName = "";
          }
        });
      }
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.loginBody {
  width: 100%;
  height: 100%;
  position: relative;
  background: -webkit-linear-gradient(
    top,
    rgb(161, 158, 158),
    rgb(90, 88, 86),
    rgb(45, 45, 46)
  );
}
.Box {
  width: 20%;
  height: 32%;
  background-color: rgba(201, 197, 193, 0.2);
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  border-radius: 30px;
}
#userName {
  width: 80%;
  height: 12%;
  padding-left: 4px;
  color: rgb(18, 18, 19);
  position: absolute;
  left: 10%;
  top: 14%;
  border-radius: 10px;
  outline: none;
  border: none;
  transition: all 1s ease-out;
}
#userPassword {
  width: 80%;
  height: 12%;
  padding-left: 4px;
  color: rgb(18, 18, 19);
  position: absolute;
  left: 10%;
  top: 40%;
  border-radius: 10px;
  outline: none;
  border: none;
  transition: all 1s ease-out;
}
.intoPage {
  width: 44%;
  height: 30px;
  position: absolute;
  bottom: 14%;
  left: 28%;
  font-size: 16px;
  border-radius: 10px;
  color: aliceblue;
  letter-spacing: 4px;
  font-weight: bold;
  text-align: center;
  line-height: 28px;
  background-color: rgba(18, 18, 19, 0.6);
  cursor: pointer;
  transition: all 1s ease-out;
}
.intoPage:hover {
  background: -webkit-linear-gradient(
    left,
    rgb(32, 30, 28),
    rgb(82, 67, 67),
    rgb(92, 61, 61)
  );
}
</style>
