<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
            <el-form-item>
              <el-select v-model="query.searchType" size="small">
                <el-option label="单位名称" value="0"></el-option>
                <el-option label="单位编码" value="1"></el-option>
                <el-option label="单位地址" value="2"></el-option>
                <el-option label="单位简称" value="3"></el-option>
                <el-option label="拼音简称" value="4"></el-option>
                <el-option label="五笔简称" value="5"></el-option>
                <el-option label="GSP证书号" value="6"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-input v-model="query.searchText" placeholder="关键词" size="small"
                        @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
              <el-button type="warning" @click="resetForm" size="small">重置</el-button>
            </el-form-item>
        </el-form>

      <div class="foot-btn">
        <div class="foot-left">
          <el-button type="primary" size="small" @click="handleDelete()">
            还原
          </el-button>
        </div>
      </div>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          @selection-change="handleSelectionChange"
          :row-key="getRowKeys"
          @sort-change="sortChange"
          ref="recycleTable"
          border
          stripe>
          <el-table-column type="selection" width="50" align="center" :reserve-selection="true"></el-table-column>
          <el-table-column label="医院等级" width="120" sortable="custom" prop="GRADE_NO">
            <template slot-scope="scope">
              <span>{{gradeNo(scope.row.catBuyer.gradeNo)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="单位名称" show-overflow-tooltip sortable="custom" prop="NAME">
            <template slot-scope="scope">
              <span>{{ scope.row.catOrg.name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="单位编号" width="180" sortable="custom" prop="CODE">
            <template slot-scope="scope">
              <span>{{ scope.row.catOrg.code }}</span>
            </template>
          </el-table-column>
          <el-table-column label="单位地址" show-overflow-tooltip sortable="custom" prop="ORG_ADDRESS">
            <template slot-scope="scope">
              <span>{{ scope.row.catBuyer.orgAddress }}</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="60">
            <template slot-scope="scope">
              <div class="operates"><a class="operation-btn" href="javascript:;" size="small" @click="goInfo(scope.row.catBuyer.id)">查看</a></div>
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

  import {recycle} from 'src/axios/datacenter/orgdata/catbuyer/catBuyer'
  import {restore} from 'src/axios/datacenter/orgdata/catbuyer/catBuyer'
  import {keyBoardEnter} from "src/utils";

  export default {
    data () {
      return {
        deleteDataList: [],
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
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
      if (!!this.$store.state.pageSeach.pageNum) {
        this.query = this.$store.state.pageSeach;
        this.resData.pageSize = this.$store.state.pageSeach.pageSize;
        this.resData.pageNum = this.$store.state.pageSeach.pageNum;
      }
      this.list();
    },

    methods: {

      sortChange(value){
        let sortType = " desc";
        if (value.order != null) {
          if (value.order.startsWith("asc")) {
            sortType = " asc";
          }
          this.query.orderBy = value.prop + sortType;
          this.list()
        }
      },

      getRowKeys(row){
        return row.catBuyer.id
      },

      // search(){
      //   this.$store.state.pageSeach.pageNum = 1;
      //   this.resData.pageNum = 1;
      //   this.list();
      // },
      //查询
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },

      //初始化数据
      list () {
        this.$store.state.pageSeach = this.query;
        recycle(this.query, this.resData).then(res => {
          this.resData = res.data;
          if (this.resData.pageNum == 0) {
            this.resData.pageNum = 1
          }
        })
      },

      handleSelectionChange(val){
        this.deleteDataList = val
      },

      //还原
      handleDelete() {
        if (this.deleteDataList.length < 1) {
          this.$alert('请至少选择一条数据', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false
        } else {
          this.$confirm('确定还原选中的' + this.deleteDataList.length + '条数据吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var ids = [];
            for (var row of this.deleteDataList) {
              ids.push(row.catBuyer.id)
            }
            restore(ids.toString()).then(res => {
              this.$message({
                message: res.data,
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.$refs.recycleTable.clearSelection();
                  this.list()
                }
              })
            })
          }).catch(() => {
          });
        }
      },

      //重置
      resetForm() {
        this.$refs.recycleTable.clearSelection();
        this.query = this.metaQuery();
        this.resData = this.metaData();
        this.list();
      },

      gradeNo(status) {
        if (status === "1") {
          return "一级甲等";
        } else if (status === "2") {
          return "一级乙等";
        } else if (status === "3") {
          return "一级丙等"
        } else if (status === "4") {
          return "二级甲等"
        } else if (status === "5") {
          return "二级乙等"
        } else if (status === "6") {
          return "二级丙等"
        } else if (status === "7") {
          return "三级甲等"
        } else if (status === "8") {
          return "三级乙等"
        } else if (status === "9") {
          return "三级丙等"
        } else if (status === "A") {
          return "三级特等"
        } else if (status === "B") {
          return "其他"
        } else if (status === "C") {
          return "一级"
        } else if (status === "D") {
          return "二级"
        } else if (status === "E") {
          return "三级"
        } else {
          return status;
        }
      },

      goInfo(id) {
        this.$router.push("/DATA/basedata/orgdata/buyerorg/buyer/info/" + id);
      },

      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {
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
          searchType: '0',
          searchText: '',
          orderBy:null
        }
      },

      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val;
        this.$store.state.pageSeach.pageSize = val;
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val;
        this.$store.state.pageSeach.pageNum = val;
        this.list()
      }
    }
  }
</script>

