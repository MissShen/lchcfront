<template>
  <el-dialog
    :title="!dataForm.id ? '新增按钮' : '修改按钮'"
    :append-to-body="true"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="150px" label-position="left">
      <el-form-item label="按钮名称" prop="btnName">
        <el-input v-model="dataForm.btnName" placeholder="按钮名称"></el-input>
      </el-form-item>
      <el-form-item label="按钮编码" prop="btnCode">
        <el-input v-model="dataForm.btnCode" placeholder="按钮编码"></el-input>
      </el-form-item>
      <el-form-item label="按钮路径" prop="btnUrl">
        <el-input v-model="dataForm.btnUrl" placeholder="按钮路径"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  //import {buttonView, buttonSave, buttonUpdate} from "src/axios/management/authority/sysResource"
  export default {
    name: "addButton",
    props: {
      parentId: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        visible: false,
        dataForm: this.metaForm(),
        dataRule: this.metaRule(),
      }
    },
    created() {
      this.metaList()
    },
    methods: {
      metaForm() {
        return {
          id: undefined,
          menuId: undefined,
          btnName: undefined,
          btnCode: undefined,
          btnUrl: undefined,
        }
      },
      metaRule() {
        return {
          btnName: [
            {required: true, message: '按钮名称不能为空', trigger: 'blur'},
            {min: 1, max: 10, message: '菜单名称长度大于1小于10', trigger: 'blur'}
          ],
          btnCode: [
            {required: true, message: '按钮code不能为空', trigger: 'blur'},
          ],
          btnUrl: [
            {required: true, message: '按钮路径不能为空', trigger: 'blur'},
          ],
        }
      },
      metaList() {
        this.dataForm.menuId = this.parentId
      },
      // ---------------
      fillButtonData(id) {
        this.visible = true
        this.dataForm.id = id || undefined
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
        })
        if (this.dataForm.id) {
          buttonView(this.dataForm.id).then(res => {
            this.dataForm = res.data
          })
        }
      },
      dataFormSubmit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            var http = this.dataForm.id ? buttonUpdate(this.dataForm) : buttonSave(this.dataForm)
            http.then(res => {
              this.$message({
                message: res.data,
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.visible = false
                  this.$emit('refreshData')
                }
              })
            })
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
