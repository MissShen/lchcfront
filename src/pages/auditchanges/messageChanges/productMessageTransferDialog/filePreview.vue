<template>
  <!--上传资质模态框-->
  <el-dialog
    title="资质图片"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleClose">
    <el-form ref="form" label-width="150px" label-position="left">
        <div v-if="imageList == null || imageList == '' || imageList == undefined">
          <h1>暂无资质图片</h1>
        </div>
      <div v-if="imageList != null || imageList != '' || imageList != undefined">
          <div v-for="item in imageList">
            <el-form-item label="文件类型：">
              <span>{{item.typeName}}</span>
            </el-form-item>
            <el-form-item label="资质文件:">
              <images-preview refName="preLoadBtn" ref="imagesPreview" :imgIdListUnUnique="item.fileIdArray"
                              @imgIdListChange="uploadList"></images-preview>
            </el-form-item>
          </div>
        </div>
      </el-form>
    <span slot="footer">
      <el-button @click="closeVisible()">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {findQualificationList} from 'src/axios/auditchanges/messageChanges/productTransfer'
  import imagesPreview from 'src/pages/auditchanges/common/imagesPreview'
  import uploadButton from 'src/pages/auditchanges/common/uploadButton'
  import chooseFiles from 'src/pages/auditchanges/common/chooseFiles';

  export default {
    name: "file-preview",
    data() {
      return {
        dialogVisible: false,
        chooseFileShow: false,
        form: '',
        type: '',
        btnText: 'fileInput',
        fileType: '1',
        fromUploadIdList: [],
        imageList: []
      }
    },
    components: {
      imagesPreview, uploadButton, chooseFiles
    },
    methods: {
      openVisible(id, type) {
        this.dialogVisible = true;
        this.$nextTick(()=>{
          findQualificationList(id).then(res => {
            for(let i in res.data){
              this.$set(this.imageList,i,res.data[i])
            }
            console.log('----imageList',this.imageList)
          })
        })
      },
      closeVisible() {
        this.dialogVisible = false
      },
      handleClose() {
        this.dialogVisible = false;
      },
      uploadList(res) {
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
        res.data.forEach(function (item) {
          this.fromUploadIdList.push(item)
        }.bind(this));
      },
    }
  }
</script>

<style scoped>

</style>
