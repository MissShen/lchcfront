<template>
  <el-dialog
    :title="'特殊标记维护-查看详情'"
    :close-on-click-modal="false"
    width="80%"
    :visible.sync="visible">
    <el-form :model="form"  ref="form"
             label-width="130px" label-position="left" :inline="true" size="small">
      <el-row>
        <el-col :span="12">
          <el-form-item label="产品ID：">
            <span>{{ product.id }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所在省份：">
            <span>{{ form.provinceId }}</span>
          </el-form-item>
        </el-col>
      </el-row>

        <el-row>
        <el-col :span="12">
          <el-form-item label="通用名：">
            <span>{{ product.generalName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="药品编码：">
            <span>{{ product.drugCode }}</span>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="商品名：">
            <span>{{ product.tradeName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="产品编码：">
            <span>{{ product.productCode }}</span>
          </el-form-item>
        </el-col>
      </el-row>

       <el-row>
         <el-col :span="12">
           <el-form-item label="大输液：" >
             <el-radio-group v-model="form.largeInfusion" disabled>
               <el-radio  label="0">否</el-radio>
               <el-radio  label="1">是</el-radio>
             </el-radio-group>
           </el-form-item>
         </el-col>
         <el-col :span="12">
           <el-form-item label="抗菌药使用类别：">
             <el-radio-group v-model="form.antibiosisType" disabled>
               <el-radio class="margin-left5" label="0">非抗菌</el-radio>
               <el-radio class="margin-left5" label="1">非限制使用</el-radio>
               <el-radio class="margin-left5" label="2">限制使用</el-radio>
               <el-radio class="margin-left5" label="3">特殊使用</el-radio>
               <el-radio class="margin-left5" label="4">其它</el-radio>
             </el-radio-group>
           </el-form-item>
         </el-col>
       </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="医保标记：">
            <el-radio-group v-model="form.medicalInsuranceFlag" disabled>
              <el-radio  label="0">非医保</el-radio>
              <el-radio  label="1">国家医保</el-radio>
              <el-radio  label="2">北京医保</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="医保编码：">
            <span>{{ form.medicalInsuranceCode }}</span>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="低价药标记：">
            <el-radio-group v-model="form.lowestType" disabled>
              <el-radio  label="0">非低价药</el-radio>
              <el-radio  label="1">国家低价药</el-radio>
              <el-radio  label="2">北京低价药</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="基药标记：">
            <el-radio-group v-model="form.contractType" disabled>
              <el-radio  label="2">非基药</el-radio>
              <el-radio  label="0">国家基药</el-radio>
              <el-radio  label="1">北京基药</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="短缺药标记：">
            <el-radio-group v-model="form.outOfStockFlag" disabled>
              <el-radio  label="0">否</el-radio>
              <el-radio  label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="激素药标记：">
            <el-radio-group v-model="form.jsType" disabled>
              <el-radio  label="0">否</el-radio>
              <el-radio  label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="含兴奋剂药标记：">
            <el-radio-group v-model="form.containAnaleptic" disabled>
              <el-radio  label="0">否</el-radio>
              <el-radio  label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer">
      <el-button size="small" @click="visible = false">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  // 引入用户相关请求
  import {findProductInfo,findSpecialInfo} from 'src/axios/datacenter/productdata/specialmaintain/specialmaintain';

  export default {
    components: {ElCol},
    props: {
      selectedObj: {
        type: Object
      }
    },
    data() {
      return {
        visible: false,
        product:{},
        special:{},
        provinces:undefined,
        form: {
          id:undefined,
          productId:undefined,
          medicalName:undefined,
          provinceId:undefined,
          largeInfusion:'0',
          antibiosisType:'0',
          medicalInsuranceFlag:'0',
          medicalInsuranceCode:undefined,
          lowestType:'0',
          contractType:'2',
          outOfStockFlag:'0',
          jsType:'0',
          containAnaleptic:'0'
        }
      }
    },
    methods: {

      fillData(productId,specialId) {
        this.visible = true;
        this.form.productId=productId;
        this.form.id=specialId;
        this.productBasicInfo();
        this.specialBasicInfo();
      },
      //  查看产品基本信息
      productBasicInfo(){
        findProductInfo(this.form.productId).then(res => {
          this.product=res.data;
        })
      },
      //  查看特殊标记基本信息
      specialBasicInfo(){
        findSpecialInfo(this.form.id).then(res => {
          this.special=res.data;
          this.form=res.data;
      })
      },
    }
  }
</script>

