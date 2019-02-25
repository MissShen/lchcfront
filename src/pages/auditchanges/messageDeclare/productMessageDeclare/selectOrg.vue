<template>
  <el-dialog
    custom-class="w80"
    title="选择生产企业"
    :close-on-click-modal="false"
    :visible.sync="visible"
    append-to-body
  >
    <div v-if="visible">
        <!-- 表格查询表单 -->
          <el-form :model="query"  size="small" :inline="true" class="demo-form-inline table-form">
            <el-form-item>
                  <el-input v-model="query.NAME" placeholder="企业名称" @keyup.enter.native="searchEnterFun"
                            size="small"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-input v-model="query.ABBR" placeholder="企业简称" @keyup.enter.native="searchEnterFun"
                            size="small"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-input v-model="query.CREDIT" placeholder="统一社会信用代码" @keyup.enter.native="searchEnterFun"
                            size="small"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-input v-model="query.ORGANIZE" placeholder="组织机构代码" @keyup.enter.native="searchEnterFun"
                            size="small"></el-input>
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
            <el-table-column label="企业名称" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.NAME }}</span>
              </template>
            </el-table-column>
            <el-table-column label="企业简称" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.ABBR}}</span>
              </template>
            </el-table-column>

            <el-table-column label="统一社会信用代码" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.CREDIT}}</span>
              </template>
            </el-table-column>

            <el-table-column label="组织机构代码" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.ORGANIZE}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120">
              <template slot-scope="scope">
                <div class="operates">
                  <span><a class="operation-btn" @click="selectOrg(scope.row.ID,scope.row.NAME,scope.row.CODE)">选择</a></span>
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
    </div>
    <span slot="footer">
      <el-button @click="goBack()">关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
  import {selectOrg} from 'src/axios/auditchanges/messageDeclare/product'
  import {keyBoardEnter} from "src/utils";
  export default {
    data () {
      return {
        visible: false,
        resData: this.metaData(),
        query: this.metaQuery()
      }
    },
    created () {
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {
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
          query: {
            NAME: '',
            ABBR: '',
            CREDIT: '',
            ORGANIZE: ''
          }
        }
      },
      //  获取用户分页列表
      list () {
        this.visible = true;
        this.queryList();
      },
      queryList(){
        //获取企业列表
        selectOrg(this.resData, this.query).then(res => {
          this.resData = res.data
        })
      },
      handleSizeChange (val) {
        this.resData.pageSize = val;
        this.queryList()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val;
        this.queryList()
      },
      //查询
      searchEnterFun(e){
        this.resData.pageNum = 1;
        keyBoardEnter(e, () => {
          this.queryList();
        })
      },
      handleQuery(){
        this.queryList()
      },
      restQuery(){//重置
        this.query = this.metaQuery();
        this.resData = this.metaData();
        this.queryList();
      },
      selectOrg(id, name, code){
        this.visible = false;
        this.$nextTick(() => {
          this.$emit("selectOrg", {"0": id, "1": name, "2": code})
        })
        this.emptyData();
      },
      emptyData(){
        this.query = this.metaQuery();
        this.resData = this.metaData();
      },
      goBack(){
        this.visible = false;
        this.emptyData();
      }
    }
  }
</script>

