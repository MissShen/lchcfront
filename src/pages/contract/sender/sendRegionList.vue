<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">

        <el-form size="small" :inline="true" class="table-form">
            <el-form-item>
              <el-select v-model="query.district" placeholder="省" @change="queryCities()" size="small">
                <el-option
                  v-for="item in districts"
                  :key="item.id"
                  :label="item.nameChn"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="query.city" placeholder="市" @change="queryRegions()" size="small">
                <el-option
                  v-for="item in cities"
                  :key="item.id"
                  :label="item.nameChn"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="query.region" placeholder="区" @change="showRegion()" size="small">
                <el-option
                  v-for="item in regions"
                  :key="item.id"
                  :label="item.nameChn"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
            <el-button type="warning" @click="list()" size="small">查询</el-button>
            <el-button size="small" @click="resetForm()">重置</el-button>
            </el-form-item>
        </el-form>
      <div class="table-caption">
        <el-button type="primary" @click="handleGoAdd" size="small">新增区域</el-button>
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
              <span>{{ scope.row.projectName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="配送企业">
            <template slot-scope="scope">
              <span>{{ scope.row.senderName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="省" width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.districtName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="市" width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.cityName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="区（县）" width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.regionName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建人" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.createUser }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建日期" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <a class="operation-btn" type="text" size="small">删除</a>
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
          <el-button @click="handleSaveRole" size="small">确定</el-button>
          <el-button @click="roleDialogVisible = false" size="small">关闭</el-button>
        </span>
      </el-dialog>

      <!--用户表单对话框-->
      <el-dialog top="2vh" :visible.sync="showForm" :before-close="closeForm">
        <div style="width: 500px">

          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="用户名称" prop="userName">
              <el-input v-model="form.userName" size="small"></el-input>
            </el-form-item>
            <el-form-item label="登录名称" prop="userCode">
              <el-input v-model="form.userCode" size="small"></el-input>
            </el-form-item>
            <el-form-item label="初始密码" prop="password">
              <el-input v-model="form.password" size="small"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="pwd2">
              <el-input v-model="form.pwd2" size="small"></el-input>
            </el-form-item>
            <el-form-item label="所属机构" prop="orgId">
              <el-input v-model="form.orgId" size="small"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="telephone">
              <el-input v-model="form.telephone" size="small"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
              <el-input v-model="form.mobile" size="small"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="remark">
              <el-input type="textarea" v-model="form.remark" size="small"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer">
          <el-button type="primary" @click="handleForm('form')" size="small">保存</el-button>
          <el-button type="danger" v-if="formStatus==='add'" @click="resetForm" size="small">重置</el-button>
          <el-button @click="closeForm" size="small">关闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>

  // 引入用户相关请求
  import {queryCatSendRegionRelationList, findByParentId} from 'src/axios/contract/sender/sendRegion'

  export default {
    data() {
      return {
        resData: this.metaData(),
        rules: this.metaRules(),
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
        districts: [],
        cities: [],
        regions: []
      }
    },
    created() {
      this.queryDistricts();
      this.list();
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData() {
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
      metaRules() {
        return {
          userName: [{required: true, message: '请填写用户名称', trigger: 'blur'}],
          userCode: [{required: true, message: '请填写登录名称', trigger: 'blur'}],
          password: [{required: true, message: '请填写初始密码', trigger: 'blur'}],
          pwd2: [{required: true, message: '请填写确认密码', trigger: 'blur'}],
          orgId: [{required: true, message: '请填写所属机构', trigger: 'blur'}],
          telephone: [{required: true, message: '请填写电话', trigger: 'blur'}],
          mobile: [{required: true, message: '请填写手机号', trigger: 'blur'}],
          remark: [{required: true, message: '请填写描述', trigger: 'blur'}],
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
      metaQuery() { // 表单查询数据初始化
        return {
          query: {
            district: undefined,
            city: undefined,
            region: undefined,
            parentId: undefined
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
      //  获取用户分页列表
      list() {
        console.log('pageNum=', this.resData.pageNum);
        queryCatSendRegionRelationList(this.resData, this.query).then(res => {
          console.log(res);
          this.resData = res.data;
        })
      },
      queryDistricts() {
        findByParentId('FR20T0000010000000050000').then(res => {
          console.log(res);
          this.districts = res.data;
          this.cities = [];
          this.regions = [];
        })
      },
      queryCities() {
        findByParentId(this.query.district).then(res => {
          console.log('queryCities: ', res);
          this.cities = res.data;
          this.query.city = this.cities[0].id;
          this.queryRegions();
        })
      },
      queryRegions() {
        findByParentId(this.query.city).then(res => {
          console.log('queryRegions: ', res);
          this.regions = res.data;
          this.query.region = this.regions[0].id;
        })
      },
      showRegion() {
        console.log(this.query.region);
      },
      // 重置用户表单
      resetForm() {
        /*  this.$refs['form'].resetFields()*/
        this.query = this.metaQuery();
        this.form = this.metaForm()
        this.list();
      },
      // 提交用户表单
      handleForm(form) {
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
            this.list()
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
          this.list()
          this.dialogVisible = false
        })
      },
      // ************************
      handleSizeChange(val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val
        this.list()
      }
    }
  }
</script>

