<template>
  <div>

  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="routeName" name="1">
        <batch-set :routeId="routeId" :processType="processType" v-if="activeName=='1'"></batch-set>
      </el-tab-pane>
      <el-tab-pane v-if="processType == '0'" label="变更数据" name="2">
        <data-reporting :routeId="routeId" v-if="activeName=='2'"></data-reporting>
      </el-tab-pane>
    </el-tabs>
    <!-- ========================== 主内容end ========================= -->
  </div>
  </div>
</template>
<script>
  import batchSet from 'src/pages/auditchanges/auditManage/toAuditManagement/priceChangeTabs/tabs/toReviewBatch/batchSetTab/batchSet'
  import dataReporting from 'src/pages/auditchanges/auditManage/toAuditManagement/priceChangeTabs/tabs/toReviewBatch/batchSetTab/dataReporting'

  export default {
    name: "batch-set-tabs"
    ,
    components: {
      batchSet,
      dataReporting
    },
    created(){
      this.routeId = this.$route.params.id;
      this.routeName =  this.$route.params.name;
      this.processType =  this.$route.params.type;
    },
    data() {
      return {
        activeName: '1',
        routeId:'',
        routeName:'',
        processType:''
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
