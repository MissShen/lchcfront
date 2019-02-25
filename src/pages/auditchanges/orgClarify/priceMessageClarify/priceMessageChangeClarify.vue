<template>
  <div class="tab-box">
    <!--<div class="tabs-panel">-->
      <!--<router-link to="/AUDIT/orgClarify/priceMessageClarify">产品价格申报澄清</router-link>-->
      <!--<span class="active">产品价格变更澄清</span>-->
    <!--</div>-->
    <span class="tab-bar"></span>
   <!-- <el-tabs v-model="activeName" @tab-click="toDeclare">
      <el-tab-pane label="产品价格申报澄清" name="first" />
      <el-tab-pane label="产品价格变更澄清" name="second" />
    </el-tabs>-->
    <el-tabs v-model="activeName" @tab-click="toChange">
      <el-tab-pane label="价格变更" name="first" />
      <el-tab-pane label="价格质疑记录" name="second" />
     <!-- <el-tab-pane label="价格变更质疑" name="three" />-->
      <el-tab-pane label="价格澄清" name="four" />
     <!-- <el-tab-pane label="价格变更澄清" name="five" />-->
    </el-tabs>
    <!-- 表格查询表单 -->
    <div class="el-tabs__content">
      <div class="tablebox">
          <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
            <el-form-item>
              <el-radio-group v-model="declareOrChange" @change="selectRadio">
                <el-radio label="0">申报澄清</el-radio>
                <el-radio label="1">变更澄清</el-radio>
              </el-radio-group>
            </el-form-item><br>
              <el-form-item>
              <el-input class="width-150" v-model="query.productName" @keyup.enter.native="searchEnterFun" placeholder="产品名称" size="small"></el-input>
            </el-form-item>
              <el-form-item>
              <el-input class="width-150" v-model="query.dosage" @keyup.enter.native="searchEnterFun" placeholder="剂型" size="small"></el-input>
            </el-form-item>
              <el-form-item>
              <el-input class="width-150" v-model="query.specification" @keyup.enter.native="searchEnterFun" placeholder="规格" size="small"></el-input>
            </el-form-item>
              <el-form-item>
              <el-input class="width-150" v-model="query.manufacture" @keyup.enter.native="searchEnterFun" placeholder="生产企业" size="small"></el-input>
            </el-form-item>
              <el-form-item>
              <el-select class="width-150" v-model="query.status" placeholder="全部" size="small">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
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
          >
            <!--<el-table-column label="申报号" show-overflow-tooltip>-->
              <!--<template slot-scope="scope">-->
                <!--<span>{{scope.row.requestCode}}</span>-->
              <!--</template>-->
            <!--</el-table-column>-->
           <!-- <el-table-column label="产品名称">
              <template slot-scope="scope">
                <div>
                  <div class="text-inline">{{scope.row.productName}}</div>
                  <div class="text-inline">{{scope.row.mixDosage}}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="产品信息">
              <template slot-scope="scope">
                <div class="pro-details">
                  <div class="text-inline">{{scope.row.combined}}&nbsp;&nbsp;{{scope.row.wrap}}</div>
                  <div class="text-inline">{{scope.row.abbr}}</div>
                </div>
              </template>
            </el-table-column>
            -->

            <el-table-column label="产品名称" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.productName}}</span>
              </template>
            </el-table-column>
            <el-table-column label="商品名" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.goodsName}}</span>
              </template>
            </el-table-column>
            <el-table-column label="剂型" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.dosage}}</span>
              </template>
            </el-table-column>
            <el-table-column label="规格" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.specification}}</span>
              </template>
            </el-table-column>
            <el-table-column label="转换比" header-align="left" align="right">
              <template slot-scope="scope">
                <span>{{scope.row.conversion}}</span>
              </template>
            </el-table-column>
            <el-table-column label="单位">
              <template slot-scope="scope">
                <span>{{scope.row.units}}</span>
              </template>
            </el-table-column>
            <el-table-column label="包材" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.packingMaterials}}</span>
              </template>
            </el-table-column>
            <el-table-column label="生产企业" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.manufacture}}</span>
              </template>
            </el-table-column>
            <el-table-column label="澄清记录">
              <template slot-scope="scope">
                <span>{{scope.row.clarifyCount==scope.row.questionCount?"已澄清":"未澄清"}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100px">
              <template slot-scope="scope">
                <div class="operates">
                  <span>
                  <a class="operation-btn" @click="questionHandle(scope.row.requestCode,scope.row.projectProductId)">澄清</a>
                  </span>
                  <!--<span>-->
                    <!--<a class="operation-btn" @click="detailHandle(scope.row.requestCode,scope.row.projectProductId)">详情</a>-->
                  <!--</span>-->
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
      </div>
    </div>
    <priceMessageChange v-if="clarifyShow" ref="priceMessageChange"></priceMessageChange>
  </div>
</template>

<script>

  // 引入用户相关请求
  import {priceChangeList} from 'src/axios/auditchanges/messageClarify/price'
  // import {keyBoardEnter} from "../../../../utils";
  import priceMessageChange from './priceMessageChange'
  export default {
    components:{
      priceMessageChange
    },
    data () {
      return {
        declareOrChange:'1',
        activeName: 'four',//标签页默认选中第一个
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        options:[{
          key:"1",
          label: "全部",
          value: "", /*值*/
        },{
          key:"2",
          label: "未澄清",
          value: "0", /*值*/
        },{
          key:"3",
          label: "已澄清",
          value: "1", /*值*/
        }],
        showForm:{},
        flagForm:{},
        clarifyShow:false
      }
    },
    created () {
      this.resData.pageSize = 10;
      this.list()
    },
    methods: {
      selectRadio(){
        if(this.declareOrChange=='0'){
          this.$router.push('/AUDIT/orgClarify/priceMessageClarify');
        }
      },
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {
          resData: { // 前后台交互数据封装格式
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
            list: []
          }
        }
      },
      metaQuery () { // 表单查询数据初始化
        return {
          query: {
            productName: undefined,//产品名称
            dosage: undefined,//剂型
            specification: undefined,//规格
            manufacture: undefined,//生产企业
            requestCode: undefined,//申报号
            status: undefined,//状态
          }
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
     /* toDeclare(t) {
        if(t.name == "first") {
          this.$router.push('/AUDIT/orgClarify/priceMessageClarify');
        }
      },*/
      toChange(t) {
        if(t.name == "first") {
          this.$router.push('/AUDIT/messageDeclare/priceMessageChange');
        }if(t.name == "second") {
          this.$router.push('/AUDIT/messageDoubt/priceMessageDoubt');
        }if(t.name == "three") {
          this.$router.push('/AUDIT/messageDoubt/priceMessageDoubtChange');
        }if(t.name == "four") {
          this.$router.push('/AUDIT/orgClarify/priceMessageClarify');
        }
      },
      list(){
        priceChangeList(this.resData,this.query).then(res =>{
          console.log('========',res)
          if(res.success){
            this.resData = res.data;
          }
        })
      },
      // searchEnterFun(e){//查询
      //   // this.$store.state.pageSeach.pageNum = 1;
      //   this.resData.pageNum=1;
      //   keyBoardEnter(e, () => {
      //     this.list();
      //   })
      // },
      resetForm(){//重置
        this.query = this.metaQuery ();
        this.list();
      },
      //点击分页改变
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list()
      },
      //当前也改变
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      },
      questionHandle(id,productId) {
        this.clarifyShow = true;
        this.$nextTick(() => {
          this.$refs.priceMessageChange.list(id,productId)
        })
      },
      detailHandle(id,productId) {
        this.clarifyShow = true;
        this.$nextTick(() => {
          this.$refs.priceMessageChange.list(id,productId,true)
        })
      }
    }
  }
</script>
