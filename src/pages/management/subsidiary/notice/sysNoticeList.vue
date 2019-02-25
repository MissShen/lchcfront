<template>
  <div>
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <el-form :inline="true" :model="queryData" ref="queryData" class="table-form">
         <el-form-item>
           <el-select v-model="queryData.queryType" placeholder="查询方式" size="small">
            <el-option label="公告标题" value="1"></el-option>
            <el-option label="公告类型" value="2"></el-option>
            <el-option label="关键字" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="queryData.queryContent" placeholder="查询内容" size="small"></el-input>
        </el-form-item>
        <el-form-item>
           <el-date-picker
             size="small"
             type="date"
             format="yyyy-MM-dd"
             value-format="yyyy-MM-dd"
             placeholder="创建开始日期"
             :editable="false"
             v-model="queryData.beginDate">
            </el-date-picker>
          至
          <el-date-picker
            size="small"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="创建结束日期"
            :editable="false"
            v-model="queryData.endDate">
            </el-date-picker>
       </el-form-item>
        <el-form-item>
          <el-button type="success" @click="handleQuery()" size="small">查询</el-button>
          <el-button type="warning" @click="queryData =metaQuery()" size="small">重置</el-button>
          <el-button @click="handleBack()" size="small">返回</el-button>
        </el-form-item>
      </el-form>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          :default-sort="{prop: 'date', order: 'descending'}"
          border
          stripe>
          <el-table-column label="序号" header-align="center" align="center" type="index" width="50"></el-table-column>
          <el-table-column label="公告标题" header-align="center" align="left">
            <template slot-scope="scope">
              <a href="javascript:;" @click="handleNoticeView(scope.row.id)">{{scope.row.noticeTitle}}</a>
            </template>
          </el-table-column>
          <el-table-column label="公告类型" header-align="center" align="center" width="200px">
            <template slot-scope="scope">
              <span v-for="type in noticeTypeList" v-if="type.id===scope.row.noticeType">{{type.noticeTypeName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建日期" header-align="center" align="center" width="200px">
            <template slot-scope="scope">
              {{scope.row.createDate}}
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
    <notice-view-from v-if="isNoticeView" ref="noticeView"></notice-view-from>
  </div>
</template>

<script>
  import {noticeTypeAllList} from "src/axios/management/subsidiary/noticeType";
  import {userNoticeInitList} from "src/axios/management/subsidiary/notice"
  import noticeViewFrom from './sysNoticeView'
  import {HasPerm} from 'src/components/mixins'
  export default {
    name: "sys-notice-list",
    mixins:[HasPerm],
    components: {
      noticeViewFrom
    },
    data() {
      return {
        resData: this.metaData(),
        queryData: this.metaQuery(), // 查询初始化
        isNoticeView: false,
        noticeTypeList: [], // 公告类型列表
      }
    },
    created() {
      this.metaList();
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData() { // 前后台交互数据封装格式
        return {
          pageNum: 1,
          pageSize: 20,
          total: 0,
          pages: 0,
          list: []
        }
      },
      metaQuery() { // 查询数据封装格式
        return {
          queryType: '1',
          queryContent: '',
          beginDate: undefined,
          endDate: undefined
        }
      },
      metaList() {
        if(this.hasLogin()){
          noticeTypeAllList().then(res => {
            this.noticeTypeList = res.data
          });
          userNoticeInitList(sessionStorage.getItem('menu-code'), this.resData, this.queryData).then(res => {
            this.resData = res.data;
            0 === this.resData.pageNum ? this.resData.pageNum = 1 : null;
          })
        }
      },
      handleNoticeView(id){
        this.isNoticeView=true;
        this.$nextTick(function(){
          this.$refs.noticeView.metaList(id)
        })
      },
      // ************************
      handleQuery() {
        this.resData = this.metaData();
        this.metaList();
      },
      handleSizeChange(val) {
        this.resData.pageSize = val;
        this.metaList()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val;
        this.metaList()
      },
      handleBack(){
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>

</style>
