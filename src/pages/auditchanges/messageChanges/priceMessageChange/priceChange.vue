<template>
  <div class="tablebox">
    <el-form ref="form" :model="form">
      <div v-if="dataFlag==1">
        <price-checkbox-common ref="priceCheckboxCommon"></price-checkbox-common>
      </div>
      <div v-if="dataFlag==2">
        <calculate-price ref="calculatePrice"></calculate-price>
      </div>
    </el-form>
  </div>
</template>

<script>
import priceCheckboxCommon from "src/pages/auditchanges/common/priceDetailCommon/priceCheckboxCommon";
import calculatePrice from "src/pages/auditchanges/messageChanges/priceMessageChange/calculatePrice";

export default {
  name: "price-change",
  components: {
    priceCheckboxCommon,
    calculatePrice
  },
  data() {
    return {
      form: {},
      dataFlag: this.metaData()
    };
  },
  created() {
    if (this.dataFlag == 1) {
      this.$nextTick(() => {
        this.$refs.priceCheckboxCommon.mataData({
          viewFlag: "1"
        });
      });
    }
  },
  methods: {
    metaData() {
      return "2";
    }
  }
};
</script>

<style scoped>

</style>
