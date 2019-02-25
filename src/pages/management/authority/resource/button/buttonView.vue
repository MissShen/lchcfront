<template>
  <el-dialog
    :title="!dataForm.id ? '新增按钮' : '修改按钮'"
    :append-to-body="true"
    top="4vh"
    :close-on-click-modal="false"
    v-if="permData.resource_button_view||permData.resource_button_add||permData.resource_button_upd"
    :visible.sync="visible" width="500px">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="100px" label-position="right">
      <el-form-item label="按钮名称：" prop="resourceName">
        <el-input v-model="dataForm.resourceName" placeholder="按钮名称" size="small"></el-input>
      </el-form-item>
      <el-form-item label="按钮路径：" prop="resourceUrl">
        <el-input v-model="dataForm.resourceUrl" placeholder="按钮路径" size="small"></el-input>
      </el-form-item>
      <el-form-item label="权限标识：" prop="permissionName">
        <el-input v-model="dataForm.permissionName" placeholder="权限唯一标识" size="small"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="visible = false" size="small">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()" v-if="permData.resource_button_add||permData.resource_button_upd" size="small">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {resourceView, resourceSave, resourceUpdate} from "src/axios/management/authority/sysResource";
  import {mapGetters} from 'vuex'

  export default {
    name: "button-view",
    props: {
      parentId: {
        type: String,
        required: true
      }
    },
    computed: {
      ...mapGetters([
        'perms',
      ]),
    },
    data() {
      return {
        visible: false,
        dataForm: this.metaForm(),
        dataRule: this.metaRule(),
        permData: this.metaPerm(), // 权限初始化
      }
    },
    created() {
      this.metaHasPerm();
      if (this.permData.resource_button_view || this.permData.resource_button_add || this.permData.resource_button_upd) {
        this.metaList()
      }
    },
    methods: {
      metaForm() {
        return {
          id: undefined,
          resourceName: undefined,
          resourceUrl: undefined,
          permissionName: undefined,
          resourceType: 'BUTTON'
        }
      },
      metaRule() {
        return {
          resourceName: [
            {required: true, message: '按钮名称不能为空', trigger: 'blur'},
            {min: 1, max: 20, message: '菜单名称长度大于1小于20', trigger: 'blur'}
          ],
          resourceUrl: [
            {required: true, message: '按钮路径不能为空', trigger: 'blur'},
          ],
          permissionName: [
            {required: true, message: '权限标识不能为空', trigger: 'blur'},
          ],
        }
      },
      metaList() {
        this.dataForm.menuId = this.parentId
      },
      metaPerm() {
        return {
          resource_button_view: false,
          resource_button_add: false,
          resource_button_upd: false,
        }
      },
      metaHasPerm() {
        this.permData.resource_button_add = this.perms['sys:resource_button:save'];
        this.permData.resource_button_view = this.perms['sys:resource_button:view'];
        this.permData.resource_button_upd = this.perms['sys:resource_button:update'];
      },
      // ---------------
      fillButtonData(id) {
        if (this.permData.resource_button_view || this.permData.resource_button_add || this.permData.resource_button_upd) {
          this.visible = true;
          this.dataForm.id = id || undefined;
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields()
          })
          if (this.dataForm.id) {
            resourceView(this.dataForm.id).then(res => {
              this.dataForm = res.data
            })
          }
        }
      },
      dataFormSubmit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.dataForm.parentId = this.parentId;
            var http = this.dataForm.id ? resourceUpdate(this.dataForm) : resourceSave(this.dataForm)
            http.then(res => {
              this.$resMessage(res,{
                onClose: () => {
                  this.visible = false;
                  this.$emit('refreshData');
                }
              });
            })
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
