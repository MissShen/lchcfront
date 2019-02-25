<template>
  <div>
    <!--    <div>
          <el-switch
            style="display: block; margin-bottom: 10px;"
            v-model="projectFlag"
            active-color="#3eede7"
            inactive-color="#44cef6"
            active-text="项目视角"
            inactive-text="整体视角">
          </el-switch>
          <el-select v-model="projectID" placeholder="请选择" v-show="projectFlag">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>-->
    <div>
      <div class="s-note">
        其中正在采购的医疗机构有{{titleData.REQUESTORGNUM}}家，在配送的配送商有{{titleData.SENDORGNUM}}家
      </div>
      <div class="space-10">
        <el-switch
          v-model="receiveFlag"
          active-color="#3eede7"
          inactive-color="#44cef6"
          active-text="到货金额"
          inactive-text="采购金额"
          @change="metaList">
        </el-switch>
      </div>
      <div class="s-note">
        {{receiveFlag?'到货':'采购'}}金额合计为{{title2Data.sumMoney}}万元人民币,其中今年为{{title2Data.nowYearMoney}}万元人民币。
      </div>
      <ul class="disp-table">
        <li id="tradeInfoBar" style="height: 600px;width: 900px"></li>
        <li class="space-20">
          <el-table
            :data="resData"
            stripe
            show-summary
            :summary-method="getSummaries">
            <el-table-column prop="month" label="月份"></el-table-column>
            <el-table-column prop="preMoney" label="2017金额(万元)" align="right" header-align="left"></el-table-column>
            <el-table-column prop="nowMoney" label="2018金额(万元)" align="right" header-align="left"></el-table-column>
            <el-table-column prop="incRate" label="同比增长(%)" align="right" header-align="left"></el-table-column>
          </el-table>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {
    findPurchaseTradeInfoByProductId,
    findRequestAndSendOrgNumByProductId
  } from 'src/axios/supervise/drug-flow/drugFlow'


  export default {
    name: "trade-info",
    data() {
      return {
        productId: this.$route.query.id,
        projectID: '选项1',
        titleData: {
          REQUESTORGNUM: 20,
          SENDORGNUM: 5,
        },
        title2Data: {
          sumMoney: '',
          nowYearMoney: '',
        },
        receiveFlag: false,
        // projectFlag: false,
        resData: [],
        tradeInfoBar: '',
      }
    },
    methods: {
      drawTradeInfoBar() {
        // 基于准备好的dom，初始化echarts实例
        this.tradeInfoBar = this.$echarts.init(document.getElementById('tradeInfoBar'));
        this.tradeInfoBar.clear();
        var preData = [];//去年采购金额
        var nowData = [];//今年采购金额
        var rateData = [];//同比增长
        for (let i of this.resData) {
          preData.push(i.preMoney);
          nowData.push(i.nowMoney);
          rateData.push(i.incRate)
        }
        // 绘制图表
        this.tradeInfoBar.setOption({
          title: {
            text: '',
            textStyle: {
              color: '#fff'
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          grid: {
            y: 100,
            y2: 100,
            borderWidth: 0
          },
          legend: {
            top: 60,
            data: [{
              name: '2017金额',
            }, {
              name: '2018金额',
            }, {
              name: '同比增长',
            }],
            textStyle: {
              color: '#ffffff',
            }
          },
          xAxis: [
            {
              type: 'category',
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
              axisPointer: {
                type: 'shadow'
              },
              axisLabel: {
                textStyle: {
                  color: '#ffffff'
                }
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '金额(万元)',
              min: 0,
              max: 50,
              interval: 10,
              nameTextStyle: {
                color: '#ffffff'
              },
              axisLabel: {
                formatter: '{value}',
                textStyle: {
                  color: '#ffffff'
                }
              }
            },
            {
              type: 'value',
              name: '同比增长(%)',
              min: -200,
              max: 300,
              interval: 100,
              nameTextStyle: {
                color: '#ffffff'
              },
              axisLabel: {
                formatter: '{value}',
                textStyle: {
                  color: '#ffffff'
                }
              }
            }
          ],
          series: [
            {
              name: '2017金额',
              type: 'bar',
              barWidth: 20,
              barGap: 0,
              data: preData,
              itemStyle: {
                normal: {
                  color: '#44FAFA'
                }
              },
            },
            {
              name: '2018金额',
              type: 'bar',
              barWidth: 20,
              data: nowData
            },
            {
              name: '同比增长',
              type: 'line',
              yAxisIndex: 1,
              data: rateData,
              itemStyle: {
                normal: {
                  color: '#DED379'
                }
              }
            }
          ]
        });
      },
      getSummaries(param) {
        const {columns, data} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          const values = data.map(item => item[column.property]);
          if (values.every(value => value != null)) {
            if (index === 1 || index === 2) {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              // sums[index] += ' 元';
            } else {
              sums[index] = (values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0)) / 12
            }
          } else {
            sums[index] = '';
          }
          if (index > 0 && sums[index]) {
            sums[index] = sums[index].toFixed(2)
          }
        });
        return sums;
      },
      getRequestAndSendOrgNumByProductId() {
        findRequestAndSendOrgNumByProductId(this.productId).then((res) => {
          this.titleData = res.data;
        })
      },
      metaList() {
        let type = 'request';
        if (this.receiveFlag) {
          type = 'receive'
        }
        findPurchaseTradeInfoByProductId(this.productId, type).then((res) => {
          if (res.data) {
            this.resData = res.data.list;
            this.title2Data.sumMoney = res.data.sumMoney;
            this.title2Data.nowYearMoney = res.data.nowYearSumMoney;
            this.drawTradeInfoBar();
          }
        })

      }
    },
    mounted() {
      this.metaList();
      this.getRequestAndSendOrgNumByProductId()
    }
  }
</script>

<style scoped>

</style>
