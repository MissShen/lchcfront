<template>

  <!-- 表格 -->
  <div >
    <div class="tableset">
      <el-table
        :data="tableData"
        border
        stripe>
        <el-table-column label="审核员姓名"  prop="userName"  >
          <template slot-scope="scope">
            <span>{{ scope.row.replyUserName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="已分配数量" prop="userCount"  align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.count||0 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
          <div class="operates">
            <span>
              <a class="operation-btn" @click="selectReport(scope.row)">选择</a>
            </span>
          </div>
          </template>
        </el-table-column>

      </el-table>
    </div>

    <div class="space-20">
      <div>选择数据条数{{selectedDataReport.length}}</div>
      <span>分配数量输入总和不能大于未分配数量，否则不能保存</span>
      <!--按钮-->

      <el-button @click="handleGoEdit()" type="success" size="small">新增审核员</el-button>

      <!--按钮-->
    </div>

    <el-dialog
      top="2vh" :visible.sync="showForm" :before-close="handleClose" width="50%" :append-to-body="true" :close-on-click-modal="false">
      <div>
        <span>审核员</span>
        <div>
          <el-table :data="resData.list" ref="mainTable" border stripe :row-key="getRowKeys" @selection-change="handleSelectionChange">
            <el-table-column type="selection" :reserve-selection="true" align="center"></el-table-column>

            <el-table-column label="审核员姓名">
              <template slot-scope="scope">
                <span>{{ scope.row.userName }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
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
          <el-button type="primary" @click="handleTabel()">保存</el-button>
          <el-button @click="handleClose">关闭</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
  import {reportEnterprisesAuditorList} from 'src/axios/auditchanges/toAuditManagement/enterprisesReportTabs'
  import {queryBaseinfoauditList} from 'src/axios/auditchanges/toAuditManagement/productDeclarationTabs'
  import {addAuditor} from 'src/axios/auditchanges/toAuditManagement/productReportTabs'
  export default {
    //初始化函数
    name: "data-reporting",
    props:{
      dataType:{
        type:String,
        required:true
      },
    //   activeName:{
    //     type:String,
    //     required:true
    //   },
      selectedDataReport:{
        type:Array,
      }
    },
    data() {
      return {
        tableData: [],
        resData: this.metaData(),
        showForm:false,
        idListDomain:[],
        distributedAmount:'',//已分配
        undistributedAmount:'',//未分配
        undistributedAmountNum:'',
        auditorSize:'',//审核次数
        totleAmount:'',//全部批次
        numberOfAuditor:'',//第X审
        selectedData:[],
        distributionOfTheAuditorNum:[],
        tableDataIds:{},
        paramsForm:{},
      }
    },
    //初始化函数
    created() {
      console.log(this.dataType,'dataType');
      console.log(this.selectedData,'selectedData');
      //初始化列表
      this.select()
    },
    methods: {
      //条件查询
      select() {
        reportEnterprisesAuditorList(this.dataType).then(res=>{
          console.log(res,'res一审');
          if(res.success){
            this.tableData = res.data.rightBackJson.reportAuditorList;
          }
        });
      },
      // 打开新增审核员弹框
      handleGoEdit () {
        this.showForm = true;
        this.idListDomain = this.tableData.map(item=>item.id);//过滤已经选择人员
        this.paramsForm.idListDomain = this.idListDomain;
        // console.log(this.idListDomain,'this.idListDomain');
        // console.log(this.tableData,'this.tableData');
        this.paramsForm.pageSize = this.resData.pageSize;
        this.paramsForm.pageNum = this.resData.pageNum;

        queryBaseinfoauditList(this.paramsForm).then(res=>{
          console.log(res,'res........................')
          if(res.success){
            // this.tableData =res.data.rightBackJson.auditorDomainList
            this.resData=res.data
          }
        });
      },
      // 关闭弹窗
      handleClose() {
        this.showForm = !this.showForm
      },
      //保存新增审核员
      handleTabel(){
        console.log(this.activeName,'activeName');
        let newChooseData=[];
        for(let i=0;i<this.selectedData.length;i++){
          newChooseData[i]={};
          newChooseData[i].replyUserId=this.selectedData[i].userId;
          newChooseData[i].replyUserName=this.selectedData[i].userName;
        }
        console.log(newChooseData,'newChooseData')
        this.tableData = newChooseData.concat(this.tableData||[]);
        this.showForm = false;
        this.$refs.mainTable.clearSelection();
        console.log(this.selectedData,'selectedData')
      },
      selectReport(val){//选择审核员
        console.log(val,'val')
        let paramsForm ={
          idList:this.selectedDataReport.map(item=>item.id),
          replyUserId:val.id||val.replyUserId,
          replyUserName:val.replyUserName,
        }
        console.log(paramsForm,'paramsForm')
        addAuditor(paramsForm).then(res=>{
          console.log(res,'res一审');
          if(res.success){
            this.$emit('listUpdata');
            this.select();
          }
        });
      },
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
          query: { }
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      getRowKeys(row){
        return row.id
      },
      handleSizeChange(val) {
        this.resData.pageSize = val;
        this.select()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val;
        this.select()
      },
      handleSelectionChange(val) {
        this.selectedData = val;
      },
      handleSave(){//保存审核员
        if(this.undistributedAmount<0){
          this.$message('没有多余分配数量可分配,不可提交')
        }else if(this.tableData.some(item=>item.toBeuserCount<0)){
          this.$message('分配数量为正整数或零')
        }else{
          if(!!this.tableData){
            this.tableData.map(function (item) {
              if(!item.toBeuserCount){
                item.toBeuserCount = 0
              }
            });
            this.paramsForm={
              auditorDomainList:this.tableData,
              auditorSize:this.auditorSize,
              distributedAmount:this.distributedAmount,
              numberOfAuditor:this.numberOfAuditor,
              projectCtrlId:this.projectId,
              totleAmount:this.totleAmount,
              undistributedAmount:this.undistributedAmount,
            };
            console.log(this.paramsForm,'paramsForm');
            saveAuditor(this.paramsForm).then(res=>{
              console.log(res,'res........................')
              if(res.data.success){
                this.$message(res.data.exceptionMessage)
              }else{
                this.$message(res.data.exceptionMessage)
              }
            });
          }
        }
      },
      calculation(count){//分配数量计算
        let sum = 0;
        for(var i=0;i<this.tableData.length;i++){
          sum+=(this.tableData[i].toBeuserCount||0)
        }
        console.log(sum);
        this.undistributedAmount = this.undistributedAmountNum - sum;
        if(this.undistributedAmount<0){
          this.$message('没有多余分配数量可分配')
        }
        if(count<0){
          this.$message('分配数量为正整数或零')
        }
      },
      //回退上级连接页面
      goBack() {
        this.$router.go(-1)
      },
    }
  }
</script>

<style scoped>

</style>
