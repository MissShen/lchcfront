<template>
  <el-dialog
    :title="'请复制下列文本'"
    :close-on-click-modal="false"
    width="25%"
    :visible.sync="visible">
    <el-form>
      <el-row>
        <el-form-item>
          <el-input type="textarea" v-model="productCode" ></el-input>
        </el-form-item>
      </el-row>
    </el-form>
    <span slot="footer">
      <el-button size="small" @click="visible = false">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        visible: false,
        productCode: undefined
      }
    },
    methods: {
      //  启动窗口
      initWindows(code){
        this.visible = true;
        this.productCode=code;
      }
    }
  }
</script>

