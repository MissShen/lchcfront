<template>
  <el-dialog
    :title="'选择标示生产企业编码'"
    :close-on-click-modal="false"
    width="75%"
    :visible.sync="visible">
    <el-form :model="query" ref="query" label-width="150px" label-position="left" :inline="true" size="small"
             class="table-form">
      <el-form-item>
        <el-select v-model="query.searchType" size="small">
          <el-option label="名称" value="0"></el-option>
          <el-option label="编码" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="query.searchText" placeholder="关键词"
                  @keyup.enter.native="searchEnterFun" size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
        <el-button type="warning" @click="resetForm" size="small">重置</el-button>
      </el-form-item>
    </el-form>

    <div class="tableset">
      <el-table
        ref="table"
        :data="resData.list"
        @sort-change="sortChange"
        border
        stripe>
        <el-table-column label="企业编码" show-overflow-tooltip sortable="custom" prop="CODE">
          <template slot-scope="scope" >
            <span>{{scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column label="企业名称" show-overflow-tooltip sortable="custom" prop="NAME">
          <template slot-scope="scope" >
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="60">
          <template slot-scope="scope">
            <div class="operates">
              <span><a class="operation-btn" @click="chooseMarkOrg(scope.row)">选择</a></span>
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
    <span slot="footer">
      <el-button size="small" @click="visible = false">关闭</el-button>
    </span>

  </el-dialog>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  import {queryFactoryOrg} from 'src/axios/datacenter/authdata/qualitybulletin/qualityBulletin'
  import {keyBoardEnter} from "src/utils";

  export default {
    components: {ElCol},
    name: "commonMarkOrg",
    data() {
      return {
        visible: false,
        type: '',
        data: '',
        resData: this.metaData(),
        query: this.metaQuery()
      }
    },

    methods: {
      sortChange(value){
        let sortType = " desc";
        if (value.order != null) {
          if (value.order.startsWith("asc")) {
            sortType = " asc";
          }
          this.query.orderBy = value.prop + sortType;
          this.list()
        }
      },

      fillData() {
        this.visible = true;
        this.list();
      },

      list(){
        queryFactoryOrg(this.query, this.resData).then(res => {
          this.resData = res.data;
          if (this.resData.pageNum == 0) {
            this.resData.pageNum = 1
          }
        })
      },

      searchEnterFun (e) {
        this.resData.pageNum = 1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },

      chooseMarkOrg(value) {
        this.$emit('chooseMarkOrg', {value: value});
        this.visible = false;
      },

      resetForm() {
        this.query = this.metaQuery();
        this.resData = this.metaData;
        this.list();
      },

      metaData () {
        return {// 前后台交互数据封装格式
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
        }
      },
      metaQuery () {
        return {
          searchType: "0",
          searchText: "",
          orderBy: null
        }
      },

      handleSizeChange (val) {
        this.resData.pageSize = val;
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val;
        this.list()
      }
    }
  }
</script>
