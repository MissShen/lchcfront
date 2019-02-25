<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="from-padding from-view">
        <el-form :model="ruleForm" ref="ruleForm" label-position="left"
                 label-width="160px" size="small"
                 class="demo-form-inline" :inline="true">
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="批准文号 ： ">
            {{ruleForm.permitNumber}}
          </el-form-item>
            </el-col>
            <el-col :span="12">
          <el-form-item label="产品名称 ： ">
            {{ruleForm.medicalName}}
          </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
          <el-form-item label="剂型名称 ： ">
            {{ruleForm.doseageFormName}}
          </el-form-item>
            </el-col>
            <el-col :span="12">
          <el-form-item label="规格包装 ： ">
            {{ruleForm.spec}}
          </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
          <el-form-item label="转换比 ： ">
            {{ruleForm.standRate}}
          </el-form-item>
            </el-col>
            <el-col :span="12">
          <el-form-item label="生产企业 ： ">
            {{ruleForm.manufactureName}}
          </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      <el-form :model="newRuleForm" ref="newRuleForm" label-position="left"
               label-width="160px" size="small"
               class="demo-form-inline" :inline="true">
          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="配送企业 ： " prop="senderName" >
                {{newRuleForm.senderName}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="月实际到货量 ： " prop="supplyQuantity">
               {{newRuleForm.supplyQuantity}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="月需求量 ： " prop="demandQuantity">
                {{newRuleForm.demandQuantity}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
          <el-form-item label="采购价格 ： " prop="price">
            {{priceFormat(newRuleForm.price)}}
          </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="短缺类型 ： " prop="shortageType">
                  <span v-if="newRuleForm.shortageType==1">断货</span>
                  <span v-if="newRuleForm.shortageType==2">供应量不足或不及时</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="短缺起始日期 ： " prop="shortageDate">
                {{newRuleForm.shortageDate}}
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否使用可替代药品 ： " prop="isAlternative">
                  <span v-if="newRuleForm.isAlternative==1">无替代</span>
                  <span v-else-if="newRuleForm.isAlternative==2">同通用名药品替代</span>
                  <span v-else>功效相同或相近的异通用名药品替代</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
          <el-form-item label="短缺原因 ： " prop="reasonType">
              <span v-if="newRuleForm.reasonTypeMapper.indexOf('1') !== -1">流标或废标，无企业供货<br></span>
              <span v-if="newRuleForm.reasonTypeMapper.indexOf('2') !== -1">原料短缺，产能不足<br></span>
              <span v-if="newRuleForm.reasonTypeMapper.indexOf('3') !== -1">原料垄断，产能不足<br></span>
              <span v-if="newRuleForm.reasonTypeMapper.indexOf('4') !== -1">企业生产线改造，企业产能不足<br></span>
              <span v-if="newRuleForm.reasonTypeMapper.indexOf('5') !== -1">交易价格低，企业不愿意生产<br></span>
              <span v-if="newRuleForm.reasonTypeMapper.indexOf('6') !== -1">限价交易，企业不愿意供应<br></span>
              <span v-if="newRuleForm.reasonTypeMapper.indexOf('7') !== -1">地域偏远，企业不愿配送<br></span>
              <span v-if="newRuleForm.reasonTypeMapper.indexOf('8') !== -1">临床用量小，企业不愿供应<br></span>
              <span v-if="newRuleForm.reasonTypeMapper.indexOf('9') !== -1">其他原因</span>
          </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="其他原因 ： " prop="reasonComments">
                {{newRuleForm.reasonComments}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="填表人 ： " prop="createUser">
                {{newRuleForm.createUser}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
          <el-form-item label="联系电话 ： " prop="telephone">
            {{newRuleForm.telephone}}
          </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button type="warning" size="small" @click="returnForm()" >返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>
<script>
// 引入用户相关请求
import {getProductInfo,getShortageById} from 'src/axios/trade/shortage/buyerRole/shortageUpList'
import {priceFormat} from "src/utils";

  export default {
    data() {
      return {
        ruleForm: this.metaForm(),
        newRuleForm: this.metaQuery(),
      };
    },
    created() {
        this.newRuleForm.id= this.$route.params.productId;
        this.list()
      },
    methods: {
      priceFormat,
      metaQuery() {
        return {
          id:'',
          senderName:'',
          issueId:'',
          senderId: '',
          supplyQuantity: '',
          demandQuantity:'',
          price:'',
          shortageType:'',
          shortageDate:'',
          reasonType:'',
          reasonTypeMapper:'',
          productId:'',
          reasonComments:'',
          isAlternative:'',
          createUser:'',
          telephone:''
        }
      },
      metaForm() {
        return {
          id:'',
          permitNumber:'',
          medicalName:'',
          doseageFormName:'',
          spec:'',
          standRate:'',
          manufactureName:''
        }
      },
      list () {
        var productId= this.newRuleForm.id
          getShortageById(productId).then(res => {
          this.newRuleForm = res.data
          this.getProduct (this.newRuleForm.productId)

       })
     },
      getProduct (productId) {
        getProductInfo(productId).then(res => {
          this.ruleForm = res.data
        })
     },
      returnForm(){
        window.history.go(-1);
      }
    }
  }
</script>
