<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <!--<span class="tab-bar"></span>-->
    <!--<el-tabs v-model="activeName" @tab-click="handleClick">-->
      <!--<el-tab-pane label="申报数据" name="1">-->
        <!--<dataReporting></dataReporting>-->
      <!--</el-tab-pane>-->
      <!--<el-tab-pane label="待审核数据" name="2">-->
        <toReviewData></toReviewData>
      <!--</el-tab-pane>-->


    <!--</el-tabs>-->

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>
  import dataReporting from 'src/pages/auditchanges/auditManage/toAuditManagement/productproductionTabs/tabs/dataReporting'
  import toReviewData from 'src/pages/auditchanges/auditManage/toAuditManagement/productproductionTabs/tabs/toReviewData'

  export default {
    name: "productproduction-tabs"
    ,
    components: {
      dataReporting,
      toReviewData
    },
    data() {
      return {
        activeName: '1'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }

</script>

<style>

</style>
