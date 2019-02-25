<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <el-form ref="query" :model="query" size="small" :inline="true" class="table-form">
        <el-form-item>
          <el-input placeholder="模板名称"
                    maxlength="200" size="small" v-model="query.title" @keyup.enter.native="searchEnterFun"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select size="small" v-model="query.type" @change="queryTemplateTypeList('query','')" placeholder="签约方式">
            <el-option
              v-for="item in templateOptions"
              :key="item.type"
              :label="item.typeName"
              :value="item.type">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select size="small" v-model="query.typeId" placeholder="模板类型">
            <el-option
              v-for="item in templateTypeOne"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="success" size="small" @click="searchEnterFun">查询</el-button>
          <el-button type="warning" size="small" @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>


      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe
          @sort-change="sortChange">
          <el-table-column label="模板名称" prop="title" sortable="custom" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column label="签约方式" prop="type" sortable="custom" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.typeName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="模板类型" prop="name" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建日期" prop="create_Date" sortable="custom">
            <template slot-scope="scope">
              <el-tooltip :enterable="false" class="item" effect="dark" placement="top-start">
                <div slot="content">{{ scope.row.createDate }}</div>
                <span v-if="scope.row.createDate!=null && scope.row.createDate!=''">{{ moment(scope.row.createDate).format("YYYY-MM-DD") }}</span>
                <span v-else></span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="可用状态" prop="state" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.state == 0 ? '启用' : '禁用'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div class="operates">
                <a href="javaScript:;" class="green" type="text" size="small" @click="addOrUpdateTemplate('update',scope.row.id)">修改</a>
                <a href="javaScript:;" class="green" type="text" size="small" @click="openSelectedPage(scope.row.id)">详情</a>
                <a href="javaScript:;" class="green" type="text" size="small" @click="handleDelete(scope.row.id)">删除</a>
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
      <div class="foot-btn">
        <div class="foot-left">
          <el-button type="primary" size="small" @click="addOrUpdateTemplate('add','')">添加模板</el-button>
        </div>
      </div>
      <!--  ====================================== 弹窗 ====================================== -->
      <el-dialog title="模板详情" top="2vh" :visible.sync="showSelectedForm" width="50%">
        <span v-html="this.templateContent"></span>
        <span slot="footer">
          <el-button @click="showSelectedForm = false">关闭</el-button>
        </span>
      </el-dialog>


      <!--模板修改/添加对话框-->
      <el-dialog top="2vh" title="编辑模板" :visible.sync="showEditForm" width="50%" :before-close="closeForm">
        <div>
          <el-form ref="form" :rules="rules" :model="form"  label-width="100px">
            <el-form-item label="模板名称：" prop="title">
              <el-input v-model="form.title" size="small"></el-input>
            </el-form-item>
            <el-form-item label="签约方式：" prop="type">
              <el-select v-model="form.type" size="small" class="w100" @change="queryTemplateTypeList('query','')"  placeholder="请选择签约方式">
                <el-option
                  v-for="item in templateOptions"
                  :key="item.type"
                  :label="item.typeName"
                  :value="item.type">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="模板类型：" prop="typeId">
              <el-select v-model="form.typeId" size="small" class="w100" placeholder="请选择模板类型">
                <el-option
                  v-for="item in templateTypeTwo"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="模板内容：" prop="content">
              <n-editor v-model="form.content" :config="config"/>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer">
          <el-button size="small" type="primary" @click="insertOrUpdateTemplate('form')">确定</el-button>
          <el-button size="small" @click="closeForm">关闭</el-button>
        </span>
      </el-dialog>

    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求  引自js文件
  import {addTemplate,updateTemplate,queryTemplateType,queryTemplateTypeOptions, selectTemplateList ,deleteTemplate,queryTemplateById,queryIfTheSelectedTemplate } from 'src/axios/contract/httemplate/contraTemplate'
  import NEditor from 'src/components/n-editor/n-editor'
  import formView from './updTemplate'
  import moment from "moment";
  import { keyBoardEnter } from "src/utils"

  export default {
    name: "contractTemplate",
    components: {
      formView,
      NEditor
    }, data () {
      return {
        config: {
          UEDITOR_HOME_URL: "../../../../static/n-editor/",
          toolbars:
            [['fullscreen',    // 全屏
              'source',        // 源码
              'undo',          // 撤销
              'redo',          // 重做
              'bold',          // 加粗
              "italic",        // 斜体
              "underline",     // 下划线
              "indent", //首行缩进
              "justifyleft", //左对齐
              "justifycenter", //居中对齐
              "justifyright", //右对齐
              "justifyjustify",//两端对齐
              "anchor",   // 锚点
              "fontborder",    // 字符边框
              "strikethrough", // 删除线
              "removeformat",  // 清除格式
              "pasteplain",    // 纯文本
              "forecolor",      // 字体颜色
              "insertorderedlist",    // 有序列表
              "insertunorderedlist", // 无序列表
              "searchreplace", // 查找替换
              "paragraph",   // 段落格式
              "fontfamily", // 字体类型
              "fontsize", //字体大小
              "link",  //链接
              "unlink", // 取消链接
              "horizontal", //分割线
              "date",   //日期
              "time", //时间
              "inserttable", //插入表格
              "spechars", // 特殊字符
            ]],
          sourceEditor: "codemirror",
          initialFrameWidth: '100%',
          initialFrameHeight: 320,
          wordCount:false,
          autoFloatEnabled: true,
          enableDragUpload: true,   // 启用拖拽上传
          enablePasteUpload: true,  // 启用粘贴上传
          imageScaleEnabled: true,  // 启用 图片拉伸缩放
          elementPathEnabled: false, // 关闭元素路径
          catchRemoteImageEnable: true, // 开启远程抓取图片
          allHtmlEnabled: true, //提交附带html字符串
        },

        currentOrder:undefined, //分页的时候缓存

        //验证加初始化
        resData: this.metaData(),

        //表单数据初始化
        form: this.metaForm(),
        query: this.metaQuery(),

        //外部弹窗初始化可见性
        showSelectedForm: false,
        showEditForm: false,

        //判断是新增还是修改
        formStatus: 'query',

        //判断是否为回显，否的话选中联动下第一条数据
        statusCount: 'one',

        rules: {
          title: [
            {required: true, message: '请输入模板名称', trigger: 'blur'},
          ],
          type: [
            {required: true, message: '请选择签约方式', trigger: 'blur'},
          ],
          typeId: [
            {required: true, message: '请选择模板类型', trigger: 'change'}
          ],
          content: [
            {required: true, message: '请输入模板内容', trigger: 'blur'}
          ]
        },
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        } ,
        templateContent : undefined,

        //查询模板类型
        templateTypeOne:[],

        //弹窗内修改和增加模板类型
        templateTypeTwo:[],

        //签约方式
        templateOptions:[],

        isType : undefined
      }
    },
    created () {
      this.queryTemplateOptions();
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
          id: undefined,
          type:undefined,
          typeId:undefined,
          title:undefined,
          content:undefined
        }
      },
      metaQuery () { // 表单查询数据初始化
        return {
          id: undefined,
          code: undefined,
          name: undefined,
          beginDate: undefined,
          endDate: undefined,
          title : undefined,
          type : undefined,
          typeId: undefined
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      toggleForm () {
        this.showEditForm = !this.showEditForm
      },
      closeForm () {
        this.$refs['form'].resetFields();
        this.statusCount = 'one'
        this.formStatus = "query";
        this.templateTypeTwo = null;
        this.toggleForm()
      },

      //查询模板内容
      selectedList(id,status) {
        queryTemplateById(id).then(res => {
          console.log(res);
          if(status=='sel'){//sel是给详情弹窗赋值 up是修改弹窗回显
            this.templateContent = res.data.content;
          }else{
            this.form = {id:id,title:res.data.title,type:res.data.type,content:res.data.content};
            //查询模板类型
            this.queryTemplateTypeList(res.data.type,res.data.typeId);
          }
        });
      },

      //查询签约方式
      queryTemplateOptions(){
        queryTemplateTypeOptions().then(res => {
          console.log('type：',res);
          this.templateOptions = res.data;
          var templateOptionsA = [{
            type:'',
            typeName:'全部'
          },]
          this.templateOptions =  templateOptionsA.concat(this.templateOptions);
        })
      },

      //判断并查询模板类型
      queryTemplateTypeList(type,typeId){
        if(this.formStatus=='update'||this.formStatus=='add'){
          if(type=='query'){
            this.isType = this.form.type;
          }else{
            this.isType = type;
          }
          queryTemplateType(this.isType).then(res => {
            console.log('type：',res);
            this.templateTypeTwo = res.data;
            this.form.typeId = typeId;
            this.checkStatus();
            if(this.formStatus=="update"){
              this.statusCount = 'two';
            }
          })
        }else{
          this.isType = this.query.type;
          queryTemplateType(this.isType).then(res => {
            console.log('type：',res.data);
            this.templateTypeOne = res.data;
            this.query.typeId = this.templateTypeOne[0].id;
          })
        }
      },

      //判断是否直接操作签约方式并选中模板类型第一条
      checkStatus(){
        if(this.statusCount =='two'&&this.formStatus=='update'){
          this.form.typeId=this.templateTypeTwo[0].id;
        }else if(this.statusCount=='one'&&this.formStatus=='add'){
          this.form.typeId=this.templateTypeTwo[0].id;
        }
      },

      // 打开模板编辑或者添加页面
      // 如果type是add那么就是增加操作 update是修改操作
      addOrUpdateTemplate(type,id){
        if(type == 'add'){
          this.form = this.metaForm();
          this.formStatus = "add";
        }else{
          //修改状态为修改操作
          this.formStatus = "update";
          this.selectedList(id,'up');
        }
        this.toggleForm();
      },

      // 打开模板详情
      openSelectedPage (id) {
        this.showSelectedForm = true;// 打开已选窗口
        this.selectedList(id,'sel');//  查询已选数据
      },

      //  获取用户分页列表
      list () {
        this.resData.orderBy = this.currentOrder;
        selectTemplateList(this.resData, this.query).then(res => {
          console.log(res);
          this.resData = res.data;
          if(this.resData.pageNum === 0){
            this.resData.pageNum = 1;
          }
        })
      },

      // 重置用户表单
      resetForm () {
        this.templateTypeOne = null;
        this.query = this.metaQuery();
        this.list();
      },
      /*      // 添加合同模板
            handleGoAdd (id) {
              this.$router.push("/contract/contractmanagement/contractManagementUpdateTemplate/" + id);
            },
            // 编辑合同模板
            handleGoEdit (id) {
              this.$router.push("/contract/contractmanagement/contractManagementUpdateTemplate/" + id);
            },*/

      //修改/增加总保存
      insertOrUpdateTemplate () {
        this.$refs['form'].validate(valid => {
          if (valid) {
            this.toggleForm();
            if (this.formStatus=='add') {
              addTemplate(this.form).then(res => {
                this.query=this.metaQuery ();
                this.list()
                this.$message({
                  type : res.success == true ? "success" : "error",
                  message: res.success == true ? res.data : '添加失败',
                })
              })
            }
            if (this.formStatus=='update') {
              updateTemplate(this.form).then(res => {
                this.statusCount = 'one'; //修改成功状态为one
                this.formStatus = 'query';
                this.query=this.metaQuery ();
                this.list()
                this.$message({
                  type : res.success == true ? "success" : "error",
                  message: res.success == true ? res.data : '修改失败',
                })
              })
            }
          } else {
            return false
          }
        })
      },
      // 处理合同模板删除
      handleDelete (id) {
        this.$confirm('确定删除此合同模板？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          queryIfTheSelectedTemplate (id).then(res => {
            this.$message({
              type: 'success',
              message: res.data
            })
            if(res.data==null){
              deleteTemplate (id).then(res => {
                this.$message({
                  type : res.success == true ? "success" : "error",
                  message: res.success == true ? res.data : '删除失败',
                })
                this.list()
              })
            }else{
              this.$message({
                type: 'warning',
                message: "当前模板已经被使用，不允许删除！"
              })
            }
          })
        })
      },

      //分页
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

