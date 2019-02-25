<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tabs-panel">
      <span class="active">专家抽取策略</span>
    </div>
    <!-- 表格 -->
    <div class="tablebox">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" size="small" label-position="left" :inline="true" class="demo-form-inline">
          <el-row>
            <el-col :span="24">
              <el-form-item label="禁用专家" prop="companyType">
                <el-button type="primary" size="small">设置禁用专家</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="评标专家总人数" prop="code">
                <el-input v-model="ruleForm.code"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="评标专家总人数" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="医学专家人数" prop="companyIntro">
                <el-input v-model="ruleForm.companyIntro"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="医学专家人数" prop="pyIntro">
                <el-input v-model="ruleForm.pyIntro"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="药学专家人数" prop="pyIntro">
                <el-input v-model="ruleForm.pyIntro"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="药学专家人数" prop="pyIntro">
                <el-input v-model="ruleForm.pyIntro"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="管理学专家人数" prop="remark">
                <el-input type="textarea" :rows="3" v-model="ruleForm.remark"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="管理专家人数" prop="remark">
                <el-input type="textarea" :rows="3" v-model="ruleForm.remark"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-button type="primary" size="small">抽取专家</el-button>
              <i class="el-icon-question icon-center"></i>
              <a href="" class="sh-link link-item">评标专家(已抽取)</a>
              <a href="" class="sh-link link-item">议价专家(已抽取)</a>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-button>返回</el-button>
            </el-col>
          </el-row>
        </el-form>
    </div>

  </div>

</template>
<script>
  export default {
    data() {
      return {
        ruleForm:{
          companyType:'soleType',
          member:'nMember',
          code:'',
          name:'',
          companyIntro:'',
          pyIntro:'',
          alias:'',
          remark:'',
          fileId:'',
          accountName:'',
          depositBank:'',
          accountId:'',
          register:'',
          postcode:'',
          telephone:'',
          companyUrl:'',
          faxes:'',
          registerId:'',
          businessName:'',
          businessType:'',
          person:'',
          domicile:'',
          capital:'',
          fund:'',
          options: [{
            value: '选项1',
            label: '人民币'
          }, {
            value: '选项2',
            label: '美元'
          }, {
            value: '选项3',
            label: '欧元'
          }],
          value: '',
          checked: true,
          organ:'',
          certificate:'',
          cardId:'',
          certificateId:'',
          enterpriseId:'',
          address:'',
          attestation:'',
          fileList: []
        },
        rules:{
          companyType:{ required: true,trigger: 'blur'},
          member:{ required: true,trigger: 'blur'},
          code:{ required: true, message: '请输入企业编码', trigger: 'blur'},
          name:{ required: true, message: '请输入企业名称', trigger: 'blur'},
          companyIntro:{ required: true, message: '请输入企业简介', trigger: 'blur'},
          pyIntro:{ required: true, message: '请输入拼音简介', trigger: 'blur'},
          certificateId:{ required: true, message: '请输入证书编号', trigger: 'blur'},
          enterpriseId:{ required: true, message: '请输入企业名称', trigger: 'blur'},
          attestation:{ required: true, message: '请输入认证范围', trigger: 'blur'}
        }

      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      goAnchor(selector) {
        var anchor = this.$el.querySelector(selector)
        document.body.scrollTop = anchor.offsetTop; // chrome
        document.documentElement.scrollTop = anchor.offsetTop; // firefox
      }
    }
  }
</script>
<style>
  .side{
    position: absolute;
    width: 150px;
    margin: 0;
    padding: 0;
  }
  .side > li > a{
    display: block;
    margin:20px 0;
    padding-left:15px;
    border-right:4px solid #fff;
    line-height:20px;
    cursor:pointer;
    font-size:14px;
    color:#333;
  }
  .side > li > a.current{
    display: block;
    border-right:4px solid #333;
    font-size:16px;
    cursor:default;
  }
  .scroll-content{
    margin-left: 150px;
    margin-bottom: 20px;
    width: 100%;
    border-left: 1px solid #e6e6e6;
  }
  .el-input__inner {
    width:300px !important;
  }
  .el-textarea__inner{
    width:300px !important;
  }
  .fundInput .el-input__inner,fundInput .el-input--suffix{
    width:140px !important;
  }
  .icon-center{
    vertical-align: middle;
    line-height: 32px;
  }
  .btn-mar{
    display: block;
    margin:20px 0 20px 100px;
  }
</style>
