<template>
  <el-dialog top="2vh" width="50%" title="新增申报人信息" :visible.sync="visible" :close-on-click-modal="false">
    <el-form ref="form" :disabled="disabled" :model="form" :rules="rules" label-width="160px" size="small">
      <el-row>
        <el-form-item label="联系人姓名" prop="LINK_PERSON">
          <el-input v-model="form.LINK_PERSON" placeholder="联系人姓名"></el-input>
        </el-form-item>
        <el-form-item label="固定电话" prop="LINK_TEL">
          <el-input v-model="form.LINK_TEL" placeholder="固定电话"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="LINK_PHONE">
          <el-input v-model="form.LINK_PHONE" placeholder="手机" :maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="申报人传真">
          <el-input v-model="form.LINK_FAX" placeholder="申报人传真"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱">
          <el-input v-model="form.LINK_EMIAL" placeholder="电子邮箱"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="LINK_IDCARD">
          <el-input v-model="form.LINK_IDCARD" placeholder="身份证号" :maxlength="18"></el-input>
        </el-form-item>
        <el-form-item label="联系地址" prop="LINK_ADDRESS">
          <el-input v-model="form.LINK_ADDRESS" placeholder="联系地址"></el-input>
        </el-form-item>
        <el-form-item label="紧急联系电话(手机)">
          <el-input v-model="form.LINK_JTEL" placeholder="紧急联系电话(手机)"></el-input>
        </el-form-item>
      </el-row>
    </el-form>
    <span slot="footer">
      <el-button type="primary" @click="handleForm" v-if="!disabled">保存</el-button>
      <el-button @click="visible = false">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name: "attached",
    data() {
      return {
        rules: this.metaRule(),
        visible: false,
        form: this.metaForm(),
        attached: [],
        index: undefined,
        disabled: undefined,
      }
    },
    methods: {
      init(attached, index, disabled) {
        console.log(index);
        this.visible = true;
        this.index = index;
        this.form = index || index == 0 ? JSON.parse(JSON.stringify(attached[index])) : this.metaForm();
        this.attached = attached;
        this.disabled = disabled;
      },
      metaRule() {
        return {
          LINK_PERSON: [
            {required: true, message: '证书编号不能为空', trigger: 'blur'},
          ],
          LINK_TEL: [
            {required: true, message: '地址不能为空', trigger: 'blur'},
          ],
          LINK_PHONE: [
            { required: true, message: '手机不能为空', trigger: 'blur' },
            { min: 11, max: 11, message: '手机长度不正确', trigger: 'blur' }
          ],
          LINK_ADDRESS: [
            {required: true, message: '联系地址不能为空', trigger: 'blur'},
          ],
          LINK_IDCARD: [
            {required: true, message: '身份证号不能为空', trigger: 'blur'},
            {
              validator: (rule, value, callback) => {
                if(value.length == 15 || value.length == 18){
                  callback();
                } else {
                  callback(new Error('身份证号格式不正确'));
                }
              }, trigger: "blur"
            },
          ],
        }
      },
      metaForm() { // 表单数据初始化
        return {
          ID: undefined,
          LINK_PERSON: undefined,
          LINK_TEL: undefined,
          LINK_PHONE: undefined,
          LINK_FAX: undefined,
          LINK_EMIAL: undefined,
          LINK_IDCARD: undefined,
          LINK_ADDRESS: undefined,
          LINK_JTEL: undefined,
        }
      },
      handleForm() {
        this.$refs.form.validate(valid => {
          if (valid) {
            if (this.index || this.index == 0) {
              this.attached.splice(this.index, 1, this.form);
            } else {
              this.attached.push(this.form);
            }
            this.visible = false;
          }
        });
      },
    }
  }
</script>
