<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tab-box">
          <div class="main">
            <div class="classify-left">
              <div class="classify-wrapper">
                <el-tree :props="defaultProps" :load="loadNode" lazy @node-click="handleNodeClick"></el-tree>
              </div>
            </div>
            <div class="classify-right">
                <el-form :inline="true" :model="formQuery" ref="formQuery" class="table-form" size="small">
                    <el-form-item>
                      <el-input v-model="formQuery.name" placeholder="关键词" @keyup.enter.native="searchEnterFun" size="small"></el-input>
                    </el-form-item>
                    <el-form-item>
                       <el-button type="success" size="small" @click="searchEnterFun">查询</el-button>
                    </el-form-item>
                </el-form>
              <div class="tree-from" v-show="jsTrableFrom">
                <div class="width-600">
                  <el-form :model="resData" ref="resData" :rules="rules" label-position="left" label-width="110px" class="demo-ruleForm" size="small">
                    <h3>
                      
                      <span v-if="this.startVal == '1'">添加一级分类</span>
                      <span v-if="this.startVal != '1'" v-show="addChild">添加子类</span>
                      <span v-if="this.startVal != '1'" v-show="!addChild">详细信息</span>
                    </h3>
                    <el-form-item label="父类编码：">
                      <el-input v-model="resData.parentCode" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="类别编码：" prop="code">
                      <el-input v-model="resData.code" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="类别名称：" prop="name">
                      <el-input v-model="resData.name" maxlength="80"></el-input>
                    </el-form-item>
                    <el-form-item label="描述：" prop="remark" class="editor-wrapper">
                      <n-editor v-model="resData.remark" :config="config"/>
                    </el-form-item>
                    <el-button type="primary" size="small" @click="saveInfo('resData')">保存</el-button>
                    <el-button type="success" size="small" @click="addSubclass()" v-if="this.startVal != '1'" v-show="!addChild">新增子类</el-button>
                    <el-button type="danger" size="small" v-show="!addChild" v-if="this.startVal != '1'" @click="deleteById">删除此分类</el-button>
                  </el-form>
                </div>
              </div>

              <div class="tableset" v-show="listFrom">
                <el-table
                  :data="resData.list"
                  border
                  stripe>
                  <el-table-column label="名称" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span>{{ scope.row.name }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="备注" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span>{{ scope.row.remark }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="80">
                    <template slot-scope="scope">
                      <div class="operates"><a class="operation-btn" @click="handleClick(scope.row.id)">选择</a></div>
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

            </div>
          </div>
    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>
  import {catList,catListPage,findCatFormularyCategoryById,updateCatFormularyCategoryById,insertCatFormularyCategory,deleteCatFormularyCategoryByIds} from 'src/axios/datacenter/basedata/formulary/formulary';
  import NEditor from 'src/components/n-editor/n-editor';
  import {keyBoardEnter} from "src/utils";

  export default {
    components: {
      NEditor
    },
    data () {
      return {
        id:'',
        startVal:'1',
        categorys:[],
        addChild:false,
        formQuery: this.metaQuery(),
        resData: this.metaData(),
        activeName: '1',
        jsTrableFrom:true,
        listFrom:false,
        search:{
          parentId:''
        },
        defaultProps: {
          children: 'children',
          label: 'name',
          isLeaf:'hasNext'
        },
        rules:{
          code:{ required: true, message: '请输入分类编码', trigger: 'blur'},
          name:{ required: true, message: '请输入类别名称', trigger: 'blur'},
        },
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
          autoHeightEnabled:false,
          autoFloatEnabled: true,
          enableDragUpload: true,   // 启用拖拽上传
          enablePasteUpload: true,  // 启用粘贴上传
          imageScaleEnabled: true,  // 启用 图片拉伸缩放
          elementPathEnabled: false, // 关闭元素路径
          catchRemoteImageEnable: true, // 开启远程抓取图片
          allHtmlEnabled: true, //提交附带html字符串
        },
      }
    },
    created(){
      if(!!this.$store.state.pageSeach.pageNum){
        this.query=this.$store.state.pageSeach;
        this.resData.pageSize=this.$store.state.pageSeach.pageSize;
        this.resData.pageNum=this.$store.state.pageSeach.pageNum;
      }
      this.$store.state.pageSeach=this.query;
      this.resData.pageSize = 10;
    },
    methods: {
      loadNode(node,resolve){
        if (node.level === 0) {
          this.search.parentId = '000000000000000000000000';
          catList(this.search).then(res => {
            this.categorys = res.data
            return resolve(this.categorys);
          })

        }
        if (node.level >= 1) {

          this.search.parentId = node.data.id;
          catList(this.search).then(res => {
            this.categorys = res.data
            return resolve(this.categorys);
          })

        }
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e, () => {
          this.searchInfo();
        })
      },
      saveInfo(resData){
        this.$refs[resData].validate((valid) => {
          if (valid) {
            if(this.resData.id){
              updateCatFormularyCategoryById(this.resData).then(res => {
                this.$message({
                  message: res.data,
                  type: 'success',
                  duration: 1000,
                  onClose: () => {
                }
                });
              })
            }else{
              insertCatFormularyCategory(this.resData).then(res => {
                this.$message({
                  message: res.data,
                  type: 'success',
                  duration: 1000,
                  onClose: () => {
                  }
                });
              })
            }

            location.reload()

          }
        })


      },
      deleteById(){
        this.$confirm(`确定删除选中的数据吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteCatFormularyCategoryByIds(this.resData.id).then(res => {
          this.$message({
            message: res.data,
            type: 'success',
            duration: 1000,
            onClose: () => {
              location.reload()
            }
          });
        })
      }).catch(() => {
        });
        

      },
      searchInfo(){

        catListPage(this.formQuery,this.resData).then(res => {
          this.resData = res.data
          this.listFrom = true;
          this.jsTrableFrom = false;
        })
      },
      handleNodeClick(node){
        this.startVal = '2';
        this.$refs.resData.resetFields();
        this.addChild = false;
        findCatFormularyCategoryById(node.id).then(res => {
          this.resData = res.data
          this.listFrom = false;
          this.jsTrableFrom=true;
          this.addChild=false;
        })
      },
      handleClick(id) {
        findCatFormularyCategoryById(id).then(res => {
          this.resData = res.data
          this.listFrom = false;
          this.jsTrableFrom=true;
          this.addChild=false;
        })
      },
      metaQuery () {
        return {
          name:''
        }
      },
      metaData () {
        return{
          id:'',
          code:'',
          parentCode:'',
          name:'',
          remark:'',
          parentId:'',
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
      metaDataNoCode () {
        return{
          id:'',
          code:'',
          parentCode:this.resData.code,
          name:'',
          remark:'',
          parentId:this.resData.id
        }
      },
      addSubclass(){

        this.addChild=true;
        this.resData = this.metaDataNoCode();
      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.searchInfo()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.searchInfo()
      }
    }
  }
</script>
<style>
  @import "../../../../../assets/css/datacenter.css";
</style>
