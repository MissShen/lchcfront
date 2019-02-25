<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tablebox">
      <div>
        <el-form :model="form" ref="form" label-position="left" label-width="180px" class="demo-ruleForm"
                 size="small">
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="公告药品名称（中文）：" prop="name">
                <span>{{form.drugNameChinese}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公告药品名称（英文）：">
                <span>{{form.drugNameEnglish}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="公告商品名称（中文）：" prop="name">
                <span>{{form.tradeNameChinese}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公告商品名称（英文）：">
                <span>{{form.tradeNameEnglish}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="申请人：" prop="name">
                <span>{{form.applyOrg}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="申请人所在国家（中文）：">
                <span>{{form.countryChinese}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="申请人所在国家（英文）：" prop="name">
                <span>{{form.countryEnglish}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="受理公告号：">
                <span>{{form.acceptNumber}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="申请日期：" prop="name">
                <span>{{form.applyDate | capitalize}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="申请号：">
                <span>{{form.applyNumber}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="授权公告号：" prop="name">
                <span>{{form.accreditProclamationNumber}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="授权日期：">
                <span>{{form.accreditDate | capitalize}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="授权号：" prop="name">
                <span>{{form.accreditNumber}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="行政保护备注：">
                <span>{{form.remark}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="行政保护状态：" prop="name">
                <span>{{form.protectionionFlag == '1'?'是':'否'}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="终止保护公告号：">
                <span>{{form.endProtectionionNumber}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="10">
                <el-form-item label="终止保护原因：" prop="name">
                <span>{{form.endProtectionReason}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="终止行政保护备注：" prop="name">
                <span>{{form.remark2}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="创建人：" prop="name">
                <span>{{form.createUserName}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="创建时间：" prop="name">
                <span>{{form.createDate | capitalize}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="最后修改人：">
                <span>{{form.lastUpdateUserName}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="最后修改时间：" prop="name">
                <span>{{form.lastUpdateDate | capitalize}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="foot-btn">
        <div class="foot-left">
          <el-button size="small" type="" @click="goBack()">返回</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ElCol from "element-ui/packages/col/src/col";
  import moment from 'moment';
  import {info} from 'src/axios/datacenter/authdata/protecteddrug/protecteddrug';
  export default {
    components: {ElCol},
    data() {
      return {
        form: {
          drugCode: '',
          drugName: '',
          drugNameChinese: '',
          drugNameEnglish: '',
          tradeNameChinese: '',
          tradeNameEnglish: '',
          orgCode: '',
          orgName: '',
          applyOrg: '',
          countryChinese: '',
          countryEnglish:'',
          acceptNumber: '',
          applyDate: '',
          applyNumber: '',
          accreditProclamationNumber: '',
          accreditDate: '',
          accreditNumber: '',
          protectionionFlag: '1',
          remark: '',
          productIds: '',
          productNum:'',
          endProtectionionNumber:'',
          endProtectionionDate:'',
          endProtectionReason:'',
          remark2:'',
          createUserName:'',
          createDate:'',
          lastUpdateUserName:'',
          lastUpdateDate:''
        }
      }
    },
    created(){
      this.id = this.$route.params.id || undefined;
        if (this.id) {
          info(this.id).then(res => {
            this.form = res.data;
          })
        }
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
    },
    filters:{
      capitalize(date){
        if(date == null || date == undefined || date == ""){
          return "";
        }
        return moment(date).format("YYYY-MM-DD HH:mm:ss");
      }
    }
  }
</script>

