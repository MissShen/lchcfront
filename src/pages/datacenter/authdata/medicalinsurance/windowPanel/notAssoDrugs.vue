<template>
  <el-dialog
    :title="'未关联药品信息'"
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
          <el-input v-model="dataForm.searchContent" placeholder="关键词" @keyup.enter.native="searchEnterFun" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
          <el-button type="warning" @click="resetForm" size="small">重置</el-button>
        </el-form-item>
    </el-form>

    <div class="tableset">
      <el-table
        ref="multipleTable"
        :row-key="getRowKeys"
        @selection-change="handleSelectionChange"
        :data="resData.list"
        @sort-change="sortChangeFunc"
        border
        stripe>
        <el-table-column width="50" type="selection" :reserve-selection="true" align="center"></el-table-column>
        <el-table-column label="药品编码" prop="code" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column label="通用名" prop="name_chn" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.nameChn }}</span>
          </template>
        </el-table-column>
        <el-table-column label="剂型名称" prop="doseage_form_code_name" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.doseageFormCodeName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="规格" prop="spec" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.spec }}</span>
          </template>
        </el-table-column>
       <!-- <el-table-column label="单位转换比">
          <template slot-scope="scope">
            <span>{{ scope.row.standRate }}</span>
          </template>
        </el-table-column>-->
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
      <el-button size="small" type="primary" @click="buttonForm()">选择</el-button>
      <el-button size="small" @click="visible = false">关闭</el-button>
    </span>

  </el-dialog>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  // 引入用户相关请求
  import {queryUnRelateDrugList} from  'src/axios/datacenter/authdata/medicalinsurance/medicalinsurance'
  import {keyBoardEnter} from "src/utils";

  export default {
    components: {ElCol},
    name: "notAssoDrugs",
    props: {
      selectedObj: {
        type: Object
      }
    },
    data() {
      return {
        visible: false,
        ids:undefined,
        codes:undefined,
        resData: this.metaData(),
        dataForm: this.metaQuery(),
        assoList:[],
      }
    },
   /* created () {
      this.list()
    },*/
    methods: {
      //  回车查询
      searchEnterFun(e){
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          this.list2();
        })
      },
      //  查询
      // search(){
      //   this.resData.pageNum=1;
      //   this.list2();
      // },
      //  页面初始化
      fillData(chooseDrugsId,chooseDosagesCode) {
        this.visible = true;
        this.ids=chooseDrugsId;
        this.dataForm.chooseDrugsId=chooseDrugsId;
        this.codes=chooseDosagesCode;
        this.dataForm.chooseDosagesCode=chooseDosagesCode;
        this.list();
      },
      //  查询重置时用
      list2(){
        this.$refs.multipleTable.clearSelection();
        queryUnRelateDrugList(this.resData,this.dataForm).then(res => {
          this.resData=res.data;
      })
      },
      list(){
        queryUnRelateDrugList(this.resData,this.dataForm).then(res => {
          this.resData=res.data;
        })
      },
      resetForm() {
        this.resData= this.metaData();
        this.dataForm = this.metaQuery();
        this.dataForm.chooseDrugsId=this.ids;
        this.dataForm.chooseDosagesCode=this.codes;
        this.list2();
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
          'chooseDrugsId':undefined,
          'chooseDosagesCode':undefined,
          'searchType': '0',
          'searchContent': undefined,
          'orderBy':undefined
        }
      },
      //  排序查询
      sortChangeFunc(value){
        let sortType=" desc"
        if(value.order != null) {
          if (value.order.startsWith("asc")) {
            sortType = " asc";
          }
          this.dataForm.orderBy = value.prop + sortType;
          this.list();
        }
      },
      getRowKeys(row){
        return row.id;
      },
      //  选择选中对象存入数据组中
      handleSelectionChange(val){
        this.assoList = val;
      },
      //  新选择药品名称
      buttonForm() {
        if (this.assoList.length > 0) {
          this.$confirm('确认选择' + this.assoList.length + '个药品', '确认', {
            confirmButtonText: '确定',
            cancelButtonText: '重选',
            type: 'warning'
          }).then(() => {
            this.visible = false;
            this.$emit('chooseRelateDrugsList', {value: this.assoList})
          });
        } else {
          this.$alert('请至少选择一条数据', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false;
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
