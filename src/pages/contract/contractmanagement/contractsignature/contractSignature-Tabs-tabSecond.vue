<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query"  size="small" :inline="true" class="table-form">
            <el-form-item>
              <el-select v-model="query.conType"
                          size="small" placeholder="合同名称">
                  <el-option-group
                    key="合同名称"
                    label="合同名称">
                    <el-option
                      v-for="item in contractName"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-option-group>
              </el-select>
            </el-form-item>
            <el-form-item>
                  <el-input v-model="query.jiaName"
                            maxlength="200" size="small" placeholder="甲方" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item>
                  <el-input v-model="query.yiName"
                            maxlength="200" size="small"  placeholder="乙方" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item>
                  <el-select v-model="query.conState" size="small" placeholder="合同状态">
                    <el-option-group
                      key="合同状态"
                      label="合同状态">
                      <el-option
                        v-for="item in contractTypes"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-option-group>
                  </el-select>
              </el-form-item>
            <el-form-item>
                <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
                <el-button type="warning" size="small" @click="resetForm()">重置</el-button>
              </el-form-item>
        </el-form>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe
          @sort-change="sortChange">
          <el-table-column label="合同编号" prop="con_No" sortable="custom" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.conNo }}</span>
            </template>
          </el-table-column>
          <el-table-column label="合同名称" prop="con_Type" sortable="custom" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.conType== 1?'购销合同':'委托合同' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="甲方" prop="jia_Name" sortable="custom" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.jiaName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="乙方" prop="yi_Name" sortable="custom" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.yiName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="甲方签章时间" prop="jia_Sign_Date" sortable="custom" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <el-tooltip :enterable="false" class="item" effect="dark" placement="top-start">
                <div slot="content">{{scope.row.jiaSignDate}}</div>
                <span v-if="scope.row.jiaSignDate!=null && scope.row.jiaSignDate!=''">{{ moment(scope.row.jiaSignDate).format("YYYY-MM-DD") }}</span>
                <span v-else></span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="乙方签章时间" prop="yi_Sign_Date" sortable="custom" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <el-tooltip :enterable="false" class="item" effect="dark" placement="top-start">
                <div slot="content">{{ scope.row.yiSignDate }}</div>
                <span v-if="scope.row.yiSignDate!=null && scope.row.yiSignDate!=''">{{ moment(scope.row.yiSignDate).format("YYYY-MM-DD") }}</span>
                <span v-else></span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="合同状态" prop="con_State" sortable="custom" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.conStateName }}</span>
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
  import {selectContractHistoryList,getContractSignatureMainState} from 'src/axios/contract/contractsignature/contractList';
  import { keyBoardEnter } from "src/utils"

  import moment from "moment";
  export default {
    data () {
      return {
        currentOrder:undefined, //分页的时候缓存
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        contractTypes:[],
        contractName:[
        {
          value:'',
          label:'全部'
        },{
          value:'1',
          label:'购销合同'
        }, {
          value:'2',
          label:'委托合同'
        }
        ]
      }
    },
    created () {
      this.getContractMainStateList();
      this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      moment,
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
      metaQuery () { // 表单查询数据初始化
        return {
          query: {
            conType : undefined,
            jiaName : undefined,
            yiName :undefined,
            conState : undefined
          }
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //重置表单
      resetForm(){
        this.query = this.metaQuery();
        this.list();
      },
      //  获取用户分页列表
      list () {
        this.resData.orderBy = this.currentOrder;
        selectContractHistoryList(this.resData, this.query).then(res => {
          console.log(res);
          this.resData = res.data
          if(this.resData.pageNum === 0){
            this.resData.pageNum = 1;
          }
        })
      },
      getContractMainStateList(){
        getContractSignatureMainState().then(res => {
          let header = [{label:"全部",value:""}];
          if(res.data != null && res.data.length>0){
            this.contractTypes = header.concat(res.data)
          }else{
            this.contractTypes = [];
          }
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
      }
    }
  }
</script>
