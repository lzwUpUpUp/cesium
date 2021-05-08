
const URL = {

  loginUrl: 'http://192.168.1.145:8085',   //登录地址
  GeoUrl: "http://192.168.1.158:8081",   //地图默认ip
  testUrl: "http://192.168.1.20:8085",   //页面接口请求地址
  WSUrl: "ws://192.168.1.20:10001/ws",   //页面接口请求地址


  title: '可视化大屏系统',
  // 颜色全局配置
  mineColor: "RED",//己方红色
  owmColor:"WHITE",// 我方
  targetColor: "YELLOW", //目标黄色
  neutralColor: "PINK",  // 中立粉色
  unknownColor: "ORANGE",//身份未知颜色
  lineColor: "GREEN", //侧向线颜色 定位航迹
  // textColor:"YELLOW" //文本颜色

}

export default { URL }
