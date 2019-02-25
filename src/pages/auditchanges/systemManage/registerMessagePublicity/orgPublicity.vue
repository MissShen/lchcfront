<template>
  <!-- 表格 -->
  <div class="tablebox">
    <!-- 表格查询表单 -->
    <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
      <el-form-item>
        <el-input v-model="query.orgName" placeholder="企业名称" @keyup.enter.native="searchEnterFun"
                  size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="query.creditCode" placeholder="社会统一信用代码" @keyup.enter.native="searchEnterFun"
                  size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="query.orgCode" placeholder="组织机构代码" @keyup.enter.native="searchEnterFun"
                  size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="query.status" placeholder="全部" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
        <el-button type="warning" @click="restQuery" size="small">重置</el-button>
      </el-form-item>
    </el-form>

    <div class="foot-btn">
      <div class="foot-left">
        <el-button type="primary" size="small" :disabled="!arrCheckeds || arrCheckeds.length == 0"
                   @click="handleAnnouncement">
          公示
        </el-button>
        <el-button type="warning" size="small" :disabled="!arrCheckeds || arrCheckeds.length == 0"
                   @click="handleUnAnnouncement">
          撤销
        </el-button>
      </div>

    </div>

    <!-- 表格列表 -->
    <div class="tableset">
      <el-table ref="multipleTable" :data="resData.list" border stripe @selection-change="handleSelectionChange"
                :row-key="getRowkeys">
        <el-table-column :reserve-selection="true" align="center" type="selection" width="50"></el-table-column>
        <el-table-column label="企业名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <!-- 悬浮提示框 -->
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>


        <el-table-column label="企业简称" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.abbr }}</span>
          </template>
        </el-table-column>
        <el-table-column label="社会统一信用代码">
          <template slot-scope="scope">
            <span>{{ scope.row.creditCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="组织机构代码">
          <template slot-scope="scope">
            <span>{{ scope.row.orgCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="80">
          <template slot-scope="scope">
            <span>{{ (scope.row.status == '0' || scope.row.status == null) ? '未公示' : '公示中'}}</span>
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
  import {
    orgList,
    orgAnnouncement,
    orgUnAnnouncement
  } from 'src/axios/auditchanges/systemManage/registerMessagePublicity'
  import {keyBoardEnter} from "src/utils";

  export default {
    data() {
      return {
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        options: [
          {
            value: '',
            label: '全部'
          }, {
            value: '0',
            label: '未公示'
          }, {
            value: '1',
            label: '公示中'
          }],
        multipleSelection: [],
        arrCheckeds: []
      }
    },
    created() {
      if (!!this.$store.state.pageSeach.pageNum) {
        this.query = this.$store.state.pageSeach;
        this.resData.pageSize = this.$store.state.pageSeach.pageSize;
        this.resData.pageNum = this.$store.state.pageSeach.pageNum;
      }
      this.$store.state.pageSeach = this.query;
      this.resData.pageSize = 10;
      this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData() {
        return {
          resData: { // 前后台交互数据封装格式
            pageNum: 0,
            pageSize: 10,
            size: 10,
            startRow: 0,
            endRow: 0,
            total: 0,
            pages: 0,
            // prePage: 0,
            // nextPage: 0,
            // isFirstPage: false,
            // isLastPage: true,
            // hasPreviousPage: false,
            // hasNextPage: false,
            // navigatePages: 8,
            // navigatepageNums: [],
            // navigateFirstPage: 0,
            // navigateLastPage: 0,
            // firstPage: 0,
            // lastPage: 0,
            list: []
          }
        }
      },
      metaQuery() { // 表单查询数据初始化
        return {
          query: {
            orgName: undefined,
            orgCode: undefined,
            creditCode: undefined,
            status: undefined
          }
        }
      },
      getRowkeys(row){
        return row.id;
      },
      //查询
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      list() {
        this.$store.state.pageSeach = this.query;
        orgList(this.resData, this.query).then(res => {
          this.resData = res.data
        })
      },
      // ************************
      handleSizeChange(val) {
        this.$store.state.pageSeach.pageSize = val;
        this.resData.pageSize = val;
        this.list()
      },
      handleCurrentChange(val) {
        this.$store.state.pageSeach.pageNum = val;
        this.resData.pageNum = val;
        this.list()
      },
      handleQuery() {
        this.list()
      },
      //重置
      restQuery() {
        this.query = this.metaQuery();
        this.list();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        let arr = [];
        for (let i in this.multipleSelection) {
          arr.push(this.multipleSelection[i].id);
        }
        this.arrCheckeds = arr;
      },
      //公示
      handleAnnouncement() {
        this.$confirm(`您确定公示选中项吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          orgAnnouncement(JSON.stringify(this.arrCheckeds)).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.$refs.multipleTable.clearSelection();
                this.handleQuery();
              }
            })
          }).catch(e => {
            console.error(e)
          })
        })
      },
      //撤销
      handleUnAnnouncement() {
        this.$confirm(`您确定撤销公示选中项吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          orgUnAnnouncement(JSON.stringify(this.arrCheckeds)).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.$refs.multipleTable.clearSelection();
                this.handleQuery();
              }
            })
          }).catch(e => {
            console.error(e)
          })
        })
      }
    }
  }

</script>
