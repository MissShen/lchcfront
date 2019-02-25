<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="产品列表" name="product">
        <hospital-select-product-sender ref="product"></hospital-select-product-sender>
      </el-tab-pane>
      <el-tab-pane label="配送列表" name="sender">
        <sender-list ref="sender"></sender-list>
      </el-tab-pane>
    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import hospitalSelectProductSender from 'src/pages/contract/sender/hospitalSelectProductSender/hospitalSelectProductSender'
  import senderList from 'src/pages/contract/sender/hospitalSelectProductSender/senderList'


  export default {
    name: 'demoTabs',
    components: {
      hospitalSelectProductSender,
      senderList
    },
    created () {

    },
    data() {
      return {
        activeName: 'product'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
        /*if (tab.name == "first") {
          this.$refs["first"].fillData();
        } else if (tab.name == "second"){
          this.$refs["second"].fillData();
        } else {
          this.$refs["thirdly"].fillData();
        }*/
      }
    }
  }
</script>

