<template>

        <toReviewData></toReviewData>

</template>
<script>
  import dataReporting from 'src/pages/auditchanges/auditManage/toAuditManagement/enterprisesToDeclareTabs/tabs/dataReporting'
  import toReviewData from 'src/pages/auditchanges/auditManage/toAuditManagement/enterprisesToDeclareTabs/tabs/toReviewData'

  export default {
    name: "enterprises-to-declare-tabs",
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
