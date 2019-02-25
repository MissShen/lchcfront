<template>
  <dl class="mainbox">
    <dd>
      <div class="s-inner-tabs">
        <a href="javascript:" class="s-intab" :class="{active:activeName==='realTime'}" @click="inNavActive('realTime')">
          订单实时监控
        </a>
        <a href="javascript:" class="s-intab" :class="{active:activeName==='receive'}" @click="inNavActive('receive')">
          订单详细查询
        </a>
        <a href="javascript:" class="s-intab" :class="{active:activeName==='returnOrder'}" @click="inNavActive('returnOrder')">
          退货单查询
        </a>
        <span class="flo-right">
          当天订单金额：<strong class="s-lightyellow">892352354.00</strong>&nbsp;&nbsp;
          当天金额变化： <strong class="s-lightyellow">9873453</strong>&nbsp;&nbsp;
          订单总金额：<strong class="s-lightyellow">545634533.00</strong>&nbsp;&nbsp;
          总金额变化： <strong class="s-lightyellow">3743427</strong>
        </span>
      </div>
      <real-time v-if="activeName === 'realTime'"></real-time>
      <receive v-if="activeName === 'receive'"></receive>
      <return-order v-if="activeName === 'returnOrder'"></return-order>
    </dd>
  </dl>
</template>

<script>
  import realTime from 'src/pages/supervise/trade/order-monitor/realTime'
  import receive from 'src/pages/supervise/trade/order-monitor/receive'
  import returnOrder from 'src/pages/supervise/trade/order-monitor/returnOrder'
  import {HasPerm} from 'src/components/mixins'
  export default {
    name: "sTransaction",
    mixins: [HasPerm],
    components: {
      realTime,
      receive,
      returnOrder
    },
    data() {
      return {
        activeName: 'realTime'
      };
    },
    methods: {
      inNavActive(nav) {
        this.activeName = nav;
      }
    }
  }
</script>

