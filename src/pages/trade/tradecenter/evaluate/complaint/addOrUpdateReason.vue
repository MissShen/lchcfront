<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tablebox">
      <div class="padding20" style="width: 500px">
        <el-form :model="ruleForm" ref="ruleForm" :rules="rules"
                 label-position="right" label-width="100px" class="demo-ruleForm" size="small">
          <el-input type="hidden"  v-model="ruleForm.id"></el-input>
          <el-form-item label="投诉对象：" prop="beComplainedOrgType" >
            <el-select v-model="ruleForm.beComplainedOrgType" size="small" class="w100">
               <el-option label="配送企业" value="sender"></el-option>
               <el-option label="生产企业" value="producer"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分值：" prop="deductionScore">
            <el-input v-model="ruleForm.deductionScore"  size="small"></el-input>
          </el-form-item>
          <el-form-item label="投诉原因：" prop="description">
            <el-input type="textarea" v-model="ruleForm.description" placeholder="300字以内" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" size="small">保存</el-button>
            <el-button type="" size="small" @click="returnForm()" >返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
// 引入用户相关请求
import {findReasonById,addReason,updateReason} from 'src/axios/trade/evaluate/evaluate'

  export default {
    data() {
      return {
        ruleForm: this.metaForm(),
        rules:{
          beComplainedOrgType:{ required: true, message: '请选择', trigger: ''},
          deductionScore :[{ required: true, message: '请输入分值', trigger: 'blur' },{validator: checkNumber, trigger: 'blur'}],
          description :[{ required: true, message: '请输入投诉原因', trigger: 'blur' },{ min: 0, max: 300, message: '最多输入300字'}]
        }
      };
      function  checkNumber  (rule, value, callback) {
        setTimeout(() => {
          const patt =/^[0-9]+([.]{1}[0-9]+){0,1}$/ ;
          if (!patt.test(value)) {
            return callback(new Error('请输入数字'));
          } else {
            callback();
          }
        }, 1000);
      };
    },
    created() {
      var id=this.$route.params.id
      this.ruleForm.id = id
      if(!(id==='0')){
        this.list()
      }else {
        this.ruleForm.beComplainedOrgType = 'sender'
      }
    },
    methods: {
      metaForm() {
        return {
          id: '',
          beComplainedOrgType:'',
          deductionScore: '',
          description: ''
        }
      },
      submitForm(from) {
        this.$refs[from].validate((valid) => {
          if (valid) {
            this.$confirm(`确定保存投诉原因`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if(this.id==='0'){
                addReason(this.ruleForm).then(res => {
                  this.$message({
                    type: 'success',
                    message: res.data
                  })
                })
              }
              else{
                updateReason(this.ruleForm).then(res => {
                  this.$message({
                    type: 'success',
                    message: res.data
                  })
                })
              }
              this.returnForm()
            }).catch(() => {
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      list () {
        var id= this.ruleForm.id
          findReasonById(id).then(res => {
          this.ruleForm = res.data
       })
     },
      returnForm(){
        window.history.go(-1);
      }
    }
  }
</script>
