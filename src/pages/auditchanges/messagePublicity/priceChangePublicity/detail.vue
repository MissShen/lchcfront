<template>
  <price-details-common ref="priceDetailsCommon"></price-details-common>
</template>

<script>
  import priceDetailsCommon from 'src/pages/auditchanges/common/priceDetailCommon/priceDetailsCommon'

  export default {
    name: "detail",
    components: {
      priceDetailsCommon
    },
    created() {
      this.$nextTick(() => {
        this.$refs.priceDetailsCommon.mataData({
          modelFlag: '2',
        })
      });
    },
    methods: {}
  }
</script>

<style scoped>

</style>
