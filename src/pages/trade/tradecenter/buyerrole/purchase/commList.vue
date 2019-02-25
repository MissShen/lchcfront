<template>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
             <el-form-item class="width-150">
                <el-select v-model="query.purchaseState" @keyup.enter.native="searchEnterFun"  placeholder="状态" size="small">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="准备" value="0"></el-option>
                  <el-option label="送一审" value="1"></el-option>
                  <el-option label="发送" value="2"></el-option>
                  <el-option label="一审拒绝" value="3"></el-option>
                  <el-option label="完成" value="4"></el-option>
                  <el-option label="送二审" value="5"></el-option>
                  <el-option label="二审拒绝" value="6"></el-option>
                </el-select>
             </el-form-item>
            <el-form-item class="width-120">
              <el-input  v-model="query.bakProductName" @keyup.enter.native="searchEnterFun"   placeholder="产品名" size="small"></el-input>
            </el-form-item>
            <el-form-item class="width-120">
              <el-input  v-model="query.bakBuyerEasy"  @keyup.enter.native="searchEnterFun"  placeholder="医疗机构" size="small"></el-input>
            </el-form-item>
            <el-form-item class="width-120">
              <el-input  v-model="query.producerName" @keyup.enter.native="searchEnterFun"   placeholder="生产企业" size="small"></el-input>
            </el-form-item>
            <el-form-item class="width-120">
              <el-input  v-model="query.senderAbbr" @keyup.enter.native="searchEnterFun"  placeholder="配送企业" size="small"></el-input>
            </el-form-item>
            <el-form-item>
                   <el-date-picker type="date" placeholder="创建开始日期" format="yyyy-MM-dd" @keyup.enter.native="searchEnterFun"   value-format="yyyy-MM-dd" size="small" v-model="query.searchBenDate" ></el-date-picker>
                   &nbsp;至&nbsp;
                   <el-date-picker type="date" placeholder="创建结束日期" format="yyyy-MM-dd" @keyup.enter.native="searchEnterFun"   value-format="yyyy-MM-dd" size="small" v-model="query.searchEndDate"  ></el-date-picker>
               </el-form-item>
            <el-form-item>
                <el-button type="success" size="small" @click="searchEnterFun">查询</el-button>
                <el-button type="warning" size="small" @click="resetForm">重置</el-button>
               </el-form-item>
        </el-form>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          @sort-change="sortChang"
          stripe>
          <!--<el-table-column label="序号" header-align="left" align="center" type="index" width="50"></el-table-column>-->

          <el-table-column label="产品名" min-width="150" prop="opi.bak_product_name" sortable="custom">
            <template slot-scope="scope">
                <!--tootip提示气泡-->
                <!--:enterable="false" 鼠标不可进入tooltip中-->
                <el-tooltip placement="top" :enterable="false">
                  <!--气泡内容（必须放在slot="content"内）,布局与源内容保持一致-->
                  <div slot="content">
                    <div>{{ scope.row.bakProductName }}</div>
                    <div v-if="scope.row.bakTradeName != '无' && scope.row.bakTradeName !=null">{{ scope.row.bakMedicalMode }}({{ scope.row.bakTradeName }})</div>
                    <div v-if="scope.row.bakTradeName == '无' || scope.row.bakTradeName ==null">{{ scope.row.bakMedicalMode }}</div>
                  </div>

                  <!--源内容（必须放在class="el-tooltip-box"内）-->
                  <div class="el-tooltip-box">
                    <!--加class="text-inline"确保内容不折行-->
                    <div class="text-inline">{{ scope.row.bakProductName }}</div>
                    <div class="text-inline"  v-if="scope.row.bakTradeName != '无' && scope.row.bakTradeName !=null">{{ scope.row.bakMedicalMode }}({{ scope.row.bakTradeName }})</div>
                    <div class="text-inline"  v-if="scope.row.bakTradeName == '无' || scope.row.bakTradeName ==null">{{ scope.row.bakMedicalMode }}</div>
                  </div>
                </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="产品信息" min-width="150">
            <template slot-scope="scope">
              <el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  {{getSpecHints(scope.row.bakMedicalSpec , scope.row.bakStandRate,scope.row.useUnit,scope.row.metricName,scope.row.bakWrapName)}}<br/>
                  {{getPackHints(scope.row.bakFactoryEasy,scope.row.middleStandRate,scope.row.bigMiddleRate)}}
                </div>
                <div class="el-tooltip-box">
                  <div class="text-inline">
                    <span class="text-inline"  v-if="scope.row.bakWrapName != '空' && scope.row.bakWrapName != null">{{ scope.row.bakMedicalSpec}} × {{ scope.row.bakStandRate}} {{scope.row.useUnit}} / {{ scope.row.metricName}}&nbsp;&nbsp; {{ scope.row.bakWrapName}}</span>
                    <span class="text-inline"  v-if="scope.row.bakWrapName == '空' || scope.row.bakWrapName == null">{{ scope.row.bakMedicalSpec}} × {{ scope.row.bakStandRate}} {{scope.row.useUnit}} / {{ scope.row.metricName}}</span>
                  </div>
                  <div class="text-inline" >
                    {{ scope.row.bakFactoryEasy}}&nbsp;&nbsp; 中大包装: {{ scope.row.middleStandRate}}/{{ scope.row.bigMiddleRate}}
                  </div>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="医疗机构" width="90" prop="op.bak_buyer_easy" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.bakBuyerEasy }}</span>
          </template>
        </el-table-column>
          <el-table-column label="配送企业" width="100" prop="opi.BAK_SENDER_EASY" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.bakSenderEasy }}</span>
          </template>
        </el-table-column>
          <el-table-column label="单价（元）" width="100" header-align="left" align="right" prop="opi.unit_price" sortable="custom">
          <template slot-scope="scope">
            <span>{{ priceFormat(scope.row.unitPrice) }}</span>
          </template>
        </el-table-column>
          <el-table-column label="数量" width="80" header-align="left" align="right" prop="opi.request_qty" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.requestQty }}</span>
            </template>
          </el-table-column>
          <el-table-column label="计划金额（元）" width="100" header-align="left" align="right" prop="plan_price" sortable="custom">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.planPrice) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="医保标识" width="90" prop="bakProvinceInsuranceFlagName" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.bakProvinceInsuranceFlagName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="地址" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.addressAbbr}}</span>
            </template>
          </el-table-column>
          <el-table-column label="可采购" width="80" prop="rightOrWrong" sortable="custom">
            <template slot-scope="scope">
              <span v-if="scope.row.rightOrWrong">√</span>
              <span v-else>x</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="80" prop="op.purchase_state" sortable="custom" align="center">
            <template slot-scope="scope">
              <span>{{getState(scope.row.purchaseState)}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 表格分页 -->
      <div class="pagebox">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30]"
          :total="resData.total"
          :page-size="resData.pageSize"
          :page-count="resData.pages"
          :pager-count="5"
          :current-page.sync="resData.pageNum">
        </el-pagination>
      </div>
      <div class="foot-btn">
        <div class="foot-left">
          <el-button type="success" size="small" @click="exportExcel">生成Excel</el-button>
        </div>
      </div>
    </div>
    <!-- ========================== 主内容end ========================= -->

</template>
<script>

  // 引入用户相关请求
  import {purchaseItemAllList,exportCommEXL} from 'src/axios/trade/purchase/purchase'
  import fileUpload from 'js-file-download'
  import {priceFormat,keyBoardEnter} from "src/utils";
  import {getSpecHints,getPackHints} from "src/utils/validateUtil";


  export default {
    data () {
      return {
        resData: this.metaData(),
        currentOrder:undefined,
        query: this.metaQuery(), // 查询初始化
      }
    },
    created () {
      this.list()
    },
    methods: {
      getSpecHints,
      getPackHints,
      priceFormat,
      getDrugStorage(spec,middleStandRate,bigMiddleRate){
        let _spec = spec || '';
        let _middleStandRate = middleStandRate || '';
        let _bigMiddleRate = bigMiddleRate || '';
        return _spec+'\n中大包装:' +_middleStandRate+'/'+_bigMiddleRate
      },
      getState(state){
        var arrState = ['准备', '送一审', '发送', '一审拒绝','完成','送二审','二审拒绝'];
        return arrState[state];
      },
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {// 前后台交互数据封装格式
          orderBy:undefined,
          pageNum: 1,
          pageSize: 10,
          size: 10,
          startRow: 0,
          endRow: 0,
          total: 0,
          pages: 0,
          prePage: 0,
          nextPage: 0,
          isFirstPage: false,
          isLastPage: true,
          hasPreviousPage: false,
          hasNextPage: false,
          navigatePages: 8,
          navigatepageNums: [],
          navigateFirstPage: 0,
          navigateLastPage: 0,
          firstPage: 0,
          lastPage: 0,
          list: []
        }
      },
      resetForm () {
        this.query=this.metaQuery();
        this.list();
      },
      metaQuery () { // 表单查询数据初始化
        return {

          purchaseState: '',
          bakProductName: '',
          bakBuyerEasy: '',
          producerName: '',
          senderAbbr: '',
          searchBenDate: this.getLocalYear(),
          searchEndDate: this.getLocalTime()

        }
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy=this.currentOrder;
        purchaseItemAllList(this.resData, this.query).then(res => {
          this.resData = res.data;
          if(this.resData.pageNum === 0 ){
            this.resData.pageNum = 1
          }
        })
      },
      exportExcel(){
        if(this.query.searchBenDate == undefined || this.query.searchBenDate == ''||this.query.searchEndDate == undefined || this.query.searchEndDate == null ){
          this.$message({
            type: 'error',
            message: '请选择创建的开始日期及创建的结束日期'
          });
          return false;
        }else {
          exportCommEXL(this.query).then(res => {
            let headers = res.headers;
            let title = ""
            if (!title) {
              const fileName = headers['content-disposition'];
              title = fileName.includes('filename=') ? decodeURI(fileName.split('=')[1]) : '下载的文件';
            }
            fileUpload(res.data, title, "application/vnd.ms-excel")
          })
        }
      },
      sortChang(value){
        let sortType=" desc"
        if(value.order.startsWith("asc")){
          sortType=" asc";
        }
        this.currentOrder=value.prop + sortType;
        this.list()
      },

      getLocalTime (){
        let date = new Date();
        let YY = date.getFullYear();
        let MM = (date.getMonth()+1 < 10 ? '0'+ (date.getMonth()+1) : date.getMonth()+1);
        let DD = date.getDate()+1 < 10 ? '0'+ date.getDate() : date.getDate();
        let hh = date.getHours() < 10 ? '0'+ date.getHours() : date.getHours();
        let mm = date.getMinutes() < 10 ? '0'+ date.getMinutes() : date.getMinutes();
        let ss = date.getSeconds() < 10 ? '0'+ date.getSeconds() : date.getSeconds();
        return YY + '-' + MM + '-' + DD + ' ' + hh + ':' + mm + ':' + ss;

      },
      getLocalYear (){
        let date = new Date();
        let YY = date.getFullYear();
        let MM = date.getMonth()+1;
        let DD = '01';
        let hh = '00';
        let mm = '00';
        let ss = '00';
        return YY + '-' + MM + '-' + DD + ' ' + hh + ':' + mm + ':' + ss;

      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      },
    }
  }
</script>
