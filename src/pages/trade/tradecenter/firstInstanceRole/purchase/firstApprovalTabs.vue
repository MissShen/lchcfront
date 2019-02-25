<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="全部采购单" name="first">
        <query-first-plan-list v-if="activeName==='first'"></query-first-plan-list>
      </el-tab-pane>
      <el-tab-pane label="待审批采购单" name="second">
        <approve-purchase-list v-if="activeName==='second'"></approve-purchase-list>
      </el-tab-pane>
    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import queryFirstPlanList from 'src/pages/trade/tradecenter/firstInstanceRole/purchase/planList'
  import approvePurchaseList from 'src/pages/trade/tradecenter/firstInstanceRole/purchase/approvePurchaseList'

  export default {
    name: 'firstApprovalTabs',
    components: {
      queryFirstPlanList,
      approvePurchaseList
    },
    data() {
      return {
        activeName: 'second'
//        visible_first: false

      };
    },
    methods: {
//      handleClick(tab, event) {
////        console.log(tab, event);
//        if('first'===tab.name){
//          this.visible_first=true;
//        }
//      }
    }
  }
</script>

