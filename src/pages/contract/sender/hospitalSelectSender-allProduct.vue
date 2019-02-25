<template>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="padding10">
    <!-- 表格 -->
        <el-form ref="query" :model="query" size="small" :inline="true" class="table-form">
            <el-form-item class="width-120">
              <el-input v-model="query.productName"
                        maxlength="200" placeholder="品名" size="small" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item class="width-120">
              <el-input v-model="query.manufactureName"
                        maxlength="200" placeholder="生产企业名称" size="small" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
              <el-button type="warning" @click="resetForm()" size="small">重置</el-button>
            </el-form-item>
        </el-form>
      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe
          @selection-change="changeFun"
          @sort-change="sortChange">
          <el-table-column label="通用名" prop="NAME_CHN" sortable="custom" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.nameChn }}</span>
            </template>
          </el-table-column>
          <el-table-column label="产品名" prop="PRODUCT_NAME" sortable="custom" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.productName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品名" prop="TRADE_NAME" sortable="custom" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.tradeName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="剂型" prop="DOSEAGE_FORM_NAME" sortable="custom" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.doseageFormName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="规格" prop="SPEC" sortable="custom" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.spec }}</span>
            </template>
          </el-table-column>
          <el-table-column label="转换比" prop="STAND_RATE" sortable="custom" align="right">
            <template slot-scope="scope">
              <span>{{ scope.row.standRate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="单位" prop="SPEC_UNIT" sortable="custom" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.specUnit }}</span>
            </template>
          </el-table-column>
          <el-table-column label="包材" prop="WRAP_NAME" sortable="custom" >
            <template slot-scope="scope">
              <span>{{ scope.row.wrapName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="生产企业" prop="MANUFACTURE_NAME" sortable="custom" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.manufactureName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="价格" prop="DEAL_PRICE" align="right" header-align="left" sortable="custom" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.bidPrice) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="两票制" prop="twoVoteId" sortable="custom" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.twoVoteId != null">已签订</span>
              <span v-else style="color: #FF0000">未签订</span>
            </template>
          </el-table-column>
        </el-table>
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

  // 引入用户相关请求
  import {queryAllProductList, addProduct} from 'src/axios/contract/sender/hospitalSelectSender'
  import {priceFormat} from "src/utils"
  import { keyBoardEnter } from "src/utils"

  export default {
    props:{
      senderId:{
        type: String,
        required: true
      }
    },
    data () {
      return {
        currentOrder: undefined,
        resData: this.metaData(),
        form: this.metaForm(), // 表单初始化
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        visible: false,
        dataForm: this.metaForm(),
        multipleSelection:[]
      }
    },
    created () {
      this.list();
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      priceFormat,
      metaData () {
        return {
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
            list: []
        }
      },
      metaForm () { // 表单数据初始化
        return {
          productName : '',
          manufactureName : ''
        }
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
        this.resData.orderBy = this.currentOrder;
        queryAllProductList(this.resData, this.query, this.senderId).then(res => {
          this.resData = res.data
        })
      },
      //当选择项发生变化时会触发该事件
      changeFun(val) {
        this.multipleSelection = val;
      },
      saveProductList(){
        if(this.multipleSelection!=null && this.multipleSelection.length!=0){
          let arr=[];
          console.log(this.multipleSelection);
          for(let i=0;i<this.multipleSelection.length;i++){
            arr.push(this.multipleSelection[i]);
          }
          var jsonString = JSON.stringify(this.multipleSelection);
          addProduct(jsonString,this.senderId,this.type).then(res=>{
            this.$message({
              type: res.success == true ? 'success' : 'error',
              message: res.success == true ? res.data : '保存失败'
            })
            this.list();
          })
        }else{
          this.$message({
            type: 'warning',
            message: '请至少选择一条产品'
          })
        }
      },
      closeDialog(){
        this.query = this.metaQuery();
        this.visible = false;
        this.$parent.list();
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
      },
      sortChange(value){
        let sortType=" desc"
        if(!!value.order){
          if(value.order.startsWith("asc")){
            sortType=" asc";
          }
          this.currentOrder=value.prop + sortType;
        } else {
          this.currentOrder=undefined;
        }
        this.list();
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e , ()=>{
          this.list();
        })
      }
    }
  }
</script>
