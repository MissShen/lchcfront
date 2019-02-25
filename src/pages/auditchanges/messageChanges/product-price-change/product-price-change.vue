<template>
  <!-- 表格 -->
  <div class="tablebox">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="项目管理" name="first">
    <!-- 表格查询表单 -->
    <div class="table-form">
      <el-form ref="query" :model="query" label-position="right" size="small">
        <el-row :gutter="24">
          <el-col :span="3">
            <el-form-item>
              <el-input v-model="query.name" placeholder="申报号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-input v-model="query.name" placeholder="产品名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-input v-model="query.name" placeholder="剂型"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-input v-model="query.name" placeholder="规格"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-input v-model="query.name" placeholder="生产企业"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-select v-model="query.projectId" placeholder="全部">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-button type="warning" plain>查询</el-button>
              <el-button type="primary" plain>重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="table-caption">
      <el-button type="primary" plain size="small" @click="handleGoAdd">
        新增产品价格变更
      </el-button>
      <el-button type="primary" plain size="small" @click="handleGoAdd">
        提交
      </el-button>
    </div>

    <div class="tableset">
      <el-table
        :data="resData.list"
        border
        stripe>
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column label="申报号">
          <template slot-scope="scope">
          </template>
        </el-table-column>
        <el-table-column label="产品名称">
          <template slot-scope="scope">
          </template>
        </el-table-column>
        <el-table-column label="商品名">
          <template slot-scope="scope">
          </template>
        </el-table-column>
        <el-table-column label="剂型">
          <template slot-scope="scope">
          </template>
        </el-table-column>
        <el-table-column label="规格">
          <template slot-scope="scope">
          </template>
        </el-table-column>
        <el-table-column label="转换比">
          <template slot-scope="scope">
          </template>
        </el-table-column>
        <el-table-column label="单位">
          <template slot-scope="scope">
          </template>
        </el-table-column>
        <el-table-column label="包材">
          <template slot-scope="scope">
          </template>
        </el-table-column>
        <el-table-column label="生产企业">
          <template slot-scope="scope">
          </template>
        </el-table-column>
        <el-table-column label="当前状态">
          <template slot-scope="scope">
          </template>
        </el-table-column>
        <el-table-column label="审核结果">
          <template slot-scope="scope">
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
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
      </el-tab-pane>
    </el-tabs>
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
        activeName: 'first',//标签页默认选中第一个
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
          value:'选项1',
          label:'全部'
        },{
          value:'选项2',
          label:'未提交'
        },{
          value:'选项3',
          label:'提交'
        },{
          value:'选项4',
          label:'受理'
        },{
          value:'选项5',
          label:'公示'
        },{
          value:'选项6',
          label:'审核'
        },{
          value:'选项7',
          label:'确认'
        },{
          value:'选项8',
          label:'挂网'
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
            pageNum: 1,
            pageSize: 20,
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

<style scoped>

</style>
