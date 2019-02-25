<template xmlns="http://www.w3.org/1999/html">
  <div>
    <!---------------------------------------------------------- 不要了 ------------------------------------------------>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <div class="table-form">
        <el-form ref="query" :model="query"  label-position="right" size="small">
          <div class="formrow">
            <span class="date-group">
              <el-date-picker type="date" size="small" @keyup.enter.native="searchEnterFun" placeholder="开始日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd" v-model="query.searchBenDate"></el-date-picker>
              &nbsp;至&nbsp;
              <el-date-picker type="date" size="small" @keyup.enter.native="searchEnterFun" placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="query.searchEndDate"></el-date-picker>
            </span>
            <span>
              <el-input v-model="query.bakSenderEasy" @keyup.enter.native="searchEnterFun" placeholder="配送企业" size="small"></el-input>
            </span>
            <span>
              <el-input v-model="query.bakBuyerEasy" @keyup.enter.native="searchEnterFun" placeholder="买方机构" size="small"></el-input>
            </span>
            <span>
              <el-input v-model="query.searchSenderName" @keyup.enter.native="searchEnterFun" placeholder="关键字" size="small"></el-input>
            </span>
            <span>
              <el-select v-model="query.degreeFlag" size="small" @keyup.enter.native="searchEnterFun" placeholder="紧急程度">
                <el-option label="普通" value="0"></el-option>
                <el-option label="部分急需" value="1"></el-option>
                <el-option label="全部急需" value="2"></el-option>
              </el-select>
            </span>
            <span>
              <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
              <el-button type="warning" @click="restQuery()" size="small">重置</el-button>
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
          <!--<el-table-column type="index" width="80" label="序号"></el-table-column>-->
          <el-table-column label="订单号">
            <template slot-scope="scope">
              {{ scope.row.orderCode }}
            </template>
          </el-table-column>
          <el-table-column label="配送企业">
              <template slot-scope="scope">
                <span>{{ scope.row.bakSenderEasy }}</span>
              </template>
          </el-table-column>
            <el-table-column label="发送时间">
                <template slot-scope="scope">
                  <span>{{ scope.row.createDate }}</span>
                </template>
            </el-table-column>
            <el-table-column label="订购金额（元）" width="120" align="right">
              <template slot-scope="scope">
                <span>{{ priceFormat(scope.row.requestTotal) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="到货金额（元）" width="120" align="right">
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
              <span>{{ scope.row.orderState }}</span>
            </template>
          </el-table-column>
            <el-table-column label="操作" width="120">
              <template slot-scope="scope">
              <a @click="handleGoShow(scope.row.id)" class="operation-btn">查看</a>
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
        <ul class="explain">
          <li>标记说明：</li>
          <li><i class="ico icon-jc"></i><span>部分急需</span></li>
          <li><i class="ico icon-ji"></i><span>全部急需</span></li>
        </ul>
      </div>
      <div class="foot-btn">
        <div class="foot-left">
          <span><el-button type="warning" size="small">导出到货</el-button></span>
          <span><el-button type="warning" size="small">导出订单</el-button></span>
          <span><el-checkbox v-model="checked" size="small">包含明细</el-checkbox></span>
        </div>
      </div>
    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>


  // 引入用户相关请求
  import {selectOrderList} from 'src/axios/trade/buyerrole/arrive/buyerTabView/orderList'
  import {priceFormat,keyBoardEnter} from "src/utils";

  export default {
    name: "orderList",
    data () {
      return {
        checked:false,
        value2:undefined,
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
        options: [{
          value: '选项1',
          label: '到货中'
        },{
          value: '选项2',
          label: '完成'
        },{
          value: '选项3',
          label: '到货修改'
        }]
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
      },
      metaQuery () { // 表单查询数据初始化
        return {
            searchBenDate: undefined,
            searchEndDate: undefined,
            bakSenderEasy: undefined,
            bakBuyerEasy: undefined,
            searchSenderName: undefined,
            degreeFlag: undefined
        }
      },
      restQuery(){
        this.query=this.metaQuery()
        this.list()
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
        selectOrderList(this.resData, this.query).then(res => {
          this.resData = res.data;
           if(this.resData.pageNum===0){
             this.resData.pageNum=1
           }
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
      }
    }
  }
</script>

