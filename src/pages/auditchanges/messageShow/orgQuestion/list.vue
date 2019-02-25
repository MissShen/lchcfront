<template>
  <div>
    <div class="tabs-panel">
      <span class="active">挂网企业信息质疑</span>
    </div>
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <div class="table-form">
        <el-form ref="query" :model="query" label-position="right" size="small">
          <el-row :gutter="24">
            <el-col :span="3">
              <el-form-item>
                <el-input v-model="query.name" placeholder="企业名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item>
                <el-input v-model="query.name" placeholder="社会统一信用代码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item>
                <el-input v-model="query.name" placeholder="组织机构代码"></el-input>
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

      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column label="企业名称">
            <template slot-scope="scope">
            </template>
          </el-table-column>
          <el-table-column label="企业简称">
            <template slot-scope="scope">
            </template>
          </el-table-column>
          <el-table-column label="社会统一信用代码">
            <template slot-scope="scope">
            </template>
          </el-table-column>
          <el-table-column label="组织机构代码">
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

      <!--  ====================================== 弹窗 ====================================== -->
      <!-- 企业申报信息公示 -->
      <el-dialog top="2vh" title="挂网企业信息质疑详情" width="80%" :visible.sync="showForm" :before-close="closeForm">
        <el-form ref="form" :model="form" label-position="right" size="small" label-width="100px">
          <el-form-item label="企业名称">
            华润普仁鸿(北京)医药有限公司
            <a href="javascript:;" @click="handleGoDetail()">查看企业信息</a>
          </el-form-item>
          <el-form-item label="质疑时间">
            2018-2-14 14:48
          </el-form-item>
          <el-form-item label="质疑内容">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget odio.
          </el-form-item>
          <el-form-item label="回复时间">
            2018-2-14 14:48
          </el-form-item>
          <el-form-item label="回复内容">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget odio.
          </el-form-item>
        </el-form>
        <span slot="footer">
          <el-button type="primary" @click="handleForm('form')">保存</el-button>
          <el-button type="danger" v-if="formStatus==='add'" @click="resetForm">重置</el-button>
          <el-button @click="closeForm">关闭</el-button>
        </span>
        <el-dialog top="2vh" title="企业信息" width="80%" :visible.sync="detail" :before-close="closeDetail" append-to-body>
          <info ref="info"></info>
          <span slot="footer">
          <el-button type="danger" v-if="formStatus==='add'" @click="resetForm">重置</el-button>
          <el-button @click="closeForm">关闭</el-button>
        </span>
        </el-dialog>
      </el-dialog>
    </div>
  </div>
</template>

<script>

  // 引入用户相关请求
  import {userView, userList, userAdd, userUpdate, userDel} from 'src/axios/management/authority/sysUser'
  import info from 'src/pages/auditchanges/common/enterprise/info'

  export default {
    components: {
      info
    },
    data () {
      return {
        rules: this.metaRules(),
        resData: this.metaData(),
        form: this.metaForm(), // 表单初始化
        query: this.metaQuery(), // 查询初始化
        activeName: 'first',//标签页默认选中第一个
        showForm: false, // 表单可见性初始化
        detail: false, //
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
      this.list();
      this.handleGoAudit();
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
      closeDetail() {
        this.detail = false;
      },
      closeForm () {
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
                this.declarelist()
                this.$message({
                  type: 'success',
                  message: res.data
                })
              })
            }
            if (this.form.id) {
              userUpdate(this.form).then(res => {
                this.declarelist()
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
      handleGoDetail() {
        this.detail = true;
      },
      handleGoView(id) {
        this.showForm = true;
      },
      handleSelectionChange(val){
        //val 所选对象
      },
      // 打开合并剂型新增页面
      handleGoAudit() {
        this.showForm = true;
      },
    }
  }
</script>
