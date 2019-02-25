<template>
  <div class="mainbox">
    <div class="part-one w100 clearfixed">
      <ul class="nopad-left w30 flo-left part-one-left">
        <li class="part-one-li flo-left">
          <p>总采购金额（万元）</p>
          <p class="number">6203747.13</p>
        </li>
        <li class="part-one-li flo-left">
          <p>总到货金额（万元）</p>
          <p class="number">4099578.16</p>
        </li>
        <li class="part-one-li flo-left">
          <p>总采购数量</p>
          <p class="number">1701581737</p>
        </li>
        <li class="part-one-li flo-left">
          <p>总到货数量</p>
          <p class="number">1119858191</p>
        </li>
        <li class="part-one-li flo-left">
          <p>医疗机构数量</p>
          <p class="number">3585</p>
        </li>
        <li class="part-one-li flo-left">
          <p>生产企业数量</p>
          <p class="number">116</p>
        </li>
        <li class="part-one-li flo-left">
          <p>配送企业数量</p>
          <p class="number">358</p>
        </li>
        <li class="part-one-li flo-left">
          <p>采购品种数量</p>
          <p class="number">14387</p>
        </li>
      </ul>
      <div class="w40 flo-left map-part"></div>
      <div class="w30 bar-part flo-left">
         <div class="bar">
           <div id="main" :style="{width: '360px', height: '160px'}"></div>
         </div>
         <div class="bar"></div>
      </div>
    </div>
    <div class="part-second w100 clearfixed">
      <div class="w30 flo-left bars"></div>
      <div class="w40 flo-left bars"></div>
      <div class="w30 flo-left bars"></div>
    </div>
  </div>
</template>

<script>
  // 引入基本模板
  let echarts = require('echarts/lib/echarts');
  // 引入柱状图组件
  require('echarts/lib/chart/bar');
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  export default {
    name: "",
    data(){
      return {

      }
    },
    mounted() {
      this.drawLine();
    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        myChart.setOption({
          title: {
            text: '折线图堆叠'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:['邮件营销']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            iconStyle: {
              borderColor: '#34d4df'//设置工具箱图标颜色
            },
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一','周二','周三','周四','周五','周六','周日']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name:'邮件营销',
              type:'line',
              stack: '总量',
              data:[120, 132, 101, 134, 90, 230, 210]
            }
          ]
        });
      }
    },
    watch: {
    },
  }
</script>
<style>
  .chart-pie-box{
    height: 150px;
    width: 100%;
  }
  .chart-pie-box .chart-pie{
    height:100%
  }
  .chart-pie-box .chart-pie div{
    width: 100%;
    height: 100%;
  }

  /*数字动效*/
  /* 撑开高度 */
  .flip-number::before {
    content: 'a';
    display: block;
    color: transparent;
  }

  /* 数字 */
  .flip-number::after {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    content: '0\A 1\A 2\A 3\A 4\A 5\A 6\A 7\A 8\A 9\A' attr(data-num);
    display: block;
    /*white-space: pre-line;*/
    text-align: center;
    animation: flipNumber cubic-bezier(.12, .78, .52, 1.2) 1 .8s;
    animation-fill-mode: forwards;
    will-change: transform;
  }

  @keyframes flipNumber {
    from {
      transform: translateY(0%);
    }
    to {
      transform: translateY(-1000%);
    }
  }
  .flip-number:nth-child(1)::after{
    animation-delay: .2s;
  }
  .flip-number {
    position: relative;
    overflow: hidden;
    display: inline-block;
  }

  .flip-number {
    text-align: center;
    width: 18px;
    font-size: 32px;
  }
</style>
