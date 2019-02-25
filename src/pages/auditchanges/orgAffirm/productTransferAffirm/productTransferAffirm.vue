<template>
  <!-- 表格 -->
  <div class="tablebox">

    <!-- 表格查询表单 -->
      <el-form ref="query" :model="query" label-position="right" size="small" :inline="true"  class="table-form">
          <el-form-item>
            <el-input v-model="query.requestCode" placeholder="申请单号" @keyup.enter.native="searchEnterFun" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="query.outOrgName" placeholder="转出企业名称" @keyup.enter.native="searchEnterFun" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="query.operatorType" placeholder="全部" size="small">
              <el-option
                v-for="item in productTransferOpts"
                :label="item.value"
                :value="item.id"
                :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
            <el-button type="warning" @click="restQuery" size="small">重置</el-button>
          </el-form-item>
      </el-form>

    <!-- 表格列表 -->
    <div class="tableset">
      <el-table
        :data="resData.list"
        border
        stripe>
        <el-table-column label="申请单号" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.requestCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="更新类型名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.upTypeName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="申请企业名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.requestOrg }}</span>
          </template>
        </el-table-column>
        <el-table-column label="转出企业名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.transferOrg }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <div class="operates">
              <span>
                <a class="operation-btn" @click="productTransferAffirm(scope.row.id)">确认</a>
              </span>
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
  </div>

</template>
<script>

  // 引入用户相关请求
  import {findUpProductTransfers} from 'src/axios/auditchanges/messageChanges/productTransfer';
  import {findByOperatorType} from 'src/axios/auditchanges/messageChanges/upType';
  // import {keyBoardEnter} from "src/utils";

  export default {
    data() {
      return {
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        productTransferOpts: [],
        showQuery: false, // 表单查询初始化
      }
    },
    created() {
      findByOperatorType(this.productTransferOpts).then(res => {
        this.productTransferOpts = res.data;
        this.productTransferOpts.splice(0, 0, {id: '', value: '全部'})
      });
      this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData() {
        return {
          resData: { // 前后台交互数据封装格式
            pageNum: 1,
            pageSize: 10,
            size: undefined,
            startRow: undefined,
            endRow: undefined,
            total: undefined,
            pages: undefined,
            prePage: undefined,
            nextPage: undefined,
            isFirstPage: true,
            isLastPage: undefined,
            hasPreviousPage: undefined,
            hasNextPage: undefined,
            navigatePages: undefined,
            navigatepageNums: undefined,
            navigateFirstPage: undefined,
            navigateLastPage: undefined,
            firstPage: undefined,
            lastPage: undefined,
            list: undefined
          }
        }
      },
      metaQuery() { // 表单查询数据初始化
        return {
          query: {
            requestCode: undefined,
            operatorType: undefined,
            outOrgName: undefined
          }
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      toggleQuery() {
        this.showQuery = !this.showQuery
      },
      // //查询
      // searchEnterFun(e){
      //   this.$store.state.pageSeach.pageNum = 1;
      //   this.resData.pageNum=1;
      //   keyBoardEnter(e, () => {
      //     this.list();
      //   })
      // },
      list() {
        findUpProductTransfers(this.resData, this.query).then(res => {
          this.resData = res.data;
          if (this.resData.pageNum == 0) {
            this.resData.pageNum = 1;
          }
        })
      },
      confrim(id) {
        this.$router.push("/AUDIT/orgAffirm/productTransferAffirmConfirm/" + id);
      },
      handleQuery() {
        this.list()
      },
      restQuery() {//重置
        this.query = this.metaQuery();this.list();
      },
      handleSizeChange(val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val
        this.list()
      }
    }
  }
</script>
