<template>
  <div class="login-main">
    <div class="interact"></div>
    <div class="main">
      <div class="interact-list">
        <dl v-for="(faq,index) in faqDataList" :key="index">
          <dt>
            <i class="interact-ico icon-ask"></i>
            <span class="ask-text">{{faq.title}}</span>
          </dt>
          <dd>
            <i class="interact-ico icon-answer"></i>
            <span class="answer-text" v-text="faq.replyContent"></span>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>
<script>
  import {unLoginFaqList} from "src/axios/login/service";

  export default {
    name: 'interact',
    data() {
      return {
        faqDataList: [{
          title:'',
          replyContent:''
        }]
      }
    },
    mounted() {
      this.metaList();
    },
    methods: {
      metaList() {
        unLoginFaqList().then(res => {
          if (res.code == 200) {
            this.faqDataList = res.data;
          }
        })
      }
    }
  }
</script>
