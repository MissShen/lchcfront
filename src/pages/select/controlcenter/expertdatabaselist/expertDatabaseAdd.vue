<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tabs-panel">
      <span class="active">专家库</span>
    </div>
    <div class="padding20">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" size="small" label-position="left" class="demo-form-inline" :inline="true">
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名" prop="用户名">
              <el-input v-model="dataForm.aa"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="性别">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="姓名">
              <el-input v-model="dataForm.nameChn"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年龄" prop="年龄">
              <el-input v-model="dataForm.tradeName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="单位" prop="单位"  class="inputWidth">
              <el-input v-model="dataForm.name"></el-input>
            </el-form-item>
            <el-button type="warning" size="small">
              选择
            </el-button>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证号" prop="身份证号">
              <el-input v-model="dataForm.code"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="学科" prop="学科">
              <el-input v-model="dataForm.code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="联系电话">
              <el-input v-model="dataForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="类别" prop="类别">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="邮箱">
              <el-input v-model="dataForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row>
        <el-col :span="12" :offset="3">
          <el-button size="small" type="primary" @click="dataFormSubmit()">保存</el-button>
          <el-button size="small" @click="goBack">返回</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>


  export default {
    name: "form-view",
    data() {
      return {
        dataForm: this.metaForm(),
        dataRule: this.metaRule(),
        rules:{
          用户名:{ required: true,trigger: 'blur'},
          性别:{ required: true,trigger: 'blur'},
          年龄:{ required: true, message: '请输入企业编码', trigger: 'blur'},
          姓名:{ required: true, message: '请输入企业名称', trigger: 'blur'},
          单位:{ required: true, message: '请输入企业简介', trigger: 'blur'},
          身份证号:{ required: true, message: '请输入拼音简介', trigger: 'blur'},
          学科:{ required: true, message: '请输入证书编号', trigger: 'blur'},
          联系电话:{ required: true, message: '请输入企业名称', trigger: 'blur'},
          邮箱:{ required: true, message: '请输入认证范围', trigger: 'blur'},
          类别:{ required: true, message: '请输入认证范围', trigger: 'blur'}
        }
      }
    },
    created() {
      this.dataForm.id = this.$route.params.uid || '0'
      this.metaList()
    },
    methods: {
      metaForm() {
        return {
          id: '0',
          userName: undefined,
          userCode: undefined,
          password: undefined,
          pwd2: undefined,
          orgId: undefined,
          telephone: undefined,
          mobile: undefined,
          email: undefined,
          position: undefined,
          accountType: undefined,
          remark: undefined,
        }
      },
      metaRule() {
        return {
          用户名: [
            {required: true, message: '使用名称不能为空', trigger: 'blur'},
          ],
          性别: [
            {required: true, message: '使用名称不能为空', trigger: 'blur'},
          ],
          姓名: [
            {required: true, message: '使用名称不能为空', trigger: 'blur'},
          ],
          年龄: [
            {required: true, message: '使用名称不能为空', trigger: 'blur'},
          ],
          单位: [
            {required: true, message: '使用名称不能为空', trigger: 'blur'},
          ],
          身份证号: [
            {required: true, message: '使用名称不能为空', trigger: 'blur'},
          ],
          学科: [
            {required: true, message: '使用名称不能为空', trigger: 'blur'},
          ],
          联系电话: [
            {required: true, message: '使用名称不能为空', trigger: 'blur'},
          ],
          类别: [
            {required: true, message: '使用名称不能为空', trigger: 'blur'},
          ],
          邮箱: [
            {required: true, message: '使用名称不能为空', trigger: 'blur'},
          ],
        }
      },
      metaList() {
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
        })
        if (this.dataForm.id !=='0') {
          userView(this.dataForm.id).then(res => {
            this.dataForm = res.data
            this.dataForm.password = undefined
            this.dataForm.pwd2 = undefined
          })
        }else{
          this.dataForm=this.metaForm()
        }
      },
      // ---------------
      dataFormSubmit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            var http = this.dataForm.id!=='0'? userUpdate(this.dataForm) : userSave(this.dataForm)
            http.then(res => {
              this.$message({
                message: res.data,
                type: 'success',
                duration: 1000,
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
      }
    }
  }
</script>

<style>
  .el-input__inner {
    width:300px !important;
  }
  .inputWidth .el-input__inner{
    width:230px !important;
  }
</style>

