

<template>

        <toReviewData></toReviewData>

</template>
<script>
  import dataReporting from 'src/pages/auditchanges/auditManage/toAuditManagement/productTransferTabs/tabs/dataReporting'
  import toReviewData from 'src/pages/auditchanges/auditManage/toAuditManagement/productTransferTabs/tabs/toReviewData'

  export default {
    name: "product-transfer-tabs"
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
