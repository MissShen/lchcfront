<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
            <el-form-item>
               <el-select  placeholder="地区" v-model="query.provinceId" size="small" @keyup.enter.native="searchEnterFun">
                <el-option
                        v-for="item in area.options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
             <el-form-item>
              <el-select v-model="query.medicalInsuranceFlag" placeholder="医保标记" size="small" @keyup.enter.native="searchEnterFun">
                <el-option label="非医保" value="0"></el-option>
                <el-option label="国家医保" value="1"></el-option>
                <el-option label="北京医保" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="query.lowestType" placeholder="低价药标记" size="small" @keyup.enter.native="searchEnterFun">
                <el-option label="非低价" value="0"></el-option>
                <el-option label="国家低价" value="1"></el-option>
                <el-option label="北京低价" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="query.contractType" placeholder="基药标记" size="small" @keyup.enter.native="searchEnterFun">
                <el-option label="非基药" value="2"></el-option>
                <el-option label="国家基药" value="0"></el-option>
                <el-option label="北京基药" value="1"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
              <el-button type="warning" @click="resetForm()" size="small">重置</el-button>
            </el-form-item>

        </el-form>
      <div class="foot-btn">
        <div class="foot-left">
          <el-button type="success" @click="goAddSpecialMarks()" size="small">新增</el-button>
          <el-button type="danger" @click="handleDelete()" size="small">删除</el-button>
          <el-button size="small" @click="goBack">返回</el-button>
        </div>
      </div>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table ref="multipleTable"
          :data="resData.list"
          @selection-change="handleSelectionChange"
          :row-key="getRowKeys"
          @sort-change="sortChangeFunc"
          border
          stripe>
          <el-table-column type="selection" :reserve-selection="true" width="50" align="center"></el-table-column>
          <el-table-column label="药品名" show-overflow-tooltip>
            <template slot-scope="scope" >
              <span>{{ scope.row.medicalName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="药品类别" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.medicalType }}</span>
            </template>
          </el-table-column>
          <el-table-column label="地区" prop="province_id" sortable="custom" width="150" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.provinceId }}</span>
            </template>
          </el-table-column>
          <el-table-column label="医保标记" prop="medical_insurance_flag" sortable="custom" width="150" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ setMedicalInsuranceFlag(scope.row.medicalInsuranceFlag) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="基药标记" prop="contract_type" sortable="custom" width="150">
            <template slot-scope="scope">
              <span>{{ setContractType(scope.row.contractType) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="低价药标记" prop="lowest_type" sortable="custom" width="150">
            <template slot-scope="scope">
              <span>{{ setLowestType(scope.row.lowestType) }}</span>
            </template>
          </el-table-column>
          <el-table-column
                  label="操作"
                  width="160">
            <template slot-scope="scope">
              <div class="operates"><a class="operation-btn" @click="goSeeSpecialInfo(scope.row.id)">查看</a>
                <a class="operation-btn" @click="goUpdateSpecialInfo(scope.row.id)">修改</a></div>
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
    <add-special v-if="addVisible" ref="addSpecial" @saveSpecial="list"></add-special>
    <see-special v-if="seeVisible" ref="seeSpecial"></see-special>
    <update-special v-if="updateVisible" ref="updateSpecial" @updateSpecial="list"></update-special>
  </div>
</template>
<script>

  // 引入用户相关请求
  import {specialMarkList,provinceList,deleteSpecial} from 'src/axios/datacenter/productdata/specialmaintain/specialmaintain';
  import addSpecial from './windowPanel/addSpecialMark';
  import seeSpecial from './windowPanel/seeSpecialMark';
  import updateSpecial from './windowPanel/updateSpecialMark';
  import {keyBoardEnter} from "src/utils";

  export default {
    components: {
      addSpecial,
      seeSpecial,
      updateSpecial
    },
    data () {
      return {
        id:undefined,
        provinces:undefined,
        area:this.checkArea(),
        addVisible:false,
        seeVisible:false,
        updateVisible:false,
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        selectDataList:[]
      }
    },
    created () {
      this.query.id = this.$route.params.id || undefined;
      this.id=this.query.id;
      this.provinceList();
      this.list();
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {
          // 前后台交互数据封装格式
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
      //  回车查询
      searchEnterFun(e){
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          if(this.query.provinceId || this.query.medicalInsuranceFlag || this.query.lowestType
            || this.query.contractType ){
            this.list2();
          }
        })
      },
      //  查询
      search(){
        this.resData.pageNum=1;
        this.list2();
      },
      metaQuery () {
        return {
          // 表单查询数据初始化
          id:undefined,
          provinceId:undefined,
          medicalInsuranceFlag:undefined,
          lowestType:undefined,
          contractType:undefined,
          orderBy:undefined
        }
      },
      //  排序查询
      sortChangeFunc(value){
        let sortType=" desc"
        if(value.order != null) {
          if (value.order.startsWith("asc")) {
            sortType = " asc";
          }
          this.query.orderBy = value.prop + sortType;
          this.list();
        }
      },
      //   查询省份初始化
      checkArea(){
        return{
          options:undefined,
          value:''
        }
      },
      //  省份信息列表
      provinceList () {
        provinceList().then(res => {
          this.provinces = res.data;
          var ja=[];
          for(var i=0;i<this.provinces.length;i++){
            var jo={};
            jo.value=this.provinces[i].id;
            jo.label=this.provinces[i].nameChn;
            ja.push(jo);
          }
          this.area.options=ja;
        })
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  查询重置
      list2 () {
        this.$refs.multipleTable.clearSelection();
        specialMarkList(this.resData, this.query).then(res => {
          this.resData = res.data;
      })
      },
      //  获取用户分页列表
      list () {
        specialMarkList(this.resData,this.query).then(res => {
          this.resData = res.data;
        })
      },
      //  新增特殊标记
      goAddSpecialMarks(){
        this.addVisible=true;
        this.$nextTick(() => {
          this.$refs.addSpecial.fillData(this.id);
      })
      },
      //  查看特殊标记基本信息
      goSeeSpecialInfo(specialId){
        this.seeVisible=true;
        this.$nextTick(() => {
          this.$refs.seeSpecial.fillData(this.id,specialId);
      })
      },
      //  修改特殊标记基本信息
      goUpdateSpecialInfo(specialId){
        this.updateVisible=true;
        this.$nextTick(() => {
          this.$refs.updateSpecial.fillData(this.id,specialId);
      })
      },
      //  设置医保标记
      setMedicalInsuranceFlag(flag){
        var label='';
        switch (flag) {
          case "0":
            label='非医保';
            break;
          case "1":
            label='国家医保';
            break;
          case "2":
            label='北京医保';
            break;
        }
        return label;
      },
      //  设置基药标记
      setContractType(flag){
        var label='';
        switch (flag) {
          case "2":
            label='非基药';
            break;
          case "0":
            label='国家基药';
            break;
          case "1":
            label='北京基药';
            break;
        }
        return label;
      },
      //  设置低价药标记
      setLowestType(flag){
        var label='';
        switch (flag) {
          case "0":
            label='非低价';
            break;
          case "1":
            label='国家低价';
            break;
          case "2":
            label='北京低价';
            break;
        }
        return label;
      },
      getRowKeys(row){
        return row.id;
      },
      //  选中的记录
      handleSelectionChange(val){
        this.selectDataList=val;
      },
      //  删除选中产品
      handleDelete() {
        if (this.selectDataList.length < 1) {
          this.$alert('请至少选择一条数据', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false;
        } else {
          this.$confirm(`确定删除选中的`+this.selectDataList.length+`条数据吗?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var ids = [];
            for (var row of this.selectDataList) {
              ids.push(row.id);
            }
          deleteSpecial(ids.toString()).then(res => {
            this.$message({
                    message: res.data,
                    type: 'success',
                    duration: 1000,
                    onClose: () => {
                    this.list();
                    this.$refs.multipleTable.clearSelection();
            }
            })
            })
        }).catch(() => {
          });
        }
      },
      /*  重置*/
      resetForm() {
        this.query = this.metaQuery();
        this.query.id=this.id;
        this.resData= this.metaData();
        this.list2();
      },
      //  返回
      goBack() {
        this.$router.go(-1);
      },
      // ************************ 分页操作 ************************
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
<style>
  @import "../../../../assets/css/datacenter.css";
</style>
