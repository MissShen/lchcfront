<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="企业主动降价议价确认" name="tabManufacturePriceConfirmationList">
        <manufacturePriceConfirmation/>
      </el-tab-pane>
      <el-tab-pane label="企业主动降价议价公示" name="tabManufacturePriceListAll">
        <manufacturePriceList/>
      </el-tab-pane>
    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>
</template>
  <script>
  import manufacturePriceConfirmation from 'src/pages/contract/bargainmanagement/bargainquote/manufacturePriceConfirmation'
  import manufacturePriceList from 'src/pages/contract/bargainmanagement/bargainquote/manufacturePriceList'

  export default {
    name: 'tabManufacturePriceConfirmationListTabs',
    components: {
      manufacturePriceConfirmation,
      manufacturePriceList
    },
    data() {
      return {
        activeName: 'tabManufacturePriceConfirmationList'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>
