<template>
  <div class="tablebox">
    <!--<el-tabs v-model="activeName" @tab-click="handleClick">-->
      <!--<el-tab-pane label="产品降价更新" name="first">-->
          <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
              <el-form-item>
                <el-input v-model="query.id" placeholder="产品单号" @keyup.enter.native="searchEnterFun" size="small"></el-input>
              </el-form-item>
              <el-form-item>
                <el-date-picker
                  v-model="query.startDate"
                  type="date"
                  placeholder="创建开始日期"
                  format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small">
                </el-date-picker>
                &nbsp;至&nbsp;
                <el-date-picker
                  v-model="query.endDate"
                  type="date"
                  placeholder="创建结束日期"
                  format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small">
                </el-date-picker>
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
                  <div class="text-inline">{{ scope.row.NAMECHN }}</div>
                </div>
                <div class="text-inline">{{ scope.row.MIXDOSAGE }}</div>
              </template>
            </el-table-column>
            <el-table-column label="产品信息">
              <template slot-scope="scope">
                <div class="pro-details">
                  <div class="text-inline">{{ scope.row.COMBINED }}&nbsp;&nbsp;{{scope.row.WRAP}}</div>
                </div>
                <div class="text-inline">{{ scope.row.ABBR }}</div>
              </template>
            </el-table-column>-->

            <el-table-column label="产品名称" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.NAMECHN}}</span>
              </template>
            </el-table-column>
            <el-table-column label="商用名" show-overflow-tooltip>
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
            <el-table-column label="包材" width="120" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.WRAPNAME}}</span>
              </template>
            </el-table-column>
            <el-table-column label="生产企业" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.COMPANYNAME}}</span>
              </template>
            </el-table-column>
            <el-table-column label="申请时间">
              <template slot-scope="scope">
                <span>{{scope.row.DATEADD}}</span>
              </template>
            </el-table-column>
            <el-table-column label="审核进度">
              <template slot-scope="scope">
                <span>{{scope.row.STATESAUDIT==0?'未提交':scope.row.STATESAUDIT==1?'提交':scope.row.STATESAUDIT==2?'公示质疑':scope.row.STATESAUDIT==4?'初审':scope.row.STATESAUDIT==5?'澄清':scope.row.STATESAUDIT==7?'通过':scope.row.STATESAUDIT==9?'驳回':'挂起'}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="140">
              <template slot-scope="scope">

                <div class="operates">
                  <span><a @click="handleFromView(scope.row.ID)" class="operation-btn">查看</a></span>
                  <span><a v-if="scope.row.STATESAUDIT==0" @click="submitProduct(scope.row.ID)" class="operation-btn">提交</a></span>
                  <el-popover
                    placement="top"
                    width="200"
                    v-model="scope.row.delVisible"
                    v-if="scope.row.STATESAUDIT==0">
                    <p>是否确定删除？</p>
                    <div style="text-align: right; margin: 0">
                      <el-button size="mini" type="text" @click="scope.row.delVisible = false">取消</el-button>
                      <el-button type="primary" size="mini" @click="delProduct(scope.row.ID, scope.row)">确定
                      </el-button>
                    </div>
                    <span><a slot="reference" @click="scope.row.delVisible = true" class="operation-btn">删除</a></span>
                  </el-popover>
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
        <!--<div class="tableset">-->
          <!--<el-row :gutter="24">-->
            <!--<el-col :span="3" :offset="21">-->
              <!--<router-link to="/AUDIT/messageChanges/addProductPriceReduction">-->
                <!--<el-button type="success" size="small">√申请降价</el-button>-->
              <!--</router-link>-->
            <!--</el-col>-->
          <!--</el-row>-->
        <!--</div>-->
        <div class="table-caption foot-btn">
          <div class="foot-left">
            <router-link to="/AUDIT/messageChanges/addProductPriceReduction">
              <el-button type="primary" size="small">申请降价</el-button>
            </router-link>
          </div>
        </div>
      <!--</el-tab-pane>-->
    <!--</el-tabs>-->
    <present-dialog v-if="presentDialogView" ref="presentDialog" @refreshData="list"></present-dialog>
  </div>
</template>

<script>
  import {
    queryList,
    submitProduct,
    delProduct
  } from "src/axios/auditchanges/messageChanges/productPriceReduction";
  import {keyBoardEnter, priceFormat} from "src/utils";
  import presentDialog from "./presentDialog";

  export default {
    components: {presentDialog},
    name: "list",
    created() {
      if(!!this.$store.state.pageSeach.pageNum){
        this.query = this.$store.state.pageSeach;
        this.resData.pageSize = this.$store.state.pageSeach.pageSize;
        this.resData.pageNum = this.$store.state.pageSeach.pageNum;
      }
      this.$store.state.pageSeach=this.query;
      this.resData.pageSize = 10;
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
      delProduct(id, row) {
        row.delVisible = false;
        delProduct(id).then(res => {
          this.list();
          console.log(res)
          if (res.data >= 1) {
            this.$message({
              message: '删除成功！',
              type: 'success'
            });
          } else {
            this.$message({
              message: '删除失败！',
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
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      findListByCondition() {
        this.list()
      },
      list() {
        this.$store.state.pageSeach=this.query;
        queryList(this.resData, this.query).then(res => {
          this.resData = res.data;
          if (this.resData.pageNum == 0) {
            this.resData.pageNum = 1;
          }
        })
      },
      metaQuery() {
        return {
          id: '',
          startDate: '',
          endDate: ''
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
      handleSizeChange(val) {
        this.$store.state.pageSeach.pageSize = val
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange(val) {
        this.$store.state.pageSeach.pageNum = val
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
