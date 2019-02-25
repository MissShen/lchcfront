<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <span class="tab-bar"></span>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部采购单" name="first">
        <check-purchase-pri-list></check-purchase-pri-list>
      </el-tab-pane>
      <el-tab-pane label="待审批采购单" name="second">
        <check-total-pri-list></check-total-pri-list>
      </el-tab-pane>
    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import checkTotalPriList from 'src/pages/trade/tradecenter/checkRole/purchase/checkAllList'
  import checkPurchasePriList from 'src/pages/trade/tradecenter/checkRole/purchase/itemList'

  export default {
    name: 'checkPurchaseListTabs',
    components: {
      checkTotalPriList,
      checkPurchasePriList
    },
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
      }
    }
  }
</script>

