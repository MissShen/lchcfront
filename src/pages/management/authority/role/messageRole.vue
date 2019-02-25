<template>
  <div v-if="hasPerm('sys:role_msg_type:view')">
    <el-dialog
      title="授权可接收的消息类型"
      top="4vh"
      :close-on-click-modal="false"
      :visible.sync="visible" width="70%">
      <div>
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
                <span>{{ scope.row.msgTypeCode}}</span>
              </template>
            </el-table-column>
            <el-table-column label="消息类型名称">
              <template slot-scope="scope">
                <span>{{ scope.row.msgTypeName}}</span>
              </template>
            </el-table-column>
          </el-table>
          <page-bar :data="resData" @refreshPage="refreshPage"></page-bar>
          <el-button type="primary" size="small" @click="dataFormSubmit()"
                     v-if="hasPerm('sys:role_msg_type:save')">确定
          </el-button>
          <el-button @click="visible=false" size="small">关闭</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {PageData, HasPerm} from 'src/components/mixins'
  import {
    roleMsgTypeDefaultList,
    roleMsgTypeHasList,
    roleMessageTypeSave
  } from "../../../../axios/management/authority/sysRole";

  export default {
    name: "messageRole",
    mixins: [PageData, HasPerm],
    data() {
      return {
        visible: false,
        id: ''
      }
    },
    methods: {
      metaList(id) {
        if(this.hasPerm('sys:role_msg_type:view')){
          this.visible = true;
          if (this.id !== id) {
            this.resData = this.metaData();
          }
          this.id = id;
          roleMsgTypeHasList(this.id).then(res => {
            if (res.code == 200) {
              this.roleMessageType = res.data
            }
          }).then(() => {
            roleMsgTypeDefaultList(this.id).then(res => {
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
      handleChecked(row) {
        row.isChecked = (row.isChecked === 'true') ? 'false' : 'true';
        if (row.isChecked === 'true') {
          this.roleMessageType.push(row)
        } else {
          this.roleMessageType.splice(this.roleMessageType.findIndex(v => v.id === row.id), 1);
        }
      },
      dataFormSubmit() {
        if(this.hasPerm('sys:role_msg_type:save')) {
          let idStr = this.roleMessageType.map(item => {
            return item.id
          });
          roleMessageTypeSave(idStr.join(',').toString(), this.id).then(res => {
            this.$resMessage(res);
          })
        }
      },
    }
  }
</script>

<style scoped>

</style>
