<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <span class="tab-bar"></span>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="本院候选目录" name="first">
        <hospital-report-drug></hospital-report-drug>
      </el-tab-pane>
      <el-tab-pane label="备选议价" name="second">
        <not-used></not-used>
      </el-tab-pane>
    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import hospitalReportDrug from 'src/pages/contract/catalogmanagement/hospitalcandidatedirectorymaintenance/hospitalCandidateDirectoryMaintenance-Tabs-tabFirst'
  import notUsed from 'src/pages/contract/catalogmanagement/hospitalcandidatedirectorymaintenance/hospitalCandidateDirectoryMaintenance-Tabs-tabSecond'

  export default {
    name: 'quoteHospitalReportTabs',
    components: {
      hospitalReportDrug,
      notUsed
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

