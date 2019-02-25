<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <span class="tab-bar"></span>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="医院本院目录" name="joined">
        <hosCandidateCatalog-tabs-tabJoined></hosCandidateCatalog-tabs-tabJoined>
      </el-tab-pane>
      <el-tab-pane label="交易目录" name="tradeCatalog">
        <hosCandidateCatalog-tabs-tabTradeCatalog></hosCandidateCatalog-tabs-tabTradeCatalog>
      </el-tab-pane>
    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import hosCandidateCatalogTabsTabJoined from 'src/pages/contract/catalogmanagement/hoscandidatecatalog/hosCandidateCatalog-tabs-tabJoined'
  import hosCandidateCatalogTabsTabTradeCatalog from 'src/pages/contract/catalogmanagement/hoscandidatecatalog/hosCandidateCatalog-tabs-tabTradeCatalog'

  export default {
    name: 'hosCandidateCatalogTabs',
    components: {
      hosCandidateCatalogTabsTabJoined,
      hosCandidateCatalogTabsTabTradeCatalog
    },
    data() {
      return {
        activeName: 'joined'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>
