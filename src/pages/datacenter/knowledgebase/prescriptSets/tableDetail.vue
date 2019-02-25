<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tablebox">
      <div class="width-520">
        <el-form :model="form" ref="form" :rules="rules" label-position="left" label-width="100px" class="demo-ruleForm"
                 size="small">
          <el-form-item label="处方集类别" prop="name">
            <div v-if="form.categoryLevelName1 != null && form.categoryLevelName1 != ''">一级类别:{{form.categoryLevelName1}}</div>
            <div v-if="form.categoryLevelName2 != null && form.categoryLevelName2 != ''">二级类别:{{form.categoryLevelName2}}</div>
            <div v-if="form.categoryLevelName3 != null && form.categoryLevelName3 != ''">三级类别:{{form.categoryLevelName3}}</div>
            <div v-if="form.categoryLevelName4 != null && form.categoryLevelName4 != ''">四级类别:{{form.categoryLevelName4}}</div>
            <div v-if="form.categoryLevelName5 != null && form.categoryLevelName5 != ''">五级类别:{{form.categoryLevelName5}}</div>
          </el-form-item>
          <el-form-item label="药品名称">
            <span>{{form.drugName}}</span>
          </el-form-item>
          <el-form-item label="英文名称">
            <span>{{form.nameEng}}</span>
          </el-form-item>
          <el-form-item label="基药标识">
            <span v-if="form.baseDrugFlag == 1">是</span>
            <span v-else>否</span>
          </el-form-item>
          <el-form-item label="基药年份">
            <el-col :span="11">
              <span>{{form.baseDrugDate | capitalize}}</span>
            </el-col>
          </el-form-item>
          <el-form-item label="医保标识">
            <span v-if="form.medicalInsuranceFlag == 1">是</span>
            <span v-else>否</span>
          </el-form-item>
          <el-form-item label="医保年份">
            <span>{{form.medicalInsuranceDate | capitalize}}</span>
          </el-form-item>
          <el-form-item label="医保类型">
            <span v-if="form.medicalInsuranceType == 1">甲类</span>
            <span v-else>乙类</span>
          </el-form-item>
          <el-form-item label="适应症">
            <span>{{form.indication}}</span>
          </el-form-item>
          <el-form-item label="用法用量">
            <span>{{form.usageDosage}}</span>
          </el-form-item>
          <el-form-item label="不良反应">
            <span>{{form.adverseReaction}}</span>
          </el-form-item>
          <el-form-item label="禁忌">
            <span>{{form.taboo}}</span>
          </el-form-item>
          <el-form-item label="注意事项">
            <span>{{form.attentionMatter}}</span>
          </el-form-item>
          <el-form-item label="制剂与规格">
            <span>{{form.preparationSpecification}}</span>
          </el-form-item>
          <el-form-item label="描述">
            <span>{{form.remark}}</span>
          </el-form-item>
            <el-form-item label="关联药品">
                <span>{{form.drugFormularyNum}}</span>&nbsp;&nbsp;
                <a @click="assoDrugsView('查看',form.id)" class="blue">查看已关联药品</a>
            </el-form-item>
        </el-form>
      </div>
      <div class="foot-btn">
        <div class="foot-left">
          <el-button size="small" @click="goBack()">返回</el-button>
        </div>
      </div>
    </div>
    <asso-drugs-detail v-if="assoDrugsVisible" ref="AssoDrugsDetail" v-bind:lookType="lookType"></asso-drugs-detail>
  </div>
</template>
<script>
  import ElCol from "element-ui/packages/col/src/col";
  import AssoDrugsDetail from "../../windowPanel/assoDrugsDetail.vue";
  import {info} from 'src/axios/datacenter/basedata/formulary/formulary';
  import moment from 'moment';

  export default {
    components: {ElCol, AssoDrugsDetail},
    data() {
      return {
        assoDrugsVisible: false,
        id: '',
        lookType:'',
        form: {
          formularyCategoryId: '',
          drugName: '',
          nameEng: '',
          baseDrugFlag: '1',
          baseDrugDate: "",
          medicalInsuranceFlag: "1",
          medicalInsuranceDate: '',
          medicalInsuranceType: '',
          medicalInsuranceTypes: [],
          indication: '',
          usageDosage: '',
          adverseReaction: '',
          taboo: '',
          attentionMatter: '',
          preparationSpecification: '',
          remark: '',
          drugFormularyNum: '',
          categoryLevelName1: '',
          categoryLevelName2: '',
          categoryLevelName3: '',
          categoryLevelName4: '',
          categoryLevelName5: ''
        },
      }
    },
    created () {
      this.id = this.$route.params.id || undefined;
      if (this.id) {
        info(this.id).then(res => {
          this.form = res.data;
      })
      }
    },
    methods: {
      onSubmit() {

      },
      goBack() {
        this.$router.go(-1);
      },
      assoDrugsView(type,formularyId) {
        this.lookType = type;
        this.assoDrugsVisible = true;
        this.$nextTick(() => {
          this.$refs.AssoDrugsDetail.fillData(type,formularyId);
      })
      }
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
<style>
  @import "../../../../assets/css/datacenter.css";
</style>
