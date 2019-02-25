<template>
  <div>
    <el-dialog
      title="帮助"
      :visible.sync="visible"
      width="50%">
      <div class="help-from">
       <img src="../assets/images/icon-blank.png"/>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
export default {
  name: "HelpFrom",
 data(){
    return {
      visible: false
    }
  },
  methods: {
    handleForm(){
      this.visible = true;
    }
  }
}
</script>
