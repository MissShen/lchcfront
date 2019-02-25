<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tablebox">
      <div>
        <el-form :model="form" ref="form" :rules="rules" label-position="left" label-width="160px" class="demo-ruleForm"
                 size="small">

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="被抽样单位类型：">
                <template>
                  <el-radio-group v-model="form.catAuthBadDrug.sampledOrgType">
                    <el-radio label="2">经营企业</el-radio>
                    <el-radio label="3">医院</el-radio>
                    <el-radio label="4">药店</el-radio>
                    <el-radio label="1">生产企业</el-radio>
                  </el-radio-group>
                </template>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="被抽样单位名称：" prop="catAuthBadDrug.sampledOrgName">
                <el-input v-model="form.catAuthBadDrug.sampledOrgName" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="公告药品名：" prop="catAuthBadDrug.drugName">
                <el-input v-model="form.catAuthBadDrug.drugName" class="width-260"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="药品规格：">
                <el-input v-model="form.catAuthBadDrug.drugSpec" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="标示生产企业编码：" prop="catAuthBadDrug.manufacturerCode">
                <el-input v-model="form.catAuthBadDrug.manufacturerCode" readonly="true" class="width-260"></el-input>
                <a @click="markOrg">选择</a>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="标示生产企业名称：" prop="catAuthBadDrug.manufacturerName">
                <el-input v-model="form.catAuthBadDrug.manufacturerName" readonly="true" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="经营企业编码：" prop="catAuthBadDrug.supplierCode">
                <el-input v-model="form.catAuthBadDrug.supplierCode" readonly="true" class="width-260"></el-input>
                <a @click="manageOrg">选择</a>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="经营企业名称：" prop="catAuthBadDrug.supplierName">
                <el-input v-model="form.catAuthBadDrug.supplierName" readonly="true" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="产品批号：">
                <el-input v-model="form.catAuthBadDrug.permitNumber" class="width-260"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="不合格项：">
                <el-input v-model="form.catAuthBadDrug.disqualificationItem" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="公报期数：">
                <el-input v-model="form.catAuthBadDrug.proclamationNumber" class="width-260"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="总期数：">
                <el-input v-model="form.catAuthBadDrug.proclamationTotal" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="公报时间：" prop="catAuthBadDrug.proclamationDate">
                <el-input v-model="form.catAuthBadDrug.proclamationDate" class="width-260"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="检验依据：">
                <el-input v-model="form.catAuthBadDrug.testAccouting" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="检验结果：">
                <el-select v-model="form.catAuthBadDrug.checkFlag" placeholder="请选择" class="width-260">
                  <el-option label="不合格" value="0"></el-option>
                  <el-option label="合格" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="检验部门：">
                <el-input v-model="form.catAuthBadDrug.testOffice" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="是否撤销批准文号：">
                <template>
                  <el-radio-group v-model="form.catAuthBadDrug.permitState">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                </template>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注：">
                <el-input type="textarea" v-model="form.catAuthBadDrug.remark" class="width-260"></el-input>
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
    <common-mark-org v-if="markOrgVisible" ref="CommonMarkOrg" @chooseMarkOrg="chooseMarkOrg"></common-mark-org>
    <common-manage-org v-if="manageVisible" ref="CommonManageOrg"
                       @chooseManageOrg="chooseManageOrg"></common-manage-org>
  </div>
</template>
<script>
  import ElCol from "element-ui/packages/col/src/col";
  import ElButton from "../../../../../../node_modules/element-ui/packages/button/src/button";
  import CommonMarkOrg from "../../../windowPanel/commonMarkOrg";
  import CommonManageOrg from "../../../windowPanel/commonManageOrg";
  import {addBadDrug} from 'src/axios/datacenter/authdata/qualitybulletin/qualityBulletin'


  export default {
    components: {
      CommonManageOrg,
      CommonMarkOrg,
      ElButton,
      ElCol
    },
    data() {
      return {
        markOrgVisible: false,
        manageVisible: false,
        form: {
          catAuthBadDrug: {
            sampledOrgType: "1",
            sampledOrgName: "",
            drugName: "",
            drugSpec: "",
            manufacturerId: "",
            manufacturerCode: "",
            manufacturerName: "",
            supplierId: "",
            supplierCode: "",
            supplierName: "",
            permitNumber: "",
            disqualificationItem: "",
            proclamationNumber: "",
            proclamationTotal: "",
            proclamationDate: "",
            testAccouting: "",
            checkFlag: "1",
            testOffice: "",
            permitState: "0",
            remark: ""
          }
        },
        rules: {
          "catAuthBadDrug.sampledOrgName": {required: true, message: '必填项不可为空', trigger: 'blur'},
          "catAuthBadDrug.drugName": {required: true, message: '必填项不可为空', trigger: 'blur'},
          "catAuthBadDrug.manufacturerCode": {required: true, message: '必填项不可为空', trigger: 'blur'},
          "catAuthBadDrug.manufacturerName": {required: true, message: '必填项不可为空', trigger: 'blur'},
          "catAuthBadDrug.supplierCode": {required: true, message: '必填项不可为空', trigger: 'blur'},
          "catAuthBadDrug.supplierName": {required: true, message: '必填项不可为空', trigger: 'blur'},
          "catAuthBadDrug.proclamationDate": {required: true, message: '必填项不可为空', trigger: 'blur'}
        }
      }
    },

    methods: {

      //选择生产企业
      chooseMarkOrg(data){
        this.form.catAuthBadDrug.manufacturerId = data.value.id;
        this.form.catAuthBadDrug.manufacturerCode = data.value.code;
        this.form.catAuthBadDrug.manufacturerName = data.value.name;
      },

      //选择经营企业
      chooseManageOrg(data) {
        this.form.catAuthBadDrug.supplierId = data.value.id;
        this.form.catAuthBadDrug.supplierCode = data.value.code;
        this.form.catAuthBadDrug.supplierName = data.value.name;
      },

      onSubmit(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            addBadDrug(this.form).then(res => {
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

      markOrg() {
        this.markOrgVisible = true;
        this.$nextTick(() => {
          this.$refs.CommonMarkOrg.fillData();
        })
      },
      manageOrg() {
        this.manageVisible = true;
        this.$nextTick(() => {
          this.$refs.CommonManageOrg.fillData();
        })
      },
      goBack() {
        this.$router.go(-1);
      },
    }
  }
</script>

