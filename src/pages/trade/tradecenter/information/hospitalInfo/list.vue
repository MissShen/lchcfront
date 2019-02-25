<template>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
             <el-form-item class="width-120">
                <el-input v-model="query.searchOrgName"  @keyup.enter.native="searchEnterFun"  placeholder="医院名称"  size="small"></el-input>
             </el-form-item>
             <el-form-item class="width-120">
                <el-input v-model="query.searchOrgNameAbbr"  @keyup.enter.native="searchEnterFun"  placeholder="简称"  size="small"></el-input>
             </el-form-item>
              <el-form-item class="width-120">
                <el-input v-model="query.searchOrgAddress"  @keyup.enter.native="searchEnterFun"  placeholder="联系地址"  size="small"></el-input>
               </el-form-item>
                <el-form-item>
                <el-button type="success" size="small" @click="searchEnterFun">查询</el-button>
                <el-button type="warning" size="small" @click="restForm">重置</el-button>
               </el-form-item>
         </el-form>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
                :data="resData.list"
                border
                tooltip-effect="dark"
                style="width: 100%"
                stripe
                @sort-change="sortChang"
        >
       <!--   <el-table-column type="index" width="50" header-align="left" align="center" label="序号"></el-table-column>-->
          <el-table-column label="医院名称	" width="200" prop="oc.name" sortable="custom">
            <template slot-scope="scope">
              {{ scope.row.name }}
            </template>
          </el-table-column>
          <el-table-column label="简称" width="160" prop="oc.abbr" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.abbr }}</span>
            </template>
          </el-table-column>
          <el-table-column label="联系人" width="120" prop="oc.link_person" sortable="custom">
              <template slot-scope="scope">
                <span>{{ scope.row.linkPerson }}</span>
              </template>
          </el-table-column>
            <el-table-column label="联系地址" show-overflow-tooltip prop="oc.address" sortable="custom">
              <template slot-scope="scope">
                <span>{{ scope.row.address }}</span>
              </template>
            </el-table-column>
            <el-table-column label="联系电话" width="200" prop="oc.tel" sortable="custom">
              <template slot-scope="scope">
                <span>{{ scope.row.tel }}</span>
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
      <div class="foot-btn">
        <div class="foot-left">
          <el-button type="warning" size="small"  @click="exportExcel">导出Excel</el-button>
        </div>
      </div>
    </div>
    <!-- ========================== 主内容end ========================= -->

</template>
<script>

  // 引入用户相关请求
  import {selectHostInfo,exportEXL} from 'src/axios/trade/information/hospitalinfo/selectHostInfo'
  import fileUpload from 'js-file-download'
  import {priceFormat,keyBoardEnter} from "src/utils";

  export default {
    data () {
      return {
        currentOrder: undefined,
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false // 表单查询初始化
      }
    },
    created () {
      this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      sortChang(value){
        let sortType=" desc"
        if(value.order.startsWith("asc")){
          sortType=" asc";
        }
        this.currentOrder=value.prop + sortType;
        this.list()
      },
      metaData () {
        // 前后台交互数据封装格式
        return {
          orderBy: undefined,
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
      restForm(){
         this.query = this.metaQuery()
        this.list()
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

            id: undefined,
            searchOrgName:undefined ,
            searchOrgNameAbbr:undefined,
            searchOrgAddress:undefined

        }
      },
      exportExcel(){
        exportEXL(this.query).then(res => {
          let headers = res.headers;
          let title = ""
          if (!title) {
            const fileName = headers['content-disposition'];
            title = fileName.includes('filename=') ? decodeURI(fileName.split('=')[1]) : '下载的文件';
          }
          fileUpload(res.data,title,"application/vnd.ms-excel")
        })
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy=this.currentOrder;
        selectHostInfo(this.resData, this.query).then(res => {
          this.resData = res.data;
          if(this.resData.pageNum === 0 ){
             this.resData.pageNum = 1;
          }
        })
      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val;
        this.list();
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val;
        this.list();
      }
    }
  }
</script>

