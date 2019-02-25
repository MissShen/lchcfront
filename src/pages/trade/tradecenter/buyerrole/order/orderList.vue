<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <div class="table-form">
        <el-form ref="query" :model="query" size="small">
          <div class="formrow">
            <span>
                <el-select v-model="query.orderState" @keyup.enter.native="searchEnterFun" size="small" placeholder="订单状态">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="未阅读" value="1"></el-option>
                  <el-option label="已阅读" value="2"></el-option>
                  <el-option label="已发货" value="3"></el-option>
                  <el-option label="到货中" value="4"></el-option>
                  <el-option label="已完成" value="5"></el-option>
                  <el-option label="已作废" value="6"></el-option>
                  <el-option label="缺货" value="7"></el-option>
                  <el-option label="断货" value="8"></el-option>
                  <el-option label="到货修改" value="9"></el-option>
                  <!--<el-option-->
                  <!--v-for="item in options"-->
                  <!--:key="item.value"-->
                  <!--:label="item.label"-->
                  <!--:value="item.value">-->
                </el-select>
            </span>
            <span>
              <el-select v-model="query.degreeFlag" @keyup.enter.native="searchEnterFun" size="small" placeholder="紧急程度">
                <el-option label="全部" value=""></el-option>
                <el-option label="普通" value="0"></el-option>
                <el-option label="部分急需" value="1"></el-option>
                <el-option label="全部急需" value="2"></el-option>
              </el-select>
            </span>
            <span>
              <el-input v-model="query.bakBuyerEasy" @keyup.enter.native="searchEnterFun" placeholder="买方机构" size="small"></el-input>
            </span>
            <span>
              <el-input v-model="query.bakSenderEasy" @keyup.enter.native="searchEnterFun" placeholder="配送企业" size="small"></el-input>
            </span>
            <span>
              <el-input v-model="query.orderCode" @keyup.enter.native="searchEnterFun" placeholder="订单号" size="small"></el-input>
            </span>
            <span class="date-group">
              <el-date-picker type="date" size="small" @keyup.enter.native="searchEnterFun" placeholder="开始发送日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="query.searchBenDate"></el-date-picker>
              &nbsp;至&nbsp;
              <el-date-picker type="date" size="small" @keyup.enter.native="searchEnterFun" placeholder="结束发送日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"  v-model="query.searchEndDate"></el-date-picker>
            </span>
          <span>
            <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
            <el-button type="warning" size="small">重置</el-button>
          </span>
          </div>
        </el-form>
      </div>
      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe>
          <!--<el-table-column type="index" width="80" header-align="left" align="center" label="序号"></el-table-column>-->
          <el-table-column label="订单号">
            <template slot-scope="scope">
              <span class="jinji_ye" v-if="scope.row.degreeFlags == '1'"></span>
              <span class="jinji_red" v-if="scope.row.degreeFlags == '2'"></span>
              {{ scope.row.orderCode }}
            </template>
          </el-table-column>
          <el-table-column label="配送企业">
            <template slot-scope="scope">
              <span>{{ scope.row.bakSenderEasy }}</span>
            </template>
          </el-table-column>
          <el-table-column label="发送时间" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="订购金额" width="80" header-align="left" align="right">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.requestTotal) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="到货金额" width="80" header-align="left" align="right">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.receiveTotal) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="买方机构">
            <template slot-scope="scope">
              <span>{{ scope.row.bakBuyerEasy }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <span>{{ getFlag(scope.row.orderState) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <a class="operation-btn" @click="handleFromInfo(scope.row.orderId)">详情</a>
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
          <li><i class="ico icon-jihui"></i><span>部分药品急需</span></li>
          <li><i class="ico icon-ji"></i><span>全部药品急需</span></li>
        </ul>
      </div>
      <!-- 表格分页 -->
    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入数据请求
  import {list} from 'src/axios/trade/buyerrole/arrive/buyerTabView/orderList'
  import {priceFormat,keyBoardEnter} from "src/utils";

  export default {
    data () {
      return {
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
        value1: [{
          value: '选项1',
          label: '未阅读'
        },{
          value: '选项2',
          label: '已阅读'
        },{
          value: '选项3',
          label: '已发货'
        },{
          value: '选项4',
          label: '到货中'
        },{
          value: '选项5',
          label: '缺货'
        },{
          value: '选项6',
          label: '断货'
        }],
        //value1:'',
        value2: [{
          value: '选项7',
          label: '社区医院'
        },{
          value: '选项8',
          label: '二级以上医疗机构'
        }],
        // value2:''
      }
    },
    created () {
      this.list()
    },
    methods: {
      priceFormat,
      // -------------------------------------------- 数据初始化  -----------------------------------------
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
      },
      getFlag(flag){
        var arrFlag = ['未完成','未阅读','已阅读','已确认','到货中','完成','作废','缺货','断货','到货修改','已备完','备货中'];
        return arrFlag[flag];
      },
      metaQuery () { // 表单查询数据初始化
        return {
          query: {
            orderState: undefined,
            degreeFlag: undefined,
            bakBuyerEasy: undefined,
            bakSenderEasy: undefined,
            orderCode: undefined,
            searchBenDate: undefined,
            searchEndDate: undefined
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
        list(this.resData, this.query).then(res => {
          this.resData = res.data;
          if(this.resData.pageNum===0){
            this.resData.pageNum=1
          }
        })
      },
      handleFromInfo(orderId) {
        this.$router.push("/trade/manage/orderItemList/" + orderId)
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
<style>
  .jinji_red{width:13px; height:13px; background-color:#E45750;  display:inline-block;}
  .jinji_ye{width:13px; height:13px; background-color:#F4A222;  display:inline-block;}
</style>
