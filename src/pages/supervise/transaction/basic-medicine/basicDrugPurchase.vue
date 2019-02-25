<template>
  <dl class="mainbox">
    <dd>
      <div class="infobox">
        <div id="myChart" style="height:300px"></div>
      </div>
      <div class="infobox">
        <div class="s-form">
          <el-form ref="queryData" :model="queryData">
            <el-input v-model="queryData.hospName" placeholder="医院名称"></el-input>
            <el-select v-model="queryData.orgName" placeholder="区县名称">
              <el-option v-for="item in areaArr"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="queryData.orgLevel" placeholder="医院级别">
              <el-option
                v-for="item in levelArr"
                :key="item.typeId"
                :label="item.typeName"
                :value="item.typeName">
              </el-option>
            </el-select>
            <el-select v-model="queryData.hosKind" placeholder="医院性质">
              <el-option
                v-for="item in natureArr"
                :key="item.label"
                :label="item.value"
                :value="item.label">
              </el-option>
            </el-select>
            <span class="date-group">
              <el-date-picker
                class="hospital"
                size="small"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="开始日期"
                :editable="false"
                v-model="queryData.beginDate">
              </el-date-picker>
            </span>
            <span class="date-group">
                <el-date-picker
                  size="small"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="结束日期"
                  :editable="false"
                  v-model="queryData.endDate">
                </el-date-picker>
            </span>
            <el-button @click="handleQuery()">查询</el-button>
            <el-button type="warning" @click="queryData =metaQuery()" size="small">重置</el-button>
          </el-form>
        </div>
        <div class="tableset">
          <el-table :data="resData.list" stripe border border tooltip-effect="dark">
            <el-table-column property="buyerOrgName" label="医院名称" show-overflow-tooltip></el-table-column>
            <el-table-column property="buyerArea" label="区县名称" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column property="orgLevel" label="医院级别" width="80"></el-table-column>
            <el-table-column property="orgNature" label="医院性质" width="80"></el-table-column>
            <el-table-column property="basicBuyNum" label="基药订购数量" align="right" header-align="left" width="100"></el-table-column>
            <el-table-column property="" label="基药订购金额(万元)" align="right" header-align="left" width="100">
              <template slot-scope="scope">
                <span>{{ priceFormat(scope.row.basicBuyPrice)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="基药订购数量占比" align="right" header-align="left" width="90">
              <template slot-scope="scope">
                <span>{{ priceFormat(scope.row.basicDrugNumRatio)}}%</span>
              </template>
            </el-table-column>
            <el-table-column label="基药订购金额占比" align="right" header-align="left" width="90">
              <template slot-scope="scope">
                <span>{{ priceFormat(scope.row.basicDrugPriceRatio)}}%</span>
              </template>
            </el-table-column>
            <el-table-column property="basicDrugReceiveNum" label="基药到货数量" align="right" header-align="left" width="100"></el-table-column>
            <el-table-column label="基药到货金额(万元)" align="right" header-align="left" width="100">
              <template slot-scope="scope">
                <span>{{ priceFormat(scope.row.basicDrugReceivePrice)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="基药到货数量占比" align="right" header-align="left" width="90">
              <template slot-scope="scope">
                <span>{{ priceFormat(scope.row.basicDrugReceiveNumRate)}}%</span>
              </template>
            </el-table-column>
            <el-table-column label="基药到货金额占比" align="right" header-align="left" width="90">
              <template slot-scope="scope">
                <span>{{ priceFormat(scope.row.basicDrugReceivePriceRate)}}%</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80">
              <template slot-scope="scope">
                <div class="operates">
                  <a href="javascript:" @click="selectInfo(scope.row.buyerOrgid)">查看详情</a>
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
    <el-dialog title="查看详细" :visible.sync="dialogTableVisible" width="80%"  @close="closeDialog()">
      <div class="s-form">
        <el-input v-model="queryDescData.productName" placeholder="产品名称"></el-input>

       <!-- <el-select v-model="value" placeholder="基药类型">
          <el-option></el-option>
        </el-select>-->
        <el-button @click="handleDescQuery()" size="small">查询</el-button>
        <el-button @click="queryDescData =metaDescQuery()" size="small">重置</el-button>
      </div>
      <div class="tableset">
        <el-table :data="resDescData.list" stripe border tooltip-effect="dark">
          <el-table-column property="medicalName" label="医院名称" show-overflow-tooltip></el-table-column>
          <el-table-column property="productName" label="产品名称" show-overflow-tooltip></el-table-column>
          <el-table-column property="doseageForm" label="剂型" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column property="spec" label="规格" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column property="basicDrugName" label="基药类型" width="100"></el-table-column>
          <el-table-column property="factoryName" label="生产企业" show-overflow-tooltip></el-table-column>
          <el-table-column property="senderName" label="配送企业" show-overflow-tooltip></el-table-column>
          <el-table-column property="requestNum" label="采购数量" align="right" header-align="left" width="80"></el-table-column>
          <el-table-column label="采购金额（万元）" align="right" header-align="left" width="80">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.requestPrice)}}</span>
            </template>
          </el-table-column>
          <el-table-column property="receiveNum" label="到货数量" align="right" header-align="left" width="80"></el-table-column>
          <el-table-column label="到货金额（万元）" align="right" header-align="left" width="80">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.receivePrice)}}</span>
            </template>
          </el-table-column>
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
  import {getBaseDrugPurchaseList, getArealist,GetProDetail} from 'src/axios/supervise/supervise-transaction/baseDrug'
  import {priceFormat} from "src/utils/index"
  export default {
    name: 'basicDrugPurchase',
    data() {
      return {
        areaArr: {
          list: []
        },
        levelArr: [
          {
            typeId: '',
            typeName:''
          },
          {
            typeId: '一级甲等',
            typeName:'一级甲等'
          },{
            typeId: '一级乙等',
            typeName:'一级乙等'
          },{
            typeId: '一级丙等',
            typeName:'一级丙等'
          }, {
            typeId: '二级甲等',
            typeName: '二级甲等'
          },{
            typeId: '二级乙等',
            typeName: '二级乙等'
          }, {
            typeId: '二级丙等',
            typeName: '二级丙等'
          }, {
            typeId: '三级甲等',
            typeName: '三级甲等'
          }, {
            typeId: '三级乙等',
            typeName: '三级乙等'
          }, {
            typeId: '三级丙等',
            typeName: '三级丙等'
          }, {
            typeId: '其他',
            typeName: '其他'
          }],
        natureArr: [
          {
            label: '',
            value: ''
          },
          {
            label: '公立',
            value: '公立'
          }, {
            label: '民营',
            value: '民营'
          }],
        dialogTableVisible: false,
        resData: this.metaData(),
        queryData: this.metaQuery(), // 查询初始化
        resDescData:this.metaDescData(),
        queryDescData:this.metaDescQuery(),
        chartData: {
          orgName: [],
          requestTotal: [],
          receiveTotal: []
        },
        tableData4: [{
          hospitalName: '北京顺天德中医医院有限责任公司',
          productName: '尪痹片(薄膜衣)',
          dosage: '薄膜衣片',
          pesc: '0.5g×48/盒',
          unit: '盒',
          type: '国家基药',
          produce: '辽宁上药好护士药业(集团)有限公司',
          distribution: '北京九州通医药有限公司',
          orderNum: '60',
          orderPrice: '0.2',
          receiveNum: '30',
          receivePrice: '0.1',
        }],
      }
    },
    mounted() {
      this.drawLine();
    },
    created() {
      this.initTableData()
    },
    methods: {
      priceFormat,
      metaQuery() { // 查询数据封装格式
        return {
          hospName: '',
          orgName: '',
          orgLevel: '',
          hosKind: '',
          beginDate: undefined,
          endDate: undefined

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
      metaDescQuery(){
        return{
          id:'',
          productName:''
        }
      },
      selectInfo(val,name) {
        console.info("val",val);
        console.info("name",name);
        this.queryDescData.id = val;
        this.queryDescData.productName = name;
        GetProDetail(this.resDescData, this.queryDescData).then(response => {
          console.info("response ", response);
          this.resDescData = response.data;
          0 === this.resDescData.pageNum ? this.resDescData.pageNum = 1 : null;

        });
        this.dialogTableVisible = true;
      },
      handleDescQuery(){
        this.selectInfo(this.queryDescData.id,this.queryDescData.productName)
      },
      closeDialog(){
        console.info("==========");
        this.resDescData = {};
      },
      initArealist() {
        getArealist().then(response => {
          console.info("response ", response);
          this.areaArr = response.data;


        }).then(() => {
          console.info("this.areaArr", this.areaArr);
          console.info("this.areaArr.list", this.areaArr.list)
        })

      },
      initTableData() {
        getBaseDrugPurchaseList(this.resData, this.queryData).then(response => {
          console.info("response ", response);
          this.resData = response.data;
          0 === this.resData.pageNum ? this.resData.pageNum = 1 : null;
          this.chartData.orgName = response.data.list.map(item => {
            return item.buyerOrgName;
          });
          this.chartData.receiveTotal = response.data.list.map(item => {
            return item.basicDrugReceivePrice;
          });
          this.chartData.requestTotal = response.data.list.map(item => {
            return item.basicBuyPrice;
          })


          /*
          this.chartData.orgName.splice(0, this.chartData.orgName.length);
          this.chartData.receiveTotal.splice(0, this.chartData.receiveTotal.length);
          this.chartData.requestTotal.splice(0, this.chartData.requestTotal.length);
          for (let i = 0; i < this.resData.list.length; i++) {
            this.chartData.orgName.push(this.resData.list[i]['orgName'])
            this.chartData.receiveTotal.push(this.resData.list[i]['receiveTotal'])
            this.chartData.requestTotal.push(this.resData.list[i]['requestTotal'])
          }*/

        }).then(() => {
          this.drawLine();
          this.initArealist()

        })
      },
      handleQuery() {
        this.resData = this.metaData();
        this.initTableData();
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
      handleSizeChange(val) {
        this.resData.pageSize = val;
        this.initTableData()
      },
      handleCurrentChange(val) {
        console.info("val", val);
        this.resData.pageNum = val;
        this.initTableData()
      },
      handleDescSizeChange(val) {
        this.resDescData.pageSize = val;
        this.selectInfo(this.queryDescData.id,this.queryDescData.productName)
      },
      handleDescCurrentChange(val) {
        this.resDescData.pageNum = val;
        this.selectInfo(this.queryDescData.id,this.queryDescData.productName)
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
            data: ['订购金额', '到货金额'],
            textStyle: {color: '#fff'}
          },
          xAxis: [
            {
              type: 'category',
              data: this.chartData.orgName,
              axisPointer: {
                type: 'shadow'
              },
              axisLabel: {
                textStyle: {
                  color: '#fff'
                },
                rotate: 15
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
              name: '万元',
              color: '#fff',

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
              end: this.getZoomSize()
            },
          ],
          series: [
            {
              name: '订购金额',
              type: 'bar',
              data: this.chartData.requestTotal,
              color: '#0D8AFF'
            },
            {
              name: '到货金额',
              type: 'bar',
              data: this.chartData.receiveTotal,
              color: '#34d4df'
            }
          ]
        });
      }
    }
  }
</script>
