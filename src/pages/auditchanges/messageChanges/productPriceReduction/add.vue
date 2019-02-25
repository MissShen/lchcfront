<template>
  <div class="tablebox">
    <!--<el-tabs v-model="activeName" @tab-click="handleClick">-->
      <!--<el-tab-pane label="产品降价更新" name="first">-->
          <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
              <el-form-item>
                <el-input v-model="query.name" size="small" @keyup.enter.native="searchEnterFun" placeholder="产品名称"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
                <el-button type="warning" @click="restQuery" size="small">重置</el-button>
              </el-form-item>
          </el-form>
        <div class="tableset">
          <el-table
            :data="resData.list"
            border
            stripe
            @selection-change="handleSelectionChange">
            <el-table-column label="产品名称" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.PRODUCT_NAME}}</span>
              </template>
            </el-table-column>
            <el-table-column label="商品名" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.NAME_CHN}}</span>
              </template>
            </el-table-column>
            <el-table-column label="剂型" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.DOSEAGE_FORM_NAME}}</span>
              </template>
            </el-table-column>
            <el-table-column label="规格" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.SPEC}}</span>
              </template>
            </el-table-column>
            <el-table-column label="转换比" width="70" header-align="left" align="right">
              <template slot-scope="scope">
                <span>{{scope.row.STAND_RATE}}</span>
              </template>
            </el-table-column>
            <el-table-column label="单位" width="50">
              <template slot-scope="scope">
                <span>{{scope.row.SPEC_UNIT}}</span>
              </template>
            </el-table-column>
            <el-table-column label="包材" width="70" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.WRAP_NAME}}</span>
              </template>
            </el-table-column>
            <el-table-column label="价格" width="120" header-align="left" align="right">
              <template slot-scope="scope">
                <span>{{priceFormat(scope.row.BID_PRICES)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="生产企业" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.MANUFACTURE_NAME}}</span>
              </template>
            </el-table-column>
            <!--<el-table-column label="产品名称">-->
              <!--<template slot-scope="scope">-->
                <!--<div>-->
                  <!--<div class="text-inline">{{ scope.row.NAMECHN }}</div>-->
                <!--</div>-->
                <!--<div class="text-inline">{{ scope.row.MIXDOSAGE }}</div>-->
              <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column label="产品信息">-->
              <!--<template slot-scope="scope">-->
                <!--<div class="pro-details">-->
                  <!--<div class="text-inline">{{ scope.row.COMBINED }}&nbsp;&nbsp;{{scope.row.WRAP}}</div>-->
                <!--</div>-->
                <!--<div class="text-inline">{{ scope.row.ABBR }}</div>-->
              <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column label="价格" width="120" header-align="left" align="right">-->
              <!--<template slot-scope="scope">-->
                <!--<span>{{priceFormat(scope.row.BID_PRICES)}}</span>-->
              <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <div class="operates">
                  <span><a @click="handleFromView(scope.row.PRODUCT_ID)" class="operation-btn">申请</a></span>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
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
      <!--</el-tab-pane>-->
    <!--</el-tabs>-->
    <div class="table-caption foot-btn">
      <div class="foot-left">
        <router-link to="/AUDIT/messageDeclare/productPriceReduction">
          <el-button type="" size="small">返回</el-button>
        </router-link>
      </div>
    </div>
    <present-dialog v-if="presentDialogView" ref="presentDialog" @refreshData="list"></present-dialog>
  </div>
</template>

<script>
  import {queryProductList} from "src/axios/auditchanges/messageChanges/productPriceReduction";
  import {keyBoardEnter, priceFormat} from "src/utils";
  import presentDialog from "./presentDialog";

  export default {
    components: {presentDialog},
    name: "add",
    data() {
      return {
        activeName: 'first',
        query: this.metaQuery(),
        resData: this.metaData(),
        presentDialogView: false
      }
    },
    created() {
      this.resData.pageSize = 10;
      this.list()
    },
    methods: {
      priceFormat,
      searchEnterFun(e){
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      findListByCondition() {
        this.list()
      },
      list() {
        queryProductList(this.resData, this.query).then(res => {
          console.log(res)
          this.resData = res.data;
          if (this.resData.pageNum == 0) {
            this.resData.pageNum = 1;
          }
        })
      },
      handleSizeChange(val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val
        this.list()
      },
      handleClick() {

      },
      handleSelectionChange(val) {
        //val 所选对象
      },
      metaQuery() {
        return {
          name: ''
        }
      },
      restQuery() {//重置
        this.query = this.metaQuery()
        this.list();
      },
      metaData() {
        return {
          resData: { // 前后台交互数据封装格式
            pageNum: 0,
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
        }
      },
      handleFromView(productId) {
        this.presentDialogView = true
        this.$nextTick(() => {
          this.$refs.presentDialog.fillData(0,productId)
        })
      },
    },
  }
</script>

<style scoped>

</style>
