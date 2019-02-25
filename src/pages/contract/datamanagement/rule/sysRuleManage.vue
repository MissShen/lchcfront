<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">

      <div class="table-caption">
        <el-button type="primary" size="small" @click="handleGoAdd">
          增加规则
        </el-button>
      </div>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe>
          <el-table-column label="序号" type="index" width="50"></el-table-column>
          <el-table-column label="项目名称">
            <template slot-scope="scope">
              <span>{{ scope.row.aa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="规则内容">
            <template slot-scope="scope">
              <span>{{ scope.row.aa }}</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
          >
            <template slot-scope="scope">
              <a class="operation-btn">修改</a>
              <a class="operation-btn">删除</a>
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
      <!--角色分配对话框-->
      <el-dialog title="规则字典列表" :visible.sync="roleDialogVisible" width="30%" :before-close="closeForm">
        <el-scrollbar tag="div">
          <el-tree
            :data="roleTree"
            ref="roleTree"
            show-checkbox
            node-key="id"
            highlight-current
            v-loading="roleDialogLoading"
            :props="defaultProps"
          >
          </el-tree>
        </el-scrollbar>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleSaveRole">确定</el-button>
          <el-button @click="roleDialogVisible = false">关闭</el-button>
        </span>
      </el-dialog>

      <!--用户表单对话框-->
      <el-dialog top="2vh" :visible.sync="showForm" :before-close="closeForm">
        <div style="width: 500px">
          <el-form ref="form" :model="form" :rules="rules" label-width="300px">
            <el-form-item label="规则字典列表" prop="userName">
              <template>
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                  <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                </el-checkbox-group>
              </template>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer">
          <el-button type="primary" @click="handleForm('form')">确定</el-button>
          <el-button @click="closeForm">关闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>

  // 引入用户相关请求
  import {selectSysRuleList} from 'src/axios/contract/datamanagement/rule/sysRule'
  //多选框赋值
  const cityOptions = ['价格', '产品'];
  export default {

    data () {
      return {
        rules: this.metaRules(),
        resData: this.metaData(),
        form: this.metaForm(), // 表单初始化
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        formStatus: 'add', // 表单状态 add
        roleDialogVisible: false, // 角色对话框可见性 不可见
        roleDialogLoading: false, // 角色加载状态   已加载
        roleTree: [], // 角色分配树节点
        //-----多选框----
        checkAll: true,
        checkedCities: ['价格', '产品'],
        cities: cityOptions,
        isIndeterminate: true,
        //------多选框end-----
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        } ,
      }
    },
    created () {
      this.list()
    },
    methods: {
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
      metaForm () { // 表单数据初始化
        return {
          /*   form: {*/
          id: undefined,
          userCode:undefined,
          userName:undefined,
          password:'',
          pwd2: undefined,
          orgName:"1",
          orgId:"1",
          modifyId:"1",
          mobile:undefined,
          telephone:undefined,
          enableFlag:"1",
          userCaKey:"1",
          createId:"1",
          createName:"1",
          createDate:"1",
          modifyName:"1",
          modifyDate:"1",
          remark:undefined
          /* }*/
        }
      },
      metaRules () {
        if (this.formStatus === 'add') {
          return {
            userCode: [
              {required: true, message: '请选择约束条件', trigger: 'blur'}
            ]
          }
        } else {
          return {
            userCode: [
              {required: true, message: '请选择约束条件', trigger: 'blur'}
            ]
          }
        }
      },
      metaQuery () { // 表单查询数据初始化
        return {
          query: {
            id: undefined,
            code: undefined,
            name: undefined,
            beginDate: undefined,
            endDate: undefined
          }
        }
      },
      //多选框-全选方法
      handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      toggleQuery () {
        this.showQuery = !this.showQuery
      },
      toggleForm () {
        this.showForm = !this.showForm
      },
      closeForm () {
        this.$refs['form'].resetFields()
        this.toggleForm()
      },
      //  获取用户分页列表
      list () {
        selectSysRuleList(this.resData, this.query).then(res => {
          console.log(res);
          this.resData = res.data
          if(this.resData.pageNum === 0){
            this.resData.pageNum=1;
          }
        })
      },
      // 重置用户表单
      resetForm () {
        /*  this.$refs['form'].resetFields()*/
        this.form = this.metaForm()
      },
      // 提交用户表单
      handleForm (form) {
        this.$refs[form].validate(valid => {
          if (valid) {
            this.toggleForm()
            if (!this.form.id) {
              templateTypeAdd(this.form).then(res => {
                this.list()
                this.$message({
                  type: 'success',
                  message: res.data
                })
              })
            }
            if (this.form.id) {
              userUpdate(this.form).then(res => {
                this.list()
                this.$message({
                  type: 'info',
                  message: res.data
                })
              })
            }
          } else {
            return false
          }
        })
      },
      // 打开用户新增页面
      handleGoAdd () {
        this.resetForm()
        this.form = this.metaForm()
        this.showForm = true
        /*this.$refs['form'].resetFields()*/
        this.formStatus = 'add'
        this.rules = this.metaRules()
      },
      // 打开用户编辑页面
      handleGoEdit (userName) {
        this.toggleForm()
        userView(userName).then(res => {
          this.resetForm()
          this.formStatus = 'edit'
          this.rules = this.metaRules()
          this.form = res.data
          this.form.password = null
          this.form.pwd2 = null
        })
      },
      // 处理用户删除
      handleDelete (id) {
        this.$confirm('此操作将删除用户『' + id + '』, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          userDel(id).then(res => {
            this.$message({
              type: 'success',
              message: res.data
            })
            this.list()
          })
        })
      },
      // 打开规则字典列表
      handleGoRole (code) {
        this.roleDialogVisible = true
        this.roleDialogLoading = true
        selectSysRuleList(code).then(res => {
          this.$refs.roleTree.setCheckedNodes(res.data)
          this.roleDialogLoading = false
        })
      },
      //  保存用户角色
      handleSaveRole () {
        roleSave(this.$refs.roleTree.getCheckedKeys(), this.operateCode).then(res => {
          this.$message({
            type: 'success',
            message: res.data
          })
          this.list()
          this.dialogVisible = false
        })
      },
      // ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      }
    }
  }
</script>
