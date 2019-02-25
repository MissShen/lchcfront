<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="padding20">
      <div class="width-520">
        <el-form :model="form" ref="form" :rules="rules" label-position="left" label-width="150px" class="demo-ruleForm" size="small">

          <el-form-item label="计量单位编码：" prop="code">
            <el-input type="phone" v-model="form.code"></el-input>
          </el-form-item>

          <el-form-item label="计量单位中文名称：" prop="nameChn">
            <el-input type="phone" v-model="form.nameChn"></el-input>
          </el-form-item>

          <el-form-item label="计量单位英文名称：" prop="nameEng">
            <el-input type="consignee" v-model="form.nameEng"></el-input>
          </el-form-item>

          <el-form-item label="备注：" prop="remark">
            <el-input type="textarea" :rows="2" v-model="form.remark">
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button size="small" type="primary" @click="submitForm('form')">保存</el-button>
            <el-button size="small" @click="goBack">返回</el-button>
          </el-form-item>

        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import {add} from 'src/axios/datacenter/basedata/metric/metric'
  import {changeToBite,isEnglish} from 'src/utils/validateUtil'
  export default {
    data() {
      let checkNameEng = (rule, value, callback) => {
        if(value){
          if(changeToBite(value) > 20){
            callback(new Error('输入英文名称不超过20字节'))
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
          callback()
        }
      }
      let checkLength = (rule, value, callback) => {
        if(value){
          if(changeToBite(value) > 150){
            callback(new Error('输入不超过150字节'))
          }else{
            callback()
          }
        }else{
          callback()
        }
      }
      return {
        form: {
          code: '',
          nameChn: '',
          nameEng: '',
          remark: ''
        },
        rules: {
          code: {required: true, message: '必填项不可为空', trigger: 'blur'},
          nameChn: {required: true, message: '必填项不可为空', trigger: 'blur'},
          nameEng:{required: false, validator:checkNameEng, trigger: 'blur'},
          remark:{required: false, validator:checkLength, trigger: 'blur'},
        }
      };
    },
    methods: {
      submitForm(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            add(this.form).then(res => {
              this.$message({
                message: res.data,
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.goBack();
                }
              })
            })
          } else {
            return false;
          }
        });
      },
      goBack() {
        this.$router.go(-1);
      }
    }
  }
</script>
