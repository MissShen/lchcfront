<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <span class="tab-bar"></span>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="待评价" name="first">
        <order-list></order-list>
      </el-tab-pane>
      <el-tab-pane label="已评价" name="second">
        <order-receive-list></order-receive-list>
      </el-tab-pane>
    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import orderList from 'src/pages/trade/tradecenter/evaluate/fill/orderList'
  import orderReceiveList from 'src/pages/trade/tradecenter/evaluate/fill/orderReceiveList'

  export default {
    name: 'demoTabs',
    components: {
      orderList,
      orderReceiveList
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

