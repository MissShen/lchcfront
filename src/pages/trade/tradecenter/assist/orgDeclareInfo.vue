<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
            <!--<span>-->
                <!--<el-input v-model="query.searchDaseageFormName" placeholder="通用名" size="small"></el-input>-->
            <!--</span>-->
            <el-form-item>
                <el-input v-model="query.searchSpec"  @keyup.enter.native="searchEnterFun"  placeholder="产品名称" size="small"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="query.searchStandRate"  @keyup.enter.native="searchEnterFun"  placeholder="商品名" size="small"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="query.searchManufactureName"  @keyup.enter.native="searchEnterFun"  placeholder="生产企业名称" size="small"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
                <el-button type="warning" @click="reset()"size="small">重置</el-button>
            </el-form-item>
        </el-form>
      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe ref="multipleTable">
          <!--<el-table-column type="index" width="80" align="right" label="序号"></el-table-column>-->
          <!--<el-table-column label="中西药">-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{ scope.row.bidFlag }}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column label="通用名">-->
          <!--<template slot-scope="scope">-->
            <!--<span>{{ scope.row.medicalName }}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->
          <el-table-column label="产品名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.bakMedicalName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品名" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.bakProductName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="剂型">
            <template slot-scope="scope">
              <span>{{ scope.row.bakMedicalMode }}</span>
            </template>
          </el-table-column>
          <el-table-column label="规格">
            <template slot-scope="scope">
              <span>{{ scope.row.bakMedicalSpec }}</span>
            </template>
          </el-table-column>
          <el-table-column label="转换比" width="80" align="right">
            <template slot-scope="scope">
              <span>{{ scope.row.bakStandSpecRate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="单位" width="60" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.bakSpecUnit }}</span>
            </template>
          </el-table-column>
          <el-table-column label="包材" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.warpName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="生产企业" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.manufactureName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="单价" width="100" align="right">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.price) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="备注" width="100" align="center">
            <template slot-scope="scope">
              <span class="green" @click="show(scope.row)">查看</span>
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
      </div>
    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入数据请求
  import {selectOrgDeclareList} from 'src/axios/trade/assist/assistConfig'
  import {priceFormat,keyBoardEnter} from "src/utils";

  export default {
    data () {
      return {
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
      metaQuery () { // 表单查询数据初始化
        return {

            searchDaseageFormName: undefined,
            searchSpec: undefined,
            searchStandRate: undefined,
            searchManufactureName: undefined,

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
        this.query.declareId=this.assistId;
        selectOrgDeclareList(this.resData, this.query).then(res => {
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
      reset(){
        this.query=this.metaQuery();
        this.list();
      }
    }
  }
</script>
