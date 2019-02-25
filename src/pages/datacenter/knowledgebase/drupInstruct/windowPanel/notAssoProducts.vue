<template>
  <el-dialog
    :title="'选择关联产品'"
    :close-on-click-modal="false"
    width="75%"
    :visible.sync="visible">
    <el-form :model="dataForm" ref="dataForm"
             label-width="150px" label-position="left" :inline="true" size="small" class="table-form">
        <el-form-item>
          <el-input v-model="dataForm.searchNameOrCode" placeholder="通用名或产品编码" size="small" @keyup.enter.native="searchEnterFun"></el-input>
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
        @selection-change="handleSelectionChange"
        :row-key="getRowKeys"
        @sort-change="sortChangeFunc"
        border
        stripe>
        <el-table-column width="50" type="selection" :reserve-selection="true" align="center"></el-table-column>
        <el-table-column label="产品名称" prop="general_name" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.catDrug.nameChn }}</span>
          </template>
        </el-table-column>
        <el-table-column label="剂型" prop="doseage_name" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.catDoseageForm==null?'':scope.row.catDoseageForm.nameChn }}</span>
          </template>
        </el-table-column>
        <el-table-column label="规格" prop="SPEC" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.catDrug.spec }}</span>
          </template>
        </el-table-column>
        <el-table-column label="单位转换比" prop="STAND_RATE" sortable="custom" width="90">
          <template slot-scope="scope">
            <span>{{ scope.row.catDrug.standRate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="包材" prop="wrap_name" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.catWrap==null?'':scope.row.catWrap.nameChn }}</span>
          </template>
        </el-table-column>
        <el-table-column label="生产企业" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.catOrg.name }}</span>
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
      <el-button size="small" type="primary" @click="chooseProducts">选择</el-button>
      <el-button size="small" @click="visible = false">关闭</el-button>
    </span>

  </el-dialog>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  import {showProducts} from 'src/axios/datacenter/basedata/manual/manual'
  import {notAsso} from 'src/axios/datacenter/basedata/manual/manual'
  import {keyBoardEnter} from "src/utils";

  export default {
    components: {ElCol},
    name: "notAssoProducts",
    data() {
      return {
        visible: false,
        isUpdate: false,
        manualId: '',
        productId: '',
        lastSelected: [],
        resData: this.metaData(),
        dataForm: this.metaQuery()
      }
    },
    methods: {
      //  排序查询
      sortChangeFunc(value){
        let sortType=" desc"
        if(value.order != null) {
          if (value.order.startsWith("asc")) {
            sortType = " asc";
          }
          this.dataForm.orderBy = value.prop + sortType;
          this.metaFrom();
        }
      },
      //  回车查询
      searchEnterFun(e){
        // this.$store.state.pageSeach.pageNum=1;
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          if(this.dataForm.searchNameOrCode){
            this.metaFrom2();
          }
        })
      },
      //  查询
      // search(){
      //   this.$store.state.pageSeach.pageNum=1;
      //   this.resData.pageNum=1;
      //   this.metaFrom2();
      // },
      fillData(nameChn, id, isUpdate) {
        this.visible = true;
        this.resData = this.metaData();
        if (isUpdate) {
          this.manualId = id;
        } else {
          this.productId = id;
        }
        this.isUpdate = isUpdate;
        this.nameChn = nameChn;
        this.metaFrom();
      },
      //  查询重置
      metaFrom2(){
        this.$refs.multipleTable.clearSelection();
        //修改展示未关联
        if (this.isUpdate) {
          notAsso(this.nameChn, this.manualId, this.resData, this.dataForm.searchNameOrCode,this.dataForm.orderBy).then(res => {
            this.resData = res.data;
        });
        } else {
          //一般展示全部
          showProducts(this.nameChn, this.productId, this.resData, this.dataForm.searchNameOrCode,this.dataForm.orderBy).then(res => {
            this.resData = res.data;
        })
        }
      },
      metaFrom(){
        //修改展示未关联
        if (this.isUpdate) {
          notAsso(this.nameChn, this.manualId, this.resData, this.dataForm.searchNameOrCode,this.dataForm.orderBy).then(res => {
            this.resData = res.data;
          });
        } else {
          //一般展示全部
          showProducts(this.nameChn, this.productId, this.resData, this.dataForm.searchNameOrCode,this.dataForm.orderBy).then(res => {
            this.resData = res.data;
          })
        }
      },
      resetForm() {
        this.dataForm = this.metaQuery();
        this.resData= this.metaData();
        this.metaFrom2();
      },
      getRowKeys(row){
        return row.catProduct.id;
      },
      handleSelectionChange(val){
        this.assoList = val;
      },
      chooseProducts() {
        if (this.assoList.length > 0) {
          this.$confirm('确认关联选择的' + this.assoList.length + '个产品', '确认', {
            confirmButtonText: '确定',
            cancelButtonText: '重选',
            type: 'warning'
          }).then(() => {
            //this.lastSelected = this.assoList;
            this.visible = false;
            this.$emit('chooseProducts', {value: this.assoList})
          })
        } else {
          this.$alert('请至少选择一条数据', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false
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
          assoList: [],
          searchNameOrCode: '',
          orderBy:undefined
        }
      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        if (this.resData.pageSize === 0) {
          this.resData.pageSize = 10
        }
        this.metaFrom()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        if (this.resData.pageNum === 0) {
          this.resData.pageNum = 1
        }
        this.metaFrom()
      }
    }
  }
</script>

