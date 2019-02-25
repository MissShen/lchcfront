<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <el-form ref="query" :model="query" label-position="right" size="small" class="table-form" :inline="true">
        <el-form-item class="width-120">
          <el-select v-model="query.searchPurchaseState"  placeholder="采购单状态" @keyup.enter.native="searchEnterFun" size="small">
              <span  v-if="roleCode == 'director' || (roleCode == 'serviceCenter' && (secondCheck == '' || secondCheck == null) ) ">

                <el-option
                  v-for="(item,index) in query.purchState"
                  :key="index"  :label="item.label" :value="item.value"></el-option>
              </span>
            <span  v-if="roleCode == 'service' || roleCode == 'manage' ||roleCode == 'doctor' || (roleCode == 'serviceCenter' && secondCheck != '' && secondCheck != null )" >
                <el-option
                  v-for="(item,index) in query.purchStateSecond"
                  :key="index"  :label="item.label" :value="item.value"></el-option>
              </span>
          </el-select>
        </el-form-item>
        <el-form-item class="width-120">
          <el-input v-model="query.searchBuyerName" @keyup.enter.native="searchEnterFun" placeholder="买方机构" size="small"></el-input>
        </el-form-item>
        <el-form-item class="width-120">
          <el-select v-model="query.searchPurchaseFlag" @keyup.enter.native="searchEnterFun" placeholder="采购类别" size="small">
            <el-option label="全部类别" value=""></el-option>
            <el-option label="本院订单" value="0"></el-option>
            <el-option label="临时订单" value="1"></el-option>
            <el-option label="本院补单" value="2"></el-option>
            <el-option label="临时补单" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="width-120">
          <el-input v-model="query.searchPurchaseCode" @keyup.enter.native="searchEnterFun" placeholder="采购单号" size="small"></el-input>
        </el-form-item>
        <el-form-item class="width-120">
          <el-input v-model="query.searchByName" @keyup.enter.native="searchEnterFun" placeholder="采购单别名" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker type="date" placeholder="创建开始日期" v-model="query.searchBenDate" size="small" @keyup.enter.native="searchEnterFun"
                          format="yyyy-MM-dd" value-format="yyyy-MM-dd" ></el-date-picker>
          &nbsp;至&nbsp;
          <el-date-picker type="date" placeholder="创建结束日期" v-model="query.searchEndDate" size="small" @keyup.enter.native="searchEnterFun"
                          format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item class="width-60" v-if="roleCode==='serviceCenter'">
          <el-checkbox @keyup.enter.native="searchEnterFun" v-model="checkedAll">全部</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
          <el-button type="warning" @click="restQuery()" size="small">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          @sort-change="sortChang"
          border
          stripe
          tooltip-effect="dark"
          @cell-click="handleCell">
          <!--<el-table-column type="index" width="50" label="序号" header-align="left" align="center">
          </el-table-column>-->
          <el-table-column label="采购单编号" prop="p.purchase_Code" sortable="custom" width="140" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>
                {{ scope.row.purchaseCode}}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="买方机构" prop="p.bak_Buyer_Easy" sortable="custom" show-overflow-tooltip >
            <template slot-scope="scope">
              {{ scope.row.bakBuyerEasy == null ?  scope.row.bakBuyerName:scope.row.bakBuyerEasy }}
            </template>
          </el-table-column>
          <el-table-column label="创建时间" prop="p.create_date" sortable="custom" width="140" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>
                {{ scope.row.createDate}}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="采购金额" prop="p.REQUEST_TOTAL" sortable="custom" header-align="left" align="right" width="100">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.requestTotal) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="到货金额" prop="receive_Total" sortable="custom" header-align="left" align="right" width="100">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.receiveTotal) }}</span>
            </template>
          </el-table-column>

          <el-table-column label="采购类别" prop="p.flag" sortable="custom" width="130" align="center">
            <template slot-scope="scope">
              <span >{{ getFlag(scope.row.flag) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="采购单别名" prop="p.BY_NAME" sortable="custom"  show-overflow-tooltip>
            <template slot-scope="scope">
              <span @click="dataBackFillGoods" class="flo-right" v-if="scope.row.purchaseId != cellIndex">{{ scope.row.byName }}<i class="el-icon-edit"></i></span>
              <span><el-input size="small" v-model="scope.row.byName"
                              v-if="scope.row.purchaseId===cellIndex"
                              @blur="handleCellSubmit(scope.row.approveRemark,scope.row.orderRemark,scope.row.byName,scope.row.purchaseId)"
              ></el-input></span>
            </template>
          </el-table-column>
          <el-table-column label="状态" prop="p.PURCHASE_STATE" sortable="custom" width="80" align="center">
            <template slot-scope="scope">
              <!--<span>{{ getState(scope.row.purchaseState) }}</span>-->
              <span v-if="roleCode == 'director' || roleCode == 'doctor' || (roleCode == 'serviceCenter' && (secondCheck == '' || secondCheck == null)) ">
                {{ getStateNoSecond(scope.row.purchaseState) }}
              </span>
              <span v-if="roleCode == 'service' || roleCode == 'manage' || (roleCode == 'serviceCenter' && secondCheck != '' && secondCheck != null )">
                {{ getState(scope.row.purchaseState) }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="270">
            <template slot-scope="scope">
              <div class="operates">
                <span class="btn-word-2">
                  <a v-if="scope.row.purchaseState == 2 || scope.row.purchaseState == 4" @click="skipOrdOrderItem(scope.row.purchaseCode)">订单</a>
                  <a class="blue-bord" @click="checkOne(scope.row.purchaseId)"
                     v-if="scope.row.isEdit == '1' && (scope.row.purchaseState == '0' || scope.row.purchaseState == '3' || scope.row.purchaseState == '6')" >
                    编辑
                  </a>
                  <a class="blue-bord" @click="checkOne(scope.row.purchaseId)"
                     v-if="scope.row.isEdit == '1' && scope.row.purchaseState != '0' && scope.row.purchaseState != '3' && scope.row.purchaseState != '6'" >
                    审批
                  </a>
                </span>
                <span>
                  <a v-if="scope.row.templateState == '0' && scope.row.roleCode !='manage'" @click="openDialog(scope.row.purchaseId,'1')">设置模板</a>
                  <a v-if="scope.row.templateState == '1'" @click="cancelTemPlat(scope.row.purchaseId,'0')">取消模板</a>
                </span>
                <!-- <a class="operation-btn" @click="getPrintData(scope.row.purchaseId)">打印</a>-->
                <span>
                  <a @click="exportShowInfoExcel(scope.row.purchaseId)">导出</a>
                </span>
                <span>
                  <a @click="copySave(scope.row.purchaseId)" v-if="scope.row.roleCode !='manage'">复制</a>
                </span>
                <!--<span>-->
                <!--<a @click="showInfo(scope.row.purchaseId)">详情</a>-->
                <!--</span>-->
                <span>
                  <a v-if="scope.row.isEdit != '1'" @click="showInfo(scope.row.purchaseId)">详情</a>
                </span>
                <span>
                  <a class="red" @click="backPurchase(scope.row.purchaseId)"
                     v-if="scope.row.isBack =='1'" >
                    <!--(scope.row.purchaseState=='1' && (roleCode == 'doctor' || roleCode == 'service'))-->
                    <!--|| (scope.row.purchaseState=='5' && roleCode == 'serviceCenter')-->
                    撤销
                  </a>
                  <a class="red" @click="handleSendbackPurchase(scope.row.purchaseId)"
                     v-if="(scope.row.isSendback=='1' )" >
                    撤回
                  </a>
                  <a class="red" @click="deletePurchase(scope.row.purchaseId)"
                     v-if="scope.row.purchaseState=='0' || scope.row.purchaseState=='3' || scope.row.purchaseState=='6'" >
                    删除
                  </a>
                </span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
          title="模板名称"
          :visible.sync="dialogVisible"
          custom-class="w40">
          <!--    <span><textarea id="templateContent"></textarea> (在此输入模板名称) </span>-->
          <el-form>
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              v-model="templateContent">
            </el-input>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="commit(this)">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 表格分页 -->
        <div class="pagebox">
          <ul class="explain">
            <li><i class="ico icon-jc"></i><span>部分急需</span></li>
            <li><i class="ico icon-ji"></i><span>全部急需</span></li>
          </ul>
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 30]"
            :total="resData.total"
            :page-size="resData.pageSize"
            :page-count="resData.pages"
            :pager-count="5"
            :current-page.sync="resData.pageNum">
          </el-pagination>
        </div>
      </div>
      <div class="foot-btn">
        <div class="foot-left">
          <span>
            <el-button type="warning" size="small" @click="exportExcel">导出采购单</el-button>
          </span>
          <span>
            <el-checkbox v-model="checked">包含明细</el-checkbox>
          </span>
        </div>
        <div class="foot-right">
          <a class="padding20 font-black" target="_blank" href="https://inv-veri.chinatax.gov.cn/">点击进入"国家税务局全国<span class="red">增值税发票查验</span>平台"</a>
        </div>
      </div>

    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求
  import {queryFirstPlanList,deletePurchase,copySave,updatePurchaseState,updateTemplateSave,exportEXL,exportShowInfoEXL,
    findRole,queryFirstApprovePurchaseItemList,findFirstApprovePurchase,sendbackPurchase,findSecondFlag,updateRemark}
    from 'src/axios/trade/purchase/purchase'
  import fileUpload from 'js-file-download'
  import {priceFormat,keyBoardEnter} from "src/utils";
  import {getRoleCode} from 'src/axios/trade/evaluate/evaluate';

  export default {
    name:'based-city-snder-list',
    data () {
      return {
        templateContent:"",
        resMainData: this.metaMainData(),
        htmlResData:this.metaData(),
        dialogVisible: false,
        cellIndex: undefined,
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        checked:false,
        currentOrder: undefined,
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        template:{
          purchaseId : '',
          byName: '',
          status:''
        },
        checkedAll:false,
        roleCode:'',
        printShow: false,
        printList: {
          printData: [],
          printLabel: [
            {'labelName': '产品名', 'labelValue': 'htmlProductName'},
            {'labelName': '产品信息', 'labelValue': 'htmlBakProductSpec'},
            {'labelName': '配送地址', 'labelValue': 'addressAbbr','width': 150},
            {'labelName': '价格', 'labelValue': 'unitPrice','width': 150, 'align': 'right', 'headerAlign': 'left'},
            {'labelName': '配送企业', 'labelValue': 'bakSenderEasy'},
            {'labelName': '数量', 'labelValue': 'requestQty'},
            {'labelName': '备注', 'labelValue': 'remark'},
          ]
        },
        secondCheck:'',
      }
    },
    created () {
//      getRoleCode();
      this.list();
    },
    methods: {
      priceFormat,
      // -------------------------------------------- 数据初始化  -----------------------------------------
      skipOrdOrderItem(purchaseCode){
        this.$emit('refreshTab','second',purchaseCode);
      },
      metaData () {
        return {
          // 前后台交互数据封装格式
          orderBy:undefined,
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
      metaMainData () {
        return {
          purchaseCode: undefined,
          createDate: undefined,
          requestTotal: undefined,
          createName: undefined,
          linkPhone: undefined,
          bakBuyerEasy: undefined,
          purchaseState: undefined,
          purchaseRemark: undefined,
          approveRemark: undefined,
          repositoryFlag: false,
          orderRemark: undefined
        }
      },
      metaQuery () { // 表单查询数据初始化
        return {
          searchPurchaseFlag: undefined,
          searchBuyerName: undefined,
          purchState:[
            {value:'',label:'全部'},
            {value:'1',label:'送审'},
            {value:'2',label:'发送'},
            {value:'3',label:'审核拒绝'},
            {value:'4',label:'完成'}
          ],
          purchStateSecond:[
            {value:'',label:'采购单状态'},
            {value:'0',label:'准备'},
            {value:'1',label:'送一审'},
            {value:'2',label:'发送'},
            {value:'3',label:'一审拒绝'},
            {value:'4',label:'完成'},
            {value:'5',label:'送二审'},
            {value:'6',label:'二审拒绝'}
          ],
          searchPurchaseState: undefined,
          searchByName: undefined,
          searchPurchaseCode: undefined,
          searchBenDate:undefined,
          searchEndDate: undefined,
          dataFlag: undefined
        }
      },
      sortChang(value){
        let sortType=" desc";
        if(value.order.startsWith("asc")){
          sortType=" asc";
        }
        this.currentOrder=value.prop + sortType;
        this.list()
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
      },
      dataBackFillGoods () {
        this.remarkShow=!this.remarkShow;
      },
      handleCellSubmit(approveRemark,orderRemark,byName,purchaseId){
        updateRemark(approveRemark,orderRemark,byName,purchaseId).then(res => {
          this.$message({
            message: res.data,
            type: 'success',
            duration: 1000,
            onClose: () => {
            }
          })
        })
      },
      handleCell(row, column, cell, event){
        if(column.label=="采购单别名"){
          this.cellIndex=row.purchaseId;
        }else{
          this.cellIndex=undefined;
        }
      },
      exportExcel(){
        if(this.query.searchBenDate == undefined || this.query.searchBenDate == ''){
          this.$message({
            type: 'error',
            message: '请选择创建的开始日期及创建的结束日期'
          });
          return false;
        }else{
          let flag;
          if(this.checked == true){
            flag ='1'
          }else{
            flag = '0'
          }
          exportEXL(this.query,flag).then(res => {
            let headers = res.headers;
            let title = "";
            if (!title) {
              const fileName = headers['content-disposition'];
              title = fileName.includes('filename=') ? decodeURI(fileName.split('=')[1]) : '下载的文件';
            }
            fileUpload(res.data,title,"application/vnd.ms-excel")
          })
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        var _this = this;
        var state = '';
        findRole().then(res => {
          this.roleCode = res.data;
   /*       if (this.roleCode == "serviceCenter" && this.query.searchPurchaseState==undefined) {
            state = '1';
//            this.checkedAll=true;
          } else if (this.roleCode == "manage" && this.query.searchPurchaseState==undefined) {
            state = '5';
//            this.checkedAll=false;
          }else{
//            this.checkedAll=false;
          }*/

          findSecondFlag().then(res => {
            this.secondCheck = res.data;
          });

          let dataFlag;
          if (this.checkedAll == false) {
            this.dataFlag = '0';
          }
          else {
            this.dataFlag = "1";
          }
          this.resData.orderBy = this.currentOrder;
          this.query.dataFlag = this.dataFlag;
          if (undefined== _this.query.searchPurchaseState){
            _this.query.searchPurchaseState = state;
          }
          if(_this.query.searchPurchaseState=='1'){
            this.checkedAll=true;
          }
//          else{
//            this.checkedAll=false;
//          }
          this.$nextTick(()=>{
            queryFirstPlanList(this.resData, this.query).then(res => {
              this.resData = res.data;
              if(this.resData.pageNum === 0){
                this.resData.pageNum = 1
              }
            });
          })
        });

      },
      restQuery() {
        this.query = this.metaQuery();
        this.list();
      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val;
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val;
        this.list()
      },
      getFlag(flag){
        var arrFlag = ['本院订单', '临时订单', '本院补单', '临时补单'];
        return arrFlag[flag];
      },
      getState(state){
        var arrState = ['准备', '送一审', '发送', '一审拒绝','完成','送二审','二审拒绝','购物车状态','撤回'];
        return arrState[state];
      },
      getStateNoSecond(state){
        var arrState = ['准备', '送审', '发送', '审核拒绝','完成','送二审','二审拒绝','购物车状态','撤回'];
        return arrState[state];
      },
      showInfo(purchaseId){
        this.$router.push("/trade/manage/firstInstanceRole/queryItemInfo/" + purchaseId)
      },
      copySave(purchaseId){
        copySave(purchaseId).then(res => {
          this.$message({
            message: '复制成功',
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.list()
            }
          })
        });
      },
      deletePurchase(purchaseId){
        this.$confirm('确认删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deletePurchase(purchaseId).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.list()
              }
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      checkOne(purchaseId){
        this.$router.push("/trade/manage/firstInstanceRole/checkOne/" + purchaseId+"/"+'order')
      },
      backPurchase(purchaseId){
        updatePurchaseState(purchaseId).then(res => {
          this.$message({
            message: res.data,
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.list()
            }
          })
        })
      },
      orderPurchase(orderId){
        this.$router.push("/trade/manage/orderItemList/" + orderId)
      },
      printInfo(purchaseId){
        this.$message({
          type: 'info',
          message: '打印待做'
        });
      },
      handleSendbackPurchase(purchaseId){
        this.$confirm(`确定整单作废吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          sendbackPurchase(purchaseId).then(res => {
            var flag = res.data;
            if(flag == 0){
              this.$alert(`配送已操作，不能整单作废`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(res => {
                this.list()
              })
            }
            else if(flag == 1){
              this.$alert(`整单作废成功`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(res => {
                this.list()
              })
            }else{
              this.$alert(res.message,'提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                dangerouslyUseHTMLString: true
              }).then(() => {
                this.list()
              })
//              this.$alert({
//                message: res.success == true ? res.data : res.message,
//                type: res.success == true ? 'success' : 'error',
//                duration: 3000,
//                onClose: () => {
//                  this.list()
//                }
//              })
            }
          })
        })
      },
      commit(el){
        this.template.byName=this.templateContent;
        updateTemplateSave(this.resData,this.template).then(res => {
          this.$message({
            message: res.data,
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.templateContent=""
              this.list()
            }
          })
        });
        this.dialogVisible = false
      },
      openDialog(ids,status){
        this.template.purchaseId=ids;
        this.template.status=status;
        this.dialogVisible=true;
      },
      cancelTemPlat(purchaseId,status){
        this.template.byName='';
        this.template.status=status;
        this.template.purchaseId=purchaseId;
        updateTemplateSave(this.resData,this.template).then(res => {
          this.$message({
            message: res.data,
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.list()
            }
          })
        })
      },
      //打印功能
      getPrintData(purchaseId){
        queryFirstApprovePurchaseItemList(this.htmlResData, this.query,purchaseId).then(res => {
          this.htmlResData = res.data;
          if(this.htmlResData.pageNum === 0){
            this.htmlResData.pageNum = 1
          }
          findFirstApprovePurchase(this.purchaseId).then(res => {
            this.resMainData = res.htmlResData
          })
        });


        this.printList.printData = this.htmlResData.list.map(item => {
          item.htmlProductName  = '<div class="hiddenfont"><span>' + item.bakMedicalName + '</span></div>'
          if(item.bakTradeName === null || item.bakTradeName === ''){
            item.htmlProductName += '<div class="hiddenfont">(商品名：无)</div>'
          }else {
            item.htmlProductName += '<div class="hiddenfont">(商品名：' + item.bakTradeName + ')</div>'
          }

          item.htmlBakProductSpec='<div>'+item.bakMedicalSpec+' × '+item.bakStandRate +item.useUnit+' /'+ item.metricName
          if(item.middleStandRate === null || item.middleStandRate === ''){
            item.htmlBakProductSpec+=  ' &nbsp;&nbsp; 中大包装:/' +'</div>'+'<div>'+item.bakFactoryEasy+'</div>';
          }else {
            item.htmlBakProductSpec+=   ' &nbsp;&nbsp; 中大包装:'+ item.middleStandRate+'/'+item.bigMiddleRate+'</div>'+'<div>'+item.bakFactoryEasy+'</div>';
          }
          return item
        });
        sessionStorage.removeItem('printList');
        sessionStorage.setItem('printList', JSON.stringify(this.printList));
        //在新页面打开
        let routeData = this.$router.resolve({path: '/printTable'});
        window.open(routeData.href, '_blank');
      },

      //--------------------------------------------导出详情Excel------------------------------------
      exportShowInfoExcel(purchaseId) {
        exportShowInfoEXL(this.resData,this.query,purchaseId).then(res => {
          let headersInfo = res.headers;
          let titleInfo = ""
          if (!titleInfo) {
            const fileName = headersInfo['content-disposition'];
            titleInfo = fileName.includes('filename=') ? decodeURI(fileName.split('=')[1]) : '下载的文件';
          }
          fileUpload(res.data,titleInfo,"application/vnd.ms-excel")
        })
      },
      // ----------------------------------------------结束--------------------------------------------------

    }
  }
</script>
