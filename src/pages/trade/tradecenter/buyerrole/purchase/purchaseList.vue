<template>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query"  label-position="right" size="small" class="table-form" :inline="true">
            <el-form-item class="width-120">
              <el-select v-model="query.searchPurchaseState"  @keyup.enter.native="searchEnterFun"  placeholder="采购单状态" size="small">
                <!--<el-option label="未选择" value=""></el-option>-->
                <el-option label="准备" value="0"></el-option>
                <el-option label="送一审" value="1" ></el-option>
                <el-option label="发送" value="2"></el-option>
                <el-option label="一审拒绝" value="3" ></el-option>
                <el-option label="完成" value="4"></el-option>
                <el-option label="送二审" value="5"></el-option>
                <el-option label="二审拒绝" value="6"></el-option>
                <el-option label="购物车状态" value="7"></el-option>
                <el-option label="撤回" value="8"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="width-120">
              <el-input v-model="query.searchPurchaseCode"  @keyup.enter.native="searchEnterFun"  placeholder="采购单编号" size="small"></el-input>
            </el-form-item>
            <el-form-item class="width-120">
              <el-input v-model="query.searchBakBuyerEasy"  @keyup.enter.native="searchEnterFun"  placeholder="医疗机构" size="small"></el-input>
            </el-form-item>
            <el-form-item class="width-120">
              <el-input v-model="query.searchApproveOrgEasy"  @keyup.enter.native="searchEnterFun"  placeholder="审批机构" size="small"></el-input>
            </el-form-item>
            <el-form-item class="width-120">
              <el-select v-model="query.searchDateType" placeholder="创建日期" size="small">
                <el-option
                  v-for="item in query.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          <el-form-item>
              <el-date-picker type="date" placeholder="开始日期" v-model="query.searchBenDate"
                              format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"></el-date-picker>
              &nbsp;至&nbsp;
              <el-date-picker type="date" placeholder="结束日期" v-model="query.searchEndDate"
                              format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"></el-date-picker>
          </el-form-item>

          <el-form-item>
            <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
            <el-button type="warning" @click="restQuery()" size="small">重置</el-button>
            <el-button type="warning" @click="exportExcel()" size="small">导出Excel</el-button>
          </el-form-item>

        </el-form>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe
          @sort-change="sortChang"
        >
          <!--<el-table-column type="index" label="序号" width="50"></el-table-column>-->
          <el-table-column label="采购单编号" prop="op.purchase_code" sortable="custom" width="80" >
            <template slot-scope="scope">
              <el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  {{scope.row.purchaseCode}}<br/>
                </div>
                <div class="el-tooltip-box">
                  <div class="text-inline">
                    {{ scope.row.purchaseCode}}
                  </div>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="医疗机构" prop="op.bak_buyer_easy" sortable="custom" >
            <template slot-scope="scope">
              <span>{{ scope.row.bakBuyerEasy }}</span>
            </template>
          </el-table-column>
          <el-table-column label="审批机构" prop="APPROVE_ORG_NAME" sortable="custom" min-width="100" >
            <template slot-scope="scope">
              <span>{{ scope.row.approveOrgName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" prop="op.create_date" sortable="custom"  align="center" >
            <template slot-scope="scope">
              <el-tooltip :enterable="false" class="item" effect="dark" placement="top">
                <div slot="content">{{ scope.row.createDate }}</div>
                <span v-if="scope.row.createDate!=null && scope.row.createDate!=''">{{ moment(scope.row.createDate).format("YYYY-MM-DD") }}</span>
                <span v-else></span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="发送时间" prop="op.approve_date" sortable="custom" align="center" >
            <template slot-scope="scope">
              <el-tooltip :enterable="false" class="item" effect="dark" placement="top">
                <div slot="content">{{ scope.row.approveDate }}</div>
                <span v-if="scope.row.approveDate!=null && scope.row.approveDate!=''">{{ moment(scope.row.approveDate).format("YYYY-MM-DD") }}</span>
                <span v-else></span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="一审时间" prop="op.approve_date" sortable="custom" align="center">
            <template slot-scope="scope">
              <el-tooltip :enterable="false" class="item" effect="dark" placement="top">
                <div slot="content">{{ scope.row.approveDate }}</div>
                <span v-if="scope.row.approveDate!=null && scope.row.approveDate!=''">{{ moment(scope.row.approveDate).format("YYYY-MM-DD") }}</span>
                <span v-else></span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="二审时间" prop="op.approve_date_second" sortable="custom" align="center" >
            <template slot-scope="scope">
              <el-tooltip :enterable="false" class="item" effect="dark" placement="top">
                <div slot="content">{{ scope.row.approveDateSecond }}</div>
                <span v-if="scope.row.approveDateSecond!=null && scope.row.approveDateSecond!=''">{{ moment(scope.row.approveDateSecond).format("YYYY-MM-DD") }}</span>
                <span v-else></span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="采购总金额（元）" align="right" prop="op.request_total" sortable="custom" width="110" >
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.requestTotal) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="到货总金额（元）"  align="right" prop="op2.receive_total" sortable="custom" width="110">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.receiveTotal) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="采购单状态" align="center">
            <template slot-scope="scope">
              <span>{{getFlag(scope.row.purchaseState) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <div class="operates">
                <a class="green" type="text" size="small" @click="showInfo(scope.row.purchaseId)">详情</a>

                <a class="green" size="small" @click="orderPurchase(scope.row.purchaseId)"
                           v-if="scope.row.purchaseState=='2' || scope.row.purchaseState=='4'" >
                  订单
                </a>

                <a class="green" type="text" size="small" @click="exportShowInfoExcel(scope.row.purchaseId)">生成excel</a>

                <a class="green" type="text" size="small" @click="showApprovall(scope.row.purchaseId)"
                      v-if="(scope.row.approveDate !=null )" >
                审计
              </a>
              </div>
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
          :current-page.sync="resData.pageNum">
        </el-pagination>
      </div>
      <!-- ========================== 主内容end ========================= -->
      <el-dialog title="审计" :visible.sync="approvalTable" width="40%">
        <el-table  :data="resDataer.list">
          <el-table-column label="审核人">
            <template slot-scope="scope">
              <el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  {{scope.row.userName}}<br/>
                </div>
                <div class="el-tooltip-box">
                  <div class="text-inline">
                    {{ scope.row.userName}}
                  </div>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="审核时间">
            <template slot-scope="scope">
              <span>{{ scope.row.approvalDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="审核结果">
            <template slot-scope="scope">
              <span>{{ getApprovFlag(scope.row.state) }}</span>
            </template>
          </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="approvalTable = false">关 闭</el-button>
        </div>
      </el-dialog>
    </div>

</template>

<script>
  // 引入用户相关请求
  import {checkRolePurchaselist,exportShowInfoEXL,getApprovalAll,exportPurchaseListEXL} from 'src/axios/trade/purchase/purchase';
  import {priceFormat,keyBoardEnter} from "src/utils";
  import fileUpload from 'js-file-download'
  import moment from "moment";

  export default {
    name:'based-city-snder-list',
    data () {
      return {
        approvalTable:false,
        currentOrder: undefined,
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        resDataer: this.metaDataer(),
        approvalData:this.metaApprovalData(),
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        }
      }
    },
    created () {
      this.list()
    },
    methods: {
      moment,
      priceFormat,
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {
          // 前后台交互数据封装格式
          orderBy: undefined,
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
      },metaDataer () {
        return {
          // 前后台交互数据封装格式
          orderBy: undefined,
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
      metaApprovalData(){
        return{
          showApprovall:[]
        }
      },
      metaQuery () { // 表单查询数据初始化
        return {

            id: undefined,
            orgAllName: undefined,
            searchAllproductName: undefined,
            senderOrgName:undefined,
            searchBenDate:undefined,
            searchEndDate:undefined,
          searchPurchaseState: undefined,
          searchPurchaseCode:undefined,
          searchBakBuyerEasy:undefined,
          searchApproveOrgEasy:undefined,
          searchDateType:undefined,
          options: [{
            value: 'CREATE_DATE',
            label: '创建日期'
          },{
            value: 'APPROVE_DATE',
            label: '发送日期'
          }],
          searchDateType: 'CREATE_DATE'

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
        checkRolePurchaselist(this.resData, this.query).then(res => {
          this.resData = res.data
          if(this.resData.pageNum === 0){
            this.resData.pageNum = 1
          }
        })
      },

      /**审计*/
      showApprovall(purchaseId){
        this.approvalTable = true
        getApprovalAll(this.resDataer, this.query,purchaseId).then(res => {
          this.resDataer = res.data
        })
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
      getFlag(flag){
        var arrFlag = ['准备','送一审','发送','一审拒绝','完成','送二审','二审拒绝','购物车','采购计划'];
        return arrFlag[flag];
      },
      getApprovFlag(flag){
        var arrFlag = ['通过','拒绝'];
        return arrFlag[flag];
      },
      showInfo(purchaseId){
        this.$router.push("/trade/manage/firstInstanceRole/queryItemInfo/" + purchaseId)
      },
      //--------------------------------------------导出详情Excel------------------------------------
      exportShowInfoExcel(purchaseId) {
        exportShowInfoEXL(this.resData,this.query,purchaseId).then(res => {
          let headersInfo = res.headers;
          let titleInfo = ""
          if (!titleInfo) {
            const fileName = headersInfo['content-disposition'];
            titleInfo = fileName.includes('filename=') ? decodeURI(fileName.split('=')[1]) : '下载的文件';
          }
          fileUpload(res.data,titleInfo,"application/vnd.ms-excel")
        })
      },
      // ----------------------------------------------结束--------------------------------------------------
      restQuery() {
        this.query = this.metaQuery();
        this.list();
      },
      /**订单详情*/
      orderPurchase(purchaseId){
        this.$router.push("/trade/manage/purchaseListInfo/" + purchaseId );
      },
      sortChang(value){
        let sortType=" desc"
        if(value.order.startsWith("asc")){
          sortType=" asc";
        }
        this.currentOrder=value.prop + sortType;
        this.list()
      },
//--------------------------------------------导出详情Excel------------------------------------
      exportExcel() {
        exportPurchaseListEXL(this.resData,this.query).then(res => {
          let headersInfo = res.headers;
          let titleInfo = ""
          if (!titleInfo) {
            const fileName = headersInfo['content-disposition'];
            titleInfo = fileName.includes('filename=') ? decodeURI(fileName.split('=')[1]) : '下载的文件';
          }
          //"application/vnd.ms-excel" 控制下载的文件格式
          fileUpload(res.data,titleInfo,"application/vnd.ms-excel")
        })
      },
// ----------------------------------------------结束--------------------------------------------------

    }
  }
</script>

