<template>
  <div>
    <div class="infobox">
      <div id="myChart" style="height: 300px"></div>
    </div>
    <div class="infobox">
      <div class="s-form">
        <el-input v-model="queryData.orgName" placeholder="配送企业"></el-input>
        <span class="date-group">
                 <el-date-picker
                   size="small"
                   type="date"
                   format="yyyy-MM-dd"
                   value-format="yyyy-MM-dd"
                   placeholder="创建开始日期"
                   :editable="false"
                   v-model="queryData.startDate">
                  </el-date-picker>
                至
                <el-date-picker
                  size="small"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="创建结束日期"
                  :editable="false"
                  v-model="queryData.endDate">
                  </el-date-picker>
             </span>
        <el-button @click="searchSender">查询</el-button>
        <el-button @click="queryData=queryDatas()" size="small">重置</el-button>
      </div>
      <div class="tableset">
        <el-table :data="sendData.list" stripe border tooltip-effect="dark">
          <el-table-column prop="sendOrgName" label="配送企业" show-overflow-tooltip></el-table-column>
          <el-table-column prop="orderNum" label="订单数" width="100" align="right" header-align="left"></el-table-column>
          <el-table-column prop="responseOrderNum" label="响应订单数" width="100" align="right" header-align="left"></el-table-column>
          <el-table-column label="响应率（%）" width="100" align="right" header-align="left">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.responseRate)}}%</span>
            </template>
          </el-table-column>
          <el-table-column prop="requestNum" label="订购数量" width="100" align="right" header-align="left"></el-table-column>
          <el-table-column prop="" label="订单金额（万元）" width="140" align="right" header-align="left">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.requestMoney)}}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="stockupSum" label="订单已送货数量" width="120" align="right" header-align="left"></el-table-column>
          <el-table-column prop="confirmRate" label="发货率(%)" width="100" align="right" header-align="left"></el-table-column>-->
          <el-table-column  label="操作" width="160">
            <template slot-scope="scope">
              <div class="operates">
                <a href="javascript:" @click="selectProduct(scope.row.sendOrgId,'0')">查看产品</a>
                <a href="javascript:" @click="selectHospital(scope.row.sendOrgId,'0')">查看医院</a>
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
          :total="sendData.total"
          :page-size="sendData.pageSize"
          :page-count="sendData.pages"
          :current-page.sync="sendData.pageNum">
        </el-pagination>
      </div>
    </div>
    <el-dialog  title="查看医院" :visible.sync="dialogTableVisible" width="60%">
      <div class="s-form">
        <el-form  >
          <el-input v-model="queryHosData.orgHosName" placeholder="医院名称"></el-input>
          <span class="date-group">
               <el-date-picker
                 size="small"
                 type="date"
                 format="yyyy-MM-dd"
                 value-format="yyyy-MM-dd"
                 placeholder="开始日期"
                 :editable="false"
                 v-model="queryHosData.startHosDate">
                </el-date-picker>
              至
              <el-date-picker
                size="small"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="结束日期"
                :editable="false"
                v-model="queryHosData.endHosDate">
                </el-date-picker>
           </span>
          <el-button @click="searchHospatil" size="small">查询</el-button>
          <el-button @click="queryHosData=queryHosDatas()" size="small">重置</el-button>
        </el-form>
      </div>
      <div class="tableset">
          <el-table :data="hospatilData.list" stripe border tooltip-effect="dark">
            <el-table-column prop="orgName" label="医院名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="purchaseNumber" label="订单数量" align="right" header-align="left" width="80"></el-table-column>
            <el-table-column label="订单金额" align="right" header-align="left" width="120">
              <template slot-scope="scope">
                <span>{{ priceFormat(scope.row.purchasePrice)}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="arrivalNumber" label="到货数量" align="right" header-align="left" width="80"></el-table-column>
            <el-table-column label="到货金额" align="right" header-align="left" width="120">
              <template slot-scope="scope">
                <span>{{ priceFormat(scope.row.arrivalPrice)}}</span>
              </template>
            </el-table-column>
          </el-table>
      </div>
      <div class="pagebox">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="hosSizeChange"
          @current-change="hosCurrentChange"
          :page-sizes="[10, 20, 30]"
          :total="hospatilData.total"
          :page-size="hospatilData.pageSize"
          :page-count="hospatilData.pages"
          :current-page.sync="hospatilData.pageNum">
        </el-pagination>
      </div>
    </el-dialog>

    <el-dialog  title="查看产品" :visible.sync="dialogTableVisible_pro" width="80%">
      <div class="s-form">
        <el-form  >
          <el-input v-model="queryData.productName" placeholder="产品名称"></el-input>
          <span class="date-group">
               <el-date-picker
                 size="small"
                 type="date"
                 format="yyyy-MM-dd"
                 value-format="yyyy-MM-dd"
                 placeholder="开始日期"
                 :editable="false"
                 v-model="queryData.proStartDate">
                </el-date-picker>
              至
              <el-date-picker
                size="small"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="结束日期"
                :editable="false"
                v-model="queryData.proEndDate">
                </el-date-picker>
           </span>
          <el-button @click="searchProduct" size="small">查询</el-button>
          <el-button @click="queryData=queryDatas()" size="small">重置</el-button>
        </el-form>
      </div>
      <div class="tableset">
        <el-table :data="resData.list" stripe border tooltip-effect="dark" >
          <el-table-column prop="productName" label="产品名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="tradeName" label="商用名" width="100"></el-table-column>
          <el-table-column prop="doseageFormName" label="剂型" width="100"></el-table-column>
          <el-table-column prop="spec" label="规格" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="manufactureName" label="生产企业" show-overflow-tooltip ></el-table-column>
          <el-table-column prop="basicMedicant" label="基药标记" ></el-table-column>
          <el-table-column prop="requestNumber" label="订单数量" align="right" header-align="left" width="100"></el-table-column>
          <el-table-column  label="订单金额" align="right" header-align="left" width="120">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.requestPrice)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="receiveNumber" label="到货数量" align="right" header-align="left" width="100"></el-table-column>
          <el-table-column  label="到货金额" align="right" header-align="left" width="120">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.receivePrice)}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagebox">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="proSizeChange"
          @current-change="proCurrentChange"
          :page-sizes="[10, 20, 30]"
          :total="resData.total"
          :page-size="resData.pageSize"
          :page-count="resData.pages"
          :current-page.sync="resData.pageNum">
        </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>



<script>
  import {querySendInfo,queryProductInfo,queryHospatilBySender} from "src/axios/supervise/supervise-transaction/supervision";
  import {priceFormat} from "src/utils/index"
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
        input:'',
        sendOrgId:'',
        dialogTableVisible:false,
        dialogTableVisible_pro:false,
        resData: this.metaData(),
        sendData:this.sendDatas(),
        hospatilData:this.hospatilDatas(),
        queryData:this.queryDatas(),
        queryHosData:this.queryHosDatas(),
        purchaseNumber:[],
        receiveNumber:[],
        senderOrgName:[]
      }
    },
    mounted() {
      this.searchSender();
    },
    methods: {
      priceFormat,
      clearProduct(){
        this.queryData.productName='';
        this.queryDate.proStartDate='';
        this.queryData.proEndDate='';
      },
      handleSizeChange(val) {
        this.sendData.pageSize = val;
        this.searchSender();
      },
      handleCurrentChange(val) {
        this.sendData.pageNum = val;
        this.searchSender();
      },
      hosSizeChange(val) {
        this.hospatilData.pageSize = val;
        this.selectHospital(this.sendOrgId);
      },
      hosCurrentChange(val) {
        this.hospatilData.pageNum = val;
        this.selectHospital(this.sendOrgId);
      },
      proSizeChange(val){
        this.resData.pageSize = val;
        this.searchProduct();
      },
      proCurrentChange(val) {
        this.resData.pageNum = val;
        this.searchProduct();
      },
      searchSender(){
          this.purchaseNumber=[];
          this.receiveNumber=[];
          this.senderOrgName=[];
          console.log(this.sendData.pageSize);
        querySendInfo(this.sendData, this.queryData).then(res => {
          this.sendData=res.data;
          0 === this.sendData.pageNum ? this.sendData.pageNum = 1 : null;
          for(let i of this.sendData.list){
            this.purchaseNumber.push(i.requestNum);
            this.receiveNumber.push(i.stockupSum);
            this.senderOrgName.push(i.sendOrgName);
          }
          this.drawLine();
        })
      },
      searchProduct(){
        this.selectProduct(this.sendOrgId,'1');
      },
      searchHospatil(){
        this.selectHospital(this.sendOrgId,'1');
      },
      selectProduct(sendOrgId,index){
        this.sendOrgId=sendOrgId;
        this.queryData.id=sendOrgId;
        if(index=='0'){
          this.queryData.proStartDate=this.queryData.startDate;
          this.queryData.proEndDate=this.queryData.endDate;
        }
        queryProductInfo(this.resData, this.queryData).then(res => {
          this.resData = res.data;
          0 === this.resData.pageNum ? this.resData.pageNum = 1 : null;
          this.dialogTableVisible_pro = true;
        })
      },
      selectHospital(sendOrgId,index){
        this.sendOrgId=sendOrgId;
        this.queryHosData.id=sendOrgId;
        if(index=='0'){
          this.queryHosData.startHosDate=this.queryData.startDate;
          this.queryHosData.endHosDate=this.queryData.endDate;
        }
        queryHospatilBySender(this.hospatilData, this.queryHosData).then(res => {
          this.hospatilData = res.data;
          0 === this.hospatilData.pageNum ? this.hospatilData.pageNum = 1 : null;
          this.dialogTableVisible=true;
        })

      },
      hospatilDatas(){
        return {
          pageNum: 1,
          pageSize: 20,
          total: 10,
          pages: 1,
          list: []
        }
      },
      sendDatas() {
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
      queryHosDatas(){
        return {
          id:'',
          orgHosName:'',
          startHosDate:'',
          endHosDate:''
        }
      },
      queryDatas(){
        return {
          id:'',
          orgName:'',
          startDate:'',
          endDate:'',
          productName:'',
          proStartDate:'',
          proEndDate:''
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
            data:['订购数量','已发货数量'],
            textStyle: {color: '#fff'}
          },
          xAxis: [
            {
              type: 'category',
              data: this.senderOrgName,
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
              name: '单',
              color: '#fff',
              min: 0,
              max: 20000000,
              interval: 10000000,
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
              name:'订购数量',
              type:'bar',
              data:this.purchaseNumber,
              color: '#0D8AFF'
            },
            {
              name:'已发货数量',
              type:'bar',
              data:this.receiveNumber,
              color: '#34d4df'
            }
          ]
        });
      }
    }
  }
</script>
