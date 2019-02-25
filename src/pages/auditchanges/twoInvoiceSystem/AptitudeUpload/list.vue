<template>
  <!-- 表格 -->
  <div class="tablebox">
    <div class="padding5"></div>
        <!-- 表格列表 -->
        <div class="tableset">
          <el-table
            :data="resData.list"
            border
            stripe
          >
            <el-table-column label="机构类型" width="500" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.productName}}</span>
              </template>
            </el-table-column>
            <el-table-column label="已上传文件数" header-align="left" align="right">
              <template slot-scope="scope">
                <span>{{ scope.row.filenumber }}</span>
              </template>
            </el-table-column>
            <el-table-column label="提交状态">
              <template slot-scope="scope">
                <span v-if="scope.row.submitstate==='1'">已提交</span>
                <span v-if="scope.row.submitstate==='2'">已撤回</span>
                <span v-if="scope.row.submitstate==='0'">未提交</span>
              </template>
            </el-table-column>
            <el-table-column label="提交日期">
              <template slot-scope="scope">
                <span>{{ scope.row.submitdate }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                <div class="operates">
                  <a href="javascript:;" v-if="scope.row.submitstate!='1'" @click="handleView(scope.row.id)">维护资质</a>
                  <a href="javascript:;" v-if="scope.row.filenumber>'0' && scope.row.submitstate!='1'" @click="open2(scope.row.id)">提交</a>
                  <a href="javascript:;" v-if="scope.row.submitstate=='1'" @click="handlegoView(scope.row.id)">查看详情</a>
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

    <aptitude-page ref="aptitudePage" @update="list"></aptitude-page>
    <find-view-page ref="findViewPage"></find-view-page>
  </div>

</template>
<script>

  // 引入用户相关请求

  import {queryList, submit ,checkFileCount} from 'src/axios/auditchanges/twoInvoiceSystem/AptitudeUpload'
  import aptitudePage from "./aptitudePage";
  import findViewPage from "./findViewPage";

  export default {
    components: {
      aptitudePage,
      findViewPage,
    },

    data() {
      return {
        resData: this.metaData(),
        form: this.metaForm(), // 表单初始化
        activeName: 'first',//标签页默认选中第一个
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
    created() {
      //页面初始化执行
      this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData() {
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
      open2(id) {
        this.$confirm('确定提交两票制资质数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          checkFileCount(id).then(res => {
            if(res.data == ""){
              submit(id).then(res => {
                this.$resMessage(res, {
                  onClose: () => {
                    this.list()
                  }
                })
              })
            }else{
              alert(res.data);
            }
          })
        })
      },
      metaForm() { // 表单数据初始化
        return {
          id: undefined,
          productName: undefined,
          tradeName: undefined,
          metricName: undefined,
          codeName: undefined,
          manufactureName: undefined,
          spec: undefined,
          rate: undefined,
          doseageFormCode: undefined
        }
      },
      metaQuery() { // 表单查询数据初始化
        return {
          query: {//条件查询定义
            productName: undefined,
            tradeName: undefined,
            doseageFormCode: undefined,
            spec: undefined,
            manufactureName: undefined
          }
        }
      },
      list() {
        queryList(this.resData, this.query).then(res => {
          this.resData = res.data
        })
      },
      handleSizeChange(val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val
        this.list()
      },
      handleQuery() {
        this.list()
      },
      restQuery() {
        this.query = this.metaQuery()
      },
      handleView(id) {
        this.$nextTick(() => {
          this.$refs.aptitudePage.list(0, id)
        })
      },
      handlegoView(id) {
        this.$nextTick(() => {
          this.$refs.findViewPage.list(0, id)
        })
      }
    }
  }
</script>
<!--<style>
  .el-dialog {
    width: 80% !important;
  }
</style>-->
