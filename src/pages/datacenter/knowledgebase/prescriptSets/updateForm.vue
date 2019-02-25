<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!--<ul class="tabs-panel">-->
      <!--<li class="active">修改处方集</li>-->
    <!--</ul>-->

    <div class="tablebox">
      <div class="width-520">
        <el-form :model="form" ref="form" :rules="rules" label-position="left" label-width="100px" class="demo-ruleForm"
                 size="small">
          <div>
            <el-form-item label="处方集类别">
              <el-select v-model="form.formularyCategoryId_1" placeholder="请选择" @change="changeMethod(form.formularyCategoryId_1,2)">
                <el-option
                  v-for="item in categorys_1"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-select v-model="form.formularyCategoryId_2" v-if="categorys_2.length>0" placeholder="请选择" @change="changeMethod(form.formularyCategoryId_2,3)">
                <el-option
                  v-for="item in categorys_2"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-select v-model="form.formularyCategoryId_3" v-if="categorys_3.length>0" placeholder="请选择" @change="changeMethod(form.formularyCategoryId_3,4)">
                <el-option
                  v-for="item in categorys_3"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-select v-model="form.formularyCategoryId_4" v-if="categorys_4.length>0" placeholder="请选择" @change="changeMethod(form.formularyCategoryId_4,5)">
                <el-option
                  v-for="item in categorys_4"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-select v-model="form.formularyCategoryId_1" v-if="categorys_5.length>0" placeholder="请选择">
                <el-option
                  v-for="item in categorys_5"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <el-form-item label="药品名称">
            <el-input v-model="form.drugName" maxlength="100">{{form.drugName}}</el-input>
          </el-form-item>
          <el-form-item label="英文名称">
            <el-input v-model="form.nameEng" maxlength="100">{{form.nameEng}}</el-input>
          </el-form-item>
          <el-form-item label="基药标识">
            <el-radio-group v-model="form.baseDrugFlag">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="基药年份">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.baseDrugDate"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="医保标识">
            <el-radio-group v-model="form.medicalInsuranceFlag">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="医保年份">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.medicalInsuranceDate"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="医保类型">
            <el-checkbox-group v-model="medicalInsuranceTypes">
              <el-checkbox label="1" >甲类</el-checkbox>
              <el-checkbox label="2" >乙类</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="适应症">
            <el-input type="textarea" v-model="form.indication"></el-input>
          </el-form-item>
          <el-form-item label="用法用量">
            <el-input type="textarea" v-model="form.usageDosage"></el-input>
          </el-form-item>
          <el-form-item label="不良反应">
            <el-input type="textarea" v-model="form.adverseReaction"></el-input>
          </el-form-item>
          <el-form-item label="禁忌">
            <el-input type="textarea" v-model="form.taboo"></el-input>
          </el-form-item>
          <el-form-item label="注意事项">
            <el-input type="textarea" v-model="form.attentionMatter"></el-input>
          </el-form-item>
          <el-form-item label="制剂与规格">
            <el-input type="textarea" v-model="form.preparationSpecification"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input type="textarea" v-model="form.remark"></el-input>
          </el-form-item>
          <el-form-item label="关联药品">
            <el-input v-model="form.drugFormularyNum" :disabled="true" class="width-300"></el-input>

                <a @click="assoDrugsView('查看已',form.id)" class="blue">已关联</a>
                &nbsp;|&nbsp;
                <a @click="assoDrugsView('查看未',form.id)" class="blue">未关联</a>
          </el-form-item>
          <el-row>
            <el-form-item>
              <el-button size="small" type="primary" @click="onSubmit('form')">提交</el-button>
              <el-button size="small" @click="goBack">返回</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
    </div>
    <asso-drugs-detail v-if="assoDrugsVisible" ref="AssoDrugsDetail" v-bind:lookType="lookType" @saveDrugIds="saveDrugIds"></asso-drugs-detail>
  </div>
</template>
<script>
  import ElCol from "element-ui/packages/col/src/col";
  import AssoDrugsDetail from "../../windowPanel/assoDrugsDetail.vue";
  import {info,getFormualryByLevel,editFormulary} from 'src/axios/datacenter/basedata/formulary/formulary';

  export default {
    components: {ElCol,AssoDrugsDetail},
    data() {
      return {
        categorys_1:[],
        categorys_2:[],
        categorys_3:[],
        categorys_4:[],
        categorys_5:[],
        assoDrugsVisible: false,
        lookType:'',
        medicalInsuranceTypes:[],
        form: {
          id:'',
          formularyCategoryId: '',
          formularyCategoryId_1: '',
          formularyCategoryId_2: '',
          formularyCategoryId_3: '',
          formularyCategoryId_4: '',
          formularyCategoryId_5: '',
          drugName: '',
          nameEng: '',
          baseDrugFlag: '',
          baseDrugDate: null,
          medicalInsuranceFlag: '',
          medicalInsuranceDate: null,
          medicalInsuranceType: '',
          indication: '',
          usageDosage: '',
          adverseReaction: '',
          taboo: '',
          attentionMatter: '',
          preparationSpecification: '',
          remark: '',
          drugIds: '',
          drugIdsNo:'',
          drugIdsType:'',
          dno:''
        },
        search:{
          parentId:'',
          name:''
        },
        rules:{
        }
      }
    },
    created () {
      this.id = this.$route.params.id || undefined;

      if (this.id) {
        info(this.id).then(res => {
          this.form = res.data;
          if(this.form.medicalInsuranceType){
            this.medicalInsuranceTypes = this.form.medicalInsuranceType.trim().split(',');
          }

          this.form.dno = this.form.drugFormularyNum;
//          this.medicalInsuranceTypes = ["1"]
          getFormualryByLevel(null,1).then(res => {
            this.categorys_1 = res.data
          })
          if(this.form.formularyCategoryId_2){
            getFormualryByLevel(this.form.formularyCategoryId_1,2).then(res => {
              this.categorys_2 = res.data
            })
          }
          if(this.form.formularyCategoryId_3){
            getFormualryByLevel(this.form.formularyCategoryId_2,3).then(res => {
              this.categorys_3 = res.data
            })
          }
          if(this.form.formularyCategoryId_4){
            getFormualryByLevel(this.form.formularyCategoryId_3,4).then(res => {
              this.categorys_4 = res.data
            })
          }
          if(this.form.formularyCategoryId_5){
            getFormualryByLevel(this.form.formularyCategoryId_4,5).then(res => {
              this.categorys_5 = res.data
            })
          }
        })
      }

    },
    methods: {
      onSubmit(form) {
        if(this.form.formularyCategoryId_1){
          this.form.formularyCategoryId = this.form.formularyCategoryId_1;
        }
        if(this.form.formularyCategoryId_2){
          this.form.formularyCategoryId = this.form.formularyCategoryId_2;
        }
        if(this.form.formularyCategoryId_3){
          this.form.formularyCategoryId = this.form.formularyCategoryId_3;
        }
        if(this.form.formularyCategoryId_4){
          this.form.formularyCategoryId = this.form.formularyCategoryId_4;
        }
        if(this.form.formularyCategoryId_5){
          this.form.formularyCategoryId = this.form.formularyCategoryId_5;
        }
        if(!this.form.formularyCategoryId){
            return this.$message.error('请选择分类');
        }

        this.$refs[form].validate((valid) => {
          if (valid) {
            if(this.lookType == '查看已'){
              this.form.drugIdsType = '2';
            }else{
              this.form.drugIdsType = '1';
            }
            this.form.baseDrugDate = new Date(this.form.baseDrugDate);
            this.form.medicalInsuranceDate = new Date(this.form.medicalInsuranceDate);
            this.form.id = this.$route.params.id || undefined;
            this.form.medicalInsuranceType = this.medicalInsuranceTypes.join(',').toString().trim();
            editFormulary(this.form).then(res => {
              this.$message({
                message: res.data,
                type: 'success',
                duration: 1000,
                onClose: () => {
              }
          });
            this.goBack()
          })
          }
        });
      },
      changeMethod(pid,plevel){
        getFormualryByLevel(pid,plevel).then(res => {
          if(plevel == 2){
            this.categorys_2 = res.data;
            this.form.formularyCategoryId_2 = null;
            this.form.formularyCategoryId_3 = null;
            this.form.formularyCategoryId_4 = null;
            this.form.formularyCategoryId_5 = null;
            this.categorys_3 = [];
            this.categorys_4 = [];
            this.categorys_5 = [];
          }
          if(plevel == 3){
            this.categorys_3 = res.data;
            this.form.formularyCategoryId_3 = null;
            this.form.formularyCategoryId_4 = null;
            this.form.formularyCategoryId_5 = null;
            this.categorys_4 = [];
            this.categorys_5 = [];
          }
          if(plevel == 4){
            this.categorys_4 = res.data;
            this.form.formularyCategoryId_4 = null;
            this.form.formularyCategoryId_5 = null;
            this.categorys_5 = [];
          }
          if(plevel == 5){
            this.categorys_5 = res.data;
            this.form.formularyCategoryId_5 = null;
          }

        })
      },
      saveDrugIds (ids){
        if(ids){
          this.form.drugIds = ids;
          if(this.lookType == '查看已'){
            this.form.drugFormularyNum -= ids.split(',').length;
          }else{
            this.form.drugFormularyNum += ids.split(',').length;
          }
        }
      },
      goBack() {
        this.$router.go(-1);
      },
      assoDrugsView(type,formularyId) {
        this.form.drugFormularyNum = this.form.dno;
        this.lookType = type;
        this.assoDrugsVisible = true;
        this.$nextTick(() => {
          this.$refs.AssoDrugsDetail.fillData(type,formularyId);
        })
      }
    }
  }
</script>

