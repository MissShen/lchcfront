<template>
  <el-dialog top="2vh" title="新增GMP信息" :visible.sync="visible" :close-on-click-modal="false" width="60%" append-to-body>
    <div style="width: 100%">
      <el-form ref="form" :disabled="disabled" :model="form" :rules="rules" label-width="160px" size="small" label-position="left">
        <el-row>
          <el-form-item label="证书编号" prop="CERTIFICATE_NUMBER">
            <el-input v-model="form.CERTIFICATE_NUMBER" placeholder="证书编号"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="ENTERPRISE_ADDRESS">
            <el-input v-model="form.ENTERPRISE_ADDRESS" placeholder="地址"></el-input>
          </el-form-item>
          <el-form-item label="认证范围" prop="ATTESTATION_CATEGORY">
            <el-input
              v-model="form.ATTESTATION_CATEGORY"
              type="textarea"
              :rows="4" placeholder="认证范围"></el-input>
          </el-form-item>
          <el-form-item label="有效期至" prop="EXPIRY_DATE">
            <el-date-picker v-model="form.EXPIRY_DATE" type="date" placeholder="有效期至"></el-date-picker>
          </el-form-item>
          <el-form-item label="发证机关" prop="OFFICE_LICENCE">
            <el-input
              v-model="form.OFFICE_LICENCE"
              type="textarea"
              :rows="4" placeholder="发证机关"></el-input>
          </el-form-item>
          <el-form-item label="发证日期" prop="LICENCE_DATE">
            <el-date-picker v-model="form.LICENCE_DATE" type="date" placeholder="发证日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="是否新版gmp" prop="IS_NEW">
            <el-radio v-model="form.IS_NEW" label="1">是</el-radio>
            <el-radio v-model="form.IS_NEW" label="0">否</el-radio>
          </el-form-item>
          <el-form-item label="上传附件" prop="fileList">
            <el-button @click="handleChooseFiles('gmp')" :disabled="disabled">选择文件</el-button>
          </el-form-item>
          <el-form-item>
            <images-preview ref="imagesPreview" :operate="!disabled" refName="gmp" v-if="form.fileList" :imgIdListUnUnique="form.fileList" @imgIdListChange="upLoadImgIdList" />
          </el-form-item>
        </el-row>
      </el-form>
      <choose-files ref="treeView" v-if="dialogVisible"  @handleSelectedFolder="selectedData"></choose-files>
    </div>
    <span slot="footer">
      <el-button type="primary" @click="handleForm" v-if="!disabled">保存</el-button>
      <el-button @click="visible = false">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import chooseFiles from 'src/pages/auditchanges/common/chooseFiles';
  import imagesPreview from 'src/pages/auditchanges/common/imagesPreview'
  import uploadButton from 'src/pages/auditchanges/common/uploadButton'

    export default {
      name: "gmp",
      components: {
        chooseFiles, imagesPreview, uploadButton
      },
      data() {
        return {
          rules: this.metaRule(),
          visible: false,
          dialogVisible: false,
          form: this.metaForm(),
          gmp: [],
          index: undefined,
          isStandard: undefined,
          disabled: undefined,
        }
      },
      methods: {
        init(gmp, index, disabled) {
          this.visible = true;
          this.index = index;
          this.form = index || index == 0 ? JSON.parse(JSON.stringify(gmp[index])) : this.metaForm();
          this.gmp = gmp;
          this.disabled = disabled;

          if(!this.form.IS_NEW) {
            this.$set(this.form, "IS_NEW", "1");
          }
          this.$nextTick(() => {
            if(this.form.fileList)
              this.form.fileList.splice(0, 0);
          });
        },
        metaRule() {
          return {
            CERTIFICATE_NUMBER: [
              {required: true, message: '证书编号不能为空', trigger: 'blur'},
            ],
            ENTERPRISE_ADDRESS: [
              {required: true, message: '地址不能为空', trigger: 'blur'},
            ],
            ATTESTATION_CATEGORY: [
              {required: true, message: '认证范围不能为空', trigger: 'blur'},
            ],
            EXPIRY_DATE: [
              {required: true, message: '有效期至不能为空', trigger: 'blur'},
            ],
            fileList: [
              {required: true, message: '附件不能为空', trigger: 'blur'},
            ],
          }
        },
        metaForm() { // 表单数据初始化
          return {
            IS_NEW: "1",
          }
        },
        handleForm() {
          this.$refs['form'].validate(valid => {
            if (valid) {
              if (this.index || this.index == 0) {
                this.gmp.splice(this.index, 1, this.form);
              } else {
                this.gmp.push(this.form);
              }
              this.visible = false;
            }
          });
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
      }
    }
</script>
