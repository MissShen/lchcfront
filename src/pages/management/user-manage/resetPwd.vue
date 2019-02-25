<template>

  <!-- 表格 -->
  <div class="tablebox">
    <div class="tabs-panel">
      <span class="active">修改密码</span>
    </div>
    <el-form ref="dataForm"
             :model="dataForm"
             :rules="dataRule"
             style="padding-top: 10px;"
             label-width="100px"
             label-position="left"
             size="small">
      <el-row>
        <el-col :span="8" :offset="1">
          <el-form-item label="旧密码" prop="password">
            <el-input type="password" v-model="dataForm.password" placeholder="请输入正确的旧密码"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="1">
          <el-form-item label="新密码" prop="newPwd"  class="is-required">
            <el-input type="password"  v-model="dataForm.newPwd" placeholder="密码长度在6-16位之间"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="1">
          <el-form-item label="确认新密码" prop="checkPwd" class="is-required">
            <el-input type="password"  v-model="dataForm.checkPwd" placeholder="再次输入新密码" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="2">
          <el-form-item>
            <el-button type="primary" @click="dataFormSubmit()">保存</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import {changePwd} from "../../../axios/management/authority/sysUser";
  import {isNotNull} from "src/utils/validateUtil";

  export default {
    name: "reset-pwd",
    data() {
      return {
        dataForm: this.metaForm(),  // 表单数据初始化
        dataRule: this.metaRule(),  // 表单验证初始化
      }
    },
    methods: {
      metaForm() {
        return {
          password: undefined,
          newPwd: undefined,
          checkPwd: undefined,
        }
      },
      metaRule() {
        var validateNewPwd = (rule, value, callback) => {
          if (!isNotNull(value)) {
            callback(new Error('密码不能为空'));
          } else {
            callback()
          }
        };
        var validateCheckPwd = (rule, value, callback) => {
          if (!isNotNull(value)) {
            callback(new Error('确认密码不能为空'))
          } else if (this.dataForm.newPwd !== value) {
            callback(new Error('确认密码与密码输入不一致'))
          } else {
            callback()
          }
        };
        return {
          password: [
            {required: true, message: '旧密码不能为空', trigger: 'blur'},
          ],
          newPwd: [
            {validator: validateNewPwd, trigger: 'blur'},
            {min: 6, max: 16, message: '密码长度在6-16位之间', trigger: 'blur'}
          ],
          checkPwd: [
            {validator: validateCheckPwd, trigger: 'blur'},
            {min: 6, max: 16, message: '密码长度在6-16位之间', trigger: 'blur'}
          ],
        }
      },
      dataFormSubmit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            changePwd(this.dataForm).then(res => {
              this.$resMessage(res, {
                onClose: () => {
                  this.goBack()
                }
              })
            })
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
