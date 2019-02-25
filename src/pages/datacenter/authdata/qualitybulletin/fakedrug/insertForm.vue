<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tablebox">
      <div>
        <el-form :model="form" ref="form" :rules="rules" label-position="left" label-width="120px" class="demo-ruleForm"
                 size="small">

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="标示药品：" prop="catAuthShamDrug.drugName">
                <el-input v-model="form.catAuthShamDrug.drugName" class="width-260"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="标示规格：">
                <el-input v-model="form.catAuthShamDrug.drugSpecification" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="标示批号：">
                <el-input v-model="form.catAuthShamDrug.permitNumber" class="width-260"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="标示生产单位：" prop="catAuthShamDrug.manufacturer">
                <el-input v-model="form.catAuthShamDrug.manufacturer" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="被抽样单位：" prop="catAuthShamDrug.sampledOrg">
                <el-input v-model="form.catAuthShamDrug.sampledOrg" class="width-260"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="购销途径：" prop="catAuthShamDrug.tradeDesc">
                <el-input v-model="form.catAuthShamDrug.tradeDesc" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="购入企业编码：" prop="catAuthShamDrug.saleOrgCode">
                <el-input v-model="form.catAuthShamDrug.saleOrgCode" readonly="true" class="width-260"
                          placeholder="查询药品"></el-input>
                <a @click="buyOrg">查询</a>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="购入企业名称：" prop="catAuthShamDrug.saleOrgName">
                <el-input v-model="form.catAuthShamDrug.saleOrgName" readonly="true" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="核查结果：">
                <el-input v-model="form.catAuthShamDrug.inspectionResult" class="width-260"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公报期数：">
                <el-input v-model="form.catAuthShamDrug.proclamationNumber" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="公报时间：" prop="catAuthShamDrug.proclamationDate">
                <el-input v-model="form.catAuthShamDrug.proclamationDate" class="width-260"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注：">
                <el-input type="textarea" v-model="form.catAuthShamDrug.remark" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">保存</el-button>
                <el-button @click="goBack()">返回</el-button>
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
  import {addShamDrug} from 'src/axios/datacenter/authdata/qualitybulletin/qualityBulletin'

  export default {
    components: {
      BuyOrg,
      ElCol
    },
    data() {
      return {
        buyOrgVisible: false,
        form: {
          catAuthShamDrug: {
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
          }
        },
        rules: {
          'catAuthShamDrug.drugName': {required: true, message: '必填项不可为空', trigger: 'blur'},
          'catAuthShamDrug.manufacturer': {required: true, message: '必填项不可为空', trigger: 'blur'},
          'catAuthShamDrug.sampledOrg': {required: true, message: '必填项不可为空', trigger: 'blur'},
          'catAuthShamDrug.tradeDesc': {required: true, message: '必填项不可为空', trigger: 'blur'},
          'catAuthShamDrug.saleOrgCode': {required: true, message: '必填项不可为空', trigger: 'blur'},
          'catAuthShamDrug.saleOrgName': {required: true, message: '必填项不可为空', trigger: 'blur'},
          'catAuthShamDrug.proclamationDate': {required: true, message: '必填项不可为空', trigger: 'blur'}
        }
      }
    },
    methods: {

      chooseOrg(data){
        this.form.catAuthShamDrug.saleOrgId = data.value.id;
        this.form.catAuthShamDrug.saleOrgCode = data.value.code;
        this.form.catAuthShamDrug.saleOrgName = data.value.name;
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
            addShamDrug(this.form).then(res => {
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

