<template>
  <div class="tablebox">

          <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">

                <el-form-item>
                 <el-input v-model="query.companyName" placeholder="生产企业名称" @keyup.enter.native="searchEnterFun" size="small"></el-input>
                </el-form-item>
              <el-form-item>
                 <el-input v-model="query.productName" placeholder="产品名称" @keyup.enter.native="searchEnterFun" size="small"></el-input>
                </el-form-item>
              <el-form-item>
                 <el-input v-model="query.doseageName" placeholder="剂型" @keyup.enter.native="searchEnterFun" size="small"></el-input>
                </el-form-item>
              <el-form-item>
                 <el-input v-model="query.specName" placeholder="规格" @keyup.enter.native="searchEnterFun" size="small"></el-input>
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
            <el-table-column label="申请单号" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.ID}}</span>
              </template>
            </el-table-column>
           <!-- <el-table-column label="产品名称">
              <template slot-scope="scope">
                <div>
                  <div class="text-inline">{{scope.row.NAMECHN}}</div>
                  <div class="text-inline">{{scope.row.MIXDOSAGE}}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="产品信息">
              <template slot-scope="scope">
                <div class="pro-details">
                  <div class="text-inline">{{scope.row.COMBINED}}&nbsp;&nbsp;{{scope.row.WRAP}}</div>
                  <div class="text-inline">{{scope.row.ABBR}}</div>
                </div>
              </template>
            </el-table-column>-->

            <el-table-column label="产品名称" width="120" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.NAMECHN}}</span>
              </template>
            </el-table-column>
            <el-table-column label="商用名" width="120" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.TRADENAME}}</span>
              </template>
            </el-table-column>
            <el-table-column label="原报价" header-align="left" align="right">
              <template slot-scope="scope">
                <span>{{priceFormat(scope.row.BEFOREPRICE)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="更新后价格" header-align="left" align="right">
              <template slot-scope="scope">
                <span>{{priceFormat(scope.row.LASTPRICE)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="剂型" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.DOSEAGENAME}}</span>
              </template>
            </el-table-column>
            <el-table-column label="规格" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.SPEC}}</span>
              </template>
            </el-table-column>
            <el-table-column label="转换比" width="70" header-align="left" align="right">
              <template slot-scope="scope">
                <span>{{scope.row.STANDRATE}}</span>
              </template>
            </el-table-column>
            <el-table-column label="单位" width="50">
              <template slot-scope="scope">
                <span>{{scope.row.METRICNAME}}</span>
              </template>
            </el-table-column>
            <el-table-column label="包材" width="70" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.WRAP}}</span>
              </template>
            </el-table-column>
            <el-table-column label="生产企业" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.NAME}}</span>
              </template>
            </el-table-column>
            <el-table-column label="申请时间">
              <template slot-scope="scope">
                <span>{{scope.row.DATEADD}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <div class="operates">
                  <span>
                    <!--<el-button
                      @click="handleFromView(scope.row.ID)" type="text" size="small">查看
                    </el-button>-->
                    <a href="javascript:;" @click="handleFromView(scope.row.ID)"
                       class="operation-btn" type="text" size="small">查看
                    </a>
                  </span>
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
            :current-page.sync="resData.pageNum">
          </el-pagination>
        </div>

    <present-dialog v-if="presentDialogView" ref="presentDialog" @refreshData="list"></present-dialog>
  </div>
</template>

<script>
  import {queryList} from "src/axios/auditchanges/messagePublicity/productPriceDownPublicity";
  import {keyBoardEnter,priceFormat} from "src/utils";
  import presentDialog from "./presentDialog";

  export default {
    components: {presentDialog},
    name: "list",
    created() {
      this.list()
    },
    data() {
      return {
        activeName: 'first',
        query: this.metaQuery(),
        resData: this.metaData(),
        presentDialogView: false,
        delVisible: false
      }
    },
    methods: {
      priceFormat,
      //查询
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      submitProduct(id) {
        submitProduct(id).then(res => {
          this.list();
          if (res.data >= 1) {
            this.$message({
              message: '提交成功！',
              type: 'success'
            });
          } else {
            this.$message({
              message: '提交失败！',
              type: 'error'
            });
          }
        })
      },
      handleFromView(productId) {
        this.presentDialogView = true
        console.log(productId)
        this.$nextTick(() => {
          this.$refs.presentDialog.fillData(1, productId)
        })
      },
      findListByCondition() {
        this.list()
      },
      list() {
        queryList(this.resData, this.query).then(res => {
          this.resData = res.data;
          if (this.resData.list.length == 0) {
            this.resData.pageNum = 1;
          }
        })
      },
      metaQuery() {
        return {
          companyName: '',
          productName:'',
          doseageName:'',
          specName:''
        }
      },
      restQuery() {//重置
        this.query = this.metaQuery()
        this.list();
      },
      metaData() {
        return {

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
    }
  }
</script>

<style scoped>

</style>
