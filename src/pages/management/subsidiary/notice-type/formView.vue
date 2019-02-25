<template>
  <el-dialog :title="dataForm.id?'修改公告类别':'新增公告类别'" :visible.sync="visible" width="50%" top="15vh">
    <div class="padding20" style="width: 500px"
    >
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
               label-width="150px" size="small">
        <el-form-item label="公告类别编号：" prop="noticeTypeCode">
          <el-input v-model="dataForm.noticeTypeCode"></el-input>
        </el-form-item>
        <el-form-item label="公告类别名称：" prop="noticeTypeName">
          <el-input v-model="dataForm.noticeTypeName"></el-input>
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

  import {noticeTypeView, noticeTypeSave, noticeTypeUpdate} from "src/axios/management/subsidiary/noticeType";
  import {HasPerm} from 'src/components/mixins'

  export default {
    name: "form-view",
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
          noticeTypeCode: '',
          noticeTypeName: ''
        }
      },
      metaRule() {
        return {
          noticeTypeName: [
            {required: true, message: '公告类别名称不能为空', trigger: 'blur'},
            {min: 1, max: 10, message: '名称长度大于1小于10', trigger: 'blur'}
          ],
          noticeTypeCode: [
            {required: true, message: '公告类别编码不能为空', trigger: 'blur'},
            {min: 1, max: 10, message: '名称长度大于1小于10', trigger: 'blur'}
          ]
        }
      },
      metaList(id) {
        this.visible = true;
        this.$refs['dataForm'].resetFields();
        this.dataForm = this.metaForm();
        if (id) {
          this.dataForm.id = id;
          noticeTypeView(id).then(res => {
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
            let http = this.dataForm.id ? noticeTypeUpdate(this.dataForm) : noticeTypeSave(this.dataForm)
            http.then(res => {
              this.$resMessage(res, {
                onClose: () => {
                  this.visible = false;
                  this.$emit('refreshNotice');
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
