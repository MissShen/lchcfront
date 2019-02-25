<template>
  <div class="s-inner">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-if="hasPerm('supervision:SelectHospitalInfo')" label="医疗遴选情况" name="1">
        <hospital v-if="activeName === '1'"></hospital>
      </el-tab-pane>
      <el-tab-pane v-if="hasPerm('supervision:findSelectHospitalInfo')" label="配送遴选情况" name="2">
        <send v-if="activeName === '2'"></send>
      </el-tab-pane>
      <el-tab-pane v-if="hasPerm('supervision:select:findSelectProductInfo')" label="产品遴选情况" name="3">
        <product v-if="activeName === '3'"></product>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import hospital from 'src/pages/supervise/select/hospital/hospital'
  import send from 'src/pages/supervise/select/send/send'
  import product from 'src/pages/supervise/select/product/product'
  import {HasPerm} from 'src/components/mixins'
  export default {
    mixins: [HasPerm],
    name: 'superviseSelect',
    components: {
      hospital,
      send,
      product
    },
    data() {
      return {
        activeName: '1'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>

