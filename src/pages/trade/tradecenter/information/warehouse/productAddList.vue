<template>
    <!-- ========================== 新增库存商品 ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
            <el-form-item class="width-150">
                <el-select v-model="query.category"  @keyup.enter.native="searchEnterFun" placeholder="药品分类" size="small">
                  <el-option label="中药" value="chinese"></el-option>
                  <el-option label="西药" value="western"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-input v-model="query.searchKey2"  @keyup.enter.native="searchEnterFun" placeholder="产品名" size="small"></el-input>
             </el-form-item>
            <el-form-item>
                <el-input v-model="query.searchKey"  @keyup.enter.native="searchEnterFun" placeholder="商品名" size="small"></el-input>
             </el-form-item>
            <el-form-item>
                <el-input v-model="query.manufactureName"  @keyup.enter.native="searchEnterFun" placeholder="生产企业" size="small"></el-input>
             </el-form-item>
            <el-form-item>
                <el-button type="success"  @click="searchEnterFun" size="small">查询</el-button>
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
        <!--  <el-table-column type="index" width="50" label="序号" header-align="left" align="center"></el-table-column>-->
          <el-table-column label="产品名" prop="medicalName" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.medicalName }}
            </template>
          </el-table-column>
          <el-table-column label="商品名" prop="productName" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.productName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="剂型" width="80" prop="doseageFormName" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.doseageFormName }}
            </template>
          </el-table-column>
          <el-table-column label="单位" width="80" prop="metricName" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.metricName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="规格包装" prop="medicalSpec" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.medicalSpec }}
            </template>
          </el-table-column>
          <el-table-column label="生产企业" prop="manufactureName" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.manufactureName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="配送企业">
            <template slot-scope="scope">
              <el-select v-model="scope.row.senderOrgid" size="small">
                <el-option v-for="item in scope.row.sendBusiness" :key="item.senderName" :label="item.senderName" :value="item.senderId" >
                </el-option>
              </el-select>
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
          <el-button type="primary" size="small"  @click="addProduct()">
            确定
          </el-button>
          <el-button type="" size="small" @click="returnBefore()">
            返回
          </el-button>
        </div>
      </div>
    </div>
    <!-- ========================== 主内容end ========================= -->

</template>
<script>

  // 引入用户相关请求
  import {queryWareHouseProductAddList,saveWareHouseProductByIds} from 'src/axios/trade/information/wareHouseList'
  import {priceFormat,keyBoardEnter} from "src/utils";

  export default {
    name:'productList',
    data () {
      return {
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        currentOrder:undefined,
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        saveDataList:[],
        warehouseId : '',
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
      this.warehouseId = warehouseId
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

            warehouseId: undefined,
            category: undefined,
            searchKey2: undefined,
            searchKey: undefined,
            manufactureName: undefined

        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.query.warehouseId=this.warehouseId
        this.resData.orderBy=this.currentOrder;
        queryWareHouseProductAddList(this.resData, this.query).then(res => {
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
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      },
      handleSelectionChange(val){
        this.saveDataList=val
      },
      returnBefore(){
        window.history.go(-1);
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
      },
      addProduct() {
        var warehouseId= this.warehouseId
        if(this.saveDataList.length<1){
          this.$alert('请至少选择一种药品', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          })
          return false
        }else{
          this.$confirm(`确定添加选中药品?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var idList=[];
            var senderOrgids=[];
            var arr = this.saveDataList;
            for(var i=0; i<arr.length; i++){
              idList.push(arr[i].productId)
              senderOrgids.push(arr[i].senderOrgid)
            }
            saveWareHouseProductByIds(idList,warehouseId,senderOrgids).then(res => {
              this.$message({
                message: res.data,
                type: 'success',
                duration: 1000,
                onClose: () => {
                //  window.history.go(-1);
                  //this.metaList()
                  this.list()
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

