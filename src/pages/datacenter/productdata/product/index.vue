<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="产品信息" name="1">
        <product-info ref="productor" v-if="activeName=='1'"></product-info>
      </el-tab-pane>
      <el-tab-pane label="产品回收站" name="2">
        <product-recover ref="productre" v-if="activeName=='2'"></product-recover>
      </el-tab-pane>
    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import productInfo from 'src/pages/datacenter/productdata/product/detail/mainTable'
  import productRecover from 'src/pages/datacenter/productdata/product/recover/mainTable'

  export default {
    name: 'demoTabs',
    components: {
      productInfo,
      productRecover
    },
    data() {
      return {
        activeName: '1'
      };
    },
    created(){
      this.activeName=this.$store.state.activeName;
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
        this.$store.state.pageSeach={};
        this.$store.state.activeName=tab.name;
      },
      getNavType(){
        this.activeName=this.$store.state.activeName;
      },
    },
    watch:{
      '$store.state.activeName':'getNavType',
    }
  }
</script>

