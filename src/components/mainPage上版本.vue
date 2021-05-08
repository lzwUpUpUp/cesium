<template>
  <div class="mainPart">
    <!-- 消息弹窗 -->
    <!-- <div id="newsBox" ref="newsBox"></div>    -->
    <!--提醒右击结束绘制弹窗  -->
    <div id="paintBox" ref="paintBox"></div>
    <div class="top">
      <div class="top-three">
        <span id="topTimeY"></span>
        <span id="topTimeH"></span>
      </div>
      <div class="top-two">
        <p>{{topTitle}}</p>
      </div>
      <div class="top-one">
        <span @click="picPageShow">目标列表》》》</span>
      </div>
    </div>

    <!-- 主要部分html -->
    <div class="main">
      <div class="left" ref="leftBox">
        <div class="left-main">
          <!-- 历史弹窗预警记录 -->
          <div id="boxBottom">
            <ul class="BoxSecondUl">
              <li
                :id="item.FusionID"
                class="limess"
                v-for="(item, index) in alertList"
                :key="index"
              >
                <p>
                  <span class="msgTitie">消息级别</span>
                  &nbsp;:&nbsp;{{ item.grade }}
                </p>
                <p>
                  <span class="msgTitie">消息来源</span>
                  &nbsp;:&nbsp;{{ item.source }}
                </p>
                <p>
                  <span class="msgTitie">消息时间</span>
                  &nbsp;:&nbsp;{{ item.timeStr }}
                </p>
                <p>
                  <span class="msgTitie">消息内容</span>&nbsp;:&nbsp;
                  <span v-html=" item.msg"></span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="middle" ref="middle">
        <!-- 按钮设置 -->
        <div class="selector-box">
          <div class="seletor">
            <div class="middle-btn situational" @click="replay($event)" ref="situational">态势</div>
            <div class="middle-btn compound" @click="compound($event)" ref="compound">复盘</div>
            <div class="box4 seletorSmall" @click="missionPage($event)"></div>
            <div class="box1 seletorSmall" @click="toolsPage($event)"></div>
            <div class="box2 seletorSmall" @click="newsPage($event)"></div>
            <div class="box3 seletorSmall" @click="switching($event)"></div>
          </div>
          <!-- 测绘工具 -->
          <div class="toolsTop toolsBtn">
            <p id="line" @click="emitClick(2)">绘制</p>
            <p id="lineEnding" onclick="Endline()">结束划线</p>
          </div>
          <div class="toolsBottom toolsBtn">
            <p class="ceju" @click="emitClick(3)">测距</p>
            <p class="removece" onclick="removeCeju()">结束测距</p>
          </div>
          <div class="toolsBottom1 toolsBtn">
            <p class="target" @click="targetPartShow">目标库</p>
          </div>
          <div class="toolsBottom2 toolsBtn">
            <p class="wuqi" @click="armsPartShow">武器库</p>
          </div>
          <div class="toolsBottom3 toolsBtn">
            <p class="rule" @click="rulesPartShow()">规则库</p>
          </div>
          <div class="toolsBottom4 toolsBtn">
            <p class="sensor" @click="sensorPartShow()">传感器库</p>
          </div>
          <div class="toolsBottom6 toolsBtn">
            <p class="sensor" @click="getTargetId()" title="关联/解关联">关联/解关联</p>
          </div>
          <!-- <div class="toolsBottom5">
            <p class="sensor" onclick="showAll()">显示所有</p>
          </div>-->
        </div>

        <!-- 历史记录进行时双击出任的务详情弹窗 -->
        <div class="historyDetail" ref="historyDetail">
          <div class="targetDetail">
            <div class="monitorMsgDetailTitle">
              <div class="monitorMsgDetail">
                <p class="moitorP">基本信息</p>
              </div>
              <div class="monitorMsgDetailRigone">
                <table
                  style="width: 100%; border-collapse: collapse;height:100%;font-size:14px;color:#ffffff"
                >
                  <tbody class="monitorTable">
                    <tr>
                      <td
                        id="TargetArrays"
                        class="{{}}"
                        style="font-size:15px;"
                      >{{monitorData.taskName}}</td>
                      <td style="font-size:15px;">{{monitorData.danderLevel}}&nbsp;级</td>
                    </tr>
                    <tr>
                      <td>时间戳</td>
                      <td>{{monitorData.timeStamp}}</td>
                    </tr>
                    <tr>
                      <td>经度</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>纬度</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>高度</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>精度</td>
                      <td>{{monitorData.cep}}km</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="monitor" ref="monitor">
            <div class="monitorChange" @click="watchPageChange" ref="monitorChange"></div>
            <p class="monitorTitle" ref="monitorTitle">监测功能</p>
            <div class="monitorMsg" ref="monitorMsg">
              <div class="monitorLeft" ref="monitorLeft">
                <p class="moitorP">监测功能</p>
              </div>
              <div class="monitorMsgDetailRigtwo">
                <table
                  style="width: 100%;height:100%;border-collapse: collapse;font-size:14px;color:#ffffff"
                >
                  <tbody class="monitorcatch">
                    <tr>
                      <td>目标发现</td>
                      <td>
                        <button :class="imgFound == 0 ? 'Sbtnimage' : 'Wbtnimage'"></button>
                      </td>
                    </tr>
                    <tr>
                      <td>图像确认</td>
                      <td>
                        <button :class="imgFound == 0 ? 'Sbtnimage' : 'Wbtnimage'"></button>
                      </td>
                    </tr>
                    <tr>
                      <td>判断置信度</td>
                      <td>
                        <div class="opercitytest">test</div>
                        <div id="progress-container2"></div>
                        <span>{{monitorCatch.confidenceRation}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>定位精度</td>
                      <td>
                        <div class="comstylertext">{{monitorCatch.cep}}km</div>
                        <span class="comstylerimg2"></span>
                        <span>4km</span>
                      </td>
                    </tr>
                    <tr>
                      <td>数据刷新率</td>
                      <td>
                        <div class="comstylertext">0.5次/min</div>
                        <span class="comstylerimg3"></span>
                        <span>{{monitorCatch.refreshRate}}次/min</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="sensorDetail" ref="sensorDetail">
            <div
              class="sensorDetailChange"
              @click="sensorPageChage($event)"
              ref="sensorDetailChange"
            ></div>
            <p class="sensorDetailTitle" ref="sensorDetailTitle">可用传感器</p>
            <div class="sensorDetailMsg" ref="sensorDetailMsg">
              <div class="sensorDetailLeft">
                <p class="moitorP">可用传感器</p>
              </div>
              <div class="monitorMsgDetailRigthree">
                <table style="width: 100%; border-collapse: collapse;height:100%;color:#ffffff">
                  <tbody class="monitorThree">
                    <tr>
                      <td>
                        <input type="checkbox" name id="selectall" onclick="allbtn()" />&nbsp;传感器名称
                      </td>
                      <td>
                        距离
                        <span class="chooseSenId">发送</span>
                      </td>
                    </tr>
                    <!-- 此处循环 -->
                    <!-- <tr
                      style="position:relative"
                      v-for="(item,index) in monitorSensor"
                      :key="index"
                    >
                      <td>
                        <input type="checkbox" name="select" onclick="singleBtn(this)" />
                        &nbsp;{{item.sensorName}}
                      </td>
                      <td>{{item.disMax}}km</td>
                    </tr>-->
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="storageBox" ref="storageBox">
          <p>
            <span>区域名称：</span>&nbsp;
            <input type="text" class="storageName" v-model="storageName" />
          </p>
          <p>
            <span>区域类型：</span>&nbsp;
            <select name id="zoneType">
              <option value="1">任务区域</option>
              <!-- <option value="2">跟踪区域</option>
              <option value="3">发现区域</option>-->
            </select>
          </p>
          <p>
            <span>区域形状：</span>&nbsp;
            <select name id="zoneShape" v-model="zoneShape">
              <option value="1">圆形</option>
              <option value="2">矩形</option>
              <option value="3">多边形</option>
            </select>
          </p>
          <ul class="lonLatLibs">
            <li v-for="(item, index) in lonLatLibs" :key="index">{{ item }}</li>
          </ul>
          <a href="###">
            <span class="saveMsg" @click="saveStorage()">保存</span>
          </a>
          <span class="cancelSave" @click="cancelStorage">取消</span>
        </div>
        <!-- 右侧出来 -->
        <div class="right-in" @click="rightin()" ref="rightIn"></div>
        <!-- 右侧隐蔽 -->
        <div class="right-out" @click="rightout()" ref="rightOut"></div>

        <!-- 左侧出来 -->
        <div class="left-in" @click="leftin()" ref="leftIn"></div>
        <!-- 左侧隐蔽 -->
        <div class="left-out" @click="leftout()" ref="leftOut"></div>
        <!-- 地图 -->
        <!-- <div id="cesiumContainer" style="float: left;width:100%;height:100%"> -->
        <cesium
          ref="child"
          style="width: 100%;height:100%;position:relative"
          @tranlonlat="tranlonlatSecond"
          @planMisson="missionPage"
          @clearSingleHightLight = "clearSingleHightLight"
          :leftChange="leftchagne"
        ></cesium>
        <!-- </div> -->
        <!-- <div style="position: absolute;">
          <input type="text" id="repeatTime" placeholder="开始时间" />
          <input type="text" id="repeatTimes" placeholder="结束时间" />
        </div>-->

        <!-- 第二个弹窗  传感器 -->
        <div id="sensorWindow" ref="sensorWindow">
          <div class="selectSen">
            <div>
              <span>主用引擎</span>&nbsp;
              <select name id="mainEngein">
                <option value="1">引擎一</option>
                <option value="2">引擎二</option>
                <option value="3">引擎三</option>
              </select>
            </div>
            <div>
              <span>备用引擎一</span>&nbsp;
              <select name id="EngeinTwo">
                <option value="1">引擎一</option>
                <option value="2">引擎二</option>
                <option value="3">引擎三</option>
              </select>
            </div>
            <div>
              <span>备用引擎二</span>&nbsp;
              <select name id="EngeinThree">
                <option value="1">引擎一</option>
                <option value="2">引擎二</option>
                <option value="3">引擎三</option>
              </select>
            </div>
          </div>

          <a href="###">
            <div class="senCheckAll" title="点击全选" @click="senCheckAll()"></div>
          </a>
          <div class="sensor-leftTop">
            <div class="searchBoxTwo">
              <input
                type="text"
                class="sensorSearch"
                placeholder="搜索"
                v-model="sensorSearchVal"
                @input="searchSite"
              />
            </div>
            <ul class="senMassageLibs">
              <li
                v-for="(item, index) in sensorData"
                :key="index"
                title=" 双击选择"
                :id="[item.SensorId]"
              >
                <a href="###" @dblclick="chooseSensor(item, index, $event)">
                  {{ item.SensorName }}
                  <p class="sensorLon" style="visibility: hidden;height:0">{{ item.Lon }}</p>
                  <p class="sensorLat" style="visibility: hidden;height:0">{{ item.Lat }}</p>
                  <p class="sensorHei" style="visibility: hidden;height:0">{{ item.Hei }}</p>
                  <p class="sensorPageSize" style="visibility: hidden;height:0">{{ item.pageSize }}</p>
                  <p class="sensorPageSize" style="visibility: hidden;height:0">{{ item.localtion }}</p>
                  <p class="sensorPageSize" style="visibility: hidden;height:0">{{ item.reword }}</p>
                </a>
              </li>
            </ul>
          </div>

          <ul class="SenShowMassageLibs">
            <li
              v-for="(item, index) in allSensorData"
              :key="index"
              title="点击删除"
              :id="[item.SensorId]"
            >
              <a href="###" @click="deleteSensor(item, index, $event)">
                {{ item.SensorName }}
                <p class="sensorLon" style="visibility: hidden;height:0;">{{ item.Lon }}</p>
                <p class="sensorLat" style="visibility: hidden;height:0;">{{ item.Lat }}</p>
                <p class="sensorHei" style="visibility: hidden;height:0;">{{ item.Hei }}</p>
                <p class="sensorPageSize" style="visibility: hidden;height:0;">{{ item.pageSize }}</p>
                <p class="sensorPageSize" style="visibility: hidden;height:0;">{{ item.localtion }}</p>
                <p class="sensorPageSize" style="visibility: hidden;height:0;">{{ item.reword }}</p>
              </a>
            </li>
          </ul>

          <a href="###">
            <div class="SenCancelBtn" @click="Sendisloge">取消</div>
          </a>
          <a href="###">
            <div class="SenSureBtn" @click="Sendeliver()">确定</div>
          </a>
        </div>

        <!-- 融合目标的弹窗 -->
        <div class="fuseBox" ref="fuseBox">
          <p style="height:16%;border-bottom:1px solid #ffffff;font-weight:blod;">
            <span>目标名称</span>
            <span>目标编号</span>
            <span>目标批号</span>
          </p>
          <div class="fuseDetail">
            <ul>
              <li
                v-for="(item, index) in fuseData"
                :key="index"
                @click="chooseFuseData(item, index)"
              >
                <span>{{item.TargetName1}}</span>
                <span>{{item.BENumber}}</span>
                <span>{{item.FusionID}}</span>
              </li>
            </ul>
          </div>
          <span @click="sureFuseSelect" id="sureFuseSelect">确定</span>
          <span @click="fuseCommonFunction" id="cancelFuseSelect">取消</span>
        </div>

        <!-- 目标预警显示信息 -->
        <div id="AlertMessage">
          <ul class="showtime"></ul>
        </div>

        <!--通信类传感器弹窗 2   -->
        <div class="sensorSetting-windows" v-show="windowsNum == 2">
          <h5 class="windowsTitle">通信侦测参数设置</h5>
          <p>
            <span>目标id：</span> &nbsp;
            <input type="number" v-model="communicationId" />
          </p>
          <p>
            <span>开始收集时间:</span> &nbsp;
            <input type="text" id="communicationTime" placeholder="点击选择时间" />
          </p>
          <p>
            <span>持续时间：</span> &nbsp;
            <input type="number" v-model="coDurationTime" /> s
          </p>
          <p>
            <span>偏差时间：</span> &nbsp;
            <input type="number" v-model="coOffsetTime" /> s
          </p>
          <p>
            <span>定位收集标志：</span> &nbsp;
            <input type="checkbox" v-model="coLocation" class="coCheckBox" /> 执行
          </p>
          <p>
            <span>测向收集标志：</span> &nbsp;
            <input type="checkbox" v-model="coSide" class="coCheckBox" /> 执行
          </p>
          <p>
            <span>历史收集标志：</span> &nbsp;
            <input type="checkbox" v-model="coHistory" class="coCheckBox" /> 执行
          </p>
          <p>
            <span>识别收集标志：</span> &nbsp;
            <input type="checkbox" v-model="coRecognize" class="coCheckBox" /> 执行
          </p>
          <p>
            <span>中心频率：</span> &nbsp;
            <input type="text" v-model="coCenter" /> KHz
          </p>
          <p>
            <span>频率随机误差sigma：</span> &nbsp;
            <input type="text" v-model="coRandomRrror" /> Hz
          </p>
          <p>
            <span>接收机的宽带：</span> &nbsp;
            <input type="number" v-model="coReceiver" /> KHz
          </p>
          <p>
            <span>调制方式：</span> &nbsp;
            <input type="text" v-model="coModulation" maxlength="4" />
          </p>
          <p>
            <span>AOI/SOI：</span> &nbsp;
            <input type="text" v-model="coAoi" maxlength="5" />
          </p>
          <p>
            <span>信号放大：</span> &nbsp;
            <select name id v-model="coSignal">
              <option value="0">未知</option>
              <option value="1">网络</option>
              <option value="2">中继器</option>
              <option value="3">单个辐射源</option>
            </select>
          </p>
          <p>
            <span>节点个数：</span> &nbsp;
            <input type="number" v-model="coNodeNum" />
          </p>
          <p>
            <span>目标经度：</span> &nbsp;
            <input type="number" v-model="coLon" />
          </p>
          <p>
            <span>目标纬度：</span> &nbsp;
            <input type="number" v-model="coLat" />
          </p>
          <p>
            <span>目标高度：</span> &nbsp;
            <input type="number" v-model="coHigh" /> m
          </p>
          <p>
            <span>误差椭圆短轴：</span> &nbsp;
            <input type="number" v-model="coShort" /> m
          </p>
          <p>
            <span>误差椭圆长轴：</span> &nbsp;
            <input type="number" v-model="coLong" /> m
          </p>
          <p>
            <span>误差椭圆倾角：</span> &nbsp;
            <input type="number" v-model="coAngle" /> deg
          </p>
          <p>
            <span>动作标识：</span> &nbsp;
            <select name id v-model="coActionMark">
              <option value="0">无动作</option>
              <option value="1">释放资源</option>
            </select>
          </p>
          <button class="coCancel" @click="windowsNone">取消</button>
          <button class="coSure" @click="communicationOrder">下发命令</button>
        </div>

        <!--电子类传感器弹窗 1  -->
        <div class="sensorSetting-windows" v-show="windowsNum == 1">
          <h5 class="windowsTitle">电子侦测参数设置</h5>
          <p>
            <span>目标id：</span> &nbsp;
            <input type="number" v-model="elId" />
          </p>
          <p>
            <span>开始收集时间:</span> &nbsp;
            <input type="text" id="electronicTime" placeholder="点击选择时间" />
          </p>
          <p>
            <span>持续时间：</span> &nbsp;
            <input type="number" v-model="elDurationTime" /> s
          </p>
          <p>
            <span>偏差时间：</span> &nbsp;
            <input type="number" v-model="elOffsetTime" /> s
          </p>
          <p>
            <span>定位收集标志：</span> &nbsp;
            <input type="checkbox" v-model="elLocation" class="coCheckBox" /> 执行
          </p>
          <p>
            <span>测向收集标志：</span> &nbsp;
            <input type="checkbox" v-model="elSide" class="coCheckBox" /> 执行
          </p>
          <p>
            <span>历史收集标志：</span> &nbsp;
            <input type="checkbox" v-model="elHistory" class="coCheckBox" /> 执行
          </p>
          <p>
            <span>识别收集标志：</span> &nbsp;
            <input type="checkbox" v-model="elRecognize" class="coCheckBox" /> 执行
          </p>
          <p>
            <span>中心频率：</span> &nbsp;
            <input type="text" v-model="elCenter" /> KHz
          </p>
          <p>
            <span>低频测量下限频率值：</span> &nbsp;
            <input type="number" v-model="elLows" /> KHz
          </p>
          <p>
            <span>高频测量下限频率值：</span> &nbsp;
            <input type="number" v-model="elFrequency" /> KHz
          </p>
          <p>
            <span title="频率测量的1倍误差sigma估计值">频率测量的1倍误...：</span> &nbsp;
            <input type="text" v-model="elRandomRrror" /> Hz
          </p>
          <p>
            <span>接收机的宽带：</span> &nbsp;
            <input type="number" v-model="elReceiver" /> KHz
          </p>
          <p>
            <span>电子信号规格号：</span> &nbsp;
            <input type="text" v-model="elSpecification" maxlength="5" /> KHz
          </p>
          <p>
            <span>电子信号的可信级别：</span> &nbsp;
             <select name id v-model="elConfidence">
              <option value="1">1级</option>
              <option value="2">2级</option>
              <option value="3">3级</option>
              <option value="4">4级</option>
              <option value="5">5级</option>
              <option value="6">6级</option>
            </select>
          </p>
          <p>
            <span>调制方式：</span> &nbsp;
            <input type="text" v-model="coModulation" maxlength="4" />
          </p>
          <p>
            <span>AOI/SOI：</span> &nbsp;
            <input type="text" v-model="coAoi" maxlength="5" />
          </p>
          <p>
            <span>信号放大：</span> &nbsp;
            <select name id v-model="coSignal">
              <option value="0">未知</option>
              <option value="1">网络</option>
              <option value="2">中继器</option>
              <option value="3">单个辐射源</option>
            </select>
          </p>
          <p>
            <span>脉冲宽度：</span> &nbsp;
            <input type="number" v-model="elWidth" /> ns
          </p>
          <p>
            <span>脉冲间隔：</span> &nbsp;
            <input type="number" v-model="elInterval" /> ns
          </p>
          <p>
            <span>目标经度：</span> &nbsp;
            <input type="number" v-model="elLon" />
          </p>
          <p>
            <span>目标纬度：</span> &nbsp;
            <input type="number" v-model="elLat" />
          </p>
          <p>
            <span>目标高度：</span> &nbsp;
            <input type="number" v-model="elHigh" /> m
          </p>
          <p>
            <span>误差椭圆短轴：</span> &nbsp;
            <input type="number" v-model="elShort" /> m
          </p>
          <p>
            <span>误差椭圆长轴：</span> &nbsp;
            <input type="number" v-model="elLong" /> m
          </p>
          <p>
            <span>误差椭圆倾角：</span> &nbsp;
            <input type="number" v-model="elAngle" /> deg
          </p>
          <p>
            <span>动作标识：</span> &nbsp;
            <select name id v-model="elActionMark">
              <option value="0">无动作</option>
              <option value="1">释放资源</option>
            </select>
          </p>
          <button class="coCancel" @click="windowsNone">取消</button>
          <button class="coSure" @click="eletronicOrder">下发命令</button>
        </div>

        <!--图像类传感器弹窗 4  -->
        <div class="sensorSetting-windows" v-show="windowsNum == 4">
          <h5 class="windowsTitle">图像侦测参数设置</h5>
          <p>
            <span>目标id：</span> &nbsp;
            <input type="number" v-model="piId" />
          </p>
          <p>
            <span>开始收集时间:</span> &nbsp;
            <input type="text" id="pictureTime" placeholder="点击选择时间" />
          </p>
          <p>
            <span>持续时间：</span> &nbsp;
            <input type="number" v-model="piDurationTime" /> s
          </p>
          <p>
            <span>偏差时间：</span> &nbsp;
            <input type="number" v-model="piOffsetTime" /> s
          </p>
          <p>
            <span>定位收集标志：</span> &nbsp;
            <input type="checkbox" v-model="piLocation" class="coCheckBox" /> 执行
          </p>
          <p>
            <span>历史收集标志：</span> &nbsp;
            <input type="checkbox" v-model="piHistory" class="coCheckBox" /> 执行
          </p>
          <p>
            <span>识别收集标志：</span> &nbsp;
            <input type="checkbox" v-model="piCollectMark" class="coCheckBox" /> 执行
          </p>
          <p>
            <span>电子信号规格号：</span> &nbsp;
            <input type="text" v-model="piSignal" maxlength="5" />
          </p>
          <p>
            <span>电子信号的可信级别：</span> &nbsp;
             <select name id v-model="piConfidence">
              <option value="1">1级</option>
              <option value="2">2级</option>
              <option value="3">3级</option>
              <option value="4">4级</option>
              <option value="5">5级</option>
              <option value="6">6级</option>
            </select> 
          </p>
          <p>
            <span>国家：</span> &nbsp;
            <input type="text" v-model="piNation" maxlength="2" />
          </p>
          <p>
            <span>AOI/SOI：</span> &nbsp;
            <input type="text" v-model="piAoi" maxlength="5" />
          </p>
          <p>
            <span>AOI/SOI可信级别：</span> &nbsp;
             <select name id v-model="piAoiLeval">
              <option value="1">1级</option>
              <option value="2">2级</option>
              <option value="3">3级</option>
              <option value="4">4级</option>
              <option value="5">5级</option>
              <option value="6">6级</option>
            </select>
             
          </p>
          <p>
            <span>环境：</span> &nbsp;
            <select name id v-model="piEnviionment">
              <option value="0">未知</option>
              <option value="1">空间</option>
              <option value="2">空中</option>
              <option value="3">地面单元</option>
              <option value="4">地面装备</option>
              <option value="5">地面设备</option>
              <option value="6">水面</option>
              <option value="7">水下</option>
            </select>
          </p>
          <p>
            <span>识别：</span> &nbsp;
            <select name id v-model="piRecognize">
              <option value="0">待定</option>
              <option value="1">未知</option>
              <option value="2">假定友方</option>
              <option value="3">友方</option>
              <option value="4">中立</option>
              <option value="5">可疑</option>
              <option value="6">敌方</option>
              <option value="7">未使用</option>
              <option value="8">演习-待定</option>
              <option value="9">演习-未知</option>
              <option value="10">演习-假定友方</option>
              <option value="11">演习-中立</option>
              <option value="12">演习-可疑</option>
              <option value="13">演习-敌方</option>
              <option value="14">我方</option>
            </select>
          </p>
          <p>
            <span>目标经度：</span> &nbsp;
            <input type="number" v-model="piLon" />
          </p>
          <p>
            <span>目标纬度：</span> &nbsp;
            <input type="number" v-model="piLat" />
          </p>
          <p>
            <span>目标高度：</span> &nbsp;
            <input type="number" v-model="piHigh" /> m
          </p>
          <p>
            <span>误差椭圆短轴：</span> &nbsp;
            <input type="number" v-model="piShort" /> m
          </p>
          <p>
            <span>误差椭圆长轴：</span> &nbsp;
            <input type="number" v-model="piLong" /> m
          </p>
          <p>
            <span>误差椭圆倾角：</span> &nbsp;
            <input type="number" v-model="piAngle" /> deg
          </p>
          <p>
            <span>放弃追踪标志：</span> &nbsp;
            <input type="checkbox" v-model="piGiveUp" class="coCheckBox" /> 放弃追踪
          </p>
          <p>
            <span>速度：</span> &nbsp;
            <input type="number" v-model="piSpeed" />
          </p>
          <p>
            <span>航向：</span> &nbsp;
            <input type="text" v-model="piHeading" />
          </p>
          <p>
            <span>动作标识：</span> &nbsp;
            <select name id v-model="piActionMark">
              <option value="0">无动作</option>
              <option value="1">释放资源</option>
            </select>
          </p>
          <button class="coCancel" @click="windowsNone">取消</button>
          <button class="coSure" @click="pictureOrder">下发命令</button>
        </div>

        <!--对海雷达类传感器弹窗 3  -->
        <div class="sensorSetting-windows" v-show="windowsNum == 3">
          <h5 class="windowsTitle">海面目标侦测参数设置</h5>
          <p>
            <span>目标id：</span> &nbsp;
            <input type="number" v-model="seaId" />
          </p>
          <p>
            <span>开始收集时间:</span> &nbsp;
            <input type="text" id="forSeaTime" placeholder="点击选择时间" />
          </p>
          <p>
            <span>持续时间：</span> &nbsp;
            <input type="number" v-model="seaDurationTime" /> s
          </p>
          <p>
            <span>偏差时间：</span> &nbsp;
            <input type="number" v-model="seaOffsetTime" /> s
          </p>
          <p>
            <span>定位收集标志：</span> &nbsp;
            <input type="checkbox" v-model="seaLocation" class="coCheckBox" /> 执行
          </p>
          <p>
            <span>历史收集标志：</span> &nbsp;
            <input type="checkbox" v-model="seaHistory" class="coCheckBox" /> 执行
          </p>
          <p>
            <span>目标经度：</span> &nbsp;
            <input type="number" v-model="seaLon" />
          </p>
          <p>
            <span>目标纬度：</span> &nbsp;
            <input type="number" v-model="seaLat" />
          </p>
          <p>
            <span>目标高度：</span> &nbsp;
            <input type="number" v-model="seaHigh" /> m
          </p>
          <p>
            <span>误差椭圆短轴：</span> &nbsp;
            <input type="number" v-model="seaShort" /> m
          </p>
          <p>
            <span>误差椭圆长轴：</span> &nbsp;
            <input type="number" v-model="seaLong" /> m
          </p>
          <p>
            <span>误差椭圆倾角：</span> &nbsp;
            <input type="number" v-model="seaAngle" /> deg
          </p>
          <p>
            <span>目标分类：</span> &nbsp;
            <select name id v-model="seaTargetType">
              <option value="0">旋转体</option>
              <option value="1">活动目标指示</option>
              <option value="2">地面动目标</option>
              <option value="3">轮状运动</option>
              <option value="4">有履带的</option>
              <option value="5">混合</option>
              <option value>直升机</option>
              <option value="7">未知</option>
              <option value="8">护航</option>
              <option value="9">旋转并移动</option>
              <option value="10">空中动目标</option>
              <option value="11">水面动目标</option>
            </select>
          </p>
          <p>
            <span>电子信号规格号：</span> &nbsp;
            <input type="text" v-model="seaSignal" maxlength="5" /> KHz
          </p>
          <p>
            <span>电子信号的可信级别：</span> &nbsp;
             <select name id v-model="seaConfidence">
              <option value="1">1级</option>
              <option value="2">2级</option>
              <option value="3">3级</option>
              <option value="4">4级</option>
              <option value="5">5级</option>
              <option value="6">6级</option>
            </select> 
          </p>
          <p>
            <span>发射机扫描频率：</span> &nbsp;
            <input type="number" v-model="seaTransmitter" /> s
          </p>
          <p>
            <span>AOI/SOI：</span> &nbsp;
            <input type="text" v-model="seaAoi" maxlength="5" />
          </p>
          <p>
            <span>AOI/SOI可信级别：</span> &nbsp;
              <select name id v-model="seaAoiLeval">
              <option value="1">1级</option>
              <option value="2">2级</option>
              <option value="3">3级</option>
              <option value="4">4级</option>
              <option value="5">5级</option>
              <option value="6">6级</option>
            </select> 
          </p>
          <p>
            <span>首次发现时间:</span> &nbsp;
            <input type="text" id="seaFirstTime" v-model="seaFirstTime" placeholder="点击选择时间" />
          </p>
          <p>
            <span>首次发现目标经度：</span> &nbsp;
            <input type="number" v-model="seaFirstLon" />
          </p>
          <p>
            <span>首次发现目标纬度：</span> &nbsp;
            <input type="number" v-model="seaFirstLat" />
          </p>
          <p>
            <span>首次发现目标高度：</span> &nbsp;
            <input type="number" v-model="seaFirstHight" />
          </p>
          <p>
            <span>速度：</span> &nbsp;
            <input type="number" v-model="seaSpeed" /> m/s
          </p>
          <p>
            <span>航向：</span> &nbsp;
            <input type="number" v-model="seaHeading" /> deg
          </p>
          <p>
            <span>目标宽度：</span> &nbsp;
            <input type="number" v-model="seaTargetWidth" /> m
          </p>
          <p>
            <span>目标长度：</span> &nbsp;
            <input type="number" v-model="seaLength" /> m
          </p>
          <p>
            <span>动作标识：</span> &nbsp;
            <select name id v-model="seaActionMark">
              <option value="0">无动作</option>
              <option value="1">释放资源</option>
            </select>
          </p>
          <button class="coCancel" @click="windowsNone">取消</button>
          <button class="coSure" @click="forSeaOrder">下发命令</button>
        </div>

        <!--对空雷达类传感器弹窗 5  -->
        <div class="sensorSetting-windows" v-show="windowsNum == 5">
          <h5 class="windowsTitle">空中目标侦测参数设置</h5>
          <p>
            <span>目标id：</span> &nbsp;
            <input type="number" v-model="airId" />
          </p>
          <p>
            <span>开始收集时间:</span> &nbsp;
            <input type="text" id="forAirTime" placeholder="点击选择时间" />
          </p>
          <p>
            <span>持续时间：</span> &nbsp;
            <input type="number" v-model="airDurationTime" /> s
          </p>
          <p>
            <span>偏差时间：</span> &nbsp;
            <input type="number" v-model="airOffsetTime" /> s
          </p>
          <p>
            <span>定位收集标志：</span> &nbsp;
            <input type="checkbox" v-model="airLocation" class="coCheckBox" /> 执行
          </p>
          <p>
            <span>历史收集标志：</span> &nbsp;
            <input type="checkbox" v-model="airHistory" class="coCheckBox" /> 执行
          </p>
          <p>
            <span>目标经度：</span> &nbsp;
            <input type="number" v-model="airLon" />
          </p>
          <p>
            <span>目标纬度：</span> &nbsp;
            <input type="number" v-model="airLat" />
          </p>
          <p>
            <span>目标高度：</span> &nbsp;
            <input type="number" v-model="airHigh" /> m
          </p>
          <p>
            <span>误差椭圆短轴：</span> &nbsp;
            <input type="number" v-model="airShort" /> m
          </p>
          <p>
            <span>误差椭圆长轴：</span> &nbsp;
            <input type="number" v-model="airLong" /> m
          </p>
          <p>
            <span>误差椭圆倾角：</span> &nbsp;
            <input type="number" v-model="airAngle" /> deg
          </p>
          <p>
            <span>目标分类：</span> &nbsp;
            <select name id v-model="airTargetType">
              <option value="0">旋转体</option>
              <option value="1">活动目标指示</option>
              <option value="2">地面动目标</option>
              <option value="3">轮状运动</option>
              <option value="4">有履带的</option>
              <option value="5">混合</option>
              <option value>直升机</option>
              <option value="7">未知</option>
              <option value="8">护航</option>
              <option value="9">旋转并移动</option>
              <option value="10">空中动目标</option>
              <option value="11">水面动目标</option>
            </select>
          </p>
          <p>
            <span>电子信号规格号：</span> &nbsp;
            <input type="text" v-model="airSignal" maxlength="5" /> KHz
          </p>
          <p>
            <span>电子信号的可信级别：</span> &nbsp;
             <select name id v-model="airConfidence">
              <option value="1">1级</option>
              <option value="2">2级</option>
              <option value="3">3级</option>
              <option value="4">4级</option>
              <option value="5">5级</option>
              <option value="6">6级</option>
            </select> 
          </p>
          <p>
            <span>发射机扫描频率：</span> &nbsp;
            <input type="number" v-model="airTransmitter" /> s
          </p>
          <p>
            <span>AOI/SOI：</span> &nbsp;
            <input type="text" v-model="airAoi" maxlength="5" />
          </p>
          <p>
            <span>AOI/SOI可信级别：</span> &nbsp;
             <select name id v-model="airAoiLeval">
              <option value="1">1级</option>
              <option value="2">2级</option>
              <option value="3">3级</option>
              <option value="4">4级</option>
              <option value="5">5级</option>
              <option value="6">6级</option>
            </select>
          </p>
          <p>
            <span>首次发现时间:</span> &nbsp;
            <input type="text" id="airFirstTime" placeholder="点击选择时间" />
          </p>
          <p>
            <span>首次发现目标经度：</span> &nbsp;
            <input type="number" v-model="airFirstLon" />
          </p>
          <p>
            <span>首次发现目标纬度：</span> &nbsp;
            <input type="number" v-model="airFirstLat" />
          </p>
          <p>
            <span>首次发现目标高度：</span> &nbsp;
            <input type="number" v-model="airFirstHight" />
          </p>
          <p>
            <span>速度：</span> &nbsp;
            <input type="number" v-model="airSpeed" /> m/s
          </p>
          <p>
            <span>航向：</span> &nbsp;
            <input type="number" v-model="airHeading" /> deg
          </p>
          <p>
            <span>目标宽度：</span> &nbsp;
            <input type="number" v-model="airTargetWidth" /> m
          </p>
          <p>
            <span>目标长度：</span> &nbsp;
            <input type="number" v-model="airLength" /> m
          </p>
          <p>
            <span>动作标识：</span> &nbsp;
            <select name id v-model="airActionMark">
              <option value="0">无动作</option>
              <option value="1">释放资源</option>
            </select>
          </p>
          <button class="coCancel" @click="windowsNone">取消</button>
          <button class="coSure" @click="forAirOrder">下发命令</button>
        </div>

        <!-- 底部出来 -->
        <div class="bottom-in" ref="bottomIn" @click="bottomBarAppear()"></div>
        <!-- 底部隐蔽 -->
        <div class="bottom-out" ref="bottomOut" @click="bottomBarDisappear()"></div>
        <!-- 中间地图底部bar -->
        <div class="middleBottom-Bar" ref="middleBottomBar">
          <div
            v-for="(item,index) in $store.getters.getTarget"
            :key="index"
            @click="singleHightLight(item,index)"
            :class="{middleBottomBarLightHight:middleBottomBarNum == item.FusionID}"
            v-show="item.DanderLevel <= 3 "
          >
            <P>{{item.FusionID}}</P>
            <P>{{item.TargetName1}}</P>
            <P>{{item.SensorType}}</P>
            <P>{{Number(item.Lon).toFixed(0)}}°E/{{Number(item.Lat).toFixed(0)}}°N</P>
            <P>{{item.Hei}}</P>
            <P>IFF:{{item.IFF}}</P>
          </div>
        </div>
      </div>
      <!-- ------右侧部分------- -->
      <div class="right" ref="right">
        <div class="right-news" ref="rightNews">
          <p class="news-title">
            <span>消息</span>
          </p>
          <!-- <div class="newsPageTop">
            <p class="newsTopTitle">
              <span>相亲相爱一家人</span>
            </p>
            <ul class="newsTopLibs">
              <li>
                <span class="rocketTroops"></span>火箭军
              </li>
              <li>
                <span class="airCops"></span>空军
              </li>
              <li>
                <span class="navy"></span>海军
              </li>
            </ul>
            <div class="newsTopBoxs">
              <textarea type="text" id="takling" placeholder="请输入对话文字" />
              <span class="sendMsg" onclick="sendMsg()">发送</span>
            </div>
          </div>-->
          <div class="newsPageBottom">
            <p class="newsBottomTitle">
              <span>{{takingSingleTitle}}</span>
            </p>
            <ul class="newsBottomLibs">
              <li
                v-for="(item,index) in takingSingle"
                :key="index"
                :class="{takingSingleLight:takingSingleNum==index}"
                @click="singleCahtShow(item,index)"
              >
                <span :title="item.name">{{item.name}}</span>
              </li>
            </ul>
            <div class="newsBottomBoxs">
              <div
                class="singleChatBox"
                v-for="(item,index) in takingSingle"
                :key="index"
                v-show="takingSingleNum==index"
              >
                <!-- <p>
                 <span style="display:block;color:#999;text-align:left;margin-bottom:2px">:空警22</span>
                  <span class="otherParty">飞洒发沙发沙发公司的发生地方撒发顺丰的说法都是的负担等发达的时代</span>
                </p>
                <p class="ownTextBox">
                  <span style="display:block;color:#999;text-align:right;margin-bottom:2px">:我</span>
                  <span class="thrieOwn">飞洒发沙发沙发公司的发生地方撒发顺丰的说法都是的负担等发达的时代</span>
                </p>-->
              </div>

              <div style="width:100%;height:10%;position:absolute;bottom:0;left:0;">
                <textarea
                  type="text"
                  id="Bottomtakling"
                  v-model="ownChatText"
                  placeholder="请输入对话文字"
                />
                <span class="sendMsgBottom" @click="sendMsgBottom()">发送</span>
              </div>
            </div>
          </div>
        </div>
        <div class="right-main" ref="rightMain">
          <div class="main-bottom">
            <ul id="main-bottomTabs">
              <li
                v-for="(item, index) in rightTopTab"
                :key="index"
                @click="rightTab(index)"
                :class="{ openTab: rightTabNum == index }"
              >
                <a href="###">{{ item.title }}</a>
              </li>
            </ul>
            <!-- 任务规划 -->
            <div class="main-bottomBox">
              <div class="windowOne" ref="windowOne">
                <div class="windowOneTop">
                  <div class="zone-information">区域信息</div>
                  <p>
                    <span>区域选择</span>&nbsp;
                    <select
                      class="targetOption"
                      style="left:24%"
                      name
                      onmousedown="if(this.options.length>7){this.size=8}"
                      onblur="this.size=1"
                      onchange="this.size=1"
                      v-model="zoneVal"
                      @change="chooseZone"
                    >
                      <option value disabled selected hidden>--请选择--</option>
                      <option
                        v-for="(item, index) in zoneData"
                        :key="index"
                        :value="[item.id]"
                      >{{ item.areaName }}</option>
                    </select>
                  </p>
                  <ul class="zone-informationLibs">
                    <li v-for="(item, index) in zoneInformation" :key="index">
                      <span>{{ item.lon }} , {{ item.lat }}</span>
                    </li>
                  </ul>
                </div>

                <input type="text" placeholder="请输入任务名称" id="targetName" v-model="missionName" />
                <input type="text" class="searchOne" id="searchOne" placeholder="请选择任务的起始及终止时间" />
                <div class="windowOneFoot">
                  <div class="footTargetTab" id="footTargetTabShow">
                    <ul class="selectTargetTitle">
                      <li
                        v-for="(item,index) in selectTargetType"
                        :key="index"
                        :class="{beSelectTargetTitle:beSelectTargetTitleNum == index}"
                        @click="TargetTypeMethod(index)"
                      >{{item.title}}</li>
                    </ul>
                    <div class="earlyWaringBox" v-show="!beSelectTargetTitleNum">
                      <select
                        class="targetOption"
                        id="targetSelect"
                        name
                        onmousedown="if(this.options.length>7){this.size=8}"
                        onblur="this.size=1"
                        onchange="this.size=1"
                        v-model="targetVal"
                        style="left:2%;margin-top: 8px;margin-bottom: 2px;"
                        @change="targetChange($event)"
                      >
                        <option value disabled selected hidden>--请选择--</option>
                        <option
                          v-for="(item, index) in targetData"
                          :key="index"
                          :value="item.BENumber"
                          :class="[item.FusionID]"
                        >{{ item.TargetName }}</option>
                      </select>
                    </div>
                    <div class="dynamicBox" v-show="beSelectTargetTitleNum">
                      <input type="text" :calss="dynamicNumber" v-model="dynamicName" />
                      <input type="text" calss="dynamicId" v-model="dynamicId" />
                      <a
                        style="position:absolute;right:2%;top:28%;text-decoration:underline;cursor: pointer;"
                        @click="fuseBoxShow()"
                      >融合目标</a>
                    </div>
                    <!--  -->
                    <p>
                      <span>任务阶段</span>
                      <select
                        name
                        id="choosePri"
                        v-model="missionStage"
                        ref="satge"
                        style="width:35%;text-align:center"
                        @change="stageChange($event)"
                      >
                        <option value="0">预警</option>
                        <option value="1">搜索</option>
                        <option value="2">跟踪</option>
                        <option value="3">瞄准</option>
                      </select>
                    </p>

                    <p>
                      <span>目标优先级</span>
                      <select
                        name
                        id="choosePri"
                        v-model="missionDegree"
                        ref="degree"
                        style="width:35%"
                      >
                        <option value="1">1级</option>
                        <option value="2">2级</option>
                        <option value="3">3级</option>
                        <option value="4">4级</option>
                        <option value="5">5级</option>
                        <option value="6">6级</option>
                        <option value="7">7级</option>
                      </select>
                    </p>
                    <p
                      style="visibility: hidden;"
                      :class="VisibilityNum == 1 ? 'askVisibility' : ''"
                    >
                      <span>置信度要求&nbsp; >=</span>
                      <input
                        type="number"
                        class="detConfidence"
                        value="50"
                        v-model="targetConfidence"
                        style="width:34%"
                      />&nbsp;%
                    </p>
                    <p
                      style="visibility: hidden;"
                      :class="VisibilityNum == 1 ? 'askVisibility' : ''"
                    >
                      <span>CEP&nbsp; <=</span>
                      <input
                        type="number"
                        class="precision"
                        value="5"
                        v-model="precision"
                        style="width:34%"
                      />&nbsp;KM
                    </p>

                    <div class="armChooseBox" style="width: 100%;height: 50%;" ref="armyChooseBox">
                      <div class="chooseArmsTab">
                        <span class="chooseArmsTitle">武器选择</span>
                        <select
                          id="armsOption"
                          name
                          onmousedown="if(this.options.length>3){this.size=4}"
                          onblur="this.size=1"
                          onchange="this.size=1"
                        >
                          <option value disabled selected hidden>--请选择--</option>
                          <option value="1" style="height: ">武器一</option>
                          <option value="2">武器二</option>
                        </select>
                      </div>
                      <p>
                        <span>CEP&nbsp; <=</span>
                        <input type="number" class="armsPrecision" onfocus="this.blur()" />&nbsp;KM
                      </p>
                      <p>
                        <span>置信度要求&nbsp; >=</span>
                        <input type="number" class="armsConfidence" onfocus="this.blur()" />&nbsp;%
                      </p>
                      <!-- <p>时间：&nbsp;全程&nbsp; >= <input type="number" class=" wholeJourney">&nbsp;min</p> -->
                      <p>
                        <span>时间延迟&nbsp; <=</span>
                        <input type="number" class="delayTime" onfocus="this.blur()" />
                        &nbsp;min
                      </p>
                      <!-- <p>刷新率：&nbsp; <= <input type="number" class="refresh">&nbsp;秒</p> -->
                      <p>
                        <span>数据率&nbsp; <=</span>
                        <input type="number" class="dataRate" onfocus="this.blur()" />&nbsp;秒
                      </p>
                    </div>
                  </div>

                  <!-- <a href="###">
                                        <div class="increaseTarget">
                                            新增目标
                                        </div>
                  </a>-->

                  <!-- <a href="###">
                    <div class="oneNextTaking" onclick="gobackOne()"></div>
                  </a>-->
                  <a href="###">
                    <div class="oneNextTaking" @click="targetTrajectory">规划目标轨迹</div>
                  </a>
                  <a href="###">
                    <div class="nextTaking" @click="gobackTwo()">下一步</div>
                  </a>
                </div>
              </div>
              <div class="windowTwo" ref="windowTwo">
                <div class="windowTwoMain">
                  <div class="choose-merchin">选择传感器</div>

                  <ul class="chooseMerchin-libs">
                    <!-- 加载动画的loading图 -->
                    <div id="center" ref="loadingPage">
                      <div class="skype-loader">
                        <div class="dot">
                          <div class="first"></div>
                        </div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                      </div>loading in...
                    </div>
                    <!-- ------------- -->
                    <li
                      v-for="(item, index) in sensorLibShow"
                      :key="index"
                      :id="[item.SensorId]"
                      :class="{ chooseMerchinLisOn: sensorLibsOn == index }"
                      :title="item.status == 1 ? '单击重新绘制轨迹' : ''"
                      @click="sensorTrajectory(item,index)"
                    >
                      {{ item.SensorName}}
                      <span title="删除此传感器" @click="removeSensor(item,index)">x</span>
                      <p class="sensorLon" style="visibility: hidden;height:0">{{ item.Lon }}</p>
                      <p class="sensorLat" style="visibility: hidden;height:0">{{ item.Lat }}</p>
                      <p class="sensorHei" style="visibility: hidden;height:0">{{ item.Hei }}</p>
                      <p
                        class="sensorPageSize"
                        style="visibility: hidden;height:0"
                      >{{ item.pageSize }}</p>
                      <p
                        class="sensorPageSize"
                        style="visibility: hidden;height:0"
                      >{{ item.localtion }}</p>
                      <p
                        class="sensorPageSize"
                        style="visibility: hidden;height:0"
                      >{{ item.reword }}</p>
                    </li>
                  </ul>
                  <a href="###">
                    <div class="goBackTwo" @click="goBackTarget()">返回上一步</div>
                  </a>
                  <a href="###">
                    <div class="two-increaseTarget" @click="sensorPageShow">新增传感器</div>
                  </a>
                  <!-- <a href="###">
                    <div class="saveAllTarget" @click="saveAllTarget()">保存任务</div>
                  </a>-->
                  <a href="###">
                    <div class="saveAllTarget" @click="saveAllTarget">执行仿真</div>
                  </a>
                </div>
                <div class="windowTwoFoot">
                  <p class="prompt">提示：请在任务区域里面选点</p>
                  <p>
                    <span class="productPoint" @click="choosePoint">选点</span>
                  </p>
                  <!--动态创建点位信息-->
                  <div class="pointBox">
                    <table class="oneBoxDetail">
                      <thead>
                        <tr>
                          <th>经度</th>
                          <th>纬度</th>
                          <th>高度</th>
                          <th>时间</th>
                          <th>操作</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in pointDataLibs" :key="index">
                          <td>{{ item.lon }}</td>
                          <td>{{ item.lat }}</td>
                          <td>{{ item.alt }}</td>
                          <td>{{ item.timestamp }}</td>
                          <td>
                            <span title="点击删除此行信息" @click="deletePoint($event, index)">删除</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <!-- <div class="windowThree">
        
              </div>-->
            </div>
            <!-- 任务记录 -->
            <div class="main-bottomBox" id="bottomBoxOn">
              <div class="left-main-foot">
                <ul id="myTab">
                  <li
                    v-for="(item, index) in myTab"
                    @click="mytabOn(item, index)"
                    :key="index"
                    :class="{ on: myTabOn == index }"
                  >{{ item.title }}</li>
                </ul>
                <div class="tabfootlibs-mission" id="show">
                  <ul class="tabmissing">
                    <!-- 右侧正在进行时列表 -->
                    <li v-for="(item, index) in missionIng" :key="index" :id="[item.id]">
                      <div
                        @click="missionDetailShow(item, index)"
                        style="width:100% ; height:100%"
                        :class="{ missionlight: missionOn == index }"
                      >
                        <p class="missionpfirst">
                          名称：
                          <span class="missioningName">{{ item.taskName }}</span>
                          <span class="missioningOngoing">
                            <span class="missiongoing">进行时</span>
                          </span>
                        </p>
                        <p>
                          开始时间：
                          <span class="missionStart">{{ item.startDate }}</span>
                        </p>
                        <p>
                          结束时间：
                          <span class="missionEnd">{{ item.endDate }}</span>
                        </p>
                      </div>
                      <span
                        class="confirmStatus"
                        @click="confirmStatu(item,index)"
                      >{{item.confirmPlan == 0 ? '确认方案':'已确认'}}</span>
                      <span class="deleteMission" @click="deleteMission(item,index)">删除</span>
                    </li>
                  </ul>
                </div>
                <div class="tabfootlibs-mission">
                  <ul class="tabmissing">
                    <!-- 右侧任务未开始列表 -->
                    <li v-for="(item, index) in missionBefor" :key="index" :id="[item.id]">
                      <div
                        @click="missionDetailShow(item, index)"
                        style="width:100% ; height:100%"
                        :class="{ missionlight: missionOn == index }"
                      >
                        <p class="missionpfirst">
                          名称：
                          <span class="missioningName">{{ item.taskName }}</span>
                          <span class="missioningOngoing">
                            <span class="missionout">未开始</span>
                          </span>
                        </p>
                        <p>
                          开始时间：
                          <span class="missionStart">{{ item.startDate }}</span>
                        </p>
                        <p>
                          结束时间：
                          <span class="missionEnd">{{ item.endDate }}</span>
                        </p>
                      </div>
                      <span
                        class="confirmStatus"
                        @click="confirmStatu(item,index)"
                      >{{item.confirmPlan == 0 ? '确认方案':'已确认'}}</span>
                      <span class="deleteMission" @click="deleteMission(item,index)">删除</span>
                    </li>
                  </ul>
                </div>
                <div class="tabfootlibs-mission">
                  <ul class="tabmissed">
                    <!-- 右侧已完成列表 -->
                    <li v-for="(item, index) in missionEd" :key="index" :id="[item.id]">
                      <p class="missionpfirst">
                        名称：
                        <span class="missioningName">{{ item.taskName }}</span>
                        <span class="missioningOngoing">
                          <span class="missioneded">已完成</span>
                        </span>
                      </p>
                      <p>
                        开始时间：
                        <span class="missionStart">{{ item.startDate }}</span>
                      </p>
                      <p>
                        结束时间：
                        <span class="missionEnd">{{ item.endDate }}</span>
                      </p>
                    </li>
                  </ul>
                </div>

                <div class="tab_middle">
                  <ul id="tab_select">
                    <li
                      v-for="(item, index) in myTabFoot"
                      :key="index"
                      :class="{ on: TabOnFoot == index }"
                      @click="tabTypeChoose(index)"
                    >{{ item.title }}</li>
                  </ul>
                </div>

                <div class="tab-topul" id="show">
                  <ul id="tab-topul" class="tabTopLibsTwos">
                    <li
                      v-for="(item, index) in typeChoose"
                      :key="index"
                      :id="typeNum == index ? 'merchinS' : ''"
                      :class="[item.title]"
                      @click="typeChange(index, item)"
                    >
                      <p class="merchin">{{ item.title }}</p>
                      <p class="merchin-num"></p>
                    </li>
                  </ul>
                </div>

                <div class="tab-topul">
                  <ul id="tab-topul1" class="tabTopLibsTwos">
                    <li
                      v-for="(item, index) in armyChoose"
                      :key="index"
                      :id="armyNum == index ? 'merchinS' : ''"
                      :class="[item.title]"
                      @click="armyChange(index, item)"
                    >
                      <p class="merchin">{{ item.title }}</p>
                      <p class="merchin-num"></p>
                    </li>
                  </ul>
                </div>
                <!-- 存放类型数据 -->
                <div class="tabfootlibs-sensor" id="show">
                  <ul class="tabfoot_allsensor">
                    <li
                      v-for="(item, index) in singleMissionList"
                      :key="index"
                      :class="[item.class]"
                    >
                      <div>
                        <div>{{ item.name }}</div>
                        <p
                          style="width:70%;text-align:left;display:inline-block"
                        >({{ item.localtion }})</p>
                        <span>{{ item.status }}</span>
                      </div>
                    </li>
                  </ul>
                </div>
                <!-- 存放军兵种数据 -->
                <div class="tabfootlibs-sensor">
                  <ul class="tabfoot_allsensor">
                    <li
                      v-for="(item, index) in singleArmsTypeList"
                      :key="index"
                      :class="[item.class]"
                    >
                      <div>
                        <div>{{ item.name }}</div>
                        <p
                          style="width:70%;text-align:left;display:inline-block"
                        >{{ item.localtion }}</p>
                        <span>{{ item.status }}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- 平台传感器 -->
            <div class="main-bottomBox">
              <div class="platformSensorTop">
                <ul class="platformTopTab">
                  <li
                    v-for="(item, index) in typeChoose"
                    :key="index"
                    :id="platFormTopNum == index ? 'merchinS' : ''"
                    :class="[item.title]"
                    @click="platFormTopSelect(item,index)"
                  >{{item.title}}</li>
                </ul>
                <ul class="platFormTopSelectDeteil">
                  <li
                    v-for="(item, index) in platFormTopDetail"
                    :key="index"
                    :class="[item.PlatType]"
                  >
                    <p>
                      <span>id&nbsp;:{{item.PlatID}}</span>
                      <span>{{item.PlatName}}</span>
                    </p>
                    <p>
                      <span>{{item.Lon}}&nbsp;{{item.Lat}}</span>
                      <span>{{item.Hei}}m &nbsp;&nbsp;{{item.Vel}}V</span>
                    </p>
                  </li>
                </ul>
              </div>
              <div class="platformSensorBottom">
                <ul class="platformBottomTab">
                  <li
                    v-for="(item, index) in platChoose"
                    :key="index"
                    :id="platFormBottomNum == index ? 'merchinS' : ''"
                    :class="[item.title]"
                    @click="platFormBottomSelect(item,index)"
                  >{{item.title}}</li>
                </ul>
                <ul class="platFormBottomSelectDeteil">
                  <li
                    v-for="(item, index) in platFormBottomDetail"
                    :key="index"
                    :class="[item.PlatType]"
                    @dblclick="issuedOrder(item)"
                  >
                    <p>
                      <span>{{item.SensorState}}</span>&nbsp;
                      <span>id&nbsp;:{{item.SensorId}}-{{item.SensorName}}</span>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import gloablUrl from "../Url/url"; //后台请求接口
import cesium from "./cesiumviewer";

export default {
  components: {
    cesium
  },
  data() {
    return {
      topTitle: '',  //大屏头部title
      percent: '', //圆圈等级
      missionLightOn: -1, //左侧中部任务进行时的class添加
      missionOn: -1, //右侧任务历史中部任务进行时的class添加
      myTabOn: 0, //左侧中部选项卡,默认选择第一个
      tabMission: "", //左侧中部选项卡详细盒子
      TabOnFoot: 0, ////左侧底部选项卡,默认选择第一个
      sensorTypeId: '', //储存所点击的任务的ID
      singleMissionList: [], //点击当前任务时放此任务的类型的详细信息
      singleArmsTypeList: [],  //点击当前任务时放此任务的军兵种的详细信息
      MissionFoot: "", //左侧底部选项卡类型选择
      typeNum: 0, //左侧底部类型UL选择,默认选择第一个
      armyNum: 0, //左侧底部军兵种UL选择,默认选择第一个
      platFormTopNum: 0, //右侧平台传感器头部类型UL选择,默认选择第一个
      platFormBottomNum: 0, //右侧平台传感器底部部类型UL选择,默认选择第一个
      platFormTopDetail: [], //右侧平台传感器头部数据详情
      AllPlatformTop: [],
      AllPlatformBottom: [],
      platFormBottomDetail: [], //右侧平台传感器底部数据详情
      platformTopTitle: '全部',
      platformBottomTitle: '全部',
      rightTabNum: 1, //右侧选项卡,默认选择第二个
      option: "", //echart
      precision: '',//目标的CEP
      targetConfidence: 50,  //目标的置信度
      toolsDetail: "", //测绘、划线等等工具
      missionStartTime: "", //所选择的任务起始时间（时间戳）
      missionEndTime: "", //所选择的任务终止时间（时间戳）
      toolsStatus: true, //测绘、划线等等工具显示的状态
      switchChage: true, //中间切换按钮控制状态
      sensorData: [], //传感器列表数据请求载体
      allSensorData: [], //传感器列表全选功能时所要用到的字段
      sensorSearchVal: "", //传感器查询字段
      sensorId: [], //选择传感器时储存所选择的传感器的id,
      zoneVal: "", //存储区域选择的字段
      toCesium: [],// 选择区域时给地图画区域的经纬度数组
      targetVal: "", //存储目标选择的字段(静态目标)
      dynamicNumber: '', //存储选择动态目标的beNumber
      dynamicName: '', //存储选择动态目标的名称
      dynamicId: '',//存储选择动态目标的targetId
      targetData: [], //存储后台返回目标的信息
      missionName: "", //存放所命名的任务名称
      missionDegree: 1, //存放等级 1 2 3 4 5 6
      missionStage: 1,//任务阶段
      VisibilityNum: 0, // 
      missionBefor: [], //存储后台传回来的未开始的任务数据
      missionIng: [], //存储后台传回来进行时的任务数据
      missionEd: [], //存储后台传回来的已结束的任务数据
      sensorC: true, //判断任务详情的可用传感器伸缩很展开
      watchC: true, //判断任务详情的检测功能伸缩很展开
      zoneInformation: "", //选择区域时的所选择区域的经纬度
      targetTrajectoryLibs: [],//存放点击的目标轨迹
      lonlatMsg: [], //点击下一步的时候将所选区域的经纬度传给后台
      sensorLibShow: [], //传回来的传感器列表
      sensorLibsOn: -1, //点击传感器列表中的某一个传感器时高亮
      lonLatLibs: [], //创建区域时的区域点坐标
      lineToBack: [], ////传过来的经纬度的原始状态需存一份传给后端
      storageName: "", //创建区域时的区域名称
      getSensorIdLibs: [],//存保存任务时确定好的传感器的ID数组
      taskId: 0, //保存任务成功后要储存返回的一个id字段
      zoneShape: 3, //区域形状
      bottomBarSingle: [], //底部bar的数据
      bottomBarLibs: [],//存放底部bar的数据
      initSensorId: [], //储存socket传过来的推荐传感器列表的ID，以作判定手动添加的传感器不能规划轨迹
      monitorSensor: [],  //任务详情盒子的任务的可用传感器数据
      monitorCatch: '',  //任务详情盒子的任务的检测功能数据
      monitorData: '',  //任务详情盒子的任务的基本信息数据
      imgFound: '',  //任务详情盒子的图像确认和目标确定
      monitorJudge: true,//任务详情弹窗的消隐藏
      pointDataLibs: [], //点击的点坐标信息
      fuseData: [], //融合目标的数据
      selectFuseSingle: '', //选中的融合目标
      socketTime: '',   //socket心跳的定时器
      defaultMissionTime: '',  //任务初始化时间设置定时器
      date: null,
      alertList: [],//地图历史弹窗消息保存
      timeDate: '',  //任务规划时默认选择当前时间加上12个小时
      socket: '',//websocket
      Namei: true,  //默认给一个任务名称
      leftBoxStatu: false,
      rightBoxStatu: false,
      beSelectTargetTitleNum: 0,  //右侧、规划目标选择默认显示第一个
      middleBottomBarNum: '', //底部bar高亮
      getTargetTra: [],  //点击下一步获取王琦的计算所得出来的目标轨迹
      getSensorTra: [],  //点击下一步获取王琦的计算所得出来的传感器轨迹
      //获取全局的laydate，带入到组件中
      laydate: window.laydate,
      //获取全局的io，带入到组件中
      io: window.io,
      myTab: [
        //左侧中部选项卡
        { title: "当前任务" },
        { title: "未开始任务" },
        { title: "历史任务" }
      ],
      myTabFoot: [
        //左侧底部部选项卡
        { title: "类型" },
        { title: "军兵种" }
      ],
      typeChoose: [
        //类型选择
        { title: "全部" },
        { title: "海基" },
        { title: "陆基" },
        { title: "空基" },
        { title: "天基" }
      ],
      armyChoose: [
        //军兵种选择
        { title: "全部" },
        { title: "海军" },
        { title: "空军" },
        { title: "军航" },
        { title: "网空" }
      ],
      platChoose: [
        //军兵种选择
        { title: "全部", num: '全部' },
        { title: "雷达", num: '雷达' },
        { title: "电侦", num: '电子' },
        { title: "通侦", num: '通信' },
        { title: "图像", num: '图像' }
      ],
      selectTargetType: [
        { title: "预警目标" },
        { title: "动态目标" },
      ],

      rightTopTab: [
        { title: "任务规划" },
        { title: "任务记录" },
        { title: "平台传感器" },
      ],
      takingSingle: [],    //单聊用户信息 ,
      takingSingleNum: 0,  //高亮
      takingSingleTitle: '',  //单聊标题
      dncID: '', //单聊要发送给后台的聊天对象的dncID
      subID: '', //单聊要发送给后台的聊天对象的subID
      ownChatText: '',  //己方聊天内容
      subIDLibs: [], //存储所有用户的subID,根据接收到的信息里的subId用来判断发信息的是谁
      zoneData: [], //选择区域时的区域信息

      leftchagne: 1, // 传参给子调整边界问题


      windowsNum: '',  //点击控制对应的类传感器弹窗出现
      windowSensorID: "", //点击的传感器ID
      // 通信类传感器弹窗数据
      communicationId: '', //目标Id
      coCollectTime: '', //开始收集时间
      coDurationTime: '', //持续时间
      coOffsetTime: '', //偏差时间
      coLocation: '', //定位收集标志
      coSide: '', //测向收集标志
      coHistory: '', //历史收集标志
      coRecognize: "", //识别收集标志
      coCenter: '', //中心频率
      coRandomRrror: '',// 频率随机误差sigma
      coReceiver: '', //接收机的宽带
      coModulation: "", //调制方式
      coAoi: '',//AOI/SOI,
      coSignal: 0, //信号放大
      coNodeNum: '', //节点个数
      coLon: '', //目标经度
      coLat: "", //目标纬度
      coHigh: '',//目标高度
      coShort: '', //误差椭圆短轴
      coLong: '', //误差椭圆长轴
      coAngle: '', //误差椭圆倾角：
      coActionMark: 0, //动作标识


      // 电子类传感器弹窗数据
      elId: '', //目标Id
      elCollectTime: '', //开始收集时间
      elDurationTime: '', //持续时间
      elOffsetTime: '', //偏差时间
      elLocation: '', //定位收集标志
      elSide: '', //测向收集标志
      elHistory: '', //历史收集标志
      elRecognize: "", //识别收集标志
      elCenter: '', //中心频率
      elLows: '', //低频测量下限频率值
      elFrequency: '', //高频测量下限频率值
      elSpecification: '', //电子信号规格号
      elConfidence: '', //电子信号的可信级别
      elRandomRrror: '',// 频率测量的1倍误差sigma估计值
      elReceiver: '', //接收机的宽带
      elModulation: "", //调制方式
      elAoi: '',//AOI/SOI,
      elSignal: 0, //信号放大
      elWidth: '', //脉冲宽度
      elInterval: '', //脉冲间隔
      elLon: '', //目标经度
      elLat: "", //目标纬度
      elHigh: '',//目标高度
      elShort: '', //误差椭圆短轴
      elLong: '', //误差椭圆长轴
      elAngle: '', //误差椭圆倾角：
      elActionMark: 0, //动作标识


      // 图像类传感器弹窗数据
      piId: '', //目标Id
      piCollectTime: '', //开始收集时间
      piDurationTime: '', //持续时间
      piOffsetTime: '', //偏差时间
      piLocation: '', //定位收集标志
      piHistory: '', //历史收集标志
      piCollectMark: "", //识别收集标志
      piSignal: '', //电子信号规格号
      piConfidence: '', //电子信号的可信级别
      piNation: '', //国家
      piAoi: '',//AOI/SOI,
      piAoiLeval: '',//AOI/SOI可信识别,
      piEnviionment: 0, //环境
      piRecognize: 0, //识别
      piLon: '', //目标经度
      piLat: "", //目标纬度
      piHigh: '',//目标高度
      piShort: '', //误差椭圆短轴
      piLong: '', //误差椭圆长轴
      piAngle: '', //误差椭圆倾角：
      piGiveUp: '', //放弃追踪标志
      piSpeed: '', //速度
      piHeading: '', //航向
      piActionMark: 0, //动作标识



      // 对海雷达类传感器弹窗数据
      seaId: '', //目标Id
      seaCollectTime: '', //开始收集时间
      seaDurationTime: '', //持续时间
      seaOffsetTime: '', //偏差时间
      seaLocation: '', //定位收集标志
      seaHistory: '', //历史收集标志
      seaLon: '', //目标经度
      seaLat: "", //目标纬度
      seaHigh: '',//目标高度
      seaShort: '', //误差椭圆短轴
      seaLong: '', //误差椭圆长轴
      seaAngle: '',//误差椭圆倾角
      seaTargetType: 0, //目标分类 select
      seaSignal: '', //电子信号规格号
      seaConfidence: '', //电子信号的可信级别
      seaTransmitter: '', //发射机扫描频率
      seaAoi: '',//AOI/SOI,
      seaAoiLeval: '',//AOI/SOI可信识别,
      seaFirstTime: '', //首次发现时间
      seaFirstLon: '', //首次发现目标经度
      seaFirstLat: '', //首次发现目标纬度
      seaFirstHight: '', //首次发现目标高度
      seaSpeed: '', //速度
      seaHeading: '', //航向
      seaTargetWidth: '', //目标宽度
      seaLength: '', //目标长度
      seaActionMark: 0, //动作标识


      // 对空雷达类传感器弹窗数据
      airId: '', //目标Id
      airCollectTime: '', //开始收集时间
      airDurationTime: '', //持续时间
      airOffsetTime: '', //偏差时间
      airLocation: '', //定位收集标志
      airHistory: '', //历史收集标志
      airLon: '', //目标经度
      airLat: "", //目标纬度
      airHigh: '',//目标高度
      airShort: '', //误差椭圆短轴
      airLong: '', //误差椭圆长轴
      airAngle: '',//误差椭圆倾角
      airTargetType: 0, //目标分类 select
      airSignal: '', //电子信号规格号
      airConfidence: '', //电子信号的可信级别
      airTransmitter: '', //发射机扫描频率
      airAoi: '',//AOI/SOI,
      airAoiLeval: '',//AOI/SOI可信识别,
      airFirstTime: '', //首次发现时间
      airFirstLon: '', //首次发现目标经度
      airFirstLat: '', //首次发现目标纬度
      airFirstHight: '', //首次发现目标高度
      airSpeed: '', //速度
      airHeading: '', //航向
      airTargetWidth: '', //目标宽度
      airLength: '', //目标长度
      airActionMark: 0, //动作标识

    };
  },

  mounted() {
    this.openSocket()  //初始化socket
    this.showDateTime(); //页面初始化时自调用,头部时间
    this.getSingleUser()  //获取单聊用户列表
    this.missionDate()   //默认给任务一个初始化时间


    this.sensorLibs(); //传感器列表数据请求
    this.zoneLibs(); //区域信息的数据请求
    this.targetLibs(); //目标信息的数据请求
    this.missionData(); //任务数据请求          
    this.getPlatformData()   //请求右侧传感器数据

    setInterval(() => {
      this.getPlatformData()   //请求右侧传感器数据，1分钟刷新一次
    }, 60000);

    this.defaultMissionTime = setInterval(() => {
      this.missionDate()   //任务的默认时间,1分钟刷新一次
    }, 60000);


    this.toolsDetail = document.getElementsByClassName("toolsBtn"); //获取中部按钮工具的每一个DOM
    this.MissionFoot = document.getElementsByClassName("tab-topul");  //获取类型、军兵种选项下的type选择盒子
    this.sensorBox = document.getElementsByClassName("tabfootlibs-sensor");  //获取类型、军兵种选项下的type选择盒子

    // 拿取大屏title
    this.topTitle = gloablUrl.URL.title


    this.laydate.render({
      //通信类时间选择器的渲染
      elem: "#communicationTime",
      type: "datetime",
      // value: this.coCollectTime,
      min: this.minDate(), //不能选择今天之前的
    });

    this.laydate.render({
      //电子类时间选择器的渲染
      elem: "#electronicTime",
      type: "datetime",
      // value: this.elCollectTime,
      min: this.minDate(), //不能选择今天之前的
    });

    this.laydate.render({
      //图像类时间选择器的渲染
      elem: "#pictureTime",
      type: "datetime",
      min: this.minDate(), //不能选择今天之前的
    });


    this.laydate.render({
      //对海类时间选择器的渲染
      elem: "#forSeaTime",
      type: "datetime",
      // value: this.seaCollectTime,
      min: this.minDate(), //不能选择今天之前的
    });
    this.laydate.render({
      //对海类传感器中首次发现时间选择器的渲染
      elem: "#seaFirstTime",
      type: "datetime",
      // value: this.seaFirstTime,
      min: this.minDate(), //不能选择今天之前的
    });

    this.laydate.render({
      //对空类时间选择器的渲染
      elem: "#forAirTime",
      type: "datetime",
      min: this.minDate(), //不能选择今天之前的
    });
    this.laydate.render({
      //对空类传感器中首次发现时间选择器的渲染
      elem: "#airFirstTime",
      type: "datetime",
      min: this.minDate(), //不能选择今天之前的
    });


  },
  destroyed() {
    // this.destorySocket()  //离开路由页面关闭时断开websocket的连接
  },
  methods: {


    // ----------头部左侧的时间显示-----------
    showDateTime() {
      var sWeek = new Array("日", "一", "二", "三", "四", "五", "六");
      var myDate = new Date();
      var sYear = myDate.getFullYear();
      var sMonth = myDate.getMonth() + 1;
      var sDate = myDate.getDate();
      var sDay = sWeek[myDate.getDay()]; //获取当日为星期几
      var hour = myDate.getHours();
      var minutes = myDate.getMinutes();
      var second = myDate.getSeconds();

      var h = this.formatTime(hour); //格式化小时，如果不足两位，则在前面加‘0’
      var m = this.formatTime(minutes);
      var s = this.formatTime(second);

      var lastDay = Number(sDate) - Number(1);
      //显示时间
      document.getElementById("topTimeY").innerHTML =
        sYear + "." + sMonth + "." + sDate;
      document.getElementById("topTimeH").innerHTML = h + ":" + m + ":" + s;


      if (this.Namei) {
        this.missionName = sYear + '' + sMonth + '' + sDate + '_' + h + m + s + '_' + 'task_1'
        this.Namei = !this.Namei
      }
      //设个定时器，一秒钟执行一次此方法
      setTimeout(this.showDateTime, 1000);
    },

    formatTime(i) {
      if (i < 10) {
        i = "0" + i;
        return i;
      }
      return i;
    },


    // ------------主要部分--------

    //任务的默认时间
    missionDate() {

      var timeBegin = new Date().getTime() + 300000
      var start = this.missionFormat(new Date(timeBegin))
      var nothing = new Date()
      var end = this.missionFormat(new Date(nothing.getTime() + 12 * 60 * 60 * 1000))
      this.timeDate = start + ' ' + '-' + ' ' + end

      this.laydate.render({
        //时间选择器的渲染
        elem: "#searchOne",
        type: "datetime",
        range: true,
        value: this.timeDate,
        min: this.minDate(), //不能选择今天之前的
        // done: value => {
        //   this.date = value;
        // }
      });

      //设个定时器，1分钟执行一次此方法
      // setTimeout(this.missionDate, 60000);
    },
    missionFormat(data) {
      var sYear = data.getFullYear();
      var sMonth = data.getMonth() + 1;
      var sDate = data.getDate();
      var minutes = data.getMinutes() >= 10 ? data.getMinutes() : '0' + data.getMinutes();
      var second = data.getSeconds() >= 10 ? data.getSeconds() : '0' + data.getSeconds();
      var hour = this.formatTime(data.getHours()); //格式化小时，如果不足两位，则在前面加‘0’
      return sYear + "-" + sMonth + "-" + sDate + ' ' + hour + ':' + minutes + ':' + second
    },


    // 地图关联跟解关联方法
    getTargetId() {
      this.$refs.child.openConnection();
    },

    //当后台有消息来通知时显示消息弹出框
    newsBoxChange() {
      this.$refs.newsBox.style.opacity = "1";
      this.$refs.newsBox.style.top = "3%";
      setTimeout(() => {
        this.$refs.newsBox.style.opacity = "0";
        this.$refs.newsBox.style.top = "1%";
      }, 5000)
    },




    mytabOn(item, index) {
      //右侧中部选项卡,点击高亮
      this.myTabOn = index;
      this.tabMission = document.getElementsByClassName("tabfootlibs-mission");
      for (var i = 0; i < this.tabMission.length; i++) {
        this.tabMission[i].id = "";
      }
      this.tabMission[index].id = "show";

      this.TabOnFoot = 0;  //类型、军兵种选择默认回归类型
      this.typeNum = 0;  //默认回归且显示类型的全部选项
      this.armyNum = 0 //军兵种也默认回归全部选项
      this.MissionFoot[1].id = "";  //默认显示类型选项下面的type盒子
      this.MissionFoot[0].id = "show";
    },

    tabTypeChoose(index) {
      //右侧底部选项卡,点击高亮
      this.TabOnFoot = index;
      for (var i = 0; i < this.MissionFoot.length; i++) {
        this.MissionFoot[i].id = "";
        this.sensorBox[i].id = "";
      }
      this.MissionFoot[index].id = "show";
      this.sensorBox[index].id = 'show'
    },

    typeChange(index, item) {
      //右侧底部类型选项点击拿去对应的类型数据
      this.typeNum = index;
      this.$axios({
        method: "get",
        url: gloablUrl.URL.testUrl + "/selectAllSensor?taskId=" + this.sensorTypeId + '&type=' + item.title,
      }).then(res => {
        // console.log('承接：',res.data.data);
        this.screenSensorData(res.data.data, 1)//筛选离线传感器和在线传感器
      });
    },

    armyChange(index, item) {
      //右侧底部军兵种选项点击拿去对应的类型数据
      this.armyNum = index;
      this.typeNum = index;
      this.$axios({
        method: "get",
        url: gloablUrl.URL.testUrl + "/selectAllSensor?taskId=" + this.sensorTypeId + '&type=' + item.title,
      }).then(res => {

        this.screenSensorData(res.data.data, 2)//筛选离线传感器和在线传感器
      });
    },

    minDate() {
      //任务日期选择器不能选择今日之前的
      var now = new Date();
      return (
        now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate()
      );
    },

    rightTab(index) {
      //右侧部分选项卡功能
      this.rightTabNum = index;
      var rightTab = document.getElementsByClassName("main-bottomBox");
      for (var i = 0; i < rightTab.length; i++) {
        rightTab[i].id = "";
      }
      rightTab[index].id = "bottomBoxOn";
    },

    //创建任务点击下一步之前需规划所选目标的轨迹
    targetTrajectory() {
      if (this.targetVal || this.dynamicId) {
        localStorage.setItem('judge', 1)
        this.$refs.child.mouseMoveLine('1');
      } else {
        alert('请先选择目标')
      }
    },

    //点击下一步的时候，进行传参数得到返回的传感器列表数据
    gobackTwo() {
      var time = document.querySelector("#searchOne").value;
      if (this.targetVal == "" && this.dynamicId == "") {   //博士部分
        alert("请选择目标");
      }
      // else if (this.targetTrajectoryLibs.length < 1) {
      //   alert("请绘制目标轨迹");
      // } 
      // else if (this.zoneVal == "") {
      //   alert("请选择区域");
      // }
      else if (time == "") {
        alert("请选择任务的起始时间");
      } else if (this.missionName == "") {
        alert("请输入任务名称");
      }
      else {
        this.missionStartTime = this.dateTime(time.split(" - ")[0]); //任务起始时间，转换为时间戳
        this.missionEndTime = this.dateTime(time.split(" - ")[1]); //任务终止时间，转换为时间戳


        // let targetSingleId = targetName.options[targetName.selectedIndex].className  //所选中的融合目标的批号targetId（Fusionid）
        let targetSingleId = this.dynamicId   //所选中的融合目标的批号targetId

        var pointLibs = ""  //目标的规划轨迹
        for (var i = 0; i < this.targetTrajectoryLibs.length - 1; i += 2) {
          pointLibs += this.targetTrajectoryLibs[i] + ',' + this.targetTrajectoryLibs[i + 1] + '|'
        }

        var zonePoints = ''  //封装区域经纬度格式
        for (var i = 0; i < this.lonlatMsg.length - 1; i += 2) {
          zonePoints += this.lonlatMsg[i] + ',' + this.lonlatMsg[i + 1] + '|'
        }

        let targetSingle = ""  //所选中的目标名称
        var targetNumber = ""    //承载目标的beNumber
        if (this.targetVal) {
          targetNumber = this.targetVal
          let targetName = document.getElementById('targetSelect')
          targetSingle = targetName.options[targetName.selectedIndex].text  //所选中的目标名称
        } else if (this.dynamicNumber) {
          targetNumber = this.dynamicNumber
          targetSingle = this.dynamicName//所选中的目标名称
        }

        var dataObj = {
          taskID: '',			//任务ID  //先空   点击下一步的时候博士会返回，开始计算的时候要返回给博士
          taskState: 2,			//1：初始状态    2：执行中；  3.完成状态    4.异常状态
          taskSource: 3,		//1：自动生成； 2.指控中心下发； 3.态势界面人工输入
          taskName: this.missionName,			//任务名称
          taskType: this.missionStage,			//任务类型
          targetID: targetSingleId,          //目标ID。"56|12"
          targetPriority: this.missionDegree, //目标优先级
          targetCode: targetNumber,		//目标代码。"WSD234|BDEE123"，benumber 
          targetName: targetSingle,			//目标名称。"RC135侦察机|海鹰号航母"
          region: zonePoints,				//侦察多边形区域。"Lon,Lat|Lon,Lat|Lon,Lat"
          plats: '',				//平台列表。"1|23|12"   先空
          sensors: '',			//传感器列表。"23|4"   先空
          weapons: '',			//武器平台列表。"21|32"  先不传
          cep: '',				//侦察精度要求  m    武器的CEP
          lon: '',				//经度  deg   先空
          lat: '',				//维度  deg   先空
          hei: '',				//高度   m    先空
          confidence: '',			//识别置信度要求   先空 
          timeBegin: this.missionStartTime,			//侦察起始时间 秒   时间戳
          timeEnd: this.missionEndTime,			//侦察结束时间 秒   时间戳
          timeInterval: '',		//侦察时间间隔 秒   时间戳  先空
          // sensorTrace: '', //此阶段传感器轨迹为空，
          targetTrace: pointLibs   //目标航迹，跟传感器轨迹这个时候也要传给王琦（后续添加的）
        }

        this.$axios({
          method: "post",
          url: gloablUrl.URL.testUrl + "/index/saveTaskIce",
          data: dataObj
        }).then(res => {
          // this.openSocket()  //开启socket
          this.sensorLibShow = [] //将上一次的所推荐得传感器列表置空
          this.$store.state.sensorTrajectory = []  //同时将vueX里面的sensorTrajectory清空
          this.$refs.loadingPage.style.display = 'block'  //开启加载动画
          this.$refs.windowOne.style.display = "none";
          this.$refs.windowTwo.style.display = "block";

          this.lonlatMsg = []  //清空所选区域的经纬度
          this.targetTrajectoryLibs = []   //置空目标轨迹坐标
        });
      }
    },


    openSocket() {   //开启sockte
      if (typeof (WebSocket) === "undefined") {
        alert('请使用谷歌游览器')
      } else {
        // //实例化socket
        this.socket = new WebSocket(gloablUrl.URL.WSUrl)
        this.socket.onopen = function () {  //开启socket
          console.log(this.readyState);
          // this.socketTime = setInterval(() => {
          //   this.send('heartBest')
          // }, 3000);
        }
        //监听socket传过来的信息

        var _self = this   //重新定义this指向
        this.socket.onmessage = function (res) {
          if (res) {
            var tag = JSON.parse(res.data).topic
            if (tag == "Task") {   //接收推荐传感器功能
              _self.$refs.loadingPage.style.display = 'none'  //当有传感器返回时，去除加载动画
              //根据提取从博士处得到的传感器ID去遍历初始化传感器列表得到对应的传感器信息
              _self.initSensorId = (JSON.parse(res.data).sensors.split('|')).map(Number)
              for (var i = 0; i < _self.initSensorId.length; i++) {
                for (var k = 0; k < _self.sensorData.length; k++) {
                  if (_self.initSensorId[i] == _self.sensorData[k].SensorId) {
                    var item = {
                      SensorName: _self.sensorData[k].SensorName,
                      SensorId: _self.sensorData[k].SensorId,
                      Lon: _self.sensorData[k].Lon,
                      Lat: _self.sensorData[k].Lat,
                      Hei: _self.sensorData[k].Hei,
                      pageSize: _self.sensorData[k].pageSize,
                      localtion: _self.sensorData[k].localtion,
                      reword: _self.sensorData[k].reword,
                      status: 1,
                    }
                    _self.sensorLibShow.push(item)
                  }
                }
              }
              _self.$store.state.sensorTrajectory = (JSON.parse(res.data)).sensorTrace   //获取计算所得的每个传感器的推荐轨迹，如果不修改推荐轨迹的情况下，则不需要自己手动规划传感器轨迹，直接将此传给博士
              _self.getTargetTra = (JSON.parse(res.data)).targetTrace   //同理同上

            } else if (tag == "SimulationResult") {    //接收仿真结果
              let result = JSON.parse(res.data)
              window.localStorage.setItem('miluResult', JSON.stringify(result))
              // _self.$axios({    //将所得的仿真结果重新推送一份给后台保存以做确认方案功能
              //   method: "post",
              //   url: gloablUrl.URL.testUrl + "/index/saveTaskScheme",
              //   data: result
              // }).then(res => {
              //   // console.log('推送仿真', res);
              // });

            } else if (tag == "Message") {   //预警消息功能
              var text = JSON.parse(res.data)
              _self.alertList.unshift(text);
              _self.$refs.child.alertReceive(text);
              if (_self.alertList.length >= 50) {
                _self.alertList.pop()   //删除最后一个元素
              }
            } else if (tag == "FreeTalk") {   //聊天接收信息功能
              let data = JSON.parse(res.data)
              var dom = document.createElement('p')
              let index = _self.subIDLibs.indexOf(JSON.stringify(data.subID))
              dom.innerHTML = '<span style="display:block;color:#999;text-align:left;margin-bottom:2px">:' + this.takingSingle[index].name + '</span><span class="otherParty">' + data.message + '</span> '
              document.getElementsByClassName('singleChatBox')[index].appendChild(dom)
            }
          } else {
            this.openSocket()  //如果心跳断开，则重新连接socket
          }
        }
        this.socket.onerror = function () {
          console.log(this.readyState);
        }
        this.socket.onclose = function () {   //关闭socket
          console.log('连接状态：', this.readyState)
        }

      }
    },

    //返回第一屏
    goBackTarget() {
      this.$refs.windowOne.style.display = "block";
      this.$refs.windowTwo.style.display = "none";

      this.zoneVal = ""
      this.zoneInformation = []
      this.$refs.child.drawPolygon(this.toCesium);  //清空区域

      this.targetTrajectoryLibs = []   //置空目标轨迹坐标
      // 删除轨迹
      this.$refs.child.removeTrace();

      //  this.$refs.loadingPage.style.display = 'block'  //开启加载动画

      this.missionDate()   //默认给任务一个初始化时间

    },

    toolsPage(e) {
      //工具按钮
      ////测绘、划线等等工具的展开与收缩
      this.allBtnToNormal(e); //除了当前点击变大外，其余都回归正常
      if (this.toolsStatus) {
        this.toolsBtnAppear(); //工具按钮出现
      } else {
        this.toolsBtnDisappear(); //工具按钮消失
        e.currentTarget.id = "";
      }
      this.toolsStatus = !this.toolsStatus;
    },
    replay(e) {
      //态势按钮
      this.allBtnToNormal(e); //除了当前点击变大外，其余都回归正常
      this.toolsBtnDisappear(); //工具按钮消失
    },

    missionPage(e, num) {

      if (num == 1) {   //表示进行动态目标规划，清除预警（静态）选择框的内容
        this.targetVal = ""
        this.dynamicNumber = e.BENumber
        this.dynamicName = e.TargetName1
        this.dynamicId = e.FusionID
        this.beSelectTargetTitleNum = 1
      }
      //任务按钮
      if (this.switchChage == true) {
        this.rightAppear();
        this.$refs.rightMain.style.display = "block";
        this.$refs.rightNews.style.display = "none";
        this.rightTabNum = 0;
        this.rightTab(this.rightTabNum);
        this.allBtnToNormal(e); //除了当前点击变大外，其余都回归正常
        this.toolsBtnDisappear(); //工具按钮消失

      } else if (this.switchChage == false) {
        return;
      }
    },
    newsPage(e) {
      //消息按钮
      if (this.switchChage == true) {
        this.allBtnToNormal(e); //除了当前点击变大外，其余都回归正常
        this.toolsBtnDisappear(); //工具按钮消失
        this.rightAppear();
        this.$refs.rightMain.style.display = "none";
        this.$refs.rightNews.style.display = "block";
      } else if (this.switchChage == false) {
        return;
      }
    },
    compound(e) {
      //fu pan
      this.$refs.child.Resuscitation()   //复盘
      this.allBtnToNormal(e); //除了当前点击变大外，其余都回归正常
      this.toolsBtnDisappear(); //工具按钮消失
    },
    switching(e) {
      //切换按钮
      this.toolsBtnDisappear(); //工具按钮消失
      this.switchChage = !this.switchChage;
      if (this.switchChage == true) {
        document.querySelector(".box4").classList.remove("MissiontoDark");
        document.querySelector(".box2").classList.remove("NewstoDark");
        document.querySelector(".box4").classList.add("seletorSmall");
        document.querySelector(".box2").classList.add("seletorSmall");
        this.$refs.compound.style.display = "none";
        this.$refs.situational.style.display = "block";
        e.currentTarget.id = "";
      } else if (this.switchChage == false) {
        document.querySelector(".box4").classList.add("MissiontoDark");
        document.querySelector(".box2").classList.add("NewstoDark");
        document.querySelector(".box4").classList.remove("seletorSmall");
        document.querySelector(".box2").classList.remove("seletorSmall");
        this.$refs.compound.style.display = "block";
        this.$refs.situational.style.display = "none";
        this.allBtnToNormal(e); //除了当前点击变大外，其余都回归正常
      }
    },

    toolsBtnDisappear() {
      //工具按钮消失
      for (var i = 0; i < this.toolsDetail.length; i++) {
        this.toolsDetail[i].style.height = "0";
      }
    },
    toolsBtnAppear() {
      //工具按钮消失
      for (var i = 0; i < this.toolsDetail.length; i++) {
        this.toolsDetail[i].style.height = "24px";
      }
    },
    allBtnToNormal(e) {
      //中部按钮除了当前点击变大外，其余都回归正常
      var parent = e.currentTarget.parentElement;
      var lis = parent.children;
      for (var i = 0; i < lis.length; i++) {
        lis[i].id = "";
      }
      if (e.currentTarget.className == "middle-btn") {
        e.currentTarget.id = "btnHover";
      } else if (e.currentTarget.classList.contains("seletorSmall") == true) {
        e.currentTarget.id = "changeScale";
      }
    },

    rightin(data) {
      //点击右侧部分出现
      this.rightAppear();

    },
    rightout() {
      //点击右侧部分消失
      this.$refs.rightIn.style.display = "block";
      this.$refs.rightOut.style.display = "none";
      this.$refs.right.style.width = "0px";
      if (this.leftBoxStatu) {
        this.$refs.middle.style.width = "84%";
      } else {
        this.$refs.middle.style.width = "100%";
        this.leftchagne = 1.25;

      }
      document.querySelector(".box4").id = "";
      document.querySelector(".box2").id = "";

      this.rightBoxStatu = false
    },

    rightAppear() {
      this.$refs.rightIn.style.display = "none";
      this.$refs.rightOut.style.display = "block";
      this.$refs.right.style.width = "20%";

      if (this.leftBoxStatu) {
        this.$refs.middle.style.width = "64%";
      } else {
        // 控制图形边界cesium
        this.leftchagne = 0.8;
        this.$refs.middle.style.width = "80%";
      }
      this.rightBoxStatu = true
    },


    //点击左侧出现
    leftin() {
      this.$refs.leftIn.style.display = "none";
      this.$refs.leftOut.style.display = "block";
      this.$refs.leftBox.style.width = "16%";
      if (this.rightBoxStatu) {
        this.$refs.middle.style.width = "64%";
      } else {
        this.$refs.middle.style.width = "84%";
      }
      this.leftBoxStatu = true
    },

    //点击zuo侧消失
    leftout() {
      this.$refs.leftIn.style.display = "block";
      this.$refs.leftOut.style.display = "none";
      this.$refs.leftBox.style.width = "0px";
      if (this.rightBoxStatu) {
        this.$refs.middle.style.width = "80%";
      } else {
        this.$refs.middle.style.width = "100%";
      }
      this.leftBoxStatu = false
    },

    //点击向上按钮底部bar出现，
    bottomBarAppear() {
      this.$refs.middleBottomBar.style.height = "144px"
      this.$refs.bottomIn.style.visibility = "hidden"
      this.$refs.bottomOut.style.visibility = "visible"
    },
    //点击向下按钮底部bar隐藏，
    bottomBarDisappear() {
      this.$refs.middleBottomBar.style.height = "0px"
      this.$refs.bottomIn.style.visibility = "visible"
      this.$refs.bottomOut.style.visibility = "hidden"
    },
    //点击bar高亮目标
    singleHightLight(item, index) {
      this.$refs.child.barHightLight(item);
      this.middleBottomBarNum = item.FusionID;
    },
    // 清除bar高亮
    clearSingleHightLight(){
      this.middleBottomBarNum ='';
    },


    sensorLibs() {
      // 传感器列表数据请求
      this.$axios({
        method: "get",
        url: gloablUrl.URL.testUrl + "/index/getSensors"
      }).then(res => {
        this.sensorData = res.data.data;
        sessionStorage.setItem("senLibs", JSON.stringify(res.data.data));
      });
    },

    //传感器搜索查询
    searchSite() {
      this.$axios({
        type: "get",
        url:
          gloablUrl.URL.testUrl +
          "/task/getSensor?sensorName=" +
          this.sensorSearchVal,
        data: { name: this.sensorSearchVal }
      }).then(res => {
        this.sensorData = res.data.data;
      });
    },

    senCheckAll() {
      //传感器点击全选功能
      this.allSensorData = [];
      this.sensorId = [];
      this.allSensorData = JSON.parse(sessionStorage.getItem("senLibs"));
      //将全选的ID放入要传给后端的ID数组里
      for (var i = 0; i < this.allSensorData.length; i++) {
        this.sensorId.push(JSON.stringify(this.allSensorData[i].SensorId));
      }
    },

    //传感器双击选择
    chooseSensor(item, index, e) {
      var obj = {};
      obj["SensorId"] = item.SensorId;
      obj["SensorName"] = item.SensorName;
      obj["Lon"] = item.Lon;
      obj["Lat"] = item.Lat;
      obj["Hei"] = item.Hei;
      obj["pageSize"] = item.pageSize;
      obj["localtion"] = item.localtion;
      obj["reword"] = item.reword;

      if (this.sensorId.indexOf(item.SensorId) < 0) {
        this.sensorId.push(item.SensorId);
        this.allSensorData.push(obj);
      }
      this.sensorData.splice(index, 1)  //将选中的传感器从初始化的传感器列表里删除
    },

    //传感器单击删除所选项
    deleteSensor(item, index, e) {
      this.allSensorData.splice(index, 1);
      this.sensorId.splice(index, 1);
      this.sensorData.push(item)   //将去除掉的传感器放回初始化传感器列表里
      this.$store.state.sensorTrajectory.splice(index, 1)  //将仓库里的此传感器信息删除
    },

    //传感器选择完确定功能
    Sendeliver() {
      // this.sensorLibShow = this.sensorLibShow.concat(this.allSensorData);
      this.sensorLibShow = this.allSensorData
      this.$refs.sensorWindow.style.display = "none";
      this.allSensorData = [];
      this.sensorId = [];
    },


    //新增传感器点击按钮传感器页面出现
    sensorPageShow() {
      this.allSensorData = this.sensorLibShow   //已选传感器列表需显示从博士所得的推荐传感器列表
      for (var i = 0; i < this.allSensorData.length; i++) {
        this.sensorId.push(this.allSensorData[i].SensorId);  //往传感器判断数组里面添加对应的传感器ID
      }
      this.deleteChoose()//将已经选择的传感器从全部传感器列表中删除
      this.$refs.sensorWindow.style.display = "block";
    },

    deleteChoose() {    //将已经选择的传感器从全部传感器列表中删除
      for (var i = 0; i < this.sensorId.length; i++) {
        for (var k = 0; k < this.sensorData.length; k++) {
          if (this.sensorId[i] == this.sensorData[k].SensorId) {
            this.sensorData.splice(k, 1)
          }
        }
      }
    },

    //传感器页面点击取消按钮传感器页面消失
    Sendisloge() {
      this.$refs.sensorWindow.style.display = "none";
    },

    //区域信息的数据请求
    zoneLibs() {
      // zonData
      this.$axios({
        type: "get",
        url: gloablUrl.URL.testUrl + "/task/getAreaList?areaType=" + 1
      }).then(res => {
        this.zoneData = res.data.data;
      });
    },

    //目标信息的数据请求
    targetLibs() {
      // zonData
      this.$axios({
        type: "get",
        url: gloablUrl.URL.testUrl + "/index/targets"
      }).then(res => {
        this.targetData = res.data.data;

      });
    },

    //监听选择预警（静态）目标框的改变
    targetChange(e) {
      // var parentNode = e.currentTarget.parentElement.parentElement;
      // var input = parentNode.getElementsByTagName("input");
      // var tagP = parentNode.getElementsByTagName("p");
      // for (var i = 0; i < input.length; i++) {
      //   input[i].style.color = "#ffffff";
      // }
      // for (var i = 0; i < tagP.length; i++) {
      //   tagP[i].style.color = "#ffffff";
      // }
      // this.$refs.degree.style.color = "#ffffff";

      // 当预警（静态）目标选择改变时，去除动态目标框的数据
      this.dynamicName = ''
      this.dynamicNumber = ''
      this.dynamicId = ''
    },

    //监听任务阶段下拉框的变化，并显示对应的选项
    stageChange(e) {
      var node = e.currentTarget
      if (node.value == 0 || node.value == 1) {
        this.VisibilityNum = 0
        this.$refs.armyChooseBox.style.visibility = "hidden"
      } else if (node.value == 2) {
        this.VisibilityNum = 1
        this.$refs.armyChooseBox.style.visibility = "hidden"
      } else if (node.value == 3) {
        this.VisibilityNum = 0
        this.$refs.armyChooseBox.style.visibility = "visible"
      }
    },

    //转换时间戳格式、
    dateTime(datetime) {
      var tmp_datetime = datetime.replace(/:/g, "-");
      tmp_datetime = tmp_datetime.replace(/ /g, "-");
      var arr = tmp_datetime.split("-");
      var now = new Date(
        Date.UTC(arr[0], arr[1] - 1, arr[2], arr[3] - 8, arr[4], arr[5])
      );
      return parseInt(now.getTime() / 1000);
    },


    //预警目标和动态目标的选择
    TargetTypeMethod(index) {
      this.beSelectTargetTitleNum = index
      console.log(this.beSelectTargetTitleNum);

    },

    //点击“融合目标” 出现融合目标弹窗并进行数据请求
    fuseBoxShow() {
      this.$axios({
        typr: "get",
        url: gloablUrl.URL.testUrl + "/index/getTableIndex"
      }).then(res => {
        this.fuseData = res.data.data.fusionTraces;
        this.$refs.fuseBox.style.display = 'block'
        // console.log(this.fuseData);
      });
    },

    //点击选中单个融合目标
    chooseFuseData(item, index) {
      var single = document.querySelector('.fuseDetail ul')
      for (var i = 0; i < single.childNodes.length; i++) {
        single.childNodes[i].className = ''
      }
      single.children[index].className = 'chooseSingleFuse'
      var obj = {
        BENumber: item.BENumber,
        TargetName: item.TargetName1,
        FusionID: item.FusionID
      }
      this.selectFuseSingle = obj
    },

    //融合目标弹窗确定按钮
    sureFuseSelect() {
      // 以前预警（静态目标）共用一个下拉框时
      // this.targetData.unshift(this.selectFuseSingle)     
      // this.targetVal = this.selectFuseSingle.BENumber
      // 现在分开
      this.dynamicNumber = this.selectFuseSingle.BENumber   //对所选择的的融合目标进行提取赋值
      this.dynamicName = this.selectFuseSingle.TargetName
      this.dynamicId = this.selectFuseSingle.FusionID
      this.targetVal = ""   //去除预警（静态目标）框的值
      this.fuseCommonFunction()
    },

    fuseCommonFunction() {    //去除高亮
      var single = document.querySelector('.fuseDetail ul')
      for (var i = 0; i < single.childNodes.length; i++) {
        single.childNodes[i].className = ''
      }
      // this.selectFuseSingle = ''
      this.$refs.fuseBox.style.display = 'none'
    },

    //任务数据请求
    missionData() {
      this.$axios({
        type: "get",
        url: gloablUrl.URL.testUrl + "/getTaskList"
      }).then(res => {
        // this.missionEd = res.data.closeTask; //已完成的
        // this.missionIng = res.data.tasking; //进行时的
        // this.missionBefor = res.data.unbeginAndTasking; //未开始的
        this.missionEd = res.data.closeTask; //已完成的
        this.missionIng = res.data.unbeginAndTasking; //进行时的
        this.missionBefor = res.data.tasking; //未开始的
      });
    },

    //任务详情可用传感器的伸缩
    sensorPageChage(e) {
      if (this.sensorC) {
        this.$refs.sensorDetailTitle.style.display = "none";
        this.$refs.sensorDetail.style.height = "37%";
        this.$refs.sensorDetailMsg.style.height = "100%";
        document
          .querySelector(".sensorDetailChange")
          .classList.add("sensorDetailChangeSecond");
        this.$refs.sensorDetailChange.style.height = "25%";
      } else {
        this.$refs.sensorDetailTitle.style.display = "block";
        this.$refs.sensorDetail.style.height = "8%";
        this.$refs.sensorDetailMsg.style.height = "0%";
        document
          .querySelector(".sensorDetailChange")
          .classList.remove("sensorDetailChangeSecond");
        this.$refs.sensorDetailChange.style.height = "100%";
      }
      this.sensorC = !this.sensorC;
    },

    //任务详情检测功能的伸缩
    watchPageChange() {
      if (this.watchC) {
        this.$refs.monitorTitle.style.display = "none";
        this.$refs.monitor.style.height = "37%";
        this.$refs.monitorMsg.style.height = "100%";
        document
          .querySelector(".monitorChange")
          .classList.add("sensorDetailChangeSecond");
        this.$refs.monitorChange.style.height = "25%";
      } else {
        this.$refs.monitorTitle.style.display = "block";
        this.$refs.monitor.style.height = "8%";
        this.$refs.monitorMsg.style.height = "0%";
        document
          .querySelector(".monitorChange")
          .classList.remove("sensorDetailChangeSecond");
        this.$refs.monitorChange.style.height = "100%";
      }
      this.watchC = !this.watchC;
    },

    //选择区域时的显示经纬度
    chooseZone() {
      this.$axios({
        type: "get",
        url: gloablUrl.URL.testUrl + "/task/getArea?areaId=" + this.zoneVal
      }).then(res => {
        var respoint = JSON.parse(res.data.data.point);
        var lonlatarray = []; //拆分点数组，放入渲染区
        this.toCesium = []
        for (let i = 0; i < respoint.length - 2; i += 2) {
          lonlatarray.push({
            lon: this.getEW(Number(respoint[i]).toFixed(4)),
            lat: this.getSN(Number(respoint[i + 1]).toFixed(4))
          });
          this.lonlatMsg.push(Number(respoint[i]).toFixed(4))
          this.lonlatMsg.push(Number(respoint[i + 1]).toFixed(4)); //点击下一步的时候需要传给后台
        }
        for (let i = 0; i < respoint.length; i++) {
          this.toCesium.push(Number(respoint[i]))
        }

        this.zoneInformation = lonlatarray;
        this.$refs.child.drawPolygon(this.toCesium);
        respoint = []
        lonlatarray = []
        this.toCesium = []
      });
    },

    //绘制
    emitClick(num) {
      this.$refs.paintBox.style.opacity = "1";
      this.$refs.paintBox.style.top = "2%";
      this.$refs.paintBox.innerHTML = "单击右键结束操作";
      setTimeout(() => {
        this.$refs.paintBox.style.opacity = "0";
        this.$refs.paintBox.style.top = "1%";
      }, 4000)
      if (num == 3) {
        // this.$refs.child.emitClick(3);
        this.$refs.child.stadiometry();
      } else {
        this.$refs.child.mouseMovepoly();
      }
    },

    //结束绘制时创建区域
    tranlonlatSecond(line) {
      if (line.length > 0) {
        var name = this.getFormatTime(new Date())

        this.storageName = name
        this.$refs.storageBox.style.display = "block";
        var keepLine = [];
        var arr = "";
        for (var i = 0; i < line.length; i++) {
          line[i] = line[i].toFixed(5);
        }

        this.lineToBack = line; //传过来的经纬度的原始状态需存一份传给后端
        for (var k = 0; k < line.length; k += 2) {
          arr = this.getEW(line[k]) + " , ";
          arr += this.getSN(line[k + 1]);
          keepLine.push(arr);
          arr = "";
        }
        this.lonLatLibs = keepLine;
      }
    },


    getFormatTime(myDate) {
      var sYear = myDate.getFullYear();
      var sMonth = myDate.getMonth() + 1;
      var sDate = myDate.getDate();
      var hour = myDate.getHours();
      var minutes = myDate.getMinutes();
      var second = myDate.getSeconds();

      var h = this.formatTime(hour); //格式化小时，如果不足两位，则在前面加‘0’
      var m = this.formatTime(minutes);
      var s = this.formatTime(second);

      return sYear + '' + sMonth + '' + sDate + '_' + h + m + s + '_' + 'region_1'

    },

    //判断经纬度
    getEW(e) {
      if (e > 0) {
        return e + "°E";
      } else if (e < 0) {
        return -e + "°W";
      }
    },

    getSN(e) {
      if (e > 0) {
        return e + "°N";
      } else if (e < 0) {
        return -e + "°S";
      }
    },

    //区域保存按钮
    saveStorage() {
      if (this.storageName == "") {
        alert("请填写完整信息");
      } else {
        let areaName = this.storageName;
        let graphicsType = this.zoneShape;
        let areaType = 1;
        let point = JSON.stringify(this.lineToBack)

        let url = gloablUrl.URL.testUrl + "/task/area";

        axios
          .post(url, {
            areaName,
            graphicsType,
            areaType,
            point
          })
          .then(res => {
            if (res.data.status == 1) {
              this.zoneLibs(); //区域信息的数据请求
              this.lonLatLibs = [];
              this.storageName = "";
              alert("保存成功");
              this.$refs.storageBox.style.display = 'none'
              this.$refs.child.removeMap();
            }
          });
      }
    },
    //区域取消按钮
    cancelStorage() {
      this.$refs.storageBox.style.display = "none";
      this.$refs.child.removeMap();

    },

    //选点功能
    choosePoint() {
      this.$refs.child.emitClick(1);
    },
    //删除所选点功能
    deletePoint(e, index) {
      this.pointDataLibs.splice(index, 1);
      // e.target.parentElement.parentElement.remove()
      this.$store.state.pointData.splice(index, 1);
    },

    //  点击传感器规划此传感器的轨迹
    sensorTrajectory(item, index) {
      // if (this.initSensorId.indexOf(Number(item.SensorId)) > -1) {
      //   this.sensorLibsOn = index //高亮显示
      //   // this.$store.state.sensorTrajectory[index]['id'] = Number(item.SensorId)
      //   this.$refs.child.mouseMoveLine('2', index)
      // } else {
      //   alert('手选传感器不能规划轨迹')
      // }

      this.sensorLibsOn = index //高亮显示
      this.$refs.child.mouseMoveLine('2', index)
    },

    //点击删除单个传感器
    removeSensor(item, index) {
      var sure = confirm('确定删除此传感器吗')
      if (sure == true) {
        this.$store.state.sensorTrajectory.splice(index, 1)  //将仓库里的此传感器信息删除
        this.sensorLibShow.splice(index, 1)  //将显示的传感器列表里的此传感器信息删除
      } else if (sure == false) {
      }
      this.sensorData.push(item)
    },


    //保存任务、
    saveAllTarget() {
      this.getSensorIdLibs = []; //存保存任务时确定好的传感器的ID数组清空
      for (var i = 0; i < this.sensorLibShow.length; i++) {
        this.getSensorIdLibs.push(this.sensorLibShow[i].SensorId);
      }

      var pointLibs = ""  //目标的规划轨迹
      for (var i = 0; i < this.targetTrajectoryLibs.length - 1; i += 2) {
        pointLibs += this.targetTrajectoryLibs[i] + ',' + this.targetTrajectoryLibs[i + 1] + '|'
      }


      var sensorIdLibs = this.getSensorIdLibs.join(',')   //传感器列表

      var time = document.querySelector("#searchOne").value;
      let url = gloablUrl.URL.testUrl + "/task/saveTask";

      let targetSingle = ""  //所选中的目标名称
      var targetNumber = ""    //承载目标的beNumber
      if (this.targetVal) {
        targetNumber = this.targetVal
        let targetName = document.getElementById('targetSelect')
        targetSingle = targetName.options[targetName.selectedIndex].text  //所选中的目标名称
      } else if (this.dynamicNumber) {
        targetNumber = this.dynamicNumber
        targetSingle = this.dynamicName//所选中的目标名称
      }

      var targetObj = {
        targetId: targetNumber,
        cep: this.precision,
        confidenceRation: this.targetConfidence,
        targetName: targetSingle,
      }

      let areaId = this.zoneVal[0]  //所选择的区域ID
      let danderLevel = this.missionDegree;
      let startDate = time.split(" - ")[0];
      let endDate = time.split(" - ")[1];
      let engine = 2;
      let engine1 = 1;
      let engine2 = 3;
      let taskName = this.missionName;
      let targetInfo = targetObj   //所选目标
      let sensorInfoArr = sensorIdLibs   //传感器Id
      let targetTrace = pointLibs   //目标轨迹
      axios.post(url, { areaId, danderLevel, startDate, endDate, engine, engine1, engine2, taskName, targetInfo, sensorInfoArr, targetTrace })
        .then(res => {
          if (res.data.status == 1) {
            // alert("保存成功");
            this.taskId = res.data.data;
            this.missionDate()   //刷新默认给任务的一个初始化时间
            this.Namei = !this.Namei   //改变任务默认名称判断条件，重新赋值新的任务名称
            this.missionData(); //任务数据请求
            this.beginCal()  //保存任务成功后才进行仿真
            this.goBackTarget()  //返回第一屏
          } else {
            alert(res.data.message);
          }
        });
    },
    //开始计算字段
    beginCal() {
      // this.saveAllTarget()    //保存任务
      //博士部分
      // console.log('传给王琦的：', this.targetTrajectoryLibs);   //目标轨迹的详细信息
      var sensorIdLibs = []
      for (var i = 0; i < this.sensorLibShow.length; i++) {
        sensorIdLibs.push(this.sensorLibShow[i].SensorId);
      }
      sensorIdLibs = sensorIdLibs.join('|')   //最终确定时的传感器ID列表

      let targetSingle = ""  //所选中的目标名称
      var targetNumber = ""    //承载目标的beNumber
      if (this.targetVal) {
        targetNumber = this.targetVal
        let targetName = document.getElementById('targetSelect')
        targetSingle = targetName.options[targetName.selectedIndex].text  //所选中的目标名称
      } else if (this.dynamicNumber) {
        targetNumber = this.dynamicNumber
        targetSingle = this.dynamicName//所选中的目标名称
      }

      //需传给博士的数据
      let taskID = this.taskId	//任务ID
      let taskName = ''			//任务名称
      let planID = 0			//方案ID
      let planName = ''			//方案名称
      let targetID = ''    //目标ID。"56|12"
      let targetCode = targetNumber//目标代码beNnumber。"WSD234|BDEE123"
      let targetName = targetSingle		//目标名称。"RC135侦察机|海鹰号航母"
      let targetTrace = this.getTargetTra	//目标航迹,从王琦那得来的在原本规划目标轨迹基础上计算的更加细致
      let sensorList = sensorIdLibs
      let sensorTrace = this.$store.state.sensorTrajectory	//传感器航迹
      let timeBegin = this.missionStartTime		//侦察起始时间
      let timeEnd = this.missionEndTime	//侦察结束时间
      let timeInterval = ''	//侦察时间间隔


      let url = gloablUrl.URL.testUrl + "/index/savePlan";   //请求地址

      axios
        .post(url, {
          taskID, taskName, planID, planName, targetID, targetCode, targetName, targetTrace, sensorList, sensorTrace, timeBegin, timeEnd, timeInterval
        })
        .then(res => {
          window.localStorage.setItem('miluResult', '')   //清空上一次的仿真结果
          this.$store.state.loading += 1   //使仿真计算结果等待loading图出现
          this.milulationOPen()  //打开仿真页面
          // 删除轨迹
          this.$refs.child.removeTrace();

        });
    },

    //点击右侧任务记录中的进行中任务出现此任务的任务详细框
    missionDetailShow(item, index) {
      //拿取任务ID去获取此任务详情
      if (this.missionOn !== index) {
        // this.changeDegree(item, index)  //获取此任务的传感器信息
        this.missionOn = index
        this.$axios({
          type: "get",
          url: gloablUrl.URL.testUrl + "/task/getTaskDetail?taskId=" + item.id
        }).then(res => {
          this.imgFound = res.data.data.imgFound   //图像确认与位置确认图
          this.monitorSensor = res.data.data.sensors   //可用传感器
          this.monitorData = res.data.data.taskInfo   //基本信息
          this.monitorCatch = res.data.data.targetInfo   //检测功能
          this.$refs.historyDetail.style.display = 'block'   //显示任务详情盒子
        })
      } else {
        this.$refs.historyDetail.style.display = 'none'   //显示任务详情盒子
        this.missionOn = -1
      }


    },


    //确认方案按钮
    confirmStatu(item, index) {
      if (item.confirmPlan == 0) {
        this.$axios({
          type: "get",
          url: gloablUrl.URL.testUrl + "/index/planVerify?taskId=" + item.id
        }).then(res => {
          alert(res.data.message)
          if (res.data.status == 1) {
            this.missionData(); //再一次任务数据请求   
          }
        })
      } else if (item.confirmPlan == 1) {
        alert('此方案已被确认过')
      }
    },


    //删除方案按钮
    deleteMission(item, index) {
      var sure = confirm('确定删除此任务？')
      if (sure == true) {
        this.$axios({
          type: "get",
          url: gloablUrl.URL.testUrl + "/task/delete?taskId=" + item.id
        }).then(res => {
          if (res.data.status == 1) {
            this.missionData(); //再一次任务数据请求  
          }
        })
      } else {

      }
    },


    //默认请求右侧传感器数据
    getPlatformData() {
      this.$axios({
        method: "get",
        url: gloablUrl.URL.testUrl + "/index/getMap"
      }).then(res => {

        for (var i = 0; i < res.data.data.plateforms.length; i++) {
          res.data.data.plateforms[i].Lon = this.getEW(Number(res.data.data.plateforms[i].Lon).toFixed(2))
          res.data.data.plateforms[i].Lat = this.getSN(Number(res.data.data.plateforms[i].Lat).toFixed(2))
        }
        for (var i = 0; i < res.data.data.sensors.length; i++) {
          if (res.data.data.sensors[i].SensorState == 0) {
            res.data.data.sensors[i].SensorState = '失效'
          } else if (res.data.data.sensors[i].SensorState == 1) {
            res.data.data.sensors[i].SensorState = '正常'
          } else if (res.data.data.sensors[i].SensorState == 2) {
            res.data.data.sensors[i].SensorState = '降级'
          } else if (res.data.data.sensors[i].SensorState == 3) {
            res.data.data.sensors[i].SensorState = '拒绝'
          }
        }
        this.AllPlatformTop = res.data.data.plateforms
        this.AllPlatformTBottom = res.data.data.sensors

        this.selectPlatform(this.platformTopTitle)   //挑选头部平台
        this.selectSensors(this.platformBottomTitle)  //挑选底部传感器


      });
    },


    //右侧平台传感器页面按钮高亮状态和数据类型选择
    platFormTopSelect(item, index) {
      this.platFormTopNum = index
      this.platformTopTitle = item.title
      this.selectPlatform(item.title)
    },

    //挑选平台
    selectPlatform(title) {
      this.platFormTopDetail = []
      if (title !== '全部') {
        for (var i = 0; i < this.AllPlatformTop.length; i++) {
          if (this.AllPlatformTop[i].PlatType == title) {
            this.platFormTopDetail.push(this.AllPlatformTop[i])
          }
        }
      } else {
        this.platFormTopDetail = this.AllPlatformTop
      }
    },


    //右侧平台传感器页面按钮高亮状态和数据类型选择
    platFormBottomSelect(item, index) {
      this.platFormBottomNum = index
      this.platformBottomTitle = item.num
      this.selectSensors(item.num)
    },


    //挑选传感器
    selectSensors(title) {
      this.platFormBottomDetail = []
      if (title !== '全部') {
        for (var i = 0; i < this.AllPlatformTBottom.length; i++) {
          if (this.AllPlatformTBottom[i].SensorType.indexOf(title) > 0) {
            this.platFormBottomDetail.push(this.AllPlatformTBottom[i])
          }
        }
      } else {
        this.platFormBottomDetail = this.AllPlatformTBottom
      }
    },


    // 点击不同类型的传感器，显示对应的类型传感器下发命令弹窗
    issuedOrder(item) {
      this.windowsNum = item.SensorType.slice(0, 1)
      console.log(item);
      this.windowSensorID = item.SensorId
    },

    //点击下发命令弹窗取消按钮，弹窗消失
    windowsNone() {
      this.windowsNum = 0
    },


    //通信类传感器下发命令
    communicationOrder() {
      let sensorCmd = {
        topic: "PFU_P_CommCmd",
        sensorId: this.windowSensorID,  //传感器ID
        tdSn: this.communicationId, //目标ID
        timeCollectionStr: document.getElementById('communicationTime').value, //开始收集时间
        taskDuration: this.coDurationTime, //持续时间
        timeVariance: this.coOffsetTime, //偏差时间
        location: this.coLocation ? 1 : 0, //定位收集标志
        df: this.coSide ? 1 : 0,  //测向收集标志
        history: this.coHistory ? 1 : 0,  //历史收集标志
        identity: this.coRecognize ? 1 : 0,  //识别收集标志
        rfFrequency: this.coCenter, //中心频率
        rfSigma: this.coRandomRrror, //频率随机误差sigma
        bandWidth: this.coReceiver, //接收机的宽带
        modulation: this.coModulation, //调制方式
        aoisoi: this.coAoi, //AOI/SOI
        signalAmplification: this.coSignal, //信号放大
        numberOfNodes: this.coNodeNum, //节点个数
        emitterLongitude: this.coLon, //目标经度
        emitterLatitude: this.coLat, //目标纬度
        emitterElevation: this.coHigh, //目标高度
        semiMajorAxis: this.coShort, //误差椭圆短轴
        semiMinorAxis: this.coLong, //误差椭圆长轴
        orientation: this.coAngle, //误差椭圆倾角：
        action: this.coActionMark, //动作标识
      }
      this.issuedAnOrder(sensorCmd)  //下发命令
    },



    //电子类传感器下发命令
    eletronicOrder() {
      alert(123)
      let sensorCmd = {
          topic:"PFU_P_ElectCmd",
        sensorId: this.windowSensorID,  //传感器ID
        tdSn: this.elId, //目标ID
        timeCollectionStr: document.getElementById('electronicTime').value, //开始收集时间
        taskDuration: this.elDurationTime, //持续时间
        timeVariance: this.elOffsetTime, //偏差时间
        location: this.elLocation ? 1 : 0, //定位收集标志
        df: this.elSide ? 1 : 0,  //测向收集标志
        history: this.elHistory ? 1 : 0,  //历史收集标志
        identity: this.elRecognize ? 1 : 0,  //识别收集标志
        rfFrequency: this.elCenter, //中心频率
        frequencyLow: this.elLows, //低频测量下限频率值
        frequencyHigh: this.elFrequency, //高频测量下限频率值
        rfSigma: this.elRandomRrror, //频率测量的1倍误差sigma估计值
        ELNOT: this.elSpecification, //电子信号规格号
        ELNOTConfidence: this.elConfidence, //电子信号的可信级别
        bandWidth: this.elReceiver, //接收机的宽带
        modulation: this.elModulation, //调制方式
        aoisoi: this.elAoi, //AOI/SOI
        signalAmplification: this.elSignal, //信号放大
        pulseWidth: this.elWidth, //脉冲宽度
        PRIGRI: this.elInterval, //脉冲间隔
        emitterLongitude: this.elLon, //目标经度
        emitterLatitude: this.elLat, //目标纬度
        emitterElevation: this.elHigh, //目标高度
        semiMajorAxis: this.elShort, //误差椭圆短轴
        semiMinorAxis: this.elLong, //误差椭圆长轴
        orientation: this.elAngle, //误差椭圆倾角：
        action: this.elActionMark, //动作标识
      }
      this.issuedAnOrder(sensorCmd)  //下发命令
    },




    //图像类传感器弹窗数据
    pictureOrder() {
      let sensorCmd = {
          topic:"PFU_P_ImageCmd",
        sensorId: this.windowSensorID,  //传感器ID
        tdSn: this.piId, //目标ID
        timeCollectionStr: document.getElementById('pictureTime').value, //开始收集时间
        taskDuration: this.piDurationTime, //持续时间
        timeVariance: this.piOffsetTime, //偏差时间
        location: this.piLocation ? 1 : 0, //定位收集标志
        history: this.piHistory ? 1 : 0,  //历史收集标志
        identity: this.piCollectMark ? 1 : 0,  //识别收集标志
        ELNOT: this.piSignal, //电子信号规格号
        ELNOTConfidence: this.piConfidence, //电子信号的可信级别
        nationality: this.piNation, //国家
        aoisoi: this.piAoi, //AOI/SOI
        aoisoiConfidence: this.piAoiLeval, //AOI/SOI可信识别
        symbolEnvironment: this.piEnviionment, //环境
        symbolIdentity: this.piRecognize, //识别
        emitterLongitude: this.piLon, //目标经度
        emitterLatitude: this.piLat, //目标纬度
        emitterElevation: this.piHigh, //目标高度
        semiMajorAxis: this.piShort, //误差椭圆短轴
        semiMinorAxis: this.piLong, //误差椭圆长轴
        orientation: this.piAngle, //误差椭圆倾角：
        dropTrackFlag: this.piGiveUp ? 1 : 0,  //放弃追踪标志
        speed: this.piSpeed, //速度
        heading: this.piHeading, //航向
        action: this.piActionMark, //动作标识
      }
      this.issuedAnOrder(sensorCmd)  //下发命令
    },



    //对海雷达类传感器弹窗数据
    forSeaOrder() {
      let sensorCmd = {
          topic:"PFU_P_SeaRadarCmd",
        sensorId: this.windowSensorID,  //传感器ID
        tdSn: this.seaId, //目标ID
        timeCollectionStr: document.getElementById('forSeaTime').value, //开始收集时间
        taskDuration: this.seaDurationTime, //持续时间
        timeVariance: this.seaOffsetTime, //偏差时间
        location: this.seaLocation ? 1 : 0, //定位收集标志
        history: this.seaHistory ? 1 : 0,  //历史收集标志
        emitterLongitude: this.seaLon, //目标经度
        emitterLatitude: this.seaLat, //目标纬度
        emitterElevation: this.seaHigh, //目标高度
        semiMajorAxis: this.seaShort, //误差椭圆短轴
        semiMinorAxis: this.seaAngle, //误差椭圆长轴
        orientation: this.piAngle, //误差椭圆倾角：
        targetClassification: this.seaTargetType, //目标分类
        ELNOT: this.seaSignal, //电子信号规格号
        ELNOTConfidence: this.seaConfidence, //电子信号的可信级别
        scanPeriod: this.seaTransmitter, //电子信号的可信级别
        aoisoi: this.seaAoi, //AOI/SOI
        aoisoiConfidence: this.seaAoiLeval, //AOI/SOI可信识别
        timeFirstObserved: document.getElementById('seaFirstTime').value, //首次发现时间
        longitudeFirstObserved: this.seaFirstLon, //首次发现目标经度
        latitudeFirstObserved: this.seaFirstLat, //首次发现目标纬度
        elevationFirstObserved: this.seaFirstHight, //首次发现目标高度
        speed: this.seaSpeed, //速度
        heading: this.seaHeading, //航向
        width: this.seaTargetWidth, //目标宽度
        length: this.seaLength, //目标长度
        action: this.seaActionMark, //动作标识
      }
      this.issuedAnOrder(sensorCmd)  //下发命令

    },



    //对空雷达类传感器弹窗数据
    forAirOrder() {
      let sensorCmd = {
        topic:"PFU_P_AirRadarCmd",
        sensorId: this.windowSensorID,  //传感器ID
        tdSn: this.airId, //目标ID
        timeCollectionStr: document.getElementById('forAirTime').value, //开始收集时间
        taskDuration: this.airDurationTime, //持续时间
        timeVariance: this.airOffsetTime, //偏差时间
        location: this.airLocation ? 1 : 0, //定位收集标志
        history: this.airHistory ? 1 : 0,  //历史收集标志
        emitterLongitude: this.airLon, //目标经度
        emitterLatitude: this.airLat, //目标纬度
        emitterElevation: this.airHigh, //目标高度
        semiMajorAxis: this.airShort, //误差椭圆短轴
        semiMinorAxis: this.airLong, //误差椭圆长轴
        orientation: this.airAngle, //误差椭圆倾角：
        targetClassification: this.airTargetType, //目标分类
        ELNOT: this.airSignal, //电子信号规格号
        ELNOTConfidence: this.airConfidence, //电子信号的可信级别
        scanPeriod: this.airTransmitter, //发射机扫描速率
        aoisoi: this.airAoi, //AOI/SOI
        aoisoiConfidence: this.airAoiLeval, //AOI/SOI可信识别
        timeFirstObserved: document.getElementById('airFirstTime').value, //首次发现时间
        longitudeFirstObserved: this.airFirstLon, //首次发现目标经度
        latitudeFirstObserved: this.airFirstLat, //首次发现目标纬度
        elevationFirstObserved: this.airFirstHight, //首次发现目标高度
        speed: this.airSpeed, //速度
        heading: this.airHeading, //航向
        width: this.airTargetWidth, //目标宽度
        length: this.airLength, //目标长度
        action: this.airActionMark, //动作标识
      }
      this.issuedAnOrder(sensorCmd)  //下发命令
    },

    //下发命令
    issuedAnOrder(data) {
      this.$axios({
        method: "post",
        url: gloablUrl.URL.testUrl + "/index/sensorCmd",
        data: data
      }).then(res => {
        if (res.data.status == 1) {
          alert("下发命令成功")
          this.windowsNum = 0
        }
      });
    },



    //获取单聊用户列表
    getSingleUser() {
      this.$axios({
        type: 'GET',
        url: gloablUrl.URL.testUrl + '/chat/findNetMap',
      }).then(res => {
        this.takingSingle = res.data
        this.takingSingleTitle = this.takingSingle[0].name
        this.dncID = this.takingSingle[0].dncID
        this.subID = this.takingSingle[0].subID
        for (var i in res.data) {
          this.subIDLibs.push(res.data[i].subID)
        }
      })
    },

    //点击单个用户名
    singleCahtShow(item, index) {
      this.takingSingleNum = index
      this.takingSingleTitle = item.name
      this.dncID = item.dncID
      this.subID = item.subID
    },

    //单聊发送按钮
    sendMsgBottom() {
      if (this.ownChatText) {
        var dom = document.createElement('p')
        dom.innerHTML = '   <span style="display:block;color:#999;text-align:right;margin-bottom:2px">:我</span><span class="thrieOwn">' + this.ownChatText + '</span> '
        dom.className = 'ownTextBox'
        document.getElementsByClassName('singleChatBox')[this.takingSingleNum].appendChild(dom)

        this.$axios({
          method: 'POST',
          url: gloablUrl.URL.testUrl + '/chat/freeTalk',
          data: {
            subId: this.subID,
            dncId: this.dncID,
            message: this.ownChatText,
          },
        }).then(res => {
          //  发送完消息后清空消息框
          this.ownChatText = ''
        })
      }
    },





    //点击前往武器库
    armsPartShow() {
      window.open("/#/armsPage", "_blank");
    },
    //点击前往目标库
    targetPartShow() {
      window.open("/#/targetPage", "_blank");
    },
    //打开仿真页面
    milulationOPen() {
      window.open("/#/milulation", "_blank");
    },
    //点击前往传感器库
    sensorPartShow() {
      window.open("/#/sensorPage", "_blank");
    },
    rulesPartShow() {
      window.open("/#/rulesPage", "_blank");
    },
    picPageShow() {
      window.open("/#/tablePage", "_blank");
    },

  },

  computed: {
    getPoint() {
      this.pointDataLibs = this.$store.state.pointData;
      return this.$store.state.pointData;
    },
    trajectory() {
      this.targetTrajectoryLibs = this.$store.state.targetTrajectory;
    },
    bottomBarDetail() {


    }
  },
  watch: {
    getPoint() {
      // console.log(this.pointDataLibs);
    },
    trajectory() {
      // console.log(this.targetTrajectoryLibs);
    },
    bottomBarDetail() {

    }

  }
};
</script>


<style  >
@import "../css/mainPage.css";
</style>
