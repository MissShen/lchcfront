<template>
  <div class="padding20" style="width:600px" v-if="permData.user_view||permData.user_save">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm"
             @keyup.enter.native="dataFormSubmit()"
             label-position="right" label-width="120px" class="demo-ruleForm" size="small">
      <el-form-item label="用户名称：" prop="userName">
        <el-input v-model="dataForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="登录名称：" prop="userCode" class="is-required">
        <el-input v-model="dataForm.userCode"></el-input>
      </el-form-item>
      <el-form-item label="初始密码：" prop="password" class="is-required">
        <el-input type="password" v-model="dataForm.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码：" prop="checkPwd" class="is-required">
        <el-input type="password" v-model="dataForm.checkPwd"></el-input>
      </el-form-item>
      <el-form-item label="所属机构：" prop="orgId">
        <ul class="only-from">
          <li style="width: 83%">
            <el-input v-model="dataForm.orgName"></el-input>
          </li>
          <li class="w10">
            <el-button size="small" @click="handleCatOrg()">选择</el-button>
          </li>
        </ul>
      </el-form-item>
      <el-form-item label="机构性质：" prop="accountType">
        <el-checkbox-group v-model="accountTypeList">
          <el-checkbox v-for="orgType in orgTypeList" :key="orgType.value" :label="orgType.value" disabled>
            {{orgType.label}}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="电话：" prop="telephone">
        <el-input v-model="dataForm.telephone"></el-input>
      </el-form-item>
      <el-form-item label="手机号：" prop="mobile">
        <el-input v-model="dataForm.mobile"></el-input>
      </el-form-item>
      <el-form-item label="邮箱：" prop="email">
        <el-input v-model="dataForm.email"></el-input>
      </el-form-item>
      <el-form-item label="职位：" prop="position">
        <el-input v-model="dataForm.position"></el-input>
      </el-form-item>
      <el-form-item label="KEY码：" prop="userCaKey">
        <el-input v-model="dataForm.userCaKey"></el-input>
      </el-form-item>
      <el-form-item label="描述：" prop="remark">
        <el-input type="textarea" v-model="dataForm.remark"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" size="small" @click="goBack">返回</el-button>
        <el-button size="small" type="primary" @click="dataFormSubmit()" v-if="permData.user_save">保存
        </el-button>
      </el-form-item>
    </el-form>

    <cat-org v-if="catOrgVisible" ref="catOrg" @chooseOrg="chooseOrgType"></cat-org>
  </div>
</template>

<script>
  import {userSave} from "src/axios/management/authority/sysUser"
  import {enumOrgTypeList} from "src/axios/common/common";
  import {isNotNull, numberLineAZ} from "src/utils/validateUtil";
  import catOrg from './catOrg'
  import {mapGetters} from 'vuex'

  export default {
    name: "userAdd",
    components: {
      catOrg
    },
    computed: {
      ...mapGetters([
        'perms',
      ]),
    },
    data() {
      return {
        catOrgVisible: false,
        dataForm: this.metaForm(),  // 表单数据初始化
        dataRule: this.metaRule(),  // 表单验证初始化
        permData: this.metaPerm(),  // 权限初始化
        baseOrgTypeList: [],
        orgTypeList: [],
        accountTypeList: []
      }
    },
    created() {
      this.metaHasPerm();
      if (this.permData.user_view || this.permData.user_save) {
        enumOrgTypeList().then(res => {
          if (res.code == 200) {
            this.baseOrgTypeList = res.data;
            this.orgTypeList = this.baseOrgTypeList;
            this.metaList();
          }
        });

      }
    },
    methods: {
      metaForm() {
        return {
          id: undefined,
          userName: undefined,
          userCode: undefined,
          password: undefined,
          checkPwd: undefined,
          orgId: undefined,
          orgName: undefined,
          telephone: undefined,
          mobile: undefined,
          email: undefined,
          position: undefined,
          accountType: undefined,
          remark: '',
        }
      },
      metaRule() {
        var validateCheckPwd = (rule, value, callback) => {
          if (this.dataForm.password !== value) {
            callback(new Error('确认密码与密码输入不一致'))
          } else {
            callback()
          }
        };
        var validateUserCode = (rule, value, callback) => {
          if (!numberLineAZ(value)) {
            callback(new Error('登录名称为3-16个字母、数字和下划线“_”组合'))
          } else {
            callback()
          }
        };
        return {
          userCode: [
            {required: true, message: '登录名称不能为空', trigger: 'blur'},
            {validator: validateUserCode, trigger: 'blur'},
          ],
          userName: [
            {required: true, message: '用户名称不能为空', trigger: 'blur'},
            {min: 1, max: 20, message: '用户名称长度小于20', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'},
            {min: 6, max: 16, message: '密码长度在6-16位之间', trigger: 'blur'}
          ],
          checkPwd: [
            {required: true, message: '确认密码不能为空', trigger: 'blur'},
            {validator: validateCheckPwd, trigger: 'blur'},
            {min: 6, max: 16, message: '密码长度在6-16位之间', trigger: 'blur'}
          ],
        }
      },
      metaList() {
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields();
          this.dataForm = this.metaForm()
        });
      },
      metaPerm() {
        return {
          user_view: false,
          user_save: false,
        }
      },
      metaHasPerm() {
        this.permData.user_view = this.perms['sys:user:view'];
        this.permData.user_save = this.perms['sys:user:save'];
      },
      // ---------------
      dataFormSubmit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.dataForm.accountType = this.accountTypeList.join('');
            userSave(this.dataForm).then(res => {
              this.$resMessage(res, {
                onClose: () => {
                  this.goBack()
                }
              })
            })
          }
        })
      },
      goBack() {
        this.$router.go(-1)
      },
      chooseOrgType(orgId, orgType, orgName) {
        this.dataForm.orgId = orgId;
        this.dataForm.orgName = orgName;
        if (isNotNull(orgType)) {
          this.accountTypeList = orgType.split('');
          let orgTypeNewList = [];
          this.baseOrgTypeList.map(item => {
            this.accountTypeList.forEach(itemValue => {
              if (itemValue === item.value) {
                orgTypeNewList.push(item);
              }
            })
          });
          this.orgTypeList = orgTypeNewList;
        } else {
          this.orgTypeList = []
        }
      },
      //--------------------------------------------------------------------
      handleCatOrg() {
        this.catOrgVisible = true;
        this.$nextTick(() => {
          this.$refs.catOrg.metaList();
        })
      }
    }
  }
</script>

<style>
  .inputWidth {
    width: 400px !important;
  }
</style>
