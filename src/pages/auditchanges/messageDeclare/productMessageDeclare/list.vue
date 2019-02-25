<template>
  <div>
    <!--<div class="tabs-panel">
      <span class="active">产品信息申报</span>
    </div>-->

    <el-tabs v-model="activeName" @tab-click="toChange">
      <el-tab-pane label="产品申报" name="first"/>
      <el-tab-pane label="产品变更" name="second"/>
      <el-tab-pane label="产品质疑记录" name="three"/>
      <!-- <el-tab-pane label="产品变更质疑" name="four" />-->
      <el-tab-pane label="产品澄清" name="five"/>
      <!-- <el-tab-pane label="产品变更澄清" name="six" />-->
    </el-tabs>


    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <el-form ref="query" :model="query" :inline="true" class="demo-form-inline table-form">
        <el-form-item>
          <el-input v-model="query.searchName" placeholder="产品名称" @keyup.enter.native="searchEnterFun"
                    size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="query.searchDosageForm" placeholder="剂型" @keyup.enter.native="searchEnterFun"
                    size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="query.searchSpec" placeholder="规格" @keyup.enter.native="searchEnterFun"
                    size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="query.searchOrg" placeholder="生产企业" @keyup.enter.native="searchEnterFun"
                    size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="query.searchState" placeholder="全部" size="small">
            <el-option
              v-for="(item,index) in options"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
          <el-button type="warning" @click="restQuery" size="small">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="table-caption foot-btn">
        <div class="foot-left">
          <!--<el-button type="success" size="small" @click="handleFromView('0')">新增产品申报</el-button>-->
          <el-button type="primary" size="small" @click="selectProductView('0')">选择产品申报</el-button>
        </div>

      </div>
      <div class="tableset">
        <!--:row-key="getRowkeys"-->
        <el-table
          :data="resData.list"
          border
          stripe
          @selection-change="handleSelectionChange">
          <!--<el-table-column type="selection" width="50" align="center" :reserve-selection="true"></el-table-column>-->
          <!-- <el-table-column label="产品名称">
             <template slot-scope="scope">
               <div>
                 <div class="text-inline">{{ scope.row.PRODUCT }}</div>
               </div>
               <div class="text-inline">{{ scope.row.MIXDOSAGE }}</div>
             </template>
           </el-table-column>
           <el-table-column label="产品信息">
             <template slot-scope="scope">
               <div class="pro-details">
                 <div class="text-inline">{{ scope.row.COMBINED }}&nbsp;&nbsp;{{scope.row.WRAP}}</div>
               </div>
               <div class="text-inline">{{ scope.row.ABBR }}</div>
             </template>
           </el-table-column>-->

          <el-table-column label="产品名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.PRODUCT }}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品名" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.TRADE }}</span>
            </template>
          </el-table-column>
          <el-table-column label="剂型" width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.DOSAGE }}</span>
            </template>
          </el-table-column>
          <el-table-column label="规格" width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.SPEC }}</span>
            </template>
          </el-table-column>
          <el-table-column label="转换比" width="60" align="right" header-align="left">
            <template slot-scope="scope">
              <span>{{ scope.row.STANDRATE }}</span>
            </template>
          </el-table-column>
          <el-table-column label="单位" width="50">
            <template slot-scope="scope">
              <span>{{ scope.row.METRIC }}</span>
            </template>
          </el-table-column>
          <el-table-column label="包材" width="60" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.WRAP }}</span>
            </template>
          </el-table-column>
          <el-table-column label="生产企业" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.MANUFACTURE }}</span>
            </template>
          </el-table-column>
          <!--<el-table-column label="产品来源">-->
          <!--<template slot-scope="scope">-->
          <!--<span>{{{"0": "新增产品申报", "1": "选择产品申报", "2": "备案产品申报"}[scope.row.DECLARESOURCE]}}</span>-->
          <!--</template>-->
          <!--</el-table-column>-->
          <el-table-column label="当前状态">
            <template slot-scope="scope">
              <span>{{{
                "0": "未提交",
                "1": "已提交",
                "2": "公示中",
                "3": "质疑中",
                "4": "澄清中",
                "5": "审核中",
                "6": "挂网中",
                "8": "确认中",
                "9": "已确认"
              }[scope.row.STATE]}}</span>
            </template>
          </el-table-column>
          <el-table-column label="交易状态">
            <template slot-scope="scope">
              <span>{{{
                "0": "",
                "1": "主动下架",
                "2": "自动下架",
                "3": "上架"
              }[scope.row.DEALSTATE]}}</span>
            </template>
          </el-table-column>
          <el-table-column label="审核结果">
            <template slot-scope="scope">
              <span
                v-if="scope.row.CPCHECKFLAG=='0' || scope.row.AUDITRESULT =='0' || scope.row.PRICEAUDITRESULT == '0'">未审核</span>
              <span
                v-else-if="scope.row.CPCHECKFLAG=='2'|| scope.row.AUDITRESULT =='2' || scope.row.AUDITRESULT == '3' || scope.row.PRICEAUDITRESULT =='2' || scope.row.PRICEAUDITRESULT == '3'">审核不通过</span>
              <span
                v-else-if="scope.row.CPCHECKFLAG=='1' && scope.row.AUDITRESULT =='1' && scope.row.PRICEAUDITRESULT == '1'">审核通过</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180px">
            <template slot-scope="scope">
              <div class="operates">
                <span><a class="operation-btn" @click="handleView(scope.row.ID,scope.row.AUDITRESULT)">详情</a></span>
                <span
                  v-if="scope.row.STATE!='0' && scope.row.STATE!='5' && scope.row.STATE!='6' && scope.row.AUDITRESULT == '0'"><a
                  class="operation-btn" @click="rollbackProduct(scope.row.ID)">撤回</a></span>
                <span
                  v-if="scope.row.STATE=='0' && scope.row.AUDITRESULT == '0' && (scope.row.PRICEAUDITRESULT == undefined || scope.row.PRICEAUDITRESULT == '0')"><a
                  class="operation-btn" @click="goUpdate(scope.row.ID)">修改</a></span>
                <span
                  v-if="scope.row.STATE=='0' && scope.row.AUDITRESULT !='0' && (scope.row.PRICEAUDITRESULT == undefined || scope.row.PRICEAUDITRESULT!='0')"><a
                  class="operation-btn" @click="goCopy(scope.row.ID)">复制</a></span>
                <span
                  v-if="scope.row.STATE=='0' && scope.row.AUDITRESULT == '0' && (scope.row.PRICEAUDITRESULT == undefined || scope.row.PRICEAUDITRESULT =='0')"><a
                  class="operation-btn" @click="handleDelete(scope.row.ID)">删除</a></span>
                <span
                  v-if="scope.row.STATE=='0' && scope.row.AUDITRESULT == '0' && (scope.row.PRICEAUDITRESULT == undefined ||scope.row.PRICEAUDITRESULT =='0')"><a
                  class="operation-btn" @click="submitProduct(scope.row.ID)">提交</a></span>
                <span v-if="scope.row.DEALSTATE=='1' || scope.row.DEALSTATE == '2'"><a
                  class="operation-btn">上架</a></span>
                <span v-if="(scope.row.DEALSTATE == '3' && scope.row.falg == '1') && scope.row.STATE != '0'"
                      @click="openVisible(scope.row.ID)"><a class="operation-btn">下架</a></span>
                <span v-if="scope.row.DEALSTATE=='1' || scope.row.DEALSTATE == '2'"><a
                  class="operation-btn">下架原因</a></span>
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
      <select-product ref="selectProduct"></select-product>
      <find-view ref="findView"></find-view>
      <add-or-up v-if="addOrUpShow" ref="addOrUp"></add-or-up>
      <check-product ref="checkProduct"></check-product>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="Visible"
      width="30%"
      :before-close="handleClose">
      <el-form ref="commitData" :model="commitData" :inline="true" class="demo-form-inline table-form">
        <el-form-item>
          <el-input  placeholder="下架原因" type="textarea" v-model="commitData.remark">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="visible = false">关 闭</el-button>
    <el-button type="primary" @click="">提 交</el-button>
  </span>
    </el-dialog>

  </div>
</template>
<script>
  import selectProduct from './selectProduct'
  import addOrUp from './addOrUp'
  import findView from './findView'
  import checkProduct from './checkProduct'
  import {
    queryList,
    submit,
    rollback,
    remove,
    checkOrg,
    checkProductDeclare
  } from 'src/axios/auditchanges/messageDeclare/product'
  import {keyBoardEnter} from "src/utils";

  export default {
    components: {
      selectProduct,
      addOrUp,
      findView,
      checkProduct
    },
    data() {
      return {
        visible: false,
        addOrUpShow: false,
        activeName: 'first',
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        selection: '',
        commitData:this.putawayData(),
        options: [{
          value: '',
          label: '全部'
        }, {
          value: '0',
          label: '未提交'
        }, {
          value: '1',
          label: '已提交'
        }]
      }
    },
    created() {
      this.list()
    },
//    //导航守卫 监测到路由变化后 删除本地搜索条件
//    beforeRouteLeave(to,from,next){
//         sessionStorage.removeItem('query')
//         next()
//    },
    methods: {
      putawayData(){
        return{
          remark:'',
          catProductId:''
        }
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      openVisible(id) {
        this.visible = true;
        this.commitData.catProductId = id;
      },
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData() {
        return {
          pageNum: 0,
          pageSize: 10,
          size: 10,
          startRow: 0,
          endRow: 0,
          total: 0,
          pages: 0,
          prePage: 0,
          nextPage: 0,
          isFirstPage: false,
          isLastPage: true,
          hasPreviousPage: false,
          hasNextPage: false,
          navigatePages: 8,
          navigatepageNums: [],
          navigateFirstPage: 0,
          navigateLastPage: 0,
          firstPage: 0,
          lastPage: 0,
          list: []
        }
      },
      metaQuery() { // 表单查询数据初始化
        let obj = {
          id: undefined,
          searchName: undefined,
          searchDosageForm: undefined,
          searchSpec: undefined,
          searchOrg: undefined,
          searchState: undefined
        };
        if (sessionStorage.getItem('query')) {
          obj = JSON.parse(sessionStorage.getItem('query'))
        }
        return obj
      },
      //查询
//      searchEnterFun(e){
//        sessionStorage.setItem('query',JSON.stringify(this.query))
//        this.$store.state.pageSeach.pageNum = 1;
//        this.resData.pageNum=1;
//        keyBoardEnter(e, () => {
//          this.list();
//        })
//      },
      getRowkeys(row) {
        return row.ID;
      },
      list() {
        queryList(this.resData, this.query).then(res => {
          this.resData = res.data
          console.log(this.resData)
          if (this.resData.pageNum == 0) {
            this.resData.pageNum == 1
          }
        })
      },
      toChange(t) {
        if (t.name == "second") {
          this.$router.push('/AUDIT/messageChanges/productMessageChangeList');
        }
        if (t.name == "three") {
          this.$router.push('/AUDIT/messageDoubt/productMessageDoubt');
        }
        if (t.name == "four") {
          this.$router.push('/AUDIT/messageDoubt/productMessageDoubtChange');
        }
        if (t.name == "five") {
          this.$router.push('/AUDIT/orgClarify/productMessageDeclareClarify');
        }
        if (t.name == "six") {
          this.$router.push('/AUDIT/orgClarify/productMessageChangeClarify');
        }

      },
      handleSizeChange(val) {
        this.resData.pageSize = val;
        this.list()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val;
        this.list()
      },
      handleFromView() {
        this.$nextTick(() => {
          this.$refs.checkProduct.list()
        })
      },
      goCopy(id) {
        this.$nextTick(() => {
          checkProductDeclare(id).then(res => {
            if (res.data != '0') {
              this.$message.error("当前产品正在申报中");
              return;
            } else {
              this.addOrUpShow = true;
              this.$nextTick(() => {
                this.$refs.addOrUp.copy(id)
              })
            }
          })
        })
      },
      goUpdate(id) {
        this.addOrUpShow = true;
        this.$nextTick(() => {
          this.$refs.addOrUp.list(id)
        })
      },

      handleView(id, auditResult) {
        this.$nextTick(() => {
          if (auditResult == '0' || auditResult == undefined || auditResult == '') {
            this.$refs.findView.list(id)
          } else {
            this.$refs.findView.copy(id)
          }
        })
      },
      handleDelete(id) {
        this.$confirm(`确定删除吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          remove(id).then(res => {
            this.$message({
              message: "删除成功",
              type: 'success',
              onClose: function () {
                window.location.reload()
              }
            })
          })
        })
      },
      rollbackProduct(id) {
        rollback(id).then(res => {
          if (res.success) {
            this.$message({
              message: res.exceptionMessage,
              type: 'success'
            })
            this.list();
          } else {
            this.$message({
              message: res.exceptionMessage,
              type: 'error'
            })
          }
        })

      },
      handleQuery() {
        this.list()
      },
      restQuery() {//重置
        sessionStorage.removeItem('query')
        this.query = this.metaQuery();
        this.list();
      },
      submitProduct(id) {
        let _this = this;
        submit(id).then(res => {
          if (res.data == '提交成功') {
            _this.$message({
              message: "提交成功",
              type: 'success'
            })
            this.list();
          } else {
            _this.$message.error(res.data)
          }
        })

      },
      handleSelectionChange(val) {
        let len = val.length - 1;
        //val 所选对象
        let arr = '';
        for (let i in val) {
          console.log(i);
          if (i == len) {
            arr += val[i].ID
          } else {
            arr += val[i].ID + ','
          }
        }
        this.selection = arr;
      },
      selectProductView() {
        this.$nextTick(() => {
          this.$refs.selectProduct.fillData()
        })
      },
    }
  }
</script>
