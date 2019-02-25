<template>
  <el-dialog :showClose="false" :visible.sync="visible" width="70%" top="2vh">
    <div>
      <!-- ========================== 主内容start ========================= -->
      <div class="news-detail" v-if="dataForm.id">
        <h2 class="news-title">{{dataForm.leturesTitle}}</h2>
        <p class="news-via">{{dataForm.createDate}}</p>
        <div class="news-content" v-html="dataForm.leturesContents"></div>
        <div class="news-files" v-if="dataForm.realFileName">
          附件: <a href="javascript:;" @click="download(dataForm.id)">
          {{dataForm.realFileName}}</a>
          <i class="el-icon-download"></i>
        </div>
      </div>
      <div class="list-blank" v-if="!dataForm.id">
        <h5>无内容</h5>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {unLoginDownloadLeturesFile, unLoginLeturesView} from "src/axios/management/subsidiary/letures";
  import fileUpload from 'js-file-download'

  export default {
    name: "unlogin-letures-view",
    data() {
      return {
        visible: false,
        dataForm: this.metaForm(),
      }
    },
    methods: {
      metaForm() {
        return {
          id: '',
          leturesTypeId: '',
          leturesTitle: '',
          leturesContents: '',
          realFileName: '',
          createDate: ''
        }
      },
      dataFormView(id) {
        this.visible = true;
        this.dataForm = this.metaForm();
        if (id) {
          unLoginLeturesView(id).then(res => {
            if (res.code == 200) {
              let _arr = res.data.leturesContents.split('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
              let _content = _arr.join('');
              res.data.leturesContents = _content;
              this.dataForm = res.data;
            } else {
              this.$resMessage(res);
            }
          })
        }
      },
      download(id) {
        unLoginDownloadLeturesFile(id).then(res => {
          let contentType = res.headers['content-type'];
          fileUpload(res.data, data.realFileName, contentType)
        });
      }
    }
  }
</script>

<style scoped>

</style>
