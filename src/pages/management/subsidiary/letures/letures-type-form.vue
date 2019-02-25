<template>
  <el-dialog :title="dataForm.id?'修改栏目':'新增栏目'" :visible.sync="visible" width="50%" top="15vh">
    <div class="padding20" style="width: 500px"
    >
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
               label-width="150px" size="small">
        <el-form-item label="栏目编号：" prop="leturesTypeCode">
          <el-input v-model="dataForm.leturesTypeCode"></el-input>
        </el-form-item>
        <el-form-item label="栏目名称：" prop="leturesTypeName">
          <el-input v-model="dataForm.leturesTypeName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="success" @click="dataFormSubmit()"
          >提交
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {leturesTypeView,leturesTypeSave,leturesTypeUpdate} from "../../../../axios/management/subsidiary/leturesType";
  import {HasPerm} from 'src/components/mixins'
  export default {
    name: "letures-type-form",
    mixins: [HasPerm],
    data() {
      return {
        visible: false,
        dataForm: this.metaForm(),
        dataRule: this.metaRule(),
      }
    },
    methods: {
      metaForm() {
        return {
          id: undefined,
          leturesTypeCode: '',
          leturesTypeName: ''
        }
      },
      metaRule() {
        return {
          leturesTypeName: [
            {required: true, message: '类型名称不能为空', trigger: 'blur'},
            {min: 1, max: 10, message: '名称长度大于1小于10', trigger: 'blur'}
          ],
          leturesTypeCode: [
            {required: true, message: '类型编码不能为空', trigger: 'blur'},
            {min: 1, max: 10, message: '名称长度大于1小于15', trigger: 'blur'}
          ]
        }
      },
      metaList(id) {
        this.visible = true;
        this.dataForm = this.metaForm();
        if (id) {
          this.dataForm.id = id;
          leturesTypeView(id).then(res => {
            if (res.code == 200) {
              this.dataForm = res.data
            } else {
              this.$resMessage(res)
            }
          })
        }
      },
      // ---------------
      dataFormSubmit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            let http = this.dataForm.id ? leturesTypeUpdate(this.dataForm) : leturesTypeSave(this.dataForm)
            http.then(res => {
              this.$resMessage(res, {
                onClose: () => {
                  this.visible = false;
                  this.$emit('refreshList');
                }
              });
            })
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
