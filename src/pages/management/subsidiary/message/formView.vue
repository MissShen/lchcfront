<template>
  <el-dialog :title="dataForm.id?'修改消息类型':'新增消息类型'" :visible.sync="visible" width="50%" top="15vh">
    <div class="padding20" style="width: 500px"
         v-if="permData.message_type_upd||permData.message_type_add||permData.message_type_view">
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
               label-width="150px" size="small">
        <el-form-item label="消息类型编码：" prop="msgTypeCode">
          <el-input v-model="dataForm.msgTypeCode"></el-input>
        </el-form-item>
        <el-form-item label="消息类型名称：" prop="msgTypeName">
          <el-input v-model="dataForm.msgTypeName"></el-input>
        </el-form-item>
        <el-form-item label="所属系统：" prop="systemCode">
          <el-select v-model="dataForm.systemCode" placeholder="所属系统" class="w100">
            <el-option v-for="busSys in busSysInfoList"
                       :key="busSys.systemUnicode"
                       :label="busSys.systemName"
                       :value="busSys.systemUnicode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否推送站内：" prop="isSendWeb">
          <el-radio v-model="dataForm.isSendWeb" label="1">是</el-radio>
          <el-radio v-model="dataForm.isSendWeb" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="是否推送微信：" prop="isSendWeixin">
          <el-radio v-model="dataForm.isSendWeixin" label="1">是</el-radio>
          <el-radio v-model="dataForm.isSendWeixin" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="内容模板：" prop="contentTemplate">
          <el-input type="textarea" v-model="dataForm.contentTemplate"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input type="textarea" v-model="dataForm.remark"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" type="success" @click="dataFormSubmit()"
             v-if="permData.message_type_add||permData.message_type_upd">提交
      </el-button>
      <el-button @click="visible = false">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>

  import {
    findMessageTypeByTypeId,
    messageTypeAdd,
    messageTypeEdit
  } from "src/axios/management/subsidiary/message";
  import {busSysList} from "src/axios/management/authority/headMenu"
  import {HasPerm} from 'src/components/mixins'

  import {mapGetters} from 'vuex';

  export default {
    name: "form-view",
    mixins: [HasPerm],
    computed: {
      ...mapGetters([
        'perms',
        'loginId',
        'loginCode'
      ]),
    },
    data() {
      return {
        visible: false,
        dataForm: this.metaDataForm(),
        dataRule: this.metaRule(),
        permData: this.metaPerm(), // 权限初始化
        busSysInfoList: []
      }
    },
    created() {
      this.metaHasPerm();
      if (this.permData.message_type_upd || this.permData.message_type_add || this.permData.message_type_view) {
        this.dataForm.id = this.$route.params.tid || undefined;
        this.metaList()
      }
    },
    methods: {
      metaDataForm() {
        return {
          id: '',
          systemCode: '',
          msgTypeCode: '',
          msgTypeName: '',
          contentTemplate: '',
          isSendWeixin: '',
          isSendWeb: '',
          loginId: this.loginId,
          loginName: this.loginCode,
          remark: ''
        }
      },
      metaRule() {
        return {
          msgTypeCode: [
            {required: true, message: '消息类型编码不能为空', trigger: 'blur'},
            {min: 1, max: 10, message: '名称长度大于1小于10', trigger: 'blur'}
          ],
          msgTypeName: [
            {required: true, message: '消息类型名称不能为空', trigger: 'blur'},
            {min: 1, max: 25, message: '名称长度大于1小于50', trigger: 'blur'}
          ],
          systemCode: [
            {required: true, message: '请选择所属系统', trigger: 'blur'}
          ],
          isSendWeb: [
            {required: true, message: '请选择是否推送站内', trigger: 'blur'}
          ],
          isSendWeixin: [
            {required: true, message: '请选择是否推送微信', trigger: 'blur'}
          ],
          contentTemplate: [
            {required: true, message: '内容模板不能为空', trigger: 'blur'},
            {min: 1, max: 500, message: '名称长度大于1小于500', trigger: 'blur'}
          ],
        }
      },
      metaList(id) {
        this.visible = true;
        if (this.$refs['dataForm']) {
          this.$refs['dataForm'].resetFields();
        }
        this.dataForm = this.metaDataForm();
        if (id) {
          this.dataForm.id = id;
          findMessageTypeByTypeId(id).then(res => {
            if (res.code == 200) {
              this.dataForm = res.data
            } else {
              this.$resMessage(res)
            }
          })
        }
        busSysList().then(res => {
          this.busSysInfoList = res.data
        })
      },
      metaPerm() {
        return {
          message_type_add: false,
          message_type_upd: false,
          message_type_view: false,
        }
      },
      metaHasPerm() {
        this.permData.message_type_add = this.perms['sys:message_type:save'];
        this.permData.message_type_upd = this.perms['sys:message_type:update'];
        this.permData.message_type_view = this.perms['sys:message_type:list'];
      },
      // ---------------
      dataFormSubmit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            var http = this.dataForm.id ? messageTypeEdit(this.dataForm) : messageTypeAdd(this.dataForm)
            http.then(res => {
              this.$message({
                message: res.data,
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.visible = false;
                  this.$emit('refreshMessageType');
                }
              })
            })
          }
        })
      },
      goBack() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>

</style>
