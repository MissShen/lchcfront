<template>
  <el-dialog
    :title="this.dataFlag == 0?'降价产品审核':'降价产品详情'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    width="50%"
  >
    <el-form :model="form" ref="form" label-width="80px" label-position="left" class="form-bold gap-40">
      <el-row :gutter="24">
        <el-col :span="13">
          <el-form-item label="产品名称">
            <span>{{drugData.tradeName}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="剂型">
            <span>{{drugData.doseageName}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <!--<el-row :gutter="24">-->
        <!--<el-col :span="12">-->
          <!--<el-form-item label="剂型">-->
            <!--<span>{{drugData.doseageName}}</span>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
      <!--</el-row>-->
      <el-row :gutter="24">
        <el-col :span="13">
          <el-form-item label="规格">
            <span>{{drugData.spec}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="转换比">
            <span>{{drugData.standRate}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <!--<el-row :gutter="24">-->
        <!--<el-col :span="12">-->
          <!--<el-form-item label="转换比">-->
            <!--<span>{{drugData.standRate}}</span>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
      <!--</el-row>-->
      <el-row :gutter="24">
        <el-col :span="13">
          <el-form-item label="单位">
            <span>{{drugData.metricName}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="包材">
            <span>{{drugData.wrapName}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <!--<el-row :gutter="24">-->
        <!--<el-col :span="12">-->
          <!--<el-form-item label="包材">-->
            <!--<span>{{drugData.wrapName}}</span>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
      <!--</el-row>-->
      <el-row :gutter="24">
        <el-col :span="13">
          <el-form-item label="原报价">
            <span>{{priceFormat(drugData.beforePrice)}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="更新价格">
            <span>{{priceFormat(drugData.lastPrice)}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <!--<el-row :gutter="24">-->
        <!--<el-col :span="12">-->
          <!--<el-form-item label="更新价格">-->
            <!--<span>{{priceFormat(drugData.lastPrice)}}</span>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
      <!--</el-row>-->
      <el-row :gutter="24">
        <el-col :span="22">
          <el-form-item label="备注">
            <span>{{drugData.explain}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="16">
          <div v-if="dataFlag==0">
            <el-form-item>
              <el-radio v-model="form.statesAudit" label="2">审核通过</el-radio>
              <el-radio v-model="form.statesAudit" label="4">审核不通过</el-radio>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="24">
          <div v-if="dataFlag==0">
            <el-row center :gutter="24">
              <el-col :span="22">
                <el-form-item label="审核备注">
                  <el-input type="textarea" :rows="3" v-model="form.explain"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div v-if="dataFlag==0" slot="footer">
      <el-button @click="closeDialog()" size="small">取消</el-button>
      <el-button type="primary" @click="submitForm()" size="small">确 定</el-button>
    </div>
    <div v-if="dataFlag==1" slot="footer">
      <el-button @click="closeDialog()" size="small">关 闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {findPriceDownAuditDetails, priceDownAudit} from 'src/axios/auditchanges/auditManage/productPriceDownAudit'
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
        findPriceDownAuditDetails(productId).then(res => {
          this.drugData = res.data;
        })
        this.dataFlag = flag;
        this.form.upPricedownId = productId;
      },
      metaData() {
        return {
          tradeName: '',
          doseageName: '',
          spec: '',
          standRate: '',
          metricName: '',
          warpName: '',
          id: ''
        }
      },
      metaForm() {
        return {
          explain: '',
          statesAudit: '',
          upPricedownId: ''
        }
      },
      submitForm() {
        priceDownAudit(this.form).then(res => {
          console.log(res)
          if (res.data >= 1) {
            this.visible = false
            this.$message({
              message: '提交成功！',
              type: 'success'
            });
            this.form = this.metaForm()
          } else {
            this.visible = false
            this.$message({
              message: '提交失败！',
              type: 'error'
            });
          }
          this.form = this.metaForm()
          this.$emit("refresh");
        })
      },
      closeDialog() {
        this.form = this.metaForm();
        this.visible = false
        this.$emit("refresh");
      }
    }
  }
</script>

<style scoped>

</style>
