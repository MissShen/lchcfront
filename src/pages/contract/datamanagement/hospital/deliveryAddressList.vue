<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" :inline="true"  label-position="left" onsubmit="return false;" class="table-form" size="small">
            <el-form-item>
              <el-input v-model="query.address" placeholder="详细地址"  size="small" maxlength="500" @keyup.enter.native="searchEnterFun"></el-input>
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
          <el-table-column label="买方名称" prop="buyerName" width="200" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.buyerName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="地址简称" prop="address_abbr" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.addressAbbr }}</span>
            </template>
          </el-table-column>
          <el-table-column label="收货人" prop="RECEIVERS" sortable="custom" width="80" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.receivers }}</span>
            </template>
          </el-table-column>
          <el-table-column label="联系电话" prop="MOBILE" sortable="custom" width="110" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.mobile }}</span>
            </template>
          </el-table-column>
          <el-table-column label="区域" prop="cityName,areaName" sortable="custom" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.cityName }}{{ scope.row.areaName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="详细地址" prop="ADDRESS" sortable="custom" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.address }}</span>
            </template>
          </el-table-column>
          <el-table-column label="默认地址" prop="DEFAULT_FLAG" sortable="custom" width="80" align="center" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.defaultFlag == '1' ? '是' : '否' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否可用" prop="STATE" sortable="custom" width="80" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.state == '1' ? '可用' : '已禁用' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="110">
            <template slot-scope="scope">
              <div v-if="scope.row.state == '1'" class="operates">
                <a href="javascript:;" @click="updateAddress(scope.row.id)">修改</a>
<!--                <a href="javascript:;" @click="deleteAddress(scope.row.id)">删除</a>-->
                <a href="javascript:;" @click="disableAddress(scope.row.id)">禁用</a>
              </div>
              <div v-if="scope.row.state == '0'" class="operates">
                <a href="javascript:;" @click="enableAddress(scope.row.id)">启用</a>
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
          <el-button type="success" size="small" @click="handleGoAdd('-1')">增加</el-button>
        </div>
      </div>

    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求  引自js文件
  import {queryHospitalAddressList, deleteHospitalAddress,updateCatDeliveryAddressState} from 'src/axios/contract/datamanagement/hospitalAddress'
  import { keyBoardEnter } from "src/utils"

  export default {
    data () {
      return {
        currentOrder: undefined,
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        type : "isUp",
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
          query: {
            address: undefined
          }
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy = this.currentOrder;
        queryHospitalAddressList(this.resData, this.query,"").then(res => {
          console.log(res)
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
      },
      handleGoAdd (id) {
        this.$router.push({
          path : "/CONTRACT/datamanagement/hospitalDeliveryAddress",
          query : {
            id : id,
            type : this.type,
            buyerId : "",
          }
        });
      },
      updateAddress(id) {
        this.$router.push({
          path : "/CONTRACT/datamanagement/hospitalDeliveryAddress",
          query : {
            id : id,
            type : this.type,
            buyerId : "",
          }
        });
      },
      resetForm(){
        this.query = this.metaQuery ();
        this.list();
      },
      disableAddress(id){
        this.$confirm("确认禁用当前收货地址？",{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          updateCatDeliveryAddressState(id,"0","").then(res =>{
            this.$message({
              type : res.success == true ? "success" : "error",
              message: res.success == true ? res.data : '执行失败',
              duration: 1000,
              onClose: () => {
                this.list();
              }
            })
          })
        })
      },
      enableAddress(id){
        this.$confirm("确认启用当前收货地址？",{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          updateCatDeliveryAddressState(id,"1","").then(res =>{
            this.$message({
              type : res.success == true ? "success" : "error",
              message: res.success == true ? res.data : '执行失败',
              duration: 1000,
              onClose: () => {
                this.list();
              }
            })
          })
        })
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

