<template>
  <div>
    <!-- ========================== 新增用户投诉(订单) ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
            <el-form-item class="width-120">
                <el-select v-model="query.searchOrgType" @keyup.enter.native="searchEnterFun"  placeholder="企业类型" size="small">
                  <el-option label="配送企业" value="send"></el-option>
                  <el-option label="生产企业" value="producer"></el-option>
                  <el-option label="买方机构" value="buyer"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="width-120">
                <el-input v-model="query.searchKeyWord" @keyup.enter.native="searchEnterFun"  placeholder="关键字" size="small"></el-input>
            </el-form-item>
           <el-form-item class="width-120">
                <el-input v-model="query.bakMedicalName" @keyup.enter.native="searchEnterFun"  placeholder="品名" size="small"></el-input>
            </el-form-item>
           <el-form-item class="width-120">
                <el-input v-model="query.bakMedicalSpec" @keyup.enter.native="searchEnterFun"  placeholder="规格" size="small"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
                <el-button type="warning" size="small" @click="resetQuery()">重置</el-button>
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
          <!--<el-table-column type="index" width="50" header-align="left" align="center" label="序号"></el-table-column>-->
          <el-table-column label="产品名" min-width="180" prop="a.BAK_PRODUCT_NAME" sortable="custom" >
            <template slot-scope="scope">
            <!--  {{ scope.row.bakProductName }}-->
              <ul>
                <li>
                  <!--tootip提示气泡-->
                  <!--:enterable="false" 鼠标不可进入tooltip中-->
                  <el-tooltip placement="top" :enterable="false">
                    <!--气泡内容（必须放在slot="content"内）,布局与源内容保持一致-->
                    <div slot="content">
                      <div>{{ scope.row.bakProductName }}</div>
                      <div class="text-inline">{{ scope.row.bakMedicalMode }}
                        <span v-if="scope.row.bakTradeName != '无' && scope.row.bakTradeName !=null">({{ scope.row.bakTradeName }})</span>
                      </div>
                    </div>

                    <!--源内容（必须放在class="el-tooltip-box"内）-->
                    <div class="el-tooltip-box">
                      <!--加class="text-inline"确保内容不折行-->
                      <div class="text-inline">{{ scope.row.bakProductName }}</div>
                      <div class="text-inline">{{ scope.row.bakMedicalMode }}
                        <span v-if="scope.row.bakTradeName != '无' && scope.row.bakTradeName !=null">({{ scope.row.bakTradeName }})</span>
                      </div>
                    </div>
                  </el-tooltip>
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column label="产品信息" min-width="180"  >
            <template slot-scope="scope">
              <el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  {{getHints(scope.row.bakMedicalSpec,scope.row.bakWrapName)}}<br/>
                  {{getPackHints(scope.row.bakFactoryName,scope.row.middleStandRate,scope.row.bigMiddleRate)}}
                </div>
                <div class="el-tooltip-box">
                  <div class="text-inline">
                    {{ scope.row.bakMedicalSpec }} &nbsp;&nbsp;
                    <span v-if="scope.row.bakWrapName != '空' && scope.row.bakWrapName != null">{{ scope.row.bakWrapName}}</span>
                  </div>
                  <div class="text-inline" >
                    {{ scope.row.bakFactoryName}}&nbsp;&nbsp; 中大包装: {{ scope.row.middleStandRate}}/{{ scope.row.bigMiddleRate}}
                  </div>
                </div>
              </el-tooltip>

            </template>
          </el-table-column>
          <el-table-column label="配送企业" prop="senderName" sortable="custom" width="130">
            <template slot-scope="scope">
              {{ scope.row.senderName }}
            </template>
          </el-table-column>
          <el-table-column label="买方机构" width="130" prop="buyerOrgName" sortable="custom">
            <template slot-scope="scope">
              {{ scope.row.buyerOrgName }}
            </template>
          </el-table-column>
          <el-table-column label="订单金额" align="right" prop="requestTotal" sortable="custom" width="100">
            <template slot-scope="scope">
              {{ priceFormat(scope.row.requestTotal) }}
            </template>
          </el-table-column>
          <el-table-column label="到货金额" align="right" prop="receiveTotal" sortable="custom" width="100">
            <template slot-scope="scope">
              {{ priceFormat(scope.row.receiveTotal) }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="130">
            <template slot-scope="scope">
              <div class="operates">
               <a href="javaScript:;" @click="complaintThisOne(scope.row.recordId)" title="投诉" class="green" size="small">投诉</a>
               <a href="javaScript:;" @click="showComplainedList(scope.row.recordId)" title="查看" class="green" size="small">查看</a>
              </div>
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
          :pager-count="5"
          :current-page.sync="resData.pageNum">
        </el-pagination>
      </div>

    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求
  import {queryOrderComplaintsList} from 'src/axios/trade/evaluate/evaluate'
  import {priceFormat,keyBoardEnter} from "src/utils";
  import {getSpecHints,getPackHints} from "src/utils/validateUtil";

  export default {
    name:'query-wait-handle-list',
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
        }
      }
    },
    created () {
      this.list()
    },
    methods: {
      getSpecHints,
      getPackHints,
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
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
      },
      metaQuery () { // 表单查询数据初始化
        return {
            searchOrgType:undefined,
            searchKeyWord:undefined,
            bakMedicalName:undefined,
            bakMedicalSpec:undefined
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy=this.currentOrder;
        queryOrderComplaintsList(this.resData, this.query).then(res => {
          this.resData = res.data
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
      },
      resetQuery() {
        this.query = this.metaQuery();
        this.list()
      },
      complaintThisOne(orderItemId){
        this.$router.push("/trade/manage/createTradeComplain/choose/1/"+orderItemId)
      },
      showComplainedList(orderItemId){
        this.$router.push("/trade/manage/showComplainedList/orderItem/"+orderItemId)
      },
      getHints(bakMedicalSpec, bakWrapName) {

        let _bakMedicalSpec, _bakWrapName;
        if (bakMedicalSpec == null || bakMedicalSpec == undefined || bakMedicalSpec == "空") {
          _bakMedicalSpec = "";
        } else {
          _bakMedicalSpec = bakMedicalSpec;
        }
        if (bakWrapName == null || bakWrapName == undefined || bakWrapName == "空") {
          _bakWrapName = "";
        } else {
          _bakWrapName = bakWrapName;
        }
        return  "规格:  "+ _bakMedicalSpec +"    包材:"+ _bakWrapName
      },
    }
  }
</script>

