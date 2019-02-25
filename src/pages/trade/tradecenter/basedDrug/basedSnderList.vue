<template>
  <div>

    <!-- ========================== 主内容start ========================= -->
    <div class="tabs-panel">
      <router-link to="/trade/basedSnderList/basedCitySnderList" class="active">市基药配送</router-link>
      <router-link to="/trade/basedSnderList/basedDistrictSnderList">区基药配送</router-link>
    </div>
    <router-view></router-view>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>


  export default {
    name: 'basedSnderList',//对应本文件名
  }
</script>

