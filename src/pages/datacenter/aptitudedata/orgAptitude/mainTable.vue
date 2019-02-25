<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
            <el-form-item>
              <el-input v-model="query.name" placeholder="企业名称关键词" @keyup.enter.native="searchEnterFun" size="small"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="query.organizeCode" placeholder="组织机构代码关键词" @keyup.enter.native="searchEnterFun" size="small"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="query.linkPerson" placeholder="联系人关键词" @keyup.enter.native="searchEnterFun" size="small"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
              <el-button type="warning" size="small" @click="resetForm()">重置</el-button>
            </el-form-item>
        </el-form>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe>
          <el-table-column label="企业名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="组织机构代码" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.organizeCode }}</span>
            </template>
          </el-table-column>
          <el-table-column label="企业类型" width="220">
            <template slot-scope="scope">
              <span v-if="scope.row.sendFlag == '1'">配送企业</span>&nbsp;
              <span v-if="scope.row.factoryFlag == '1'">生产企业</span>&nbsp;
              <span v-if="scope.row.salerFlag == '1'">代理企业</span>
            </template>
          </el-table-column>
          <el-table-column label="联系人" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.linkPerson }}</span>
            </template>
          </el-table-column>
          <el-table-column label="联系电话" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.linkTel }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="60">
            <template slot-scope="scope">
              <div class="operates"><a href="javascript:;" class="operation-btn" @click="goDetail(scope.row.id)" size="small">查看</a></div>
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

  import {orgListPage} from 'src/axios/datacenter/qualificationdata/orgqualification/orgqualification';
  import {keyBoardEnter} from "src/utils";

  export default {
    data () {
      return {
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
      }
    },
    created () {
      if(!!this.$store.state.pageSeach.pageNum){
        this.query=this.$store.state.pageSeach;
        this.resData.pageSize=this.$store.state.pageSeach.pageSize;
        this.resData.pageNum=this.$store.state.pageSeach.pageNum;
      }
      this.$store.state.pageSeach=this.query;
      this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {// 前后台交互数据封装格式
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
      metaQuery () { // 表单查询数据初始化
        return {
          name:"",
          organizeCode:"",
          linkPerson:""
        }
      },
      resetForm() {
        this.query = this.metaQuery();
        this.search();
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      search(){//查询
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum=1;
        this.list();
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      list () {
        this.$store.state.pageSeach = this.query;
        orgListPage(this.query, this.resData).then(res => {
          this.resData = res.data
        })
      },
      goDetail(id){
        this.$router.push("/DATA/DatacenterLayDetail/orgAptitude/tableDetail/"+id)
      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.$store.state.pageSeach.pageSize = val
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        this.$store.state.pageSeach.pageNum = val
        this.resData.pageNum = val
        this.list()
      }
    }
  }
</script>


