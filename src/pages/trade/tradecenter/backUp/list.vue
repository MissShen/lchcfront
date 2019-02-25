<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <el-form ref="query" :model="query" class="table-form" :inline="true">
        <el-form-item v-if="roleCode==='supervise_bj'" class="width-110">
          <el-select v-model="query.searchStatus" @keyup.enter.native="searchEnterFun"  placeholder="备案状态" size="small">
            <el-option label="全部" value="20"></el-option>
            <el-option label="已提交" value="5"></el-option>
            <el-option label="审核通过" value="2"></el-option>
            <el-option label="审核拒绝" value="6"></el-option>
            <el-option label="终核通过" value="4"></el-option>
            <el-option label="作废提交" value="10"></el-option>
            <el-option label="同意作废" value="11"></el-option>
            <el-option label="拒绝作废" value="12"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  v-if="roleCode==='manage'" class="width-110">
            <el-select v-model="query.searchStatus" @keyup.enter.native="searchEnterFun"   placeholder="备案状态" size="small">
              <el-option label="全部" value="20"></el-option>
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
          <el-date-picker type="date" @keyup.enter.native="searchEnterFun"  placeholder="开始日期" v-model="query.searchBenDate" size="small"></el-date-picker>
           &nbsp;至&nbsp;
          <el-date-picker type="date" @keyup.enter.native="searchEnterFun"  placeholder="结束日期" v-model="query.searchEndDate" size="small"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
          <el-button type="warning" @click="resetQuery()" size="small">重置</el-button>
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
          <el-table-column label="备案编码"  prop="backupCode" sortable="custom" width="80">
            <template slot-scope="scope">

              <el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  {{scope.row.backupCode}}<br/>
                </div>
                <div class="el-tooltip-box">
                  {{ scope.row.backupCode}}
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="产品名" min-width="150" prop="ooi.BAK_PRODUCT_NAME" sortable="custom" >
            <template slot-scope="scope" class="drugMessage">
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
          <el-table-column  label="产品信息" min-width="150" prop="ooi.BAK_MEDICAL_SPEC" sortable="custom">
            <template slot-scope="scope">
              <el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  {{getHints(scope.row.spec,scope.row.wrapName)}}<br/>
                  {{ scope.row.manufactureName}}
                </div>
                <div class="el-tooltip-box">
                  <div class="text-inline">
                    {{ scope.row.spec}} &nbsp;&nbsp;
                    <span v-if="scope.row.wrapName != '空' && scope.row.wrapName != null">{{ scope.row.wrapName}}</span>
                  </div>
                  <div class="text-inline" >
                    {{ scope.row.manufactureName}}
                  </div>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="转化比"  prop="STAND_RATE" sortable="custom" width="80" align="right" >
            <template slot-scope="scope">
              <span>{{ scope.row.standRate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="采购数量" prop="PURCHASE_NUM" sortable="custom"  width="80" align="right" >
            <template slot-scope="scope">
              <span>{{ scope.row.purchaseNum }}</span>
            </template>
          </el-table-column>
          <el-table-column label="登记机构" prop="BACKUP_ORG" sortable="custom" width="250">
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
          <el-table-column label="提交时间" prop="a.submit_date" sortable="custom" width="90" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.submitDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" prop="backupName" sortable="custom" width="80" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.delFlag!=0">{{ scope.row.delName }}</span>
              <span v-else>{{ scope.row.backupName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="140">
            <template slot-scope="scope">
              <div class="operates">
                  <span v-if="(scope.row.backFlag==5||scope.row.backFlag==1)&&(scope.row.delFlag==0)">
                    <a @click="checkOkUpdate(scope.row.recordId)" title="通过" class="blue">通过</a>
                  </span>
                  <span v-if="(scope.row.backFlag==5||scope.row.backFlag==1)&&(scope.row.delFlag==0)">
                    <a @click="checkUpdateNo(scope.row.recordId)" title="拒绝" class="red">拒绝</a>
                  </span>
                  <span v-if="scope.row.delFlag==1"><a @click="govDelOk(scope.row.recordId)" title="通过" class="blue">通过</a></span>
                  <span v-if="scope.row.delFlag==1"><a @click="govDelNo(scope.row.recordId)" title="拒绝" class="red">拒绝</a></span>
                  <span class="btn-word-2" v-if="!(((scope.row.backFlag==2||scope.row.backFlag==3||scope.row.backFlag==6)&&scope.row.delFlag==0)||scope.row.delFlag==3||scope.row.delFlag==2)">
                    <a @click="handleBackup(scope.row.recordId,'备案审批')" title="审批" class="blue-bord">审批</a>
                  </span>
                  <span v-else><a @click="handleBackup(scope.row.recordId,'备案详情')" title="详情" class="green">详情</a></span>
              </div>
            </template>
          </el-table-column>
        </el-table>
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
          <el-button type="warning" size="small" @click="exportExcel">生成excel表</el-button>
        </div>
      </div>
    </div>
    <!-- ========================== 主内容end ========================= -->
    <backup-handle v-if="backupHandle === true" ref="backupHandle" @refreshData="list"></backup-handle>
  </div>

</template>
<script>

  // 引入用户相关请求
  import {queryWaitBackupList,exportWaitEXL,getRoleCode,checkOkUpdate,checkUpdateNo,govDelOk,govDelNo} from 'src/axios/trade/backup/hospitalList'
  import fileUpload from 'js-file-download'
  import {priceFormat,keyBoardEnter} from "src/utils";
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
        roleCode:'',
        backupHandle: false,
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        currentOrder:undefined,
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
      getRoleCode(){
        getRoleCode().then(res => {
          this.roleCode = res.data
        })
      },
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
            isFirstPage: false,
            isLastPage: true,
            hasPreviousPage: false,
            hasNextPage: false,
            navigatePages: 8,
            orderBy:undefined,
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
            backupCode:undefined,
            searchStatus:undefined,
            wrapName:undefined,
            nameChn:undefined,
            searchBenDate:undefined,
            searchEndDate:undefined

        }
      },
      exportExcel(){
        exportWaitEXL(this.query).then(res => {
          let headers = res.headers;
          let title = ""
          if (!title) {
            const fileName = headers['content-disposition'];
            title = fileName.includes('filename=') ? decodeURI(fileName.split('=')[1]) : '下载的文件';
          }
          fileUpload(res.data,title,"application/vnd.ms-excel")
        })
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
        queryWaitBackupList(this.resData, this.query).then(res => {
          this.resData = res.data;
          if(this.resData.pageNum===0){
            this.resData.pageNum=1
          }
          this.$emit("wait",this.resData.total);
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
      getHints(spec, wrapName) {

        let _spec, _wrapName;
        if (spec == null || spec == undefined || spec == "空") {
          _spec = "";
        } else {
          _spec = spec;
        }
        if (wrapName == null || wrapName == undefined || wrapName == "空") {
          _wrapName = "";
        } else {
          _wrapName = wrapName;
        }
        return  "规格:  "+ _spec +"    包材:"+ _wrapName
      },
      checkOkUpdate(recordId){
        this.$confirm(`确认当前记录审核通过吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          checkOkUpdate(recordId).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {

              }
            })
            this.list()
          })
        }).catch(() => {
        });
      },
      checkUpdateNo(recordId){
        this.$confirm(`确认拒绝当前记录吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          checkUpdateNo(recordId).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
              }
            })
            this.list()
          })
        }).catch(() => {
        });
      },
      govDelOk(recordId){
        this.$confirm(`确认作废当前记录吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          govDelOk(recordId).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
              }
            })
            this.list()
          })
        }).catch(() => {
        });
      },
      govDelNo(recordId){
        this.$confirm(`确认拒绝作废当前记录吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          govDelNo(recordId).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
              }
            })
            this.list()
          })
        }).catch(() => {
        });
      }
    }
  }
</script>

