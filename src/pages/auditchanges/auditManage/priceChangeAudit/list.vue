<template>
  <!-- 表格 -->
  <div class="tab-box">
    <el-tabs v-model="activeName" @tab-click="toChange">
      <el-tab-pane label="产品价格申报审核" name="first" />
      <el-tab-pane label="产品价格变更审核" name="second" />
    </el-tabs>
    <!-- 表格查询表单 -->
    <div class="el-tabs__content">
      <div class="tablebox">
          <el-form ref="query" :model="query" label-position="right" size="small" class="table-form" :inline="true">
                    <el-form-item>
                      <el-input v-model="query.name" placeholder="产品名称" size="small"></el-input>
                    </el-form-item>
              <el-form-item >
                 <el-input v-model="query.dosage" placeholder="剂型" @keyup.enter.native="searchEnterFun" size="small"></el-input>
              </el-form-item>
              <!--<el-form-item>-->
                <!--<el-input v-model="query.dosage" placeholder="剂型" @keyup.enter.native="searchEnterFun" size="small"></el-input>-->
              <!--</el-form-item>-->
              <el-form-item>
                <el-input v-model="query.specification" placeholder="规格" @keyup.enter.native="searchEnterFun" size="small"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="query.manufacture" placeholder="生产企业" @keyup.enter.native="searchEnterFun" size="small"></el-input>
              </el-form-item>
              <el-form-item>
                <el-select v-model="query.auditStep" placeholder="全部" size="small">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
                <el-button type="warning" @click="restQuery" size="small">重置</el-button>
                <el-button @click="exportExcel" size="small">导出</el-button>
              </el-form-item>


          </el-form>

        <div class="tableset">
          <el-table :data="resData.list" border stripe>
            <!--<el-table-column label="产品名称">
              <template slot-scope="scope">
                <div>
                  <div class="text-inline">{{scope.row.productName}}</div>
                  <div class="text-inline">{{scope.row.mixDosage}}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="产品信息">
              <template slot-scope="scope">
                <div class="pro-details">
                  <div class="text-inline">{{scope.row.combined}}&nbsp;&nbsp;{{scope.row.wrap}}</div>
                  <div class="text-inline">{{scope.row.abbr}}</div>
                </div>
              </template>
            </el-table-column>-->


            <el-table-column label="产品名称">
              <template slot-scope="scope">
                <span>{{ scope.row.productName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="商品名">
              <template slot-scope="scope">
                <span>{{ scope.row.goodsName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="剂型">
              <template slot-scope="scope">
                <span>{{ scope.row.dosage }}</span>
              </template>
            </el-table-column>
            <el-table-column label="规格">
              <template slot-scope="scope">
                <span>{{ scope.row.specification }}</span>
              </template>
            </el-table-column>
            <el-table-column align="right" header-align="left" width="60px" label="转换比">
              <template slot-scope="scope">
                <span>{{ scope.row.conversion }}</span>
              </template>
            </el-table-column>
            <el-table-column label="单位">
              <template slot-scope="scope">
                <span>{{ scope.row.units }}</span>
              </template>
            </el-table-column>
            <el-table-column label="包材">
              <template slot-scope="scope">
                <span>{{ scope.row.packingMaterials }}</span>
              </template>
            </el-table-column>
            <el-table-column label="生产企业">
              <template slot-scope="scope">
                <span>{{ scope.row.manufacture }}</span>
              </template>
            </el-table-column>
            <el-table-column label="申报时间">
              <template slot-scope="scope">
                <span>{{ scope.row.declareDate | dateConvert}}</span>
              </template>
            </el-table-column>
            <el-table-column label="质疑数量">
              <template slot-scope="scope">
                <span>{{ scope.row.questionNum }}</span>
              </template>
            </el-table-column>
            <el-table-column label="审核状态">
              <template slot-scope="scope">
                <span>{{ scope.row.auditStep | auditStepConvert }}</span>
              </template>
            </el-table-column>
            <el-table-column label="审核结果">
              <template slot-scope="scope">
                <span>{{ scope.row.auditResult | auditResultConvert}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100px">
              <template slot-scope="scope">
                <div class="operates">
                  <span><a class="operation-btn"
                           @click="detail(scope.row.requestCode,scope.row.projectProductId)">详情</a></span>
                  <!--<span><a class="operation-btn" v-if=" scope.row.state == '5'"-->
                    <span><a class="operation-btn" v-if="scope.row.canAudit=='1' && scope.row.state == '5'"
                           @click="audit(scope.row.requestCode,scope.row.projectProductId)">审核
                </a></span>
                </div>


              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 表格分页 -->
        <div class="pagebox">
          <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
                         @current-change="handleCurrentChange" :page-sizes="[10, 20, 30]" :total="resData.total"
                         :page-size="resData.pageSize" :page-count="resData.pages" :current-page.sync="resData.pageNum">
          </el-pagination>
        </div>
      </div>
    </div>
    <audit ref="audit" v-if="auditShow"></audit>
    <detail ref="detail" v-if="detailShow"></detail>
  </div>
</template>

<script>
  import {
    queryProjectCheckCount,
    changesAudits,
    changeExport
  } from 'src/axios/auditchanges/auditManage/price'
  // import {keyBoardEnter} from "src/utils";

  import moment from 'moment'
  import audit from 'src/pages/auditchanges/auditManage/priceChangeAudit/audit'
  import detail from 'src/pages/auditchanges/auditManage/priceChangeAudit/detail'
  import fileUpload from 'js-file-download'

  export default {
    components: {
      audit, detail
    },
    data() {
      return {
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        activeName: 'second',
        options: [{
          value: '',
          label: '全部'
        }, {
          value: '0',
          label: '未审核'
        }, {
          value: '1',
          label: '一审'
        }, {
          value: '2',
          label: '二审'
        }, {
          value: '3',
          label: '三审'
        }, {
          value: '4',
          label: '四审'
        }, {
          value: '5',
          label: '五审'
        }],
        auditShow: false,
        detailShow: false,
      }
    },
    created() {
      queryProjectCheckCount().then(res => {
        this.options.length = res.data + 2;
        console.log(this.options)
      });
      this.list();
    },
    methods: {
      toChange(t) {
        if(t.name == "first") {
          this.$router.push('/AUDIT/auditManage/priceDeclareAudit');
        }
      },
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData() {
        return {
          pageNum: 1,
          pageSize: 10,
          size: undefined,
          startRow: undefined,
          endRow: undefined,
          total: undefined,
          pages: undefined,
          prePage: undefined,
          nextPage: undefined,
          isFirstPage: true,
          isLastPage: undefined,
          hasPreviousPage: undefined,
          hasNextPage: undefined,
          navigatePages: undefined,
          navigatepageNums: undefined,
          navigateFirstPage: undefined,
          navigateLastPage: undefined,
          firstPage: undefined,
          lastPage: undefined,
          list: undefined
        }
      },
      metaQuery() { // 表单查询数据初始化
        let obj = {
          //查询封装的数据
          name: undefined,
          dosage: undefined,
          specification: undefined,
          manufacture: undefined,
          auditStep: undefined
        }
        if(sessionStorage.getItem('query')){
          obj = JSON.parse(sessionStorage.getItem('query'))
        }
        return obj
      },
      handleQuery() {
        this.list()
      },
      restQuery() {//重置
        sessionStorage.removeItem('query')
        this.query = this.metaQuery();
        this.list();
      },
      // //查询
      // searchEnterFun(e){
      //   this.resData.pageNum=1;
      //   keyBoardEnter(e, () => {
      //     this.list();
      //   })
      // },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      list() {
        changesAudits(this.resData, this.query).then(res => {
          this.resData = res.data;
          console.log(this.resData)
          if (this.resData.list.length == 0) {
            this.resData.pageNum = 1;
          }
        })
      },
      exportExcel(){
        changeExport(this.query).then(res => {
          let headers = res.headers;
          let title = ""
          if (!title) {
            const fileName = headers['content-disposition'];
            title = fileName.includes('filename=') ? decodeURI(fileName.split('=')[1]) : '下载的文件';
          }
          fileUpload(res.data, title, "application/vnd.ms-excel")
        })
      },
      // ************************
      handleSizeChange(val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val
        this.list()
      },
      audit(requestCode, projectProductId) {
        this.auditShow = true;
        this.$nextTick(() => {
          this.$refs.audit.list(requestCode, projectProductId)
        })
      },
      detail(id, projectProductId) {
        this.detailShow = true;
        this.$nextTick(() => {
          this.$refs.detail.list(id, projectProductId)
        })
      }
    },
    filters: {
      dateConvert(value) {
        if (value == null || value == '' || value == 'undefind') {
          return ''
        } else {
          return moment(value).format('YYYY-MM-DD HH:mm')
        }
      },
      auditStepConvert(status) {
        if (status == null || status == '' || status == 'underfind' || status == '0') {
          return '未审核'
        } else {
          if(status == '1'){
            status = '一'
          }
          else if(status == '2'){
            status = '二'
          }
          else if(status == '3'){
            status = '三'
          }
          else if(status == '4'){
            status = '四'
          }
          else if(status == '5'){
            status = '五'
          }
          return status+'审'
        }
      },
      auditResultConvert(status) {
        if (status == null || status == '' || status == 'underfind') {
          return ''
        } else {
          if (status == '1') {
            return "通过";
          } else if (status == '2') {
            return "待确认";
          } else if (status == '3') {
            return "未通过";
          }
        }
      },
    }
  }
</script>
