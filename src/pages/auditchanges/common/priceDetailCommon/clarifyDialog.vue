<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="visible"
    width="70%">
    <el-row :gutter="24">
      <el-col :span="24">
        <el-table
          border style="width: 100%">
          <el-table-colum
            label="质疑人"
            width="25%">
          </el-table-colum>
          <el-table-colum
            label="质疑内容"
            width="25%">
          </el-table-colum>
          <el-table-colum
            label="质疑时间"
            width="25%">
          </el-table-colum>
          <el-table-colum
            label="查看图片"
            width="25%">
            <el-button>查看</el-button>
          </el-table-colum>
        </el-table>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="18">
        <el-form-item label="澄清内容">
          <el-input type="textarea" :rows="8"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible=false">关 闭</el-button>
      <el-button @click="visible=false">保 存</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        resData: this.metaData(),
        visible: false,
        imageUrl:'',
      }
    },
    methods: {
      fillData() {
        this.visible = true
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      metaData() {
        return {}
      },
      list() {

      }
    }
  }
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
