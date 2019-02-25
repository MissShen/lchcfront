<template>
  <div>
    <el-button size="small" @click="handleUpload">
      上传文件
    </el-button>
    <input type="file" :id="buttonFlag" multiple="multiple" @change="getFile($event)" style="display:none;">
  </div>
</template>
<script>
  import {uploadFileForWeb} from 'src/axios/auditchanges/messageRegister/filesManage'
  export default {
    props:{
      //buttonFlag需要动态传入 并且确保该值唯一并且，非数字Number类型
      buttonFlag:{
        default:'inputBtn'
      },
      fileType:'',//上传文件所属类型 由父组建按当前页面需求动态传入
      fileListFlag:{
        default:function () {
          return []
        }
      },//用于存储上传文件的个数
      defineName:{
        default:function () {
          return {}
        }
      },
      limit:{
        default:function (){
          return 5
        }
      },
      fileKind:{
        default:function () {
          return 0
        }
      }//1=>.png/.jpeg/.jpg/.BMP/.gif   2=>.xls/.xlsx    3=》.docx/.doc   4=》pdf
    },
    data(){
      return{
        fileListInner:[],
        judgeSameFile:'',
      }
    },
    watch:{
      fileListFlag(){
        this.update()
      },
      buttonFlag(){
        this.updateButtonFlag()
      },
      defineName(){
        this.watchDefineName()
      },
      fileKind(){
        this.watchFileKind()
      }
    },
    methods:{
      watchFileKind(){
        return this.fileKind
      },
      updateButtonFlag(){
        return this.buttonFlag
      },
      update(){
        return this.fileListFlag
      },
      handleUpload() {
        let obj = document.getElementById(this.buttonFlag).click();
      },
      watchDefineName(){
        return this.defineName
      },
      handleFile(){
        let files = event.target.files;
        console.log(files[0])
        let imageExp = /\.png|\.jpeg|\.jpg|\.BPM|\.gif/ig;
        let excelExp = /\.xls|\.xlsx/ig;
        let wordExp = /\.doc|\.docx/ig;
        let pdfExp = /\.pdf/ig;
        let fileLimit = [];
        let formData = new FormData();
        // for (let keyItem of files){
        //   if(keyItem){
        //     fileLimit.push(keyItem);
        //   }
        // }
        // //如果一次5张以上
        // if( fileLimit.length > this.limit){
        //   fileLimit.map(function (item,index) {
        //     if(index < this.limit){
        //       //限制上传大小
        //       if(item.size > 2*1024*1000){
        //         this.$message.warning(`上传单个文件${item.name}文件大于2M,请重新上传`)
        //       }
        //       else{
        //
        //         formData.append('files', item);
        //       }
        //     }
        //   }.bind(this));
        //   this.$message.warning(`当前限制选择 5 个文件,本地选择了${fileLimit.length}个，已超${fileLimit.length-5}个`)
        // }
        // else{
          //非一次上传
          let index = 0;
          for (let f of files) {
            if(index < this.limit){
              index ++ ;
            }else{
              this.$message.warning(`当前限制选择 ${this.limit} 个文件`)
              break ;
            }
            if(f.size > 2*1024*1000){
              this.$message.warning(`上传的文件${f.name}文件大于2M,请重新上传`)
            } else{
              let hz = f.name.slice(f.name.lastIndexOf("."),f.name.length);
              if(this.fileKind == 1){
                imageExp.lastIndex = 0;
                if(!imageExp.test(hz)){
                  this.$message.warning('当前文件仅限为图片');
                  return;
                }
              }else if(this.fileKind == 2){
                excelExp.lastIndex = 0;
                if(!excelExp.test(hz)){
                  this.$message.warning('当前文件仅限为excel');
                  return;
                }
              }else if(this.fileKind == 3){
                wordExp.lastIndex = 0;
                if(!wordExp.test(hz)){
                  this.$message.warning('当前文件仅限为word');
                  return;
                }
              }else if(this.fileKind == 4){
                pdfExp.lastIndex = 0;
                if(!pdfExp.test(hz)){
                  this.$message.warning('当前文件仅限为pdf');
                  return;
                }
              }
              formData.append('files', f);
            }
          }

        //当且仅当这个文件值 即长度非0时走上传
        if(files.length){
          if(formData.get('files')){
            let fileName = [];
            for (let f of files) {
              fileName.push(f.name)
            }
            this.$emit('getFileCount',{'refName':this.updateButtonFlag(),'fileName':fileName});
            if(Object.keys(this.watchDefineName()).length > 0){
              uploadFileForWeb(this.fileType,formData,this.watchDefineName()).then(res => {
                if (res.data.success) {
                  this.$emit('uploadList',{'refName':this.updateButtonFlag(),'data':res.data.rightBackJson})
                } else {
                  this.$message.error(res.data.exceptionMessage);
                }
              })
            }
            else{
              uploadFileForWeb(this.fileType,formData).then(res => {
                if (res.data.success) {
                  this.$emit('uploadList',{'refName':this.updateButtonFlag(),'data':res.data.rightBackJson})
                } else {
                  this.$message.error(res.data.exceptionMessage);
                }
              })
            }

          }
        }
      },
      getFile(event) {
        let fileLimtArr = this.update();
        let limitLen = fileLimtArr.length;
        if(limitLen == this.limit ) {
          this.$message.warning(`当前限制选择${this.limit}个文件`)
        }else{
          this.handleFile();
        }
        //清除上次的值 以防连续点击同一文件不出发change事件
        event.target.value = ''
      }
    }
  }
</script>
