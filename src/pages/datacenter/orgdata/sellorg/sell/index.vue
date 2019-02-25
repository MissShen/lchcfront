<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" :inline="true" size="small" class="table-form">
            <el-form-item class="width-110">
              <el-select v-model="query.searchType" placeholder="请选择" size="small" @change="test">
                <el-option label="企业名称" value="1"></el-option>
                <el-option label="企业编号" value="2"></el-option>
                <el-option label="企业ID" value="3"></el-option>
                <el-option label="注册地址" value="4"></el-option>
                <el-option label="许可证号" value="5"></el-option>
                <el-option label="所在省市" value="6"></el-option>
                <el-option label="GSP证书号" value="7"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="width-100">
              <el-input v-model="query.searchText" placeholder="关键词" size="small" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item class="sell-checkbox-wrapper">
              <el-checkbox-group v-model="query.wholesale">
                <el-checkbox label="true">批发企业</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item class="sell-checkbox-wrapper">
              <el-checkbox-group v-model="query.distribution">
                <el-checkbox label="true">配送企业</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item class="sell-checkbox-wrapper">
              <el-checkbox-group v-model="query.produce">
                <el-checkbox label="true">生产企业</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          <el-form-item class="width-100">
            <el-select v-model="query.review" placeholder="审核状态" size="small">
              <el-option label="未审核" value="0"></el-option>
              <el-option label="已通过" value="1"></el-option>
              <el-option label="未通过" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="width-100">
            <el-select v-model="query.reviewer" size="small" placeholder="审核人">
              <el-option
                v-for="(item,index) in checkUsers"
                :key="index"
                :label="item.CHECKUSER_NAME"
                :value="item.CHECK_USER">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-date-picker size="small" type="date" placeholder="审核时间开始" class="width-120" v-model="query.reviewTimeStart"></el-date-picker>
            &nbsp;到&nbsp;
            <el-date-picker size="small" type="date" placeholder="审核时间结束" class="width-120" v-model="query.reviewTimeEnd"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
            <el-button type="warning" @click="resetForm()" size="small">重置</el-button>
          </el-form-item>
        </el-form>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          ref="tableInfo"
          :data="resData.list"
          @selection-change="handleSelectionChange"
          @sort-change="sortChange"
          border
          stripe :row-key="getRowKeys">
          <el-table-column type="selection" align="center" width="50" :reserve-selection="true"></el-table-column>
          <el-table-column sortable="custom" prop="code" label="企业编码" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.CODE }}</span>
            </template>
          </el-table-column>
          <el-table-column label="区域" width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.PROVINCE }}  {{ scope.row.CITY }}</span>
            </template>
          </el-table-column>
          <el-table-column label="企业类型" width="100">
            <template slot-scope="scope">
              <span>{{ isWholesale(scope.row.SALER_FLAG) }} {{ isDistribution(scope.row.SEND_FLAG) }} {{ isProduce(scope.row.FACTORY_FLAG) }}</span>
              <!--<span>{{ scope.row.SALER_FLAG }} {{scope.row.SEND_FLAG}} {{scope.row.FACTORY_FLAG}}</span>-->
            </template>
          </el-table-column>
          <el-table-column sortable="custom" prop="name" label="企业名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.NAME }}</span>
            </template>
          </el-table-column>
          <el-table-column sortable="custom" prop="abbr" label="企业简称" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.ABBR }}</span>
            </template>
          </el-table-column>
          <el-table-column sortable="custom" prop="CHECK_FLAG" label="审核状态" width="100">
            <template slot-scope="scope">
              <span>{{ getCheckFlag(scope.row.CHECK_FLAG) }}</span>
            </template>
          </el-table-column>
          
          <el-table-column sortable="custom" prop="LAST_UPDATE_DATE" label="最后审核时间" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.LAST_UPDATE_DATE }}</span>
            </template>
          </el-table-column>

          <el-table-column
            fixed="right"
            label="操作"
            width="170">
            <template slot-scope="scope">
              <div class="operates">
                <span><a class="operation-btn">复制企业ID</a></span>
                <span><a class="operation-btn" @click="goInfo(scope.row.ID)">查看</a></span>
                <span><a @click="goEdit(scope.row.ID)" class="operation-btn">标准化</a></span>
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

  import {queryReviewerList,sellOrgList, remove} from 'src/axios/datacenter/orgdata/sell/seller'
  import {keyBoardEnter} from "src/utils";

  export default {
    data () {
      return {
        activeName: '1',  // 当前标签
        resData: this.metaData(),
        checkUsers: [], //审核人s
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        deleteDataList:[],
        standard: false
      }
    },
    created () {
      if(!!this.$store.state.pageSeach.pageNum){
        this.query = this.$store.state.pageSeach;
        this.resData.pageSize = this.$store.state.pageSeach.pageSize;
        this.resData.pageNum = this.$store.state.pageSeach.pageNum;
      }
      this.$store.state.pageSeach=this.query;

      // 获取是否只展示为标准化的 标识
      this.standard = this.$route.params.standard;
      this.query.standard = this.standard == 'true' ? 'true' : 'false';

      this.checkUserList();
      this.query.searchType = '1'
      this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {
          pageNum: 1,
          pageSize: 10,
          list: []
        }
      },
      metaQuery () { // 表单查询数据初始化
        return  {
            orderBy:'',
            searchType: '',
            searchText: '',
            wholesale: false,
            distribution: false,
            produce: false,
            review: '',
            reviewer: '',
            reviewTimeStart: undefined,
            reviewTimeEnd: undefined,
            standard: undefined
        }
      },
      sortChange(value){
        let sortType=" desc"
        if(value.order != null){
          if(value.order.startsWith("asc")){
            sortType=" asc";
          }
          this.query.orderBy=value.prop + sortType;
          this.list()
        }
      },
      // 重置
      resetForm () {
        this.query = this.metaQuery ();
        this.$refs.tableInfo.clearSelection();
        this.list();
      },
      getRowKeys(row){
        return row.ID
      },
      handleSelectionChange(val){
        this.deleteDataList=val
      },
      //删除
      handleDelete() {
        if(this.deleteDataList.length<1){
          this.$alert('请至少选择一条数据', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          })
          return false
        }else{
          this.$confirm(`确定删除选中的数据吗?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let  ids=this.deleteDataList.map(data=>{
              return data.ID
            })
            console.log("ids==>",ids.join(',').toString())
            remove(ids.join(',').toString()).then(res=>{
              this.$message({
                message: res.data,
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.list()
                }
              })
            })
          }).catch(() => {
          });
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      // 获取审核人列表
      checkUserList() {
        queryReviewerList().then(res => {
          this.checkUsers = res.data
        })
      },
      // search(){
      //   this.$store.state.pageSeach.pageNum = 1;
      //   this.resData.pageNum=1;
      //   this.list();
      // },
      //查询
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      test(val){
        this.query.searchType = val;
        console.log(val)
      },
      // 获取企业列表
      list () {
        this.$store.state.pageSeach = this.query;
        console.log(this.query)
        sellOrgList(this.query, this.resData).then(res => {
          this.resData = res.data
          if (this.resData.pageNum === 0) {
            this.resData.pageNum = 1
          }
        })
      },
      handleQurey(){
        alert(this.query.wholesale);
      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.$store.state.pageSeach.pageSize = val
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        this.$store.state.pageSeach.pageNum = val
        this.resData.pageNum = val
        this.list()
      },
      isWholesale(status){
        return status == 1?'批发':''
      },
      isDistribution(status) {
        return status == 1?'配送':''
      },
      isProduce(status) {
        return status == 1?'生产':''
      },
      getCheckFlag(status) {
        const arrStatus = ['未审核', '已通过', '未通过'];
        return arrStatus[status];
      },
      getKeyState(status) {
        const arrStatus = ['未发key', '已发key', '发key失败'];
        return arrStatus[status];
      },
      // 跳转详情页面
      goInfo(id) {
        this.$router.push("/DATA/basedata/orgdata/sellInfo/"+id);
      },
      // 跳转编辑页面
      goEdit(id) {
        this.$router.push("/DATA/DatacenterLayDetail/sellStandardization/"+id);
      },
      // 跳转新增页面
      goAdd(){
        this.$router.push("/DATA/basedata/orgdata/sellAdd");
      },
    }
  }
</script>

