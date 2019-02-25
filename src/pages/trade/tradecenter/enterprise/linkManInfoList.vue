<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tabs-panel">
      <span class="active">企业详情(XXX)</span>
    </div>

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <div class="table-form">
        <el-form ref="query" :model="query" label-position="right" size="small">
          <div class="formrow">
            <span>
                <el-input v-model="query.searchName"  @keyup.enter.native="searchEnterFun" placeholder="联系人" size="small"></el-input>
              </span>
            <span>
                <el-button type="warning" @click="searchEnterFun" size="small">查询</el-button>
                <el-button  size="small" @click="reset()">重置</el-button>
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
          <el-table-column label="联系人">
            <template slot-scope="scope">
              {{ scope.row.linkman }}
            </template>
          </el-table-column>
          <el-table-column label="座机号码">
            <template slot-scope="scope">
              <span>{{ scope.row.telePhone }}</span>
            </template>
          </el-table-column>
          <el-table-column label="手机号码">
            <template slot-scope="scope">
              <span>{{ scope.row.mobilePhone }}</span>
            </template>
          </el-table-column>
          <el-table-column label="邮政编码">
            <template slot-scope="scope">
              <span>{{ scope.row.postalCode }}</span>
            </template>
          </el-table-column>
          <el-table-column label="通讯地址">
            <template slot-scope="scope">
              <span>{{ scope.row.contactAddress }}</span>
            </template>
          </el-table-column>
          <el-table-column label="备注">
            <template slot-scope="scope">
              <span>{{ scope.row.comments }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span><a class="operation-btn">详情</a></span>
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
  import {selectEnterpriseContactsInfo} from 'src/axios/trade/enterprise/enterprise'
  import {keyBoardEnter} from "src/utils";

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
      reset(){
        this.query = this.metaData();
        this.list();
      },
      metaQuery () { // 表单查询数据初始化
        return {
          query: {
            id: undefined,
            searchName: undefined,
            searchSenderAbbr: undefined,
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
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        selectEnterpriseContactsInfo(this.resData, this.query).then(res => {
          this.resData = res.data
          if(this.resData.pageNum===0){
            this.resData.pageNum=1
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

