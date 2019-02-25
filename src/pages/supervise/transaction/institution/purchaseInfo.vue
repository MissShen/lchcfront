<template>
  <div>
    <div class="infobox">
      <div id="myChart" style="height: 300px"></div>
    </div>
    <div class="infobox">
      <div class="s-form">
        <el-form>
          <el-input v-model="queryDate.name" placeholder="医院名称"></el-input>
          <span class="date-group">
             <el-date-picker
               size="small"
               type="date"
               format="yyyy-MM-dd"
               value-format="yyyy-MM-dd"
               placeholder="开始日期"
               :editable="false"
               v-model="queryDate.startDate">
              </el-date-picker>
            至
            <el-date-picker
              size="small"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="结束日期"
              :editable="false"
              v-model="queryDate.endDate">
              </el-date-picker>
           </span>
          <el-select v-model="queryDate.areaId" placeholder="医院区域" class="width-120">
            <el-option v-for="item in areaArr.list"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
            </el-option>
          </el-select>
          <el-select v-model="queryDate.level" placeholder="医院等级" class="width-120">
            <el-option
              v-for="item in levelArr"
              :key="item.typeId"
              :label="item.typeName"
              :value="item.typeId">
            </el-option>
          </el-select>
          <el-select v-model="queryDate.nature" placeholder="医院性质" class="width-120">
            <el-option
              v-for="item in natureArr"
              :key="item.label"
              :label="item.value"
              :value="item.label">
            </el-option>
          </el-select>
            <el-button @click="searchPurchase">查询</el-button>
          <el-button @click="queryDate =queryDates()" size="small">重置</el-button>
        </el-form>
      </div>
      <!--暂时隐藏jz0180606
      <div class="table-caption">
        <span class="caption-right">
          <i class="iconfont hetongliebiao"></i>
          <i class="iconfont xiazai2"></i>
          <i class="iconfont dayin"></i>
        </span>
      </div>-->
      <div class="tableset">
        <el-table :data="purchaseDate.list" stripe border tooltip-effect="dark">
          <el-table-column prop="orgName" label="医院名称" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="areaName" label="医院区域" width="90"></el-table-column>
          <el-table-column prop="orgLevel" label="医院等级" width="80"> </el-table-column>
          <el-table-column prop="orgNature" label="医院性质" width="80"> </el-table-column>
          <el-table-column prop="requestNum" label="采购数量" align="right" header-align="left" width="80"> </el-table-column>
          <el-table-column  label="采购金额(万元)" align="right" header-align="left" width="120">
          <template slot-scope="scope">
            {{priceFormat(scope.row.requestPrice)}}
          </template>
          </el-table-column>
          <el-table-column prop="receiveNum" label="到货数量" align="right" header-align="left" width="80"> </el-table-column>
          <el-table-column  label="到货金额(万元)" align="right" header-align="left" width="120">
            <template slot-scope="scope">
              {{priceFormat(scope.row.receivePrice)}}
            </template>
          </el-table-column>
          <el-table-column prop="varietiesNum" label="品种数" align="right" header-align="left" width="70"> </el-table-column>
          <el-table-column label="到货率（%）" align="right" header-align="left" width="100">
            <template slot-scope="scope">
              {{priceFormat(scope.row.receiveRate)}}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <div class="operates">
                <a href="javascript:" @click="selectPs(scope.row.id,'0')" class="iconfont icon-peisong2"></a> &nbsp;&nbsp;
                <a href="javascript:" @click="selectPro(scope.row.id,'0')" class="iconfont icon-fenlei1"></a>
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
          :total="purchaseDate.total"
          :page-size="purchaseDate.pageSize"
          :page-count="purchaseDate.pages"
          :current-page.sync="purchaseDate.pageNum">
        </el-pagination>
      </div>
    </div>
    <el-dialog  title="配送企业" :visible.sync="dialogTableVisible" width="80%">
      <div class="s-form">
        <el-form>
          <el-input v-model="queryDate.sendName" class="width-200" placeholder="配送企业"></el-input>
          <span class="date-group">
               <el-date-picker
                 size="small"
                 type="date"
                 format="yyyy-MM-dd"
                 value-format="yyyy-MM-dd"
                 placeholder="创建开始日期"
                 :editable="false"
                 v-model="queryDate.sendStartDate">
                </el-date-picker>
              至
              <el-date-picker
                size="small"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="创建结束日期"
                :editable="false"
                v-model="queryDate.sendEndDate">
                </el-date-picker>
           </span>

          <el-button @click="searchSend" size="small">查询</el-button>
          <el-button @click="clearSend" size="small">重置</el-button>
        </el-form>
        <div class="tableset">
          <el-table :data="sendData.list" stripe border tooltip-effect="dark" >
            <el-table-column prop="sendName" label="配送企业" show-overflow-tooltip></el-table-column>
            <el-table-column prop="requestNum" label="采购数量" align="right" header-align="left" width="100"></el-table-column>
            <el-table-column prop="requestPrice" label="采购金额" align="right" header-align="left" width="120"></el-table-column>
            <el-table-column prop="receiveNum" label="到货数量" align="right" header-align="left" width="100"></el-table-column>
            <el-table-column prop="receivePrice" label="到货金额" align="right" header-align="left" width="120"></el-table-column>
          </el-table>
        </div>
        <div class="pagebox">
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="sendSizeChange"
            @current-change="sendCurrentChange"
            :page-sizes="[10, 20, 30]"
            :total="sendData.total"
            :page-size="sendData.pageSize"
            :page-count="sendData.pages"
            :current-page.sync="sendData.pageNum">
          </el-pagination>
        </div>
      </div>
    </el-dialog>

    <el-dialog  title="查看产品" :visible.sync="dialogTableVisible_pro" width="80%">
      <div class="s-form">
        <el-form>
          <el-input v-model="queryDate.productName" placeholder="产品名称"></el-input>
          <span class="date-group">
               <el-date-picker
                 size="small"
                 type="date"
                 format="yyyy-MM-dd"
                 value-format="yyyy-MM-dd"
                 placeholder="创建开始日期"
                 :editable="false"
                 v-model="queryDate.proStartDate">
                </el-date-picker>
              至
              <el-date-picker
                size="small"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="创建结束日期"
                :editable="false"
                v-model="queryDate.proEndDate">
                </el-date-picker>
           </span>
          <el-button @click="searchProduct" size="small">查询</el-button>
          <el-button @click="clearProduct" size="small">重置</el-button>
        </el-form>
        <template>
          <el-table :data="productData.list" stripe border tooltip-effect="dark" >
            <el-table-column prop="productName" label="产品名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="tradeName" label="商用名" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="doseageFormName" label="剂型" width="90" show-overflow-tooltip></el-table-column>
            <el-table-column prop="spec" label="规格" width="100" show-overflow-tooltip ></el-table-column>
            <el-table-column prop="manufactureName" show-overflow-tooltip label="生产企业"></el-table-column>
            <el-table-column prop="basicMedicant" label="基药标记" width="90"></el-table-column>
            <el-table-column prop="requestNum" label="采购数量" align="right" header-align="left" width="80"></el-table-column>
            <el-table-column prop="requestPrice" label="采购金额" width="120" align="right" header-align="left" ></el-table-column>
            <el-table-column prop="receiveNum" label="到货数量" align="right" header-align="left" width="80"></el-table-column>
            <el-table-column prop="receivePrice" label="到货金额" width="120" align="right" header-align="left" ></el-table-column>
          </el-table>
          <div class="pagebox">
            <el-pagination
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="productSizeChange"
              @current-change="productCurrentChange"
              :page-sizes="[10, 20, 30]"
              :total="productData.total"
              :page-size="productData.pageSize"
              :page-count="productData.pages"
              :current-page.sync="productData.pageNum">
            </el-pagination>
          </div>
        </template>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  import {queryPurchase,queryDistributionByOrgId,queryProductByOrgId,queryCityArea } from "src/axios/supervise/supervise-transaction/supervision";
  import {priceFormat} from "src/utils/index"
  // 引入基本模板
  let echarts = require('echarts/lib/echarts');
  // 引入柱状图组件
  require('echarts/lib/chart/bar');
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  export default {
    name: 'purchaseInfo',
    data() {
      return {
        orgId : '',
        proOrgId : '',
        dialogTableVisible:false,
        dialogTableVisible_pro:false,
        purchasePrice:[],
        receivePrice:[],
        areaArr:{
          list: []
        },
        purchaseOrgName:[],
        natureArr:[
          {
            label:'',
            value:''
          },
          {
          label:'公立',
          value:'公立'
        },{
          label:'私立',
          value:'私立'
        }],
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
        chartForm: {
          pickTime: 'account'
        },
        purchaseDate:{
          pageNum: 1,
          pageSize: 20,
          total: 0,
          pages: 0,
          list: []
        },
        sendData:{
          pageNum: 1,
          pageSize: 20,
          total: 0,
          pages: 0,
          list: []
        },
        productData:{
          pageNum: 1,
          pageSize: 20,
          total: 0,
          pages: 0,
          list: []
        },
        queryDate:this.queryDates(),
        resData: this.metaData(),
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        }
      }
    },
    mounted() {
      this.queryPurchaseList();
      this.queryCityArea();
    },
    methods: {
      priceFormat,
      handleSizeChange(val) {
        this.purchaseDate.pageSize = val;
        this.queryPurchaseList();
      },
      handleCurrentChange(val) {
        this.purchaseDate.pageNum = val;
        this.queryPurchaseList();
      },
      sendSizeChange(val){
        this.sendData.pageSize = val;
        this.searchSend();
      },
      sendCurrentChange(val){
        this.sendData.pageNum = val;
        this.searchSend();
      },
      searchPurchase(){
        this.queryPurchaseList();
      },
      searchSend(){
        this.selectPs(this.orgId,'1');
      },
      clearSend(){
        console.log('清空配送查询条件');
        this.queryDate.sendStartDate='';
        this.queryDate.sendEndDate='';
        this.queryDate.sendName='';
        console.log('清空配送查询条件')
      },
      clearProduct(){
        this.queryDate.proStartDate='';
        this.queryDate.proEndDate='';
        this.queryDate.productName='';
      },
      //查看配送
      selectPs(id,index){
        this.queryDate.id=id;
        this.orgId=id;
        if(index=='0'){
          this.queryDate.sendStartDate=this.queryDate.startDate;
          this.queryDate.sendEndDate=this.queryDate.endDate;
        }
        queryDistributionByOrgId(this.sendData, this.queryDate).then(res => {
          this.sendData=res.data;
          0 === this.sendData.pageNum ? this.sendData.pageNum = 1 : null;
          this.dialogTableVisible=true;
        });

      },
      productSizeChange (val){
        this.productData.pageSize=val;
        this.searchProduct();
      },
      productCurrentChange(val){
        this.productData.pageNum=val;
        this.searchProduct();
      },
      searchProduct(){
        this.selectPro(this.proOrgId,'1');
      },
      //查看产品
      selectPro(id,index){
        this.queryDate.id=id;
        this.proOrgId=id;
        if(index=='0'){
          this.queryDate.proStartDate=this.queryDate.startDate;
          this.queryDate.proEndDate=this.queryDate.endDate;
        }
        queryProductByOrgId(this.productData, this.queryDate).then(res => {
          this.productData=res.data;
          0 === this.productData.pageNum ? this.productData.pageNum = 1 : null;
          this.dialogTableVisible_pro=true;
        });

      },
      updateAccount(){
        this.chartForm.pickTime='account';drawLine()
      },updateRoutine(){
        this.chartForm.pickTime='routine';drawLine()
      },
      updateTemporary(){
        this.chartForm.pickTime='temporary';drawLine()
      },
      queryDates(){
        return {
          id : '',
          name: '',
          sendName: '',
          productName:'',
          startDate: '',
          endDate: '',
          sendStartDate: '',
          sendEndDate: '',
          proStartDate: '',
          proEndDate: '',
          areaId: '',
          level: '',
          nature: ''
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
              data: this.purchaseOrgName,
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
              max: 10000,
              interval: 1000,
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
              name:'订购金额',
              type:'bar',
              data: this.purchasePrice,
              color: '#0D8AFF'
            },
            {
              name:'到货金额',
              type:'bar',
              data: this.receivePrice,
              color: '#7ACAFF'
            }
          ]
        });
      },
      queryCityArea(){
        queryCityArea(this.areaArr, this.queryDate).then(res => {
          this.areaArr;
          this.areaArr=res.data;
        })
      },
      queryPurchaseList(){
        this.purchasePrice=[];
        this.receivePrice=[];
        this.purchaseOrgName=[];
        queryPurchase(this.purchaseDate, this.queryDate).then(res => {
          this.purchaseDate=res.data;
          for(let i of this.purchaseDate.list){
            this.purchasePrice.push(i.requestPrice);
            this.receivePrice.push(i.receivePrice);
            this.purchaseOrgName.push(i.orgName);
          }
          0 === this.purchaseDate.pageNum ? this.purchaseDate.pageNum = 1 : null;
          this.drawLine();
        })
      }
    }
  }
</script>

<style>
  .layui-tab-title li {
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    transition: all .2s;
    -webkit-transition: all .2s;
    position: relative;
    line-height: 40px;
    min-width: 65px;
    padding: 0 15px;
    text-align: center;
    cursor: pointer;
    position: relative;
    bottom: -1px;
    margin-right: 4px;
    font-size: 16px;
    color: #fff;
    z-index: 1;
    min-width: 65px;
    padding: 0 15px;
    text-align: center;
    cursor: pointer;
    -webkit-transition: all .2s;

  }

</style>
