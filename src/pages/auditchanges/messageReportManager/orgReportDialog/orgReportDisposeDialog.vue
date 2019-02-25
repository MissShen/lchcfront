<template>
  <el-dialog
    title="企业举报"
    :close-on-click-modal="false"
    :visible.sync="visible"
    width="60%"
    append-to-body>
    <div class="table-form">
      <el-form :model="formData" status-icon ref="formData" label-width="100px" class="demo-ruleForm">
            <el-form-item label="企业名称">
              <span>{{orgMessageName}}</span>
              <a class="blue" @click="openVisi(orgMessageId)">查看企业信息</a>
            </el-form-item>
            <el-form-item label="举报时间">
              {{formData.createDate}}
            </el-form-item>
            <el-form-item label="举报类型">
              <span>{{formData.reporttype=='0'?"基础信息举报":formData.reporttype=='1'?"价格信息举报":formData.reporttype=='2'?"附加信息举报":formData.reporttype=='3'?"其他":""}}</span>
            </el-form-item>
            <el-form-item label="举报内容">
              {{formData.createExplan}}
            </el-form-item>
            <el-form-item label="举报附件">
              <images-preview
                 ref="imagesPreview"
                 refName="jubao"
                :operate="false"
                :imgIdListUnUnique="createFileId"></images-preview>
            </el-form-item>
            <div v-if="this.states >= 2 ">
              <el-form-item label="澄清时间">
                {{formData.clarifyDate}}
              </el-form-item>
            </div>
            <div v-if="this.states >=2">
              <el-form-item label="澄清内容">
                {{this.formData.clarifyExplan}}
              </el-form-item>
            </div>
            <div v-if="this.states >= 2 ">
              <el-form-item label="澄清附件">
                <images-preview
                  ref="imagesPreview"
                  :operate="false"
                  refName="cq"
                  :imgIdListUnUnique="clarifyFileId"></images-preview>
              </el-form-item>
            </div>
      </el-form>
    </div>
    <span slot="footer">
      <el-button type="primary" v-if="this.states ==1 || this.states ==2 " size="small"
                 @click="updateReportStates(2)">审核
      </el-button>
      <el-button type="success" v-if="this.states < 1 " @click="updateReportStates(1)">受理并请企业澄清</el-button>
      <el-button type="danger" v-if="this.states < 1 " @click="updateReportStates(3)">拒绝</el-button>
      <el-button @click="goBack">关闭</el-button>
    </span>
    <org-page ref="orgPage"></org-page>
    <org-reply-dialog ref="orgReplyDialog" v-on:closeVis="goBack()"></org-reply-dialog>
  </el-dialog>
</template>

<script>
  import {
    insertOrgReport,
    findOrgReportById,
    updateReportStates
  } from 'src/axios/auditchanges/messageReportManager/messageReport/orgMessageReport'
  import orgPage from "./orgReport";
  import imagesPreview from 'src/pages/auditchanges/common/imagesPreview'
  import uploadButton from 'src/pages/auditchanges/common/uploadButton'
  import orgReplyDialog from './orgReplyDialog'


  export default {
    name: "org-report-dispose-dialog",
    components: {
      orgPage, imagesPreview, uploadButton, orgReplyDialog
    },
    data() {
      return {
        flag: '',
        states: 0,
        visible: false,
        formData: this.reqData(),
        resData: this.metaData(),
        dialogImageUrl: '',
        dialogVisible: false,
        btnText: 'fileInput',
        fileType: '1',
        fromUploadIdList: [],
        finalUploadIdList: [],
        orgMessageId: '',
        orgMessageName: '',
        orgMessageStates: '',
        createFileId: [],
        clarifyFileId: []
      }
    },
    methods: {
      updateReportStates(states) {
        this.resData.states = states;
        if (states == 1) {
          updateReportStates(this.resData).then(res => {
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
            this.$emit('refresh')
            this.visible = false
            this.resData = this.metaData()
          })
        } else if (states == 3) {
          this.$nextTick(() => {
            this.$refs.orgReplyDialog.fillData(this.resData.id, states, 0)
          })
        } else if (states == 2) {
          this.$nextTick(() => {
            this.$refs.orgReplyDialog.fillData(this.resData.id, states, 1)
          })
        }
      },
      fillData(id, name, states) {
        this.visible = true;
        this.orgMessageId = id;
        this.resData.id = id;
        this.orgMessageName = name;
        this.states = states;
        findOrgReportById(id).then(res => {
          this.formData = res.data;
          this.orgMessageId = res.data.reprotId;
          console.log(this.formData)
          this.createFileId = [];
          this.clarifyFileId = [];
          this.formData.fileObjList.forEach((item) => {
            if (item.useType == '6') {
              this.createFileId.push(item.catFileMessageId)
            } else if (item.useType == '7') {
              this.clarifyFileId.push(item.catFileMessageId)
            }
          })
        })
      },
      getUploadList(data) {
        data = data.data;
        console.log(data, 'cbbcbv');
        data.forEach(function (item) {
          this.fromUploadIdList.push(item)
        }.bind(this))
      },
      uploadList(data) {
        console.log('========从预览里面来的');
        console.log(data);
        this.finalUploadIdList = data;
        this.$watch('finalUploadIdList', function (newVal) {
          this.fromUploadIdList = newVal
        })
      },
      openVisi(id) {
        this.$nextTick(() => {
          this.$refs.orgPage.list(id)
        })
      },
      handleFromView() {
        this.formData.fileIdArray = this.fromUploadIdList
        this.formData.orgId = this.orgMessageId
        insertOrgReport(this.formData).then(res => {
          console.log(res)
          if (res.data == 1) {
            this.$message({
              message: "保存成功",
              type: 'success',
            })
            this.visible = false
          } else {
            this.$message({
              message: "保存失败",
              type: 'error'
            })
          }
        })
      },
      goBack() {
        this.visible = false;
        this.formData = this.reqData();
        this.$emit('refresh')
      },
      reqData() {
        return {
          statesAudit: '0',
          replyExplan: '',
          createExplan: '',
          clarifyExplan: '',
          orgId: '',
          states: '',
          fileIdArray: []
        }
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      metaData() {
        return {
          id: '',
          states: '',
        }
      }
    }
  }
</script>

<style scoped>

</style>
