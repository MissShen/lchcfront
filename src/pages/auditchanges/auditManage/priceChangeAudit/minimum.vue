<template>
  <div class="tablebox">
    <el-form ref="form" :model="form" label-width="150">
      <price-change-audit-common ref="priceChangeAuditCommon"></price-change-audit-common>
      <el-row :gutter="24">
        <el-col :span="24">
          <el-form-item label="审核结果">
            <el-radio v-model="auditaRadio" label="1">审核通过</el-radio>
            <el-radio v-model="auditaRadio" label="2">待确认</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="审核备注">
            <el-input type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import priceChangeAuditCommon from 'src/pages/auditchanges/common/priceDetailCommon/priceChangeAuditCommon'

  export default {
    name: "minimum",
    data() {
      return {
        form: {},
        auditaRadio: '0'
      }
    },
    components: {
      priceChangeAuditCommon
    },
    created() {
      this.$nextTick(() => {
        this.$refs.priceChangeAuditCommon.mataData({
          viewFlag: '1'
        })
      })
    }
  }
</script>

<style scoped>

</style>
