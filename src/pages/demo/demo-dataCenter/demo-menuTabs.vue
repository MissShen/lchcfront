<template>
  <div>
    <div class="tabs-panel">
      <span class="active">分配菜单</span>
    </div>
    <div class="menu-zt">
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="数据管理" name="first">
          <demo-tabs-data-menu-tabs></demo-tabs-data-menu-tabs>
        </el-tab-pane>
        <el-tab-pane label="资审管理" name="second">
          <dem-tabs-audit-menu-tabs></dem-tabs-audit-menu-tabs>
        </el-tab-pane>
        <el-tab-pane label="遴选管理" name="third">遴选管理</el-tab-pane>
        <el-tab-pane label="合同管理" name="fourth">合同管理</el-tab-pane>
        <el-tab-pane label="交易管理" name="fifth">交易管理</el-tab-pane>
        <el-tab-pane label="管理中心" name="sixth">管理中心</el-tab-pane>
        <el-tab-pane label="监督管理" name="seventh">监督管理</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
  // 引入tab数据页面组件
  import demoTabsDataMenuTabs from 'src/pages/demo/demo-dataCenter/demo-tabs-dataMenuTabs.vue'
  import demTabsAuditMenuTabs from 'src/pages/demo/demo-dataCenter/demo-tabs-auditMenuTabs.vue'
  export default {
    name: 'demo-menuTabs',
    components: {
      demoTabsDataMenuTabs,
      demTabsAuditMenuTabs
    },
    data() {
      return {
        activeName2: 'first'
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
  .menu-zt{
    padding: 20px 10px 20px 10px;
  }
  .el-tabs--card>.el-tabs__header .el-tabs__item.is-active{
    background-color:#576376;
    border-color:#576376;
    color:#fff;
  }
  .el-tabs__item:hover{
    color:#666;
  }
</style>
