<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <span class="tab-bar"></span>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="待发货列表" name="first">
        <item-on-list></item-on-list>
      </el-tab-pane>
      <el-tab-pane label="已发货列表" name="second">
        <item-stock-up-list></item-stock-up-list>
      </el-tab-pane>
      <el-tab-pane label="已到货列表" name="third">
        <already-list></already-list>
      </el-tab-pane>
      <el-tab-pane label="订单详情" name="fourthly">
        <order-particulars-list></order-particulars-list>
      </el-tab-pane>
    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import itemOnList from 'src/pages/trade/tradecenter/buyerrole/arrive/buyerTabView/itemOnList'
  import itemStockUpList from 'src/pages/trade/tradecenter/buyerrole/arrive/buyerTabView/itemStockUpList'
  import alreadyList from 'src/pages/trade/tradecenter/buyerrole/arrive/buyerTabView/alreadyList'
  import orderParticularsList from 'src/pages/trade/tradecenter/buyerrole/arrive/buyerTabView/orderParticularsList'


  export default {
    name: 'demoTabs',
    components: {
      itemOnList,
      itemStockUpList,
      alreadyList,
      orderParticularsList
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

