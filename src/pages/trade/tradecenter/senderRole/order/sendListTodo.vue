<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
   <div class="tabs-panel">
      <span class="active">待处理订单</span>
   </div>
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <div class="table-form">
         <el-form ref="query" :model="query" label-position="right" size="small">
          <div class="formrow">
            <span>
                <el-select size="small" @keyup.enter.native="searchEnterFun"  v-model="query.searchOrderState" placeholder="订单状态">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="未阅读" value="1"></el-option>
                  <el-option label="已阅读" value="2"></el-option>
                  <el-option label="已确认" value="3"></el-option>
                  <el-option label="到货中" value="4"></el-option>
                  <el-option label="缺货" value="7"></el-option>
                  <el-option label="断货" value="9"></el-option>
                 </el-select>
            </span>
            <span>
              <el-select size="small" @keyup.enter.native="searchEnterFun"  v-model="query.commHospital" placeholder="机构类别">
               <el-option label="全部" value=""></el-option>
                <el-option label="社区医院" value="0"></el-option>
                <el-option label="二级以上医疗机构" value="1"></el-option>
               </el-select>
            </span>
            <span>
              <el-select size="small" @keyup.enter.native="searchEnterFun"  v-model="query.degreeFlag" placeholder="选择紧急程度">
                <el-option label="全部" value=""></el-option>
                <el-option label="普通" value="0"></el-option>
                <el-option label="部分急需" value="1"></el-option>
                <el-option label="全部急需" value="2"></el-option>
               </el-select>
            </span>
            <span>
                <el-input v-model="query.searchName" @keyup.enter.native="searchEnterFun"  placeholder="买方机构" size="small"></el-input>
            </span>
            <span>
                <el-input v-model="query.searchCode" @keyup.enter.native="searchEnterFun"  placeholder="订单号" size="small"></el-input>
            </span>
            <span>
                  <el-date-picker type="date" format="yyyy-MM-dd" @keyup.enter.native="searchEnterFun"  value-format="yyyy-MM-dd" placeholder="开始日期" v-model="query.beginTime" size="small" ></el-date-picker>
                  &nbsp;到 &nbsp;
                  <el-date-picker type="date" format="yyyy-MM-dd" @keyup.enter.native="searchEnterFun"  value-format="yyyy-MM-dd" placeholder="结束日期" v-model="query.endTime" size="small" ></el-date-picker>
            </span>
            <span>
                <el-button type="warning" size="small" @click="searchEnterFun">查询</el-button>
                <el-button size="small" @click="restForm">重置</el-button>
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
          <!--<el-table-column type="index"  label="序号" width="80" align="right"></el-table-column>-->
          <el-table-column label="订单号" width="210">
            <template slot-scope="scope"  >
              <span v-if="scope.row.degreeFlag =='0'">{{ scope.row.orderCode }}</span>
              <span v-if="scope.row.degreeFlag =='1'"><span class="jinji_ye"></span> {{ scope.row.orderCode }}</span>
              <span v-if="scope.row.degreeFlag =='2'"><span class="jinji_red"></span> {{ scope.row.orderCode }}</span>
            </template>
          </el-table-column>
          <el-table-column label="买方机构">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="药库">
            <template slot-scope="scope">
              <span>{{ scope.row.warehouseName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="发送时间">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="订购金额（元)" width="80" align="right">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.requestTotal) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="到货金额（元）" width="80" align="right">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.receiveTotal) }}</span>
            </template>
          </el-table-column>

          <el-table-column label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.orderState ==1">未阅读</span>
              <span v-if="scope.row.orderState ==2">已阅读</span>
              <span v-if="scope.row.orderState ==3">已确认</span>
              <span v-if="scope.row.orderState ==4">到货中</span>
              <span v-if="scope.row.orderState ==7">缺货</span>
              <span v-if="scope.row.orderState ==8">断货</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
                 <router-link :to="{path:'handleHome',query: {orderId: scope.row.orderId,state:1}}" class="operation-btn">详情</router-link>
                 <router-link :to="{path:'handleHome',query: {orderId: scope.row.orderId}}" class="operation-btn">处理</router-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="margin: 20px 0">
        标记说明：<span class="jinji_ye"></span>部分药品急需 <span class="jinji_red"></span> 全部药品急需<br/><br/>
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
  </div>
  </div>
</template>
<script>

  // 引入用户相关请求
  import {selectTodoList} from 'src/axios/trade/senderRole/order/sendListTodo'
  import {priceFormat,keyBoardEnter} from "src/utils";

  export default {
    name: "sendListTodo",
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
            list: undefined
          }
        }
      },
      metaQuery () { // 表单查询数据初始化
        return {
          query: {
            searchOrderState:undefined,
            commHospital: undefined,
            degreeFlag: undefined,
            searchName: undefined,
            searchCode: undefined,
            beginTime: undefined,
            endTime: undefined
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
     restForm(){
        this.query = this.metaQuery()
       this.list()
     },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        selectTodoList(this.resData, this.query).then(res => {
          this.resData = res.data
           if(this.resData.pageNum === 0 ){
               this.resData.pageNum = 1
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
<style>
  .jinji_red{width:15px; height:15px; background-color:#E45750; border-radius:50%; display:inline-block;}
  .jinji_ye{width:15px; height:15px; background-color:#F4A222; border-radius:50%; display:inline-block;}
</style>

