<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tabs-panel">
      <span class="active">专家库</span>
    </div>
    <!-- 表格 -->
    <div class="tablebox">

      <!-- 表格查询表单 -->
      <div class="table-form">
        <el-form ref="query" :model="query" size="small" :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="query.aa" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="query.aa" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="warning">查询</el-button>
            <el-button type="primary">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="table-caption">
        <el-button type="primary" @click="handleFromView('0')">
          新增
        </el-button>
        <el-button>
          删除
        </el-button>
      </div>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          :default-sort = "{prop: '用户名',prop: '姓名',prop: '单位',prop: '学科',prop: '类别',
                            prop: '性别',prop: '年龄',prop: '身份证号',prop: '联系电话',
                            prop: '邮箱',prop: '启用状态',order: 'descending'}"
          border
          stripe>
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column type="index" width="50" label="序号"></el-table-column>
          <el-table-column prop="用户名" sortable label="用户名">
            <template slot-scope="scope">
              <a href="javascript:;" @click="handleGoEdit(scope.row.aa)">{{ scope.row.aa }}</a>
            </template>
          </el-table-column>
          <el-table-column prop="姓名" sortable label="姓名">
            <template slot-scope="scope">
              <span>{{ scope.row.aa }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="单位" sortable label="单位">
            <template slot-scope="scope">
              <span>{{ scope.row.aa }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="学科" sortable label="学科">
            <template slot-scope="scope">
              <span>{{ scope.row.aa }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="类别" sortable label="类别">
            <template slot-scope="scope">
              <span>{{ scope.row.aa }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="性别" sortable label="性别">
            <template slot-scope="scope">
              <span>{{ scope.row.aa }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="年龄" sortable label="年龄">
            <template slot-scope="scope">
              <span>{{ scope.row.aa }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="身份证号" sortable label="身份证号">
            <template slot-scope="scope">
              <span>{{ scope.row.aa }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="联系电话" sortable label="联系电话">
            <template slot-scope="scope">
              <span>{{ scope.row.aa }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="邮箱" sortable label="邮箱">
            <template slot-scope="scope">
              <span>{{ scope.row.aa }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="启用状态" sortable
            fixed="right"
            label="启用状态"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleGoRole(scope.row.aa)">启用</el-button>
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
  </div>
</template>
<script>
  // 引入用户相关请求
  import {selectExpertDatabaseList} from 'src/axios/select/controlcenter/expertdatabase/expertDatabase'
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
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        } ,
        options:[{
          value:'选项1',
          label:'全部'
        },{
          value:'选项2',
          label:'未审核'
        }]
      }
    },

    created () {
      this.list()
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
              {required: true, message: '必填项不能为空', trigger: 'blur'},
              {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
            ],
            userName: [
              {required: true, message: '必填项不能为空', trigger: 'blur'},
              {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
            ]
          }
        } else {
          return {
            userCode: [
              {required: true, message: '强填写模板名称', trigger: 'blur'},
              {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
            ],
            name: [
              {required: true, message: '请选择签约方式', trigger: 'blur'},
              {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
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
        selectExpertDatabaseList(this.resData, this.query).then(res => {
          console.log(res);
          this.resData = res.data
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
      // 打开角色分配页面
      handleGoRole (code) {
        this.roleDialogVisible = true
        this.roleDialogLoading = true
        roleList(code).then(res => {
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
      handleFromView(id) {
        this.$router.push("/select/control/expertManagementExpertAdd/" + id)
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      }
    }
  }
</script>
<style scoped>

</style>
