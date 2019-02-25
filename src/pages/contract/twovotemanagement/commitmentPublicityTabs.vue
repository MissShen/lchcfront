<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="已签医疗机构" name="tabHospital">
        <commitmentPublicity-tabs-tabHospital></commitmentPublicity-tabs-tabHospital>
      </el-tab-pane>
      <el-tab-pane label="已签生产企业" name="tabProduction">
        <commitmentPublicity-tabs-tabProduction></commitmentPublicity-tabs-tabProduction>
      </el-tab-pane>
      <el-tab-pane label="已签配送企业" name="tabSender">
        <commitmentPublicity-tabs-tabSender></commitmentPublicity-tabs-tabSender>
      </el-tab-pane>

    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import commitmentPublicityTabsTabHospital from 'src/pages/contract/twovotemanagement/commitmentPublicity-tabs-tabHospital'
  import commitmentPublicityTabsTabProduction from 'src/pages/contract/twovotemanagement/commitmentPublicity-tabs-tabProduction'
  import commitmentPublicityTabsTabSender from 'src/pages/contract/twovotemanagement/commitmentPublicity-tabs-tabSender'

  export default {
    name: 'commitmentPublicityTabs',
    components: {
      commitmentPublicityTabsTabHospital,
      commitmentPublicityTabsTabProduction,
      commitmentPublicityTabsTabSender
    },
    data() {
      return {
        activeName: 'tabHospital'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>
