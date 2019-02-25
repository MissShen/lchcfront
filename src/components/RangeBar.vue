<template>
  <div :class="{rangebar: true, ahand: rangeData[3]}" @click="barClick">
    <template v-if="rangeData[3]">
      <span class="green">{{priceFormat(rangeData[1])}}</span>
      <span class="rainbow">
        <i class="iconfont ico-sanjiao2" :style="getBarStyle(rangeData[0],rangeData[1],rangeData[2])"></i>
      </span>
      <span class="red">{{priceFormat(rangeData[2])}}</span>
    </template>
    <template v-else>
      <span class="light">{{priceFormat(rangeData[1])}}</span>
      <span class="mutebar"><i class="iconfont ico-sanjiao2"></i></span>
      <span class="light">{{priceFormat(rangeData[2])}}</span>
    </template>
  </div>
</template>

<script>
  import {priceFormat} from "src/utils";
  export default {
    name: "RangeBar",
    props: {
      rangeData: {
        type: Array,
        /*[
            rangeData[0]: 彩虹条中间值
            rangeData[1]: 彩虹条左侧值
            rangeData[2]: 彩虹条右侧值
            rangeData[3]: true - 显示彩虹条； false - 显示灰色条
            rangeData[4]: true - 有点击事件
        ]*/
        required: true
      }
    },
    methods: {
      priceFormat,
      getPosition(a, b, c){
        const _a = Number(a) || 0;
        const _b = Number(b) || 0;
        const _c = Number(c) || 0;
        let lowPrice = (_a - _b) > 0 ? (_a - _b) : 0;
        const topPrice = _c - _b;
        return topPrice === 0 ? 50 : lowPrice/topPrice*100;
      },
      getColor(perc){
        if(perc<34){
          return '#58bc6b';
        }else if(perc>=34 && perc<67){
          return '#f1bd04';
        }else{
          return '#ff5b48';
        }
      },
      getBarStyle(a, b, c) {
        const perc = this.getPosition(a, b, c);
        return {
          position: 'absolute',
          top: '-16px',
          left: (0.48*perc - 6) + 'px',
          color: this.getColor(perc)
        }
      },
      barClick(){
        this.$emit("bar-click");
      }
    }
  }
</script>
