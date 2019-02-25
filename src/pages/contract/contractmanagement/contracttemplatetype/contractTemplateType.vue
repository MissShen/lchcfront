<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" size="small" :inline="true" class="table-form">
            <el-form-item>
              <el-input size="small"
                        maxlength="200" v-model="query.name" placeholder="模板类型名称" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item>
             <el-button size="small" type="success" @click="searchEnterFun">查询</el-button>
             <el-button size="small" type="warning" @click="resetForm()">重置</el-button>
            </el-form-item>
        </el-form>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe
          @sort-change="sortChange">
          <el-table-column label="模板类型编号" prop="id" sortable="custom" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="模板类型名称" prop="name" sortable="custom" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="签约方式" prop="type" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.typeName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" width="160" prop="create_Date" sortable="custom">
            <!--<template slot-scope="scope">
              <span>{{ scope.row.createDate }}</span>
            </template>-->

            <template slot-scope="scope">
              <el-tooltip :enterable="false" class="item" effect="dark" placement="top-start">
                <div slot="content">{{ scope.row.createDate }}</div>
                <span v-if="scope.row.createDate!=null && scope.row.createDate!=''">{{ moment(scope.row.createDate).format("YYYY-MM-DD") }}</span>
                <span v-else></span>
              </el-tooltip>

            </template>

          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <div class="operates">
                <a href="javaScript:;" class="green" type="text" @click="addOrUpdateTemplateType('update',scope.row)">修改</a>
                <a href="javaScript:;" class="green" type="text" @click="deleteTemplateType(scope.row.id,)">删除</a>
              </div>
            </template>
          </el-table-column>
        </el-table>
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
      </div>
      <div class="foot-btn">
        <div class="foot-left">
          <el-button size="small" type="primary" @click="addOrUpdateTemplateType('add','')">添加模板类型</el-button>
        </div>
      </div>
      <!--  ====================================== 弹窗 ====================================== -->
      <!--模板修改/添加对话框-->
      <el-dialog top="2vh" :title="myTitle" width="500px" :visible.sync="showForm" :before-close="closeForm">
        <div style="width:300px">
          <!--<el-form ref="insertForm" :model="insertForm" label-width="300px">-->
          <el-form ref="form" :rules="rules" :model="form"  label-width="120px">
            <el-form-item label="模板类型名称：" prop="name">
              <el-input v-model="form.name" size="small" class="width-240"></el-input>
            </el-form-item>
            <el-form-item label="签约方式：" prop="type">
              <el-select v-model="form.type" size="small" class="width-240">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer">
          <el-button size="small" type="primary" @click="insertOrUpdateTemplateType('form')">确定</el-button>
          <el-button size="small" @click="closeForm">关闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>

  // 引入用户相关请求
  import {selectTemplateTypeList, templateTypeAdd, templateTypeUpdate, templateTypeDelete} from 'src/axios/contract/httemplate/contraTemplateType'
  import moment from "moment";
  import { keyBoardEnter } from "src/utils"

  export default {
    data () {
      return {
        currentOrder:undefined, //分页的时候缓存
        rules: this.metaRules(),
        resData: this.metaData(),
        form: this.metaForm(), // 表单初始化
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        formStatus: 'add', // 表单状态 add
        // insertForm : {id:"",name:"",type:""},
        roleDialogLoading: false, // 角色加载状态   已加载
        roleTree: [], // 角色分配树节点
        myTitle:undefined,
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        } ,
        options:[{
          value:'1',
          label:'单方签'
        },{
          value:'2',
          label:'双方签'
        },{
          value:'3',
          label:'三方签'
        },{
          value:'4',
          label:'四方签'
        }]
      }
    },

    created () {
      this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      moment,
      metaData () {
        return {
          orderBy: undefined,
          pageNum: 1,
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
          /*   form: {*/
          id: undefined,
          name:undefined,
          type:undefined

          /* }*/
        }
      },
      metaRules () {
          return {
            name: [
              {required: true, message: '请填写模板名称', trigger: 'blur'},
              {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
            ],
            type: [
              {required: true, message: '请选择签约方式', trigger: 'change'},
              {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'change'}
            ]
          }
      },
      metaQuery () { // 表单查询数据初始化
        return {
          query: {
            name: undefined
          }
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      toggleForm () {
        this.showForm = !this.showForm
      },
      closeForm () {
        this.$refs['form'].resetFields()
        this.toggleForm()
      },
      //  获取用户分页列表
      list () {
        this.resData.orderBy = this.currentOrder;
        selectTemplateTypeList(this.resData, this.query).then(res => {
          // console.log(res);
          this.resData = res.data
          if(this.resData.pageNum === 0){
            this.resData.pageNum = 1;
          }
        })
      },
      resetForm () {
        this.query = this.metaQuery();
        this.list();
      },
      // 打开模板编辑或者添加页面
      // 如果type是add那么就是增加操作 update是修改操作
  addOrUpdateTemplateType(type,row){
    this.toggleForm();
    if(type == 'add'){
          //新增之前把上一次的状态清空
          this.myTitle = "添加模板类型";
          this.form.name = "";
          this.form.type = "";
          //更改状态为添加
          this.formStatus = "add";
        }else{
          this.myTitle = "修改模板类型";
          //修改把名字和签约方式回显 记录弹出框的id
          this.form = {id:row.id,name:row.name,type:row.type};
          //更改状态为修改
          this.formStatus = "update";
        }
      },
      //--------------修改/增加总保存
      insertOrUpdateTemplateType () {
        this.$refs['form'].validate(valid => {
          if (valid) {
            if (this.formStatus=='add') {
              templateTypeAdd(this.form).then(res => {
                this.$message({
                  type: res.success == true ? 'success' : 'error',
                  message: res.success == true ? res.data : res.message
                });
                if(res.success){
                  this.list();
                  this.toggleForm();
                }
              })
            }
            if (this.formStatus=='update') {
              templateTypeUpdate(this.form).then(res => {
                this.$message({
                  type: res.success == true ? 'success' : 'error',
                  message: res.success == true ? res.data : res.message
                });
                if(res.success){
                  this.list();
                  this.toggleForm();
                }
              })
            }
          } else {
            return false
          }
        })
      },
      // 删除模板类型处理
      deleteTemplateType(id) {
        this.$confirm('此操作将删除此模板类型,是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          templateTypeDelete(id).then(res => {
            console.log(res);
            this.$message({
              type: res.success == true ? 'success' : 'error',
              message: res.success == true ? res.data : res.message,
              onClose: () => {
                this.list()
              }
            })
          })
        }).catch(()=>{});
      },
      // ***********以下两个是分页相关*************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      },
      sortChange(value){
        console.log("value: ", value);
        let sortType=" desc"
        if(!!value.order){
          if(value.order.startsWith("asc")){
            sortType=" asc";
          }
          this.currentOrder=value.prop + sortType;
        } else {
          this.currentOrder=undefined;
        }
        this.list();
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e , ()=>{
          this.list();
        })
      }
    }
  }
</script>

