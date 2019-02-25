<template>
  <!--================================== 页面根标签使用v-if进行权限控制[permData] ======================================-->
  <!--============================ 页面所有操作 按钮 DOM块 使用v-if进行权限控制[permData] =================================-->
  <!--============================================主题内容==========================================================-->
  <div class="tablebox" v-if="hasPerm('sys:message:list')">
    <!--==========================================  查询 条件 ======================================================-->
    <el-form :inline="true" :model="queryData" ref="queryData" class="table-form">
      <el-form-item>
         <el-date-picker
           size="small"
           type="date"
           value-format="yyyy-MM-dd 00:00:00"
           placeholder="创建开始日期"
           :editable="false"
           style="width: 165px !important;"
           v-model="queryData.searchBeginDate">
          </el-date-picker>
        &nbsp;至&nbsp;
        <el-date-picker
          size="small"
          type="date"
          value-format="yyyy-MM-dd 00:00:00"
          placeholder="创建结束日期"
          :editable="false"
          style="width: 165px !important;"
          v-model="queryData.searchEndDate">
          </el-date-picker>
       </el-form-item>
       <el-form-item>
         <el-select v-model="queryData.searchSystemCode" placeholder="所属系统" size="small">
          <el-option v-for="busSys in busSysData"
                     :key="busSys.label"
                     :label="busSys.label"
                     :value="busSys.value"></el-option>
        </el-select>
       </el-form-item>
       <el-form-item>
         <el-select v-model="queryData.searchReadFlag" placeholder="状态" size="small">
          <el-option label="已读" value="1"></el-option>
          <el-option label="未读" value="0"></el-option>
        </el-select>
       </el-form-item>
       <el-form-item>
       <el-button type="success" size="small" @click="handleQuery">查询 </el-button>
       <el-button type="warning" size="small" @click="queryData = metaQuery()">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="foot-btn foot-left">
      <el-button type="warning" size="small" @click="handleMessageType()">消息类型</el-button>
    </div>
    <!--================================================ table 数据表格 ============================================-->
    <div class="tableset">
      <el-table :data="resData.list" border stripe :empty-text="emptyTxt">
        <el-table-column label="系统名称">
          <template slot-scope="scope">
                          <span v-for="busSys in busSysData"
                                :key="busSys.value"
                                v-if="busSys.value===scope.row.systemCode">{{ busSys.label }}</span>
          </template>
        </el-table-column>
        <el-table-column label="消息内容" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.messageContent }}</span>
          </template>
        </el-table-column>
        <el-table-column label="消息类型">
          <template slot-scope="scope">
            <span>{{ scope.row.msgTypeName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="已读">
          <template slot-scope="scope">
            <span v-if="scope.row.readFlag == 1"><span>已读</span></span>
            <span v-else><span>未读</span></span>
          </template>
        </el-table-column>
        <el-table-column label="创建日期">
          <template slot-scope="scope">
            <span>{{ scope.row.createDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <div slot="content" class="operates" v-if="hasPerm('sys:message:delete')">
              <a href="javascript:;" class="red" @click="handleDelete(scope.row.id,scope.row.userName)">删除</a>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--<page-bar :data="resData" @refreshPage="refreshPage"></page-bar>-->
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
    <sys-message-type v-if="messageTypeVisible" ref="messageTypeVisible"></sys-message-type>
  </div>
</template>

<script>
  // -----------------------------------引入当前页面需要的方法、组件-------------------------------------------------------
  import {enumBusSysList} from "src/axios/common/common";
  import {PageData, HasPerm} from 'src/components/mixins';
  import {messageList, messageDelete} from "src/axios/management/subsidiary/message";
  import SysMessageType from 'src/pages/management/subsidiary/message/sysMessageType'
  import {mapGetters} from 'vuex';

  // ------------------------------------------------ 构建Vue对象name----------------------------------------------------
  export default {
    name: 'sys-message',
    mixins: [PageData, HasPerm],
    components: {
      SysMessageType
    },
    computed: {
      ...mapGetters([
        'orgId',
        'roleIds'
      ]),
    },
    data() {
      return {
        queryData: this.metaQuery(), // 查询初始化
        emptyTxt: '暂无数据',
        messageTypeVisible: false,
        busSysData: [],
        resData: this.metaData()
      }
    },
    created() {
      this.metaList();
    },
    methods: {
      metaQuery() { // 表单查询数据初始化
        return {
          searchSystemCode: undefined,
          searchContent: undefined,
          searchBeginDate: undefined,
          searchEndDate: undefined,
          searchReadFlag: undefined
        }
      },
      metaData() { // 前后台交互数据封装格式
        return {
          pageNum: 1,
          pageSize: 20,
          total: 0,
          pages: 0,
          list: []
        }
      },
      metaList() {
        if (this.hasPerm('sys:message:list')) {
          let params = this.queryData
          params.orgId = this.orgId
          params.roleIdList = this.roleIds.split(",")
          messageList(this.resData.pageNum, this.resData.pageSize, this.queryData).then(res => {
            this.resData = res.data;
            if (0 === this.resData.pageNum) {
              this.resData.pageNum = 1
            }
          });
          enumBusSysList().then(res => {
            if (res.code == 200) {
              this.busSysData = res.data;
            }
          })
        }
      },
      handleSizeChange(val) {
        this.resData.pageSize = val;
        this.metaList();
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val;
        this.metaList();
      },
      handleDelete(id) {
        this.$confirm(`确定删除该消息吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          messageDelete(id).then(res => {
            this.$resMessage(res, {
              onClose: () => {
                this.metaList();
              }
            })
          })
        })
      },
      handleMessageType() {
        this.messageTypeVisible = true;
        this.$nextTick(() => {
          this.$refs.messageTypeVisible.metaList();
        })
      }
    }
  }
</script>


