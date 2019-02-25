<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tab-box">
      <span class="tab-bar"></span>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本医疗保险药品" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="剂型打包维护列表" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="分类维护" name="third">
          <div class="main">
            <div class="classify-left">
              <el-tree :data="classifyTree" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </div>
            <div class="classify-right">
              <div class="table-form">
                <el-form :inline="true" :model="formQuery" ref="formQuery" class="demo-form-inline">
                  <div class="formrow">
                    <span>
                      <el-select v-model="formQuery.value" placeholder="分类编码" size="small" >
                        <el-option
                          v-for="item in formQuery.options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </span>
                    <span>
                      <el-input v-model="formQuery.antistop" placeholder="关键词" size="small"></el-input>
                    </span>
                    <span>
                       <el-button type="warning" size="small">查询</el-button>
                       <el-button size="small" >返回</el-button>
                    </span>
                  </div>
                </el-form>
              </div>
              <div class="tree-from" v-show="jsTrableFrom">
                <div style="width: 400px">
                  <el-form :model="resData" ref="resData" :rules="rules" label-position="left" label-width="130px" class="demo-ruleForm" size="small">
                    <h3>
                      <span v-show="addChild">为</span>
                      {{resData.chineseName}}
                      <span v-show="addChild">添加子类</span>
                      <span v-show="!addChild">详细信息</span>
                    </h3>
                    <el-form-item label="父类编码：" prop="code">
                      <el-input v-model="resData.code"></el-input>
                    </el-form-item>
                    <el-form-item label="分类编码：" prop="classifyCode">
                      <el-input v-model="resData.classifyCode"></el-input>
                    </el-form-item>
                    <el-form-item label="分类中文名称：" prop="chineseName">
                      <el-input v-model="resData.chineseName"></el-input>
                    </el-form-item>
                    <el-form-item label="分类英文名称：" prop="englishName">
                      <el-input v-model="resData.englishName"></el-input>
                    </el-form-item>
                    <el-form-item label="临时编码：" prop="temporaryCode">
                      <el-select v-model="resData.temporaryCode" class="inputWidth">
                        <el-option
                          v-for="item in resData.options1"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="备注：" prop="remark">
                      <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="resData.remark">
                      </el-input>
                    </el-form-item>
                      <el-button type="primary" size="small">保存</el-button>
                      <el-button type="primary" size="small" @click="addSubclass()" v-show="!addChild">新增子类</el-button>
                      <el-button type="danger" size="small">删除此分类</el-button>
                  </el-form>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>
  export default {
    data () {
      return {
        addChild:false,
        formQuery: this.metaQuery(),
        resData: this.metaData(),
        activeName: 'third',
        jsTrableFrom:false,
        classifyTree: [{
          code:'02',
          classifyCode:'345',
          englishName:'xxh',
          temporaryCode:'dfef',
          chineseName: '心血管系统',
          children: [{
            chineseName: '心血管系统',
            children: [{
              chineseName: '抗高血压药'
            }]
          },{
            chineseName: '抗高血压药',
            children: [{
              chineseName: '利尿剂'
            }]
          }]
        }, {
          chineseName: '消化道和代谢方面的药物',
          children: [{
            chineseName: '消化道和代谢方面的药物',
            children: [{
              chineseName: '消化道和代谢方面的药物'
            }]
          }, {
            chineseName: '胆治疗药',
            children: [{
              chineseName: '胆治疗药'
            }]
          }]
        }, {
          chineseName: '皮肤病用药',
          children: [{
            chineseName: '治疗伤口和溃疡药',
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'chineseName'
        },
        rules:{
          classifyCode:{ required: true, message: '请输入分类编码', trigger: 'blur'},
          chineseName:{ required: true, message: '请输入中文名称', trigger: 'blur'},
          englishName:{ required: true, message: '请输入英文名称', trigger: 'blur'}
        }
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleNodeClick(data) {
        this.jsTrableFrom=true;
        this.resData=data;
        this.addChild=false;
      },
      metaQuery () {
        return {
          antistop:'',
          options: [{
            value: '选项1',
            label: '分类中文编码'
          }, {
            value: '选项2',
            label: '分类英文编码'
          }],
          value: ''
        }
      },
      metaData () {
        return{
          code:'',
          classifyCode:'',
          chineseName:'',
          englishName:'',
          options1: [{
            value: '选项1',
            label: '是'
          }, {
            value: '选项2',
            label: '否'
          }],
          temporaryCode: '选项1',

        }
      },
      addSubclass(){
        this.addChild=true;
      }
    }
  }
</script>
<style>
  @import "../../../assets/css/datacenter.css";
</style>
<style>
  .inputWidth .el-input--suffix{
    width:270px !important;
  }
</style>
