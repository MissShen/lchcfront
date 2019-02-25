<template>
  <el-dialog
    title="企业举报"
    :close-on-click-modal="false"
    :visible.sync="visible"
    width="50%"
    append-to-body>
    <div class="table-form">
      <el-form :model="formData" ref="formData" label-width="100px" class="demo-ruleForm">
        <el-row :gutter="24">
          <el-col :span="20">
            <el-form-item label="企业名称">
              <span>{{orgMessageName}}</span>
              <a class="blue" @click="openVisi(orgMessageId)">查看企业信息</a>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="20">
            <el-form-item label="举报时间">
              {{formData.createDate}}
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="20">
            <el-form-item label="举报类型">
              <span>{{formData.reporttype=='0'?"基础信息举报":formData.reporttype=='1'?"价格信息举报":formData.reporttype=='2'?"附加信息举报":formData.reporttype=='3'?"其他":""}}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="20">
            <el-form-item label="举报内容">
              {{formData.createExplan}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="20">
            <el-form-item label="举报附件">
              <images-preview ref="imagesPreview" :operate="false" :imgIdListUnUnique="createFileId"></images-preview>
            </el-form-item>
          </el-col>
        </el-row>


        <el-row :gutter="24">
          <el-col :span="20">
              <el-form-item label="澄清内容">
                <el-input type="textarea" v-model="resData.clarifyExplan"></el-input>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="20">
            <div>
              <el-form-item label="澄清附件">
                <upload-button :buttonFlag="btnText" :fileListFlag='fromUploadIdList' :fileType="fileType"
                               @uploadList="getUploadList"></upload-button>
                <images-preview ref="imagesPreview" :imgIdListUnUnique="fromUploadIdList"
                                @imgIdListChange="uploadList"></images-preview>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <span slot="footer">
      <el-button type="primary" size="small"
           @click="updateReportStates()">澄清
      </el-button>
      <el-button @click="goBack" size="small">关闭</el-button>
    </span>
    <org-page ref="orgPage"></org-page>
  </el-dialog>
</template>

<script>
  import {
    findOrgReportById,
    orgReportCliarify
  } from 'src/axios/auditchanges/messageReportManager/messageReport/orgMessageReport'
  import orgPage from "./orgReport";
  import imagesPreview from 'src/pages/auditchanges/common/imagesPreview'
  import uploadButton from 'src/pages/auditchanges/common/uploadButton'
  import orgReplyDialog from './orgReplyDialog'


  export default {
    name: "org-report-clarify-dialog",
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
      updateReportStates() {
        this.resData.fileIdArray = this.fromUploadIdList
        orgReportCliarify(this.resData).then(res => {
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
          this.resData = this.metaData()
        })
      },
      fillData(id, name, states) {
        this.visible = true;
        this.orgMessageId = id;
        this.resData.id = id;
        this.orgMessageName = name;
        this.states = states;
        findOrgReportById(id).then(res => {
          console.log(res.data)
          this.formData = res.data;
          this.createFileId = [];
          this.clarifyFileId = [];
          this.formData.fileObjList.forEach((item) => {
            if (item.useType == '6') {
              this.createFileId.push(item.catFileMessageId)
            } else if (item.useType == '7') {
              this.clarifyFileId.push(item.catFileMessageId)
            }
          })
          this.resData.reportId = res.data.id;
        })
      },
      getUploadList(data) {
        data = data.data;
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
      goBack() {
        this.visible = false;
        this.$emit('closeVis')
        this.formData = this.reqData();
      },
      reqData() {
        return {
          id: '',
          statesAudit: '0',
          replyExplan: '',
          createExplan: '',
          clarifyExplan: '',
          orgId: '',
          states: '',
          fileObjList: [],
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
          reportId: '',
          states: 1,
          clarifyExplan: '',
          fileIdArray: []
        }
      }
    }
  }
</script>

<style scoped>

</style>
