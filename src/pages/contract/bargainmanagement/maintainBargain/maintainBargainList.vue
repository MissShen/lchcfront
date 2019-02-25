<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <span class="tab-bar"></span>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="维护议价目录" name="tabHospital">
        <bargainList/>
      </el-tab-pane>
      <el-tab-pane label="拒绝报价目录" name="tabProduction">
        <rejectOfferList/>
      </el-tab-pane>
    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>
</template>
<script>
  import bargainList from 'src/pages/contract/bargainmanagement/maintainBargain/bargainList'
  import rejectOfferList from 'src/pages/contract/bargainmanagement/maintainBargain/rejectOfferList'

  export default {
    name: 'hosCandidateCatalogTabs',
    components: {
      bargainList,
      rejectOfferList

    },
    data() {
      return {
        activeName: 'tabHospital'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>
