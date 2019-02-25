<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!--<ul class="tabs-panel">-->
      <!--<li class="active">新增处方集</li>-->
    <!--</ul>-->

    <div class="tablebox">
      <div class="width-520">
        <el-form :model="form" ref="form" :rules="rules" label-position="left" label-width="100px" class="demo-ruleForm"
                 size="small">
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
          <el-form-item label="药品名称">
            <el-input v-model="form.drugName" maxlength="100"></el-input>
          </el-form-item>
          <el-form-item label="英文名称">
            <el-input v-model="form.nameEng" maxlength="100"></el-input>
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
              <el-radio label="1" >是</el-radio>
              <el-radio label="0" >否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="医保年份">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.medicalInsuranceDate"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="医保类型">
            <el-checkbox-group v-model="form.medicalInsuranceTypes">
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
                <el-input v-model="form.drugIdsNo" :disabled="true" class="width-380"></el-input>
                <input type="hidden"  v-model="form.drugIds" style="width:0;height:0">
                <a @click="assoDrugsView('选择')" class="blue">选择</a>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="onSubmit('form')">提交</el-button>
            <el-button size="small" @click="goBack()">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <asso-drugs v-if="assoDrugsVisible" ref="AssoDrugs" @saveDrugIds="saveDrugIds"></asso-drugs>
  </div>
</template>
<script>
  import ElCol from "element-ui/packages/col/src/col";
  import AssoDrugs from "../../windowPanel/assoDrugs";
  import {addFormulary,getFormualryByLevel} from 'src/axios/datacenter/basedata/formulary/formulary'
  export default {
    components: {
      AssoDrugs,
      ElCol},
    data() {
      return {
        assoDrugsVisible:false,
        categorys_1:[],
        categorys_2:[],
        categorys_3:[],
        categorys_4:[],
        categorys_5:[],
        form: {
          formularyCategoryId: '',
          formularyCategoryId_1: '',
          formularyCategoryId_2: '',
          formularyCategoryId_3: '',
          formularyCategoryId_4: '',
          formularyCategoryId_5: '',
          drugName: '',
          nameEng: '',
          baseDrugFlag: '1',
          baseDrugDate: "",
          medicalInsuranceFlag: "1",
          medicalInsuranceDate: '',
          medicalInsuranceType: '',
          medicalInsuranceTypes:[],
          indication: '',
          usageDosage: '',
          adverseReaction: '',
          taboo: '',
          attentionMatter: '',
          preparationSpecification: '',
          remark: '',
          drugIds: '',
          drugIdsNo:''
        },
        rules:{
          formularyCategoryId:{ required: true, message: '请选择处方集类别', trigger: 'blur' }
        }
      }
    },
    created() {
      getFormualryByLevel(null,1).then(res => {
        this.categorys_1 = res.data
      })
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
            this.form.medicalInsuranceType = this.form.medicalInsuranceTypes.join(',').toString().trim();
            addFormulary(this.form).then(res => {
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
        this.form.drugIds = ids;
        this.form.drugIdsNo = ids.split(',').length
      },
      goBack() {
        this.$router.go(-1);
      },
      assoDrugsView(type) {
        this.assoDrugsVisible=true;
        this.$nextTick(() => {
          this.$refs.AssoDrugs.fillData(type);
        })
      }
    }
  }
</script>

