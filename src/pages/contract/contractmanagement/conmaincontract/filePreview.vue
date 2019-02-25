<template>
  <div v-if="dialogShow" class="images-preview-box">
    <ul class="images-preview-list">
      <li class="images-preview-item" v-for="(imgItem,index) in fileObjList" :key="index">
        <img :src="imgItem.url" alt="">
        <div class="preview-item-hover">
        <i v-if="imgItem.fileType != 'file'" class="preview-hover-open el-icon-zoom-in"
        @click="zoomImage(imgItem,index)"></i>
        <i v-if="imgItem.fileType== 'file'" class="preview-hover-open el-icon-download"
        @click="handleFileDown(imgItem.id,imgItem.fileType)"></i>
        <i class="preview-hover-del el-icon-delete" @click="deleteImage(imgItem.id)"></i>
        </div>
      </li>
    </ul>
    <!--弹框-->
    <el-dialog
      :title="currentImgItem.fileName"
      :visible.sync="imgZoomShow"
      :center="true"
      width="100%"
      append-to-body
      class="preview-dialog-box"
      :close="handleCloseZoom">
      <div class="preview-dialog-table">
        <div class="preview-table-cell">
          <!--图片层-->
          <img ref="previewImg" class="preview-dialog-img" :src="currentImgItem.url" alt="">
        </div>
      </div>
      <!--操作层-->
      <div ref="previewOperateBox" class="preview-operate-box">
        <!--上一张-->
        <i class="el-icon-arrow-left view-prev-btn" @click="prevButton(currentImgIndex)"></i>
        <!--下一张-->
        <i class="el-icon-arrow-right view-next-btn" @click="nextButton(currentImgIndex)"></i>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {downloadFile, downloadBase64File} from 'src/axios/auditchanges/messageRegister/filesManage'
  import fileUpload from 'js-file-download';

  export default {
    props: {
      fileIdList: {
        type: Array,
        required: false,
        default: []
      },
    },
    data() {
      return {
        fileObjList: [],
        imgZoomShow: false,//是否显示弹层
        dialogShow: false,
        currentImgItem: {},//当前显示的图片对象
        currentImgIndex: '',//当前活跃图片下标
        defaultImg: require('../../../../assets/images/file.png')
      }
    },
    computed: {
      async distinctFile() {
        let _this = this;
        let fileIdList = _this.fileIdList;
        console.log("fileIdList: ", _this.fileIdList);
        fileIdList = Array.from(new Set(fileIdList));
        let fileNumber = fileIdList.length;
        _this.dialogShow = fileNumber > 0;
        fileIdList = fileNumber > 5 ? fileIdList.slice(0, 5) : fileIdList;
        const promises = fileIdList.map(id => {
          return _this.getImgData(id);
        });
        await Promise.all(promises).then(res => {
          _this.fileObjList = res;
          console.log("await:", res);
        });
      }
    },
    mounted() {
      this.distinctFile;
    },
    methods: {
      //放大图片
      zoomImage(imgItem, index) {
        this.currentImgIndex = index;//保存当前活跃图片位置
        this.currentImgItem = imgItem;//保存当前活跃图片对象
        this.imgZoomShow = true;
      },
      //删除图片
      deleteImage(id) {
        this.fileObjList.splice(this.fileObjList.findIndex(item => item.id === id), 1);
        this.$emit('deleteCallBack', id);
        if (this.fileObjList.length <= 0) {
          this.dialogShow = false;
        }
      },
      //上一张
      prevButton(index) {
        if (index <= 0) {
          index = this.fileObjList.length;
        }
        index--;
        this.currentImgIndex = index;//保存当前活跃图片位置
        this.filterCurrentImg(this.currentImgIndex);//保存当前活跃图片对象
      },
      //下一张
      nextButton(index) {
        index++;
        if (index >= this.fileObjList.length) {
          index = 0;
        }
        this.currentImgIndex = index;//保存当前活跃图片位置
        this.filterCurrentImg(this.currentImgIndex);//保存当前活跃图片对象
      },
      //查询当前位置图片对象
      filterCurrentImg(currentIndex) {
        this.fileObjList.forEach(function (item, index) {
          if (index == currentIndex) {
            this.currentImgItem = item;
          }
        }.bind(this));
      },
      //关闭弹层
      handleCloseZoom() {
        this.imgZoomShow = false;
      },
      //图片处理
      getImgData(fileId) {
        return downloadBase64File(fileId).then(res => {
          if (res.data.success) {
            let fileData = res.data.rightBackJson;
            let fileObj;
            if (fileData.base64) {
              fileData.fileType = 'image';
              fileData.url = 'data:application/octet-stream;base64,' + fileData.base64;
            } else {
              fileData.url = this.defaultImg;
              fileData.fileType = 'file';
            }
            fileObj = fileData;
            return fileObj
          }
          else {
            this.$message.error(res.data.exceptionMessage);
            return false
          }
        })
      },
      handleFileDown(fileId, fileType) {
        downloadFile(fileId).then(res => {
          let fileName = res.headers['content-disposition'].split('filename=')[1];
          let contentType = res.headers['content-type'];
          fileName = decodeURI(fileName);
          fileUpload(res.data, fileName, contentType)
        })
      }
    },
  }
</script>
<style>
  @import "../../../../assets/css/auditchanges.css";
</style>
