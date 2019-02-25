<template>
  <el-dialog top="2vh" title="新增GMP信息" width="70%" :visible.sync="visible" :close-on-click-modal="false">
    <div style="width: 100%">
      <el-form ref="form" :model="form" :rules="rules" :disabled="state == 1" label-width="120px">
        <el-form-item label="证书编号" prop="certificateNumber">
          <el-input v-model="form.certificateNumber" maxlength="100" placeholder="证书编号"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="enterpriseAddress">
          <el-input v-model="form.enterpriseAddress" maxlength="50" placeholder="地址"></el-input>
        </el-form-item>
        <el-form-item label="认证范围" prop="attestationCategory">
          <el-input
            v-model="form.attestationCategory"
            type="textarea"
            :rows="4" placeholder="认证范围"
            maxlength="2000"></el-input>
        </el-form-item>
        <el-form-item label="有效期至" prop="expiryDate">
          <el-date-picker v-model="form.expiryDate" type="date" placeholder="有效期至"></el-date-picker>
        </el-form-item>
        <el-form-item label="发证机关" prop="officeLicence">
          <el-input
            v-model="form.officeLicence"
            type="textarea"
            :rows="4" placeholder="发证机关"
            maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="发证日期" prop="licenceDate">
          <el-date-picker v-model="form.licenceDate" type="date" placeholder="发证日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="是否新版gmp" prop="IS_NEW">
          <el-radio v-model="form.isNew" label="1">是</el-radio>
          <el-radio v-model="form.isNew" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="上传附件" prop="fileList">
          <el-button @click="handleChooseFiles('gmp')" size="small" :disabled="state == 1">选择文件</el-button>
        </el-form-item>
        <el-form-item>
          <images-preview ref="imagesPreview" refName="gmp" v-if="form.fileList" :imgIdListUnUnique="form.fileList" @imgIdListChange="upLoadImgIdList" />
        </el-form-item>
      </el-form>
      <choose-files ref="treeView" v-if="dialogVisible"  @handleSelectedFolder="selectedData"></choose-files>
    </div>
    <span slot="footer">
      <el-button size="small" type="primary" @click="handleForm" :disabled="state == 1">保存</el-button>
      <el-button size="small" @click="visible = false">关闭</el-button>
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
        state: undefined,
      }
    },
    methods: {
      init(gmp, index, state) {
        console.log(index);
        this.visible = true;
        this.index = index;
        this.form = index || index == 0 ? JSON.parse(JSON.stringify(gmp[index])) : this.metaForm();
        this.gmp = gmp;
        this.state = state;
      },
      metaRule() {
        return {
          certificateNumber: [
            {required: true, message: '证书编号不能为空', trigger: 'blur'},
          ],
          province: [
            {required: true, message: '地址不能为空', trigger: 'blur'},
          ],
          attestationCategory: [
            {required: true, message: '认证范围不能为空', trigger: 'blur'},
          ],
          expiryDate: [
            {required: true, message: '有效期至不能为空', trigger: 'blur'},
          ],
        }
      },
      metaForm() { // 表单数据初始化
        return {
          id: undefined,
          certificateNumber: undefined,
          province: undefined,
          attestationCategory: undefined,
          expiryDate: undefined,
          officeLicence: undefined,
          licenceDate: undefined,
          isNew: "1",
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
