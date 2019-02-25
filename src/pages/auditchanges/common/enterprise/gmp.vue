<template>
  <el-dialog top="2vh" title="GMP信息" width="70%" :visible.sync="visible" :close-on-click-modal="false" append-to-body>
    <div style="width: 100%" v-if="old && now && audit && form">
      <el-form ref="form" :model="form" label-width="120px" label-position="left">
        <el-row :gutter="24">
          <el-col :span="20">
            <ent-input
              label="证书编号"
              prop="CERTIFICATE_NUMBER"
              :cli="cli.CERTIFICATE_NUMBER"
              :before="old.CERTIFICATE_NUMBER"
              :after="now.CERTIFICATE_NUMBER"
              :audit="audit.CERTIFICATE_NUMBER"
              :form="form.CERTIFICATE_NUMBER"
              v-model="form.CERTIFICATE_NUMBER"
              :limit="show.CERTIFICATE_NUMBER$"
              :btn="button('CERTIFICATE_NUMBER')"
              :upload="upload"
              :fileList="fileList"
              :field="getField('CERTIFICATE_NUMBER')"
              @faq="question"
              @upload="getUploadList"
              @remove="uploadList" />
          </el-col>
          <el-col :span="4">
            <el-checkbox v-if="off(1, now.CERTIFICATE_NUMBER)" v-model="show.CERTIFICATE_NUMBER$" :label="tips"></el-checkbox>
          </el-col>
          <el-col :span="20">
            <ent-input
              label="地址"
              prop="ENTERPRISE_ADDRESS"
              :cli="cli.ENTERPRISE_ADDRESS"
              :before="old.ENTERPRISE_ADDRESS"
              :after="now.ENTERPRISE_ADDRESS"
              :audit="audit.ENTERPRISE_ADDRESS"
              :form="form.ENTERPRISE_ADDRESS"
              v-model="form.ENTERPRISE_ADDRESS"
              :limit="show.ENTERPRISE_ADDRESS$"
              :btn="button('ENTERPRISE_ADDRESS')"
              :upload="upload"
              :fileList="fileList"
              :field="getField('ENTERPRISE_ADDRESS')"
              @faq="question"
              @upload="getUploadList"
              @remove="uploadList" />
          </el-col>
          <el-col :span="4">
            <el-checkbox v-if="off(1, now.ENTERPRISE_ADDRESS)" v-model="show.ENTERPRISE_ADDRESS$" :label="tips"></el-checkbox>
          </el-col>
          <el-col :span="20">
            <ent-textarea
              label="认证范围"
              prop="ATTESTATION_CATEGORY"
              :cli="cli.ATTESTATION_CATEGORY"
              :before="old.ATTESTATION_CATEGORY"
              :after="now.ATTESTATION_CATEGORY"
              :audit="audit.ATTESTATION_CATEGORY"
              :form="form.ATTESTATION_CATEGORY"
              v-model="form.ATTESTATION_CATEGORY"
              :limit="show.ATTESTATION_CATEGORY$"
              :rows="4"
              :btn="button('ATTESTATION_CATEGORY')"
              :upload="upload"
              :fileList="fileList"
              :field="getField('ATTESTATION_CATEGORY')"
              @faq="question"
              @upload="getUploadList"
              @remove="uploadList" />
          </el-col>
          <el-col :span="4">
            <el-checkbox v-if="off(1, now.ATTESTATION_CATEGORY)" v-model="show.ATTESTATION_CATEGORY$" :label="tips"></el-checkbox>
          </el-col>
          <el-col :span="20">
            <ent-date
              label="有效期至"
              prop="EXPIRY_DATE"
              :cli="cli.EXPIRY_DATE"
              :before="old.EXPIRY_DATE"
              :after="now.EXPIRY_DATE"
              :audit="audit.EXPIRY_DATE"
              :form="form.EXPIRY_DATE"
              v-model="form.EXPIRY_DATE"
              :limit="show.EXPIRY_DATE$"
              :btn="button('EXPIRY_DATE')"
              :upload="upload"
              :fileList="fileList"
              :field="getField('EXPIRY_DATE')"
              @faq="question"
              @upload="getUploadList"
              @remove="uploadList" />
          </el-col>
          <el-col :span="4">
            <el-checkbox v-if="off(1, now.EXPIRY_DATE)" v-model="show.EXPIRY_DATE$" :label="tips"></el-checkbox>
          </el-col>
          <el-col :span="20">
            <ent-textarea
              label="发证机关"
              prop="OFFICE_LICENCE"
              :cli="cli.OFFICE_LICENCE"
              :before="old.OFFICE_LICENCE"
              :after="now.OFFICE_LICENCE"
              :audit="audit.OFFICE_LICENCE"
              :form="form.OFFICE_LICENCE"
              v-model="form.OFFICE_LICENCE"
              :limit="show.OFFICE_LICENCE$"
              :rows="4"
              :btn="button('OFFICE_LICENCE')"
              :upload="upload"
              :fileList="fileList"
              :field="getField('OFFICE_LICENCE')"
              @faq="question"
              @upload="getUploadList"
              @remove="uploadList" />
          </el-col>
          <el-col :span="4">
            <el-checkbox v-if="off(1, now.OFFICE_LICENCE)" v-model="show.OFFICE_LICENCE$" :label="tips"></el-checkbox>
          </el-col>
          <el-col :span="20">
            <ent-date
              label="发证日期"
              prop="LICENCE_DATE"
              :cli="cli.LICENCE_DATE"
              :before="old.LICENCE_DATE"
              :after="now.LICENCE_DATE"
              :audit="audit.LICENCE_DATE"
              :form="form.LICENCE_DATE"
              v-model="form.LICENCE_DATE"
              :limit="show.LICENCE_DATE$"
              :btn="button('LICENCE_DATE')"
              :upload="upload"
              :fileList="fileList"
              :field="getField('LICENCE_DATE')"
              @faq="question"
              @upload="getUploadList"
              @remove="uploadList" />
          </el-col>
          <el-col :span="4">
            <el-checkbox v-if="off(1, now.LICENCE_DATE)" v-model="show.LICENCE_DATE$" :label="tips"></el-checkbox>
          </el-col>
        </el-row>
        <el-form-item label="是否新版gmp" prop="IS_NEW">
          <el-col :span="20">
            <!--<div :class="{ 'orange' : now.IS_NEW }">-->
            <div>
              <span v-if="now.IS_NEW">变更前：</span>{{ { "1" : "是", "0" : "是" }[old.IS_NEW] }}
              <a class="audit-answer-if" v-if="btn && cli.IS_NEW" @click="question(cli.IS_NEW)">{{button('IS_NEW')}}</a>
            </div>
            <div v-if="now.IS_NEW" class="orange">变更后：{{ { "1" : "是", "0" : "是" }[now.IS_NEW] }}</div>
            <div v-if="audit.IS_NEW" class="orange">审核后：{{ { "1" : "是", "0" : "是" }[audit.IS_NEW] }}</div>

            <el-radio v-if="show.IS_NEW$" v-model="form.IS_NEW" label="1">是</el-radio>
            <el-radio v-if="show.IS_NEW$" v-model="form.IS_NEW" label="0">否</el-radio>
            <upload-button v-if="show.IS_NEW$ && upload" :buttonFlag="getField('IS_NEW')" :fileListFlag="fileList[getField('IS_NEW')] || []" fileType="1" @uploadList="getUploadList"></upload-button>
            <images-preview
              v-if="show.IS_NEW$ && upload"
              :refName="getField('IS_NEW')"
              ref="imagesPreview"
              :imgIdListUnUnique="fileList[getField('IS_NEW')] || []"
              @imgIdListChange="uploadList"></images-preview>
          </el-col>
          <el-col :span="4">
            <el-checkbox v-if="off(2, now.IS_NEW)" v-model="show.IS_NEW$" :label="tips"></el-checkbox>
          </el-col>
        </el-form-item>
        <el-form-item label="查看附件">
          <el-col :span="20">
            <div class="" v-if="now.fileList && now.fileList.length > 0">变更前：</div>&nbsp;
            <images-preview ref="imagesPreview" :operate="false" v-if="old.fileList" :imgIdListUnUnique="old.fileList"></images-preview>
            <div class="orange" v-if="now.fileList && now.fileList.length > 0">变更后：</div>
            <images-preview ref="imagesPreview" :operate="false" v-if="now.fileList" :imgIdListUnUnique="now.fileList"></images-preview>
          </el-col>
          <el-col :span="4">
            <el-checkbox v-if="off(0, now.fileList)" v-model="show.fileList$" :label="tips"></el-checkbox>
          </el-col>
        </el-form-item>
        <el-form-item v-if="show.fileList$">
          <el-button @click="handleChooseFiles('gmp')">上传图片</el-button>
          <images-preview ref="imagesPreview" refName="gmp" v-if="form.fileList" :imgIdListUnUnique="form.fileList" @imgIdListChange="upLoadImgIdList"></images-preview>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer">
      <el-button type="primary" @click="handleForm" v-if="!(flag == 2 && !limit)" size="small">保存</el-button>
      <el-button @click="visible = false" size="small">关闭</el-button>
    </span>
    <choose-files ref="treeView" v-if="dialogVisible"  @handleSelectedFolder="selectedData"></choose-files>
  </el-dialog>
</template>

<script>
  import entInput from "./control/entInput"
  import entTextarea from "./control/entTextarea"
  import entDate from "./control/entDate"

  import chooseFiles from 'src/pages/auditchanges/common/chooseFiles';
  import imagesPreview from 'src/pages/auditchanges/common/imagesPreview'
  import uploadButton from 'src/pages/auditchanges/common/uploadButton'

  export default {
    name: "gmp",
    components: {
      entInput, entTextarea, entDate, chooseFiles, imagesPreview, uploadButton
    },
    props: ["type", "flag", "limit", "showQuestion", "tips", "upload", "btn", "clarify"],
    data() {
      return {
        visible: false,
        dialogVisible: false,

        form: {},
        old: {},
        now: {},
        audit: {},
        cli: {},
        show: {},

        index: undefined,
        dictionary: undefined, // 质疑和澄清回复
        doubt: undefined, // 质疑信息
        clari: undefined, // 澄清信息

        fileList: {},
      }
    },
    methods: {
      init(op) {
        this.visible = true;

        this.index = op.index;

        this.old = op.old.gmp[op.index] || {};
        this.now = op.now.gmp[op.index] || {};
        this.audit = op.audit.gmp[op.index] || {};
        this.form = op.form.gmp[op.index] || {};
        this.cli = op.cli.gmp[op.index] || {};
        this.show = op.show.gmp[op.index] || {};

        if(this.old.PROJECT_ORG_ID == "X") {
          this.now = this.old;
          this.old = {};
        }

        this.dictionary = op.dictionary;
        this.doubt = op.doubt;
        this.clari = op.clari;

        this.fileList = op.fileList || {};
        this.$nextTick(() => {
          if(this.old.fileList) {
            this.old.fileList.splice(0, 0);
          }
          if(this.now.fileList) {
            this.now.fileList.splice(0, 0);
          }
          if(this.form.fileList) {
            this.form.fileList.splice(0, 0);
          }
        })
      },
      off(op, chg) {
        // 如果是申报
        if(this.type == 1) {
          // 不可质疑，可变更不需要审核
          if(op == 0) {
            return false;
          }
          // 2-公示
          if(this.flag == 2) {
            return this.limit;
          }
          // 4-审核
          if(this.flag == 4) {
            return this.limit;
          }
          return false;
        }
        // 如果是变更，op：1-可变更需要审核，2-可变更不需要审核，3-不可变更，chg：true-已变更
        if(this.type == 2) {
          // 1-申请
          if(this.flag == 1) {
            // 不可质疑，可变更不需要审核
            if(op == 0) {
              return this.limit;
            }
            // 可变更需要审核
            if(op == 1) {
              return this.limit;
            }
            // 可变更不需要审核
            if(op == 2) {
              return this.limit;
            }
            return false;
          }
          // 2-公示
          if(this.flag == 2) {
            // 可变更需要审核，并且已变更
            if(op == 1 && chg) {
              return this.limit;
            }
            // 可变更不需要审核，并且已变更
            if(op == 2 && chg) {
              return this.limit;
            }
            return false;
          }
          // 4-审核
          if(this.flag == 4) {
            // 可变更需要审核，并且已变更
            if(op == 1 && chg) {
              return this.limit;
            }
            return false;
          }
          return false;
        }
      },
      handleForm() {
        console.log(this.form)
        for(let key in this.form) {
          if(key.indexOf("$") != -1 && !this.form[key.substr(0, key.length - 1)]) {
            this.$alert("请填写所有" + this.tips + "再保存", '提示', { confirmButtonText: '确定' });
            return;
          }
        }
        this.visible = false;
      },
      question(val) {
        console.log("GMP QUESTION : " + val)
        this.$emit("faq", val);
      },
      button(key) {
        if(this.flag != 4 || this.index == undefined) {
          return this.btn;
        }
        key = "gmp." + this.index + "." + key;
        for(let id in this.doubt[key]) {
          if (!this.dictionary.doubt[id]) {
            return this.btn;
          }
        }
        if(!this.clari[key]) {
          return "已回复";
        }
        if(!this.dictionary.clarify[key]) {
          return this.btn;
        }
        return "已回复";
      },
      // 预上传示例
      handleChooseFiles(refName){
        const tis = this;
        tis.dialogVisible = true;
        this.$nextTick(() => {
          // 通过组件中设置的ref属性调取formView.vue中的fillData()方法加载弹窗内容
          this.$refs.treeView.initData(refName);
        });
      },
      selectedData(res){
        // 所选择的树节点id
        console.log('selected data===', res);
        if(!this.form.fileList) {
          this.$set(this.form, "fileList", []);
        }
        this.$nextTick(()=>{
          res.data.forEach(function (item) {
            this.form.fileList.push(item);
          }.bind(this));
        })
      },
      upLoadImgIdList(res){
        //需要上传的id集合
        console.log('========从预览里面来的');
        console.log(res);
        this.$set(this.form, "fileList", res.data);
      },
      getField(field) {
        return "gmp." + this.index + "." + field;
      },
      //本地上传示例fileList
      getUploadList(res) {
        console.log(res);
        res.data.forEach(function (item) {
          if (!this.fileList[res.refName]) {
            this.$set(this.fileList, res.refName, []);
          }
          this.fileList[res.refName].push(item)
          console.log(this.fileList)
        }.bind(this))
      },
      uploadList(res) {
        console.log(res);
        this.$set(this.fileList, res.refName, res.data);
      },
    }
  }
</script>
