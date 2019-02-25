<template>
  <el-dialog
    :title="'选择药品'"
    :close-on-click-modal="false"
    width="75%"
    :visible.sync="visible">
    <el-form :model="dataForm" ref="dataForm"
             label-width="150px" label-position="left" :inline="true" size="small" class="table-form">
      <el-form-item>
        <el-select v-model="dataForm.searchType" size="small">
          <el-option label="药品通用名" value="0"></el-option>
          <el-option label="药品编码" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="关键词" v-model="dataForm.searchText" @keyup.enter.native="searchEnterFun"
                  size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
        <el-button type="warning" @click="resetForm" size="small">重置</el-button>
      </el-form-item>
    </el-form>

    <div class="tableset">
      <el-table
        ref="table"
        :data="resData.list"
        @selection-change="handleSelectionChange"
        border
        @sort-change="sortChange"
        :row-key="getRowKeys"
        stripe>
        <el-table-column width="50" type="selection" :reserve-selection="true" align="center"></el-table-column>
        <el-table-column label="药品编码" sortable="custom" prop="CODE">
          <template slot-scope="scope">
            <span>{{scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column label="通用名" show-overflow-tooltip sortable="custom" prop="NAME_CHN">
          <template slot-scope="scope">
            <span>{{ scope.row.nameChn }}</span>
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
      <el-button size="small" type="primary" @click="choose">保存</el-button>
      <el-button size="small" @click="closeWindow">关闭</el-button>
    </span>

  </el-dialog>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  import {query8Drugs} from 'src/axios/datacenter/authdata/otcdrugs/catOtc'
  import {keyBoardEnter} from "src/utils";

  export default {
    components: {ElCol},
    name: "commonDrugsInfo",
    data() {
      return {
        visible: false,
        type: '',
        data: '',
        chooseList: [],
        resData: this.metaData(),
        dataForm: this.metaQuery()
      }
    },
    created () {
      this.list()
    },
    methods: {

      sortChange(value){
        let sortType = " desc";
        if (value.order != null) {
          if (value.order.startsWith("asc")) {
            sortType = " asc";
          }
          this.dataForm.orderBy = value.prop + sortType;
          this.list()
        }
      },

      getRowKeys(row){
        return row.id
      },

      searchEnterFun(e) {
        this.resData.pageNum = 1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },

      fillData(type, data) {
        this.visible = true;
        this.resData = this.metaData();
        this.type = type;
        this.data = data;
        this.list();
      },

      list(){
        //8位通用
        if (this.type === 'COMMON') {
          query8Drugs(this.dataForm, this.resData, this.data).then(res => {
            this.resData = res.data;
            if (this.resData.pageNum == 0) {
              this.resData.pageNum = 1
            }
          })
        }
      },

      choose() {
        if (this.chooseList.length > 0) {

          this.$confirm('确定选择' + this.chooseList.length + '条关联数据？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$emit('choose', {value: this.chooseList});
            this.$refs.table.clearSelection();
            this.visible = false;
          }).catch(() => {
          });
        } else {
          this.$alert('请至少选择一条数据', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false
        }
      },

      handleSelectionChange(val){
        this.chooseList = val
      },

      resetForm() {
        this.dataForm = this.metaQuery();
        this.$refs.table.clearSelection();
        this.list();
      },

      closeWindow(){
        this.dataForm = this.metaQuery();
        this.$refs.table.clearSelection();
        this.visible = false;
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
