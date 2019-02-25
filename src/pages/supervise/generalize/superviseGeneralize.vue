<template>
  <div class="mainbox">
    <ul>
      <li class="main-left">
        <div class="chart-title">
          全市区域数据分布图<span class="chart-title-right el-icon-location" @click="">北京</span>
        </div>
        <div class="chart-form">
          <form name="chartForm" ref="chartForm">
            <span class="radio-group">
              <label for="year" class="s-radios" :class="{active: chartForm.pickTime === 'year'}">
                <input type="radio" id="year" value="year" v-model="chartForm.pickTime" @click="findDifTimeUnitData"/>
                年</label>
              <label for="season" class="s-radios" :class="{active: chartForm.pickTime === 'season'}">
                <input type="radio" id="season" value="season" v-model="chartForm.pickTime"
                       @click="findDifTimeUnitData"/>
                季</label>
              <label for="month" class="s-radios" :class="{active: chartForm.pickTime === 'month'}">
                <input type="radio" id="month" value="month" v-model="chartForm.pickTime" @click="findDifTimeUnitData"/>
                月</label>
            </span>
            <span class="ipt-txt">
              <el-date-picker :type="chartForm.pickTime==='season'?'year':chartForm.pickTime"
                              placeholder="选择日期"
                              v-model="chartForm.packDate" @change="getGeneralizeInfo"></el-date-picker>
              <!--<input type="text">-->
            </span>
            <span class="s-select">
              <el-select v-model="chartForm.selectedSeason" placeholder="" v-if="chartForm.pickTime === 'season'"
                         @change="getGeneralizeInfo">
                <el-option label="第一季度" value="1"></el-option>
                <el-option label="第二季度" value="2"></el-option>
                <el-option label="第三季度" value="3"></el-option>
                <el-option label="第四季度" value="4"></el-option>
              </el-select>
            </span>
          </form>
        </div>
        <div id="chinaMap" class="chart-box" style="height: 600px"></div>
      </li>
      <li class="main-right">
        <dl class="infobox">
          <dt><span>平台交易情况统计</span></dt>
          <dd>
            <div class="info-detail w33-3">
              <span>交易金额（万元）</span>
              <a class="info-item s-lightblue" @click="findOrderSumAndRate">
                <span v-if="tradeInfo.requestMoney == '--'">{{tradeInfo.requestMoney}}</span>
                <span v-if="item != '-'" v-for="(item,index) in tradeInfo.requestMoney" :key="index" class="flip-number"
                      :data-num="item"></span>
              </a>
            </div>
            <div class="info-detail w33-3">
              <span>到货金额（万元）</span>
              <a class="info-item s-lightyellow" @click="findReceiveSumAndRate">
                <span v-if="tradeInfo.receiveMoney == '--'">{{tradeInfo.receiveMoney}}</span>
                <span v-if="item != '-'" v-for="(item,index) in tradeInfo.receiveMoney" :key="index" class="flip-number"
                      :data-num="item"></span>
              </a>
            </div>
            <div class="info-detail w33-3">
              <span>到货率</span>
              <a class="info-item s-lightgreen" @click="findReceiveRate">
                <span v-if="tradeInfo.moneyChangeRate == '--'">{{tradeInfo.moneyChangeRate}}</span>
                <span v-if="item != '-'" v-for="(item,index) in tradeInfo.moneyChangeRate" class="flip-number"
                      :data-num="item"></span>
                <span style="position: absolute;">%</span>
              </a>
            </div>
            <!--<div class="info-detail w25">-->
            <!--<span>药品短缺种类</span>-->
            <!--<a class="info-item s-lightred" @click="findShortageTypeNum">{{tradeInfo.shortageTypeNum}}</a>-->
            <!--</div>-->
          </dd>
        </dl>

        <dl class="infobox">
          <dt>
            <form ref="roleForm" name="roleForm">
              <span class="radio-group">
                <label for="medical" class="s-radios lg" :class="{active: roleForm === 'medical'}">
                  <input type="radio" id="medical" value="medical" v-model="roleForm"/>
                  医疗机构</label>
                <label for="deliver" class="s-radios lg" :class="{active: roleForm === 'deliver'}">
                  <input type="radio" id="deliver" value="deliver" v-model="roleForm"/>
                  配送企业</label>
                <label for="manufacture" class="s-radios lg" :class="{active: roleForm === 'manufacture'}">
                  <input type="radio" id="manufacture" value="manufacture" v-model="roleForm"/>
                  生产企业</label>
              </span>
            </form>
          </dt>
          <dd>
            <div class="info-detail w33-3" v-for="(item,index) in dataList" :key="index">
              <span>{{ item.name }}</span>
              <a class="info-item s-lightblue" :class="dataStyle(index)" @click='item.methodName'>
                <span v-if="item.value[0] == '-'">--</span>
                <span v-if="valItem != '-'" :key="index" v-for="(valItem,index) in item.value" class="flip-number number-animate"
                      :data-num="valItem"></span>
              </a>
            </div>
          </dd>
        </dl>

        <dl class="infobox">
          <dt><span>消息</span></dt>
          <dd>
            <div class="info-list" v-if="newsList.length>0" v-for="(item, index) in newsList">
              <span class="list-txt">{{item.newsTitle}}</span>
              <span class="list-time">{{item.newsTime}}</span>
            </div>
            <div class="info-blank" v-if="newsList.length===0">
              暂无消息
            </div>
          </dd>
        </dl>
      </li>
    </ul>


    <!-- 弹窗 -->
    <div class="graphic-layer" :style="{'display': popChart.hideChart ? 'none':'table'}">
      <img src="../common/images/border-left.svg" style="left:-2%"/>
      <div id="chart" class="graphic-inner"></div>
      <i class="btn-zoom iconfont" :class="popChart.isZoom ? 'icon-zoomin' : 'icon-zoomout'"
         @click="handleZooming()"></i>
      <img src="../common/images/border-right.svg" style="right:-1.1%"/>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  import {
    cityMap,
    provinces,
    special,
    getMapData,
    getTradeInfo,
    getSumOrgNum,
    getProductTypeNum,
    getJsonData,
    getOrgNum,
    getMedicalType,
    findRequestMoneyAndRate,
    findReceiveMoneyAndRate,
    findReceiveAndRequestMoney,
    getFirstDateOfYear
  } from "src/axios/supervise/supervise-generalize/superviseGeneralize";

  import {
    drawRequestMoneyChart,
    drawReceiveMoneyChart,
    drawReceiveRateChart,
    drawProductShortageChart,
    drawOrgNumChart,
    drawProductTypeChart
  } from "src/axios/supervise/supervise-generalize/chartOption";

  import {Message} from 'element-ui'

  export default {
    name: "superviseGeneralize",
    computed: {
      ...mapGetters([
        'loginId',
      ]),
    },
    data() {
      return {
        chartForm: {
          pickTime: 'year',
          selectedSeason: this.getSeason(),
          packDate: getFirstDateOfYear()
        },
        mapResData: [],//响应地图数据
        charts: '', // 地图
        roleForm: 'medical',
        queryData: {
          queryName: 'china',
          queryId: 'FR20T0000011000000050066',
          queryMapId: 'FR20T0000011000000050066',
          queryUnit: 'province',
        },//查询数据
        popChart: {
          popElement: '',
          resChartData: '',
          hideChart: true,//控制弹出图表显示隐藏
          isZoom: true, //弹窗是否最大化
          callback: ''
        },//弹出图表
        dataList: [], //机构列表
        newsList: [
          /*{
            newsTitle: '采购品种采购品种采购品种采购品种采购品种采购品种采购品种',
            newsTime: '2018-04-10'
          },
          {
            newsTitle: '采购品种采购品种采购品种采购品种采购品种采购品种采购品种2',
            newsTime: '2017-04-10'
          }*/
        ],
        tradeInfo: {
          requestMoney: "--",
          receiveMoney: "--",
          moneyChangeRate: '--',
          shortageTypeNum: '--',
        },
        //平台交易情况
        orgInfo: {
          hosNum: '--',
          hosProductTypeNum: '--',
          hosReceiveRate: '--',
          sendNum: '--',
          sendProductTypeNum: '--',
          sendReceiveRate: '--',
          factoryNum: '--',
          factoryProductTypeNum: '--',
          factoryReceiveRate: '--',
        },//机构信息
        queueReceiveSetting: {//消息队列配置
          websock: null,
          client: null,
          // wsuri: "ws://localhost:15674/ws",
          wsuri: "ws://localhost:8111/rabbitmq/ws/yxd/",
          // wsuri: "ws://localhost:8111/rabbitmq/websocket",
          // username: 'guest',
          // password: 'guest',
          // queueUrl: "/queue/supervise"
        },
      }
    },
    created() {
      this.getDataList();
    },
    methods: {
      getSeason() {
        let _m = new Date().getMonth();
        if (_m < 3) {
          return '1';
        } else if (_m < 6) {
          return '2';
        } else if (_m < 9) {
          return '3';
        } else {
          return '4';
        }
      },
      getDataList() {
        this.dataList = [];
        setTimeout(function () {
          let _data = [
            {
              orgName: 'medical',
              detail: [
                {
                  name: '机构数量',
                  value: this.orgInfo.hosNum,
                  methodName: this.findOrgNum
                },
                {
                  name: '采购品种',
                  value: this.orgInfo.hosProductTypeNum,
                  methodName: this.findProductType
                }
              ]
            },
            {
              orgName: 'deliver',
              detail: [
                {
                  name: '配送企业',
                  value: this.orgInfo.sendNum,
                  methodName: this.findOrgNum
                },
                {
                  name: '配送品种',
                  value: this.orgInfo.sendProductTypeNum,
                  methodName: this.findProductType
                }
              ]
            },
            {
              orgName: 'manufacture',
              detail: [
                {
                  name: '机构数量',
                  value: this.orgInfo.factoryNum,
                  methodName: this.findOrgNum
                },
                {
                  name: '采购品种',
                  value: this.orgInfo.factoryProductTypeNum,
                  methodName: this.findProductType
                }
              ]
            }
          ];
          _data.map(item => {
            if (item.orgName === this.roleForm) {

              item.detail.map(item => {
                item.value = item.value.toString().split('')
              });
              this.dataList = item.detail;
            }
          });
        }.bind(this),0)
      },
      dataStyle(idx) {

        let arrClass = ['s-lightblue', 's-lightyellow', 's-lightred'];
        return arrClass[idx];
      },
      handleZooming() {
        this.popChart.isZoom = !this.popChart.isZoom;
        this.drawChart(this.popChart.resChartData, this.popChart.callback);
      },
      // 地图初始化
      drawMap(chart, data, map) {
        // console.log(data)
        chart.setOption({
          backgroundColor: 'rgba(0,0,0,0)',
          dataRange: {
            min: 100000000,
            max: 10000000000,
            realtime: true,
            calculable: true,
            textStyle: {
              color: '#fff'
            },
            color: ['#006edd', '#e0ffff']
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b}'
          },
          animationDuration: 1000,
          animationEasing: 'cubicOut',
          animationDurationUpdate: 1000,
          series: [
            {
              name: map,
              type: 'map',
              mapType: map,
              roam: true,
              nameMap: {
                'china': '中国'
              },
              label: {
                normal: {
                  show: true,
                  textStyle: {
                    color: '#131616',
                    fontSize: 13
                  }
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    color: '#fff',
                    fontSize: 13
                  }
                }
              },
              data: data
            }
          ]
        })
      },
      //地图点击事件
      chartClick(params) {
        // console.log("点击数据：===" + params);
        this.queryData.queryName = params.name;
        if (params.name in provinces) {
          //设置查询省Id
          /*let provinceHaveFlag = false;
          for (let i of this.mapResData) {
            if (i.NAME && i.NAME.replace(/省/, '') === params.name) {
              provinceHaveFlag = true
              this.queryData.queryId = i.ID
              break
            }
          }
          this.queryData.queryUnit = 'province'
          if (!provinceHaveFlag) {
            this.queryData.queryId = ''
          }*/
          //如果点击的是34个省、市、自治区，绘制选中地区的二级地图
          getJsonData('static/map/province/' + provinces[params.name] + '.json').then(res => {
            let data = res;
            this.$echarts.registerMap(params.name, data);
            //查询地图数据
            getMapData(this.queryData).then(res2 => {
              let d = [];
              for (let i of res.features) {
                let flag = false;
                for (let j of res2.data) {
                  if (j.NAME && j.NAME.replace(/省/, '') === i.properties.name) {
                    flag = true;
                    d.push({
                      name: i.properties.name,
                      value: j.VALUE
                    });
                    break
                  }
                }
                if (!flag) {
                  d.push({
                    name: i.properties.name,
                  })
                }
              }
              // console.log(d)
              this.$options.methods.drawMap(this.charts, d, params.name);
              this.mapResData = res2.data;
            })
          });
        }
        else if (params.seriesName in provinces) {
          //如果是【直辖市/特别行政区】只有二级下钻
          if (special.indexOf(params.seriesName) >= 0) {
            let areaHaveFlag = false;
            for (let i of this.mapResData) {
              if (i.NAME && i.NAME === params.name) {
                this.queryData.queryId = i.ID;
                areaHaveFlag = true;
                break
              }
            }
            this.queryData.queryUnit = 'area';
            if (!areaHaveFlag) {
              this.queryData.queryId = ''
            }
          } else {
            let cityHaveFlag = false;
            for (let i of this.mapResData) {
              if (i.NAME && i.NAME === params.name) {
                this.queryData.queryId = i.ID;
                cityHaveFlag = true;
                break
              }
            }
            this.queryData.queryUnit = 'city';
            if (!cityHaveFlag) {
              this.queryData.queryId = ''
            }
            //显示县级地图
            getJsonData('static/map/city/' + cityMap[params.name] + '.json').then(res => {
              let data = res;
              this.$echarts.registerMap(params.name, data);
              //查询地图数据
              getMapData(this.queryData).then(res2 => {
                // console.log(res2.data)
                let d = [];
                for (let i of res.features) {
                  let flag = false;
                  for (let j of res2.data) {
                    if (j.NAME && j.NAME.replace(/省/, '') === i.properties.name) {
                      flag = true;
                      d.push({
                        name: i.properties.name,
                        value: j.VALUE
                      });
                      break
                    }
                  }
                  if (!flag) {
                    d.push({
                      name: i.properties.name,
                    })
                  }
                }
                // console.log(d)
                this.$options.methods.drawMap(this.charts, d, params.name);
                this.mapResData = res2.data;
              })
            });
          }
        } else {
          let areaHaveFlag = false;
          for (let i of this.mapResData) {
            if (i.NAME && i.NAME === params.name) {
              this.queryData.queryId = i.ID;
              areaHaveFlag = true;
              break
            }
          }
          this.queryData.queryUnit = 'area';
          if (!areaHaveFlag) {
            this.queryData.queryId = ''
          }
        }
        //查询交易情况
        this.findTradeInfo();
        this.findOrgInfo();
      },
      drawChart(data, cb) {
        this.popChart.resChartData = data;
        this.popChart.callback = cb;
        // 基于准备好的dom，初始化echarts实例

        let myChart = document.getElementById('chart');
        if (this.popChart.isZoom) {
          myChart.style.width = '50vw';
          myChart.style.height = '80vh';
        } else {
          myChart.style.width = '80vw';
          myChart.style.height = '90vh';
        }
        myChart.grid = {
          left: '3%',
          right: '0',
          top: '1%',
          bottom: '1%'
        };
        this.popChart.popElement = this.$echarts.init(myChart);
        this.popChart.popElement.clear();
        // 绘制图表
        cb(this.popChart.popElement, data);
        this.popChart.popElement.resize();
      },
      //获取地图数据
      findMapData() {
        /*getMapData(this.queryData).then(res => {
          this.mapResData = res.data
          if (this.queryData.queryName === 'china') {
            getJsonData('static/map/china.json').then(res2 => {
                // console.log(res2)
                let d = [];
                // console.log(res.data)
                for (let i of res2.features) {
                  let flag = false;
                  for (let j of res.data) {
                    if (j.NAME && j.NAME.replace(/省/, '') === i.properties.name) {
                      flag = true
                      d.push({
                        name: i.properties.name,
                        value: j.VALUE
                      })
                      break
                    }
                  }
                  if (!flag) {
                    d.push({
                      name: i.properties.name,
                    })
                  }
                }
                this.$echarts.registerMap('china', res2)
                this.charts = this.$echarts.init(document.getElementById('chinaMap'));
                // console.log(d)
                this.$options.methods.drawMap(this.charts, d, 'china');
                //添加点击事件
                this.charts.on('click', this.chartClick);
              }
            )
          }
        })*/
        this.charts = this.$echarts.init(document.getElementById('chinaMap'));
        this.chartClick({name: special[0], seriesName: special[0]});
        this.charts.on('click', this.chartClick);
      },
      //获取平台交易情况统计信息
      findTradeInfo() {
        this.tradeInfo = {
            requestMoney: "--",
            receiveMoney: "--",
            moneyChangeRate: '--',
            shortageTypeNum: '--',
        };
        getTradeInfo(this.queryData).then(res => {
          let data = res.data;
          if (data) {
              this.tradeInfo.requestMoney = data.REQUESTMONEY.toFixed(2).toString().split('');
              this.tradeInfo.receiveMoney = data.RECEIVEMONEY.toFixed(2).toString().split('');
              this.tradeInfo.moneyChangeRate = (data.rate*100).toFixed(0).toString().split('')
          }
        })
      },
      //获取机构信息
      findOrgInfo() {
        getSumOrgNum(this.queryData).then(res => {
          let data = res.data;
          this.orgInfo.hosNum = data.HOSNUM;
          this.orgInfo.sendNum = data.SENDORGNUM;
          this.orgInfo.factoryNum = data.SENDORGNUM;
          this.getDataList()
        });
        getProductTypeNum(this.queryData).then(res => {
          let data = res.data;
          this.orgInfo.hosProductTypeNum = data.PRODUCTTYPENUM;
          this.orgInfo.sendProductTypeNum = data.PRODUCTTYPENUM;
          this.orgInfo.factoryProductTypeNum = data.PRODUCTTYPENUM;
          this.getDataList()
        })
      },
      findOrderSumAndRate() {
        this.popChart.hideChart = false;
        let queryId = this.queryData.queryId === 'FR20T0000011000000050066' ? '' : this.queryData.queryId;
        findRequestMoneyAndRate(queryId, '2017').then((res) => {
          this.drawChart(res.data, drawRequestMoneyChart);
        })
      },
      findReceiveSumAndRate() {
        this.popChart.hideChart = false;
        let queryId = this.queryData.queryId === 'FR20T0000011000000050066' ? '' : this.queryData.queryId;
        findReceiveMoneyAndRate(queryId, '2017').then((res) => {
          this.drawChart(res.data, drawReceiveMoneyChart);
        })
      },
      findReceiveRate() {
        this.popChart.hideChart = false;
        let queryId = this.queryData.queryId === 'FR20T0000011000000050066' ? '' : this.queryData.queryId;
        findReceiveAndRequestMoney(queryId, '2017').then((res) => {
          this.drawChart(res.data, drawReceiveRateChart);
        })
      },
      //查询药品短缺种类
      findShortageTypeNum() {
        this.popChart.hideChart = false;
        this.drawChart({}, drawProductShortageChart);
      },
      findOrgNum() {
        this.popChart.hideChart = false;
        getOrgNum(this.queryData).then(res => {
          this.drawChart(res.data, drawOrgNumChart);
        })
      },
      findProductType() {
        this.popChart.hideChart = false;
        getMedicalType(this.queryData).then(res => {
          this.drawChart(res.data, drawProductTypeChart);
        })
      },
      findDifTimeUnitData(e) {
        this.popChart.hideChart = false;
        if (e) {
          this.chartForm.pickTime = e.target.defaultValue
        }
        this.getGeneralizeInfo();
      },
      //获取交易信息
      getGeneralizeInfo(e) {
        this.queryData.date = this.chartForm.packDate;
        this.queryData.dateUnit = this.chartForm.pickTime;
        this.queryData.selectedSeason = this.chartForm.selectedSeason;
        this.findMapData();
      },
      //还原地图
      resetMap() {
        this.queryData.queryId = '';
        this.queryData.queryUnit = '';
        this.queryData.queryName = 'china';
        this.getGeneralizeInfo();
      },
      //初始化weosocket

      initWebSocket() {
        //ws地址
        if (this.queueReceiveSetting.websock) {
          this.queueReceiveSetting.websock.close()
        }
        this.queueReceiveSetting.wsuri+=this.loginId;
        this.queueReceiveSetting.websock = new WebSocket(this.queueReceiveSetting.wsuri);
        this.queueReceiveSetting.websock.onopen = function (res) {
          console.log("开启连接")
        };
        this.queueReceiveSetting.websock.onmessage = function (res) {
          let data = JSON.parse(res.data);
          console.log("收到数据：" + data.messageContent);
          Message({
            message: data.messageContent,
            type: 'info',
            showClose: true,
            duration: 0
          })
        };
        this.queueReceiveSetting.websock.onclose = function (res) {
          console.log("连接关闭")
        };
        this.queueReceiveSetting.websock.onerror = function (res) {
          console.log("连接出错")
          // this.initWebSocket();
        };
      }
    },
    watch: {
      'roleForm': 'getDataList',
      dataList(newVal,oldVal){
        // let animateNumNodes = document.getElementsByClassName('number-animate');
        // for( let i = 0 ; i < animateNumNodes.length ; i ++) {
        //   animateNumNodes[i].classList.remove('flip-number')
        // }
      }
    },
    mounted() {
      let tis = this;
      document.onclick = function (e) {
        if ((e.target.className.indexOf("info-item") < 0) && (e.target.parentElement.className.indexOf("graphic-layer") < 0)
          && (e.target.parentElement.parentElement.className.indexOf("graphic-inner") < 0) && (e.target.className.indexOf("flip-number") < 0)) {
          tis.popChart.isZoom = true;
          tis.popChart.hideChart = true;
        }
      };
      tis.$nextTick(function () {
        tis.getGeneralizeInfo();
        // this.initWebSocket();
      })
    },
    //页面离开调用
    destroyed() {
      document.onclick = null;
      if (this.queueReceiveSetting.websock) {
        this.queueReceiveSetting.websock.close();
        console.log("关闭socket");
      }
    },
  }
</script>

