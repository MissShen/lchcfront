<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tablebox">
      <div>
        <el-form :model="form" ref="form" label-position="left" label-width="180px" class="demo-ruleForm"
                 size="small">
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="药品编码：" required>
                <el-input v-model="form.drugCode" class="width-260" disabled="true"></el-input>
                <a @click="chooseDrugs">选择</a>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="通用名：">
                <el-input v-model="form.drugName" class="width-260" disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="公告药品名称（中文）：" required>
                <el-input v-model="form.drugNameChinese" class="width-260"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公告药品名称（英文）：">
                <el-input v-model="form.drugNameEnglish" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="公告商品名称（中文）：">
                <el-input v-model="form.tradeNameChinese" class="width-260"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公告商品名称（英文）：">
                <el-input v-model="form.tradeNameEnglish" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="企业编码：" required>
                <el-input v-model="form.orgCode" class="width-260" placeholder="" disabled="true"></el-input>
                <a @click="chooseOrg">选择</a>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="企业名称：">
                <el-input v-model="form.orgName" disabled="true" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="申请人：" required>
                <el-input v-model="form.applyOrg" class="width-260"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="申请人所在国家（中文）：">
                <el-input v-model="form.countryChinese" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="申请人所在国家（英文）：">
                <el-input v-model="form.countryEnglish" class="width-260"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="受理公告号：">
                <el-input v-model="form.acceptNumber" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="申请日期：">
                    <el-date-picker class="width-260" v-model="form.applyDate" type="date" placeholder="选择日期" size="small"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="申请号：">
                <el-input v-model="form.applyNumber" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="授权日期：">
                    <el-date-picker class="width-260" v-model="form.accreditDate" type="date" placeholder="选择日期" size="small"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="授权公告号：">
                <el-input v-model="form.accreditProclamationNumber" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="授权号：">
                <el-input v-model="form.accreditNumber" class="width-260"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否终止行政保护：">
                <el-select v-model="form.protectionionFlag" placeholder="请选择" class="width-260">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="行政保护备注：">
                <el-input v-model="form.remark" class="width-260"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="相关产品信息：">
               <span>已关联
                  <el-input v-model="form.productNum" class="width-160" placeholder="0" disabled="true"></el-input>
                            种药品</span>
                <a @click="chooseProduct">选择</a>
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
    <common-drugs-code v-if="drugVisible" ref="CommonDrugsCode" @addDrugCode = "addDrugCode"></common-drugs-code>
    <common-org-code v-if="orgVisible" ref="CommonOrgCode" @addOrgCode = "addOrgCode"></common-org-code>
    <asso-product-info v-if="productVisible" ref="AssoProductInfo" v-bind="{type:'0',orgCode:this.form.orgCode}" @saveProIds = "saveProIds"></asso-product-info>
  </div>
</template>
<script>
  import ElCol from "element-ui/packages/col/src/col";
  import ElButton from "../../../../../node_modules/element-ui/packages/button/src/button";
  import CommonDrugsCode from "./windowPanel/commonDrugsCode";
  import CommonOrgCode from "./windowPanel/commonOrgCode";
  import AssoProductInfo from "./windowPanel/assoProductInfo";
  import {add} from 'src/axios/datacenter/authdata/protecteddrug/protecteddrug';

  export default {
    components: {
      AssoProductInfo,
      CommonOrgCode,
      CommonDrugsCode,
      ElButton,
      ElCol
    },
    data() {
      return {
        orgVisible:false,
        drugVisible:false,
        productVisible:false,
        form: {
          drugCode: '',
          drugName: '',
          drugNameChinese: '',
          drugNameEnglish: '',
          tradeNameChinese: '',
          tradeNameEnglish: '',
          orgCode: '',
          orgName: '',
          applyOrg: '',
          countryChinese: '',
          countryEnglish:'',
          acceptNumber: '',
          applyDate: '',
          applyNumber: '',
          accreditProclamationNumber: '',
          accreditDate: '',
          accreditNumber: '',
          protectionionFlag: '1',
          remark: '',
          productIds: '',
          productNum:''
        }
      }
    },
    methods: {
      addDrugCode(data){
        this.form.drugCode = data.code;
        this.form.drugName = data.nameChn;
      },
      saveProIds(list){
        this.form.productNum = list.length;
        let idsArr =list.map(data=>{
            return data.productId
          })
        let ids = idsArr.join(',').toString()
        this.form.productIds = ids;
        console.log(this.form)
      },
      addOrgCode(data){
        this.form.orgCode = data.code;
        this.form.orgName = data.name;
        console.log(this.form)
      },
      chooseDrugs() {
        this.drugVisible=true;
        this.$nextTick(() => {
          this.$refs.CommonDrugsCode.fillData();
        })
      },
      chooseOrg() {
        this.orgVisible=true;
        this.$nextTick(() => {
          this.$refs.CommonOrgCode.fillData();
        })
      },
      goBack() {
        this.$router.go(-1);
      },
      chooseProduct() {
        if(!this.form.orgCode){
          return this.$message.error('请选择企业编码');
        }
        this.productVisible=true;
        this.$nextTick(() => {
          this.$refs.AssoProductInfo.fillData();
        })
      },
      onSubmit(form) {
        if(!this.form.drugCode){
          return this.$message.error('请选择药品编码');
        }
        if(!this.form.drugNameChinese){
          return this.$message.error('请填写公告药品名称（中文）');
        }
        if(!this.form.orgCode){
          return this.$message.error('请选择企业编码');
        }
        if(!this.form.applyOrg){
          return this.$message.error('请填写申请人');
        }
        if(!this.form.applyDate){
          this.form.applyDate = new Date();
        }else{
          this.form.applyDate = new Date(this.form.applyDate.getTime() + 24 * 60 * 60 * 1000);
        }
        if(!this.form.accreditDate){
          this.form.accreditDate = new Date();
        }else{
          this.form.accreditDate = new Date(this.form.accreditDate.getTime() + 24 * 60 * 60 * 1000);
        }

        this.$refs[form].validate((valid) => {
          if (valid) {
            add(this.form).then(res => {
              this.$message({
                message: res.data,
                type: 'success',
                duration: 1000,
                onClose: () => {
              }
            });
            this.goBack();
          })
          }
        });
      },
    }
  }
</script>

