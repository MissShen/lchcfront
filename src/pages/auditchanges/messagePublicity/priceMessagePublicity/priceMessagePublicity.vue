<template>
  <div>
    <div class="tab-box">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="产品价格申报公示" name="1">
            <price-message-declare-publicity v-if="activeName=='1'"></price-message-declare-publicity>
        </el-tab-pane>
        <el-tab-pane label="产品价格变更公示" name="2">
            <price-message-change-publicity v-if="activeName=='2'"></price-message-change-publicity>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import priceMessageDeclarePublicity from 'src/pages/auditchanges/messagePublicity/priceMessagePublicity/priceMessageDeclarePublicity'
  import priceMessageChangePublicity from 'src/pages/auditchanges/messagePublicity/priceMessagePublicity/priceMessageChangePublicity'

  export default {
    name: "price-message-publicity",
    components: {
      priceMessageDeclarePublicity,
      priceMessageChangePublicity
    },
    data() {
      return {
        activeName: 'first'
      }
    },
    created(){
      this.activeName = this.$store.state.activeName;
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
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
