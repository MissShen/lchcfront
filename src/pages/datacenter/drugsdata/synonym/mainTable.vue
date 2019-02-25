<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
            <el-form-item>
              <el-select v-model="query.searchType" placeholder="请选择" size="small">
                <el-option label="异名" value="1"></el-option>
                <el-option label="编码" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input v-model="query.searchText" placeholder="关键词" size="small" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
              <el-button type="warning" @click="resetForm()" size="small">重置</el-button>
            </el-form-item>
        </el-form>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe>
          <el-table-column label="药品编码" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.CODE }}</span>
            </template>
          </el-table-column>
          <el-table-column label="通用名" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.NAME_CHN }}</span>
            </template>
          </el-table-column>
          <el-table-column label="异名" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.ALIAS }}</span>
            </template>
          </el-table-column>
          <el-table-column label="英文异名" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.NAME_ENG }}</span>
            </template>
          </el-table-column>

          <el-table-column
            fixed="right"
            label="操作"
            width="140">
            <template slot-scope="scope">
              <div class="operates"><a class="operation-btn" @click="goInfo(scope.row.ID)">查看</a>
              <a class="operation-btn" @click="goEdit(scope.row.ID)">修改</a></div>
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

    <div class="foot-btn">
      <div class="foot-left">
        <el-button type="success" size="small" @click="goAdd()">
          新增
        </el-button>
        <el-button v-if="flag == 'true'" @click="handleBack">返回</el-button>
      </div>
    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求
  // import {userList} from 'src/axios/management/authority/sysUser'
  import {queryDrugSynonymList} from 'src/axios/datacenter/drugdata/synonym/synonym'
  import {keyBoardEnter} from "src/utils";

  export default {
    data () {
      return {
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        code: undefined,
        flag: undefined
      }
    },
    watch:{
      // 接收参数
      '$route.params.flag': 'judge'
    },
    created () {
      if(!!this.$store.state.pageSeach.pageNum){
        this.query = this.$store.state.pageSeach;
        this.resData.pageSize = this.$store.state.pageSeach.pageSize;
        this.resData.pageNum = this.$store.state.pageSeach.pageNum;
      }
      this.$store.state.pageSeach=this.query;
      this.list();
      this.judge();
    },
    methods: {
      judge(){
        // 接收参数
        this.code = this.$route.params.code;
        this.code = this.code === 'undefined' ? undefined : this.code;
        this.flag = this.$route.params.flag;
        this.flag = this.flag === 'undefined' ? undefined : this.flag;
        // 根据参数设置搜索条件
        if(this.flag == 'true' && this.code != undefined) {
          this.query.searchType = '2';
          this.query.searchText = this.code;
        }else {
          this.query.searchType = '';
          this.query.searchText = '';
        }

      },
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {
            pageNum: 1,
            pageSize: 10,
            size: undefined,
            startRow: undefined,
            endRow: undefined,
            total: undefined,
            pages: undefined,
            prePage: undefined,
            nextPage: undefined,
            isFirstPage: true,
            isLastPage: undefined,
            hasPreviousPage: undefined,
            hasNextPage: undefined,
            navigatePages: undefined,
            navigatepageNums: undefined,
            navigateFirstPage: undefined,
            navigateLastPage: undefined,
            firstPage: undefined,
            lastPage: undefined,
            list: undefined
        }
      },
      metaQuery () { // 表单查询数据初始化
        return {
            searchType: undefined,
            searchText: undefined,
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      //  获取用户分页列表
      list () {
        this.$store.state.pageSeach = this.query;

        queryDrugSynonymList(this.query, this.resData).then(res => {
          this.resData = res.data
        })

      },
      // 重置
      resetForm() {
        this.query = this.metaQuery ();
        this.list();
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
      },
      // 查看
      goInfo(id) {
        this.$router.push("/DATA/basedata/synonym/tableDetail/"+id);
      },
      // 修改
      goEdit(id) {
        this.$router.push("/DATA/basedata/synonym/updateForm/"+id);
      },
      // 新增
      goAdd() {
        this.$router.push("/DATA/basedata/synonym/insertForm");
      },
      // 返回
      handleBack(){
        this.$router.go(-1)
      },
    }
  }

</script>
