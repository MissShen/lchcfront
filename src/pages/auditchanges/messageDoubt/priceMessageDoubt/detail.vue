<template>
  <div class="tablebox">
    <el-form ref="form" :model="form">
      <price-details-common ref="priceDetailsCommon"></price-details-common>
      <hr/>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="省份：">
                <span></span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-button type="text">查看产品信息</el-button>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-form-item label="回复时间：">
            <span></span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="质疑内容：">
                <span></span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <img src="C:\Users\wanag\Downloads\0438c8bae0750625e5a20d5810ad9bca.jpg"
                :on-preview="handlePictureCardPreview"/>
              <el-dialog :close-on-click-modal="false" :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-form-item label="回复内容：">
            <span></span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import priceDetailsCommon from 'src/pages/auditchanges/common/priceDetailCommon/priceDetailsCommon'
  import ButtonView from "../../../management/authority/resource/button/buttonView";

  export default {
    name: "detail",
    components: {
      ButtonView,
      priceDetailsCommon
    },
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        form: {},
      }
    },
    created() {
      this.$nextTick(() => {
        this.$refs.priceDetailsCommon.mataData({
          modelFlag: '0',
        })
      });
    },
    methods: {
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
