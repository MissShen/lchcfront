<template>
  <el-dialog top="2vh" width="70%" title="新增申报人信息" :visible.sync="visible" :close-on-click-modal="false" append-to-body>
    <el-form ref="form" :model="form" label-width="160px" label-position="left">
      <el-row :gutter="24">
        <el-col :span="10">
          <ent-input
            label="联系人姓名"
            prop="LINK_PERSON"
            :cli="cli.LINK_PERSON"
            :before="old.LINK_PERSON"
            :after="now.LINK_PERSON"
            :audit="audit.LINK_PERSON"
            :form="form.LINK_PERSON"
            v-model="form.LINK_PERSON"
            :limit="show.LINK_PERSON$"
            :btn="button('LINK_PERSON')"
            :upload="upload"
            :fileList="fileList"
            :field="getField('LINK_PERSON')"
            @faq="question"
            @upload="getUploadList"
            @remove="uploadList" />
        </el-col>
        <el-col :span="2">
          <el-checkbox v-if="off(2, now.LINK_PERSON)" v-model="show.LINK_PERSON$" :label="tips"></el-checkbox>
        </el-col>
        <el-col :span="10">
          <ent-input
            label="固定电话"
            prop="LINK_TEL"
            :cli="cli.LINK_TEL"
            :before="old.LINK_TEL"
            :after="now.LINK_TEL"
            :audit="audit.LINK_TEL"
            :form="form.LINK_TEL"
            v-model="form.LINK_TEL"
            :limit="show.LINK_TEL$"
            :btn="button('LINK_TEL')"
            :upload="upload"
            :fileList="fileList"
            :field="getField('LINK_TEL')"
            @faq="question"
            @upload="getUploadList"
            @remove="uploadList" />
        </el-col>
        <el-col :span="2">
          <el-checkbox v-if="off(2, now.LINK_TEL)" v-model="show.LINK_TEL$" :label="tips"></el-checkbox>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="10">
          <ent-input
            label="手机"
            prop="LINK_PHONE"
            :cli="cli.LINK_PHONE"
            :before="old.LINK_PHONE"
            :after="now.LINK_PHONE"
            :audit="audit.LINK_PHONE"
            :form="form.LINK_PHONE"
            v-model="form.LINK_PHONE"
            :limit="show.LINK_PHONE$"
            :btn="button('LINK_PHONE')"
            :upload="upload"
            :fileList="fileList"
            :field="getField('LINK_PHONE')"
            @faq="question"
            @upload="getUploadList"
            @remove="uploadList" />
        </el-col>
        <el-col :span="2">
          <el-checkbox v-if="off(2, now.LINK_PHONE)" v-model="show.LINK_PHONE$" :label="tips"></el-checkbox>
        </el-col>
        <el-col :span="10">
          <ent-input
            label="申报人传真"
            prop="LINK_FAX"
            :cli="cli.LINK_FAX"
            :before="old.LINK_FAX"
            :after="now.LINK_FAX"
            :audit="audit.LINK_FAX"
            :form="form.LINK_FAX"
            v-model="form.LINK_FAX"
            :limit="show.LINK_FAX$"
            :btn="button('LINK_FAX')"
            :upload="upload" :fileList="fileList" :field="getField('LINK_FAX')"
                     @faq="question" @upload="getUploadList" @remove="uploadList"></ent-input>
        </el-col>
        <el-col :span="2">
          <el-checkbox v-if="off(2, now.LINK_FAX)" v-model="show.LINK_FAX$" :label="tips"></el-checkbox>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="10">
          <ent-input
            label="电子邮箱"
            prop="LINK_EMIAL"
            :cli="cli.LINK_EMIAL"
            :before="old.LINK_EMIAL"
            :after="now.LINK_EMIAL"
            :audit="audit.LINK_EMIAL"
            :form="form.LINK_EMIAL"
            v-model="form.LINK_EMIAL"
            :limit="show.LINK_EMIAL$"
            :btn="button('LINK_EMIAL')"
            :upload="upload"
            :fileList="fileList"
            :field="getField('LINK_EMIAL')"
            @faq="question"
            @upload="getUploadList"
            @remove="uploadList" />
        </el-col>
        <el-col :span="2">
          <el-checkbox v-if="off(2, now.LINK_EMIAL)" v-model="show.LINK_EMIAL$" :label="tips"></el-checkbox>
        </el-col>
        <el-col :span="10">
          <ent-input
            label="身份证号"
            prop="LINK_IDCARD"
            :cli="cli.LINK_IDCARD"
            :before="old.LINK_IDCARD"
            :after="now.LINK_IDCARD"
            :audit="audit.LINK_IDCARD"
            :form="form.LINK_IDCARD"
            v-model="form.LINK_IDCARD"
            :limit="show.LINK_IDCARD$"
            :btn="button('LINK_IDCARD')"
            :upload="upload"
            :fileList="fileList"
            :field="getField('LINK_IDCARD')"
            @faq="question"
            @upload="getUploadList"
            @remove="uploadList" />
        </el-col>
        <el-col :span="2">
          <el-checkbox v-if="off(2, now.LINK_IDCARD)" v-model="show.LINK_IDCARD$" :label="tips"></el-checkbox>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="20">
          <ent-input
            label="联系地址"
            prop="LINK_ADDRESS"
            :cli="cli.LINK_ADDRESS"
            :before="old.LINK_ADDRESS"
            :after="now.LINK_ADDRESS"
            :audit="audit.LINK_ADDRESS"
            :form="form.LINK_ADDRESS"
            v-model="form.LINK_ADDRESS"
            :limit="show.LINK_ADDRESS$"
            :btn="button('LINK_ADDRESS')"
            :upload="upload"
            :fileList="fileList"
            :field="getField('LINK_ADDRESS')"
            @faq="question"
            @upload="getUploadList"
            @remove="uploadList" />
        </el-col>
        <el-col :span="4">
          <el-checkbox v-if="off(2, now.LINK_ADDRESS)" v-model="show.LINK_ADDRESS$" :label="tips"></el-checkbox>
        </el-col>
        <el-col :span="20">
          <ent-input
            label="紧急联系电话(手机)"
            prop="LINK_JTEL"
            :cli="cli.LINK_JTEL"
            :before="old.LINK_JTEL"
            :after="now.LINK_JTEL"
            :audit="audit.LINK_JTEL"
            :form="form.LINK_JTEL"
            v-model="form.LINK_JTEL"
            :limit="show.LINK_JTEL$"
            :btn="button('LINK_JTEL')"
            :upload="upload"
            :fileList="fileList"
            :field="getField('LINK_JTEL')"
            @faq="question"
            @upload="getUploadList"
            @remove="uploadList" />
        </el-col>
        <el-col :span="4">
          <el-checkbox v-if="off(2, now.LINK_JTEL)" v-model="show.LINK_JTEL$" :label="tips"></el-checkbox>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer">
      <el-button type="primary" @click="handleForm">保存</el-button>
      <el-button @click="visible = false">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import entInput from "./control/entInput"
  import entTextarea from "./control/entTextarea"

  export default {
    name: "attached",
    components: {
      entInput, entTextarea
    },
    props: ["type", "flag", "limit", "showQuestion", "tips", "upload", "btn", "clarify"],
    data() {
      return {
        visible: false,
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

        this.old = op.old.attached[op.index] || {};
        this.now = op.now.attached[op.index] || {};
        this.audit = op.audit.attached[op.index] || {};
        this.form = op.form.attached[op.index] || {};
        this.cli = op.cli.attached[op.index] || {};
        this.show = op.show.attached[op.index] || {};

        this.dictionary = op.dictionary;
        this.doubt = op.doubt;
        this.clari = op.clari;

        this.fileList = op.fileList || {};
      },
      off(op, chg) {
        // 如果是申报
        if (this.type == 1) {
          // 2-公示
          if (this.flag == 2) {
            return this.limit;
          }
          // 4-审核
          if (this.flag == 4) {
            return this.limit;
          }
          return false;
        }
        // 如果是变更，op：1-可变更需要审核，2-可变更不需要审核，3-不可变更，chg：true-已变更
        if (this.type == 2) {
          // 1-申请
          if (this.flag == 1) {
            // 可变更需要审核
            if (op == 1) {
              return this.limit;
            }
            // 可变更不需要审核
            if (op == 2) {
              return this.limit;
            }
            return false;
          }
          // 2-公示
          if (this.flag == 2) {
            // 可变更需要审核，并且已变更
            if (op == 1 && chg) {
              return this.limit;
            }
            // 可变更不需要审核，并且已变更
            if (op == 2 && chg) {
              return this.limit;
            }
            return false;
          }
          // 4-审核
          if (this.flag == 4) {
            // 可变更需要审核，并且已变更
            if (op == 1 && chg) {
              return this.limit;
            }
            return false;
          }
          return false;
        }
      },
      handleForm() {
        for (let key in this.form) {
          if (key.indexOf("$") != -1 && !this.form[key.substr(0, key.length - 1)]) {
            this.$alert("请填写所有" + this.tips + "再保存", '提示', {confirmButtonText: '确定'});
            return;
          }
        }
        this.visible = false;
      },
      question(val) {
        this.$emit("faq", val);
      },
      button(key) {
        if (this.flag != 4 || this.index == undefined) {
          return this.btn;
        }
        key = "attached." + this.index + "." + key;
        for (let id in this.doubt[key]) {
          if (!this.dictionary.doubt[id]) {
            return this.btn;
          }
        }
        if (!this.clari[key]) {
          return "已回复";
        }
        if (!this.dictionary.clarify[key]) {
          return this.btn;
        }
        return "已回复";
      },
      getField(field) {
        return "attached." + this.index + "." + field;
      },
      //本地上传示例
      getUploadList(res) {
        console.log(res);
        res.data.forEach(function (item) {
          if (!this.fileList[res.refName]) {
            this.$set(this.fileList, res.refName, []);
          }
          this.fileList[res.refName].push(item)
        }.bind(this))
      },
      uploadList(res) {
        console.log(res);
        this.$set(this.fileList, res.refName, res.data);
      },
    }
  }
</script>
