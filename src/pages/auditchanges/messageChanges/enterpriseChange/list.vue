<template>
  <div>

    <el-tabs v-model="activeName" @tab-click="toChange">
      <el-tab-pane label="企业申报" name="first" />
      <el-tab-pane label="企业变更" name="second" />
      <el-tab-pane label="企业质疑记录" name="three" />
     <!-- <el-tab-pane label="企业变更质疑" name="four" />-->
      <el-tab-pane label="企业澄清" name="five" />
     <!-- <el-tab-pane label="企业变更澄清" name="six" />-->
    </el-tabs>

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
            <el-form-item>
                <el-input v-model="query.ID" placeholder="申报号" @keyup.enter.native="searchEnterFun" size="small"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="query.STATE" placeholder="全部" size="small">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-date-picker type="date" placeholder="开始日期" v-model="query.BEGIN" size="small"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-date-picker type="date" placeholder="结束日期" v-model="query.END" size="small"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
              <el-button type="warning" @click="resetForm" size="small">重置</el-button>
            </el-form-item>
        </el-form>
      <div class="table-caption foot-btn">
        <div class="foot-left">
         <el-button type="primary" size="small" @click="handleGoAdd">申报变更</el-button>
        </div>
      </div>

      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          :row-key="getRowkeys"
          stripe>
          <el-table-column type="selection" width="50" :reserve-selection="true" align="center"></el-table-column>
          <el-table-column label="申报号">
            <template slot-scope="scope">
              {{scope.row.ID}}
            </template>
          </el-table-column>
          <el-table-column label="当前状态">
            <template slot-scope="scope">
              {{ {'0': {'1':'已拒绝','3':'已审核'}[scope.row.AUDIT_RESULTS] || '未提交','1':'已提交','2':'公示中','3':'质疑中','4':'澄清中','5':'审核中','6':'挂网中','7':'数据处理中','8':'确认中','9':'已确认'}[scope.row.STATE] }}
            </template>
          </el-table-column>
          <el-table-column label="审核结果">
            <template slot-scope="scope">
              {{ {'0':'未审核','1':'审核通过','2':'待确认','3':'审核不通过'}[scope.row.AUDIT_RESULTS] }}
            </template>
          </el-table-column>
          <el-table-column label="申报时间" :formatter="dateformat" prop="SUBMIT_DATE" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div class="operates">
                <span v-if="scope.row.STATE == '0' && scope.row.AUDIT_RESULTS == '0'"><a href="javascript:;" class="operation-btn" @click="updateState(scope.row.ID)">提交</a></span>
                <span v-if="scope.row.STATE == '0' && scope.row.AUDIT_RESULTS == '0'"><a href="javascript:;" class="operation-btn" @click="handleGoEdit(scope.row.ID, scope.row.COMPANY_ID)">修改</a></span>
                <span v-if="scope.row.STATE != '0' || scope.row.AUDIT_RESULTS != '0'"><a href="javascript:;" class="operation-btn" @click="handleGoView(scope.row.ID, scope.row.COMPANY_ID)">查看</a></span>
                <span v-if="scope.row.STATE == '0' && scope.row.AUDIT_RESULTS != '0'"><a href="javascript:;" class="operation-btn" @click="handleGoCopy(scope.row.ID, scope.row.COMPANY_ID)">复制</a></span>
                <span v-if="scope.row.STATE == '1' || scope.row.STATE == '2' || scope.row.STATE == '3' || scope.row.STATE == '4'"><a href="javascript:;" class="operation-btn" @click="revoke(scope.row.ID)">撤回</a></span>
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
      <!-- 企业申报信息公示 -->
      <el-dialog
        :close-on-click-modal="false"
        top="2vh"
        title="企业信息变更"
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
            </div>
          </div>
        </div>
        <span slot="footer">
          <el-button type="primary" @click="handleForm">保存</el-button>
          <el-button @click="closeForm">关闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {queryFinalOrg, queryFinalOrgById, queryKeyValue, save, list, updateState, checkCopy, revoke } from 'src/axios/auditchanges/messageChanges/enterprise'
  import {decodeUp, checkControl } from 'src/axios/auditchanges/common/nestedJson'
  import {keyBoardEnter} from "src/utils";
  import info from 'src/pages/auditchanges/common/enterprise/info'
  import moment from "moment"
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
        query: {}, // 查询初始化
        activeName:'second',
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        options:[{
          value:'0',
          label:'未提交'
        },{
          value:'1',
          label:'已提交'
        },{
          value:'2',
          label:'公示中'
        },{
          value:'3',
          label:'质疑中'
        },{
          value:'4',
          label:'澄清中'
        },{
          value:'5',
          label:'审核中'
        },{
          value:'6',
          label:'挂网中'
        },{
          value:'7',
          label:'数据处理中'
        },{
          value:'8',
          label:'确认中'
        },{
          value:'9',
          label:'已确认'
        },],
        nodesPosition: [
          {itemName: '企业基础信息', nodePosition: null, itemAbb: 'qyxx'},
          {itemName: '资信信息', nodePosition: null, itemAbb: 'zx'},
          {itemName: '申报人信息', nodePosition: null, itemAbb: 'sbrxx'},
          {itemName: '营业执照信息', nodePosition: null, itemAbb: 'yyzz'},
          {itemName: '生产许可信息', nodePosition: null, itemAbb: 'scxk'},
          {itemName: '经营许可信息', nodePosition: null, itemAbb: 'yyxk'},
          {itemName: 'GMP信息', nodePosition: null, itemAbb: 'gpmone'},
          {itemName: 'GSP信息', nodePosition: null, itemAbb: 'gmptwo'},
          {itemName: '项目附加信息', nodePosition: null, itemAbb: 'xmxx'}
        ]
      }
    },
    created () {
      this.list();
    },
    methods: {
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
      getRowkeys(row){
        return row.ID;
      },
      //查询
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      // 重置
      resetForm () {
        this.query = {};
        this.list();
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      toggleForm () {
        this.showForm = !this.showForm
      },
      toChange(t) {
        if(t.name == "first") {
          this.$router.push('/AUDIT/messageDeclare/enterpriseDeclare');
        }if(t.name == "three") {
          this.$router.push('/AUDIT/messageDoubt/enterpriseDeclareDoubt');
        }if(t.name == "four") {
          this.$router.push('/AUDIT/messageDoubt/enterpriseChangeDoubt');
        }if(t.name == "five") {
          this.$router.push('/AUDIT/orgClarify/enterpriseClarifyDeclare');
        }if(t.name == "six") {
          this.$router.push('/AUDIT/orgClarify/enterpriseClarifyChange');
        }
      },
      closeForm () {
        this.toggleForm();
      },
      async list () {
        let res = await list(this.resData, this.query);
        console.log(res);
        if(res.success) {
          this.resData = res.data;
          if(this.resData.pageNum == 0) {
            this.resData.pageNum = 1;
          }
        }
      },
      // 提交用户表单
      async handleForm () {
        console.log(this.form);
        // 特殊字段处理
        let show = this.$refs.info.show;
        let REG_EXPIRE$;

        // 币种特殊处理
        show.enterprise.REG_AMOUNT_UNIT$ = show.enterprise.REG_AMOUNT$;
        // 营业开始结束日期特殊处理
        if(show.REG_EXPIRE$) {
          if(!this.form.enterprise.REG_EXPIRE_S){
            this.$message({ message: '请填写所有变更项', type: 'warning' });
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
            message: '请填写所有变更项',
            type: 'warning'
          });
          show.REG_EXPIRE$ = REG_EXPIRE$;
          return;
        }

        this.form.fileList = this.$refs.info.fileList;

        let res = await save(this.old, this.form, show);
        if(res.success) {
          this.closeForm();
          this.list();
        } else {
          this.$alert(res.message, '提示', {
            confirmButtonText: '确定',
          });
        }
      },
      async handleGoCopy(id, company_id) {
        let res = await checkCopy(id);
        if(!res.success) {
          this.$message({
            message: '服务器异常',
            type: 'warning'
          });
          return;
        }
        if(res.data.state == '0') {
          this.$message({
            message: '该信息不可复制',
            type: 'warning'
          });
          return;
        }
        if(res.data.state == '1') {
          res = await queryFinalOrgById(company_id);
          if(!res.success) {
            this.$message('服务器异常');
            return;
          }

          this.old = res.data;
          this.showForm = true;
          this.$nextTick(async () => {
            this.form = this.$refs.info.metaForm();
            this.form.id = this.old.org.ID;

            let kv = await queryKeyValue(id);
            decodeUp(this.form, kv.data);

            for(let key in kv.data) {
              if(/^gmp\./.test(key)) {
                /gmp\.(\d+)\./.test(key);
                let index = RegExp.$1;
                if(!this.old.gmp[index]) {
                  this.old.gmp[index] = {};
                  delete this.form.gmp[index];
                }
                if(!this.old.gmp[index].PROJECT_ORG_ID) {
                  /\.([^\.]+$)/.test(key);
                  this.old.gmp[index][RegExp.$1] = kv.data[key].UP_VALUE;
                }
              }
            }

            let fileList;
            if(this.form.fileList && this.form.fileList.length > 0) {
              fileList = JSON.parse(this.form.fileList);
            }

            this.$refs.info.init({
              limit: true,
              tips: '变更',
              type: 2,
              flag: 1,
              old: this.old,
              form: this.form,
              fileList,
            });
          });
          setTimeout(function () {
            /**
             * 查询设置锚点位置
             * */
            this.getNodesHeight('product-addup');
            //恢复初始状态
            this.removeClassCurrent('jump-product-addup')[0].classList.add('current');
          }.bind(this),0);
        }
      },
      async revoke(id) {
        let res = await revoke(id);
        console.log("res", res)
        if(res.success) {
          if(res.data.success) {
            this.$message({
              message: res.data.exceptionMessage,
              type: 'success'
            });
            this.list();
          } else {
            this.$message({
              message: res.data.exceptionMessage,
              type: 'warning'
            });
          }
        } else {
          this.$message({
            message: '服务器异常',
            type: 'warning'
          });
        }
      },
      async handleGoAdd() {
        let res = await queryFinalOrg();
        if(!res.success) {
          this.$message('服务器异常');
          return;
        }

        if(res.data.error) {
          this.$message({
            message: res.data.error,
            type: 'warning'
          });
          return;
        }

        this.old = res.data;
        this.showForm = true;

        console.log(this.old);

        this.$nextTick(() => {
          this.form = this.$refs.info.metaForm();
          this.form.id = this.old.org.ID;

          this.$refs.info.init({
            limit: true,
            tips: '变更',
            type: 2,
            flag: 1,
            old: this.old,
            form: this.form,
          });
          setTimeout(function () {
            /**
             * 查询设置锚点位置
             * */
            this.getNodesHeight('product-addup');
            //恢复初始状态
            this.removeClassCurrent('jump-product-addup')[0].classList.add('current');
          }.bind(this),0);
        });
      },
      async handleGoEdit(id, company_id) {
        let res = await queryFinalOrgById(company_id);
        if(!res.success) {
          this.$message('服务器异常');
          return;
        }

        this.old = res.data;
        this.showForm = true;
        this.$nextTick(async () => {
          this.form = this.$refs.info.metaForm();
          this.form.id = this.old.org.ID;
          this.form.ID = id;

          let kv = await queryKeyValue(id);
          decodeUp(this.form, kv.data);

          for(let key in kv.data) {
            if(/^gmp\./.test(key)) {
              /gmp\.(\d+)\./.test(key);
              let index = RegExp.$1;
              if(!this.old.gmp[index]) {
                this.old.gmp[index] = {};
                delete this.form.gmp[index];
              }
              if(!this.old.gmp[index].PROJECT_ORG_ID) {
                /\.([^\.]+$)/.test(key);
                this.old.gmp[index][RegExp.$1] = kv.data[key].UP_VALUE;
              }
            }
          }

          let fileList;
          if(this.form.fileList && this.form.fileList.length > 0) {
            fileList = JSON.parse(this.form.fileList);
          }

          this.$refs.info.init({
            limit: true,
            tips: '变更',
            type: 2,
            flag: 1,
            old: this.old,
            form: this.form,
            fileList,
          });
        });
        setTimeout(function () {
          /**
           * 查询设置锚点位置
           * */
          this.getNodesHeight('product-addup');
          //恢复初始状态
          this.removeClassCurrent('jump-product-addup')[0].classList.add('current');
        }.bind(this),0);
      },
      async handleGoView(id, company_id) {
        let res = await queryFinalOrgById(company_id);
        if(!res.success) {
          this.$message('服务器异常');
          return;
        }

        this.old = res.data;
        this.showForm = true;
        this.$nextTick(async () => {
          this.form = this.$refs.info.metaForm();
          this.form.id = this.old.org.ID;
          this.form.ID = id;

          let kv = await queryKeyValue(id);
          decodeUp(this.form, kv.data);

          for(let key in kv.data) {
            if(/^gmp\./.test(key)) {
              /gmp\.(\d+)\./.test(key);
              let index = RegExp.$1;
              if(!this.old.gmp[index]) {
                this.old.gmp[index] = {};
                delete this.form.gmp[index];
              }
              if(!this.old.gmp[index].PROJECT_ORG_ID) {
                /\.([^\.]+$)/.test(key);
                this.old.gmp[index][RegExp.$1] = kv.data[key].UP_VALUE;
              }
            }
          }

          let fileList;
          if(this.form.fileList && this.form.fileList.length > 0) {
            fileList = JSON.parse(this.form.fileList);
          }

          this.$refs.info.init({
            type: 2,
            flag: 1,
            old: this.old,
            now: this.form,
            fileList,
          });
          setTimeout(function () {
            /**
             * 查询设置锚点位置
             * */
            this.getNodesHeight('product-addup');
            //恢复初始状态
            this.removeClassCurrent('jump-product-addup')[0].classList.add('current');
          }.bind(this),0);

        });
      },
      async updateState(id) {
        let res = await updateState(id);
        if(res.success) {
          this.list();
        } else {
          this.$message('服务器异常');
        }
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
      dateformat(row, column) {
        let date = row[column.property];
        if (!date) {
          return "";
        }
        return moment(date).format("YYYY-MM-DD HH:mm:ss");
      }
    },
    watch: {
      showForm(newVal) {
        let vieNode = document.getElementById('product-addup-box');
        if (newVal == false) {
          vieNode.onscroll = null;
          this.removeFixed('product-addup-side')
        } else {
          vieNode.onscroll = function () {
            this.dialogBoxScroll(vieNode, 'jump-product-addup', 'product-addup-side')
          }.bind(this)
        }
      }
    },
    mounted() {
      let vieNode = document.getElementById('product-addup-box');
      vieNode.onscroll = function () {
        this.dialogBoxScroll(vieNode, 'jump-product-addup', 'product-addup-side')
      }.bind(this)
    }
  }
</script>
