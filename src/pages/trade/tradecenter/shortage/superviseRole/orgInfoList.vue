<template>
  <!-- ========================== 主内容start ========================= -->
  <!-- 表格 -->
  <div class="tablebox">
    <!-- 表格查询表单 -->
    <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
      <el-form-item>
        <el-input v-model="query.searchBuyerOrgName" @keyup.enter.native="searchEnterFun" placeholder="医疗机构"
                  size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" size="small" @click="searchEnterFun">查询</el-button>
        <el-button size="small" @click="returnForm" class="el-button-pale">返回</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格列表 -->
    <div class="tableset">
      <el-table
        :data="resData.list"
        @sort-change="sortChang"
        border
        stripe>
        <!--<el-table-column label="序号" header-align="left" align="center" type="index" width="50"></el-table-column>-->
        <el-table-column label="医疗机构" prop="dos.BUYER_ORGNAME" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.buyerOrgName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="配送企业" prop="dos.SENDER_NAME" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.senderName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="月供应量" prop="dos.SUPPLY_QUANTITY" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.supplyQuantity }}</span>
          </template>
        </el-table-column>
        <el-table-column label="月需求量" prop="dos.DEMAND_QUANTITY" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.demandQuantity }}</span>
          </template>
        </el-table-column>
        <el-table-column label="制剂价格" prop="dos.PRICE" sortable="custom">
          <template slot-scope="scope">
            <span>{{ priceFormat(scope.row.price) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="短缺类型" prop="dos.SHORTAGE_TYPE" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="scope.row.shortageType==1">断货</span>
            <span v-if="scope.row.shortageType==2">供应量不足或不及时</span>
          </template>
        </el-table-column>
        <el-table-column label="短缺起始月份" prop="dos.SHORTAGE_DATE" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.shortageDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="短缺原因" prop="dos.REASON_TYPE" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.reasonType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否使用可代替药品" prop="dos.IS_ALTERNATIVE" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="scope.row.isAlternative==1">无替代</span>
            <span v-else-if="scope.row.isAlternative==2">同通用名药品替代</span>
            <span v-else>功效相同或相近的异通用名药品替代</span>
          </template>
        </el-table-column>
        <el-table-column label="填表人" prop="dos.CREATE_USER" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.createUser }}</span>
          </template>
        </el-table-column>
        <el-table-column label="填表电话" prop="dos.TELEPHONE" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.telephone }}</span>
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
  <!-- ========================== 主内容end ========================= -->

</template>
<script>

  // 引入用户相关请求
  import {wsjOrgInfoList} from 'src/axios/trade/shortage/buyerRole/shortageUpList'
  import {priceFormat, keyBoardEnter} from "src/utils";


  export default {
    name: 'orderItemStaticList',
    data() {
      return {
        currentOrder: undefined,
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        expanded: true,
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        }
      }
    },
    created() {
      this.query.issueId = this.$route.params.issueId
      this.query.productId = this.$route.params.productId
      this.list()
    },
    methods: {
      priceFormat,
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData() {
        return {// 前后台交互数据封装格式
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
      metaQuery() { // 表单查询数据初始化
        return {

          searchBuyerOrgName: undefined,
          issueId: undefined,
          productId: undefined

        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list() {
        this.resData.orderBy = this.currentOrder;
        wsjOrgInfoList(this.resData, this.query).then(res => {
          this.resData = res.data
          if (this.resData.pageNum === 0) {
            this.resData.pageNum = 1
          }
        })
      },
      searchEnterFun(e) {
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      sortChang(value) {
        let sortType = " desc"
        if (value.order.startsWith("asc")) {
          sortType = " asc";
        }
        this.currentOrder = value.prop + sortType;
        this.list()
      },
      // ************************ 分页操作 ************************
      handleSizeChange(val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val
        this.list()
      },
      returnForm() {
        window.history.go(-1);
      }
    }
  }
</script>
