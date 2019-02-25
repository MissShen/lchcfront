<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tabs-panel">
      <span class="active">规则维护</span>
    </div>
    <!--添加模板表单-->
    <div class="from-padding from-view">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="规则名称：" prop="ruleName">
          <el-input v-model="ruleForm.ruleName" placeholder="请输入规则名称" size="small"></el-input>
        </el-form-item>

        <el-form-item label="规则编码：" prop="ruleCode">
          <el-input v-model="ruleForm.ruleCode" placeholder="请输入规则编码" :readonly="true" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="ruleFormSubmit()">提交</el-button>
          <el-button @click="goBack()">返回</el-button>
        </el-form-item>
      </el-form>

    </div>




    <!-- ========================== 主内容end ========================= -->
  </div>
</template>

<script>

  import {queryRuleName,updateRuleName} from 'src/axios/contract/datamanagement/rule/sysRule'
  export default {
    data() {
      return {
        ruleForm: {
          id:'',
          ruleName: '',
          ruleCode: ''
        },
        rules:{
          ruleName:{ required: true, message: '请输入规则名称', trigger: 'blur'},
          ruleCode:{ required: true, message: '请输入规则编码', trigger: 'blur'}

        }

      }
    },
    created () {
      console.log("---------------------------------");
      this.ruleForm.id = this.$route.params.id || '-1';
      this.queryRule(this.ruleForm.id);
    },
    methods: {
      submitForm(ruleForm) {
        this.$refs[ruleForm].validate((valid) => {
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
      ruleFormSubmit() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            var http = updateRuleName(this.ruleForm)
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
      queryRule() {

        queryRuleName(this.ruleForm.id).then(resp => {
            console.log(resp);

            //  回显数据
            this.ruleForm.ruleName = resp.data.ruleName;
            this.ruleForm.ruleCode = resp.data.ruleCode;

          })

      }
    }
  }
</script>
