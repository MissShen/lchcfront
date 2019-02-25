
<template>
        <toReviewData></toReviewData>
</template>
<script>
  import dataReporting from 'src/pages/auditchanges/auditManage/toAuditManagement/productChangesTabs/tabs/dataReporting'
  import toReviewData from 'src/pages/auditchanges/auditManage/toAuditManagement/productChangesTabs/tabs/toReviewData'

  export default {
    name: "product-changes-tabs"
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
