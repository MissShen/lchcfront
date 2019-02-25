<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tablebox">
      <div class="width-600">
        <el-form :model="from" ref="from" label-position="left" label-width="180px" class="demo-ruleForm"
                 size="small">
            <el-form-item label="通用名称：">
              <span>{{from.catDrug.nameChn}}</span>
            </el-form-item>
            <el-form-item label="英文名称：">
              <span>{{from.catDrug.nameEng}}</span>
            </el-form-item>
            <el-form-item label="商品名称：">
              <span>{{from.catProduct.tradeName}}</span>
            </el-form-item>
          <el-form-item label="汉语拼音：">
            <span>{{from.catDrug.spellAbbr}}</span>
          </el-form-item>
          <el-form-item label="企业名称：">
            <span>{{from.catOrg.name}}</span>
          </el-form-item>
          <el-form-item label="关联产品：">
            <span>{{from.relateProductNum }}</span>
            <a class="gap-10" @click="assoProductsView(from.catManual.id)">查看已关联产品</a>
          </el-form-item>
          <el-form-item label="规格：">
            <span>{{from.catDrug.spec}}</span>
          </el-form-item>
          <el-form-item label="批准文号：">
            <span>{{from.catManual.permitNumber}}</span>
          </el-form-item>

          <el-form-item label="成分：">
            <span>{{from.catManual.component}}</span>
          </el-form-item>
          <el-form-item label="性状：">
            <span>{{from.catManual.traits}}</span>
          </el-form-item>
          <el-form-item label="功能与主治：">
            <span>{{from.catManual.attending}}</span>
          </el-form-item>
          <el-form-item label="适应症：">
            <span>{{from.catManual.indication}}</span>
          </el-form-item>
          <el-form-item label="用法用量" class="drug-instruct-editor">
            <n-editor v-model="from.catManual.usageDosage" :config="config" disabled="true"/>
          </el-form-item>
          <el-form-item label="不良反应：">
            <span>{{from.catManual.adverseReaction}}</span>
          </el-form-item>
          <el-form-item label="禁忌：">
            <span>{{from.catManual.taboo}}</span>
          </el-form-item>
          <el-form-item label="注意事项：">
            <span>{{from.catManual.attentionMatter}}</span>
          </el-form-item>
          <el-form-item label="药物相互作用：">
            <span>{{from.catManual.drugInteraction}}</span>
          </el-form-item>
          <el-form-item label="药物过量：">
            <span>{{from.catManual.drugOverdose}}</span>
          </el-form-item>
          <el-form-item label="药物毒理：">
            <span>{{from.catManual.pharmacologyToxicology}}</span>
          </el-form-item>
          <el-form-item label="药代动力学：">
            <span>{{from.catManual.pharmacokinetics}}</span>
          </el-form-item>
          <el-form-item label="贮藏：">
            <span>{{from.catManual.drugStorage}}</span>
          </el-form-item>
          <el-form-item label="包装：">
            <span>{{from.catManual.wrap}}</span>
          </el-form-item>
          <el-form-item label="有效期：">
            <span>{{from.catManual.validDate}}</span>
          </el-form-item>
          <el-form-item label="执行标准：">
            <span>{{from.catManual.executionStandard}}</span>
          </el-form-item>
          <el-form-item label="生产地址：">
            <span>{{from.catManual.address}}</span>
          </el-form-item>
          <el-form-item label="注册地址：">
            <span>{{from.catManual.registerAddress}}</span>
          </el-form-item>
          <el-form-item label="备注：">
            <span>{{from.catManual.remark}}</span>
          </el-form-item>
          <el-form-item label="邮政编码：">
            <span>{{from.catManual.postCode}}</span>
          </el-form-item>
          <el-form-item label="电话号码：">
            <span>{{from.catManual.tel}}</span>
          </el-form-item>
          <el-form-item label="传真号码：">
            <span>{{from.catManual.fax}}</span>
          </el-form-item>
          <el-form-item label="网址：">
            <span>{{from.catManual.website}}</span>
          </el-form-item>
          <el-form-item label="服务热线：">
            <span>{{from.catManual.serviceHotline}}</span>
          </el-form-item>
          <el-form-item label="核准日期：">
            <span>{{from.approvalDate}}</span>
          </el-form-item>
          <el-form-item label="修订日期：">
            <span>{{from.catManual.manualRevisionDate}}</span>
          </el-form-item>
          <el-form-item label="创建日期：">
            <span>{{from.createDate}}</span>
          </el-form-item>
          <!--<el-form-item label="创建人：">
            <span>{{from.catManual.createUser}}</span>
          </el-form-item>-->
          <el-form-item label="修改日期：">
            <span>{{from.updateDate}}</span>
          </el-form-item>
         <!-- <el-form-item label="修改人：">
            <span>{{from.catManual.updateUser}}</span>
          </el-form-item>-->
        </el-form>
      </div>
      <div class="foot-btn">
        <div class="foot-left">
          <el-button size="small" @click="goBack">返回</el-button>
        </div>
      </div>
    </div>
    <asso-products v-if="productVisible" ref="AssoProducts"></asso-products>
  </div>
</template>
<script>
  import ElCol from "element-ui/packages/col/src/col";
  import AssoProducts from "./windowPanel/assoProducts";
  import ElButton from "../../../../../node_modules/element-ui/packages/button/src/button";
  import {info} from 'src/axios/datacenter/basedata/manual/manual';
  import NEditor from 'src/components/n-editor/n-editor';
  export default {
    components: {
      NEditor,
      ElButton,
      AssoProducts,
      ElCol
    },
    data() {
      return {
        productVisible: false,
        from: {
          createDate:'',
          updateDate:'',
          approvalDate:'',
          catDrug: '',
          catOrg: '',
          catProduct: '',
          catManual: ''
        }
      }
    },
    created(){
      this.id = this.$route.params.id || undefined;
      if (this.id) {
        this.metaFrom(this.id);
      }
    },
    methods: {
      metaFrom(id){
        info(id).then(res => {
          this.from = res.data;
        })
      },
      goBack() {
        this.$router.go(-1);
      },
      assoProductsView(id) {
        this.productVisible = true;
        this.$nextTick(() => {
          this.$refs.AssoProducts.fillData(id, false);
        })
      }
    }
  }
</script>
<style>
  @import "../../../../assets/css/datacenter.css";
</style>
