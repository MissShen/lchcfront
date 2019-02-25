<template>

  <!-- 表格 -->
  <div class="tablebox">
    <!--<el-tabs v-model="activeName" @tab-click="handleClick">-->
      <!--<el-tab-pane label="项目管理" name="first">-->
        <!-- 表格查询表单 -->
          <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
              <el-form-item>
                <el-input v-model="query.projectCode" placeholder="项目编码" @keyup.enter.native="searchEnterFun" size="small"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="query.projectName" placeholder="项目名称" @keyup.enter.native="searchEnterFun" size="small"></el-input>
              </el-form-item>
              <el-form-item>
                <el-select v-model="query.state" placeholder="全部" size="small">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
                <el-button type="warning" @click="restQuery" size="small">重置</el-button>
              </el-form-item>
          </el-form>

        <div class="foot-btn">
          <div class="foot-left">
            <router-link to="/AUDIT/sysManage/insertAudingManage">
              <el-button type="success" size="small">
                新增
              </el-button>
            </router-link>
          </div>

        </div>

        <div class="tableset">
          <el-table
            :data="resData.list"
            border
            stripe
            :row-key="getRowkeys"
            @selection-change="handleSelectionChange">
            <!--<el-table-column type="selection" width="50" :reserve-selection="true" align="center"></el-table-column>-->
            <!--<el-table-column label="序号" type="index" width="50"></el-table-column>-->
            <el-table-column label="项目编码" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.projectCode }}</span>
              </template>
            </el-table-column>
            <el-table-column label="项目名称" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.projectName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="项目状态">
              <template slot-scope="scope">
                <!--<span>{{ scope.row.state }}</span>-->
                <span>{{ scope.row.state==0?'未开始':(scope.row.state==1?'进行中':'已结束') }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="140px">
              <template slot-scope="scope">
                <div class="operates">
                  <span><a class="operation-btn" @click="handleView(scope.row.id)">查看</a></span>
                  <span v-if="scope.row.state== '0'"><a class="operation-btn" @click="handleModifyView(scope.row.id)">修改</a></span>
                  <span v-if="scope.row.state== '0'"><a class="operation-btn" @click="handleDelete(scope.row.id)">删除</a></span>
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
      <!--</el-tab-pane>-->
    <!--</el-tabs>-->
  </div>

</template>

<script>

  // 引入用户相关请求
  import {userAdd, userDel, userUpdate, userView} from 'src/axios/management/authority/sysUser'
  import {getProjectList,projectDel} from 'src/axios/auditchanges/systemManage/projectManage'
  import {keyBoardEnter} from "src/utils";

  export default {
    data() {
      return {
        // rules: this.metaRules(),
        resData: this.metaData(),
        activeName: '1',//标签页默认选中第一个
        // form: this.metaForm(), // 表单初始化
        query: this.metaQuery(), // 查询初始化
        // showForm: false, // 表单可见性初始化
        // showQuery: false, // 表单查询初始化
        // formStatus: 'add', // 表单状态 add
        // roleDialogVisible: false, // 角色对话框可见性 不可见
        // roleDialogLoading: false, // 角色加载状态   已加载
        // roleTree: [], // 角色分配树节点
        // defaultProps: {
        //   children: 'children',
        //   label: 'name',
        //   id: 'id'
        // },
        options: [{
          value: '3',
          label: '全部'
        }, {
          value: '0',
          label: '未开始'
        }, {
          value: '1',
          label: '进行中'
        }, {
          value: '2',
          label: '已结束'
        }]
      }
    },
    created() {
      if(!!this.$store.state.pageSeach.pageNum){
        this.query = this.$store.state.pageSeach;
        this.resData.pageSize = this.$store.state.pageSeach.pageSize;
        this.resData.pageNum = this.$store.state.pageSeach.pageNum;
      }
      this.$store.state.pageSeach=this.query;
      this.resData.pageSize = 10;
      this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData() {
        return {
          // resData: { // 前后台交互数据封装格式
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
            list:[],
          // }
        }
      },
      // metaForm() { // 表单数据初始化
      //   return {
      //     /*   form: {*/
      //     id: undefined,
      //     userCode: undefined,
      //     userName: undefined,
      //     password: '',
      //     pwd2: undefined,
      //     orgName: "1",
      //     orgId: "1",
      //     modifyId: "1",
      //     mobile: undefined,
      //     telephone: undefined,
      //     enableFlag: "1",
      //     userCaKey: "1",
      //     createId: "1",
      //     createName: "1",
      //     createDate: "1",
      //     modifyName: "1",
      //     modifyDate: "1",
      //     remark: undefined
      //
      //     /* }*/
      //   }
      // },
      // metaRules() {
      //   if (this.formStatus === 'add') {
      //     return {
      //       userCode: [
      //         {required: true, message: '登录名称不能为空', trigger: 'blur'},
      //         {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
      //       ],
      //       userName: [
      //         {required: true, message: '用户名称不能为空', trigger: 'blur'},
      //         {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
      //       ],
      //       password: [
      //         {required: true, message: '用户密码不能为空', trigger: 'blur'},
      //         {min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur'}
      //       ],
      //       pwd2: [
      //         {required: true, message: '确认密码不能为空', trigger: 'blur'},
      //         {min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur'}
      //       ]
      //     }
      //   } else {
      //     return {
      //       code: [
      //         {required: true, message: '登录名称不能为空', trigger: 'blur'},
      //         {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
      //       ],
      //       name: [
      //         {required: true, message: '用户名称不能为空', trigger: 'blur'},
      //         {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
      //       ]
      //     }
      //   }
      // },
      metaQuery() { // 表单查询数据初始化
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
      //查询并绑定回车事件
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      getRowkeys(row){
        return row.id;
      },
      //重置
      restQuery() {
        this.query = this.metaQuery();
        this.list();
      },
      // toggleQuery() {
      //   this.showQuery = !this.showQuery
      // },
      // toggleForm() {
      //   this.showForm = !this.showForm
      // },
      // closeForm() {
      //   this.$refs['form'].resetFields()
      //   this.toggleForm()
      // },
      //  获取用户分页列表
      list() {
        // console.log(this.query,'query')
        this.$store.state.pageSeach=this.query;
        getProjectList(this.resData,this.query).then(res => {
          if (res.success) {
              // console.log(res,'res............................');
              this.resData = res.data;
              // console.log(this.resData,'this.resData.list')
              // console.log(res.data,'res.data')
          }
        });
      },
      // // 重置用户表单
      // resetForm() {
      //   /*  this.$refs['form'].resetFields()*/
      //   this.form = this.metaForm()
      // },
      // // 提交用户表单
      // handleForm(form) {
      //   this.$refs[form].validate(valid => {
      //     if (valid) {
      //       this.toggleForm()
      //       if (!this.form.id) {
      //         userAdd(this.form).then(res => {
      //           this.list()
      //           this.$message({
      //             type: 'success',
      //             message: res.data
      //           })
      //         })
      //       }
      //       if (this.form.id) {
      //         userUpdate(this.form).then(res => {
      //           this.list()
      //           this.$message({
      //             type: 'info',
      //             message: res.data
      //           })
      //         })
      //       }
      //     } else {
      //       return false
      //     }
      //   })
      // },
      // // 打开用户新增页面
      // handleGoAdd() {
      //   this.resetForm()
      //   this.form = this.metaForm()
      //   this.showForm = true
      //   /*this.$refs['form'].resetFields()*/
      //   this.formStatus = 'add'
      //   this.rules = this.metaRules()
      // },
      // // 打开用户编辑页面
      // handleGoEdit(userName) {
      //   this.toggleForm()
      //   userView(userName).then(res => {
      //     this.resetForm()
      //     this.formStatus = 'edit'
      //     this.rules = this.metaRules()
      //     this.form = res.data
      //     this.form.password = null
      //     this.form.pwd2 = null
      //   })
      // },
      // 删除操作
      handleDelete(id) {
        this.$confirm('此操作将删除项目『' + id + '』, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          projectDel(id).then(res=>{
            // console.log(res)
            if(res.success){
              this.list()
            }else{
              this.$message({
                message:'删除失败',
                type:'error'
              })
            }
          })
        })
      },
      // 查看操作
      handleView(id){
        // console.log("查看");
        this.$router.push('projectView/'+id)
      },
      //用户修改
      handleModifyView(id){
        // console.log("修改")
        this.$router.push('projectUpdate/'+id)
      },
      // // 打开角色分配页面
      // handleGoRole(code) {
      //   this.roleDialogVisible = true
      //   this.roleDialogLoading = true
      //   roleList(code).then(res => {
      //     this.$refs.roleTree.setCheckedNodes(res.data)
      //     this.roleDialogLoading = false
      //   })
      // },
      // //  保存用户角色
      // handleSaveRole() {
      //   roleSave(this.$refs.roleTree.getCheckedKeys(), this.operateCode).then(res => {
      //     this.$message({
      //       type: 'success',
      //       message: res.data
      //     })
      //     this.list()
      //     this.dialogVisible = false
      //   })
      // },
      // ************************
      handleSizeChange(val) {
        this.$store.state.pageSeach.pageSize = val;
        this.resData.pageSize = val;
        this.list()
      },
      //记录所选择的对象
      handleSelectionChange(val) {
        //val 所选对象
      },
      handleCurrentChange(val) {
        this.$store.state.pageSeach.pageNum = val;
        this.resData.pageNum = val;
        this.list()
      }
    }
  }
</script>
