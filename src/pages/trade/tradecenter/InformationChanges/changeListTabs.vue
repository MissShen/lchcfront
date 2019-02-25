<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="企业变更" name="first">
        <org-change-list :parent-id="assistId"></org-change-list>
      </el-tab-pane>
      <el-tab-pane label="产品变更" name="second">
        <div slot="label">产品变更<span class="tab-sign" v-if="tuCount!='0'">{{tuCount}}</span></div>
        <product-change-list @return="returnCount" :parent-id="assistId"></product-change-list>
      </el-tab-pane>

    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import orgChangeList from 'src/pages/trade/tradecenter/InformationChanges/orgChangeList'
  import productChangeList from 'src/pages/trade/tradecenter/InformationChanges/productChangeList'

  export default {
    name: 'assistAddTabs',
    components: {
      orgChangeList,
      productChangeList
    },
    data() {
      return {
        activeName: 'first',
        visible_second: false,
        tuCount:0,
        assistId:''
      }
    },
    created () {
      this.assistId = this.$route.params.assistId || undefined;
    },
    methods: {
      handleClick(tab, event) {
        if('second'===tab.name){
          this.visible_second=true;
        }
      },
      returnCount(val){
        this.tuCount=val;
      },
    }
  }
</script>

