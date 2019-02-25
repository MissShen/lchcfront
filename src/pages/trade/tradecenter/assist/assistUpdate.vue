<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="padding20" style="width: 500px">
        <el-form :model="from" ref="from" :rules="rules" label-width="100px" class="demo-ruleForm" size="small">

          <el-form-item label="id：" prop="code" hidden>
            <span>{{from.id}}</span>
          </el-form-item>

          <el-form-item label="申报名称：" prop="declareName">
            <span>{{from.declareName}}</span>
          </el-form-item>

          <el-form-item label="发布状态：" prop="declareState" >
            <!--<el-input v-model="from.declareState" v-if="form.declareState=='1'">开始上报</el-input>-->
            <!--<el-input v-model="from.declareState" v-if="form.declareState=='2'">结束上报</el-input>-->

            <el-select v-model="from.declareState" class="w100">
              <el-option label="开始上报" value="1"></el-option>
              <el-option label="结束上报" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="发布时间：" prop="createDate">
            <el-input v-model="from.createDate"></el-input>
          </el-form-item>

          <el-form-item label="备注：" prop="comments">
            <el-input type="textarea" :rows="2" v-model="from.comments"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm()">保存</el-button>
            <el-button type="" @click="goBack">返回</el-button>
          </el-form-item>

        </el-form>
    </div>
  </div>
</template>

<script>
  import {updateInit} from  'src/axios/trade/assist/assistConfig'
  import {update} from 'src/axios/trade/assist/assistConfig'
  export default {
    data() {
      return {
        from: {
          declareName: '',
          declareState: '',
          createDate: '',
          comments: ''
        },
        rules: {
          declareName: {required: true, message: '必填项不可为空', trigger: 'blur'}
        }
      };
    },
    created(){
      this.assistId = this.$route.params.assistId || undefined;
      if (this.assistId) {
        this.metaForm(this.assistId);
      }
    },
    methods: {
      metaForm(assistId){
        updateInit(assistId).then(res => {
          this.from = res.data;
        })
      },
      submitForm() {
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
    }
  }
</script>
