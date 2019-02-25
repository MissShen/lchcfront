<template>
  <dl class="mainbox">
    <dd>
      <div class="infobox">
        <div class="w30 flo-left">
          <a href="javascript:" @click="findMapData">北京</a>
          <div id="chinaMap" style="width:100%; height: 340px"></div>
        </div>
        <div class="org-form">
          <p>等级</p>
          <ul>
            <li>
              <el-checkbox :indeterminate="isIndeterminate" v-model="queryMedicalData.queryLevel" @change="handleCheckAllChange">全选</el-checkbox>
            </li>
            <el-checkbox-group v-model="checkedType" @change="handleCheckedCitiesChange" :min="1">
              <li  v-for="type in types"> :key="type"
                <el-checkbox :label="type">{{type}}</el-checkbox>
              </li>
            </el-checkbox-group>
          </ul>
          <p>性质</p>
          <ul>
            <li><el-radio v-model="queryMedicalData.queryProperty" label="-1">全部</el-radio></li>
            <li><el-radio v-model="queryMedicalData.queryProperty" label="0">公立</el-radio></li>
            <li><el-radio v-model="queryMedicalData.queryProperty" label="1">私立</el-radio></li>
          </ul>
        </div>
        <div class="w50 flo-left ">
          <div id="main" style="height:350px;"></div>
        </div>
        <div class="clearfixed"></div>
      </div>

      <div class="infobox">
        <div class="s-form">
          <el-form>
            <el-input v-model="queryMedicalData.queryName"  placeholder="医院名称"></el-input>
            <span class="date-group">
               <el-date-picker
                 size="small"
                 type="month"
                 v-model="queryMedicalData.queryStartDate"
                 format="yyyy-MM"
                 value-format="yyyy-MM"
                 placeholder="开始日期"
                 :editable="false"
                 >
                </el-date-picker>
              至
              <el-date-picker
                size="small"
                type="month"
                v-model="queryMedicalData.queryEndDate"
                format="yyyy-MM"
                value-format="yyyy-MM"
                placeholder="结束日期"
                :editable="false"
                >
                </el-date-picker>
             </span>
            <el-button @click="this.findMedicalCare">查询</el-button>
            <el-button @click="this.resetQuest" size="small">重置</el-button>
            <el-button @click="this.downloadList" size="small">导出</el-button>
          </el-form>
        </div>
        <div class="tableset">
          <table class="s-table">
            <thead>
            <tr>
              <th width="30"></th>
              <th width="150" style="white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">医院名称</th>
              <th>区域</th>
              <th width="80">等级</th>
              <th width="50">性质</th>
              <th width="50">品种数</th>
              <th>订购数量</th>
              <th>订购金额<br>（万元）</th>
              <th width="60">基药订购占比(%)</th>
              <th>到货数量</th>
              <th>到货金额<br>（万元）</th>
              <th width="60">2周到货率(%)</th>
              <th width="50">到货确认率</th>
              <th width="70">基药到货占比(%)</th>
              <th width="40">临采次数</th>
              <th>临采金额</th>
              <th width="40">备案次数</th>
              <th>备案金额</th>
              <th width="30"></th>
            </tr>
            </thead>
            <tbody>
            <template v-for="(row,index) in purchaseData.list">
              <tr>
                <td @click="leftClick(row,index,row.id+'left')" align="center" class="nopadding">
                  <i :id="row.id+'left'" :class="leftClickFlag?'el-icon-arrow-down':'el-icon-arrow-right'"></i></td>
                <td><a href="javascript:" @click="openMapData(row.id)">{{row.hosOrgName}}</a></td>
                <td>{{row.countyName}}</td>
                <td>{{row.hosLevel}}</td>
                <td>{{row.hosProperty}}</td>
                <td align="right">{{row.varietiesNum}}</td>
                <td align="right">{{row.purchaseNum}}</td>
                <td align="right">{{row.purchasePrice}}</td>
                <td align="right">{{row.basicPurRate}}</td>
                <td align="right">{{row.arrivalNum}}</td>
                <td align="right">{{row.arrivalPrice}}</td>
                <td align="right">{{row.twoArrivalRate}}</td>
                <td align="right">{{row.confirmationRate}}</td>
                <td align="right">{{row.basicArrRate}}</td>
                <td align="right">{{row.tempNum}}</td>
                <td align="right">{{row.tempPurchaseSum}}</td>
                <td align="right">{{row.backNum}}</td>
                <td align="right">{{row.backPrice}}</td>
                <td @click="rightClick(row,index,row.id+'right')" align="center" class="nopadding">
                  <i :class="rightClickFlag?'el-icon-arrow-down':'el-icon-arrow-left'" :id="row.id+'right'" ></i></td>
              </tr>
              <tr v-if="row.expand1==true||row.expand2==true" key="purchase-data" class="s-table-extend">
                <td colspan="19">
                  <el-form class="s-form" key="product-form2" v-if="row.right">
                    <el-input  placeholder="产品名称"></el-input>
                    <el-date-picker
                      size="small"
                      type="date"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      placeholder="开始日期"
                      :editable="false"
                    >
                    </el-date-picker>
                    至
                    <el-date-picker
                      size="small"
                      type="date"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      placeholder="结束日期"
                      :editable="false"
                    >
                    </el-date-picker>
                    <el-button>查询</el-button>
                    <el-button  size="small">重置</el-button>
                    <el-button  size="small">导出</el-button>
                  </el-form>
                  <el-table :data="productData2" key="product-table2" style="width: 100%" v-if="row.right">
                    <el-table-column type="expand">
                      <template slot-scope="props">
                      <el-form class="s-form">
                        <el-input  placeholder="配送企业"></el-input>
                        <el-date-picker
                          size="small"
                          type="date"
                          format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd"
                          placeholder="开始日期"
                          :editable="false"
                        >
                        </el-date-picker>
                        至
                        <el-date-picker
                          size="small"
                          type="date"
                          format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd"
                          placeholder="结束日期"
                          :editable="false"
                        >
                        </el-date-picker>
                        <el-button>查询</el-button>
                        <el-button  size="small">重置</el-button>
                        <el-button  size="small">导出</el-button>
                      </el-form>
                      <el-table :data="senderData" style="width: 100%">
                        <el-table-column
                          label="配送企业"
                          prop="senderName">
                        </el-table-column>
                        <el-table-column
                          label="订购数量" align="right"
                          prop="purchaseNum">
                        </el-table-column>
                        <el-table-column
                          label="订购金额" align="right"
                          prop="purchasePrice">
                        </el-table-column>
                        <el-table-column
                          label="到货数量" align="right"
                          prop="receiveNum">
                        </el-table-column>
                        <el-table-column
                          label="到货金额" align="right"
                          prop="receivePrice">
                        </el-table-column>

                      </el-table>
                      <div class="pagebox">
                        <el-pagination
                          layout="total, sizes, prev, pager, next, jumper"
                          :page-sizes="[10, 20, 30]"
                          :total="hospatilData.total"
                          :page-size="hospatilData.pageSize"
                          :page-count="hospatilData.pages"
                          :current-page.sync="hospatilData.pageNum">
                        </el-pagination>
                      </div>
                    </template>
                    </el-table-column>
                    <el-table-column
                      label="产品名称"
                      prop="productName">
                    </el-table-column>
                    <el-table-column
                      label="商品名称"
                      prop="tradeName">
                    </el-table-column>
                    <el-table-column
                      label="剂型"
                      prop="type">
                    </el-table-column>
                    <el-table-column prop="drugStorage" label="产品信息">
                      <template slot-scope="scope">
                        <div class="ellipsis es300 ">
                          {{ scope.row.desc}}
                        </div>
                        <div :title="scope.row.factryName" class="ellipsis es200"
                             v-if="scope.row.factryName!=''">{{ scope.row.factryName}}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="基药标记" width="100"
                      prop="basicFlag" align="center">
                    </el-table-column>
                    <el-table-column
                      label="订购数量" width="100"
                      prop="purchaseNum" align="right">
                    </el-table-column>
                    <el-table-column
                      label="订购金额" width="100"
                      prop="purchasePrice" align="right">
                    </el-table-column>
                    <el-table-column
                      label="到货数量" width="100"
                      prop="receiveNum" align="right">
                    </el-table-column>
                    <el-table-column
                      label="到货金额" width="100"
                      prop="receivePrice" align="right">
                    </el-table-column>
                  </el-table>
                  <div class="pagebox" key="product-page2" v-if="row.right">
                    <el-pagination
                      layout="total, sizes, prev, pager, next, jumper"
                      :page-sizes="[10, 20, 30]"
                      :total="hospatilData.total"
                      :page-size="hospatilData.pageSize"
                      :page-count="hospatilData.pages"
                      :current-page.sync="hospatilData.pageNum">
                    </el-pagination>
                  </div>

                  <el-form class="s-form" key="sender-form" v-if="row.left">
                    <el-input v-model="querySenderData.senderName" placeholder="配送企业"></el-input>
                    <el-date-picker
                      size="small"
                      type="month"
                      v-model="querySenderData.startDate"
                      format="yyyy-MM"
                      value-format="yyyy-MM"
                      placeholder="开始日期"
                      :editable="false"
                    >
                    </el-date-picker>
                    至
                    <el-date-picker
                      size="small"
                      type="month"
                      v-model="querySenderData.endDate"
                      format="yyyy-MM"
                      value-format="yyyy-MM"
                      placeholder="结束日期"
                      :editable="false"
                    >
                    </el-date-picker>
                    <el-button @click="findMedicalSender" size="small">查询</el-button>
                    <el-button @click="resetQuestSender" size="small">重置</el-button>
                    <el-button @click="downloadSenderList" size="small">导出</el-button>
                  </el-form>
                  <el-table :data="senderData" border stripe style="width: 100%" key="sender-table" v-if="row.left"
                            @expand-change="findProduct">
                    <el-table-column type="expand">
                      <template slot-scope="props">
                        <el-form class="s-form">
                          <el-input  placeholder="产品名称"></el-input>
                          <el-date-picker
                            size="small"
                            type="date"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="开始日期"
                            :editable="false"
                          >
                          </el-date-picker>
                          至
                          <el-date-picker
                            size="small"
                            type="date"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="结束日期"
                            :editable="false"
                          >
                          </el-date-picker>
                          <el-button>查询</el-button>
                          <el-button  size="small">重置</el-button>
                          <el-button  size="small">导出</el-button>
                        </el-form>
                        <el-table :data="productData" style="width: 100%">
                          <el-table-column
                            label="产品名称"
                            prop="productName">
                          </el-table-column>
                          <el-table-column
                            label="商品名称"
                            prop="tradeName">
                          </el-table-column>
                          <el-table-column
                            label="剂型"
                            prop="type">
                          </el-table-column>
                          <el-table-column prop="drugStorage" label="产品信息">
                            <template slot-scope="scope">
                              <div class="ellipsis es300 ">
                                {{ scope.row.desc}}
                              </div>
                              <div :title="scope.row.factryName" class="ellipsis es200"
                                   v-if="scope.row.factryName!=''">{{ scope.row.factryName}}
                              </div>
                            </template>
                          </el-table-column>
                          <el-table-column
                            label="基药标记"
                            prop="basicFlag">
                          </el-table-column>
                          <el-table-column
                            label="订购数量" align="right"
                            prop="purchaseNum">
                          </el-table-column>
                          <el-table-column
                            label="订购金额" align="right"
                            prop="purchasePrice">
                          </el-table-column>
                          <el-table-column
                            label="到货数量" align="right"
                            prop="receiveNum">
                          </el-table-column>
                          <el-table-column
                            label="到货金额" align="right"
                            prop="receivePrice">
                          </el-table-column>
                        </el-table>
                        <div class="pagebox">
                          <el-pagination
                            layout="total, sizes, prev, pager, next, jumper"
                            :page-sizes="[10, 20, 30]"
                            :total="hospatilData.total"
                            :page-size="hospatilData.pageSize"
                            :page-count="hospatilData.pages"
                            :current-page.sync="hospatilData.pageNum">
                          </el-pagination>
                        </div>
                      </template>

                    </el-table-column>

                    <el-table-column
                      label="配送企业"
                      prop="senderName">
                    </el-table-column>
                    <el-table-column
                      label="订购数量" align="right"
                      prop="purchaseNum">
                    </el-table-column>
                    <el-table-column
                      label="订购金额" align="right"
                      prop="purchasePrice">
                    </el-table-column>
                    <el-table-column
                      label="到货数量" align="right"
                      prop="receiveNum">
                    </el-table-column>
                    <el-table-column
                      label="到货金额" align="right"
                      prop="receivePrice">
                    </el-table-column>
                  </el-table>
                  <div class="pagebox" key="sender-page" v-if="row.left">
                    <el-pagination
                      layout="total, sizes, prev, pager, next, jumper"
                      :page-sizes="[10, 20, 30]"
                      :total="responseSenderData.total"
                      :page-size="responseSenderData.pageSize"
                      :page-count="responseSenderData.pages"
                      :current-page.sync="responseSenderData.pageNum">
                    </el-pagination>
                  </div>
                </td>
              </tr>
            </template>
            </tbody>
          </table>
        </div>
        <div class="pagebox">
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="purchaseCurrentSize"
            @current-change="purchaseCurrentNum"
            :page-sizes="[10, 20, 30]"
            :total="purchaseData.total"
            :page-size="purchaseData.pageSize"
            :page-count="purchaseData.pages"
            :current-page.sync="purchaseData.pageNum">
          </el-pagination>
        </div>
      </div>
    </dd>
    <!-- 弹窗 -->
    <!--@size-change="productSizeChange" @current-change="productCurrentChange"-->
    <div class="chart-layer" v-if="dialogTableVisible">
      <ul class="chart-layer-inner">
        <li class="chart-layer-left"><img src="../../common/images/border-left.svg"/></li>

        <div id="myMapChart" class="chart-layer-main" style="width: 80vh; height: 80vh;"></div>

        <i class="chart-layer-close el-icon-circle-close-outline" @click="dialogTableVisible = false"></i>
        <li class="chart-layer-right"><img src="../../common/images/border-right.svg"/></li>
      </ul>
    </div>
  </dl>
</template>

<script>
  import {special,provinces,getJsonData} from "src/axios/supervise/supervise-generalize/superviseGeneralize";
  import {queryMedicalCare,downloadExcelHospital,queryMedicalSender,downloadExcelSender} from "src/axios/supervise/transaction/medicalCare"
  import fileUpload from 'js-file-download'
  import carSvg from "src/assets/images/car.svg";
  let echarts = require('echarts/lib/echarts');
  const typeOptions = ['三级医院', '二级医院', '一级医院','社区','其他'];
  export default {
    carSvg,
    name: 'purchaseInfo',
    data() {
      return {
        closeId:'',
        rows:undefined,
        leftClickFlag: false,
        rightClickFlag: false,
        isFullscreen: true,
        hospitalLevel: '0',
        natrual: '0',
        dialogTableVisible:false,
        hospatilData:this.hospatilDatas(),
        checkedType: ['全部'],
        types: typeOptions,
        isIndeterminate: true,
        checkAll: false,
        mapData :[
          {id:"FR20T0000012000000050355",name:"大兴区",value:"0"},
          {id:"FR20T0000012000000050359",name:"延庆区",value:"0"},
          {id:"FR20T0000012000000050346",name:"朝阳区",value:"0"},
          {id:"FR20T0000012000000050356",name:"平谷区",value:"0"},
          {id:"FR20T0000012000000050352",name:"通州区",value:"0"},
          {id:"FR20T0000012000000050351",name:"房山区",value:"0"},
          {id:"FR20T0000012000000050353",name:"顺义区",value:"0"},
          {id:"FR20T0000012000000050354",name:"昌平区",value:"0"},
          {id:"FR20T0000012000000050348",name:"石景山区",value:"0"},
          {id:"FR20T0000012000000050349",name:"海淀区",value:"0"},
          {id:"FR20T0000012000000050347",name:"丰台区",value:"0"},
          {id:"FR20T0000012000000050350",name:"门头沟区",value:"0"},
          {id:"FR20T0000012000000050343",name:"西城区",value:"0"},
          {id:"FR20T0000012000000050342",name:"东城区",value:"0"},
          {id:"FR20T0000012000000050358",name:"密云区",value:"0"},
          {id:"FR20T0000012000000050357",name:"怀柔区",value:"0"},
        ],
        queryMedicalData:{
          queryName:'',
          queryLevel:'',
          queryAreaId:'',
          queryProperty: '-1',
          queryStartDate:undefined,
          queryEndDate: undefined,
        },
        querySenderData:{
          id:'',
          medicalName:'',
          sendId:'',
          senderName:'',
          startDate:'',
          endDate:'',
        },
        responseSenderData:{
            pageNum: 1,
            pageSize: 10,
            total: 8,
            pages: 1,
            list: []
        },
        queryData: {
          queryId: 'FR20T0000011000000050066',
          queryUnit: 'province',//city
          queryStartDate:'',
          queryEndDate:'',
        },
        productData2:[{
          productName:'阿司匹林',
          tradeName:'阿司匹林',
          type:'非剂型',
          desc:'12g*0.3ml粒',
          factryName:'阿斯蒂芬阿斯蒂芬',
          basicFlag:'基本药物',
          purchaseNum:'123123',
          purchasePrice:'123213',
          receiveNum:'12312',
          receivePrice:'123123'
        }],
        productData:[
          {
          productName:'阿司匹林',
          tradeName:'阿司匹林',
          type:'非剂型',
          desc:'12g*0.3ml粒',
          factryName:'阿斯蒂芬阿斯蒂芬',
          basicFlag:'基本药物',
          purchaseNum:'123123',
          purchasePrice:'123213',
          receiveNum:'12312',
          receivePrice:'123123'
        },{
          productName:'阿司匹林',
          tradeName:'阿司匹林',
          type:'非剂型',
          desc:'12g*0.3ml粒',
          factryName:'阿斯蒂芬阿斯蒂芬',
          basicFlag:'基本药物',
          purchaseNum:'123123',
          purchasePrice:'123213',
          receiveNum:'12312',
          receivePrice:'123123'
        },{
          productName:'阿司匹林',
          tradeName:'阿司匹林',
          type:'非剂型',
          desc:'12g*0.3ml粒',
          factryName:'阿斯蒂芬阿斯蒂芬',
          basicFlag:'基本药物',
          purchaseNum:'123123',
          purchasePrice:'123213',
          receiveNum:'12312',
          receivePrice:'123123'
        },{
          productName:'阿司匹林',
          tradeName:'阿司匹林',
          type:'非剂型',
          desc:'12g*0.3ml粒',
          factryName:'阿斯蒂芬阿斯蒂芬',
          basicFlag:'基本药物',
          purchaseNum:'123123',
          purchasePrice:'123213',
          receiveNum:'12312',
          receivePrice:'123123'
        },{
          productName:'阿司匹林',
          tradeName:'阿司匹林',
          type:'非剂型',
          desc:'12g*0.3ml粒',
          factryName:'阿斯蒂芬阿斯蒂芬',
          basicFlag:'基本药物',
          purchaseNum:'123123',
          purchasePrice:'123213',
          receiveNum:'12312',
          receivePrice:'123123'
        }],
        senderData:[],
        purchaseData: this.responseMedical(),
        medicalName:['北京东城航星医院','东城区第二妇幼保健院','北京中兴医院','北京市社会福利医院','北京市东城区急救站','北京市丰台区南苑医院','北京市丰台区铁营医院'],
        medicalPurchasePrice:[40.32, 50.62, 58.64, 66.73, 68.95, 72.32, 76.45],//采购金额（万元）
        medicalArrivalPrice:[39.32, 48.62, 50.64, 26.73, 58.95, 62.32, 66.45], //到货金额（万元）
        medicalArrivalRate:[76, 58, 86, 94, 73, 54, 90],  //到货率（%）
      }
    },
    mounted(){

      this.findMapData();
      this.findStartData();
      this.findEndData();
      this.findMedicalCare();
    },
    methods:{
      /*=============医疗机构开始===========*/
      /*系统默认开始时间*/
      findStartData(){
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        //var startDate = year + seperator1 + month;
        var startDate = '2017' + seperator1 + month;
        this.queryMedicalData.queryStartDate=startDate;
      },
      /*系统默认结束时间*/
      findEndData(){
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        //var endData = year + seperator1 + month;
        var endData = '2017' + seperator1 + month;
        this.queryMedicalData.queryEndDate=endData;
      },
      /*医疗机构响应*/
      responseMedical(){
        return {
          pageNum: 1,
          pageSize: 20,
          total: 20,
          pages: 1,
          list: []
        }
      },
      /*医疗机构分页每页展示条数*/
       purchaseCurrentSize(val) {
          this.purchaseData.pageSize = val
          this.findMedicalCare()
        },
      /*医疗机构分页展示第几页*/
       purchaseCurrentNum(val) {
          this.purchaseData.pageNum = val
          this.findMedicalCare()
        },
      /*医疗机构*/
      findMedicalCare(){
        queryMedicalCare(this.purchaseData, this.queryMedicalData).then(res => {
          this.purchaseData=res.data;
          this.medicalName=[];
          this.medicalPurchasePrice=[];
          this.medicalArrivalPrice=[];
          this.medicalArrivalRate=[];
          for (let i of res.data.list) {
            this.medicalName.push(i.hosOrgName)
            this.medicalPurchasePrice.push(i.purchasePrice);
            this.medicalArrivalPrice.push(i.arrivalPrice);
            this.medicalArrivalRate.push(i.twoArrivalRate);
          }
          this.drawGraph("main");
          0 === this.purchaseData.pageNum ? this.purchaseData.pageNum = 1 : null;
        });
      },
      /*医疗机构列表导出*/
       downloadList() {
        downloadExcelHospital(this.purchaseData, this.queryMedicalData).then(res => {
          let headers = res.headers;
          const fileName = headers['content-disposition'];
          let title = fileName.includes('filename=') ? decodeURI(fileName.split('=')[1]) : '下载的文件';
          fileUpload(res.data, title, "application/vnd.ms-excel")
        });
      },
      /*医疗机构重置*/
        resetQuest(){
        this.queryMedicalData.queryName='';
        this.queryMedicalData.queryLevel='';
        this.queryMedicalData.queryAreaId='';
        this.queryMedicalData.queryProperty= '-1';
        this.queryMedicalData.queryStartDate=undefined;
        this.queryMedicalData.queryEndDate= undefined;
        this.findMapData();
        this.handleCheckAllChange(false)
      },
     /*============医疗机构列表结束==========*/
     /*============配送企业列表开始==========*/
        /*根据医疗机构查看配送*/
        findMedicalSender(){
          queryMedicalSender(this.responseSenderData, this.querySenderData).then(res => {
            this.senderData=[];
            this.responseSenderData=res.data;
            this.senderData=this.responseSenderData.list;
            0 === this.responseSenderData.pageNum ? this.responseSenderData.pageNum = 1 : null;
          });
        },
        /*导出按钮事件*/
        downloadSenderList() {
          downloadExcelSender(this.responseSenderData, this.querySenderData).then(res => {
            let headers = res.headers;
            const fileName = headers['content-disposition'];
            let title = fileName.includes('filename=') ? decodeURI(fileName.split('=')[1]) : '下载的文件';
            fileUpload(res.data, title, "application/vnd.ms-excel")
          });
        },
        /*重置按钮事件*/
        resetQuestSender(){
            this.querySenderData.senderName='';
            this.querySenderData.startDate='';
            this.querySenderData.endDate='';
        },
        /*左侧配送企业配送展开事件*/
        findProduct(row, expandedRows){
          //row.id
        },
     /*============配送企业列表结束==========*/
      handleCheckAllChange(val){
        this.checkedType = val ? typeOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value){
        let val=value;
        this.queryMedicalData.queryLevel=value;
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.types.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.types.length;
      },
      //根据
      hospatilDatas(){
        return {
          pageNum: 1,
          pageSize: 10,
          total: 8,
          pages: 1,
          list: []
        }
      },
      //医疗机构订购情况
      drawGraph(id){
        // 绘图方法
        this.chart = echarts.init(document.getElementById(id));
        var optionPic = {
          tooltip : {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                //backgroundColor: '#fff'
              }
            }
          },
          toolbox: {
            show : true,
            iconStyle: {
              borderColor: '#34d4df'//设置工具箱图标颜色
            },
            feature : {
              mark : {show: true},
              magicType: {show: true, type: ['line', 'bar']},
              restore : {show: true},
              saveAsImage : {show: true,backgroundColor: '#ccc'}
            }
          },
          calculable : true,
          legend: {
            data:['订购金额(万元)','到货金额(万元)','到货率（%）'],
            textStyle:{
              color:'#fff'
            }
          },
          xAxis : [
            {
              type : 'category',
              data : this.medicalName,
              splitLine: {
                lineStyle: {
                  color: '#3f4754'
                }
              },
              axisLabel:{
                interval: 0,
                rotate: 20,
                fontSize:11,
                color:'#17bbf8',
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
          dataZoom: [
            {
              type: 'slider',
              show: true,
              xAxisIndex: [0],
              start: 1,
              end: 80
            }
          ],
          series : [
            {
              name:'订购金额(万元)',
              type:'bar',
              color:['#009966'],
              smooth:true,
              data:this.medicalPurchasePrice,
            },
            {
              name:'到货金额(万元)',
              type:'bar',
              color:['#FFFF66'],
              smooth:true,
              data:this.medicalArrivalPrice
            },
            {
              name:'到货率（%）',
              barWidth : 30,//柱图宽度
              type:'line',
              yAxisIndex: 1,
              color:'#FF6600',
              smooth:true,   //关键点，为true是不支持虚线的，实线就用true
              itemStyle:{
                normal:{
                  lineStyle:{
                    color:'#edd1d8',
                    width:2,
                    type:'dotted'  //'dotted'虚线 'solid'实线
                  }
                }
              },
              data:this.medicalArrivalRate,
              itemStyle: {
                normal: {
                  color: '#177cb0',
                  barBorderRadius: [4, 4, 0, 0]
                },
              },
              markLine : {
                data : [
                  {type : 'average',
                    name: '平均值',
                    lineStyle:{
                      color:'#faff72'
                    },
                    label:{
                      show: true,
                      position: 'middle',
                      formatter: '平均到货率：{c} % '
                    },
                  }
                ]
              },

            }
          ]
        };
        this.chart.setOption(optionPic);
      },
      // 地图初始化
      drawMap(chart, data, map) {
        chart.setOption({
          backgroundColor: 'rgba(0,0,0,0)',
          animationDuration: 1000,
          animationEasing: 'cubicOut',
          animationDurationUpdate: 1000,
          series: [
            {
              zoom:1.26,
              /*
              left: 40,
              right:40,*/
              name: map,
              type: 'map',
              mapType: map,
              selectedMode: 'single', //选中模式，可以设置多选模式和单选，不能选择则删除删除属性
              roam: true,
              itemStyle: {
                normal: {
                  areaColor: 'transparent',
                  borderColor: '#3fdaff',
                  borderWidth: 2,
                  shadowColor: 'rgba(63, 218, 255, 0.5)',
                  shadowBlur: 30
                },
                emphasis: {
                  areaColor: '#2B91B7',
                }
              },
              nameMap: {
                'china': '中国'
              },
              label: {
                normal: {
                  show: false,
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
        console.log(params);
        this.queryName = params.name;
        this.dateArea=this.queryName;
        if (params.name in provinces) {
          //如果点击的是34个省、市、自治区，绘制选中地区的二级地图
          getJsonData('static/map/province/' + provinces[params.name] + '.json').then(res => {
            let data = res;
            this.$echarts.registerMap(params.name, data);
            //查询地图数据
            /*queryMapData(this.queryData).then(res2 => {
              let d = [];
              for (let i of res.features) {
                let flag = false;
                for (let j of res2.data) {
                  console.log("===="+j)
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

            })*/
            this.$options.methods.drawMap(this.charts, this.mapData, params.name);
            this.mapResData = this.mapData;
          });
        } else if (params.seriesName in provinces) {
          this.queryData.queryUnit='city';
          //如果是【直辖市/特别行政区】只有二级下钻
          if (special.indexOf(params.seriesName) >= 0) {
            let areaHaveFlag = false;
            for (let i of this.mapData) {
              if (i.name && i.name === params.name) {
                this.queryMedicalData.queryAreaId=i.id
                areaHaveFlag = true;
                break
              }
            }
            if (!areaHaveFlag) {
              this.queryData.queryId = ''
            }
          } else {
            let cityHaveFlag = false;
            for (let i of this.mapData) {
              if (i.name && i.name === params.name) {
                this.queryMedicalData.queryAreaId=i.id
                areaHaveFlag = true;
                break
              }
            }
            this.queryData.queryUnit = 'city';
            if (!cityHaveFlag) {
              this.queryMedicalData.queryAreaId=''
            }
            //显示县级地图
            getJsonData('static/map/city/' + cityMap[params.name] + '.json').then(res => {
              let data = res;
              this.$echarts.registerMap(params.name, data);
              //查询地图数据
              /*queryMapData(this.queryData).then(res2 => {
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
              this.$options.methods.drawMap(this.charts, this.mapData, params.name);
              this.mapResData = this.mapData;
            });
          }
        } else {
          let areaHaveFlag = false;
          for (let i of this.mapData) {
            if (i.name && i.name === params.name) {
              this.queryData.queryId = i.id;
              areaHaveFlag = true;
              break
            }
          }
          this.queryData.queryUnit = 'area';
          if (!areaHaveFlag) {
            this.queryData.queryId = '';
          }
        }
      },
      //获取地图数据
      findMapData() {
        this.charts = this.$echarts.init(document.getElementById('chinaMap'));
        this.chartClick({name: special[0], seriesName: special[0]});
        this.charts.on('click', this.chartClick);

      },
      //左图标点击事件
      leftClick(row, index,id) {
        if(this.closeId!='' && id!=this.closeId){
          document.getElementById(this.closeId).setAttribute('class','el-icon-arrow-right');
          this.$set(this.rows, 'expand1', false);
        }
        if(document.getElementById(id).className==='el-icon-arrow-right'){
          document.getElementById(id).setAttribute('class','el-icon-arrow-down')
          this.closeId=id;
          this.rows=row;
          this.querySenderData.id=row.id;
          this.querySenderData.medicalName=row.hosOrgName;
          this.querySenderData.startDate=this.queryMedicalData.queryStartDate;
            this.querySenderData.endDate=this.queryMedicalData.queryEndDate;
          this.findMedicalSender();
        }else{
          document.getElementById(id).setAttribute('class','el-icon-arrow-right');
        }
        var idl=id.replace('left','right');
        document.getElementById(idl).setAttribute('class','el-icon-arrow-left');
        this.$set(row, 'expand1', !row.expand1);
        this.$set(row, 'expand2', false);
        this.$set(row, 'left', true);
        this.$set(row, 'right', false);
      },
      //右图标点击事件
      rightClick(row, index,id) {
        if(document.getElementById(id).className==='el-icon-arrow-left'){
          document.getElementById(id).setAttribute('class','el-icon-arrow-down')
        }else{
          document.getElementById(id).setAttribute('class','el-icon-arrow-left');
        }
        var idr=id.replace('right','left');
        document.getElementById(idr).setAttribute('class','el-icon-arrow-right');
        this.$set(row, 'expand1', false);
        this.$set(row, 'expand2', !row.expand2);
        this.$set(row, 'left', false);
        this.$set(row, 'right', true);
      },
      //医院名称点击事件
      openMapData(id) {
        this.dialogTableVisible = true;
        getJsonData('static/map/beijing.json').then(resJson => {
          this.$echarts.registerMap('beijing', resJson);
          var geoCoordMap = {};
          for (let o of resJson.features) {
            geoCoordMap[o.properties.name] = o.properties.cp
          }

          var goData = [
            [{
              name: '大兴区'
            }, {
              id: 1,
              name: '海淀区',
              value: 75
            }],
            [{
              name: '大兴区'
            }, {
              id: 1,
              name: '通州区',
              value: 35
            }],
          ];
          //值控制圆点大小
          var backData = [
            [{
              name: '大兴区'
            }, {
              id: 2,
              name: '海淀区',
              value: 200
            }],
            [{
              name: '通州区'
            }, {
              id: 2,
              name: '海淀区',
              value: 200
            }],
            [{
              name: '密云区'
            }, {
              id: 2,
              name: '海淀区',
              value: 200
            }],
            [{
              name: '延庆区'
            }, {
              id: 2,
              name: '海淀区',
              value: 200
            }],
            [{
              name: '平谷区'
            }, {
              id: 2,
              name: '海淀区',
              value: 200
            }],
          ];
          //var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
          //var carPath='path://M727.5,923.582V342.756c0-5.295,2.637-10.256-5.043-10.256h-52.139c8.865,0,6.182-5.204,6.182-11.831V206.928L517.985,71.5H397.447c-8.864,0-20.947,5.541-20.947,12.169v158.685c0,0-0.418-0.01-0.551-0.01c-44.088,0-79.904,35.739-79.904,79.825s35.856,79.824,79.943,79.824c0.133,0,0.512-0.009,0.512-0.01v230.371c0,0-0.418-0.01-0.551-0.01c-44.088,0-79.904,35.738-79.904,79.824s35.856,79.824,79.943,79.824c0.133,0,0.512-0.01,0.512-0.01v131.599c0,5.294,10.312,8.918,17.994,8.918h327.963C730.137,932.5,727.5,928.876,727.5,923.582z';
          var carPath = 'image://' + carSvg;
          var data = [
            {name: '朝阳区', value: 390},
            {name: '昌平区', value: 158},
            {name: '海淀区', value: 252},
            {name: '石景山区', value: 99},
            {name: '门头沟区', value: 189},
            {name: '大兴区', value: 52},
            {name: '平谷区', value: 158},
            {name: '顺义区', value: 152},
            {name: '丰台区', value: 189},
            {name: '怀柔区', value: 160},
            {name: '密云区', value: 116},
            {name: '延庆区', value: 115},
            {name: '平谷区', value: 116},
          ];
          var arcAngle = function (data) {
            var j, k;
            for (var i = 0; i < data.length; i++) {
              var dataItem = data[i];
              if (dataItem[1].id == 1) {
                j = 0.2;
                return j;
              } else if (dataItem[1].id == 2) {
                k = -0.2;
                return k;
              }
            }
          };
          var convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
              var dataItem = data[i];
              var fromCoord = geoCoordMap[dataItem[0].name];
              var toCoord = geoCoordMap[dataItem[1].name];
              if (dataItem[1].id == 1) {
                if (fromCoord && toCoord) {
                  res.push([{
                    coord: fromCoord,
                  }, {
                    coord: toCoord,
                    value: dataItem[1].value //线条颜色

                  }]);
                }
              } else if (dataItem[1].id == 2) {
                if (fromCoord && toCoord) {
                  res.push([{
                    coord: fromCoord,
                  }, {
                    coord: toCoord
                  }]);
                }
              }
            }
            return res;
          };
          var color = ['#a6c84c', '#ffa022', '#46bee9'];
          var series = [];
          [
            //['1', goData],
            ['1', backData]
          ].forEach(function (item, i) {
            series.push({
              name: item[0],
              type: 'lines',
              zlevel: 2,
              //线特效配置
              effect: {
                show: true,
                period: 6,
                trailLength: 0,
                symbol: carPath,
                symbolSize: 15
              },
              lineStyle: {
                normal: {
                  width: 1,
                  opacity: 0.4,
                  curveness: arcAngle(item[1]), //弧线角度
                  color: '#a6c84c'
                }
              },
              data: convertData(item[1])
            }, {
              type: 'effectScatter',
              coordinateSystem: 'geo',
              zlevel: 2,
              //波纹效果
              rippleEffect: {
                period: 2,
                brushType: 'stroke',
                scale: 3
              },
              label: {
                normal: {
                  show: true,
                  color: '#fff',//显示文字
                  position: 'right',
                  formatter: '{b}'
                }
              },
              //终点形象
              symbol: 'circle',
              //圆点大小
              symbolSize: function (val) {
                return val[2] / 8;
              },
              itemStyle: {
                normal: {
                  show: true
                }
              },
              data: [{
                name: '海淀区',
                value: [116.30, 39.96, 100] //自己加的，不然是空白点
              }, {
                name: '大兴区',
                value: [116.35, 39.73, 100] //绘制起始点
              }, {
                name: '通州区',
                value: [116.67, 39.91, 100] //绘制起始点
              }, {
                name: '密云区',
                value: [116.843352, 40.377362, 100]
              }, {
                name: '延庆区',
                value: [115.985006, 40.465325, 100],
              }, {
                name: '平谷区',
                value: [117.112335, 40.144783, 100],
              }]

            });

          });

          var option = {
            // backgroundColor: '#404a59',
            title: {
              text: '医院订购示意图',
              subtext: '',
              left: 'center',
              textStyle: {
                color: '#fff'
              }
            },
            tooltip: {
              trigger: 'item',
              formatter: "{b}"
            },
            //线颜色及飞行轨道颜色
            visualMap: {
              show: false,
              min: 0,
              max: 300,
              color: ['#02e817']
            },
            //地图相关设置
            geo: {
              map: 'beijing',
              //视角缩放比例
              zoom: 1,
              //显示文本样式
              label: {
                normal: {
                  show: false,
                  textStyle: {
                    color: '#fff'
                  }
                },
                emphasis: {
                  textStyle: {
                    color: '#fff'
                  }
                }
              },
              //鼠标缩放和平移
              roam: true,
              itemStyle: {
                normal: {
                  //          	color: '#ddd',
                  borderColor: 'rgba(147, 235, 248, 1)',
                  borderWidth: 1,
                  areaColor: {
                    type: 'radial',
                    x: 0.5,
                    y: 0.5,
                    r: 0.8,
                    colorStops: [{
                      offset: 0,
                      color: 'rgba(175,238,238, 0)' // 0% 处的颜色
                    }, {
                      offset: 1,
                      color: 'rgba(	47,79,79, .2)' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                  },
                  shadowColor: 'rgba(128, 217, 248, 1)',
                  // shadowColor: 'rgba(255, 255, 255, 1)',
                  shadowOffsetX: -2,
                  shadowOffsetY: 2,
                  shadowBlur: 10
                },
                emphasis: {
                  areaColor: '#389BB7',
                  borderWidth: 0
                }
              }
            },
            series: series
          };
          this.myChart = this.$echarts.init(document.getElementById('myMapChart'));
          this.myChart.clear();
          this.myChart.setOption(option);
        })
      },

    }
  }

</script>
