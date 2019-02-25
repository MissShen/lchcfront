<template>
  <div class="wrapper login">
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card class="box-card">
          <div slot="header">
            <span>通知公告</span>
            <a href="#" class="card-more">更多&raquo;</a>
          </div>
          <div v-for="o in 6" :key="o" class="card-item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="8" style="position: relative;">
        <span class="log-disabled">KEY登录</span>
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="系统登录" name="first">
            <div>
              <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px">
                <el-form-item label="账号" prop="username">
                  <el-input v-model="ruleForm.username" type="text"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="psw">
                  <el-input v-model="ruleForm.psw" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" style="width:100%;" @click="submitForm('ruleForm')">登录</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>

          <!--<el-tab-pane label="KEY登录" name="second">
            KEY登录
          </el-tab-pane>-->
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    var checkName = (rule, value, callback) => {
      const val = value.trim();
      this.ruleForm.username = val;  //去掉首尾误输入的空格
      if (!val) {
        return callback(new Error('用户名不能为空'));
      }
      setTimeout(() => {
        const patt = /^[a-zA-Z0-9_]{3,16}$/;
        if (!patt.test(val)) {
          return callback(new Error('用户名为3-16个字母、数字和下划线“_”组合'));
        } else {
          callback();
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      rules: {
        username: [
          { validator: checkName, trigger: 'blur' }
        ],
        psw: [
          { validator: validatePass, trigger: 'blur' }
        ]
      },
      ruleForm: {
        username: '',
        psw: ''
      },
      activeName: 'first'
    };
  },
  /*created(){
    this.$api.post('/userController/list',null,function(res) {
      console.log(res.data);
    });
  },*/
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('user name: 【' + this.ruleForm.username);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleClick(tab, event) {
      //console.log(tab, event);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.login .box-card {
  margin: 20px;
}
.login .card-more {
  float: right;
  color: #999;
  font-size: 14px;
}
.login .card-item {
  padding: 9px 0;
  font-size: 14px;
}
.login .el-tabs {
  height: 280px;
  margin: 20px 0;
}
.login .el-tabs__item {
  width: 194px !important;
  text-align: center !important;
}
.login .el-form {
  margin: 20px 30px 0 0;
}
.log-disabled {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 174px;
  height: 38px;
  line-height: 38px;
  text-align: center;
  font-size: 14px;
  z-index: 10;
}
</style>
