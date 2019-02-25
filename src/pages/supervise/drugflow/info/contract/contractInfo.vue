<template>
  <div>
    <div>
      <el-switch
        style="display: block"
        v-model="projectFlag"
        active-color="#13ce66"
        inactive-color="#409eff"
        active-text="项目视角"
        inactive-text="整体视角">
      </el-switch>
      <el-select v-model="projectID" placeholder="请选择" v-show="projectFlag">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div>
      <div class="s-note">
          已签订的合同总数为{{titleData.contractSumNum}}份，此药品的合同总金额为{{titleData.contractSumMoney}}元，
          目前仍有效的合同数量有{{titleData.contractValidNum}}份，此药品的合同总金额为{{titleData.contractValidMoney}}元。
          另外，曾有变更记录的合同总数为{{titleData.contractChangeNum}}份，未签订完成的有{{titleData.contractUnDoneNum}}份。
          平台约定此药品的预计采购总额
      </div>
      <div class="s-title"><i class="iconfont peisong2"></i>配送企业详情</div>
      <ul class="disp-table">
          <li id="sendFactoryPie" style="width: 300px;height: 300px; padding-right: 30px;"></li>
          <li>
            <el-table :data="resSendOrgData.list" stripe>
              <el-table-column type="index" label="排名"></el-table-column>
              <el-table-column prop="sendOrgName" label="配送企业"></el-table-column>
              <el-table-column prop="hosNum" label="医院数量" width="70"></el-table-column>
              <el-table-column prop="contractSendMoney" label="合同配送金额" width="100"></el-table-column>
              <el-table-column prop="contractSendNum" label="合同配送数量" width="100"></el-table-column>
              <el-table-column prop="actualSendMoney" label="实际配送金额" width="100"></el-table-column>
              <el-table-column prop="actualSendNum" label="实际配送数量" width="100"></el-table-column>
              <el-table-column prop="sendStartTime" label="配送时间（起）" width="110"></el-table-column>
              <el-table-column prop="sendEndTime" label="配送时间（止）" width="110"></el-table-column>
            </el-table>
          </li>
      </ul>
    </div>
    <div>
      <div class="s-title"><i class="iconfont shouye2"></i>医疗机构详情</div>
      <ul class="disp-table">
          <li id="hospitalPie" style="width: 300px;height: 300px; padding-right: 30px;"></li>
          <li>
            <el-table :data="resHosData.list" stripe>
              <el-table-column type="index" label="排名"></el-table-column>
              <el-table-column prop="hosName" label="医疗机构"></el-table-column>
              <el-table-column prop="hosNum" label="配送商数量"></el-table-column>
              <el-table-column prop="contractSendMoney" label="合同配送金额" width="100"></el-table-column>
              <el-table-column prop="contractSendNum" label="合同配送数量" width="100"></el-table-column>
              <el-table-column prop="actualReceiveMoney" label="实际到货金额" width="100"></el-table-column>
              <el-table-column prop="actualReceiveNum" label="实际到货数量" width="100"></el-table-column>
              <el-table-column prop="signStartTime" label="签订时间（起）" width="110"></el-table-column>
              <el-table-column prop="signEndTime" label="签订时间（止）" width="110"></el-table-column>
            </el-table>
          </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "contract-info",
    data() {
      return {
        projectFlag: false,//是否项目视角
        titleData: {
          sendFactoryPie: '',
          hospitalPie: '',
          contractSumNum: '20',
          contractSumMoney: '20,000.00',
          contractValidNum: '16',
          contractValidMoney: '14,000.00',
          contractChangeNum: '16',
          contractUnDoneNum: '08',
        },
        resSendOrgData: this.metaSendOrgData(),
        resHosData: this.metaHosData(),
        options: [
          {
            value: '选项1',
            label: '北京市昌平区项目'
          }, {
            value: '选项2',
            label: '北京市石景山区项目'
          }, {
            value: '选项3',
            label: '北京市朝阳区项目'
          }
        ],
        projectID: '选项1'
      }
    },
    methods: {
      drawSendFactoryPie() {
        // 基于准备好的dom，初始化echarts实例
        this.sendFactoryPie = this.$echarts.init(document.getElementById('sendFactoryPie'));
        this.sendFactoryPie.clear();
        var cataArr = [];
        var dataArr = [];
        console.log("this.resSendOrgData:" + this.resSendOrgData);
        for (let i of this.resSendOrgData.list) {
          cataArr.push(i.sendOrgName);
          dataArr.push({
            value: i.contractSendMoney,
            name: i.sendOrgName
          })
        }
        // 绘制图表
        this.sendFactoryPie.setOption({
          title: {
            text: '',
            x: 'center',
            textStyle:{
              color:'#ffffff'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: cataArr,
            textStyle:{
              color:'#ffffff'
            }
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: dataArr,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        });
      },
      drawHospitalPie() {
        // 基于准备好的dom，初始化echarts实例
        this.hospitalPie = this.$echarts.init(document.getElementById('hospitalPie'));
        this.hospitalPie.clear();
        var cataArr = [];
        var dataArr = [];
        for (let i of this.resHosData.list) {
          cataArr.push(i.hosName);
          dataArr.push({
            value: i.actualReceiveMoney,
            name: i.hosName
          })
        }
        // 绘制图表
        this.hospitalPie.setOption({
          title: {
            text: '',
            x: 'center',
            textStyle:{
              color:'#ffffff'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: cataArr,
            textStyle:{
              color:'#ffffff'
            }
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: dataArr,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        });
      },
      metaSendOrgData() {
        return {
          pageNum: 1,
          pageSize: 10,
          total: 0,
          pages: 0,
          list: [{
            sendOrgName: '北京世仁堂医药有限公司',
            hosNum: '10',
            contractSendMoney: '20000.00',
            contractSendNum: '2000',
            actualSendMoney: '20000.00',
            actualSendNum: '2000',
            sendStartTime: '2001/1/1 01:01',
            sendEndTime: '2001/1/1 01:01',
          }, {
            sendOrgName: '北京天元康医药有限公司',
            hosNum: '5',
            contractSendMoney: '2000.00',
            contractSendNum: '200',
            actualSendMoney: '2000.00',
            actualSendNum: '200',
            sendStartTime: '2001/1/1 01:01',
            sendEndTime: '2001/1/1 01:01',
          }, {
            sendOrgName: '北京市燕京医药公司',
            hosNum: '4',
            contractSendMoney: '200.00',
            contractSendNum: '20',
            actualSendMoney: '200.00',
            actualSendNum: '20',
            sendStartTime: '2001/1/1 01:01',
            sendEndTime: '2001/1/1 01:01',
          },]
        }
      },
      metaHosData() {
        return {
          pageNum: 1,
          pageSize: 10,
          total: 0,
          pages: 0,
          list: [{
            hosName: '北京世仁堂医药有限公司',
            hosNum: '10',
            contractSendMoney: '20000.00',
            contractSendNum: '2000',
            actualReceiveMoney: '20000.00',
            actualReceiveNum: '2000',
            signStartTime: '2001/1/1 01:01',
            signEndTime: '2001/1/1 01:01',
          }, {
            hosName: '北京天元康医药有限公司',
            hosNum: '5',
            contractSendMoney: '2000.00',
            contractSendNum: '200',
            actualReceiveMoney: '2000.00',
            actualReceiveNum: '200',
            signStartTime: '2001/1/1 01:01',
            signEndTime: '2001/1/1 01:01',
          }, {
            hosName: '北京市燕京医药公司',
            hosNum: '4',
            contractSendMoney: '200.00',
            contractSendNum: '20',
            actualReceiveMoney: '200.00',
            actualReceiveNum: '20',
            signStartTime: '2001/1/1 01:01',
            signEndTime: '2001/1/1 01:01',
          },]
        }
      },
    },
    mounted() {
      this.drawSendFactoryPie();
      this.drawHospitalPie()
    }
  }
</script>

<style scoped>

</style>
