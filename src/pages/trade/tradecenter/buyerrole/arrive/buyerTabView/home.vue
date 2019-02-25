<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <span class="tab-bar"></span>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="订单列表" name="first">
        <order-list></order-list>
      </el-tab-pane>
      <el-tab-pane label="待收货" name="second" >
        <div slot="label">待收货<span class="tab-sign" v-if="reCount!='0'">{{reCount}}</span></div>
        <order-receive-list @receive="receiveCount"></order-receive-list>
      </el-tab-pane>
      <el-tab-pane label="待评价" name="third">
        <div slot="label">待评价<span class="tab-sign" v-if="evCount!='0'">{{evCount}}</span></div>
        <order-evaluate-list @evalue="evalueCount"></order-evaluate-list>
      </el-tab-pane>
    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import orderList from 'src/pages/trade/tradecenter/buyerrole/arrive/buyerTabView/orderList'
  import orderReceiveList from 'src/pages/trade/tradecenter/buyerrole/arrive/buyerTabView/orderReceiveList'
//  import orderEvaluateList from 'src/pages/trade/tradecenter/buyerrole/arrive/buyerTabView/orderEvaluateList'

  export default {
    name: 'myOrderList',
    components: {
      orderList,
      orderReceiveList,
//      orderEvaluateList
    },
    data() {
      return {
        activeName: 'first',
        reCount:0,
        evCount:0
      };
    },
    created(){
    },
    methods: {
      handleClick(tab, event) {
      },
      receiveCount(val){
        this.reCount=val;
      },
      evalueCount(val){
        this.evCount=val;
      }
    }
  }
</script>

