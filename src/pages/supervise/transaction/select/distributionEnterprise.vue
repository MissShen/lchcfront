<template>
  <div class="mainbox">
    <div class="infobox">
      <div id="myChart" style="height: 300px"></div>
    </div>
    <div class="s-form">
      <el-input v-model="input" placeholder="企业名称"></el-input>
      <el-input v-model="input" placeholder="生产企业"></el-input>
      <el-input v-model="input" placeholder="配送企业"></el-input>
      <el-input v-model="input" placeholder="维护状态"></el-input>
      <el-input v-model="input" placeholder="维护时间"></el-input>
      <el-select v-model="value" placeholder="医院等级">
        <el-option></el-option>
      </el-select>
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </div>
    <div class="infobox">
      <div class="tableset">
        <el-table :data="tableData3" stripe>
          <el-table-column prop="index" label="序号" width="50"></el-table-column>
          <el-table-column prop="senderOrgName" label="配送企业"  width="180"> </el-table-column>
          <el-table-column prop="orderNum" label="订单数" width="100"></el-table-column>
          <el-table-column prop="responseOrderNum" label="响应订单数"> </el-table-column>
          <el-table-column prop="reponseReta" label="响应率（%）"> </el-table-column>
          <el-table-column prop="requestNum" label="订购数量"> </el-table-column>
          <el-table-column prop="sendNum" label="订单已送货数量"> </el-table-column>
          <el-table-column prop="sendRate" label="发货率(%)"> </el-table-column>
          <el-table-column  label="操作" width="180">
            <template slot-scope="scope">
              <a href="javascript:" class="operation-btn" @click="handleClick(scope.row)">查看产品</a>
              <a href="javascript:" class="operation-btn">查看医院</a>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="pagebox">
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 30]"
        :total="resData.total"
        :page-size="resData.pageSize"
        :page-count="resData.pages"
        :current-page.sync="resData.pageNum">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  // 引入基本模板
  let echarts = require('echarts/lib/echarts');
  // 引入柱状图组件
  require('echarts/lib/chart/bar');
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  export default {
    name: 'hello',
    data() {
      return {
        resData: this.metaData(),
        tableData3: [{
          index:'1',
          sendOrgId:'FR20T0000004000000067072',
          senderOrgName: '华润医药商业集团有限公司',
          orderNum: 17936,
          responseOrderNum:17934,
          reponseReta: 99.99,
          requestNum: 17374322,
          sendNum: 8202285,
          sendRate: 47.21
        },
          {
            index:'2',
            sendOrgId:'B01J10000000000029855228',
            senderOrgName: '国药控股北京有限公司',
            orderNum: 13418,
            responseOrderNum:12793,
            reponseReta: 95.34,
            requestNum: 7613134,
            sendNum: 2963118,
            sendRate: 38.92
          },
          {
            index:'3',
            sendOrgId:'FR20T0000004000000067015',
            senderOrgName: '嘉事堂药业股份有限公司',
            orderNum: 12772,
            responseOrderNum:12684,
            reponseReta: 99.31,
            requestNum: 13710287,
            sendNum: 5567431,
            sendRate: 40.61
          },
          {
            index:'4',
            sendOrgId:'DATA10000000000012573067',
            senderOrgName: '北京九州通医药有限公司',
            orderNum: 11643,
            responseOrderNum:11126,
            reponseReta: 95.56,
            requestNum: 7915432,
            sendNum: 2056172,
            sendRate: 25.97
          },
          {
            index:'5',
            sendOrgId:'FR20T0000004000000066990',
            senderOrgName: '北京科园信海医药经营有限公司',
            orderNum: 8859,
            responseOrderNum:8859,
            reponseReta: 100,
            requestNum: 8517179,
            sendNum: 3120387,
            sendRate: 36.58
          },
          {
            index:'6',
            sendOrgId:'FR20T0000004000000069065',
            senderOrgName: '国药集团药业股份有限公司',
            orderNum: 7350,
            responseOrderNum:7320,
            reponseReta: 99.59,
            requestNum: 6449011,
            sendNum: 1690471,
            sendRate: 26.21
          },
          {
            index:'7',
            sendOrgId:'FR20T0000004000000067031',
            senderOrgName: '华润医药商业集团有限公司北京药品分公司',
            orderNum: 4866,
            responseOrderNum:4866,
            reponseReta: 100,
            requestNum: 8715598,
            sendNum: 3029078,
            sendRate: 34.75
          },
          {
            index:'8',
            sendOrgId:'FR20T0000004000000067031',
            senderOrgName: '国药控股北京华鸿有限公司',
            orderNum: 4250,
            responseOrderNum:4224,
            reponseReta: 99.39,
            requestNum: 3451856,
            sendNum: 1272465,
            sendRate: 36.86
          },
          {
            index:'9',
            sendOrgId:'FR20T0000004000000067004',
            senderOrgName: '华润普仁鸿(北京)医药有限公司',
            orderNum: 4048,
            responseOrderNum:4047,
            reponseReta: 99.98,
            requestNum: 4074087,
            sendNum: 1778057,
            sendRate: 43.64
          },
          {
            index:'10',
            sendOrgId:'FR20T0000004000000088271',
            senderOrgName: '国药控股北京天星普信生物医药有限公司',
            orderNum: 3928,
            responseOrderNum:3821,
            reponseReta: 97.28,
            requestNum: 3971546,
            sendNum: 1476488,
            sendRate: 37.18
          }
        ]
      }
    },
    mounted() {
      this.drawLine();
    },
    methods: {
      metaData() { // 前后台交互数据封装格式
        return {
          pageNum: 1,
          pageSize: 20,
          total: 10,
          pages: 1,
          list: []
        }
      },
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart'));
        // 绘制图表
        myChart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
              crossStyle: {
                color: '#999'
              }
            }
          },
          toolbox: {
            iconStyle: {
              borderColor: '#34d4df'//设置工具箱图标颜色
            },
            feature: {
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          legend: {
            data:['订购金额','到货金额'],
            textStyle: {color: '#7ACAFF'}
          },
          xAxis: [
            {
              type: 'category',
              data: ['北大医院','北京安贞医院','北大人民医院','中日友好医院','北大一院','北京友谊医院','肿瘤医院','西苑医院','北京医院','北京医院2'],
              axisPointer: {
                type: 'shadow'
              },
              axisLabel: {
                textStyle: {
                  color: '#fff'
                }
              },
              axisLine:{
                lineStyle:{
                  color:'#fff',
                  width:1,//这里是为了突出显示加上的
                }
              },
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '万元',
              color: '#fff',
              min: 0,
              max: 250,
              interval: 50,
              axisLabel: {
                formatter: '{value}',
                textStyle: {
                  color: '#fff'
                }
              },
              axisLine:{
                lineStyle:{
                  color:'#fff',
                  width:1,//这里是为了突出显示加上的
                }
              },
              splitLine: {
                lineStyle: {
                  // 使用深浅的间隔色
                  color: ['#aaa', '#ddd']
                }
              }
            }
          ],
          series: [
            {
              name:'订购金额',
              type:'bar',
              data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 32.6],
              color: '#0D8AFF'
            },
            {
              name:'到货金额',
              type:'bar',
              data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 32.6],
              color: '#7ACAFF'
            }
          ]
        });
      }
    }
  }
</script>
