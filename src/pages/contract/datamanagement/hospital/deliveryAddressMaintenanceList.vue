<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="医院收货地址维护" name="deliveryAddressList">
        <deliveryAddressList/>
      </el-tab-pane>
      <el-tab-pane label="下级机构列表" name="subsidiariesList">
        <subsidiariesList/>
      </el-tab-pane>
    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>
</template>
  <script>
  import subsidiariesList from 'src/pages/contract/datamanagement/hospital/subsidiariesList'
  import deliveryAddressList from 'src/pages/contract/datamanagement/hospital/deliveryAddressList'

  export default {
    name: 'deliveryAddressMaintenanceListTabs',
    components: {
      subsidiariesList,
      deliveryAddressList
    },
    created() {
      if(this.$route.params.type == 'isDown'){
        this.activeName = 'subsidiariesList';
      }else{
        this.activeName = 'deliveryAddressList';
      }
    },
    data() {
      return {
        activeName: 'deliveryAddressList'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>
