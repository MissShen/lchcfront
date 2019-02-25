<template>
  <div>
    <unlogin-letures-view v-if="unloginViewVisible" ref="unloginViewVisible"></unlogin-letures-view>
    <el-dialog
      :visible.sync="visible" width="70%" top="10vh"
      :showClose="false"
      append-to-body
    >
      <div class="classroom-box">
        <div class="classroom-list clearfixed">
          <i class="classroom-line"></i>
          <div class="classroom-title">
            {{typeName}}
          </div>
          <ul>
            <li v-for="item in resData.list" :key="item.id">
              <a href="javascript:;" @click="downloadOrDialog(item)">
                <span class="item-content">{{item.leturesTitle}}</span>
                <span class="item-date">{{item.createDate}}</span>
              </a>
            </li>
          </ul>
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
      </div>
      <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">关闭</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
  import UnloginLeturesView from 'src/pages/management/subsidiary/letures/unlogin-letures-view'
  import {unLoginLeturesList, unLoginDownloadLeturesFile} from "src/axios/management/subsidiary/letures";
  import fileUpload from 'js-file-download'

  export default {
    name: "unlogin-letures-item",
    components: {UnloginLeturesView},
    data() {
      return {
        visible: false,
        unloginViewVisible: false,
        typeId: '',
        typeName: '',
        resData: this.metaData(),
      }
    },
    methods: {
      metaData() {
        return {
          pageNum: 1,
          pageSize: 20,
          total: 0,
          pages: 0,
          list: []
        }
      },
      metaList(id, name) {
        this.visible = true;
        if (id) {
          this.typeId = id;
          this.typeName = name;
          unLoginLeturesList(this.resData.pageNum, this.resData.pageSize, this.typeId).then(res => {
            if (res.code == 200) {
              this.resData = res.data;
              0 === this.resData.pageNum ? this.resData.pageNum = 1 : null;
            } else {
              this.resData = this.metaData();
            }
          })
        }

      },
      downloadOrDialog(data) {
        if (data.leturesContents) {
          this.unloginViewVisible = true;
          this.$nextTick(() => {
            this.$refs.unloginViewVisible.dataFormView(data.id);
          })
        } else {
          unLoginDownloadLeturesFile(data.id).then(res => {
            let contentType = res.headers['content-type'];
            fileUpload(res.data, data.realFileName, contentType)
          });
        }
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.metaList(this.typeId, this.typeName)
      },
      handleCurrentChange(val) {
        this.pageNum = val;
        this.metaList(this.typeId, this.typeName)
      },
    },

  }
</script>

<style scoped>

</style>
