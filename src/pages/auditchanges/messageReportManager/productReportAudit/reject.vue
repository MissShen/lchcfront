<template>
  <el-dialog
    width="50%"
    :close-on-click-modal="false"
    :visible.sync="visible"
    append-to-body
  >
    <div>

      <!-- 表格 -->
      <!--<div class="main">-->
        <el-form ref="dataForm" :model="dataForm" :rules="dataRule" @keyup.enter.native="submit()" label-width="100px" size="small" label-position="left">

          <el-row>
            <el-col :span="24">
              <el-form-item label="回复内容" prop="REPLYEXPLAN">
                <el-input type="textarea" :rows = "3" v-model="dataForm.REPLYEXPLAN" placeholder="请输入回复内容" class="w40"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
      <!--</div>-->
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" type="primary" @click="submit()">提交</el-button>
      <el-button size="small" @click="goBack" >关闭</el-button>
    </span>
    <find-product-message ref="findProductMessage"></find-product-message>
  </el-dialog>
</template>
<script>

  import {updateReply} from 'src/axios/auditchanges/messageReportManager/messageReport/productReport'
  export default {
    components: {

    },
    data() {
      return {
        visible: false,
        reportId: '',
        dataForm: this.metaDataForm(),
        dataRule: this.metaRule(),

      }
    },
    created () {
    },
    methods: {
      metaDataForm(){
        return{
          "CONTENT":'',
          "FILEPATH":'',
          "REPLYEXPLAN":''
        }
      },
      metaRule() {
        return {
          REPLYEXPLAN: [
            { required: true, message: '回复内容不能为空', trigger: 'blur' }
            /*{ min: 1, max:10, message: '菜单名称长度大于1小于10', trigger: 'blur' }*/
          ],
        }
      },
      //上传文件里的方法
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      goAnchor(selector) {
        var anchor = this.$el.querySelector(selector)
        document.body.scrollTop = anchor.offsetTop; // chrome
        document.documentElement.scrollTop = anchor.offsetTop; // firefox
      },
      fillData(id) {
        this.visible=true;
        this.reportId=id;
      },
      submit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$confirm('确认回复不可修改，是否确定完成此操作?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              updateReply(this.dataForm, this.reportId)
              // this.$router.go(-1)
              window.location.reload();
            })
          }
        })
      },
      goBack() {
        this.visible = false;
      }
    }
  }
</script>
<!--<style>
  .side{
    position: absolute;
    width: 150px;
    margin: 0;
    padding: 0;
  }
  .side > li > a{
    display: block;
    margin:20px 0;
    padding-left:15px;
    border-right:4px solid #fff;
    line-height:20px;
    cursor:pointer;
    font-size:14px;
    color:#333;
  }
  .side > li > a.current{
    display: block;
    border-right:4px solid #333;
    font-size:16px;
    cursor:default;
  }
  .scroll-content{
    margin-left: 150px;
    margin-bottom: 20px;
    width: 100%;
    border-left: 1px solid #e6e6e6;
  }
  .el-input__inner {
    width:300px !important;
  }
  .el-textarea__inner{
    width:300px !important;
  }
  .fundInput .el-input__inner,fundInput .el-input&#45;&#45;suffix{
    width:140px !important;
  }
  .icon-center{
    vertical-align: middle;
    line-height: 32px;
  }
  .btn-mar{
    display: block;
    margin:20px 0 20px 100px;
  }
  .el-dialog {
    width: 80% !important;
  }
</style>-->
