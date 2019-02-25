<template>
  <el-dialog
    title="企业举报"
    :close-on-click-modal="false"
    :visible.sync="visible"
    width="50%"
    append-to-body>
    <div class="">
      <el-form :model="formData" ref="formData" :rules="rules" label-position="left" label-width="100px" class="demo-ruleForm" size="small">
        <el-form-item label="企业名称">
          <span>{{orgMessageName}}</span>
          <a class="blue" @click="openVisi(orgMessageId)">查看企业信息</a>
        </el-form-item>
        <el-form-item label="举报类型" prop="content">
          <el-radio v-model="formData.type" label="0">基础信息举报</el-radio>
          <el-radio v-model="formData.type" label="2">附加信息举报</el-radio>
          <el-radio v-model="formData.type" label="3">其他</el-radio>
        </el-form-item>
        <el-form-item label="举报内容" prop="createExplan">
          <el-input v-model="formData.createExplan" type="textarea" class="width-420"></el-input>
        </el-form-item>
        <el-form-item label="举报附件">
          <!--<el-button >上传图片</el-button>-->
          <upload-button
            :buttonFlag="btnText"
            :fileListFlag='fromUploadIdList'
            :fileType="fileType"
            @uploadList="getUploadList"></upload-button>
          <images-preview
            :refName="btnText"
            ref="imagesPreview"
            :imgIdListUnUnique="fromUploadIdList"
            @imgIdListChange="uploadList"></images-preview>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer">
      <el-button @click="goBack">关闭</el-button>
      <el-button type="primary" @click="handleFromView('formData')">提交</el-button>
    </span>
    <org-page ref="orgPage"></org-page>
  </el-dialog>
</template>

<script>
  import {
    insertOrgReport,
  } from 'src/axios/auditchanges/messageReportManager/messageReport/orgMessageReport'
  import orgPage from "./orgReport";
  import imagesPreview from 'src/pages/auditchanges/common/imagesPreview'
  import uploadButton from 'src/pages/auditchanges/common/uploadButton'


  export default {
    name: "org-report",
    components: {
      orgPage, imagesPreview, uploadButton
    },
    data() {
      return {
        flag: '',
        visible: false,
        formData: this.reqData(),
        dialogImageUrl: '',
        dialogVisible: false,
        btnText: 'fileInput',
        fileType: '1',
        fromUploadIdList: [],
        finalUploadIdList: [],
        orgMessageId: '',
        orgMessageName: '',
        orgMessageStates: '',
        rules:{
          createExplan:{required: true, message: '请输入举报内容', trigger: 'blur'}
        }
      }
    },
    methods: {
      fillData(id, name) {
        this.visible = true;
        this.orgMessageId = id;
        this.orgMessageName = name;
      },
      getUploadList(data) {
        data = data.data;
        data.forEach(function (item) {
          this.fromUploadIdList.push(item)
        }.bind(this))
      },
      uploadList(data) {
        console.log(data);
        this.fromUploadIdList = data.data;
      },
      openVisi(id) {
        this.$nextTick(() => {
          this.$refs.orgPage.list(id)
        })
      },
      handleFromView(formName) {
        this.formData.fileIdArray = this.fromUploadIdList
        this.formData.orgId = this.orgMessageId
        console.log(this.formData)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            insertOrgReport(this.formData).then(res => {
              console.log(res)
              if (res.data == 1) {
                this.$message({
                  message: "保存成功",
                  type: 'success',
                })
                this.$router.go(-1)
              } else {
                this.$message({
                  message: "保存失败",
                  type: 'error'
                })
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      goBack() {
        this.visible = false;
        this.formData = this.reqData();
      },
      reqData() {
        return {
          statesAudit: '0',
          replyExplan: '',
          createExplan: '',
          clarifyExplan: '',
          orgId: '',
          states: '',
          type:'0',
          fileIdArray: []
        }
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    }
  }
</script>

<style scoped>

</style>
