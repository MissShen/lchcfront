<template>
  <el-dialog
    title="产品降价详情"
    :close-on-click-modal="false"
    :visible.sync="visible"
    width="60%"
  >
    <el-form :model="form" ref="form" label-width="120px" label-position="left">
      <el-form-item label="产品名称">
        <span>{{drugData.tradeName}}</span>
      </el-form-item>
      <el-form-item label="剂型">
        <span>{{drugData.doseageName}}</span>
      </el-form-item>
      <el-form-item label="规格">
        <span>{{drugData.spec}}</span>
      </el-form-item>
      <el-form-item label="转换比">
        <span>{{drugData.standRate}}</span>
      </el-form-item>
      <el-form-item label="单位">
        <span>{{drugData.metricName}}</span>
      </el-form-item>
      <el-form-item label="包材">
        <span>{{drugData.wrapName}}</span>
      </el-form-item>
      <el-form-item label="原报价:">
        <span>{{priceFormat(drugData.beforePrice)}}</span>
      </el-form-item>
      <el-form-item label="更新价格">
        <span>{{priceFormat(drugData.lastPrice)}}</span>
      </el-form-item>
      <!--<el-form-item prop="newPriceprop">-->
        <!--<span>{{drugData.lastPrice}}</span>-->
      <!--</el-form-item>-->
      <el-form-item label="备注">
        <span>{{drugData.explain}}</span>
      </el-form-item>
      <!--<el-form-item>-->
        <!--<span>{{drugData.explain}}</span>-->
      <!--</el-form-item>-->
    </el-form>
    <div slot="footer"><el-button @click="closeDialog()">关 闭</el-button></div>
  </el-dialog>
</template>

<script>
  import {
    getProductByProductId,
    insertPriceDown,
    findProductDetailsById
  } from 'src/axios/auditchanges/messageChanges/productPriceReduction'
  import {priceFormat} from "src/utils";

  export default {
    name: "present-dialog",
    data() {
      return {
        visible: false,
        form: this.metaForm(),
        drugData: this.metaData(),
        dataFlag: '',
      }
    },
    created() {
    },
    methods: {
      priceFormat,
      fillData(flag, productId) {
        this.visible = true
        this.dataFlag = flag;
        findProductDetailsById(productId).then(res => {
          this.drugData = res.data;
        })
      },
      metaData() {
        return {
          tradeName: '',
          doseageName: '',
          spec: '',
          standRate: '',
          metricName: '',
          warpName: '',
          id: '',
          statesAudit: '',
          auditExplan: ''
        }
      },
      metaForm() {
        return {
          beforePrice: '',
          lastPrice: '',
          explain: '',
        }
      },
      closeDialog() {
        this.form = this.metaForm();
        this.visible = false
      }
    }
  }
</script>

<style scoped>

</style>
