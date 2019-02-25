<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tabs-panel">
      <span class="active">新增零售企业(零售药店)信息</span>
    </div>
    <!-- 表格 -->
  <div class="main">
    <ul class="side">
      <li><a href="#qyjc" class="current d_jump">企业基础信息</a></li>
      <li><a href="#zx" class="d_jump">资信信息</a></li>
      <li><a href="#yyzz" class="d_jump">营业执照信息</a></li>
      <li><a href="#jyxx" class="d_jump">经营信息</a></li>
      <li><a href="#gsp" class="d_jump">GSP信息</a></li>
    </ul>
    <div class="scroll-content from-view">
      <div class="gap-40">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" size="small" label-position="left" class="demo-form-inline" :inline="true">
          <h3>企业基础信息</h3>
          <el-row>
            <el-col :span="12">
              <el-form-item label="企业类型：" prop="companyType">
                <el-radio-group v-model="ruleForm.companyType">
                  <el-radio label="soleType">单体零售企业</el-radio>
                  <el-radio label="chainType">单体连锁企业</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否会员：" prop="member">
                <el-radio-group v-model="ruleForm.member">
                  <el-radio label="yMember">是</el-radio>
                  <el-radio label="nMember">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="企业编码：" prop="code">
                <el-input v-model="ruleForm.code"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="企业名称：" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="企业简介：" prop="companyIntro">
                <el-input v-model="ruleForm.companyIntro"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="拼音简介：" prop="pyIntro">
                <el-input v-model="ruleForm.pyIntro"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="企业曾用名：" prop="alias">
                <el-input type="textarea" :rows="3" v-model="ruleForm.alias"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注：" prop="remark">
                <el-input type="textarea" :rows="3" v-model="ruleForm.remark"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="归档文件号：" prop="fileId">
                <el-input v-model="ruleForm.fileId"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <h3>资信信息</h3>
          <el-row>
            <el-col :span="12">
              <el-form-item label="开户名称" prop="accountName">
                <el-input v-model="ruleForm.accountName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="开户银行：" prop="depositBank">
                <el-input v-model="ruleForm.depositBank"></el-input>
              </el-form-item>
            </el-col>
        </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="开户账号" prop="accountId">
                <el-input v-model="ruleForm.accountId"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="纳税人登记号：" prop="register">
                <el-input v-model="ruleForm.register"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="邮政编码：" prop="postcode">
                <el-input v-model="ruleForm.postcode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="企业电话：" prop="telephone">
                <el-input v-model="ruleForm.telephone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="企业网址：" prop="companyUrl">
                <el-input v-model="ruleForm.companyUrl"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="企业传真：" prop="faxes">
                <el-input v-model="ruleForm.faxes"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <h3>营业执照信息</h3>
          <el-row>
            <el-col :span="12">
              <el-form-item label="注册号：" prop="registerId">
                <el-input v-model="ruleForm.registerId"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="名称：" prop="businessName">
                <el-input v-model="ruleForm.businessName":disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="类型：" prop="businessType">
                <el-input v-model="ruleForm.businessType" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="法人代表：" prop="person">
                <el-input v-model="ruleForm.person"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
               <el-form-item label="住所：" prop="domicile">
               <el-input v-model="ruleForm.domicile"></el-input>
               </el-form-item>
              <i class="el-icon-question icon-center"></i>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="注册资本：" prop="capital">
                <el-input v-model="ruleForm.capital"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="注册资金：" prop="fund">
                <el-input v-model="ruleForm.fund" class="fundInput"></el-input>
              </el-form-item>
              <el-form-item>
                <el-select v-model="ruleForm.value" placeholder="请选择" size="small" class="fundInput" >
                  <el-option v-for="item in ruleForm.options" :key="item.value" :label="item.label" :value="item.value" class="fundInput">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="成立日期：" prop="data">
                <el-date-picker v-model="ruleForm.data" type="date" placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="活动时间：">
              <el-col :span="22" >
                <span style="width: 300px">
                <el-date-picker type="date" placeholder="选择日期"  style="width:300px"></el-date-picker>
                </span>
                <span>至</span>
                <span><el-time-picker type="fixed-time" placeholder="选择时间" style="width:300px"></el-time-picker></span>
              </el-col>
              <el-col :span="2">
                <el-checkbox v-model="ruleForm.checked">永久有效</el-checkbox>
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="经营范围：" prop="alias">
                <el-input type="textarea" :rows="3" v-model="ruleForm.alias"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="登记机关：" prop="organ">
                <el-input v-model="ruleForm.organ"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="发证日期：" prop="certificate">
                <el-date-picker v-model="ruleForm.certificate" type="date" placeholder="发证日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
            <el-form-item label="上传附件：" prop="alias">
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="3"
                  :on-exceed="handleExceed"
                  :file-list="ruleForm.fileList">
                  <el-button size="small">点击上传</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <h3>经营信息</h3>
          <el-row>
            <el-col :span="24">
              <el-form-item label="证号：" prop="cardId">
                <el-input v-model="ruleForm.cardId"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="企业名称：" prop="cardId">
                <el-input v-model="ruleForm.cardId" :disabled="true" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="注册地址：" prop="cardId">
                <el-input v-model="ruleForm.cardId"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="法定代表人：" prop="cardId">
                <el-input v-model="ruleForm.cardId" :disabled="true" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="企业负责人：" prop="cardId">
                <el-input v-model="ruleForm.cardId"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="企业类型：" prop="cardId">
                <el-input v-model="ruleForm.cardId" :disabled="true" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="有效期至：" prop="cardId">
                <el-date-picker v-model="ruleForm.certificate" type="date" placeholder="有效期至"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="发证机关：" prop="cardId">
                <el-input v-model="ruleForm.cardId" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="发证日期：" prop="cardId">
                <el-date-picker v-model="ruleForm.certificate" type="date" placeholder="发证日期"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="经营范围：" prop="alias">
                <el-input type="textarea" :rows="3" v-model="ruleForm.alias"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="经营方式：" prop="cardId">
                <el-input v-model="ruleForm.cardId" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="仓库地址：" prop="cardId">
                <el-input v-model="ruleForm.cardId" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="上传附件：" prop="alias">
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="3"
                  :on-exceed="handleExceed"
                  :file-list="ruleForm.fileList">
                  <el-button size="small">点击上传</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <h3>GSP信息</h3>
          <el-row>
            <el-col :span="12">
              <el-form-item label="证书编号：" prop="certificateId">
                <el-input v-model="ruleForm.certificateId" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="企业名称：" prop="enterpriseId">
                <el-input v-model="ruleForm.enterpriseId" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="地址：" prop="address">
                <el-input v-model="ruleForm.address" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="认证范围：" prop="attestation">
                <el-input type="textarea" :rows="3" v-model="ruleForm.attestation"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="发证机关：" prop="cardId">
                <el-input v-model="ruleForm.cardId" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="发证日期：" prop="cardId">
                <el-date-picker v-model="ruleForm.certificate" type="date" placeholder="发证日期"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="有效期至：" prop="cardId">
                <el-date-picker v-model="ruleForm.certificate" type="date" placeholder="有效期至"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="上传附件：" prop="alias">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="ruleForm.fileList">
                <el-button size="small">点击上传</el-button>
              </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <span class="btn-mar">
                <el-button type="primary" size="small">提交</el-button>
                <el-button size="small" >返回</el-button>
              </span>
            </el-col>
          </el-row>
      </el-form>
    </div>
  </div>
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
