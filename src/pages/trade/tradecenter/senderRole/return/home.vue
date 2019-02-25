<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <span class="tab-bar"></span>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部退货单" name="first">
        <all-verify-list></all-verify-list>
      </el-tab-pane>
      <el-tab-pane label="待处理退货单" name="second">
        <wait-verify-list></wait-verify-list>
      </el-tab-pane>
    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import waitVerifyList from 'src/pages/trade/tradecenter/senderRole/return/waitVerifyList'
  import AllVerifyList from 'src/pages/trade/tradecenter/senderRole/return/AllVerifyList'

  export default {
    name: 'saleReturn',
    components: {
      waitVerifyList,
      AllVerifyList,
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

