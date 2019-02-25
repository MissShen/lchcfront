<template>
  <el-dialog
    title="消息列表"
    top="4vh"
    width="80%"
    :close-on-click-modal="false"
    :visible.sync="visible"
    v-if="hasPerm('login')"
  >
    <div class="table-form">
      <el-form :inline="true" :model="queryData" ref="queryData">
        <div class="formrow">
            <span>
               <el-select v-model="queryData.searchSystemName" placeholder="所属系统" size="small">
                <el-option v-for="busSys in busSysData"
                           :key="busSys.label"
                           :label="busSys.label"
                           :value="busSys.label"></el-option>
              </el-select>
          </span>
          <span>
               <el-select v-model="queryData.searchReadFlag" placeholder="状态" size="small">
                <el-option label="已读" value="1"></el-option>
                <el-option label="未读" value="0"></el-option>
              </el-select>
          </span>
          <span>
           <el-button type="success" size="small" @click="handleQuery">查询 </el-button>
           <el-button type="warning" size="small" @click="queryData = metaQuery()"> 重置  </el-button>
          </span>
        </div>
      </el-form>
      <!--================================================ table 数据表格 ============================================-->
      <div class="tableset">
        <el-table :data="resData.list" border stripe :empty-text="emptyTxt">
          <el-table-column label="系统名称" width="100px">
            <template slot-scope="scope">
              <span>{{ scope.row.sysName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="消息内容">
            <template slot-scope="scope">
              <span>{{ scope.row.messageContent }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="100px">
            <template slot-scope="scope">
              <span v-if="scope.row.readFlag == 1"><span>已读</span></span>
              <span v-else><span>未读</span></span>
            </template>
          </el-table-column>
          <el-table-column label="创建日期" width="150px">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <page-bar :data="resData" @refreshPage="refreshPage"></page-bar>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false" size="small">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
  // -----------------------------------引入当前页面需要的方法、组件-------------------------------------------------------
  import {enumBusSysList} from "src/axios/common/common";
  import {PageData, HasPerm} from 'src/components/mixins';
  import {userMessageList} from "src/axios/management/subsidiary/message";
  // ------------------------------------------------ 构建Vue对象name----------------------------------------------------
  export default {
    name: 'user-message',
    mixins: [PageData, HasPerm],
    data() {
      return {
        visible: false,
        queryData: this.metaQuery(), // 查询初始化
        emptyTxt: '暂无数据',
        busSysData: [],
      }
    },
    created() {
      this.metaList();
    },
    methods: {
      metaData() {
        return {
          pageNum: 1,
          pageSize: 10,
          total: 0,
          pages: 0,
          list: []
        }
      },
      metaQuery() { // 表单查询数据初始化
        return {
          searchSystemName: undefined,
          searchContent: undefined,
          searchReadFlag: undefined,
        }
      },
      metaList() {
        if (this.hasPerm('login')) {
          this.visible = true;
          userMessageList(this.resData.pageNum, this.resData.pageSize, this.queryData).then(res => {
            if (res.code == 200) {
              this.resData = res.data;
            } else {
              this.resData = this.metaData();
              this.emptyTxt = "数据获取失败!";
            }
          });
          enumBusSysList().then(res => {
            if (res.code == 200) {
              this.busSysData = res.data;
            }
          })
        }
      },
    }
  }
</script>


