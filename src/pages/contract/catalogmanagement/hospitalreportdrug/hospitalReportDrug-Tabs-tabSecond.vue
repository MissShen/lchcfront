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
              <el-button size="small" type="success" @click="searchEnterFun">查询</el-button>
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
          <el-table-column label="通用名" width="115" prop="nameChn" sortable="custom" :show-overflow-tooltip="true">
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
          <el-table-column label="药事会" prop="wheThrough" sortable="custom" width="75">
            <template slot-scope="scope">
              <span v-if="scope.row.wheThrough == 0">目录内</span>
              <span v-else-if="scope.row.wheThrough == 1">目录外</span>
              <span v-else>未上报</span>
            </template>
          </el-table-column>
          <el-table-column label="医院报价" prop="price" sortable="custom" width="90" align="right" header-align="left">
            <template slot-scope="scope">
              <span>{{ scope.row.price }}</span>
            </template>
          </el-table-column>
          <el-table-column label="企业报价" prop="bidPrice" sortable="custom" width="90" align="right" header-align="left">
            <template slot-scope="scope">
              <span v-if="scope.row.resState != 1">待议价</span>
              <span v-else-if="scope.row.resState == 1 && scope.row.bidPrice == 0">无</span>
              <span v-else>{{ scope.row.bidPrice }}</span>
            </template>
          </el-table-column>
          <el-table-column label="参考价" prop="minPrice" sortable="custom" width="80" align="right" header-align="left">
            <template slot-scope="scope">
              <!--<el-tooltip effect="dark"  placement="top">
                <div slot="content">{{referencePrice(scope.row.minPrice,scope.row.orgName,scope.row.bjPrice,scope.row.hbPrice,scope.row.tjPrice)}}</div>
                <span>{{scope.row.minPrice}}</span>
              </el-tooltip>-->
              <span>{{scope.row.minPrice}}</span>
            </template>
          </el-table-column>
          <el-table-column label="最小单价" prop="minPrice" sortable="custom" width="90" align="right" header-align="left">
            <template slot-scope="scope">
              <span>{{scope.row.minPrice}}</span>
            </template>
          </el-table-column>
          <!--<el-table-column label="候选目录" prop="resState" sortable="custom" width="90">
            <template slot-scope="scope">
              <span v-if="scope.row.resState == 0">目录外</span>
              <span v-if="scope.row.resState == 1">目录内</span>
              <span v-if="scope.row.resState == 2">其他</span>
            </template>
          </el-table-column>-->
          <el-table-column label="企业申报" prop="isCompanyDeclare" sortable="custom" width="90">
            <template slot-scope="scope">
              <span v-if="scope.row.isCompanyDeclare != 0">已申报</span>
              <span v-if="scope.row.isCompanyDeclare == 0">未申报</span>
            </template>
          </el-table-column>
          <el-table-column label="匹配度" prop="isCompanyDeclare" sortable="custom" width="75">
            <template slot-scope="scope">
              <span v-if="scope.row.isCompanyDeclare != 0">相同</span>
              <span v-if="scope.row.isCompanyDeclare == 0">替换</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <a class="operation-btn" @click="recoverUseIsEnable(scope.row.id)" size="small">恢复使用</a>
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
  import {selectHospitalReportDrugNoUseList, recoverUse} from 'src/axios/contract/hospitalreportdrug/hospitalReportDrug'
  import { keyBoardEnter } from "src/utils"

  export default {
    data () {
      return {
        activeName: 'first',  // 当前标签
        currentOrder: undefined,
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        menuButtonVisible: false,
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        isCompanyDeclares: [
          {
            value: '1',
            label: '已申报'
          },
          {
            value:'0',
            label:'未申报'
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
    created () {
      // this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
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
      handleGoAdd () {
        this.resetForm()
        this.form = this.metaForm()
        this.showForm = true
        /*this.$refs['form'].resetFields()*/
        this.formStatus = 'add'
        this.rules = this.metaRules()
      },

      metaQuery () { // 表单查询数据初始化
        return {
          manufactureName:"",
          productName:"",
          isCompanyDeclare:"",
          purchaseMode:"",
          matchingDegree:""
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy = this.currentOrder;
        selectHospitalReportDrugNoUseList(this.resData, this.query).then(res => {
          console.log(res);
          this.resData = res.data
        })
      },
      reset(){
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
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      },
      //恢复使用
      recoverUseIsEnable(id){
        this.$confirm('是否确认恢复使用?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          recoverUse(id).then(res=>{
            this.$message({
              type: 'success',
              message: res.data
            })
            this.list();
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
