<template>
        <toReviewData></toReviewData>
</template>
<script>
  import dataReporting from 'src/pages/auditchanges/auditManage/toAuditManagement/productDeclarationTabs/tabs/dataReporting'
  import toReviewData from 'src/pages/auditchanges/auditManage/toAuditManagement/productDeclarationTabs/tabs/toReviewData'

  export default {
    name: "product-declaration-Tabs"
    ,
    components: {
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
