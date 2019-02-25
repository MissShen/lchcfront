<template>
    <!-- ========================== 主内容start ========================= -->
    <div class="tablebox">
        <el-form :model="from" ref="from" :rules="rules"  label-width="180px" class="demo-ruleForm" size="small" label-position="left">

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="药品编码：" prop="name">
                <span>{{from.DRUG_SERIAL_NUMBER}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="剂型：" prop="name">
                <span>{{from.NAME_CHN}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="药品大分类：" prop="name">
                <span>{{from.BIG}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="规格：" prop="name">
                <span>{{from.SPEC}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="药品小分类：" prop="name">
                <span>{{from.SMALL}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="一级盐类衍生物：" prop="name">
                <span>{{from.SALT_CODE}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="通用名：" prop="name">
                <span>{{from.NAME_CHN}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="二级盐类衍生物：" prop="name">
                <span>{{from.SALT_CODE2}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="英文名称：" prop="name">
                <span>{{from.NAME_ENG}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="复方及小儿标记：" prop="name">
                <span>{{from.COMPOUND_CHILDREN}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="转换比：" prop="name">
                <span>{{from.STAND_RATE}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="包材：" prop="name">
                <span>{{from.NAME_CHN}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="备用标识：" prop="name">
                <span>{{getReadyFlag(from.READY_FLAG)}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="含量：" prop="name">
                <span>{{from.CONTENT_NUM}}{{from.CONTENT_UNIT}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="重(装)量：" prop="name">
                <span>{{from.WEIGHT_NUM}}{{from.WEIGHT_UNIT}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="质量标准编号：" prop="name">
                <span>{{from.CRITERION_NUM}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="质量标准类型：" prop="name">
                <span>{{getCriterionType(from.CRITERION_TYPE)}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="质量标准有效期：" prop="name">
                <span>{{from.CRITERION_EXPIRE_DATE}}</span>
              </el-form-item>
            </el-col>

          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="用法用量：" prop="name">
                <span>{{from.DOSEAGE_DESC}}</span>
              </el-form-item>
            </el-col>

            <!--TODO 不可编辑 -->
            <el-col :span="12">
              <el-form-item label="国家基本药物：" prop="name">
                <el-radio-group v-model="from.NATIONAL_BASIC_DRUG">
                  <el-radio label="1" >是</el-radio>
                  <el-radio label="0" >否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>

          <!--TODO 不可编辑 -->
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="国家基本医疗保险药品：" prop="name">
                <el-radio-group v-model="from.NATIONAL_INSURANCE_DRUG">
                  <el-radio label="1" class="nomar-left marright30 marbottom15">甲类</el-radio>
                  <el-radio label="2" class="nomar-left marright30 marbottom15">乙类</el-radio>
                  <el-radio label="3" class="nomar-left marright30 marbottom15">民族药</el-radio>
                  <el-radio label="0" class="nomar-left marright30">非国家基本医疗保险药品</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="ATC中文名称：" prop="name">
                <span>{{from.ATC_NAME}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <!--TODO 不可编辑-->
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="OTC药品：" prop="name">
                <el-radio-group v-model="from.PRESCRIPTION">
                  <el-radio label="1" >非OTC药品</el-radio>
                  <el-radio label="2" >甲类OTC</el-radio>
                  <el-radio label="3" >乙类OTC</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="ATC编码：" prop="name">
                <span>{{from.ATC_CODE}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="新编药物医学分类：">
                <el-input v-if="from.FIRST_CLASS" v-model="from.FIRST_CLASS" class="w19" readonly></el-input>
                <el-input v-if="from.SECOND_CLASS" v-model="from.SECOND_CLASS" class="w19" readonly></el-input>
                <el-input v-if="from.THIRD_CLASS" v-model="from.THIRD_CLASS" class="w19" readonly></el-input>
                <el-input v-if="from.FOURTH_CLASS" v-model="from.FOURTH_CLASS" class="w19" readonly></el-input>
                <el-input v-if="from.FIVE_CLASS" v-model="from.FIVE_CLASS" class="w19" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="备注：" prop="name">
                <span>{{from.DESCRIPTION}}</span>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
        <div class="foot-btn">
          <div class="foot-left">
            <el-button @click="goBack" size="small">返回</el-button>
          </div>
        </div>
    </div>
</template>

<script>

  import {findDrugInfo} from 'src/axios/datacenter/drugdata/druginfo/druginfo'

  export default {
    data() {
      return {
        id: undefined,
        from: {
          name: '',
          consignee:'',
          phone:'',
          address:'',
          district:'',
          county:'',
          region:''
        },
        rules:{
          consignee:{ required: true, message: '请输入收货人', trigger: 'blur'},
          phone:{ required: true, message: '请输入联系电话', trigger: 'blur' },
          region:{ required: true, message: '请选择市', trigger: 'change' },
          district:{ required: true, message: '请选择区', trigger: 'change' },
          county:{ required: true, message: '请选择县', trigger: 'change' },
          address:{ required: true, message: '请输入详细地址', trigger: 'blur' }
        }
      };
    },
    created() {
      this.initData();
    },
    methods: {
      submitForm(from) {
        this.$refs[from].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      initData() {
        this.id = this.$route.params.id;
        this.id = this.id === 'undefined' ? undefined : this.id;
        findDrugInfo(this.id).then( res => {
          console.log('res.data === ', res.data);
          this.from = res.data;
        })
      },
      getReadyFlag(flag) {
        // 备用标识9.全部 ''正常 1.毒麻精放 2.实际转换比注射 3.备用粉针剂 4.非药准字号产品 5.毒药 6.麻药 7.精神类药品 8.放射性药品
        if(flag == '')
          return '正常';
        var readyFlag = ['','毒麻精放','实际转换比注射','备用粉针剂','非药准字号产品','毒药','麻药','精神类药品','放射性药品','全部'];
        return readyFlag[flag];
      },
      getCriterionType(flag) {
        // 空、药典标准、SFDA标准、部颁标准、进口标准、生物制品规程
        var criterionType = ['空','药典标准','SFDA标准','部颁标准','进口标准','生物制品规程'];
        return criterionType[flag];
      },
      // 返回
      goBack() {
        this.$router.go(-1);
      },
    }
  }
</script>
