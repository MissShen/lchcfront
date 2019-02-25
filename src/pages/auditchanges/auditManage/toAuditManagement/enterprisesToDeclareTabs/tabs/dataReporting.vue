<template>

  <!-- 表格 -->
  <div >
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
            <el-form-item class="width-160">
                <el-input v-model="query.enterpriseName" placeholder="企业名称" size="small" @keyup.enter.native="searchEnterFun"></el-input>
           </el-form-item>
          <el-form-item class="width-160">
                <el-input v-model="query.organizeCode" placeholder="组织机构代码" size="small" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
          <el-form-item class="width-160">
                <el-input v-model="query.createCode" placeholder="社会统一信用代码" size="small" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
          <el-form-item>
                  <el-date-picker size="small" v-model="query.beginDate" type="datetime" placeholder="申报开始日期"></el-date-picker>
                  &nbsp;至&nbsp;
                  <el-date-picker size="small" v-model="query.endDate" type="datetime" placeholder="申报结束日期"></el-date-picker>
            </el-form-item>
          <el-form-item>
                <el-button v-on:click="searchEnterFun" type="success" size="small">查询</el-button>
                <el-button v-on:click="remove" type="warning" size="small">重置</el-button>
            </el-form-item>
        </el-form>

      <div class="tableset">

        <el-table :data="resData.list" ref="mainTable" border stripe :row-key="getRowKeys" @selection-change="handleSelectionChange">
          <el-table-column type="selection" :reserve-selection="true" align="center"></el-table-column>
          <el-table-column label="企业名称" show-overflow-tooltip>
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

      <div class="clearfixed">
        <div class="flo-right">
          <el-button v-on:click="selectBatch" type="primary" size="small">选择创建批次</el-button>
          <el-button v-on:click="allBatch" type="warning" size="small">全部创建批次</el-button>
        </div>
      </div>
  </div>

</template>

<script>
  //引入列表数据
  import {enterprisesToDeclareBatchAdd,enterprisesToDeclareInsert,enterprisesToDeclareCount,enterprisesToDeclareInsertAll} from 'src/axios/auditchanges/toAuditManagement/enterprisesToDeclareTabs'
  import {keyBoardEnter} from "src/utils";
  export default {
    //初始化函数
    name: "data-reporting",

    data() {
      return {
        rules: this.metaRules(),
        resData: this.metaData(),
        activeName: 'first',//标签页默认选中第一个
        form: this.metaForm(), // 表单初始化
        query: this.metaQuery(), // 查询初始化
        selectedData:[],
      }
    },
    //初始化函数
    created() {
      //初始化列表
//      this.select()
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
        enterprisesToDeclareBatchAdd(resData,selectQuery).then(res=>{
            console.log(res.data,'res......23414123')
          if(res.success){
            this.resData = res.data;
          }else{
            this.$message('错误')
          }
        })
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
      metaForm() { // 表单数据初始化
        return {
          /*   form: {*/
          id: undefined,
          userCode: undefined,
          userName: undefined,
          password: '',
          pwd2: undefined,
          orgName: "1",
          orgId: "1",
          modifyId: "1",
          mobile: undefined,
          telephone: undefined,
          enableFlag: "1",
          userCaKey: "1",
          createId: "1",
          createName: "1",
          createDate: "1",
          modifyName: "1",
          modifyDate: "1",
          remark: undefined

          /* }*/
        }
      },
      metaRules() {
        if (this.formStatus === 'add') {
          return {
            userCode: [
              {required: true, message: '登录名称不能为空', trigger: 'blur'},
              {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
            ],
            userName: [
              {required: true, message: '用户名称不能为空', trigger: 'blur'},
              {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
            ],
            password: [
              {required: true, message: '用户密码不能为空', trigger: 'blur'},
              {min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur'}
            ],
            pwd2: [
              {required: true, message: '确认密码不能为空', trigger: 'blur'},
              {min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur'}
            ]
          }
        } else {
          return {
            code: [
              {required: true, message: '登录名称不能为空', trigger: 'blur'},
              {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
            ],
            name: [
              {required: true, message: '用户名称不能为空', trigger: 'blur'},
              {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
            ]
          }
        }
      },
      metaQuery() { // 表单查询数据初始化
        return {
          query: {
            "beginDate": '',
            "createCode": "",
            "createDate": '',
            "endDate": '',
            "enterpriseName": "",
            "organizeCode": "",
          }
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
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
      //=============================记住多选框===========================================
      getRowKeys(row){
        return row.id
      },
      //多选框改变状态
      handleSelectionChange(val) {
        this.selectedData = val;
      },
      //==========================================================================
      selectCreatedBatch(selectedDataId){//选择创建批次
        // console.log(selectedDataId,'selectedDataId');
        let idForm = {
          idList:selectedDataId
        };
        enterprisesToDeclareInsert(idForm).then(res=>{
          // console.log(res,'res......');
          if(res.success){
            this.$message({
              message:'成功',
              type:'success'
            });
            this.$refs.mainTable.clearSelection();
            this.$emit('listUpdata');
          }else{
            this.$message({
              message:'错误',
              type:'error'
            })
          }
        })
      },
      selectBatch(){//选择创建批次
        let selectedDataId =this.selectedData.map(item=>item.id);
        if(selectedDataId.length>100){
          this.$confirm('超出默认选中100条,是否继续','提示',{
            confirmButtonText:'确定',
            cancelButtonText:'取消',
            type:'warning'
          }).then(()=>{
            this.selectCreatedBatch(selectedDataId)
          })
        }else if(selectedDataId.length==0){
          this.$alert('请至少选择一项');
        }else{
          this.selectCreatedBatch(selectedDataId)
        }
      },
      allBatch(){//全选创建批次
        enterprisesToDeclareCount().then(res=>{
          console.log(res,'res......')
          if(res.success){
            if(res.data.rightBackJson.count>100){
              this.$confirm('超出默认选中100条,是否继续','提示',{
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
              }).then(()=>{
                this.allCreatedBatch()
              })
            }else if(res.data.rightBackJson.count==0){
              this.$alert('当前无数据可创建批次')
            }else{
              this.allCreatedBatch()
            }
          }else{
            this.$message('错误')
          }
        })
      },
      allCreatedBatch(){//全选创建批次
        enterprisesToDeclareInsertAll().then(res=>{
          // console.log(res,'res......')
          if(res.success){
            this.$message({
              message:'保存成功',
              type:'success'
            });
            this.$emit('listUpdata');
          }else{
            this.$message({
              message:'错误',
              type:'error'
            })
          }
        })
      },
    }
  }
</script>

<style scoped>
</style>
