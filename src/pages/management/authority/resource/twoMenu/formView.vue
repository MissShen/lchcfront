<template>
  <div>
    <el-dialog
      :title="!dataForm.id ? '新增菜单' : '修改菜单'"
      :close-on-click-modal="false"
      v-if="permData.resource_two_view ||permData.resource_two_add ||permData.resource_two_upd"
      top="4vh"
      width="50%"
      :visible.sync="visible">
      <div class="gap-40">
        <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
                 label-width="120px" label-position="right">
          <el-form-item label="菜单名称：" prop="resourceName">
            <el-input v-model="dataForm.resourceName" placeholder="菜单名称" size="small"></el-input>
          </el-form-item>
          <el-form-item label="名称简写：" prop="shortcutMenuName">
            <el-input v-model="dataForm.shortcutMenuName" placeholder="菜单名称简写" size="small"></el-input>
          </el-form-item>
          <el-form-item label="页面锚点：" prop="anchorPosition">
            <el-input v-model="dataForm.anchorPosition" placeholder="快捷菜单页面锚点" size="small"></el-input>
          </el-form-item>
          <el-form-item label="菜单路径：" prop="resourceUrl">
            <el-input v-model="dataForm.resourceUrl" placeholder="菜单路径" size="small"></el-input>
          </el-form-item>
          <el-form-item label="菜单图标：" prop="shortcutMenuIcon">
            <i class="iconfont" :class="dataForm.shortcutMenuIcon"></i>
            <el-button @click="iconVisible=true" size="small">选择</el-button>
          </el-form-item>
          <el-form-item label="权限标识：" prop="permissionName">
            <el-input v-model="dataForm.permissionName" placeholder="权限唯一标识" size="small"></el-input>
          </el-form-item>
          <el-form-item label="菜单序号：" prop="orderNum">
            <el-input v-model="dataForm.orderNum" placeholder="菜单序号" size="small"></el-input>
          </el-form-item>
          <el-form-item label="菜单备注：" prop="remark">
            <el-input type="textarea" v-model="dataForm.remark" placeholder="备注信息" size="small"></el-input>
          </el-form-item>
          <el-form-item label="是否快捷菜单：" prop="isShortcutMenu">
            <el-radio v-model="dataForm.isShortcutMenu" label="1">是</el-radio>
            <el-radio v-model="dataForm.isShortcutMenu" label="0">否</el-radio>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
      <el-button @click="visible = false" size="small">取消</el-button>
      <el-button type="primary" v-if="permData.resource_two_upd||permData.resource_two_add"
                 @click="dataFormSubmit()" size="small">确定</el-button>
    </span>
    </el-dialog>

    <icon-list v-if="iconVisible"  @callBack="handleIcon"></icon-list>
  </div>
</template>

<script>
  import {resourceView, resourceSave, resourceUpdate} from "src/axios/management/authority/sysResource";
  import {mapGetters} from 'vuex'
  import iconList from 'src/components/iconList'

  export default {
    name: "form-view",
    props: {
      parentId: {
        type: String,
        required: true
      }
    },
    components: {iconList},
    computed: {
      ...mapGetters([
        'perms',
      ]),
    },
    data() {
      return {
        visible: false,
        iconVisible: false,
        dataForm: this.metaForm(),
        dataRule: this.metaRule(),
        permData: this.metaPerm(), // 权限初始化
      }
    },
    created() {
      this.metaHasPerm();
    },
    methods: {
      metaForm() {
        return {
          id: undefined,
          parentId: undefined,
          resourceName: undefined,
          shortcutMenuName: undefined,
          shortcutMenuIcon: undefined,
          resourceUrl: undefined,
          permissionName: undefined,
          anchorPosition: undefined,
          orderNum: undefined,
          remark: undefined,
          isShortcutMenu: '0',
          resourceType: 'MENU'
        }
      },
      metaRule() {
        return {
          resourceName: [
            {required: true, message: '菜单名称不能为空', trigger: 'blur'},
            {min: 1, max: 20, message: '菜单名称长度大于1小于20', trigger: 'blur'}
          ],
          shortcutMenuName: [
            {required: true, message: '快捷菜单名称简写不能为空', trigger: 'blur'},
          ],
          resourceUrl: [
            {required: true, message: '菜单路径不能为空', trigger: 'blur'},
          ],
          anchorPosition: [
            {max:10, message: '快捷菜单页面锚点最大长度为10', trigger: 'blur'},
          ],
          permissionName: [
            {required: true, message: '权限唯一不能为空', trigger: 'blur'},
          ],
        }
      },
      metaPerm() {
        return {
          resource_two_view: false,
          resource_two_add: false,
          resource_two_upd: false,
        }
      },
      metaHasPerm() {
        this.permData.resource_two_add = this.perms['sys:resource_two:save'];
        this.permData.resource_two_view = this.perms['sys:resource_two:view'];
        this.permData.resource_two_upd = this.perms['sys:resource_two:update'];
      },
      // ---------------
      fillData(id) {
        if (this.permData.resource_two_view || this.permData.resource_two_add || this.permData.resource_two_upd) {
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
            this.dataForm.parentId = this.parentId;
            let http = this.dataForm.id ? resourceUpdate(this.dataForm) : resourceSave(this.dataForm);
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
      },
      handleIcon(icon) {
        if(icon){
          this.dataForm.shortcutMenuIcon = icon;
        }
        this.iconVisible = false;
      }
    }
  }
</script>

