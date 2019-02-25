<template>
  <dl class="mainbox">
    <dd>
      <div class="infobox">
        <div id="myChart" style="height: 300px"></div>
      </div>
      <div class="infobox">
        <div class="s-form">
          <el-form :inline="true" :model="queryData" ref="queryData">

            <el-input v-model="queryData.productName" placeholder="产品名"></el-input>
            <el-input v-model="queryData.orgName" placeholder="生产企业"></el-input>
            <el-button @click="handleQuery()">查询</el-button>
            <el-button @click="queryData =metaQuery()" size="small">重置</el-button>
            <el-button size="small">导出</el-button>
          </el-form>
        </div>
        <div class="table-set">
          <el-table :data="resData.list" stripe border tooltip-effect="dark">
            <el-table-column prop="productName" label="产品名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="tradeName" label="商品名" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="doseageFormName" label="剂型" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="spec" label="规格" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="standRate" label="转换比" align="right" header-align="left" width="80"></el-table-column>
            <el-table-column prop="specUnit" label="单位" width="80"></el-table-column>
            <el-table-column prop="wrapName" label="包材" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="orgName" label="生产企业" show-overflow-tooltip></el-table-column>
            <el-table-column prop="bidMaxPrice" label="最高价" align="right" header-align="left" width="100"></el-table-column>
            <el-table-column prop="bidMinPrice" label="最低价" align="right" header-align="left" width="100"></el-table-column>
            <el-table-column prop="priceRatio" label="最高最低价格差" align="right" header-align="left" width="120"></el-table-column>
            <el-table-column prop="updateDate" label="最早采购日期" width="120"></el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <div class="operates">
                  <a href="javascript:" @click="handleClick(scope.row.id)">查看详情</a>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagebox">
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            :page-sizes="[10, 20, 30]"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total="resData.total"
            :page-size="resData.pageSize"
            :page-count="resData.pages"
            :current-page.sync="resData.pageNum">
          </el-pagination>
        </div>
      </div>
    </dd>


    <el-dialog title="详细信息" :visible.sync="dialogTableVisible" width="50%" @close="closeDialog()" :close-on-click-modal="false">
      <div class="s-form">
        <el-input v-model="queryDescData.hostName" placeholder="医院名称"></el-input>
        <el-button @click="handleDescQuery()" size="small">查询</el-button>
        <el-button @click="queryDescData =metaDescQuery()" size="small">重置</el-button>
        <el-button size="small">导出</el-button>
      </div>
      <div class="tableset">
        <el-table :data="resDescData.list" stripe border tooltip-effect="dark">
          <el-table-column property="hosName" label="医院名称" show-overflow-tooltip></el-table-column>
          <el-table-column property="bidPrice" label="价格" align="right" width="100"></el-table-column>
          <el-table-column property="updateDate" label="最早采购日期" width="120" align="center"></el-table-column>
        </el-table>
      </div>
      <div class="pagebox">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="[10, 20, 30]"
          @size-change="handleDescSizeChange"
          @current-change="handleDescCurrentChange"
          :total="resDescData.total"
          :page-size="resDescData.pageSize"
          :page-count="resDescData.pages"
          :current-page.sync="resDescData.pageNum">
        </el-pagination>
      </div>
    </el-dialog>
  </dl>
</template>

<script>
  // 引入基本模板
  let echarts = require('echarts/lib/echarts');
  // 引入柱状图组件
  require('echarts/lib/chart/bar');
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  import {priceWarning,priceDescById} from 'src/axios/supervise/supervise-transaction/pricewarning'

  export default {
    name: 'priceEarlyWarning',
    data() {
      return {
        dialogTableVisible: false,
        resData: this.metaData(),
        resDescData:this.metaDescData(),
        queryData: this.metaQuery(), // 查询初始化
        queryDescData:this.metaDescQuery(),
        chartData: {
          productNames: [],
          bidMaxPrices: [],
          bidMinPrices: []
        },
        tableData4: [{
          hospitalName: '北京市通州区中西医结合医院',
          price: 3,
          fastDate: '2017-04-17'
        }, {
          hospitalName: '北京清华长庚医院',
          price: 23,
          fastDate: '2017-04-24'
        }],
      }
    },
    created(){
      this.initTableData()
    },
    mounted() {
      this.drawLine();
    },
    methods: {
      metaQuery() { // 查询数据封装格式
        return {
          productName: '',
          orgName: '',
          beginDate: undefined,
          endDate: undefined

        }
      },
      metaDescQuery(){
        return{
          id:'',
          hostName:''
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
      metaDescData() { // 前后台交互数据封装格式
        return {
          pageNum: 1,
          pageSize: 20,
          total: 10,
          pages: 1,
          list: []
        }
      },
      initTableData() {
        priceWarning(this.resData, this.queryData).then(response => {
          console.info("response ", response);
          this.resData = response.data;
          0 === this.resData.pageNum ? this.resData.pageNum = 1 : null;
          this.chartData.productNames.splice(0, this.chartData.productNames.length);
          this.chartData.bidMaxPrices.splice(0, this.chartData.bidMaxPrices.length);
          this.chartData.bidMinPrices.splice(0, this.chartData.bidMinPrices.length);
          for (let i = 0; i < this.resData.list.length; i++) {
            this.chartData.productNames.push(this.resData.list[i]['productName']);
            this.chartData.bidMaxPrices.push(this.resData.list[i]['bidMaxPrice']);
            this.chartData.bidMinPrices.push(this.resData.list[i]['bidMinPrice'])
          }

        }).then(() => {
          this.drawLine()
        })
      },
      handleClick(val,name) {
        console.info("val",val);
        console.info("name",name);
        this.queryDescData.id = val;
        this.queryDescData.hostName = name;
        priceDescById(this.resDescData, this.queryDescData).then(response => {
          console.info("response ", response);
          this.resDescData = response.data;
          0 === this.resDescData.pageNum ? this.resDescData.pageNum = 1 : null;

        });
        this.dialogTableVisible = true;
      },
      handleQuery() {
        this.resData = this.metaData();
        this.initTableData();
      },
      handleDescQuery(){
        this.handleClick(this.queryDescData.id,this.queryDescData.hostName)
      },
      handleSizeChange(val) {
        this.resData.pageSize = val;
        this.initTableData()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val;
        this.initTableData()
      },
      handleDescSizeChange(val) {
        this.resDescData.pageSize = val;
        this.handleClick(this.queryDescData.id,this.queryDescData.hostName)
      },
      handleDescCurrentChange(val) {
        this.resDescData.pageNum = val;
        this.handleClick(this.queryDescData.id,this.queryDescData.hostName)
      },
      closeDialog(){
        console.info("==========");
        this.resDescData = {};
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
            data: ['最高价', '最低价'],
            textStyle: {color: '#fff'}
          },
          xAxis: [
            {
              type: 'category',
              data: this.chartData.productNames,
              axisPointer: {
                type: 'shadow'
              },
              axisLabel: {
                textStyle: {
                  color: '#fff'
                },
                // rotate:15,
                interval: 0,
                formatter: function (value) {
                  var ret = "";//拼接加\n返回的类目项
                  var maxLength = 4;//每项显示文字个数
                  var valLength = value.length;//X轴类目项的文字个数
                  var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
                  if (rowN > 1)//如果类目项的文字大于3,
                  {
                    for (var i = 0; i < rowN; i++) {
                      var temp = "";//每次截取的字符串
                      var start = i * maxLength;//开始截取的位置
                      var end = start + maxLength;//结束截取的位置
                      //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                      temp = value.substring(start, end) + "\n";
                      ret += temp; //凭借最终的字符串
                    }
                    return ret;
                  }
                  else {
                    return value;
                  }
                }
              },
              axisLine: {
                lineStyle: {
                  color: '#fff',
                  width: 1,//这里是为了突出显示加上的
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
              name: '元',
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

              axisLine: {
                lineStyle: {
                  color: '#fff',
                  width: 1,//这里是为了突出显示加上的
                }
              },
              splitLine: {
                lineStyle: {
                  type: 'dashed',// 使用深浅的间隔色
                  color: ['#aaa', '#ddd']
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
              name: '最高价',
              type: 'bar',
              data: this.chartData.bidMaxPrices,
              color: '#0D8AFF'
            },
            {
              name: '最低价',
              type: 'bar',
              data: this.chartData.bidMinPrices,
              color: '#34d4df'
            }
          ]
        });
      }
    }
  }
</script>
