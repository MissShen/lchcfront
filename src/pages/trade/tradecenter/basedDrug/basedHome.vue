<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="市配送企业列表" name="first">
        <based-city-snder-list></based-city-snder-list>
      </el-tab-pane>
      <el-tab-pane label="区基药配送企业列表" name="second">
        <based-district-snder-list></based-district-snder-list>
      </el-tab-pane>
    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import basedCitySnderList from "src/pages/trade/tradecenter/basedDrug/basedCitySnderList";
  import basedDistrictSnderList from "src/pages/trade/tradecenter/basedDrug/basedDistrictSnderList";

  export default {
    name: 'demoTabs',
    components: {
      basedCitySnderList,
      basedDistrictSnderList
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

