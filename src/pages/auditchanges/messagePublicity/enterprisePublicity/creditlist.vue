<template>
  <div class="tab-box">
    <!-- 表格 -->
    <div class="el-tabs__content">
      <div class="tablebox">
        <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
          <el-form-item>
            <el-input v-model="query.NAME" placeholder="企业名称" @keyup.enter.native="searchEnterFun" size="small"></el-input>
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
                <span>{{scope.row.NAME}}</span>
              </template>
            </el-table-column>
            <el-table-column label="被举报有效次数" show-overflow-tooltip>
              <template slot-scope="scope">
                {{scope.row.VALID}}
              </template>
            </el-table-column>
            <el-table-column label="举报被打回次数">
              <template slot-scope="scope">
                {{scope.row.INVALID}}
              </template>
            </el-table-column>
            <el-table-column label="未定时更新价格次数">
              <template slot-scope="scope">
                {{scope.row.ORGANIZE_CODE}}
              </template>
            </el-table-column>
           <!-- <el-table-column label="操作" width="140px">
              <template slot-scope="scope">
                <div class="operates">
                  <span>
                    <a href="javascript:void(0);" class="operation-btn" @click="handleGoView(scope.row.ID)">详情</a>
                  </span>
                  <span v-if="scope.row.STATE == 3 && scope.row.IS_CURRENT != 1">
                    <a href="javascript:void(0);" class="operation-btn" @click="handleGoAudit(scope.row.ID)">质疑</a>
                  </span>
                </div>
              </template>
            </el-table-column>-->
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
          top="2vh"
          title="企业申报信息公示"
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
            <el-button type="primary" v-if="isDoubt" @click="handleForm">保存</el-button>
            <el-button @click="closeForm">关闭</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>

  // 引入用户相关请求
  import { creditList } from 'src/axios/auditchanges/messagePublicity/enterprise'
  import { checkControl, convertQuestion, decodeUp } from "src/axios/auditchanges/common/nestedJson"
  import { keyBoardEnter } from "src/utils";
  import info from 'src/pages/auditchanges/common/enterprise/info'
  import moment from "moment"
  import {boxScroll} from  'src/components/mixins/scrolls'
  export default {
    mixins:[boxScroll],
    components: {
      info
    },
    data () {
      return {
        isDoubt: false,
        resData: this.metaData(),
        form: undefined, // 表单初始化
        query: this.metaQuery(), // 查询初始化
        activeName: 'first',//标签页默认选中第一个
        showForm: false, // 表单可见性初始化
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
        return {}
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      toggleForm () {
        this.showForm = !this.showForm
      },
      closeForm () {
        this.toggleForm()
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
        this.query = this.metaQuery ();
        this.list();
      },
      //  获取用户分页列表
      list () {
        creditList(this.resData, this.query).then(res => {
          console.log(res);
          this.resData = res.data;
          if(this.resData.pageNum == 0) {
            this.resData.pageNum = 1;
          }
        });
      },
      // 提交用户表单
      async handleForm () {
        // 特殊字段处理
        let show = this.$refs.info.show;
        let area = this.$refs.info.area;
        this.form.region = area;

        // 币种特殊处理
        show.enterprise.REG_AMOUNT_UNIT$ = show.enterprise.REG_AMOUNT$;
        // 营业开始结束日期特殊处理
        if(show.REG_EXPIRE$) {
          if(!this.form.enterprise.REG_EXPIRE_S){
            this.$message({ message: '请填写所有质疑项', type: 'warning' });
            return;
          }
          if(!this.form.enterprise.REG_EXPIRE_Y && !this.form.enterprise.REG_EXPIRE_E) {
            this.$message({ message: '营业结束日期和永久有效至少选择一项', type: 'warning' });
            return;
          }
          this.form.REG_EXPIRE = moment(this.form.enterprise.REG_EXPIRE_S).format("YYYY-MM-DD") + " 至 ";
          this.form.REG_EXPIRE += (this.form.enterprise.REG_EXPIRE_Y ? "永久有效" : moment(this.form.enterprise.REG_EXPIRE_E).format("YYYY-MM-DD"));
        }

        // 常规字段处理
        let check = checkControl(this.form, show);
        if(!check) {
          this.$message({
            message: '请填写所有质疑项',
            type: 'warning'
          });
          return;
        }

        let ent = this.form.enterprise;

        // 转换级联框，需要特殊处理
        ent.COUNTRY_ID = JSON.stringify(area);
        show.enterprise.COUNTRY_ID$ = !!this.form.region;

        // 转换营业开始结束日期框
        ent.REG_EXPIRE = this.form.REG_EXPIRE;
        show.enterprise.REG_EXPIRE$ = !!ent.REG_EXPIRE;

        delete this.form.region;
        delete this.form.REG_EXPIRE;

        let res = await declareAdd(this.form, show, this.$refs.info.fileList)
        console.log(res);
        if(res.success) {
          this.$alert("保存成功", '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.showForm = false;
            }
          });
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          });
        }
      },
      handleGoView(id) {
        this.showForm = true;
        this.isDoubt = false;
        this.$nextTick(() => {
          declare(id).then(res => {
            console.log(res);

            this.$refs.info.init({
              type: 1,
              flag: 2,
              old: res.data,
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

        })
      },
      handleGoAudit(id) {
        this.showForm = true;
        this.isDoubt = true;
        this.$nextTick(() => {
          declare(id).then(async res => {
            console.log(res);

            this.form = this.$refs.info.metaForm();
            this.form.id = res.data.org.ID;

//            let doubt = await queryDoubt(id);
//            console.log("doubt", doubt);
//            decodeUp(this.form, doubt.data);

            this.$refs.info.init({
              limit: true,
              tips: '质疑',
              upload: true,
              type: 1,
              flag: 2,
              old: res.data,
              form: this.form,
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
        })
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
      toChange(t) {
        if(t.name == "second") {
          this.$router.push('/AUDIT/messagePublicity/enterprisePublicityChange');
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
