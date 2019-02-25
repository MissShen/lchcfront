<template>
  <div class="tab-box">
    <span class="tab-bar"></span>
   <!-- <el-tabs v-model="activeName" @tab-click="toDeclare">
      <el-tab-pane label="企业申报澄清" name="first" />
      <el-tab-pane label="企业变更澄清" name="second" />
    </el-tabs>-->
    <el-tabs v-model="activeName" @tab-click="toChange">
      <el-tab-pane label="企业申报" name="first" />
      <el-tab-pane label="企业变更" name="second" />
      <el-tab-pane label="企业质疑记录" name="three" />
     <!-- <el-tab-pane label="企业变更质疑" name="four" />-->
      <el-tab-pane label="企业澄清" name="five" />
      <!--<el-tab-pane label="企业变更澄清" name="six" />-->
    </el-tabs>
    <!-- 表格 -->
    <div class="el-tabs__content">
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <div >
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
          <el-form-item>
            <el-radio-group v-model="declareOrChange" @change="selectRadio">
              <el-radio label="0">申报澄清</el-radio>
              <el-radio label="1">变更澄清</el-radio>
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
              <el-button type="success"  @click="searchEnterFun" size="small">查询</el-button>
              <el-button type="warning"  @click="resetForm" size="small">重置</el-button>
            </el-form-item>
        </el-form>
      </div>

      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe
          @selection-change="handleSelectionChange">
          <el-table-column label="企业名称" show-overflow-tooltip>
            <template slot-scope="scope">
                <span>{{scope.row.NAME}}</span>
            </template>
          </el-table-column>
          <el-table-column label="企业简称" show-overflow-tooltip>
            <template slot-scope="scope">
              {{scope.row.ABBR}}
            </template>
          </el-table-column>
          <el-table-column label="社会统一信用代码">
            <template slot-scope="scope">
              {{scope.row.CREDIT_CODE}}
            </template>
          </el-table-column>
          <el-table-column label="组织机构代码">
            <template slot-scope="scope">
              {{scope.row.ORGANIZE_CODE}}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80">
            <template slot-scope="scope">
              <div class="operates">
                <span>
                  <a href="javascript:void(0);" class="operation-btn" @click="handleGoAudit(scope.row.ID, scope.row.COMPANY_ID)">详情</a>
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
      <!-- 企业变更信息质疑 -->
      <el-dialog
        :close-on-click-modal="false"
        top="2vh"
        title="企业变更信息澄清"
        :visible.sync="showForm"
        :before-close="closeForm"
        class="audit-dialog"
        id="product-addup-box">
        <div class="main audit-main">
          <ul class="side side-init" id="product-addup-side">
            <li
              v-for="(item,index) in nodesPosition"
              :key="index">
              <a @click="changeScrollHeight(item.nodePosition,'product-addup-box','jump-product-addup',index)"
                 class="d_jump jump-product-addup">{{item.itemName}}</a></li>
          </ul>
          <div class="right-box">
            <div class="gap-40">
              <info ref="info" id="product-addup"></info>
            </div>
          </div>
        </div>
        <span slot="footer">
          <el-button @click="closeForm">关闭</el-button>
        </span>
      </el-dialog>
    </div>
    </div>
  </div>
</template>

<script>

  // 引入用户相关请求
  import { changeList, finalOrg, queryKeyValue, doubt, clarify } from 'src/axios/auditchanges/messageClarify/enterprise'
  import { decodeQuestion, decodeUp } from 'src/axios/auditchanges/common/nestedJson'
  // import {keyBoardEnter} from "src/utils";
  import info from 'src/pages/auditchanges/common/enterprise/info'
  import Vue from 'vue'
  import {boxScroll} from 'src/components/mixins/scrolls'
  export default {
    mixins:[boxScroll],
    components: {
      info
    },
    data () {
      return {
        resData: this.metaData(),
        form: undefined, // 表单初始化
        query: this.metaQuery(), // 查询初始化
        declareOrChange:'1',
        activeName: 'five',//标签页默认选中第一个
        showForm: false,
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
        if(this.declareOrChange=='0'){
          this.$router.push('/AUDIT/orgClarify/enterpriseClarifyDeclare');
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
      metaQuery () { // 表单查询数据初始化
        return {
          query: {
            id: undefined,
            code: undefined,
            name: undefined,
            beginDate: undefined,
            endDate: undefined
          }
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
      // //查询
      // searchEnterFun(e){
      //   this.$store.state.pageSeach.pageNum = 1;
      //   this.resData.pageNum=1;
      //   keyBoardEnter(e, () => {
      //     this.list();
      //   })
      // },
      //  获取用户分页列表
      async list () {
        let loading = Vue.prototype.$loading({text:"玩命加载中..."});
        let res = await changeList(this.resData, this.query);
        console.log(res);
        this.resData = res.data;
        if(this.resData.pageNum == 0) {
          this.resData.pageNum = 1;
        }
        this.$nextTick(() => {
          loading.close();
        });
      },
      // 重置用户表单
      resetForm () {
        this.query = this.metaQuery();
        this.list();
      },
      handleGoAudit(id, companyId) {
        this.showForm = true
        this.$nextTick(async () => {
          let res = await finalOrg(companyId);
          res.data.org.ID = id;

          this.old = res.data;

          this.doubt = await doubt(id);
          this.clari = await clarify(id);

          this.cli = this.$refs.info.metaForm();
          decodeQuestion(this.cli, this.doubt.data);

          this.form = this.$refs.info.metaForm();
          this.form.id = id;

          let now = this.$refs.info.metaForm();

          let kv = await queryKeyValue(id);
          decodeUp(now, kv.data);

          for(let key in kv.data) {
            if(/^gmp\./.test(key)) {
              /gmp\.(\d+)\./.test(key);
              let index = RegExp.$1;
              if(!this.old.gmp[index]) {
                this.old.gmp[index] = { PROJECT_ORG_ID: "X" };
                delete now.gmp[index];
              }
              if(this.old.gmp[index].PROJECT_ORG_ID == "X") {
                /\.([^\.]+$)/.test(key);
                this.old.gmp[index][RegExp.$1] = kv.data[key].UP_VALUE;
              }
            }
          }

          if(now.fileList && now.fileList.length > 0) {
            now.fileList = JSON.parse(now.fileList);
          }

          this.$refs.info.init({
            btn: "澄清",
            limit: false,
            type: 2,
            flag: 3,
            clarify: true,
            old: this.old,
            now: now,
            form: this.form,
            cli: this.cli,
            doubt: this.doubt.data,
            clari: this.clari.data,
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
     /* toDeclare(t) {
        if(t.name == "first") {
          this.$router.push('/AUDIT/orgClarify/enterpriseClarifyDeclare');
        }
      }*/
      toChange(t) {
        /* if(t.name == "second") {
           this.$router.push('/AUDIT/orgClarify/enterpriseClarifyChange');
         }*/
        if(t.name == "first") {
          this.$router.push('/AUDIT/messageDeclare/enterpriseDeclare');
        }if(t.name == "second") {
          this.$router.push('/AUDIT/messageChanges/enterpriseChange');
        }if(t.name == "three") {
          this.$router.push('/AUDIT/messageDoubt/enterpriseDeclareDoubt');
        }if(t.name == "four") {
          this.$router.push('/AUDIT/messageDoubt/enterpriseChangeDoubt');
        }if(t.name == "five") {
          this.$router.push('/AUDIT/orgClarify/enterpriseClarifyDeclare');
        }
      }
    },
    watch: {
      showForm(newVal) {
        let vieNode = document.getElementById('product-addup-box');
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
      let vieNode = document.getElementById('product-addup-box');
      if(vieNode){
        vieNode.onscroll = function () {
          this.dialogBoxScroll(vieNode, 'jump-product-addup', 'product-addup-side')
        }.bind(this)
      }
    }
  }
</script>
