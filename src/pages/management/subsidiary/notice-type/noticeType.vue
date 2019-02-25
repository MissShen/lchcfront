<template>
  <div>
    <notice-type-view v-if="noticeTypeView" ref="noticeTypeView" @refreshNotice="metaList()"></notice-type-view>
    <el-dialog title="公告类别" :visible.sync="visible" width="70%" top="10vh">
      <div>

        <!-- 表格 -->
        <div>
          <div class="table-form">
            <!-- 表格查询表单 -->
            <el-form :inline="true" :model="queryData" ref="queryData">
              <div class="formrow">
                <span><el-input v-model="queryData.searchCode" placeholder="类别编号" size="small"></el-input></span>
                <span><el-input v-model="queryData.searchName" placeholder="类别名称" size="small"></el-input></span>
                <span>
              <el-button type="success" @click="metaList()" size="small">查询</el-button>
              <el-button type="warning" @click="queryData = metaQuery()" size="small">重置</el-button></span>
              </div>
            </el-form>
          </div>
          <div class="foot-btn foot-left">
            <el-button type="success"
                       size="small"
                       @click="handleFromView()">新增类别
            </el-button>
            <el-button type="danger"
                       size="small"
                       @click="handleDelete()">删除类别
            </el-button>
          </div>
          <!-- 表格列表 -->
          <div class="tableset">
            <el-table
              :data="resData.list"
              @selection-change="handleSelectionChange"
              border
              stripe>
              <el-table-column header-align="center" align="center" type="selection" width="40"></el-table-column>
              <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
              <el-table-column label="公告类别编号">
                <template slot-scope="scope">
                  <span>{{ scope.row.noticeTypeCode }}</span>
                </template>
              </el-table-column>
              <el-table-column label="公告类别名称">
                <template slot-scope="scope">
                  <span>{{ scope.row.noticeTypeName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="创建时间">
                <template slot-scope="scope">
                  <span>{{ scope.row.createDate }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                  <a class="operation-btn" @click="handleFromView(scope.row.id)"
                  >修改</a>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- 表格分页 -->
          <page-bar :data="resData" @refreshPage="refreshPage"></page-bar>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">关闭</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
  import NoticeTypeView from './formView'
  import {noticeTypeList, noticeTypeDelete} from "src/axios/management/subsidiary/noticeType";
  import {PageData, HasPerm} from 'src/components/mixins'

  export default {
    name: "sys-menu",
    mixins: [PageData, HasPerm],
    components: {NoticeTypeView},
    data() {
      return {
        visible: false,
        noticeTypeView: false,
        resData: this.metaData(),
        queryData: this.metaQuery(), // 查询初始化
        deleteDataList: []
      }
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaQuery() { // 查询数据封装格式
        return {
          searchName: undefined,
          searchCode: undefined
        }
      },
      metaList() {
        this.visible = true;
        noticeTypeList(this.resData, this.queryData).then(res => {
          if (res.code == 200) {
            this.resData = res.data;
            0 === this.resData.pageNum ? this.resData.pageNum = 1 : null;
          }
        });
      },
      // -------------------------------------------- 数据初始化完毕  -----------------------------------------
      handleFromView(id) {
        this.noticeTypeView = true;
        this.$nextTick(() => {
          this.$refs.noticeTypeView.metaList(id);
        })
      },
      handleDelete() {
        if (this.deleteDataList.length < 1) {
          this.$alert('请至少选择一条数据', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false
        } else {
          this.$confirm(`确定删除选中的数据吗?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let noticeTypeIdList = [];
            for (let noticeType of this.deleteDataList) {
              noticeTypeIdList.push(noticeType.id)
            }
            noticeTypeDelete(noticeTypeIdList).then(res => {
              this.$resMessage(res, {
                onClose: () => {
                  this.metaList()
                }
              });
            })
          });
        }
      },
      handleSelectionChange(val) {
        this.deleteDataList = val;
      }
    }
  }
</script>

<style scoped>

</style>
