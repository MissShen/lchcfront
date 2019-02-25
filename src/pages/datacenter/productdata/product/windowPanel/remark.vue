<template>
  <el-dialog
    :title="'请填写备注信息'"
    :close-on-click-modal="false"
    width="25%"
    :visible.sync="visible">
    <el-form>
      <el-row>
        <el-form-item>
          <el-input type="textarea" v-model="remark" ></el-input>
        </el-form-item>
      </el-row>
    </el-form>

    <span slot="footer">
      <el-button size="small" type="primary" @click="saveRemark()">确定</el-button>
      <el-button size="small" @click="visible = false">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
  // 引入用户相关请求
  import {addRemark} from 'src/axios/datacenter/productdata/productinfo/productinfo';

  export default {
    data() {
      return {
        visible: false,
        remark: undefined,
        ids:undefined
      }
    },
    methods: {
      //  启动窗口
      initWindow(ids){
        this.visible = true;
        this.ids=ids;
      },
      //  保存备注信息
      saveRemark(){
        if(typeof (this.remark)!='undefined'&& this.remark!=null){
          addRemark(this.ids,this.remark).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
              this.visible = false;
               }
            })
          })
        }
      }
    }
  }
</script>

