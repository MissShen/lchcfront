<template>
  <div>
    <!-- ========================== 新增联系人 ========================= -->
    <div class="padding50">
      <el-form :model="query" ref="query" :rules="rules" label-width="108px" :inline="true" size="small" class="form-view">
        <el-row :gutter="64">
          <el-col :span="8">
            <el-form-item label="联系人姓名：" prop="linkman">
              <el-input v-model="query.linkman" maxlength="25"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所在部门：" prop="linkmanDepartment">
              <el-input v-model="query.linkmanDepartment" maxlength="25"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="64">
          <el-col :span="8">
            <el-form-item label="职务：" prop="linkmanJob">
              <el-input v-model="query.linkmanJob" maxlength="25"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="座机号码：" prop="telePhone">
              <el-input v-model="query.telePhone" maxlength="25"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="64">
          <el-col :span="8">
            <el-form-item label="手机号码：" prop="mobilePhone">
              <el-input v-model="query.mobilePhone" maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="传真号码：" prop="faxNumber">
              <el-input v-model="query.faxNumber" maxlength="25"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="64">
          <el-col :span="8">
            <el-form-item label="QQ号码：" prop="qqNumber">
              <el-input v-model="query.qqNumber" maxlength="25"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="微信号：" prop="wechatCode">
              <el-input v-model="query.wechatCode" maxlength="25"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="64">
          <el-col :span="8">
            <el-form-item label="通讯地址：" prop="contactAddress">
              <el-input v-model="query.contactAddress" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮政编码：" prop="postalCode">
              <el-input v-model="query.postalCode" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="64">
          <el-col :span="16">
            <el-form-item label="备注：" prop="comments">
              <el-input type="textarea" rows="4" v-model="query.comments" maxlength="600"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="64">
          <el-col :span="24">
            <el-form-item label=" ">
              <el-button type="primary" @click="submitForm('from')" size="small">保存</el-button>
              <el-button size="small" @click="reset()" class="el-button-pale">返回</el-button>
              <el-input type="hidden" v-model="query.id"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>

  import {selectInfo,updatePersonInfo} from 'src/axios/trade/enterprise/enterprise'
  import {isMobileForm,isPhoneForm,isPostCode} from "src/utils/validateUtil";

  export default {
    data() {
      return {
        query:this.metaQuery(),
        rules:{
          linkman:{ required: true, message: '请输入联系人姓名', trigger: 'blur'},
          linkmanDepartment:{ required: true, message: '请输入部门名称', trigger: 'blur'},
          linkmanJob:{ required: false},
          telePhone:[
            { required: true, message: '请输入座机号码', trigger: 'blur' },
            { pattern:isPhoneForm,message:'请输入正确座机号码'}
          ],
          mobilePhone:[
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { pattern:isMobileForm, message: '请输入正确手机号'}
          ],
          faxNumber:{ required: false},
          qqNumber:{ required: false},
          wechatCode:{ required: true, message: '请输入微信号', trigger: 'blur' },
          contactAddress:{ required: true, message: '请输入通讯地址', trigger: 'blur' },
          postalCode:[
            { required: true, message: '请输入邮政编码', trigger: 'blur' },
            { pattern:isPostCode, message: '请输入正确邮政编码'}
          ],
          comments:{ required: false}
        }
      };
    },
    created(){
      this.list()
    },
    methods: {
      metaQuery(){
        return{
          id:this.$route.params.id,
          updateAdd:this.$route.params.param,
          linkman: '',
          linkmanDepartment:'',
          linkmanJob:'',
          telePhone:'',
          mobilePhone:'',
          faxNumber:'',
          qqNumber: '',
          wechatCode: '',
          contactAddress: '',
          comments:''
        }
      },
      list(){
        if(this.$route.params.param === 'update'){
          selectInfo(this.query).then(res => {
            this.query = res.data.list[0];
          })
        }else {
          return false;
        }
      },
      reset(){
        this.$router.go(-1)
      },
      submitForm() {
        this.$refs['query'].validate((valid) => {
          if (valid) {
            updatePersonInfo(this.query).then(res => {
              this.$message({
                type: 'success',
                message: '成功！'
              })
              this.reset();
            })
          }
        });
      }
    }
  }
</script>
