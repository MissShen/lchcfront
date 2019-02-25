<template>
  <dl class="mainbox">
    <dd>
      <!--图形显示区-->
      <div class="infobox">
        <div id="productChart" style="height: 400px"></div>
      </div>
      <div class="infobox">
        <div class="s-form">
          <form>
            <el-input v-model="queryData.productName" placeholder="产品名称"></el-input>
            <el-input v-model="queryData.factory" placeholder="生产企业"></el-input>
            <el-button @click="metaList">查询</el-button>
            <el-button @click="downloadList">下载</el-button>
          </form>
        </div>
        <div class="tableset">
          <el-table :data="resData.list" stripe border tooltip-effect="dark">
            <el-table-column prop="fullName" label="产品名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="tradeName" label="商用名" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="doseage" label="剂型" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="spec" label="规格" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="standRate" label="转换比" width="80"></el-table-column>
            <el-table-column prop="specUnit" label="单位" width="60"></el-table-column>
            <el-table-column prop="wrapName" label="包材" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="manufactureName" label="生产企业" show-overflow-tooltip></el-table-column>
            <!--<el-table-column prop="sfhx" label="是否候选目录" width="120" show-overflow-tooltip></el-table-column>-->
            <el-table-column prop="catalogArea" label="所属目录" width="120" show-overflow-tooltip></el-table-column>
            <!--<el-table-column prop="minPrice" label="全国最低价"></el-table-column>-->
            <!--<el-table-column prop="qybj" label="企业报价"></el-table-column>-->
            <el-table-column prop="basicFlag" label="基药标记" width="80" :formatter="basicFlagFormat"></el-table-column>
            <el-table-column prop="chooseNum" label="医院选择数量" align="right" header-align="left" width="100"></el-table-column>
          </el-table>
        </div>
        <!-- 表格分页 -->
        <div class="pagebox">
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 30]"
            :total="resData.total"
            :page-size="resData.pageSize"
            :page-count="resData.pages"
            :current-page.sync="resData.pageNum">
          </el-pagination>
        </div>
      </div>
    </dd>
  </dl>
</template>

<script>
  import {findSelectProductInfo, downloadProductSelectInfo} from 'src/axios/supervise/select/select'

  import fileUpload from 'js-file-download'

  export default {
    name: "product",
    data() {
      return {
        resData: this.metaOrderDate(),
        queryData: {}
      }
    },
    created() {
    },
    methods: {
      basicFlagFormat(row, column, cellValue) {
        let desc;
        if (cellValue === '0') {
          desc = '国家基药'
        } else if (cellValue === '1') {
          desc = '北京增补'
        }
        return desc
      },
      drawBar() {
        let productChart = this.$echarts.init(document.getElementById('productChart'));
        let cataArr = [], dataArr = [];
        for (let selectInfo of this.resData.list) {
          cataArr.push(selectInfo.fullName);
          dataArr.push(selectInfo.chooseNum)
        }
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
          grid:{
            bottom:'25%'
          },
          textStyle: {
            fontSize: 16
          },
          dataZoom: [
            {
              type: 'slider',
              show: true,
              xAxisIndex: [0],
              start: 0,
              end: 35
            }
          ],
          xAxis: [{
            type: 'category',
            data: cataArr,
            axisLine: {
              lineStyle: {
                color: '#FFFFFF'
              }
            },
            axisPointer: {
              type: 'shadow'
            },
            axisLabel: {
              interval: 0,
              rotate: 15,
              textStyle:{
                fontSize:10 // 让字体变大
              }
            }
          }],
          yAxis: [{
            type: 'value',
            name: '个',
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
              data: dataArr,
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
        findSelectProductInfo(this.resData, this.queryData).then(res => {
          this.resData = res.data;
          this.drawBar()
        });
      },
      downloadList() {
        downloadProductSelectInfo(this.resData, this.queryData).then(res => {
          let title = "";
          let headers = res.headers;
          if (!title) {
            const fileName = headers['content-disposition'];
            title = fileName.includes('filename=') ? decodeURI(fileName.split('=')[1]) : '下载的文件';
          }
          fileUpload(res.data, title, "application/vnd.ms-excel")
        });
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
        this.metaList()
      })
    }
  }
</script>

<style scoped>

</style>
