<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
             <el-form-item class="width-150">
                 <el-input  v-model="query.searchMedicalName" @keyup.enter.native="searchEnterFun"  placeholder="产品名称" size="small"></el-input>
             </el-form-item>
            <el-form-item class="width-150">
                 <el-input  v-model="query.searchDaseageFormName"  @keyup.enter.native="searchEnterFun" placeholder="剂型名称" size="small"></el-input>
             </el-form-item>
            <el-form-item class="width-150">
                 <el-input  v-model="query.searchSpec" @keyup.enter.native="searchEnterFun"  placeholder="制剂规格" size="small"></el-input>
             </el-form-item>
            <el-form-item class="width-150">
                 <el-input  v-model="query.searchStandRate" @keyup.enter.native="searchEnterFun"  placeholder="转换系数" size="small"></el-input>
             </el-form-item>
            <el-form-item class="width-150">
                 <el-input  v-model="query.searchManufactureName"  @keyup.enter.native="searchEnterFun"  placeholder="生产企业名称" size="small"></el-input>
             </el-form-item>
            <el-form-item>
                <el-checkbox label="on" @keyup.enter.native="searchEnterFun"  v-model="query.searchOrgBy">短缺药监测机构</el-checkbox>
             </el-form-item>
            <el-form-item>
                <el-button type="success" size="small" @click="searchEnterFun">查询</el-button>
                <el-button type="warning" size="small" @click="resetForm">重置</el-button>
                <el-button size="small" @click="returnForm" class="el-button-pale">返回</el-button>
            </el-form-item>
        </el-form>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          @sort-change="sortChang"
          border
          stripe>
          <!--<el-table-column label="序号"  type="index" header-align="left" align="center" width="50"></el-table-column>-->
          <el-table-column label="批准文号" prop="t.PERMIT_NUMBER" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.permitNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column label="产品名" prop="ooi.BAK_PRODUCT_NAME" sortable="custom" >
            <template slot-scope="scope" class="drugMessage">
              <ul class="ico-zt">
                <li>
                  <!--tootip提示气泡-->
                  <!--:enterable="false" 鼠标不可进入tooltip中-->
                  <el-tooltip placement="top" :enterable="false">
                    <!--气泡内容（必须放在slot="content"内）,布局与源内容保持一致-->
                    <div slot="content">
                      <div>{{ scope.row.medicalName }}</div>
                      <div>{{ scope.row.doseageFormName }}
                        <span v-if="scope.row.bakTradeName != '无' && scope.row.bakTradeName !=null">({{ scope.row.bakTradeName }})</span>
                      </div>
                    </div>

                    <!--源内容（必须放在class="el-tooltip-box"内）-->
                    <div class="el-tooltip-box">
                      <!--加class="text-inline"确保内容不折行-->
                      <div class="text-inline">{{ scope.row.medicalName }}</div>
                      <div class="text-inline">{{ scope.row.doseageFormName }}
                        <span v-if="scope.row.bakTradeName != '无' && scope.row.bakTradeName !=null">({{ scope.row.bakTradeName }})</span>
                      </div>
                    </div>
                  </el-tooltip>
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column  label="产品信息" prop="ooi.BAK_MEDICAL_SPEC" sortable="custom">
            <template slot-scope="scope">
              <el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  {{getHints(scope.row.spec,scope.row.wrapName)}}<br/>
                  {{scope.row.manufactureName}}
                </div>
                <div class="el-tooltip-box">
                  <div class="text-inline">
                    {{ scope.row.spec }}&nbsp;&nbsp;
                    <span v-if="scope.row.wrapName != '空' && scope.row.wrapName != null">{{scope.row.wrapName}}</span>
                  </div>
                  <div class="text-inline" >
                    {{ scope.row.manufactureName}}
                  </div>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="转换系数" prop="t.STAND_RATE" sortable="custom" width="120" align="right">
            <template slot-scope="scope">
              <span>{{ scope.row.standRate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <div class="operates">
                <a @click="showHospitalList(scope.row.issueId,scope.row.productId)" title="详情">详情</a>
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
      <div class="foot-btn">
        <div class="foot-left">
          <el-button type="warning" size="small" @click="exportExcel">导出</el-button>
        </div>
      </div>
    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求
  import {wsjProductList,exportRoleEXL} from  'src/axios/trade/shortage/buyerRole/shortageUpList'
  import fileUpload from 'js-file-download'
  import {priceFormat,keyBoardEnter} from "src/utils";


  export default {
    name:'orderItemStaticList',
    data () {
      return {
        resData: this.metaData(),
        currentOrder:undefined,
        query: this.metaQuery(), // 查询初始化
        expanded:true,
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
        this.query=this.metaQuery()
        this.list()
      },
      metaQuery () { // 表单查询数据初始化
        return {
            id:undefined,
            searchMedicalName: undefined,
            searchDaseageFormName: undefined,
            searchSpec: undefined,
            searchStandRate: undefined,
            searchManufactureName: undefined,
            searchOrgBy: undefined
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
        this.query.id=this.$route.params.id
        wsjProductList(this.resData, this.query).then(res => {
          this.resData = res.data
          if(this.resData.pageNum === 0 ){
            this.resData.pageNum = 1
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
      getHints(spec,wrapName){
        let _spec = spec || '';
        let _wrapName = wrapName || '';
        return _spec +_wrapName
      },

      exportExcel(){
        exportRoleEXL(this.query).then(res => {
          let headers = res.headers;
          let title = ""
          if (!title) {
            const fileName = headers['content-disposition'];
            title = fileName.includes('filename=') ? decodeURI(fileName.split('=')[1]) : '下载的文件';
          }
          fileUpload(res.data,title,"application/vnd.ms-excel")
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
      showHospitalList(issueId,productId){
        this.$router.push("/trade/dataReport/orgInfoList/"+issueId+"/"+productId)
      },
      returnForm(){
        window.history.go(-1);
      }
    }
  }
</script>
