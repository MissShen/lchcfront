<template>
  <div class="mainbox">
    <div class="s-title large">
      <form name="chartForm" ref="chartForm">
        <span class="gap-20">北京市卫计委 相关医院订购情况概况</span>
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
                            placeholder="选择日期" v-model="chartForm.packDate" @change="initData"></el-date-picker>
          </span>
        </span>
      </form>
    </div>
    <ul>
      <li class="flo-left w30">
        <div style="padding: 10px; margin: 15px 0 0; background: #052867;">
          <div class="s-form">
            <div class="s-form-sort">
              <el-select v-model="barType" placeholder="类型" @change="drawBar">
                <el-option v-for="item in barOption" :key="item.name" :label="item.name" :value="item.func"></el-option>
              </el-select>
              <i class="el-icon-d-caret" @click="changeBarSort"></i>
            </div>
            <el-date-picker type="year" placeholder="选择日期" v-model="chartForm.packDate" class="width-80">
            </el-date-picker>
          </div>
          <div id="bar2" style="width: 100%; height: 250px"></div>
        </div>
        <div style="padding: 10px; margin: 2px 0 0; background: #052867;">
          <div id="lineChart" style="width: 100%; height:280px"></div>
        </div>
      </li>
      <li class="flo-left w70">
        <div style="width:100%; height:700px" id="chinaMap"></div>
      </li>
    </ul>
    <div class="space-20"></div>
  </div>
</template>

<script>
  import {
    cityMap,
    provinces,
    special,
    getMapData,
    getJsonData,
    getFirstDateOfYear2
  } from "src/axios/supervise/supervise-generalize/superviseGeneralize";
  // 引入基本模板
  let echarts = require('echarts/lib/echarts');
  // 引入柱状图组件
  require('echarts/lib/chart/bar');
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  export default {
    name: "",
    data() {
      return {
        chartForm: {
          pickTime: 'month',
          packDate: new Date()
        },
        barType: this.drawBar1,
        barName: '产品订购金额 TOP-5',
        barKey: 'bar1',
        barSortType: 'asc',
        barTimeLineIndex: new Date().getMonth(),
        barOption: [
          {name: '产品订购金额 TOP-5', func: this.drawBar1, key: 'bar1'},
          {name: '基药订购金额 TOP-5', func: this.drawBar2, key: 'bar2'},
          {name: '配送企业3天发货率 TOP-5', func: this.drawBar3, key: 'bar3'},
          {name: '配送企业2H响应率 TOP-5', func: this.drawBar4, key: 'bar4'},
          {name: '医疗机构到货率 TOP-5', func: this.drawBar5, key: 'bar5'},
          {name: '医疗机构基药占比 TOP-5', func: this.drawBar6, key: 'bar6'}
        ],
        barResData: {
          bar1: {
            valueData: {
              '1': [18203, 23489, 29034, 32686, 35732],
              '2': [17203, 21589, 26034, 29686, 37732],
              '3': [18203, 23489, 29034, 32686, 35732],
              '4': [17203, 21589, 26034, 29686, 37732],
              '5': [18203, 23489, 29034, 32686, 35732],
              '6': [17203, 21589, 26034, 29686, 37732],
              '7': [18203, 23489, 29034, 32686, 35732],
              '8': [17203, 21589, 26034, 29686, 37732],
              '9': [18203, 23489, 29034, 32686, 35732],
              '10': [17203, 21589, 26034, 29686, 37732],
              '11': [18203, 23489, 29034, 32686, 35732],
              '12': [17203, 21589, 26034, 29686, 37732],
            },
            nameData: {
              '1': ['注射用氨苄西林钠舒巴坦钠', '草分枝杆菌F.U.36注射液', '银花感冒颗粒', '脑蛋白水解物注射液', '银黄胶囊'],
              '2': ['注射用氨苄西林钠舒巴坦钠', '草分枝杆菌F.U.36注射液', '银花感冒颗粒', '脑蛋白水解物注射液', '银黄胶囊'],
              '3': ['注射用氨苄西林钠舒巴坦钠', '草分枝杆菌F.U.36注射液', '银花感冒颗粒', '脑蛋白水解物注射液', '银黄胶囊'],
              '4': ['注射用氨苄西林钠舒巴坦钠', '草分枝杆菌F.U.36注射液', '银花感冒颗粒', '脑蛋白水解物注射液', '银黄胶囊'],
              '5': ['注射用氨苄西林钠舒巴坦钠', '草分枝杆菌F.U.36注射液', '银花感冒颗粒', '脑蛋白水解物注射液', '银黄胶囊'],
              '6': ['注射用氨苄西林钠舒巴坦钠', '草分枝杆菌F.U.36注射液', '银花感冒颗粒', '脑蛋白水解物注射液', '银黄胶囊'],
              '7': ['注射用氨苄西林钠舒巴坦钠', '草分枝杆菌F.U.36注射液', '银花感冒颗粒', '脑蛋白水解物注射液', '银黄胶囊'],
              '8': ['注射用氨苄西林钠舒巴坦钠', '草分枝杆菌F.U.36注射液', '银花感冒颗粒', '脑蛋白水解物注射液', '银黄胶囊'],
              '9': ['注射用氨苄西林钠舒巴坦钠', '草分枝杆菌F.U.36注射液', '银花感冒颗粒', '脑蛋白水解物注射液', '银黄胶囊'],
              '10': ['注射用氨苄西林钠舒巴坦钠', '草分枝杆菌F.U.36注射液', '银花感冒颗粒', '脑蛋白水解物注射液', '银黄胶囊'],
              '11': ['注射用氨苄西林钠舒巴坦钠', '草分枝杆菌F.U.36注射液', '银花感冒颗粒', '脑蛋白水解物注射液', '银黄胶囊'],
              '12': ['注射用氨苄西林钠舒巴坦钠', '草分枝杆菌F.U.36注射液', '银花感冒颗粒', '脑蛋白水解物注射液', '银黄胶囊'],
            },
          },
          bar2: {
            valueData: {
              '1': [8203, 13489, 18203, 23489, 29034],
              '2': [7991, 11489, 15203, 25489, 32034],
              '3': [8203, 13489, 18203, 23489, 29034],
              '4': [7991, 11489, 15203, 25489, 32034],
              '5': [8203, 13489, 18203, 23489, 29034],
              '6': [7991, 11489, 15203, 25489, 32034],
              '7': [8203, 13489, 18203, 23489, 29034],
              '8': [7991, 11489, 15203, 25489, 32034],
              '9': [8203, 13489, 18203, 23489, 29034],
              '10': [7991, 11489, 15203, 25489, 32034],
              '11': [8203, 13489, 18203, 23489, 29034],
              '12': [7991, 11489, 15203, 25489, 32034],
            },
            nameData: {
              '1': ['注射用头孢噻肟钠', '硫酸阿米卡星注射液', '注射用氨苄西林钠舒巴坦钠', '草分枝杆菌F.U.36注射液', '银花感冒颗粒'],
              '2': ['注射用头孢噻肟钠', '硫酸阿米卡星注射液', '注射用氨苄西林钠舒巴坦钠', '草分枝杆菌F.U.36注射液', '银花感冒颗粒'],
              '3': ['注射用头孢噻肟钠', '硫酸阿米卡星注射液', '注射用氨苄西林钠舒巴坦钠', '草分枝杆菌F.U.36注射液', '银花感冒颗粒'],
              '4': ['注射用头孢噻肟钠', '硫酸阿米卡星注射液', '注射用氨苄西林钠舒巴坦钠', '草分枝杆菌F.U.36注射液', '银花感冒颗粒'],
              '5': ['注射用头孢噻肟钠', '硫酸阿米卡星注射液', '注射用氨苄西林钠舒巴坦钠', '草分枝杆菌F.U.36注射液', '银花感冒颗粒'],
              '6': ['注射用头孢噻肟钠', '硫酸阿米卡星注射液', '注射用氨苄西林钠舒巴坦钠', '草分枝杆菌F.U.36注射液', '银花感冒颗粒'],
              '7': ['注射用头孢噻肟钠', '硫酸阿米卡星注射液', '注射用氨苄西林钠舒巴坦钠', '草分枝杆菌F.U.36注射液', '银花感冒颗粒'],
              '8': ['注射用头孢噻肟钠', '硫酸阿米卡星注射液', '注射用氨苄西林钠舒巴坦钠', '草分枝杆菌F.U.36注射液', '银花感冒颗粒'],
              '9': ['注射用头孢噻肟钠', '硫酸阿米卡星注射液', '注射用氨苄西林钠舒巴坦钠', '草分枝杆菌F.U.36注射液', '银花感冒颗粒'],
              '10': ['注射用头孢噻肟钠', '硫酸阿米卡星注射液', '注射用氨苄西林钠舒巴坦钠', '草分枝杆菌F.U.36注射液', '银花感冒颗粒'],
              '11': ['注射用头孢噻肟钠', '硫酸阿米卡星注射液', '注射用氨苄西林钠舒巴坦钠', '草分枝杆菌F.U.36注射液', '银花感冒颗粒'],
              '12': ['注射用头孢噻肟钠', '硫酸阿米卡星注射液', '注射用氨苄西林钠舒巴坦钠', '草分枝杆菌F.U.36注射液', '银花感冒颗粒'],
            },
          },
          bar3: {
            valueData: {
              '1': [76, 82, 85, 85, 88],
              '2': [73, 84, 84, 88, 89],
              '3': [76, 82, 85, 85, 88],
              '4': [73, 84, 84, 88, 89],
              '5': [76, 82, 85, 85, 88],
              '6': [73, 84, 84, 88, 89],
              '7': [76, 82, 85, 85, 88],
              '8': [73, 84, 84, 88, 89],
              '9': [76, 82, 85, 85, 88],
              '10': [73, 84, 84, 88, 89],
              '11': [76, 82, 85, 85, 88],
              '12': [73, 84, 84, 88, 89],
            },
            nameData: {
              '1': ['北京上药爱心伟业医药有限公司', '华润医药商业集团有限公司北京药品分公司', '华润医药商业集团有限公司北京经营分公司', '国药控股北京有限公司', '国药控股北京有限公司广安药品分公司'],
              '2': ['北京上药爱心伟业医药有限公司', '华润医药商业集团有限公司北京药品分公司', '华润医药商业集团有限公司北京经营分公司', '国药控股北京有限公司', '国药控股北京有限公司广安药品分公司'],
              '3': ['北京上药爱心伟业医药有限公司', '华润医药商业集团有限公司北京药品分公司', '华润医药商业集团有限公司北京经营分公司', '国药控股北京有限公司', '国药控股北京有限公司广安药品分公司'],
              '4': ['北京上药爱心伟业医药有限公司', '华润医药商业集团有限公司北京药品分公司', '华润医药商业集团有限公司北京经营分公司', '国药控股北京有限公司', '国药控股北京有限公司广安药品分公司'],
              '5': ['北京上药爱心伟业医药有限公司', '华润医药商业集团有限公司北京药品分公司', '华润医药商业集团有限公司北京经营分公司', '国药控股北京有限公司', '国药控股北京有限公司广安药品分公司'],
              '6': ['北京上药爱心伟业医药有限公司', '华润医药商业集团有限公司北京药品分公司', '华润医药商业集团有限公司北京经营分公司', '国药控股北京有限公司', '国药控股北京有限公司广安药品分公司'],
              '7': ['北京上药爱心伟业医药有限公司', '华润医药商业集团有限公司北京药品分公司', '华润医药商业集团有限公司北京经营分公司', '国药控股北京有限公司', '国药控股北京有限公司广安药品分公司'],
              '8': ['北京上药爱心伟业医药有限公司', '华润医药商业集团有限公司北京药品分公司', '华润医药商业集团有限公司北京经营分公司', '国药控股北京有限公司', '国药控股北京有限公司广安药品分公司'],
              '9': ['北京上药爱心伟业医药有限公司', '华润医药商业集团有限公司北京药品分公司', '华润医药商业集团有限公司北京经营分公司', '国药控股北京有限公司', '国药控股北京有限公司广安药品分公司'],
              '10': ['北京上药爱心伟业医药有限公司', '华润医药商业集团有限公司北京药品分公司', '华润医药商业集团有限公司北京经营分公司', '国药控股北京有限公司', '国药控股北京有限公司广安药品分公司'],
              '11': ['北京上药爱心伟业医药有限公司', '华润医药商业集团有限公司北京药品分公司', '华润医药商业集团有限公司北京经营分公司', '国药控股北京有限公司', '国药控股北京有限公司广安药品分公司'],
              '12': ['北京上药爱心伟业医药有限公司', '华润医药商业集团有限公司北京药品分公司', '华润医药商业集团有限公司北京经营分公司', '国药控股北京有限公司', '国药控股北京有限公司广安药品分公司'],
            },
          },
          bar4: {
            valueData: {
              '1': [76, 82, 85, 85, 88],
              '2': [73, 84, 84, 88, 89],
              '3': [76, 82, 85, 85, 88],
              '4': [73, 84, 84, 88, 89],
              '5': [76, 82, 85, 85, 88],
              '6': [73, 84, 84, 88, 89],
              '7': [76, 82, 85, 85, 88],
              '8': [73, 84, 84, 88, 89],
              '9': [76, 82, 85, 85, 88],
              '10': [73, 84, 84, 88, 89],
              '11': [76, 82, 85, 85, 88],
              '12': [73, 84, 84, 88, 89],
            },
            nameData: {
              '1': ['北京上药爱心伟业医药有限公司', '华润医药商业集团有限公司北京药品分公司', '华润医药商业集团有限公司北京经营分公司', '国药控股北京有限公司', '国药控股北京有限公司广安药品分公司'],
              '2': ['北京上药爱心伟业医药有限公司', '华润医药商业集团有限公司北京药品分公司', '华润医药商业集团有限公司北京经营分公司', '国药控股北京有限公司', '国药控股北京有限公司广安药品分公司'],
              '3': ['北京上药爱心伟业医药有限公司', '华润医药商业集团有限公司北京药品分公司', '华润医药商业集团有限公司北京经营分公司', '国药控股北京有限公司', '国药控股北京有限公司广安药品分公司'],
              '4': ['北京上药爱心伟业医药有限公司', '华润医药商业集团有限公司北京药品分公司', '华润医药商业集团有限公司北京经营分公司', '国药控股北京有限公司', '国药控股北京有限公司广安药品分公司'],
              '5': ['北京上药爱心伟业医药有限公司', '华润医药商业集团有限公司北京药品分公司', '华润医药商业集团有限公司北京经营分公司', '国药控股北京有限公司', '国药控股北京有限公司广安药品分公司'],
              '6': ['北京上药爱心伟业医药有限公司', '华润医药商业集团有限公司北京药品分公司', '华润医药商业集团有限公司北京经营分公司', '国药控股北京有限公司', '国药控股北京有限公司广安药品分公司'],
              '7': ['北京上药爱心伟业医药有限公司', '华润医药商业集团有限公司北京药品分公司', '华润医药商业集团有限公司北京经营分公司', '国药控股北京有限公司', '国药控股北京有限公司广安药品分公司'],
              '8': ['北京上药爱心伟业医药有限公司', '华润医药商业集团有限公司北京药品分公司', '华润医药商业集团有限公司北京经营分公司', '国药控股北京有限公司', '国药控股北京有限公司广安药品分公司'],
              '9': ['北京上药爱心伟业医药有限公司', '华润医药商业集团有限公司北京药品分公司', '华润医药商业集团有限公司北京经营分公司', '国药控股北京有限公司', '国药控股北京有限公司广安药品分公司'],
              '10': ['北京上药爱心伟业医药有限公司', '华润医药商业集团有限公司北京药品分公司', '华润医药商业集团有限公司北京经营分公司', '国药控股北京有限公司', '国药控股北京有限公司广安药品分公司'],
              '11': ['北京上药爱心伟业医药有限公司', '华润医药商业集团有限公司北京药品分公司', '华润医药商业集团有限公司北京经营分公司', '国药控股北京有限公司', '国药控股北京有限公司广安药品分公司'],
              '12': ['北京上药爱心伟业医药有限公司', '华润医药商业集团有限公司北京药品分公司', '华润医药商业集团有限公司北京经营分公司', '国药控股北京有限公司', '国药控股北京有限公司广安药品分公司'],
            },
          },
          bar5: {
            valueData: {
              '1': [76, 82, 85, 85, 88],
              '2': [73, 84, 84, 88, 89],
              '3': [76, 82, 85, 85, 88],
              '4': [73, 84, 84, 88, 89],
              '5': [76, 82, 85, 85, 88],
              '6': [73, 84, 84, 88, 89],
              '7': [76, 82, 85, 85, 88],
              '8': [73, 84, 84, 88, 89],
              '9': [76, 82, 85, 85, 88],
              '10': [73, 84, 84, 88, 89],
              '11': [76, 82, 85, 85, 88],
              '12': [73, 84, 84, 88, 89],
            },
            nameData: {
              '1': ['北京小汤山医院', '北京市房山区第一医院', '北京市大兴区中西医结合医院', '北京市朝阳区左家庄社区卫生服务中心', '首都儿科研究所附属儿童医院'],
              '2': ['北京小汤山医院', '北京市房山区第一医院', '北京市大兴区中西医结合医院', '北京市朝阳区左家庄社区卫生服务中心', '首都儿科研究所附属儿童医院'],
              '3': ['北京小汤山医院', '北京市房山区第一医院', '北京市大兴区中西医结合医院', '北京市朝阳区左家庄社区卫生服务中心', '首都儿科研究所附属儿童医院'],
              '4': ['北京小汤山医院', '北京市房山区第一医院', '北京市大兴区中西医结合医院', '北京市朝阳区左家庄社区卫生服务中心', '首都儿科研究所附属儿童医院'],
              '5': ['北京小汤山医院', '北京市房山区第一医院', '北京市大兴区中西医结合医院', '北京市朝阳区左家庄社区卫生服务中心', '首都儿科研究所附属儿童医院'],
              '6': ['北京小汤山医院', '北京市房山区第一医院', '北京市大兴区中西医结合医院', '北京市朝阳区左家庄社区卫生服务中心', '首都儿科研究所附属儿童医院'],
              '7': ['北京小汤山医院', '北京市房山区第一医院', '北京市大兴区中西医结合医院', '北京市朝阳区左家庄社区卫生服务中心', '首都儿科研究所附属儿童医院'],
              '8': ['北京小汤山医院', '北京市房山区第一医院', '北京市大兴区中西医结合医院', '北京市朝阳区左家庄社区卫生服务中心', '首都儿科研究所附属儿童医院'],
              '9': ['北京小汤山医院', '北京市房山区第一医院', '北京市大兴区中西医结合医院', '北京市朝阳区左家庄社区卫生服务中心', '首都儿科研究所附属儿童医院'],
              '10': ['北京小汤山医院', '北京市房山区第一医院', '北京市大兴区中西医结合医院', '北京市朝阳区左家庄社区卫生服务中心', '首都儿科研究所附属儿童医院'],
              '11': ['北京小汤山医院', '北京市房山区第一医院', '北京市大兴区中西医结合医院', '北京市朝阳区左家庄社区卫生服务中心', '首都儿科研究所附属儿童医院'],
              '12': ['北京小汤山医院', '北京市房山区第一医院', '北京市大兴区中西医结合医院', '北京市朝阳区左家庄社区卫生服务中心', '首都儿科研究所附属儿童医院'],
            },
          },
          bar6: {
            valueData: {
              '1': [76, 82, 85, 85, 88],
              '2': [73, 84, 84, 88, 89],
              '3': [76, 82, 85, 85, 88],
              '4': [73, 84, 84, 88, 89],
              '5': [76, 82, 85, 85, 88],
              '6': [73, 84, 84, 88, 89],
              '7': [76, 82, 85, 85, 88],
              '8': [73, 84, 84, 88, 89],
              '9': [76, 82, 85, 85, 88],
              '10': [73, 84, 84, 88, 89],
              '11': [76, 82, 85, 85, 88],
              '12': [73, 84, 84, 88, 89],
            },
            nameData: {
              '1': ['北京小汤山医院', '北京市房山区第一医院', '北京市大兴区中西医结合医院', '北京市朝阳区左家庄社区卫生服务中心', '首都儿科研究所附属儿童医院'],
              '2': ['北京小汤山医院', '北京市房山区第一医院', '北京市大兴区中西医结合医院', '北京市朝阳区左家庄社区卫生服务中心', '首都儿科研究所附属儿童医院'],
              '3': ['北京小汤山医院', '北京市房山区第一医院', '北京市大兴区中西医结合医院', '北京市朝阳区左家庄社区卫生服务中心', '首都儿科研究所附属儿童医院'],
              '4': ['北京小汤山医院', '北京市房山区第一医院', '北京市大兴区中西医结合医院', '北京市朝阳区左家庄社区卫生服务中心', '首都儿科研究所附属儿童医院'],
              '5': ['北京小汤山医院', '北京市房山区第一医院', '北京市大兴区中西医结合医院', '北京市朝阳区左家庄社区卫生服务中心', '首都儿科研究所附属儿童医院'],
              '6': ['北京小汤山医院', '北京市房山区第一医院', '北京市大兴区中西医结合医院', '北京市朝阳区左家庄社区卫生服务中心', '首都儿科研究所附属儿童医院'],
              '7': ['北京小汤山医院', '北京市房山区第一医院', '北京市大兴区中西医结合医院', '北京市朝阳区左家庄社区卫生服务中心', '首都儿科研究所附属儿童医院'],
              '8': ['北京小汤山医院', '北京市房山区第一医院', '北京市大兴区中西医结合医院', '北京市朝阳区左家庄社区卫生服务中心', '首都儿科研究所附属儿童医院'],
              '9': ['北京小汤山医院', '北京市房山区第一医院', '北京市大兴区中西医结合医院', '北京市朝阳区左家庄社区卫生服务中心', '首都儿科研究所附属儿童医院'],
              '10': ['北京小汤山医院', '北京市房山区第一医院', '北京市大兴区中西医结合医院', '北京市朝阳区左家庄社区卫生服务中心', '首都儿科研究所附属儿童医院'],
              '11': ['北京小汤山医院', '北京市房山区第一医院', '北京市大兴区中西医结合医院', '北京市朝阳区左家庄社区卫生服务中心', '首都儿科研究所附属儿童医院'],
              '12': ['北京小汤山医院', '北京市房山区第一医院', '北京市大兴区中西医结合医院', '北京市朝阳区左家庄社区卫生服务中心', '首都儿科研究所附属儿童医院'],
            },
          },
        },
        queryData: {
          queryName: 'china',
          queryId: 'FR20T0000011000000050066',
          queryMapId: 'FR20T0000011000000050066',
          queryUnit: 'province',
        },//查询数据
      }
    },
    mounted() {
      this.initData()
    },
    methods: {
      changeBarSort() {
        if (this.barSortType === 'desc') {
          this.barSortType = 'asc'
        } else {
          this.barSortType = 'desc'
        }
        console.log(this.barKey);
        for (var i = 1; i < 13; i++) {
          if (this.barResData[this.barKey].valueData[i.toString()]) {
            this.barResData[this.barKey].valueData[i.toString()] = this.barResData[this.barKey].valueData[i.toString()].reverse();
            this.barResData[this.barKey].nameData[i.toString()] = this.barResData[this.barKey].nameData[i.toString()].reverse()
          }
        }
        this.barType()
      },
      drawBar1() {
        let myChart = echarts.init(document.getElementById('bar2'));
        myChart.clear();
        // 绘制图表
        let orgArr = ['贵州圣济堂制药有限公司', '通辽东北六药业有限公司', '四川科伦药业股份有限公司', '上海爱的发制药有限公司', '安徽金太阳生化药业有限公司'];
        let specArr = ['5ml:90mg', '100ml:0.9g(0.9%)', 'VA2000IU:VD700IU', '2ml:0.2g', '0.236g(40万单位)'];
        let options = [];
        for (let key in this.barResData.bar1.nameData) {
          options.push({
            yAxis: {
              data: this.barResData.bar1.nameData[key]
            },
            series: [
              {
                data: this.barResData.bar1.valueData[key]
              }
            ],
          })
        }
        myChart.setOption({
          baseOption: {
            timeline: {
              left: 0,
              right: 0,
              axisType: 'category',
              autoPlay: false,
              currentIndex: this.barTimeLineIndex,
              data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
              label: {
                color: '#fff',
                formatter: function (s) {
                  return s + "月"
                }
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
                return params[0].name + "<br/>"
                  + params[0].seriesName + "：" + params[0].data + "<br/>"
                  + "生产企业：" + orgArr[params[0].dataIndex] + "<br/>"
                  + "规格：" + specArr[params[0].dataIndex]
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              top: '5%',
              bottom: '20%',
              containLabel: true
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
                }
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
                name: '订购金额',
                type: 'bar',
                barWidth: 22,
                itemStyle: {
                  normal: {
                    color: '#177cb0',
                    barBorderRadius: [0, 4, 4, 0]
                  },
                },
              }
            ]
          },
          options: options
        });
      },
      drawBar2() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('bar2'));
        myChart.clear();
        // 绘制图表
        let options = [];
        for (let key in this.barResData.bar2.nameData) {
          options.push({
            yAxis: {
              data: this.barResData.bar2.nameData[key]
            },
            series: [
              {
                data: this.barResData.bar2.valueData[key]
              }
            ],

          })
        }
        myChart.setOption(
          {
            baseOption: {
              timeline: {
                left: 0,
                right: 0,
                axisType: 'category',
                autoPlay: false,
                currentIndex: 7,
                data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                label: {
                  color: '#fff',
                  formatter: function (s) {
                    return s + "月"
                  }
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
              },
              grid: {
                left: '3%',
                right: '4%',
                top: '5%',
                bottom: '20%',
                containLabel: true
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
                  // interval: 0,
                  // rotate: 20,
                  textStyle: {
                    color: '#fff'
                  }
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
                  name: '订购金额',
                  type: 'bar',
                  barWidth: 22,
                  itemStyle: {
                    normal: {
                      color: '#48aac2',
                      barBorderRadius: [0, 4, 4, 0]
                    },
                  },
                }
              ]
            },
            options: options
          }
        );
      },
      drawBar3() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('bar2'));
        myChart.clear();
        let options = [];
        for (let key in this.barResData.bar3.nameData) {
          options.push({
            yAxis: {
              data: this.barResData.bar3.nameData[key]
            },
            series: [
              {
                data: this.barResData.bar3.valueData[key]
              }
            ],
          })
        }
        // 绘制图表
        myChart.setOption({
          baseOption: {
            timeline: {
              left: 0,
              right: 0,
              axisType: 'category',
              autoPlay: false,
              currentIndex: 7,
              data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
              label: {
                color: '#fff',
                formatter: function (s) {
                  return s + "月"
                }
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
              formatter: '{b}<br/>发货率：{c}%'
            },
            grid: {
              left: '3%',
              right: '4%',
              top: '5%',
              bottom: '20%',
              containLabel: true
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
                }
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
                name: '发货率',
                type: 'bar',
                barWidth: 22,
                itemStyle: {
                  normal: {
                    color: '#4c8dae',
                    barBorderRadius: [0, 4, 4, 0]
                  },
                },
              }
            ]
          },
          options: options
        });
      },
      drawBar4() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('bar2'));
        myChart.clear();
        let options = [];
        for (let key in this.barResData.bar4.nameData) {
          options.push({
            yAxis: {
              data: this.barResData.bar4.nameData[key]
            },
            series: [
              {
                data: this.barResData.bar4.valueData[key]
              }
            ],
          })
        }
        // 绘制图表
        myChart.setOption({
          baseOption: {
            timeline: {
              left: 0,
              right: 0,
              axisType: 'category',
              autoPlay: false,
              currentIndex: 7,
              data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
              label: {
                color: '#fff',
                formatter: function (s) {
                  return s + "月"
                }
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
              formatter: '{b}<br/>响应率：{c}%'
            },
            grid: {
              left: '3%',
              right: '4%',
              top: '5%',
              bottom: '10%',
              containLabel: true
            },
            xAxis: {
              type: 'value',
              splitLine: {
                lineStyle: {
                  color: '#3f4754'
                }
              },
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
                }
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
              },
            },
            series: [
              {
                name: '响应率',
                type: 'bar',
                barWidth: 22,
                itemStyle: {
                  normal: {
                    color: '#727eca',
                    barBorderRadius: [0, 4, 4, 0]
                  },
                },
              }
            ]
          },
          options: options
        });
      },
      drawBar5() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('bar2'));
        myChart.clear();
        let options = [];
        for (let key in this.barResData.bar5.nameData) {
          options.push({
            yAxis: {
              data: this.barResData.bar5.nameData[key]
            },
            series: [
              {
                data: this.barResData.bar5.valueData[key]
              }
            ],
          })
        }
        // 绘制图表
        myChart.setOption({
          baseOption: {
            timeline: {
              left: 0,
              right: 0,
              axisType: 'category',
              autoPlay: false,
              currentIndex: 7,
              data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
              label: {
                color: '#fff',
                formatter: function (s) {
                  return s + "月"
                }
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
              formatter: '{b}<br/>到货率：{c}%'
            },
            grid: {
              left: '3%',
              right: '4%',
              top: '2%',
              bottom: '10%',
              containLabel: true
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
                }
              }
            },
            yAxis: {
              type: 'category',
              axisLabel: {
                textStyle: {
                  color: '#fff'
                },
                // fontSize: 9,
                formatter: function (value, index) {
                  return value.length > 6 ? value.substring(0, 5) + "..." : value;
                }
              }
            },
            series: [
              {
                name: '到货率',
                type: 'bar',
                barWidth: 22,
                itemStyle: {
                  normal: {
                    color: '#48a09f',
                    barBorderRadius: [0, 4, 4, 0]
                  },
                },
              }
            ]
          },
          options: options

        });
      },
      drawBar6() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('bar2'));
        myChart.clear();
        let options = [];
        for (let key in this.barResData.bar6.nameData) {
          options.push({
            yAxis: {
              data: this.barResData.bar6.nameData[key]
            },
            series: [
              {
                data: this.barResData.bar6.valueData[key]
              }
            ],
          })
        }
        // 绘制图表
        myChart.setOption({
          baseOption: {
            timeline: {
              left: 0,
              right: 0,
              axisType: 'category',
              autoPlay: false,
              currentIndex: 7,
              data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
              label: {
                color: '#fff',
                formatter: function (s) {
                  return s + "月"
                }
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
              formatter: '{b}<br/>占比：{c}%'
            },
            grid: {
              left: '3%',
              right: '4%',
              top: '5%',
              bottom: '20%',
              containLabel: true
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
                }
              }
            },
            yAxis: {
              type: 'category',
              axisLabel: {
                textStyle: {
                  color: '#fff'
                },
                // fontSize: 9,
                formatter: function (value, index) {
                  return value.length > 6 ? value.substring(0, 5) + "..." : value;
                }
              }
            },
            series: [
              {
                name: '占比',
                type: 'bar',
                barWidth: 22,
                itemStyle: {
                  normal: {
                    color: '#1685a9',
                    barBorderRadius: [0, 4, 4, 0]
                  },
                },
              }
            ]
          },
          options: options
        });
      },
      drawBar() {
        for (let i of this.barOption) {
          if (i.func === this.barType) {
            this.barName = i.name;
            this.barKey = i.key;
            break;
          }
        }
        this.barType()
      },
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('lineChart'));
        myChart.clear();
        var option = {
          tooltip: {
            trigger: 'axis',
          },
          toolbox: {
            show: true,
            top: '26px',
            iconStyle: {
              borderColor: '#70f3ff'//设置工具箱图标颜色
            },
            feature: {
              mark: {show: true},
              magicType: {show: true, type: ['line', 'bar']},
              restore: {show: true},
              saveAsImage: {show: true, backgroundColor: '#ccc'}
            }
          },
          grid: {
            left: '3%',
            right: '2%',
            top: '28%',
            bottom: '1%',
            containLabel: true
          },
          calculable: true,
          legend: {
            data: ['月日均订购金额(万元)', '月日均到货金额(万元)', '到货率(%)'],
            textStyle: {
              color: '#fff'
            }
          },
          xAxis: [
            {
              type: 'category',
              data: ['18-01', '18-02', '18-03', '18-04', '18-05', '18-06', '18-07', '18-08', '18-09', '18-10', '18-11', '18-12'],
              splitLine: {
                lineStyle: {
                  color: '#3f4754'
                }
              },
              axisLabel: {
                rotate: 40,
                interval: 0,
                color: '#fff'
              },

            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                formatter: '{value} 万',
                color: '#fff'
              },
              splitLine: {
                lineStyle: {
                  color: '#3f4754'
                }
              }
            },
            {
              type: 'value',
              axisLabel: {
                formatter: '{value}%',
                color: '#fff'
              },
              splitLine: {
                show: false,
                lineStyle: {
                  color: '#3f4754'
                }
              }
            },
          ],
          series: [
            {
              name: '月日均订购金额(万元)',
              type: 'bar',
              color: ['#b0a4e3'],
              smooth: true,
              data: [40.32, 50.62, 58.64, 66.73, 68.95, 72.32, 76.45, 70.32, 50.62, 58.64, 66.73, 68.95,],
              itemStyle: {
                //柱形图圆角，鼠标移上去效果
                emphasis: {
                  barBorderRadius: [2, 2, 0, 0]
                },
                normal: {
                  //柱形图圆角，初始化效果
                  barBorderRadius: [2, 2, 0, 0]
                }
              },
            },
            {
              name: '月日均到货金额(万元)',
              type: 'bar',
              color: ['#065279'],
              smooth: true,
              data: [39.32, 48.62, 50.64, 56.73, 58.95, 62.32, 66.45, 60.64, 46.73, 58.45, 62.32, 66.45],
              itemStyle: {
                //柱形图圆角，鼠标移上去效果
                emphasis: {
                  barBorderRadius: [2, 2, 0, 0]
                },
                normal: {
                  //柱形图圆角，初始化效果
                  barBorderRadius: [2, 2, 0, 0]
                }
              },
            },
            {
              name: '到货率(%)',
              type: 'line',
              yAxisIndex: 1,
              barWidth: '45%',
              color: '#3eede7',
              smooth: true,   //关键点，为true是不支持虚线的，实线就用true
              /**/
              data: [76, 58, 86, 94, 73, 54, 90, 86, 94, 73, 54, 90],
              itemStyle: {
                //柱形图圆角，鼠标移上去效果
                emphasis: {
                  barBorderRadius: [4, 4, 0, 0]
                },
                normal: {
                  //柱形图圆角，初始化效果
                  barBorderRadius: [4, 4, 0, 0]
                }
              },
            }
          ]
        };
        // 绘制图表
        myChart.setOption(option);
      },
      drawMap(chart, data, map) {
        let yData = [];
        for (let i of data) {
          yData.push(i.name)
        }
        chart.hideLoading();
        chart.setOption({
          backgroundColor: 'rgba(0,0,0,0)',
          tooltip: {
            trigger: 'item',
            formatter: function (params) {
              return params.data.name + "<br>到货率：" + params.data.value + "%"
            }
          },
          visualMap: {
            type: 'continuous',
            text: ['', ''],
            showLabel: true,
            seriesIndex: [0],
            min: 0,
            max: 100,
            inRange: {
              color: ['#edfbfb', '#b7d6f3', '#40a9ed', '#3598c1', '#215096',]
            },
            textStyle: {
              color: '#fff'
            },
            bottom: 30,
            left: '5%',
          },
          animationDuration: 1000,
          animationEasing: 'cubicOut',
          animationDurationUpdate: 1000,
          grid: {
            right: 10,
            top: 80,
            bottom: 30,
            width: '20%'
          },
          xAxis: {
            type: 'value',
            min: 0,
            max: 100,
            scale: true,
            position: 'top',
            splitNumber: 1,
            boundaryGap: false,
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              margin: 2,
              textStyle: {
                color: '#aaa'
              }
            }
          },
          yAxis: {
            type: 'category',
            nameGap: 16,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 0,
              textStyle: {
                color: '#fff'
              }
            },
            data: yData
          },
          geo: {
            show: true,
            left: '12%',
            right: '30%',
            map: map,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false,
              }
            },
            selectedMode: 'single',
            roam: true,
            itemStyle: {
              normal: {
                areaColor: 'transparent',
                borderColor: '#3fdaff',
                borderWidth: 2,
                shadowColor: 'rgba(63, 218, 255, 0.5)',
                shadowBlur: 20
              },
              emphasis: {
                areaColor: '#7fecad',
              }
            }
          },
          series: [
            {
              name: 'beijing',
              type: 'map',
              map: 'beijing',
              geoIndex: 0,
              data: data
            },
            {
              name: 'barSer',
              type: 'bar',
              roam: false,
              visualMap: false,
              zlevel: 2,
              barMaxWidth: 12,
              itemStyle: {
                normal: {
                  color: '#44cef6',
                  label: {
                    color: '#7fecad'
                  },
                  barBorderRadius: [0, 4, 4, 0]
                },
                emphasis: {
                  color: "#7fecad"
                }
              },
              label: {
                normal: {
                  show: false,
                  position: 'right',
                  offset: [0, 5]
                },
                emphasis: {
                  show: true,
                  position: 'right',
                  offset: [5, 0]
                }
              },
              data: data
            }
          ]
        })
      },
      findMapData() {
        this.charts = this.$echarts.init(document.getElementById('chinaMap'));
        this.chartClick({name: special[0], seriesName: special[0]});
        // this.charts.on('click', this.chartClick);
      },
      chartClick(params) {
        this.charts.showLoading();
        this.queryData.queryName = params.name;
        if (params.name in provinces) {
          //如果点击的是34个省、市、自治区，绘制选中地区的二级地图
          getJsonData('static/map/province/' + provinces[params.name] + '.json').then(res => {
            let data = res;
            this.$echarts.registerMap(params.name, data);
            //查询地图数据
            /*getMapData(this.queryData).then(res2 => {
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
              // console.log(d)
              this.$options.methods.drawMap(this.charts, d, params.name);
              this.mapResData = res2.data;
            })*/
            let d = [
              {name: '延庆区', value: 78},
              {name: '密云区', value: 87},
              {name: '平谷区', value: 69},
              {name: '怀柔区', value: 76},
              {name: '大兴区', value: 72},
              {name: '昌平区', value: 66},
              {name: '顺义区', value: 92},
              {name: '通州区', value: 88},
              {name: '房山区', value: 81},
              {name: '门头沟区', value: 56},
              {name: '海淀区', value: 83},
              {name: '石景山区', value: 89},
              {name: '丰台区', value: 85},
              {name: '朝阳区', value: 88},
              {name: '西城区', value: 86},
              {name: '东城区', value: 82},
            ];
            this.drawMap(this.charts, d, params.name);
          });
        }
        else if (params.seriesName in provinces) {
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
            this.queryData.queryUnit = 'area';
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
              /*getMapData(this.queryData).then(res2 => {
                // console.log(res2.data)
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
                // console.log(d)
                this.$options.methods.drawMap(this.charts, d, params.name);
                this.mapResData = res2.data;
              })*/
              let d = [
                {name: '延庆区', value: 78},
                {name: '密云区', value: 87},
                {name: '平谷区', value: 69},
                {name: '怀柔区', value: 76},
                {name: '大兴区', value: 72},
                {name: '昌平区', value: 66},
                {name: '顺义区', value: 92},
                {name: '通州区', value: 88},
                {name: '房山区', value: 81},
                {name: '门头沟区', value: 56},
                {name: '海淀区', value: 83},
                {name: '石景山区', value: 89},
                {name: '丰台区', value: 85},
                {name: '朝阳区', value: 88},
                {name: '西城区', value: 86},
                {name: '东城区', value: 82},
              ];
              this.drawMap(this.charts, d, params.name);
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
            this.queryData.queryId = ''
          }
        }
      },
      findDifTimeUnitData(e) {
        if (e) {
          this.chartForm.pickTime = e.target.defaultValue
        }
        this.initData()
      },
      initData() {
        this.drawBar();
        this.drawLine();
        this.findMapData()
      }
    },
    watch: {},
  }
</script>
