<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="padding20">
      <div class="width-520">
        <el-form :model="from" ref="from" label-position="left" :rules="rules"  label-width="150px" class="demo-ruleForm" size="small">

          <el-form-item label="国家编码：" prop="code">
            <el-input type="consignee" v-model="from.code" maxlength="10"></el-input>
          </el-form-item>

          <el-form-item label="国家中文名称：" prop="nameChn">
            <el-input type="phone" v-model="from.nameChn" maxlength="40"></el-input>
          </el-form-item>

          <el-form-item label="国家英文名称：" prop="nameEng">
            <el-input type="phone" v-model="from.nameEng" maxlength="40"></el-input>
          </el-form-item>

          <el-form-item label="字母码：">
            <el-input type="phone" v-model="from.letterCode" maxlength="10"></el-input>
          </el-form-item>

          <el-form-item label="备注：">
            <el-input
              type="textarea" :rows="2" v-model="from.remark" maxlength="40">
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

  import {addCountry} from 'src/axios/datacenter/basedata/region/region'

  export default {
    data() {
      return {
        from: {
          code: '',
          nameChn: '',
          nameEng: '',
          letterCode: '',
          remark: '',
          parentId: '000000000000000000000000',
        },
        rules:{
          code:{ required: true, message: '请输入国家编码', trigger: 'blur'},
          nameChn:{ required: true, message: '请输入国家中文名称', trigger: 'blur' },
          nameEng:{ required: true, message: '请输入国家英文名称', trigger: 'blur' }
        }
      };
    },
    methods: {
      submitForm(from) {
        this.$refs[from].validate((valid) => {
          if (valid) {
            addCountry(this.from).then(res => {
              this.$message({
                message: res.data,
                type: 'success',
                duration: 1000,
                onClose: () => {
                }
              });
              this.goBack()
            })
          }
        });
      },
      goBack() {
        this.$router.go(-1);
      }
    }
  }
</script>
