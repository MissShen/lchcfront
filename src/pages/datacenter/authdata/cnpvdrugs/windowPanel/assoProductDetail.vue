<template>
  <el-dialog
    :title="'关联产品'"
    :close-on-click-modal="false"
    width="85%"
    :visible.sync="visible">
    <el-form :model="query" ref="query" label-width="150px" label-position="left" :inline="true" size="small"
             class="table-form">
      <el-form-item>
        <el-select v-model="query.searchType">
          <el-option label="通用名" value="0"></el-option>
          <el-option label="剂型" value="1"></el-option>
          <el-option label="生产企业" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="关键词" v-model="query.searchText" @keyup.enter.native="searchEnterFun"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="search">查询</el-button>
        <el-button type="warning" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="tableset">
      <el-table
        ref="mainTable"
        :row-key="getRowKeys"
        :data="resData.list"
        @sort-change="sortChange"
        @selection-change="handleSelectionChange"
        border
        stripe>
        <el-table-column width="50" type="selection" :reserve-selection="true"></el-table-column>
        <el-table-column label="通用名" show-overflow-tooltip sortable="custom" prop="NAME_CHN">
          <template slot-scope="scope">
            <span>{{scope.row.catDrug.nameChn }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品名" show-overflow-tooltip sortable="custom" prop="TRADE_NAME">
          <template slot-scope="scope">
            <span>{{scope.row.catProduct.tradeName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="剂型" show-overflow-tooltip sortable="custom" prop="DOSEAGE_FORM_CODE_NAME">
          <template slot-scope="scope">
            <span>{{scope.row.catDrug.doseageFormCodeName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="规格" show-overflow-tooltip sortable="custom" prop="SPEC">
          <template slot-scope="scope">
            <span>{{scope.row.catDrug.spec }}</span>
          </template>
        </el-table-column>
        <el-table-column label="单位" width="60" sortable="custom" prop="USE_UNIT">
          <template slot-scope="scope">
            <span>{{scope.row.catProduct.useUnit }}</span>
          </template>
        </el-table-column>
        <el-table-column label="转换比" width="60" sortable="custom" prop="STAND_RATE">
          <template slot-scope="scope">
            <span>{{scope.row.catDrug.standRate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="包材" width="60" show-overflow-tooltip sortable="custom" prop="WRAP_CODE">
          <template slot-scope="scope">
            <span>{{scope.row.catDrug.wrapCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="批准文号" show-overflow-tooltip sortable="custom" prop="PERMIT_NUMBER">
          <template slot-scope="scope">
            <span>{{scope.row.catProduct.permitNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column label="生产企业" show-overflow-tooltip sortable="custom" prop="MANUFACTURE_ID">
          <template slot-scope="scope">
            <span>{{scope.row.catProduct.manufactureId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审核标记" show-overflow-tooltip width="120" sortable="custom" prop="CHECK_FLAG">
          <template slot-scope="scope">
            <span>{{toChn(scope.row.catProduct.checkFlag) }}</span>
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
    <span slot="footer">
      <el-button size="small" @click="saveProduct(null)" type="primary" v-if="this.type ==='CHOOSE'">保存</el-button>
      <el-button size="small" @click="saveProduct('DEL')" type="primary" v-if="this.type ==='HAS'">删除关联</el-button>
      <el-button size="small" @click="saveProduct('ADD')" type="primary" v-if="this.type ==='NOT'">加入关联</el-button>
      <el-button size="small" @click="close()">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  import ElButton from "../../../../../../node_modules/element-ui/packages/button/src/button";
  import {findAssoProductById} from 'src/axios/datacenter/authdata/cnprotecteddrug/cnProtected'
  import {findAssoProduct} from 'src/axios/datacenter/authdata/cnprotecteddrug/cnProtected'
  import {findHasAssoProduct} from 'src/axios/datacenter/authdata/cnprotecteddrug/cnProtected'

  export default {
    components: {
      ElButton,
      ElCol
    },
    name: "assoProductDetail",
    data() {
      return {
        visible: false,
        type: '',
        data: '',
        chooseList: [],
        resData: this.metaData(),
        query: this.metaQuery()
      }
    },

    created () {
      if (!!this.$store.state.pageSeach.pageNum) {
        this.query = this.$store.state.pageSeach;
        this.resData.pageSize = this.$store.state.pageSeach.pageSize;
        this.resData.pageNum = this.$store.state.pageSeach.pageNum;
      }
      this.list();
    },

    methods: {

      sortChange(value){
        let sortType = " desc";
        if (value.order != null) {
          if (value.order.startsWith("asc")) {
            sortType = " asc";
          }
          this.query.orderBy = value.prop + sortType;
          this.list()
        }
      },

      fillData(type, data) {
        this.visible = true;
        this.resData = this.metaData();
        this.type = type;
        this.data = data;
        this.list();
      },

      getRowKeys(row){
        return row.catProduct.id;
      },

      search() {
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        this.list();
      },

      list(){
        if (this.type === 'READ') {
          this.$store.state.pageSeach = this.query;
          findAssoProductById(this.data, this.query, this.resData).then(res => {
            this.resData = res.data;
            if (this.resData.pageNum === 0) {
              this.resData.pageNum = 1
            }
          })
        } else if (this.type === 'CHOOSE' || this.type === 'NOT') {
          this.$store.state.pageSeach = this.query;
          findAssoProduct(this.data, this.query, this.resData).then(res => {
            this.resData = res.data;
            if (this.resData.pageNum === 0) {
              this.resData.pageNum = 1
            }
          })
        } else if (this.type === 'HAS') {
          this.$store.state.pageSeach = this.query;
          findHasAssoProduct(this.data, this.query, this.resData).then(res => {
            this.resData = res.data;
            if (this.resData.pageNum === 0) {
              this.resData.pageNum = 1
            }
          })
        }
      },

      saveProduct(flag){
        if (flag != null) {
          this.$emit('saveProduct', {value: this.chooseList, flag: flag});
        } else {
          this.$emit('saveProduct', {value: this.chooseList});
        }
        this.visible = false;
      },

      handleSelectionChange(val) {
        this.chooseList = val;
      },

      resetForm() {
        if (this.type === 'READ' || this.type === 'CHOOSE') {
          this.$refs.mainTable.clearSelection();
        }
        this.query = this.metaQuery();
        this.resData = this.metaData();
        this.list();
      },

      close(){
        if (this.type === 'READ' || this.type === 'CHOOSE') {
          this.$refs.mainTable.clearSelection();
        }
        this.query = this.metaQuery();
        this.resData = this.metaData();
        this.visible = false;
      },

      toChn(val) {
        switch (val) {
          case "0":
            return "未审核";
          case "1":
            return "审核通过";
          case "2":
            return "拒绝";
          case "3":
            return "临时数据";
          default:
            return val;
        }
      },

      searchEnterFun: function (e) {
        var keyCode = window.event ? e.keyCode : e.which;
        if (keyCode == 13) {
          this.list();
        }
      },

      metaData () {
        return {// 前后台交互数据封装格式
          pageNum: 1,
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
        }
      },
      metaQuery () { // 表单查询数据初始化
        return {
          searchType: "0",
          searchText: "",
          orderBy: null
        }
      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val;
        if (this.resData.pageSize === 0) {
          this.resData.pageSize = 10
        }
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val;
        if (this.resData.pageNum === 0) {
          this.resData.pageNum = 1
        }
        this.list()
      }
    }
  }
</script>
