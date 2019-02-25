<template>
  <!-- 表格 -->
  <div class="tab-box">
    <!-- 表格查询表单 -->
    <div class="el-tabs__content">
      <div class="tablebox">
        <el-form ref="query" :model="query" label-position="right" size="small" class="table-form" :inline="true">
          <el-form-item >
            <el-select class="width-100" v-model="query.CATALOGAREA" placeholder="目录名称" size="small">
              <el-option v-for="item in catalogAreaList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input class="width-120" v-model="query.PRODUCT" placeholder="产品名称" size="small"></el-input>
          </el-form-item>
          <el-form-item >
            <el-input class="width-120" v-model="query.DOSAGE" placeholder="剂型" @keyup.enter.native="searchEnterFun" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input  class="width-120" v-model="query.SPEC" placeholder="规格" @keyup.enter.native="searchEnterFun" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input class="width-120" v-model="query.MANUFACTURE" placeholder="生产企业" @keyup.enter.native="searchEnterFun" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select class="width-100" v-model="query.STATE" placeholder="状态" size="small">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
            <el-button type="warning" @click="restQuery" size="small">重置</el-button>
          </el-form-item>
        </el-form>

        <div class="tableset">
          <el-table :data="resData.list"
                    border
                    stripe
                    tooltip-effect="dark"
                    :row-key="getRowkeys"
                    @selection-change="handleSelectionChange"
          >
            <el-table-column :selectable="selecAble" type="selection" align="center" width="50">
            </el-table-column>
            <el-table-column :render-header="labelHead" label="目录\类型" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.CATALOGAREANAME}}</span>
                <!--<div class="text-inline">西药低价</div>-->
                <!--<div class="text-inline">药品目录</div>-->
              </template>
            </el-table-column>
            <el-table-column label="产品名称" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.PRODUCT}}</span>
              </template>
            </el-table-column>
            <el-table-column label="商品名" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.TRADE }}</span>
              </template>
            </el-table-column>
            <el-table-column label="剂型" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.DOSAG}}</span>
              </template>
            </el-table-column>
            <el-table-column label="规格" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.SPEC}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="right"
              header-align="left"
              width="60px"
              label="转换比"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{ scope.row.STANDRATE}}</span>
              </template>
            </el-table-column>
            <el-table-column label="单位" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.METRIC}}</span>
              </template>
            </el-table-column>
            <el-table-column label="包材" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.WRAP}}</span>
              </template>
            </el-table-column>
            <el-table-column label="生产企业" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.MANUFACTURE}}</span>
              </template>
            </el-table-column>
            <el-table-column  :render-header="labelHead" label="全国\最低价" align="right" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{priceFormat(scope.row.PRICE)}}</span>
              </template>
            </el-table-column>
            <el-table-column :render-header="labelHead" label="成交\参考价" align="right" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{priceFormat(scope.row.REFERENCE)}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="状态">
              <template slot-scope="scope">
                <span>{{scope.row.STATE == '1' ?"已报价":"未报价"}}</span>
              </template>
            </el-table-column>
            <el-table-column :render-header="labelHead" label="申报\最低价" align="right" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{priceFormat(scope.row.CHANGEPRICE)}}</span>
              </template>
            </el-table-column>
            <el-table-column :render-header="labelHead" label="承诺\供应价" align="right" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{priceFormat(scope.row.CHANGEREFERENC)}}</span>
              </template>
            </el-table-column>
            <el-table-column
              :render-header="labelHead"
              label="最低价申报\供应价申报"
              width="89px"
            >
              <template slot-scope="scope">
                <div class="operates w100" >
                  <span class="btn-word-2">
                      <a
                        v-if="scope.row.CATALOGAREA !== '4' || scope.row.CATALOGAREA !== '5'"
                         :class="{'blue-bord':scope.row.STATE !='1','gray-bord':scope.row.STATE =='1'}"
                         @click="declare(scope.row.ID,scope.row.STATE)">申报</a>
                    </span>
                      <a v-if="scope.row.PRICE!=undefined"
                         :class="{gray:scope.row.STATE =='1',orange:scope.row.STATE =='0'}"
                         @click="ensure(scope.row.ID,scope.row.STATE)">确定</a>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 表格分页 -->
        <div class="pagebox">
          <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
                         @current-change="handleCurrentChange" :page-sizes="[10, 20, 30]" :total="resData.total"
                         :page-size="resData.pageSize" :page-count="resData.pages" :current-page.sync="resData.pageNum">
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="table-caption foot-btn">
      <div class="foot-left">
        <el-button type="warning" size="small" @click="exportExcel">导出报价数据</el-button>
        <el-button type="success" size="small" @click="batchSubmit">批量确定</el-button>
        <el-button type="primary" size="small" @click="changeCatalogArea">目录类型变更</el-button>

      </div>
    </div>
    <declare ref="declare" :changeFlag="changeFlag" v-if="declareShow"></declare>
    <catalogAreaChange ref="catalogAreaChange" :changeFlag="changeFlag" v-if="catalogShow"></catalogAreaChange>
  </div>
</template>

<script>
  import {queryList,confirmPrices,exportPriceManage} from "src/axios/auditchanges/messageChanges/priceManage"
  import moment from 'moment'
  import declare from 'src/pages/auditchanges/priceManage/priceDeclare'
  import catalogAreaChange from 'src/pages/auditchanges/priceManage/catalogAreaChange'
  import fileUpload from 'js-file-download'
  import {priceFormat,labelHead} from "src/utils/index"

  export default {
    components: {
      declare,
      catalogAreaChange
    },
    data() {
      return {
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        options: [
        {
          value: '',
          label: '状态'
        },
          {
          value: '0',
          label: '未报价'
        },
          {
            value: '1',
            label: '已报价'
          }
        ],
        declareShow: false,
        catalogShow: false,
        selection:[],
        changeFlag:false,
        changeCatalogAreaId:'',
        catalogAreaList: [
          {key: "0", value: "0", label: "西药竞价谈判目录",disabled:false},
          {key: "1", value: "1", label: "中药竞价谈判目录",disabled:false},
          {key: "2", value: "2", label: "西药低价药品目录",disabled:false},
          {key: "3", value: "3", label: "中药低价药品目录",disabled:false},
          {key: "4", value: "4", label: "短缺药品目录",disabled:false},
          {key: "5", value: "5", label: "国家谈判目录",disabled:false},
        ],
      }
    },
    created() {
      this.list();
    },
    methods: {
      priceFormat,labelHead,
      metaData() {
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
      metaQuery() { // 表单查询数据初始化
        let obj = {
          //查询封装的数据
          CATALOGAREA: undefined,
          PRODUCT: undefined,
          DOSAGE: undefined,
          SPEC: undefined,
          MANUFACTURE: undefined,
          STATE: undefined,
        }
        if(sessionStorage.getItem('query')){
          obj = JSON.parse(sessionStorage.getItem('query'))
        }
        return obj
      },
      handleQuery() {
        this.list()
      },
      restQuery() {//重置
        sessionStorage.removeItem('query')
        this.query = this.metaQuery();
        this.list();
      },
      list() {
        queryList(this.resData, this.query).then(res => {
          this.resData = res.data;
          console.log(this.resData)
          if (this.resData.list.length == 0) {
            this.resData.pageNum = 1;
          }
        })
      },
      exportExcel(){
        exportPriceManage(this.query).then(res => {
          let headers = res.headers;
          let title = ""
          if (!title) {
            const fileName = headers['content-disposition'];
            title = fileName.includes('filename=') ? decodeURI(fileName.split('=')[1]) : '下载的文件';
          }
          fileUpload(res.data, title, "application/vnd.ms-excel")
        })
      },
      selecAble(row,index){
        //row.PRICE==undefined
        if(row.CATALOGAREA == '5'){
          return true
        }else{
          return false
        }
      },
      getRowkeys(row){
        return row.ID;
      },
      handleSelectionChange(val) {
        let selectionResult = [];
        val.forEach(item=>{
          selectionResult.push(item.ID)
        });
        this.selection = selectionResult;

        //用于点击修改目录时的基本信息参数
        if(val.length == 1){
          this.changeCatalogAreaId = val[0].ID
        }else{
          this.changeCatalogAreaId = ''
        }
        console.log('我是选中后的值---',val,'我是选中的id值的集合')
      },
      handleSizeChange(val) {
        this.resData.pageSize = val;
        this.list()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val;
        this.list()
      },
      declare(projectProductId,stateId) {
        if(stateId == '1' ){
          this.$message({
            message:'正在申报中',
            type:'warning'
          })
          return;
        }
        this.declareShow = true;
        this.changeFlag =false;
        this.$nextTick(() => {
          this.$refs.declare.list(projectProductId)
        })
      },
      changeCatalogArea(){
        if(!this.changeCatalogAreaId){
          this.$message({
            message:'请选择一个价格再进行变更',
            type:'warning'
          });
          return;
        }
        this.catalogShow = true;
        this.$nextTick(() => {
          this.$refs.catalogAreaChange.list(this.changeCatalogAreaId)
        })
      },
      confirm(ids){
        confirmPrices(ids).then(res=>{
          if(res.success){
            this.$message({
              message:'提交成功',
              type:'success'
            })
            window.location.reload()
          }else{
            this.$message.error(res.message)
          }
        })
      },
      batchSubmit(){
        if(this.selection < 1){
          this.$message({
            message:'请选择需要确定的价格',
            type:'warning'
          });
          return;
        }
        this.confirm(this.selection)
      },
      ensure(projectProductId,stateId){
        if(stateId == '1'){
          this.$message({
            message:'正在申报中',
            type:'warning'
          })
          return;
        }
        let idArr = [];
        idArr.push(projectProductId);
        this.confirm(idArr)
      }
    }
  }
</script>
