<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tab-box">
      <div class="main">
        <div class="classify-left">
          <el-tree :props="defaultProps" :load="loadNode" node-key="id" :default-expanded-keys="trees" v-if="isshow" lazy @node-click="handleNodeClick"></el-tree>
        </div>
        <div class="classify-right">
            <el-form :inline="true" :model="formQuery" ref="formQuery" class="table-form" size="small">
                      <el-form-item>
                      <el-input v-model="formQuery.name" placeholder="关键词" size="small" @keyup.enter.native="searchEnterFun"></el-input>
                    </el-form-item>
                    <el-form-item>
                       <el-button type="success" size="small" @click="searchEnterFun">查询</el-button>
                    </el-form-item>
            </el-form>
          <div class="tree-from" v-show="jsTrableFrom">
            <div class="width-420">
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
                  <el-input v-model="resData.code" maxlength="2"></el-input>
                </el-form-item>
                <el-form-item label="类别名称：" prop="name">
                  <el-input v-model="resData.name" maxlength="80"></el-input>
                </el-form-item>
                <el-form-item label="描述：" prop="remark">
                  <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="resData.remark" maxlength="150">
                  </el-input>
                </el-form-item>
                <el-button type="primary" size="small" @click="saveInfo('resData')">保存</el-button>
                <el-button type="success" size="small" v-if="this.startVal != '1'" @click="addSubclass()" v-show="!addChilds">新增子类</el-button>
                <el-button type="danger" size="small" v-if="this.startVal != '1'" v-show="!addChild" @click="deleteById">删除此分类</el-button>
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
              <el-table-column label="操作" width="200">
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
  import {catList,catListPage,updateCatCategory,insertCatCategory,findCatCategoryById,deleteCatCategoryByIds} from 'src/axios/datacenter/basedata/catcategory/catcategory';
  import {keyBoardEnter} from "src/utils";

  export default {
    data () {
      return {
        id:'',
        startVal:'1',
        isshow:'true',
        trees:[],
        categorys:[],
        addChild:false,
        addChilds:false,
        formQuery: this.metaQuery(),
        resData: this.metaData(),
        activeName: 'third',
        jsTrableFrom:true,
        listFrom:false,
        search:{
          parentId:'',
          name:'',
          hierarchy:''
        },
        defaultProps: {
          children: 'children',
          label: 'name',
          isLeaf:'hasNext'
        },
        rules:{
          code:{ required: true, message: '请输入类别编码', trigger: 'blur'},
          name:{ required: true, message: '请输入类别名称', trigger: 'blur'},
        }
      }
    },
    methods: {
      loadNode(node,resolve){
        if (node.level === 0) {
          this.search.hierarchy = '1';
          catList(this.search).then(res => {
            this.categorys = res.data
          return resolve(this.categorys);
        })

        }
        if (node.level >= 1) {

          this.search.parentId = node.data.id;
          this.search.hierarchy = '';
          catList(this.search).then(res => {
            this.categorys = res.data
            return resolve(this.categorys);
        })

        }
      },
      searchEnterFun(e){
        this.resData.pageNum = 1;
        keyBoardEnter(e, () => {
          this.searchInfo();
        })
      },
      saveInfo(resData){
        this.$refs[resData].validate((valid) => {
          if (valid) {
            if(this.resData.id){
              updateCatCategory(this.resData).then(res => {
                this.$message({
                  message: res.data,
                  type: 'success',
                  duration: 1000,
                  onClose: () => {
                }
            });
            })
            }else{
              insertCatCategory(this.resData).then(res => {
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
          if(this.resData.hasNext == false){
            return this.$message.error('请先删除子类');
          }
          deleteCatCategoryByIds(this.resData.id).then(res => {
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
        this.$refs.resData.resetFields();
        this.addChild = false;
        this.startVal = '2';
        findCatCategoryById(node.id).then(res => {
          this.resData = res.data;

          if(node.hierarchy == '3'){
            this.addChilds = true;
          }else{
            this.addChilds = false;
          }

          this.listFrom = false;
          this.jsTrableFrom=true;
      })
      },
      handleClick(id) {
        this.trees = [];
        findCatCategoryById(id).then(res => {
          this.resData = res.data
          this.listFrom = false;
          this.jsTrableFrom=true;
          this.addChild=false;
          this.trees.push(res.data.p_1,res.data.p_2,res.data.p_3,res.data.p_4);
          this.isshow = false;
          this.isshow = true;

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
          hasNext:'',
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
        this.addChilds=true;
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
  @import "../../../../assets/css/datacenter.css";
</style>
