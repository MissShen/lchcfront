<template>
  <div v-if="permData.notice_list">
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <el-form :inline="true" :model="queryData" ref="queryData" class="table-form">
        <el-form-item>
          <el-select v-model="queryData.queryType" placeholder="查询方式" size="small">
            <el-option label="公告标题" value="1"></el-option>
            <el-option label="公告类别" value="2"></el-option>
            <el-option label="关键字" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="queryData.queryContent" placeholder="查询内容" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            size="small"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="创建开始日期"
            :editable="false"
            v-model="queryData.beginDate">
          </el-date-picker>
          至
          <el-date-picker
            size="small"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="创建结束日期"
            :editable="false"
            v-model="queryData.endDate">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="handleQuery()" size="small">查询</el-button>
          <el-button type="warning" @click="queryData =metaQuery()" size="small">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="foot-btn foot-left">
        <el-button
          size="small"
          type="success"
          v-if="permData.notice_add"
          @click="handleFromView()">新增公告
        </el-button>
        <el-button
          type="danger"
          size="small"
          v-if="permData.notice_del"
          @click="handleDelete()">删除
        </el-button>
        <el-button type="warning" size="small" @click="handleNoticeType()">公告类别</el-button>
        <el-button type="success" size="small" @click="dialogFormVisible = true">选择列</el-button>
        <el-button type="warning" size="small" @click="exportExcel()">导出</el-button>
      </div>
      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          :default-sort="{prop: 'date', order: 'descending'}"
          @selection-change="handleSelectionChange"
          :key='tableKey'
          border
          stripe>
          <el-table-column header-align="center" align="center" type="selection" width="40"></el-table-column>
          <el-table-column
            :key='index'
            v-for="(col,index) in formThead"
            :label="col.name"
            v-if='col.visible'
            :width="col.width"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <template v-if="!col.isFormta && col.key != 'releaseTime'">
            <span>
              {{resData.list[scope.$index][col.key]}}
            </span>
              </template>
              <template v-if="col.isFormta">
              <span v-for="(localName,index2) in resData.list[scope.$index][col.key]"
                    :key="index2">{{ localName }}
                 <template v-if="index2 !==resData.list[scope.$index][col.key].length-1">、</template>
              </span>
              </template>
              <template v-if="col.isTooltip">
                <span>{{ scope.row.releaseTime }}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <div class="operates">
                <a href="javascript:;" v-if="permData.notice_view" @click="handleView(scope.row.id)">查看</a>
                <a href="javascript:;" v-if="permData.notice_is_top" @click="handleTop(scope.row.id)">
                  <span v-if="scope.row.isTop === '0'">置顶</span>
                  <span v-else>取消置顶</span>
                </a>
                <a href="javascript:;" v-if="permData.notice_upd" @click="handleFromView(scope.row.id)">
                  修改
                </a>
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
    </div>
    <el-dialog title="选择列" :visible.sync="dialogFormVisible" width="60%">
      <el-checkbox-group v-model="checkboxVal" style="padding: 5px 15px;">
        <el-checkbox @change="checkinlist" v-for="item in cols" :label="item.key" :key="item.key" v-if='item.visible'>
          {{item.name}}
        </el-checkbox>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="updateTable" size="small">确 定</el-button>
      </div>
    </el-dialog>
    <notice-view-from v-if="isNoticeView" ref="noticeView"></notice-view-from>
    <notice-type v-if="noticeTypeVisible" ref="noticeTypeVisible"></notice-type>
    <div class="progress-box" v-if="showProgress">
      <div class="progress-bar">
        <el-progress :text-inside="true" :stroke-width="18" status="success" :percentage="precent"></el-progress>
      </div>
    </div>

  </div>
</template>

<script>
  import {noticeList, noticeDelete, noticeTop, exportExcel} from "src/axios/management/subsidiary/notice";
  import fileUpload from 'js-file-download'
  import {mapGetters} from 'vuex'
  import noticeViewFrom from 'src/pages/management/subsidiary/notice/noticeView'
  import noticeType from 'src/pages/management/subsidiary/notice-type/noticeType'

  export default {
    name: "sys-notice",
    components: {
      noticeViewFrom, noticeType
    },
    computed: {
      ...mapGetters([
        'perms',
      ]),
    },
    data() {
      return {
        resData: this.metaData(),
        queryData: this.metaQuery(), // 查询初始化
        permData: this.metaPerm(), // 权限初始化
        deleteDataList: [],
        precent: 0,
        showProgress: false,
        formLabelWidth: '120px',
        dialogFormVisible: false,
        noticeTypeVisible: false,
        isNoticeView: false,
        tableKey: 1, // table key
        newsId: '',
        cols: [
          {key: 'id', name: 'id', visible: false, isFormta: false, isTooltip: false},
          {key: 'noticeTitle', name: '公告标题', visible: true, isFormta: false, isTooltip: false},
          {key: 'readerTypeList', name: '阅读对象', visible: true, isFormta: true, isTooltip: false},
          {key: 'ascriptionSysList', name: '所属系统', visible: true, isFormta: true, isTooltip: false},
          {key: 'createDate', name: '创建日期', width: '100px', visible: true, isFormta: false, isTooltip: false},
          {key: 'releaseTime', name: '发布时间', width: "180px", visible: true, isFormta: false, isTooltip: true}
        ],
        formTheadOptions: [
          {key: 'id', name: 'id', visible: false, isFormta: false, isTooltip: false},
          {key: 'noticeTitle', name: '公告标题', visible: true, isFormta: false, isTooltip: false},
          {key: 'readerTypeList', name: '阅读对象', visible: true, isFormta: true, isTooltip: false},
          {key: 'ascriptionSysList', name: '所属系统', visible: true, isFormta: true, isTooltip: false},
          {key: 'createDate', name: '创建日期', visible: true, isFormta: false, isTooltip: false},
          {key: 'releaseTime', name: '发布时间', visible: true, isFormta: false, isTooltip: true}
        ],
        checkboxVal: ['noticeTitle', 'readerTypeList', 'ascriptionSysList', 'createDate', 'releaseTime'], // checkboxVal
        formTheadOptions1: [],
        formThead: this.cols // 默认表头 Default header
      }
    },
    watch: {
      $route(to,from){
        if(to.query.anchor!=from.query.anchor){
          this.goAnchor();
        }
      }
    },
    mounted() {
      this.metaHasPerm();
      if (this.permData.notice_list) {
        this.goAnchor()
        this.formThead = this.cols;
        this.metaList();
      }
    }
    ,
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData() { // 前后台交互数据封装格式
        return {
          pageNum: 1,
          pageSize: 20,
          total: 0,
          pages: 0,
          list: []
        }
      },
      goAnchor() {
        let routeAnchor = this.$route.query.anchor;
        let routeQuery = this.$route.meta.query;
        if (routeAnchor) {
          routeQuery.forEach(item => {
            if (routeAnchor == item.name) {
              if ('save' == item.val) {
                this.handleFromView();
              }
            }
          })
        }
      },
      metaQuery() { // 查询数据封装格式
        return {
          queryType: '1',
          queryContent: '',
          beginDate: undefined,
          endDate: undefined
        }
      }
      ,
      metaList() {
        noticeList(this.resData, this.queryData).then(res => {
          this.resData = res.data;
          0 === this.resData.pageNum ? this.resData.pageNum = 1 : null;
        })
      }
      ,
      metaPerm() {
        return {
          notice_list: false,
          notice_add: false,
          notice_del: false,
          notice_view: false,
          notice_upd: false,
          notice_is_top: false,
        }
      }
      ,
      metaHasPerm() {
        this.permData.notice_list = this.perms['sys:notice:list'];
        this.permData.notice_add = this.perms['sys:notice:save'];
        this.permData.notice_del = this.perms['sys:notice:delete'];
        this.permData.notice_view = this.perms['sys:notice:view'];
        this.permData.notice_upd = this.perms['sys:notice:update'];
        this.permData.notice_is_top = this.perms['sys:notice:isTop'];
      }
      ,
      // -------------------------------------------- 数据初始化完毕  -----------------------------------------
      exportExcel() {
        this.showProgress = true
        // exportExcel(this.queryData, this.checkboxVal).then(res => {
        //   let headers = res.headers;
        //   let loaded = res.loaded,
        //   total = res.total;
        //
        //   let title = ""
        //   if (!title) {
        //     const fileName = headers['content-disposition'];
        //     title = fileName.includes('filename=') ? decodeURI(fileName.split('=')[1]) : '下载的文件';
        //   }
        //
        //   fileUpload(res.data, title, "application/vnd.ms-excel")
        // })


        const _this = this;
        exportExcel(this.queryData, this.checkboxVal, (res) => {
          let loaded = res.loaded,
            total = res.total;
          _this.$nextTick(() => {
            _this.precent = (loaded / total) * 100;
            if (_this.precent == 100) {
              _this.showProgress = false

            }
          })
        }, (res) => {
          if (res.code === '200') {
            let headers = res.headers;
            let title = ""
            if (!title) {
              const fileName = headers['content-disposition'];
              title = fileName.includes('filename=') ? decodeURI(fileName.split('=')[1]) : '下载的文件';
            }

            fileUpload(res.data, title, "application/vnd.ms-excel")
          }
        })
      }
      ,
      checkinlist(val) {
        this.formTheadOptions1 = val
      }
      ,
      updateTable() {
        this.formThead = this.formTheadOptions.filter(i => this.checkboxVal.indexOf(i.key) >= 0)
        this.tableKey = this.tableKey + 1;
        this.dialogFormVisible = false

      }
      ,
      handleFromView(id) {
        this.$router.push("/subsidiary/noticeForm/" + id)
      }
      ,
      handleView(id) {
        this.isNoticeView = true;
        this.$nextTick(function () {
          this.$refs.noticeView.metaList(id)
        })
      }
      ,
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
            let noticeIdList = []
            for (let notice of this.deleteDataList) {
              noticeIdList.push(notice.id)
            }
            noticeDelete(noticeIdList).then(res => {
              this.$resMessage(res, {
                onClose: () => {
                  this.metaList()
                }
              })
            })
          })
        }
      }
      ,
      // ************************
      handleQuery() {
        this.resData = this.metaData();
        this.metaList();
      }
      ,
      handleSizeChange(val) {
        this.resData.pageSize = val
        this.metaList()
      }
      ,
      handleCurrentChange(val) {
        this.resData.pageNum = val
        this.metaList()
      }
      ,
      handleSelectionChange(val) {
        this.deleteDataList = val
      }
      ,
      handleTop(id) {
        noticeTop(id).then(res => {
          this.$resMessage(res, {
            onClose: () => {
              this.metaList()
            }
          })
        })
      }
      ,
      handleNoticeType() {
        this.noticeTypeVisible = true;
        this.$nextTick(() => {
          this.$refs.noticeTypeVisible.metaList();
        })
      }
    }
  }
</script>

<style scoped>
  .progress-box {
    width: 100%;
    height: 100vh;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 20000;
    background: rgba(0, 0, 0, .4);
  }

  .progress-bar {
    width: 20%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>
