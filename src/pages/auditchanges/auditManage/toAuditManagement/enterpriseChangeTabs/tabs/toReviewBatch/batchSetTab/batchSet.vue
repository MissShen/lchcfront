<template>

  <!-- 表格 -->
  <div class="tablebox">
    <!--<el-tabs v-model="activeName" @tab-click="handleClick">-->

      <!-- 表格查询表单 -->
      <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
          <el-form-item>

              <el-input v-model="query.enterpriseName" placeholder="申请企业名称" size="small" @keyup.enter.native="searchEnterFun"></el-input>

        </el-form-item>
        <el-form-item>

              <el-input v-model="query.organizeCode" placeholder="组织机构代码" size="small" @keyup.enter.native="searchEnterFun"></el-input>

        </el-form-item>
        <el-form-item>

              <el-input v-model="query.createCode" placeholder="社会统一信用代码" size="small" @keyup.enter.native="searchEnterFun"></el-input>

        </el-form-item>
        <el-form-item>

                <el-date-picker size="small" v-model="query.beginDate" type="datetime" placeholder="申报开始日期"></el-date-picker>

                <el-date-picker size="small" v-model="query.endDate" type="datetime" placeholder="申报结束日期"></el-date-picker>

         </el-form-item>
        <el-form-item>

              <el-button v-on:click="searchEnterFun" type="success" >查询</el-button>
              <el-button v-on:click="remove" type="warning" >重置</el-button>

         </el-form-item>
      </el-form>


    <div class="tableset">
      <el-table :data="resData.list" ref="mainTable" border tripe :row-key="getRowKeys" @selection-change="handleSelectionChange">
        <el-table-column type="selection" :reserve-selection="true" align="center">
        </el-table-column>
        <!--<el-table-column label="序号" type="index" width="50"></el-table-column>-->

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
        <el-table-column label="申报时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createDate }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="checkCount>0" label="一审">
          <template slot-scope="scope">
            <span>{{ scope.row.auditName1 }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="checkCount>1" label="二审">
          <template slot-scope="scope">
            <span>{{ scope.row.auditName2 }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="checkCount>2" label="三审">
          <template slot-scope="scope">
            <span>{{ scope.row.auditName3 }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="checkCount>3" label="四审">
          <template slot-scope="scope">
            <span>{{ scope.row.auditName4 }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="checkCount>4" label="五审">
          <template slot-scope="scope">
            <span>{{ scope.row.auditName5 }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--按钮-->
    <div class="foot-btn">
      <div class="foot-left">
        <el-button v-if="processType == '0'" v-on:click="removeThisBatch" type="primary" size="small">移除本批次</el-button>
        <el-button v-on:click="reomveAuditMan('auditId1')" type="danger" v-if="checkCount>0" size="small">删除一审人员</el-button>
        <el-button v-on:click="reomveAuditMan('auditId2')" type="danger" v-if="checkCount>1" size="small">删除二审人员</el-button>
        <el-button v-on:click="reomveAuditMan('auditId3')" type="danger" v-if="checkCount>2" size="small">删除三审人员</el-button>
        <el-button v-on:click="reomveAuditMan('auditId4')" type="danger" v-if="checkCount>3" size="small">删除四审人员</el-button>
        <el-button v-on:click="reomveAuditMan('auditId5')" type="danger" v-if="checkCount>4" size="small">删除五审人员</el-button>
        <el-button v-on:click="goBack" size="small">返回</el-button>
      </div>
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

    <!--</el-tabs>-->
  </div>

</template>

<script>
  // import {enterprisesToDeclareList} from 'src/axios/auditchanges/toAuditManagement/enterpriseChangeTabs'
  import {removeBatch,reomveAudit} from 'src/axios/auditchanges/toAuditManagement/productDeclarationTabs'
  import {enterpriseChangeBatchList} from 'src/axios/auditchanges/toAuditManagement/enterpriseChangeTabs'
  import {keyBoardEnter} from "src/utils";
  export default {
    //初始化函数
    name: "batch-set",
    props: {
      routeId:{
        type:String,
        required:true
      },
      processType:''
    },
    data() {
      return {
        resData: this.metaData(),
        activeName: 'first',//标签页默认选中第一个
        query: this.metaQuery(), // 查询初始化
        selectedData:'',
        paramsForm:{},
        projectUserIdMap:{},
        checkCount:'',//最高审核数
      }
    },
    //初始化函数
    created() {
      //初始化列表
      this.select()
    },
    methods: {
      //条件查询
      select() {
        var selectQuery = this.query;
        var resData = this.resData;
        if (resData.pageSize == undefined || resData.pageSize == "") {
          resData.pageSize = 10;
        }
        if (resData.pageNum == undefined || resData.pageNum == "") {
          resData.pageNum = 1;
        }
        this.paramsForm = {
          pageNum : resData.pageNum,
          pageSize : resData.pageSize,
          projectCtrlId:this.routeId,
          enterpriseName:this.query.enterpriseName,
          createCode:this.query.createCode,
          organizeCode:this.query.organizeCode,
          beginDate:this.query.beginDate,
          endDate:this.query.endDate,
        };
        enterpriseChangeBatchList(this.paramsForm).then(res => {
          if(res.data.success){
            this.resData = res.data.rightBackJson.pageInfo;
            this.checkCount = res.data.rightBackJson.checkCount;
            console.log(this.resData)
          }else{
            this.$message('错误')
          }
        });
      },
      //清空查询表单
      remove() {
        //清空
        this.query = {
          enterpriseName:undefined,
          organizeCode:undefined,
          createCode:undefined,
          beginDate:undefined,
          endDate:undefined
        };
        this.select();
      },
      //查询按钮
      searchEnterFun(e){
        // this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          this.select();
        })
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
      metaQuery() { // 表单查询数据初始化
        return {
          query: {
            Id: undefined,
            UpTypeId: undefined
          }
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      removeThisBatch(){//移除本批次
        let paramsForm = {
          projectCtrlId:this.routeId,
          projectForeignIdList:this.selectedData.map(item=>item.id)
        };
        removeBatch(paramsForm).then((res)=>{
          // console.log(res,'res,.')
          if(res.data.success){
            this.$message(res.data.exceptionMessage);
            this.select();
            this.$refs.mainTable.clearSelection();
          }else{
            this.$message(res.data.exceptionMessage)
          }
        });
      },
      reomveAuditMan(count){//删除审核员
        console.log(this.selectedData,'this.selectedData');
        for(let i=0;i<this.selectedData.length;i++){
          if(!!this.selectedData[i][count]){
            this.projectUserIdMap[this.selectedData[i].id] = this.selectedData[i][count]
          }else{
            this.$message('请选择要删除的项')
          }
        };
        if(Object.keys(this.projectUserIdMap).length>0){
          let paramsForm = {
            projectCtrlId:this.routeId,
            projectForeignIdAndcheckUserIdMap:this.projectUserIdMap
          };
          reomveAudit(paramsForm).then((res)=>{
            // console.log(res)
            if(res.data.success){
              this.$message(res.data.exceptionMessage);
              this.select();
              this.$refs.mainTable.clearSelection();
            }else{
              this.$message(res.data.exceptionMessage)
            }
          })
        }else{
          this.$message({
            message:'请选择要删除的项',
            type:'error'
          })
        }
      },
      //=============================记住多选框===========================================
      getRowKeys(row){
        return row.id
      },
      //回退上级连接页面
      goBack() {
        this.$router.go(-1)
      },
      //多选框改变状态
      handleSelectionChange(val) {
        this.selectedData = val;
      },
      // ************************
      handleSizeChange(val) {
        this.resData.pageSize = val
        this.select()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val
        this.select()
      }
    }
  }
</script>

<style scoped>

</style>
