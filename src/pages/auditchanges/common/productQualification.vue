<template>
  <el-dialog top="2vh" title="产品资质" :visible.sync="visible" :close-on-click-modal="false">
    <div style="width: 500px">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item>
          <!--此处图片排版-->
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer">
      <el-button @click="visible = false">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name: "product-qualification"
  }
</script>

<style scoped>

</style>
