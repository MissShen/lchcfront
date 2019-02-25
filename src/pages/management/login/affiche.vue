<template>
  <div>
    <div class="login-main">
      <div class="affiche"></div>
      <template v-if="resData.list.length>0">
        <div class="affiche-box">
          <ul class="affiche-list">
            <li v-for=" notice in resData.list">
              <a href="javascript:;" @click="handleNoticeView(notice.id)">
                <span class="item-content">{{notice.noticeTitle}}</span>
                <span class="item-date">{{notice.releaseTime}}</span>
              </a>
            </li>
          </ul>
          <div class="pagebox">
            <page-bar :data="resData" @refreshPage="refreshPage"></page-bar>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="list-blank">暂无公告</div>
      </template>
    </div>
    <notice-view-from v-if="isNoticeView" ref="noticeView"></notice-view-from>
  </div>
</template>
<script>
  import {PageData} from 'src/components/mixins'
  import {unLoginNoticeList} from "src/axios/management/subsidiary/notice";
  import PageBar from "../../../components/layout/page-bar";
  import noticeViewFrom from 'src/pages/management/subsidiary/notice/sysNoticeView'
  export default {
    name: 'affiche',
    components: {PageBar,noticeViewFrom},
    mixins:[PageData],
    data(){
      return{
        isNoticeView:false,
        dataForm: this.metaForm(),
        resData:{
          pageNum: 1,
          pageSize: 10,
          total: 0,
          pages: 0,
          list: []
        }
      }
    },
    mounted() {
      this.metaList();
    },
    methods:{
      metaForm() {
        return {
          noticeFileList: [],
          sysNotice: {
            id: '0',
            noticeTitle: '',
            noticeContent: '',
            releaseTime: '',
          }
        }
      },
      metaList() {
        unLoginNoticeList(this.resData.pageNum,this.resData.pageSize).then(res => {
          this.resData = res.data;
          0 === this.resData.pageNum ? this.resData.pageNum = 1 : null;
        })
      },
      handleNoticeView(id){
        this.isNoticeView=true;
        this.$nextTick(function(){
          this.$refs.noticeView.metaList(id)
        })
      },
    }
  }
</script>
