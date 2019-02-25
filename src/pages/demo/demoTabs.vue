<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
   <span class="tab-bar"></span>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="待发货列表" name="first">
          <demo-tabs-tabapp></demo-tabs-tabapp>
        </el-tab-pane>
      <el-tab-pane label="备货/发货列表" name="second">
        <div slot="label" class="pos-sign">备货/发货列表<span class="tab-sign">8</span></div>
        <demo-tabs-tabbook></demo-tabs-tabbook>
      </el-tab-pane>
      <el-tab-pane label="待评价" name="third">
        <div slot="label" class="pos-sign">待评价<span class="tab-sign">2</span></div>
        <demo-trade-sign></demo-trade-sign>
      </el-tab-pane>
      <el-tab-pane label="订单详情" name="fourth">
        <demo-trade-list></demo-trade-list>
      </el-tab-pane>
    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import demoTabsTabapp from 'src/pages/demo/demo-tabs-tabapp'
  import demoTabsTabbook from 'src/pages/demo/demo-tabs-tabbook'
  import demoTradeSign from 'src/pages/demo/demo-tradeSign.vue'
  import demoTradeList from 'src/pages/demo/demo-tradeList.vue'

  export default {
    name: 'demoTabs',
    components: {
      demoTabsTabapp,
      demoTabsTabbook,
      demoTradeSign,
      demoTradeList
    },
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>

