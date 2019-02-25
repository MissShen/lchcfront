<template>
  <div class="mainbox">
    <div class="s-title large">
      <form name="chartForm" ref="chartForm">
        <span class="gap-20">北京市顺义区中医医院订购情况概况</span>
        <span class="chart-form">
          <span class="radio-group">
            <label for="year" class="s-radios" :class="{active: chartForm.pickTime === 'year'}">
              <input type="radio" id="year" value="year" v-model="chartForm.pickTime" @click="findDifTimeUnitData"/>
              年</label>
            <label for="month" class="s-radios" :class="{active: chartForm.pickTime === 'month'}">
              <input type="radio" id="month" value="month" v-model="chartForm.pickTime" @click="findDifTimeUnitData"/>
              月</label>
          </span>
          <span class="ipt-txt">
            <el-date-picker :type="chartForm.pickTime==='season'?'year':chartForm.pickTime"
                            placeholder="选择日期" v-model="chartForm.packDate" @change="getMouted('0')"></el-date-picker>
          </span>
        </span>
      </form>
    </div>
    <ul>
      <!--=========================================左======================================-->
      <li>
        <div class="s-form">
          <span class="s-form-title blocked">2018年 07 月 订购情况统计</span>
        </div>
        <div class="survey-board">
          <ol>
            <li>
              <span>订购金额(元)</span>
              <p >12921363.72</p>
            </li>
          </ol>
          <ol>
            <li>
              <span>到货金额(元)</span>
              <p >7884222.97</p>
            </li>
          </ol>
          <ol>
            <li>
              <span>临采金额(元)</span>
              <p >157206</p>
            </li>
          </ol>
          <ol>
            <li>
              <span>备案金额(元)</span>
              <p >8191.94</p>
            </li>
          </ol>
          <ol>
            <li>
              <span>到货率</span>
              <p >89.96 %</p>
            </li>
          </ol>
          <ol>
            <li>
              <span>
                市同级平均到货率
              </span>
              <p >79.82 %</p>
            </li>
          </ol>
          <ol>
            <li>
              <span>
                区同级平均到货率
              </span>
              <p >93.74 %</p>
            </li>
          </ol>
          <ol>
            <li>
              <span>基药订购占比</span>
              <p >53 %</p>
            </li>
          </ol>
        </div>
      </li>

      <!--==========================================中=======================================-->
      <li class="w60 main-center">
        <div class="s-form">
          <div class="s-form-title blocked">2周到货率</div>
          <span class="s-form-right">
            <el-date-picker type="year" placeholder="选择日期" v-model="chartForm.packDate" @change="getMouted('0')">
            </el-date-picker>
          </span>
        </div>
        <div id="bar" style="width: 100%;height:250px;"></div>

        <div class="s-form">
          <div class="s-form-title blocked">每月基药订购占比</div>
          <span class="s-form-right">
            <el-date-picker type="year" placeholder="选择日期" v-model="chartForm.packDate" @change="getMouted('0')">
            </el-date-picker>
          </span>
        </div>
        <div id="areaBasic" style="width:100%; height: 300px;"></div>

        <div class="s-form">
          <span class="s-form-title blocked">近12月，每月日均订购情况</span>
        </div>
        <div id="box" style="height:300px;width:100%;"></div>
      </li>

      <!--==========================================右=======================================-->
      <li class="w25">
        <div class="s-form">
          <div class="s-form-title blocked">产品订购金额 TOP-10</div>
          <span class="s-form-right">
            <el-date-picker type="year" placeholder="选择日期" v-model="chartForm.packDate" @change="getMouted('0')">
            </el-date-picker>
          </span>
        </div>
        <div id="senderRate" style="height: 420px;"></div>

        <div class="space-20"></div>

        <div class="s-form">
          <div class="s-form-title blocked">基药订购金额 TOP-10
          </div>
          <span class="s-form-right">
            <el-date-picker type="year"
                            placeholder="选择日期" v-model="chartForm.packDate" @change="getMouted('0')">
            </el-date-picker>
          </span>
        </div>
        <div id="baseDrug" style="height: 420px;"></div>
      </li>
    </ul>

    <div class="space-20"></div>
  </div>
</template>

<script>
  import { getFirstDateOfYear2 } from "src/axios/supervise/supervise-generalize/superviseGeneralize";
  // 引入基本模板
  let echarts = require('echarts/lib/echarts');
  export default {
    name: "",
    data(){
      return {
        timeLineIndex:0,
        value:'',
        spec:[{'type':'5g×16袋/盒','name':'益母草颗粒(无糖型)','value':'8000','factoryName':'江苏飞马药业有限公司'},
          {'type':'0.1g×24片/瓶','name':'诺氟沙星片(薄膜衣)','value':'8300','factoryName':'江苏飞马药业有限公司'},
          {'type':'0.25g×24片/盒','name':'普罗布考片(薄膜衣)','value':'9400','factoryName':'江苏飞马药业有限公司'},
          {'type':'0.45g×48粒/盒','name':'脉管复康胶囊','value':'8000','factoryName':'江苏飞马药业有限公司'},
          {'type':'5ml:5mg(0.1%)×1瓶/瓶','name':'玻璃酸钠滴眼液','value':'8300','factoryName':'江苏飞马药业有限公司'},
          {'type':'0.1g×10粒/盒','name':'头孢地尼胶囊','value':'9400','factoryName':'江苏飞马药业有限公司'},
          {'type':'20mg×30片/盒','name':'盐酸曲美他嗪片(薄膜衣)','value':'8300','factoryName':'江苏飞马药业有限公司'},
          {'type':'20mg×7片/盒','name':'阿托伐他汀钙片(薄膜衣)','value':'9400','factoryName':'江苏飞马药业有限公司'},
          {'type':'2.5g:12.5mg(0.5%)×1支/支','name':'红霉素眼膏','value':'9700','factoryName':'江苏飞马药业有限公司'},
          {'type':'50mg×45片/盒','name':'阿卡波糖片','value':'9900','factoryName':'江苏飞马药业有限公司'},
        ],
        baseSpec:[{'type':'5g×16袋/盒','name':'益母草颗粒(无糖型)','value':'8000','factoryName':'江苏飞马药业有限公司'},
          {'type':'0.1g×24片/瓶','name':'诺氟沙星片(薄膜衣)','value':'8300','factoryName':'江苏飞马药业有限公司'},
          {'type':'0.25g×24片/盒','name':'普罗布考片(薄膜衣)','value':'9400','factoryName':'江苏飞马药业有限公司'},
          {'type':'0.45g×48粒/盒','name':'脉管复康胶囊','value':'8000','factoryName':'江苏飞马药业有限公司'},
          {'type':'5ml:5mg(0.1%)×1瓶/瓶','name':'玻璃酸钠滴眼液','value':'8300','factoryName':'江苏飞马药业有限公司'},
          {'type':'0.1g×10粒/盒','name':'头孢地尼胶囊','value':'9400','factoryName':'江苏飞马药业有限公司'},
          {'type':'20mg×30片/盒','name':'盐酸曲美他嗪片(薄膜衣)','value':'8300','factoryName':'江苏飞马药业有限公司'},
          {'type':'20mg×7片/盒','name':'阿托伐他汀钙片(薄膜衣)','value':'9400','factoryName':'江苏飞马药业有限公司'},
          {'type':'2.5g:12.5mg(0.5%)×1支/支','name':'红霉素眼膏','value':'9700','factoryName':'江苏飞马药业有限公司'},
          {'type':'50mg×45片/盒','name':'阿卡波糖片','value':'9900','factoryName':'江苏飞马药业有限公司'},
        ],
        category : ['18-01','18-02','18-03','18-04','18-05','18-06','18-07'],
        lineData : [40.32, 50.62, 58.64, 66.73, 68.95, 72.32, 76.45,70.32, 50.62, 58.64, 66.73, 68.95,],
        lineData2:[39.32, 48.62, 50.64, 56.73, 58.95, 62.32, 66.45, 60.64, 46.73, 58.45, 62.32, 66.45],
        barData :[36, 38, 46, 44, 43, 44, 50, 56, 44,43, 54, 50],
        chartForm:this.initData(),
        startDate: undefined,
        dataMap : {
          valueData : {
            '1': [52, 45, 45, 34, 25, 43, 37, 31, 32, 26],
            '2': [58, 39, 42, 27, 29, 39, 36, 34, 38, 25],
            '3': [54, 29, 26, 37, 48, 41, 34, 26, 45, 21],
            '4': [48, 26, 34, 24, 31, 36, 20, 24, 28, 30],
            '5': [52, 28, 27, 38, 26, 22, 32, 28, 39, 36],
            '6': [64, 31, 29, 31, 30, 34, 40, 32, 38, 16],
            '7': [50, 31, 35, 36, 34, 29, 36, 28, 49, 28],
            '8': [52, 47, 35, 26, 32, 40, 40, 31, 63, 37],
            '9': [47, 32, 34, 33, 29, 39, 44, 32, 33, 33],
            '10': [55, 45, 46, 33, 29, 50, 31, 40, 57, 33],
            '11': [56, 45, 39, 42, 38, 34, 41, 38, 39, 39],
            '12': [46, 44, 38, 32, 35, 36, 47, 35, 43, 30]
          },
          nameData : {
            '1':['1益母草颗粒(无糖型)', '诺氟沙星片(薄膜衣)',
              '普罗布考片(薄膜衣)', '脉管复康胶囊', '玻璃酸钠滴眼液',
              '头孢地尼胶囊', '盐酸曲美他嗪片(薄膜衣)', '阿托伐他汀钙片(薄膜衣)',
              '红霉素眼膏', '1111'
            ],
            '2':['2益母草颗粒(无糖型)', '诺氟沙星片(薄膜衣)',
              '普罗布考片(薄膜衣)', '脉管复康胶囊', '玻璃酸钠滴眼液',
              '头孢地尼胶囊', '盐酸曲美他嗪片(薄膜衣)', '阿托伐他汀钙片(薄膜衣)',
              '红霉素眼膏', '22222'
            ],
            '3': ['3益母草颗粒(无糖型)', '诺氟沙星片(薄膜衣)',
              '普罗布考片(薄膜衣)', '脉管复康胶囊', '玻璃酸钠滴眼液',
              '头孢地尼胶囊', '盐酸曲美他嗪片(薄膜衣)', '阿托伐他汀钙片(薄膜衣)',
              '红霉素眼膏', '33333'
            ],
            '4':['4益母草颗粒(无糖型)', '诺氟沙星片(薄膜衣)',
              '普罗布考片(薄膜衣)', '脉管复康胶囊', '玻璃酸钠滴眼液',
              '头孢地尼胶囊', '盐酸曲美他嗪片(薄膜衣)', '阿托伐他汀钙片(薄膜衣)',
              '红霉素眼膏', '444444'
            ],
            '5':['5益母草颗粒(无糖型)', '诺氟沙星片(薄膜衣)',
              '普罗布考片(薄膜衣)', '脉管复康胶囊', '玻璃酸钠滴眼液',
              '头孢地尼胶囊', '盐酸曲美他嗪片(薄膜衣)', '阿托伐他汀钙片(薄膜衣)',
              '红霉素眼膏', '5555'
            ],
            '6':['6益母草颗粒(无糖型)', '诺氟沙星片(薄膜衣)',
              '普罗布考片(薄膜衣)', '脉管复康胶囊', '玻璃酸钠滴眼液',
              '头孢地尼胶囊', '盐酸曲美他嗪片(薄膜衣)', '阿托伐他汀钙片(薄膜衣)',
              '红霉素眼膏', '6666'
            ],
            '7': ['7益母草颗粒(无糖型)', '诺氟沙星片(薄膜衣)',
              '普罗布考片(薄膜衣)', '脉管复康胶囊', '玻璃酸钠滴眼液',
              '头孢地尼胶囊', '盐酸曲美他嗪片(薄膜衣)', '阿托伐他汀钙片(薄膜衣)',
              '红霉素眼膏', '7777'
            ],
            '8':['8益母草颗粒(无糖型)', '诺氟沙星片(薄膜衣)',
              '普罗布考片(薄膜衣)', '脉管复康胶囊', '玻璃酸钠滴眼液',
              '头孢地尼胶囊', '盐酸曲美他嗪片(薄膜衣)', '阿托伐他汀钙片(薄膜衣)',
              '红霉素眼膏', '8888'
            ],
            '9':['9益母草颗粒(无糖型)', '诺氟沙星片(薄膜衣)',
              '普罗布考片(薄膜衣)', '脉管复康胶囊', '玻璃酸钠滴眼液',
              '头孢地尼胶囊', '盐酸曲美他嗪片(薄膜衣)', '阿托伐他汀钙片(薄膜衣)',
              '红霉素眼膏', '9999'
            ],
            '10':['10益母草颗粒(无糖型)', '诺氟沙星片(薄膜衣)',
              '普罗布考片(薄膜衣)', '脉管复康胶囊', '玻璃酸钠滴眼液',
              '头孢地尼胶囊', '盐酸曲美他嗪片(薄膜衣)', '阿托伐他汀钙片(薄膜衣)',
              '红霉素眼膏', '1010'
            ],
            '11':['10益母草颗粒(无糖型)', '诺氟沙星片(薄膜衣)',
              '普罗布考片(薄膜衣)', '脉管复康胶囊', '玻璃酸钠滴眼液',
              '头孢地尼胶囊', '盐酸曲美他嗪片(薄膜衣)', '阿托伐他汀钙片(薄膜衣)',
              '红霉素眼膏', '11-11'
            ],
            '12':['10益母草颗粒(无糖型)', '诺氟沙星片(薄膜衣)',
              '普罗布考片(薄膜衣)', '脉管复康胶囊', '玻璃酸钠滴眼液',
              '头孢地尼胶囊', '盐酸曲美他嗪片(薄膜衣)', '阿托伐他汀钙片(薄膜衣)',
              '红霉素眼膏', '1212'
            ]
          },
          basicValueData:{
            '1': [52, 45, 45, 34, 25, 43, 37, 31, 32, 26],
            '2': [58, 39, 42, 27, 29, 39, 36, 34, 38, 25],
            '3': [54, 29, 26, 37, 48, 41, 34, 26, 45, 21],
            '4': [48, 26, 34, 24, 31, 36, 20, 24, 28, 30],
            '5': [52, 28, 27, 38, 26, 22, 32, 28, 39, 36],
            '6': [64, 31, 29, 31, 30, 34, 40, 32, 38, 16],
            '7': [50, 31, 35, 36, 34, 29, 36, 28, 49, 28],
            '8': [52, 47, 35, 26, 32, 40, 40, 31, 63, 37],
            '9': [47, 32, 34, 33, 29, 39, 44, 32, 33, 33],
            '10': [55, 45, 46, 33, 29, 50, 31, 40, 57, 33],
            '11': [56, 45, 39, 42, 38, 34, 41, 38, 39, 39],
            '12': [46, 44, 38, 32, 35, 36, 47, 35, 43, 30]
          },
          basicNameData:{
            '1':['注射用氨苄西林钠','胸腺肽注射液','草分枝杆菌F.U.36注射液',
            '格列吡嗪缓释胶囊','注射用青霉素钠(溶媒结晶)','注射用氨苄西林钠','胸腺肽注射液','草分枝杆菌F.U.36注射液',
            '格列吡嗪缓释胶囊','1111'],
            '2':['注射用氨苄西林钠','胸腺肽注射液','草分枝杆菌F.U.36注射液',
              '格列吡嗪缓释胶囊','注射用青霉素钠(溶媒结晶)','注射用氨苄西林钠','胸腺肽注射液','草分枝杆菌F.U.36注射液',
              '格列吡嗪缓释胶囊','2222'],
            '3':['注射用氨苄西林钠','胸腺肽注射液','草分枝杆菌F.U.36注射液',
              '格列吡嗪缓释胶囊','注射用青霉素钠(溶媒结晶)','注射用氨苄西林钠','胸腺肽注射液','草分枝杆菌F.U.36注射液',
              '格列吡嗪缓释胶囊','3333'],
            '4':['注射用氨苄西林钠','胸腺肽注射液','草分枝杆菌F.U.36注射液',
              '格列吡嗪缓释胶囊','注射用青霉素钠(溶媒结晶)','注射用氨苄西林钠','胸腺肽注射液','草分枝杆菌F.U.36注射液',
              '格列吡嗪缓释胶囊','4444'],
            '5':['注射用氨苄西林钠','胸腺肽注射液','草分枝杆菌F.U.36注射液',
              '格列吡嗪缓释胶囊','注射用青霉素钠(溶媒结晶)','注射用氨苄西林钠','胸腺肽注射液','草分枝杆菌F.U.36注射液',
              '格列吡嗪缓释胶囊','5555'],
            '6':['注射用氨苄西林钠','胸腺肽注射液','草分枝杆菌F.U.36注射液',
              '格列吡嗪缓释胶囊','注射用青霉素钠(溶媒结晶)','注射用氨苄西林钠','胸腺肽注射液','草分枝杆菌F.U.36注射液',
              '格列吡嗪缓释胶囊','6666'],
            '7':['注射用氨苄西林钠','胸腺肽注射液','草分枝杆菌F.U.36注射液',
              '格列吡嗪缓释胶囊','注射用青霉素钠(溶媒结晶)','注射用氨苄西林钠','胸腺肽注射液','草分枝杆菌F.U.36注射液',
              '格列吡嗪缓释胶囊','7777'],
            '8':['注射用氨苄西林钠','胸腺肽注射液','草分枝杆菌F.U.36注射液',
              '格列吡嗪缓释胶囊','注射用青霉素钠(溶媒结晶)','注射用氨苄西林钠','胸腺肽注射液','草分枝杆菌F.U.36注射液',
              '格列吡嗪缓释胶囊','8888'],
            '9':['注射用氨苄西林钠','胸腺肽注射液','草分枝杆菌F.U.36注射液',
              '格列吡嗪缓释胶囊','注射用青霉素钠(溶媒结晶)','注射用氨苄西林钠','胸腺肽注射液','草分枝杆菌F.U.36注射液',
              '格列吡嗪缓释胶囊','9999'],
            '10':['注射用氨苄西林钠','胸腺肽注射液','草分枝杆菌F.U.36注射液',
              '格列吡嗪缓释胶囊','注射用青霉素钠(溶媒结晶)','注射用氨苄西林钠','胸腺肽注射液','草分枝杆菌F.U.36注射液',
              '格列吡嗪缓释胶囊','1010'],
            '11':['注射用氨苄西林钠','胸腺肽注射液','草分枝杆菌F.U.36注射液',
              '格列吡嗪缓释胶囊','注射用青霉素钠(溶媒结晶)','注射用氨苄西林钠','胸腺肽注射液','草分枝杆菌F.U.36注射液',
              '格列吡嗪缓释胶囊','11-11'],
            '12':['注射用氨苄西林钠','胸腺肽注射液','草分枝杆菌F.U.36注射液',
              '格列吡嗪缓释胶囊','注射用青霉素钠(溶媒结晶)','注射用氨苄西林钠','胸腺肽注射液','草分枝杆菌F.U.36注射液',
              '格列吡嗪缓释胶囊','12-12'],
          }
        },

      }
    },
    mounted() {
      this.getMouted();
    },
    methods: {
      initData(){
        getFirstDateOfYear2();
        return {
          pickTime: 'month',
          packDate: getFirstDateOfYear2(),
          reponseData:getFirstDateOfYear2(),
          senderData:getFirstDateOfYear2(),
          productData:getFirstDateOfYear2(),
          basicPurchaseData:getFirstDateOfYear2(),
        }
      },
      findDifTimeUnitData(e) {
        if (e) {
          this.chartForm.pickTime = e.target.defaultValue;
        }
        this.initData();
        this.getMouted('1');
      },
      getMouted(type){
        if(type==='0'){
          this.chartForm.reponseData=this.chartForm.packDate;
          this.chartForm.productData=this.chartForm.packDate;
          this.chartForm.basicPurchaseData=this.chartForm.packDate;
          this.chartForm.senderData=this.chartForm.packDate;
        }
        this.getLineStack();
        this.nowDateTime();
        this.getBarStack();
        this.getCategory();
        this.getSenderRate();
        this.getBaseDrug();
      },
      getLineStack(){
        var myChart = echarts.init(document.getElementById("box"));
        myChart.showLoading();
       var option = {
          tooltip : {
            trigger: 'axis',
          },
          toolbox: {
            top: '10px',
            right: '2%',
            show : true,
            iconStyle: {
              borderColor: '#4c8dae'//设置工具箱图标颜色
            },
            feature : {
              mark : {show: true},
              magicType: {show: true, type: ['line', 'bar']},
              restore : {show: true},
              saveAsImage : {show: true,backgroundColor: '#ccc'}
            }
          },
          grid: {
            left: '2%',
            right: '2%',
            top: '18%',
            bottom: '5%',
            containLabel: true
          },
          calculable : true,
          legend: {
            top: '10px',
            data:['月日均订购金额(万元)','月日均到货金额(万元)','到货率(%)'],
            textStyle:{
              color:'#fff'
            }
          },
          xAxis : [
            {
              type : 'category',
              data : ['17-08','17-09','17-10','17-11','17-12','18-01','18-02','18-03','18-04','18-05','18-06','18-07'],
              splitLine: {
                lineStyle: {
                  color: '#3f4754'
                }
              },
              axisLabel:{
                rotate:40,
                interval:0,
                color:'#fff'
              },

            }
          ],
          yAxis : [
            {
              type : 'value',
              axisLabel : {
                formatter: '{value} 万',
                color:'#fff'
              },
              splitLine: {
                lineStyle: {
                  color: '#3f4754'
                }
              }
            },
            {
              type : 'value',
              axisLabel : {
                formatter: '{value}%',
                color:'#fff'
              },
              splitLine: {
                show:false,
                lineStyle: {
                  color: '#3f4754'
                }
              }
            },
          ],
          series : [
            {
              name:'月日均订购金额(万元)',
              type:'bar',
              barWidth: '30%',
              color:['#4b5cc4'],
              smooth:true,
              data:[40.32, 50.62, 58.64, 66.73, 68.95, 72.32, 76.45,70.32, 50.62, 58.64, 66.73, 68.95,],
              itemStyle: {
                //柱形图圆角，鼠标移上去效果
                emphasis: {
                  barBorderRadius: [4, 4, 0, 0]
                },
                normal: {
                  //柱形图圆角，初始化效果
                  barBorderRadius:[4, 4, 0, 0]
                }
              },
            },
            {
              name:'月日均到货金额(万元)',
              type:'bar',
              barWidth: '30%',
              color:['#edd1d8'],
              smooth:true,
              data:[39.32, 48.62, 50.64, 56.73, 58.95, 62.32, 66.45, 60.64, 46.73, 58.45, 62.32, 66.45],
              itemStyle: {
                //柱形图圆角，鼠标移上去效果
                emphasis: {
                  barBorderRadius: [4, 4, 0, 0]
                },
                normal: {
                  //柱形图圆角，初始化效果
                  barBorderRadius:[4, 4, 0, 0]
                }
              },
            },
            {
              name:'到货率(%)',
              type:'line',
              yAxisIndex: 1,
              color:'#4c8dae',
              barWidth: '45%',
              smooth:true,   //关键点，为true是不支持虚线的，实线就用true
              /*itemStyle:{
                normal:{
                  lineStyle:{
                    color:'#CD00CD',
                    width:2,
                    type:'dotted'  //'dotted'虚线 'solid'实线
                  }
                }
              },*/
              data:[76, 58, 86, 94, 73, 54, 90, 86, 94, 73, 54, 90],

            }
          ]
        };

       /*var option={
        // backgroundColor: '#0f375f',
         tooltip: {
           trigger: 'axis',
           axisPointer: {
             type: 'shadow',
             label: {
               show: true,
               backgroundColor: '#333'
             }
           }
         },
         legend: {
           data: ['月日均订购金额(万)','月日均到货金额(万)','到货率(%)'],
           textStyle: {
             color: '#ccc'
           }
         },
         xAxis: {
           data: this.category,
           axisLine: {
             lineStyle: {
               color: '#ccc'
             }
           }
         },
         yAxis : [
           {
             name: '金额(万)',
             type : 'value',
             axisLabel : {
               formatter: '{value} 万',
               color:'#fff'
             },
             splitLine: {
               lineStyle: {
                 color: '#3f4754'
               }
             }
           },
           {
             name: '到货率(%)',
             type : 'value',
             axisLabel : {
               formatter: '{value} %',
               color:'#fff'
             },
             splitLine: {
               show:false,
               lineStyle: {
                 color: '#3f4754'
               }
             }
           },
         ],
         series: [{
           name: '月日均订购金额(万)',
           type: 'line',
           smooth: true,
           showAllSymbol: true,
           symbol: 'emptyCircle',
           symbolSize: 15,
           data:  this.lineData
         },{
           name: '月日均到货金额(万)',
           type: 'line',
           smooth: true,
           showAllSymbol: true,
           symbol: 'emptyCircle',
           symbolSize: 15,
           data:  this.lineData2
         }, {
           name: '到货率(%)',
           type: 'bar',
           barWidth: 10,
           itemStyle: {
             normal: {
               barBorderRadius: 5,
               color: new echarts.graphic.LinearGradient(
                 0, 0, 0, 1,
                 [
                   {offset: 0, color: '#14c8d4'},
                   {offset: 1, color: '#43eec6'}
                 ]
               )
             }
           },
           data: this.barData
         }, {
           type: 'bar',
           barGap: '-100%',
           barWidth: 10,
           itemStyle: {
             normal: {
               color: new echarts.graphic.LinearGradient(
                 0, 0, 0, 1,
                 [
                   {offset: 0, color: 'rgba(20,200,212,0.5)'},
                   {offset: 0.2, color: 'rgba(20,200,212,0.2)'},
                   {offset: 1, color: 'rgba(20,200,212,0)'}
                 ]
               )
             }
           },
           z: -12,
           data: this.lineData
         },  {
           type: 'bar',
           barGap: '-100%',
           barWidth: 10,
           itemStyle: {
             normal: {
               color: new echarts.graphic.LinearGradient(
                 0, 0, 0, 1,
                 [
                   {offset: 0, color: 'rgba(20,200,212,0.5)'},
                   {offset: 0.2, color: 'rgba(20,200,212,0.2)'},
                   {offset: 1, color: 'rgba(20,200,212,0)'}
                 ]
               )
             }
           },
           z: -13,
           data: this.lineData2
         },{
           type: 'pictorialBar',
           symbol: 'rect',
           itemStyle: {
             normal: {
               color: '#0f375f'
             }
           },
           symbolRepeat: true,
           symbolSize: [12, 4],
           symbolMargin: 1,
           z: -10,
           data: this.lineData
         }]
         };*/
        myChart.hideLoading();
        myChart.clear();
        myChart.setOption(option);
      },
      nowDateTime() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        this.startDate = year + seperator1 + month;
      },
      getBarStack(){
        var myChart = echarts.init(document.getElementById("bar"));
        myChart.showLoading();
        var option2 = {
          legend: {
            top: '10px',
            data:['2周到货率（%）'],
            textStyle:{
              color:'#fff'
            }
          },
          tooltip : {
            trigger: 'axis',
            formatter: '{b}'+'<br/><!--<figure class="circle" style="border: 1px solid red;width: 10px;height: 10px;"></figure>-->{a0}:{c0}'+'%',
            axisPointer: {
              type: 'cross',
              label: {
              }
            }
          },
          grid: {
            left: '2%',
            right: '2%',
            top: '30%',
            bottom: '8%',
            containLabel: true
          },
          toolbox: {
            top: '10px',
            right: '2%',
            show : true,
            iconStyle: {
              borderColor: '#e4c6d0'//设置工具箱图标颜色
            },
            feature : {
              mark : {show: true},
              //dataView : {show: true, readOnly: false},
              magicType : {show: true, type: ['line', 'bar']},
              restore : {show: true},
              saveAsImage : {show: true,backgroundColor: '#ccc'}
            }
          },

          xAxis : [
            {
              type : 'category',
              data : ['17-08','17-09','17-10','17-11','17-12','18-01','18-02','18-03','18-04','18-05','18-06','18-07'],
              axisLabel:{
                rotate:40,
                interval:0,
                textStyle: {
                  color: '#fff',
                },
               /* formatter: function (value, index) {
                  return value+'月';
                },*/
            }
            }
          ],
          yAxis : [
            {
              splitLine: {
                lineStyle: {
                  color: '#3f4754'
                }
              },

              color:'#fff',
              type : 'value',
              nameTextStyle:{
                color:'#CCFFFF'
              },
              axisLabel : {
                formatter: function (value, index) {
                  return value+' %';
                },
                textStyle: {
                  color: '#fff'
                }
              },
            }
          ],
          series : [
            {
              name:'2周到货率（%）',
              type:'bar',
              color:'#574266',
              data:[50, 40, 50, 62, 76, 77, 86 ,86 ,77, 76,62,50],
              markPoint : {
                data : [
                  {type : 'max', name: '最大值'},
                  {type : 'min', name: '最小值'}
                ]
              },
              markLine : {
                data : [
                  { type : 'average',
                    name: '本市同级别平均到货率',
                    label:{
                      show:true,
                      position:'middle',
                      formatter: '本市同级别平均到货率：{c}%'
                    },
                    lineStyle:{
                      color:'#e4c6d0'
                    }
                    },
                  {   yAxis: 50,
                      name: '本区同级别平均到货率',
                      label:{
                        show:true,
                        position:'middle',
                        formatter: '本区同级别平均到货率：{c} % '
                    },
                    lineStyle:{
                      color:'#b0a4e3'
                    }
                  }
                ],
              },
              itemStyle: {
                //柱形图圆角，鼠标移上去效果
                emphasis: {
                  barBorderRadius: [4, 4, 0, 0]
                },
                normal: {
                  //柱形图圆角，初始化效果
                  barBorderRadius:[4, 4, 0, 0]
                }
              },
            },

          ]
        };
        myChart.clear();
        myChart.hideLoading();
        myChart.setOption(option2);
      },
      getCategory(){
        var myChart = echarts.init(document.getElementById("areaBasic"));
        myChart.showLoading();
        var option3={
          legend: {
            top: '10px',
            data:['基药占比（%）'],
            textStyle:{
              color:'#fff'
            }
          },
          grid: {
            left: '2%',
            right: '2%',
            top: '18%',
            bottom: '8%',
            containLabel: true
          },
          toolbox: {
            top: '10px',
            right: '2%',
            show : true,
            iconStyle: {
              borderColor: '#cca4e3'//设置工具箱图标颜色
            },
            feature : {
              mark : {show: true},
              //dataView : {show: true, readOnly: false},
              magicType : {show: true, type: ['line', 'bar']},
              restore : {show: true},
              saveAsImage : {show: true,backgroundColor: '#ccc'}
            }
          },
          tooltip : {
            trigger: 'axis',
            //formatter: '{b}'+'月份'+'<br/>{a0}:{c0}'+'%',
            axisPointer: {
              type: 'cross',
              label: {
                //backgroundColor: '#fff'
              }
            }
          },
          xAxis: {
            boundaryGap: false,
            data: ['17-08','17-09','17-10','17-11','17-12','18-01','18-02','18-03','18-04','18-05','18-06','18-07'],
            //坐标轴颜色
           /* axisLabel: {
              textStyle: {
                color: '#fff'
              }
            },*/
            axisLabel:{
             rotate:40,
              interval:0,
              textStyle: {
                color: '#fff'
              },
            }
          },
          yAxis: {
            //name:'占比:(%)',
            nameTextStyle:{
              color:'#fff'
            },
            type: 'value',
            splitLine: {
              lineStyle: {
                color: '#3f4754'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#fff'
              },
              formatter: function (value, index) {
                return value+' %';
              },
            }
          },
          series: [{
            name:'基药占比（%）',
            data:  [50, 51, 52, 56, 64, 67, 70, 70, 67, 64, 56,52,],
            type: 'line',
            smooth:true,
            color: '#56004f',
            areaStyle: {},
            itemStyle: {
              //柱形图圆角，鼠标移上去效果
              emphasis: {
                barBorderRadius: [4, 4,0, 0]
              },
              normal: {
                //柱形图圆角，初始化效果
                barBorderRadius:[4, 4, 0, 0]
              }
            },
            markLine : {
              data : [
                { yAxis: 55.6,
                  name: '平均基药占比',
                  label:{
                    show:true,
                    position:'middle',
                    formatter: '平均基药占比：{c} % '
                  },
                  lineStyle:{
                    color:'#cca4e3'
                  }
                }
              ],
            },
          }]
        };
        myChart.clear();
        myChart.hideLoading();
        myChart.setOption(option3);
      },
      getSenderRate() {
        var myChart = echarts.init(document.getElementById("senderRate"));
        myChart.clear();
        // 绘制图表
        let options = [];
        for (let key in this.dataMap.basicNameData) {
          options.push({
            yAxis: {
              data: this.dataMap.basicNameData[key]
            },
            series: [
              {
                data: this.dataMap.basicValueData[key]
              }
            ],
          })
        }
        var spec=this.spec;
        myChart.setOption({
          baseOption: {
            timeline: {
              left: 0,
              right: 0,
              axisType: 'category',
              autoPlay: false,
              currentIndex: 6,
              data: ['1月','2月','3月','4月','5月','6月','7月'],
              label: {
                color: '#fff'
              },
              /*lineStyle: {
                borderColor: '#0ff',
              },*/
              controlStyle: {
                showPlayBtn: false,
                borderColor: '#fff',
                emphasis: {
                  color: 'transparent',
                  borderColor: '#70f3ff'
                }
              },
              checkpointStyle: {
                color: '#70f3ff',
                borderColor: 'rgba(112,243,255,.5)'
              }
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              },
              position: function (pos, params, dom, rect, size) {
                // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                var obj = {top: 60};
                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                return obj;
              },

              formatter: function (params) {
                var res='<div><p>'+params[0].name+'</p></div>';
                res+='<p>&nbsp;&nbsp;&nbsp;&nbsp;产品订购金额'+':'+spec[[params[0].dataIndex]].value+'万</p>';
                res+='<p>&nbsp;&nbsp;&nbsp;&nbsp;产品规格'+':'+spec[[params[0].dataIndex]].type+'</p>';
                res+='<p>&nbsp;&nbsp;&nbsp;&nbsp;生产企业'+':'+spec[[params[0].dataIndex]].factoryName+'</p>';
                return res;
              }
            },
            grid: {
              left: '3%',
              right: '3%',
              top: '12%',
              bottom: '15%',
              containLabel: true
            },
            legend: {
              top: '10px',
              data:['产品订购金额'],
              textStyle:{
                color:'#fff'
              }
            },
            xAxis: {
              type: 'value',
              splitLine: {
                lineStyle: {
                  color: '#3f4754'
                }
              },
              boundaryGap: [0, 0.01],
              axisLabel: {
                interval: 0,
                rotate: 20,
                textStyle: {
                  color: '#fff'
                },
                formatter: function (value, index) {
                  return value+' 万';
                },
              }
            },
            yAxis: {
              type: 'category',
              axisLabel: {
                textStyle: {
                  color: '#fff'
                },
                // fontSize: 9,
                formatter: function (value) {
                  return value.length > 6 ? value.substring(0, 5) + "..." : value;
                }
              }
            },

            series: [
              {
                name: '产品订购金额',
                type: 'bar',
                itemStyle: {
                  normal: {
                    color: '#177cb0',
                    barBorderRadius: [0, 4, 4, 0]
                  },
                },
                markLine : {
                  data : [
                    {type : 'average', name: '平均值',lineStyle:{
                        color:'#70f3ff'
                      },
                      label:{
                        show:true,
                        position:'middle',
                        formatter: '月平均产品订购金额：{c} 万元 '
                      },
                    }
                  ]
                },
              }
            ]
          },
          options: options
        });
      },
      getBaseDrug(){
        var myChart = echarts.init(document.getElementById("baseDrug"));
        myChart.clear();
        // 绘制图表
        let options = [];
        for (let key in this.dataMap.nameData) {
          options.push({
            yAxis: {
              data: this.dataMap.nameData[key]
            },
            series: [
              {
                data: this.dataMap.valueData[key]
              }
            ],
          })
        }
        var baseSpec=this.baseSpec;
        myChart.setOption({
          baseOption: {
            timeline: {
              left: 0,
              right: 0,
              axisType: 'category',
              autoPlay: false,
              data: ['1月','2月','3月','4月','5月','6月','7月'],
              label: {
                color: '#fff',

              },
              lineStyle: {
                borderColor: '#fff'
              },
              controlStyle: {
                showPlayBtn: false,
                borderColor: '#fff',
                emphasis: {
                  color: 'transparent',
                  borderColor: '#70f3ff'
                }
              },
              checkpointStyle: {
                color: '#70f3ff',
                borderColor: 'rgba(112,243,255,.5)'
              }
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              },
              position: function (pos, params, dom, rect, size) {
                // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                var obj = {top: 60};
                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                return obj;
              },

              formatter: function (params) {
                var res='<div><p>'+params[0].name+'</p></div>';
                res+='<p>&nbsp;&nbsp;&nbsp;&nbsp;基药订购金额'+':'+baseSpec[[params[0].dataIndex]].value+'万</p>';
                res+='<p>&nbsp;&nbsp;&nbsp;&nbsp;产品规格'+':'+baseSpec[[params[0].dataIndex]].type+'</p>';
                res+='<p>&nbsp;&nbsp;&nbsp;&nbsp;生产企业'+':'+baseSpec[[params[0].dataIndex]].factoryName+'</p>';
                return res;
              }
            },
            grid: {
              left: '3%',
              right: '3%',
              top: '12%',
              bottom: '15%',
              containLabel: true
            },
            legend: {
              top: '10px',
              data:['基药订购金额'],
              textStyle:{
                color:'#fff'
              }
            },
            xAxis: {
              type: 'value',
              splitLine: {
                lineStyle: {
                  color: '#3f4754'
                }
              },
              boundaryGap: [0, 0.01],
              axisLabel: {
                interval: 0,
                rotate: 20,
                textStyle: {
                  color: '#fff'
                },
                formatter: function (value, index) {
                  return value+' 万';
                },
              },
            },
            yAxis: {
              type: 'category',
              axisLabel: {
                textStyle: {
                  color: '#fff'
                },
                // fontSize: 9,
                formatter: function (value) {
                  return value.length > 6 ? value.substring(0, 5) + "..." : value;
                }
              }
            },
            series: [
              {
                name: '基药订购金额',
                type: 'bar',
                itemStyle: {
                  normal: {
                    color: '#1685a9',
                    barBorderRadius: [0, 4, 4, 0]
                  },
                },
                markLine : {
                  data : [
                    {type : 'average', name: '平均值',lineStyle:{
                        color:'#3eede7'
                      },
                      label:{
                        show:true,
                        position:'middle',
                        formatter: '月平均基药订购金额：{c} 万元 '
                      },
                    }
                  ]
                },
              }
            ]
          },
          options: options
        });
      },
      dataFormatter(obj){
        return obj;
      }

    },
    watch: {
    },
  }
</script>
