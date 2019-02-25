<template>
  <div>
  <!-- 表格 -->
    <!--<div class="tabs-panel">-->
      <!--<span class="active">产品申报变更</span>-->
    <!--</div>-->
  <div class="tablebox">
        <!-- 表格查询表单 -->
          <el-form ref="query" :model="query" :inline="true" class="demo-form-inline table-form">
              <el-form-item>
                <el-input v-model="query.PRODUCT" placeholder="产品名称" @keyup.enter.native="searchEnterFun" size="small"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="query.DOSAGE" placeholder="剂型" @keyup.enter.native="searchEnterFun" size="small"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="query.SPEC" placeholder="规格" @keyup.enter.native="searchEnterFun" size="small"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="query.MANUFACTURE" placeholder="生产企业" @keyup.enter.native="searchEnterFun" size="small"></el-input>
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
            <el-table-column label="产品名称">
              <template slot-scope="scope">
                <div>
                  <div class="text-inline">{{ scope.row.PRODUCT }}</div>
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
            </el-table-column>
            <!--<el-table-column label="商品名" show-overflow-tooltip>-->
              <!--<template slot-scope="scope">-->
                <!--<span>{{scope.row.TRADE}}</span>-->
              <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column label="剂型" width="100" show-overflow-tooltip>-->
              <!--<template slot-scope="scope">-->
                <!--<span>{{scope.row.DOSAGE}}</span>-->
              <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column label="规格" show-overflow-tooltip>-->
              <!--<template slot-scope="scope">-->
                <!--<span>{{scope.row.SPEC}}</span>-->
              <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column label="转换比" width="60" header-align="left" align="right">-->
              <!--<template slot-scope="scope">-->
                <!--<span>{{scope.row.STANDRATE}}</span>-->
              <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column label="单位" width="50">-->
              <!--<template slot-scope="scope">-->
                <!--<span>{{scope.row.METRIC}}</span>-->
              <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column label="包材" width="60" show-overflow-tooltip>-->
              <!--<template slot-scope="scope">-->
                <!--<span>{{scope.row.WRAP}}</span>-->
              <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column label="生产企业" show-overflow-tooltip>-->
              <!--<template slot-scope="scope">-->
                <!--<span>{{ scope.row.MANUFACTURE }}</span>-->
              <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <div class="operates">
                  <span><a class="operation-btn" @click="handleGoChange(scope.row.ID)">变更</a></span>
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
    <div class="table-caption foot-btn">
      <div class="foot-left">
        <el-button size="small" @click="goBack">返回</el-button>
      </div>
    </div>
    </div>
    <change ref="change" v-if="changeShow"></change>
  </div>
  </div>
</template>

<script>
  import change from "./change";
  import {queryShowProductList} from "src/axios/auditchanges/messageChanges/productChange"
  import {keyBoardEnter} from "src/utils";
  export default {
    components:{
      change,
    },
    data() {
      return {
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        changeShow:false
      }
    },
    created() {
      this.resData.pageSize = 10;
      this.list();
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
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
      metaQuery() { // 表单查询数据初始化
        return {
          query: {
            PRODUCT: undefined,
            DOSAGE: undefined,
            SPEC: undefined,
            MANUFACTURE: undefined,
          }
        }
      },
      //查询
      searchEnterFun(e){
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list() {
        queryShowProductList(this.resData,this.query).then(res =>{
          this.resData = res.data
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
        this.query=this.metaQuery();this.list();
      },
      goBack() {
        this.$router.go(-1)
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

