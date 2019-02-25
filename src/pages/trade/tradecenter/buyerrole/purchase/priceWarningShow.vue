<template>
<div>
  <!-- ========================== 主内容start ========================= -->
  <!-- 表格 -->
  <div class="tablebox">
    <!-- 表格列表 -->
    <div class="tableset">
      <el-table
        :data="resData.list"
        border
        stripe
        @sort-change="sortChang"
      >
        <!--<el-table-column type="index" label="序号" header-align="left" align="center" width="50"></el-table-column>-->
        <el-table-column label="医院机构名称" prop="t.bak_buyer_fullname" sortable="custom">
          <template slot-scope="scope">
            <el-tooltip placement="top" :enterable="false">
              <div slot="content">
                {{scope.row.bakBuyerFullname}}<br/>
              </div>
              <div class="el-tooltip-box">
                <div class="text-inline">
                  {{ scope.row.bakBuyerFullname}}
                </div>
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="单价" width="100" header-align="left" align="right" prop="p.bakMinPrice" sortable="custom">
          <template slot-scope="scope">
            <span>{{ priceFormat(scope.row.bakMinPrice) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="120" prop="p.create_date" sortable="custom" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createDate | formatDate }}</span>
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
    <div class="foot-left"><el-button @click="goBack" size="small" class="el-button-pale">返回</el-button></div>
  </div>
  <!-- ========================== 主内容end ========================= -->
</div>

</template>
<script>

  // 引入用户相关请求
  import {minPriceBuyer} from  'src/axios/trade/purchase/purchase'
  import {priceFormat} from "src/utils";
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
        }
      }
    },
    created () {
      this.query.productId =this.$route.params.productId
      this.query.minTradePrice =this.$route.params.minTradePrice
      this.list()

    },
    methods: {
      priceFormat,
      // -------------------------------------------- 数据初始化  -----------------------------------------


      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      metaData () {
        // 前后台交互数据封装格式
        return {
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
      metaQuery () { // 表单查询数据初始化
        return {
            id: undefined,
            buyerOrgId: undefined,
            enableFlag: undefined,
            searchProductName: undefined,
            searchMedicalSpec: undefined,
            searchOrgName:undefined,
            productId:undefined,
            minTradePrice:undefined,
          hitPrice:undefined

        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy=this.currentOrder;
        minPriceBuyer(this.resData,this.query).then(res => {
          this.resData = res.data;
          if(this.resData.pageNum === 0){
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
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      },
      goBack() {
        this.$router.go(-1)
      },
    }
  }
</script>

