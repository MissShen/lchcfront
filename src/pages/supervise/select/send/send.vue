<template>
  <dl class="mainbox">
    <dd>
      <!--图形显示区-->
      <div class="infobox">
        <div class="s-form">
          <form>
            <el-select v-model="chartType" placeholder="类型" @change="drawBar">
              <el-option v-for="item in chartOption" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </form>
        </div>
        <div id="sendChart" style="height: 400px"></div>
      </div>
      <div class="infobox">
        <div class="s-form">
          <form>
            <el-input v-model="queryData.orgName" placeholder="配送企业"></el-input>
            <el-button @click="metaList">查询</el-button>
            <el-button @click="downloadList">下载</el-button>
          </form>
        </div>
        <div class="tableset">
          <el-table :data="resData.list" stripe border tooltip-effect="dark">
            <el-table-column prop="orgName" label="配送企业" show-overflow-tooltip></el-table-column>
            <el-table-column prop="hosChooseNum" label="医院选择数量" align="right" header-align="left" width="120"></el-table-column>
            <el-table-column prop="hosContractNum" label="医院签订合同数量" align="right" header-align="left" width="120"></el-table-column>
            <el-table-column prop="factoryNum" label="生产企业数量" align="right" header-align="left" width="120"></el-table-column>
            <el-table-column prop="productSendNum" label="配送产品数量" align="right" header-align="left" width="120"></el-table-column>
          </el-table>
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
      </div>
    </dd>
  </dl>
</template>

<script>
  import {findSelectSendInfo,downloadSendSelectInfo} from 'src/axios/supervise/select/select'
  import fileUpload from 'js-file-download'

  export default {
    name: "send",
    data() {
      return {
        chartType: 'hosChooseNum',
        chartOption: [
          {name: '医院选择数量', code: 'hosChooseNum'},
          {name: '医院签订合同数量', code: 'hosContractNum'},
          {name: '生产企业数量', code: 'factoryNum'},
          {name: '配送产品数量', code: 'productSendNum'},
        ],
        resData: this.metaOrderDate(),
        queryData: {}
      }
    },
    created() {
    },
    methods: {
      drawBar() {
        let sendChart = this.$echarts.init(document.getElementById('sendChart'));
        let cataArr = [], dataArr = [];
        for (let selectInfo of this.resData.list) {
          cataArr.push(selectInfo.orgName);
          dataArr.push(selectInfo[this.chartType])
        }
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
                name: '配送遴选情况',
                textStyle: {color: '#0D8AFF'}
              }
            ]
          },
          textStyle: {
            fontSize: 16
          },
          grid:{
            bottom:'25%'
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
              interval:0,
              rotate:15,
              textStyle:{
                fontSize:9 // 让字体变大
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
              formatter: '{value} ',
            },
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            }
          }],
          series: [
            {
              name: '配送遴选情况',
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
        findSelectSendInfo(this.queryData.orgName).then(res => {
          this.resData = res.data;
          this.drawBar()
        });
      },
      downloadList() {
        downloadSendSelectInfo(this.queryData.orgName).then(res => {
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
        this.metaList();
      })
    }
  }
</script>
