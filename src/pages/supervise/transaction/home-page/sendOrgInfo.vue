<template>
  <div class="mainbox">
    <div class="s-title large">
      <form name="chartForm" ref="chartForm">
        <span class="gap-20">北京市配送企业情况</span>
        <span class="radio-group">
          <label for="year" class="s-radios" :class="{active: chartForm.pickTime === 'year'}">
            <input type="radio" id="year" value="year" v-model="chartForm.pickTime" @click="findDifTimeUnitData"/>
            年</label>
          <label for="month" class="s-radios" :class="{active: chartForm.pickTime === 'month'}">
            <input type="radio" id="month" value="month" v-model="chartForm.pickTime" @click="findDifTimeUnitData"/>
            月</label>
        </span>
        <span class="ipt-txt">
          <el-date-picker :type="chartForm.pickTime==='season'?'year':chartForm.pickTime"
                          placeholder="选择日期" v-model="chartForm.packDate" @change="initData"></el-date-picker>
        </span>
      </form>
    </div>
    <ul>
      <li class="w20">
        <div>
          <div class="s-form">
            <span class="s-form-title">配送企业2小时响应率 TOP10</span>
            <el-date-picker
              class="width-100 flo-right"
              :type="chartForm.pickTime==='season'?'year':chartForm.pickTime"
              size="small"
              placeholder="选择日期"
              @change="drawBar1"
              v-model="chartForm.packDate">
            </el-date-picker>
          </div>
          <div id="bar1" style="width: 100%; height: 294px;"></div>
        </div>

        <div class="space-20"></div>

        <div>
          <div class="s-form">
            <span class="s-form-title">配送企业3天到货率 TOP10</span>
            <el-date-picker
              class="width-100 flo-right"
              :type="chartForm.pickTime==='season'?'year':chartForm.pickTime"
              size="small"
              placeholder="选择日期"
              @change="drawBar2"
              v-model="chartForm.packDate">
            </el-date-picker>
          </div>
          <div id="bar2" style="width: 100%; height: 294px;"></div>
        </div>

        <div class="space-20"></div>

        <div>
          <div class="s-form">
            <span class="s-form-title">配送企业被投诉次数 TOP10</span>
            <el-date-picker
              class="width-100 flo-right"
              :type="chartForm.pickTime==='season'?'year':chartForm.pickTime"
              size="small"
              placeholder="选择日期"
              @change="drawBar3"
              v-model="chartForm.packDate">
            </el-date-picker>
          </div>
          <div id="bar3" style="width: 100%; height: 294px;"></div>
        </div>
      </li>

      <li class="w50 main-center">
        <div style="width: 100%; height: 580px;" id="chinaMap"></div>

        <div class="s-form space-20">
          <span class="s-form-title">产品销量 TOP10</span>
        </div>
        <div class="tableset">
          <el-table
            :data="resProductData"
            stripe>
            <el-table-column prop="productName" label="产品名称" width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="sendOrgName" label="配送企业" align="right" header-align="left"></el-table-column>
            <el-table-column prop="saleNum" label="销量" align="right" header-align="left"></el-table-column>
          </el-table>
        </div>
      </li>

      <li class="w30">
        <div>
          <div class="s-form">
            <span class="s-form-title">每月响应率</span>
            <el-date-picker
              class="width-100 flo-right"
              :type="chartForm.pickTime==='season'?'year':chartForm.pickTime"
              size="small"
              placeholder="选择日期"
              @change="drawBar1"
              v-model="chartForm.packDate">
            </el-date-picker>
          </div>
          <div id="bar4" style="width: 100%; height: 294px;"></div>
        </div>

        <div class="space-20"></div>

        <div>
          <div class="s-form">
            <span class="s-form-title">每月到货率</span>
            <el-date-picker
              class="width-100 flo-right"
              :type="chartForm.pickTime==='season'?'year':chartForm.pickTime"
              size="small"
              placeholder="选择日期"
              @change="drawBar2"
              v-model="chartForm.packDate">
            </el-date-picker>
          </div>
          <div id="bar5" style="width: 100%; height: 294px;"></div>
        </div>

        <div class="space-20"></div>

        <div>
          <div class="s-form">
            <span class="s-form-title">每月投诉次数</span>
            <el-date-picker
              class="width-100 flo-right"
              :type="chartForm.pickTime==='season'?'year':chartForm.pickTime"
              size="small"
              placeholder="选择日期"
              @change="drawBar3"
              v-model="chartForm.packDate">
            </el-date-picker>
          </div>
          <div id="bar6" style="width: 100%; height: 294px;"></div>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
  import {
    cityMap,
    provinces,
    special,
    getMapData,
    getJsonData,
    getFirstDateOfYear2
  } from "src/axios/supervise/supervise-generalize/superviseGeneralize";
  // 引入基本模板
  let echarts = require('echarts/lib/echarts');
  // 引入柱状图组件
  require('echarts/lib/chart/bar');
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  export default {
    name: "",
    data() {
      return {
        charts: '',
        resProductData: this.getResProductData(),
        chartForm: {
          pickTime: 'month',
          packDate: new Date()
        },
        queryData: {
          queryName: 'china',
          queryId: 'FR20T0000011000000050066',
          queryMapId: 'FR20T0000011000000050066',
          queryUnit: 'province',
        },//查询数据
      }
    },
    mounted() {
      this.initData()
    },
    methods: {
      drawBar1() {
        let myChart = echarts.init(document.getElementById('bar1'));
        myChart.clear();
        // 绘制图表
        myChart.setOption({
          /*title: {
            text: '配送企业2H响应率TOP10',
            textStyle: {
              color: '#fff'
            },
          },*/
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            formatter: '{b}<br/>{a}: {c}%'
          },
          grid: {
            left: '3%',
            right: '4%',
            top: '3%',
            bottom: '8%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisLabel: {
              interval: 0,
              rotate: 20,
              textStyle: {
                color: '#fff'
              }
            },
            splitLine: {
              lineStyle: {
                color: '#3f4754'
              }
            }
          },
          yAxis: {
            type: 'category',
            data: ['北京广安医药联合中心', '京乐仁医药有限公司', '北京市燕山医药公司', '北京颐瑞药行有限公司', '北京市宣武京新医药公司', '北京天元康医药有限公司', '北京医药通州医药公司', '北京惠珀宁医药经营中心', '北京市燕京医药公司', '北京首惠医药有限公司'],
            axisLabel: {
              textStyle: {
                color: '#fff'
              },
              // fontSize: 9,
              formatter: function (value) {
                return value.length > 6 ? value.substring(0, 5) + "..." : value;
              }
            }
          },
          series: [
            {
              name: '响应率',
              type: 'bar',
              // barWidth:20,
              itemStyle: {
                normal: {
                  color: '#2EF7F7'
                }
              },
              data: [65, 67, 69, 72, 73, 78, 79, 80, 83, 88]
            }
          ]
        });
      },
      drawBar2() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('bar2'));
        myChart.clear();
        // 绘制图表
        myChart.setOption({

          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            formatter: '{b}<br/>{a}: {c}%'
          },
          grid: {
            left: '3%',
            right: '4%',
            top: '3%',
            bottom: '8%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisLabel: {
              interval: 0,
              rotate: 20,
              textStyle: {
                color: '#fff'
              }
            },
            splitLine: {
              lineStyle: {
                color: '#3f4754'
              }
            }
          },
          yAxis: {
            type: 'category',
            data: ['北京广安医药联合中心', '京乐仁医药有限公司', '北京市燕山医药公司', '北京颐瑞药行有限公司', '北京市宣武京新医药公司', '北京天元康医药有限公司', '北京医药通州医药公司', '北京惠珀宁医药经营中心', '北京市燕京医药公司', '北京首惠医药有限公司'],
            axisLabel: {
              textStyle: {
                color: '#fff'
              },
              // fontSize: 9,
              formatter: function (value) {
                return value.length > 6 ? value.substring(0, 5) + "..." : value;
              }
            }
          },
          series: [
            {
              name: '到货率',
              type: 'bar',
              // barWidth:20,
              itemStyle: {
                normal: {
                  color: '#2EF7F7'
                }
              },
              data: [65, 67, 69, 72, 73, 78, 79, 80, 83, 88]
            }
          ]
        });
      },
      drawBar3() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('bar3'));
        myChart.clear();
        // 绘制图表
        myChart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            formatter: '{b}<br/>{a}: {c}'
          },
          grid: {
            left: '3%',
            right: '4%',
            top: '3%',
            bottom: '8%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisLabel: {
              interval: 0,
              rotate: 20,
              textStyle: {
                color: '#fff'
              }
            },
            splitLine: {
              lineStyle: {
                color: '#3f4754'
              }
            }
          },
          yAxis: {
            type: 'category',
            data: ['北京广安医药联合中心', '京乐仁医药有限公司', '北京市燕山医药公司', '北京颐瑞药行有限公司', '北京市宣武京新医药公司', '北京天元康医药有限公司', '北京医药通州医药公司', '北京惠珀宁医药经营中心', '北京市燕京医药公司', '北京首惠医药有限公司'],
            axisLabel: {
              textStyle: {
                color: '#fff'
              },
              // fontSize: 9,
              formatter: function (value) {
                return value.length > 6 ? value.substring(0, 5) + "..." : value;
              }
            }
          },
          series: [
            {
              name: '投诉次数',
              type: 'bar',
              // barWidth:20,
              itemStyle: {
                normal: {
                  color: '#2EF7F7'
                }
              },
              data: [1, 2, 3, 5, 7, 7, 8, 9, 9, 10]
            }
          ]
        });
      },
      drawBar4() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('bar4'));
        myChart.clear();
        // 绘制图表
        myChart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                //backgroundColor: '#fff'
              }
            }
          },
          calculable: true,
          legend: {
            data: ['响应率'],
            textStyle: {
              color: '#fff'
            }
          },
          xAxis: [
            {
              type: 'category',
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
              splitLine: {
                lineStyle: {
                  color: '#3f4754'
                }
              },
              axisLabel: {
                color: '#fff'
              },

            }
          ],
          yAxis: [
            {
              name: '%',
              nameTextStyle: {
                color: '#fff'
              },
              type: 'value',
              axisLabel: {
                formatter: '{value}',
                color: '#fff'
              },
              splitLine: {
                lineStyle: {
                  color: '#3f4754'
                }
              }
            }
          ],
          series: [
            {
              name: '响应率',
              type: 'line',
              color: ['#66CDAA'],
              smooth: true,
              data: [76, 58, 86, 94, 73, 54, 90, 86, 75, 88, 93, 92],
            }
          ]

        });
      },
      drawBar5() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('bar5'));
        myChart.clear();
        // 绘制图表
        myChart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                //backgroundColor: '#fff'
              }
            }
          },
          calculable: true,
          legend: {
            data: ['到货率'],
            textStyle: {
              color: '#fff'
            }
          },
          xAxis: [
            {
              type: 'category',
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
              splitLine: {
                lineStyle: {
                  color: '#3f4754'
                }
              },
              axisLabel: {
                color: '#fff'
              },

            }
          ],
          yAxis: [
            {
              name: '%',
              nameTextStyle: {
                color: '#fff'
              },
              type: 'value',
              axisLabel: {
                formatter: '{value}',
                color: '#fff'
              },
              splitLine: {
                lineStyle: {
                  color: '#3f4754'
                }
              }
            }
          ],
          series: [
            {
              name: '到货率',
              type: 'line',
              color: ['#66CDAA'],
              smooth: true,
              data: [76, 58, 86, 94, 73, 54, 90, 86, 75, 88, 93, 92].reverse(),
            }
          ]

        });
      },
      drawBar6() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('bar6'));
        myChart.clear();
        // 绘制图表
        myChart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                //backgroundColor: '#fff'
              }
            }
          },
          calculable: true,
          legend: {
            data: ['投诉次数'],
            textStyle: {
              color: '#fff'
            }
          },
          xAxis: [
            {
              type: 'category',
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
              splitLine: {
                lineStyle: {
                  color: '#3f4754'
                }
              },
              axisLabel: {
                color: '#fff'
              },

            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                formatter: '{value}',
                color: '#fff'
              },
              splitLine: {
                lineStyle: {
                  color: '#3f4754'
                }
              }
            }
          ],
          series: [
            {
              name: '投诉次数',
              type: 'line',
              color: ['#66CDAA'],
              smooth: true,
              data: [76, 106, 86, 54, 33, 54, 90, 76, 85, 88, 69, 92],
            }
          ]

        });
      },
      drawMap(chart, data, map) {
        this.charts.showLoading();
        getJsonData('static/map/beijing.json').then(geoJson => {
          this.$echarts.registerMap('beijing', geoJson);
          console.log(geoJson);
          var geoCoordMap = {};
          for (let o of geoJson.features) {
            geoCoordMap[o.properties.name] = o.properties.cp
          }
          this.charts.hideLoading();
          var data = [
            {name: '朝阳区', value: 3970},
            {name: '昌平区', value: 1528},
            {name: '海淀区', value: 2532},
            {name: '石景山区', value: 991},
            {name: '门头沟区', value: 1896},
            {name: '大兴区', value: 523},
            {name: '平谷区', value: 1584},
            {name: '顺义区', value: 1523},
            {name: '丰台区', value: 1894},
            {name: '怀柔区', value: 1602},
          ];
          var max = 480, min = 9;
          var maxSize4Pin = 100, minSize4Pin = 20;

          var convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
              var geoCoord = geoCoordMap[data[i].name];
              if (geoCoord) {
                res.push({
                  name: data[i].name,
                  value: geoCoord.concat(data[i].value)
                });
              }
            }
            return res;
          };


          let option = {
            backgroundColor: 'rgba(0,0,0,0)',
            tooltip: {
              trigger: 'item',
              formatter: function (params) {
                if (typeof(params.value)[2] == "undefined") {

                } else {
                  return params.name + '订单数量 : ' + params.value[2];
                }
              }
            },
            legend: {
              orient: 'vertical',
              y: 'bottom',
              x: 'right',
              data: ['pm2.5'],
              textStyle: {
                color: '#fff'
              }
            },
            visualMap: {
              show: false,
              min: 0,
              max: 500,
              left: 'left',
              top: 'bottom',
              text: ['高', '低'], // 文本，默认为数值文本
              calculable: true,
              seriesIndex: [1],
              inRange: {}
            },
            geo: {
              show: true,
              map: 'beijing',
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false,
                }
              },
              roam: true,
              itemStyle: {
                normal: {
                  areaColor: 'transparent',
                  borderColor: '#3fdaff',
                  borderWidth: 2,
                  shadowColor: 'rgba(63, 218, 255, 0.5)',
                  shadowBlur: 30
                },
                emphasis: {
                  areaColor: '#2B91B7',
                }
              }
            },
            series: [
              {
                name: 'light',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertData(data),
                zoom: 1.6,
                symbolSize: function (val) {
                  return val[2] / 100;
                },
                label: {
                  normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                  },
                  emphasis: {
                    show: true
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#F4E925'
                  }
                }
              },
              {
                type: 'map',
                map: 'beijing',
                geoIndex: 0,
                aspectScale: 0.75, //长宽比
                showLegendSymbol: false, // 存在legend时显示
                label: {
                  normal: {
                    show: false
                  },
                  emphasis: {
                    show: false,
                    textStyle: {
                      color: '#fff'
                    }
                  }
                },
                roam: true,
                itemStyle: {
                  normal: {
                    areaColor: '#031525',
                    borderColor: '#FFFFFF',
                  },
                  emphasis: {
                    areaColor: '#2B91B7'
                  }
                },
                animation: false,
                data: data
              },
              {
                name: 'Top 5',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: convertData(data.sort(function (a, b) {
                  return b.value - a.value;
                }).slice(0, 5)),
                symbolSize: function (val) {
                  return val[2] / 100;
                },
                showEffectOn: 'render',
                rippleEffect: {
                  brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                  normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#F4E925',
                    shadowBlur: 10,
                    shadowColor: '#05C3F9'
                  }
                },
                zlevel: 1
              },

            ]
          };
          this.charts.setOption(option);
        })
      },
      findMapData() {
        this.charts = this.$echarts.init(document.getElementById('chinaMap'));
        // this.chartClick({name: special[0], seriesName: special[0]});
        this.drawMap()
        // this.charts.on('click', this.chartClick);
      },
      chartClick(params) {
        this.charts.showLoading();
        this.queryData.queryName = params.name;
        if (params.name in provinces) {
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
      },
      findDifTimeUnitData(e) {
        if (e) {
          this.chartForm.pickTime = e.target.defaultValue
        }
        this.initData()
      },
      initData() {
        this.drawBar1();
        this.drawBar2();
        this.drawBar3();
        this.drawBar4();
        this.drawBar5();
        this.drawBar6();
        this.findMapData()
      },
      getResProductData() {
        return [{
          "productName": "胸腺肽注射液",
          "sendOrgName": "北京乐仁医药有限公司",
          "saleNum": 34272,
        }, {
          "productName": "注射用氨苄西林钠舒巴坦钠",
          "sendOrgName": "北京广安医药联合中心",
          "saleNum": 31468,
        }, {
          "productName": "硫酸阿米卡星注射液",
          "sendOrgName": "北京大立医药有限公司",
          "saleNum": 28452,
        }, {
          "productName": "注射用头孢噻肟钠",
          "sendOrgName": "北京京华医药有限公司",
          "saleNum": 26451,
        }, {
          "productName": "西瓜霜润喉片",
          "sendOrgName": "北京康瑞华医药有限公司",
          "saleNum": 26113,
        }, {
          "productName": "银杏叶片(糖衣)",
          "sendOrgName": "北京市宣武京新医药公司",
          "saleNum": 22468,
        }, {
          "productName": "银花感冒颗粒",
          "sendOrgName": "北京亚康医药经营公司",
          "saleNum": 22356,
        }, {
          "productName": "氟罗沙星注射液",
          "sendOrgName": "北京颐瑞药行有限公司",
          "saleNum": 16845,
        }, {
          "productName": "甲磺酸培氟沙星注射液",
          "sendOrgName": "北京市燕山医药公司",
          "saleNum": 14235,
        }, {
          "productName": "卡莫氟片",
          "sendOrgName": "北京同仁堂珠海有限公司",
          "saleNum": 9867,
        },]
      },
    },
    watch: {},
  }
</script>
