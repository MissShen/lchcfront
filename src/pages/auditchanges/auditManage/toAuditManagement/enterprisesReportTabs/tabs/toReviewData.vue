<template>

  <!-- 表格 -->
  <div class="tablebox">
    <!-- 表格查询表单 -->
      <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
            <el-form-item class="width-120">
            <el-input v-model="query.enterpriseName" placeholder="企业名称" size="small" @keyup.enter.native="searchEnterFun"></el-input>

          </el-form-item>
          <el-form-item class="width-150">

                <el-input v-model="query.createCode" placeholder="社会统一信用代码" size="small" @keyup.enter.native="searchEnterFun"></el-input>

          </el-form-item>
          <el-form-item class="width-120">

                <el-input v-model="query.organizeCode" placeholder="组织机构代码" size="small" @keyup.enter.native="searchEnterFun"></el-input>

          </el-form-item>
          <el-form-item class="width-100">

                <el-input v-model="query.replyUserName" placeholder="回复人" size="small" @keyup.enter.native="searchEnterFun"></el-input>

          </el-form-item>
          <el-form-item class="width-150">

                <el-select v-model="dataType" placeholder="举报类型" @change="chooseType" size="small">
                  <el-option
                    v-for="item in reportTypeOptions"
                    :key="item.index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>

          </el-form-item>
          <el-form-item>

                  <el-date-picker size="small" v-model="query.beginDate" type="datetime" placeholder="举报开始日期"></el-date-picker>
                 &nbsp;至&nbsp;
                  <el-date-picker size="small" v-model="query.endDate" type="datetime" placeholder="举报结束日期"></el-date-picker>

          </el-form-item>
          <el-form-item>
                <el-button v-on:click="searchEnterFun" type="success" size="small">查询</el-button>
                <el-button v-on:click="remove" type="warning" size="small">重置</el-button>

         </el-form-item>
      </el-form>

    <div class="tableset">
      <el-table :data="resData.list" ref="mainTable" border stripe @selection-change="handleSelectionChange">
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column label="企业名称">
          <template slot-scope="scope">
            <span>{{ scope.row.enterpriseName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="社会统一信用代码">
          <template slot-scope="scope">
            <span>{{ scope.row.createCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="组织机构代码">
          <template slot-scope="scope">
            <span>{{ scope.row.organizeCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="举报时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="举报类型">
          <template slot-scope="scope">
            <span>{{ scope.row.dataType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="回复人">
          <template slot-scope="scope">
            <span>{{ scope.row.replyUserName }}</span>
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

    <!--审核员-->
    <div class="foot-btn">
      <div class="foot-left">
        <el-button v-on:click="distributionReport" type="primary" size="small">分配审核员</el-button>
        <el-button v-on:click="deleteReport" type="warning" size="small">删除审核员</el-button>
      </div>
    </div>

    <el-dialog  :visible.sync="dataReportingVisible" :close-on-click-modal="false" width="80%" >
      <dataReporting @listUpdata="list" :dataType="dataType" :selectedDataReport="selectedData"></dataReporting>
    </el-dialog>

  </div>

</template>

<script>
  import dataReporting from 'src/pages/auditchanges/auditManage/toAuditManagement/enterprisesReportTabs/tabs/dataReporting'
  //引入列表数据
  import {reportEnterprisesList} from 'src/axios/auditchanges/toAuditManagement/enterprisesReportTabs'
  import {removeAuditor} from 'src/axios/auditchanges/toAuditManagement/productReportTabs'
  // import {keyBoardEnter} from "src/utils";
  export default {
    //初始化函数
    name: "to-review-data",
    components: {
      dataReporting
    },
    data() {
      return {
        reportTypeOptions: [{
          value: '0',
          label: '基础信息举报'
        }, {
          value: '2',
          label: '附加信息举报'
        }, {
          value: '3',
          label: '其他'
        }],
        dataType:'0',
        // statusVisible:false,
        dataReportingVisible: false,
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        selectedData:[],//储存选择的列表项
      }
    },
    //初始化函数
    created() {
      if(this.$store.state.resDataObj['8']){
        this.resData = this.$store.state.resDataObj['8']
      }
      //初始化列表
      this.list();
    },
    methods: {
      //条件查询
      list() {
        var selectQuery = this.query;
        var resData = this.resData;
        if (resData.pageSize == undefined || resData.pageSize == "" || resData.pageSize == null ) {
          resData.pageSize = 10;
        }
        if (resData.pageNum == undefined || resData.pageNum == "" || resData.pageNum == null ) {
          resData.pageNum = 1;
        }
        this.dataReportingVisible = false;
        selectQuery.dataType = this.dataType;
        reportEnterprisesList(resData,selectQuery).then(res=>{
          console.log(res,'resdddddddd')
          if(res.success){
            this.resData = res.data
            // console.log(res,'res.data')
          }else{
            this.$message(res.message);
          }
        })
      },
      //清空查询表单
      remove() {
        this.query={};
        this.list();
      },
      //查询按钮
      // searchEnterFun(e){
      //   // this.$store.state.pageSeach.pageNum = 1;
      //   this.resData.pageNum=1;
      //   keyBoardEnter(e, () => {
      //     this.select();
      //   })
      // },
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData() {
        return {
          pageNum: 1,
          pageSize: 10,
          size: undefined,
          startRow: undefined,
          endRow: undefined,
          total: undefined,
          pages: undefined,
          list: []
        }
      },
      metaQuery() { // 表单查询数据初始化
        return {
          query:{}
        }
      },
      //=============================记住多选框===========================================
      //多选框改变状态
      handleSelectionChange(val) {
        this.selectedData = val;
      },
      // ************************
      handleSizeChange(val) {
        this.resData.pageSize = val;
        this.list();
        this.$store.state.resDataObj['8'] = this.resData;

      },
      handleCurrentChange(val) {
        this.resData.pageNum = val;
        this.list();
        this.$store.state.resDataObj['8'] = this.resData;
      },
      //=============================操作===========================================
      distributionReport(){//分配审核员
        if(this.selectedData.length>0){//判断是否选中数据
          if(this.selectedData.some(item=>!!item.replyUserId==false)){
            this.dataReportingVisible = true;//弹窗显示
          }else{
            // console.log('失败')
            this.$confirm('此操作将覆盖已有的回复人, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(()=>{
              this.dataReportingVisible = true;//弹窗显示
            })
          }
        }else{
          this.$message({
            message:'请选择举报企业',
            type:'warning'
          })
        }
      },
      deleteReport(){//删除审核员
         console.log('删除审核员');
        let paramsForm ={
          idList:this.selectedData.map(item=>item.id)
        };
        if(this.selectedData.length>0){//判断是否选中数据
          removeAuditor(paramsForm).then(res=>{
            console.log(res,'resdddddddd');
            if(res.success){
              this.list();
            }else{
              this.$message(res.message);
            }
          })
        }else{
          this.$message({
            message:'请选择举报企业',
            type:'warning'
          })
        }
      },
      chooseType(item){//选择举报类型
        console.log(item,'item');
        this.dataType = item;
      }
    }
  }
</script>

<style scoped>
</style>
