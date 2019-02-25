<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tablebox">
      <div>
        <el-form :model="form" ref="form" label-position="left" label-width="180px" class="demo-ruleForm"
                 size="small">

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
              <el-form-item label="药品序号：" prop="name">
                <span>{{ form.catAuthCountryBase.drugNo }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公高药品名称：">
                <span>{{ form.catAuthCountryBase.bulletinDrug }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="英文名：" prop="name">
                <span>{{ form.catAuthCountryBase.englishName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公告药品剂型：">
                <span>{{ form.catAuthCountryBase.bulletinDoseageName }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="药品大类：" prop="name">
                <span>{{ form.catAuthCountryBase.drugCategory }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="药品中类：">
                <span>{{ form.catAuthCountryBase.middleCategory }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="药品小类：" prop="name">
                <span>{{ form.catAuthCountryBase.smallCategory }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="维护地区：">
                <span>{{ form.catAuthCountryBase.provinceId }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="配备使用单位：" prop="name">
                <el-radio-group v-model="form.catAuthCountryBase.useAgency" disabled="true">
                  <el-radio label="1">基层卫生医疗机构</el-radio>
                  <el-radio label="2">其他医疗机构</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注：">
                <span>{{ form.catAuthCountryBase.remark }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="关联药品：" prop="name">
                <span>已关联{{form.count}}种药品</span>
                <a @click="assoDrugsView()">已关联</a>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="创建人：">
                <span>{{ form.catAuthCountryBase.createUserName }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="创建时间：" prop="name">
                <span>{{ form.catAuthCountryBase.createDate }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="最后修改人：">
                <span>{{ form.catAuthCountryBase.lastUpdateUserName }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="最后修改时间：" prop="name">
                <span>{{ form.catAuthCountryBase.lastUpdateDate }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="foot-btn">
          <div class="foot-left">
            <el-button size="small" @click="goBack">返回</el-button>
          </div>
        </div>
      </div>
    </div>
    <asso-drugs v-if="drugsVisible" ref="AssoDrugs"></asso-drugs>
  </div>
</template>
<script>
  import ElCol from "element-ui/packages/col/src/col";
  import AssoDrugs from "./windowPanel/assoDrugs";
  import {findById} from 'src/axios/datacenter/authdata/countrybasedrugs/countryBase'
  import {findDrugAlias} from 'src/axios/datacenter/authdata/countrybasedrugs/countryBase'
  import {findDosageForm} from 'src/axios/datacenter/authdata/countrybasedrugs/countryBase'

  export default {
    components: {
      AssoDrugs,
      ElCol
    },
    data() {
      return {
        id: "",
        drugs: "",
        drugsList: [],
        dosageForm: "",
        dosageFormList: [],
        drugsVisible: false,
        form: {
          catAuthCountryBase: {},
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
        findById(id).then(res => {
          this.form = res.data;
        });
        findDosageForm(id).then(res => {
          this.dosageFormList = res.data;
          this.dosageForm = this.toString(this.dosageFormList);
        });
        findDrugAlias(id).then(res => {
          this.drugsList = res.data;
          this.drugs = this.toString(this.drugsList);
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

      assoDrugsView() {
        this.drugsVisible = true;
        this.$nextTick(() => {
          this.$refs.AssoDrugs.fillData('DETAIL', this.id);
        })
      },

      goBack() {
        this.$router.go(-1);
      }
    }
  }
</script>

