<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
        <el-form ref="query" :model="query" size="small" :inline="true" class="table-form">
            <el-form-item>
              <el-input v-model="query.senderName"
                        maxlength="200" placeholder="配送企业" size="small"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="query.contractState" placeholder="合同状态" size="small">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="list()" size="small">查询</el-button>
              <el-button type="warning" size="small" @click="resetForm()">重置</el-button>
            </el-form-item>
        </el-form>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          :default-sort ="{prop:'配送企业',prop:'联系人',prop:'电话',prop:'手机',prop:'状态'}"
            border
          stripe>
          <el-table-column label="配送企业" prop="配送企业" sortable>
            <template slot-scope="scope">
              <span>{{ scope.row.aa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="联系人" prop="联系人" sortable>
            <template slot-scope="scope">
              <span>{{ scope.row.aa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="电话" prop="电话" sortable>
            <template slot-scope="scope">
              <span>{{ scope.row.aa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="手机" prop="手机" sortable>
            <template slot-scope="scope">
              <span>{{ scope.row.aa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" prop="状态" sortable>
            <template slot-scope="scope">
              <span>{{ scope.row.aa }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="220">
            <template slot-scope="scope">
              <a class="operation-btn" size="small">查看产品</a>
              <a class="operation-btn" size="small">删除合同</a>
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

  export default {
    data () {
      return {
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
        options:[]
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
      metaQuery () { // 表单查询数据初始化
        return {
          query: {
            senderName: undefined,
            contractName: undefined
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
      list () {

      },
      resetForm () {
        this.query = this.metaQuery();
        this.list();
      },
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

