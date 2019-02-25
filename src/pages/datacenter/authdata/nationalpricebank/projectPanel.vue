<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
        <el-form-item>
          <el-input v-model="query.projectName" placeholder="产品名称" @keyup.enter.native="searchEnterFun"
                    size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="query.province" placeholder="地区" @keyup.enter.native="searchEnterFun"
                    size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="query.projectYear" placeholder="年度" size="small">
            <el-option
              v-for="item in years"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
          <el-button type="warning" @click="resetForm" size="small">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="foot-btn">
        <div class="foot-left">
          <el-button type="success" size="small" @click="insertWindow()">
            新增
          </el-button>
          <el-button size="small" @click="goBack()">
            返回
          </el-button>
        </div>
      </div>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          @sort-change="sortChange"
          border
          stripe>
          <el-table-column label="项目名" show-overflow-tooltip sortable="custom" prop="PROJECT_NAME">
            <template slot-scope="scope">
              <span>{{ scope.row.projectName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="年度" show-overflow-tooltip sortable="custom" prop="PROJECT_YEAR">
            <template slot-scope="scope">
              <span>{{ scope.row.projectYear }}</span>
            </template>
          </el-table-column>
          <el-table-column label="价格" header-align="left" align="right" sortable="custom" prop="PROJECT_PRICE">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.projectPrice) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否最低价" sortable="custom" prop="IS_MIN">
            <template slot-scope="scope">
              <span>{{ getStatus(scope.row.isMin) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否有效" sortable="custom" prop="ENABLE_FLAG">
            <template slot-scope="scope">
              <span>{{ getStatus(scope.row.enableFlag) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="地区" show-overflow-tooltip sortable="custom" prop="PROVINCE">
            <template slot-scope="scope">
              <span>{{ scope.row.province }}</span>
            </template>
          </el-table-column>
          <el-table-column label="执行日期" sortable="custom" prop="ZX_DATE">
            <template slot-scope="scope">
              <span>{{ scope.row.zxDate }}</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="160">
            <template slot-scope="scope">
              <div class="operates"><a class="operation-btn" @click="handleDelete(scope.row.id)">删除</a>
                <a class="operation-btn" @click="updateWindow(scope.row.id)">修改</a>
                <a class="operation-btn" @click="changeEnableFlag(scope.row.id,scope.row.enableFlag)">
                  {{scope.row.enableFlag == "0" ? "设为有效" : "设为无效"}}
                </a></div>
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
    <add-or-update v-if="addOrUpdateVisible" ref="AddOrUpdate" @refreshData="list"></add-or-update>
  </div>
</template>
<script>

  import {queryPriceByProductId} from 'src/axios/datacenter/authdata/nationalprice/nationPrice'
  import {updateEnableFlag} from 'src/axios/datacenter/authdata/nationalprice/nationPrice'
  import {del} from 'src/axios/datacenter/authdata/nationalprice/nationPrice'
  import {getPriceYears} from 'src/axios/datacenter/authdata/nationalprice/nationPrice'
  import {keyBoardEnter, priceFormat} from "src/utils";
  import AddOrUpdate from "./addOrUpdate";

  export default {
    components: {AddOrUpdate},
    data () {
      return {
        addOrUpdateVisible: false,
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
        years: []
      }
    },

    created(){
      this.id = this.$route.params.id || undefined;
      this.list();
      this.initYears();
    },

    methods: {
      priceFormat,

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

      list () {
        queryPriceByProductId(this.query, this.resData, this.id).then(res => {
          this.resData = res.data;
          if (this.resData.pageNum == 0) {
            this.resData.pageNum = 1
          }
        })
      },

      initYears(){
        getPriceYears(this.id).then(res => {
          this.years = res.data;
        })
      },

      changeEnableFlag(id, val){
        if (val === "0") {
          val = "1"
        } else {
          val = "0"
        }
        updateEnableFlag(val, id, this.id).then(res => {
          this.$message({
            message: res.data,
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.list()
            }
          })
        })
      },

      handleDelete(id) {
        this.$confirm('确定删除选中的数据吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          del(id, this.id).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.list()
              }
            })
          })
        }).catch(() => {
        });
      },

      getStatus(val){
        if (val == "0") {
          return "否"
        } else if (val == "1") {
          return "是"
        } else {
          return val;
        }
      },

      //重置
      resetForm() {
        this.query = this.metaQuery();
        this.list();
      },

      goBack() {
        this.$router.go(-1);
      },

      insertWindow() {
        this.addOrUpdateVisible = true;
        this.$nextTick(() => {
          this.$refs.AddOrUpdate.fillData("ADD", this.id);
        })
      },

      updateWindow(id) {
        this.addOrUpdateVisible = true;
        this.$nextTick(() => {
          this.$refs.AddOrUpdate.fillData("UPDATE", id);
        })
      },

      searchEnterFun (e) {
        this.resData.pageNum = 1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },

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
          province: "",
          projectName: "",
          projectYear: "",
          orderBy: null
        }
      },

      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val;
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val;
        this.list()
      }
    }
  }
</script>

