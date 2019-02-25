<template>
  <div class="mainbox">
    <ul>
      <li class="main-left">
        <div class="chart-title">
          北京市区域数据分布图<a href="javascript:" class="chart-title-right el-icon-location" @click="resetMap">北京</a>
        </div>
        <div class="chart-form">
          <form name="chartForm" ref="chartForm">
          <span class="radio-group">
            <label for="year" class="s-radios" :class="{active: chartForm.pickTime === 'year'}">
              <input type="radio" id="year" value="year" v-model="chartForm.pickTime" @click="findDifTimeUnitData"/>
              年</label>
            <label for="season" class="s-radios" :class="{active: chartForm.pickTime === 'season'}">
              <input type="radio" id="season" value="season" v-model="chartForm.pickTime" @click="findDifTimeUnitData"/>
              季</label>
            <label for="month" class="s-radios" :class="{active: chartForm.pickTime === 'month'}">
              <input type="radio" id="month" value="month" v-model="chartForm.pickTime" @click="findDifTimeUnitData"/>
              月</label>
          </span>
            <span class="ipt-txt">
            <el-date-picker :type="chartForm.pickTime==='season'?'year':chartForm.pickTime"
                            placeholder="选择日期"
                            v-model="chartForm.packDate"  @change="getGeneralizeInfo"></el-date-picker>
              <!--<input type="text">-->
          </span>
          <span class="s-select">
            <el-select v-model="chartForm.selectedSeason" placeholder="" v-if="chartForm.pickTime === 'season'"
                       @change="getGeneralizeInfo">
              <el-option label="第一季度" value="1"></el-option>
              <el-option label="第二季度" value="2"></el-option>
              <el-option label="第三季度" value="3"></el-option>
              <el-option label="第四季度" value="4"></el-option>
            </el-select>
          </span>
          </form>
        </div>
        <div id="chinaMap" class="chart-box" style="height: 600px">
        </div>
      </li>

      <li class="main-right">
        <dl class="infobox">
          <dt><div><span v-if="this.dateYear!=''">{{this.dateYear}}年</span>
                    <span v-if="this.dateArea!=''">{{this.dateArea}}</span>
                    <span v-if="this.chartForm.pickTime=='season'">第{{this.dateProvince}}季度</span>
                    <span v-if="this.chartForm.pickTime=='month'">{{this.dateMonth}}月份</span>
                交易额情况统计</div></dt>
          <dd>
            <div class="statistic-list"><span class="statistic-list-left">总采购金额（万元）</span>
              <span class="statistic-list-right">{{ priceFormat(this.resData.transactionMoney.totalPurchaseMoney)}}</span></div>
            <div class="statistic-list"><span class="statistic-list-left">总到货金额（万元）</span>
              <span class="statistic-list-right">{{ priceFormat(this.resData.transactionMoney.totalReceiptMoney)}}</span></div>
            <div class="statistic-list"><span class="statistic-list-left">总采购数量</span>
              <span class="statistic-list-right">{{this.resData.transactionMoney.totalPurchaseCount}}</span></div>
            <div class="statistic-list"><span class="statistic-list-left">总到货数量</span>
              <span class="statistic-list-right">{{this.resData.transactionMoney.totalReceiptCount}}</span></div>
          </dd>
        </dl>

        <dl class="infobox">
          <dt>
            <span v-if="this.dateYear!=''">{{this.dateYear}}年</span>
            <span v-if="this.dateArea!=''">{{this.dateArea}}</span> 全年交易额变化趋势</dt>
          <dd>
            <div id="main" style="height:200px"></div>
          </dd>
        </dl>
        <dl class="infobox">
          <dt><div>
            <span v-if="this.dateYear!=''">{{this.dateYear}}年</span>
            <span v-if="this.dateArea!=''">{{this.dateArea}}</span>
            <span v-if="this.chartForm.pickTime=='season'">第{{this.dateProvince}}季度</span>
            <span v-if="this.chartForm.pickTime=='month'">{{this.dateMonth}}月份</span>
            交易占比统计</div></dt>
          <dd>
            <div id="myChart"  class="clear chart-pie-box">
              <div class="flo-left chart-pie w33-3">
                <div id="pieDiagram"></div>
              </div>
              <div class="flo-left  chart-pie w33-3">
                <div id="pieDiagram1" ></div>
              </div>
              <div  class="flo-left  chart-pie w33-3">
                <div id="pieDiagram2"></div>
              </div>
            </div>
          </dd>
        </dl>
      </li>
    </ul>

    <div class="infobox">
      <div class="s-title">
        <span v-if="this.dateYear!=''">{{this.dateYear}}年</span>
        <span v-if="this.dateArea!=''">{{this.dateArea}}</span>
        <span v-if="this.chartForm.pickTime=='season'">第{{this.dateProvince}}季度</span>
        <span v-if="this.chartForm.pickTime=='month'">{{this.dateMonth}}月份</span>
        全部采购情况</div>
      <div class="tableset">
        <el-table :data="resOrderDate.list" stripe>
          <el-table-column label="区县名称">
            <template slot-scope="scope">
              <span>{{ scope.row.areaName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="采购金额(万元)" align="right" header-align="left">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.requestPrice)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="采购数量" align="right" header-align="left">
            <template slot-scope="scope">
              <span>{{ scope.row.requestNum }}</span>
            </template>
          </el-table-column>
          <el-table-column label="到货金额(万元)" align="right" header-align="left">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.receivePrice)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="到货数量" align="right" header-align="left">
            <template slot-scope="scope">
              <span>{{ scope.row.receiveNum }}</span>
            </template>
          </el-table-column>
          <el-table-column  label="到货率(%)" align="right" header-align="left">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.receiveRate)}}%</span>
            </template>
          </el-table-column>
          <el-table-column  prop="" label="操作" width="160">
            <template slot-scope="scope">
              <!--<a href="javascript:" class="iconfont icon-peisong2"></a> &nbsp;&nbsp;
              <a href="javascript:" class="iconfont icon-fenlei1"></a>-->
              <div class="operates">
                <a href="javascript:" @click="selectProduct(scope.row.factoryId)">查看配送</a>
                <a href="javascript:" @click="selectHospital(scope.row.factoryId)">查看产品</a>
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
  import {transactionCount,transactionOrderList,queryTransactionCount} from "src/axios/supervise/supervise-transaction/supervision";
  import {
    cityMap,
    provinces,
    special,
    queryMapData,
    getJsonData,
    getFirstDateOfYear
  } from "src/axios/supervise/supervise-generalize/superviseGeneralize";
  import echarts from 'echarts'
  import 'echarts/map/js/china.js'
  import {priceFormat} from "src/utils/index"
  export default {
    name: "transation",
    data(){
      return {
        dateYear:'2017',     //2017年-第几季度-4月份
        dateProvince:'',
        dateMonth:'',
        dateAddress:'北京',//省
        dateArea:'',    //区域城市
        chartForm:{
          pickTime: 'year',
          selectedSeason: this.getSeason(),
          packDate: getFirstDateOfYear()
        },
        mapResData: [],//响应地图数据
        queryName: 'china',
        queryData: {
          queryId: 'FR20T0000011000000050066',
          queryUnit: 'province',//city
          queryStartDate:'',
          queryEndDate:'',

        },//查询数据
        resData: this.metaData(),
        resDatas:this.metaDatas(),
        resOrderDate:this.metaOrderDate(),
        purchaseMoney:[],
        receiptMoney:[],
        transactionMonth:[],
        charts: '', // 初始化图表
        myEcharts:'',
        opinionData: [  // 初始化图表数据
          {name:'北京', selected:true}
        ],
        roleForm: 'medical',
        dataList: [],
        newsList: [
          /*{
            newsTitle: '采购品种采购品种采购品种采购品种采购品种采购品种采购品种',
            newsTime: '2018-04-10'
          }*/
        ],
        chart: null
      }
    },
    methods: {
      priceFormat,
      metaList() {
        var date = new Date(this.chartForm.packDate);
        var monthYear=date.getMonth() + 1;
        if(monthYear<=9){
          monthYear="0"+monthYear;
        }
          this.dateYear=date.getFullYear();
          this.dateProvince=this.chartForm.selectedSeason;
          this.dateMonth=date.getMonth()+1;
         this.queryData.queryDate = date.getFullYear()+"-"+monthYear;
         if(this.chartForm.pickTime=='year' || this.chartForm.pickTime=='season'){
           this.queryData.queryDate=date.getFullYear();
         }
         this.queryData.queryDateUnit = this.chartForm.pickTime;
         this.queryData.queryQuarter = this.chartForm.selectedSeason;
         /*统计订单明细列表*/
         this.getOrderInfo();
        /*交易额统计情况*/
        transactionCount(this.resData, this.queryData).then(res => {
          if(res.data.transactionMoney ===null){
            this.resData=this.metaData()
          }else{
            this.resData = res.data;
          }
          this.initRate();
          this.initRate2();
          this.initRate3();
        });
        //交易额变化趋势图
        queryTransactionCount(this.resDatas, this.queryData).then(res => {
          this.resDatas = res.data;
          this.purchaseMoney=[];
          this.receiptMoney=[];
          this.transactionMonth=[];
          for(let i of this.resDatas.changeRate){
            this.purchaseMoney.push(i.purchaseMoney);
            this.receiptMoney.push(i.receiptMoney);
            this.transactionMonth.push(i.transactionMonth);
          }
          this.drawGraph('main');
        });
      },
      getOrderInfo(){
        transactionOrderList(this.resOrderDate, this.queryData).then(res => {
          this.resOrderDate=res.data;
          0 === this.resOrderDate.pageNum ? this.resOrderDate.pageNum = 1 : null;
        })
      },
      metaOrderDate(){
        return {
          pageNum: 1,
          pageSize: 20,
          total: 0,
          pages: 0,
          list: []
        }
      },
      handleSizeChange(val) {
        this.resOrderDate.pageSize = val;
        this.getOrderInfo();
      },
      handleCurrentChange(val) {
        this.resOrderDate.pageNum = val;
        this.getOrderInfo();
      },
      metaData() { // 前后台交互数据封装格式
        return {
          transactionMoney:{
            totalPurchaseCount:0,
            totalPurchaseMoney:0,
            totalReceiptCount:0,
            totalReceiptMoney:0,
            receivePriceRate:0,
            orderNumber:0,
            returnOrderNumber:0,
            returnRate:0,
            basicMedicantRate:0,
            medicantCount:0,
            basicMedicant:0
          }
        }
      },
      metaDatas(){
        return {
          changeRate: [
            {
              purchaseMoney: 0,
              receiptMoney: 0,
              transactionMonth: ""
            }
          ]
        }
      },
      getSeason(){
        let _m = new Date().getMonth();
        if(_m < 3){
          return '1';
        }else if(_m < 6){
          return '2';
        }else if(_m < 9){
          return '3';
        }else{
          return '4';
        }
      },
      dataStyle(idx){
        var arrClass = ['s-lightblue', 's-lightyellow', 's-lightred'];
        return arrClass[idx];
      },
      //初始交易占比图
      initRate(){
        var myCharts = echarts.init(document.getElementById('pieDiagram'));
        // 指定图表的配置项和数据
        var option = {
          tooltip: {
            trigger: 'item',
            show:false,
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            selectedMode:false,
            x: 'left'
          },
          color:['#1b447c', '#2e82dc'],
          graphic:{
            type:'text',
            left:'center',
            top:'center',
            style:{
              text:this.resData.transactionMoney.basicMedicantRate+'%\n 基药订购占比',
              textAlign:'center',
              fill:'#fff',
              width:30,
              height:30
            }
          },
          series: [
            {
              name:'',
              type:'pie',
              radius: ['80%', '100%'],
              hoverAnimation:false,
              label: {
                normal: {
                  show: true,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '40',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: true
                }
              },
              data:[
                {value:this.resData.transactionMoney.medicantCount-this.resData.transactionMoney.basicMedicant, name:''},
                {value:this.resData.transactionMoney.basicMedicant, name:''}
              ]
            }
          ]
        };
        myCharts.setOption(option);

      },
      initRate2(){
        var myCharts1 = echarts.init(document.getElementById('pieDiagram1'));
        // 指定图表的配置项和数据
        //alert(this.resData.transactionMoney.totalPurchaseCount+"==="+this.resData.transactionMoney.totalReceiptCount)
        var option = {
          tooltip: {
            trigger: 'item',
            show:false,
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            selectedMode:false,
            x: 'left'
          },
          color:['#1b447c', '#1aab98']  ,
          graphic:{
            type:'text',
            left:'center',
            top:'center',
            style:{
              text: this.resData.transactionMoney.receivePriceRate+' %\n 到货率',
              textAlign:'center',
              fill:'#fff',
              width:30,
              height:30
            }
          },
          series: [
            {
              name:'',
              type:'pie',
              radius: ['80%', '100%'],
              hoverAnimation:false,
              label: {
                normal: {
                  show: true,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '40',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: true
                }
              },
              data:[
                {value:this.resData.transactionMoney.totalPurchaseCount-this.resData.transactionMoney.totalReceiptCount, name:''},//
                {value:this.resData.transactionMoney.totalPurchaseCount, name:''}//
              ]
            }
          ]
        };
        myCharts1.setOption(option);

      },
      initRate3(){
        var myCharts2 = echarts.init(document.getElementById('pieDiagram2'));
        // 指定图表的配置项和数据
        var option = {
          tooltip: {
            trigger: 'item',
            show:false,
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            selectedMode:false,
            x: 'left'
          },
          color:['#1b447c', '#f34a68']  ,
          graphic:{
            type:'text',
            left:'center',
            top:'center',
            style:{
              text: this.resData.transactionMoney.returnRate+'%\n 退货率',
              textAlign:'center',
              fill:'#fff',
              width:30,
              height:30
            }
          },
          series: [
            {
              name:'',
              type:'pie',
              radius: ['80%', '100%'],
              hoverAnimation:false,
              label: {
                normal: {
                  show: true,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '40',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: true
                }
              },
              data:[
                {value:this.resData.transactionMoney.orderNumber-this.resData.transactionMoney.returnOrderNumber, name:''},
                {value:this.resData.transactionMoney.returnOrderNumber, name:''}
              ]
            }
          ]
        };
        myCharts2.setOption(option);
      },
      // 地图初始化
      drawMap(chart, data, map) {
        chart.setOption({
          backgroundColor: 'rgba(0,0,0,0)',
          dataRange: {
            min: 5000000,
            max: 5000000000,
            realtime: true,
            calculable: true,
            textStyle: {
              color: '#fff'
            },
            color: ['#006edd', '#e0ffff']
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b}'
          },
          animationDuration: 1000,
          animationEasing: 'cubicOut',
          animationDurationUpdate: 1000,
          series: [
            {
              name: map,
              type: 'map',
              mapType: map,
              selectedMode: 'single', //选中模式，可以设置多选模式和单选，不能选择则删除删除属性
              roam: true,
              nameMap: {
                'china': '中国'
              },
              label: {
                normal: {
                  show: true,
                  textStyle: {
                    color: '#131616',
                    fontSize: 13
                  }
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    color: '#fff',
                    fontSize: 13
                  }
                }
              },
              data: data
            }
          ]
        })
      },
      //地图点击事件
      chartClick(params) {

        this.queryName = params.name;
        this.dateArea=this.queryName;
        if (params.name in provinces) {
          //如果点击的是34个省、市、自治区，绘制选中地区的二级地图
          getJsonData('static/map/province/' + provinces[params.name] + '.json').then(res => {
            let data = res;
            this.$echarts.registerMap(params.name, data);
            //查询地图数据
            queryMapData(this.queryData).then(res2 => {
              let d = [];
              for (let i of res.features) {
                let flag = false;
                for (let j of res2.data) {
                  if (j.NAME && j.NAME.replace(/省/, '') === i.properties.name) {
                    flag = true;
                    d.push({
                      name: i.properties.name,
                      value: j.VALUE
                    });
                    break
                  }
                }
                if (!flag) {
                  d.push({
                    name: i.properties.name,
                  })
                }
              }
              this.$options.methods.drawMap(this.charts, d, params.name);
              this.mapResData = res2.data;
            })
          });
        } else if (params.seriesName in provinces) {
          this.queryData.queryUnit='city';
          //如果是【直辖市/特别行政区】只有二级下钻
          if (special.indexOf(params.seriesName) >= 0) {
            let areaHaveFlag = false;
            for (let i of this.mapResData) {
              if (i.NAME && i.NAME === params.name) {
                this.queryData.queryId = i.ID;
                areaHaveFlag = true;
                break
              }
            }
            if (!areaHaveFlag) {
              this.queryData.queryId = ''
            }
          } else {
            let cityHaveFlag = false;
            for (let i of this.mapResData) {
                if (i.NAME && i.NAME === params.name) {
                  this.queryData.queryId = i.ID;
                  cityHaveFlag = true;
                  break
                }
            }
            this.queryData.queryUnit = 'city';
            if (!cityHaveFlag) {
              this.queryData.queryId = ''
            }
            //显示县级地图
            getJsonData('static/map/city/' + cityMap[params.name] + '.json').then(res => {
              let data = res;
              this.$echarts.registerMap(params.name, data);
              //查询地图数据
              queryMapData(this.queryData).then(res2 => {
                let d = [];
                for (let i of res.features) {
                  let flag = false;
                  for (let j of res2.data) {
                    if (j.NAME && j.NAME.replace(/省/, '') === i.properties.name) {
                      flag = true;
                      d.push({
                        name: i.properties.name,
                        value: j.VALUE
                      });
                      break
                    }
                  }
                  if (!flag) {
                    d.push({
                      name: i.properties.name,
                    })
                  }
                }
                this.$options.methods.drawMap(this.charts, d, params.name);
                this.mapResData = res2.data;
              })
            });
          }
        } else {
          let areaHaveFlag = false;
          for (let i of this.mapResData) {
            if (i.NAME && i.NAME === params.name) {
              this.queryData.queryId = i.ID;
              areaHaveFlag = true;
              break
            }
          }
          this.queryData.queryUnit = 'area';
          if (!areaHaveFlag) {
            this.queryData.queryId = '';
          }
        }
        this.metaList();
      },
      drawGraph(id) {
        // 绘图方法
        this.chart = echarts.init(document.getElementById(id));
        // 返回到data中
        var that = this;
        this.chart.setOption({
          tooltip : {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                //backgroundColor: '#fff'
              }
            }
          },
          legend: {
            data: [
              {
                name: '交易金额',
                textStyle: {color: '#bce672'}
              },{
                name: '到货金额',
                textStyle: {color: '#2edfa3'}
              }
            ]
          },
          toolbox: {
            show:false,
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              axisLabel: {
                textStyle: {
                  color: '#fff'
                }
              },
              axisLine:{
                lineStyle:{
                 //color:'#fff',
                  width:1,//这里是为了突出显示加上的
                }
              },
              boundaryGap : false,
             //data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
              data:this.transactionMonth
            }
          ],
          yAxis : [
            {
              type : 'value',
              axisLabel: {
                textStyle: {
                  color: '#fff'
                }
              },
              axisLine:{
                lineStyle:{
                  //color:'#fff',
                  width:1,//这里是为了突出显示加上的
                }
              },
              splitLine: {
                lineStyle: {
                  type: 'dashed'
                }
              }
            }
          ],

          series : [
            {
              name:'交易金额',
              type:'line',
              zoom:1.2,
              color: '#bce672',
              areaStyle: {normal: {}},
              data: this.purchaseMoney
            },
            {
              name:'到货金额',
              type:'line',
              stack: '总量',
              color: '#2edfa3',
              areaStyle: {normal: {}},
              data:  this.receiptMoney
            }
          ]
        })
      },
      //获取地图数据
      findMapData() {
        this.charts = this.$echarts.init(document.getElementById('chinaMap'));
        this.chartClick({name: special[0], seriesName: special[0]});
        this.charts.on('click', this.chartClick);

      },
      getGeneralizeInfo(e) {
        this.queryData.date = this.chartForm.packDate;
        var dateStr=new Date(this.queryData.date);
        this.queryData.dateUnit = this.chartForm.pickTime;
        this.queryData.selectedSeason = this.chartForm.selectedSeason;
        if(this.queryData.dateUnit=='season'){
          if(this.queryData.selectedSeason=='1'){
            this.queryData.queryStartDate=dateStr.getFullYear()+'-01-01 00:00:00';
            this.queryData.queryEndDate=dateStr.getFullYear()+'-03-31 23:59:59';
            /*console.log(this.queryData.queryStartDate+"==="+this.queryData.queryEndDate);*/
          }else if(this.queryData.selectedSeason=='2'){
            this.queryData.queryStartDate=dateStr.getFullYear()+'-04-01 00:00:00';
            this.queryData.queryEndDate=dateStr.getFullYear()+'-06-30 23:59:59';
            /*console.log(this.queryData.queryStartDate+"==="+this.queryData.queryEndDate);*/
          }else if(this.queryData.selectedSeason=='3'){
            this.queryData.queryStartDate=dateStr.getFullYear()+'-07-01 00:00:00';
            this.queryData.queryEndDate=dateStr.getFullYear()+'-09-30 23:59:59';
            /*console.log(this.queryData.queryStartDate+"==="+this.queryData.queryEndDate);*/
          }else if(this.queryData.selectedSeason=='4'){
            this.queryData.queryStartDate=dateStr.getFullYear()+'-10-01 00:00:00';
            this.queryData.queryEndDate=dateStr.getFullYear()+'-12-31 23:59:59';
            /*console.log(this.queryData.queryStartDate+"==="+this.queryData.queryEndDate);*/
          }
        }else if(this.queryData.dateUnit=='year'){
            this.queryData.queryStartDate=dateStr.getFullYear()+'-01-01 00:00:00';
            this.queryData.queryEndDate=dateStr.getFullYear()+'-12-31 23:59:59';
        }else if(this.queryData.dateUnit=='month'){
          let monthStart=dateStr.getMonth()+1;
          let monthEnd=dateStr.getMonth()+2;
          if(monthEnd<10){
            monthEnd='0'+monthEnd;
          }
          if(monthStart<10){
            monthStart='0'+monthStart;
          }
          this.queryData.queryStartDate=dateStr.getFullYear()+'-'+monthStart+'-01 00:00:00';
          this.queryData.queryEndDate=dateStr.getFullYear()+'-'+monthEnd+'-01 00:00:00';
          console.log(this.queryData.queryStartDate+"=month=="+this.queryData.queryEndDate);
        }
        this.findMapData();


      },
      //还原地图
      resetMap() {
        this.queryData.queryId = 'FR20T0000011000000050066';
        this.queryData.queryUnit = 'province';
        this.queryName = 'china';
        this.getGeneralizeInfo();
      },
      findDifTimeUnitData(e) {
        if (e) {
          this.chartForm.pickTime = e.target.defaultValue;
        }
        this.getGeneralizeInfo();
      },
    },
    watch: {
      'roleForm': 'getDataList'
    },
    mounted(){
      this.$nextTick(function() {
        //this.drawPie('myChart');
        this.getGeneralizeInfo();
      })
    }
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
