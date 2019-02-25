<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!--<el-tab-pane label="采购单" name="first">-->
      <!--<div slot="label">采购单<span class="tab-sign">1</span></div>-->
      <!--<purchase-order-list></purchase-order-list>-->
      <!--</el-tab-pane>-->
      <el-tab-pane label="采购单" name="1">
        <purchase-receive-list  v-if="activeName==='1'" @refreshTab="changeTab"></purchase-receive-list>
      </el-tab-pane>

      <el-tab-pane label="订单明细" name="second">
       <!-- <div slot="label">订单明细
          <span class="tab-sign" v-if="orderItemCount!='0' &&  Number(orderItemCount)>100">100+</span>
          <span class="tab-sign" v-if="orderItemCount!='0' &&  Number(orderItemCount)<100" >{{orderItemCount}}</span>
        </div>
        <order-list v-if="activeName==='second'" :param="param"  @orderCount="itemCount"></order-list>-->
        <order-list v-if="activeName==='second'" :param="param"></order-list>
      </el-tab-pane>
      <!--<el-tab-pane label="待发货列表" name="second" >
        <div slot="label">待发货列表<span class="tab-sign">2</span></div>
        <order-receive-list v-if="visible_second"></order-receive-list>
      </el-tab-pane>-->
      <el-tab-pane label="待收货" name="third">
        <div slot="label">待收货
          <span class="tab-sign" v-if="unReceiveCount!='0' &&  Number(unReceiveCount)>100">100+</span>
          <span class="tab-sign" v-if="unReceiveCount!='0' &&  Number(unReceiveCount)<100" >{{unReceiveCount}}</span>
        </div>
        <order-un-receive-list-info v-if="activeName==='third'" @evalue="unReceive"></order-un-receive-list-info>
      </el-tab-pane>
      <!--<el-tab-pane label="已到货列表" name="four">
        <div slot="label">已到货列表<span class="tab-sign">1</span></div>
        <order-arrived-list v-if="visible_four"></order-arrived-list>
      </el-tab-pane>-->
      <el-tab-pane label="待评价" name="five">
        <div slot="label">待评价
          <span class="tab-sign" v-if="evCount!='0' &&  Number(evCount)>100">100+</span>
          <span class="tab-sign" v-if="evCount!='0' &&  Number(evCount)<100">{{evCount}}</span>
        </div>
        <order-evaluated-list v-if="activeName==='five'" @evalue="evalueCount"></order-evaluated-list>
      </el-tab-pane>
      <!--<el-tab-pane label="关闭到货列表" name="six">
        <div slot="label">关闭到货列表<span class="tab-sign">1</span></div>
        <order-close-rived-list v-if="visible_six"></order-close-rived-list>
      </el-tab-pane>-->
      <el-tab-pane label="退货明细" name="six">
      <!--  <div slot="label">退货明细
          <span class="tab-sign" v-if="returnCount!='0' &&  Number(returnCount)>100">100+</span>
          <span class="tab-sign" v-if="returnCount!='0' &&  Number(returnCount)<100" >{{returnCount}}</span>
        </div>-->
        <handle-list v-if="activeName==='six'" @return="returnCountMethod"></handle-list>
      </el-tab-pane>
    </el-tabs>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>
  import {querySendOrderItemListCount,queryEvaluatedOrderItemListCount} from 'src/axios/trade/buyerrole/arrive/buyerTabView/receiveListInfo'

  // 引入tab的页面组件
  import purchaseReceiveList from 'src/pages/trade/tradecenter/firstInstanceRole/purchase/purchaseReceiveList'
  import orderList from 'src/pages/trade/tradecenter/buyerrole/arrive/buyerTabView/purchaseItemListInfo'
  import orderUnReceiveListInfo from 'src/pages/trade/tradecenter/buyerrole/arrive/buyerTabView/orderUnReceiveListInfo'
  import orderEvaluatedList from 'src/pages/trade/tradecenter/buyerrole/arrive/buyerTabView/orderEvaluatedListInfo'
  import handleList from 'src/pages/trade/tradecenter/firstInstanceRole/return/handleList'

  export default {
    name: 'myOrderList',
    components: {
      purchaseReceiveList,
      orderList,
      orderUnReceiveListInfo,
      orderEvaluatedList,
      handleList
    },
    data() {
      return {
        param:{
          purchaseCode:'',
          state:''

        },
        activeName: '1',
        evCount:0,
        unReceiveCount:0,
        orderItemCount:0,
        returnCount:0
      };
    },
    watch: {
      $route(to,from){
        if(to.query.anchor!=from.query.anchor){
          this.goAnchor();
        }
      },
      '$store.state.activeName':'getNavType'
    },
    mounted(){
      this.goAnchor()
    },
    created(){
    this.activeName = this.$store.state.activeName || 'first'
      if(this.unReceiveCount==0){
        querySendOrderItemListCount().then(res => {
          this.unReceiveCount=res.data;
        })
      }
      if(this.evCount==0){
        queryEvaluatedOrderItemListCount().then(res => {
          this.evCount=res.data;
        })
      }
    },
    methods: {
      goAnchor(){
        let routeAnchor = this.$route.query.anchor;
        let routeQuery = this.$route.meta.query;
        if (routeAnchor) {
          routeQuery.forEach(item => {
            if (routeAnchor == item.name) {

              this.activeName = item.val;
              if(routeAnchor == '退货'){
                //console.log(routeAnchor,"-----",routeQuery)

                this.param.state = '5';
              }
              //console.log(routeAnchor,"-----",routeQuery,"------",this.param.state);

            }
          })
        }
      },
      handleClick(tab, event) {
        this.$store.state.activeName = tab.name
        this.param.purchaseCode = '';
        this.param.state = '';
      },
  getNavType(){
        this.activeName = this.$store.state.activeName
      },
      changeTab(tab,purchaseCode){
        this.param.purchaseCode = purchaseCode;
        this.activeName=tab;
      },

      evalueCount(val){
        this.evCount=val;
      },
      unReceive(val){
        this.unReceiveCount=val;
      },
      itemCount(val){
        this.orderItemCount=val;
      },
      returnCountMethod(val){
        this.returnCount=val;
      }
    }
  }
</script>

