<template>
  <!-- 表格 -->
  <div class="tablebox">
    <!-- 表格查询表单 -->
      <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
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
            <el-select v-model="query.CHECK_COUNT" placeholder="全部" size="small">
              <el-option key="0" label="全部" value="" />
              <el-option v-for="x in checkCount"
               :key="x + 1"
               :label="{
                  '1':'一',
                  '2':'二',
                  '3':'三',
                  '4':'四',
                  '5':'五',
                  '6':'六',
                  '7':'七',
                  '8':'八',
                  '9':'九',
                }[x + 1] + '审'" :value="x + 1" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
            <el-button type="warning" @click="resetForm" size="small">重置</el-button>
          </el-form-item>
      </el-form>

    <!-- 表格列表 -->
    <div class="tableset">
      <el-table :data="resData.list" border stripe @selection-change="handleSelectionChange" :row-key="getRowkeys">
        <el-table-column type="selection" width="50" align="center" :reserve-selection="true"></el-table-column>
        <el-table-column label="企业名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.NAME }}</span>
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
        <el-table-column label="申报时间" :formatter="dateformat" prop="DATE_ADD" width="100px"/>
        <el-table-column label="质疑数量">
          <template slot-scope="scope">
            {{scope.row.CNT}}
          </template>
        </el-table-column>
        <el-table-column label="审核状态"  width="80px">
          <template slot-scope="scope">
            {{ scope.row.CHECK_COUNT ? {'1':'一','2':'二', '3':'三', '4':'四', '5':'五', '6':'六','7':'七','8':'八','9':'九'}[scope.row.CHECK_COUNT] + "审" : "未审核"}}
          </template>
        </el-table-column>
        <el-table-column label="审核结果"  width="80px">
          <template slot-scope="scope">
            {{ {'1':'通过','2':'待确认','3':'不通过',}[scope.row.AUDIT_RESULT] }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <div class="operates">
              <span><a href="javascript:;" class="operation-btn" @click="handleGoView(scope.row.ID, scope.row.COMPANY_ID)">详情</a></span>
              <span><a href="javascript:;" class="operation-btn"
                 v-if="scope.row.STATE == '5' && scope.row.AUTH == '1'"
                 @click="handleGoAudit(scope.row.ID, scope.row.COMPANY_ID, scope.row.CHECK_COUNT, scope.row.AUTH)">审核</a></span>
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
    <el-dialog
      :close-on-click-modal="false"
      top="2vh"
      title="企业变更信息审核"
      class="audit-dialog"
      id="product-addup-box"
      :visible.sync="showForm"
      :before-close="closeForm">
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
            <el-form ref="form" :model="audit" :rules="rules" label-position="right" size="small" label-width="160px">
              <h3 id="enter-shxx">审核信息</h3>
              <el-row :gutter="24">
                <el-col :span="24">
                  <!--<el-form-item label="审核记录">-->
                    <!---->
                  <!--</el-form-item>-->
                  <div class="tableset">
                    <el-table :data="recording" border stripe>
                      <el-table-column label="审核人">
                        <template slot-scope="scope">
                          {{ scope.row.CHECK_NAME }}
                        </template>
                      </el-table-column>
                      <el-table-column label="审核时间" :formatter="dateformat" prop="CHECK_DATE" />
                      <el-table-column label="审核结果">
                        <template slot-scope="scope">
                          <span>{{ {"1":"审核通过", "2":"待确认", "3":"不通过",}[scope.row.CHECK_RESULT] }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="审核备注">
                        <template slot-scope="scope">
                          <span>{{ scope.row.CHECK_MARK }}</span>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </el-col>
                <el-col :span="18">
                  <el-form-item label="审核结果" prop="CHECK_RESULT" v-if="form.CHECK_COUNT">
                    <el-radio v-model="audit.CHECK_RESULT" label="1">审核通过</el-radio>
                    <el-radio v-model="audit.CHECK_RESULT" label="2">待确认</el-radio>
                    <el-radio v-model="audit.CHECK_RESULT" label="3">审核不通过</el-radio>
                  </el-form-item>
                </el-col>
                <el-col :span="18">
                  <el-form-item label="审核备注" prop="CHECK_MARK" v-if="form.CHECK_COUNT">
                    <el-input v-model="audit.CHECK_MARK" type="textarea" :rows="4" placeholder="审核备注">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
      </div>
      <span slot="footer">
        <el-button @click="closeForm" size="small">关闭</el-button>
        <el-button type="primary" @click="handleForm" size="small" v-if="auth">保存</el-button>
      </span>
    </el-dialog>
  </div>

</template>
<script>
  // 引入用户相关请求
  import { project, changeList, finalOrg, queryKeyValue, doubt, clarify, audit, changeSave, recording } from "src/axios/auditchanges/auditManage/enterprise";
  import { decodeQuestion, decodeAudit, decodeUp, checkControl } from "src/axios/auditchanges/common/nestedJson";
  import {keyBoardEnter} from "src/utils";
  import info from "src/pages/auditchanges/common/enterprise/info";
  import moment from "moment";
  import {boxScroll} from 'src/components/mixins/scrolls'

  export default {
    mixins:[boxScroll],
    components: {
      info
    },
    data() {
      return {
        rules: this.metaRules(),
        resData: this.metaData(),
        form: {}, // 表单初始化
        query: {}, // 查询初始化
        showForm: false, // 表单可见性初始化
        project: {},
        checkCount: [],
        count: 0,
        doubt: [],
        cli: {}, // 澄清按钮具体每项开关
        dictionary: {}, // 质疑回复和澄清回复
        clari: [], // 澄清记录
        audit: {},
        recording: [],
        auth: false,
        nodesPosition: [
          {itemName: '企业基础信息', nodePosition: null, itemAbb: 'qyxx'},
          {itemName: '资信信息', nodePosition: null, itemAbb: 'zx'},
          {itemName: '申报人信息', nodePosition: null, itemAbb: 'sbrxx'},
          {itemName: '营业执照信息', nodePosition: null, itemAbb: 'yyzz'},
          {itemName: '生产许可信息', nodePosition: null, itemAbb: 'scxk'},
          {itemName: '经营许可信息', nodePosition: null, itemAbb: 'yyxk'},
          {itemName: 'GMP信息', nodePosition: null, itemAbb: 'gpmone'},
          {itemName: 'GSP信息', nodePosition: null, itemAbb: 'gpmtwo'},
          {itemName: '项目附加信息', nodePosition: null, itemAbb: 'xmxx'},
          {itemName: '审核信息', nodePosition: null, itemAbb: 'shxx'}
        ]
      }
    },
    created() {
      this.init();
      this.list();
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData() {
        return {
          pageNum: 1,
          pageSize: 10,
          size: 10,
          startRow: 0,
          endRow: 0,
          total: 0,
          pages: 0,
          prePage: 0,
          nextPage: 0,
          isFirstPage: true,
          isLastPage: true,
          hasPreviousPage: false,
          hasNextPage: false,
          navigatePages: 8,
          navigatepageNums: [],
          navigateFirstPage: 0,
          navigateLastPage: 0,
          firstPage: 0,
          lastPage: 0,
          list: undefined
        }
      },
      metaRules() {
        return {
          CHECK_RESULT: [{
            validator: (rule, value, callback) => {
              if (this.audit.CHECK_RESULT) {
                callback();
              } else {
                callback(new Error("请选择审核结果"));
              }
            },
            trigger: "blur"
          }],
          CHECK_MARK: [{
            required: true,
            message: "审核备注不能为空",
            trigger: "blur"
          }]
        };
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      toggleForm() {
        this.showForm = !this.showForm
      },
      closeForm() {
        this.$refs['form'].resetFields()
        this.toggleForm()
      },
      async init() {
        let res = await project();
        if (!res.success) {
          return;
        }

        if (/^\d$/.test(res.data.checkCount)) {
          this.count = parseInt(res.data.checkCount);
          this.checkCount = [...Array(this.count).keys()];
        }
      },
      getRowkeys(row){
        return row.ID;
      },
      searchEnterFun(e){//查询
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      resetForm(){//重置
        this.query = this.metaQuery ();
        this.list();
      },
      //  获取用户分页列表
      list() {
        changeList(this.resData, this.query).then(res => {
          console.log(res);
          this.resData = res.data;
          if (this.resData.list.length == 0) {
            this.resData.pageNum = 1;
          }
        });
      },
      // 提交用户表单
      handleForm() {
        this.$refs.form.validate(async valid => {
          if (valid) {
            for (let field in this.doubt.data) {
              for (let id in this.doubt.data[field]) {
                if (!this.dictionary.doubt[id]) {
                  this.$alert("请回复所有质疑", "提示", {
                    confirmButtonText: "确定"
                  });
                  return;
                }
              }
              if (!this.clari.data[field]) {
                continue;
              }
              if (!this.dictionary.clarify[field]) {
                this.$alert("请回复所有澄清", "提示", {
                  confirmButtonText: "确定"
                });
                return;
              }
            }
            // 特殊字段处理
            let show = this.$refs.info.show;
            let REG_EXPIRE$;

            // 币种特殊处理
            show.enterprise.REG_AMOUNT_UNIT$ = show.enterprise.REG_AMOUNT$;
            // 营业开始结束日期特殊处理
            if(show.REG_EXPIRE$) {
              if(!this.form.enterprise.REG_EXPIRE_S){
                this.$message({ message: '请填写所有不正确项', type: 'warning' });
                return;
              }
              if(!this.form.enterprise.REG_EXPIRE_Y && !this.form.enterprise.REG_EXPIRE_E) {
                this.$message({ message: '营业结束日期和永久有效至少选择一项', type: 'warning' });
                return;
              }
              show.enterprise.REG_EXPIRE_S$ = !!this.form.enterprise.REG_EXPIRE_S;
              show.enterprise.REG_EXPIRE_E$ = !!this.form.enterprise.REG_EXPIRE_E;
              show.enterprise.REG_EXPIRE_Y$ = !!this.form.enterprise.REG_EXPIRE_Y;

              REG_EXPIRE$ = show.REG_EXPIRE$;
              show.REG_EXPIRE$ = null;
            }

            // 常规字段处理
            let check = checkControl(this.form, show);
            if(!check) {
              this.$message({
                message: '请填写所有不正确项',
                type: 'warning'
              });
              show.REG_EXPIRE$ = REG_EXPIRE$;
              return;
            }

            let res = await changeSave(this.form, show, this.audit, this.count);
            if (res.success) {
              this.toggleForm();
              this.audit = {};
              this.list();
            }
          } else {
            return false;
          }
        });
      },
      handleGoView(id, companyId) {
        this.showForm = true
        this.auth = false;
        this.$nextTick(async () => {
          let old = await finalOrg(companyId);
          old.data.org.ID = id;

          this.old = old.data;
          console.log(old);

          this.doubt = await doubt(id);
          this.clari = await clarify(id);
          let _audit = await audit(id);

          this.cli = this.$refs.info.metaForm();
          this.dictionary = this.$refs.info.metaDict();
          this.form = this.$refs.info.metaForm();

          decodeQuestion(this.cli, this.doubt.data);

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
            btn: '查看质疑',
            type: 2,
            flag: 4,
            old: this.old,
            now: now,
            cli: this.cli,
            doubt: this.doubt.data,
            clari: this.clari.data,
            dictionary: this.dictionary
          });

          let res = await recording(id);
          this.recording = res.data;
          setTimeout(function () {
            /**
             * 查询设置锚点位置
             * */
            this.getNodesHeight('product-addup', 'enter-shxx');
          }.bind(this),0);
          this.$nextTick(() => {
            //恢复初始状态
            this.removeClassCurrent('jump-product-addup')[0].classList.add('current');
          })
        })
      },
      handleGoAudit(id, companyId, count, auth) {
        this.showForm = true
        this.auth = auth;
        this.$nextTick(async () => {
          let old = await finalOrg(companyId);
          old.data.org.ID = id;

          this.old = old.data;
          console.log(old);

          this.doubt = await doubt(id);
          this.clari = await clarify(id);
          let _audit = await audit(id);

          this.cli = this.$refs.info.metaForm();
          this.dictionary = this.$refs.info.metaDict();
          this.form = this.$refs.info.metaForm();

          decodeQuestion(this.cli, this.doubt.data);
          decodeAudit(this.form, _audit.data);

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

          this.form.id = id;
          this.form.CHECK_COUNT = count ? count + 1 : 1;

          this.$refs.info.init({
            limit: true,
            btn: '查看质疑',
            type: 2,
            flag: 4,
            old: this.old,
            now: now,
            form: this.form,
            cli: this.cli,
            doubt: this.doubt.data,
            clari: this.clari.data,
            dictionary: this.dictionary
          });

          let res = await recording(id);
          this.recording = res.data;
          setTimeout(function () {
            /**
             * 查询设置锚点位置
             * */
            this.getNodesHeight('product-addup', 'enter-shxx');
          }.bind(this),0)
          //恢复初始状态
          this.removeClassCurrent('jump-product-addup')[0].classList.add('current');
        })

      },
      // ************************
      handleSizeChange(val) {
        this.resData.pageSize = val;
        this.list();
      },
      handleSelectionChange(val) {
        //val 所选对象
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val;
        this.list();
      },
      dateformat(row, column) {
        let date = row[column.property];
        if (!date) {
          return "";
        }
        return moment(date).format("YYYY-MM-DD");
      }
    },
    watch: {
      visible(newVal) {
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
