<template>
  <div class="s-inner">
    <div class="t-tabs">
      <span class="page-nav">
        <router-link to="/supervise/superviseContract/hospital" :class="inNavActive('hospital')">
          医疗机构合同签订详情
        </router-link>
        <router-link to="/supervise/superviseContract/send" :class="inNavActive('send')">
          配送企业合同签订详情
        </router-link>
        <router-link to="/supervise/superviseContract/declare" :class="inNavActive('declare')">
          申报企业合同签订详情
        </router-link>
      </span>
    </div>
    <div class="mainbox">
      <router-view/>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'supervise-contract',
    methods: {
      inNavActive(nav) {
        const _arr = this.$route.path.split('/');
        return {
          active: _arr[3] === nav
        }
      }
    }
  }
</script>

