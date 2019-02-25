<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <span class="tab-bar"></span>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="标的物目录" name="first">
        <corpore></corpore>
      </el-tab-pane>
      <el-tab-pane label="标的物产品目录" name="second">
        <corpore-product></corpore-product>
      </el-tab-pane>
      <el-tab-pane label="遴选产品目录" name="thirdly">
        <selected-product></selected-product>
      </el-tab-pane>
    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import corpore from 'src/pages/select/controlcenter/catalogmanagement/corpore'
  import corporeProduct from 'src/pages/select/controlcenter/catalogmanagement/corporeProduct'
  import selectedProduct from 'src/pages/select/controlcenter/catalogmanagement/selectedProduct'

  export default {
    name: 'demoTabs',
    components: {
      corpore,
      corporeProduct,
      selectedProduct
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

