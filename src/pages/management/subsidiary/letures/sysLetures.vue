<template>
  <!--================================== 页面根标签使用v-if进行权限控制[permData] ======================================-->
  <!--============================ 页面所有操作 按钮 DOM块 使用v-if进行权限控制[permData] =================================-->
  <!--============================================主题内容==========================================================-->
  <div class="tablebox" v-if="hasPerm('sys:letures:list')">
    <!--==========================================  查询 条件 ======================================================-->
    <el-form :inline="true" :model="queryData" ref="queryData" class="table-form">
        <el-form-item>
           <el-date-picker
             size="small"
             type="date"
             format="yyyy-MM-dd"
             value-format="yyyy-MM-dd"
             placeholder="创建开始日期"
             :editable="false"
             style="width: 165px !important;"
             v-model="queryData.searchBeginDate">
            </el-date-picker>
          &nbsp;至&nbsp;
          <el-date-picker
            size="small"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="创建结束日期"
            :editable="false"
            style="width: 165px !important;"
            v-model="queryData.searchEndDate">
            </el-date-picker>
        </el-form-item>
        <el-form-item>
         <el-select v-model="queryData.searchTypeId" size="small" placeholder="选择栏目" class="w100">
         <el-option v-for="item in leturesTypeData" :key="item.id" :label="item.leturesTypeName"
                    :value="item.id"></el-option>
        </el-select>
      </el-form-item>
        <el-form-item>
       <el-button type="success" size="small" @click="handleQuery">查询 </el-button>
       <el-button type="warning" size="small" @click="queryData = metaQuery()"> 重置  </el-button>
      </el-form-item>
    </el-form>
    <div class="foot-btn foot-left">
      <el-button
        size="small"
        type="success"
        v-if="hasPerm('sys:letures:save')"
        @click="handleFormView()">新增数据
      </el-button>
      <el-button
        size="small"
        type="success"
        v-if="hasPerm('sys:letures_type:list')"
        @click="handleLeturesType()">栏目管理
      </el-button>
    </div>
    <!--================================================ table 数据表格 ============================================-->
    <div class="tableset">
      <el-table :data="resData.list" border stripe :empty-text="emptyTxt">
        <el-table-column label="栏目" width="100px">
          <template slot-scope="scope">
            <span v-for="item in leturesTypeData" :key="item.id" v-if="scope.row.leturesTypeId==item.id">{{item.leturesTypeName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="标题" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.leturesTitle }}</span>
          </template>
        </el-table-column>
        <el-table-column label="附件名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="!scope.row.realFileName">无附件</span>
            <span>{{ scope.row.realFileName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建日期">
          <template slot-scope="scope">
            <span>{{ scope.row.createDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <div slot="content" class="">
              <template v-if="hasPerm('sys:letures:update')">
                <a class="operation-btn" @click=" handleFormView(scope.row.id)">修改</a>
              </template>
              <template v-if="hasPerm('sys:letures:delete')">
                <a class="operation-btn" @click="handleDelete(scope.row.id,scope.row.leturesTitle)">删除</a>
              </template>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <page-bar :data="resData" @refreshPage="refreshPage"></page-bar>
  <letures-form-view v-if="leturesFormViewVisible" ref="leturesFormViewVisible"
                     @refreshList="metaList()"></letures-form-view>
  <letures-type v-if="leturesTypeVisible" ref="leturesTypeVisible"></letures-type>
</div>
</template>

<script>
  import {PageData, HasPerm} from 'src/components/mixins'
  import LeturesFormView from './letures-form-view'
  import leturesType from './letures-type'
  import {leturesTypeAllList} from "src/axios/management/subsidiary/leturesType";
  import {leturesList, leturesDelete} from "src/axios/management/subsidiary/letures";

  export default {
    name: "sys-letures",
    mixins: [PageData, HasPerm],
    components: {LeturesFormView, leturesType},
    data() {
      return {
        leturesTypeVisible: false,
        queryData: this.metaQuery(),
        leturesTypeData: [],
        emptyTxt: '暂无数据',
        leturesFormViewVisible: false,
      }
    },
    mounted() {
      this.leturesTypeAllData().then(() => {
        this.metaList();
      });
    },
    methods: {
      metaQuery() {
        return {
          searchTypeId: '',
          searchBeginDate: '',
          searchEndDate: '',
        }
      },
      metaList() {
        if (this.hasPerm('sys:letures:list')) {
          leturesList(this.resData.pageNum, this.resData.pageSize, this.queryData).then(res => {
            if (res.code == 200) {
              this.resData = res.data;
              0 === this.resData.pageNum ? this.resData.pageNum = 1 : null;
            } else {
              this.resData = this.metaData();
              this.emptyTxt = "数据获取失败!";
            }
          })
        }
      },
      leturesTypeAllData() {
        return leturesTypeAllList().then(res => {
          if (res.code == 200) {
            this.leturesTypeData = res.data
          } else {
            this.$resMessage(res);
          }
        })
      },
      handleFormView(id) {
        this.leturesFormViewVisible = true;
        this.$nextTick(() => {
          this.$refs.leturesFormViewVisible.metaList(id);
        })
      },
      handleLeturesType() {
        this.leturesTypeVisible = true;
        this.$nextTick(() => {
          this.$refs.leturesTypeVisible.metaList();
        })
      },
      handleDelete(id, name) {
        if (this.hasPerm('sys:letures:delete')) {
          this.$confirm(`确定删除『${name}』吗?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            leturesDelete(id).then(res => {
              this.$resMessage(res, {
                onClose: () => {
                  this.metaList()
                }
              });
            })
          })
        };
      },

    }
  }
</script>

<style scoped>

</style>
