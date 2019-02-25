<template>
  <el-dialog
    title="企业举报"
    :close-on-click-modal="false"
    :visible.sync="visible"
    width="50%"
    append-to-body>
    <!--<div class="table-form">-->
      <el-form :model="formData" ref="formData" label-width="100px" class="demo-ruleForm">
        <el-form-item label="企业名称">
          <span>{{orgMessageName}}</span>
          <a class="blue" @click="openVisi(orgMessageId)">查看企业信息</a>
        </el-form-item>
        <el-form-item label="举报时间">
          {{formData.createDate}}
        </el-form-item>
        <el-form-item label="举报类型">
          {{formData.REPORTTYPE}}
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

        <div v-show="formData.clarifyDate != undefined ||formData.clarifyDate != null">
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
        </div>

        <div v-if="this.states >=3 ">
          <el-form-item label="回复时间">
            {{formData.replyDate}}
          </el-form-item>
        </div>
        <div v-if="this.states >= 3 ">
          <el-form-item label="回复内容">
            {{formData.replyExplan}}
          </el-form-item>
        </div>
        <div v-if="this.states == 4 ">
          <el-form-item label="举报是否有效">
            <el-radio disabled v-model="formData.statesAudit" label="1">是</el-radio>
            <el-radio disabled v-model="formData.statesAudit" label="0">否</el-radio>
          </el-form-item>
        </div>
      </el-form>
    <!--</div>-->
    <span slot="footer">
      <el-button @click="goBack" size="small">关闭</el-button>
    </span>
    <org-page ref="orgPage"></org-page>
  </el-dialog>
</template>

<script>
  import {
    insertOrgReport,
    findOrgReportById
  } from 'src/axios/auditchanges/messageReportManager/messageReport/orgMessageReport'
  import orgPage from "../orgReportDialog/orgReport";
  import imagesPreview from 'src/pages/auditchanges/common/imagesPreview'
  import uploadButton from 'src/pages/auditchanges/common/uploadButton'

  export default {
    name: "report-details-dialog",
    components: {
      orgPage, imagesPreview, uploadButton
    },
    data() {
      return {
        flag: '',
        states: 0,
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
        createFileId: [],
        clarifyFileId: []
      }
    },
    methods: {
      fillData(id, name, states) {
        this.visible = true;
        this.orgMessageId = id;
        this.orgMessageName = name;
        this.states = states;
        this.createFileId = [];
        this.clarifyFileId = [];
        findOrgReportById(id).then(res => {
          this.formData = res.data;
          this.orgMessageId = res.data.reprotId;
          this.formData.fileObjList.forEach((item) => {
            if (item.useType == '6') {
              this.createFileId.push(item.catFileMessageId)
            } else
              if (item.useType == '7') {
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
      goBack() {
        this.visible = false;
        this.formData = this.reqData();
      },
      reqData() {
        return {
          statesAudit: '1',
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
      }
    }
  }
</script>

<style scoped>

</style>
