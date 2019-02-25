<template>
  <!-- 表格 -->
  <div class="tablebox">
    <div class="tabs-panel">
      <span class="active">产品列表</span>
    </div>
    <!-- 表格查询表单 -->
    <div class="table-form">
      <el-form :model="dataForm" label-position="right" size="small">
        <el-row :gutter="24">
          <el-col :span="5">
            <el-form-item>
              <el-form-item>
                <el-input v-model="dataForm.product" placeholder="产品名称"></el-input>
              </el-form-item>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item>
              <el-form-item>
                <el-input v-model="dataForm.dosageForm" placeholder="剂型"></el-input>
              </el-form-item>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item>
              <el-form-item>
                <el-input v-model="dataForm.spec" placeholder="规格"></el-input>
              </el-form-item>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item>
              <el-input v-model="dataForm.org" placeholder="生产企业"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <el-form-item>
              <el-button type="warning" @click="handleQuery">查询</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item>
              <el-button type="primary" @click="restQuery">重置</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item>
              <el-button @click="handleView('0')" type="text" size="small">选择</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 表格列表 -->
    <div class="tableset">
      <el-table
        :data="resData.list"
        border
        stripe
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column label="产品名称">
          <template slot-scope="scope">
            <span>{{ scope.row.catProjectId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品名">
          <template slot-scope="scope">
            <span>{{ scope.row.catProjectId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="剂型">
          <template slot-scope="scope">
            <span>{{ scope.row.catProjectId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="规格">
          <template slot-scope="scope">
            <span>{{ scope.row.catProjectId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="转换比">
          <template slot-scope="scope">
            <span>{{ scope.row.catProjectId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="单位">
          <template slot-scope="scope">
            <span>{{ scope.row.catProjectId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="包材">
          <template slot-scope="scope">
            <span>{{ scope.row.catProjectId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="生产企业">
          <template slot-scope="scope">
            <span>{{ scope.row.categoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleView(scope.row.id)" type="text" size="small">选择</el-button>
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
    <go-doubt ref="goDoubt"></go-doubt>
  </div>
</template>
<script>
import goDoubt from './doubt'
  // 引入用户相关请求
  export default {
    components: {
      goDoubt
    },
    data () {
      return {
        resData: this.metaData(),
        showForm: this.metaForm(), // 表单初始化
        dataForm: this.metaQuery(), // 查询初始化
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        }
      }
    },
    created () {
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {
          resData: { // 前后台交互数据封装格式
            pageNum: 0,
            pageSize: 20,
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
        }
      },
      metaForm () { // 表单数据初始化
        return {
        }
      },
      metaQuery () { // 表单查询数据初始化
        return {
          dataForm: {
            prodcut: undefined,
            dosage: undefined,
            spec: undefined,
            org:undefined
          }
        }
      },
      //  获取用户分页列表
      list() {
        //查询产品列表
      },
      // ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      },
      handleQuery(){
        this.list()
      },
      restQuery(){
        this.query=this.metaQuery()
      },
      handleSelectionChange(val){
        //val 所选对象
      },
      handleView(id) {
        this.$nextTick(() => {
          this.$refs.goDoubt.list(id,false);
        })
      }
    }
  }
</script>
