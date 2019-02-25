<template>
  <div>
    <div class="infobox">
      <div id="myChart" style="height: 300px"></div>
    </div>
    <div class="infobox">
      <div class="s-form">
        <el-input v-model="queryDate.hospitalName" placeholder="医疗机构"></el-input>
        <span class="date-group">
                 <el-date-picker
                   size="small"
                   type="month"
                   format="yyyy-MM"
                   value-format="yyyyMM"
                   placeholder="创建开始日期"
                   :editable="false"
                   v-model="queryDate.startDate">
                  </el-date-picker>
                至
                <el-date-picker
                  size="small"
                  type="month"
                  format="yyyy-MM"
                  value-format="yyyyMM"
                  placeholder="创建结束日期"
                  :editable="false"
                  v-model="queryDate.endDate">
                  </el-date-picker>
             </span>
        <el-button @click="queryPurchaseFace">查询</el-button>
      </div>
      <div class="table-set">

        <el-table :data="querypurchaseDate.list" stripe border tooltip-effect="dark" >
          <el-table-column prop="buyerName" label="机构名称" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="faceNum" label="临采次数" align="right" header-align="left" width="80"></el-table-column>
          <el-table-column prop="facePrice" label="临采金额" align="right" header-align="left" width="100"> </el-table-column>
          <el-table-column prop="" label="采购金额(万元)" align="right" header-align="left" width="100">
            <template slot-scope="scope">
              {{priceFormat(scope.row.requestPrice)}}
            </template>
          </el-table-column>
          <el-table-column prop="requestNum" label="采购数量" align="right" header-align="left" width="90"> </el-table-column>
          <el-table-column prop="" label="到货金额(万元)" align="right" header-align="left" width="100">
            <template slot-scope="scope">
              {{priceFormat(scope.row.receivePrice)}}
            </template>
          </el-table-column>
          <el-table-column prop="receiveNum" label="到货数量" align="right" header-align="left" width="80"></el-table-column>
          <el-table-column  label="临采占比(%)" align="right" header-align="left" width="100">
            <template slot-scope="scope">
              {{priceFormat(scope.row.faceRequestPer)}}
            </template>
          </el-table-column>
          <el-table-column  label="临采品种占比(%)" align="right" header-align="left" width="120">
            <template slot-scope="scope">
              {{priceFormat(scope.row.faceVaietyPer)}}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagebox">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30]"
          :total="querypurchaseDate.total"
          :page-size="querypurchaseDate.pageSize"
          :page-count="querypurchaseDate.pages"
          :current-page.sync="querypurchaseDate.pageNum">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {queryPurchaseFace } from "src/axios/supervise/supervise-transaction/supervision";
  import {priceFormat} from "src/utils/index"
  // 引入基本模板
  let echarts = require('echarts/lib/echarts');
  // 引入柱状图组件
  require('echarts/lib/chart/bar');
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  export default {
    name: 'purchaseFaceInfo',
    data() {
      return {
        dialogTableVisible:false,
        resData: this.metaData(),
        querypurchaseDate:this.resultPurchase(),
        queryDate: this.queryDates(),
        hospitalOrgName:[],
        purchasePrice:[],
        receivePrice:[]
      }
    },
    mounted() {
      this.queryPurchaseFace();
    },
    methods: {
      priceFormat,
      resultPurchase(){
        return {
          pageNum: 1,
          pageSize: 20,
          total: 10,
          pages: 1,
          list: []
        }
      },
      metaData() { // 前后台交互数据封装格式
        return {
          pageNum: 1,
          pageSize: 20,
          total: 10,
          pages: 1,
          list: []
        }
      },
      queryDates(){
        return {
          hospitalName:'',
          startDate : '',
          endDate:''
        }
      },
      handleSizeChange(val) {
        this.querypurchaseDate.pageSize = val;
        this.queryPurchaseFace();
      },
      handleCurrentChange(val) {
        this.querypurchaseDate.pageNum = val;
        this.queryPurchaseFace();
      },
      queryPurchaseFace(){
        this.purchasePrice=[];
        this.receivePrice=[];
        this.hospitalOrgName=[];
        queryPurchaseFace(this.querypurchaseDate, this.queryDate).then(res => {
          this.querypurchaseDate=res.data;
          for(let i of this.querypurchaseDate.list){
            this.purchasePrice.push(i.requestPrice);
            this.receivePrice.push(i.receivePrice);
            this.hospitalOrgName.push(i.buyerName);
          }
          0 === this.querypurchaseDate.pageNum ? this.querypurchaseDate.pageNum = 1 : null;
          this.drawLine();
        })
      },
      handleClick(){
        this.dialogTableVisible=true;
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
            data:['采购金额','到货金额'],
            textStyle: {color: '#7ACAFF'}
          },
          xAxis: [
            {
              type: 'category',
              data: this.hospitalOrgName,
              axisPointer: {
                type: 'shadow'
              },
              axisLabel: {
                interval:0,
                rotate:"15",
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
              max: 200000,
              interval: 20000,
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
                  type: 'dashed'
                }
              }
            }
          ],
          dataZoom: [
            {
              type: 'slider',
              show: true,
              xAxisIndex: [0],
              start: 1,
              end: 35
            }

          ],
          series: [
            {
              name:'采购金额',
              type:'bar',
              data:this.purchasePrice,
              color: '#0D8AFF'
            },
            {
              name:'到货金额',
              type:'bar',
              data:this.receivePrice,
              color: '#7ACAFF'
            }
          ]
        });
      }
    }
  }
</script>
