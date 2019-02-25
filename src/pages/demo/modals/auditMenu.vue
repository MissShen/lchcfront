<template>
  <el-dialog
    :title="!dataForm.id ? '新增菜单' : '修改菜单'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="150px" label-position="left">
      <el-form-item label="菜单名称" prop="menuName">
        <el-input v-model="dataForm.menuName" placeholder="菜单名称"></el-input>
      </el-form-item>
      <el-form-item label="菜单名称简写" prop="shortcutMenuName">
        <el-input v-model="dataForm.shortcutMenuName" placeholder="菜单名称简写"></el-input>
      </el-form-item>
      <el-form-item label="菜单路径" prop="menuUrl">
        <el-input v-model="dataForm.menuUrl" placeholder="菜单路径"></el-input>
      </el-form-item>
      <el-form-item label="菜单序号" prop="orderNum">
        <el-input v-model="dataForm.orderNum" placeholder="菜单序号"></el-input>
      </el-form-item>
      <el-form-item label="菜单备注" prop="remark">
        <el-input type="textarea" v-model="dataForm.remark" placeholder="备注信息"></el-input>
      </el-form-item>
      <el-form-item label="是否快捷菜单" prop="isShortcutMenu">
        <el-radio v-model="dataForm.isShortcutMenu" label="1">是</el-radio>
        <el-radio v-model="dataForm.isShortcutMenu" label="0">否</el-radio>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  //import {menuView, menuLevelTwoSave, menuLevelTwoUpdate} from "src/axios/management/authority/sysMenu"

  export default {
    name: "form-view",
    props:{
      parentId:{
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
          parentId:undefined,
          menuName: undefined,
          shortcutMenuName: undefined,
          menuUrl: undefined,
          orderNum: undefined,
          remark: undefined,
          isShortcutMenu: '0'
        }
      },
      metaRule() {
        return {
          menuName: [
            {required: true, message: '菜单名称不能为空', trigger: 'blur'},
            {min: 1, max: 10, message: '菜单名称长度大于1小于10', trigger: 'blur'}
          ],
          shortcutMenuName: [
            {required: true, message: '菜单名称简写不能为空', trigger: 'blur'},
          ],
          menuUrl: [
            {required: true, message: '菜单路径不能为空', trigger: 'blur'},
          ],
        }
      },
      metaList() {
        this.dataForm.parentId=this.parentId
      },
      // ---------------
      fillData(id) {
        this.dataForm.id = id || undefined
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
        })
        if (this.dataForm.id) {
          menuView(this.dataForm.id).then(res => {
            this.dataForm = res.data
          })
        }
      },
      dataFormSubmit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            var http = this.dataForm.id ? menuLevelTwoUpdate(this.dataForm) : menuLevelTwoSave(this.dataForm)
            http.then(res => {
              this.$message({
                message: res.data,
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.visible = false;
                  this.$emit('refreshData');
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
