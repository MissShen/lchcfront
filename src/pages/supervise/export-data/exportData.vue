<template>
  <div class="s-inner">
    <div class="t-tabs">
      <span class="page-nav">
        <router-link to="/supervise/superviseExportData/index" :class="inNavActive('index')">
          首页
        </router-link>
        <router-link to="/supervise/superviseExportData/moneyTrend" :class="inNavActive('moneyTrend')">
          金额趋势
        </router-link>
        <router-link to="/supervise/superviseExportData/medicalTrend" :class="inNavActive('medicalTrend')">
          药品趋势
        </router-link>
        <router-link to="/supervise/superviseExportData/basicMedical" :class="inNavActive('basicMedical')">
          基本药品
        </router-link>
        <router-link to="/supervise/superviseExportData/userDefined" :class="inNavActive('userDefined')">
          自定义导出
        </router-link>
      </span>
    </div>
    <router-view/>
  </div>
</template>
<script>
  export default {
    name: 'export-data',
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


