<template>
  <div>
    <!-- ========================== 全部退货单 ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
            <el-form-item class="width-90">
              <el-select v-model="query.returnState" @keyup.enter.native="searchEnterFun" placeholder="退货单状态" size="small">
                 <span  v-if="roleCode == 'director' || (roleCode == 'serviceCenter' && (secondCheck == '' || secondCheck == null) ) ">
                    <el-option
                      v-for="(item,index) in query.returnStateFirst"
                      :key="index"  :label="item.label" :value="item.value"></el-option>
                </span>
                <span  v-if="roleCode == 'serviceCenter' && secondCheck != '' && secondCheck != null" >
                   <el-option
                     v-for="(item,index) in query.returnStateSecond"
                     :key="index"  :label="item.label" :value="item.value"></el-option>
                </span>
                <span  v-if="roleCode == 'manage'" >
                   <el-option
                     v-for="(item,index) in query.returnStateManage"
                     :key="index"  :label="item.label" :value="item.value"></el-option>
                </span>
              </el-select>
           </el-form-item>
            <el-form-item class="width-90">
              <el-input v-model="query.purchaseCode" @keyup.enter.native="searchEnterFun" placeholder="采购单号" size="small"></el-input>
            </el-form-item>
            <el-form-item class="width-90">
              <el-input v-model="query.bakFactoryEasy" @keyup.enter.native="searchEnterFun"  placeholder="生产企业" size="small"></el-input>
            </el-form-item>
            <el-form-item class="width-90">
                <el-input v-model="query.buyerName" @keyup.enter.native="searchEnterFun" placeholder="医疗机构" size="small"></el-input>
            </el-form-item>
            <el-form-item class="width-90">
                <el-input v-model="query.senderName" @keyup.enter.native="searchEnterFun" placeholder="配送企业" size="small"></el-input>
            </el-form-item>
            <el-form-item class="width-90">
                <el-input v-model="query.bakProductName" @keyup.enter.native="searchEnterFun" placeholder="品名" size="small"></el-input>
            </el-form-item>
            <el-form-item>
            <el-date-picker type="date" class="width-120" placeholder="创建日期" @keyup.enter.native="searchEnterFun" format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small" v-model="query.createBenDate"></el-date-picker>
              &nbsp;至&nbsp;
            <el-date-picker type="date" class="width-120" placeholder="创建日期" @keyup.enter.native="searchEnterFun"  format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small" v-model="query.createEenDate"></el-date-picker>
            </el-form-item>
            <el-form-item class="width-90">
                <el-input v-model="query.returnCode" @keyup.enter.native="searchEnterFun" placeholder="退货单号" size="small"></el-input>
            </el-form-item>
            <!--<el-form-item class="width-50"  v-if="roleCode==='serviceCenter'">-->
                <!--<el-checkbox v-model="checkedAll">全部</el-checkbox>-->
            <!--</el-form-item>-->
            <el-form-item>
                <el-button type="success" size="small"  @click="searchEnterFun">查询</el-button>
                <el-button size="small" @click="resetForm()" type="warning">重置</el-button>
             </el-form-item>
        </el-form>
      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe
          @sort-change="sortChang"
          tooltip-effect="dark"
          @selection-change="handleSelectionChange">
        >
          <!--<el-table-column type="index" width="50" header-align="left" align="center" label="序号"></el-table-column>-->
          <el-table-column type="selection" width="50" align="center" :selectable="selectable"></el-table-column>
          <el-table-column label="退货单号" width="80" prop="t.return_code" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.returnCode}}</span>
            </template>
          </el-table-column>
       <!--   <el-table-column label="创建时间" min-width="100" prop="t.create_date" sortable="custom" >
            <template slot-scope="scope">
              <span>{{ scope.row.createDate }}</span>
            </template>
          </el-table-column>-->
          <el-table-column label="产品名" min-width="130" prop="item.bak_product_name" sortable="custom">
            <template slot-scope="scope">
              <ul>
              <li>
                <!--tootip提示气泡-->
                <!--:enterable="false" 鼠标不可进入tooltip中-->
                <el-tooltip placement="top" :enterable="false">
                  <!--气泡内容（必须放在slot="content"内）,布局与源内容保持一致-->
                  <div slot="content">
                    <div>{{ scope.row.bakProductName }}</div>
                    <div v-if="scope.row.bakTradeName != '无' && scope.row.bakTradeName !=null">{{ scope.row.bakMedicalMode }}({{ scope.row.bakTradeName }})</div>
                    <div v-if="scope.row.bakTradeName == '无' || scope.row.bakTradeName ==null">{{ scope.row.bakMedicalMode }}</div>
                  </div>

                  <!--源内容（必须放在class="el-tooltip-box"内）-->
                  <div class="el-tooltip-box">
                    <!--加class="text-inline"确保内容不折行-->
                    <div class="text-inline">{{ scope.row.bakProductName }}</div>
                    <div class="text-inline"  v-if="scope.row.bakTradeName != '无' && scope.row.bakTradeName !=null">{{ scope.row.bakMedicalMode }}({{ scope.row.bakTradeName }})</div>
                    <div class="text-inline"  v-if="scope.row.bakTradeName == '无' || scope.row.bakTradeName ==null">{{ scope.row.bakMedicalMode }}</div>
                  </div>
                </el-tooltip>
              </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column prop="drugStorage" label="产品信息" min-width="130">
            <template slot-scope="scope">
              <el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  {{getSpecHints(scope.row.bakMedicalSpec,scope.row.bakStandRate,scope.row.useUnit,scope.row.metricName,scope.row.bakWrapName)}}<br/>
                  {{getPackHints(scope.row.bakFactoryEasy,scope.row.middleStandRate,scope.row.bigMiddleRate)}}
                </div>
                <div class="el-tooltip-box">
                  <div class="text-inline">
                    <span class="text-inline"  v-if="scope.row.bakProductSpec != '空' && scope.row.bakWrapName != null">{{ scope.row.bakProductSpec}} &nbsp;&nbsp; {{ scope.row.bakWrapName}}</span>
                    <span class="text-inline"  v-if="scope.row.bakProductSpec == '空' || scope.row.bakWrapName == null">{{ scope.row.bakProductSpec}}</span>
                  </div>
                  <div class="text-inline" v-if="scope.row.bakFactoryEasy!=''">
                    {{ scope.row.bakFactoryEasy}}&nbsp;&nbsp; 中大包装: {{ scope.row.bakMiddleStandRate}}/{{ scope.row.bakBigMiddleRate}}
                  </div>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="采购单号" width="80" prop="item.purchase_Code" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.purchaseCode}}</span>
            </template>
          </el-table-column>
          <el-table-column label="医疗机构"  min-width="100" prop="buyer_name" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.buyerAbbr }}</span>
            </template>
          </el-table-column>
          <el-table-column label="药库" show-overflow-tooltip v-if="!repositoryFlag"  prop="item.repository_Name" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.repositoryName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="配送企业" prop="item.sender_Easy" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.bakSenderEasy }}</span>
            </template>
          </el-table-column>
          <el-table-column label="地址" show-overflow-tooltip  prop="item.address_abbr" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.addressAbbr }}</span>
            </template>
          </el-table-column>
          <el-table-column label="退货数量" sortable width="90" header-align="left"  align="right"  prop="t.return_Qty" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.returnQty }}</span>
            </template>
          </el-table-column>
          <!--<el-table-column label="退货原因" sortable width="90" header-align="left" align="right" prop="t.buyer_Remark" sortable="custom">-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{ scope.row.buyerRemark }}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <el-table-column label="退货金额" sortable width="90" header-align="left" align="right"  prop="return_total" sortable="custom">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.returnTotal) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="90" align="center" prop="t.return_State" sortable="custom">
            <template slot-scope="scope">
              <span v-if="roleCode == 'director' || (roleCode == 'serviceCenter' && (secondCheck == '' || secondCheck == null)) ">
                {{ getStateNoSecond(scope.row.returnState) }}
              </span>
              <span v-if="roleCode == 'service' || roleCode == 'manage' ||roleCode == 'doctor' || (roleCode == 'serviceCenter' && secondCheck != '' && secondCheck != null )">
                {{ getFlag(scope.row.returnState) }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="130">
            <template slot-scope="scope">
              <div class="operates">
                <a v-if="(roleCode=='manage' && scope.row.returnState=='5')||((roleCode=='serviceCenter' || roleCode=='director')&& scope.row.returnState=='7')" @click="handleFromInfo(scope.row.id,1)" class="blue-bord" >审批</a>
                <a v-if="(roleCode=='manage' && scope.row.returnState=='5')||((roleCode=='serviceCenter' || roleCode=='director')&& scope.row.returnState=='7')" @click="checkOKToCheck('1',scope.row.id)" class="green" >通过</a>
                <a v-if="(roleCode=='manage' && scope.row.returnState=='5')||((roleCode=='serviceCenter' || roleCode=='director')&& scope.row.returnState=='7')" @click="checkOKToCheck('0',scope.row.id)" class="red" >拒绝</a>
                <!--<a v-if="(roleCode=='serviceCenter' || roleCode=='director')&& scope.row.returnState=='7' " @click="handleFromInfo(scope.row.id,1)" class="blue-bord">审批</a>-->
                <!--<a v-if="(roleCode=='serviceCenter' || roleCode=='director')&& scope.row.returnState=='7' " @click="checkOK('1')" class="green">通过</a>-->
                <!--<a v-if="(roleCode=='serviceCenter' || roleCode=='director')&& scope.row.returnState=='7' " @click="checkOK('0')" class="red">拒绝</a>-->

                <a v-else @click="handleFromInfo(scope.row.id,0)" class="green">详情</a>
              </div>
              <!--<span v-if="scope.row.returnState==='7'" ><a @click="handleFromInfo(scope.row.id)" class="operation-btn">撤回</a></span>-->
              <!--<span v-if="scope.row.returnState==='2'" ><a @click="handleFromInfo(scope.row.id)" class="operation-btn">删除</a></span>-->
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

      <div class="foot-btn">
        <div class="foot-left">
          <!--<span><el-button size="small" @click="handleGoAdd()" type="success" v-if="roleCode!='manage'">创建退货</el-button></span>-->
          <!--<span><el-button size="small" @click="getPrintData()" type="warning">打印</el-button></span>-->
          <span><el-button size="small" @click="checkOK('1')" type="primary">审批通过</el-button></span>
          <span><el-button size="small" @click="checkOK('0')" type="danger">审批拒绝</el-button></span>
          <span><el-button size="small" @click="exportExcel()" type="warning">导出excel</el-button></span>
        </div>
      </div>
    </div>
    <!-- ========================== 主内容end ========================= -->
    <approval-List v-if="visible"  ref="approvalList" @refreshData="metaList"></approval-List>
  </div>

</template>
<script>

  // 引入数据请求
  import {handleListToCheck,chooseDomain,getRepositoryFlag,exportHandleList} from 'src/axios/trade/senderRole/waitVerifyList'
  import {findRole,findSecondFlag} from 'src/axios/trade/purchase/purchase'
  import {priceFormat,keyBoardEnter} from "src/utils";
  import fileUpload from 'js-file-download';
  import {getSpecHints,getPackHints} from "src/utils/validateUtil";
  import {senderFirstApproval,exportEXL} from 'src/axios/trade/buyerrole/waitList'
  import approvalList from 'src/pages/trade/tradecenter/firstInstanceRole/return/approval'

  const lables = [{'labelName':'退货单号','labelValue':'returnCode',hidden:false},
    {'labelName':'创建时间','labelValue':'createDate','width':100,hidden:false},
    {'labelName':'采购单号','labelValue':'purchaseCode',hidden:false},
    {'labelName':'产品名','labelValue':'bakProductName',hidden:false},
    {'labelName':'医疗机构','labelValue':'buyerName',hidden:false},
    {'labelName':'药库','labelValue':'repositoryFlag',hidden:false},
    {'labelName':'生产企业','labelValue':'bakFactoryEasy','width':90,hidden:false},
    {'labelName':'配送企业','labelValue':'bakSenderEasy','width':90,hidden:false},
    {'labelName':'地址','labelValue':'addressAbbr','width':90,hidden:false},
    {'labelName':'退货数量','labelValue':'returnQty','width':80,'align':'right',hidden:false},
    {'labelName':'退货金额','labelValue':'returnTotal','width':80,'align':'right',hidden:false},
    {'labelName':'状态','labelValue':'returnStates','width':80,hidden:false}
  ];
  export default {
    name:'based-city-snder-list',
    data () {
      return {
        currentOrder: undefined,
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        resData2: this.metaData2(),
        repositoryFlag: true,
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        printList: {
          printData:[],
          printLabel:[]
        },
        dataList: [],
        checkedAll:false,
        roleCode:'',
        visible: false,
        secondCheck:'',
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
      }
    },
    created () {
      this.list()
    },
    components: {
      approvalList
    },
    methods: {
      getSpecHints,
      getPackHints,
      getLabel(){
        for (let item of lables){
          if(item.labelName === '药库'){
            if(this.repositoryFlag){
              item.hidden = true
            }
          }
        }
        return lables;
      },
      metaList(){
        handleListToCheck(this.resData, this.query).then(res => {
          this.resData = res.data;
          if (this.resData.pageNum === 0) {
            this.resData.pageNum = 1
          }
        });
      },
      getPrintData(){
        let _this=this;
        this.printList.printData = this.resData.list.map(item => {
          item.returnStates  = '<div class="hiddenfont" ><span>' + _this.getFlag(item.returnState) + '</span></div>';
          return item
        });
        this.printList.printLabel = this.getLabel();
        sessionStorage.removeItem('printList');
        sessionStorage.setItem('printList',JSON.stringify(this.printList));
        let routeData = this.$router.resolve({path:'/printTable'});
        window.open(routeData.href, '_blank');
      },
      priceFormat,
      // -------------------------------------------- 数据初始化  -----------------------------------------
      sortChang(value){
        let sortType=" desc";
        if(value.order.startsWith("asc")){
          sortType=" asc";
        }
        this.currentOrder=value.prop + sortType;
        this.list()
      },
      selectable(row,index) {
        if((Number(row.returnState)== 7 && (this.roleCode == 'director' || this.roleCode == 'serviceCenter'))||(Number(row.returnState)== 5 &&(this.roleCode == 'manage'))){
          return true;
        }else {
          return false;
        }
      },
      metaData () {
        return {
        // 前后台交互数据封装格式
          orderBy: undefined,
            pageNum: 1,
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
      metaData2 () {
        return {
          resData2: { // 前后台交互数据封装格式
            sysUser:{
              roleCode:''
            }
          }
        }
      },
      getFlag(flag){
        var arrFlag = ['未发送','已发送','已撤销','对方已同意','对方已拒绝','送二审','二审拒绝','送一审','一审拒绝'];
        return arrFlag[flag];
      },
      getStateNoSecond(flag){
        var arrFlag = ['未发送','已发送','已撤销','对方已同意','对方已拒绝','送二审','二审拒绝','送审','审核拒绝'];
        return arrFlag[flag];
      },
      metaQuery () { // 表单查询数据初始化
        return {
          returnStateFirst:[
            {value:'',label:'采购单状态'},
//            {value:'0',label:'未发送'},
            {value:'1',label:'已发送'},
//            {value:'2',label:'已撤销'},
            {value:'3',label:'对方已同意'},
            {value:'4',label:'对方已拒绝'},
            {value:'7',label:'送审'},
            {value:'8',label:'审核拒绝'}
          ],
          returnStateSecond:[
            {value:'',label:'采购单状态'},
//            {value:'0',label:'未发送'},
            {value:'1',label:'已发送'},
//            {value:'2',label:'已撤销'},
            {value:'3',label:'对方已同意'},
            {value:'4',label:'对方已拒绝'},
            {value:'5',label:'送二审'},
            {value:'6',label:'二审拒绝'},
            {value:'7',label:'送一审'},
            {value:'8',label:'一审拒绝'}
          ],
          returnStateManage:[
          {value:'',label:'采购单状态'},
//            {value:'0',label:'未发送'},
          {value:'1',label:'已发送'},
//            {value:'2',label:'已撤销'},
          {value:'3',label:'对方已同意'},
          {value:'4',label:'对方已拒绝'},
            {value:'5',label:'送二审'},
            {value:'6',label:'二审拒绝'},
//          {value:'7',label:'送一审'},
//          {value:'8',label:'一审拒绝'}
        ],
            returnState:undefined,
            strNameKind:undefined,
            bakFactoryEasy:undefined,
            bakProductName:undefined,
            returnCode:undefined,
            createBenDate:undefined,
            createEenDate:undefined,
            buyerName:undefined,
            purchaseCode:undefined,
            dataFlag:undefined,
            senderName:undefined
        }
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        var _this = this;
        var state = '';
        findRole().then(res => {
          this.roleCode = res.data;

  /*        if ((this.roleCode == "serviceCenter" ||this.roleCode=="director")&& this.query.returnState==undefined) {
            state = '7';
//            this.checkedAll=true;
          } else if (this.roleCode == "manage" && this.query.returnState==undefined) {
            state = '5'
//            this.checkedAll=false;
          }else{
//            this.checkedAll=false;
          }*/

          findSecondFlag().then(res => {
            this.secondCheck = res.data;
          });
          let dataFlag;
          if(this.checkedAll==false){
            this.dataFlag = '0';
          }
          else{
            this.dataFlag = "1";
          }
//          this.query.dataFlag=this.dataFlag;
          this.query.dataFlag="1";
          this.resData.orderBy=this.currentOrder;
          if (undefined== _this.query.returnState){
            _this.query.returnState = state;
          }
//          if( _this.query.returnState=='7'){
//            this.checkedAll=true;
//          }else{
//            this.checkedAll=false;
//          }
          this.$nextTick(()=> {
            handleListToCheck(this.resData, this.query).then(res => {
              this.resData = res.data;
              if (this.resData.pageNum === 0) {
                this.resData.pageNum = 1
              }
              this.$emit("return",this.resData.total);
            });
          })
          });

        getRepositoryFlag().then(res=>{
          if(!res.data){
            this.repositoryFlag = true;
          }
        });
        chooseDomain(this.query).then(res=>{
            this.resData2=res.data;
          });
      },
      // 重置用户表单
      resetForm () {
        this.query= this.metaQuery();
        this.list();
      },
      handleSelectionChange(val) {
        this.dataList = val;
      },
      //审批
      checkOK(val) {
        if (this.dataList.length < 1) {
          this.$alert('请至少选择一条数据', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false;
        } else {
          var idList = '';
          for (var noticeType of this.dataList) {

            idList += (noticeType.id + ',');
          }
          idList = idList.slice(0, -1);
          this.query.ids = idList;
          this.query.keys = idList;
          this.query.approvalState = val;
          senderFirstApproval(this.query).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.list()
              }
            })
          })
        }
      },

      //单条审批
      checkOKToCheck(val,id) {
      var idList = '';
      idList += (id + ',');
      idList = idList.slice(0, -1);
      this.query.ids = idList;
      this.query.keys = idList;
      this.query.approvalState = val;
      senderFirstApproval(this.query).then(res => {
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
      // 打开退货详情页面
      handleFromInfo(id,flag) {
        this.visible = true;
        this.$nextTick(()=>{
          this.$refs.approvalList.fillData(id,flag,'0');
        })
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
      handleGoAdd(){
        this.$router.push("/trade/manage/chooseNewList")
      },
      //--------------------------------------------导出Excel------------------------------------
      exportExcel() {
        var _this = this;
        var state = '';
        if(this.query.createBenDate == undefined || this.query.createBenDate == ''||this.query.createEenDate == undefined || this.query.createEenDate == null ){
          this.$message({
            type: 'error',
            message: '请选择创建的开始日期及创建的结束日期'
          });
          return false;
        }else {
            this.query.dataFlag="1";
            if (undefined== _this.query.returnState){
              _this.query.returnState = state;
            }
          exportHandleList(this.resData, this.query).then(res => {
            let headers = res.headers;
            let title = ""
            if (!title) {
              const fileName = headers['content-disposition'];
              title = fileName.includes('filename=') ? decodeURI(fileName.split('=')[1]) : '下载的文件';
            }
            fileUpload(res.data, title, "application/vnd.ms-excel")
          })
        }
      },
      // ----------------------------------------------结束--------------------------------------------------

    }


  }
</script>

