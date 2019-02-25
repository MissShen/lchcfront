<template>
  <el-dialog
    custom-class="w80"
    title="价格变更"
    :close-on-click-modal="false"
    :visible.sync="visible"
    append-to-body
    class="audit-dialog"
  >
  <div class="tableset">
        <!-- 表格查询表单 -->
          <el-form ref="query" :model="query" :inline="true" class="demo-form-inline table-form">
              <el-form-item>
                <el-input v-model="query.productName" placeholder="产品名称" @keyup.enter.native="searchEnterFun" size="small"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="query.dosage" placeholder="剂型" @keyup.enter.native="searchEnterFun" size="small"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="query.specification" placeholder="规格" @keyup.enter.native="searchEnterFun" size="small"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="query.manufacture" placeholder="生产企业" @keyup.enter.native="searchEnterFun" size="small"></el-input>
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
            >
          <!--  <el-table-column label="产品名称">
              <template slot-scope="scope">
                <div>
                  <div class="text-inline">{{scope.row.productName}}</div>
                  <div class="text-inline">{{scope.row.mixDosage}}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="产品信息">
              <template slot-scope="scope">
                <div class="pro-details">
                  <div class="text-inline">{{scope.row.combined}}&nbsp;&nbsp;{{scope.row.wrap}}</div>
                  <div class="text-inline">{{scope.row.abbr}}</div>
                </div>
              </template>
            </el-table-column>-->

            <el-table-column label="产品名称">
              <template slot-scope="scope">
                <span>{{scope.row.productName}}</span>
              </template>
            </el-table-column>
            <el-table-column label="商品名">
              <template slot-scope="scope">
                <span>{{scope.row.goodsName}}</span>
              </template>
            </el-table-column>
            <el-table-column label="剂型" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.dosage}}</span>
              </template>
            </el-table-column>
            <el-table-column label="规格">
              <template slot-scope="scope">
                <span>{{scope.row.specification}}</span>
              </template>
            </el-table-column>
            <el-table-column label="转换比" width="60">
              <template slot-scope="scope">
                <span>{{scope.row.conversion}}</span>
              </template>
            </el-table-column>
            <el-table-column label="单位" width="50">
              <template slot-scope="scope">
                <span>{{scope.row.units}}</span>
              </template>
            </el-table-column>
            <el-table-column label="包材" width="60">
              <template slot-scope="scope">
                <span>{{scope.row.packingMaterials}}</span>
              </template>
            </el-table-column>
            <el-table-column label="生产企业">
              <template slot-scope="scope">
                <span class="hiddenfont" slot="reference">{{ scope.row.manufacture }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80">
              <template slot-scope="scope">
                <div class="operates">
                    <span>
                      <a class="operation-btn" @click="handleGoChange(scope.row.id)">变更</a>
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
    <div>
    </div>
    <change v-if="changeShow" changeId="addListChange" ref="change"></change>
  </div>
    <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="goBack">返回</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {queryShowProductList} from "src/axios/auditchanges/messageChanges/price"
  import {keyBoardEnter} from "src/utils";
  import change from "./change"
  export default {
    components:{
      change,
    },
    data() {
      return {
        visible:false,
        resData: this.metaData(),
        query: this.metaQuery() ,// 查询初始化
        changeShow:false
      }
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData() {
        return {
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
          query: {
            productName: undefined,
            dosage: undefined,
            specification: undefined,
            manufacture: undefined
          }
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list() {
        this.visible = true;
        queryShowProductList(this.resData,this.query).then(res =>{
          this.resData = res.data
        })
      },
      searchEnterFun(e){
        // this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      // ************************
      handleSizeChange(val) {
        this.resData.pageSize = val
        this.list()
      },
      handleQuery(){
        this.list()
      },
      restQuery(){//重置
        this.query=this.metaQuery();
        this.list();
      },
      goBack() {
        this.visible = false;
      },
      handleGoChange(id){
        this.changeShow = true;
        this.$nextTick(() => {
          this.$refs.change.list(id)
        })
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val
        this.list()
      }
    }
  }
</script>

