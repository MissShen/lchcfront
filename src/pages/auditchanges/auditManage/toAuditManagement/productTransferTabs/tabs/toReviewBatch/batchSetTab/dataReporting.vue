
<template>

  <!-- 表格 -->
  <div class="tablebox">
    <!--<el-tabs v-model="activeName" @tab-click="handleClick">-->

      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
          <el-form-item class="width-160">
            <el-input v-model="query.requestCode" placeholder="申请单号" size="small" @keyup.enter.native="searchEnterFun"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="query.upTypeId" placeholder="更新类型" size="small">
              <el-option
                v-for="item in projectList"
                :key="item.id"
                :label="item.typeName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="width-160">
            <el-input v-model="query.requestOrg " placeholder="企业名称" size="small" @keyup.enter.native="searchEnterFun"></el-input>

          </el-form-item>
          <el-form-item class="width-160">
            <el-input v-model="query.transferOrg " placeholder="转出企业名称" size="small" @keyup.enter.native="searchEnterFun"></el-input>

          </el-form-item>
          <el-form-item>
            <el-date-picker size="small" v-model="query.beginDate" type="datetime" placeholder="申报开始日期"></el-date-picker>
            &nbsp;至&nbsp;
            <el-date-picker size="small" v-model="query.endDate" type="datetime" placeholder="申报结束日期"></el-date-picker>

          </el-form-item>
          <el-form-item>

                <el-button v-on:click="searchEnterFun" type="success" >查询</el-button>
                <el-button v-on:click="remove" type="warning" >重置</el-button>

            </el-form-item>
        </el-form>

      <div class="tableset">
        <el-table :data="resData.list" ref="mainTable" border stripe :row-key="getRowKeys" @selection-change="handleSelectionChange">
          <el-table-column type="selection" :reserve-selection="true" align="center"></el-table-column>
          <!--<el-table-column label="序号" type="index" width="50"></el-table-column>-->


          <el-table-column label="申请单号">
            <template slot-scope="scope">
              <span>{{ scope.row.requestCode }}</span>
            </template>
          </el-table-column>
          <el-table-column label="更新类型名称">
            <template slot-scope="scope">
              <span>{{ scope.row.upTypeName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="申请企业名称">
            <template slot-scope="scope">
              <span>{{ scope.row.requestOrg  }}</span>

            </template>
          </el-table-column>
          <el-table-column label="转出企业名称">
            <template slot-scope="scope">
              <span>{{ scope.row.transferOrg }}</span>
            </template>
          </el-table-column>
          <el-table-column label="申报日期" width="160">
            <template slot-scope="scope">
              <span>{{ scope.row.requestTime }}</span>
            </template>
          </el-table-column>

        </el-table>
      </div>

    <!--按钮-->
      <div class="foot-btn">
        <div class="foot-left">
          <el-button v-on:click="addPriceChange" type="primary" size="small">移入本批次</el-button>
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
  //引入列表数据
  import {productChangeBatchAdd,addPriceChangeBatch} from 'src/axios/auditchanges/toAuditManagement/productTransferTabs'
  // import {keyBoardEnter} from "src/utils";
  export default {
    //初始化函数
    name: "data-reporting",
    props: {
      routeId:{
        type:String,
        required:true
      }
    },
    data() {
      return {
        rules: this.metaRules(),
        resData: this.metaData(),
        activeName: 'first',//标签页默认选中第一个
        form: this.metaForm(), // 表单初始化
        query: this.metaQuery(), // 查询初始化
        selectedData:[],
        projectList:[
          {'id':'','typeName':'全部'},
          {'id':'DATA00000000000000326290','typeName':'国内生产企业转产并购'},
          {'id':'DATA00000000000000326291','typeName':'进口药品转国产'},
          {'id':'DATA00000000000000326292','typeName':'进口产品转国内分装'},
          {'id':'DATA00000000000000325048','typeName':'进口产品代理商更新'}
        ]
      }
    },
    //初始化函数
    created() {
      //初始化列表
      this.list()
    },
    methods: {
      //条件查询
      list() {
        var selectQuery = this.query;
        var resData = this.resData;
        if (resData.pageSize == undefined || resData.pageSize == "") {
          resData.pageSize = 10;
        }
        if (resData.pageNum == undefined || resData.pageNum == "") {
          resData.pageNum = 1;
        }
        productChangeBatchAdd(this.resData,this.query).then(res=>{
          // console.log(res.data,'res......23414123')
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
          productName:undefined,
          dosageForm:undefined,
          spec:undefined,
          beginDate:undefined,
          endDate:undefined
        };
        this.list();
      },
// //查询按钮
//       searchEnterFun(e){
//         // this.$store.state.pageSeach.pageNum = 1;
//         this.resData.pageNum=1;
//         keyBoardEnter(e, () => {
//           this.select();
//         })
//       },

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
          upTypeId:undefined,
          requestCode:undefined,
          requestOrg:undefined,
          transferOrg:undefined,
          beginDate:undefined,
          endDate:undefined
        }
      },
      //=============================记住多选框===========================================
      getRowKeys(row){
        return row.id
      },
      //多选框改变状态
      handleSelectionChange(val) {
        this.selectedData = val;
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      addPriceChange(){//移入本批次
        let paramsForm = {
          projectCtrlId:this.routeId,
          projectForeignIdList:this.selectedData.map(item=>item.id)
        }
        addPriceChangeBatch(paramsForm).then((res)=>{
          // console.log(res,'res...adsf')
          if(res.data.success){
            this.$message(res.data.exceptionMessage);
            this.list();
            this.$refs.mainTable.clearSelection();
          }else{
            this.$message(res.data.exceptionMessage)
          }
        })
      },
      // ************************
      handleSizeChange(val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val
        this.list()
      }
    }
  }
</script>

<style scoped>

</style>
