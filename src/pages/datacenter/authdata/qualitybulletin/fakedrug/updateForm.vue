<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tablebox">
      <div>
        <el-form :model="form" ref="form" :rules="rules" label-position="left" label-width="120px" class="demo-ruleForm"
                 size="small">

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="标示药品：" prop="drugName">
                <el-input v-model="form.drugName" class="width-260"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="标示规格：">
                <el-input v-model="form.drugSpecification" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="标示批号：">
                <el-input v-model="form.permitNumber" class="width-260"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="标示生产单位：" prop="manufacturer">
                <el-input v-model="form.manufacturer" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="被抽样单位：" prop="sampledOrg">
                <el-input v-model="form.sampledOrg" class="width-260"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="购销途径：" prop="tradeDesc">
                <el-input v-model="form.tradeDesc" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="购入企业编码：" prop="saleOrgCode">
                <el-input v-model="form.saleOrgCode" readonly="true" class="width-260"
                          placeholder="查询药品"></el-input>
                <a @click="buyOrg">查询</a>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="购入企业名称：" prop="saleOrgName">
                <el-input v-model="form.saleOrgName" readonly="true" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="核查结果：">
                <el-input v-model="form.inspectionResult" class="width-260"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公报期数：">
                <el-input v-model="form.proclamationNumber" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="公报时间：" prop="proclamationDate">
                <el-input v-model="form.proclamationDate" class="width-260"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注：">
                <el-input type="textarea" v-model="form.remark" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item>
                <el-button size="small" type="primary" @click="onSubmit('form')">保存</el-button>
                <el-button size="small" @click="goBack()">返回</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <buy-org v-if="buyOrgVisible" ref="BuyOrg" @chooseOrg="chooseOrg"></buy-org>
  </div>
</template>
<script>
  import ElCol from "element-ui/packages/col/src/col";
  import BuyOrg from "./windowPanel/buyOrg";
  import {findShamDrugById} from 'src/axios/datacenter/authdata/qualitybulletin/qualityBulletin'
  import {updateShamDrug} from 'src/axios/datacenter/authdata/qualitybulletin/qualityBulletin'

  export default {
    components: {
      BuyOrg,
      ElCol
    },
    data() {
      return {
        buyOrgVisible: false,
        form: {
          id: "",
          drugName: "",
          drugSpecification: "",
          permitNumber: "",
          manufacturer: "",
          sampledOrg: "",
          tradeDesc: "",
          saleOrgId: "",
          saleOrgCode: "",
          saleOrgName: "",
          inspectionResult: "",
          proclamationNumber: "",
          proclamationDate: "",
          remark: ""
        },
        rules: {
          'drugName': {required: true, message: '必填项不可为空', trigger: 'blur'},
          'manufacturer': {required: true, message: '必填项不可为空', trigger: 'blur'},
          'sampledOrg': {required: true, message: '必填项不可为空', trigger: 'blur'},
          'tradeDesc': {required: true, message: '必填项不可为空', trigger: 'blur'},
          'saleOrgCode': {required: true, message: '必填项不可为空', trigger: 'blur'},
          'saleOrgName': {required: true, message: '必填项不可为空', trigger: 'blur'},
          'proclamationDate': {required: true, message: '必填项不可为空', trigger: 'blur'}
        }
      }
    },

    created(){
      this.form.id = this.$route.params.id || undefined;
      this.load();
    },

    methods: {

      load() {
        findShamDrugById(this.form.id).then(res => {
          this.form = res.data;
        });
      },

      chooseOrg(data){
        this.form.saleOrgId = data.value.id;
        this.form.saleOrgCode = data.value.code;
        this.form.saleOrgName = data.value.name;
      },

      buyOrg() {
        this.buyOrgVisible = true;
        this.$nextTick(() => {
          this.$refs.BuyOrg.fillData();
        })
      },

      onSubmit(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            updateShamDrug(this.form).then(res => {
              this.$message({
                message: res.data,
                type: 'success',
                duration: 1000,
                onClose: () => {
                }
              });
              this.goBack()
            })
          } else {
            this.$alert('请检查必填项', '提示', {
              confirmButtonText: '确定',
              type: 'warning',
            });
            return false;
          }
        });
      },

      goBack() {
        this.$router.go(-1);
      }
    }
  }
</script>

