<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
        <el-form-item class="width-120">
          <el-select v-model="query.searchType" size="small">
            <el-option label="单位名称" value="0"></el-option>
            <el-option label="单位编码" value="1"></el-option>
            <el-option label="单位地址" value="2"></el-option>
            <el-option label="单位简称" value="3"></el-option>
            <el-option label="拼音简称" value="4"></el-option>
            <el-option label="五笔简称" value="5"></el-option>
            <el-option label="GSP证书号" value="6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="width-100">
          <el-input v-model="query.searchText" placeholder="关键词" size="small"
                    @keyup.enter.native="searchEnterFun"></el-input>
        </el-form-item>
        <el-form-item class="width-100">
          <el-select v-model="query.user" placeholder="录入人" size="small">
            <el-option
              v-for="item in userList"
              :key="item.id"
              :label="item.userName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker type="date" placeholder="录入开始时间" v-model="query.beginDate" size="small"></el-date-picker>
          &nbsp;到&nbsp;
          <el-date-picker type="date" placeholder="录入结束时间" v-model="query.endDate" size="small"></el-date-picker>
        </el-form-item>
        <el-form-item class="width-120">
          <el-select v-model="query.medicareFlag" placeholder="医保定点机构" size="small">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="width-120">
          <el-select v-model="query.province" placeholder="省" @change="chooseProvince(query.province)" size="small">
            <el-option
              v-for="item in query.provinceList"
              :key="item.id"
              :label="item.nameChn"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="width-120">
          <el-select v-model="query.city" placeholder="市" size="small">
            <el-option
              v-for="item in query.cityList"
              :key="item.id"
              :label="item.nameChn"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
          <el-button type="warning" @click="resetForm" size="small">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          @selection-change="handleSelectionChange"
          @sort-change="sortChange"
          border
          ref="mainTable"
          :row-key="getRowKeys"
          stripe>
          <el-table-column type="selection" width="50" align="center" :reserve-selection="true"></el-table-column>
          <el-table-column label="医院等级" width="120" sortable="custom" prop="GRADE_NO">
            <template slot-scope="scope">
              <span>{{gradeNo(scope.row.catBuyer.gradeNo)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="单位名称" show-overflow-tooltip sortable="custom" prop="NAME">
            <template slot-scope="scope">
              <span>{{ scope.row.catOrg.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="区域" width="180" show-overflow-tooltip sortable="custom" prop="PROVINCE_ID">
            <template slot-scope="scope">
              <span>{{ scope.row.catBuyer.provinceId}} {{ scope.row.catBuyer.cityId}} {{ scope.row.catBuyer.countyId}}</span>
            </template>
          </el-table-column>
          <el-table-column label="单位编号" width="180" sortable="custom" prop="CODE">
            <template slot-scope="scope">
              <span>{{ scope.row.catOrg.code }}</span>
            </template>
          </el-table-column>
          <el-table-column label="单位地址" show-overflow-tooltip sortable="custom" prop="ORG_ADDRESS">
            <template slot-scope="scope">
              <span>{{ scope.row.catBuyer.orgAddress }}</span>
            </template>
          </el-table-column>
          <el-table-column label="发key状态" width="120" sortable="custom" prop="KEY_STATE">
            <template slot-scope="scope">
              <span>{{getStatus(scope.row.orgKeyState.keyState)}}</span>
            </template>
          </el-table-column>

          <el-table-column
            fixed="right"
            label="操作"
            width="120">
            <template slot-scope="scope">
              <div class="operates"><a class="operation-btn" href="javascript:;" size="small"
                                       @click="goInfo(scope.row.catBuyer.id)">查看</a>
                <a class="operation-btn" href="javascript:;" @click="goEdit(scope.row.catBuyer.id)" size="small">修改</a>
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
          <el-button type="success" size="small" @click="goAdd">
            新增
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete()">
            删除
          </el-button>
        </div>
      </div>

    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求
  import {regions} from 'src/axios/datacenter/orgdata/catbuyer/catBuyer'
  import {city} from 'src/axios/datacenter/orgdata/catbuyer/catBuyer'
  import {list} from 'src/axios/datacenter/orgdata/catbuyer/catBuyer'
  import {del} from 'src/axios/datacenter/orgdata/catbuyer/catBuyer'
  import {user} from 'src/axios/datacenter/orgdata/catbuyer/catBuyer'
  import ElTabPane from "../../../../../../node_modules/element-ui/packages/tabs/src/tab-pane";
  import {keyBoardEnter} from "src/utils";

  export default {
    components: {ElTabPane},
    data () {
      return {
        userList: undefined,
        deleteDataList: [],
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        }
      }
    },

    created() {
      if (!!this.$store.state.pageSeach.pageNum) {
        this.query = this.$store.state.pageSeach;
        this.resData.pageSize = this.$store.state.pageSeach.pageSize;
        this.resData.pageNum = this.$store.state.pageSeach.pageNum;
      }
      this.list();
    },

    methods: {

      sortChange(value){
        let sortType = " desc";
        if (value.order != null) {
          if (value.order.startsWith("asc")) {
            sortType = " asc";
          }
          this.query.orderBy = value.prop + sortType;
          this.list()
        }
      },
      // search(){
      //   this.$store.state.pageSeach.pageNum = 1;
      //   this.resData.pageNum = 1;
      //   this.list();
      // },
      //查询
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      getRowKeys(row){
        return row.catBuyer.id
      },

      list () {
        this.$store.state.pageSeach = this.query;
        //初始化省信息
        regions().then(res => {
          this.query.provinceList = res.data;
          user().then(res => {
            this.userList = res.data;
          });
          //初始表格数据
          list(this.query, this.$store.state.pageSeach).then(res => {
            this.resData = res.data;
            if (this.resData.pageNum == 0) {
              this.resData.pageNum = 1
            }
          });
        });
      },

      //根据选择的省加载市信息
      chooseProvince(provinceId){
        this.query.city = '';
        city(provinceId).then(res => {
          this.query.cityList = res.data
        })
      },

      //发KEY状态转移
      getStatus(status){
        const arrStatus = ['未发KEY', '已发KEY', '发KEY失败'];
        return arrStatus[status];
      },

      gradeNo(status){
        if (status === "1") {
          return "一级甲等";
        } else if (status === "2") {
          return "一级乙等";
        } else if (status === "3") {
          return "一级丙等"
        } else if (status === "4") {
          return "二级甲等"
        } else if (status === "5") {
          return "二级乙等"
        } else if (status === "6") {
          return "二级丙等"
        } else if (status === "7") {
          return "三级甲等"
        } else if (status === "8") {
          return "三级乙等"
        } else if (status === "9") {
          return "三级丙等"
        } else if (status === "A") {
          return "三级特等"
        } else if (status === "B") {
          return "其他"
        } else if (status === "C") {
          return "一级"
        } else if (status === "D") {
          return "二级"
        } else if (status === "E") {
          return "三级"
        } else {
          return status;
        }
      },

      //重置
      resetForm(){
        this.$refs.mainTable.clearSelection();
        this.query = this.metaQuery();
        this.resData = this.metaData();
        this.list();
      },

      handleSelectionChange(val){
        this.deleteDataList = val;
      },

      //删除
      handleDelete(){
        if (this.deleteDataList.length < 1) {
          this.$alert('请至少选择一条数据', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false
        } else {
          this.$confirm('确定删除选中' + this.deleteDataList.length + '的条数据吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var ids = [];
            for (var row of this.deleteDataList) {
              ids.push(row.catBuyer.id)
            }
            del(ids.toString()).then(res => {
              this.$message({
                message: res.data,
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.$refs.mainTable.clearSelection();
                  this.list()
                }
              })
            })
          }).catch(() => {
          });
        }
      },

      goBack(){
        this.$router.go(-1);
      },

      goAdd(){
        this.$router.push("/DATA/DatacenterLayDetail/buyerAdd");
      },

      goInfo(id){
        this.$router.push("/DATA/basedata/orgdata/buyerorg/buyer/info/" + id);
      },

      goEdit(id){
        this.$router.push("/DATA/DatacenterLayDetail/buyerUpdate/" + id);
      },

      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaQuery(){ // 表单查询数据初始化
        return {
          provinceList: undefined,
          cityList: undefined,
          province: '',
          city: '',
          searchType: '0',
          searchText: '',
          user: '',
          beginDate: undefined,
          endDate: undefined,
          medicareFlag: '',
          orderBy: null
        }
      },

      metaData(){
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

      // ************************ 分页操作 ************************
      handleSizeChange(val){
        this.resData.pageSize = val;
        this.$store.state.pageSeach.pageSize = val;
        this.list()
      },

      handleCurrentChange(val){
        this.resData.pageNum = val;
        this.$store.state.pageSeach.pageNum = val;
        this.list()
      }
    }
  }
</script>

