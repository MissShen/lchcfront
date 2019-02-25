<template>
  <div class="mainbox">
    <div class="s-title large">
      <form name="chartForm" ref="chartForm">
        <span class="gap-20">北京市崇文区社区卫生服务管理中心</span>
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
        <el-switch
          style="float:left; z-index: 999;"
          v-model="receiveFlag"
          active-color="#3eede7"
          inactive-color="#44cef6"
          active-text="服务中心"
          inactive-text="社区医院"
        >
        </el-switch>
      </form>
    </div>
    <!--=========================================上======================================-->
    <ul>
      <!--=========================================左======================================-->
      <li class="w45" style="float: left">
        <div class="s-form">
          <div class="s-form-title blocked">2018年，2周到货率LOW-5
            <span class="s-form-right">
            <el-date-picker type="year"
                            placeholder="选择日期" v-model="chartForm.packDate" @change="getMouted('0')">
            </el-date-picker>
          </span>
          </div>
        </div>
        <div id="bar" style="width: 100%;height:220px;"></div>
      </li>
      <!--==========================================中=======================================-->
      <!--<li class="w50 main-center">
        <div class="s-form">
          <span class="s-form-title blocked">2018年 07 月 订购情况统计</span>
        </div>
        <div class="survey-board">
          <ul>
            <li class="sbg-cyan">
              <span>订购金额(元)</span>
              <p>12921363.72</p>
            </li>
          </ul>
          <ul>
            <li class="sbg-yellow">
              <span>到货金额(元)</span>
              <p>7884222.97</p>
            </li>
          </ul>
          <ul>
            <li class="sbg-blue">
              <span>临采金额(元)</span>
              <p>157206</p>
            </li>
          </ul>
          <ul>
            <li class="sbg-pink">
              <span>备案金额(元)</span>
              <p>8191.94</p>
            </li>
          </ul>
          <ul>
            <li class="sbg-violet">
              <span>到货率</span>
              <p>89.96 %</p>
            </li>
          </ul>
          <ul>
            <li class="sbg-red">
              <span>
                市同级平均到货率
              </span>
              <p>79.82 %</p>
            </li>
          </ul>
          <ul>
            <li class="sbg-green">
              <span>
                基药订购金额(元)
              </span>
              <p>936740.64</p>
            </li>
          </ul>
          <ul>
            <li class="sbg-orange">
              <span>基药订购占比</span>
              <p>53 %</p>
            </li>
          </ul>
        </div>
      </li>-->


      <!--==========================================右=======================================-->
      <li class="w45" style="float: right;">
        <div class="s-form">
          <div class="s-form-title blocked">2018年，每月基药订购占比LOW-5
          </div>
          <span class="s-form-right">
            <el-date-picker type="year"
                            placeholder="选择日期" v-model="chartForm.packDate" @change="getMouted('0')">
            </el-date-picker>
          </span>
        </div>
        <div id="areaBasic" style="width:100%; height: 220px;"></div>
      </li>
    </ul>
    <!--=========================================中======================================-->
   <!-- <ul>
      &lt;!&ndash;=============================================== 左侧 ===============================================&ndash;&gt;
      <li class="w25">
        <div class="s-form">
          <div class="s-form-title blocked">产品订购金额 TOP-10
          </div>
          <span class="s-form-right">
            <el-date-picker type="year"
                            placeholder="选择日期" v-model="chartForm.packDate" @change="getMouted('0')">
            </el-date-picker>
          </span>
        </div>
        <div class="space-20"></div>
        <div id="senderRate" style="height: 320px;"></div>
      </li>
      &lt;!&ndash;=============================================== 中间 ===============================================&ndash;&gt;
      <li class="w50 main-center">
        <div class="s-form">
          <span class="s-form-title blocked">近12月，每月日均订购情况</span>
        </div>
        <div class="space-20"></div>
        <div id="box" style="height:330px;width:100%;"></div>
      </li>
      &lt;!&ndash;=============================================== 右侧 ===============================================&ndash;&gt;
      <li class="w25">
        <div class="s-form">
          <div class="s-form-title blocked">基药订购金额 TOP-10
          </div>
          <span class="s-form-right">
            <el-date-picker type="year"
                            placeholder="选择日期" v-model="chartForm.packDate" @change="getMouted('0')">
            </el-date-picker>
          </span>
        </div>
        <div class="space-20"></div>
        <div id="baseDrug" style="height: 320px;"></div>
      </li>
    </ul>-->
    <div class="space-20"></div>
    <div class="infobox">
      <div class="s-form">
        <el-form>
          <el-input placeholder="医院名称"></el-input>
          <span class="date-group">
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
             </span>
          <el-button @click="">查询</el-button>
          <el-button @click="" size="small">重置</el-button>
          <el-button @click="" size="small">导出</el-button>
        </el-form>
      </div>

      <div class="tableset">
        <table class="s-table">
          <thead>
          <tr>
            <th width="30"></th>
            <th width="140">医院名称</th>
            <th width="80">区域</th>
            <th width="80">等级</th>
            <th width="50">性质</th>
            <th width="60">品种数</th>
            <th>订购数量</th>
            <th>订购金额<br>（万元）</th>
            <th width="70">基药订购占比(%)</th>
            <th>到货数量</th>
            <th>到货金额<br>（万元）</th>
            <th width="70">2周到货率(%)</th>
            <th>到货确认率</th>
            <th width="70">基药到货占比(%)</th>
            <th>临采次数</th>
            <th>临采金额</th>
            <th>备案次数</th>
            <th>备案金额</th>
            <th width="30"></th>
          </tr>
          </thead>
          <tbody>
          <template v-for="(row,index) in purchaseData">
            <tr>
              <td @click="leftClick(row,index,row.id+'left')" align="center" class="nopadding">
                <i :id="row.id+'left'" :class="leftClickFlag?'el-icon-arrow-down':'el-icon-arrow-right'"></i></td>
              <td :title="row.name"><a href="javascript:" @click="openMapData(row.id)">{{row.name.length>7?row.name.substring(0,7)+"...":row.name}}</a></td>
              <td>{{row.area}}</td>
              <td>{{row.level}}</td>
              <td>{{row.nature}}</td>
              <td align="right">{{row.number}}</td>
              <td align="right">{{row.purchaseNum}}</td>
              <td align="right">{{row.purchasePrice}}</td>
              <td align="right">{{row.baseRate}}</td>
              <td align="right">{{row.receiveNum}}</td>
              <td align="right">{{row.receivePrice}}</td>
              <td align="right">{{row.twoReceiveRate}}</td>
              <td align="right">{{row.receiveConfirm}}</td>
              <td align="right">{{row.baseRate}}</td>
              <td align="right">{{row.lincaiNum}}</td>
              <td align="right">{{row.lincaiPrice}}</td>
              <td align="right">{{row.beianNum}}</td>
              <td align="right">{{row.beiAnPrice}}</td>
              <td @click="rightClick(row,index,row.id+'right')" align="center" class="nopadding">
                <i :class="rightClickFlag?'el-icon-arrow-down':'el-icon-arrow-left'" :id="row.id+'right'"></i></td>
            </tr>
            <tr v-if="row.expand1==true||row.expand2==true" key="purchase-data" class="s-table-extend">
              <td colspan="19">
                <el-form class="s-form" key="product-form2" v-if="row.right">
                  <el-input placeholder="产品名称"></el-input>
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
                  <el-button size="small">重置</el-button>
                  <el-button size="small">导出</el-button>
                </el-form>
                <el-table :data="productData2" key="product-table2" style="width: 100%" v-if="row.right">
                  <el-table-column type="expand">
                    <template slot-scope="props">
                      <el-form class="s-form">
                        <el-input placeholder="配送企业"></el-input>
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
                        <el-button size="small">重置</el-button>
                        <el-button size="small">导出</el-button>
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
                  <el-input placeholder="配送企业"></el-input>
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
                  <el-button size="small">查询</el-button>
                  <el-button size="small">重置</el-button>
                  <el-button size="small">导出</el-button>
                </el-form>
                <el-table :data="senderData" border stripe style="width: 100%" key="sender-table" v-if="row.left">
                  <el-table-column type="expand">
                    <template slot-scope="props">
                      <el-form class="s-form">
                        <el-input placeholder="产品名称"></el-input>
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
                        <el-button size="small">重置</el-button>
                        <el-button size="small">导出</el-button>
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
                    :total="hospatilData.total"
                    :page-size="hospatilData.pageSize"
                    :page-count="hospatilData.pages"
                    :current-page.sync="hospatilData.pageNum">
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
          :page-sizes="[10, 20, 30]"
          :total="hospatilData.total"
          :page-size="hospatilData.pageSize"
          :page-count="hospatilData.pages"
          :current-page.sync="hospatilData.pageNum">
        </el-pagination>
      </div>
    </div>
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
  </div>
</template>

<script>
  import {getJsonData, getFirstDateOfYear2} from "src/axios/supervise/supervise-generalize/superviseGeneralize";
  import carSvg from "src/assets/images/car.svg";
  // 引入基本模板
  let echarts = require('echarts/lib/echarts');
  export default {
    carSvg,
    name: "",
    data() {
      return {
        receiveFlag: false,
        leftClickFlag: false,
        rightClickFlag: false,
        dialogTableVisible: false,
        timeLineIndex: 0,
        value: '',
        spec: [{'type': '5g×16袋/盒', 'name': '益母草颗粒(无糖型)', 'value': '8000', 'factoryName': '江苏飞马药业有限公司'},
          {'type': '0.1g×24片/瓶', 'name': '诺氟沙星片(薄膜衣)', 'value': '8300', 'factoryName': '江苏飞马药业有限公司'},
          {'type': '0.25g×24片/盒', 'name': '普罗布考片(薄膜衣)', 'value': '9400', 'factoryName': '江苏飞马药业有限公司'},
          {'type': '0.45g×48粒/盒', 'name': '脉管复康胶囊', 'value': '8000', 'factoryName': '江苏飞马药业有限公司'},
          {'type': '5ml:5mg(0.1%)×1瓶/瓶', 'name': '玻璃酸钠滴眼液', 'value': '8300', 'factoryName': '江苏飞马药业有限公司'},
          {'type': '0.1g×10粒/盒', 'name': '头孢地尼胶囊', 'value': '9400', 'factoryName': '江苏飞马药业有限公司'},
          {'type': '20mg×30片/盒', 'name': '盐酸曲美他嗪片(薄膜衣)', 'value': '8300', 'factoryName': '江苏飞马药业有限公司'},
          {'type': '20mg×7片/盒', 'name': '阿托伐他汀钙片(薄膜衣)', 'value': '9400', 'factoryName': '江苏飞马药业有限公司'},
          {'type': '2.5g:12.5mg(0.5%)×1支/支', 'name': '红霉素眼膏', 'value': '9700', 'factoryName': '江苏飞马药业有限公司'},
          {'type': '50mg×45片/盒', 'name': '阿卡波糖片', 'value': '9900', 'factoryName': '江苏飞马药业有限公司'},
        ],
        baseSpec: [{'type': '5g×16袋/盒', 'name': '益母草颗粒(无糖型)', 'value': '8000', 'factoryName': '江苏飞马药业有限公司'},
          {'type': '0.1g×24片/瓶', 'name': '诺氟沙星片(薄膜衣)', 'value': '8300', 'factoryName': '江苏飞马药业有限公司'},
          {'type': '0.25g×24片/盒', 'name': '普罗布考片(薄膜衣)', 'value': '9400', 'factoryName': '江苏飞马药业有限公司'},
          {'type': '0.45g×48粒/盒', 'name': '脉管复康胶囊', 'value': '8000', 'factoryName': '江苏飞马药业有限公司'},
          {'type': '5ml:5mg(0.1%)×1瓶/瓶', 'name': '玻璃酸钠滴眼液', 'value': '8300', 'factoryName': '江苏飞马药业有限公司'},
          {'type': '0.1g×10粒/盒', 'name': '头孢地尼胶囊', 'value': '9400', 'factoryName': '江苏飞马药业有限公司'},
          {'type': '20mg×30片/盒', 'name': '盐酸曲美他嗪片(薄膜衣)', 'value': '8300', 'factoryName': '江苏飞马药业有限公司'},
          {'type': '20mg×7片/盒', 'name': '阿托伐他汀钙片(薄膜衣)', 'value': '9400', 'factoryName': '江苏飞马药业有限公司'},
          {'type': '2.5g:12.5mg(0.5%)×1支/支', 'name': '红霉素眼膏', 'value': '9700', 'factoryName': '江苏飞马药业有限公司'},
          {'type': '50mg×45片/盒', 'name': '阿卡波糖片', 'value': '9900', 'factoryName': '江苏飞马药业有限公司'},
        ],
        category: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
        lineData: [40.32, 50.62, 58.64, 66.73, 68.95, 72.32, 76.45, 70.32, 50.62, 58.64, 66.73, 68.95,],
        lineData2: [39.32, 48.62, 50.64, 56.73, 58.95, 62.32, 66.45, 60.64, 46.73, 58.45, 62.32, 66.45],
        barData: [36, 38, 46, 44, 43, 44, 50, 56, 44, 43, 54, 50],
        chartForm: this.initData(),
        startDate: undefined,
        dataMap: {
          valueData: {
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
          nameData: {
            '1': ['1益母草颗粒(无糖型)', '诺氟沙星片(薄膜衣)',
              '普罗布考片(薄膜衣)', '脉管复康胶囊', '玻璃酸钠滴眼液',
              '头孢地尼胶囊', '盐酸曲美他嗪片(薄膜衣)', '阿托伐他汀钙片(薄膜衣)',
              '红霉素眼膏', '1111'
            ],
            '2': ['2益母草颗粒(无糖型)', '诺氟沙星片(薄膜衣)',
              '普罗布考片(薄膜衣)', '脉管复康胶囊', '玻璃酸钠滴眼液',
              '头孢地尼胶囊', '盐酸曲美他嗪片(薄膜衣)', '阿托伐他汀钙片(薄膜衣)',
              '红霉素眼膏', '22222'
            ],
            '3': ['3益母草颗粒(无糖型)', '诺氟沙星片(薄膜衣)',
              '普罗布考片(薄膜衣)', '脉管复康胶囊', '玻璃酸钠滴眼液',
              '头孢地尼胶囊', '盐酸曲美他嗪片(薄膜衣)', '阿托伐他汀钙片(薄膜衣)',
              '红霉素眼膏', '33333'
            ],
            '4': ['4益母草颗粒(无糖型)', '诺氟沙星片(薄膜衣)',
              '普罗布考片(薄膜衣)', '脉管复康胶囊', '玻璃酸钠滴眼液',
              '头孢地尼胶囊', '盐酸曲美他嗪片(薄膜衣)', '阿托伐他汀钙片(薄膜衣)',
              '红霉素眼膏', '444444'
            ],
            '5': ['5益母草颗粒(无糖型)', '诺氟沙星片(薄膜衣)',
              '普罗布考片(薄膜衣)', '脉管复康胶囊', '玻璃酸钠滴眼液',
              '头孢地尼胶囊', '盐酸曲美他嗪片(薄膜衣)', '阿托伐他汀钙片(薄膜衣)',
              '红霉素眼膏', '5555'
            ],
            '6': ['6益母草颗粒(无糖型)', '诺氟沙星片(薄膜衣)',
              '普罗布考片(薄膜衣)', '脉管复康胶囊', '玻璃酸钠滴眼液',
              '头孢地尼胶囊', '盐酸曲美他嗪片(薄膜衣)', '阿托伐他汀钙片(薄膜衣)',
              '红霉素眼膏', '6666'
            ],
            '7': ['7益母草颗粒(无糖型)', '诺氟沙星片(薄膜衣)',
              '普罗布考片(薄膜衣)', '脉管复康胶囊', '玻璃酸钠滴眼液',
              '头孢地尼胶囊', '盐酸曲美他嗪片(薄膜衣)', '阿托伐他汀钙片(薄膜衣)',
              '红霉素眼膏', '7777'
            ],
            '8': ['8益母草颗粒(无糖型)', '诺氟沙星片(薄膜衣)',
              '普罗布考片(薄膜衣)', '脉管复康胶囊', '玻璃酸钠滴眼液',
              '头孢地尼胶囊', '盐酸曲美他嗪片(薄膜衣)', '阿托伐他汀钙片(薄膜衣)',
              '红霉素眼膏', '8888'
            ],
            '9': ['9益母草颗粒(无糖型)', '诺氟沙星片(薄膜衣)',
              '普罗布考片(薄膜衣)', '脉管复康胶囊', '玻璃酸钠滴眼液',
              '头孢地尼胶囊', '盐酸曲美他嗪片(薄膜衣)', '阿托伐他汀钙片(薄膜衣)',
              '红霉素眼膏', '9999'
            ],
            '10': ['10益母草颗粒(无糖型)', '诺氟沙星片(薄膜衣)',
              '普罗布考片(薄膜衣)', '脉管复康胶囊', '玻璃酸钠滴眼液',
              '头孢地尼胶囊', '盐酸曲美他嗪片(薄膜衣)', '阿托伐他汀钙片(薄膜衣)',
              '红霉素眼膏', '1010'
            ],
            '11': ['10益母草颗粒(无糖型)', '诺氟沙星片(薄膜衣)',
              '普罗布考片(薄膜衣)', '脉管复康胶囊', '玻璃酸钠滴眼液',
              '头孢地尼胶囊', '盐酸曲美他嗪片(薄膜衣)', '阿托伐他汀钙片(薄膜衣)',
              '红霉素眼膏', '11-11'
            ],
            '12': ['10益母草颗粒(无糖型)', '诺氟沙星片(薄膜衣)',
              '普罗布考片(薄膜衣)', '脉管复康胶囊', '玻璃酸钠滴眼液',
              '头孢地尼胶囊', '盐酸曲美他嗪片(薄膜衣)', '阿托伐他汀钙片(薄膜衣)',
              '红霉素眼膏', '1212'
            ]
          },
          basicValueData: {
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
          basicNameData: {
            '1': ['注射用氨苄西林钠', '胸腺肽注射液', '草分枝杆菌F.U.36注射液',
              '格列吡嗪缓释胶囊', '注射用青霉素钠(溶媒结晶)', '注射用氨苄西林钠', '胸腺肽注射液', '草分枝杆菌F.U.36注射液',
              '格列吡嗪缓释胶囊', '1111'],
            '2': ['注射用氨苄西林钠', '胸腺肽注射液', '草分枝杆菌F.U.36注射液',
              '格列吡嗪缓释胶囊', '注射用青霉素钠(溶媒结晶)', '注射用氨苄西林钠', '胸腺肽注射液', '草分枝杆菌F.U.36注射液',
              '格列吡嗪缓释胶囊', '2222'],
            '3': ['注射用氨苄西林钠', '胸腺肽注射液', '草分枝杆菌F.U.36注射液',
              '格列吡嗪缓释胶囊', '注射用青霉素钠(溶媒结晶)', '注射用氨苄西林钠', '胸腺肽注射液', '草分枝杆菌F.U.36注射液',
              '格列吡嗪缓释胶囊', '3333'],
            '4': ['注射用氨苄西林钠', '胸腺肽注射液', '草分枝杆菌F.U.36注射液',
              '格列吡嗪缓释胶囊', '注射用青霉素钠(溶媒结晶)', '注射用氨苄西林钠', '胸腺肽注射液', '草分枝杆菌F.U.36注射液',
              '格列吡嗪缓释胶囊', '4444'],
            '5': ['注射用氨苄西林钠', '胸腺肽注射液', '草分枝杆菌F.U.36注射液',
              '格列吡嗪缓释胶囊', '注射用青霉素钠(溶媒结晶)', '注射用氨苄西林钠', '胸腺肽注射液', '草分枝杆菌F.U.36注射液',
              '格列吡嗪缓释胶囊', '5555'],
            '6': ['注射用氨苄西林钠', '胸腺肽注射液', '草分枝杆菌F.U.36注射液',
              '格列吡嗪缓释胶囊', '注射用青霉素钠(溶媒结晶)', '注射用氨苄西林钠', '胸腺肽注射液', '草分枝杆菌F.U.36注射液',
              '格列吡嗪缓释胶囊', '6666'],
            '7': ['注射用氨苄西林钠', '胸腺肽注射液', '草分枝杆菌F.U.36注射液',
              '格列吡嗪缓释胶囊', '注射用青霉素钠(溶媒结晶)', '注射用氨苄西林钠', '胸腺肽注射液', '草分枝杆菌F.U.36注射液',
              '格列吡嗪缓释胶囊', '7777'],
            '8': ['注射用氨苄西林钠', '胸腺肽注射液', '草分枝杆菌F.U.36注射液',
              '格列吡嗪缓释胶囊', '注射用青霉素钠(溶媒结晶)', '注射用氨苄西林钠', '胸腺肽注射液', '草分枝杆菌F.U.36注射液',
              '格列吡嗪缓释胶囊', '8888'],
            '9': ['注射用氨苄西林钠', '胸腺肽注射液', '草分枝杆菌F.U.36注射液',
              '格列吡嗪缓释胶囊', '注射用青霉素钠(溶媒结晶)', '注射用氨苄西林钠', '胸腺肽注射液', '草分枝杆菌F.U.36注射液',
              '格列吡嗪缓释胶囊', '9999'],
            '10': ['注射用氨苄西林钠', '胸腺肽注射液', '草分枝杆菌F.U.36注射液',
              '格列吡嗪缓释胶囊', '注射用青霉素钠(溶媒结晶)', '注射用氨苄西林钠', '胸腺肽注射液', '草分枝杆菌F.U.36注射液',
              '格列吡嗪缓释胶囊', '1010'],
            '11': ['注射用氨苄西林钠', '胸腺肽注射液', '草分枝杆菌F.U.36注射液',
              '格列吡嗪缓释胶囊', '注射用青霉素钠(溶媒结晶)', '注射用氨苄西林钠', '胸腺肽注射液', '草分枝杆菌F.U.36注射液',
              '格列吡嗪缓释胶囊', '11-11'],
            '12': ['注射用氨苄西林钠', '胸腺肽注射液', '草分枝杆菌F.U.36注射液',
              '格列吡嗪缓释胶囊', '注射用青霉素钠(溶媒结晶)', '注射用氨苄西林钠', '胸腺肽注射液', '草分枝杆菌F.U.36注射液',
              '格列吡嗪缓释胶囊', '12-12'],
          }
        },
        dataMap2: {
          valueData: {
            '1': [52, 45, 45, 34, 25],
            '2': [58, 39, 42, 27, 29],
            '3': [54, 29, 26, 37, 48],
            '4': [48, 26, 34, 24, 31],
            '5': [52, 28, 27, 38, 26],
            '6': [64, 31, 29, 31, 30],
            '7': [50, 31, 35, 36, 34],
            '8': [52, 47, 35, 26, 32],
            '9': [47, 32, 34, 33, 29],
            '10': [55, 45, 46, 33, 29],
            '11': [56, 45, 39, 42, 38],
            '12': [46, 44, 38, 32, 35]
          },
          nameData: {
            '1': ['北京市大兴县中医医院', '平谷县粮食局职工医院',
              '北京小汤山医院', '北京市南口长城医院', '北京市西城区白云路医院'
            ],
            '2': ['北京市西城区妇幼保健院', '北京市回民医院',
              '北京市宣武中医医院', '北京市宣武区陶然亭医院', '北京市宣武区白纸坊医院'
            ],
            '3': ['北京市崇文区儿童医院', '北京市崇文区中医医院',
              '北京市崇文区正大医院', '北京市崇文区前门医院', '北京市东城区第一人民医院'
            ],
            '4': ['北京市仁和医院', '北京市大兴区人民医院',
              '北京市昌平区沙河社区卫生服务中心', '北京市昌平区医院', '施甸县中医医院'
            ],
            '5': ['北京市丰台区南苑医院', '北京市丰台区卢沟桥医院',
              '304医院器材', '中国核工业北京四0一医院', '北京市丰台区铁营医院'
            ],
            '6': ['北京市大兴县中医医院', '平谷县粮食局职工医院',
              '北京小汤山医院', '北京市南口长城医院', '北京市西城区白云路医院'
            ],
            '7': ['北京市西城区妇幼保健院', '北京市回民医院',
              '北京市宣武中医医院', '北京市宣武区陶然亭医院', '北京市宣武区白纸坊医院'
            ],
            '8': ['北京市崇文区儿童医院', '北京市崇文区中医医院',
              '北京市崇文区正大医院', '北京市崇文区前门医院', '北京市东城区第一人民医院'
            ],
            '9': ['北京市仁和医院', '北京市大兴区人民医院',
              '北京市昌平区沙河社区卫生服务中心', '北京市昌平区医院', '施甸县中医医院'
            ],
            '10': ['北京市丰台区南苑医院', '北京市丰台区卢沟桥医院',
              '304医院器材', '中国核工业北京四0一医院', '北京市丰台区铁营医院'
            ],
            '11': ['北京市仁和医院', '北京市大兴区人民医院',
              '北京市昌平区沙河社区卫生服务中心', '北京市昌平区医院', '施甸县中医医院'
            ],
            '12': ['北京市丰台区南苑医院', '北京市丰台区卢沟桥医院',
              '304医院器材', '中国核工业北京四0一医院', '北京市丰台区铁营医院'
            ],
          },
          basicValueData: {
            '1': [52, 45, 45, 34, 25],
            '2': [58, 39, 42, 27, 29],
            '3': [54, 29, 26, 37, 48],
            '4': [48, 26, 34, 24, 31],
            '5': [52, 28, 27, 38, 26],
            '6': [64, 31, 29, 31, 30],
            '7': [50, 31, 35, 36, 34],
            '8': [52, 47, 35, 26, 32],
            '9': [47, 32, 34, 33, 29],
            '10': [55, 45, 46, 33, 29],
            '11': [56, 45, 39, 42, 38],
            '12': [46, 44, 38, 32, 35]
          },
          basicNameData: {
            '1': ['北京市大兴县中医医院', '平谷县粮食局职工医院',
              '北京小汤山医院', '北京市南口长城医院', '北京市西城区白云路医院'
            ],
            '2': ['北京市西城区妇幼保健院', '北京市回民医院',
              '北京市宣武中医医院', '北京市宣武区陶然亭医院', '北京市宣武区白纸坊医院'
            ],
            '3': ['北京市崇文区儿童医院', '北京市崇文区中医医院',
              '北京市崇文区正大医院', '北京市崇文区前门医院', '北京市东城区第一人民医院'
            ],
            '4': ['北京市仁和医院', '北京市大兴区人民医院',
              '北京市昌平区沙河社区卫生服务中心', '北京市昌平区医院', '施甸县中医医院'
            ],
            '5': ['北京市丰台区南苑医院', '北京市丰台区卢沟桥医院',
              '304医院器材', '中国核工业北京四0一医院', '北京市丰台区铁营医院'
            ],
            '6': ['北京市大兴县中医医院', '平谷县粮食局职工医院',
              '北京小汤山医院', '北京市南口长城医院', '北京市西城区白云路医院'
            ],
            '7': ['北京市西城区妇幼保健院', '北京市回民医院',
              '北京市宣武中医医院', '北京市宣武区陶然亭医院', '北京市宣武区白纸坊医院'
            ],
            '8': ['北京市崇文区儿童医院', '北京市崇文区中医医院',
              '北京市崇文区正大医院', '北京市崇文区前门医院', '北京市东城区第一人民医院'
            ],
            '9': ['北京市仁和医院', '北京市大兴区人民医院',
              '北京市昌平区沙河社区卫生服务中心', '北京市昌平区医院', '施甸县中医医院'
            ],
            '10': ['北京市丰台区南苑医院', '北京市丰台区卢沟桥医院',
              '304医院器材', '中国核工业北京四0一医院', '北京市丰台区铁营医院'
            ],
            '11': ['北京市仁和医院', '北京市大兴区人民医院',
              '北京市昌平区沙河社区卫生服务中心', '北京市昌平区医院', '施甸县中医医院'
            ],
            '12': ['北京市丰台区南苑医院', '北京市丰台区卢沟桥医院',
              '304医院器材', '中国核工业北京四0一医院', '北京市丰台区铁营医院'
            ],
          }
        },
        hospatilData: this.hospatilDatas(),
        productData2: [{
          productName: '阿司匹林',
          tradeName: '阿司匹林',
          type: '非剂型',
          desc: '12g*0.3ml粒',
          factryName: '阿斯蒂芬阿斯蒂芬',
          basicFlag: '基本药物',
          purchaseNum: '123123',
          purchasePrice: '123213',
          receiveNum: '12312',
          receivePrice: '123123'
        }],
        productData: [
          {
            productName: '阿司匹林',
            tradeName: '阿司匹林',
            type: '非剂型',
            desc: '12g*0.3ml粒',
            factryName: '阿斯蒂芬阿斯蒂芬',
            basicFlag: '基本药物',
            purchaseNum: '123123',
            purchasePrice: '123213',
            receiveNum: '12312',
            receivePrice: '123123'
          }, {
            productName: '阿司匹林',
            tradeName: '阿司匹林',
            type: '非剂型',
            desc: '12g*0.3ml粒',
            factryName: '阿斯蒂芬阿斯蒂芬',
            basicFlag: '基本药物',
            purchaseNum: '123123',
            purchasePrice: '123213',
            receiveNum: '12312',
            receivePrice: '123123'
          }, {
            productName: '阿司匹林',
            tradeName: '阿司匹林',
            type: '非剂型',
            desc: '12g*0.3ml粒',
            factryName: '阿斯蒂芬阿斯蒂芬',
            basicFlag: '基本药物',
            purchaseNum: '123123',
            purchasePrice: '123213',
            receiveNum: '12312',
            receivePrice: '123123'
          }, {
            productName: '阿司匹林',
            tradeName: '阿司匹林',
            type: '非剂型',
            desc: '12g*0.3ml粒',
            factryName: '阿斯蒂芬阿斯蒂芬',
            basicFlag: '基本药物',
            purchaseNum: '123123',
            purchasePrice: '123213',
            receiveNum: '12312',
            receivePrice: '123123'
          }, {
            productName: '阿司匹林',
            tradeName: '阿司匹林',
            type: '非剂型',
            desc: '12g*0.3ml粒',
            factryName: '阿斯蒂芬阿斯蒂芬',
            basicFlag: '基本药物',
            purchaseNum: '123123',
            purchasePrice: '123213',
            receiveNum: '12312',
            receivePrice: '123123'
          }],
        senderData: [
          {
            id: '12987122',
            senderName: '好滋好味鸡蛋仔1',
            purchaseNum: '123123213',
            purchasePrice: '123123213',
            receiveNum: '123123',
            receivePrice: '324234',
            shopId: '10333'
          }, {
            id: '12987122',
            senderName: '好滋好味鸡蛋仔2',
            purchaseNum: '123123213',
            purchasePrice: '123123213',
            receiveNum: '123123',
            receivePrice: '324234',
            shopId: '10333'
          }, {
            id: '12987122',
            senderName: '好滋好味鸡蛋仔3',
            purchaseNum: '123123213',
            purchasePrice: '123123213',
            receiveNum: '123123',
            receivePrice: '324234',
            shopId: '10333'
          }, {
            id: '12987122',
            senderName: '好滋好味鸡蛋仔4',
            purchaseNum: '123123213',
            purchasePrice: '123123213',
            receiveNum: '123123',
            receivePrice: '324234',
            shopId: '10333'
          }],
        purchaseData: [
          {
            id: '12987123',
            name: '北京航星机器制造有限公司北京东城航星医院',
            area: '东城区',
            level: '一级甲等',
            nature: '社区',
            number: '15',
            purchaseNum: '334566',
            purchasePrice: '937.36',
            receiveNum: '33629',
            receivePrice: '92.55',
            twoReceiveRate: '50%',
            receiveConfirm: '70%',
            baseRate: '80%',
            lincaiNum: '213',
            lincaiPrice: '123123',
            beianNum: '123',
            beiAnPrice: '654362',
            shopId: '10333'
          },
          {
            id: '12987124',
            name: '北京市东城区第二妇幼保健院',
            area: '西城区',
            level: '二级甲等',
            nature: '社区',
            number: '15',
            purchaseNum: '334566',
            purchasePrice: '937.36',
            receiveNum: '33629',
            receivePrice: '92.55',
            twoReceiveRate: '50%',
            receiveConfirm: '70%',
            baseRate: '80%',
            lincaiNum: '213',
            lincaiPrice: '123123',
            beianNum: '123',
            beiAnPrice: '654362',
            shopId: '10333'
          }, {
            id: '12987125',
            name: '中国新兴建设开发总公司北京中兴医院',
            area: '大兴区',
            level: '一级甲等',
            nature: '社区',
            number: '15',
            purchaseNum: '334566',
            purchasePrice: '937.36',
            receiveNum: '33629',
            receivePrice: '92.55',
            twoReceiveRate: '50%',
            receiveConfirm: '70%',
            baseRate: '80%',
            lincaiNum: '213',
            lincaiPrice: '123123',
            beianNum: '123',
            beiAnPrice: '654362',
            shopId: '10333'
          }, {
            id: '12987126',
            name: '冶金自动化研究设计院卫生所',
            area: '朝阳区',
            level: '二级丙等',
            nature: '社区',
            number: '15',
            purchaseNum: '334566',
            purchasePrice: '937.36',
            receiveNum: '33629',
            receivePrice: '92.55',
            twoReceiveRate: '50%',
            receiveConfirm: '70%',
            baseRate: '80%',
            lincaiNum: '213',
            lincaiPrice: '123123',
            beianNum: '123',
            beiAnPrice: '654362',
            shopId: '10333'
          }, {
            id: '12987127',
            name: '北京市社会福利医院',
            area: '通州区',
            level: '一级甲等',
            nature: '社区',
            number: '15',
            purchaseNum: '334566',
            purchasePrice: '937.36',
            receiveNum: '33629',
            receivePrice: '92.55',
            twoReceiveRate: '50%',
            receiveConfirm: '70%',
            baseRate: '80%',
            lincaiNum: '213',
            lincaiPrice: '123123',
            beianNum: '123',
            beiAnPrice: '654362',
            shopId: '10333'
          }, {
            id: '12987128',
            name: '中国建筑材料科学研究总院管庄东里医院',
            area: '海淀区',
            level: '二级丙等',
            nature: '社区',
            number: '15',
            purchaseNum: '334566',
            purchasePrice: '937.36',
            receiveNum: '33629',
            receivePrice: '92.55',
            twoReceiveRate: '50%',
            receiveConfirm: '70%',
            baseRate: '80%',
            lincaiNum: '213',
            lincaiPrice: '123123',
            beianNum: '123',
            beiAnPrice: '654362',
            shopId: '10333'
          }, {
            id: '12987129',
            name: '北京航星机器制造有限公司北京东城航星医院',
            area: '石景山区',
            level: '一级甲等',
            nature: '社区',
            number: '15',
            purchaseNum: '334566',
            purchasePrice: '937.36',
            receiveNum: '33629',
            receivePrice: '92.55',
            twoReceiveRate: '50%',
            receiveConfirm: '70%',
            baseRate: '80%',
            lincaiNum: '213',
            lincaiPrice: '123123',
            beianNum: '123',
            beiAnPrice: '654362',
            shopId: '10333'
          }, {
            id: '12987120',
            name: '北京市东城区急救站',
            area: '丰台区',
            level: '一级甲等',
            nature: '社区',
            number: '15',
            purchaseNum: '334566',
            purchasePrice: '937.36',
            receiveNum: '33629',
            receivePrice: '92.55',
            twoReceiveRate: '50%',
            receiveConfirm: '70%',
            baseRate: '80%',
            lincaiNum: '213',
            lincaiPrice: '123123',
            beianNum: '123',
            beiAnPrice: '654362',
            shopId: '10333'
          },],
      }
    },
    mounted() {
      this.getMouted();
    },
    methods: {
      hospatilDatas() {
        return {
          pageNum: 1,
          pageSize: 10,
          total: 8,
          pages: 1,
          list: []
        }
      },
      //左图标点击事件
      leftClick(row, index, id) {
        console.log(id);
        if (document.getElementById(id).className === 'el-icon-arrow-right') {
          document.getElementById(id).setAttribute('class', 'el-icon-arrow-down')
        } else {
          document.getElementById(id).setAttribute('class', 'el-icon-arrow-right');
        }
        var idl = id.replace('left', 'right');
        document.getElementById(idl).setAttribute('class', 'el-icon-arrow-left');
        this.$set(row, 'expand1', !row.expand1);
        this.$set(row, 'expand2', false);
        this.$set(row, 'left', true);
        this.$set(row, 'right', false);
      },
      //右图标点击事件
      rightClick(row, index, id) {
        if (document.getElementById(id).className === 'el-icon-arrow-left') {
          document.getElementById(id).setAttribute('class', 'el-icon-arrow-down')
        } else {
          document.getElementById(id).setAttribute('class', 'el-icon-arrow-left');
        }
        var idr = id.replace('right', 'left');
        document.getElementById(idr).setAttribute('class', 'el-icon-arrow-right');
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
            title: {
              text: '医院订购示意图',
              subtext: '',
              left: 'center'
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
      initData() {
        getFirstDateOfYear2();
        return {
          pickTime: 'month',
          packDate: getFirstDateOfYear2(),
          reponseData: getFirstDateOfYear2(),
          senderData: getFirstDateOfYear2(),
          productData: getFirstDateOfYear2(),
          basicPurchaseData: getFirstDateOfYear2(),
        }
      },
      findDifTimeUnitData(e) {
        if (e) {
          this.chartForm.pickTime = e.target.defaultValue;
        }
        this.initData();
        this.getMouted('1');
      },
      getMouted(type) {
        if (type === '0') {
          this.chartForm.reponseData = this.chartForm.packDate;
          this.chartForm.productData = this.chartForm.packDate;
          this.chartForm.basicPurchaseData = this.chartForm.packDate;
          this.chartForm.senderData = this.chartForm.packDate;
        }
        // this.getLineStack();
        this.nowDateTime();
        this.getBarStack();
        this.getCategory();
        // this.getSenderRate();
        // this.getBaseDrug();
      },
      getLineStack() {
        var myChart = echarts.init(document.getElementById("box"));
        myChart.showLoading();
        var option = {
          tooltip: {
            trigger: 'axis',
          },
          toolbox: {
            show: true,
            iconStyle: {
              borderColor: '#44cef6'//设置工具箱图标颜色
            },
            feature: {
              mark: {show: true},
              magicType: {show: true, type: ['line', 'bar']},
              restore: {show: true},
              saveAsImage: {
                show: true,
                backgroundColor: '#ccc'
              }
            }
          },
          grid: {
            left: '3%',
            right: '2%',
            top: '15%',
            bottom: '5%',
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
              data: ['17-08', '17-09', '17-10', '17-11', '17-12', '18-01', '18-02', '18-03', '18-04', '18-05', '18-06', '18-07'],
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
              color: ['#009966'],
              smooth: true,
              data: [40.32, 50.62, 58.64, 66.73, 68.95, 72.32, 76.45, 70.32, 50.62, 58.64, 66.73, 68.95,],
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
            },
            {
              name: '月日均到货金额(万元)',
              type: 'bar',
              color: ['#FFFF66'],
              smooth: true,
              data: [39.32, 48.62, 50.64, 56.73, 58.95, 62.32, 66.45, 60.64, 46.73, 58.45, 62.32, 66.45],
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
            },
            {
              name: '到货率(%)',
              type: 'line',
              yAxisIndex: 1,
              barWidth: '45%',
              color: '#FF6600',
              smooth: true,   //关键点，为true是不支持虚线的，实线就用true
              /*itemStyle:{
                normal:{
                  lineStyle:{
                    color:'#CD00CD',
                    width:2,
                    type:'dotted'  //'dotted'虚线 'solid'实线
                  }
                }
              },*/
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
      getBarStack() {
        var myChart = echarts.init(document.getElementById("bar"));
        myChart.clear();
        // 绘制图表
        let options = [];
        for (let key in this.dataMap2.basicNameData) {
          options.push({
            yAxis: {
              data: this.dataMap2.basicNameData[key]
            },
            series: [
              {
                data: this.dataMap2.basicValueData[key]
              }
            ],
          })
        }
        var spec = this.spec;
        myChart.setOption({

          baseOption: {
            timeline: {
              left: 0,
              right: 0,
              axisType: 'category',
              autoPlay: false,
              currentIndex: 6,
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
              label: {
                color: '#fff'
              },
              lineStyle: {
                borderColor: '#fff'
              },
              controlStyle: {
                showPlayBtn: false,
                borderColor: '#fff',
                emphasis: {
                  color: 'transparent',
                  borderColor: '#edd1d8'
                }
              },
              checkpointStyle: {
                color: '#edd1d8',
                borderColor: 'rgba(237,209,216,.5)'
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
                var res = '<div><p>' + params[0].name + '</p></div>';
                res += '<p>&nbsp;&nbsp;&nbsp;&nbsp;2周到货率' + ': 66.43 %</p>';
                return res;
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              top: '15%',
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
                },
                formatter: function (value, index) {
                  return value + ' %';
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
                type: 'bar',
                itemStyle: {
                  normal: {
                    color: '#574266',
                    barBorderRadius: [0, 4, 4, 0]
                  },
                },
                markLine: {
                  data: [
                    {
                      type: 'average',
                      name: '平均值',
                      lineStyle: {
                        color: '#edd1d8'
                      },
                      label: {
                        show: true,
                        position: 'middle',
                        formatter: '月平均2周发货率：{c} % '
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
      getCategory() {
        var myChart = echarts.init(document.getElementById("areaBasic"));
        myChart.clear();
        // 绘制图表
        let options = [];
        for (let key in this.dataMap2.nameData) {
          options.push({
            yAxis: {
              data: this.dataMap2.nameData[key]
            },
            series: [
              {
                data: this.dataMap2.valueData[key]
              }
            ],
          })
        }
        var baseSpec = this.baseSpec;
        myChart.setOption({
          baseOption: {
            timeline: {
              left: 0,
              right: 0,
              axisType: 'category',
              autoPlay: false,
              currentIndex: 6,
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
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
                  borderColor: '#44ecff'
                }
              },
              checkpointStyle: {
                color: '#44ecff',
                borderColor: 'rgba(68,236,255,.5)'
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
                var res = '<div><p>' + params[0].name + '</p></div>';
                //res+='<p>&nbsp;&nbsp;&nbsp;&nbsp;基药订购金额'+':'+baseSpec[[params[0].dataIndex]].value+'万</p>'
                res += '<p>&nbsp;&nbsp;&nbsp;&nbsp;基药订购占比' + ': 46 %</p>';
                return res;
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              top: '15%',
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
                },
                formatter: function (value, index) {
                  return value + ' %';
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
                type: 'bar',
                itemStyle: {
                  normal: {
                    color: '#2e4e7e',
                    barBorderRadius: [0, 4, 4, 0]
                  },
                },
                markLine: {
                  data: [
                    {
                      type: 'average', name: '平均值', lineStyle: {
                        color: '#44ecff'
                      },
                      label: {
                        show: true,
                        position: 'middle',
                        formatter: '月平均基药占比：{c} % '
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
        var spec = this.spec;
        myChart.setOption({

          baseOption: {
            timeline: {
              left: 0,
              right: 0,
              axisType: 'category',
              autoPlay: false,
              currentIndex: 6,
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
              label: {
                color: '#fff'
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
                var res = '<div><p>' + params[0].name + '</p></div>';
                res += '<p>&nbsp;&nbsp;&nbsp;&nbsp;产品订购金额' + ':' + spec[[params[0].dataIndex]].value + '万</p>';
                res += '<p>&nbsp;&nbsp;&nbsp;&nbsp;产品规格' + ':' + spec[[params[0].dataIndex]].type + '</p>';
                res += '<p>&nbsp;&nbsp;&nbsp;&nbsp;生产企业' + ':' + spec[[params[0].dataIndex]].factoryName + '</p>';
                return res;
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              top: '15%',
              bottom: '15%',
              containLabel: true
            },
            legend: {
              data: ['产品订购金额'],
              textStyle: {
                color: '#fff'
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
                  return value + ' 万';
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
                    color: '#065279',
                    barBorderRadius: [0, 4, 4, 0]
                  },
                },
                markLine: {
                  data: [
                    {
                      type: 'average', name: '平均值', lineStyle: {
                        color: '#70f3ff'
                      },
                      label: {
                        show: true,
                        position: 'middle',
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
      getBaseDrug() {
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
        var baseSpec = this.baseSpec;
        myChart.setOption({
          baseOption: {
            timeline: {
              left: 0,
              right: 0,
              axisType: 'category',
              autoPlay: false,
              currentIndex: 6,
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
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
                  borderColor: '#78fea9'
                }
              },
              checkpointStyle: {
                color: '#78fea9',
                borderColor: 'rgba(120,254,169,.5)'
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
                var res = '<div><p>' + params[0].name + '</p></div>';
                res += '<p>&nbsp;&nbsp;&nbsp;&nbsp;基药订购金额' + ':' + baseSpec[[params[0].dataIndex]].value + '万</p>';
                res += '<p>&nbsp;&nbsp;&nbsp;&nbsp;产品规格' + ':' + baseSpec[[params[0].dataIndex]].type + '</p>';
                res += '<p>&nbsp;&nbsp;&nbsp;&nbsp;生产企业' + ':' + baseSpec[[params[0].dataIndex]].factoryName + '</p>';
                return res;
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              top: '15%',
              bottom: '15%',
              containLabel: true
            },
            legend: {
              data: ['基药订购金额'],
              textStyle: {
                color: '#fff'
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
                  return value + ' 万';
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
                    color: '#426666',
                    barBorderRadius: [0, 4, 4, 0]
                  },
                },
                markLine: {
                  data: [
                    {
                      type: 'average',
                      name: '平均值',
                      lineStyle: {
                        color: '#78fea9'
                      },
                      label: {
                        show: true,
                        position: 'middle',
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
      dataFormatter(obj) {
        return obj;
      }
    }
  }
</script>
