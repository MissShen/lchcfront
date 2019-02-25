<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="padding20" style="width: 500px">
        <el-form :model="from" ref="from" :rules="rules"  label-width="100px" class="demo-ruleForm" size="small">

          <el-form-item label="申报名称：" prop="code">
            <el-input  v-model="from.declareName"></el-input>
          </el-form-item>

          <el-form-item label="发布状态：">
            <el-select v-model="from.declareState" placeholder="请选择" size="small" class="w100">
              <el-option label="开始上报" value="1"></el-option>
              <el-option label="结束上报" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="备注：">
            <el-input  v-model="from.comments" ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('from')">保存</el-button>
            <el-button type="" @click="goBack()">返回</el-button>
          </el-form-item>

        </el-form>
    </div>
  </div>
</template>

<script>
  import {update} from 'src/axios/trade/assist/assistConfig'
  export default {
    data() {
      return {
        from: {
          declareName: '',
          declareState: '',
          comments: ''
        },
        rules:{
          declareName:{ required: true, message: '必填项不能为空', trigger: 'blur'}
        }
      };
    },
    methods: {
      submitForm(from) {
            update(this.from).then(res => {
              this.$message({
                message: res.data,
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.goBack();
                }
              })
            })
      },
      goBack() {
        this.$router.go(-1);
      }
    },

  }
</script>
