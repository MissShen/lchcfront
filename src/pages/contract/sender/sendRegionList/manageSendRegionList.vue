<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">

      <!-- 表格查询表单 -->
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" :inline="true" class="table-form">
            <el-form-item>
               <el-select size="small" @change="districtChange" v-model="query.district" placeholder="请选择省">
                    <el-option
                      v-for="item in districtListData"
                      :key="item.id"
                      :label="item.nameChn"
                      :value="item.id">
                    </el-option>
                  </el-select>
            </el-form-item>
            <el-form-item>
               <el-select size="small" @change="cityChange" v-model="query.city" placeholder="请选择市">
                    <el-option
                      v-for="item in cityListData"
                      :key="item.id"
                      :label="item.nameChn"
                      :value="item.id">
                    </el-option>
                  </el-select>
            </el-form-item>
            <el-form-item>
               <el-select size="small" v-model="query.region" placeholder="请选择区/县">
                    <el-option
                      v-for="item in regionListData"
                      :key="item.id"
                      :label="item.nameChn"
                      :value="item.id">
                    </el-option>
                  </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="warning" size="small" @click="list()">查询</el-button>
              <el-button type="success" size="small" @click="resetForm()">重置</el-button>
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
          <el-table-column type="selection" width="40" align="center" :selectable="selectable"></el-table-column>
          <el-table-column label="项目名称" prop="PROJECT_NAME" :show-overflow-tooltip="true" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.projectName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="配送企业" prop="SENDER_NAME" :show-overflow-tooltip="true" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.senderName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="省" prop="DISTRICT_NAME" :show-overflow-tooltip="true" sortable="custom" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.districtName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="市" prop="CITY_NAME" :show-overflow-tooltip="true" sortable="custom" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.cityName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="区(县)" prop="REGION_NAME" :show-overflow-tooltip="true" sortable="custom" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.regionName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建人" prop="CREATE_USER" :show-overflow-tooltip="true" sortable="custom" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.createUser }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建日期" prop="CREATE_DATE" :show-overflow-tooltip="true" sortable="custom" width="150">
            <template slot-scope="scope">
              <el-tooltip :enterable="false" class="item" effect="dark" placement="top-start">
                <div slot="content">{{ scope.row.createDate }}</div>
                <span v-if="scope.row.createDate!=null && scope.row.createDate!=''">{{ moment(scope.row.createDate).format("YYYY-MM-DD") }}</span>
                <span v-else></span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            label="操作" width="100">
            <template slot-scope="scope">
              <div class="operates">
                <a class="green" @click="deleteSenderbyId(scope.row.id)">删除</a>
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
      <div class="foot-btn">
        <div class="foot-left">
          <span><el-button type="success" size="small" @click="addArea()">新增区域</el-button></span>
          <span><el-button type="danger" size="small" @click="deleteBatchSenderbyIds()">删除</el-button></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  // 引入用户相关请求
  import {queryByAreaHttp,findByParentId,findByParentIds,deleteSenderByIdsHttp} from 'src/axios/contract/sender/sendRegion';
  import moment from "moment";

  export default {
    data () {
      return {
        currentOrder: undefined,
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        multipleSelection:[],//多选checkbox的数据
        //省下拉框的数据
        districtListData:[{
          nameChn:"省",
          id:''
        }],
        //市下拉框的数据
        cityListData:[{
          nameChn:"市",
          id:''
        }],
        //区县下拉框的数据
        regionListData:[{
          nameChn:"区/县",
          id:''
        }],
      }
    },
    created () {
      //初始化进来查询省
      findByParentId('FR20T0000010000000050000').then(res =>{
        let init = [{id:"",nameChn:"省"}];
        const data = init.concat(res.data)
        this.districtListData = data;
        for(let i = 0; i < data.length; i++) {
          if(data[i].nameChn === "北京"){
            this.query.district = data[i].id
            this.districtChange(this.query.district);
          }
        }

        //查询配送列表
        this.list();
      })
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
          district:"",
          city:"",
          region:""
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------

      //  获取用户分页列表
      list () {
        //查询配送列表
        this.resData.orderBy = this.currentOrder;
        queryByAreaHttp(this.resData,this.query).then(res => {
          console.log(res);
          this.resData = res.data
          if(this.resData.pageNum === 0){
            this.resData.pageNum =1;
          }
        })
      },
      //新增区域
      addArea(){
        this.$router.push("/CONTRACT/contractmanagement/senderSendRegionList");
      },
      //重置
      resetForm(){
        this.query.district = "";
        this.query.city = "";
        this.query.region = "";
        let init = [{id:"",nameChn:"全部"}];
        this.cityListData = [{id:"",nameChn:"市"}];
        this.regionListData = [{id:"",nameChn:"区/县"}];
        this.list();
      },
      //多选框改变状态
      handleSelectionChange(val) {
        let id = [];
        for(let i = 0; i < val.length; i++) {
          id.push(val[i].id);
        }
        this.multipleSelection = id;
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
      selectable(row, index) {
        if (row.id === '') {
          return false
        } else {
          return true
        }
      },
      //省改变  查询市
      districtChange(districtId){
        if(districtId != ""){
          findByParentId(districtId).then(res =>{
            let init = [{id:"",nameChn:"市"}];
            const data = init.concat(res.data)
            this.cityListData = data;
          })
        }
        //改变了省，那么清除选中的市、区县，清空区县列表
        this.query.city = "";
        this.query.region = "";
        this.regionListData = [{id:"",nameChn:"区/县"}];
      },
      //市改变   查询区县
      cityChange(cityId){
        if(cityId != ""){
          findByParentIds(cityId).then(res=>{
            let init = [{id:"",nameChn:"区/县"}];
            const data = init.concat(res.data[0].list)
            this.regionListData = data;
          })
        }
        //改变了市 那么清除选中的区县
        this.query.region = "";
      },
      //单个删除
      deleteSenderbyId(id){
         this.deleteSenderByIds([id]);
      },
      //批量删除
      deleteBatchSenderbyIds(){
         this.deleteSenderByIds(this.multipleSelection);
      },
      //删除执行体
      deleteSenderByIds(ids){
        if(ids.length==0){
          this.$message({
            message: '请选择要删除的区域',
            type: 'warning'
          });
          return;
        }
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteSenderByIdsHttp(ids).then(res=>{
              if(res.data>0){
                this.$message({
                  type: 'success',
                  message: "删除成功"
                })
                this.list();
              }
          })
        }).catch(()=>{});
      },
      //分页 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val;
        this.list();
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val;
        this.list();
      }
    }
  }
</script>
