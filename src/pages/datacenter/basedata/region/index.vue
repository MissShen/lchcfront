<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="国家编码列表" name="1">
        <country v-if="activeName=='1'"></country>
      </el-tab-pane>
      <el-tab-pane label="省、自治区、直辖市、编码列表" name="2">
        <province v-if="activeName=='2'"></province>
      </el-tab-pane>
      <el-tab-pane label="市(地)编码列表" name="3">
        <city v-if="activeName=='3'"></city>
      </el-tab-pane>
      <el-tab-pane label="县、县市编码列表" name="4">
        <county v-if="activeName=='4'"></county>
      </el-tab-pane>
    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import country from 'src/pages/datacenter/basedata/region/country/index'
  import province from 'src/pages/datacenter/basedata/region/province/index'
  import city from 'src/pages/datacenter/basedata/region/city/index'
  import county from 'src/pages/datacenter/basedata/region/county/index'

  export default {
    name: 'demoTabs',
    components: {
      country,
      province,
      city,
      county
    },
    data() {
      return {
        activeName: '1'
      };
    },
    created(){
      this.activeName = this.$store.state.activeName;
    },
    methods: {
      handleClick(tab, event) {
        this.$store.state.pageSeach = {};
        this.$store.state.activeName = tab.name;
      },
      getNavType(){
        this.activeName = this.$store.state.activeName
      },
    },
    watch:{
      //监测store.state
      '$store.state.activeName' : 'getNavType'
    }
  }
</script>

