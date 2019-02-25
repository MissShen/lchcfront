<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="padding20">
      <div class="width-520">
        <el-form :model="from" ref="from" :rules="rules" label-position="left" label-width="180px" class="demo-ruleForm" size="small">

          <el-form-item label="盐类衍生物编码：" prop="code">
            <el-input  v-model="from.code"></el-input>
          </el-form-item>

          <el-form-item label="盐类衍生物中文名称：" prop="nameChn">
            <el-input  v-model="from.nameChn"></el-input>
          </el-form-item>

          <el-form-item label="盐类衍生物英文名称：" prop="nameEng">
            <el-input  v-model="from.nameEng" ></el-input>
          </el-form-item>

          <el-form-item label="备注：" prop="remark">
            <el-input type="textarea" :rows="2" v-model="from.remark">
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button size="small" type="primary" @click="submitForm('from')">保存</el-button>
            <el-button size="small" @click="goBack()">返回</el-button>
          </el-form-item>

        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import {add} from 'src/axios/datacenter/basedata/salt/salt'
  import {changeToBite,isEnglish} from 'src/utils/validateUtil'
  export default {

    data() {
      let checkNameEng = (rule, value, callback) => {
        if(value){
          if(changeToBite(value) > 150){
            callback(new Error('输入英文名称不超过150字节'))
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
        from: {
          code: '',
          nameChn:'',
          nameEng:'',
          remark:''
        },
        rules:{
          code:[{ required: true, message: '必填项不能为空', trigger: 'blur'},
                { min: 2, max: 2, message: '请输入两位编码'}
          ],
          nameChn:{ required: true, message: '必填项不能为空', trigger: 'blur' },
          nameEng:{required: false, validator:checkNameEng, trigger: 'blur'},
          remark:{required: false, validator:checkLength, trigger: 'blur'},
        }
      };
    },
    methods: {
      submitForm(from) {
        this.$refs[from].validate((valid) => {
          if (valid) {
            add(this.from).then(res => {
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
    },

  }
</script>
