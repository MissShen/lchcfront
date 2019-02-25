<template>
  <div class="tab-box">

   <!-- <el-tabs v-model="activeName" @tab-click="toChange">
      <el-tab-pane label="企业信息申报质疑" name="first" />
      <el-tab-pane label="企业信息变更质疑" name="second" />
    </el-tabs>-->
    <el-tabs v-model="activeName" @tab-click="toChange">
      <el-tab-pane label="企业申报" name="first" />
      <el-tab-pane label="企业变更" name="second" />
      <el-tab-pane label="企业质疑记录" name="three" />
     <!-- <el-tab-pane label="企业变更质疑" name="four" />-->
      <el-tab-pane label="企业澄清" name="five" />
     <!-- <el-tab-pane label="企业变更澄清" name="six" />-->
    </el-tabs>
    <!-- 表格 -->
    <div class="el-tabs__content">
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
          <el-form-item>
            <el-radio-group v-model="declareOrChange" @change="selectRadio">
              <el-radio label="0">申报质疑</el-radio>
              <el-radio label="1">变更质疑</el-radio>
            </el-radio-group>
          </el-form-item><br>
                <el-form-item>
                  <el-input v-model="query.NAME" placeholder="企业名称" @keyup.enter.native="searchEnterFun" size="small"></el-input>
                </el-form-item>
            <el-form-item>
                  <el-input v-model="query.CREDIT_CODE" placeholder="社会统一信用代码" @keyup.enter.native="searchEnterFun" size="small"></el-input>
                </el-form-item>
            <el-form-item>
                 <el-input v-model="query.ORGANIZE_CODE" placeholder="组织机构代码" @keyup.enter.native="searchEnterFun" size="small"></el-input>
                </el-form-item>
            <el-form-item>
                  <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
                  <el-button type="warning" @click="resetForm" size="small">重置</el-button>
                </el-form-item>
        </el-form>
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe
          @selection-change="handleSelectionChange">

          <el-table-column label="企业名称" show-overflow-tooltip>
            <template slot-scope="scope">
              {{scope.row.NAME}}
            </template>
          </el-table-column>
          <el-table-column label="企业简称" show-overflow-tooltip>
            <template slot-scope="scope">
              {{scope.row.ABBR}}
            </template>
          </el-table-column>
          <el-table-column label="社会统一信用代码" show-overflow-tooltip>
            <template slot-scope="scope">
              {{scope.row.CREDIT_CODE}}
            </template>
          </el-table-column>
          <el-table-column label="组织机构代码" show-overflow-tooltip>
            <template slot-scope="scope">
              {{scope.row.ORGANIZE_CODE}}
            </template>
          </el-table-column>
          <el-table-column label="质疑字段" show-overflow-tooltip>
            <template slot-scope="scope">
              {{getFieldName(scope.row.QUESTION_FIELD) }}
            </template>
          </el-table-column>
          <el-table-column label="回复状态" width="120">
            <template slot-scope="scope">
              {{scope.row.REPLY_FLAG == "1" ? '是' : '否' }}
            </template>
          </el-table-column>
          <el-table-column label="回复时间" :formatter="dateformat" prop="REPLY_DATE" />
          <el-table-column label="操作" width="80">
            <template slot-scope="scope">
              <div class="operates">
             <!-- <a href="javascript:;" @click="handleGoView(scope.row)">详细</a>-->
              <span>
                <a href="javascript:;" @click="handleGoView(scope.row)" class="operation-btn">详细</a>
              </span>
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

      <!--  ====================================== 弹窗 ====================================== -->
      <!-- 企业信息质疑详情 -->
      <el-dialog :close-on-click-modal="false" top="2vh" title="企业信息质疑详情" width="60%" :visible.sync="showForm" :before-close="closeForm">
        <el-form ref="form" label-position="left" size="small" label-width="100px" v-if="question.kv">
          <el-form-item :label="getFieldName(question.QUESTION_FIELD)" label-width="50">
            {{ question.kv[question.QUESTION_FIELD] }}
            <a href="javascript:;" class="blue" @click="handleGoDetail()">查看企业信息</a>
          </el-form-item>
          <el-form-item label="质疑时间">
            {{question.QUESTION_DATE}}
          </el-form-item>
          <el-form-item label="质疑内容">
            {{question.QUESTION_EDITVAL }}
          </el-form-item>
          <el-form-item label="回复时间" v-if="question.REPLY_FLAG == 1">
            {{question.REPLY_DATE}}
          </el-form-item>
          <el-form-item label="回复内容" v-if="question.REPLY_FLAG == 1">
            {{question.REPLY_CONTENT}}
          </el-form-item>
        </el-form>
        <span slot="footer">
          <el-button @click="closeForm">关闭</el-button>
        </span>
        <el-dialog
          :close-on-click-modal="false"
          top="2vh"
          title="企业信息"
          class="audit-dialog"
          id="product-addup-dialog"
          :visible.sync="detail"
          :before-close="closeDetail"
          append-to-body>
          <div class="main audit-main">
            <ul class="side side-init" id="product-addup-side">
              <li
                v-for="(item,index) in nodesPosition"
                :key="index">
                <a @click="changeScrollHeight(item.nodePosition,'product-addup-dialog','jump-product-addup',index)"
                   class="d_jump jump-product-addup">{{item.itemName}}</a></li>
            </ul>
            <div class="right-box">
              <div class="gap-40">
                <info ref="info" id="product-addup"></info>
              </div>
            </div>
          </div>
          <span slot="footer">
            <el-button @click="closeDetail">关闭</el-button>
          </span>
        </el-dialog>
      </el-dialog>
    </div>
    </div>
  </div>
</template>

<script>

  import { declareList, declare, getFieldName } from 'src/axios/auditchanges/messageDoubt/enterprise'
  import { convertQuestion, dateFormat } from "src/axios/auditchanges/common/nestedJson"
  import { businessFlag, companyType, moneyType } from 'src/axios/auditchanges/common/enterprise'
  import {keyBoardEnter} from "src/utils";
  import info from 'src/pages/auditchanges/common/enterprise/info'
  import moment from "moment"
  import { findRegion } from "src/axios/auditchanges/common/region"
  import {boxScroll} from "src/components/mixins/scrolls"

  export default {
    mixins:[boxScroll],
    components: {
      info
    },
    data () {
      return {
        resData: this.metaData(),
        query: {}, // 查询初始化
        declareOrChange:'0',
        activeName: 'three',//标签页默认选中第一个
        showForm: false, // 表单可见性初始化
        detail: false,
        showQuery: false, // 表单查询初始化
        question: {},
        nodesPosition: [
          {itemName: '企业基础信息', nodePosition: null, itemAbb: 'qyxx'},
          {itemName: '资信信息', nodePosition: null, itemAbb: 'zx'},
          {itemName: '申报人信息', nodePosition: null, itemAbb: 'sbrxx'},
          {itemName: '营业执照信息', nodePosition: null, itemAbb: 'yyzz'},
          {itemName: '生产许可信息', nodePosition: null, itemAbb: 'scxk'},
          {itemName: '经营许可信息', nodePosition: null, itemAbb: 'yyxk'},
          {itemName: 'GMP信息', nodePosition: null, itemAbb: 'gpmone'},
          {itemName: 'GSP信息', nodePosition: null, itemAbb: 'gpmtwo'},
          {itemName: '项目附加信息', nodePosition: null, itemAbb: 'xmxx'}
        ]
      }
    },
    created () {
      this.list();
    },
    methods: {
      selectRadio(){
        if(this.declareOrChange=='1'){
          this.$router.push('/AUDIT/messageDoubt/enterpriseChangeDoubt');
        }
      },
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
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
      // ------------------------------------------------- 处理方法 ----------------------------------------
      toggleQuery () {
        this.showQuery = !this.showQuery
      },
      toggleForm () {
        this.showForm = !this.showForm
      },
      closeForm () {
        this.toggleForm()
      },
      closeDetail() {
        this.detail = false;
      },
      //查询
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      resetForm(){//重置
        this.query= {};
          this.list()
      },
      //  获取用户分页列表
      async list () {
        let res = await declareList(this.resData, this.query);
        if(res.success) {
          this.resData = res.data;
          if(this.resData.pageNum == 0) {
            this.resData.pageNum = 1;
          }
        }
      },
      async handleGoView(row) {
        this.showForm = true
        dateFormat(row, ["DATE"]);
        this.question = row;

        let res = await declare(row.ID);
        this.question.data = res.data;
        let kv = JSON.parse(JSON.stringify(res.data));

        console.log("res", res);

        convertQuestion(kv);
        if(row.QUESTION_FIELD == "enterprise.COUNTRY_ID") {
          let arr = [
            kv["enterprise.COUNTRY_ID"],
            kv["enterprise.PROVINCE_ID"],
            kv["enterprise.CITY_ID"],
            kv["enterprise.COUNTY_ID"]];
          res = await findRegion(arr);
          if(res.success) {
            let region = "";
            arr.forEach(x => region += res.data[x] + " ");
            kv["enterprise.COUNTRY_ID"] = region;
          }

          arr = JSON.parse(row.QUESTION_EDITVAL);
          res = await findRegion(arr);
          if(res.success) {
            let region = "";
            arr.forEach(x => region += res.data[x] + " ");
            this.question.QUESTION_EDITVAL = region;
          }
        }
        // 转换经济性质
        if(row.QUESTION_FIELD == "enterprise.BUSINESS_FLAG") {
          kv["enterprise.BUSINESS_FLAG"] = this.getValueByKey(businessFlag(), kv["enterprise.BUSINESS_FLAG"]);
          this.question.QUESTION_EDITVAL = this.getValueByKey(businessFlag(), this.question.QUESTION_EDITVAL);
        }
        // 转换是否法人企业
        if(row.QUESTION_FIELD == "enterprise.IS_JURIDICAL_COMPANY") {
          kv["enterprise.IS_JURIDICAL_COMPANY"] = kv["enterprise.IS_JURIDICAL_COMPANY"] == 1 ? "是" : "否";
          this.question.QUESTION_EDITVAL = this.question.QUESTION_EDITVAL == 1 ? "是" : "否";
        }
        // 转换类型
        if(row.QUESTION_FIELD == "enterprise.REG_TYPE") {
          kv["enterprise.REG_TYPE"] = this.getValueByKey(companyType(), kv["enterprise.REG_TYPE"]);
          this.question.QUESTION_EDITVAL = this.getValueByKey(companyType(), this.question.QUESTION_EDITVAL);
        }
        // 转换币种
        if(row.QUESTION_FIELD == "enterprise.REG_AMOUNT_UNIT") {
          kv["enterprise.REG_AMOUNT_UNIT"] = this.getValueByKey(moneyType(), kv["enterprise.REG_AMOUNT_UNIT"]);
          this.question.QUESTION_EDITVAL = this.getValueByKey(moneyType(), this.question.QUESTION_EDITVAL);
        }
        // 转换企业类型
        if(row.QUESTION_FIELD == "manufacture.COMPANY_TYPE") {
          kv["manufacture.COMPANY_TYPE"] = this.getValueByKey(companyType(), kv["manufacture.COMPANY_TYPE"]);
          this.question.QUESTION_EDITVAL = this.getValueByKey(companyType(), this.question.QUESTION_EDITVAL);
        }
        this.$set(this.question, "kv", kv);
      },
      handleGoDetail() {
        this.detail = true;
        this.$nextTick(() => {
          this.$refs.info.init({
            type: 1,
            flag: 0,
            old: this.question.data,
          });
          setTimeout(function () {
            /**
             * 查询设置锚点位置
             * */
            this.getNodesHeight('product-addup');
            //恢复初始状态
            this.removeClassCurrent('jump-product-addup')[0].classList.add('current');
          }.bind(this),0)
        });
      },
      // ************************
      handleSizeChange(val) {
        this.resData.pageSize = val
        this.list()
      },
      handleSelectionChange(val){
        //val 所选对象
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val;
        this.list();
      },
      getFieldName(key) {
        return getFieldName(key);
      },
      dateformat(row, column) {
        let date = row[column.property];
        if (!date) {
          return "";
        }
        return moment(date).format("YYYY-MM-DD HH:mm:ss");
      },
      toChange(t) {
       /* if(t.name == "second") {
          this.$router.push('/AUDIT/messageDoubt/enterpriseChangeDoubt');
        }*/
        if(t.name == "first") {
          this.$router.push('/AUDIT/messageDeclare/enterpriseDeclare');
        }if(t.name == "second") {
          this.$router.push('/AUDIT/messageChanges/enterpriseChange');
        }if(t.name == "four") {
          this.$router.push('/AUDIT/messageDoubt/enterpriseChangeDoubt');
        }if(t.name == "five") {
          this.$router.push('/AUDIT/orgClarify/enterpriseClarifyDeclare');
        }if(t.name == "six") {
          this.$router.push('/AUDIT/orgClarify/enterpriseClarifyChange');
        }
      },
      getValueByKey(collection, key) {
        for(let i in collection) {
          if(collection[i].key == key) {
            return collection[i].value;
          }
        }
      }
    },
    watch: {
      detail(newVal) {
        let vieNode = document.getElementById('product-addup-dialog');
        if(vieNode){
          if (newVal == false) {
            vieNode.onscroll = null;
            this.removeFixed('product-addup-side')
          } else {
            vieNode.onscroll = function () {
              this.dialogBoxScroll(vieNode, 'jump-product-addup', 'product-addup-side')
            }.bind(this)
          }
        }
      }
    },
    mounted() {
        let vieNode = document.getElementById('product-addup-dialog');
        if(vieNode){
          vieNode.onscroll = function () {
            this.dialogBoxScroll(vieNode, 'jump-product-addup', 'product-addup-side')
          }.bind(this)
        }
    }
  }
</script>
<style>
  @import "../../../../assets/css/auditchanges.css";
</style>

