<template>
  <!--<el-dialog
    title="可选配送"
    :close-on-click-modal="false"
    :visible.sync="visible" width="80%">-->
  <!-- 表格 -->
  <div class="tablebox">

      <el-form ref="query" :model="query" :inline="true" class="table-form">
          <el-form-item>
            <el-input v-model="query.senderName" placeholder="配送企业名称" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="query.district" placeholder="省" @change="queryCities()" size="small">
              <el-option
                v-for="item in districts"
                :key="item.id"
                :label="item.nameChn"
                :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="query.city" placeholder="市" @change="queryRegions()" size="small">
              <el-option
                v-for="item in cities"
                :key="item.id"
                :label="item.nameChn"
                :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="query.region" placeholder="区" @change="showRegion()" size="small">
              <el-option
                v-for="item in regions"
                :key="item.id"
                :label="item.nameChn"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="footer">
            <el-button type="warning" @click="list3()" size="small">查询</el-button>
            <el-button @click="resetForm()" size="small">重置</el-button>
          </el-form-item>
      </el-form>

    <!-- 表格列表 -->
    <div class="tableset">
      <el-table ref="multipleTable" :data="resData.list" tooltip-effect="dark" style="width: 100%" border
                @selection-change="handleSelectionChange">
        <!--<el-table-column label="首选配送" width="80">
          <template slot-scope="scope">
            <el-radio :label="scope.row.id" v-model="radio" @change="changeHandler(scope.$index)">&nbsp;</el-radio>
          </template>
        </el-table-column>-->
        <el-table-column type="selection" :label="tableName" width="40" :selectable="selectable"></el-table-column>
        <!--<el-table-column label="选择配送">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>-->
        <el-table-column label="企业名称" width="180" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="省份">
          <template slot-scope="scope">
            <span>{{ scope.row.provinceName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="市" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.cityName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="区（县）">
          <template slot-scope="scope">
            <span>{{ scope.row.areaName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否签订两票制">
          <template slot-scope="scope">
            <span v-if="scope.row.twoVoteId != null">已签订</span>
            <span v-else style="color: #FF0000">未签订</span>
          </template>
        </el-table-column>
        <el-table-column label="电话">
          <template slot-scope="scope">
            <span>{{ scope.row.linkPhone }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div style="padding-top: 10px">
      <span slot="footer">
        <el-button type="primary" size="small" @click="addEnterprise()">保存</el-button>
        <el-button size="small" @click="visible = false">关闭</el-button>
      </span>
      </div>
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
  import {queryUnselectedList, addSender} from 'src/axios/contract/sender/manufactureSelectSender';
  import {findByParentId} from 'src/axios/contract/sender/sendRegion';

  export default {
    props: {
      productId: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        resData: this.metaData(),
        form: this.metaForm(), // 表单初始化
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        dataForm: this.metaForm(),
        radio: '',
        deleteDataList: [],
        forbidden: false,
        tableName: '选择配送',
        districts: [],
        cities: [],
        regions: []
      }
    },
    created() {
      this.queryDistricts();
      this.list3();
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData() {
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
      list3() {
        queryUnselectedList(this.resData, this.query, this.productId).then(res => {
          console.log(res)
          this.resData = res.data
          0 === this.resData.pageNum ? this.resData.pageNum = 1 : null;
        })
      },
      queryDistricts() {
        findByParentId('FR20T0000010000000050000').then(res => {
          console.log(res);
          this.districts = res.data;
          this.query.district = 'FR20T0000010000000066666';
          this.queryCities();
        })
      },
      queryCities() {
        findByParentId(this.query.district).then(res => {
          console.log('queryCities: ', res);
          this.cities = res.data;
          this.query.city = this.cities[0].id;
          this.queryRegions();
        })
      },
      queryRegions() {
        findByParentId(this.query.city).then(res => {
          console.log('queryRegions: ', res);
          this.regions = res.data;
          this.query.region = this.regions[0].id;
        })
      },
      showRegion() {
        console.log(this.query.region);
      },
      // 重置用户表单
      resetForm() {
        this.query = this.metaQuery()
        this.list3()
      },
      changeHandler(value) {
        console.log('changeHandler_value: ' + value)
        this.$refs.multipleTable.toggleRowSelection(this.resData.list[value], true)
      },
      handleSelectionChange(val) {
        console.log('handleSelectionChange: ' + val)
        this.deleteDataList = val
        console.log(this.deleteDataList)
      },
      selectable(row, index) {
        if (row.id === '') {
          return false
        } else {
          return true
        }
      },
      addEnterprise() {
        let arr = this.deleteDataList.map(data => {
          return {
            "senderId": data.id,
            "province": data.province,
            "city": data.city,
            "area": data.area
          }
        })
        console.log('addEnterprise: ', arr);
        addSender(arr, this.productId).then(res => {
          console.log('addSender: ', res);
          this.$message({
            message: res.data,
            type: 'success',
            onClose: () => {
              // this.goBack();
            }
          })
        })
      },
      // ************************
      handleSizeChange(val) {
        this.resData.pageSize = val
        this.list3()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val
        this.list3()
      }
    }
  }
</script>
