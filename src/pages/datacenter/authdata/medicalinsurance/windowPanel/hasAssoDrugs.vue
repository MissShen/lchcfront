<template>
  <el-dialog
    :title="'药品信息'"
    :close-on-click-modal="false"
    width="75%"
    :visible.sync="visible">
    <el-form :model="dataForm" ref="dataForm"
             label-width="150px" label-position="left" :inline="true" size="small" class="table-form">
          <el-form-item>
            <el-select v-model="dataForm.searchNameOrCode" size="small">
              <el-option label="药品通用名" value="0"></el-option>
              <el-option label="药品编码" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="dataForm.searchContent" placeholder="关键词" size="small" @keyup.enter.native="searchEnterFun"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
            <el-button type="warning" @click="resetForm" size="small">重置</el-button>
          </el-form-item>
    </el-form>

    <div class="tableset">
      <el-table
        ref="multipleTable"
        :data="resData.list"
        :row-key="getRowKeys"
        @selection-change="handleSelectionChange"
        @sort-change="sortChangeFunc"
        border
        stripe>
        <el-table-column width="50" type="selection" :reserve-selection="true" align="center"></el-table-column>
        <el-table-column label="药品编码" prop="code" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column label="通用名" prop="name_chn" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.nameChn }}</span>
          </template>
        </el-table-column>
        <el-table-column label="规格" prop="spec" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.spec }}</span>
          </template>
        </el-table-column>
       <!-- <el-table-column label="单位转换比">
          <template slot-scope="scope">
            <span>{{ scope.row.spec }}</span>
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
      <el-button size="small" type="primary" @click="buttonForm()">删除关联</el-button>
      <el-button size="small" @click="visible = false">关闭</el-button>
    </span>

  </el-dialog>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  // 引入用户相关请求
  import {queryRelateDrugList2} from 'src/axios/datacenter/authdata/medicalinsurance/medicalinsurance';
  import {keyBoardEnter} from "src/utils";
  export default {
    components: {ElCol},
    name: "hasAssoDrugs",
    data() {
      return {
        visible: false,
        id:undefined,
        resData: this.metaData(),
        dataForm: this.metaQuery(),
        ids:undefined,
        assoList:[],
      }
    },
    methods: {
      //  回车查询
      searchEnterFun(e){
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          if(this.dataForm.searchContent){
            this.list2();
          }
        })
      },
      getRowKeys(row){
        return row.id;
      },
      //  查询
      // search(){
      //   this.resData.pageNum=1;
      //   this.list2();
      // },
      fillData(ids,id) {
        this.visible = true;
        this.id=id;
        this.ids=ids;
        this.list();
      },
      //  查询重置
      list2(){
        this.$refs.multipleTable.clearSelection();
        queryRelateDrugList2(this.resData,this.id,this.dataForm,this.ids).then(res => {
          this.resData = res.data;
      })
      },
      //  初始化跳页页面
      list(){
        queryRelateDrugList2(this.resData,this.id,this.dataForm,this.ids).then(res => {
          this.resData = res.data;
          console.log(this.resData,'1223')
      })
      },
      resetForm() {
        this.dataForm = this.metaQuery();
        this.resData= this.metaData();
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
          list:[],
        }
      },
      metaQuery () { // 表单查询数据初始化
        return {
          searchNameOrCode: "0",
          searchContent:undefined,
          orderBy:undefined
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
      //  选择选中对象存入数据组中
      handleSelectionChange(val){
        this.assoList = val;
      },
      //  新选择药品名称
      buttonForm() {
        if (this.assoList.length > 0) {
          this.$confirm('确认删除选定药品', '确认', {
            confirmButtonText: '确定',
            cancelButtonText: '重选',
            type: 'warning'
          }).then(() => {
            this.visible = false;
          this.$emit('deleteChooseDrugs', {value: this.assoList})
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
