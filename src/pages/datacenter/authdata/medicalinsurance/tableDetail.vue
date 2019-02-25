<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tablebox">
      <div>
        <el-form :model="form" ref="form" label-position="left" label-width="180px" class="demo-ruleForm"
                 size="small">
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="国家医保序号：" prop="name">
                <span>{{ form.catAuthMedicare.insuredNationNubmer }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="省医保序号：">
                <span>{{ form.catAuthMedicare.insuredDrugNubmer }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="第一层分类：" prop="name">
                <span>{{ form.catAuthMedicare.drugCategory }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="第二层分类：">
                <span>{{ form.catAuthMedicare.middleCategory }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="第三层分类：" prop="name">
                <span>{{ form.catAuthMedicare.smallCategory }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="第四层分类：">
                <span>{{ form.catAuthMedicare.fourthCategory }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="医保药类别：" prop="name">
                <span>{{ getInsuredDrugType(form.catAuthMedicare.insuredDrugType) }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="分类编码：">
                <span>{{ form.categoryCode }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="英文名：">
                <span>{{ form.catAuthMedicare.englishName }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="公告药品名称：" prop="name">
                <span>{{ form.catAuthMedicare.bulletinDrugName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公告剂型：">
                <span>{{ form.catAuthMedicare.bulletinDoseageName }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="药品：" prop="name">
                <span>{{ form.checkDrugs }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="剂型：">
                <span>{{ form.checkDoseages }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="中西药类别：" prop="name">
                <span>{{ form.catAuthMedicare.westernOrCn=='0'?'西药':'中成药' }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否限制使用：">
                <span>{{ form.catAuthMedicare.permitFlag=='0'?'否':'是' }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="是否禁用：" prop="name">
                <span>{{ form.catAuthMedicare.limitedFlag=='0'?'禁用':'正常' }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="维护地区：">
                <span>{{ form.catAuthMedicare.provinceId }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="文件备注：" prop="name">
                <span>{{ form.catAuthMedicare.fileRemark }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注：">
                <span>{{ form.catAuthMedicare.remark }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="相关药品信息：" prop="name">
                <span>已关联{{ form.checkRelateDrugNum }}种药品</span>
                <a @click="showHasAsso(form.catAuthMedicare.id)">已关联药品</a>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="创建人：" prop="name">
                <span>{{ form.catAuthMedicare.createUserName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="创建时间：">
                <span>{{ dateChange(form.catAuthMedicare.createDate) }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="最后修改人：" prop="name">
                <span>{{ form.catAuthMedicare.lastUpdateUserName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="最后修改时间：">
                <span>{{ dateChange(form.catAuthMedicare.lastUpdateDate) }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <div class="foot-btn">
            <div class="foot-left">
              <el-button size="small" @click="goBack">返回</el-button>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <asso-drugs-detail v-if="hasAssoVisible" ref="AssoDrugsDetail"></asso-drugs-detail>
  </div>
</template>
<script>
  import ElCol from "element-ui/packages/col/src/col";
  import AssoDrugsDetail from "./windowPanel/assoDrugsDetail";
  // 引入用户相关请求
  import {findMedicareDrug} from 'src/axios/datacenter/authdata/medicalinsurance/medicalinsurance';
  import moment from 'moment';
  export default {
    components: {
      AssoDrugsDetail,
      ElCol
    },
    data() {
      return {
        hasAssoVisible: false,
        form: {
          catAuthMedicare:{},
          checkDrugList:{},
          checkRelateDrugList:{},
          checkRelateDrugNum:undefined,
          checkDrugs:undefined,
          checkDoseages:undefined
        }
      }
    },
    created(){
      var id = this.$route.params.id || undefined;
      if (id) {
        this.list(id);
      }
    },
    methods: {
      //  页面初始化
      list(id){
        findMedicareDrug(id).then(res => {
          this.form = res.data;
          this.form.checkDrugs='';
          this.form.checkDoseages='';
          for(var i=0;i<this.form.checkDrugList.length;i++){
            this.form.checkDrugs+=' '+this.form.checkDrugList[i].nameChn;
          }
          for(var i=0;i<this.form.checkDoseageList.length;i++){
            this.form.checkDoseages+=' '+this.form.checkDoseageList[i].nameChn;
          }
      })
      },
      //  医保类别
      getInsuredDrugType(num){
        var type;
        switch (num){
          case "0":
          {type='空';}
            break;
          case "1":
          {type='甲类';}
            break;
          case "2":
          {type='乙类';}
            break;
          case "3":
          {type='民族药';}
            break;
        }
        return type;
      },
      //  时间格式转换
      dateChange(data){
        var result;
        if(typeof (data)!='undefined'&& data!=null ){
          result=moment(data).format("YYYY-MM-DD");
        }
        return result;
      },
      //  返回
      goBack(){
        this.$router.go(-1);
      },
      //  已关联药品页面
      showHasAsso(id) {
        this.hasAssoVisible = true;
        this.$nextTick(() => {
          this.$refs.AssoDrugsDetail.fillData(id);
        })
      },
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

