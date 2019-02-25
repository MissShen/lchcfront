<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <span class="tab-bar"></span>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="可用药品目录" name="first">
        <product-list-tabs-cat></product-list-tabs-cat>
      </el-tab-pane>
      <el-tab-pane label="禁用药品目录" name="second">
        <product-list-tabs-forbidden></product-list-tabs-forbidden>
      </el-tab-pane>
    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import productListTabsCat from 'src/pages/trade/tradecenter/buyerrole/purchase/productListTabsCat'
  import productListTabsForbidden from 'src/pages/trade/tradecenter/buyerrole/purchase/productListTabsForbidden'

  export default {
    name: 'productListTabs',
    components: {
      productListTabsForbidden,
      productListTabsCat
    },
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
      }
    }
  }
</script>

