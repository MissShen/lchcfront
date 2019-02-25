<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <span class="tab-bar"></span>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="可选产品评分项" name="first">
        <product-item-selection></product-item-selection>
      </el-tab-pane>
      <el-tab-pane label="已选产品评分项" name="second">
        <product-item-selected></product-item-selected>
      </el-tab-pane>
    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import productItemSelection from 'src/pages/select/controlcenter/score/productItemSelection'
  import productItemSelected from 'src/pages/select/controlcenter/score/productItemSelected'

  export default {
    name: 'demoTabs',
    components: {
      productItemSelection,
      productItemSelected
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

