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
        <div id="myChart" style="height: 400px"></div>

      </div>
      <div class="infobox">
        <div class="s-form">
          <el-form>
            <el-input v-model="queryData.hosName" placeholder="医院名称"></el-input>
            <el-select v-model="queryData.areaId" placeholder="区县名称" class="width-160">
              <el-option v-for="item in options.area" :key="item.ID" :label="item.NAME_CHN" :value="item.ID"></el-option>
            </el-select>
            <el-select v-model="queryData.hosLevel" placeholder="医院级别" class="width-120">
              <el-option v-for="item in options.level" :key="item.value" :label="item.name"
                         :value="item.value"></el-option>
            </el-select>
            <el-select v-model="queryData.hosKind" placeholder="医院性质" class="width-120">
              <el-option v-for="item in options.kind" :key="item.CODE" :label="item.NAME" :value="item.CODE"></el-option>
            </el-select>
            <el-select v-model="queryData.thisCatalogFilter" placeholder="本院目录筛选方式" class="width-180">
              <el-option v-for="item in operateOption" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
            <el-input v-model="queryData.thisCatalogNum" placeholder="本院目录"></el-input>
            <el-select v-model="queryData.selectSendFilter" placeholder="已选配送数量筛选方式" class="width-200">
              <el-option v-for="item in operateOption" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
            <el-input v-model="queryData.selectSendNum" placeholder="已选配送数量"></el-input>
            <el-select v-model="queryData.signContractFilter" placeholder="签订合同数量筛选方式" class="width-200">
              <el-option v-for="item in operateOption" :key="item.code" :label="item.name"
                         :value="item.code"></el-option>
            </el-select>
            <el-input v-model="queryData.signContractNum" placeholder="签订合同数量" class="width-120"></el-input>
            <el-button @click="metaList">查询</el-button>
            <el-button @click="downloadList">下载</el-button>
          </el-form>
        </div>
        <div class="tableset">
          <el-table :data="resData.list" stripe border tooltip-effect="dark">
            <el-table-column prop="hosName" label="医院名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="hosShortName" label="医院简称" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="hosLevel" label="医院级别" width="80"></el-table-column>
            <el-table-column prop="areaName" label="区县名称" width="80"></el-table-column>
            <el-table-column prop="hosKind" label="医院性质" :formatter="hisKindFormat"></el-table-column>
            <el-table-column prop="thisCatalogNum" label="本院目录" align="right" header-align="left" width="80"></el-table-column>
            <el-table-column prop="candidateCatalogNum" label="候选目录数量" align="right" header-align="left" width="100"></el-table-column>
            <el-table-column prop="bargainCatalogNum" label="议价目录数量" align="right" header-align="left" width="100"></el-table-column>
            <el-table-column prop="basicCatalogNum" label="基药选择数量" align="right" header-align="left" width="100"></el-table-column>
            <el-table-column prop="basicSelectRate" label="基药遴选占比" align="right" header-align="left" width="100"></el-table-column>
            <el-table-column prop="selectSendNum" label="已选配送数量" align="right" header-align="left" width="100"></el-table-column>
            <el-table-column prop="signContractNum" label="签订合同数量" align="right" header-align="left" width="100"></el-table-column>
            <el-table-column label="操作" width="80">
              <template slot-scope="scope">
                <div class="operates">
                  <a @click="showProductDetail(scope.row.hosId)">查看产品</a>
                </div>
              </template>
            </el-table-column>
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

    <product-detail ref="ProductDetail"></product-detail>
  </dl>
</template>

<script>

  import ProductDetail from './productDetail'

  import {
    findSelectHospitalInfo,
    findHospitalQueryCondition,
    downloadHospitalSelectInfo
  } from 'src/axios/supervise/select/select'

  import fileUpload from 'js-file-download'

  export default {
    components: {
      ProductDetail
    },
    name: "hospital",
    data() {
      return {
        chartType: 'thisCatalogNum',
        chartOption: [
          {name: '本院目录', code: 'thisCatalogNum'},
          {name: '候选目录数量', code: 'candidateCatalogNum'},
          {name: '议价目录数量', code: 'bargainCatalogNum'},
          {name: '基药选择数量', code: 'basicCatalogNum'},
          {name: '基药遴选占比', code: 'basicSelectRate'},
          {name: '已选配送数量', code: 'selectSendNum'},
          {name: '签订合同数量', code: 'signContractNum'}
        ],
        operateOption: [
          {name: '大于', code: '>'},
          {name: '小于', code: '<'},
          {name: '等于', code: '='},
          {name: '大于等于', code: '>='},
          {name: '小于等于', code: '<='}
        ],
        options: {
          area: [],
          level: [],
          kind: [],
        },
        resData: this.metaOrderDate(),
        queryData: {}
      }
    },
    created() {
    },
    methods: {
      hisKindFormat(row, column, cellValue) {
        return cellValue === '0' ? '公立' : '民营'
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex % 2 === 0) {
          return 'odd-row';
        } else {
          return 'even-row';
        }
      },
      drawBar() {
        let myChart = this.$echarts.init(document.getElementById('myChart'));
        let cataArr = [], dataArr = [];
        for (let selectInfo of this.resData.list) {
          cataArr.push(selectInfo.hosName);
          dataArr.push(selectInfo[this.chartType])
        }
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
          dataZoom: [
            {
              type: 'slider',
              show: true,
              xAxisIndex: [0],
              start: 0,
              end: 35
            }
          ],
          grid:{
            bottom:'25%'
          },
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
            name: '',

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
        findSelectHospitalInfo(this.resData, this.queryData).then(res => {
          this.resData = res.data;
          this.drawBar()
        });
      },
      downloadList() {
        downloadHospitalSelectInfo(this.resData, this.queryData).then(res => {
          let title = "";
          let headers = res.headers;
          if (!title) {
            const fileName = headers['content-disposition'];
            title = fileName.includes('filename=') ? decodeURI(fileName.split('=')[1]) : '下载的文件';
          }
          fileUpload(res.data, title, "application/vnd.ms-excel")
        });
      },
      metaCondition() {
        findHospitalQueryCondition().then(res => {
          this.options = res.data;
        });
      },
      metaOrderDate() {
        return {
          pageNum: 1,
          pageSize: 20,
          total: 0,
          pages: 0,
          list: []
        }
      },
      showProductDetail(id) {
        this.$nextTick(() => {
          this.$refs.ProductDetail.fillData(id)
        })
      },
    },
    watch: {},
    mounted() {
      this.$nextTick(function () {
        this.metaList();
        this.metaCondition()
      })
    }
  }
</script>
