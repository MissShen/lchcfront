<template>
  <!-- 表格 -->
  <div class="tablebox">
        <!-- 表格查询表单 -->
          <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
                <el-form-item>
                  <el-input v-model="query.product" @keyup.enter.native="searchEnterFun" placeholder="产品名称" size="small"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input v-model="query.dosage" @keyup.enter.native="searchEnterFun" placeholder="剂型" size="small"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input v-model="query.spec" @keyup.enter.native="searchEnterFun" placeholder="规格" size="small"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input v-model="query.manufacture" @keyup.enter.native="searchEnterFun" placeholder="生产企业" size="small"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="success" small @click="searchEnterFun" size="small">查询</el-button>
                  <el-button type="warning" small @click="resetForm" size="small">重置</el-button>
                </el-form-item>
          </el-form>

        <div class="tableset">
          <el-table
            :data="resData.list"
            border
            stripe
          >
            <el-table-column label="产品名称">
              <template slot-scope="scope">
                <div>
                  <div class="text-inline">{{scope.row.product}}</div>
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
            </el-table-column>
            <!--<el-table-column label="商品名" show-overflow-tooltip>-->
              <!--<template slot-scope="scope">-->
                <!--{{scope.row.trade}}-->
              <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column label="剂型" show-overflow-tooltip>-->
              <!--<template slot-scope="scope">-->
                <!--{{scope.row.dosage}}-->
              <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column label="规格" show-overflow-tooltip>-->
              <!--<template slot-scope="scope">-->
                <!--{{scope.row.spec}}-->
              <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column label="转换比" header-align="left" align="right">-->
              <!--<template slot-scope="scope">-->
                <!--{{scope.row.standRate}}-->
              <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column label="单位">-->
              <!--<template slot-scope="scope">-->
                <!--{{scope.row.metric}}-->
              <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column label="包材" show-overflow-tooltip>-->
              <!--<template slot-scope="scope">-->
                <!--{{scope.row.wrap}}-->
              <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column label="生产企业" show-overflow-tooltip>-->
              <!--<template slot-scope="scope">-->
                <!--{{scope.row.manufacture}}-->
              <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column label="操作" width="100px">
              <template slot-scope="scope">
                <div class="operates">
                  <span v-if="scope.row.status == '8'">
                    <a class="operation-btn" @click="goAffirm(scope.row.id)">去确认</a>
                  </span>
                  <span v-if="scope.row.status == '9'">
                    <a class="operation-btn" @click="goDetail(scope.row.id)">详情</a>
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
    <affirm ref="affirm"></affirm>
    <detail ref="detail"></detail>
  </div>
</template>

<script>
  import {queryList} from 'src/axios/auditchanges/orgAffirm/price'
  // import {keyBoardEnter} from "../../../../utils";
  import affirm from './affirm'
  import detail from './detail'
  export default {
    components: {
      affirm,
      detail
    },
    data () {
      return {
        query:this.metaQuery(),
        resData:this.metaData()
      }
    },
    created () {
      this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {
          pageNum: 0,
          pageSize: 0,
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

        let obj = {
          product: undefined,
          trade: undefined,
          dosage: undefined,
          spec: undefined,
          wrap: undefined,
          manufacture:undefined
        }
        if(sessionStorage.getItem('query')){
          obj = JSON.parse(sessionStorage.getItem('query'))
        }
        return obj
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        queryList(this.resData,this.query).then(res=>{
          this.resData = res.data
        })
      },
      goAffirm(id){
        this.$nextTick(() => {
          this.$refs.affirm.list(id)
        })
      },
      goDetail(id){
        this.$nextTick(() => {
          this.$refs.detail.list(id)
        })
      },
      // searchEnterFun(e){
      //   this.$store.state.pageSeach.pageNum = 1;
      //   this.resData.pageNum=1;
      //   keyBoardEnter(e, () => {
      //     this.list();
      //   })
      // },
      // 重置用户表单
      resetForm () {
        sessionStorage.removeItem('query')
        this.query = this.metaQuery();
        this.list();
      },
      // ************************
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

<style scoped>

</style>
