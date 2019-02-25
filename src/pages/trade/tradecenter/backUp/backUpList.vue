<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" class="table-form" :inline="true">
            <el-form-item v-if="roleCode==='supervise_bj'" class="width-120">
              <el-select v-model="query.searchStatus" placeholder="备案状态" @keyup.enter.native="searchEnterFun"  size="small">
                <el-option label="未提交" value="0"></el-option>
                <el-option label="已提交" value="5"></el-option>
                <el-option label="审核通过" value="2"></el-option>
                <el-option label="审核拒绝" value="6"></el-option>
                <el-option label="终核通过" value="4"></el-option>
                <el-option label="作废提交" value="10"></el-option>
                <el-option label="同意作废" value="11"></el-option>
                <el-option label="拒绝作废" value="12"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item  v-if="roleCode==='manage'" class="width-120">
              <el-select @keyup.enter.native="searchEnterFun"  v-model="query.searchStatus" placeholder="备案状态" size="small">
                <el-option label="未提交" value="0"></el-option>
                <el-option label="已提交" value="1"></el-option>
                <el-option label="审核通过" value="2"></el-option>
                <el-option label="审核拒绝" value="3"></el-option>
                <el-option label="终核通过" value="4"></el-option>
                <el-option label="作废提交" value="10"></el-option>
                <el-option label="同意作废" value="11"></el-option>
                <el-option label="拒绝作废" value="12"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="width-120">
              <el-input v-model="query.backupCode" @keyup.enter.native="searchEnterFun"  placeholder="备案编码" size="small"></el-input>
            </el-form-item>
            <el-form-item class="width-120">
              <el-input v-model="query.nameChn" @keyup.enter.native="searchEnterFun"  placeholder="品名" size="small"></el-input>
            </el-form-item>
            <el-form-item class="width-120">
              <el-input v-model="query.wrapName" @keyup.enter.native="searchEnterFun"  placeholder="生产企业" size="small"></el-input>
            </el-form-item>
            <el-form-item>
              <el-date-picker type="date" @keyup.enter.native="searchEnterFun" placeholder="提交日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small" v-model="query.searchBenDate"></el-date-picker>
              &nbsp;至&nbsp;
              <el-date-picker type="date" @keyup.enter.native="searchEnterFun" placeholder="提交日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"  v-model="query.searchEndDate"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
                <el-button type="warning" size="small" @click="resetQuery()">重置</el-button>
            </el-form-item>
        </el-form>
      <!-- 表格列表 -->
      <div class="tableset">
          <el-table
            :data="resData.list"
            border
            @sort-change="sortChang"
            stripe>
            <!--<el-table-column type="index" width="50" label="序号" header-align="left" align="center"></el-table-column>-->
            <el-table-column label="备案编码"  prop="backupCode" sortable="custom" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.backupCode }}</span>
              </template>
            </el-table-column>
            <el-table-column label="产品名" prop="ooi.BAK_PRODUCT_NAME" sortable="custom" >
              <template slot-scope="scope" class="drugMessage">
                <ul class="ico-zt">
                  <div>
                    <li class="text-inlie" :title="scope.row.nameChn" >{{ scope.row.nameChn }}</li>
                  </div>
                  <div>
                    <span class="text-inline" :title="scope.row.modeName+' ('+scope.row.tradeName+')'"  v-if="scope.row.tradeName != '无' && scope.row.tradeName !=null">{{ scope.row.modeName }}({{ scope.row.tradeName }})</span>
                    <span class="text-inline" :title="scope.row.modeName"  v-if="scope.row.tradeName == '无' || scope.row.tradeName ==null">{{ scope.row.modeName }}</span>
                  </div>
                </ul>
              </template>
            </el-table-column>
            <el-table-column  label="产品信息" prop="ooi.BAK_MEDICAL_SPEC" sortable="custom">
              <template slot-scope="scope">
                <div class="pro-details ellipsis es300 "
                :title="getHints(scope.row.spec,scope.row.wrapName)"
                >
                  {{ scope.row.spec}}  &nbsp;&nbsp;<span v-if="scope.row.wrapName != '空' && scope.row.wrapName != null">{{ scope.row.wrapName}}</span>
                </div>
                <div :title="scope.row.manufactureName" class="pro-details ellipsis es200">{{ scope.row.manufactureName}}</div>
              </template>
            </el-table-column>

            <el-table-column label="转化比" prop="STAND_RATE" sortable="custom" width="100" align="right">
              <template slot-scope="scope">
                <span>{{ scope.row.standRate }}</span>
              </template>
            </el-table-column>
            <el-table-column label="采购数量" prop="PURCHASE_NUM" sortable="custom" width="110" align="right">
              <template slot-scope="scope">
                <span>{{ scope.row.purchaseNum }}</span>
              </template>
            </el-table-column>
            <el-table-column label="登记机构" prop="BACKUP_ORG" sortable="custom" show-overflow-tooltip>
              <template slot-scope="scope">
                {{ scope.row.backupOrg }}
              </template>
            </el-table-column>
            <el-table-column label="提交时间" prop="a.submit_date" sortable="custom">
              <template slot-scope="scope">
                <span>{{ scope.row.submitDate }}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" prop="backupName" sortable="custom">
              <template slot-scope="scope" >
                <span v-if="scope.row.delFlag!=0">{{ scope.row.delName }}</span>
                <span v-else>{{ scope.row.backupName }}</span>
              </template>
            </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span><a @click="showDetails(scope.row.recordId)"  class="operation-btn" title="详情">详情</a></span>
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
      <div class="foot-btn">
        <div class="foot-left">
          <el-button type="warning" size="small" @click="exportExcel">生成excel表</el-button>
        </div>
      </div>
    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求
  import {queryAlreadyBackupList,exportEXL,getRoleCode} from 'src/axios/trade/backup/hospitalList'
  import fileUpload from 'js-file-download'
  import {priceFormat,keyBoardEnter} from "src/utils";

  export default {
    name:'based-city-snder-list',
    data () {
      return {
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        roleCode:'',
        currentOrder:undefined,
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
      this.getRoleCode()
      this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {
          // 前后台交互数据封装格式
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
            orderBy:undefined,
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
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
      },
      metaQuery () { // 表单查询数据初始化
        return {
            backupCode:undefined,
            searchStatus:undefined,
            wrapName:undefined,
            nameChn:undefined,
            searchBenDate:undefined,
            searchEndDate:undefined

        }
      },
      sortChang(value){
        let sortType=" desc";
        if(value.order.startsWith("asc")){
          sortType=" asc";
        }
        this.currentOrder=value.prop + sortType;
        this.list()
      },
      getRoleCode(){
        getRoleCode().then(res => {
          this.roleCode = res.data
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
          exportEXL(this.query).then(res => {
            let headers = res.headers;
            let title = "";
            if (!title) {
              const fileName = headers['content-disposition'];
              title = fileName.includes('filename=') ? decodeURI(fileName.split('=')[1]) : '下载的文件';
            }
            fileUpload(res.data, title, "application/vnd.ms-excel")
          })
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy=this.currentOrder;
        queryAlreadyBackupList(this.resData, this.query).then(res => {
          this.resData = res.data;
          if(this.resData.pageNum===0){
            this.resData.pageNum=1
          }
        })
      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val;
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val;
        this.list()
      },
      showDetails(recordId){
        this.$router.push("/trade/manage/govViewList/"+recordId)
      },
      resetQuery() {
        this.query = this.metaQuery();
        this.list()
      },
      getHints(spec,wrapName){
        let _spec = spec || '';
        let _wrapName = wrapName || '';
        return _spec +_wrapName
      },

    }
  }
</script>

