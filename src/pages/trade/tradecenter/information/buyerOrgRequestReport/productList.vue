<template>
  <div>
    <!-- ========================== 药品采购分析 ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <div class="table-form">
        <el-form ref="query" :model="query" label-position="right" size="small">
          <div class="formrow">
            <span>
              <el-select v-model="query.searchState" placeholder="是否基药" size="small">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="2"></el-option>
              </el-select>
            </span>
            <span>
              <el-input v-model="query.name" placeholder="品名" size="small"></el-input>
            </span>
            <span class="date-group">
              <el-date-picker type="date" placeholder="订单日期" v-model="query.beginDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"></el-date-picker>
               &nbsp;至&nbsp;
              <el-date-picker type="date" placeholder="订单日期" v-model="query.endDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"></el-date-picker>
            </span>
            <span>
              <el-button type="success" size="small">查询</el-button>
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
          <!--<el-table-column type="index" width="50" label="序号"></el-table-column>-->
          <el-table-column label="产品名">
            <template slot-scope="scope">
              {{ scope.row.drugName }}
            </template>
          </el-table-column>
          <el-table-column label="商品名">
            <template slot-scope="scope">
              <span>{{ scope.row.tradeName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="规格包装">
            <template slot-scope="scope">
              {{ scope.row.standardSpec }}
            </template>
          </el-table-column>
          <el-table-column label="生产企业">
            <template slot-scope="scope">
              <span>{{ scope.row.manufactureName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="单价"  sortable width="80" header-align="left" align="right">
            <template slot-scope="scope">
              {{ priceFormat(scope.row.unitPrice) }}
            </template>
          </el-table-column>
          <el-table-column label="订购数量"  sortable width="70" header-align="left" align="right">
            <template slot-scope="scope">
              <span>{{ scope.row.unitPrice }}</span>
            </template>
          </el-table-column>
          <el-table-column label="订购金额"  sortable width="70" header-align="left" align="right">
            <template slot-scope="scope">
             {{ priceFormat(scope.row.buyerMoney) }}
            </template>
          </el-table-column>
          <el-table-column label="到货数量"  sortable width="70" header-align="left" align="right">
            <template slot-scope="scope">
              <span>{{ scope.row.receiveQty }}</span>
            </template>
          </el-table-column>
          <el-table-column label="到货金额"  sortable width="70" header-align="left" align="right">
            <template slot-scope="scope">
              {{ priceFormat(scope.row.receiveMoney) }}
            </template>
          </el-table-column>
          <el-table-column label="退货数量"  sortable width="70" header-align="left" align="right">
            <template slot-scope="scope">
              <span>{{ scope.row.returnQty }}</span>
            </template>
          </el-table-column>
          <el-table-column label="退货金额"  sortable width="70" header-align="left" align="right">
          <template slot-scope="scope">
            <span>{{ priceFormat(scope.row.returnMoney) }}</span>
          </template>
        </el-table-column>
          <el-table-column label="是否基药">
            <template slot-scope="scope">
              <span>{{ scope.row.baseMedicantFlag }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
             <a href="javascript:void(0)" @click="handleFromView(scope.row.id)"
                       class="operation-btn" size="small">详情</a>
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
      <form-view v-if="formViewVisible" :parent-id="id" ref="buyDetails" @refreshData="metaList"></form-view>
    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>
  import buyDetails from 'src/pages/trade/tradecenter/information/buyerOrgRequestReport/buyDetails'
  // 引入用户相关请求
  import {queryList} from 'src/axios/trade/purchase/purchase'
  import {priceFormat} from "src/utils";

  export default {
    name:'productList',
    components: {
      buyDetails
    },
    data () {
      return {
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        formViewVisible: false,
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
      priceFormat,
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
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
      metaQuery () { // 表单查询数据初始化
        return {

//            id: undefined,
            name: undefined,
            searchState: undefined,
            beginDate: undefined,
            endDate: undefined

        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        queryTemplateList(this.resData, this.query).then(res => {
          this.resData = res.data
          if(this.resData.pageNum===0){
            this.resData.pageNum=1
          }
        })
      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.reportList()
      },
      handleFromView(id) {
        this.formViewVisible = true;
        this.$nextTick(() => {
          // 通过组件中设置的ref属性调取formView.vue中的fillData()方法加载弹窗内容
          this.$refs.buyDetails.fillData(id);
        })
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.reportList()
      }
    }
  }
</script>

