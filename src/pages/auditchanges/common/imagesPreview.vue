<template>
  <div v-if="dialogShow" class="images-preview-box">
    <ul class="images-preview-list">
      <li class="images-preview-item" v-for="(imgItem,index) in imgList" :key="index">
          <img  :src="imgItem.url" alt="">
          <div class="preview-item-hover">
            <i v-if="imgItem.fileType != 'file'" class="preview-hover-open el-icon-zoom-in" @click="zoomImage(imgItem,index)"></i>
            <i v-if="imgItem.fileType== 'file'" class="preview-hover-open el-icon-download" @click="handleFileDown(imgItem.id,imgItem.fileType)"></i>
            <i v-if="operate" class="preview-hover-del el-icon-delete" @click="deleteImage(imgItem.id)"></i>
          </div>
      </li>
    </ul>

    <!--弹框-->
    <el-dialog
      :close-on-click-modal="false"
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
      <div  ref="previewOperateBox" class="preview-operate-box">
        <!--上一张-->
        <i  class="el-icon-arrow-left view-prev-btn" @click="prevButton(currentImgIndex)"></i>
        <!--下一张-->
        <i class="el-icon-arrow-right view-next-btn" @click="nextButton(currentImgIndex)"></i>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {downloadFile,downloadBase64File} from 'src/axios/auditchanges/messageRegister/filesManage'
  import fileUpload from 'js-file-download';

  export default {
    props:{
      imgIdListUnUnique:{ //需要从父组建传入
        type:Array,
        required: true,
        default:function () {
          return []
        }
      },
      refName:'',
      operate:{
        default: true
      },
      limit:{
        default:function () {
          return 5
        }
      }
    },
    data(){
      return{
        imgZoomShow:false,//是否显示弹层
        imgIdList:[],//最后需要去重后的文件id
        imgList:[],//展示的文件集合
        dialogShow:false,
        watchConditionFlag:true,//判断是否走了watch里面获取图片的方法 没走则走mounted里面
        currentImgItem:{},//当前显示的图片对象
        currentImgIndex:'',//当前活跃图片下标
        imgListLength:'',//图片集合总长度
        defaultImg:require('../../../assets/images/file.png')
      }
    },
    methods:{
      refNameUpdate(){
        return this.refName
      },
      //放大图片
      zoomImage(imgItem,index){
        this.currentImgIndex = index ;//保存当前活跃图片位置
        this.currentImgItem = imgItem ;//保存当前活跃图片对象
        this.imgZoomShow = true;
      },
      //删除图片
      deleteImage(imgId){
        //删除图片现实层数据
        this.deleteArrItem(this.imgList,imgId);
        //调整对应需要上传的图片id数组
        this.deleteArrItem(this.imgIdList,imgId);
        this.$emit('imgIdListChange',{'refName':this.refNameUpdate(),'data':this.imgIdList});
        if(this.imgIdList.length <= 0){
          this.dialogShow = false;
        }
      },
      //上一张
      prevButton(index){
        if( index <= 0 ) {
          index = this.imgListLength ;
        }
        index --;
        this.currentImgIndex = index ;//保存当前活跃图片位置
        this.filterCurrentImg(this.currentImgIndex);//保存当前活跃图片对象

      },
      //下一张
      nextButton(index){
        index ++;
        if( index >= this.imgListLength ) {
          index = 0 ;
        }
        this.currentImgIndex = index;//保存当前活跃图片位置
        this.filterCurrentImg(this.currentImgIndex);//保存当前活跃图片对象
      },
      //查询当前位置图片对象
      filterCurrentImg(currentIndex){
        this.imgList.forEach(function (item,index) {
          if(index == currentIndex){
            this.currentImgItem = item ;
          }
        }.bind(this));

      },
      //删除数组中指定位置的数
      deleteArrItem(arr,item){
        for(let i = 0 ; i < arr.length ; i ++) {
          if(arr[i].id){
            if(arr[i].id == item){
              arr.splice(i,1);
              i--
            }
          }
          else{
            if(arr[i] == item){
              arr.splice(i,1);
              i--
            }
          }
        }
      },
      //关闭弹层
      handleCloseZoom(){
        this.imgZoomShow =  false ;
      },
      //数组去重
      uniqueArr(arr){
        //数组去重
        for(var i = 0; i < arr.length-1; i++){
          for(var j = i+1; j < arr.length; j++){
            if(arr[i]==arr[j]){
              arr.splice(j,1);
              j--;
            }
          }
        }
        return arr;
      },
      //图片处理
      getImgData(fileId){
        return downloadBase64File(fileId).then(res=>{
          console.log('downloadBase64Fileres',res)
          if(res.data.success){
            let fileData = res.data.rightBackJson;
            let fileObj = {} ;
            if(fileData.base64){
              fileData.fileType = 'image';
              fileData.url = 'data:application/octet-stream;base64,'+fileData.base64;
            }else{
              fileData.url = this.defaultImg;
              fileData.fileType = 'file';
            }
            fileObj = fileData;
            return fileObj
          }
          else{
            this.$message.error(res.data.exceptionMessage);
            return false
          }
        })
      },
      handleFileDown(fileId,fileType) {
          downloadFile(fileId).then(res => {
            let fileName = res.headers['content-disposition'].split('filename=')[1];
            let contentType = res.headers['content-type'];
            fileName = decodeURI(fileName);
            fileUpload(res.data, fileName, contentType)
          })
      }
    },
    watch:{
      refName(){
        this.refNameUpdate()
      },
      async imgIdListUnUnique(newVal,oldVal){
        //如果存在值
        if(newVal[0]){
          this.watchConditionFlag = false;
          //数据所选择的树节点id集合，并去重
          this.imgIdList = this.uniqueArr(newVal);
          this.imgListLength = this.imgIdList.length;
          let imgList = [];
          if(this.imgListLength > this.limit ){
            this.imgIdList.map(function (item,index) {
              if(index < this.limit ) {
                imgList.push(item)
              }
            });
            this.imgIdList = imgList
          }
          this.$emit('imgIdListChange',{'refName':this.refName,'data':this.imgIdList});
          //用每个id来获取文件
          let that = this;
          const promises = this.imgIdList.map(function (imgFiledId) {
            return that.getImgData(imgFiledId)
          });
          const data = await Promise.all(promises);//读取异步promise
          this.imgList = data;
          this.dialogShow = true;
          console.log(this.imgList)
        }else{
          this.imgList = [];
          this.dialogShow = false;
        }
      }
    },
    async mounted(){
      if(this.watchConditionFlag){
        if(this.imgIdListUnUnique[0]){
          this.watchConditionFlag = false;
          //数据所选择的树节点id集合，并去重
          this.imgIdList = this.uniqueArr(this.imgIdListUnUnique);
          this.imgListLength = this.imgIdList.length;
          let imgList = [];
          if(this.imgListLength > this.limit ){
            this.imgIdList.map(function (item,index) {
              if(index < this.limit ) {
                imgList.push(item)
              }
            });
            this.imgIdList = imgList
          }
          this.$emit('imgIdListChange',{'refName':this.refName,'data':this.imgIdList});
          //用每个id来获取文件
          let that = this;
          const promises = this.imgIdList.map(function (imgFiledId) {
            return that.getImgData(imgFiledId)
          });
          const data = await Promise.all(promises);//读取异步promise
          this.imgList = data;
          this.dialogShow = true;
          console.log(this.imgList)
        }else{
          this.imgList = [];
          this.dialogShow = false;
        }
      }
    }
  }
</script>
<style>
@import "../../../assets/css/auditchanges.css";
</style>
