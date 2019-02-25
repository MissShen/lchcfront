<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tabs-panel">
      <span class="active">选择配送企业</span>
    </div>
    <!-- 表格 -->
    <div class="tablebox">
      <div>
        <el-form ref="query" :model="query" size="small" :inline="true" class="table-form">
          <el-form-item>
            <el-input v-model="query.name" placeholder="企业名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" size="small">查询</el-button>
            <el-button type="warning" size="small">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe>
          <el-table-column label="首选配送">
            <template slot-scope="scope">
              <span>{{ scope.row.userCode }}</span>
            </template>
          </el-table-column>
          <el-table-column label="选择配送">
            <template slot-scope="scope">
              <span>{{ scope.row.userName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="合同已选">
            <template slot-scope="scope">
              <span>{{ scope.row.orgName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="配送企业">
            <template slot-scope="scope">
              <span>{{ scope.row.modifyName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否签订两票制">
            <template slot-scope="scope">
              <span>{{ scope.row.enableFlag }}</span>
            </template>
          </el-table-column>
          <el-table-column label="电话">
            <template slot-scope="scope">
              <span>{{ scope.row.enableFlag }}</span>
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

      <el-button type="primary" size="small" @click="handleGoAdd">预生成</el-button>

      <!--  ====================================== 弹窗 ====================================== -->
      <!--角色分配对话框-->
      <el-dialog title="角色分配" :visible.sync="roleDialogVisible" width="30%">
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

          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="用户名称" prop="userName">
              <el-input v-model="form.userName"></el-input>
            </el-form-item>
            <el-form-item label="登录名称" prop="userCode">
              <el-input v-model="form.userCode"></el-input>
            </el-form-item>
            <el-form-item label="初始密码" prop="password">
              <el-input v-model="form.password" ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="pwd2">
              <el-input v-model="form.pwd2"></el-input>
            </el-form-item>
            <el-form-item label="所属机构" prop="orgId">
              <el-input v-model="form.orgId"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="telephone">
              <el-input v-model="form.telephone"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
              <el-input v-model="form.mobile"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="remark">
              <el-input type="textarea" v-model="form.remark"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer">
          <el-button type="primary" @click="handleForm('form')">保存</el-button>
          <el-button type="danger" v-if="formStatus==='add'" @click="resetForm">重置</el-button>
          <el-button @click="closeForm">关闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>

  // 引入用户相关请求
  import {userView, userList, userAdd, userUpdate, userDel} from 'src/axios/management/authority/sysUser'

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
        },
        options:[{
          value: '1',
          label: '非基药'
        },{
          value: '2',
          label: '国家基药'
        },{
          value: '3',
          label: '湖南增补'
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
              {required: true, message: '登录名称不能为空', trigger: 'blur'},
              {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
            ],
            userName: [
              {required: true, message: '用户名称不能为空', trigger: 'blur'},
              {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
            ],
            password: [
              {required: true, message: '用户密码不能为空', trigger: 'blur'},
              {min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur'}
            ],
            pwd2: [
              {required: true, message: '确认密码不能为空', trigger: 'blur'},
              {min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur'}
            ]
          }
        } else {
          return {
            code: [
              {required: true, message: '登录名称不能为空', trigger: 'blur'},
              {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
            ],
            name: [
              {required: true, message: '用户名称不能为空', trigger: 'blur'},
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
        userList(this.resData, this.query).then(res => {
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
              userAdd(this.form).then(res => {
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
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      }
    }
  }
</script>

