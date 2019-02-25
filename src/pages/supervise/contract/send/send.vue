<template>
  <div>
    <!--图形显示区-->
    <div class="infobox">
      <div id="sendChart" style="height: 300px"></div>
    </div>
    <div class="s-form">
      <form>
        <el-select v-model="value" placeholder="所属项目">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select v-model="value" placeholder="中标情况">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select v-model="value" placeholder="标的物类别">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select v-model="value" placeholder="是否主要规格">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-button type="primary" style="height:33px;background-color: #083176">查询</el-button>
      </form>
    </div>
    <div class="infobox">
      <div class="tableset">
        <el-table
          :data="tableData"
          stripe
          tooltip-effect="dark">
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="sendFactory" label="配送企业"  width="180" show-overflow-tooltip></el-table-column>
          <el-table-column prop="yyxz" label="医院选择数量"></el-table-column>
          <el-table-column prop="yyqdht" label="医院签订合同数量"></el-table-column>
          <el-table-column prop="scqy" label="生产企业数量"></el-table-column>
          <el-table-column prop="pscp" label="配送产品数量"></el-table-column>
        </el-table>
      </div>
      <!-- 表格分页 -->
      <div class="pagebox">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30]"
          :total="resOrderDate.total"
          :page-size="resOrderDate.pageSize"
          :page-count="resOrderDate.pages"
          :current-page.sync="resOrderDate.pageNum">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import 'echarts/map/js/china.js'

  export default {
    name: "send",
    data() {
      return {
        options: [
          {
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }
        ],
        value: '',
        tableData: [
          {
            sendFactory: '北京涵更药业有限公司',
            yyxz: '0',
            yyqdht: '0',
            scqy: '5',
            pscp: '80'
          }, {
            sendFactory: '北京富国堂医药有限公司',
            yyxz: '5',
            yyqdht: '2',
            scqy: '42',
            pscp: '572'
          }, {
            sendFactory: '国药控股北京有限公司',
            yyxz: '822',
            yyqdht: '751',
            scqy: '2272',
            pscp: '32219'
          }
        ],
        resOrderDate: this.metaOrderDate(),
      }
    },
    created() {
    },
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex % 2 === 0) {
          return 'odd-row';
        } else {
          return 'even-row';
        }
      },
      drawBar() {
        let sendChart = this.$echarts.init(document.getElementById('sendChart'));
        sendChart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          toolbox: {
            iconStyle: {
              borderColor: '#34d4df'//设置工具箱图标颜色
            },
            feature: {
              magicType: {
                show: true,
                type: ['line', 'bar']
              }
            }
          },
          legend: {
            data: [
              {
                name: '医院选择数量',
                textStyle: {color: '#0D8AFF'}
              }
            ]
          },
          textStyle: {
            fontSize: 16
          },
          xAxis: [{
            type: 'category',
            data: ['华润医药商业', '国控北京公司', '京九州通医药', '嘉事堂药业', '国药股份', '科园信海医药', '国控北京华鸿', '北京爱心伟业'],
            axisLine: {
              lineStyle: {
                color: '#FFFFFF'
              }
            },
            axisPointer: {
              type: 'shadow'
            }
          }],
          yAxis: [{
            type: 'value',
            name: '个',
            min: 0,
            max: 400,
            interval: 100,
            axisLine: {
              lineStyle: {
                color: '#FFFFFF',
              }
            },
            axisLabel: {
              formatter: '{value} '
            },
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            }
          }],
          series: [
            {
              name: '医院选择数量',
              type: 'bar',
              barGap: '0', /*单柱间距*/
              barWidth: '30',
              barCategoryGap: '50%',
              data: [210, 123, 280, 80, 45, 26, 175, 350],
              color: '#0D8AFF'
            }]
        })
      },
      handleSizeChange(val) {
        this.resData.pageSize = val;
        this.metaList()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val;
        this.metaList()
      },
      metaList() {
        this.queryData.queryDate = this.chartForm.packDate;
        this.queryData.queryDateUnit = this.chartForm.pickTime;
        this.queryData.queryQuarter = this.chartForm.selectedSeason;
        transactionCount(this.resData, this.queryData).then(res => {
          this.resData = res.data;
          for (let i of this.resData.changeRate) {
            this.purchaseMoney.push(i.purchaseMoney);
            this.receiptMoney.push(i.receiptMoney);
            this.transactionMonth.push(i.transactionMonth);
          }
          this.drawGraph('main');
        });

        transactionOrderList(this.resData, this.queryData).then(res => {
          this.resOrderDate = res.data;
          0 === this.resData.pageNum ? this.resData.pageNum = 1 : null;
        })

      },
      metaOrderDate() {
        return {
          pageNum: 1,
          pageSize: 20,
          total: 3,
          pages: 0,
          list: []
        }
      },
    },
    watch: {},
    mounted() {
      this.$nextTick(function () {
        this.drawBar();
      })
    }
  }
</script>

<style scoped>

</style>
