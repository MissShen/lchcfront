<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
            <el-form-item>
              <el-date-picker type="date" placeholder="到货开始日期"  @keyup.enter.native="searchEnterFun"  v-model="query.searchBenDate"
                              format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"></el-date-picker>
              &nbsp;至&nbsp;
              <el-date-picker type="date" placeholder="到货结束日期"  @keyup.enter.native="searchEnterFun"  v-model="query.searchEndDate"
                              format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
              <el-button type="warning" @click="restQuery()" size="small">重置</el-button>
            </el-form-item>
        </el-form>
      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
                :data="resData.list"
                border
                @sort-change="sortChang"
                stripe>
          <!--<el-table-column type="index" width="50" header-align="left" align="center" label="序号"></el-table-column>-->
          <el-table-column label="采购单号" prop="oo.order_code" sortable="custom" width="90">
            <template slot-scope="scope">
              <el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  {{scope.row.purchaseCode}}<br/>
                </div>
                <div class="el-tooltip-box">
                  {{ scope.row.purchaseCode}}
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="产品名" prop="ooi.bak_product_name" sortable="custom">
            <template slot-scope="scope">
              <ul>
                <li>
                  <!--tootip提示气泡-->
                  <!--:enterable="false" 鼠标不可进入tooltip中-->
                  <el-tooltip placement="top" :enterable="false">
                    <!--气泡内容（必须放在slot="content"内）,布局与源内容保持一致-->
                    <div slot="content">
                      <div>{{ scope.row.bakProductName }}</div>
                      <div class="text-inline">{{ scope.row.bakMedicalMode }}
                        <span v-if="scope.row.bakTradeName != '无' && scope.row.bakTradeName !=null">({{ scope.row.bakTradeName }})</span>
                      </div>
                    </div>

                    <!--源内容（必须放在class="el-tooltip-box"内）-->
                    <div class="el-tooltip-box">
                      <!--加class="text-inline"确保内容不折行-->
                      <div class="text-inline">{{ scope.row.bakProductName }}</div>
                      <div class="text-inline">{{ scope.row.bakMedicalMode }}
                        <span v-if="scope.row.bakTradeName != '无' && scope.row.bakTradeName !=null">({{ scope.row.bakTradeName }})</span>
                      </div>
                    </div>
                  </el-tooltip>
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column label="产品信息">
            <template slot-scope="scope">

              <el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  {{getHints(scope.row.bakMedicalSpecSpell,scope.row.bakWrapName)}}<br/>
                  {{getPackHints(scope.row.bakFactoryName,scope.row.middleStandRate,scope.row.bigMiddleRate)}}
                </div>
                <div class="el-tooltip-box">
                  <div class="text-inline">
                    {{ scope.row.bakMedicalSpecSpell }} &nbsp;&nbsp;
                    <span v-if="scope.row.bakWrapName != '空' && scope.row.bakWrapName != null">{{ scope.row.bakWrapName}}</span>
                  </div>
                  <div class="text-inline" >
                    {{ scope.row.bakFactoryName}}  &nbsp;&nbsp; 中大包装:{{ scope.row.middleStandRate}}/{{ scope.row.bigMiddleRate}}
                  </div>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="单价（元）" width="100" align="right" prop="ooi.unit_price" sortable="custom">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.unitPrice) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="到货量" width="80" align="right" prop="oor.receive_qty" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.receiveQty }}</span>
            </template>
          </el-table-column>
          <el-table-column label="到货时间" width="120" prop="oor.receive_date" sortable="custom" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.receiveDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="批号" prop="oor.lot_no" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.lotNo }}</span>
            </template>
          </el-table-column>
          <el-table-column label="有效期" width="120" align="center" prop="oor.medical_expired_date" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.medicalExpiredDate }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="foot-btn">
        <div class="foot-left">
          <el-button type="warning" size="small" @click="handleExportDetailText()">
            导出txt
          </el-button>
          <el-button type="warning" size="small" @click="handleExportDetailExcel()">
            导出excel
          </el-button>
          <el-button type="" size="small" @click="handleBack()">
            返回
          </el-button>
        </div>
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
                :current-page.sync="resData.pageNum">
        </el-pagination>
      </div>

    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求
  import {selectParameterSettingList} from 'src/axios/trade/audit/auditConfig'
  import {queryRecDetailList,exportDetailText,exportDetailExcel}from 'src/axios/trade/buyerrole/arrive/buyerTabView/orderList'
  import fileUpload from 'js-file-download'
  import {priceFormat,keyBoardEnter} from "src/utils";
  import {getSpecHints,getPackHints} from "src/utils/validateUtil";
  export default {
    data () {
      return {
        activeName: 'first',  // 当前标签
        buyerOrgId: undefined,
        currentOrder:undefined,
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
       // value2:''
      }
    },
    created () {
      this.buyerOrgId = this.$route.params.buyerOrgId;
      this.list();
    },
    methods: {
      getSpecHints,
      getPackHints,
      priceFormat,
      handleBack() {
        this.$router.go(-1)
      },
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        // 前后台交互数据封装格式
        return {
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
      metaQuery () { // 表单查询数据初始化
        return {
            id: undefined,
            buyerOrgId: undefined,
            searchBenDate: undefined,
            searchEndDate: undefined,
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      handleBack(){
        this.$router.go(-1);
      },
      //  获取用户分页列表
      list () {
        this.resData.orderBy=this.currentOrder;
        queryRecDetailList(this.resData, this.query,this.buyerOrgId).then(res => {
          this.resData = res.data
          if(this.resData.pageNum===0){
            this.resData.pageNum=1
          }
        })
      },
      sortChang(value){
        let sortType=" desc"
        if(value.order.startsWith("asc")){
          sortType=" asc";
        }
        this.currentOrder=value.prop + sortType;
        this.list()
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
      },
      handleExportDetailText(){
        exportDetailText(this.query,this.buyerOrgId).then(res =>{
          let headers = res.headers;
          let title = ""
          if (!title) {
            const fileName = headers['content-disposition'];
            title = fileName.includes('filename=') ? decodeURI(fileName.split('=')[1]) : '下载的文件';
          }
          fileUpload(res.data,title,"text/plain")
        });
      },
      handleExportDetailExcel(){
        if(this.query.searchBenDate == undefined || this.query.searchBenDate == ''||this.query.searchEndDate == undefined || this.query.searchEndDate == null ){
          this.$message({
            type: 'error',
            message: '请选择创建的开始日期及创建的结束日期'
          });
          return false;
        }else {
          exportDetailExcel(this.query, this.buyerOrgId).then(res => {
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
      restQuery(){
        this.query=this.metaQuery()
        this.list();
      },
      showInfo(buyerOrgId){
        this.$router.push("/trade/manage/buyerrole/exportDetailList/" + buyerOrgId)
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

      getHints(bakMedicalSpecSpell,bakWrapName){
        let _bakMedicalSpecSpell = bakMedicalSpecSpell || '';
        let _bakWrapName = bakWrapName || '';
        return _bakMedicalSpecSpell +_bakWrapName
      },

    }
  }
</script>

