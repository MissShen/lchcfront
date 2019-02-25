<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <span class="tab-bar"></span>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部订单" name="first">
        <all-order-list></all-order-list>
      </el-tab-pane>
      <el-tab-pane label="待处理订单" name="second">
        <send-list-todo></send-list-todo>
      </el-tab-pane>
    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import allOrderList from 'src/pages/trade/tradecenter/senderRole/order/allOrderList'
  import sendListTodo from 'src/pages/trade/tradecenter/senderRole/order/sendListTodo'

  export default {
    name: 'demoTabs',
    components: {
      allOrderList,
      sendListTodo
    },
    data() {
      return {
        activeName: 'second'
      };
    },
    methods: {
      handleClick(tab, event) {
      }
    }
  }
</script>

