<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <span class="tab-bar"></span>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="本院上报药品目录" name="first">
        <hospital-report-drug ref="hospitalReportDrug"></hospital-report-drug>
      </el-tab-pane>
      <el-tab-pane label="不再使用目录" name="second">
        <not-used ref="notUsed"></not-used>
      </el-tab-pane>
    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import hospitalReportDrug from 'src/pages/contract/catalogmanagement/hospitalreportdrug/hospitalReportDrug-Tabs-tabFirst'
  import notUsed from 'src/pages/contract/catalogmanagement/hospitalreportdrug/hospitalReportDrug-Tabs-tabSecond'

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
        // console.log(tab, event);
        //点击选项卡根据选项卡的name判断是哪个选项卡,然后加载对应的查询列表方法
        this.$nextTick( () => {
          if(tab.paneName === 'first'){
            this.$refs.hospitalReportDrug.list();
          }else if(tab.paneName === 'second'){
            this.$refs.notUsed.list();
          }
        });

      }
    }
  }
</script>

