


<template>

  <!-- 表格 -->
  <div class="tablebox">
    <el-tabs v-model="activeName" @tab-click="handleClick">

      <!-- 表格查询表单 -->


      <div class="tableset">

        <el-table :data="resData.list" border stripe>
          <el-table-column label="序号" type="index" width="50"></el-table-column>

          <el-table-column label="批次名称">
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="批次数量">
            <template slot-scope="scope">
              <el-button type="text" size="small">{{ scope.row.upTypeId }}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="审核员分配情况">
            <template slot-scope="scope">
              <el-button type="text" size="small">{{ scope.row.inOrgName }}</el-button>

            </template>
          </el-table-column>
          <el-table-column label="当前状态">
            <template slot-scope="scope">
              <span>{{ scope.row.outOrgName }}</span>
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

    </el-tabs>
  </div>

</template>

<script>
  import {messageList} from 'src/axios/auditchanges/messageChanges/messageChanges'
  // 引入用户相关请求
  import {userAdd, userDel, userUpdate, userView} from 'src/axios/management/authority/sysUser'

  export default {
    //初始化函数
    name: "to-review-data",

    data() {
      return {
        rules: this.metaRules(),
        resData: this.metaData(),
        activeName: 'first',//标签页默认选中第一个
        form: this.metaForm(), // 表单初始化
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        formStatus: 'add', // 表单状态 add
        roleDialogVisible: false, // 角色对话框可见性 不可见
        roleDialogLoading: false, // 角色加载状态   已加载
        roleTree: [], // 角色分配树节点
        value6: '',
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        options: [{
          value: '选项1',
          label: '全部'
        }, {
          value: '选项2',
          label: '国内生产企业转产并购'
        }, {
          value: '选项3',
          label: '进口药品转国产'
        }, {
          value: '选项4',
          label: '进口产品转国内分装'
        }, {
          value: '选项5',
          label: '进口产品代理商更新'
        }]
      }
    },
    //初始化函数
    created() {
      //初始化列表
      // this.select()
    },
    methods: {
      //条件查询
      select() {
        // alert(1);
        var selectQuery = this.query;
        // alert(selectQuery.Id);
        var resData = this.resData;
        if (resData.pageSize == undefined || resData.pageSize == "") {
          resData.pageSize = 10;
        }
        if (resData.pageNum == undefined || resData.pageNum == "") {
          resData.pageNum = 1;
        }
        messageList(resData, selectQuery).then(res => {
          this.resData = res.data
        });
      },
      //清空查询表单
      remove() {
        // 获取查询列表
        var selectQuery = this.query;
        //清空
        selectQuery.Id = undefined;
        selectQuery.UpTypeId = undefined;
        select();
      },
      //跳转到确认页面
      //参数准出id ：id；转出公司名称:inOrgName ；转入公司名称 ：outOrgName
      gotoConfirmPage(id, inOrgName, outOrgName) {
        this.$router.push("/messageChanges/productRollOutVerifyConfirm/" + id + "/" + inOrgName + "/" + outOrgName);
      },
      gotoDetailedPage(id, inOrgName, outOrgName) {
        this.$router.push("/messageChanges/productRollOutVerifyDetailed/" + id + "/" + inOrgName + "/" + outOrgName);
      },


      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData() {
        return {
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
          list: []
        }
      },
      metaForm() { // 表单数据初始化
        return {
          /*   form: {*/
          id: undefined,
          userCode: undefined,
          userName: undefined,
          password: '',
          pwd2: undefined,
          orgName: "1",
          orgId: "1",
          modifyId: "1",
          mobile: undefined,
          telephone: undefined,
          enableFlag: "1",
          userCaKey: "1",
          createId: "1",
          createName: "1",
          createDate: "1",
          modifyName: "1",
          modifyDate: "1",
          remark: undefined

          /* }*/
        }
      },
      metaRules() {
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
      metaQuery() { // 表单查询数据初始化
        return {
          query: {
            Id: undefined,
            UpTypeId: undefined
          }
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      toggleQuery() {
        this.showQuery = !this.showQuery
      },
      toggleForm() {
        this.showForm = !this.showForm
      },
      closeForm() {
        this.$refs['form'].resetFields()
        this.toggleForm()
      },
      // 重置用户表单
      resetForm() {
        /*  this.$refs['form'].resetFields()*/
        this.form = this.metaForm()
      },
      // 提交用户表单
      handleForm(form) {
        this.$refs[form].validate(valid => {
          if (valid) {
            this.toggleForm()
            if (!this.form.id) {
              userAdd(this.form).then(res => {
                this.select()
                this.$message({
                  type: 'success',
                  message: res.data
                })
              })
            }
            if (this.form.id) {
              userUpdate(this.form).then(res => {
                this.select()
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
      handleGoAdd() {
        this.resetForm()
        this.form = this.metaForm()
        this.showForm = true
        /*this.$refs['form'].resetFields()*/
        this.formStatus = 'add'
        this.rules = this.metaRules()
      },
      // 打开用户编辑页面
      handleGoEdit(userName) {
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
      handleDelete(id) {
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
            this.select()
          })
        })
      },
      // 打开角色分配页面
      handleGoRole(code) {
        this.roleDialogVisible = true
        this.roleDialogLoading = true
        roleList(code).then(res => {
          this.$refs.roleTree.setCheckedNodes(res.data)
          this.roleDialogLoading = false
        })
      },
      //  保存用户角色
      handleSaveRole() {
        roleSave(this.$refs.roleTree.getCheckedKeys(), this.operateCode).then(res => {
          this.$message({
            type: 'success',
            message: res.data
          })
          this.select()
          this.dialogVisible = false
        })
      },
      // ************************
      handleSizeChange(val) {
        this.resData.pageSize = val
        this.select()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val
        this.select()
      }
    }
  }
</script>

<style scoped>

</style>
