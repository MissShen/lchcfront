<template>
  <div class="s-inner">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!--<el-tab-pane  label="首页" name="1">
        <transation v-if="activeName === '1'"></transation>
      </el-tab-pane>-->

      <el-tab-pane v-if="hasPerm('supervision:trade:index')" label="医院概况" name="1">
        <hospital-survey v-if="activeName==='1'"></hospital-survey>
      </el-tab-pane>

      <el-tab-pane label="医疗机构" name="2">
        <hospital-purchase v-if="activeName==='2'"></hospital-purchase>
      </el-tab-pane>
      <el-tab-pane v-if="hasPerm('supervision:tansact:varietyPurchase')" label="品种采购" name="3">
        <variety-purchase v-if="activeName === '3'"></variety-purchase>
      </el-tab-pane>
      <el-tab-pane v-if="hasPerm('supervision:maker:getlist')" label="生产企业" name="4">
        <manufacturing-enterprise v-if="activeName === '4'"></manufacturing-enterprise>
      </el-tab-pane>
      <el-tab-pane v-if="hasPerm('supervision:transaction:querySendInfo')" label="配送企业" name="5">
        <distribution v-if="activeName === '5'"></distribution>
      </el-tab-pane>
      <!--      <el-tab-pane v-if="hasPerm('tousuInfo')" label="投诉情况" name="6">
              <complaints v-if="activeName === '6'"></complaints>
            </el-tab-pane>-->
      <!--      <el-tab-pane v-if="hasPerm('supervision:pricewarning:getpricelist')" label="价格预警" name="7">
              <price-early-warning v-if="activeName === '7'"></price-early-warning>
            </el-tab-pane>-->
      <!--      <el-tab-pane v-if="hasPerm('baseDrug:getBaseDrugPurchaseList')" label="基药采购" name="8">
              <basic-drug-purchase v-if="activeName === '8'"></basic-drug-purchase>
            </el-tab-pane>-->
      <el-tab-pane v-if="hasPerm('supervision:order:monitor:list')" label="订单监控" name="6">
        <order-monitor v-if="activeName === '6'"></order-monitor>
      </el-tab-pane>

      <el-tab-pane label="社管概况" name="7">
        <social-management v-if="activeName==='7'"></social-management>
      </el-tab-pane>
      <el-tab-pane label="卫计委" name="8">
        <weijiwei v-if="activeName==='8'"></weijiwei>
      </el-tab-pane>
      <!-- <el-tab-pane  label="配送概况" name="14">
         <send-org-info v-if="activeName==='14'"></send-org-info>
       </el-tab-pane>
       <el-tab-pane  label="配送企业2" name="15">
         <send-org-info2 v-if="activeName==='15'"></send-org-info2>
       </el-tab-pane>-->
      <el-tab-pane label="重点监控药品上报情况" name="9">
        <main-monitor-drug v-if="activeName === '9'"></main-monitor-drug>
      </el-tab-pane>
      <el-tab-pane label="短缺药上报情况" name="10">
        <shortage-durg v-if="activeName === '10'"></shortage-durg>
      </el-tab-pane>
      <el-tab-pane label="非两票制药品上报情况" name="11">
        <un-two-votes-drug v-if="activeName === '11'"></un-two-votes-drug>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import transation from 'src/pages/supervise/transaction/home-page/transaction'
  import medicalInstitution from 'src/pages/supervise/transaction/institution/medicalInstitution'
  import varietyPurchase from 'src/pages/supervise/transaction/variety/varietyPurchase'
  import manufacturingEnterprise from 'src/pages/supervise/transaction/manufacturing/manufacturingEnterprise'
  /*  import distribution from 'src/pages/supervise/transaction/distribution/distribution'*/
  import complaints from 'src/pages/supervise/transaction/complaints/complaints'
  import priceEarlyWarning from 'src/pages/supervise/transaction/warning/priceEarlyWarning'
  import basicDrugPurchase from 'src/pages/supervise/transaction/basic-medicine/basicDrugPurchase'
  import orderMonitor from 'src/pages/supervise/transaction/order-monitor/orderMonitor'
  import hospitalSurvey from 'src/pages/supervise/transaction/hospital-purchase/hospitalSurvey'
  import hospitalPurchase from 'src/pages/supervise/transaction/medical/hospitalPurchase'
  import weijiwei from 'src/pages/supervise/transaction/home-page/weijiwei'
  import sendOrgInfo from 'src/pages/supervise/transaction/home-page/sendOrgInfo'
  import sendOrgInfo2 from 'src/pages/supervise/transaction/home-page/sendOrgInfo2'
  import distribution from 'src/pages/supervise/transaction/sender-situation/sendOrgSituation'
  import socialManagement from 'src/pages/supervise/transaction/social-management/socialManagement'
  import mainMonitorDrug from 'src/pages/supervise/notice-bulletin/mainMonitorDrug'
  import shortageDurg from 'src/pages/supervise/notice-bulletin/shortageDurg'
  import unTwoVotesDrug from 'src/pages/supervise/notice-bulletin/unTwoVotesDrug'
  import {HasPerm} from 'src/components/mixins'

  export default {
    name: "sTransaction",
    mixins: [HasPerm],
    components: {
      transation,
      medicalInstitution,
      varietyPurchase,
      manufacturingEnterprise,
      distribution,
      complaints,
      priceEarlyWarning,
      basicDrugPurchase,
      orderMonitor,
      hospitalSurvey,
      weijiwei,
      sendOrgInfo,
      sendOrgInfo2,
      hospitalPurchase,
      socialManagement,
      mainMonitorDrug,
      shortageDurg,
      unTwoVotesDrug
    },
    data() {
      return {
        activeName: '1'
      };
    },
    mounted() {
      this.judgePower();
    },

    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      judgePower() {
        if (this.hasPerm('supervision:trade:index')) {
          this.activeName = '1';
        } else if (this.hasPerm('supervision:trade:medicalInstitution')) {
          this.activeName = '2';
        } else if (this.hasPerm('supervision:tansact:varietyPurchase')) {
          this.activeName = '3';
        } else if (this.hasPerm('supervision:maker:getlist')) {
          this.activeName = '4';
        } else if (this.hasPerm('supervision:transaction:querySendInfo')) {
          this.activeName = '5';
        } else if (this.hasPerm('tousuInfo')) {
          this.activeName = '6';
        } else if (this.hasPerm('supervision:pricewarning:getpricelist')) {
          this.activeName = '7';
        } else if (this.hasPerm('baseDrug:getBaseDrugPurchaseList')) {
          this.activeName = '8';
        } else if (this.hasPerm('supervision:order:monitor:list')) {
          this.activeName = '9';
        }
      }
    }
  }
</script>

