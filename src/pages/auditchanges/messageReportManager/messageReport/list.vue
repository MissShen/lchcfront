<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->

    <span class="tab-bar"></span>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="企业信息举报" name="1">
        <org-message-report v-if="activeName=='1'" ref="orgMessageReport"></org-message-report>
      </el-tab-pane>
      <el-tab-pane label="产品信息举报" name="2">
        <product-message-report v-if="activeName=='2'" ref="productMessageReport"></product-message-report>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import orgMessageReport from 'src/pages/auditchanges/messageReportManager/messageReport/orgMessageReport'
  import productMessageReport from 'src/pages/auditchanges/messageReportManager/productMessageReport/list'
  export default {
    name: "list",
    components:{
      orgMessageReport,
      productMessageReport
    },
    data() {
      return {
        activeName:'1',
      }
    },
    created(){
      this.activeName = this.$store.state.activeName;
    },
    methods: {
      handleClick(tab, event) {
        this.$store.state.pageSeach = {};
        this.$store.state.activeName = tab.name;
      },
      getNavType(){
        this.activeName = this.$store.state.activeName
      },
    },
    watch:{
      //监测store.state
      '$store.state.activeName' : 'getNavType'
    }
  }
</script>

<style scoped>

</style>
