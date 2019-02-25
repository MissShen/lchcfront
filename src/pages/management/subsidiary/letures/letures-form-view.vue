<template>
  <div>
    <el-dialog :title="dataForm.id?'修改':'新增'" :visible.sync="visible" width="70%" top="5vh">
      <div class="padding20"
      >
        <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
                 label-width="100px" size="small">
          <el-form-item label="栏目：" prop="leturesTypeId">
            <el-select v-model="dataForm.leturesTypeId" placeholder="选择栏目">
              <el-option v-for="item in leturesTypeData" :key="item.id" :label="item.leturesTypeName"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标题：" prop="leturesTitle">
            <el-input v-model="dataForm.leturesTitle"></el-input>
          </el-form-item>
          <el-form-item label="正文：" prop="leturesContents">
            <n-editor v-model="dataForm.leturesContents" :config="config"></n-editor>
          </el-form-item>
          <el-form-item label="附件：">
            <input type="file" id="LeturesFile" @change="getFile($event)">
            <div class="files-item" v-if="dataForm.realFileName">
              附件: <a href="#">{{dataForm.realFileName}}</a>
              <i class="el-icon-close" @click="handleRemove(dataForm.id)"></i>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="success" @click="dataFormSubmit($event)"
            >提交
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">关闭</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
  import {leturesTypeAllList} from "src/axios/management/subsidiary/leturesType";
  import NEditor from 'src/components/n-editor/n-editor'
  import {
    unLoginLeturesView,
    leturesUpdate,
    leturesSave,
    leturesDeleteFile
  } from "src/axios/management/subsidiary/letures";

  export default {
    name: "letures-form-view",
    components: {NEditor},
    data() {
      return {
        visible: false,
        file: '',
        leturesTypeData: [],
        dataRule: this.metaRule(),
        dataForm: this.metaData(),
        config: {
          UEDITOR_HOME_URL: "../../../../static/n-editor/",
          toolbars:
            [[
              'bold',          // 加粗
              "italic",        // 斜体
              "underline",     // 下划线
              "indent", //首行缩进
              "justifyleft", //左对齐
              "justifycenter", //居中对齐
              "justifyright", //右对齐
              "justifyjustify",//两端对齐
              "insertorderedlist",    // 有序列表
              "insertunorderedlist", // 无序列表
              "paragraph",   // 段落格式
              "link",  //链接
              "unlink", // 取消链接
              "horizontal", //分割线
              "date",   //日期
              "time", //时间
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
      }
    },
    mounted() {
      this.leturesTypeAllData();
    },
    methods: {
      metaData() {
        return {
          id: '',
          leturesTypeId: '',
          leturesTitle: '',
          leturesContents: '',
          realFileName: '',
        }
      },
      metaRule() {
        return {
          leturesTitle: [
            {required: true, message: '标题不能为空', trigger: 'blur'},
            {min: 1, max: 15, message: '标题长度大于1小于15', trigger: 'blur'}
          ],
          leturesTypeId: [
            {required: true, message: '栏目不能为空', trigger: 'blur'},
          ],
        }
      },
      leturesTypeAllData() {
        leturesTypeAllList().then(res => {
          if (res.code == 200) {
            this.leturesTypeData = res.data
          } else {
            this.$resMessage(res);
          }
        })
      },
      metaList(id) {
        this.visible = true;
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields();
          this.dataForm = this.metaData();
          // let file = document.getElementById('LeturesFile');
          // if (file.outerHTML) {
          //   file.outerHTML = file.outerHTML;
          // }
          // else {
          //   file.value = "";
          // }
          if (id) {
            this.dataForm.id = id;
            unLoginLeturesView(id).then(res => {
              if (res.code == 200) {
                this.dataForm = res.data;
                if (!this.dataForm.leturesContents) {
                  this.dataForm.leturesContents = ''
                }
              } else {
                this.$resMessage(res)
              }
            })
          }
        });
      },
      getFile(event) {
        this.file = event.target.files[0]
      },
      dataFormSubmit(event) {
        if (this.file) {
          let fileLimit = this.file.size / 1024 / 1024 < 50;
          if (!fileLimit) {
            let res = {
              code: '101',
              message: '附件大小不能超过 50MB!'
            };
            this.$resMessage(res);
            return false;
          }
        }
        event.preventDefault();
        let formData = new FormData();
        formData.append('id', this.dataForm.id);
        formData.append('leturesTitle', this.dataForm.leturesTitle);
        formData.append('leturesTypeId', this.dataForm.leturesTypeId);
        formData.append('leturesContents', this.dataForm.leturesContents);
        formData.append('file', this.file);

        // todo 校验文件大小
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            let http = this.dataForm.id ? leturesUpdate(formData) : leturesSave(formData);
            http.then(res => {
              if (res.code == 200) {
                this.visible = false;
                this.$emit('refreshList');
              }
              this.$resMessage(res)
            })
          }
        })
      },
      handleRemove(id) {
        leturesDeleteFile(id).then(res => {
          if (res.code == 200) {
            this.metaList(id);
          }
          this.$emit('refreshList');
          this.$resMessage(res)
        })
      }
    }
  }
</script>

<style scoped>

</style>
