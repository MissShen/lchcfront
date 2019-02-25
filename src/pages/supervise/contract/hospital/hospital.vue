<template>
  <div>
    <!--图形显示区-->
    <div class="infobox">
      <div id="myChart" style="height: 300px"></div>
    </div>
    <div class="infobox">
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
          <el-button>查询</el-button>
        </form>
      </div>
      <div class="tableset">
        <el-table
          :data="tableData"
          stripe
          tooltip-effect="dark">
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="fullName" label="医院名称"  width="180" show-overflow-tooltip></el-table-column>
          <el-table-column prop="abbrName" label="医院简称"></el-table-column>
          <el-table-column prop="level" label="医院级别"></el-table-column>
          <el-table-column prop="areaName" label="区县名称"></el-table-column>
          <el-table-column prop="hosKind" label="医院性质"></el-table-column>
          <el-table-column prop="byml" label="本院目录"></el-table-column>
          <el-table-column prop="hxml" label="候选目录数量"></el-table-column>
          <el-table-column prop="yjml" label="议价目录数量"></el-table-column>
          <el-table-column prop="jyxz" label="基药选择数量"></el-table-column>
          <el-table-column prop="jylx" label="基药遴选占比"></el-table-column>
          <el-table-column prop="yxps" label="已选配送数量"></el-table-column>
          <el-table-column prop="qdht" label="签订合同数量"></el-table-column>
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
  import 'echarts/map/js/china.js'

  export default {
    name: "hospital",
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
            fullName: '北京密云世济医院',
            abbrName: '密云世济医院',
            level: '一级医院',
            areaName: '密云区',
            hosKind: '民营',
            byml: '19381',
            hxml: '19115',
            yjml: '240',
            jyxz: '5544',
            jylx: '28.96%',
            yxps: '129',
            qdht: '37'
          }, {
            fullName: '北京市顺义区李遂镇卫生院',
            abbrName: '顺义李遂社区',
            level: '社区',
            areaName: '顺义区',
            hosKind: '公立',
            byml: '19235',
            hxml: '19235',
            yjml: '0',
            jyxz: '5549',
            jylx: '28.85%',
            yxps: '7',
            qdht: '7'
          }, {
            fullName: '北京赛盛泰康企业管理服务有限公司门诊部',
            abbrName: '赛盛泰康门诊',
            level: '其他',
            areaName: '朝阳区',
            hosKind: '公立',
            byml: '19073',
            hxml: '19069',
            yjml: '2',
            jyxz: '5476',
            jylx: '28.71%',
            yxps: '7',
            qdht: '7'
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
        let myChart = this.$echarts.init(document.getElementById('myChart'));
        myChart.setOption({
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
                name: '医院遴选情况',
                textStyle: {color: '#0D8AFF'}
              }
            ]
          },
          textStyle: {
            fontSize: 16
          },
          xAxis: [{
            type: 'category',
            data: ['密云世济医院', '顺义李遂社区', '万博中医医院', '朝阳国医之家中医', '赛盛泰康门诊', '肾安医院', '六里屯社区', '北京市塑料三厂'],
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
              name: '医院遴选情况',
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
