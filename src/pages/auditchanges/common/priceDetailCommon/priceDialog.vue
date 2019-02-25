<template>
  <el-dialog
    title="质疑列表"
    :close-on-click-modal="false"
    :visible.sync="visible"
    width="30%">
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
      </el-table-colum>
    </el-table>
    <span>澄清内容：</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible=false">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        resData: this.metaData(),
        visible: false
      }
    },
    methods: {
      fillData() {
        this.visible=true
      },
      metaData(){
        return{

        }
      },
      list(){

      }
    }
  }
</script>

<style scoped>

</style>
