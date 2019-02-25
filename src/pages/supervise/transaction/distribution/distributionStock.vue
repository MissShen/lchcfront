<template>
  <div>
    <div class="infobox">
      <div id="myChart" style="height: 400px"></div>
    </div>
    <div class="infobox">
      <div class="s-form">
        <el-form ref="queryData" :model="queryData">
          <el-input v-model="queryData.searchNameChn" placeholder="产品名称"></el-input>
          <el-input v-model="queryData.searchManufactureName" placeholder="生产企业"></el-input>
          <el-input v-model="queryData.searchSendName" placeholder="配送企业"></el-input>
          <el-select v-model="queryData.searchCatalogArea" placeholder="目录范围">
            <el-option v-for="(catalogArea,index) in catalogAreaList"
                       :key="index"
                       :label="catalogArea"
                       :value="catalogArea">
            </el-option>
          </el-select>
          <el-select v-model="queryData.searchSenderStockState" placeholder="维护状态">
            <el-option value="" label="--ALL--"></el-option>
            <el-option value="2" label="缺货"></el-option>
            <el-option value="3" label="断货"></el-option>
          </el-select>
          <span class="date-group">
            <el-date-picker
              size="small"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="维护时间"
              :editable="false"
              v-model="queryData.searchModifyDate">
            </el-date-picker>
          </span>
          <el-button size="small" @click="handleQuery">查询</el-button>
          <el-button size="small" @click="queryData = metaQuery()"> 重置</el-button>
        </el-form>
      </div>
      <div class="tableset">
        <el-table :data="resData.list" stripe border tooltip-effect="dark">
          <el-table-column prop="nameChn" label="产品名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="tradeName" label="商品名" width="70" show-overflow-tooltip></el-table-column>
          <el-table-column prop="spec" label="规格" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="doseageFormName" label="剂型" show-overflow-tooltip></el-table-column>
          <el-table-column prop="manufactureName" label="生产企业" width="80" show-overflow-tooltip></el-table-column>
          <el-table-column prop="sumScore" label="客观分" width="70" show-overflow-tooltip></el-table-column>
          <el-table-column prop="minPrice" label="全国最低价" width="90" align="right" header-align="left"></el-table-column>
          <el-table-column prop="bidPrice" label="企业报价" width="70" align="right" header-align="left"></el-table-column>
          <el-table-column prop="catalogArea" label="目录范围" show-overflow-tooltip></el-table-column>
          <el-table-column prop="isCatelogArea" label="候选目录" width="70" show-overflow-tooltip></el-table-column>
          <el-table-column prop="senderStockState" label="库存状态" width="70"></el-table-column>
          <el-table-column prop="sendName" label="配送企业" show-overflow-tooltip></el-table-column>
          <el-table-column prop="requestQty" label="订购数量" width="70" align="right" header-align="left"></el-table-column>
          <el-table-column prop="receiveQty" label="到货数量" width="70" align="right" header-align="left"></el-table-column>
          <el-table-column prop="receiveDate" label="到货时间" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="90">
            <template slot-scope="scope">
              <div class="operates">
                <a href="javascript:" @click="handleSenderProduct(scope.row.productId)">查看配送</a>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <page-bar :data="resData" @refreshPage="refreshPage"></page-bar>
    </div>
    <distribution-sender v-if="senderVisible" ref="distributionSender"></distribution-sender>
  </div>
</template>


<script>

  import {querySenderStockList, queryCatalogAreaList} from "src/axios/supervise/supervise-transaction/supervision";
  import {PageData} from "src/components/mixins/index";
  import DistributionSender from './distributionSender'

  export default {
    name: 'sender-stock',
    mixins: [PageData],
    components: {DistributionSender},
    created() {
      this.metaList();
    },
    data() {
      return {
        queryData: this.metaQuery(), // 查询初始化
        senderVisible: false,
        productId: '',
        catalogAreaList: [],
        X_Data: [],
        y_senderStockState: [],
        y_minPrice: [],
        y_bidPrice: [],
        y_nameChn: [],
      }
    },
    methods: {
      metaData() {
        return {
          pageNum: 1,
          pageSize: 10,
          total: 5,
          pages: 1,
          list: []
        }
      },
      metaQuery() {
        return {
          searchNameChn: '',
          searchManufactureName: '',
          searchSendName: '',
          searchCatalogArea: '',
          searchSenderStockState: '',
          searchModifyDate: ''
        }
      },
      metaList() {
        querySenderStockList(this.resData.pageNum, this.resData.pageSize, this.queryData).then(res => {
          this.resData = res.data;
          0 === this.resData.pageNum ? this.resData.pageNum = 1 : null;
          this.X_Data = res.data.list.map(item => {
            return item.nameChn + '-' + item.sendName;
          });
          this.y_senderStockState = res.data.list.map(item => {
            if (item.senderStockState == '缺货') {
              return 1;
            }
            if (item.senderStockState == '断货') {
              return 2;
            }
          });
        }).then(() => {
          queryCatalogAreaList().then(res => {
            if (res.code == 200) {
              this.catalogAreaList = res.data
            }
          });
          this.draw();
        })
      },
      handleSenderProduct(productId) {
        this.senderVisible = true;
        this.$nextTick(() => {
          this.$refs.distributionSender.fillData(productId);
        });
      },
      getZoomSize() {
        let dataNum = this.resData.list.length;
        if (dataNum <= 10) {
          return 100;
        }
        if (dataNum > 10 && dataNum <= 20) {
          return Math.round(1 / 2 * 100);
        }
        if (dataNum > 20 && dataNum <= 30) {
          return Math.round(1 / 3 * 100);
        }
        return 50;
      },
      draw() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'));
        // 绘制图表
        myChart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
              crossStyle: {
                color: '#999'
              }
            },
            formatter: '{b}'
          },
          grid: {
            left: '20%',
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
          // legend: {
          //   data: ['库存状态'],
          //   textStyle: {color: '#7ACAFF'}
          // },
          yAxis: [
            {
              type: 'category',
              name: '配送企业',
              data: this.X_Data,
              axisPointer: {
                type: 'shadow'
              },
              axisLabel: {
                textStyle: {
                  color: '#fff'
                },
                formatter: function (value, index) {
                  return value.substr(value.indexOf('-') + 1, value.length);
                }
              },
              axisLine: {
                lineStyle: {
                  color: '#fff',
                  width: 1,//这里是为了突出显示加上的
                }
              },
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          xAxis: [
            {
              type: 'value',
              name: '库存状态',
              color: '#fff',
              interval: 1,
              axisLabel: {
                formatter: function (value) {
                  if (value == 0) {
                    return ''
                  }
                  if (value == 1) {
                    return '缺货'
                  }
                  if (value == 2) {
                    return '断货'
                  }

                },
                textStyle: {
                  color: '#fff'
                }
              },
              axisLine: {
                lineStyle: {
                  color: '#fff',
                  width: 1,//这里是为了突出显示加上的
                }
              },
              splitLine: {
                lineStyle: {
                  // 使用深浅的间隔色
                  color: ['#aaa', '#ddd']
                }
              }
            }
          ],
          dataZoom: [
            {
              type: 'slider',
              show: true,
              yAxisIndex: [0],
              start: 1,
              end: this.getZoomSize()
            },
          ],
          series: [
            {
              name: '缺货',
              type: 'bar',
              data: this.y_senderStockState,
              color: '#0D8AFF',
              label: {
                show: true,
                formatter: function (params) {
                  let index = params.name.indexOf('-');
                  return params.name.substr(0, index);
                },
              },
              itemStyle: {
                normal: {
                  color: function (params) {
                    if (params.data == 1) {
                      return '#b59a10'
                    }
                    if (params.data == 2) {
                      return '#f34a68'
                    }
                  },
                },
              }
            }
          ]
        });
      }
    }
  }
</script>
