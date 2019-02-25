<template>
  <!-- 表格 -->
  <div class="tablebox">

        <!-- 表格查询表单 -->
          <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
                <el-form-item>
                  <el-input v-model="query.orgName" placeholder="机构名称" @keyup.enter.native="searchEnterFun" size="small"></el-input>
                </el-form-item>

              <el-form-item>
                  <el-input v-model="query.typeName" placeholder="机构类型" @keyup.enter.native="searchEnterFun" size="small"></el-input>
                </el-form-item>

              <el-form-item>
                   <el-select v-model="query.searchId" placeholder="公示状态" size="small">
                    <el-option
                      v-for="item in stateList"
                      :key="item.key"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
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
        <el-table-column label="机构类型" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.typeName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="公示状态">
          <template slot-scope="scope">
            <span>{{scope.row.publicitystate=='2'?'已撤回':scope.row.publicitystate=='1'?'公示中':''}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140px">
          <template slot-scope="scope">
            <div class="operates">
              <span>
                <a class="operation-btn" @click="handleView(scope.row.orgId,scope.row.typeId)">详情</a>
              </span>
              <span>
                <a class="operation-btn" v-if="scope.row.publicitystate=='1'" @click="handleUpdate(scope.row.id,2)">撤回</a>
              </span>
              <span>
                <a class="operation-btn" v-if="scope.row.publicitystate!='1'" @click="handleUpdate(scope.row.id,1)">公示</a>
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
    <!--<detail-page ref="detailPage"></detail-page>-->
    <find-view-page ref="findViewPage"></find-view-page>
  </div>

</template>
<script>

  // 引入用户相关请求

  import {queryListManage,updatepublicity} from 'src/axios/auditchanges/twoInvoiceSystem/AptitudePublicity'
  import {keyBoardEnter} from "src/utils";
  import  findViewPage from "src/pages/auditchanges/twoInvoiceSystem/AptitudeUpload/findViewPage";
    export default {
    components:{
      findViewPage,
    },
    data () {
      return {
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
        },
        stateList:[{
          key:"1",
          label: "公示状态",
          value: "", /*值*/
        },{
          key:"2",
          label: "已撤回",
          value: "2", /*值*/
        },{
          key:"3",
          label: "公示中",
          value: "1", /*值*/
        }]
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
          productName:undefined,
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
            orgName: undefined,
            typeName: undefined,
            searchId: undefined,
            searchName: undefined
          }
        }
      },
      searchProject(){
        return {
          projectList : {
            id:undefined,
            projectName:undefined
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
        queryListManage(this.resData, this.query).then(res => {
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
      handleUpdate(id,num) {
        updatepublicity(id,num).then(res => {
            this.list();
        })

      },
      restQuery(){//重置
        this.query=this.metaQuery();this.list();
      },handleView(id,typeId) {
        this.$nextTick(() => {
          this.$refs.findViewPage.list(id,typeId)
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
