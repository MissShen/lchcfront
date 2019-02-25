<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="padding20">
      <div class="width-520">
        <el-form :model="from" ref="from" label-position="left" :rules="rules" label-width="180px" class="demo-ruleForm" size="small">

          <el-form-item label="特殊包装材质编码：" prop="code">
            <el-input type="number" v-model="from.code" max="9999999999" min="0"></el-input>
          </el-form-item>

          <el-form-item label="特殊包装材质中文名称：" prop="nameChn">
            <el-input type="name" v-model="from.nameChn" maxlength="200"></el-input>
          </el-form-item>

          <el-form-item label="特殊包装材质英文名称：">
            <el-input type="consignee" v-model="from.nameEng" maxlength="200"></el-input>
          </el-form-item>

          <el-form-item label="备注：">
            <el-input type="textarea" :rows="2" v-model="from.remark" maxlength="1000">
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

  import {add} from 'src/axios/datacenter/basedata/wrap/wrap'

  export default {
    data() {
      return {
        from: {
          code: '',
          nameChn: '',
          nameEng: '',
          remark: ''
        },
        rules: {
          code: {required: true, message: '请输入特殊包装材质编码', trigger: 'blur'},
          nameChn: {required: true, message: '请输入特殊包装材质中文名臣', trigger: 'blur'},
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
                }
              });
              this.goBack();
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
