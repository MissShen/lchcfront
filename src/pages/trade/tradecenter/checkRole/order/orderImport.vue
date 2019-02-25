<template xmlns="http://www.w3.org/1999/html">
  <!-- ========================== 主内容start ========================= -->
  <!-- 表格 -->
  <div class="tablebox">
    <!-- 表格查询表单 -->
    <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
      <el-form-item>
        <el-date-picker type="date" size="small" @keyup.enter.native="searchEnterFun" placeholder="导入开始日期"
                        v-model="query.beginTime"></el-date-picker>
        &nbsp;到 &nbsp;
        <el-date-picker type="date" size="small" @keyup.enter.native="searchEnterFun" placeholder="导入结束日期"
                        v-model="query.endTime"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格列表 -->
    <div class="tableset">
      <el-table
        :data="resData.list"
        border
        @sort-change="sortChang"
        stripe>
        <!--<el-table-column type="index" width="50" header-align="left" align="center" label="序号"></el-table-column>-->
        <el-table-column label="单据号" prop="oir.ORDER_CODE" sortable="custom">
          <template slot-scope="scope">
            {{ scope.row.orderCode }}
          </template>
        </el-table-column>
        <el-table-column label="订单编号" prop="purchaseId" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.purchaseId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="采购单编号" prop="p.PURCHASE_CODE" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.purchaseCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="医疗机构" prop="o.bak_buyer_easy" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.bakBuyerEasy }}</span>
          </template>
        </el-table-column>
        <el-table-column label="导入时间" prop="oir.import_date" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.importDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单金额(元)" prop="o.request_total" sortable="custom">
          <template slot-scope="scope">
            <span>{{ priceFormat(scope.row.requestTotal) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="到货金额(元)" prop="o.receive_total" sortable="custom">
          <template slot-scope="scope">
            <span>{{ priceFormat(scope.row.receiveTotal)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span class="operation-btn" @click="handleFromView(scope.row)">详情</span>
          </template>
        </el-table-column>
      </el-table>
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
    <div class="foot-btn">
      <div class="foot-left">
        <el-button type="primary" @click="doImportOrder(1)">采购单导入</el-button>
        <el-button type="primary" @click="doImportOrder(2)">到货单导入</el-button>
      </div>
    </div>
    <!-- 弹窗：明细 -->
    <form-view v-if="formViewVisible" ref="formView"></form-view>
    <!-- 弹窗：导入 -->
    <el-dialog width="700px" :title="this.dialogType == 1? '采购单导入':'到货单导入'"
               top="2vh" :visible.sync="showImport" :before-close="handleClose">
      <el-form :model="importForm" ref="importForm" label-width="100px" size="small"
               label-position="left" class="demo-form-inline" :inline="true">
        <el-form-item label="上传附件：" prop="alias">
          <el-upload
            class="upload-demo"
            :before-upload="beforeUpload"
            ref="upload"
            action="upload_url"
            :auto-upload="false"
            :limit="1"
            :headers="header"
            accept="text/plain"
            :on-exceed="handleExceed"
            :file-list="importForm.fileList">
            <el-button size="small">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传txt文件</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-input v-model="importForm.type" type="hidden" style="width:75%"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="submitUpload">导入</el-button>
        <el-button @click="handleClose" size="small">取消</el-button>
      </span>
    </el-dialog>
  </div>
  <!-- ========================== 主内容end ========================= -->
</template>
<script>

  // 引入用户相关请求
  import {selectDoImportList, newExp} from 'src/axios/trade/checkRole/order/orderImport'
  import formView from 'src/pages/trade/tradecenter/checkRole/order/orderItemImport';
  import {priceFormat, keyBoardEnter} from "src/utils";

  export default {
    name: "orderList",
    data() {
      return {
        activeName: 'first',  // 当前标签
        upload_url: 'aaa',
        currentOrder: undefined,
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        formViewVisible: false,
        dialogType: 0,
        header: {
          "Authorization": sessionStorage.getItem('token')
        },
        showImport: false,
        importForm: {fileList: [], type: 0}
      }
    },
    created() {
      this.list()
    },
    components: {
      formView
    },
    methods: {
      priceFormat,
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData() {
        return {
          // 前后台交互数据封装格式
          orderBy: undefined,
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
      handleFromView(row) {
        this.formViewVisible = true;
        this.$nextTick(() => {
          // 通过组件中设置的ref属性调取formView.vue中的fillData()方法加载弹窗内容
          this.$refs.formView.fillData(row);
        })
      },
      metaQuery() { // 表单查询数据初始化
        return {
          id: undefined,
          beginTime: undefined,
          endTime: undefined,
        }
      },
      searchEnterFun(e) {
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      beforeUpload(file) {
        let formData = new FormData();
        formData.append('file', file);
        formData.append('type', this.dialogType);
        newExp(formData).then(res => {
          if (res.code == '100') {
            this.$message.error(res.message)
          } else {
            this.$message.success('上传成功！')
            this.handleClose()
            this.list()
          }
        })
        return true
      },
      submitUpload() {
        this.$refs.upload.submit();
        this.importForm.fileList = []
      },
      handleClose(done) {
        this.importForm.fileList = []
        this.toggleForm();
      },
      doImportOrder(type) {
        this.dialogType = type;
        this.showImport = true;
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      toggleForm() {
        this.showImport = !this.showImport
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list() {
        this.resData.orderBy = this.currentOrder;
        selectDoImportList(this.resData, this.query).then(res => {
          this.resData = res.data
          if (this.resData.pageNum === 0) {
            this.resData.pageNum = 1
          }
        })
      },
      sortChang(value) {
        let sortType = " desc"
        if (value.order.startsWith("asc")) {
          sortType = " asc";
        }
        this.currentOrder = value.prop + sortType;
        this.list()
      },
      // ************************ 分页操作 ************************
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

