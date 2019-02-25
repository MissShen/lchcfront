<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <el-form ref="query" :model="query" label-position="right" :inline="true" size="small" class="table-form">
          <el-form-item>
              <el-input v-model="query.searchPurchaseCode"  @keyup.enter.native="searchEnterFun"  placeholder="采购单编号" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-date-picker type="date" placeholder="创建开始日期"  @keyup.enter.native="searchEnterFun"  v-model="query.searchBenDate"
                            format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"></el-date-picker>
            &nbsp;至&nbsp;
            <el-date-picker type="date" placeholder="创建结束日期"  @keyup.enter.native="searchEnterFun"  v-model="query.searchEndDate"
                            format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"></el-date-picker>
          </el-form-item>
          <el-form-item>
              <el-button type="success" size="small" @click="searchEnterFun">查询</el-button>
              <el-button type="warning" size="small" @click="restQuery()">重置</el-button>
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
          <!--<el-table-column type="index" width="50" header-align="left" align="center" label="序号">
          </el-table-column>-->
          <el-table-column label="采购单编号" prop="p.PURCHASE_CODE" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.purchaseCode }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" prop="p.CREATE_DATE" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="买方机构" show-overflow-tooltip prop="p.BAK_BUYER_EASY" sortable="custom">
            <template slot-scope="scope">
              {{ scope.row.bakBuyerEasy == null ?  scope.row.bakBuyerName : scope.row.bakBuyerEasy}}
            </template>
          </el-table-column>
          <el-table-column label="拟采购金额（元）" header-align="left" align="right" prop="p.REQUEST_TOTAL" sortable="custom">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.requestTotal) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="采购类别" prop="p.FLAG" sortable="custom">
            <template slot-scope="scope">
              <span>{{ getFlag(scope.row.flag) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="采购单别名" show-overflow-tooltip prop="p.BY_NAME" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.byName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="80">
            <template slot-scope="scope">
              <span v-if="roleCode == 'director' || (roleCode == 'serviceCenter' && (scope.row.secondCheck == '' || scope.row.secondCheck == null)) ">
                {{ getStateSecond(scope.row.purchaseState) }}
              </span>
              <span v-if="roleCode == 'service' || roleCode == 'manage' ||roleCode == 'doctor' || (roleCode == 'serviceCenter' && scope.row.secondCheck != '' && scope.row.secondCheck != null )">
                {{ getState(scope.row.purchaseState) }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <div class="operates">
                <span class="operation-btn blue-bord" @click="handleCheckOne(scope.row.purchaseId)">审批</span>
              </div>
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
        <ul class="explain">
          <li>标记说明：</li>
          <li><i class="ico icon-jc"></i><span>部分急需</span></li>
          <li><i class="ico icon-ji"></i><span>全部急需</span></li>
        </ul>
      </div>
    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求
  import {queryFirstApprovePurchaseList} from 'src/axios/trade/purchase/purchase';
  import {priceFormat,keyBoardEnter} from "src/utils";
  import {getRoleCode} from 'src/axios/trade/evaluate/evaluate';

  export default {
    name:'based-city-snder-list',
    data () {
      return {
        currentOrder: undefined,
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        roleCode:''
      }
    },
    created () {
      this.list();
      this.getRoleCode();
    },
    methods: {
      priceFormat,
      // -------------------------------------------- 数据初始化  -----------------------------------------
      sortChang(value){
        let sortType=" desc"
        if(value.order.startsWith("asc")){
          sortType=" asc";
        }
        this.currentOrder=value.prop + sortType;
        this.list()
      },
      metaData () {
        return {
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
      },
      metaQuery () { // 表单查询数据初始化
        return {
          id: undefined,
          searchPurchaseCode:undefined,
          searchBenDate:undefined,
          searchEndDate:undefined
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
        this.resData.orderBy=this.currentOrder;
        queryFirstApprovePurchaseList(this.resData, this.query).then(res => {
          this.resData = res.data
          if(this.resData.pageNum === 0){
            this.resData.pageNum = 1
          }
        })
      },
      getRoleCode(){
        getRoleCode().then(res => {
          this.roleCode = res.data
        })
      },
      handleCheckOne(purchaseId){
        this.$router.push("/trade/manage/firstInstanceRole/checkOne/" + purchaseId+"/"+'approve')
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
      restQuery() {
        this.query = this.metaQuery()
        this.list();
      },
      getFlag(flag){
        var arrFlag = ['本院订单', '临时订单', '本院补单', '临时补单'];
        return arrFlag[flag];
      },
      getState(state){
        var arrState = ['准备', '送一审', '发送', '一审拒绝','完成','送二审','二审拒绝','购物车状态'];
        return arrState[state];
      },
      getStateSecond(state){
        var arrState = ['准备', '送审', '发送', '一审拒绝','完成','送二审','二审拒绝','购物车状态'];
        return arrState[state];
      }
    }
  }
</script>
