<template>
  <!-- 表格 -->
  <div class="tablebox">
        <!-- 表格查询表单 -->
          <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
                <el-form-item>
                  <el-input v-model="query.orgName" placeholder="机构名称" @keyup.enter.native="searchEnterFun" size="small"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
                  <el-button type="warning" @click="restQuery" size="small">重置</el-button>
                </el-form-item>
          </el-form>


        <!-- 表格列表 -->
    <div class="tableset">
      <el-table
        :data="resData.list"
        border
        stripe
        >
        <el-table-column label="机构名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.orgName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="资质文件" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.fileName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100px">
          <template slot-scope="scope">
            <div class="operates">
              <span>
                <a href="javascript:;" @click="handleClick(scope.row.id)" v-if="scope.row.filetype=='1'" class="operation-btn">查看</a>
              </span>
              <span>
                <a href="javascript:;" @click="handleFileDown(scope.row.id)" v-if="scope.row.filetype!='1'" class="operation-btn">下载</a>
              </span>
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
      <!--弹框-->
      <el-dialog
        :close-on-click-modal="false"
        :visible.sync="imgZoomShow"
        :center="true"
        width="100%"
        append-to-body
        class="preview-dialog-box"
        :close="handleCloseZoom">
        <div class="preview-dialog-table">
          <div class="preview-table-cell">
            <!--图片层-->
            <img ref="previewImg" class="preview-dialog-img" :src="fileData.url" alt="">
          </div>
        </div>
      </el-dialog>


  </div>

</template>
<script>

  // 引入用户相关请求

  import {queryList} from 'src/axios/auditchanges/twoInvoiceSystem/AptitudePublicity'
  import {
    downloadFile,
    downloadBase64File
  } from 'src/axios/auditchanges/messageRegister/filesManage';
  import {keyBoardEnter} from "src/utils";
  import fileUpload from 'js-file-download';
  import treeView from 'src/pages/auditchanges/common/treeView';

  export default {
    name: 'filesManage',
    components: {
      treeView
    },

    data () {
      return {
        fileData:{},
        imgZoomShow: false,
        resData: this.metaData(),
        activeName: 'first',//标签页默认选中第一个
        form: this.metaForm(), // 表单初始化
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
      //页面初始化执行
      this.list()
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
      metaForm () { // 表单数据初始化
        return {
          id: undefined,
          orgName:undefined,
          typeName:undefined,
          tradeName:undefined,
          metricName:undefined,
          codeName: undefined,
          manufactureName:undefined,
          spec:undefined,
          rate:undefined,
          doseageFormCode:undefined
        }
      },
      metaQuery () { // 表单查询数据初始化
        return {
          query: {//条件查询定义
            orgName: undefined
          }
        }
      },
      //查询
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      list () {
        queryList(this.resData, this.query).then(res => {
          this.resData = res.data
        })
      },
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      },
      handleQuery(){
        this.list()
      },
      restQuery(){//重置
        this.query=this.metaQuery();this.list();
      },
      handleClick(id) {//查看弹出遮罩层
        this.imgZoomShow = true;
        downloadBase64File(id).then(res => {
          if (res.data.success) {
            this.fileData = res.data.rightBackJson;
            this.fileData.url = 'data:application/octet-stream;base64,' + this.fileData.base64;
          }
          else {
            this.$message.error('服务器出错，请刷新重试');
          }
          console.log(this.fileData, 'this.fileData')
        })
      },
      handleFileDown(id) {
        // alert("文件下载");
        downloadFile(id).then(res => {
          let fileName = res.headers['content-disposition'].split('filename=')[1];
          let contentType = res.headers['content-type'];
          fileName = decodeURI(fileName);
          fileUpload(res.data, fileName, contentType)
        });
      },
      //关闭弹层
      handleCloseZoom() {
        this.imgZoomShow = false;
      }
    }
  }
</script>
<style>
  @import "./../../../../assets/css/auditchanges.css";
</style>
