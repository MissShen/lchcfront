<template>
  <div>
  <div><el-button v-on:click="select" type="primary" plain>返回</el-button></div>

  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <span class="tab-bar"></span>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="传入名称" name="1">
        <batch-set></batch-set>
      </el-tab-pane>
      <el-tab-pane label="变更数据" name="2">
        <data-reporting></data-reporting>
      </el-tab-pane>
    </el-tabs>
    <span><el-button type="text" size="small"></el-button></span>
    <!-- ========================== 主内容end ========================= -->
  </div>
  </div>
</template>
<script>
  import batchSet from 'src/pages/auditchanges/auditManage/toAuditManagement/enterprisesToDeclareTabs/tabs/toReviewBatch/batchSetTab/batchSet'
  import dataReporting from 'src/pages/auditchanges/auditManage/toAuditManagement/enterprisesToDeclareTabs/tabs/toReviewBatch/batchSetTab/dataReporting'

  export default {
    name: "batch-set-tabs"
    ,
    components: {
      batchSet,
      dataReporting
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
