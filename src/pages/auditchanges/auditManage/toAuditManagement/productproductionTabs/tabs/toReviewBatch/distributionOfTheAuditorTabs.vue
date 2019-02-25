<template>
  <div>
    <div><el-button v-on:click="select" type="primary" plain>返回</el-button></div>

    <div class="tab-box">
      <!-- ========================== 主内容start ========================= -->
      <span class="tab-bar"></span>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="一审" name="1">
          <distributionOfTheAuditor></distributionOfTheAuditor>
        </el-tab-pane>
        <el-tab-pane label="二审" name="2">
          <distributionOfTheAuditor></distributionOfTheAuditor>
        </el-tab-pane>
        <el-tab-pane label="N审" name="3">
          <distributionOfTheAuditor></distributionOfTheAuditor>
        </el-tab-pane>
      </el-tabs>
      <span><el-button type="text" size="small"></el-button></span>
      <!-- ========================== 主内容end ========================= -->
    </div>
  </div>
</template>
<script>
  import distributionOfTheAuditor from 'src/pages/auditchanges/auditManage/toAuditManagement/enterprisesToDeclareTabs/tabs/toReviewBatch/distributionOfTheAuditorTab/distributionOfTheAuditor'


  export default {
    name: "distribution-of-the-auditor-tabs"
    ,
    components: {
      distributionOfTheAuditor
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
