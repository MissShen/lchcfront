<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" :inline="true" class="table-form" size="small">
            <el-form-item class="width-150">
              <el-input size="small" placeholder="品名" maxlength="200" v-model="query.productName" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item class="width-150">
              <el-input size="small" placeholder="生产企业" maxlength="200" v-model="query.manufactureName" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item class="width-150">
              <el-select v-model="query.isCompanyDeclare" placeholder="是否企业申报" size="small">
                <el-option
                  v-for="item in isCompanyDeclares"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="width-150">
              <el-select v-model="query.purchaseMode" placeholder="采购方式" size="small">
                <el-option
                  v-for="item in purchaseModes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="width-150">
              <el-select v-model="query.matchingDegree" placeholder="匹配度" size="small">
                <el-option
                  v-for="item in matchingDegrees"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="success" @click="searchEnterFun" >查询</el-button>
               <el-button size="small" type="warning" @click="reset()">重置</el-button>
            </el-form-item>
        </el-form>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          style="width: 100%"
          border
          stripe
          @sort-change="sortChange">
          <el-table-column label="通用名" width="115" prop="NAMECHN" sortable="custom" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.nameChn }}</span>
            </template>
          </el-table-column>
          <el-table-column label="产品名" prop="productName" width="150">
            <template slot-scope="scope">
              <div class="ellipsis es150" :title="scope.row.productName">{{ scope.row.productName }}</div>
              <div class="ellipsis es150" :title="scope.row.tradeName">(商品名：{{ scope.row.tradeName }})</div>
            </template>
          </el-table-column>
          <el-table-column label="产品信息" prop="drug_Detail" width="150">
            <template slot-scope="scope">
              <div class="pro-details ellipsis es200"
                   :title="scope.row.spec+'×'+scope.row.standRate+scope.row.smallestUnits+'/'+scope.row.specUnit+'('+scope.row.wrapName+')'+'('+scope.row.doseageFormName+')'">
                {{ scope.row.spec}} × {{ scope.row.standRate}} {{ scope.row.smallestUnits}} / {{scope.row.specUnit}} ({{scope.row.wrapName}}) ({{ scope.row.doseageFormName }})
              </div>
              <div class="pro-details ellipsis es200" :title="scope.row.manufactureName">{{ scope.row.manufactureName}}</div>
            </template>
          </el-table-column>
          <el-table-column label="药事会" width="80" prop="WHETHROUGH" sortable="custom">
            <template slot-scope="scope">
              <span v-if="scope.row.wheThrough == 0">目录内</span>
              <span v-else-if="scope.row.wheThrough == 1">目录外</span>
              <span v-else>未上报</span>
            </template>
          </el-table-column>
          <el-table-column label="医院报价" prop="PRICE" sortable="custom" width="90" align="right" header-align="left">
            <template slot-scope="scope">
              <span>{{ scope.row.price }}</span>
            </template>
          </el-table-column>
          <el-table-column label="企业报价" prop="BIDPRICE" sortable="custom" width="90" align="right" header-align="left">
            <template slot-scope="scope">
              <span v-if="scope.row.resState != 1">待议价</span>
              <span v-else>{{ scope.row.bidPrice }}</span>
            </template>
          </el-table-column>
          <el-table-column label="参考价" prop="MINPRICE" sortable="custom" width="80" align="right" header-align="left">
            <template slot-scope="scope">
              <!--<el-tooltip effect="dark"  placement="top">
                <div slot="content">{{referencePrice(scope.row.minPrice,scope.row.orgName,scope.row.bjPrice,scope.row.hbPrice,scope.row.tjPrice)}}</div>
                <span>{{scope.row.minPrice}}</span>
              </el-tooltip>-->
              <span>{{scope.row.minPrice}}</span>
            </template>
          </el-table-column>
          <!--<el-table-column label="候选目录" prop="RESSTATE" sortable="custom" width="90">
            <template slot-scope="scope">
              <span v-if="scope.row.resState == 0">目录外</span>
              <span v-if="scope.row.resState == 1">目录内</span>
              <span v-if="scope.row.resState == 2">其他</span>
            </template>
          </el-table-column>-->
          <el-table-column label="企业申报" prop="ISCOMPANYDECLARE" sortable="custom" width="90">
            <template slot-scope="scope">
              <span v-if="scope.row.isCompanyDeclare != 0">已申报</span>
              <span v-if="scope.row.isCompanyDeclare == 0">未申报</span>
            </template>
          </el-table-column>
          <el-table-column label="采购方式" width="90">
            <template slot-scope="scope">
              <span v-if="scope.row.directJoin != 0">直接加入</span>
              <span v-else-if="scope.row.replaceJoin1 != 0 || scope.row.replaceJoin2 != 0">替换加入</span>
              <span v-else-if="scope.row.joinAlternativeBargaining != 0">加入备选议价</span>
              <span v-else>未加入</span>
            </template>
          </el-table-column>
          <el-table-column label="匹配度" prop="ISCOMPANYDECLARE" sortable="custom" width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.isCompanyDeclare != 0">相同</span>
              <span v-if="scope.row.isCompanyDeclare == 0">替换</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
                <a class="operation-btn" v-if="scope.row.resState==1 && scope.row.alterNativeCount==0"
                   @click="(scope.row.hosCount)>0?removePurchaseCatalog(scope.row.productId):addPurchaseCatalog(scope.row.productId)"
                   size="small">{{(scope.row.hosCount)>0?"删除采购目录":"加入采购目录"}}</a>
                <a class="operation-btn" v-if="scope.row.resState==1 && scope.row.hosCount==0"
                   @click="(scope.row.alterNativeCount)>0?removeAlternativeBargainingForone(scope.row.productId):showAlternativeBargainingForone(scope.row.productId)"
                   size="small">{{(scope.row.alterNativeCount)>0?"删除备选议价":"加入备选议价"}}</a>
                 <a class="operation-btn" @click="replaceProduct(scope.row)" size="small">替换产品</a>
                 <a class="operation-btn" @click="anymoreUseIsEnable(scope.row.id)" size="small">不再使用</a>
            </template>
          </el-table-column>
        </el-table>
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
      </div>

      <!--添加备选议价弹窗-->
      <el-dialog title="加入备选议价备注" :visible.sync="showAlternativeBargaining" :before-close="closeAlternativeBargaining" width="60%">
        <el-form :inline="true" ref="AlternativeBargainingText" :model="AlternativeBargainingText" class="demo-form-inline">
           <span style="width:60%;text-align: center">
               <el-input
                 type="textarea"
                 :rows="2"
                 placeholder="请输入备注内容"
                 v-model="AlternativeBargainingText.textarea">
                </el-input>
          </span>
        </el-form>
        <span slot="footer">
          <el-button type="primary" @click="closeAlternativeBargaining()">关闭</el-button>
          <el-button type="primary" @click="insertAlternativeBargaining()">保存</el-button>
        </span>
      </el-dialog>

      <form-view v-if="formViewVisible" ref="formView"></form-view>

    </div>
    <!-- ========================== 弹窗引用外部页面 ========================= -->
    <!-- “新增菜单/修改菜单” demo-auditmenu.vue -->
    <!--<form-view v-if="formViewVisible" :parent-id="id" ref="formView" @refreshData="metaList"></form-view>
    &lt;!&ndash; “按钮管理” menuButton.vue &ndash;&gt;
    <menu-button v-if="menuButtonVisible" :parent-id="levelTwoId" ref="menuButton"></menu-button>-->


    <!-- ========================== 主内容end ========================= -->
  </div>
</template>
<script>

  // 引入用户相关请求  引自js文件
  import {
    selectHospitalReportDrugList,
    insertPurchaseCatalog,
    deletePurchaseCatalog,
    anymoreUse,
    insertAlternativeBargainingHttp,
    deleteAlternativeBargainingHttp
  } from 'src/axios/contract/hospitalreportdrug/hospitalReportDrug'

  import { keyBoardEnter } from "src/utils"

  import formView from 'src/pages/contract/catalogmanagement/hospitalreportdrug/replaceproduct/replaceProductTabs'

  export default {
    name: "hospitalReportDrugTabsTabFirst",
    components: {
      formView: formView
    },

    data() {
      return {
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        currentOrder: undefined,
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        formViewVisible: false,//外弹窗查询初始化
        showAlternativeBargaining: false,
        AlternativeBargainingText:{textarea:""},
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        obj: {},
        isCompanyDeclares: [
          {
            value: '1',
            label: '已申报'
          },
          {
            value: '0',
            label: '未申报'
          }
        ],
        purchaseModes: [
          {
            value: '1',
            label: '直接加入'
          },
          {
            value: '2',
            label: '替换加入'
          },
          {
            value: '3',
            label: '备选议价'
          },
          {
            value: '4',
            label: '未加入'
          },
        ],
        matchingDegrees: [
          {
            value: '1',
            label: '相同'
          },
          {
            value: '0',
            label: '替换'
          }
        ]
      }
    },
    created() {
      this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData() {
        return {
          orderBy: undefined,
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

      // 打开用户新增页面
      handleGoAdd() {
        this.resetForm()
        this.form = this.metaForm()
        this.showForm = true
        /*this.$refs['form'].resetFields()*/
        this.formStatus = 'add'
        this.rules = this.metaRules()
      },

      metaQuery() { // 表单查询数据初始化
        return {
          manufactureName: "",
          productName: "",
          isCompanyDeclare: "",
          purchaseMode: "",
          matchingDegree: ""
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list() {
        this.resData.orderBy = this.currentOrder;
        selectHospitalReportDrugList(this.resData, this.query).then(res => {
          this.resData = res.data
          if (this.resData.pageNum === 0) {
            this.resData.pageNum = 1;
          }
        })
      },
      reset() {
        this.query = this.metaQuery();
        this.list();
      },
      //参考价
      referencePrice(minPrice,orgName,bjPrice,hbPrice,tjPrice){

        if(minPrice == ""||minPrice == null){
          return "空";
        }else {
          if(orgName=="医管局"){
            return  "全国最低价:"+minPrice;
          }else{
            return "河北最低价:"+((hbPrice!=null && hbPrice!='')?hbPrice:'无')+","+"天津最低价:"+((tjPrice!=null && tjPrice!='')?tjPrice:'无')+","+"北京最低价:"+((bjPrice!=null && bjPrice!='')?bjPrice:'无');
          }
        }
      },
      // ************************ 分页操作 ************************
      handleSizeChange(val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val
        this.list()
      },
      //加入采购目录
      addPurchaseCatalog(productId) {
        this.$confirm('是否加入采购目录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          insertPurchaseCatalog(productId).then(res => {
            this.list();
            this.$message({
              message: res.success == true ? res.data : "加入采购目录失败",
              type: res.success == true ? "success" : "error"
            })
          })
        }).catch(()=>{
          /* this.$message({
             message: '已取消操作',
             type: 'info'
           });*/
        });
      },
      //删除采购目录
      removePurchaseCatalog(productId) {
        this.$confirm('是否删除采购目录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deletePurchaseCatalog(productId).then(res => {
            this.list();
            this.$message({
              message: res.success == true ? res.data : "删除采购目录失败",
              type: res.success == true ? "success" : "error"
            })
          })
        }).catch(()=>{});
      },
      //显示备选议价弹框
      showAlternativeBargainingForone(productId){
        this.$confirm('是否加入备选议价?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.productId = productId;
          this.showAlternativeBargaining = true;
        }).catch(()=>{});
      },
      //关闭弹窗
      closeAlternativeBargaining(){
        this.showAlternativeBargaining = false;
      },
      //保存窗口
      insertAlternativeBargaining(){
        if(this.AlternativeBargainingText.textarea.trim() === ""){
          this.$message({
            message: '备注内容不能为空',
            type: 'warning'
          });
          return;
        }
        insertAlternativeBargainingHttp(this.productId,this.AlternativeBargainingText).then(res=> {
          this.showAlternativeBargaining = false;
          this.list();
          this.$message({
            message: res.success == true ? res.data : "加入备选议价失败",
            type: res.success == true ? "success" : "error"
          })
        })
      },
      //删除备选议价
      removeAlternativeBargainingForone(productId){
        this.$confirm('是否删除备选议价?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteAlternativeBargainingHttp(productId).then(res=> {
            this.list();
            this.$message({
              message: res.success == true ? res.data : "删除备选议价",
              type: res.success == true ? "success" : "error"
            })
          })
        }).catch(()=>{});
      },
      replaceProduct(obj){
        this.obj = obj;
        this.formViewVisible = true;
        this.$nextTick(() => {
          this.$refs.formView.fillData(obj);
        });
      },
      //不再使用
      anymoreUseIsEnable(id) {
        this.$confirm('是否确认不再使用?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          anymoreUse(id).then(res => {
            this.list();
            this.$message({
              message: res.success == true ? res.data : res.message,
              type: res.success == true ? "success" : "error"
            })
          })
        }).catch(()=>{});
      },
      sortChange(value){
        let sortType=" desc"
        if(!!value.order){
          if(value.order.startsWith("asc")){
            sortType=" asc";
          }
          this.currentOrder=value.prop + sortType;
        } else {
          this.currentOrder=undefined;
        }
        this.list();
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e , ()=>{
          this.list();
        })
      },
    }
  }
</script>
