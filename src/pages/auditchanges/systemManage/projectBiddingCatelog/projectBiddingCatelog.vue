<template>
  <!-- 表格 -->
  <div class="tablebox">

    <!-- 表格查询表单 -->
      <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
            <el-form-item>
              <el-select v-model="query.catProjectId" placeholder="请选择所属项目" size="small">
                <el-option
                  v-for="item in projectList"
                  :key="item.id"
                  :label="item.projectName"
                  :value="item.id">
                </el-option>
              </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="query.ydProjectBiddingCategoryId" placeholder="请选择标的物类别" size="small">
              <el-option
                v-for="item in categoryList"
                :key="item.id"
                :label="item.categoryName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="query.commonName" placeholder="药品通用名" @keyup.enter.native="searchEnterFun" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="query.dosageFormGroupName" placeholder="请选择合并剂型" size="small">
              <el-option
                v-for="item in dosageList"
                :key="item.id"
                :label="item.groupName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="query.specGroup" placeholder="合并规格" @keyup.enter.native="searchEnterFun" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
            <el-button type="warning" @click="restQuery()" size="small">重置</el-button>
          </el-form-item>
      </el-form>

    <div class="foot-btn">
      <div class="foot-left">
       <el-button type="success"  size="small" @click="handleGoAdd('0')">
         新增
       </el-button>
      </div>
    </div>

    <!-- 表格列表 -->
    <div class="tableset">
      <el-table
        :data="resData.list"
        border
        stripe
        :row-key="getRowkeys"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="50" align="center" :reserve-selection="true"></el-table-column>
        <el-table-column label="所属项目" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.catProjectId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="目录编码" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.finalCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="标的物类别" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.ydProjectBiddingCategoryId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="药品通用名" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.commonName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="合并剂型">
          <template slot-scope="scope">
            <el-popover placement="top-start" popper-class="dosage-pop" trigger="hover" :content="scope.row.dosageFormGroupName+' | '+scope.row.truedosageFormGroupName">
              <a class="hiddenfont blue" slot="reference">{{ scope.row.dosageFormGroupName }}</a>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="合并规格" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.specGroup }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <div class="operates">
              <span><a class="operation-btn" @click="handleGoAdd(scope.row.id)">修改</a></span>
              <span><a class="operation-btn" @click="handleDelete(scope.row.id)">删除</a></span>
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
    <add-or-up ref="addOrUp" @refreshData="list"></add-or-up>
  </div>
</template>
<script>
  import {queryList,projectList,categoryList,dosageList,remove} from 'src/axios/auditchanges/systemManage/projectBiddingCatelog'
  import {keyBoardEnter} from "src/utils";
  import addOrUp from './addOrUp';

  export default {
    components:{
      addOrUp
    },
    data () {
      return {
        resData: this.metaData(),
        // form: this.metaForm(), // 表单初始化
        query: this.metaQuery(), // 查询初始化
        // showForm: false, // 表单可见性初始化
        // showQuery: false, // 表单查询初始化
        projectList:'',//所属项目
        dosageList:'',//合并剂型
        categoryList:'',//标的物类别
        // defaultProps: {
        //   children: 'children',
        //   label: 'name',
        //   id: 'id'
        // }
      }
    },
    created () {
      this.resData.pageSize = 10;
      this.list();
      this.getProject();//获取项目数据
      this.getCategory();//获取标的物类别数据
      this.getDosage()//获取合并剂型数据
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {
          resData: { // 前后台交互数据封装格式
            pageNum: 0,
            pageSize: 10,
            size: 10,
            startRow: 0,
            endRow: 0,
            total: 0,
            pages: 0,
            // prePage: 0,
            // nextPage: 0,
            // isFirstPage: false,
            // isLastPage: true,
            // hasPreviousPage: false,
            // hasNextPage: false,
            // navigatePages: 8,
            // navigatepageNums: [],
            // navigateFirstPage: 0,
            // navigateLastPage: 0,
            // firstPage: 0,
            // lastPage: 0,
            list: []
          }
        }
      },
      // metaForm () { // 表单数据初始化
      //   return {
      //     /*   form: {*/
      //     id: undefined,
      //     userCode:undefined,
      //     userName:undefined,
      //     password:'',
      //     pwd2: undefined,
      //     orgName:"1",
      //     orgId:"1",
      //     modifyId:"1",
      //     mobile:undefined,
      //     telephone:undefined,
      //     enableFlag:"1",
      //     userCaKey:"1",
      //     createId:"1",
      //     createName:"1",
      //     createDate:"1",
      //     modifyName:"1",
      //     modifyDate:"1",
      //     remark:undefined
      //
      //     /* }*/
      //   }
      // },

      metaQuery () { // 表单查询数据初始化
        return {
          query: {
            catProjectId: undefined,
            ydProjectBiddingCategoryId: undefined,
            commonName: undefined,
            dosageFormGroupName: undefined,
            specGroup: undefined
          }
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      // toggleQuery () {
      //   this.showQuery = !this.showQuery
      // },
      // toggleForm () {
      //   this.showForm = !this.showForm
      // },
      // closeForm () {
      //   this.$refs['form'].resetFields();
      //   this.toggleForm()
      // },
      // searchProject(){
      //   return {
      //     projectList : {
      //       id:undefined,
      //       projectName:undefined
      //     }
      //   }
      // },
      getRowkeys(row){
        return row.id;
      },
      //查询并绑定回车事件
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      //  获取用户分页列表
      list () {
        queryList(this.resData,this.query).then(res => {
          console.log("列表数据");
          this.resData = res.data;
          console.log(this.resData,'列表')
        })
      },
      // 重置用户表单
      // resetForm () {
      //   /*  this.$refs['form'].resetFields()*/
      //   this.form = this.metaForm()
      // },
      // handleQuery(){
      //   console.log("handleQuery")
      //   this.list()
      // },

      //重置
      restQuery(){
        this.query=this.metaQuery();
        this.list();
      },
      // ************************
      handleSizeChange (val) {
        this.resData.pageSize = val;
        this.list()
      },
      //修改或新增
      handleGoAdd(id) {
        this.$nextTick(() => {
          this.$refs.addOrUp.metaList(id)
        })
      },
      //删除
      handleDelete(id) {
        this.$confirm(`确定删除吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          remove(id).then(res => {
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.list()
              }
            })
          })
        })
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val;
        this.list()
      },
      //项目数据
      getProject(){
        projectList().then(res => {
        console.log("项目数据");
        console.log(res.data);
        this.projectList = res.data
        })
      },
      handleSelectionChange(val){
        //val 所选对象
      },
      //标的物类别数据
      getCategory(){
          categoryList().then(res => {
          console.log("标的物类别数据");
          console.log(res.data);
          this.categoryList = res.data
        })
      },
      //合并剂型数据
      getDosage(){
        dosageList().then(res => {
          console.log("合并剂型数据");
          console.log(res.data);
          this.dosageList = res.data
        })
      }
    }
  }
</script>
