<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <div class="tablebox">
      <div>
        <el-form :model="form" ref="form" :rules="rules" label-position="left" label-width="110px" class="demo-ruleForm"
                 size="small">

          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="药品名称：" prop="name">
                <span>{{form.drugName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="4">
              <el-form-item label="剂型：">
                <span>{{this.dosageForm}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="企业编码：" prop="name">
                <span>{{form.companyId}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="4">
              <el-form-item label="企业名称：">
                <span>{{form.companyName}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="公告生产企业：" prop="name">
                <span>{{form.corpName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="4">
              <el-form-item label="省份：">
                <span>{{form.province}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="保护级别：" prop="name">
                <span>{{toChn(form.protectionGrade)}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="4">
              <el-form-item label="保护年限：">
                <span>{{form.protectedTime}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="保护开始日期：" prop="name">
                <span>{{form.protectionionStartDate}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="4">
              <el-form-item label="保护终止日期：">
                <span>{{form.protectionionExpiryDate}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="公告号：" prop="name">
                <span>{{form.proclamationNumber}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="4">
              <el-form-item label="保护品种号：">
                <span>{{form.protectionionNumber}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="公告日期：" prop="name">
                <span>{{form.bulletinDate}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="4">
              <el-form-item label="终止公告号：">
                <span>{{form.endProclamationNumber}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="是否相同品种：" prop="name">
                <el-radio-group v-model="form.sameSpeciesFlag" disabled="true">
                  <el-radio label="0">否</el-radio>
                  <el-radio label="1">是</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="4">
              <el-form-item label="功能主治：">
                <span>{{form.action}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="10">
              <el-form-item label="备注：" prop="name">
                <span>{{form.certRemark}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="相关产品信息：" prop="name">
                <span>已关联{{form.drugSpec}}种产品&nbsp;</span>
                <a class="blue" @click="productInfo">已关联</a>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="foot-btn">
          <div class="foot-left">
            <el-button size="small" @click="goBack()">返回</el-button>
          </div>
        </div>
      </div>
    </div>
    <asso-product-detail v-if="productVisible" ref="AssoProductDetail"></asso-product-detail>
  </div>
</template>
<script>
  import ElCol from "element-ui/packages/col/src/col";
  import AssoProductDetail from "./windowPanel/assoProductDetail";
  import {findById, findAssDosageFormById} from 'src/axios/datacenter/authdata/cnprotecteddrug/cnProtected'

  export default {
    components: {
      AssoProductDetail,
      ElCol
    },
    data() {
      return {
        productVisible: false,
        id: "",
        dosageForm: "",
        dosageFormList: [],
        form: {}
      }
    },

    created(){
      this.id = this.$route.params.id || undefined;
      this.load();
    },

    methods: {

      load() {
        findById(this.id).then(res => {
          this.form = res.data;
        });
        findAssDosageFormById(this.id).then(res => {
          this.doseageFormList = res.data;
          this.dosageForm = this.toString(this.doseageFormList);
        });
      },

      toChn(val) {
        if (val === "1") {
          return "一级";
        } else if (val === "2") {
          return "二级";
        } else {
          return val;
        }
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

      productInfo(){
        this.productVisible = true;
        this.$nextTick(() => {
          this.$refs.AssoProductDetail.fillData('READ', this.id);
        })
      },
      goBack() {
        this.$router.go(-1);
      }
    }
  }
</script>

