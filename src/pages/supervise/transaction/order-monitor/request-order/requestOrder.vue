<template>
  <div>
    <!--图形显示区-->
    <div class="infobox">
      <div id="myChart" style="height: 300px"></div>
    </div>
    <div class="s-form">
      <el-form ref="form" :model="form" :rules="rules">
        <el-input v-model="input" placeholder="订单号"></el-input>
        <el-input v-model="input" placeholder="产品名称"></el-input>
        <el-input v-model="input" placeholder="医院名称"></el-input>
        <el-input v-model="input" placeholder="生产企业"></el-input>
        <el-input v-model="input" placeholder="配送企业"></el-input>
        <el-select v-model="value" placeholder="订单状态">
          <el-option></el-option>
        </el-select>
        <el-button>查询</el-button>
      </el-form>
    </div>
    <div class="infobox">
      <div class="tableset">
        <el-table :data="tableData" stripe tooltip-effect="dark">
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="orderNum" label="订单号"></el-table-column>
          <el-table-column prop="hosName" label="医院名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="productName" label="产品名称" ></el-table-column>
          <el-table-column prop="productName" label="商用名" ></el-table-column>
          <el-table-column prop="dosageForm" label="剂型"></el-table-column>
          <el-table-column prop="spec" label="规格" show-overflow-tooltip></el-table-column>
          <el-table-column prop="factory" label="生产企业" show-overflow-tooltip></el-table-column>
          <el-table-column prop="logisticsCompany" label="配送企业" show-overflow-tooltip></el-table-column>
          <el-table-column prop="price" label="单价"></el-table-column>
          <el-table-column prop="requestNum" label="订购数量"></el-table-column>
          <el-table-column prop="requestMoney" label="订购金额"></el-table-column>
          <el-table-column prop="receiveNum" label="到货数量"></el-table-column>
          <el-table-column prop="receiveMoney" label="到货金额"></el-table-column>
          <el-table-column prop="receiveRate" label="到货率(%)"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
          <el-table-column prop="orderTime" label="日期" show-overflow-tooltip></el-table-column>
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
    name: "request-order",
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
            orderNum: 'SC-001',
            hosName: '北京惠兰医院',
            productName: '杏灵分散片',
            dosageForm: '分散片',
            spec: '0.31g(含银杏酮酯40mg)×24片/盒（空）',
            factory: '北京四环科宝制药有限公司',
            logisticsCompany: '国药控股北京有限公司药品分公司',
            price: '84.6',
            requestNum: '40',
            requestMoney: '3384',
            receiveNum: '23',
            receiveMoney: '2132',
            receiveRate: '63.2',
            status: '未完成',
            orderTime: '2018-05-16 18:28:11'
          }, {
            orderNum: 'SC-002',
            hosName: '北京惠兰医院',
            productName: '杏灵分散片',
            dosageForm: '分散片',
            spec: '0.31g(含银杏酮酯40mg)×24片/盒（空）',
            factory: '北京四环科宝制药有限公司',
            logisticsCompany: '国药控股北京有限公司药品分公司',
            price: '84.6',
            requestNum: '40',
            requestMoney: '3384',
            receiveNum: '23',
            receiveMoney: '2132',
            receiveRate: '63.2',
            status: '未完成',
            orderTime: '2018-05-16 18:28:11'
          }, {
            orderNum: 'SC-003',
            hosName: '北京惠兰医院',
            productName: '杏灵分散片',
            dosageForm: '分散片',
            spec: '0.31g(含银杏酮酯40mg)×24片/盒（空）',
            factory: '北京四环科宝制药有限公司',
            logisticsCompany: '国药控股北京有限公司药品分公司',
            price: '84.6',
            requestNum: '40',
            requestMoney: '3384',
            receiveNum: '23',
            receiveMoney: '2132',
            receiveRate: '63.2',
            status: '未完成',
            orderTime: '2018-05-16 18:28:11'
          },
        ],
        queryData: {
          orderNum: '',
          productName: '',
          hosName: '',
          factory: '',
          logisticsCompany: '',
          queryDate: '',
        },
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
                name: '采购单情况',
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
              name: '采购单情况',
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
