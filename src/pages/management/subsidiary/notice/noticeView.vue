<template>
  <el-dialog title="公告详情" :visible.sync="visible" width="60%" top="2vh">
    <div v-if="permData.notice_view">
      <!-- ========================== 主内容start ========================= -->
        <div class="news-detail" v-if="dataForm.sysNotice.id">
          <h2 class="news-title">{{dataForm.sysNotice.noticeTitle}}</h2>
          <p class="news-via">{{dataForm.sysNotice.releaseTime}}</p>
          <p class="news-content" v-html="dataForm.sysNotice.noticeContent"></p>
          <div class="news-files" v-for="(noticeFile,index) in dataForm.noticeFileList">
            附件地址{{index+1}}: <a href="#">{{noticeFile.name}}</a>
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
  import {noticeView,downloadNoticeFile} from "src/axios/management/subsidiary/notice";
  import {mapGetters} from 'vuex'
  import fileUpload from 'js-file-download'

  export default {
    name: "notice-view",
    computed: {
      ...mapGetters([
        'perms',
      ]),
    },
    data() {
      return {
        dataForm: this.metaForm(),
        permData: this.metaPerm(), // 权限初始化
        visible:false
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
        this.metaHasPerm();
        if (this.permData.notice_view) {
          this.dataForm.sysNotice.id = id || undefined;
          this.visible=true;
          if (id) {
            noticeView(id).then(res => {
              let _arr = res.data.sysNotice.noticeContent.split('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
              let _content = _arr.join('');
              res.data.sysNotice.noticeContent = _content;
              this.dataForm = res.data;
            })
          }
        }

      },
      metaPerm() {
        return {
          notice_view: false,
        }
      },
      metaHasPerm() {
        this.permData.notice_view = this.perms['sys:notice:view'];
      },
      downLoad(noticeFile) {
        downloadNoticeFile(noticeFile.id).then(res=>{
          let fileName=res.headers['content-disposition'].split('filename=')[1];
          let contentType=res.headers['content-type'];
          fileUpload(res.data,fileName.substr(1,fileName.length-2),contentType)
        });
      },

    }
  }
</script>

