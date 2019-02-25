<template>
  <dl class="mainbox">
    <dd>
      <div class="infobox">
        <div id="myChart" style="height: 300px"></div>
      </div>
      <div class="infobox">
        <div class="s-form">
          <el-form ref="form" :model="form" :rules="rules" >
            <el-input v-model="input" placeholder="企业名称"></el-input>
            <span class="date-group">
                 <el-date-picker
                   size="small"
                   type="month"
                   format="yyyy-MM"
                   value-format="yyyyMM"
                   placeholder="创建开始日期"
                   :editable="false"
                   v-model="input">
                  </el-date-picker>
                至
                <el-date-picker
                  size="small"
                  type="month"
                  format="yyyy-MM"
                  value-format="yyyyMM"
                  placeholder="创建结束日期"
                  :editable="false"
                  v-model="input">
                  </el-date-picker>
             </span>
            <el-select v-model="value" placeholder="企业类型">
              <el-option>生产企业</el-option>
              <el-option>配送企业</el-option>
            </el-select>
            <el-button>查询</el-button>
          </el-form>
        </div>
        <div class="tableset">
          <el-table :data="tableData3" stripe border tooltip-effect="dark">
            <el-table-column prop="orgName" label="企业名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="breakTitle" label="违约主题" width="90"> </el-table-column>
            <el-table-column prop="breakOne" label="违约行为一" width="90" align="right" header-align="left"> </el-table-column>
            <el-table-column prop="breakTwo" label="违约行为二" width="90" align="right" header-align="left"> </el-table-column>
            <el-table-column prop="breakThree" label="违约行为三" width="90" align="right" header-align="left"> </el-table-column>
            <el-table-column prop="breakFour" label="违约行为四" width="90" align="right" header-align="left"> </el-table-column>
            <el-table-column prop="breakFive" label="违约行为五" width="90" align="right" header-align="left"> </el-table-column>
            <el-table-column prop="breakSix" label="违约行为六" width="90" align="right" header-align="left"> </el-table-column>
            <el-table-column prop="breakSeven" label="违约行为七" width="90" align="right" header-align="left"> </el-table-column>
            <el-table-column prop="totalSum" label="总计次数" width="90" align="right" header-align="left"> </el-table-column>
            <el-table-column  label="操作" width="120">
              <template slot-scope="scope">
                <div class="operates">
                  <a href="javascript:" @click="selectInfo()">违约详情</a>
                </div>
              </template>
            </el-table-column>
          </el-table>
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
        <div class="s-note">
          <p>违约行为说明：</p>
          <p>违约行为一：评价周期内累计多次订货未配送，到货率不足40%的，造成中标药品断货或严重影响临床使用的</p>
          <p>违约行为二：评价周期内配送中标药品品种或数量平均到货率高于40%不足80%的或影响临床使用的</p>
          <p>违约行为三：未按订单品种名称、剂型、规格、包装、生产企业等要求供应药品的</p>
          <p>违约行为四：未按订单地址、时限要求及时送达中标药品的。如：急救、抢救药4小时内送达；一般药品24小时内送达</p>
          <p>违约行为五：未按约定对近效期、包装不符合规定、包装破损或有问题的中标药品拒不进行调换的</p>
          <p>违约行为六：未经价格主管部门调价或集中采购工作机构审核通过，中标药品私自调价的</p>
          <p>违约行为七：其他违约行为</p>
        </div>

      </div>
    </dd>

    <el-dialog title="企业违约详情" :visible.sync="dialogTableVisible" width="80%">
      <div class="tableset">
        <template>
          <el-table :data="tableData4" stripe border tooltip-effect="dark">
            <el-table-column property="orgName" label="企业名称" show-overflow-tooltip></el-table-column>
            <el-table-column property="breakTitle" label="违约主题" show-overflow-tooltip></el-table-column>
            <el-table-column property="buyerName" label="医院名称" show-overflow-tooltip width="150"></el-table-column>
            <el-table-column property="breakdesc" label="违约行为" show-overflow-tooltip></el-table-column>
            <el-table-column property="remark" label="备注" show-overflow-tooltip width="200"></el-table-column>
            <el-table-column property="evaluateDate" label="评价日期" width="160"></el-table-column>
          </el-table>
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
        </template>
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
  export default {
    name: 'complaints',
    data() {
      return {
        dialogTableVisible: false,
        resData: this.metaData(),
        tableData4:[{
          index:'1',
          orgId: 'FR20T0000004000000066990',
          orgName: '北京科园信海医药经营有限公司',
          breakTitle: '配送企业',
          buyerName:'首都医科大学附属北京儿童医院',
          breakdesc:'评价周期内累计多次订货未配送，到货率不足40%的，造成中标药品断货或严重影响临床使用的',
          remark:'药品不是正规渠道',
          evaluateDate:'2017-02-23 14:33:36'
        },
          {
            index:'2',
            orgId: 'FR20T0000004000000066990',
            orgName: '北京科园信海医药经营有限公司',
            breakTitle: '配送企业',
            buyerName:'首都医科大学附属北京儿童医院',
            breakdesc:'评价周期内累计多次订货未配送，到货率不足40%的，造成中标药品断货或严重影响临床使用的',
            remark:'药品不是正规渠道',
            evaluateDate:'2017-02-23 14:33:36'
          },
          {
            index:'3',
            orgId: 'FR20T0000004000000066990',
            orgName: '北京科园信海医药经营有限公司',
            breakTitle: '配送企业',
            buyerName:'首都医科大学附属北京儿童医院',
            breakdesc:'评价周期内累计多次订货未配送，到货率不足40%的，造成中标药品断货或严重影响临床使用的',
            remark:'药品不是正规渠道',
            evaluateDate:'2017-02-23 14:33:36'
          },
          {
            index:'4',
            orgId: 'FR20T0000004000000066990',
            orgName: '北京科园信海医药经营有限公司',
            breakTitle: '配送企业',
            buyerName:'首都医科大学附属北京儿童医院',
            breakdesc:'评价周期内累计多次订货未配送，到货率不足40%的，造成中标药品断货或严重影响临床使用的',
            remark:'药品不是正规渠道',
            evaluateDate:'2017-02-23 14:33:36'
          },
          {
            index:'5',
            orgId: 'FR20T0000004000000066990',
            orgName: '北京科园信海医药经营有限公司',
            breakTitle: '配送企业',
            buyerName:'首都医科大学附属北京儿童医院',
            breakdesc:'评价周期内累计多次订货未配送，到货率不足40%的，造成中标药品断货或严重影响临床使用的',
            remark:'药品不是正规渠道',
            evaluateDate:'2017-02-23 14:33:36'
          },
          {
            index:'6',
            orgId: 'FR20T0000004000000066990',
            orgName: '北京科园信海医药经营有限公司',
            breakTitle: '配送企业',
            buyerName:'首都医科大学附属北京儿童医院',
            breakdesc:'评价周期内累计多次订货未配送，到货率不足40%的，造成中标药品断货或严重影响临床使用的',
            remark:'药品不是正规渠道',
            evaluateDate:'2017-02-23 14:33:36'
          },
          {
            index:'7',
            orgId: 'FR20T0000004000000066990',
            orgName: '北京科园信海医药经营有限公司',
            breakTitle: '配送企业',
            buyerName:'首都医科大学附属北京儿童医院',
            breakdesc:'评价周期内累计多次订货未配送，到货率不足40%的，造成中标药品断货或严重影响临床使用的',
            remark:'药品不是正规渠道',
            evaluateDate:'2017-02-23 14:33:36'
          },
          {
            index:'8',
            orgId: 'FR20T0000004000000066990',
            orgName: '北京科园信海医药经营有限公司',
            breakTitle: '配送企业',
            buyerName:'首都医科大学附属北京儿童医院',
            breakdesc:'评价周期内累计多次订货未配送，到货率不足40%的，造成中标药品断货或严重影响临床使用的',
            remark:'药品不是正规渠道',
            evaluateDate:'2017-02-23 14:33:36'
          },
          {
            index:'9',
            orgId: 'FR20T0000004000000066990',
            orgName: '北京科园信海医药经营有限公司',
            breakTitle: '配送企业',
            buyerName:'首都医科大学附属北京儿童医院',
            breakdesc:'评价周期内累计多次订货未配送，到货率不足40%的，造成中标药品断货或严重影响临床使用的',
            remark:'药品不是正规渠道',
            evaluateDate:'2017-02-23 14:33:36'
          },
          {
            index:'10',
            orgId: 'FR20T0000004000000066990',
            orgName: '北京科园信海医药经营有限公司',
            breakTitle: '配送企业',
            buyerName:'首都医科大学附属北京儿童医院',
            breakdesc:'评价周期内累计多次订货未配送，到货率不足40%的，造成中标药品断货或严重影响临床使用的',
            remark:'药品不是正规渠道',
            evaluateDate:'2017-02-23 14:33:36'
          }
        ],
        tableData3: [{
          index:'1',
          orgId: 'FR20T0000004000000066990',
          orgName: '北京科园信海医药经营有限公司',
          breakTitle: '配送企业',
          breakOne: 2,
          breakTwo: 1,
          breakThree: 0,
          breakFour: 0,
          breakFive: 0,
          breakSix: 1,
          breakSeven: 7,
          totalSum: 11
        },
          {
            index:'2',
            orgId: 'FR20T0000004000000067015',
            orgName: '嘉事堂药业股份有限公司',
            breakTitle: '配送企业',
            breakOne: 2,
            breakTwo: 0,
            breakThree: 0,
            breakFour: 0,
            breakFive: 0,
            breakSix: 0,
            breakSeven: 0,
            totalSum: 2
          },
          {
            index:'3',
            orgId: 'DATA10000000000012573067',
            orgName: '北京九州通医药有限公司',
            breakTitle: '配送企业',
            breakOne: 1,
            breakTwo: 0,
            breakThree: 0,
            breakFour: 1,
            breakFive: 0,
            breakSix: 0,
            breakSeven: 0,
            totalSum: 2
          },
          {
            index:'4',
            orgId: 'FR20T0000004000000088271',
            orgName: '国药控股北京天星普信生物医药有限公司',
            breakTitle: '配送企业',
            breakOne: 0,
            breakTwo: 0,
            breakThree: 0,
            breakFour: 0,
            breakFive: 1,
            breakSix: 0,
            breakSeven: 0,
            totalSum: 1
          },
          {
            index:'5',
            orgId: 'DATA10000000000007590400',
            orgName: '北京安和康医药有限公司',
            breakTitle: '配送企业',
            breakOne: 0,
            breakTwo: 0,
            breakThree: 0,
            breakFour: 0,
            breakFive: 0,
            breakSix: 0,
            breakSeven: 1,
            totalSum: 1
          },
          {
            index:'6',
            orgId: 'FR20T0000004000000067072',
            orgName: '华润医药商业集团有限公司',
            breakTitle: '配送企业',
            breakOne: 1,
            breakTwo: 2,
            breakThree: 0,
            breakFour: 0,
            breakFive: 0,
            breakSix: 0,
            breakSeven: 1,
            totalSum: 4
          },
          {
            index:'7',
            orgId: 'B01J10000000000029855228',
            orgName: '国药控股北京有限公司',
            breakTitle: '配送企业',
            breakOne: 1,
            breakTwo: 2,
            breakThree: 0,
            breakFour: 0,
            breakFive: 0,
            breakSix: 0,
            breakSeven: 1,
            totalSum: 4
          },
          {
            index:'8',
            orgId: 'DATA10000000000012573067',
            orgName: '北京九州通医药有限公司',
            breakTitle: '配送企业',
            breakOne: 1,
            breakTwo: 1,
            breakThree: 0,
            breakFour: 0,
            breakFive: 0,
            breakSix: 0,
            breakSeven: 1,
            totalSum: 3
          },
          {
            index:'8',
            orgId: 'FR20T0000004000000066990',
            orgName: '北京科园信海医药经营有限公司',
            breakTitle: '配送企业',
            breakOne: 1,
            breakTwo: 1,
            breakThree: 0,
            breakFour: 0,
            breakFive: 0,
            breakSix: 0,
            breakSeven: 1,
            totalSum: 3
          },
          {
            index:'9',
            orgId: 'FR20T0000004000000067068',
            orgName: '北京美康永正医药有限公司',
            breakTitle: '配送企业',
            breakOne: 1,
            breakTwo: 1,
            breakThree: 0,
            breakFour: 0,
            breakFive: 0,
            breakSix: 0,
            breakSeven: 1,
            totalSum: 3
          },
          {
            index:'10',
            orgId: 'FR20T0000004000000069065',
            orgName: '国药集团药业股份有限公司',
            breakTitle: '配送企业',
            breakOne: 2,
            breakTwo: 1,
            breakThree: 0,
            breakFour: 0,
            breakFive: 0,
            breakSix: 0,
            breakSeven: 1,
            totalSum: 4
          }

        ]
      }
    },
    mounted() {
      this.drawLine();
    },
    methods: {
      selectInfo(){
        this.dialogTableVisible=true;
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
            data:['违约次数'],
            textStyle: {color: '#7ACAFF'}
          },
          xAxis: [
            {
              type: 'category',
              data: ['北京科园信海','嘉事堂药业','北京九州通','北京天星普信','北京安和康','华润医药','国药控股','北京信海','北京美康永正','国药集团'],
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
              name: '次数',
              color: '#fff',
              min: 0,
              max: 50,
              interval: 10,
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
                  type: 'dashed',// 使用深浅的间隔色
                  color: ['#aaa', '#ddd']
                }
              }
            }
          ],
          series: [
            {
              name:'违约次数',
              type:'bar',
              data:[24.22, 19, 13, 12, 6, 4, 1, 10, 9, 6],
              color: '#0D8AFF'
            }
          ]
        });
      }
    }
  }
</script>
