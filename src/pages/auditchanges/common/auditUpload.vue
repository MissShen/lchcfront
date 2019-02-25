<template>
  <div>
    <!--limit 文件个数-->
    <el-upload
      class="daudit-upload-card"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      list-type="picture-card"
      multiple
      :limit="1"
      :on-exceed="handleExceed">
      <i class="el-icon-plus"></i>
      <!--<el-button size="mini">上传图片</el-button>-->
    </el-upload>
    <el-dialog
      append-to-body
      :close-on-click-modal="false"
      class="audit-img-dialog"
      :visible.sync="previewVisible">
      <img width="100%" :src="uploadUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        previewVisible:false,
        uploadUrl:''
      }
    },
    methods:{
      //删除上传的图片
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      //上传的图片预览
      handlePreview(file) {
        this.uploadUrl=file.url;
        this.previewVisible = true;
      },
      //上传图片限制
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
    }
  }
</script>
<style>
  @import "../../../assets/css/auditchanges.css";
</style>
