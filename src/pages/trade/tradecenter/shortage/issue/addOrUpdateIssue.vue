<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="padding20" style="width: 500px">
        <el-form :model="ruleForm" ref="ruleForm" :rules="rules"  label-position="left"
                 label-width="100px" size="small"
                 class="demo-ruleForm">
          <el-input type="hidden"  v-model="ruleForm.id"></el-input>
          <el-form-item label="期号名称 : " prop="issueName">
            <el-input v-model="ruleForm.issueName"></el-input>
          </el-form-item>
          <el-form-item label="发布状态 : " prop="issueState" size="small">
            <el-select v-model="ruleForm.issueState" size="small" class="w100">
              <el-option label="开始上报" value="1"></el-option>
              <el-option label="已结束" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注 : " prop="comments" >
            <el-input type="textarea" v-model="ruleForm.comments"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" size="small">保存</el-button>
            <el-button type="" size="small" @click="returnForm()" >返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>
<script>
// 引入用户相关请求
import {addIssue,updateIssue,findIssueById} from 'src/axios/trade/shortage/buyerRole/shortageUpList'

  export default {
    data() {
      return {
        ruleForm: this.metaForm(),
        rules:{
          issueName:{ required: true, message: '请输入期号名称', trigger: 'blur'},
          comments :{ required: true, message: '请输入备注', trigger: 'blur' }
        }
      };
    },
    created() {
     var id =this.$route.params.id
       this.id = id
      if(!(id==='0')){
        this.list()
      }else{
        this.ruleForm.issueState='1'
      }
    },
    methods: {
      metaForm() {
        return {
          id:'',
          issueName: '',
          issueState: '',
          comments:''
        }
      },
      submitForm(from) {
        this.$refs[from].validate((valid) => {
          if (valid) {
            if(this.id==='0'){
                addIssue(this.ruleForm).then(res =>{
                this.$message({
                  type: 'success',
                  message:  res.data,
                })
                  this.returnForm();
              })
            }
            else{
              updateIssue(this.ruleForm).then(res => {
                this.$message({
                  type: 'success',
                  message:  res.data,
                })
                this.returnForm();
              })
            }

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      list () {
        var id= this.id
          findIssueById(id).then(res => {
            this.ruleForm = res.data
       })
     },
      returnForm(){
        window.history.go(-1);
      }
    }
  }
</script>
