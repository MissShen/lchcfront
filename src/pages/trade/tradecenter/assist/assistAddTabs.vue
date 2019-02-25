<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="本院采购目录" name="first">
        <product-list :parent-id="assistId"></product-list>
      </el-tab-pane>
      <el-tab-pane label="基础数据库" name="second">
        <div slot="label">基础数据库<span class="tab-sign" v-if="tuCount!='0'">{{tuCount}}</span></div>
        <zbid-product-list @return="returnCount" v-if="visible_second" :parent-id="assistId"></zbid-product-list>
      </el-tab-pane>

    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import productList from 'src/pages/trade/tradecenter/assist/productList'
  import zbidProductList from 'src/pages/trade/tradecenter/assist/zbidProductList'

  export default {
    name: 'assistAddTabs',
    components: {
      productList,
      zbidProductList
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

