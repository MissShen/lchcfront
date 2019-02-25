<template>
  <!--新增页面选择药品信息-->
  <el-dialog
    :title="'信息'"
    :close-on-click-modal="false"
    width="75%"
    :visible.sync="visible">

    <div class="tableset">
      <el-table
        ref="multipleTable"
        :data="resData.list"
        border
        stripe>
        <el-table-column label="名称">
          <template slot-scope="scope">
            <span>{{ scope.row.nameChn }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="operates"><a class="operation-btn" @click="goChoose(scope.row)">选择</a></div>
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

  </el-dialog>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  // 引入用户相关请求
  import {queryClassificationList} from  'src/axios/datacenter/authdata/medicalinsurance/classification'

  export default {
    components: {ElCol},
    name: "classificationInfo",
    data() {
      return {
        visible: false,
        resData: this.metaData(),
        dataForm: this.metaQuery(),
        assoList: []
      }
    },
    methods: {
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
          list:[]
        }
      },
      metaQuery () { // 表单查询数据初始化
        return {
          searchType: undefined,
          searchContent:undefined
        }
      },
      //  启动
      fillData(searchType,searchContent) {
        this.visible = true;
        this.dataForm.searchType=searchType;
        this.dataForm.searchContent=searchContent;
        this.list();
      },
      //  页面初始化
      list(){
        queryClassificationList(this.resData,this.dataForm).then(res => {
          this.resData=res.data;
        })
      },
      //  选中
      goChoose(entity){
        this.visible = false;
        this.$emit('classificationChoose', {value: entity})
      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val;
        if (this.resData.pageSize === 0) {
          this.resData.pageSize = 10
        }
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val;
        if (this.resData.pageNum === 0) {
          this.resData.pageNum = 1
        }
        this.list()
      }
    }
  }
</script>

<style scoped>

</style>

