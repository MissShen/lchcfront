<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tablebox">
      <div>
        <el-form :model="form" ref="form" label-position="left" label-width="160px" class="demo-ruleForm"
                 size="small">
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="发布期数/文号：" prop="name">
                <span>{{ form.catOtc.proclamationNumber }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="中西药类别：">
                <span>{{ otcFlag(form.catOtc.otcFlag) }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="药品通用名：" prop="name">
                <span>{{ this.drugs }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="药品剂型：">
                <span>{{ this.dosageForm }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="药品公告名称：" prop="name">
                <span>{{ form.catOtc.bulletinDrug }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公告剂型：">
                <span>{{ form.catOtc.bulletinDoseageName }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="英文名：" prop="name">
                <span>{{ form.catOtc.englishName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="分类：">
                <span>{{ form.catOtc.drugCategory }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="规格组成：" prop="name">
                <span>{{ form.catOtc.ingredient }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="适应症：">
                <span>{{ form.catOtc.indication }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="不良反应：" prop="name">
                <span>{{ form.catOtc.untowardReaction }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="禁忌症：">
                <span>{{ form.catOtc.tabooCrun }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="生产企业名称：" prop="name">
                <span>{{ form.catOtc.factoryName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="OTC类别：" prop="name">
                <span>{{otcType(form.catOtc.otcType) }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="是否禁用：">
                <span>{{enableFlag(form.catOtc.enableFlag) }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="关联药品：" prop="name">
                <span>已关联{{form.count}}种药品</span>
                <a @click="hasAssoView('readOnly')">已关联</a>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="foot-btn">
        <div class="foot-left">
          <el-button @click="goBack()" size="small">返回</el-button>
        </div>
      </div>
    </div>
    <asso-drugs v-if="assoVisible" ref="AssoDrugs"></asso-drugs>
  </div>
</template>
<script>
  import ElCol from "element-ui/packages/col/src/col";
  import {info} from 'src/axios/datacenter/authdata/otcdrugs/catOtc'
  import {findDoseageForm} from 'src/axios/datacenter/authdata/otcdrugs/catOtc'
  import {findDrugAlias} from 'src/axios/datacenter/authdata/otcdrugs/catOtc'
  import AssoDrugs from "./windowPanel/assoDrugs";

  export default {
    components: {
      AssoDrugs,
      ElCol
    },
    data() {
      return {
        assoVisible: false,
        id: '',
        drugs: '',
        dosageForm: '',
        drugList: [],
        doseageFormList: [],
        form: {
          catOtc: {},
          count: 0
        }
      }
    },

    created(){
      this.id = this.$route.params.id || undefined;
      this.load(this.id);
    },

    methods: {
      load(id) {
        info(id).then(res => {
          this.form = res.data;
        });
        findDoseageForm(id).then(res => {
          this.doseageFormList = res.data;
          this.dosageForm = this.toString(this.doseageFormList);
        });
        findDrugAlias(id).then(res => {
          this.drugList = res.data;
          this.drugs = this.toString(this.drugList);
        })
      },

      toString(array) {

        if (array.length <= 0) {
          return "";
        } else {
          var result = "";
          for (var i = 0; i < array.length; i++) {
            if (i == array.length - 1) {
              result += array[i].nameChn
            } else {
              result += array[i].nameChn + "、"
            }
          }
          return result;
        }
      },

      hasAssoView(type){
        this.assoVisible = true;
        this.$nextTick(() => {
          this.$refs.AssoDrugs.fillData(type, this.id);
        })
      },

      //OTC_FLAG转换
      otcFlag(status){
        if (status === "0") {
          return "西药"
        } else if (status === "1") {
          return "中药"
        } else {
          return status;
        }
      },

      //OTC_TYPE转换
      otcType(status){
        if (status === "0") {
          return "甲类"
        } else if (status === "1") {
          return "乙类"
        } else {
          return status;
        }
      },

      //ENABLE_FLAG转换
      enableFlag(status){
        if (status === "0") {
          return "是"
        } else if (status === "1") {
          return "否"
        } else {
          return status;
        }
      },

      goBack() {
        this.$router.go(-1);
      }
    }
  }
</script>

