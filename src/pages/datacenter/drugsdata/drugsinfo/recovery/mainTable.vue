<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
            <el-form-item>
              <el-select v-model="query.searchType" placeholder="请选择" size="small">
                <el-option label="通用名" value="1"></el-option>
                <el-option label="药品编码" value="2"></el-option>
                <el-option label="质量标准编码" value="3"></el-option>
                <el-option label="药品ID" value="4"></el-option>
                <el-option label="剂型" value="5"></el-option>
                <el-option label="英文名称" value="6"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-input v-model="query.searchText" placeholder="关键词" size="small" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item>
              <el-date-picker
                size="small"
                placeholder="创建时间-开始"
                v-model="query.createDateStart"
                type="date"
                format="yyyy-MM-dd">
              </el-date-picker>
              &nbsp;至&nbsp;
              <el-date-picker
                size="small"
                placeholder="创建时间-结束"
                v-model="query.createDateEnd"
                type="date"
                format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <!--<span class="width-420">-->
              <!--<el-date-picker-->
                <!--v-model="query.createDate"-->
                <!--type="daterange"-->
                <!--format="yyyy-MM-dd"-->
                <!--@change="getCreateDate"-->
                <!--range-separator="至"-->
                <!--start-placeholder="创建时间-开始"-->
                <!--end-placeholder="创建时间-结束" size="small"></el-date-picker>-->
            <!--</span>-->

            <!--<span class="width-70">备用标识：</span>-->
            <el-form-item>
              <el-select v-model="query.alternateIdentifier" placeholder="全部" size="small">
                <el-option label="全部" value="9"></el-option>
                <el-option label="正常" value=""></el-option>
                <el-option label="毒麻精放" value="1"></el-option>
                <el-option label="实际转换比注射" value="2"></el-option>
                <el-option label="备用粉针剂" value="3"></el-option>
                <el-option label="非药准字号产品" value="4"></el-option>
                <el-option label="毒药" value="5"></el-option>
                <el-option label="麻药" value="6"></el-option>
                <el-option label="精神类药品" value="7"></el-option>
                <el-option label="放射性药品" value="8"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
              <el-button type="warning" @click="resetForm()" size="small">重置</el-button>
            </el-form-item>
        </el-form>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          @selection-change="handleSelectionChange" border stripe :row-key="getRowKeys">
          <el-table-column type="selection" align="center" width="50" :reserve-selection="true"></el-table-column>
          <el-table-column label="备用标识">
            <template slot-scope="scope">
              <a href="javascript:;" @click="handleGoEdit(scope.row.READY_FLAG)">{{ getBackFlag(scope.row.READY_FLAG) }}</a>
            </template>
          </el-table-column>
          <el-table-column label="药品编码">
            <template slot-scope="scope">
              <span class="hiddenfont">{{ scope.row.DRUG_SERIAL_NUMBER }}</span>
            </template>
          </el-table-column>
          <el-table-column label="通用名" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.NAME_CHN }}</span>
            </template>
          </el-table-column>
          <el-table-column label="剂型" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.CDF_NAME_CHN }}</span>
            </template>
          </el-table-column>
          <el-table-column label="规格" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.SPEC }}</span>
            </template>
          </el-table-column>
          <el-table-column label="一级盐类衍生物" width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.CS_NAME_CHN }}</span>
            </template>
          </el-table-column>
          <el-table-column label="二级盐类衍生物" width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.CS_NAME_CHN2 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="复方及小儿标记" width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.COMPOUND_CHILDREN }}</span>
            </template>
          </el-table-column>
          <el-table-column label="转换比" width="60">
            <template slot-scope="scope">
              <span>{{ scope.row.STAND_RATE }}</span>
            </template>
          </el-table-column>

          <el-table-column
            fixed="right"
            label="操作"
            width="140">
            <template slot-scope="scope">
              <div class="operates"><a class="operation-btn" @click="goInfo(scope.row.ID)">查看</a>
                <a class="operation-btn" @click="goCommon('edit', scope.row.ID)">修改</a></div>
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

    <div class="foot-btn">
      <div class="foot-left">
        <el-button type="primary" size="small" @click="revertDrugInfo()">
          还原
        </el-button>
      </div>
    </div>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  import {drugInfoRecycleList, revert} from 'src/axios/datacenter/drugdata/druginfo/druginfo'
  import {keyBoardEnter} from "../../../../../utils";

  export default {
    data () {
      return {
        activeName: '2',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        bigClassification: undefined,
        mediumClassification: undefined,
        smallClassification: undefined,
        deleteDataList:[]
      }
    },
    created () {
      if(!!this.$store.state.pageSeach.pageNum){
        this.query = this.$store.state.pageSeach;
        this.resData.pageSize = this.$store.state.pageSeach.pageSize;
        this.resData.pageNum = this.$store.state.pageSeach.pageNum;
      }
      this.$store.state.pageSeach=this.query;
      this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
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
      metaQuery () { // 表单查询数据初始化
        return {
          query: {
            searchType: undefined,
            searchText: undefined,
            // 8
            eight: undefined,
            // 11
            eleven: undefined,
            // 13
            thirteen: undefined,
            // 20
            twenty: undefined,
            // 23
            twentyThree: undefined,
            bigClassification: undefined,
            mediumClassification: undefined,
            smallClassification: undefined,
            alternateIdentifier: '9',
            createDate: undefined,
            createDateStart: null,
            createDateEnd: null,
            updateDate: undefined,
            updateDateStart: null,
            updateDateEnd: null,
          }
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      getCreateDate(val){
        this.query.createDate = val;
        console.log('createDate time1===',this.query.createDate);
      },
      // 重置
      resetForm() {
        this.query = this.metaQuery ();
      },
      handleSelectionChange(val){
        this.deleteDataList=val
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
      // 获取用户分页列表
      list () {
        this.$store.state.pageSeach = this.query;
        // console.log("time=",this.query.createDate[0], "time=", this.query.createDate[1]);
        drugInfoRecycleList(this.query, this.resData).then(res => {
          console.log(res);
          this.resData = res.data
        })
      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.$store.state.pageSeach.pageSize = val;
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        this.$store.state.pageSeach.pageNum = val;
        this.resData.pageNum = val
        this.list()
      },
      getRowKeys(row){
        return row.ID
      },
      // 还原
      revertDrugInfo() {
        if(this.deleteDataList.length<1){
          this.$alert('请至少选择一条数据', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          })
          return false
        }else{
          this.$confirm(`确定还原选中的数据吗?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let  ids=this.deleteDataList.map(data=>{
              return data.ID
            })
            console.log("ids==>",ids.join(',').toString())
            revert(ids.join(',').toString()).then(res=>{
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
      // 跳转页面
      goCommon(type, id) {
        this.$router.push("/DATA/basedata/drugsInfos/"+type+"/"+id);
      },
      // 详情页
      goInfo(id) {
        this.$router.push("/DATA/basedata/drugsInfo/tableDetail/"+id);
      },
      getBackFlag(value) {
        if(value == '9') return '全部';
        if(value == '') return '正常';
        if(value == '1') return '毒麻精放';
        if(value == '2') return '实际转换比注射';
        if(value == '3') return '备用粉针剂';
        if(value == '4') return '非药准字号产品';
        if(value == '5') return '毒药';
        if(value == '6') return '麻药';
        if(value == '7') return '精神类药品';
        if(value == '8') return '放射性药品';
        return '无';
      }
    }
  }
</script>

