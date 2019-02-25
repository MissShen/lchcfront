<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" :inline="true" label-position="left" class="table-form">
            <el-form-item>
              <el-input v-model="query.hosName" placeholder="医院名称"  size="small"  maxlength="200" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="query.city" placeholder="市" @change="queryRegions()" size="small">
                <el-option
                  v-for="item in cities"
                  :key="item.id"
                  :label="item.nameChn"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="query.region" placeholder="区" @change="showRegion()" size="small">
                <el-option
                  v-for="item in regions"
                  :key="item.id"
                  :label="item.nameChn"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input v-model="query.address" placeholder="详细地址"  size="small"  maxlength="500" @keyup.enter.native="searchEnterFun"></el-input>
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
          <el-table-column label="医院名称" prop="buyername" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.buyerName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="市" prop="cityname" sortable="custom" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.cityName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="区 (县)" prop="areaname" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.areaName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="详细地址" prop="address" sortable="custom" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.address }}</span>
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
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求  引自js文件
  import { queryHospitalReceivingAddressList } from 'src/axios/contract/datamanagement/hospitalReceivingAddress'
  import {findByParentId} from 'src/axios/contract/sender/sendRegion'
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
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        checked: true,
        cities: [],
        regions: []
      }
    },
    created () {
      this.queryCities();
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
            hosName : undefined,
            city: undefined,
            region: undefined,
            address: undefined
          }
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy = this.currentOrder;
        queryHospitalReceivingAddressList(this.resData, this.query).then(res => {
          console.log(res)
          this.resData = res.data
          if(this.resData.pageNum === 0){
            this.resData.pageNum = 1
          }
        })
      },
      queryCities() {
        findByParentId("FR20T0000011000000050066").then(res => {
          console.log('queryCities: ', res);
          this.cities = res.data;
          this.regions = [];
        })
      },
      queryRegions() {
        findByParentId(this.query.city).then(res => {
          console.log('queryRegions: ', res);
          this.regions = res.data;
          this.query.region = this.regions[0].id;
        })
      },
      showRegion() {
        console.log(this.query.region);
      },
      // 重置用户表单
      resetForm() {
        this.query = this.metaQuery();
        this.regions = [];
        this.list();
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

