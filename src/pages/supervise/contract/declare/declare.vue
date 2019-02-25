<template>
  <div>
    <!--图形显示区-->
    <div class="infobox">
      <div id="productChart" style="height: 300px"></div>
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
        <el-button>查询</el-button>
      </form>
    </div>
    <div class="infobox">
      <div class="tableset">
        <el-table
          :data="tableData"
          stripe
          tooltip-effect="dark">
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="productName" label="产品名称" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="name" label="商用名" ></el-table-column>
          <el-table-column prop="jixing" label="剂型"></el-table-column>
          <el-table-column prop="guige" label="规格"></el-table-column>
          <el-table-column prop="zhb" label="转换比"></el-table-column>
          <el-table-column prop="unit" label="单位"></el-table-column>
          <el-table-column prop="baocai" label="包材"></el-table-column>
          <el-table-column prop="factory" label="生产企业" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="sfhx" label="是否候选目录" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="suoshu" label="所属目录" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="minPrice" label="全国最低价"></el-table-column>
          <el-table-column prop="qybj" label="企业报价"></el-table-column>
          <el-table-column prop="isJY" label="基药标记"></el-table-column>
          <el-table-column prop="yyxz" label="医院选择数量"></el-table-column>
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
    name: "product",
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
            productNum: 'B01J10000000000000122046',
            productName: '苓桂咳喘宁胶囊',
            name: '无',
            jixing: '胶囊剂',
            guige: '0.34g',
            zhb: '40',
            unit: '盒',
            baocai: '空',
            factory: '河南省济源市济世药业有限公司',
            sfhx: '是',
            suoshu: '中药竞价谈判目录',
            minPrice: '25.76',
            qybj: '25.76',
            isJY: '',
            yyxz: '0'
          }, {
            productNum: 'B01J10000000000000513499',
            productName: '氨咖黄敏胶囊',
            name: '无',
            jixing: '胶囊剂',
            guige: '复方',
            zhb: '20',
            unit: '盒',
            baocai: '空',
            factory: '青海鲁抗大地药业有限公司',
            sfhx: '否',
            suoshu: '西药低价药品目录',
            minPrice: '',
            qybj: '待谈判',
            isJY: '北京增补',
            yyxz: '0'
          }, {
            productNum: 'B01J10000000000000924022',
            productName: '益母草颗粒',
            name: '无',
            jixing: '颗粒剂',
            guige: '15g',
            zhb: '10',
            unit: '盒',
            baocai: '空',
            factory: '华润三九(枣庄)药业有限公司',
            sfhx: '是',
            suoshu: '中药低价药品目录',
            minPrice: '',
            qybj: '6',
            isJY: '国家基药\t0',
            yyxz: '1'
          },
        ],
        resOrderDate: this.metaOrderDate(),
      }
    },
    created() {
    },
    methods: {
      drawBar() {
        let productChart = this.$echarts.init(document.getElementById('productChart'));
        productChart.setOption({
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
            data: ['破伤风抗霉素', '硝酸甘油片', '麝香痔疮栓', '亚甲蓝注射液', '高锰酸钾外用片', '龙珠软膏', '碳酸氢钠注射液', '大蜜丸'],
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
