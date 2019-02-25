<template>
  <!--上传资质模态框-->
  <el-dialog
    title="上传资质图片"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleClose">
    <el-form v-if="dialogVisible" ref="form" :model="form" label-width="150px">
      <el-form-item label="文件类型：">
        <el-select v-model="form.type" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.ID"
            :label="item.NAME"
            :value="item.ID">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="资质文件:">
        <el-button @click="handleChooseFiles('preLoadBtn')">上传图片</el-button>
      </el-form-item>
      <el-form-item label="">
        <images-preview refName="preLoadBtn" ref="imagesPreview" :imgIdListUnUnique="fromUploadIdList"
                        @imgIdListChange="uploadList"></images-preview>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button type="primary" @click="submitFileList()">提交</el-button>
      <el-button @click="closeVisible()">关闭</el-button>
    </span>
    <choose-files ref="chooseFiles" v-if="chooseFileShow" @handleSelectedFolder="selectedData"></choose-files>
  </el-dialog>
</template>

<script>
  import {findFileTypeList, insertFile} from 'src/axios/auditchanges/messageChanges/productTransfer'
  import imagesPreview from 'src/pages/auditchanges/common/imagesPreview'
  import uploadButton from 'src/pages/auditchanges/common/uploadButton'
  import chooseFiles from 'src/pages/auditchanges/common/chooseFiles';

  export default {
    name: "update-file",
    data() {
      return {
        dialogVisible: false,
        chooseFileShow: false,
        form: this.reqData(),
        type: '',
        options: [],
        btnText: 'fileInput',
        fileType: '1',
        fromUploadIdList: [],
      }
    },
    components: {
      imagesPreview, uploadButton, chooseFiles
    },
    methods: {
      submitFileList() {
        if (this.form.type == '') {
          this.$message({
            message: '请选择文件类型！',
            type: 'error'
          })
        } else {
          this.form.fileIdArray = this.fromUploadIdList;
          console.log(this.form)
          insertFile(this.form).then(res => {
            this.dialogVisible = false;
            if (res.data) {
              this.$message({
                message: '上传成功！',
                type: 'success'
              })
            } else {
              this.$message({
                message: '上传失败！',
                type: 'error'
              })
            }
            this.form = this.reqData()
            this.$emit("refresh");
            this.fromUploadIdList = [];
          })
        }
      },
      closeVisible() {
        this.dialogVisible = false
        this.form = this.reqData();
        this.fromUploadIdList = [];
        this.form = this.reqData()
        this.$emit("refresh");
      },
      getUploadList(data) {
        console.log(data)
        data.forEach(function (item) {
          this.fromUploadIdList.push(item)
        }.bind(this))
      },
      handleClose() {
        this.form = this.reqData()
        this.dialogVisible = false;
      },
      openVisible(id, type) {
        this.dialogVisible = true;
        this.type = type;
        this.form.orgId = id;
        findFileTypeList(this.type).then(res => {
          this.options = res.data;
        })
        //DATA00000000000000326290国内生产企业转产并购
        //DATA00000000000000326291进口药品转国产
        //DATA00000000000000326292进口产品转国内分装
        //DATA00000000000000325048进口产品代理商更新
      },
      reqData() {
        return {
          orgId: '',
          type: '',
          fileIdArray: []
        }
      },
      uploadList(res) {
        console.log(res.data)
        this.fromUploadIdList = res.data
      },
      handleChooseFiles(refName) {
        const tis = this;
        tis.chooseFileShow = true;
        this.$nextTick(() => {
          this.$refs.chooseFiles.initData(refName);
        })
      },
      selectedData(res) {
        console.log(res)
        res.data.forEach(function (item) {
          this.fromUploadIdList.push(item)
        }.bind(this));
      },
    }
  }
</script>

<style scoped>

</style>
