<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" :inline="true" class="table-form" size="small">
                <el-form-item>
                  <el-input v-model="query.productName" size="small" :maxlength="200" placeholder="品名"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input v-model="query.manufactureName" size="small" :maxlength="200" placeholder="生产企业"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-select v-model="query.basicFlag" size="small" placeholder="基药类型">
                    <el-option
                      v-for="item in sources"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button size="small" type="success" @click="list()">查询</el-button>
                   <el-button type="warning" size="small" @click="reset()">重置</el-button>
                </el-form-item>
        </el-form>


      <!-- 表格列表 -->
      <div class="tableset">
        <!--<el-button type="primary" size="middle" @click="deleteBatchList()">从采购目录删除</el-button>-->
        <el-table :data="resData.list"
                  :default-sort ="{prop:'nameChn',prop:'drugDetail',prop:'bidOrgName',prop:'bidPrice',prop:'twoVoteCou',
                  prop:'catalogArea',prop:'basicFlag',prop:'otherHosCount',prop:'senderCount'}"
                  border
                  stripe
                  @selection-change="handleSelectionChange"
                  @sort-change="sortChange">
          <!-- 显示字段：通用名、产品名、商品名、剂型、规格、转换比、单位、包材、生产企业、总分、参考价、企业报价、议价价格、申报企业、目录范围、基药标记、议价状态、其他医院选择数量、议价开始时间、议价结束时间；-->
          <!--<el-table-column align="center" type="selection" width="40"></el-table-column>-->
          <el-table-column label="通用名" width="130" prop="NAMECHN" sortable="custom" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.nameChn }}</span>
            </template>
          </el-table-column>
          <el-table-column label="产品名" width="150">
            <template slot-scope="scope">
              <div class="ellipsis es150" :title="scope.row.productName">{{ scope.row.productName }}</div>
              <div class="ellipsis es150" :title="scope.row.tradeName">(商品名：{{ scope.row.tradeName }})</div>
            </template>
          </el-table-column>
          <el-table-column label="产品信息" width="200">
            <template slot-scope="scope">
              <div class="pro-details ellipsis es200"
                   :title="scope.row.spec+'×'+scope.row.standRate+scope.row.smallestUnits+'/'+scope.row.specUnit+'('+scope.row.wrapName+')'+'('+scope.row.doseageFormName+')'">
                {{ scope.row.spec}} × {{ scope.row.standRate}} {{ scope.row.smallestUnits}} / {{scope.row.specUnit}} ({{scope.row.wrapName}}) ({{ scope.row.doseageFormName }})
              </div>
              <div class="pro-details ellipsis es200" :title="scope.row.manufactureName">{{ scope.row.manufactureName}}</div>
            </template>
          </el-table-column>
          <el-table-column label="申报企业" prop="BIDORGNAME" width="160" sortable="custom" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.bidOrgName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="企业报价" prop="BIDPRICE" sortable="custom" width="90" align="right" header-align="left">
            <template slot-scope="scope">
              <span>{{ scope.row.bidPrice }}</span>
            </template>
          </el-table-column>
          <el-table-column label="两票制" prop="TWOVOTECOU" sortable="custom" width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.twoVoteCou <= 0" style="color:red">未签订</span>
              <span v-if="scope.row.twoVoteCou > 0">已签订</span>
            </template>
          </el-table-column>
          <el-table-column label="目录范围" prop="CATALOGAREA" sortable="custom" width="150" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.catalogArea }}</span>
            </template>
          </el-table-column>
          <el-table-column label="基药类型" prop="BASICFLAG" sortable="custom" width="90">
            <template slot-scope="scope">
              <span>{{ basicFlagData(scope.row.basicFlag)}}</span>
            </template>
          </el-table-column>

          <el-table-column label="其它医院" prop="OTHERHOSCOUNT" sortable="custom" align="right" header-align="left">
            <template slot-scope="scope">
              <a href="javascript:" @click="hosSelectionHos(scope.row.productId)">{{ scope.row.otherHosCount }}</a>
              <!--<span></span>-->
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
      <div class="foot-btn">
        <div class="foot-left">
           <el-button size="small" type="success" @click="gotoCatalogManagementBasicDrugDataPage()">新增</el-button>
           <el-button size="small" type="warning" @click="Excel()">导出</el-button>
        </div>
      </div>
      <!--  ====================================== 弹窗 ====================================== -->
      <!--1.查看选择医院弹窗-->
      <el-dialog title="查看选择医院" :visible.sync="showHos" :before-close="closeForm" width="60%">
        <el-form :inline="true" ref="showHosDataQuery" :model="showHosDataQuery" class="table-form" size="small">
          <el-form-item>
            <el-input v-model="showHosDataQuery.name" placeholder="医院名称"></el-input>
          </el-form-item>
            <el-form-item>
              <el-button type="success" size="small" @click="hosSelectionHosForSelected(showHosDataQuery.name)">查询</el-button>
          </el-form-item>
        </el-form>

          <el-table
            :data="showHosData"
            style="width: 100%"
            max-height="200"
            border
            stripe>
            <el-table-column label="医院名称">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>

          </el-table>
      </el-dialog>
    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求  引自js文件
  import {queryHosCandidateCatalogListTabAlternative,queryHosCandidateCatalogListTabAlternativeExportExcel} from 'src/axios/contract/catalogmanagement/hosCandidateCatalogType'
  import {findSelectionHos,deleteBatchPurchaseList} from "src/axios/contract/catalogmanagement/basicDrugDataType";
  import fileUpload from 'js-file-download'
  export default {
    data () {
      return {
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        showHos:false,//选择医院弹框状态
        showHosDataQuery:{name:""},
        showHosData:[],
        multipleSelection:[],//多选框选择状态
        sources : [{    //基药标记选择
          label : '非基药',
          value : '0'
        },{
          label : '国家基药',
          value : '1'
        },{
          label : '北京增补',
          value : '2'
        }]
      }
    },
    created () {
      this.list()
    },
    methods: {
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
            productName: "",
            manufactureName: "",
            basicFlag:""
          }
        }
      },
      toggleHos() {
        this.showHos = !this.showHos
      },
      closeForm(){
        this.toggleHos();
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
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
      //  获取用户分页列表
      list () {
        queryHosCandidateCatalogListTabAlternative(this.resData, this.query).then(res => {
          console.log(res);
          this.resData = res.data;
          if(this.resData.pageNum === 0 ){
            this.resData.pageNum = 1
          }
        })
      },
      // -------------选择医院模态框查询----------
      //发送请求查询的方法
      hosSelectionSourch(id,hosName){
        findSelectionHos(id, hosName,1).then(res => {
          this.showHosData = res.data.list;
          this.showHos = true;
        })
      },
      //  第一次弹开
      hosSelectionHos(id) {
        //每次弹出来的时候把搜索框清空
        this.showHosDataQuery.name = "";
        this.productId = id;
        this.hosSelectionSourch(id,"");
      },
      gotoCatalogManagementBasicDrugDataPage(){
        this.$router.push({path:'/CONTRACT/catalogmanagement/catalogManagementBasicDrugData'});
      },
      //点击查询按钮查询的时候
      hosSelectionHosForSelected(hosName) {
        this.hosSelectionSourch(this.productId,hosName);
      },

      deleteBatchList(){

        let ids = [];
        this.multipleSelection.map(function(item,key,ary) {
          ids.push(item.productId);
        });

        //如果当前选择数据都未加入到了目录那么就return 不使他提交
        if(ids.length==0){
          this.$message({
            message: '请选择要删除的条目',
            type: 'warning'
          });
          return;
        }

        deleteBatchPurchaseList(ids).then(res=>{
          if(res.data>0){
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.list();
          }
        })
      },
      reset(){
        this.query = this.metaQuery();
        this.list()
      },
      Excel(){
        this.lyfloading = true;
        queryHosCandidateCatalogListTabAlternativeExportExcel(this.resData, this.query).then(res => {
          this.lyfloading = false;
          let headers = res.headers;
          let title = ""
          if (!title) {
            console.info("title",title)
            const fileName = headers['content-disposition'];
            console.info("fileName " , fileName)
            console.info(fileName)
            title = fileName.includes('filename=') ? decodeURI(fileName.split('=')[1]) : '下载的文件';
          }
          fileUpload(res.data,title,"application/vnd.ms-excel")
        }).catch(() => {
          this.lyfloading = false;
        })
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
      //数据全选操作
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
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
      }
    }
  }
</script>

