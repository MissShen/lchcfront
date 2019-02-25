<template>
  <div>
    <!--图形显示区-->
    <div class="infobox">
      <div id="myChart" style="height: 300px"></div>
    </div>
    <div class="infobox">
      <div class="tableset">
        <el-table :data="tableData"  stripe tooltip-effect="dark">
          <el-table-column prop="hosName" label="医院名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="productName" label="产品名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="dosageForm" label="剂型"></el-table-column>
          <el-table-column prop="spec" label="规格包装" show-overflow-tooltip></el-table-column>
          <el-table-column prop="unit" label="单位" width="80"></el-table-column>
          <el-table-column prop="factory" label="生产企业" show-overflow-tooltip></el-table-column>
          <el-table-column prop="logisticsCompany" label="配送企业" show-overflow-tooltip></el-table-column>
          <el-table-column prop="requestNum" label="订购数量" width="100"></el-table-column>
          <el-table-column prop="requestPrice" label="采购价" width="100"></el-table-column>
          <el-table-column prop="requestMoney" label="订购金额" width="100"></el-table-column>
          <el-table-column prop="originalRequestPrice" label="原采购价" width="100"></el-table-column>
          <el-table-column prop="changeRate" label="变化比率(%)" width="100"></el-table-column>
          <el-table-column prop="moneyChange" label="金额变化" width="100"></el-table-column>
          <el-table-column prop="orderTime" label="订单时间" show-overflow-tooltip></el-table-column>
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
    export default {
      name: "real-time",
      data() {
        return {
          value: '',
          tableData: [
            {
              hosName: '北京惠兰医院',
              productName: '杏灵分散片',
              dosageForm: '分散片',
              spec: '0.31g(含银杏酮酯40mg)×24片/盒（空）',
              unit: '盒',
              factory: '北京四环科宝制药有限公司',
              logisticsCompany: '国药控股北京有限公司药品分公司',
              requestNum: '40',
              requestPrice: '84.6',
              requestMoney: '3384',
              originalRequestPrice:'',
              changeRate: '--',
              moneyChange: '',
              orderTime: '2018-05-16 18:28:11'
            },{
              hosName: '北京惠兰医院',
              productName: '注射用间苯三酚(冻干)',
              dosageForm: '冻干粉针剂',
              spec: '40mg×1瓶/瓶（空）',
              unit: '瓶',
              factory: '湖北午时药业股份有限公司',
              logisticsCompany: '北京易快医药有限责任公司',
              requestNum: '30',
              requestPrice: '23',
              requestMoney: '690',
              originalRequestPrice:'31.2',
              changeRate: '-26.28',
              moneyChange: '-246',
              orderTime: '2018-05-16 18:28:11'
            },{
              hosName: '北京惠兰医院',
              productName: '曲安奈德注射液',
              dosageForm: '注射用混悬剂',
              spec: '1ml:40mg×1支/支（空）',
              unit: '支',
              factory: '昆明积大制药股份有限公司',
              logisticsCompany: '华润新龙(北京)医药有限公司',
              requestNum: '10',
              requestPrice: '7.94',
              requestMoney: '79/4',
              originalRequestPrice:'10.6',
              changeRate: '-25.09',
              moneyChange: '-246',
              orderTime: '2018-05-16 18:28:11'
            },
          ],
          resOrderDate: this.metaOrderDate(),
        }
      },
      methods: {
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
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
              }
            },
            legend: {
              data: [
                {
                  name: '医院订单情况',
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
                name: '医院订单情况',
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
      mounted() {
        this.$nextTick(function () {
          this.drawBar();
        })
      }
    }
</script>
