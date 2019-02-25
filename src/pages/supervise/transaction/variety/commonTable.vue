<template>
  <dl class="mainbox">
    <dd>
      <div class="s-form">
        <el-form>
          <el-input v-model="queryData.medicalName" placeholder="商品名"></el-input>
          <el-input v-model="queryData.factoryName" placeholder="生产企业"></el-input>
          <span class="date-group">
             <el-date-picker
               size="small"
               type="date"
               format="yyyy-MM-dd"
               value-format="yyyy-MM-dd"
               placeholder="开始日期"
               :editable="false"
               v-model="queryData.beginDate"
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
              v-model="queryData.endDate"
            >
              </el-date-picker>
           </span>
          <el-button @click="handleQuery()" size="small">查询</el-button>
          <el-button @click="queryData =metaQuery()" size="small">重置</el-button>
          <el-button @click="" size="small">导出</el-button>
        </el-form>
      </div>
      <div class="tableset" style="overflow: auto; width: 100%;">
        <table class="s-table">
          <thead>
          <tr>
            <th width="30"></th>
            <th>产品名称</th>
            <th width="200">商品名</th>
            <th width="100">剂型</th>
            <th>产品信息</th>
            <th width="90">基药标记</th>
            <th width="120">订购数量</th>
            <th width="120">订购金额（万元）</th>
            <th width="120">到货数量</th>
            <th width="130">到货金额（万元）</th>
            <th width="30"></th>
          </tr>
          </thead>
          <tbody>
          <template v-for="(row,index) in resData.list">
            <tr>
              <td @click="leftClick(row,index)" align="center" class="nopadding" title="查看医院"><i
                class="el-icon-arrow-right" :id="row.productId+'left'"></i></td>
              <td>{{row.productName}}</td>
              <td>{{row.medicalName}}</td>
              <td>{{row.doseageForm}}</td>
              <td>
                <el-tooltip placement="top" :enterable="false">
                  <!--气泡内容（必须放在slot="content"内）,布局与源内容保持一致-->
                  <div slot="content">
                    <div class="text-inline">{{row.spec}}</div>
                    <div class="text-inline">{{row.factoryName}}</div>
                  </div>
                  <!--源内容（必须放在class="el-tooltip-box"内）-->
                  <div class="el-tooltip-box">
                    <!--加class="text-inline"确保内容不折行-->
                    <div class="text-inline">{{row.spec}}</div>
                    <div class="text-inline">{{row.factoryName}}</div>
                  </div>
                </el-tooltip>
              </td>
              <td align="center">{{row.gjjyFlag}}</td>
              <td align="right">{{row.requestNum}}</td>
              <td align="right">{{row.requestPrice}}</td>
              <td align="right">{{row.receiveNum}}</td>
              <td align="right">{{row.receivePrice}}</td>
              <td @click="rightClick(row,index)" align="center" class="nopadding" title="查看配送"><i
                class="el-icon-arrow-left" :id="row.productId+'right'"></i></td>
            </tr>
            <tr v-if="row.expand1==true||row.expand2==true" class="s-table-extend">
              <td colspan="11">
                <el-form class="s-form" v-if="row.left">
                  <el-input v-model="queryHosData.orgName" placeholder="医院名称"></el-input>
                  <span class="date-group">
               <el-date-picker
                 size="small"
                 type="date"
                 format="yyyy-MM-dd"
                 value-format="yyyy-MM-dd"
                 placeholder="开始日期"
                 :editable="false"
                 v-model="queryHosData.beginDate">
                </el-date-picker>
              至
              <el-date-picker
                size="small"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="结束日期"
                :editable="false"
                v-model="queryHosData.endDate">
                </el-date-picker>
           </span>
                  <el-button @click="searchHospatil" size="small">查询</el-button>
                  <el-button @click="queryHosData=queryHosDatas()" size="small">重置</el-button>
                  <el-button @click="" size="small">导出</el-button>
                </el-form>
                <el-table :data="hospatilData.list" stripe border tooltip-effect="dark" v-if="row.left" key="hospital">
                  <el-table-column type="expand">
                    <template slot-scope="props">
                      <el-form class="s-form">
                        <el-input v-model="querySenderData.orgName" placeholder="配送企业名称"></el-input>
                        <span class="date-group">
                          <el-date-picker
                            size="small"
                            type="date"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="开始日期"
                            :editable="false"
                            v-model="querySenderData.proStartDate">
                          </el-date-picker>
                          至
                          <el-date-picker
                            size="small"
                            type="date"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="结束日期"
                            :editable="false"
                            v-model="querySenderData.proEndDate">
                            </el-date-picker>
                        </span>
                        <el-button @click="searchSender" size="small">查询</el-button>
                        <el-button @click="querySenderData=senderQuery()" size="small">重置</el-button>
                        <el-button @click="" size="small">导出</el-button>
                      </el-form>
                      <el-table :data="senderDb.list" stripe border tooltip-effect="dark" key="product">
                        <el-table-column prop="orgName" label="配送企业" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="tradeName" label="订单数" align="right" width="120">
                          <template slot-scope="scope">
                            <span>4396</span>
                          </template>
                        </el-table-column>
                        <el-table-column prop="doseageFormName" label="响应订单数" align="right" width="120">
                          <template slot-scope="scope">
                            <span>2458</span>
                          </template>
                        </el-table-column>
                        <el-table-column prop="drugStorage" label="2小时响应率" align="right" width="100">
                          <template slot-scope="scope">
                            <span>78%</span>
                          </template>
                        </el-table-column>
                        <el-table-column prop="requestNum" label="订购数量" align="right" width="120"></el-table-column>
                        <el-table-column prop="requestPrice" label="订购金额" align="right" width="180"></el-table-column>
                        <el-table-column prop="receivePrice" label="3天发货金额" align="right" width="180">
                          <template slot-scope="scope">
                            <span>{{ priceFormat(scope.row.requestPrice)}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column prop="receiveRate" label="3天发货率" align="right" width="100">
                          <template slot-scope="scope">
                            <span>78%</span>
                          </template>
                        </el-table-column>
                      </el-table>
                      <div class="pagebox">
                        <el-pagination
                          layout="total, sizes, prev, pager, next, jumper"
                          :page-sizes="[10, 20, 30]"
                          @size-change="handleSizeChange"
                          @current-change="handleCurrentChange"
                          :total="senderDb.total"
                          :page-size="senderDb.pageSize"
                          :page-count="senderDb.pages"
                          :current-page.sync="senderDb.pageNum">
                        </el-pagination>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="orgName" label="医院名称" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="area" label="区域" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span>西城区</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="level" label="等级" align="center" width="100">
                    <template slot-scope="scope">
                      <span>一级医院</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="nature" label="性质" align="center" width="90">
                    <template slot-scope="scope">
                      <span>公立</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="productTypeNum" label="品种数" align="right" width="80">
                    <template slot-scope="scope">
                      <span>22</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="requestNum" label="订购数量" align="right" width="120"></el-table-column>
                  <el-table-column label="订购金额" align="right" width="100">
                    <template slot-scope="scope">
                      <span>{{ priceFormat(scope.row.requestPrice)}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="receiveNum" label="到货数量" align="right" width="120"></el-table-column>
                  <el-table-column label="到货金额" align="right" width="120">
                    <template slot-scope="scope">
                      <span>{{ priceFormat(scope.row.receivePrice)}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="到货率" align="right" width="80">
                    <template slot-scope="scope">
                      <span>78%</span>
                    </template>
                  </el-table-column>
                </el-table>
                <el-form class="s-form" v-if="row.right">
                  <el-input v-model="querySenderData.orgName" placeholder="配送企业名称"></el-input>
                  <span class="date-group">
               <el-date-picker
                 size="small"
                 type="date"
                 format="yyyy-MM-dd"
                 value-format="yyyy-MM-dd"
                 placeholder="开始日期"
                 :editable="false"
                 v-model="querySenderData.beginDate">
                </el-date-picker>
                  至
                  <el-date-picker
                    size="small"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="结束日期"
                    :editable="false"
                    v-model="querySenderData.endDate">
                    </el-date-picker>
               </span>
                  <el-button @click="searchSender" size="small">查询</el-button>
                  <el-button @click="querySenderData=senderQuery()" size="small">重置</el-button>
                  <el-button @click="" size="small">导出</el-button>
                </el-form>
                <el-table :data="senderDb.list" stripe border tooltip-effect="dark" v-if="row.right" key="product">
                  <el-table-column type="expand">
                    <template slot-scope="props">
                      <el-form class="s-form">
                        <el-input v-model="queryHosData.orgName" placeholder="医院名称"></el-input>
                        <span class="date-group">
               <el-date-picker
                 size="small"
                 type="date"
                 format="yyyy-MM-dd"
                 value-format="yyyy-MM-dd"
                 placeholder="开始日期"
                 :editable="false"
                 v-model="queryHosData.beginDate">
                </el-date-picker>
              至
              <el-date-picker
                size="small"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="结束日期"
                :editable="false"
                v-model="queryHosData.endDate">
                </el-date-picker>
           </span>
                        <el-button @click="searchHospatil" size="small">查询</el-button>
                        <el-button @click="queryHosData=queryHosDatas()" size="small">重置</el-button>
                        <el-button @click="" size="small">导出</el-button>
                      </el-form>
                      <el-table :data="hospatilData.list" stripe border tooltip-effect="dark" key="hospital">
                        <el-table-column prop="orgName" label="医院名称" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="area" label="区域" show-overflow-tooltip>
                          <template slot-scope="scope">
                            <span>西城区</span>
                          </template>
                        </el-table-column>
                        <el-table-column prop="level" label="等级" align="center" width="100">
                          <template slot-scope="scope">
                            <span>一级医院</span>
                          </template>
                        </el-table-column>
                        <el-table-column prop="nature" label="性质" align="center" width="100">
                          <template slot-scope="scope">
                            <span>公立</span>
                          </template>
                        </el-table-column>
                        <el-table-column prop="productTypeNum" label="品种数" align="right" width="100">
                          <template slot-scope="scope">
                            <span>22</span>
                          </template>
                        </el-table-column>
                        <el-table-column prop="requestNum" label="订购数量" align="right" width="120"></el-table-column>
                        <el-table-column label="订购金额" align="right" width="120">
                          <template slot-scope="scope">
                            <span>{{ priceFormat(scope.row.requestPrice)}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column prop="receiveNum" label="到货数量" align="right" width="120"></el-table-column>
                        <el-table-column label="到货金额" align="right" header-align="left" width="120">
                          <template slot-scope="scope">
                            <span>{{ priceFormat(scope.row.receivePrice)}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="到货率" align="right" header-align="left" width="100">
                          <template slot-scope="scope">
                            <span>78%</span>
                          </template>
                        </el-table-column>
                      </el-table>
                      <div class="pagebox">
                        <el-pagination
                          layout="total, sizes, prev, pager, next, jumper"
                          :page-sizes="[10, 20, 30]"
                          @size-change="handleRightSizeChange"
                          @current-change="handleRightCurrentChange"
                          :total="hospatilData.total"
                          :page-size="hospatilData.pageSize"
                          :page-count="hospatilData.pages"
                          :current-page.sync="hospatilData.pageNum">
                        </el-pagination>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="orgName" label="配送企业" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="tradeName" label="订单数" width="120">
                    <template slot-scope="scope">
                      <span>4396</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="doseageFormName" label="响应订单数" width="100">
                    <template slot-scope="scope">
                      <span>2458</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="drugStorage" label="2小时响应率" align="right" width="100">
                    <template slot-scope="scope">
                      <span>78%</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="requestNum" label="订购数量" align="right" width="120"></el-table-column>
                  <el-table-column prop="requestPrice" label="订购金额" align="right" width="120"></el-table-column>
                  <el-table-column prop="receivePrice" label="3天发货金额" align="right" width="160">
                    <template slot-scope="scope">
                      <span>{{ priceFormat(scope.row.requestPrice)}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="receiveRate" label="3天发货率" align="right" width="100">
                    <template slot-scope="scope">
                      <span>78%</span>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="pagebox" v-if="row.left">
                  <el-pagination
                    layout="total, sizes, prev, pager, next, jumper"
                    :page-sizes="[10, 20, 30]"
                    @size-change="handleRightSizeChange"
                    @current-change="handleRightCurrentChange"
                    :total="hospatilData.total"
                    :page-size="hospatilData.pageSize"
                    :page-count="hospatilData.pages"
                    :current-page.sync="hospatilData.pageNum">
                  </el-pagination>
                </div>
                <div class="pagebox" v-if="row.right">
                  <el-pagination
                    layout="total, sizes, prev, pager, next, jumper"
                    :page-sizes="[10, 20, 30]"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :total="senderDb.total"
                    :page-size="senderDb.pageSize"
                    :page-count="senderDb.pages"
                    :current-page.sync="senderDb.pageNum">
                  </el-pagination>
                </div>
              </td>
            </tr>
          </template>
          </tbody>
        </table>
        <div v-if="resData.list.length===0" class="el-table__empty-block">
          <span class="el-table__empty-text">暂无数据</span>
        </div>
      </div>

      <div class="pagebox">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSendSizeChange"
          @current-change="handleSendCurrentChange"
          :page-sizes="[10, 20, 30]"
          :total="resData.total"
          :page-size="resData.pageSize"
          :page-count="resData.pages"
          :current-page.sync="resData.pageNum">
        </el-pagination>
      </div>
    </dd>
  </dl>
</template>

<script>
  import {
    varietyPurchase,
    findHospitalt,
    findSender,
  } from 'src/axios/supervise/supervise-transaction/variety'
  import {priceFormat} from "src/utils/index"

  export default {
    name: "common-table",
    data() {
      return {
        productId: '',
        resData: this.metaData(),
        queryHosData: this.queryHosDatas(),
        hospatilData: this.hospatilDatas(),
        // queryData: this.queryDatas(),
        queryData: this.metaQuery(), // 查询初始化
        senderDb: this.senderData(),
        querySenderData: this.senderQuery(),
      }
    },
    mounted() {
      this.searchProducts();
    },
    methods: {
      senderQuery() {
        return {
          productId: '',
          orgName: '',
          beginDate: undefined,
          endDate: undefined
        }
      },
      handleQuery() {
        this.resData = this.metaData();
        this.searchProducts();
      },
      metaQuery() { // 查询数据封装格式
        return {
          medicalName: '',
          factoryName: '',
          orgName: '',
          beginDate: undefined,
          endDate: undefined

        }
      },
      senderData() {
        return {
          pageNum: 1,
          pageSize: 20,
          total: 0,
          pages: 0,
          list: []
        }
      },
      priceFormat,
      handleSizeChange(val) {
        this.resData.pageSize = val;
        this.selectSender(this.queryData.id, '0')
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val;
        this.selectSender(this.queryData.id, '0')
      },
      handleRightSizeChange(val) {
        this.hospatilData.pageSize = val;
        this.selectHospital(this.productId, '1');
      },
      handleRightCurrentChange(val) {
        this.hospatilData.pageNum = val;
        this.selectHospital(this.productId, '1');
      },
      handleSendSizeChange(val) {
        this.resData.pageSize = val;
        this.searchSender()
      },
      handleSendCurrentChange(val) {
        this.resData.pageNum = val;
        this.searchSender()
      },
      queryHosDatas() {
        return {
          id: '',
          orgName: '',
          beginDate: '',
          endDate: ''
        }
      },
      hospatilDatas() {
        return {
          pageNum: 1,
          pageSize: 10,
          total: 10,
          pages: 1,
          list: []
        }
      },
      metaData() { // 前后台交互数据封装格式
        return {
          pageNum: 1,
          pageSize: 20,
          total: 20,
          pages: 1,
          list: []
        }
      },
      queryDatas() {
        return {
          id: '',
          orgName: '',
          beginDate: '',
          endDate: '',
          productName: '',
          proStartDate: '',
          proEndDate: ''
        }
      },
      searchProducts() {
        varietyPurchase(this.resData, this.queryData).then(res => {
          this.resData = res.data;
        })
      },
      searchSender() {
        this.selectSender(this.productId, '1');
      },
      searchHospatil() {
        this.selectHospital(this.productId, '1');
      },
      leftClick(row, index) {
        this.$set(row, 'expand1', !row.expand1);
        this.$set(row, 'expand2', false);
        this.$set(row, 'left', true);
        this.$set(row, 'right', false);
        if (document.getElementById(row.productId + 'left').className === 'el-icon-arrow-right') {
          document.getElementById(row.productId + 'left').className = 'el-icon-arrow-down'
        } else {
          document.getElementById(row.productId + 'left').className = 'el-icon-arrow-right'
        }
        document.getElementById(row.productId + 'right').className = 'el-icon-arrow-left';
        if (document.getElementById(row.productId + 'left').className === 'el-icon-arrow-down') {
          this.selectHospital(row.productId, '0');
          this.selectSender(row.productId, '0')
        }
      },
      rightClick(row, index) {
        this.$set(row, 'expand1', false);
        this.$set(row, 'expand2', !row.expand2);
        this.$set(row, 'left', false);
        this.$set(row, 'right', true);
        if (document.getElementById(row.productId + 'right').className === 'el-icon-arrow-left') {
          document.getElementById(row.productId + 'right').className = 'el-icon-arrow-down'
        } else {
          document.getElementById(row.productId + 'right').className = 'el-icon-arrow-left'
        }
        document.getElementById(row.productId + 'left').className = 'el-icon-arrow-right';
        if (document.getElementById(row.productId + 'right').className === 'el-icon-arrow-down') {
          this.selectSender(row.productId, '0')
        }
      },
      selectSender(productId, index) {
        this.productId = productId;
        this.querySenderData.productId = productId;
        if (index == '0') {
          this.querySenderData.beginDate = this.queryHosData.beginDate;
          this.querySenderData.endDate = this.queryHosData.endDate;
        }
        findSender(this.senderDb, this.querySenderData).then(res => {
          this.senderDb = res.data;
          0 === this.senderDb.pageNum ? this.senderDb.pageNum = 1 : null;
        })
      },
      selectHospital(productId, index) {
        this.productId = productId;
        this.queryHosData.productId = productId;
        if (index == '0') {
          this.queryHosData.beginDate = this.queryData.beginDate;
          this.queryHosData.endDate = this.queryData.endDate;
        }
        findHospitalt(this.hospatilData, this.queryHosData).then(res => {
          this.hospatilData = res.data;
          0 === this.hospatilData.pageNum ? this.hospatilData.pageNum = 1 : null;
        })

      },
    },
  }
</script>

<style scoped>

</style>
