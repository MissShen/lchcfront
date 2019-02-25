<template>
  <div>
    <unlogin-letures-view v-if="unloginViewVisible" ref="unloginViewVisible"></unlogin-letures-view>
    <unlogin-letures-item v-if="unloginItemVisible" ref="unloginItemVisible"></unlogin-letures-item>
    <div class="login-main">
      <div class="classroom"></div>
      <div class="classroom-box">
        <div class="classroom-list  clearfixed"
             v-for="(item,index) in itemDataList"
             v-if="item.leturesList.length>0"
             :key="index">

          <i class="classroom-line"></i>
          <div class="classroom-title">
            {{item.leturesTypeName}}
          </div>
          <ul>
            <li v-for="(itemData,iIndex) in item.leturesList" :key="iIndex">
              <a href="javascript:;" @click="downloadOrDialog(itemData)">
                <span class="item-content">{{itemData.leturesTitle}}</span>
                <span class="item-date">{{itemData.createDate}}</span>
              </a>
            </li>
          </ul>
          <a class="flo-right" @click="handleMoreItem(item.leturesTypeId,item.leturesTypeName)">查看更多>></a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {unLoginLeturesVoList, unLoginDownloadLeturesFile} from "src/axios/management/subsidiary/letures";
  import fileUpload from 'js-file-download'
  import UnloginLeturesView from 'src/pages/management/subsidiary/letures/unlogin-letures-view'
  import UnloginLeturesItem from 'src/pages/management/subsidiary/letures/unlogin-letures-item'

  export default {
    name: 'classroom',
    components: {UnloginLeturesView, UnloginLeturesItem},
    data() {
      return {
        leturesTypeList: [],
        unloginViewVisible: false,
        unloginItemVisible: false,
        itemDataList: [{
          leturesTypeId: '',
          leturesTypeName: '',
          leturesList: []
        }],
      }
    },
    created() {
      this.initLeturesVoList();
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
      initLeturesVoList() {
        unLoginLeturesVoList().then(res => {
          if (res.code == 200) {
            this.itemDataList = res.data
          }
        })
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
      handleMoreItem(typeId, typeName) {
        this.unloginItemVisible = true;
        this.$nextTick(() => {
          this.$refs.unloginItemVisible.metaList(typeId, typeName);
        })
      }
    }
  }
</script>
<style>
  @import "./../../../assets/css/login.css";
</style>
