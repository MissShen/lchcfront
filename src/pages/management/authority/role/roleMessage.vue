<template>
  <div v-if="hasPerm('sys:role_type_msg_type:view')">
    <el-dialog
      title="角色组消息授权"
      top="4vh"
      :close-on-click-modal="false"
      :visible.sync="visible" width="60%">
      <div class="tab-box">
        <el-tabs v-model="activeTabs" @tab-click="tabClick">
          <el-tab-pane label="买方" name="1">
          </el-tab-pane>
          <el-tab-pane label="卖方" name="2">
          </el-tab-pane>
          <el-tab-pane label="政府" name="3">
          </el-tab-pane>
          <el-tab-pane label="运营" name="4">
          </el-tab-pane>
            <div class="tableset">
              <el-table
                :data="resData.list"
                border
                stripe>
                <el-table-column label="授权" header-align="center" width="40px" align="center">
                  <template slot-scope="scope">
                    <input type="checkbox" class="checkbox"
                           @change="handleChecked(scope.row)"
                           :checked="scope.row.isChecked==='true'"/>
                  </template>
                </el-table-column>
                <el-table-column label="消息类型编号">
                  <template slot-scope="scope">
                    <span>{{ scope.row.msgTypeCode }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="消息类型名称">
                  <template slot-scope="scope">
                    <span>{{ scope.row.msgTypeName }}</span>
                  </template>
                </el-table-column>
              </el-table>
              <page-bar :data="resData" @refreshPage="refreshPage"></page-bar>
            </div>
        </el-tabs>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="dataFormSubmit()"
                   v-if="hasPerm('sys:role_type_msg_type:save')">确定
        </el-button>
        <el-button @click="visible=false" size="small">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    roleTypeMsgTypeDefaultList,
    roleTypeMsgTypeHasList,
    roleTypeMessageTypeSave
  } from "src/axios/management/authority/sysRole";
  import {PageData, HasPerm} from 'src/components/mixins'

  export default {
    name: "roleMessage",
    mixins: [PageData, HasPerm],
    data() {
      return {
        visible: false,
        roleTypeData: [
          {
            label: ''
          }, {
            label: ''
          }, {
            label: ''
          }, {
            label: ''
          }, {
            label: ''
          },
        ],
        activeTabs: '1',
        roleType: '1',
        roleMessageType: []
      }
    },
    mounted() {
      this.metaList();
    },
    methods: {
      metaList() {
        if (this.hasPerm('sys:role_type_msg_type:view')) {
          this.visible = true;
          roleTypeMsgTypeHasList(this.roleType).then(res => {
            if (res.code == 200) {
              this.roleMessageType = res.data
            }
          }).then(() => {
            roleTypeMsgTypeDefaultList(this.roleType).then(res => {
              if (res.code == 200) {
                this.resData = res.data;
                0 === this.resData.pageNum ? this.resData.pageNum = 1 : null;
              } else {
                this.$resMessage(res);
              }
            })
          })
        }
      },
      handleClose() {
        this.visible = false;
      },
      tabClick(tab) {
        this.resData = this.metaData();
        this.roleType = tab.name;
        this.metaList();
      },
      handleChecked(row) {
        row.isChecked = (row.isChecked === 'true') ? 'false' : 'true';
        if (row.isChecked === 'true') {
          this.roleMessageType.push(row)
        } else {
          this.roleMessageType.splice(this.roleMessageType.findIndex(v => v.id === row.id), 1);
        }
      },
      dataFormSubmit() {
        if (this.hasPerm('sys:role_type_msg_type:save')) {
          let idStr = this.roleMessageType.map(item => {
            return item.id
          });
          roleTypeMessageTypeSave(idStr.join(',').toString(), this.roleType).then(res => {
            this.$resMessage(res);
          })
        }
      },
    }
  }
</script>

<style scoped>

</style>
