<template>
  <!-- ========================== 主内容start ========================= -->
  <!-- 表格 -->
  <div class="tablebox">
    <!-- 表格查询表单 -->
    <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
      <el-form-item>
        <el-input v-model="query.senderName" @keyup.enter.native="searchEnterFun" size="small"
                  placeholder="配送企业名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="query.senderAbbr" @keyup.enter.native="searchEnterFun" size="small"
                  placeholder="配送企业简称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
        <el-button type="warning" @click="resetForm()" size="small">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格列表 -->
    <div class="tableset">
      <el-table
        :data="resData.list"
        border
        stripe @selection-change="handleSelectionChange"
        @sort-change="sortChang"
      >
        <el-table-column type="selection" align="center" width="40" class="selection"></el-table-column>
        <!--<el-table-column type="index" width="100" header-align="left" align="center" label="序号"></el-table-column>-->
        <el-table-column label="配送企业名称" prop="name" sortable="custom">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="配送企业简称" prop="abbr" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.abbr }}</span>
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
        <el-button type="warning" size="small" @click="addCatalog()">加入区基药</el-button>
      </div>
    </div>

  </div>
  <!-- ========================== 主内容end ========================= -->

</template>
<script>

  // 引入用户相关请求
  import {selectCityBasedDrugList} from 'src/axios/trade/basedDrug/basedDrugSernderList'
  import {removeDrugCatalog} from 'src/axios/trade/basedDrug/basedDrugSernderList'
  import {priceFormat, keyBoardEnter} from "src/utils";

  export default {
    name: 'basedCitySnderList',
    data() {
      return {
        currentOrder: undefined,
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        multipleSelection: [],
        showQuery: false, // 表单查询初始化
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        }
      }
    },
    created() {
      this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      sortChang(value) {
        let sortType = " desc"
        if (value.order.startsWith("asc")) {
          sortType = " asc";
        }
        this.currentOrder = value.prop + sortType;
        this.list()
      },
      metaData() {
        return {
          // 前后台交互数据封装格式
          orderBy: undefined,
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
      metaQuery() { // 表单查询数据初始化
        return {

          id: undefined,
          searchSenderName: undefined,
          searchSenderAbbr: undefined,
          senderAbbr: undefined,
          senderName: undefined,

        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      addCatalog() {
        if (this.multipleSelection.length < 1) {
          this.$alert('请选择要增加的配送企业', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          })
          return false
        } else {
          this.$confirm(`确定加入?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var drugIdList = [], arr = this.multipleSelection;
            for (var i = 0; i < arr.length; i++) {
              drugIdList.push(arr[i].id)
            }
            removeDrugCatalog(drugIdList).then(res => {
              this.$message({
                message: '成功！',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  window.history.go(0);
                  this.metaList()
                }
              })
            })
          }).catch(() => {
          });
        }
      },


      resetForm() {
        this.query = this.metaQuery()
        this.list()
      },
      closeForm() {
        this.$refs['form'].resetFields()
        this.toggleForm()
      },
      //  获取用户分页列表
      list() {
        this.resData.orderBy = this.currentOrder;
        selectCityBasedDrugList(this.resData, this.query).then(res => {
          this.resData = res.data;
          if (this.resData.pageNum === 0) {
            this.resData.pageNum = 1;
          }
        })
      },
      searchEnterFun(e) {
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      // ************************ 分页操作 ************************
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

