<template>
    <!-- ========================== 药库信息列表 ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
            <el-form-item>
                <el-input v-model="query.warehouseCode" @keyup.enter.native="searchEnterFun" placeholder="仓库编码" size="small"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="query.warehouseName" @keyup.enter.native="searchEnterFun" placeholder="仓库名称" size="small"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="searchEnterFun"  size="small">查询</el-button>
            </el-form-item>
        </el-form>
      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          @sort-change="sortChang"
          border
          stripe>
         <!-- <el-table-column type="index" width="50" header-align="left" align="center" label="序号"></el-table-column>-->
          <el-table-column label="药库编码" prop="t.WAREHOUSE_CODE" sortable="custom">
            <template slot-scope="scope">
              {{ scope.row.warehouseCode }}
            </template>
          </el-table-column>
          <el-table-column label="药库名称" prop="t.WAREHOUSE_NAME" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.warehouseName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="100" prop="t.ENABLE_FLAG" sortable="custom" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.enableFlag==='0'">停用</span>
              <span v-if="scope.row.enableFlag==='1'">启用</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <div class="operates">
                <a href="javaScript:;" @click="editWarehouse(scope.row.warehouseId)" title="修改药库信息"  class="green">修改药库信息</a>
                <a href="javaScript:;" @click="showBuyerList(scope.row.warehouseId)" title="用户组"  class="green">用户组</a>
                <a href="javaScript:;" @click="showProductList(scope.row.warehouseId)" title="库存商品"  class="green">库存商品</a>
                <a href="javaScript:;" @click="changeState(scope.row.warehouseId,scope.row.enableButton,scope.row.enableFlag)" title="停用/启用"  class="green">{{scope.row.enableButton}}</a>
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
          <el-button type="success" size="small" @click="editWarehouse(0)">新增</el-button>
        </div>
      </div>

    </div>
    <!-- ========================== 主内容end ========================= -->

</template>
<script>

  // 引入用户相关请求
  import {selectWareHouseList,changeState} from 'src/axios/trade/information/wareHouseList'
  import {priceFormat,keyBoardEnter} from "src/utils";

  export default {
    name:'wareHouseList',
    data () {
      return {
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        currentOrder:undefined,
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
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
      },
      metaList() {
        projectList().then(res => {
          this.projectList = res.data
        })
      },
      metaQuery () { // 表单查询数据初始化
        return {

//            id: undefined,
            warehouseCode: undefined,
            warehouseName: undefined

        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy=this.currentOrder;
        selectWareHouseList(this.resData, this.query).then(res => {
          this.resData = res.data
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
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list()
      },
      showProductList(warehouseId) {
        this.$router.push("/TRADE/messageMaintain/wareHouseProductList/" +warehouseId)
      },
      editWarehouse(warehouseId) {
        this.$router.push("/TRADE/messageMaintain/wareHouseUpdate/" +warehouseId)
      },

      showBuyerList(warehouseId) {
        this.$router.push("/TRADE/messageMaintain/buyerManagerList/" +warehouseId)
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
    },
      changeState(id,name,flag){
        this.$confirm('确定'+name+'?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          changeState(id,flag).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.list()
              }
            })
          })
        }).catch(() => {
        });
      }
    }
  }
</script>

