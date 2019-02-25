<template>
<el-dialog
  title="价格"
  :visible.sync="dialogVisible"
  width="800px" height="520px"
  :close-on-click-modal="false">
  <div>

    <!-- 表格 -->
      <!-- 表格查询表单 -->
      <div class="table-form">
        <el-form ref="query" :model="query" label-position="right" size="small"  >
          <div class="formrow">
            <span>
                <el-input v-model="query.buyerName" @keyup.enter.native="searchEnterFun"  placeholder="医疗机构"size="small" ></el-input>
            </span>
            <span>
                <el-input v-model="query.senderName" @keyup.enter.native="searchEnterFun"  placeholder=" 配送企业"size="small" ></el-input>
            </span>
            <span class="date-group">
              <el-date-picker type="date" size="small" @keyup.enter.native="searchEnterFun" placeholder="到货开始日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="query.searchBenDate"></el-date-picker>
            &nbsp;至&nbsp;
              <el-date-picker type="date" size="small" @keyup.enter.native="searchEnterFun" placeholder="到货结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="query.searchEndDate"></el-date-picker>
            </span>
            <el-form-item>
                <el-button type="success" size="small" @click="searchEnterFun">查询</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          @sort-change="sortChang"
          border
          stripe >
       <!--   <el-table-column type="index" width="50" header-align="left" align="center" label="序号"  ></el-table-column>-->
          <el-table-column label="医疗机构" prop="buyer_Org_Easy" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.buyerOrgEasy }}</span>
            </template>
          </el-table-column>
          <el-table-column label="价格" prop="unit_Price" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.unitPrice }}</span>
            </template>
          </el-table-column>
          <el-table-column label="配送企业" prop="sender_Org_Easy" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.senderOrgEasy }}</span>
            </template>
          </el-table-column>
          <el-table-column label="到货日期" prop="modify_Date" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.modifyDate }}</span>
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
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">关闭</el-button>
  </span>
</el-dialog>
</template>
<script>

  // 引入用户相关请求
  import {priceHistoryList} from 'src/axios/trade/purchase/purchase'
  import {priceFormat,keyBoardEnter} from "src/utils";

  export default {
    data () {
      return {
        resData: this.metaData(),//返回初始化
        query: this.metaQuery(), // 查询初始化
        multipleSelection: [],
        currentOrder:undefined,
        dialogVisible:false,
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        }
      }
    },
    /*created () {
      this.list()
    },*/
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      govPopupParam(param){
        this.dialogVisible = true;
        this.query.productId = param;
        this.list();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      metaData () {
        return {
          orderBy:undefined,
          pageNum: 1,
          pageSize: 10,
          size: 3,
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
          navigatePages: 3,
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
          productId: undefined,
          buyerName: undefined,
          senderName: undefined,
          searchBenDate: undefined,
          searchEndDate: undefined,
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy=this.currentOrder;
        priceHistoryList(this.resData,this.query).then(res => {
          this.resData = res.data;
          if(this.resData.pageNum === 0){
            this.resData.pageNum = 1
          }
        })
      },
      sortChang(value){
        let sortType=" desc"
        if(value.order.startsWith("asc")){
          sortType=" asc";
        }
        this.currentOrder=value.prop + sortType;
        this.list()
      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      }
    }
  }
</script>

