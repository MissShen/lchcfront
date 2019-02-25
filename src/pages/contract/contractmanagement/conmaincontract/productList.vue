<template>
  <el-dialog
    :title="this.operate == 'add' ? '追加产品列表' : '变更产品列表'"
    :close-on-click-modal="false"
    :append-to-body="true"
    :visible.sync="visible" width="80%">
    <!-- 表格 -->
      <el-form ref="query" :model="query" :inline="true" class="table-form">
          <el-form-item>
            <el-input v-model="query.productName"
                      :maxlength="200" placeholder="品名" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="query.manufactureName"
                      :maxlength="200" placeholder="生产企业名称" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="list()" size="small">查询</el-button>
            <el-button type="warning" @click="resetForm()" size="small">重置</el-button>
          </el-form-item>
      </el-form>

    <!-- 表格列表 -->
    <div class="tableset">
      <el-table
        :data="resData.list"
        border
        stripe @selection-change="handleSelectionChange">
        <el-table-column
          type="selection" :selectable="selectable"
          align="center"
          width="40">
        </el-table-column>
        <el-table-column label="通用名" width="120" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.nameChn }}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品名" width="120" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.productName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品名" width="120" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.tradeName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="剂型" width="70" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.doseageFormName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="规格" width="70" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.spec }}</span>
          </template>
        </el-table-column>
        <el-table-column label="转换比" width="70" :show-overflow-tooltip="true" align="right" header-align="left">
          <template slot-scope="scope">
            <span>{{ scope.row.standRate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="单位" width="50" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.specUnit }}</span>
          </template>
        </el-table-column>
        <el-table-column label="包材" width="50" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.wrapName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="生产企业" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.manufactureName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="企业报价" width="80" :show-overflow-tooltip="true" align="right" header-align="left">
          <template slot-scope="scope">
            <span>{{ priceFormat(scope.row.bidPrice) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="70">
          <template slot-scope="scope" v-if="operate == 'add'">
            <div class="operates">
              <a type="text" size="small" @click="addProduct(scope.row.productId)">追加</a>
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

    <span slot="footer" class="dialog-footer">
      <template v-if="operate == 'add'">
        <el-button type="primary" size="small" @click="addProduct()">追加</el-button>
      </template>
      <template v-if="operate == 'change'">
        <el-button type="primary" size="small" @click="changeProduct()">变更</el-button>
      </template>
      <el-button @click="closeThisWindowAndRefreshParent()" size="small">关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>

  // 引入用户相关请求
  import {queryAddProduct, queryChangeProduct,
    addContractProduct, changeContractProduct} from 'src/axios/contract/contractmanagement/signEntrustmentAgreement'
  import {priceFormat} from "src/utils"

  export default {
    data () {
      return {
        props:{
          parentId:{
            type: String,
            required: true
          }
        },
        resData: this.metaData(),
        form: this.metaForm(), // 表单初始化
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        visible: false,
        dataForm: this.metaForm(),
        contractId : undefined,
        partyCode: undefined,
        operate : undefined,
        deleteDataList: []
      }
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      priceFormat,
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
            list: []
        }
      },
      metaForm () { // 表单数据初始化
        return {
          productName : '',
          manufactureName : ''
        }
      },
      fillData(contractId, partyCode, operate) {
        this.visible = true;
        this.contractId = contractId;
        this.partyCode = partyCode;
        this.operate = operate;
        console.log(this.operate);
        this.query = this.metaQuery();
        this.list();
      },
      metaQuery () { // 表单查询数据初始化
        return {
          productName : '',
          manufactureName : ''
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        if (this.operate == 'add') {
          queryAddProduct(this.resData, this.query, this.contractId).then(res => {
            this.resData = res.data
            if (this.resData.pageNum === 0) {
              this.resData.pageNum = 1;
            }
          })
        }
        if (this.operate == 'change') {
          queryChangeProduct(this.resData, this.query, this.contractId).then(res => {
            this.resData = res.data
            if (this.resData.pageNum === 0) {
              this.resData.pageNum = 1;
            }
          })
        }
      },
      //  追加
      addProduct(productId) {
        var arr = [];
        if (productId) {
          arr.push(productId);
        } else {
          arr = this.deleteDataList.map(data => {
            return data.productId
          })
        }
        addContractProduct(arr, this.contractId, this.partyCode).then(res => {
          this.$message({
            message: res.data,
            type: 'success',
            onClose: () => {
              this.$emit('refreshParent');
              this.visible = false;
            }
          })
        })
      },
      //  变更
      changeProduct(productId) {
        var arr = [];
        if (productId) {
          arr.push(productId);
        } else {
          arr = this.deleteDataList.map(data => {
            return data.productId
          })
        }
        changeContractProduct(arr, this.contractId, this.partyCode).then(res => {
          this.$message({
            message: res.data,
            type: 'success',
            onClose: () => {
              this.$emit('refreshParent');
              this.visible = false;
            }
          })
        })
      },
      handleSelectionChange(val) {
        this.deleteDataList = val
      },
      selectable(row, index) {
        if (row.id === this.radio) {
          return false
        } else {
          return true
        }
      },
      //  关闭弹窗、刷父页面
      closeThisWindowAndRefreshParent () {
        this.$emit('refreshParent');
        this.visible = false;
      },
      // 重置用户表单
      resetForm () {
        this.query = this.metaQuery();
        this.list();
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
