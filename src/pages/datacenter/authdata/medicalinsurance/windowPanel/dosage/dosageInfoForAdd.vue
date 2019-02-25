<template>
  <div class="padding10">
    <el-form :model="dataForm" ref="dataForm"
             label-width="150px" label-position="left" :inline="true" size="small" class="table-form">
        <el-form-item>
          <el-select v-model="dataForm.searchType" size="small">
            <el-option label="中文名" value="2"></el-option>
            <el-option label="编码" value="1"></el-option>
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
        :data="resData.list"
        :row-key="getRowKeys"
        @selection-change="handleSelectionChange"
        @sort-change="sortChangeFunc"
        border
        stripe>
        <el-table-column width="50" type="selection" :reserve-selection="true" align="center"></el-table-column>
        <!--<el-table-column type="index" width="50" label="序号" :selectable='checkboxInit'></el-table-column>-->
        <el-table-column label="剂型名称" prop="name_chn" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.nameChn }}</span>
          </template>
        </el-table-column>
        <el-table-column label="剂型编码" prop="code" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.code }}</span>
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
</template>

<script>
  // 引入用户相关请求
  import {dosageFormList} from 'src/axios/datacenter/authdata/medicalinsurance/dosageformpackage';
  import ElCol from "element-ui/packages/col/src/col";
  import {keyBoardEnter} from "src/utils";

  export default {
    components: {ElCol},
    name: "dosageInfo",
    props: {
      parentId: [],
      required: true
    },
    data() {
      return {
        resData: this.metaData(),
        dataForm: this.metaQuery(),
        lastSelected: [],
        assoList: []
      }
    },
    created () {
      this.list();
    },
    methods: {
      metaData () {
        return {
          // 前后台交互数据封装格式
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
      metaQuery() {
        return {
          // 表单查询数据初始化
          searchType: "2",
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
      //  重置
      resetForm() {
        this.resData=this.metaData();
        this.dataForm = this.metaQuery();
        this.list2();
      },
      //  回车查询
      searchEnterFun:function (e){
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
      //  查询重置时采用
      list2() {
        this.$refs.multipleTable.clearSelection();
        dosageFormList(this.resData, this.dataForm).then(res => {
          this.resData = res.data;
        });
      },
      //  页面数据初始化
      list () {
        dosageFormList(this.resData, this.dataForm).then(res => {
          this.resData = res.data;
        });
      },
      getRowKeys(row){
        return row.code;
      },
      //  选择选中对象存入数据组中
      handleSelectionChange(val){
        this.assoList = val;
        this.setDosageIntoJsonArry();
      },
      //  组装到数组集合中传回到主页面
      setDosageIntoJsonArry() {
        this.parentId.length=0;
        for(var i=0;i< this.assoList.length;i++){
          var exist=false;
          for(var j=0;j< this.parentId.length;j++){
            if(this.assoList[i].code==this.parentId[j].code){
              exist=true;
            }
          }
          if(exist==false){
            var jo={};
            jo.name=this.assoList[i].nameChn;
            jo.code=this.assoList[i].code;
            this.parentId.push(jo);
          }
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
