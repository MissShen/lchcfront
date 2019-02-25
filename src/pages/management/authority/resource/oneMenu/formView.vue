<template>
  <el-dialog
    :title="!dataForm.id ? '新增菜单' : '修改菜单'"
    :close-on-click-modal="false"
    v-if="permData.resource_one_add||permData.resource_one_upd||permData.resource_one_view"
    :visible.sync="visible" width="500px">
    <div style="width: 400px">
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
               label-width="100px">
        <el-form-item label="菜单名称：" prop="resourceName">
          <el-input v-model="dataForm.resourceName" placeholder="菜单名称" size="small"></el-input>
        </el-form-item>
        <el-form-item label="权限标识：" prop="permissionName">
          <el-input v-model="dataForm.permissionName" placeholder="权限唯一标识" size="small"></el-input>
        </el-form-item>
        <el-form-item label="所属系统：" prop="systemId">
          <el-select v-model="dataForm.systemId" placeholder="选择系统" class="w100" size="small">
            <el-option v-for="busSys in busSysList" :key="busSys.id" :label="busSys.systemName"
                       :value="busSys.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer">
      <el-button @click="visible = false" size="small">取消</el-button>
      <el-button type="primary" v-if="permData.resource_one_add||permData.resource_one_upd"
                 @click="dataFormSubmit()" size="small">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {busSysList} from "src/axios/management/authority/headMenu"
  import {resourceView, resourceSave, resourceUpdate} from "src/axios/management/authority/sysResource";
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
        permData: this.metaPerm(), // 权限初始化
        busSysList: undefined
      }
    },
    created() {
      this.metaHasPerm();
      if (this.permData.resource_one_add || this.permData.resource_one_upd || this.permData.resource_one_view) {
        this.metaList()
      }
    },
    methods: {
      metaForm() {
        return {
          id: undefined,
          resourceName: undefined,
          permissionName: undefined,
          systemId: undefined,
          resourceType: 'MENU'
        }
      },
      metaRule() {
        return {
          resourceName: [
            {required: true, message: '菜单名称不能为空', trigger: 'blur'},
            {min: 1, max: 20, message: '菜单名称长度大于1小于20', trigger: 'blur'}
          ],
          systemId: [
            {required: true, message: '所属系统不能为空', trigger: 'blur'},
          ],
          permissionName: [
            {required: true, message: '权限标识不能为空', trigger: 'blur'},
          ],
        }
      },
      metaPerm() {
        return {
          resource_one_view: false,
          resource_one_add: false,
          resource_one_upd: false,
        }
      },
      metaHasPerm() {
        this.permData.resource_one_add = this.perms['sys:resource_one:save'];
        this.permData.resource_one_view = this.perms['sys:resource_one:view'];
        this.permData.resource_one_upd = this.perms['sys:resource_one:update'];
      },
      metaList() {
        busSysList().then(res => {
          this.busSysList = res.data
        });
      },
      // ---------------
      fillData(id) {
        if (this.permData.resource_one_add || this.permData.resource_one_upd || this.permData.resource_one_view) {
          this.dataForm.id = id || undefined;
          this.visible = true;
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields();
          });
          if (this.dataForm.id) {
            resourceView(this.dataForm.id).then(res => {
              this.dataForm = res.data;
            })
          }
        }
      },
      dataFormSubmit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            var http = this.dataForm.id ? resourceUpdate(this.dataForm) : resourceSave(this.dataForm)
            http.then(res => {
              this.$resMessage(res,{
                onClose: () => {
                  this.visible = false;
                  this.$emit('refreshData')
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
