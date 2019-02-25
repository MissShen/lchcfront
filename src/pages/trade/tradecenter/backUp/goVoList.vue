<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
          <el-form-item class="width-120">
                <el-select v-model="query.searchStatus" @keyup.enter.native="searchEnterFun" placeholder="备案状态" size="small">
                  <el-option label="审核通过" value="2"></el-option>
                  <el-option label="审核拒绝" value="6"></el-option>
                  <el-option label="同意作废" value="11"></el-option>
                  <el-option label="拒绝作废" value="12"></el-option>
                </el-select>
             </el-form-item>
          <el-form-item class="width-120">
            <el-input v-model="query.backupCode" @keyup.enter.native="searchEnterFun"  size="small" placeholder="备案编码"></el-input>
          </el-form-item>
          <el-form-item class="width-120">
            <el-input v-model="query.nameChn" @keyup.enter.native="searchEnterFun"  size="small" placeholder="品名"></el-input>
          </el-form-item>
          <el-form-item class="width-120">
            <el-input v-model="query.backupOrg" @keyup.enter.native="searchEnterFun"  size="small" placeholder="登记机构"></el-input>
          </el-form-item>
          <el-form-item class="width-120">
            <el-input v-model="query.wrapName" @keyup.enter.native="searchEnterFun"  size="small" placeholder="生产企业"></el-input>
          </el-form-item>
          <el-form-item>
              <el-date-picker class="width-120" type="date" @keyup.enter.native="searchEnterFun"  placeholder="提交日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small" v-model="query.searchBenDate"></el-date-picker>
                &nbsp;至&nbsp;
               <el-date-picker class="width-120" type="date" @keyup.enter.native="searchEnterFun"  placeholder="提交日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"  v-model="query.searchEndDate"></el-date-picker>
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
          <!--<el-table-column type="index" width="50" header-align="left" align="center" label="序号"></el-table-column>-->
          <el-table-column label="备案编码" width="80" prop="backupCode" sortable="custom">
            <template slot-scope="scope">
              <el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  {{scope.row.backupCode}}
                </div>
                <div class="el-tooltip-box">
                  {{ scope.row.backupCode}}
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="产品名"  prop="NAME_CHN" sortable="custom" min-width="180">
            <template slot-scope="scope">
                <!--tootip提示气泡-->
                <!--:enterable="false" 鼠标不可进入tooltip中-->
                <el-tooltip placement="top" :enterable="false">
                  <!--气泡内容（必须放在slot="content"内）,布局与源内容保持一致-->
                  <div slot="content">
                    <div>{{ scope.row.nameChn }}</div>
                    <div>{{ scope.row.modeName }}
                      <span v-if="scope.row.tradeName != '无' && scope.row.tradeName !=null">({{ scope.row.tradeName }})</span>
                    </div>
                  </div>

                  <!--源内容（必须放在class="el-tooltip-box"内）-->
                  <div class="el-tooltip-box">
                    <!--加class="text-inline"确保内容不折行-->
                    <div class="text-inline">{{ scope.row.nameChn }}</div>
                    <div class="text-inline">{{ scope.row.modeName }}
                      <span v-if="scope.row.tradeName != '无' && scope.row.tradeName !=null">({{ scope.row.tradeName }})</span>
                    </div>
                  </div>
                </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="产品信息" prop="SPEC" sortable="custom" min-width="180">
            <template slot-scope="scope">
              <el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  {{getHints(scope.row.spec,scope.row.wrapName)}}<br/>
                  {{ scope.row.manufactureName}}
                </div>
                <div class="el-tooltip-box">
                  <div class="text-inline">
                    {{ scope.row.spec }} &nbsp;&nbsp;
                    <span v-if="scope.row.wrapName != '空' && scope.row.wrapName != null">{{ scope.row.wrapName}}</span>
                  </div>
                  <div class="text-inline" >
                    {{ scope.row.manufactureName}}
                  </div>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
         <el-table-column label="转化比" prop="STAND_RATE" sortable="custom" width="80" align="right">
            <template slot-scope="scope">
              <span>{{ scope.row.standRate }}</span>
            </template>
          </el-table-column>
          <!--    <el-table-column label="生产企业"  prop="MANUFACTURE_NAME" sortable="custom" show-overflow-tooltip>
               <template slot-scope="scope">
                 {{ scope.row.manufactureName }}
               </template>
             </el-table-column>-->

          <el-table-column label="采购数量"  prop="PERMIT_NUMBER" sortable="custom" width="90" align="right">
            <template slot-scope="scope">
              <span>{{ scope.row.purchaseNum }}</span>
            </template>
          </el-table-column>
          <el-table-column label="登记机构" prop="BACKUP_ORG" sortable="custom" width="150">
            <template slot-scope="scope">
              <el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  {{scope.row.backupOrg}}<br/>
                </div>
                <div class="el-tooltip-box">
                  <div class="text-inline">
                    {{ scope.row.backupOrg}}
                  </div>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="提交时间"  prop="a.submit_date" sortable="custom" width="120" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.submitDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" prop="backupName" sortable="custom" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.delFlag!=0">{{ scope.row.delName }}</span>
              <span v-else>{{ scope.row.backupName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <div class="operates">
                <a @click="handleBackup(scope.row.recordId,'备案详情')" class="green"  title="详情">详情</a>
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

    </div>
    <div class="foot-btn">
      <div class="foot-left">
        <el-button type="warning" size="small" @click="exportExcel()">
          生成excel表
        </el-button>
      </div>
    </div>
    <!-- ========================== 主内容end ========================= -->
    <backup-handle v-if="backupHandle === true" ref="backupHandle" @refreshData="list"></backup-handle>
  </div>

</template>
<script>

  // 引入用户相关请求
  import {queryAllAlreadyBackupList,exportQueryAllAlreadyBackupList} from 'src/axios/trade/backup/hospitalList'
  import {priceFormat,keyBoardEnter} from "src/utils";
  import fileUpload from 'js-file-download'
  import backupHandle from 'src/pages/trade/tradecenter/backUp/backupHandle'

  export default {
    name:'based-city-snder-list',
    components: {
      backupHandle,
    },
    data () {
      return {
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        backupHandle: false,
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        currentOrder:undefined,
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
      // -------------------------------------------- 数据初始化  -----------------------------------------
      handleBackup(recordId,name){
        this.backupHandle = true;
        this.$nextTick(() => {
          this.$refs.backupHandle.govPopupParam(recordId,name);
        })
      },
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
            orderBy:undefined,
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
          searchStatus:undefined,
            backupCode:undefined,
            backupOrg:undefined,
            wrapName:undefined,
            nameChn:undefined,
            searchBenDate:undefined,
            searchEndDate:undefined

        }
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
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

      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy=this.currentOrder;
        queryAllAlreadyBackupList(this.resData, this.query).then(res => {
          this.resData = res.data
          if(this.resData.pageNum===0){
            this.resData.pageNum=1
          }
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
      showDetails(recordId){
        this.$router.push("/trade/manage/govViewList/"+recordId)
      },
      resetQuery() {
        this.query = this.metaQuery();
        this.list()
      },
      //--------------------------------------------导出Excel------------------------------------
      exportExcel() {
        if(this.query.searchBenDate == undefined || this.query.searchBenDate == ''||this.query.searchEndDate == undefined || this.query.searchEndDate == null ){
          this.$message({
            type: 'error',
            message: '请选择创建的开始日期及创建的结束日期'
          });
          return false;
        }else {
          exportQueryAllAlreadyBackupList(this.resData, this.query).then(res => {
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
      // ----------------------------------------------结束--------------------------------------------------
      getHints(spec,wrapName){
        let _spec,_wrapName;
        if(spec == null || spec == undefined || spec == "空"){
          _spec = "";
        }else {
          _spec = spec;
        }
        if(wrapName == null || wrapName == undefined || wrapName == "空"){
          _wrapName = "";
        }else {
          _wrapName = wrapName;
        }
        return "规格:  "+_spec +"  包材:  "+_wrapName
      },
    }
  }
</script>

