<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tab-box">
      <!--<el-tabs v-model="activeName" @tab-click="handleClick">-->
          <div class="main">
            <div class="classify-left">
              <div class="classify-wrapper">
                <el-tree  :props="defaultProps" :load="loadNode" lazy node-key="id" :default-expanded-keys="trees" @node-click="getNode" @node-expand="getNode" @node-collapse="getNode"></el-tree>
              </div>
            </div>
            <div class="classify-right">
                <el-form :inline="true" :model="formQuery" ref="formQuery" size="small" class="table-form">
                    <el-form-item>
                      <el-select v-model="formQuery.searchType" placeholder="分类编码" size="small" >
                        <el-option label="分类编码" value="1"></el-option>
                        <el-option label="分类中文名称" value="2"></el-option>
                        <el-option label="分类英文名称" value="3"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item>
                      <el-input v-model="formQuery.searchContent" placeholder="关键词" size="small" @keyup.enter.native="searchEnterFun"></el-input>
                    </el-form-item>
                    <el-form-item>
                       <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
                       <el-button type="warning" @click="reset()" size="small">重置</el-button>
                    </el-form-item>
                </el-form>
              <div class="tree-from" v-show="jsTrableFrom">
                <div class="width-420">
                  <el-form :model="resData" ref="resData" :rules="rules" label-position="left" label-width="140px" class="demo-ruleForm" size="small">
                    <h3>
                      <span v-show="addChild">为</span>
                      {{titleName}}
                      <span v-show="addChild">添加子类</span>
                      <span v-show="!addChild">详细信息</span>
                    </h3>
                    <el-form-item label="父类编码：" >
                      <el-input v-model="resData.parentCode" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="分类编码：" prop="code">
                      <el-input v-model="resData.code"></el-input>
                    </el-form-item>
                    <el-form-item label="分类中文名称：" prop="nameChn">
                      <el-input v-model="resData.nameChn"></el-input>
                    </el-form-item>
                    <el-form-item label="分类英文名称：" prop="nameEng">
                      <el-input v-model="resData.nameEng"></el-input>
                    </el-form-item>
                    <el-form-item label="临时编码：">
                      <el-select v-model="resData.tempCodeFlag" class="width-280">
                        <el-option label="否" value="0"></el-option>
                        <el-option label="是" value="1"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="备注：" prop="remark">
                      <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="resData.remark">
                      </el-input>
                    </el-form-item>
                      <el-button type="primary" size="small" @click="save('resData')">保存</el-button>
                      <el-button type="success" size="small" v-if="!addFirstLevel" @click="addSubclass()" v-show="!addChild">新增子类</el-button>
                      <el-button type="danger" size="small" v-if="!addFirstLevel" @click="remove()">删除此分类</el-button>
                  </el-form>
                </div>
              </div>
            </div>
          </div>
      <!--</el-tabs>-->
    </div>
    <!-- ========================== 主内容end ========================= -->
    <classificationWin v-if="searchVisible" ref="classificationWin" @classificationChoose="classificationChoose"></classificationWin>
  </div>

</template>
<script>
  import classificationWin from './windowPanel/classificationList';
  import {queryListByParentId} from 'src/axios/datacenter/authdata/medicalinsurance/classification';
  import {findClassificationById} from 'src/axios/datacenter/authdata/medicalinsurance/classification';
  import {updateClassification,saveNewClassification,deleteClassification} from 'src/axios/datacenter/authdata/medicalinsurance/classification';
  import {expandTree,expandTree2} from 'src/axios/datacenter/authdata/medicalinsurance/classification';
  import {keyBoardEnter} from "src/utils";
  import {changeToBite,isEnglish} from 'src/utils/validateUtil'

  export default {
    components: {
      classificationWin,
    },
    data () {
      let checkNameEng = (rule, value, callback) => {
        if(value){
          if(changeToBite(value) > 120){
            callback(new Error('输入英文名称不超过120字节'))
          }else{
            let valueTemp = value;
            valueTemp =  valueTemp.replace(/\s/g,"");
            if(!isEnglish(valueTemp)){
              callback(new Error('请输入正确格式英文名称'))
            }else{
              callback()
            }
          }
        }else{
          callback('请输入英文名称')
        }
      }
      let checkLength = (rule, value, callback) => {
        if(value){
          if(changeToBite(value) > 600){
            callback(new Error('输入不超过600字节'))
          }else{
            callback()
          }
        }else{
          callback()
        }
      }
      return {
        searchVisible:false,
        addChild:false,
        formQuery: this.metaQuery(),
        resData: this.metaData(),
        activeName: '3',
        parentId:'',
        parentNode:undefined,
        titleName:undefined,
        clickNode:undefined,
        clickResolve:undefined,
        updateOrAdd:'save',
        addFirstLevel:true,
        jsTrableFrom:true,
        trees:[],
        defaultProps: {
          label: 'name',
          children: 'zones',
          isLeaf: 'leaf'
        },
        rules:{
          'code':{ required: true, message: '请输入分类编码', trigger: 'blur'},
          'nameChn':{ required: true, message: '请输入中文名称', trigger: 'blur'},
          'nameEng':{ required: true, validator:checkNameEng, trigger: 'blur'},
          'remark':{required: false, validator:checkLength, trigger: 'blur'},
        }
      }
    },
    methods: {
      getNode(data){
        this.handleNodeClick(data.id);
      },
      loadNode(node, resolve) {
        if(node.level == 0){
          this.clickNode=node;
          this.clickResolve=resolve
          this.parentId='000000000000000000000000';
        }else{
          this.parentId=node.data.id;
          this.handleNodeClick(this.parentId);
        }
        if (node.level > 4) return resolve([]);
        setTimeout(() => {
          queryListByParentId(this.parentId).then(res => {
            var ja=[];
            for(var i=0;i<res.data.length;i++){
              var jo={};
              jo.id=res.data[i].id;
              jo.name=res.data[i].nameChn;
              jo.leaf=res.data[i].leaf;
              ja.push(jo);
            }
             resolve(ja);
          });
      }, 10);
      },

      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleNodeClick(id) {
        this.jsTrableFrom=true;
        this.addChild=false;
        findClassificationById(id).then(res => {
          this.resData=res.data;
          this.titleName=this.resData.nameChn;
          this.updateOrAdd='update';
          this.addFirstLevel=false;
        })
      },
      save(form){
        this.$refs[form].validate((valid) => {
          if (valid) {
            if(this.updateOrAdd=='update'){
              updateClassification(this.resData).then(res => {
                this.$message({
                        message: res.data,
                        type: 'success',
                        duration: 1000,
                        onClose: () => {}
            });
            });
            }
            if(this.updateOrAdd=='save'){
              if(this.addFirstLevel){
                this.resData.id='000000000000000000000000';
                this.resData.hierarchy='0';
              }
              saveNewClassification(this.resData).then(res => {
                this.$message({
                message: res.data,
                type: 'success',
                duration: 1000,
                onClose: () => {
                //  修改左边树形菜单列表
                this.clickNode.childNodes=[];
              this.loadNode(this.clickNode, this.clickResolve);
              this.expandTree2(this.resData.parentId);
            }
            });
            });
            }
          } else {
            return false;
      }
      });

      },
      //  回车查询
      searchEnterFun(e){
        this.searchVisible = true;
        this.resData.pageNum = 1;
        keyBoardEnter(e, () => {
          this.$nextTick(() => {
            this.$refs.classificationWin.fillData(this.formQuery.searchType,this.formQuery.searchContent);
          })
        })
        var keyCode = window.event? e.keyCode:e.which;
        if(keyCode == 13){
          if(this.formQuery.searchContent){
            this.search();
          }
        }
      },
      //  查询
      // search(){
      //   this.searchVisible = true;
      //   this.$nextTick(() => {
      //     this.$refs.classificationWin.fillData(this.formQuery.searchType,this.formQuery.searchContent);
      //   })
      // },
      //  重置
      reset(){
        this.formQuery=this.metaQuery();
      },
      //  处理选中数据
      classificationChoose(vel){
        this.jsTrableFrom=true;
        this.addChild=false;
        this.resData=vel.value;
        this.titleName=this.resData.nameChn;
        this.updateOrAdd='update';
        this.expandTree(this.resData);
      },
      //  由查找到额信息反向展开树形
      expandTree(data){
        this.trees=[];
        expandTree(data).then(res => {
          this.trees=[res.data.firstLevelId,res.data.secondLevelId,res.data.thirdLevelId,res.data.forthLevelId];
      })
      },
      expandTree2(id){
        this.trees=[];
        expandTree2(id).then(res => {
          this.trees=[res.data.firstLevelId,res.data.secondLevelId,res.data.thirdLevelId,res.data.forthLevelId];
      })
      },
      //  转换成新增表单
      addSubclass(){
        if(this.resData.hierarchy!='4'){
          this.addChild=true;
          this.resData.parentId=this.resData.id;
          this.resData.parentCode=this.resData.code;
          this.resData.code=undefined;
          this.resData.nameChn=undefined;
          this.resData.nameEng=undefined;
          this.resData.tempCodeFlag='1';
          this.updateOrAdd='save';
        }
      },
      //  删除此分类
      remove(){
        if(this.resData.leaf==false){
          this.$confirm('含有子类，不能删除!', '确认', {
            confirmButtonText: '确定',
            type: 'warning'
          });
        }else{
          this.$confirm('确定要删除该类?', '确认', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            deleteClassification(this.resData.id).then(res => {
            this.$message({
                    message: res.data,
                    type: 'success',
                    duration: 1000,
                    onClose: () => {
                    //  修改左边树形菜单列表
                    this.clickNode.childNodes=[];
                    this.loadNode(this.clickNode, this.clickResolve);
                    this.expandTree2(this.resData.parentId);
                    this.resData= this.metaData();
                }
              })
            });
          })
        }
      },
      metaQuery () {
        return {
          searchType:'1',
          searchContent:undefined
        }
      },
      metaData () {
        return{
          id:'',
          parentId:'',
          code:'',
          parentCode:'',
          nameChn:'',
          nameEng:'',
          remark:'',
          leaf:'',
          tempCodeFlag:''
        }
      },
    }
  }
</script>
<style>
  @import "../../../../assets/css/datacenter.css";
</style>
