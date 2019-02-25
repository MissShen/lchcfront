<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
          <el-form-item class="width-120">
            <el-input v-model="query.medicalName" @keyup.enter.native="searchEnterFun"  placeholder="通用名" size="small"></el-input>
          </el-form-item>
          <el-form-item class="width-120">
            <el-input v-model="query.bakMedicalName" @keyup.enter.native="searchEnterFun" placeholder="产品名称" size="small"></el-input>
          </el-form-item>
          <el-form-item class="width-120">
            <el-input v-model="query.bakProductName" @keyup.enter.native="searchEnterFun" placeholder="商品名" size="small"></el-input>
          </el-form-item>
          <el-form-item class="width-120">
            <el-input v-model="query.manufactureName" @keyup.enter.native="searchEnterFun" placeholder="生产企业名称" size="small"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="success" @click="searchEnterFun"  size="small">查询</el-button>
              <el-button type="warning" size="small" @click="reset()">重置</el-button>
          </el-form-item>
        </el-form>
      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          @selection-change="handleSelectionChange"
          @sort-change="sortChang"
          border
          stripe  ref="multipleTable">
          <el-table-column type="selection" width="40" align="center" ></el-table-column>
          <!--<el-table-column type="index" width="50" label="序号" header-center="left" align="center"></el-table-column>-->
          <el-table-column label="产品名" prop="BAK_MEDICAL_NAME" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
                <!--tootip提示气泡-->
                <!--:enterable="false" 鼠标不可进入tooltip中-->
                <el-tooltip placement="top" :enterable="false">
                  <!--气泡内容（必须放在slot="content"内）,布局与源内容保持一致-->
                  <div slot="content">
                    <div>{{ scope.row.bakMedicalName }}</div>
                    <div>{{ scope.row.bakMedicalMode }}
                      <span v-if="scope.row.bakTradeName != '无' && scope.row.bakTradeName !=null">({{ scope.row.bakTradeName }})</span>
                    </div>
                  </div>

                  <!--源内容（必须放在class="el-tooltip-box"内）-->
                  <div class="el-tooltip-box">
                    <!--加class="text-inline"确保内容不折行-->
                    <div class="text-inline">{{ scope.row.bakMedicalName }}</div>
                    <div class="text-inline">{{ scope.row.bakMedicalMode }}
                      <span v-if="scope.row.bakTradeName != '无' && scope.row.bakTradeName !=null">({{ scope.row.bakTradeName }})</span>
                    </div>
                  </div>
                </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="产品信息" prop="BAK_PRODUCT_NAME" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  {{getHints(scope.row.bakMedicalSpec,scope.row.warpName)}}<br/>
                  {{scope.row.manufactureName}}
                </div>
                <div class="el-tooltip-box">
                  <div class="text-inline">
                    {{ scope.row.bakMedicalSpec }}&nbsp;&nbsp;
                    <span v-if="scope.row.warpName != '空' && scope.row.warpName != null">{{scope.row.warpName}}</span>
                  </div>
                  <div class="text-inline" >
                    {{scope.row.manufactureName}}
                  </div>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="转换比" width="90" prop="BAK_STAND_SPEC_RATE" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.bakStandSpecRate }}</span>
            </template>
          </el-table-column>
    <!--      <el-table-column label="剂型" width="100" prop="BAK_MEDICAL_MODE" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.bakMedicalMode }}</span>
            </template>
          </el-table-column>
          <el-table-column label="规格" width="100" prop="BAK_MEDICAL_SPEC" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.bakMedicalSpec }}</span>
            </template>
          </el-table-column>
          <el-table-column label="转换比" width="90" prop="BAK_STAND_SPEC_RATE" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.bakStandSpecRate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="单位" width="60" prop="BAK_SPEC_UNIT" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.bakSpecUnit }}</span>
            </template>
          </el-table-column>
          <el-table-column label="包材" width="60" prop="WARP_NAME" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.warpName }}</span>
            </template>
          </el-table-column>
            <el-table-column label="生产企业" width="200" prop="MANUFACTURE_NAME" sortable="custom" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.manufactureName }}</span>
              </template>
            </el-table-column>-->
              <el-table-column label="单价" width="150" prop="PRICE" sortable="custom">
                <template slot-scope="scope">
                  <span>{{ priceFormat(scope.row.price) }}</span>
                </template>
             </el-table-column>
            <el-table-column type="expand">
              <template slot-scope="scope">
                <span>非两票制原因 :  <el-input style="width:400px " v-model="scope.row.remark" :disabled="true" size="small"></el-input></span>
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
          <el-button type="success" size="small" @click="goAdd">新增</el-button>
          <el-button type="danger" size="small" @click="goDelete">删除</el-button>
          <el-button type="warning" size="small" @click="exportExcel">导出</el-button>
        </div>
      </div>

    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>
</template>
<script>

  // 引入数据请求
  import {selectOrgFttList,deleteFttProduct,exportEXL} from 'src/axios/trade/assist/fttProduct/orgFttList'
  import fileUpload from 'js-file-download'
  import {priceFormat,keyBoardEnter} from "src/utils";
  import {getSpecHints,getPackHints} from "src/utils/validateUtil";

  export default {
    data () {
      return {
        currentOrder:undefined,
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        multipleSelection:[]
      }
    },
    created () {
      this.list()
    },
    methods: {
      getSpecHints,
      getPackHints,
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {
          // 前后台交互数据封装格式
            pageNum: 1,
          orderBy:undefined,
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
            list: [],
            requestInfo:[]

        }
      },
      priceFormat,
      metaQuery () { // 表单查询数据初始化
        return {

            medicalName:undefined,
            bakMedicalName:undefined,
            bakProductName:undefined,
            manufactureName:undefined

        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      goAdd(){
        this.$router.push({path: 'zbidList', query: {}})
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy=this.currentOrder;
        selectOrgFttList(this.resData, this.query).then(res => {
          this.resData = res.data;
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
      reset(){
        this.query=this.metaQuery();
        this.list();
      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val;
        this.list()
      },
      metaList(){
        this.list();
      },
      exportExcel(){
        exportEXL(this.resData,this.query).then(res => {
          let headers = res.headers;
          let title = ""
          if (!title) {
            const fileName = headers['content-disposition'];
            title = fileName.includes('filename=') ? decodeURI(fileName.split('=')[1]) : '下载的文件';
          }
          fileUpload(res.data,title,"application/vnd.ms-excel")
        })
      },
      goDelete(){
          if(this.multipleSelection.length<1){
            this.$message.error('请选择要删除的非两票制药品');
            return false
          }else {
            this.$confirm('是否删除该药品?', '信息', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              let ids = [],arr = this.multipleSelection;
              for(let i = 0; i < arr.length; i++){
                ids.push(arr[i].id);
              }
              deleteFttProduct(ids).then(res => {
                this.list()
              })
              this.$message({
                type: 'success',
                message: '操作成功!'
              })
            })
          }
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val;
        this.list()
      },
      getHints(bakMedicalSpec,wrapName){
        let _bakMedicalSpec,_wrapName;
        if(bakMedicalSpec == null || bakMedicalSpec == undefined || bakMedicalSpec == "空"){
          _bakMedicalSpec = "";
        }else {
          _bakMedicalSpec = bakMedicalSpec;
        }
        if(wrapName == null || wrapName == undefined || wrapName == "空"){
          _wrapName = "";
        }else {
          _wrapName = wrapName;
        }
        return _bakMedicalSpec +_wrapName
      },

    }
  }
</script>
