<template>
  <!-- ========================== 医疗机构采购分析 ========================= -->
  <!-- 表格 -->
  <div class="tablebox">
    <!-- 表格查询表单 -->
    <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
      <el-form-item>
        <el-input v-model="query.name"  @keyup.enter.native="searchEnterFun"  placeholder="买方机构" size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker type="date"  @keyup.enter.native="searchEnterFun"  placeholder="订单日期" v-model="query.searchBenDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"></el-date-picker>
             &nbsp;至&nbsp;
        <el-date-picker type="date"  @keyup.enter.native="searchEnterFun"  placeholder="订单日期" v-model="query.searchEndDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
        <el-button type="warning" @click="reset()" size="small">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格列表 -->
    <div class="tableset">
      <el-table
        :data="resData.list"
        border
        stripe
        @sort-change="sortChang"
      >
       <!-- <el-table-column type="index" width="50" header-align="left" align="center" label="序号"></el-table-column>-->
        <el-table-column label="买方机构" show-overflow-tooltip prop="a.name" sortable="custom" >
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="基药品种数" header-align="left" align="right" prop="a.base_Item_Count" sortable="custom" >
          <template slot-scope="scope">
            <span>{{ scope.row.baseItemCount }}</span>
          </template>
        </el-table-column>
        <el-table-column label="品种数" header-align="left" align="right" width="70" prop="a.item_Count" sortable="custom" >
          <template slot-scope="scope">
            {{ scope.row.itemCount }}
          </template>
        </el-table-column>
        <el-table-column label="基药采购金额（元）" header-align="left" align="right" prop="a.base_Buyer_Money" sortable="custom" >
          <template slot-scope="scope">
            <span>{{ priceFormat(scope.row.baseBuyerMoney) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="采购金额（元）" header-align="left" align="right" width="110" prop="a.buyer_Money" sortable="custom" >
          <template slot-scope="scope">
           {{ priceFormat(scope.row.buyerMoney) }}
          </template>
        </el-table-column>
        <el-table-column label="基药验收金额（元）" header-align="left" align="right" prop="a.base_Receive_Money" sortable="custom" >
          <template slot-scope="scope">
            <span>{{ priceFormat(scope.row.baseReceiveMoney) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="验收金额（元）" header-align="left" align="right" width="110" prop="a.receive_Money" sortable="custom" >
          <template slot-scope="scope">
            {{ priceFormat(scope.row.receiveMoney) }}
          </template>
        </el-table-column>
        <el-table-column label="基药退货金额（元）" header-align="left" align="right" prop="a.base_Return_Money" sortable="custom" >
          <template slot-scope="scope">
            <span>{{ priceFormat(scope.row.baseReturnMoney) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="退货金额（元）" header-align="left" align="right" width="110" prop="a.return_Money" sortable="custom" >
          <template slot-scope="scope">
            {{ priceFormat(scope.row.returnMoney) }}
          </template>
        </el-table-column>
        <el-table-column label="基药采购金额比（%）" header-align="left" align="right" prop="buyer_Rate" sortable="custom" >
          <template slot-scope="scope">
            <span>{{ scope.row.buyerRate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="基药验收金额比（%）" header-align="left" align="right" prop="RECEIVE_RATE" sortable="custom" >
          <template slot-scope="scope">
            {{ scope.row.revevieRate }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <div class="operates">
            <a title="品种明细" class="green" @click="varietyItem(scope.row.buyerOrgId,scope.row.equalFlag)" size="small">品种明细</a>
            <a title="采购明细" class="green" @click="orderItem(scope.row.buyerOrgId,scope.row.equalFlag)" size="small">采购明细</a>
            <!--<span v-if="this.$route.params.buyerOrgId">-->
              <a v-if="scope.row.roleCode == 'serviceCenter' || scope.row.roleCode == 'manage'" title="下属机构" class="green" @click="subordinateOrg(scope.row.buyerOrgId,1)" size="small">
                <span v-if="aa != 1">
                    下属机构
                </span>
              </a>
            <!--</span>-->
           <!-- <a v-if="scope.row.equalFlag == '2'" title="下属机构" class="operation-btn" @click="subordinateOrg(scope.row.buyerOrgId)" size="small">下属机构</a>-->
            </div>
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
  </div>
  <!-- ========================== 主内容end ========================= -->

</template>
<script>

  // 引入用户相关请求
  import {buyerOrgRequestReport} from 'src/axios/trade/information/report'
  import {priceFormat,keyBoardEnter} from "src/utils";

  export default {
    name:'based-city-snder-list',
    data () {
      return {
        currentOrder: undefined,
        aa:'',
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        }
      }
    },
    created () {
      this.list();
      this.aa = this.$route.params.whether;
    },
    methods: {
      sortChang(value){
        let sortType=" desc"
        if(value.order.startsWith("asc")){
          sortType=" asc";
        }
        this.currentOrder=value.prop + sortType;
        this.list()
      },
      priceFormat,
      subordinateOrg(buyerOrgId,whether){
        this.$router.push("/trade/dataReport/reportListSubordinate/"+buyerOrgId+"/"+whether);
        window.history.go(-0);
    },
      reset(){
        this.query = this.metaQuery();
        this.list();
      },
      varietyItem(buyerOrgId,equalFlag){
        this.$router.push("/trade/dataReport/reportProductList/"+buyerOrgId);
      },
      orderItem(buyerOrgId,equalFlag){
        this.$router.push("/trade/dataReport/balanceItemList/" + buyerOrgId + "/" + equalFlag);
      },
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {
          // 前后台交互数据封装格式
          orderBy: undefined,
          pageNum: 1,
          pageSize: 10,
          size: 10,
          startRow: 0,
          endRow: 0,
          total: 0,
          pages: 0,
          prePage: 0,
          nextPage: 0,
          isFirstPage: true,
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
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
      },
      metaQuery () { // 表单查询数据初始化
        return {
            id: '',
            name: '',
            buyerOrgId:this.$route.params.buyerOrgId,
            searchBenDate: '',
            searchEndDate: ''
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy=this.currentOrder;
        buyerOrgRequestReport(this.resData, this.query).then(res => {
          this.resData = res.data
          if(this.resData.pageNum===0){
            this.resData.pageNum=1
          }
        })
      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val;
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val;
        this.reportList()
      }
    }
  }
</script>

