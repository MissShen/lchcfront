<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <span class="tab-bar"></span>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="企业申报" name="1">
        <enterprisesToDeclareTabs v-if="activeName=='1'"></enterprisesToDeclareTabs>
      </el-tab-pane>
      <el-tab-pane label="产品申报" name="2">
        <productDeclarationTabs v-if="activeName=='2'"></productDeclarationTabs>
      </el-tab-pane>
      <el-tab-pane label="价格申报" name="3">
        <priceToDeclareTabs v-if="activeName=='3'"></priceToDeclareTabs>
      </el-tab-pane>
      <el-tab-pane label="企业变更" name="4">
        <enterpriseChangeTabs v-if="activeName=='4'"></enterpriseChangeTabs>
      </el-tab-pane>
      <el-tab-pane label="产品变更" name="5">
        <productChangesTabs v-if="activeName=='5'"></productChangesTabs>
      </el-tab-pane>
      <el-tab-pane label="价格变更" name="6">
        <priceChangeTabs v-if="activeName=='6'"></priceChangeTabs>
      </el-tab-pane>
      <el-tab-pane label="产品转产" name="7">
        <productTransferTabs v-if="activeName=='7'"></productTransferTabs>
      </el-tab-pane>
      <el-tab-pane label="企业举报" name="8">
        <enterprisesReportTabs v-if="activeName=='8'"></enterprisesReportTabs>
      </el-tab-pane>
      <el-tab-pane label="产品举报" name="9">
        <productReportTabs v-if="activeName=='9'"></productReportTabs>
      </el-tab-pane>
    </el-tabs>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import enterprisesToDeclareTabs from 'src/pages/auditchanges/auditManage/toAuditManagement/enterprisesToDeclareTabs/enterprisesToDeclareTabs'
  import productDeclarationTabs from 'src/pages/auditchanges/auditManage/toAuditManagement/productDeclarationTabs/productDeclarationTabs'
  import priceToDeclareTabs from 'src/pages/auditchanges/auditManage/toAuditManagement/priceToDeclareTabs/priceToDeclareTabs'
  import enterpriseChangeTabs from 'src/pages/auditchanges/auditManage/toAuditManagement/enterpriseChangeTabs/enterpriseChangeTabs'
  import productChangesTabs from 'src/pages/auditchanges/auditManage/toAuditManagement/productChangesTabs/productChangesTabs'
  import productProductionTabs from 'src/pages/auditchanges/auditManage/toAuditManagement/productproductionTabs/productproductionTabs'
  import priceChangeTabs from 'src/pages/auditchanges/auditManage/toAuditManagement/priceChangeTabs/priceChangeTabs'
  import productTransferTabs from 'src/pages/auditchanges/auditManage/toAuditManagement/productTransferTabs/productTransferTabs'
  import enterprisesReportTabs from 'src/pages/auditchanges/auditManage/toAuditManagement/enterprisesReportTabs/enterprisesReportTabs'
  import productReportTabs from 'src/pages/auditchanges/auditManage/toAuditManagement/productReportTabs/productReportTabs'

  export default {
    name: 'toAuditManagementTabs',
    components: {
      enterprisesToDeclareTabs,
      productDeclarationTabs,
      priceToDeclareTabs,
      enterpriseChangeTabs,
      productChangesTabs,
      productProductionTabs,
      priceChangeTabs,
      enterprisesReportTabs,
      productReportTabs,
      productTransferTabs,
    },
    data() {
      return {
        activeName: '1'
      };
    },
    created(){
      this.activeName = this.$store.state.activeName
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
        this.$store.state.activeName = tab.name;
      },
      getNavType(){
        this.activeName=this.$store.state.activeName;
      },
    },
    watch:{
      //监测store.state
      '$store.state.activeName':'getNavType',
    }
  }
</script>

