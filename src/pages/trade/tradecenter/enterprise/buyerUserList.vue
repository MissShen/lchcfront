<template>
  <!-- ========================== 医院黄页详细通讯录 ========================= -->
  <!-- 表格 -->
  <div class="tablebox">
    <!-- 表格查询表单 -->
    <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
      <el-form-item>
        <el-input v-model="query.searchLinkman" @keyup.enter.native="searchEnterFun" placeholder="联系人"
                  size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" size="small" @click="searchEnterFun">查询</el-button>
        <el-button type="warning" size="small" @click="reset()">重置</el-button>
        <el-button size="small" @click="goBack()">返回</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格列表 -->
    <div class="tableset">
      <el-table
        :data="resData.list"
        border
        @sort-change="sortChang"
        stripe>
        <!--<el-table-column type="index" width="50" header-align="left" align="center" label="序号"></el-table-column>-->
        <el-table-column label="联系人" prop="linkman" sortable="custom">
          <template slot-scope="scope">
            {{ scope.row.linkman }}
          </template>
        </el-table-column>
        <el-table-column label="座机号码" prop="TELE_PHONE" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.telePhone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="传真号码" prop="FAX_NUMBER" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.faxNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column label="手机号码" prop="MOBILE_PHONE" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.mobilePhone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所在部门" prop="LINKMAN_DEPARTMENT" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.linkmanDepartment }}</span>
          </template>
        </el-table-column>
        <el-table-column label="职务" prop="LINKMAN_JOB" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.linkmanJob }}</span>
          </template>
        </el-table-column>
        <el-table-column label="QQ号" prop="QQ_NUMBER" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.qqNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column label="微信号" prop="WECHAT_CODE" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.wechatCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="通讯地址" prop="CONTACT_ADDRESS" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.contactAddress }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="COMMENTS" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.comments }}</span>
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

</template>
<script>

  // 引入用户相关请求
  import {selectEnterpriseContactsInfo} from 'src/axios/trade/enterprise/enterprise'
  import {keyBoardEnter} from "src/utils";

  export default {
    data() {
      return {
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        currentOrder: undefined,
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
      this.list();
      this.skipName = this.$route.params.name;
    },
    methods: {

      // -------------------------------------------- 数据初始化  -----------------------------------------
      reset() {
        this.query = this.metaQuery();
        this.list();
      },
      metaData() {
        return {// 前后台交互数据封装格式
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
      searchEnterFun(e) {
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      metaQuery() { // 表单查询数据初始化
        return {
          orgId: this.$route.params.orgId,
          searchLinkman: '',
          enterprise: 'enterprise'
        }
      },

      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list() {
        this.resData.orderBy = this.currentOrder;
        selectEnterpriseContactsInfo(this.resData, this.query).then(res => {
          this.resData = res.data
          if (this.resData.pageNum === 0) {
            this.resData.pageNum = 1
          }
        })
      },
      sortChang(value) {
        let sortType = " desc"
        if (value.order.startsWith("asc")) {
          sortType = " asc";
        }
        this.currentOrder = value.prop + sortType;
        this.list()
      },

      // ************************ 分页操作 ************************
      handleSizeChange(val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val
        this.list()
      },
      // 修改
      handleGoShow(id, not) {
        this.$router.push("/trade/information/linkManAdd/" + id + "/" + not)
      },
      goBack() {
        this.$router.go(-1);
      },
      handleClose(done) {
        this.$refs['form'].resetFields();
        this.toggleForm();
      }
    }
  }
</script>

