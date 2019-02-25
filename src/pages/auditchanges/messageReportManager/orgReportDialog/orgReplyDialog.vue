<template>
  <el-dialog
    title="举报审核回复"
    :close-on-click-modal="false"
    :visible.sync="visible"
    width="50%"
    center
    append-to-body>
    <div class="table-form">
      <el-form :model="formData" status-icon ref="formData" label-width="100px" class="demo-ruleForm">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="回复内容：">
              <el-input type="textarea" v-model="formData.replyExplan"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <div v-if="this.flag == 1">
              <el-form-item label="举报是否有效">
                <el-radio v-model="formData.statesAudit" label="0">否</el-radio>
                <el-radio v-model="formData.statesAudit" label="1">是</el-radio>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item>
              <el-button type="success" @click="submitReport()">提交</el-button>
              <el-button @click="goBack()">关闭</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
  import {
    updateReportStates
  } from 'src/axios/auditchanges/messageReportManager/messageReport/orgMessageReport'

  export default {
    name: "org-reply-dialog",
    data() {
      return {
        formData: this.resData(),
        visible: false,
        flag: ''
      }
    },
    methods: {
      goBack() {
        this.visible = false;
        this.formData = this.resData();
      },
      submitReport() {
        updateReportStates(this.formData).then(res => {
          if (res.data == 1) {
            this.$message({
              message: "保存成功",
              type: 'success',
            })
          } else {
            this.$message({
              message: "保存失败",
              type: 'error'
            })
          }
          this.visible = false
          this.$emit('closeVis')
          this.formData = this.resData();
        })
      },
      fillData(id, states, flag) {
        this.visible = true;
        this.flag = flag;
        this.formData.id = id;
        this.formData.states = states;
      },
      resData() {
        return {
          id: '',
          name: '',
          replyExplan: '',
          states: '',
          statesAudit:'0',
        }
      }
    }
  }
</script>

<style scoped>

</style>
