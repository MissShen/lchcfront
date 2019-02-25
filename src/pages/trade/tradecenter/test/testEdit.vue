<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tabs-panel">
      <span class="active">案例详情</span>
    </div>
    <div class="tablebox">
      <div style="width: 500px">
        <el-form :model="form" ref="form" :rules="rules"  label-width="100px" class="demo-ruleForm" size="small">
          <!--<el-row :gutter="24">-->
            <!--<el-col :span="24">-->
              <!--<el-form-item label="id" prop="id">-->
                <!--<span>1</span>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
          <!--</el-row>-->
          <el-form-item label="ID" prop="id">
            <span>{{form.id}}</span>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input type="consignee" v-model="form.name" ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" @click="submitForm()" >保存</el-button>
            <el-button type="primary" @click="goBack">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

  import {testSave, testUpdate} from "src/axios/trade/test/test"
  import {testView} from "src/axios/trade/test/test";

  export default {
    data() {
      return {
        form: this.metaForm(),
        rules:{
          name:{ required: true, message: '请输入姓名', trigger: 'blur'}
        }
      };
    },
    created(){
      this.form.id=this.$route.params.uid || '0'
      testView().then(res=>{
        this.id=res.data
      })
      this.metaList()
    },
    methods: {
      metaList() {
        this.$nextTick(() => {
          this.$refs['form'].resetFields()
        })
        if (this.form.id !== '0') {
          testView(this.form.id).then(res => {
            this.form = res.data
          })
        } else {
          this.form = this.metaForm()
        }
      },
      metaForm() {
        return {
          id: '0',
          name: undefined
        }
      },
      goBack() {
        this.$router.go(-1)
      },
      submitForm() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            var http = this.form.id !== '0' ? testUpdate(this.form) : testSave(this.form)
            http.then(res => {
              this.$message({
                message: res.data,
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.goBack()
                }
              })
            })
          }
        })
      }






    }
  }
</script>

