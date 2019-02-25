<template>
  <div>
    <!--图形显示区-->
    <div class="infobox">
      <div id="myChart" style="height: 300px"></div>
    </div>
    <div class="infobox">
      <div class="tableset">
        <el-table :data="resData.list" stripe border tooltip-effect="dark">
          <el-table-column prop="buyerName" label="医院名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="bakMedicalName" label="产品名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="bakMedicalMode" label="剂型" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="bakProductSpec" label="规格包装" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="metricName" label="单位" width="60"></el-table-column>
          <el-table-column prop="bakFactoryName" label="生产企业" show-overflow-tooltip></el-table-column>
          <el-table-column prop="senderName" label="配送企业" show-overflow-tooltip></el-table-column>
          <el-table-column prop="requestQty" label="订购数量" align="right"
                           width="80"></el-table-column>
          <el-table-column prop="unitPrice" label="采购价" align="right" width="80"></el-table-column>
          <el-table-column prop="requestMoney" label="订购金额" align="right"
                           width="90"></el-table-column>
          <el-table-column prop="oldUnitPrice" label="原采购价" align="right"
                           width="80"></el-table-column>
          <el-table-column prop="range" label="变化比率(%)" align="right" width="90"></el-table-column>
          <el-table-column prop="rangeMoney" label="金额变化" align="right"
                           width="80"></el-table-column>
          <el-table-column prop="createDate" label="订单时间" show-overflow-tooltip></el-table-column>
        </el-table>
      </div>
      <page-bar :data="resData" @refreshPage="refreshPage"></page-bar>
    </div>
  </div>
</template>

<script>
  import {orderMonitorList, getIpAndPort} from "src/axios/supervise/trade/orderMonitor";
  import {PageData} from "src/components/mixins/index";

  export default {
    name: "real-time",
    mixins: [PageData],
    created() {
      this.metaList();
      let tis = this;
      setInterval(function () {
        tis.minutes = new Date().getMinutes();
      }, 1000);
    },
    data() {
      return {
        X_Data: [],
        y_requestQty: [],
        y_unitPrice: [],
        y_oldUnitPrice: [],
        resData: this.metaData(),
        wsSetting: {//消息队列配置
          websock: null,
          wsuri: "/supervision/ws/orderMonitor?Authorization="+sessionStorage.getItem("token"),
          ipConfig: ""
        },
        minutes: 1,
      }
    },
    methods: {
      metaData() {
        return {
          pageNum: 1,
          pageSize: 10,
          total: 0,
          pages: 0,
          list: []
        }
      },
      getZoomSize() {
        let dataNum = this.resData.list.length;
        if (dataNum <= 10) {
          return 100;
        }
        if (dataNum > 10 && dataNum <= 20) {
          return Math.round(1 / 2 * 100);
        }
        if (dataNum > 20 && dataNum <= 30) {
          return Math.round(1 / 3 * 100);
        }
        return 50;
      },
      metaList: function () {
        orderMonitorList(this.resData).then(res => {
          if (res.code == 200) {
            this.resData = res.data;
            0 === this.resData.pageNum ? this.resData.pageNum = 1 : null;
            this.X_Data = res.data.list.map(item => {
              return item.bakMedicalName;
            });
            this.y_requestQty = res.data.list.map(item => {
              return item.requestQty;
            });
            this.y_unitPrice = res.data.list.map(item => {
              return item.unitPrice;
            });
            this.y_oldUnitPrice = res.data.list.map(item => {
              return item.oldUnitPrice;
            })
          }
        }).then(() => {
          this.drawBar();
        })
      },
      randomData() {
        let value = Math.random() * 50;
        return {
          value: Math.round(value)
        }
      },
      drawBar() {
        let _this = this;
        let myChart = this.$echarts.init(document.getElementById('myChart'));
        myChart.clear()
        // 颜色
        let lightBlue = {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: 'rgba(0, 192, 255, 1)' // 0% 处的颜色
          }, {
            offset: 1,
            color: 'rgba(0, 192, 255, 0.1)' // 100% 处的颜色
          }],
          globalCoord: false // 缺省为 false
        };
        let darkBlue = {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: 'rgba(41, 121, 255, 1)' // 0% 处的颜色
          }, {
            offset: 1,
            color: 'rgba(41, 121, 255, 0.1)' // 100% 处的颜色
          }],
          globalCoord: false // 缺省为 false
        };
        let data = [];
        let timeData = [];
        let minutes = new Date().getMinutes();
        let hours = new Date().getHours();
        console.log(hours + ":" + minutes)
        for (let i = 0; i < hours; i++) {
          for (let j = 0; j < 60; j += 15) {
            timeData.push((i < 10 ? ("0" + i) : i) + ":" + (j === 0 ? (j + "0") : j));
            data.push(_this.randomData());
          }
        }
        var option = {
          grid: {
            left: '5%',
            right: '8%'
          },
          tooltip: {
            show: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            // boundaryGap: 100,
            axisLine: {
              lineStyle: {
                color: '#4bbbf8',
                shadowColor: 'rgba(75, 211, 255, 0.5)',
                shadowBlur: 5
              }
            },
            axisTick: {
              interval: (index) => {
                if (index === -1 || index === 9) {
                  return false;
                } else {
                  return true;
                }
              }
            },
            axisLabel: {
              color: '#fff',
              fontSize: 12
            },
            splitLine: {
              show: false
            },
            data: timeData,

          },
          yAxis: [{
            min: 0,
            axisLine: {
              lineStyle: {
                color: '#4bbbf8',
                shadowColor: 'rgba(75, 211, 255, 0.5)',
                shadowBlur: 5
              }
            },
            axisLabel: {
              color: '#fff',
              fontSize: 12
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(75, 211, 255, 0.5)',
                type: 'dashed'
              }
            }
          }],
          series: [{
            name: '数量',
            type: 'line',
            barCategoryGap: '-60%',
            markLine: {
              label: {
                position: 'end',
                formatter: '平均值:{c}',
                color: '#fff'
              },
              lineStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: '#3099f8' // 0% 处的颜色
                  }, {
                    offset: 1, color: '#ff2d51' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                }
              },
              data: [
                {
                  name: '平均线',
                  // 支持 'average', 'min', 'max'
                  type: 'average'
                },
              ]
            },

            label: {
              show: true,
              position: 'top',
              color: '#fff143',
              fontSize: 14
            },
            itemStyle: {

              color: function (params) {
                return params.dataIndex % 2 ? darkBlue : lightBlue;
              }
            },
            data: data
          }],
          backgroundColor: "#00164e"
        };
        myChart.setOption(option);
      },
      initWebSocket() {
        this.closeWebSocket();
        //ws地址
        let wsurl = this.ipConfig + this.wsSetting.wsuri
        this.wsSetting.websock = new WebSocket(wsurl);
        this.wsSetting.websock.onopen = function (res) {
          console.log("开启订单监控")
        };
        const tis = this;
        this.wsSetting.websock.onmessage = function (res) {
          let arr = [{
            buyerName: res.data.toString()
          }]
          tis.resData.list.pop()
          tis.resData.total += 1
          tis.resData.pages = tis.resData.total / tis.resData.pageSize + 1
          tis.resData.list = arr.concat(tis.resData.list)
        };
        this.wsSetting.websock.onclose = function (res) {
          console.log("订单监控连接关闭")
        };
        this.wsSetting.websock.onerror = function (res) {
          console.log("订单监控连接出错,重新连接");
          tis.initWebSocket();
        };
      },
      closeWebSocket() {
        if (this.wsSetting.websock) {
          this.wsSetting.websock.close()
        }
      },
    },
    watch: {
      resData: function (val) {
        if (val.list === []) {
          this.closeWebSocket()
        } else {
          getIpAndPort().then(res => {
            this.ipConfig = "ws://" + res.data;
            this.initWebSocket();
          })
        }
      },
      minutes: function (val) {
        if (val % 15 === 0) {
          this.drawBar();
        }
      }
    },
    destroyed() {
      this.closeWebSocket()
    },
  }
</script>
