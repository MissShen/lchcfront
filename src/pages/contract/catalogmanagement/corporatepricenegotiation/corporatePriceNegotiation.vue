<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" :inline="true" class="table-form" size="small">
            <el-form-item>
              <el-input size="small" placeholder="品名" maxlength="200" v-model="query.productName"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="query.catalogArea" placeholder="目录范围" size="small">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="query.state" placeholder="状态" size="small">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="success">查询</el-button>
              <el-button size="small" type="warning" @click="reset()">重置</el-button>

            </el-form-item>
        </el-form>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          style="width: 100%"
          border
          stripe>
          <el-table-column label="序号" width="50"  :show-overflow-tooltip="true" align="right" header-align="left">
            <template slot-scope="scope">
              <span> {{(resData.pageNum - 1) * resData.pageSize + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column label="通用名" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.aa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="药品信息" prop="drugDetail">
            <template slot-scope="scope">
              <div :title="scope.row.productName +'('+ scope.row.tradeName +')'" class="ellipsis es300">
                {{ scope.row.productName }}（{{ scope.row.tradeName }}）
              </div>
              <div :title="scope.row.spec+'×'+scope.row.standRate +  scope.row.smallestUnits+'/'+scope.row.specUnit +'('+scope.row.wrapName+')('+scope.row.doseageFormName+')'" class="drugCon ellipsis es300">
                <!--规格×单位转换比 最小使用单位/最小包装单位 (包装材质)(剂型)-->
                规格包装：{{ scope.row.spec}} × {{ scope.row.standRate}} {{ scope.row.smallestUnits}} / {{scope.row.specUnit}} ({{scope.row.wrapName}}) ({{ scope.row.doseageFormName }})
              </div>
              <!--<p>
                中大包装：{{ scope.row.middleStandRate}}/{{ scope.row.bigMiddleRate}}
              </p>-->
              <div :title="scope.row.manufactureName" class="drugCon ellipsis es300">生产企业：{{ scope.row.manufactureName}}</div>
            </template>
          </el-table-column>
          <el-table-column label="目录范围">
            <template slot-scope="scope">
              <span>{{ scope.row.aa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="参考价" width="70" align="right" header-align="left">
            <template slot-scope="scope">
              <span>{{ scope.row.aa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="企业报价" width="90" align="right" header-align="left">
            <template slot-scope="scope">
              <span>{{ scope.row.aa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="降后价格" width="100" align="right" header-align="left">
            <template slot-scope="scope">
              <span>{{ scope.row.aa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="降价时间" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.aa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="60">
            <template slot-scope="scope">
              <span>{{ scope.row.aa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <a class="operation-btn" type="text" size="small">发起议价</a>
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
    <!-- ========================== 主内容end ========================= -->
  </div>
</template>
<script>

  // 引入用户相关请求  引自js文件
  import {selectCorporatePriceNegotiationList} from 'src/axios/contract/corporatepricenegotiation/corporatePriceNegotiation'

  export default {
    data() {
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
    created() {
      this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData() {
        return {
            pageNum: 0,
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
      metaForm() { // 表单数据初始化
        return {
          /*   form: {*/
          id: undefined,
          name: undefined,
          type: undefined,
          CREATE_DATE: undefined,
          /* }*/
        }
      },
      metaRules() {
        if (this.formStatus === 'add') {
          return {
            name: [
              {required: true, message: '模板类型名称', trigger: 'blur'},
              {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
            ],
            type: [
              {required: true, message: '没有填写模板类型', trigger: 'blur'},
            ],
          }
        } else {
          return {
            name: [
              {required: true, message: '登录名称不能为空', trigger: 'blur'},
              {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
            ],
            type: [
              {required: true, message: '用户名称不能为空', trigger: 'blur'},
              {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
            ]
          }
        }
      },
      metaQuery() { // 表单查询数据初始化
        return {
            state: "",
            catalogArea: "",
            productName:""
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
        this.$ref['form'].resetFields()
        this.toggleForm()
      },
      //  获取用户分页列表
      list() {
        /*selectCorporatePriceNegotiationList(this.resData, this.query).then(res => {
          console.log(res);
          this.resData = res.data;
        })*/
      },
      reset(){
        this.query = this.metaQuery();
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
              templateTypeAdd(this.form).then(res => {
                this.list();
              })
            }
          } else {
            return false
          }
        })
      },
      // 打开合并剂型新增页面
      handleGoAdd() {
        this.resetForm()
        this.form = this.metaForm()
        this.showForm = true
        /*this.$refs['form'].resetFields()*/
        this.formStatus = 'add'
        this.rules = this.metaRules()
      },
    }
  }
</script>
