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
                   type="date"
                   format="yyyy-MM-dd"
                   value-format="yyyy-MM-dd"
                   placeholder="创建开始日期"
                   :editable="false"
                   v-model="queryDate.startDate">
                  </el-date-picker>
                至
                <el-date-picker
                  size="small"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="创建结束日期"
                  :editable="false"
                  v-model="queryDate.endDate">
                  </el-date-picker>
             </span>
        <el-button @click="queryPurchaseBackup" type="primary">查询</el-button>
      </div>
      <div class="table-set">
        <el-table :data="querypurchaseDate.list" stripe border tooltip-effect="dark" >
          <el-table-column prop="buyerName" label="医疗机构" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="backupOrderSum" label="备案次数" width="80"></el-table-column>
          <el-table-column prop="backupRequestPrice" label="备案金额" width="120"> </el-table-column>
          <el-table-column  label="采购金额(万元)" align="right" header-align="left" width="120" >
            <template slot-scope="scope">
                {{priceFormat(scope.row.requestPrice)}}
            </template>
          </el-table-column>
          <el-table-column prop="requestNum" label="采购数量" align="right" header-align="left" width="80"> </el-table-column>
          <el-table-column  label="到货金额（万元）" align="right" header-align="left" width="125">
            <template slot-scope="scope">
              {{priceFormat(scope.row.receivePrice)}}
            </template>
          </el-table-column>
          <el-table-column prop="receiveNum" label="到货数量" align="right" header-align="left" width="80"></el-table-column>
          <el-table-column  label="备案占比(%)" align="right" header-align="left" width="100">
            <template slot-scope="scope">
              {{priceFormat(scope.row.backupRequestPer)}}
            </template>
          </el-table-column>
          <el-table-column  label="备案品种占比(%)" align="right" header-align="left" width="120">
            <template slot-scope="scope">
              {{priceFormat(scope.row.backupVaietyPer)}}
            </template>
          </el-table-column>
          <el-table-column  label="操作" width="90">
            <template slot-scope="scope">
              <div class="operates">
                <a href="javascript:" @click="handleClick(scope.row.buyerOrgid)">备案明细</a>
              </div>
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

    <el-dialog  title="备案明细" :visible.sync="dialogTableVisible" width="80%">
      <div class="s-form">
        <el-form>
          <el-input v-model="queryDate.productName" class="width-200" placeholder="产品名称"></el-input>
          <el-button @click="searchBackUpInfo" size="small">查询</el-button>
        </el-form>
        <div class="tableset">
          <el-table :data="backUpDate.list" stripe border tooltip-effect="dark" >
            <el-table-column prop="productName" label="产品名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="tradeName" label="商用名" header-align="left" width="100"></el-table-column>
            <el-table-column prop="doseageFormName" label="剂型"  header-align="left" width="100"></el-table-column>
            <el-table-column prop="spec" label="规格" show-overflow-tooltip header-align="left" width="100"></el-table-column>
            <el-table-column prop="standRate" label="转换比"  header-align="left" width="100"></el-table-column>
            <el-table-column prop="wrapName" label="包材"  header-align="left" width="100"></el-table-column>
            <el-table-column prop="metricName" label="单位"  header-align="left" width="100"></el-table-column>
            <el-table-column prop="manufactureName" label="生产企业"  show-overflow-tooltip header-align="left" width="100"></el-table-column>
            <el-table-column prop="senderOrgName" label="配送企业"  show-overflow-tooltip header-align="left" width="100"></el-table-column>
            <el-table-column  label="单价"  header-align="left" width="100">
              <template slot-scope="scope">
                {{priceFormat(scope.row.price)}}
              </template>
            </el-table-column>
            <el-table-column prop="requestNum" label="采购数量"  header-align="left" width="100"></el-table-column>
            <el-table-column label="采购金额" align="right" header-align="left" width="120">
              <template slot-scope="scope">
                {{priceFormat(scope.row.requestPrice)}}
              </template>
            </el-table-column>
            <el-table-column prop="purchaseDate" label="采购时间"  header-align="left" width="120"></el-table-column>
          </el-table>
        </div>
        <div class="pagebox">
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="backUpSizeChange"
            @current-change="CurrentChange"
            :page-sizes="[10, 20, 30]"
            :total="backUpDate.total"
            :page-size="backUpDate.pageSize"
            :page-count="backUpDate.pages"
            :current-page.sync="backUpDate.pageNum">
          </el-pagination>
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {queryPurchaseBackUp,queryPurchaseBackUpInfo } from "src/axios/supervise/supervise-transaction/supervision";
  import {priceFormat} from "src/utils/index"
  // 引入基本模板
  let echarts = require('echarts/lib/echarts');
  // 引入柱状图组件
  require('echarts/lib/chart/bar');
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  export default {
    name: 'purchaseRecordInfo',
    data() {
      return {
        backUpId:'',
        dialogTableVisible:false,
        resData: this.metaData(),
        querypurchaseDate:this.resultPurchase(),
        queryDate: this.queryDates(),
        backUpDate:this.backUpDates(),
        hospitalOrgName:[],
        purchasePrice:[],
        receivePrice:[]
      }
    },
    mounted() {
      this.queryPurchaseBackup();
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
      backUpDates(){
        return {
          pageNum: 1,
          pageSize: 20,
          total: 10,
          pages: 1,
          list: []
        }
      },
      searchBackUpInfo(){
        this.handleClick(this.backUpId);
      },
      backUpSizeChange (val){
        this.backUpDate.pageSize=val;
        this.handleClick(this.backUpId);
      },
      CurrentChange(val){
        this.backUpDate.pageNum=val;
        this.handleClick(this.backUpId);
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
          id:'',
          productName:'',
          hospitalName:'',
          startDate : '',
          endDate:''
        }
      },
      queryPurchaseBackup(){
        this.purchasePrice=[];
        this.receivePrice=[];
        this.hospitalOrgName=[];
        queryPurchaseBackUp(this.querypurchaseDate, this.queryDate).then(res => {
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
      handleClick(id){
        this.queryDate.id=id;
        this.backUpId=id;
        queryPurchaseBackUpInfo(this.backUpDate, this.queryDate).then(res => {
          this.backUpDate=res.data;
          0 === this.backUpDate.pageNum ? this.backUpDate.pageNum = 1 : null;
          this.dialogTableVisible=true;
        })

      },
      handleSizeChange(val) {
        this.querypurchaseDate.pageSize = val;
        this.queryPurchaseBackup();
      },
      handleCurrentChange(val) {
        this.querypurchaseDate.pageNum = val;
        this.queryPurchaseBackup();
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
              max: 100000,
              interval: 10000,
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
