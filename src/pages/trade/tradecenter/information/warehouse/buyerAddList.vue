<template>
  <div>
    <!-- ========================== 新增管理员 ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
            <el-form-item>
                <el-input v-model="query.searchKey" placeholder="用户代码" size="small"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="query.searchKey1" placeholder="用户名称" size="small"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="success" size="small">查询</el-button>
            </el-form-item>
        </el-form>
      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          @selection-change="handleSelectionChange"
          @sort-change="sortChang"
          border
          stripe>
          <el-table-column type="selection" width="55" align="center"></el-table-column>
        <!--  <el-table-column type="index" width="50" label="序号"></el-table-column>-->
          <el-table-column label="用户代码" prop="buyer_User_Code" sortable="custom">
            <template slot-scope="scope">
              {{ scope.row.buyerUserCode }}
            </template>
          </el-table-column>
          <el-table-column label="用户名称" prop="buyer_User_name" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.buyerUsername }}</span>
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
          <el-button type="primary" size="small" @click="handleGoAdd">
            确定
          </el-button>
          <el-button type="" size="small" @click="returnEx()">
            返回
          </el-button>
        </div>
      </div>

    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求
  import {queryWareHouseBuyerAddList,addWareHouseBuyerByIds} from 'src/axios/trade/information/wareHouseList'

  export default {
    name:'based-city-snder-list',
    data () {
      return {
        activeName: 'first',  // 当前标签
        currentOrder:undefined,
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        saveDataList:[],
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
      //初始化列表
      var warehouseId = this.$route.params.warehouseId
      this.query.warehouseId = warehouseId
      this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {
         // 前后台交互数据封装格式
          orderBy:undefined,
          warehouseId:0,
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

            warehouseId: this.warehouseId,
            searchKey: undefined,
            searchKey1: undefined

        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy=this.currentOrder;
        queryWareHouseBuyerAddList(this.resData, this.query).then(res => {
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
      handleSelectionChange(val){
        this.saveDataList=val
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      },
      returnEx(){
        window.history.go(-1);
      },
      /*returnEx(){
        this.$router.push({
          name: 'buyerManagerList',
          params: {
            warehouseId: this.query.warehouseId
          }
        })
      },*/
      handleGoAdd() {
        var warehouseId= this.query.warehouseId
        if(this.saveDataList.length<1){
          this.$alert('请至少选择一位用户', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          })
          return false
        }else{
          this.$confirm(`确定新增选中用户?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var idList=[], arr = this.saveDataList;
            for(var i=0; i<arr.length; i++){
              idList.push(arr[i].buyerUserid)
            }
            addWareHouseBuyerByIds(idList,warehouseId).then(res => {
              this.$message({
                message: res.data,
                type: 'success',
                duration: 1000,
                onClose: () => {
                  window.history.go(-1);
                  this.metaList()
                }
              })
            })
          }).catch(() => {
          });
        }
      }
    }
  }
</script>

