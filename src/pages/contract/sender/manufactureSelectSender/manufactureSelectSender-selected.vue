<template>
  <!--<el-dialog
    title="查看配送企业"
    :close-on-click-modal="false"
    :visible.sync="visible" width="80%">-->
  <!-- 表格 -->
  <div>

    <div class="">
      <el-form ref="query" :model="query" :inline="true" class="table-form"">
          <el-form-item class="width-120">
            <el-input v-model="query.senderName" placeholder="企业名称" size="small" @keyup.enter.native="searchEnterFun"></el-input>
          </el-form-item>
          <!--<el-form-item class="width-120">
            <el-select v-model="query.district" placeholder="省" @change="queryCities()" size="small">
              <el-option
                v-for="item in districts"
                :key="item.id"
                :label="item.nameChn"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="width-120">
            <el-select v-model="query.city" placeholder="市" @change="queryRegions()" size="small">
              <el-option
                v-for="item in cities"
                :key="item.id"
                :label="item.nameChn"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="width-120">
            <el-select v-model="query.region" placeholder="区" @change="showRegion()" size="small">
              <el-option
                v-for="item in regions"
                :key="item.id"
                :label="item.nameChn"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>-->
          <el-form-item class="width-120">
              <el-select v-model="query.complainedCount" placeholder="不良记录" size="small">
                <el-option-group
                  key="不良记录"
                  label="不良记录">
                  <el-option
                    v-for="item in records"
                    :key="item.record"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-option-group>
              </el-select>
          </el-form-item>
          <el-form-item class="width-120">
              <el-select v-model="query.serviceState" placeholder="配送评价" size="small">
                <el-option-group
                  key="配送评价"
                  label="配送评价">
                  <el-option
                    v-for="item in serviceStates"
                    :key="item.serviceState"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-option-group>
              </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="success" size="small" @click="searchEnterFun">查询</el-button>
            <el-button type="warning" size="small" @click="resetForm()">重置</el-button>
          </el-form-item>
      </el-form>
    </div>

    <!-- 表格列表 -->
    <div class="tableset">
      <el-table
        :data="resData.list"
        border
        stripe
        @sort-change="sortChange">
        <!--<el-table-column
          type="selection"
          width="55">
        </el-table-column>-->
        <el-table-column label="企业名称" prop="NAME" min-width="180"  sortable="custom" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <!--<el-table-column label="省份" prop="provinceName" width="100" sortable="custom" align="center" >
          <template slot-scope="scope">
            <span>{{ scope.row.provinceName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="市" prop="cityName" width="80" sortable="custom" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.cityName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="区（县）" prop="areaName" width="80" sortable="custom" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.areaName }}</span>
          </template>
        </el-table-column>-->
        <el-table-column label="两票制" width="120" prop="twoVoteId" sortable="custom" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.twoVoteId != null">已签订</span>
            <span v-else style="color: #FF0000">未签订</span>
          </template>
        </el-table-column>
        <el-table-column label="电话" prop="LINK_PHONE" sortable="custom" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.linkPhone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="不良记录" width="120" prop="COMPLAINED_COUNT" sortable="custom">
          <template slot-scope="scope">
            <a @click="complainedTable(scope.row.senderId)" v-if="scope.row.complainedCount > 0 && scope.row.complainedCount != null && scope.row.complainedCount != ''">{{ scope.row.complainedCount }}</a>
            <span v-if="scope.row.complainedCount == 0 || scope.row.complainedCount == null || scope.row.complainedCount == ''">无不良记录</span>
          </template>
        </el-table-column>
        <el-table-column label="配送评价" prop="SERVICESTATE" width="130" sortable="custom" :show-overflow-tooltip="true">
          <template slot-scope="scope">
              <span>
                <el-rate
                  v-model= scope.row.serviceState disabled>
                </el-rate>
              </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <div class="operates">
              <a v-if="scope.row.showDelete" @click="deleteSender(scope.row.id)">删除</a>
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
  <!--</el-dialog>-->
</template>
<script>

  // 引入用户相关请求
  import {querySelectedList, deleteSender} from 'src/axios/contract/sender/manufactureSelectSender';
  import {findByParentId} from 'src/axios/contract/sender/sendRegion';
  import { keyBoardEnter } from "src/utils"

  export default {
    /*props: {
      productId: {
        type: String,
        required: true
      }
    },*/
    data() {
      return {
        currentOrder: undefined,
        resData: this.metaData(),
        form: this.metaForm(), // 表单初始化
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        dataForm: this.metaForm(),
        districts: [],
        cities: [],
        regions: [],
        productId: undefined,//产品id，由父页面传递

        records: [
        {
          value: "",
          label: "全部"
        },{
          value: "1",
          label: "是"
        }, {
          value: "0",
          label: "否"
        }],
        serviceStates:[{label:"全部",value:""},{label:"一星",value:"1"},{label:"二星",value:"2"},{label:"三星",value:"3"},{label:"四星",value:"4"},{label:"五星",value:"5"}],

      }
    },
    created() {
      this.queryDistricts();
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
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
          list: []
        }
      },
      metaForm() { // 表单数据初始化
        return {
          senderName: ''
        }
      },
      metaQuery() { // 表单查询数据初始化
        return {
          senderName: undefined,
          district: undefined,
          city: undefined,
          region: undefined,
          parentId: undefined
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list2() {
        this.resData.orderBy = this.currentOrder;
        querySelectedList(this.resData, this.query, this.productId).then(res => {
          this.resData = res.data;
          if(this.resData.pageNum === 0){
            this.resData.pageNum = 1
          }
        });
      },

      deleteSender(id) {
        this.$confirm(`是否确认删除？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteSender(id).then(res => {
            console.log(res);
            if(res.message == 'SUCCESS'){
              this.$message({
                message: res.data,
                type: "success",

              })
              this.list2();
              //删除成功，刷新父页面
              this.$emit("refreshFather","");
            }else{
              this.$message({
                message: res.message,
                type: "error",

              })
            }
          });
        }).catch(()=>{});
      },
      //查询省
      queryDistricts() {
        findByParentId('FR20T0000010000000050000').then(res => {
          let initData = [{id:"",nameChn:"省"}];
          this.districts = initData.concat(res.data);
          for(let i = 0; i < res.data.length; i++) {
            if(res.data[i].nameChn === "北京"){
              this.query.district = res.data[i].id
              this.queryCities();
            }
          }
          //this.queryCities();
        })
      },
      //查询市
      queryCities() {
        findByParentId(this.query.district).then(res => {
          let initData = [{id:"",nameChn:"市"}];
          this.cities = initData.concat(res.data);
          this.query.city = this.cities[0].id;
          //this.queryRegions();
        })
      },
      //查询区县
      queryRegions() {
        findByParentId(this.query.city).then(res => {
         let initData = [{id:"",nameChn:"区县"}];

          this.regions = initData.concat(res.data);
          this.query.region = this.regions[0].id;
        })
      },
      showRegion() {
        console.log(this.query.region);
      },
      // 重置用户表单
      resetForm() {
        this.query = this.metaQuery()
        this.cities = [];
        this.regions = [];
        this.list2()
      },

      //父页面控制本页面刷新数据
      fillData(productId){
        this.productId = productId;
        this.list2();
      },

      //调用父页面的方法 去让他显示dialog
      complainedTable(senderId){
        this.$emit("showComplainedTable_selected",{senderId:senderId});
      },
      visible_selected(){
        this.$emit("visible_selected",false);
      },
      // ************************
      handleSizeChange(val) {
        this.resData.pageSize = val
        this.list2()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val
        this.list2()
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
        this.list2();
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e , ()=>{
          this.list2();
        })
      },
    }
  }
</script>
