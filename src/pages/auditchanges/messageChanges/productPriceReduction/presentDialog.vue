<template>
  <el-dialog
    :title="this.dataFlag == 0?'产品降价更新':'产品降价详情'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    width="50%"
  >
    <el-form :model="form" :rules="rules" ref="form" label-position="left">
      <el-row center :gutter="24">
        <el-col :span="4">
          <el-form-item label="产品名称"></el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item>{{drugData.tradeName}}</el-form-item>
        </el-col>
      </el-row>
      <el-row center :gutter="24">
        <el-col :span="4">
          <el-form-item label="剂型"></el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item>{{drugData.doseageName}}</el-form-item>
        </el-col>
      </el-row>
      <el-row center :gutter="24">
        <el-col :span="4">
          <el-form-item label="规格"></el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item>{{drugData.spec}}</el-form-item>
        </el-col>
      </el-row>
      <el-row center :gutter="24">
        <el-col :span="4">
          <el-form-item label="转换比"></el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item>{{drugData.standRate}}</el-form-item>
        </el-col>
      </el-row>
      <el-row center :gutter="24">
        <el-col :span="4">
          <el-form-item label="单位"></el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item>{{drugData.metricName}}</el-form-item>
        </el-col>
      </el-row>
      <el-row center :gutter="24">
        <el-col :span="4">
          <el-form-item label="包材"></el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item>{{drugData.wrapName}}</el-form-item>
        </el-col>
      </el-row>
      <el-row center :gutter="24">
        <el-col :span="4">
          <el-form-item label="原报价"></el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item>{{priceFormat(drugData.beforePrice)}}</el-form-item>
        </el-col>
      </el-row>
      <el-row center :gutter="24">
        <el-col :span="4">
          <el-form-item label="更新价格"></el-form-item>
        </el-col>
        <el-col :span="20">
          <div v-if="this.dataFlag==0">
            <el-form-item prop="newPriceprop">
              <el-input v-model="form.lastPrice" required="true" auto-complete="off" size="small"></el-input>
            </el-form-item>
          </div>
          <div v-if="this.dataFlag==1">
            <el-form-item prop="newPriceprop">
              <span>{{priceFormat(drugData.lastPrice)}}</span>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row center :gutter="24">
        <el-col :span="4">
          <el-form-item>
            <span>备注</span>
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <div v-if="this.dataFlag==0">
            <el-form-item>
              <el-input type="textarea" v-model="form.explain" auto-complete="off" size="small"></el-input>
            </el-form-item>
          </div>
          <div v-if="this.dataFlag==1">
            <span>{{drugData.explain}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row center :gutter="24">
        <div v-if="this.dataFlag == 1">
          <el-col :span="4">
            <el-form-item>
              <span>审核状态</span>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item>
              <span>{{drugData.statesAudit==0?'未提交':drugData.statesAudit==1?'提交':drugData.statesAudit==2?'公示质疑':drugData.statesAudit==4?'初审':drugData.statesAudit==5?'澄清':drugData.statesAudit==7?'通过':drugData.statesAudit==9?'驳回':'挂起'}}</span>
            </el-form-item>
          </el-col>
        </div>
      </el-row>
      <el-row center :gutter="24">
        <div v-if="this.dataFlag == 1 && drugData.statesAudit == 9">
          <el-col :span="4">
            <el-form-item>
              <span>驳回理由</span>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item>
              <span>{{drugData.auditExplan}}</span>
            </el-form-item>
          </el-col>
        </div>
      </el-row>
    </el-form>
    <div slot="footer">
        <div v-if="dataFlag==0">
          <el-button @click="closeDialog()">取 消</el-button>
          <el-button type="primary" v-if="rules.newPriceprop[0].validator()" @click="submitForm()">确 定</el-button>
        </div>
        <div v-if="dataFlag==1">
          <el-button @click="closeDialog()">关 闭</el-button>
        </div>
    </div>
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
      var newPrice = (rule, value, callback) => {
        if (this.form.lastPrice.trim() === '' || this.form.lastPrice.trim() === null || this.form.lastPrice.trim() === '0') {
          return callback ? callback(new Error('新价格不可为空')) : false;
        }
        if (parseFloat(this.drugData.beforePrice.trim()) <= parseFloat(this.form.lastPrice.trim())) {
          return callback ? callback(new Error('新价格不可大于或等于原价格')) : false;
        } else {
          if (callback) callback();
          return true;
        }
      }
      return {
        visible: false,
        form: this.metaForm(),
        drugData: this.metaData(),
        dataFlag: '',
        rules: {
          newPriceprop: [
            {validator: newPrice, trigger: 'blur'}
          ],
        }
      }
    },
    created() {
    },
    methods: {
      priceFormat,
      fillData(flag, productId) {
        this.visible = true
        this.dataFlag = flag;
        if (flag == 0) {
          getProductByProductId(productId).then(res => {
            this.drugData = res.data;
            this.form.productId = res.data.id;
            this.form.beforePrice = res.data.beforePrice;
          })
        } else {
          findProductDetailsById(productId).then(res => {
            this.drugData = res.data;
          })
        }
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
      submitForm() {
        insertPriceDown(this.form).then(res => {
          console.log(res)
          this.$message({
            message: '提交成功！',
            type: 'success'
          });
          if (res.code == 200) {
            this.visible = false
          }
        })
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
