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
            <span>{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="已分配数量" prop="userCount"  align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.userCount||0 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="分配数量"  align="center">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.toBeuserCount" controls-position="right" @change="calculation(scope.row.toBeuserCount)"></el-input-number>
          </template>
        </el-table-column>

      </el-table>
    </div>
    <div>
      <span>已分配总数量： {{distributedAmount||0}} 未分配数量：{{undistributedAmount}} 分配数量输入总和不能大于未分配数量，否则不能保存</span>
      <!--按钮-->

      <el-button @click="handleGoEdit()"  size="small">新增审核员</el-button>

      <!--按钮-->
    </div>
    <div class="mar-center"><el-button type="primary" size="small"  @click="handleSave">保存</el-button></div>
    <el-dialog
      :close-on-click-modal="false"
      top="2vh" :visible.sync="showForm" :before-close="handleClose" width="50%">
      <div style="width: 610px">
        <span>第{{numberOfAuditor}}审</span>
        <div>
          <el-table :data="resData.list" ref="mainTable" border stripe :row-key="getRowKeys" @selection-change="handleSelectionChange">
            <el-table-column type="selection" :reserve-selection="true"></el-table-column>

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
        <!--<el-button type="danger" v-if="formStatus==='add'" @click="resetForm('form')">重置</el-button>-->
          <el-button @click="handleClose">关闭</el-button>
        </span>
    </el-dialog>
  </div>

</template>

<script>
  import {priceToDeclareAuditorList,queryPriceauditList} from 'src/axios/auditchanges/toAuditManagement/priceToDeclareTabs'
  import {saveAuditor} from 'src/axios/auditchanges/toAuditManagement/productDeclarationTabs'
  export default {
    //初始化函数
    name: "distribution-of-the-auditor-fiv",
    props:{
      projectId:{
        type:String,
        required:true
      },
      activeName:{
        type:String,
        required:true
      },
      allData:{
        type:Array,
      }
      // userIds:{
      //   type:Array,
      //   required:true
      // }
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
      console.log(this.allData,'allIds')
      console.log(this.projectId,'projectId')
      console.log(this.activeName,'activeName')
      //初始化列表
      this.select()
    },
    methods: {
      //条件查询
      select() {
        priceToDeclareAuditorList(this.projectId,this.activeName).then(res=>{
          console.log(res,'res一审')
          if(res.success){
            if(this.allData.length>0&&!!this.allData[this.activeName-1]){
              this.tableData = this.allData[this.activeName-1]
            }else{
              this.tableData = res.data.rightBackJson.auditorDomainList;
            }
          }
          this.distributedAmount = res.data.rightBackJson.distributedAmount;
          this.undistributedAmount = res.data.rightBackJson.undistributedAmount;
          this.numberOfAuditor = res.data.rightBackJson.numberOfAuditor;
          this.undistributedAmountNum = this.undistributedAmount;
          this.auditorSize=res.data.rightBackJson.auditorSize;
          this.totleAmount = res.data.rightBackJson.totleAmount;

          //页面刷新时就储存数据
          this.distributionOfTheAuditorNum.tableData=this.tableData;
          this.distributionOfTheAuditorNum.activeName = this.activeName;
          this.$emit('userData',this.distributionOfTheAuditorNum);
        });
      },
      // 打开弹框
      handleGoEdit () {
        this.showForm = true;
        if(this.allData.length>0){
          this.idListDomain = (this.allData[0]||[]).map(item=>item.userId).concat((this.allData[1]||[]).map(item=>item.userId)).concat((this.allData[2]||[]).map(item=>item.userId)).concat((this.allData[3]||[]).map(item=>item.userId)).concat((this.allData[4]||[]).map(item=>item.userId)).concat(this.allData[5]||[]);
        }else{
          this.idListDomain = this.tableData.map(item=>item.userId)
        }
        console.log(this.idListDomain,'this.idListDomain');
        this.paramsForm.pageSize = this.resData.pageSize;
        this.paramsForm.pageNum = this.resData.pageNum;
        this.paramsForm.idListDomain = this.idListDomain;
        queryPriceauditList(this.paramsForm).then(res=>{
          console.log(res,'res........................')
          if(res.success){
            // this.tableData =res.data.rightBackJson.auditorDomainList
            this.resData=res.data
          }
        });
      },
      // 关闭弹窗
      handleClose(done) {
        // this.$refs['form'].resetFields();
        this.toggleForm();
      },
      toggleForm () {
        this.showForm = !this.showForm
      },
      //保存新增审核员
      handleTabel(){
        console.log(this.activeName,'activeName');
        this.tableData = this.selectedData.concat(this.tableData||[]);
        this.distributionOfTheAuditorNum.tableData=this.tableData;
        this.distributionOfTheAuditorNum.activeName = this.activeName;
        // this.tableDataIds = this.tableData.map(item=>item.userId);
        this.$emit('userData',this.distributionOfTheAuditorNum);
        this.showForm = false;
        this.$refs.mainTable.clearSelection();
        console.log(this.selectedData,'selectedData')
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
          prePage: undefined,
          nextPage: undefined,
          isFirstPage: true,
          isLastPage: undefined,
          hasPreviousPage: undefined,
          hasNextPage: undefined,
          navigatePages: undefined,
          navigatepageNums: undefined,
          navigateFirstPage: undefined,
          navigateLastPage: undefined,
          firstPage: undefined,
          lastPage: undefined,
          list: []
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      getRowKeys(row){
        return row.id
      },
      handleSizeChange(val) {
        this.resData.pageSize = val
        this.select()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val
        this.select()
      },
      handleClick(tab, event) {
        console.log(tab, event);
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
    }
  }
</script>

<style scoped>

</style>
