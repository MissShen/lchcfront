<template>
  <div class="tablebox">
    <el-form ref="form" :model="form">
      <price-details-common ref="priceDetailsCommon"></price-details-common>
    </el-form>
  </div>
</template>

<script>
  import priceDetailsCommon from 'src/pages/auditchanges/common/priceDetailCommon/priceDetailsCommon'

  export default {
    name: "detail",
    components: {
      priceDetailsCommon
    },
    data() {
      return {
        form: {}

      }
    },
    created() {
      this.$nextTick(() => {
        this.$refs.priceDetailsCommon.mataData({
          modelFlag: '0',
        })
      });
    }
  }
</script>

<style scoped>

</style>
