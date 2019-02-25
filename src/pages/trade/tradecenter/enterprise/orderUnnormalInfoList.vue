<template>
  <!-- ========================== 医院黄页 ========================= -->
  <!-- 表格 -->
  <div class="tablebox">
    <!-- 表格查询表单 -->
    <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
      <el-form-item class="width-100">
        <el-input v-model="query.searchProductName"  @keyup.enter.native="searchEnterFun"  name="searchProductName" placeholder="品名" size="small"></el-input>
      </el-form-item>
      <el-form-item class="width-100">
        <el-input v-model="query.searchMedicalSpec"  @keyup.enter.native="searchEnterFun" name="searchMedicalSpec" placeholder="规格" size="small"></el-input>
      </el-form-item>
      <el-form-item class="width-200">
        <el-select v-model="query.searchNormalType" @keyup.enter.native="searchEnterFun" placeholder="异常原因" size="small">
          <el-option label="全部异常原因" value=""></el-option>
          <el-option label="单笔&gt;2,000,000.00(元)" value="1"></el-option>
          <el-option label="单笔&gt;1,000,000.00(元)并且到货率&lt;50%" value="2"></el-option>
          <el-option label="单笔&gt;100,000.00(元)并且到货率&lt;11%" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker type="date" placeholder="创建日期"  @keyup.enter.native="searchEnterFun" v-model="query.searchBenDate" name="searchBenDate"
                        class="width-120" format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"></el-date-picker>
        &nbsp;至&nbsp;
        <el-date-picker type="date" placeholder="创建日期"  @keyup.enter.native="searchEnterFun" v-model="query.searchEndDate" name="searchEndDate"
                        class="width-120" format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="success" size="small" @click="searchEnterFun">查询</el-button>
        <el-button type="warning" size="small" @click="reset()">重置</el-button>
        <el-button type="" @click="goBack">返回</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格列表 -->
    <div class="tableset">
      <el-table
        :data="resData.list"
        border
        stripe>
        <!--<el-table-column type="index" width="50" header-align="left" align="center" label="序号"></el-table-column>-->
        <el-table-column label="产品名称" min-width="140">
          <template slot-scope="scope">
            <!--tootip提示气泡-->
            <el-tooltip placement="top" :enterable="false">
              <!--气泡内容（必须放在slot="content"内）,布局与源内容保持一致-->
              <div slot="content">
                <div>{{ scope.row.bakProductName }}</div>
                <div v-if="scope.row.bakTradeName != null">({{ scope.row.bakTradeName }})</div>
              </div>
              <div class="el-tooltip-box">
                <!--加class="text-inline"确保内容不折行-->
                <div class="text-inline">{{ scope.row.bakProductName }}</div>
                <div class="text-inline" v-if="scope.row.bakTradeName != null">({{ scope.row.bakTradeName }})</div>
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="产品信息" min-width="140">
          <template slot-scope="scope">
            <el-tooltip placement="top" :enterable="false">
              <div slot="content">
                <div>
                  <span>{{scope.row.bakProductSpec}}&nbsp;&nbsp;{{scope.row.bakWrapName}}</span>
                </div>
                <div>
                  {{ scope.row.bakFactoryName}}&nbsp;&nbsp; 中大包装: {{scope.row.middleStandRate}}/{{scope.row.bigMiddleRate}}
                </div>
              </div>
              <div class="el-tooltip-box">
                <div class="text-inline">
                  <span class="text-inlie">{{scope.row.bakProductSpec}}&nbsp;&nbsp;{{scope.row.bakWrapName}}</span>
                </div>
                <div class="text-inline" >
                  {{ scope.row.bakFactoryName}}&nbsp;&nbsp; 中大包装: {{scope.row.middleStandRate}}/{{scope.row.bigMiddleRate}}
                </div>
              </div>
            </el-tooltip>

          </template>
        </el-table-column>
        <el-table-column label="医疗机构">
          <template slot-scope="scope">
            {{ scope.row.bakBuyerName }}
          </template>
        </el-table-column>
        <el-table-column label="订购量" align="right" width="80">
          <template slot-scope="scope">
            {{ scope.row.requestQty }}
          </template>
        </el-table-column>

        <el-table-column label="订购金额" align="right" width="80">
          <template slot-scope="scope">
            {{ scope.row.totalRequestMoney }}
          </template>
        </el-table-column>
        <el-table-column label="到货量" align="right" width="80">
          <template slot-scope="scope">
            {{ scope.row.receiveQty }}
          </template>
        </el-table-column>
        <el-table-column label="到货金额" align="right" width="80">
          <template slot-scope="scope">
            {{ scope.row.totalReceiveMoney }}
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">
            {{ scope.row.unnormalCreateDate }}
          </template>
        </el-table-column>
        <el-table-column label="异常原因" min-width="160">
          <template slot-scope="scope">
            <el-tooltip placement="top" :enterable="false">
              <div slot="content">
                <div>{{ scope.row.normalType }}</div>
              </div>
              <div class="el-tooltip-box">
                <div class="text-inline">
                  {{ scope.row.normalType }}
                </div>
              </div>
            </el-tooltip>

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
  import {queryOrderUnnormalInfoList} from 'src/axios/trade/enterprise/enterprise'
  import {keyBoardEnter} from "src/utils";

  export default {
    data() {
      return {
        buyerOrgId: '',
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
    created() {
      this.buyerOrgId = this.$route.params.buyerOrgId;
      this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      reset() {
        this.query = this.metaQuery();
        this.list();
      },
      metaData() {
        return {
          // 前后台交互数据封装格式
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
          searchMedicalSpec: '',
          searchProductName: '',
          searchNormalType: '',
          searchBenDate: '',
          searchEndDate: '',
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list() {
        queryOrderUnnormalInfoList(this.resData, this.query,this.buyerOrgId).then(res => {
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
      goBack() {
        this.$router.go(-1)
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
    }
  }
</script>

/
