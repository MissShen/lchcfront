<template xmlns="http://www.w3.org/1999/html">
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
            <el-form-item class="width-120">
              <el-input v-model="query.orgName"  @keyup.enter.native="searchEnterFun"  placeholder="买方机构" size="small"></el-input>
            </el-form-item>
            <el-form-item>
                      <el-date-picker class="width-120" type="date"  @keyup.enter.native="searchEnterFun"  size="small" placeholder="创建开始日期" value-format="yyyy-MM-dd" v-model="query.searchBenDate"></el-date-picker>
                &nbsp;至&nbsp;
                      <el-date-picker class="width-120" type="date"  @keyup.enter.native="searchEnterFun"  placeholder="创建结束日期" size="small" value-format="yyyy-MM-dd" v-model="query.searchEndDate"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
              <el-button type="warning" @click="restQuery()" size="small">重置</el-button>
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
          <el-table-column label="采购单号" prop="item.PURCHASE_CODE " width="75" sortable="custom">
            <template slot-scope="scope">
              <span>
                 {{ scope.row.purchaseCode }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="产品名" min-width="150" prop="ooi.BAK_PRODUCT_NAME" sortable="custom"  show-overflow-tooltip>
            <template slot-scope="scope" class="drugMessage">
              <ul class="ico-zt">
                <li class="ico-left">
                  <div class="icon-box">
                    <i class="ico icon-ji" v-if="scope.row.degreeFlag == '2'"  ></i>
                    <i class="ico icon-jihui" v-if="scope.row.degreeFlag == '0'"  ></i>
                    <i  v-if="scope.row.basicMedicantFlag!= '0'" class="ico icon-jc"></i>
                  </div>
                </li>
                <li>
                  <!--tootip提示气泡-->
                  <el-tooltip placement="top" :enterable="false">
                    <!--气泡内容（必须放在slot="content"内）,布局与源内容保持一致-->
                    <div slot="content">
                      <div>{{ scope.row.bakProductName }}</div>
                      <div>{{ scope.row.bakMedicalMode }}
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
          <el-table-column label="产品信息" min-width="150">
            <template slot-scope="scope">
              <el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  {{scope.row.bakProductSpec}}<br/>
                  <span v-if="scope.row.bakFactoryEasy!=''">{{getPackHints(scope.row.bakFactoryEasy,scope.row.bakMiddleStandRate,scope.row.bakBigMiddleRate)}}</span>
                </div>
                <div class="el-tooltip-box">
                  <div class="text-inline">
                    {{ scope.row.bakProductSpec}}
                  </div>
                  <div class="text-inline" v-if="scope.row.bakFactoryEasy!=''">
                    {{ scope.row.bakFactoryEasy}}&nbsp;&nbsp; 中大包装: {{ scope.row.bakMiddleStandRate}}/{{ scope.row.bakBigMiddleRate}}
                  </div>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
            <el-table-column label="买方机构" prop="item.BUYER_ORG_EASY " sortable="custom">
              <template slot-scope="scope">
                <span>{{ scope.row.buyerOrgEasy }}</span>
              </template>
            </el-table-column>
            <el-table-column label="评价时间" prop="eval.CREATE_DATE " width="100" align="center" sortable="custom">
              <template slot-scope="scope">
                <span>{{ scope.row.createDate }}</span>
              </template>
            </el-table-column>
            <el-table-column label="配送速度" prop="eval.SPEED_STATE " sortable="custom" >
              <template slot-scope="scope">
                <span v-if="scope.row.speedState">
                  <el-rate v-model="scope.row.speedState" disabled ></el-rate>
                </span>
                <span v-else>
                  <el-rate v-model="evaluate" disabled ></el-rate>
                </span>
              </template>
            </el-table-column>
          <el-table-column label="服务态度" prop="eval.SERVICE_STATE " sortable="custom" >
            <template slot-scope="scope">
              <span v-if="scope.row.serviceState" >
                <el-rate v-model="scope.row.serviceState" disabled ></el-rate>
              </span>
              <span v-else>
                <el-rate v-model="evaluate" disabled ></el-rate>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="药品包装" prop="eval.YBB " sortable="custom" >
            <template slot-scope="scope">
              <span v-if="scope.row.productPack" >
                <el-rate v-model="scope.row.productPack" disabled ></el-rate>
              </span>
              <span v-else>
                <el-rate v-model="evaluate" disabled></el-rate>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="评价内容" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.evaluate}}</span>
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
  </div>
</template>
<script>

  // 引入用户相关请求
  import {firmCheckOrderList} from 'src/axios/trade/evaluate/evaluate'
  import {priceFormat,keyBoardEnter} from "src/utils";
  import {getPackHints,getSpecHints} from "src/utils/validateUtil";

  export default {
    data () {
      return {
        currentOrder: undefined,
        evaluate:'5',
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
      }
    },
    created () {
      this.list()
    },
    methods: {
      restQuery() {
        this.query = this.metaQuery()
        this.list()
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
      metaQuery () { // 表单查询数据初始化
        return {
            orgName: '',
            searchBenDate: '',
            searchEndDate: ''
            /*searchBenDate: this.getLocalYear(),
            searchEndDate: this.getLocalTime()*/
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy=this.currentOrder;
        firmCheckOrderList(this.resData, this.query).then(res => {
          this.resData = res.data;
          if(this.resData.pageNum === 0 ){
            this.resData.pageNum = 1
          }
        })
      },
      getLocalTime (){
        let date = new Date();
        let YY = date.getFullYear();
        let MM = (date.getMonth()+1 < 10 ? '0'+ (date.getMonth()+1) : date.getMonth()+1);
        let DD = date.getDate()+1 < 10 ? '0'+ date.getDate() : date.getDate();
        let hh = date.getHours() < 10 ? '0'+ date.getHours() : date.getHours();
        let mm = date.getMinutes() < 10 ? '0'+ date.getMinutes() : date.getMinutes();
        let ss = date.getSeconds() < 10 ? '0'+ date.getSeconds() : date.getSeconds();
        return YY + '-' + MM + '-' + DD + ' ' + hh + ':' + mm + ':' + ss;

      },
      getPackHints,
      getSpecHints,
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
      },
      getLocalYear (){
        let date = new Date();
        let YY = date.getFullYear()-1;
        let MM = '01';
        let DD = '01';
        let hh = '00';
        let mm = '00';
        let ss = '00';
        return YY + '-' + MM + '-' + DD + ' ' + hh + ':' + mm + ':' + ss;
      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val;
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val;
        this.list()
      },
      sortChang(value){
        let sortType=" desc"
        if(value.order.startsWith("asc")){
          sortType=" asc";
        }
        this.currentOrder=value.prop + sortType;
        this.list()
      },

    }
  }
</script>

