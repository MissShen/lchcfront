<template>
  <el-form-item :label="label" :prop="prop">
    <!--<div :class="{ 'orange' : after }">-->
    <div>
      <span v-if="after">变更前：</span>{{before}}&nbsp;
      <a class="audit-answer-if" v-if="btn && cli" @click="faq">{{btn}}</a>
    </div>
    <div v-if="after" class="orange">变更后：{{after}}</div>
    <div v-if="audit" class="orange">审核后：{{audit}}</div>
    <el-input v-if="limit" v-model="currentValue" :placeholder="label" />
    <upload-button class="button-start" v-if="limit && upload" :buttonFlag="field" :fileListFlag='fileList[field] || []' :fileType="fileType" @uploadList="getUploadList"></upload-button>
    <images-preview
      :refName="field"
      ref="imagesPreview"
      :imgIdListUnUnique="fileList[field] || []"
      @imgIdListChange="uploadList"></images-preview>
  </el-form-item>
</template>

<script>
  import imagesPreview from 'src/pages/auditchanges/common/imagesPreview'
  import uploadButton from 'src/pages/auditchanges/common/uploadButton'

  export default {
    props: [
      "label",
      "prop",
      "before",
      "after",
      "audit",
      "btn",
      "form",
      "limit",
      "cli",
      "upload",
      "fileList",
      "field"
    ],
    components: {
      imagesPreview, uploadButton
    },
    data() {
      return {
        fileType:'1',
      }
    },
    computed:{
      currentValue: {
        get: function() {
          return this.form; // 将props中的value赋值给currentValue
        },
        set: function(val) {
          this.$emit('input', val); // 通过$emit触发父组件
        }
      }
    },
    methods: {
      faq() {
        this.$emit("faq", this.cli);
      },
      //本地上传示例
      getUploadList(res){
        this.$emit("upload", res);
      },
      uploadList(res) {
        this.$emit("remove", res);
      },
    },
  }
</script>
