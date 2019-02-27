<template>
  <div class="padding20" style="width:600px" v-if="permData.user_view||permData.user_upd">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm"
             @keyup.enter.native="dataFormSubmit()"
             label-position="right" label-width="120px" class="demo-ruleForm" size="small">
      <el-form-item label="用户名称：" prop="userName">
        <el-input v-model="dataForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="登录名称：" prop="userCode" class="is-required">
        <el-input v-model="dataForm.userCode"></el-input>
      </el-form-item>
      <el-form-item label="初始密码：" prop="password">
        <el-input type="password" v-model="dataForm.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码：" prop="checkPwd">
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
      <el-form-item label="微信：" prop="openId">
        <el-input v-model="dataForm.openId"></el-input>
      </el-form-item>
      <el-form-item label="KEY码：" prop="userCaKey">
        <el-input v-if="keyStatus!='0'" v-model="dataForm.userCaKey" disabled></el-input>
        <el-input v-if="keyStatus=='0'" v-model="userCaKey" disabled></el-input>
        <el-button @click="updateKey">刷新KEY</el-button>
        <el-button @click="clearKey">清空KEY</el-button>
        <span v-if="useOutKey" class="el-form-item__error">自动绑定当前插入的KEY,如无需求请先拔出来KEY再进行操作</span>
      </el-form-item>
      <el-form-item label="描述：" prop="remark">
        <el-input type="textarea" v-model="dataForm.remark"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="warning" @click="goBack">返回</el-button>
        <el-button size="small" type="success" @click="dataFormSubmit()" v-if="permData.user_upd">保存
        </el-button>
      </el-form-item>
    </el-form>

    <cat-org v-if="catOrgVisible" ref="catOrg" @chooseOrg="chooseOrgType"></cat-org>
  </div>
</template>

<script>
  import {userView, userUpdate} from "src/axios/management/authority/sysUser"
  import {enumOrgTypeList} from "src/axios/common/common";
  import {isNotNull, numberLineAZ} from "src/utils/validateUtil";
  import catOrg from './catOrg'
  import {mapGetters} from 'vuex'
  import {GetSignCert, GetCertEntityByOid} from "src/assets/XTXSAB"

  export default {
    name: "userUpdate",
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
        useOutKey: false,
        keyStatus: '0',
        userCaKey: '',
        dataForm: this.metaForm(),  // 表单数据初始化
        dataRule: this.metaRule(),  // 表单验证初始化
        permData: this.metaPerm(),  // 权限初始化
        baseOrgTypeList: [],
        orgTypeList: [],
        accountTypeList: []
      }
    },
    mounted() {
      this.metaHasPerm();
      if (this.permData.user_view || this.permData.user_upd) {
        this.dataForm.id = this.$route.params.uid || undefined;
        enumOrgTypeList().then(res => {
          this.baseOrgTypeList = res.data;
          this.orgTypeList = this.baseOrgTypeList;
        });
        this.metaList();
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
          userCaKey: '',
          openId: '',
        }
      },
      metaRule() {
        var validateCheckPwd = (rule, value, callback) => {
          if (this.dataForm.password != value) {
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
            {min: 6, max: 16, message: '密码长度在6-16位之间', trigger: 'blur'}
          ],
          checkPwd: [
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
        if (this.dataForm.id) {
          userView(this.dataForm.id).then(res => {
            if (res.code = 200) {
              this.dataForm = res.data;
              this.userCaKey = res.data.userCaKey;
              if (isNotNull(this.dataForm.accountType)) {
                this.accountTypeList = this.dataForm.accountType.split('');
              }
              this.dataForm.password = undefined;
              this.dataForm.checkPwd = undefined
            }
          })
        }
      },
      metaPerm() {
        return {
          user_view: false,
          user_upd: false,
        }
      },
      metaHasPerm() {
        this.permData.user_view = this.perms['sys:user:view'];
        this.permData.user_upd = this.perms['sys:user:update'];
      },
      // ---------------
      dataFormSubmit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.dataForm.accountType = this.accountTypeList.join('');
            if (this.dataForm.id) {
              if(this.keyStatus=='0'){
              this.dataForm.userCaKey=this.userCaKey;
              }
              userUpdate(this.dataForm).then(res => {
                this.$resMessage(res, {
                  onClose: () => {
                    this.goBack()
                  }
                })
              })
            }
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
        }
      },
      //--------------------------------------------------------------------
      handleCatOrg() {
        this.catOrgVisible = true;
        this.$nextTick(() => {
          this.$refs.catOrg.metaList();
        })
      },
      updateKey() {
        this.initBindKey();
      },
      clearKey() {
        this.dataForm.userCaKey = null;
        this.userCaKey=null;
        this.useOutKey = false;
      },
      packUsbKeyUser(retObj) {
        let _this = this;
        let USB_KEY_USER = [];
        this.dataForm.userCaKey = '';
        let res = {code: 'BIND_KEY', message: 'KEY初始化失败',};
        if (!retObj) {
          this.$resMessage(res);
        } else if ('' == retObj.retVal) {
          this.keyStatus = '0';
        }
        else {
          this.keyStatus = '1';
          let strUserList = retObj.retVal;
          while (true) {
            let i = strUserList.indexOf("&&&");
            if (i <= 0) {
              break;
            }
            let strOneUser = strUserList.substring(0, i);
            let strName = strOneUser.substring(0, strOneUser.indexOf("||"));
            let strCertID = strOneUser.substring(strOneUser.indexOf("||") + 2, strOneUser.length);
            USB_KEY_USER.push({label: strName, value: strCertID});
            let len = strUserList.length;
            strUserList = strUserList.substring(i + 3, len);
          }
          if (USB_KEY_USER.length > 1) {
            res.message = "插入多个KEY,只能绑定第一个";
            this.$resMessage(res);
          }
          GetSignCert(USB_KEY_USER[0].value, function (retObj) {
            GetCertEntityByOid(retObj.retVal, '1.2.86.11.7.1.8', function (retObj) {
              _this.dataForm.userCaKey = retObj.retVal;
            });
          })
        }
      },
      initBindKey() {

      }
    },
  }
</script>

<style>
  .inputWidth {
    width: 400px !important;
  }
</style>
