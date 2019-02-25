<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="padding20">
      <div class="width-520">
        <el-form :model="from" ref="from" :rules="rules" label-position="left" label-width="150px" class="demo-ruleForm" size="small">

          <el-form-item label="剂型编码：" prop="code">
            <span>{{from.code}}</span>
          </el-form-item>

          <el-form-item label="剂型中文名称：" prop="nameChn">
            <el-input type="name" v-model="from.nameChn" maxlength="20"></el-input>
          </el-form-item>

          <el-form-item label="剂型英文名称：">
            <el-input type="consignee" v-model="from.nameEng" maxlength="150"></el-input>
          </el-form-item>

          <el-form-item label="剂型是否合并：">
            <span v-if="from.mergeNum == 0">否</span>
            <span v-if="from.mergeNum == 1">是</span>
          </el-form-item>

          <el-form-item label="备注：">
            <el-input type="textarea" :rows="2" v-model="from.remark" maxlength="500">
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

  import {info,update} from 'src/axios/datacenter/basedata/doseageform/doseageform'

  export default {
    data() {
      return {
        from: {
          code: '',
          nameChn: '',
          nameEng: '',
          remark: '',
        },
        rules:{
          code: { required: true, message: '请输入剂型编码', trigger: 'blur'},
          nameChn: { required: true, message: '请输入剂型中文名称', trigger: 'blur'}
        },
        code: ''
      };
    },
    //界面加载完成后执行
    created(){
      this.code = this.$route.params.code || undefined;
      if(this.code) {
        this.metaFrom(this.code);
      }
    },
    methods: {
      submitForm(from) {
        this.$refs[from].validate((valid) => {
          if (valid) {
            update(this.from).then(res => {
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
      metaFrom(code){
        info(code).then(res => {
          this.from = res.data;
        })

      },
      goBack() {
        this.$router.go(-1);
      }
    }
  }
</script>
