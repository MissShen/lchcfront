<template>
  <!-- 表格 -->
  <div class="tablebox">
    <!-- 表格查询表单 -->
      <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
          <el-form-item>
            <el-input v-model="query.groupName" placeholder="合并剂型名称" @keyup.enter.native="searchEnterFun" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="query.projectName" placeholder="项目名称" @keyup.enter.native="searchEnterFun" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
            <el-button type="warning" @click="resetQuery" size="small">重置</el-button>
          </el-form-item>
      </el-form>
    <div class="foot-btn">
      <div class="foot-left">
        <el-button type="success" size="small" @click="handleGoAdd">
          新增
        </el-button>
      </div>
    </div>
    <!-- 表格列表 -->
    <div class="tableset">
      <el-table :data="resData.list" border stripe  @selection-change="handleSelectionChange">
        <el-table-column label="项目名称" width="180" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.PROJECT_NAME }}</span>
          </template>
        </el-table-column>
        <el-table-column label="合并剂型名称" width="180" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.GROUP_NAME }}</span>
          </template>
        </el-table-column>
        <el-table-column label="实际剂型" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.DOSAGE_FORM_NAMES }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <div class="operates">
              <span><a href="javascript:;" class="operation-btn" @click="handleGoView(scope.row.ID)">查看</a></span>
              <span><a href="javascript:;" class="operation-btn" @click="handleGoEdit(scope.row.ID)">修改</a></span>
              <span><a href="javascript:;" class="operation-btn" @click="handleDelete(scope.row.ID)">删除</a></span>
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
    <detail ref="detail"></detail>
    <!-- 编辑合并剂型 -->
    <el-dialog :close-on-click-modal="false" top="2vh" title="合并剂型管理" :visible.sync="showForm" :before-close="closeForm" width="60%">
      <el-form ref="form" v-if="showForm" :model="form" :rules="rules" label-width="110px" size="small" label-position="left" class="gap-40 form-bold">
        <el-form-item label="选择项目" prop="CAT_PROJECT_ID">
          <el-select v-model="form.CAT_PROJECT_ID" placeholder="所属系统" class="width-520">
            <el-option v-for="x in catProject" :key="x.id" :label="x.projectName"
                       :value="x.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="合并剂型名称" prop="GROUP_NAME">
          <el-input v-model="form.GROUP_NAME" class="width-520"></el-input>
        </el-form-item>
        <el-form-item label="实际剂型名称" prop="DOSAGE_FORM_IDS">
          <div class="transfer-wrapper">
            <el-transfer
              filterable
              :titles="['待选择', '已选择']"
              filter-placeholder="请输入剂型名称"
              v-model="form.DOSAGE_FORM_IDS"
              :data="dosage">
            </el-transfer>
          </div>
        </el-form-item>
        <el-form-item label="备注" prop="REMARK">
          <el-input type="textarea" :rows="3" v-model="form.REMARK" class="width-520"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="closeForm" size="small">关闭</el-button>
        <el-button type="primary" @click="handleForm('form')" size="small">保存</el-button>
        <el-button type="warning" v-if="formStatus==='add'" @click="resetForm" size="small">重置</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  // 引入用户相关请求
  import {catProjectList, dosageView, dosageFormList, dosagelist, dosageAdd, dosageUpdate, dosageDel} from 'src/axios/auditchanges/systemManage/dosageFormGroup'
  import {keyBoardEnter} from "src/utils";
  import detail from './detail'
  import Vue from 'vue'

  export default {
    components: {
      detail
    },
    data() {
      return {
        rules: this.metaRules(),
        resData: this.metaData(),
        form: this.metaForm(), // 表单初始化
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        // showQuery: false, // 表单查询初始化
        formStatus: 'add', // 表单状态 add
        catProject: undefined,
        dosage: undefined,
      }
    },
    created() {
      this.resData.pageSize = 10;
      this.list();
      this.catProjectList();
      this.dosageFormList();
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData() {
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
            isFirstPage: true,
            isLastPage: true,
            hasPreviousPage: false,
            hasNextPage: false,
            navigatePages: 8,
            navigatepageNums: [],
            navigateFirstPage: 0,
            navigateLastPage: 0,
            firstPage: 0,
            lastPage: 0,
            list: undefined
          }
        }
      },
      metaForm() { // 表单数据初始化
        return {
          id: undefined,
          GROUP_NAME: undefined,
          DOSAGE_FORM_IDS: undefined,
          DOSAGE_FORM_NAMES: undefined,
          REMARK: undefined,
          CAT_PROJECT_ID: undefined,
          ENABLE_FLAG: "1",
        }
      },
      metaRules() {
        return {
          GROUP_NAME: [
            {required: true, message: '合并剂型名称不能为空', trigger: 'blur'},
            {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
          ],
          DOSAGE_FORM_IDS: [
            {required: true, message: '没有选择剂型', trigger: 'blur'},
          ],
          CAT_PROJECT_ID: [
            {required: true, message: '没有选择项目', trigger: 'blur'},
          ],
        }
      },
      metaQuery() { // 表单查询数据初始化
        return {
          query: {
            groupName: undefined,
            projectName: undefined,
          }
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      // toggleQuery() {
      //   this.showQuery = !this.showQuery
      // },
      toggleForm() {
        this.showForm = !this.showForm
      },
      //关闭
      closeForm() {
        this.$refs.form.resetFields();
        this.toggleForm()
      },
      //查询
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      //  获取用户分页列表
      list() {
        let loading = Vue.prototype.$loading({text:"玩命加载中..."});
        dosagelist(this.resData, this.query).then(res => {
          console.log(res);
          this.resData = res.data;
          if(this.resData.pageNum == 0) {
            this.resData.pageNum = 1;
          }
          this.$nextTick(() => {
            loading.close();
          });
        });
      },
      catProjectList() {
        catProjectList().then(res => {
          this.catProject = res.data;
        });
      },
      dosageFormList() {
        dosageFormList().then(res => {
          console.log(res);
          this.dosage = res.data;

          const data = [];
          res.data.forEach(x => {
            data.push({
              label: x.NAME_CHN,
              key: x.CODE + "!!" + x.NAME_CHN,
            });
          });
          this.dosage = data;
        });
      },
      resetQuery() {//重置
        this.query = this.metaQuery();
        this.list();
      },
      // 重置用户表单
      resetForm() {
        this.form = this.metaForm()
      },
      // 提交用户表单
      handleForm(form) {
        this.$refs[form].validate(valid => {
          if (valid) {
            this.toggleForm();
            if (!this.form.id) {
              dosageAdd(this.form).then(res => {
                this.list();
                this.$message({
                  type: res.data.ico,
                  message: res.data.msg,
                })
              })
            }
            if (this.form.id) {
              dosageUpdate(this.form).then(res => {
                this.list();
                this.$message({
                  type: res.data.ico,
                  message: res.data.msg,
                })
              })
            }
          } else {
            return false
          }
        })
      },
      handleGoView(id) {
        this.$nextTick(() => {
          this.$refs.detail.init(id)
        })
      },
      // 打开合并剂型新增页面
      handleGoAdd() {
        this.resetForm();
        this.form = this.metaForm();
        this.showForm = true;
        this.formStatus = 'add';
        this.rules = this.metaRules()
      },
      // 打开用户编辑页面
      handleGoEdit(id) {
        this.toggleForm();
        dosageView(id).then(res => {
          console.log(res);
          this.resetForm();
          this.formStatus = 'edit';
          this.rules = this.metaRules();
          this.form = res.data;
          this.form.id = id;

          var codes = this.form.DOSAGE_FORM_IDS.split(",");
          var names = this.form.DOSAGE_FORM_NAMES.split(",");
          var result = [];
          for(let i in codes){
            result.push(codes[i] + "!!" + names[i]);
          }
          this.form.DOSAGE_FORM_IDS = result;
        })
      },
      // 处理用户删除
      handleDelete(id) {
        this.$confirm('此操作将删除该合并剂型, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          dosageDel(id).then(res => {
            this.$message({
              type: res.data.ico,
              message: res.data.msg,
            });
            this.list();
          })
        })
      },
      //=====================================分页===============================
      handleSizeChange(val) {
        this.resData.pageSize = val;
        this.list()
      },
      handleSelectionChange(val) {
        //val 所选对象
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val;
        this.list()
      }
    }
  }
</script>
