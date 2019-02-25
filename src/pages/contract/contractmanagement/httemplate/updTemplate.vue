<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tabs-panel">
      <span class="active">编辑模板</span>
    </div>
    <!--添加模板表单-->
    <div class="from-padding from-view">
      <el-form :model="dataForm" :rules="rules" ref="dataForm" label-position="left"
               label-width="100px"size="small" class="demo-form-inline" :inline="true">
        <el-row :gutter="24">
          <el-col :span="24">
        <el-form-item label="模板名称：" prop="title">
          <el-input v-model="dataForm.title" placeholder="请输入模板名称" style="width: 300px"></el-input>
        </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="签约方式：" prop="type">
              <el-select v-model="dataForm.type" placeholder="请选择签约方式"  @change="queryTemplateTypeList()">
                <el-option
                  v-for="item in templateOptions"
                  :key="item.type"
                  :label="item.typeName"
                  :value="item.type">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="模板类型：" prop="typeId">
            <el-select v-model="dataForm.typeId" placeholder="请选择模板类型">
              <el-option
                v-for="item in templateType"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
        <el-form-item label="模板内容：" prop="content">
          <el-input type="textarea" v-model="dataForm.content"></el-input>
        </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <span  style="padding-left: 180px">
          <el-button type="primary" @click="handleForm()" size="small">提交</el-button>
          <el-button size="small" @click="goBack()">返回</el-button>
            </span>
          </el-col>
        </el-row>
      </el-form>

    <!-- ========================== 主内容end ========================= -->
  </div>

  </div>
</template>
<script>
  import {queryTemplateById,queryTemplateTypeOptions,addTemplate,updateTemplate,queryTemplateType } from 'src/axios/contract/httemplate/contraTemplate'

  export default {
    data() {
      return {
        query: this.metaQuery(), // 查询初始化
        dataForm: {
          title: '',
          typeId: '',
          content: ''
        },
        rules: {
          title: [
            {required: true, message: '请输入模板名称', trigger: 'blur'},
          ],
          typeId: [
            {required: true, message: '请选择模板类型', trigger: 'change'}
          ],
          content: [
            {required: true, message: '请输入模板内容', trigger: 'blur'}
          ]
        },
        templateType:[],
        templateOptions:[]
      };
    },
    created () {
      this.dataForm.id = this.$route.params.id || '-1';
      this.queryTemplate(this.dataForm.id);
      this.queryTemplateOptions();
    },
    methods: {
      fillData() {
        this.visible = true
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      goBack() {
        this.$router.go(-1)
      },
      //提交用户表单
      handleForm(form) {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            var http = this.dataForm.id === '-1' ? addTemplate(this.dataForm) : updateTemplate(this.dataForm)
            http.then(res => {
              this.$message({
                message: res.data,
                type: 'success',
                onClose: () => {
                  this.goBack();
                }
              })
            })
          }
        })
      },
      metaQuery () { // 下拉框初始化
        return {
          query: {
            typeId:undefined,
            id: undefined,
            name: undefined
          }
        }
      },
    queryTemplateOptions(){
      queryTemplateTypeOptions().then(res => {
        console.log('type：',res);
        this.templateOptions = res.data;
        this.queryTemplateTypeList();
      })
    },
      queryTemplateTypeList(){
        queryTemplateType(this.dataForm.type).then(res => {
          console.log('type：',res);
          this.templateType = res.data;
          this.dataForm.typeId=this.templateType[0].id;
        })
      }

    ,
      queryTemplate() {
        console.log("------id:" + this.dataForm.id);
        if(this.dataForm.id === '-1') {

        } else {
          queryTemplateById(this.dataForm.id).then(resp => {
            console.log(resp);
            //  回显数据s
            this.dataForm.title = resp.data.title;
            this.dataForm.typeId = resp.data.typeId;
            this.dataForm.type = resp.data.type;
            this.dataForm.content = resp.data.content;
          })
        }
      }
    }
  }
</script>

