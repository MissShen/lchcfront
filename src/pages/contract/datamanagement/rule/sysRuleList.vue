<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" :inline="true" class="table-form">
            <el-form-item>
              <el-input size="small" v-model="query.ruleName" placeholder="规则名称" maxlength="30" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" size="small" @click="searchEnterFun">查询</el-button>
              <el-button type="warning" size="small" @click="resetForm()">重置</el-button>
            </el-form-item>
        </el-form>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe
          @selection-change="handleSelectionChange"
          @sort-change="sortChange">
          <el-table-column label="规则名称" prop="rule_Name" sortable="custom">
            <template slot-scope="scope">
              {{ scope.row.ruleName }}
            </template>
          </el-table-column>
          <el-table-column label="规则编码" prop="rule_Code" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.ruleCode }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <div class="operates">
                <a class="green" @click="handleGoEdit(scope.row)">修改</a>
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

      <!--  ====================================== 弹窗 ====================================== -->
      <!--规则维护对话框-->
      <el-dialog top="2vh" width="30%" :visible.sync="showForm" :before-close="closeForm">
        <div style="width: 300px">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="规则名称：" prop="ruleName">
              <el-input v-model="ruleForm.ruleName" placeholder="请输入规则名称" size="small" maxlength="30"></el-input>
            </el-form-item>

            <el-form-item label="规则编码：" prop="ruleCode">
              <el-input v-model="ruleForm.ruleCode" placeholder="请输入规则编码" :readonly="true" size="small"></el-input>
            </el-form-item>
            <!--<el-form-item>
              <el-button type="primary" @click="ruleFormSubmit()">提交</el-button>
              <el-button @click="goBack()">返回</el-button>
            </el-form-item>-->
          </el-form>
        </div>
        <span slot="footer">
          <el-button size="small" type="primary" @click="ruleFormSubmit('ruleForm')">确定</el-button>
          <el-button size="small" @click="closeForm">关闭</el-button>
        </span>
      </el-dialog>

    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求  引自js文件
  import {selectSysRuleList,updateRuleName} from 'src/axios/contract/datamanagement/rule/sysRule'
  import { keyBoardEnter } from "src/utils"

  export default {
    data() {
      return {
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        currentOrder:undefined, //分页的时候缓存
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        ruleForm: {
          id:'',
          ruleName: '',
          ruleCode: ''
        },
        rules:{
          ruleName:{ required: true, message: '请输入规则名称', trigger: 'blur'},
          ruleCode:{ required: true, message: '请输入规则编码', trigger: 'blur'}

        }
      }
    },
    created() {
      this.list()
    },
    methods: {

      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData() {
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
      metaQuery() { // 表单查询数据初始化
        return {
          query: {
            id: undefined,
            ruleName: undefined
          }
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      resetForm(){
        this.query = this.metaQuery();
        this.list();
      },
      toggleQuery() {
        this.showQuery = !this.showQuery
      },
      toggleForm() {
        this.toggleQuery();
      },
     closeForm () {
       this.$refs['ruleForm'].resetFields();
       this.showForm = !this.showForm;
     },
      //  获取用户分页列表

      list() {
        this.resData.orderBy=this.currentOrder;
        selectSysRuleList(this.resData, this.query).then(res => {
          this.resData = res.data
          if (this.resData.pageNum === 0) {
            this.resData.pageNum = 1;
          }
        })
      },
      // 打开规则字典编辑页面
      handleGoEdit(row) {
        this.showForm = !this.showForm;
        // this.$router.push("/contract/datamanagement/dataManagementUpdSysRule/" + id)
        this.ruleForm = {id: row.id,ruleName: row.ruleName, ruleCode: row.ruleCode};
      },
      ruleFormSubmit() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.showForm = !this.showForm;
            updateRuleName(this.ruleForm).then(res => {
              this.$message({
                type: res.success ? 'success' : 'error',
                message: res.success ? '修改成功' : res.message,
                onClose: () => {
                  this.list();
                }
              })
            })
          }
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
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
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

