<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" size="small" :inline="true" class="table-form">
            <el-form-item class="width-120">
              <el-input size="small" v-model="query.productName" maxlength="200" placeholder="品名" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item class="width-120">
              <el-input size="small" v-model="query.doseageFormName" maxlength="50" placeholder="剂型" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item class="width-120">
              <el-input size="small" v-model="query.spec" maxlength="100" placeholder="规格" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item class="width-120">
              <el-input size="small" v-model="query.bidOrgName" maxlength="200" placeholder="企业名称" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
          <el-form-item class="width-120">
            <el-select size="small" v-model="query.regionalDrug" placeholder="区目录标记">
              <el-option-group
                key="区目录标记"
                label="区目录标记">
                <el-option
                  v-for="item in regionalDrugs"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item class="width-120">
            <el-select size="small"  v-model="query.basicFlag" placeholder="基药标记">
              <el-option-group
                key="基药标记"
                label="基药标记">
                <el-option
                  v-for="item in basicFlagSelection"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item class="width-120">
            <el-select size="small" v-model="query.twoVoteId" placeholder="两票制">
              <el-option-group
                key="两票制"
                label="两票制">
                <el-option
                  v-for="item in twoVotes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item class="width-120">
            <el-select size="small" v-model="query.healthFlag" placeholder="医保标记">
              <el-option-group
                key="医保标记"
                label="医保标记">
                <el-option
                  v-for="item in healthFlags"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
            <el-form-item>
              <el-button size="small" type="success" @click="searchEnterFun">查询</el-button>
              <el-button size="small" type="warning" @click="reset()">重置</el-button>
            </el-form-item>
        </el-form>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe
          @sort-change="sortChange">
          <el-table-column label="通用名" prop="nameChn" sortable="custom" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.nameChn }}</span>
            </template>
          </el-table-column>
          <el-table-column label="产品名" min-width="150">
            <template slot-scope="scope">
              <ul class="ico-zt">
                <li class="ico-left">
                  <div class="icon-box">
                    <i class="ico icon-qu" v-if="scope.row.regionalDrug>0"></i>
                    <i class="ico icon-jc" v-if="scope.row.basicFlag>0"></i>
                    <i class="ico icon-yi" v-if="healthFlag=1>0"></i>
                    <i class="ico icon-liang" v-if="scope.row.twoVoteId!='' && scope.row.twoVoteId!=null"></i>
                  </div>
                </li>
                <li>
                  <div class="text-inline" :title="scope.row.productName">{{ scope.row.productName }}</div>
                  <div class="text-inline" :title="scope.row.tradeName">{{ scope.row.doseageFormName }}{{ tradeNameInfo(scope.row.tradeName) }}</div>
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column label="产品信息" min-width="150">
            <template slot-scope="scope">
              <div class="text-inline"
                   :title="scope.row.spec+'×'+scope.row.standRate+scope.row.smallestUnits+'/'+scope.row.specUnit+wrapNameInfo(scope.row.wrapName)">
                {{ scope.row.spec}} × {{ scope.row.standRate}} {{ scope.row.smallestUnits}} / {{scope.row.specUnit}} {{wrapNameInfo(scope.row.wrapName)}}
              </div>
              <div class="text-inline" :title="scope.row.manufactureName">{{ scope.row.manufactureName}}</div>
            </template>
          </el-table-column>
          <el-table-column label="目录类型" prop="catalogArea" sortable="custom" width="110" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.catalogArea}}</span>
            </template>
          </el-table-column>
          <el-table-column label="申报企业" prop="bidOrgName" sortable="custom" width="110">
            <template slot-scope="scope">
              <span>{{ scope.row.bidOrgName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="参考价" prop="min_Price" sortable="custom" align="right" width="90">
            <template slot-scope="scope">
<!--              <el-tooltip effect="dark"  placement="top">
                <div slot="content">{{referencePrice(scope.row.minPrice,scope.row.catalogArea,scope.row.bjPrice,scope.row.hbPrice,scope.row.tjPrice)}}</div>
                <span class="blue">{{priceFormat(scope.row.minPrice)}}</span>
              </el-tooltip>-->
              <span class="blue">{{ priceFormat(scope.row.referencePrice) }}</span>
            </template>
          </el-table-column>
<!--          <el-table-column label="原价格" prop="referencePrice" sortable="custom" width="90" align="right">
            <template slot-scope="scope">
              <span class="blue">{{ priceFormat(scope.row.referencePrice) }}</span>
            </template>
          </el-table-column>-->
          <el-table-column label="降后价格" prop="markdownPrice" sortable="custom" width="90" align="right">
            <template slot-scope="scope">
              <span class="blue">{{ priceFormat(scope.row.markdownPrice) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="发起时间" prop="createDated" sortable="custom"  width="127" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.createDated!=null && scope.row.createDated!=''">{{ moment(scope.row.createDated).format("YYYY-MM-DD") }}</span>
            </template>
          </el-table-column>
          <el-table-column label="执行时间" prop="execut_Date" sortable="custom"  width="127" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.executDate!=null && scope.row.executDate!=''">{{ moment(scope.row.executDate).format("YYYY-MM-DD") }}</span>
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
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求  引自js文件
  import {queryManufacturePriceListAll} from 'src/axios/contract/bargainmanagement/bargainquote/manufacturePriceConfirmation'
  import moment from 'moment'
  import {priceFormat} from "src/utils"
  import { keyBoardEnter } from "src/utils"

  export default {
    components: {moment},
    data () {
      return {
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        currentOrder:undefined, //分页的时候缓存
        query: this.metaQuery(), // 查询初始化
        productId: undefined,
        id: undefined,
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        checked: true,
        basicFlagSelection:[{
          value:'',
          label:'全部'
        },{
          value:'0',
          label:'非基药'
        }, {
          value: '1',
          label: '国家基药'
        }, {
          value: '2',
          label: '北京基药'
        }],
        twoVotes:[
          {
            label : '全部',
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
        regionalDrugs: [
          {
            label : '全部',
            value : ''
          },
          {
            label : '是',
            value : '1'
          },
          {
            label : '否',
            value : '0'
          }
        ],
      }
    },
    created () {
      this.list()
    },
    methods: {
      moment,
      priceFormat,
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
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
      metaQuery () { // 表单查询数据初始化
        return {
          query: {
            bidOrgName : undefined,
            productName : undefined,
            doseageFormName : undefined,
            spec :undefined,
            basicFlag :undefined,
            twoVoteId : undefined,
            regionalDrug :undefined,
            healthFlag :undefined
          }
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy = this.currentOrder;
        queryManufacturePriceListAll(this.resData, this.query).then(res => {
          console.log(res)
          this.resData = res.data
        })
      },
      reset(){
        this.query = this.metaQuery();
        this.list();
      },
      tradeNameInfo(tradeName){
        if (tradeName!=null && tradeName!='无' && tradeName!=''){
          return '(商品名：'+tradeName+')';
        }
        return '';
      },
      wrapNameInfo(wrapName){
        if (wrapName!=null && wrapName!='空' && wrapName!=''){
          return '('+wrapName+')';
        }
        return '';
      },
      referencePrice(minPrice,catalogArea,bjPrice,hbPrice,tjPrice){
        if(minPrice == ""||minPrice == null){
          return "";
        }else {
          if(catalogArea.indexOf("低价")<1){
            return  "全国最低价:"+this.priceFormat(minPrice);
          }else{
            return "河北最低价:"+((hbPrice!=null && hbPrice!='')?this.priceFormat(hbPrice):'无')+","+"天津最低价:"+((tjPrice!=null && tjPrice!='')?this.priceFormat(tjPrice):'无')+","+"北京最低价:"+((bjPrice!=null && bjPrice!='')?this.priceFormat(bjPrice):'无');
          }
        }
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

