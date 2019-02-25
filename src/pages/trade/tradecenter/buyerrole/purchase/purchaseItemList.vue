<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <div class="table-form">
        <el-form ref="query" :model="query" label-position="right" size="small" class="demo-form-inline">
          <div class="formrow">
            <span>
                <el-input v-model="query.searchProductName" placeholder="品名" size="small"></el-input>
            </span>
            <span>
                <el-input v-model="query.searchMedicalSpec" placeholder="规格" size="small"></el-input>
            </span>
            <span>
           <!--     <el-button type="warning" size="small">查询</el-button>
                <el-button type="primary" size="small">重置</el-button>-->
            </span>
          </div>
        </el-form>
      </div>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe>
          <!--<el-table-column type="index" label="序号" width="50"></el-table-column>-->
          <el-table-column label="产品名" size="small">
              <span>{{ scope.row.bakMedicalName }}</span>
          </el-table-column>
          <el-table-column label="商品名" size="small">
              {{ scope.row.bakProductName }}
          </el-table-column>
          <el-table-column label="规格包装" size="small">
              <span>{{ scope.row.bakMedicalSpec }}</span>
          </el-table-column>
          <el-table-column label="中大包装" size="small">
              {{ scope.row.bakMiddleStandRate }}
          </el-table-column>
          <el-table-column label="生产企业" size="small">
              <span>{{ scope.row.bakProducerFullname }}</span>
          </el-table-column>
          <el-table-column label="配送企业" size="small">
              <span>{{ scope.row.sendBusiness }}</span>
          </el-table-column>
          <el-table-column label="药库" size="small">
              <span>{{ scope.row.warehouseName }}</span>
          </el-table-column>
          <el-table-column label="单价" size="small" align="right" width="80">
              <span>{{ priceFormat(scope.row.hitPrice) }}</span>
          </el-table-column>
          <el-table-column label="计划采购量" size="small" align="right" width="80">
              <span>{{ scope.row.hitPrice }}</span>
          </el-table-column>
          <el-table-column label="备注" size="small">
              <span>{{ scope.row.hitPrice }}</span>
          </el-table-column>
          <el-table-column label="标记" size="small">
              <span>{{ scope.row.tradeName }}</span>
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
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求
  import {purchaseItemList} from 'src/axios/trade/purchase/purchase'

  export default {
    name:'based-city-snder-list',
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
        }
      }
    },
    created () {
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
            orgAllName: undefined,
            searchAllproductName: undefined,
            searchAllproductName:undefined,
            senderOrgName:undefined,
            searchBenDate:undefined,
            searchEndDate:undefined

        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        itemList(this.resData, this.query).then(res => {
          this.resData = res.data
          if(this.resData.pageNum === 0){
            this.resData.pageNum = 1
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
      }
    }
  }
</script>

