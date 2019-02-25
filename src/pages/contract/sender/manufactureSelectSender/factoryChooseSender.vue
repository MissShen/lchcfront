<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tablebox">
      <!--<div class="table-form">
        <div class="formrow">
            <span>
              <el-select v-model="query.district" value placeholder="请选择" size="small" @change="queryCities()">
                <el-option
                  v-for="item in districts"
                  :key="item.id"
                  :label="item.nameChn"
                  :value="item.id">
                </el-option>
              </el-select>
            </span>
        </div>
      </div>
      <div class="tableset">
        &lt;!&ndash;二级菜单&ndash;&gt;
        <div class="cities-box">
          <ul>
            <li v-for="item in cities" :key="item.id">
              <el-button v-model="selected" name="secondButton" :id="item.id" @click="selectRegions(item.id)">{{ item.nameChn }}</el-button>
            </li>
          </ul>
        </div>
        &lt;!&ndash;三级菜单&ndash;&gt;
        <div class="areas-box" v-if="showThreeCheckbox">
          <label class="cities-title">
            <el-checkbox v-if="regionList.name!=''&&regionList.name!=null"  v-model="checkAll" @change="handleCheckAllChange">{{regionList.name}}</el-checkbox>
          </label>
          <div class="citys-con">
            <el-checkbox-group v-model="checkedRegion" @change="handleCheckedRegionChange">
              <el-checkbox v-for="items in regionList.list" :label="items.id" style="margin: 5px 20px 0 0 !important;" :key="items.id">{{items.nameChn}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>-->



        <div class="tableset">
          <el-form ref="formQuery" :model="formQuery" size="small" :inline="true" onsubmit="return false;" class="table-form">
              <el-form-item>
                <el-input v-model="formQuery.senderName" maxlength="200" placeholder="企业名称" size="small" @keyup.enter.native="searchEnterFun"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
                <el-button type="warning" @click="resetForm()" size="small">重置</el-button>
              </el-form-item>
          </el-form>
          <el-table
            :data="resData.list"
            border
            stripe
            @selection-change="handleSelectionChange"
            @sort-change="sortChange"
          >
            <el-table-column align="center"
                             type="selection"
                             width="40">
            </el-table-column>
            <el-table-column label="企业名称" prop="sendername" sortable="custom" header-align="left" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.senderName}}</span>
              </template>
            </el-table-column>
            <el-table-column label="企业简称" prop="senderAbbr" sortable="custom" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.senderAbbr}}</span>
              </template>
            </el-table-column>
            <el-table-column label="不良记录" prop="complained_count" sortable="custom">
              <template slot-scope="scope">
                <a @click="complainedTable(scope.row.senderId)" v-if="scope.row.complainedCount >0&&scope.row.complainedCount != null && scope.row.complainedCount != ''">{{ scope.row.complainedCount }}</a>
                <span v-if="scope.row.complainedCount == 0||scope.row.complainedCount == null || scope.row.complainedCount == ''">无不良记录</span>
              </template>
            </el-table-column>
            <el-table-column label="配送评价" prop="servicestate" sortable="custom" :show-overflow-tooltip="true">
              <template slot-scope="scope">
              <span>
                <el-rate
                  v-model= scope.row.serviceState disabled>
                </el-rate>
              </span>
              </template>
            </el-table-column>
            <el-table-column label="两票制" prop="twoVote" sortable="custom" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span v-if="scope.row.twoVote != null && scope.row.twoVote != ''">已签订</span>
                <span v-else style="color: #FF0000">未签订</span>
              </template>
            </el-table-column>
            <el-table-column label="电话">
              <template slot-scope="scope">
                <span>{{scope.row.linkTel}}</span>
              </template>
            </el-table-column>
          </el-table>
          <!-- 表格分页 -->
          <div class="pagebox">
            <div class="flo-left">
              <el-button type="primary" size="small" @click="handleForm">保存</el-button>
            </div>
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
            <el-button size="small" @click="returnBack()">返回</el-button>
          </div>
        </div>
      </div>

      <!--不良记录table-->
      <el-dialog title="不良记录" :visible.sync="showComplainedTable" :before-close="closeForm" width="60%">
        <el-table
          :data="complainedTableQuery.list"
          style="width: 100%"
          max-height="200"
          border
          stripe>

          <el-table-column label="投诉编号">
            <template slot-scope="scope">
              <span>{{ scope.row.code }}</span>
            </template>
          </el-table-column>
          <el-table-column label="被投诉企业" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.beComplainedOrgname }}</span>
            </template>
          </el-table-column>
          <el-table-column label="买方机构" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.createdByOrgname }}</span>
            </template>
          </el-table-column>
          <el-table-column label="投诉时间">
            <template slot-scope="scope">
              <span>{{ scope.row.createdAt }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="220">
            <template slot-scope="scope">
              <a class="operation-btn" @click="complainedDetails(scope.row.reasonTypeId)">详情</a>
            </template>
          </el-table-column>
        </el-table>
        <!-- 表格分页 -->
        <div class="pagebox">
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange3"
            @current-change="handleCurrentChange3"
            :page-sizes="[10, 20, 30]"
            :total="complainedTableQuery.total"
            :page-size="complainedTableQuery.pageSize"
            :page-count="complainedTableQuery.pages"
            :current-page.sync="complainedTableQuery.pageNum">
          </el-pagination>
        </div>
      </el-dialog>
      <!--投诉详情-->
      <el-dialog title="投诉详情" :visible.sync="showComplainedDetails" :before-close="closeComplainedDetails" width="50%">
        <div v-model="complainedDetailsData">
          <el-row>
            <el-col :span="4" style="text-align: center">投诉对象:</el-col>
            <el-col :span="20"><div class="grid-content bg-purple-light">{{complainedDetailsData.name}}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="4" style="text-align: center">投诉原因:</el-col>
            <el-col :span="20"><div class="grid-content bg-purple-light">{{complainedDetailsData.reason}}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="4" style="text-align: center">投诉说明:</el-col>
            <el-col :span="20"><div class="grid-content bg-purple-light">{{complainedDetailsData.instructions}}</div></el-col>
          </el-row>
        </div>
      </el-dialog>
    </div>
    <!-- ========================== 主内容end ========================= -->

</template>
<script>
  import {complainedTableQueryHttp,complainedDetailsHttp} from 'src/axios/contract/sender/hospitalSelectSender';
  import {selectRegionsHttp,findSenderByRegionsHttp,insertSenderForFactoryHttp} from 'src/axios/contract/sender/factoryChooseSender';
  import {findByParentId} from 'src/axios/contract/sender/sendRegion';
  import ElSlPanel from '../../../../../node_modules/element-ui/packages/color-picker/src/components/sv-panel.vue'
  import { keyBoardEnter } from "src/utils"

  export default {
    components: {ElSlPanel},
    data: function () {
      return {
        currentOrder: undefined,
        query: this.metaQuery(), // 查询初始化
        formQuery: this.metaFormQuery(),
        resData: this.metaData(),
        value: '',
        districts: [],
        cities: [],
        regions: [],
        showTable:false,//最下面的table隐藏与否？
        showThreeCheckbox:false,//三级菜单显示与否?
        selected:"",//二级菜单显示哪个
        secondSelected:"",//当前选择的二级菜单的id

        checkAll: false,//三级菜单的全选checkbox是否选中
        checkedRegion: [],//选中的三级菜单checkbox的id
        regionList:[],//通过二级菜单 查询到的三级菜单的数据
        senderSelection:[],//通过多选框选择的配送



        records: [{
          value: "1",
          label: "是"
        }, {
          value: "0",
          label: "否"
        }],
        serviceStates:[{name:"配送评价",value:""},{name:"一星",value:"1"},{name:"二星",value:"2"},{name:"三星",value:"3"},{name:"四星",value:"4"},{name:"五星",value:"5"}],

        //不良记录配送ID
        complainedSenderId:"",
        //不良记录弹出框状态
        showComplainedTable:false,
        //不良记录列表
        complainedTableQuery:this.metaData(),

        //不良记录详情显示状态
        showComplainedDetails:false,
        //不良记录数据
        complainedDetailsData:{
          name:"",//投诉对象
          Instructions:"",//投诉说明
          reason:""//投诉原因
        },
      }
    },
    created () {
      //初始化进来查询省
      findByParentId('FR20T0000010000000050000').then(res => {
        //默认选中北京市
        for(let i = 0; i < res.data.length; i++) {
          if(res.data[i].nameChn == "北京"){
            this.query.district = res.data[i].id
          }
        }
        this.districts = res.data
        // this.queryCities()
        findByParentId(this.query.district).then(res => {
          this.cities = res.data;
          let cityIds = [this.cities[0].id];
          selectRegionsHttp(cityIds).then(res=>{
            this.regionList = res.data[0];
            let allSelected = [];
            for(let i=0;i<this.regionList.list.length;i++){
              allSelected.push(this.regionList.list[i].id);
            }
            this.checkedRegion = allSelected;
            this.findSenderByRegions();
          })
        })
      })
    },
    methods: {
//================================数据初始化=====================================================
      metaQuery () {
        return {
          district: undefined,
          // city: undefined,
          region: undefined,
          paramIds: [],
        }
      },
      metaFormQuery(){
        return {senderName: undefined}
      },
      metaData() {
        return {
          orderBy: undefined,
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
      //1.一级菜单 查询省下的市
      queryCities () {
        //如果切换一级菜单把三级菜单和table隐藏,并且把选中的项都清空了
        //--------清理动作begin---------
        //三级菜单隐藏
        this.resData = this.metaData();
        this.showThreeCheckbox = false;
        //三级菜单选中清空
        this.checkedRegion = [];
        this.checkAll = false;
        //table隐藏
        this.showTable = false;
        //table 选中清空
        this.senderSelection = [];
        //--------清理动作end---------


        findByParentId(this.query.district).then(res => {
          this.cities = res.data
        })

      },

      //2.点击二级菜单，查询市级下的区县
      selectRegions(cityId){
        //--------清理动作begin---------
        //如果切换二级菜单把三级菜单显示，table隐藏
        //如果当前点选的二级菜单和上一次点击的市是不一样的话，那么隐藏table
        this.checkAll = true;
        this.checkedRegion = [];
        if(this.secondSelected != cityId){
          this.showTable = false;
        }
        this.showThreeCheckbox = true;
        //--------清理动作end---------
        this.secondSelected = cityId;
        let cityIds = [cityId];
        selectRegionsHttp(cityIds).then(res=>{
          this.regionList = res.data[0];

          //解决点三级菜单 二级菜单不会选中问题
          let secondButton = document.getElementsByName("secondButton");
          for(let i = 0;i<secondButton.length;i++){
            secondButton[i].style.backgroundColor = "";
          }
          document.getElementById(cityId).style.backgroundColor = "#bce8f1";
        })
      },

      //3.1三级菜单 点全选
      handleCheckAllChange(val) {

        //点三级菜单 把table显示
        this.showTable = true;
        if(val){
          let allSelectid = [];
          for(let i=0;i<this.regionList.list.length;i++){
            allSelectid.push(this.regionList.list[i].id);
          }
          this.checkedRegion = allSelectid;
        }else{
          this.checkedRegion = [];
        }

        this.findSenderByRegions(this.checkedRegion);
      },
      //3.2三级菜单 点单选
      handleCheckedRegionChange(value) {
        //点三级菜单 把table显示
        this.showTable = true;

        if(this.regionList.list.length === value.length){
          this.checkAll = true;
        }else{
          this.checkAll = false;
        }
        this.checkedRegion = value;
        this.findSenderByRegions();
      },
      //3.3点击区县 去请求数据 获取当前区县下可选择的配送商
      findSenderByRegions(){
        this.resData.orderBy = this.currentOrder;
        findSenderByRegionsHttp(this.checkedRegion,this.$route.params.productId,this.resData,this.formQuery).then(res=>{
          this.resData = res.data;
          if(this.resData.pageNum === 0){
            this.resData.pageNum = 1;
          }
          if(this.resData.pageSize === 0){
            this.resData.pageSize = 10;
          }

        });
      },
      resetForm(){
        this.formQuery = this.metaFormQuery();
        this.findSenderByRegions();
      },
      //4.选择框选择
      handleSelectionChange(val){
        let selection = [];
        for(let i=0;i<val.length;i++){
          selection.push(val[i].senderId);
        }
        this.senderSelection = selection;
      },

      //5. 保存
      handleForm(){
        if(this.senderSelection.length<1){
          this.$message({
            message: '当前未选中任何配送企业',
            type: 'warning'
          });
          return;
        }
        insertSenderForFactoryHttp(this.$route.params.productId,this.senderSelection,this.checkedRegion).then(res=>{
          this.findSenderByRegions(this.checkedRegion);
          if(res.data>0){
            this.$message({
              message: '保存成功',
              type: 'success'
            });
          }
        });
      },
//------------4.返回
      returnBack(){
        this.$router.push("/CONTRACT/contractmanagement/selectDeliveryEnterprises");
      },

//不良记录-----------------------------
      //显示不良记录table
      complainedTable(senderId){
        this.complainedSenderId = senderId;
        this.complainedTableList();
      },
      //不良记录请求list
      complainedTableList(){
        complainedTableQueryHttp(this.complainedSenderId,this.complainedTableQuery).then(res =>{
          this.complainedTableQuery = res.data;
          this.showComplainedTable = true;
        });
      },
      closeForm(){
        this.showComplainedTable = false;
      },
      //不良记录详情弹出
      complainedDetails(reasonTypeId){

        complainedDetailsHttp(reasonTypeId).then(res=>{
          this.complainedDetailsData = res.data;
          this.showComplainedDetails = true;
        })
      },
      //关闭不良详情
      closeComplainedDetails(){
        this.showComplainedDetails = false;
      },


      //----------------------------------table数据判断 end-------------
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.findSenderByRegions()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.findSenderByRegions()
      },
      handleSizeChange3 (val) {
        this.complainedTableQuery.pageSize = val
        this.complainedTableList()
      },
      handleCurrentChange3 (val) {
        this.complainedTableQuery.pageNum = val
        this.complainedTableList()
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
        this.findSenderByRegions();
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e , ()=>{
          this.findSenderByRegions();
        })
      },
    }

  }
</script>


<style>
  @import "../../../../assets/css/compact.css";
</style>

