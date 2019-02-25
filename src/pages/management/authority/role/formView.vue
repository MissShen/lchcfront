<template>
  <el-dialog
    :title="!dataForm.id ? '新增角色' : '修改角色'"
    :close-on-click-modal="false"
    v-if="permData.role_view||permData.role_save||permData.role_upd"
    :visible.sync="visible" width="500px">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="100px">
      <el-form-item label="角色类型：" prop="roleName" v-if="!dataForm.id">
        <el-radio-group v-model="dataForm.roleType">
          <el-radio v-for="item in roleTypeList"
                    :key="item.value"
                    :label="item.value"
                    >{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="角色名称：" prop="roleName">
        <el-input v-model="dataForm.roleName" placeholder="角色名称" size="small"></el-input>
      </el-form-item>
      <el-form-item label="角色编码：" prop="roleCode">
        <el-input v-model="dataForm.roleCode" placeholder="角色编码" size="small"></el-input>
      </el-form-item>
      <el-form-item label="角色备注：" prop="remark">
        <el-input type="textarea" v-model="dataForm.remark" placeholder="备注信息" size="small"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="visible = false" size="small">取消</el-button>
      <el-button type="primary" size="small" @click="dataFormSubmit()"
                 v-if="permData.role_save||permData.role_upd">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {roleView, roleSave, roleUpdate, enumRoleTypeList} from "src/axios/management/authority/sysRole";
  import {mapGetters} from 'vuex'

  export default {
    name: "form-view",
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
        permData: this.metaPerm(),
        roleTypeList: [],
        busSysList: undefined
      }
    },
    created() {
      this.initOnceRoleTypeList();
    },
    methods: {
      metaForm() {
        return {
          id: undefined,
          roleName: undefined,
          roleCode: undefined,
          roleType: '1',
          remark: undefined
        }
      },
      metaRule() {
        return {
          roleName: [
            {required: true, message: '角色名称不能为空', trigger: 'blur'},
            {min: 1, max: 25, message: '角色名称最多25个字符', trigger: 'blur'}
          ],
          roleCode: [
            {required: true, message: '角色编码不能为空', trigger: 'blur'},
            {min: 1, max: 25, message: '角色编码最多25个字符', trigger: 'blur'}
          ],
          roleType: [
            {required: true, message: '角色类型不能为空', trigger: 'blur'},
          ],
        }
      },
      metaPerm() {
        return {
          role_view: false,
          role_save: false,
          role_update: false,
        }
      },
      metaHasPerm() {
        this.permData.role_view = this.perms['sys:role:view'];
        this.permData.role_save = this.perms['sys:role:save'];
        this.permData.role_upd = this.perms['sys:role:update'];
      },

      initOnceRoleTypeList() {
        enumRoleTypeList().then(res => {
          if (res.code == 200) {
            this.roleTypeList = res.data;
          } else {
            this.$resMessage(res)
          }
        })
      },
      fillData(id) {
        this.metaHasPerm();
        if (this.permData.role_view || this.permData.role_save || this.permData.role_upd) {
          this.dataForm.id = id || undefined;
          this.visible = true;
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields()
          });
          if (this.dataForm.id) {
            roleView(this.dataForm.id).then(res => {
              this.dataForm = res.data
            })
          }
        }
      },
      dataFormSubmit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            let http = this.dataForm.id ? roleUpdate(this.dataForm) : roleSave(this.dataForm);
            http.then(res => {
              this.$resMessage(res, {
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
