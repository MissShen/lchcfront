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
                  <el-radio-group v-model="form.sampledOrgType">
                    <el-radio label="2">经营企业</el-radio>
                    <el-radio label="3">医院</el-radio>
                    <el-radio label="4">药店</el-radio>
                    <el-radio label="1">生产企业</el-radio>
                  </el-radio-group>
                </template>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="被抽样单位名称：" prop="sampledOrgName">
                <el-input v-model="form.sampledOrgName" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="公告药品名：" prop="drugName">
                <el-input v-model="form.drugName" class="width-260"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="药品规格：">
                <el-input v-model="form.drugSpec" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="标示生产企业编码：" prop="manufacturerCode">
                <el-input v-model="form.manufacturerCode" readonly="true" class="width-260"></el-input>
                <a @click="markOrg">选择</a>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="标示生产企业名称：" prop="manufacturerName">
                <el-input v-model="form.manufacturerName" readonly="true" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="经营企业编码：" prop="supplierCode">
                <el-input v-model="form.supplierCode" readonly="true" class="width-260"></el-input>
                <a @click="manageOrg">选择</a>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="经营企业名称：" prop="supplierName">
                <el-input v-model="form.supplierName" readonly="true" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="产品批号：">
                <el-input v-model="form.permitNumber" class="width-260"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="不合格项：">
                <el-input v-model="form.disqualificationItem" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="公报期数：">
                <el-input v-model="form.proclamationNumber" class="width-260"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="总期数：">
                <el-input v-model="form.proclamationTotal" class="width-260"></el-input>
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
              <el-form-item label="检验依据：">
                <el-input v-model="form.testAccouting" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="检验结果：">
                <el-select v-model="form.checkFlag" placeholder="请选择" class="width-260">
                  <el-option label="不合格" value="0"></el-option>
                  <el-option label="合格" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="检验部门：">
                <el-input v-model="form.testOffice" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="是否撤销批准文号：">
                <template>
                  <el-radio-group v-model="form.permitState">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                </template>
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
  import {findBadDrugById} from 'src/axios/datacenter/authdata/qualitybulletin/qualityBulletin'
  import {updateBadDrug} from 'src/axios/datacenter/authdata/qualitybulletin/qualityBulletin'

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
          id: "",
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
        },
        rules: {
          "sampledOrgName": {required: true, message: '必填项不可为空', trigger: 'blur'},
          "drugName": {required: true, message: '必填项不可为空', trigger: 'blur'},
          "manufacturerCode": {required: true, message: '必填项不可为空', trigger: 'blur'},
          "manufacturerName": {required: true, message: '必填项不可为空', trigger: 'blur'},
          "supplierCode": {required: true, message: '必填项不可为空', trigger: 'blur'},
          "supplierName": {required: true, message: '必填项不可为空', trigger: 'blur'},
          "proclamationDate": {required: true, message: '必填项不可为空', trigger: 'blur'}
        }
      }
    },

    created(){
      this.form.id = this.$route.params.id || undefined;
      this.load();
    },

    methods: {

      load() {
        findBadDrugById(this.form.id).then(res => {
          this.form = res.data;
        });
      },

      //选择生产企业
      chooseMarkOrg(data){
        this.form.manufacturerId = data.value.id;
        this.form.manufacturerCode = data.value.code;
        this.form.manufacturerName = data.value.name;
      },

      //选择经营企业
      chooseManageOrg(data) {
        this.form.supplierId = data.value.id;
        this.form.supplierCode = data.value.code;
        this.form.supplierName = data.value.name;
      },

      onSubmit(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            updateBadDrug(this.form).then(res => {
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

