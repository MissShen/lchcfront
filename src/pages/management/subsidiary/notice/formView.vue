<template>
  <div style="width: 800px; padding: 20px 20px 60px;"
       v-if="permData.notice_upd||permData.notice_add||permData.notice_view">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="100px" size="small">
      <el-form-item label="公告标题：" prop="noticeTitle">
        <el-input v-model="dataForm.noticeTitle" class="w100"></el-input>
      </el-form-item>
      <el-form-item label="公告类别：" prop="noticeType">
        <el-select v-model="dataForm.noticeType" placeholder="选择类别" class="w100">
          <el-option v-for="noticeType in noticeTypeList" :key="noticeType.id" :label="noticeType.noticeTypeName"
                     :value="noticeType.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="阅读对象：" prop="readerTypeList">
        <div class="form-inline">
              <span>
                <el-checkbox v-model="checkReaderTypeAll"
                             @change="handleCheckAllReaderType">全部</el-checkbox>
              </span>
          <span>
                <el-checkbox-group v-model="dataForm.readerTypeList" @change="handleCheckedReaderType">
                  <el-checkbox
                    v-for="noticeType in readerTypeDataList"
                    :key="noticeType.value"
                    :label="noticeType.value">
                    {{noticeType.label}}
                  </el-checkbox>
                </el-checkbox-group>
              </span>
        </div>
      </el-form-item>
      <el-form-item label="所属系统：" prop="ascriptionSysList">
        <div class="form-inline">
              <span>
                <el-checkbox v-model="checkAscriptionSysAll"
                             @change="handleCheckAllSys">全部</el-checkbox>
              </span>
          <span>
                <el-checkbox-group v-model="dataForm.ascriptionSysList" @change="handleCheckedSys">
                  <el-checkbox
                    v-for="busSys in busSysDataList"
                    :key="busSys.value"
                    :label="busSys.value">
                    {{busSys.label}}
                  </el-checkbox>
                </el-checkbox-group>
              </span>
        </div>
      </el-form-item>
      <el-form-item label="发布时间：" prop="releaseTime">
        <el-date-picker
          v-model="dataForm.releaseTime"
          type="datetime"
          format="yyyy-MM-dd hh:mm:ss"
          value-format="yyyy-MM-dd hh:mm:ss"
          :editable="false"
          class="w100"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="发布状态：" prop="releaseStatus">
        <el-select v-model="dataForm.releaseStatus" placeholder="请选择" class="w100">
          <el-option value="1" label="保存"></el-option>
          <el-option value="2" label="发布"></el-option>
          <el-option value="3" label="撤销"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发布内容：" prop="noticeContent">
        <n-editor v-model="dataForm.noticeContent" :config="config" style="position: relative;z-index: 0"/>
      </el-form-item>
      <el-form-item label="附件：">
        <input type="file" id="noticeFile" multiple="multiple" @change="getFile($event)">
        <div class="files-item" v-for="(noticeFile,index) in  noticeFileList">
          附件地址{{index+1}}: <a href="#">{{noticeFile.name}}</a>
          <i class="el-icon-close" @click="handleRemove(noticeFile)"></i>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button size="small"
                   type="success"
                   v-if="permData.notice_add||permData.notice_upd"
                   @click="submitForm($event)">提交
        </el-button>
        <el-button size="small" type="warning" @click="goBack">返回</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import {
    noticeView,
    noticeFileDelete,
    noticeFileList,
    noticeSave,
    noticeUpdate
  } from "src/axios/management/subsidiary/notice";
  import {noticeTypeAllList} from "src/axios/management/subsidiary/noticeType";
  import {enumOrgTypeList, enumBusSysList} from "src/axios/common/common";
  import {mapGetters} from 'vuex'
  import NEditor from 'src/components/n-editor/n-editor'

  export default {
    name: "form-view",
    components: {
      NEditor
    },
    computed: {
      ...mapGetters([
        'perms',
      ]),
    },
    data() {
      return {
        dataForm: this.metaForm(),
        dataRule: this.metaRule(),
        permData: this.metaPerm(), // 权限初始化
        editorSetting: {
          height: 400,
        },
        config: {
          UEDITOR_HOME_URL: "../../../../static/n-editor/",
          toolbars:
            [['fullscreen',    // 全屏
              'source',        // 源码
              'undo',          // 撤销
              'redo',          // 重做
              'bold',          // 加粗
              "italic",        // 斜体
              "underline",     // 下划线
              "indent", //首行缩进
              "justifyleft", //左对齐
              "justifycenter", //居中对齐
              "justifyright", //右对齐
              "justifyjustify",//两端对齐
              "anchor",   // 锚点
              "fontborder",    // 字符边框
              "strikethrough", // 删除线
              "removeformat",  // 清除格式
              "pasteplain",    // 纯文本
              "forecolor",      // 字体颜色
              "insertorderedlist",    // 有序列表
              "insertunorderedlist", // 无序列表
              "searchreplace", // 查找替换
              "paragraph",   // 段落格式
              "fontfamily", // 字体类型
              "fontsize", //字体大小
              "link",  //链接
              "unlink", // 取消链接
              "horizontal", //分割线
              "date",   //日期
              "time", //时间
              "inserttable", //插入表格
              "spechars", // 特殊字符
            ]],
          sourceEditor: "codemirror",
          initialFrameWidth: '100%',
          initialFrameHeight: 320,
          wordCount: false,
          autoFloatEnabled: true,
          enableDragUpload: true,   // 启用拖拽上传
          enablePasteUpload: true,  // 启用粘贴上传
          imageScaleEnabled: true,  // 启用 图片拉伸缩放
          elementPathEnabled: false, // 关闭元素路径
          catchRemoteImageEnable: true, // 开启远程抓取图片
          allHtmlEnabled: true, //提交附带html字符串
        },
        noticeFileList: [], // 附件列表
        noticeTypeList: [], // 公告类型列表
        checkReaderTypeAll: false, //是否全选阅读对象
        readerTypeCheckedAllList: this.metaReaderTypeCheckedAll(), //阅读对象全选列表
        readerTypeDataList: undefined, // 阅读对象列表

        checkAscriptionSysAll: false, //是否全选所属系统
        ascriptionSysCheckedAllList: this.metaAscriptionSysCheckedAll(), //所属系统全选列表
        busSysDataList: undefined,//系统列表
        file: []
      }
    },
    created() {
      this.metaHasPerm();
      if (this.permData.notice_view || this.permData.notice_upd || this.permData.notice_add) {
        noticeTypeAllList().then(res => {
          this.noticeTypeList = res.data
        });
        let nid = this.$route.params.nid;
        if (nid === undefined || nid === 'undefined') {
          this.dataForm.id = undefined;
        } else {
          this.dataForm.id = nid;
        }
        if (this.dataForm.id) {
          this.metaList();
        }
      }
    },
    methods: {
      metaReaderTypeCheckedAll() {
        let readerType = [];
        enumOrgTypeList().then(res => {
          this.readerTypeDataList = res.data;
          for (let readerTypeData of res.data) {
            readerType.push(readerTypeData.value)
          }
        });
        return readerType
      },
      metaAscriptionSysCheckedAll() {
        let busSysData = [];
        enumBusSysList().then(res => {
          this.busSysDataList = res.data;
          for (let busSys of res.data) {
            busSysData.push(busSys.value)
          }
        });
        return busSysData
      },
      metaForm() {
        return {
          id: undefined,
          noticeTitle: '',
          noticeContent: '',
          noticeType: '',
          releaseTime: '',
          releaseStatus: '',
          readerType: '',
          isTop: '0',
          ascriptionSys: '',
          readerTypeList: [],
          ascriptionSysList: [],
        }
      },
      metaRule() {
        return {
          noticeTitle: [
            {required: true, message: '公告标题不能为空', trigger: 'blur'},
            {min: 1, max: 40, message: '名称长度大于1小于40', trigger: 'blur'}
          ],
          noticeType: [
            {required: true, message: '公告类型不能为空', trigger: 'blur'},
          ],
          releaseTime: [
            {required: true, message: '发布时间不能为空', trigger: 'blur'},
          ],
          ascriptionSysList: [
            {required: true, message: '所属系统不能为空', trigger: 'blur'},
          ],
          readerTypeList: [
            {required: true, message: '阅读对象不能为空', trigger: 'blur'},
          ],
          releaseStatus: [
            {required: true, message: '发布状态不能为空', trigger: 'blur'},
          ],
          noticeContent: [
            {required: true, message: '公告内容不能为空', trigger: 'blur'},
          ]
        }
      },
      metaList() {
        // this.$refs.dataForm.resetFields();
        if (this.dataForm.id) {
          noticeView(this.dataForm.id).then(res => {
            this.dataForm = res.data.sysNotice;
            this.noticeFileList = res.data.noticeFileList;
            this.dataForm.readerTypeList = this.dataForm.readerType.split(',');
            this.dataForm.ascriptionSysList = this.dataForm.ascriptionSys.split(',');
            this.checkReaderTypeAll = this.dataForm.readerTypeList.length === this.readerTypeCheckedAllList.length;
            this.checkAscriptionSysAll = this.dataForm.ascriptionSysList.length === this.ascriptionSysCheckedAllList.length;
          })
        } else {
          this.dataForm = this.metaForm()
        }
      },
      metaPerm() {
        return {
          notice_add: false,
          notice_view: false,
          notice_upd: false,
        }
      },
      metaHasPerm() {
        this.permData.notice_add = this.perms['sys:notice:save'];
        this.permData.notice_view = this.perms['sys:notice:view'];
        this.permData.notice_upd = this.perms['sys:notice:update'];
      },
      goBack() {
        this.$router.go(-1)
      },
      fileList() {
        var file = document.getElementById('noticeFile');
        file.outerHTML = file.outerHTML; //重新初始化了file的html
        if (this.dataForm.id) {
          noticeFileList(this.dataForm.id).then(res => {
            this.noticeFileList = [];
            this.noticeFileList = res.data
          })
        }
      },
      // --------------------
      handleCheckAllReaderType(val) {
        this.dataForm.readerTypeList = val ? this.readerTypeCheckedAllList : [];
      },
      handleCheckedReaderType(val) {
        let checkedCount = val.length;
        this.checkReaderTypeAll = checkedCount === this.readerTypeCheckedAllList.length;
      },
      handleCheckAllSys(val) {
        this.dataForm.ascriptionSysList = val ? this.ascriptionSysCheckedAllList : [];
      },
      handleCheckedSys(val) {
        let checkedCount = val.length;
        this.checkAscriptionSysAll = checkedCount === this.ascriptionSysCheckedAllList.length;
      },
      //--------------------------------- 文件上传 ------------------------
      handleRemove(file) {
        noticeFileDelete(file.id).then(res => {
          this.$resMessage(res,
            {
              onClose: () => {
                this.fileList();
              }
            });
        })
      },
      getFile(event) {
        this.file = event.target.files
      },
      submitForm(event) {
        event.preventDefault();
        let formData = new FormData();
        formData.append('id', this.dataForm.id);
        formData.append('noticeTitle', this.dataForm.noticeTitle);
        formData.append('noticeContent', this.dataForm.noticeContent);
        formData.append('noticeType', this.dataForm.noticeType);
        formData.append('releaseTime', this.dataForm.releaseTime);
        formData.append('releaseStatus', this.dataForm.releaseStatus);
        formData.append('isTop', this.dataForm.isTop);
        formData.append('readerType', this.dataForm.readerTypeList.join(','));
        formData.append('ascriptionSys', this.dataForm.ascriptionSysList.join(','));
        for (let f of this.file) {
          formData.append('file', f);
        }
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            let http = this.dataForm.id ? noticeUpdate(formData) : noticeSave(formData);
            http.then(res => {
              this.$resMessage(res, {
                onClose: () => {
                  this.metaList();
                  this.fileList();
                }
              });
            })
          }
        })
      }
    }
  }
</script>

