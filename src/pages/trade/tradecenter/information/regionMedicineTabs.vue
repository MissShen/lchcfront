<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="北京市阳光采购目录" name="first">
        <merge-medicine-list messageState="purchaseCatalog"></merge-medicine-list>
      </el-tab-pane>
      <el-tab-pane label="区域目录" name="second">
        <merge-medicine-list messageState="regionCatalog"></merge-medicine-list>
      </el-tab-pane>
    </el-tabs>
    <!-- ========================== 主内容end ========================= -->
  </div>
</template>
<script>

  // 引入tab的页面组件
  /*import bjSunRegionMedicineList from 'src/pages/trade/tradecenter/information/bjSunRegionMedicineList'
  import regionMedicineList from 'src/pages/trade/tradecenter/information/regionMedicineList'*/
  import mergeMedicineList from 'src/pages/trade/tradecenter/information/mergeMedicineList'


  export default {
    name: 'regionMedicineTabs',
    components: {
      mergeMedicineList
    },
    data() {
      return {
        activeName: 'first',
        /*visible_second: false*/
      }
    },
    methods: {
      handleClick(tab, event) {
//        console.log(tab, event);
        /*if('second'===tab.name){
          this.visible_second=true;
        }*/
      }
    }
  }
</script>

