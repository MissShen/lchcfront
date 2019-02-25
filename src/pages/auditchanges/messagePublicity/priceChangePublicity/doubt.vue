<template>
  <price-entering-common ref="priceEnteringCommon"></price-entering-common>
</template>

<script>
  import priceEnteringCommon from 'src/pages/auditchanges/common/priceDetailCommon/priceEnteringCommon'
    export default {
        name: "doubt",
      components:{
          priceEnteringCommon
      },
      created(){
          this.$nextTick(()=>{
            this.$refs.priceEnteringCommon.mataData({
              viewFlag:'1'
            })
          })
      }
    }
</script>

<style scoped>

</style>
