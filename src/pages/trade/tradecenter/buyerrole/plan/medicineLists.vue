<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">

      <!-- 表格查询表单 -->
      <div class="table-form">

        <el-form ref="query" :model="query" size="small" :inline="true" class="demo-form-inline">
          <div class="formrow">
            <span>
                <el-input v-model="query.searchProductName" @keyup.enter.native="searchEnterFun"  placeholder="品名" size="small"></el-input>
            </span>
            <span>
                <el-input v-model="query.searchMedicalSpec" @keyup.enter.native="searchEnterFun"  placeholder="规格" size="small"></el-input>
            </span>
            <span>
                <el-input v-model="query.searchOrgName" @keyup.enter.native="searchEnterFun"  placeholder="生产企业" size="small"></el-input>
            </span>
            <span>
                <el-input v-model="query.searchSenderName" @keyup.enter.native="searchEnterFun"  placeholder="配送企业" size="small"></el-input>
            </span>
            <span style="float: right; margin-right: -12px;">
              <el-button icon="iconfont icon-cartplus" size="small" @click = "handleMyShopCar()">
                本院购物车
                <span class="badges" v-if="this.requestCarQty != null">{{this.requestCarQty}}</span>
              </el-button>
            </span>
          </div>

            <div class="formrow">
              <span>
                <el-date-picker type="date" placeholder="历史采购开始日期" v-model="query.searchBenDate" @keyup.enter.native="searchEnterFun"
                                format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"></el-date-picker>
                  &nbsp;至&nbsp;
                <el-date-picker type="date" placeholder="历史采购结束日期" v-model="query.searchEndDate" @keyup.enter.native="searchEnterFun"
                                format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"></el-date-picker>
              </span>
            <span>
                <el-button type="warning" @click="searchEnterFun" size="small">查询</el-button>
                <el-button type="primary" @click="restQuery()" size="small">重置</el-button>
            </span>

          </div>
        </el-form>
      </div>

      <div class="tableset">

        <el-table ref="multipleTable" :data="resData.list" tooltip-effect="dark"
                  style="width: 100%" @selection-change="handleSelectionChange" border>
          <!--<el-table-column type="selection" width="55"></el-table-column>-->
          <el-table-column label="药品信息" width="300" prop="drugDetail">
            <template slot-scope="scope" class="drugMessage">
              <p>
                <span class="icon-sign sign-district" v-if="scope.row.purchaseProductId != '0'">购</span>
                {{ scope.row.bakProductName }}（商品名：{{ scope.row.bakTradeName }}）
                <span class="icon-sign sign-basic" v-if="scope.row.contractType != '0'">基</span>
                <span class="icon-sign sign-district" v-if="scope.row.regionId != '0'">区</span>
              </p>
              <p class="drugCon">
                规格包装：{{ scope.row.bakMedicalSpec}} × {{ scope.row.bakStandSpecRate}} {{scope.row.bakUseUnit}} / {{ scope.row.bakSpecUnit}}
                中大包装：{{ scope.row.bakMiddleStandRate}}/{{ scope.row.bakBigMiddleRate}}
              </p>
              <p class="drugCon">生产企业：{{ scope.row.bakProducerShortname}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="drugStorage" label="药库" v-if="this.repositoryFlag">
            <template slot-scope="scope">
              <span>{{ scope.row.warehouseName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="价格" show-overflow-tooltip>
            <template slot-scope="scope">
                <p>{{ priceFormat(scope.row.hitPrice) }}</p>
                <div class="price-ico">
                  <div class="price-max">{{ priceFormat(scope.row.maxTradePrice) }}</div>
                  <div class="price-min">{{ priceFormat(scope.row.minTradePrice) }}</div>
                </div>
            </template>
          </el-table-column>
          <el-table-column prop="enterprise" label="配送企业" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-select v-model="scope.row.value" placeholder="请选择" size="small">
                <el-option v-for="item in scope.row.sendBusiness" :key="item.senderId" :label="item.senderName" :value="item.senderId">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="requestQty" label="数量" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-input-number size="small" v-model="scope.row.requestQty" :min="1" :step="10"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="操作" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="primary" size="small" plain @click="handleSavePurchase(scope.row.recordId, scope.row.value,scope.row.requestQty)">加入购物车</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
      <div class="sign">
        <span class="text">标记说明：</span>

        <span class="icon-sign sign-district">区</span>
        <span class="text">区目录药品</span>
        <span class="icon-sign sign-basic">基</span>
        <span class="text">基本药物目录</span>
        <span class="icon-sign sign-district">购</span>
        <span class="text">购物车</span>

      </div>
    </div>
  </div>

</template>
<script>

  // 引入用户相关请求
  import {medicineList,insertPurchaseCar,findCarTotal} from 'src/axios/trade/purchase/purchase'
  import {priceFormat,keyBoardEnter} from "src/utils";

  export default {


    data() {
      return {
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        requestQty : undefined,
        purchaseId : undefined,
        requestCarQty: undefined,
        wareHouseId: undefined,
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },

      }
    },
    created () {
      this.list()
    },

    mounted(){
      var _this = this;
      // 初始化表格已选数据
      var apiData = this.resData.list;

      var checkArr = [];
      for(let i=0; i<apiData.length; i++){
        if(apiData[i].isChecked){
          checkArr.push(i);
        }
      }
      _this.checkedItems = checkArr;
      _this.tableData = apiData;
      _this.$nextTick(function(){
        _this.checked(); // 每次更新了数据就触发这个函数
      });
    },
    methods: {
      priceFormat,
      checked(){
        //首先el-table添加ref="multipleTable"引用标识
        var checkedItem = this.checkedItems;
        for(let i=0; i<checkedItem.length; i++){
          this.$refs.multipleTable.toggleRowSelection(this.tableData[checkedItem[i]],true);
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      /*handleSelect(sel, row) {
        row.isChecked = !row.isChecked;
      },*/
      handleChange(value) {
      },
      handleSizeChange(val) {
      },
      handleCurrentChange(val) {
      },
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaQuery () { // 表单查询数据初始化
        return {
          query: {
            id: undefined,
            searchRepositoryId: undefined,
            searchProductName: undefined,
            searchMedicalSpec: undefined,
            searchOrgName: undefined,
            searchSenderName:undefined,
            searchBenDate:undefined,
            searchEndDate:undefined,
            list: undefined
          }
        }
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        medicineList(this.resData, this.query).then(res => {
          this.resData = res.data
          if(this.resData.pageNum === 0){
            this.resData.pageNum = 1
          }
          findCarTotal("0").then(res => {
            this.requestCarQty = res.data.requestCarQty;
            this.purchaseId = res.data.purchaseId;
          })
        })

      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      },
      handleMyShopCar(){
        this.$router.push("/trade/manage/buyerrole/medicineShoppingList/" + this.purchaseId)
      },
      handleSavePurchase(recordId, senderId, requestQty){
        if(null == senderId){
          this.$alert('请选择配送', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          })
          return false
        }else {
          insertPurchaseCar(recordId, senderId, requestQty).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.restQuery()
              }
            })
          })
        }
      },
      restQuery() {
        this.query = this.metaQuery()
        this.list();
      },
      metaData () {
        return {
          resData: { // 前后台交互数据封装格式
            pageNum: 1,
            pageSize: 20,
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
            list: []
          }
        }
      }
    }
  }
</script>


