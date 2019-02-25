<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <span class="tab-bar"></span>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="tab1" name="first">
        <quoteLive-tabs-tabFirst></quoteLive-tabs-tabFirst>
      </el-tab-pane>
      <el-tab-pane label="tab2" name="second">
        <quoteLive-tabs-tabSecond></quoteLive-tabs-tabSecond>
      </el-tab-pane>
    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import quoteLiveTabsTabFirst from 'src/pages/select/quotemanagement/quoteLive-tabs-tabFirst'
  import quoteLiveTabsTabSecond from 'src/pages/select/quotemanagement/quoteLive-tabs-tabSecond'

  export default {
    name: 'quoteLiveTabs',
    components: {
      quoteLiveTabsTabFirst,
      quoteLiveTabsTabSecond
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
