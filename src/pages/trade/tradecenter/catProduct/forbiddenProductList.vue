<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tabs-panel">
      <span class="active">禁用药品目录</span>
    </div>

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <div class="table-form">
        <el-form ref="query" :model="query" label-position="right" size="small">
       <div class="formrow">
              <span>
                <el-input v-model="query.orgName" @keyup.enter.native="searchEnterFun" placeholder="生产企业" size="small"></el-input>
              </span>
              <span>
                  <el-input v-model="query.bakMedicalName" @keyup.enter.native="searchEnterFun" placeholder="产品名" size="small"></el-input>
               </span>
               <span>
                  <el-input v-model="query.bakMedicalSpec" @keyup.enter.native="searchEnterFun" placeholder="规格" size="small"></el-input>
               </span>
               <span>
                <el-button type="warning" @click="searchEnterFun" size="small">查询</el-button>
                <el-button @click="resetForm()" size="small">重置</el-button>
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
              {{ scope.row.nameChn }}
            </template>
          </el-table-column>
          <el-table-column label="商品名">
            <template slot-scope="scope">
              {{ scope.row.tradeName }}
            </template>
          </el-table-column>
          <el-table-column label="规格包装">
            <template slot-scope="scope">
              <span>{{ scope.row.spec }}{{ scope.row.standRate }}{{ scope.row.smallestUnits }}{{ scope.row.specUnit }}</span>
            </template>
          </el-table-column>
          <el-table-column label="生产企业">
            <template slot-scope="scope">
              <span>{{ scope.row.manufactureName }}</span>

            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleFromInfo(scope.row.productId)">启用</el-button>
              <a @click="handleFromInfo(scope.row.productId)" class="operation-btn">启用</a>
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
  </div>

</template>
<script>

  // 引入用户相关请求
  import {forbiddenProductList} from 'src/axios/trade/catProduct/forbiddenProductListAxios'
  import {deleteOrSaveDrug}  from 'src/axios/trade/catProduct/forbiddenProductListAxios'
  import {priceFormat,keyBoardEnter} from "src/utils";

  export default {
    data () {
      return {
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
      resetForm() {
        this.query = this.metaQuery();
        this.list()
      },
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {
          resData: { // 前后台交互数据封装格式
            pageNum: 1,
            pageSize: 20,
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
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
      },
      metaQuery () { // 表单查询数据初始化
        return {
            id: "",
            searchSenderName:"",
            searchSenderAbbr: "",
            searchRealName: "",
            orgName: "",
            bakMedicalName: "",
            bakMedicalSpec: "",
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      handleFromInfo(productId){
        var flag = 1;
        this.$confirm(`确定启用?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteOrSaveDrug(productId,flag).then(res => {
            this.$message({
              message: "启用成功！",
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.list()
              }
            })
          })
        })
      },
      //  获取用户分页列表
      list () {
        forbiddenProductList(this.resData, this.query).then(res => {
          this.resData = res.data;
          if(this.resData.pageNum===0){
            this.resData.pageNum=1;
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
      }
    }
  }
</script>

