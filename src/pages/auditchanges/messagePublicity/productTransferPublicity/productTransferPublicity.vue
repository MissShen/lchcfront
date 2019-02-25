<template>
  <!-- 表格 -->
  <div class="tablebox">

    <!-- 表格查询表单 -->
    <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
      <el-form-item>
        <el-input v-model="query.inOrgName" placeholder="申请企业名称" @keyup.enter.native="searchEnterFun"
                  size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="query.outOrgName" placeholder="转出企业名称" @keyup.enter.native="searchEnterFun"
                  size="small"></el-input>
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
        <el-table-column label="更新类型名称">
          <template slot-scope="scope">
            <span>{{ scope.row.upTypeId=='DATA00000000000000325048'?'进口产品代理商更新':scope.row.upTypeId=='DATA00000000000000326292'?'进口产品转国内分装':scope.row.upTypeId=='DATA00000000000000326291'?'进口药品转国产':'国内生产企业转产并购' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="申请企业名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.inOrgName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="转出企业名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.outOrgName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="申请时间" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.dateAdd}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <div class="operates">
              <span><a class="operation-btn" @click="handleDetail(scope.row.id,0)">详情</a></span>
            </div>
            <div class="operates" v-if="scope.row.stateAudit == 3">
              <span><a class="operation-btn" @click="handleDetail(scope.row.id,1)">质疑</a></span>
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


  import {productTransferList} from 'src/axios/auditchanges/messagePublicity/productTransfer';
  import {findByOperatorType} from 'src/axios/auditchanges/messageChanges/upType';
  import {keyBoardEnter} from "src/utils";

  export default {
    data() {
      return {
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        productTransferOpts: [],
      }
    },
    created() {
      if (!!this.$store.state.pageSeach.pageNum) {
        this.query = this.$store.state.pageSeach;
        this.resData.pageSize = this.$store.state.pageSeach.pageSize;
        this.resData.pageNum = this.$store.state.pageSeach.pageNum;
      }
      this.$store.state.pageSeach = this.query;
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
      },
      metaQuery() {
        return {
          inOrgName: '',
          outOrgName: '',
          operatorType: '',
        }
      },
      toggleQuery() {
        this.showQuery = !this.showQuery
      },
      list() {
        this.$store.state.pageSeach = this.query;
        productTransferList(this.resData, this.query).then(res => {
          console.log(res)
          this.resData = res.data;
          if (this.resData.pageNum == 0) {
            this.resData.pageNum = 1;
          }
        });
      },
      handleDetail(id,flag) {
        this.$router.push("/AUDIT/messagePublicity/detail/" + id+"/"+flag);
      },
      searchEnterFun(e) {
        this.list();
      },
      handleQuery() {
        this.list();
      },
      restQuery() {//重置
        this.query = this.metaQuery();
        this.list();
      },
      handleSizeChange(val) {
        this.$store.state.pageSeach.pageSize = val
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange(val) {
        this.$store.state.pageSeach.pageNum = val
        this.resData.pageNum = val
        this.list()
      }
    }
  }
</script>
