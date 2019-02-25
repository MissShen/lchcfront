<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" :inline="true" label-position="left" class="table-form" size="small">
            <el-form-item>
              <el-input v-model="query.orgName" placeholder="机构名称" onsubmit="return false;"  size="small" maxlength="500" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
              <el-button type="warning" size="small" @click="resetForm()">重置</el-button>
            </el-form-item>
        </el-form>
      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe
          @sort-change="sortChange">
          <el-table-column label="机构名称" prop="buyerName" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.buyerName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="机构简称" prop="buyerNameAbbr" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.buyerNameAbbr }}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否设置收货地址" prop="addressCount" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.addressCount >= '1' ? '是' : '否' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div class="operates">
                <a href="javascript:;" class="flo-left" @click="handleGoAdd('-1',scope.row.buyerId)">新增收货地址</a>
                <a href="javascript:;" class="flo-left" @click="openAddressList(scope.row.buyerId)">查询地址详情</a>
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
      <!-- 查看地址详情列表 -->
      <hospitalAddress-View v-if="addressListViewVisible" ref="hospitalAddressView"></hospitalAddress-View>
    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>
  // 引入用户相关请求  引自js文件
  import {queryHospitalSubsidiariesAddressList} from 'src/axios/contract/datamanagement/hospitalAddress'
  import hospitalAddressView from 'src/pages/contract/datamanagement/hospital/hospitalAddressList'
  import { keyBoardEnter } from "src/utils"

  export default {
    components: {
      hospitalAddressView
    },
    data () {
      return {
        currentOrder: undefined,
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        addressListViewVisible : false ,
        type : "isDown"
      }
    },
    created () {
      this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
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
            orgName: undefined
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy = this.currentOrder;
        queryHospitalSubsidiariesAddressList(this.resData, this.query).then(res => {
          console.log(res)
          this.resData = res.data
          if(this.resData.pageNum === 0){
            this.resData.pageNum = 1
          }
        })
      },
      // ************************ 分页操作 ************************
      openAddressList(id){
        this.$router.push("/contract/datamanagement/hospitalAddressList/" + id);
      },
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      },
      resetForm(){
        this.query = this.metaQuery ();
        this.list();
      },
      deleteAddress(id) {
        this.$confirm(`您删除收货地址的同时，之前的产品配送关系可能失效，是否确认删除？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteHospitalAddress(id).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.list();
              }
            })
          })
        })
      },
      handleGoAdd(id,buyerId) {
        this.$router.push({
          path : "/contract/datamanagement/hospitalDeliveryAddress",
          query : {
            id : id,
            type : this.type,
            buyerId : buyerId,
          }
        });
      },
      sortChange(value){
        let sortType=" desc"
        if(!!value.order){
          if(value.order.startsWith("asc")){
            sortType=" asc";
          }
          this.currentOrder=value.prop + sortType;
        } else {
          this.currentOrder=undefined;
        }
        this.list();
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e , ()=>{
          this.list();
        })
      },
    }
  }
</script>

