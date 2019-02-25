<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="本院目录" name="1">
        <medicine-list  v-if="activeName==='1'" @refreshTab="changeTab"></medicine-list>
      </el-tab-pane>
      <el-tab-pane label="临采目录" name="second">
        <all-medicine-list v-if="activeName==='second'"></all-medicine-list>
      </el-tab-pane>
      <!--<el-tab-pane label="采购计划" name="third">-->
        <!--<plan-list v-if="activeName==='third'"></plan-list>-->
      <!--</el-tab-pane>-->
      <el-tab-pane label="采购模板" name="fourth">
        <template-list v-if="activeName==='fourth'"></template-list>
      </el-tab-pane>

   <!--   <el-tab-pane label="价格预警" name="five">
        <div slot="label" style="position: relative;">价格预警
          <span class="tab-sign" v-if="warningCount!='0' &&  Number(warningCount)>100">100+</span>
          <span class="tab-sign" v-if="warningCount!='0' &&  Number(warningCount)<100">{{warningCount}}</span>
        </div>
        <price-warning-list @evalue="evalueCount"></price-warning-list>
      </el-tab-pane>-->

      <el-tab-pane label="价格预警" name="five">
        <div slot="label">价格预警
          <span class="tab-sign" v-if="evCount!='0' &&  Number(evCount)>100">100+</span>
          <span class="tab-sign" v-if="evCount!='0' &&  Number(evCount)<100">{{evCount}}</span>
        </div>
        <price-warning-list @evalue="evalueCount"></price-warning-list>
      </el-tab-pane>
    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import medicineList from 'src/pages/trade/tradecenter/buyerrole/purchase/medicineList'
  import allMedicineList from 'src/pages/trade/tradecenter/buyerrole/purchase/allMedicineList'
//  import planList from 'src/pages/trade/tradecenter/buyerrole/plan/planList'
  import templateList from 'src/pages/trade/tradecenter/buyerrole/purchase/templateList'
  import priceWarningList from  'src/pages/trade/tradecenter/buyerrole/purchase/priceWarningList'
  import priceWarning from 'src/pages/trade/tradecenter/buyerrole/purchase/priceWarningList'

  export default {
    name: 'purchaseTabs',
    components: {
      medicineList,
      allMedicineList,
//      planList,
      templateList,
      priceWarningList,
    },
    data() {
      return {
        activeName: '1',
        visible_second: false,
        visible_third: false,
        visible_fourth: false,
        visible_fifth:false,
        state: undefined,
        evCount:0,
      }
    },
    watch: {
      $route(to,from){
        if(to.query.anchor!=from.query.anchor){
          this.goAnchor();
        }
      },
      '$store.state.activeName':'getNavType'
    },
    mounted(){
      this.goAnchor()
    },
    created() {
      this.state = this.$route.params.state;
      this.activeName = this.$store.state.activeName
    },

    methods: {
      goAnchor(){
//        let routeAnchor = this.$route.query.anchor;
//        let routeQuery = this.$route.meta.query;
//        if (routeAnchor) {
//          routeQuery.forEach(item => {
//            if (routeAnchor == item.name) {
//              this.activeName = item.val;
//            }
//          })
//        }
      },
      handleClick(tab, event) {
        this.$store.state.activeName = tab.name
      },
      getNavType(){
        this.activeName = this.$store.state.activeName
      },
      changeTab(tab,purchaseCode){
        this.param.purchaseCode = purchaseCode;
        this.activeName=tab;
      },
//      handleClick(tab, event) {
//        this.$store.state.activeName = tab.name;
////        console.log(tab, event);
//
//        if('second'===tab.name){
//          this.visible_second=true;
//        }
//        if('third'===tab.name){
//          this.visible_third=true;
//        }
//        if('fourth'===tab.name){
//          this.visible_fourth=true;
//        }
//      },
      evalueCount(val){
        this.evCount=val;
      },
    }
  }
</script>

