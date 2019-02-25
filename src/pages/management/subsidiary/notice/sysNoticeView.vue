<template>
  <el-dialog title="公告详情" :visible.sync="visible" width="60%" top="2vh">
    <div>
      <!-- ========================== 主内容start ========================= -->
      <div class="news-detail" v-if="dataForm.sysNotice.id">
        <h2 class="news-title">{{dataForm.sysNotice.noticeTitle}}</h2>
        <p class="news-via">{{dataForm.sysNotice.releaseTime}}</p>
        <div class="news-content" v-html="dataForm.sysNotice.noticeContent"></div>
        <div class="news-files" v-for="(noticeFile,index) in dataForm.noticeFileList">
          附件地址{{index+1}}: <a href="javascript:;" @click="downLoad(noticeFile)">{{noticeFile.name}}</a>
          <i class="el-icon-download" @click="downLoad(noticeFile)"></i>
        </div>
      </div>
      <div class="list-blank" v-if="!dataForm.sysNotice.id">
        <h5>无内容</h5>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
  import {unLoginNoticeView, unLoginDownloadFile} from "src/axios/management/subsidiary/notice";
  import fileUpload from 'js-file-download'

  export default {
    name: "sys-notice-view",
    data() {
      return {
        dataForm: this.metaForm(),
        visible: false
      }
    },
    methods: {
      metaForm() {
        return {
          noticeFileList: [],
          sysNotice: {
            id: '0',
            noticeTitle: '',
            noticeContent: '',
            releaseTime: '',
          }
        }
      },
      metaList(id) {
        this.dataForm.sysNotice.id = id || undefined;
        this.visible = true;
        if (id) {
          unLoginNoticeView(id).then(res => {
            // 处理用户自定义过多空格
            let _arr = res.data.sysNotice.noticeContent.split('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
            let _content = _arr.join('');
            res.data.sysNotice.noticeContent = _content;
            this.dataForm = res.data;
          })
        }
      },
      downLoad(noticeFile) {
        unLoginDownloadFile(noticeFile.id).then(res => {
          let contentType = res.headers['content-type'];
          fileUpload(res.data, noticeFile.name, contentType)
        });
      },

    }
  }
</script>

<style>
  @import "../../../../assets/css/login.css";
</style>
