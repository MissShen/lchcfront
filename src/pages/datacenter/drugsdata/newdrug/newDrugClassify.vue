<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tab-box">
      <div class="main">
        <div class="classify-left">
          <div class="classify-wrapper">
            <el-tree :props="defaultProps" :load="loadNode" node-key="pid" :default-expanded-keys="trees" lazy @node-click="handleNodeClick" v-if="isshow" ref="treeform"></el-tree>
          </div>
        </div>
        <div class="classify-right">
            <el-form :inline="true" :model="formQuery" ref="formQuery" size="small" class="table-form">
                <el-form-item>
                  <el-select v-model="formQuery.searchType" placeholder="分类编码" size="small">
                    <el-option
                      v-for="item in formQuery.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-input v-model="formQuery.searchContent" placeholder="关键词" size="small" @keyup.enter.native="searchEnterFun"></el-input>
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
                <el-form-item label="类别编码：">
                  <el-input v-model="resData.code" maxlength="2"  v-if="resData.pid != null && resData.pid != ''" :disabled="true">></el-input>
                  <el-input v-model="resData.code" maxlength="2"  v-if="resData.pid == null || resData.pid == ''" ></el-input>
                </el-form-item>
                <el-form-item label="类别名称：" prop="pname">
                  <el-input v-model="resData.pname" maxlength="100"></el-input>
                </el-form-item>
                <el-button type="primary" size="small" @click="saveInfo('resData')">保存</el-button>
                <el-button type="success" size="small" @click="addSubclass()" v-if="this.startVal != '1'" v-show="!addChilds">新增子类</el-button>
                <el-button type="danger" size="small" v-show="!addChild" @click="deleteById" v-if="this.startVal != '1'">删除此分类</el-button>
              </el-form>
            </div>
          </div>

          <div class="tableset" v-show="listFrom">
            <el-table
              :data="resData.list"
              border
              stripe>
              <el-table-column label="名称">
                <template slot-scope="scope">
                  <span>{{ scope.row.pname }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                  <div class="operates"><a class="operation-btn" @click="handleClick(scope.row.pid)">选择</a></div>
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
  import {catList,catListPage,updateCatPharmacology,insertCatPharmacology,findCatPharmacologyById,deleteCatPharmacologyByIds} from 'src/axios/datacenter/basedata/catpharmcology/catpharmcology';
  import {keyBoardEnter} from "src/utils";

  export default {
    data () {
      return {
        id:'',
        isshow:'true',
        startVal:'1',
        categorys:[],
        trees:[],
        addChild:false,
        addChilds:false,
        formQuery: this.metaQuery(),
        resData: this.metaData(),
        activeName: '1',
        jsTrableFrom:true,
        listFrom:false,
        search:{
          pId:'',
          name:'',
          pLevel:''
        },
        defaultProps: {
          children: 'children',
          label: 'pname',
          isLeaf:'hasNext'
        },
        rules:{
          pname:{ required: true, message: '请输入中文名称', trigger: 'blur'},
        }
      }
    },
    methods: {
      loadNode(node,resolve){
        if (node.level === 0) {
          this.search.pLevel = '1';
          catList(this.search).then(res => {
            this.categorys = res.data
            return resolve(this.categorys);
          })

        }
        if (node.level >= 1) {

          this.search.pId = node.data.pid;
          this.search.pLevel = parseInt(node.data.plevel)+1;
          catList(this.search).then(res => {
            this.categorys = res.data
          return resolve(this.categorys);
        })

        }
      },
      saveInfo(resData){
        let numPett = /^[0-9]{2}?$/;
        if(!numPett.test(this.resData.code)){
          return this.$message.error('只能输入两位数字');
        }
        this.$refs[resData].validate((valid) => {
          if (valid) {
            if(this.resData.pid){
              updateCatPharmacology(this.resData).then(res => {
                this.$message({
                  message: res.data,
                  type: 'success',
                  duration: 1000,
                  onClose: () => {
                }
            });
            })
            }else{
              insertCatPharmacology(this.resData).then(res => {
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
          deleteCatPharmacologyByIds(this.resData.pid).then(res => {
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
      searchEnterFun(e){
        this.resData.pageNum = 1;
        keyBoardEnter(e, () => {
          this.searchInfo()
        })
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
        findCatPharmacologyById(node.pid).then(res => {
          this.resData = res.data;

        if(node.hierarchy == '4'){
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
        findCatPharmacologyById(id).then(res => {
          this.resData = res.data
          this.listFrom = false;
          this.jsTrableFrom=true;
          this.addChild=false;
        })
        if(id.length == 4){
          var l_1 = id.substring(0,2);
          this.trees.push(l_1,id);
        }
        if(id.length == 6){
          var l_1 = id.substring(0,2);
          var l_2 = id.substring(0,4);
          this.trees.push(l_1,l_2,id);
        }
        if(id.length == 8){
          var l_1 = id.substring(0,2);
          var l_2 = id.substring(0,4);
          var l_3 = id.substring(0,6);
          this.trees.push(l_1,l_2,l_3,id);
        }

        this.isshow = false;
        this.isshow = true;

      },
      metaQuery () {
        return {
          searchType:'1',
          searchContent:'',
          options: [{
            value: '1',
            label: '新编药学分类编码'
          },{
            value: '2',
            label: '新编药学分类中文名称'
          }],
        }
      },
      metaData () {
        return{
          pid:'',
          code:'',
          parentCode:'',
          hasNext:'',
          plevel:'1',
          pname:'',
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
          code:'',
          parentCode:this.resData.pid,
          pname:'',
          plevel:parseInt(this.resData.plevel)+1
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
