<template>
  <div class="mainbox">
    <ul>
      <div class="s-inner-tabs">
        <router-link to="/supervise/superviseTransact/orderMonitoring/realTime" class="s-intab" :class="inNavActive('realTime')">
          订单实时监控
        </router-link>
        <router-link to="/supervise/superviseTransact/orderMonitoring/requestOrder" class="s-intab" :class="inNavActive('requestOrder')">
          采购单查询
        </router-link>
        <router-link to="/supervise/superviseTransact/orderMonitoring/returnOrder" class="s-intab" :class="inNavActive('returnOrder')">
          退货单查询
        </router-link>
      </div>
      <router-view/>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'order-monitor',
    methods: {
      inNavActive(nav) {
        const _arr = this.$route.path.split('/');
        return {
          active: _arr[4] === nav
        }
      }
    }
  }
</script>

