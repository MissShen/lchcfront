<template>
  <el-dialog
    :title="'选择药品编码'"
    :close-on-click-modal="false"
    width="75%"
    :visible.sync="visible">
    <el-form :model="queryDrugs" ref="queryDrugs"
             label-width="150px" label-position="left" :inline="true" class="table-form" size="small">
        <el-form-item>
          <el-input placeholder="通用名或编码" v-model="queryDrugs.searchContent" size="small" @keyup.enter.native="searchEnterFun"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
          <el-button type="warning" @click="" size="small">重置</el-button>
        </el-form-item>
    </el-form>

    <div class="tableset">
      <el-table
        :data="resData.list"
        border
        stripe>
        <el-table-column label="通用名" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.nameChn }}</span>
          </template>
        </el-table-column>
        <el-table-column label="药品编码" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.code}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80">
          <template slot-scope="scope">
            <div class="operates"><a class="operation-btn" href="javascript:void(0)" @click="choiceData(scope.row)">选择</a></div>
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
      <el-button size="small" type="" @click="visible = false">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  import {getDrugs} from 'src/axios/datacenter/authdata/protecteddrug/protecteddrug';
  import {keyBoardEnter} from "src/utils";

  export default {
    components: {ElCol},
    name: "commonDrugsCode",
    data() {
      return {
        visible: false,
        chooseList: [],
        type: '',
        data: '',
        queryDrugs:{
          searchContent:'',
          searchType:''
        },
        resData: this.metaData(),
      }
    },
    methods: {
      fillData(type, data) {
        this.visible = true;
        this.list();
      },
      choiceData(data){
        this.visible = false;
        this.$emit('addDrugCode',data)
      },
      searchEnterFun(e){
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      list(){
        this.queryDrugs.searchType = '5';
        getDrugs(this.queryDrugs, this.resData).then(res => {
          this.resData = res.data
        })
      },
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
      // ************************ 分页操作 ************************
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
