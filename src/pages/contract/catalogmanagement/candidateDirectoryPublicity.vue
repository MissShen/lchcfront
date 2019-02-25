<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" size="small" class="table-form" :inline="true">
                    <el-form-item>
                      <el-input size="small"  v-model="query.productName" maxlength="200" placeholder="品名" @keyup.enter.native="searchEnterFun"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-input size="small"  v-model="query.manufactureName" maxlength="200" placeholder="生产企业" @keyup.enter.native="searchEnterFun"></el-input>
                    </el-form-item>
                    <!--begin不知道如何筛选-->
                    <el-form-item>
                       <el-select size="small" v-model="query.catalogArea" placeholder="目录范围">
                         <el-option-group
                           key="目录范围"
                           label="目录范围">
                           <el-option
                            v-for="item in catalogAreas"
                            :key="item.catalogId"
                            :label="item.catalogName"
                            :value="item.catalogId">
                          </el-option>
                         </el-option-group>
                      </el-select>
                    </el-form-item>
                    <el-form-item>
                      <el-button size="small" type="success" @click="searchEnterFun">查询</el-button>
                      <el-button size="small"  type="warning" @click="reset()">重置</el-button>
                    </el-form-item>
        </el-form>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe
          @selection-change="handleSelectionChange"
          @sort-change="sortChange">
          <el-table-column label="目录范围" prop="CATALOGAREA" sortable="custom" width="150" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.catalogArea }}</span>
            </template>
          </el-table-column>

          <el-table-column label="通用名" prop="nameChn" width="180" sortable :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.nameChn }}</span>
            </template>
          </el-table-column>

          <el-table-column label="产品名" prop="productName" width="280">
            <template slot-scope="scope">
              <div class="ellipsis" :title="scope.row.productName">{{ scope.row.productName }}</div>
              <div class="ellipsis" :title="scope.row.tradeName">(商品名：{{ scope.row.tradeName }})</div>
            </template>
          </el-table-column>

          <el-table-column label="产品信息" prop="drug_Detail" >
            <template slot-scope="scope">
              <div class="pro-details ellipsis"
                   :title="scope.row.spec+'×'+scope.row.standRate+scope.row.smallestUnits+'/'+scope.row.specUnit+'('+scope.row.wrapName+')'+'('+scope.row.doseageFormName+')'">
                {{ scope.row.spec}} × {{ scope.row.standRate}} {{ scope.row.smallestUnits}} / {{scope.row.specUnit}} ({{scope.row.wrapName}}) ({{ scope.row.doseageFormName }})
              </div>
              <div class="pro-details ellipsis" :title="scope.row.manufactureName">{{ scope.row.manufactureName}}</div>
            </template>
          </el-table-column>

          <el-table-column label="价格" prop="bidPrice" width="180" sortable align="right" header-align="left" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.bidPrice }}</span>
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




    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求  引自js文件
  import {queryCandidateDirectoryPublicityList} from "src/axios/contract/catalogmanagement/candidateDirectoryPublicityType";
  import { querySysCatalog} from "src/axios/contract/catalogmanagement/basicDrugDataType";
  import {priceFormat} from "src/utils"
  import { keyBoardEnter } from "src/utils"
  import moment from "moment";

  export default {
    data () {
      return {
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        currentOrder: undefined,
        query: this.metaQuery(), // 查询初始化
        showHos: false, // 表单可见性初始化
        showCompany:false,// 表单可见性初始化
        showQuery: false, // 表单查询初始化
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        multipleSelection: [],//多选checkbox的数据

        showHosData:[],//查看选择医院数据
        showHosDataQuery:{name:""},//查看医院弹出框查询条件

        showCompanyData:this.metaData(),//查看配送企业数据
        showCompanyDataQuery:{name:""},//查看配送企业弹出框查询条件
        productId:"",//当前弹出框药品的id

        showAlternativeBargaining:false,//加入备选议价弹框状态
        AlternativeBargainingText:{textarea:""},//弹出框的值

        showScoreDetailed:false,//客观分详细弹框
        ScoreDetailedText: this.scoreDetailedData(),//框内数据初始化
        sources : [{    //基药标记选择
          label : '全部',
          value : ''
        },{
          label : '非基药',
          value : '0'
        },{
          label : '国家基药',
          value : '1'
        },{
          label : '北京增补',
          value : '2'
        }],

        //候选目录
        resStates:[
                  {
                    label : '候选目录',
                    value : ''
                  },
                  {
                    label : '是',
                    value : '1'
                  },
                  {
                    label : '否',
                    value : '-1'
                  }
                  ],
        twoVotes:[
                  {
                    label : '两票制',
                    value : ''
                  },
                  {
                    label : '已签订',
                    value : '1'
                  },
                  {
                    label : '未签订',
                    value : '0'
                  }
                ],
        purchaseStates:[
          {
            label : '采购状态',
            value : ''
          },
          {
            label : '已采购',
            value : '1'
          },
          {
            label : '未采购',
            value : '0'
          }
        ],
        reportStates:[
          {
            label : '医院上报',
            value : ''
          },
          {
            label : '已上报',
            value : '1'
          },
          {
            label : '未上报',
            value : '0'
          }
        ],
        catalogAreas:[
          {catalogId:"",catalogName:""}
        ],
        showBargainingDetails:false,
        bargainingDetailsData:this.metaData(),
        lyfloading:false,
        boxhide:true,


        showSecrecy:false,
        signPasswordVisible:false,
        dataForm: this.metaForm(),
        passWord:'',
        insertForm :this.formData(),

      }
    },
    created () {
      this.list()
      this.querySysCatalogHttp()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      priceFormat,
      metaData () {
        return {
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
      metaForm () { // 表单数据初始化
        return {
          password: undefined,
          userKey: undefined,
          strRandom: '',
          userSignedData: '',
          userCert: '',
          containerName: '',
          imgUrl: ''
        }
      },
      metaQuery () { // 表单查询数据初始化
        return {
          query: {
            manufactureName: "",
            productName: "",
            basicFlag:"",
            resState:""
          }
        }
      },
      scoreDetailedData(){
        return {
          productClassify: [{attRame: "名称1", score: "",attRameTwo: "名称2", scoreTwo: ""}],
          companyClassify:[{attRame: "123", scoreType: "", attrFlag: "", score: "",attRameTwo: "123", scoreTypeTwo: "", attrFlagTwo: "", scoreTwo: ""}],
          productScoreSum:0,
          companyScoreSum:0
        }
      },
      formData(){
        return {
          query: {
            orgId: undefined,
            signedDate :undefined
          },
          password: undefined,
          userKey: undefined,
          strRandom: '',
          userSignedData: '',
          userCert: '',
          containerName: '',
          imgUrl: '',
          stampImage:undefined
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy = this.currentOrder;
        queryCandidateDirectoryPublicityList(this.resData, this.query).then(res => {
          console.log(res);
          this.resData = res.data
          if(this.resData.pageNum === 0){
            this.resData.pageNum =1;
          }
        })
      },
      //请求目录范围
      querySysCatalogHttp(){
        querySysCatalog().then(res=>{
          var header = [{catalogId:"",catalogName:"全部"}];
          if(res.data!=null &&res.data != '' && res.data.length>0){
            this.catalogAreas = header.concat(res.data)
          }else {
            this.catalogAreas = [];
          }
        })
      },

//----------------------------------table数据判断 begin-------------

      //基药标记
      basicFlagData(basicFlag){
        if(basicFlag==0){
          return "非基药";
        }else if(basicFlag == 1){
          return "国家基药";
        }else if(basicFlag==2){
          return "北京增补";
        }else{
          return "";
        }
      },

//----------------------------------table数据判断 end-------------
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      sortChange(value){
        console.log("value: ", value);
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
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
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

