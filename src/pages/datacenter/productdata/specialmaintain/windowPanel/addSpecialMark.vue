<template>
  <el-dialog
    :title="'特殊标记维护-新增'"
    :close-on-click-modal="false"
    width="80%"
    :visible.sync="visible">
    <el-form :model="form"  ref="form" :rules="rules"
             label-width="130px" label-position="left" :inline="true" size="small">
      <el-row>
        <el-col :span="12">
          <el-form-item label="产品ID：">
            <span>{{ product.id }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所在省份：" prop="provinceId">
            <el-select  placeholder="请选择" v-model="form.provinceId" class="width-260">
              <el-option
                      v-for="item in area.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
              </el-option>
            </el-select>
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
           <el-form-item label="大输液：">
             <el-radio-group v-model="form.largeInfusion">
               <el-radio  label="0">否</el-radio>
               <el-radio  label="1">是</el-radio>
             </el-radio-group>
           </el-form-item>
         </el-col>
         <el-col :span="12">
           <el-form-item label="抗菌药使用类别：">
             <el-radio-group v-model="form.antibiosisType">
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
            <el-radio-group v-model="form.medicalInsuranceFlag">
              <el-radio  label="0">非医保</el-radio>
              <el-radio  label="1">国家医保</el-radio>
              <el-radio  label="2">北京医保</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="医保编码：">
            <el-input v-model="form.medicalInsuranceCode"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="低价药标记：">
            <el-radio-group v-model="form.lowestType">
              <el-radio  label="0">非低价药</el-radio>
              <el-radio  label="1">国家低价药</el-radio>
              <el-radio  label="2">北京低价药</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="基药标记：">
            <el-radio-group v-model="form.contractType">
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
            <el-radio-group v-model="form.outOfStockFlag">
              <el-radio  label="0">否</el-radio>
              <el-radio  label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="激素药标记：">
            <el-radio-group v-model="form.jsType">
              <el-radio  label="0">否</el-radio>
              <el-radio  label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="含兴奋剂药标记：">
            <el-radio-group v-model="form.containAnaleptic">
              <el-radio  label="0">否</el-radio>
              <el-radio  label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer">
      <el-button size="small" type="primary" @click="buttonForm(`form`)">提交</el-button>
      <el-button size="small" @click="visible = false">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  // 引入用户相关请求
  import {provinceList,findProductInfo,saveSpecialMark} from 'src/axios/datacenter/productdata/specialmaintain/specialmaintain';

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
        area:this.checkArea(),
        provinces:undefined,
        form: {
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
        },
        rules: {
          provinceId: {required: true, message: '请选择省份', trigger: 'blur'}
        }
      }
    },
    methods: {

      fillData(id) {
        this.visible = true;
        this.form.productId=id;
        this.provinceList();
        this.productBasicInfo();
      },
      //   查询省份初始化
      checkArea(){
        return{
          options:undefined,
          value:''
        }
      },
      //  省份信息列表
      provinceList () {
        provinceList().then(res => {
          this.provinces = res.data;
          var ja=[];
          for(var i=0;i<this.provinces.length;i++){
            var jo={};
            jo.value=this.provinces[i].id;
            jo.label=this.provinces[i].nameChn;
            ja.push(jo);
          }
          this.area.options=ja;
        })
      },
      //  查看产品基本信息
      productBasicInfo(){
        findProductInfo(this.form.productId).then(res => {
          this.product=res.data;
          this.form.medicalName=this.product.generalName;
        })
      },
      //  提交
      buttonForm(form){
        this.$refs[form].validate((valid) => {
          if (valid) {
            saveSpecialMark(this.form).then(res => {
              this.$message({
                      message: res.data,
                      type: 'success',
                      duration: 1000,
                      onClose: () => {
                      this.visible=false;
                      this.$emit('saveSpecial', '')
                    }
              })
            })
          } else {
            return false;
          }
        });
      },

    }
  }
</script>

