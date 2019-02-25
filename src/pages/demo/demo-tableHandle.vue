<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tabs-panel">
      <span class="active">用户管理</span>
    </div>
    <!-- 表格 -->
    <div class="tablebox">

      <!-- 表格查询表单 -->
      <div class="table-form">
        <el-form ref="query" :model="query" size="small" :inline="true">
            <el-form-item>
              <span>
                <el-date-picker type="date" placeholder="创建开始日期" v-model="query.beginDate"></el-date-picker>
              </span>
              <span>到</span>
              <span>
                <el-date-picker type="date" placeholder="创建结束日期" v-model="query.endDate"></el-date-picker>
              </span>
            </el-form-item>
            <el-form-item>
              <el-input v-model="query.name" placeholder="用户名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="warning">查询</el-button>
              <el-button type="primary">重置</el-button>
            </el-form-item>
        </el-form>
      </div>

      <div class="table-caption">
        <el-button type="primary" size="small" @click="handleGoAdd">
          新增
        </el-button>
      </div>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table :data="resData.list" border stripe>
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column label="登录账号">
            <template slot-scope="scope">
              <a href="javascript:;" @click="handleGoEdit(scope.row.userName)">{{ scope.row.userCode }}</a>
            </template>
          </el-table-column>
          <el-table-column label="用户名称">
            <template slot-scope="scope">
              <span>{{ scope.row.userName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="账号类型" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.orgName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="角色" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.modifyName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="机构性质" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.enableFlag }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建日期" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate }}</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="160">
            <template slot-scope="scope">
              <el-button @click="handleGoEdit(scope.row.id)" type="text" size="small">编辑</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="handleDelete(scope.row.id, scope.row.userName)">删除</el-button>
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
      <!-- 弹窗：新增/编辑 -->
      <el-dialog :title="this.formStatus === 'add' ? '新增' : '修改'"
        top="2vh" :visible.sync="showForm" :before-close="handleClose">
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
          <el-button type="danger" v-if="formStatus==='add'" @click="resetForm('form')">重置</el-button>
          <el-button @click="handleClose">关闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>

  // 引入用户相关请求
  import {userView, userList, userSave, userUpdate, userDel} from 'src/axios/management/authority/sysUser'

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
        }
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
            userCode: [
              {required: true, message: '登录名称不能为空', trigger: 'blur'},
              {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
            ],
            userName: [
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
      //  获取用户分页列表
      list () {
        userList(this.resData, this.query).then(res => {
          this.resData = res.data
          if(this.resData.pageNum===0){
            this.resData.pageNum=1
          }
        })
      },
      // 重置用户表单
      resetForm(formName) {
        if (this.$refs[formName]!==undefined) {
          this.$refs[formName].resetFields();
        }
      },
      // 提交用户表单
      handleForm (form) {
        this.$refs[form].validate(valid => {
          if (valid) {
            this.toggleForm();
            if (!this.form.id) {
              userSave(this.form).then(res => {
                this.list();
                this.$message({
                  type: 'success',
                  message: res.data
                })
              })
            }
            if (this.form.id) {
              userUpdate(this.form).then(res => {
                this.list();
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
      // 关闭弹窗
      handleClose(done) {
        this.$refs['form'].resetFields();
        this.toggleForm();
      },
      // 打开用户新增页面
      handleGoAdd () {
        this.form = this.metaForm();
        this.showForm = true;
        this.formStatus = 'add';
        this.rules = this.metaRules();
        this.$nextTick(function(){
          this.resetForm('form'); // 重置表单，清除验证提示
        });
      },
      // 打开用户编辑页面
      handleGoEdit (userId) {
        userView(userId).then(res => {
          this.showForm = true;
          this.formStatus = 'edit';
          this.rules = this.metaRules();
          this.form = res.data;
          this.form.password = '';
          this.form.pwd2 = '';
        })
      },
      // 处理用户删除
      handleDelete (id, userName) {
        this.$confirm('此操作将删除用户『' + userName + '』, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          userDel(id).then(res => {
            this.$message({
              type: 'success',
              message: res.data
            })
            this.list();
          })
        })
      },
      // ************************
      handleSizeChange (val) {
        this.resData.pageSize = val;
        this.list();
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val;
        this.list();
      }
    }
  }
</script>

