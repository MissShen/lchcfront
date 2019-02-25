<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
            <el-form-item class="width-120">
                <el-input v-model="query.searchDeclareName" @keyup.enter.native="searchEnterFun" placeholder="医院名称" size="small"></el-input>
            </el-form-item>
            <!--<span>-->
                <!--<el-input v-model="query.searchDaseageFormName" placeholder="通用名" size="small"></el-input>-->
            <!--</span>-->
            <el-form-item class="width-120">
                <el-input v-model="query.searchSpec" @keyup.enter.native="searchEnterFun" placeholder="产品名称" size="small"></el-input>
            </el-form-item>
            <el-form-item class="width-120">
                <el-input v-model="query.searchStandRate" @keyup.enter.native="searchEnterFun" placeholder="商品名" size="small"></el-input>
            </el-form-item>
            <el-form-item class="width-120">
                <el-input v-model="query.searchManufactureName" @keyup.enter.native="searchEnterFun" placeholder="生产企业名称" size="small"></el-input>
                <input v-model="query.declareId" type="hidden" size="small"></input>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
                <el-button type="warning"  @click="reset()" size="small">重置</el-button>
            </el-form-item>
        </el-form>
      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe ref="multipleTable"
          @sort-change="sortChang"
        >
          <!--<el-table-column type="index" width="80" align="right" label="序号"></el-table-column>-->
          <el-table-column label="上报机构" prop="buyerOrgName" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  {{scope.row.buyerOrgName}}<br/>
                </div>
                <div class="el-tooltip-box">
                  <div class="text-inline">
                    {{ scope.row.buyerOrgName}}
                  </div>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <!--<el-table-column label="中西药">-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{ scope.row.bidFlag }}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column label="通用名">-->
          <!--<template slot-scope="scope">-->
            <!--<span>{{ scope.row.medicalName }}</span>-->
          <!--</template>-->
      <!--  </el-table-column>-->
          <el-table-column label="产品名" prop="ooi.BAK_PRODUCT_NAME" sortable="custom" >
            <template slot-scope="scope" class="drugMessage">
              <ul class="ico-zt">
               <li>
                 <!--tootip提示气泡-->
                 <!--:enterable="false" 鼠标不可进入tooltip中-->
                  <el-tooltip placement="top" :enterable="false">
                    <!--气泡内容（必须放在slot="content"内）,布局与源内容保持一致-->
                    <div slot="content">
                      <div>{{ scope.row.bakMedicalName }}</div>
                      <div>{{ scope.row.bakMedicalMode }}
                        <span v-if="scope.row.bakProductName != '无' && scope.row.bakProductName !=null">({{ scope.row.bakProductName }})</span>
                      </div>
                    </div>

                    <!--源内容（必须放在class="el-tooltip-box"内）-->
                    <div class="el-tooltip-box">
                      <!--加class="text-inline"确保内容不折行-->
                      <div class="text-inline">{{ scope.row.bakMedicalName }}</div>
                      <div class="text-inline">{{ scope.row.bakMedicalMode }}
                        <span v-if="scope.row.bakProductName != '无' && scope.row.bakProductName !=null">({{ scope.row.bakProductName }})</span>
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
                  {{getHints(scope.row.bakMedicalSpec, scope.row.bakSpecUnit ,scope.row.warpName)}}<br/>
                  {{scope.row.manufactureName}}
                </div>
                <div class="el-tooltip-box">
                  <div class="text-inline">
                    {{ scope.row.bakMedicalSpec}} / {{ scope.row.bakSpecUnit }} &nbsp;&nbsp;
                    <span v-if="scope.row.warpName != '空' && scope.row.warpName != null">{{ scope.row.warpName}}</span>
                  </div>
                  <div class="text-inline" >
                    {{ scope.row.manufactureName}}
                  </div>
                </div>
              </el-tooltip>

            </template>
          </el-table-column>

          <el-table-column label="转换比" prop="f.BAK_STAND_SPEC_RATE" sortable="custom" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.bakStandSpecRate }}</span>
            </template>
          </el-table-column>
        <!--  <el-table-column label="单位" prop="f.BAK_SPEC_UNIT" sortable="custom" width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.bakSpecUnit }}</span>
            </template>
          </el-table-column>-->
          <el-table-column label="单价" prop="f.PRICE" sortable="custom" width="80">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.price) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="备注" width="100">
            <template slot-scope="scope">
              <div class="operates">
                <a href="javaScript:;" class="green" @click="show(scope.row)">查看</a>
              </div>
            </template>
          </el-table-column>
          <el-table-column  type="expand">
            <template slot-scope="scope">
              <el-form label-position="left"  height="30px" inline class="demo-table-expand">
                <el-form-item label="备注:" class="nomar">
                  <span>{{ scope.row.remark }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <!--<el-table-column label="操作" width="120">-->
            <!--<template slot-scope="scope">-->
              <!--<a class="operation-btn" @click="goInfo(scope.row.id)">查看</a>-->
            <!--</template>-->
          <!--</el-table-column>-->
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
        <el-button type="" size="small" @click="goBack">返回</el-button>
        <el-button type="warning" size="small" @click="exportExcel">导出</el-button>
      </div>
    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入数据请求
  import {showDeclareBuyer,exportEXL} from 'src/axios/trade/assist/assistConfig'
  import fileUpload from 'js-file-download'
  import {priceFormat,keyBoardEnter} from "src/utils";

  export default {
    data () {
      return {
        currentOrder: undefined,
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        expanded:true
      }
    },
    created () {
      this.assistId = this.$route.params.assistId || undefined;
      this.list()
    },
    methods: {
      priceFormat,
      // -------------------------------------------- 数据初始化  -----------------------------------------
      sortChang(value){
        let sortType=" desc"
        if(value.order.startsWith("asc")){
          sortType=" asc";
        }
        this.currentOrder=value.prop + sortType;
        this.list()
      },
      reset(){
        this.query=this.metaQuery();
        this.list();
      },
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
            list: [],
            requestInfo:[]
          }

      },
      show(row){
        this.$refs.multipleTable.toggleRowExpansion(row,this.expanded);
        this.expanded = !this.expanded
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
      },
      exportExcel(){
        exportEXL(this.query).then(res => {
          let headers = res.headers;
          let title = ""
          if (!title) {
            const fileName = headers['content-disposition'];
            title = fileName.includes('filename=') ? decodeURI(fileName.split('=')[1]) : '下载的文件';
          }
          fileUpload(res.data,title,"application/vnd.ms-excel")
        })
      },
      metaQuery () { // 表单查询数据初始化
        return {
            declareId:undefined,
            searchDeclareName: undefined,
            searchDaseageFormName: undefined,
            searchSpec: undefined,
            searchStandRate: undefined,
            searchManufactureName: undefined,

        }
      },

      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy=this.currentOrder;
        this.query.declareId=this.assistId;
        showDeclareBuyer(this.resData, this.query).then(res => {
          this.resData = res.data;
          if(this.resData.pageNum===0){
            this.resData.pageNum=1
          }
        })
      },
      reset(){
        this.query=this.metaQuery();
        this.list();
      },
      handleFromInfo(orderId) {
        this.$router.push("/trade/manage/orderItemList/" + orderId)
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
      goBack() {
        this.$router.go(-1)
      },
      getHints(bakMedicalSpec,  bakSpecUnit, warpName) {

        let _bakMedicalSpec, _warpName;
        if (bakMedicalSpec == null || bakMedicalSpec == undefined || bakMedicalSpec == "空") {
          _bakMedicalSpec = "";
        } else {
          _bakMedicalSpec = bakMedicalSpec;
        }
        if (warpName == null || warpName == undefined || warpName == "空") {
          _warpName = "";
        } else {
          _warpName = warpName;
        }
        return  "规格:  "+ _bakMedicalSpec +"/"+ bakSpecUnit +"    包材:"+ _warpName
      },
    }
  }
</script>
