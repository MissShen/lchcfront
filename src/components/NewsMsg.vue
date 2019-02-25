<template>
  <div class="newmsg-box">
    <dl v-for="(item,index) in newMsg" v-if="item.messageContent">
      <dt>
        {{item.title || '新消息提示'}}
        <a href="javascript:;" class="btn-close" @click="handleReadStatus(item)">&times;</a>
      </dt>
      <dd>
        {{item.messageContent}}
      </dd>
    </dl>
  </div>
</template>

<script>

  import {updateMessageIsRead} from 'src/axios/management/subsidiary/message'
  import {mapGetters} from 'vuex'

  export default {
    name: "news-msg",
    props: {
      newMsg: {
        type: Array,
        required: true
      }
    },
    computed: {
      ...mapGetters([
        'orgId',
        'roleIds'
      ]),
    },
    methods: {
      handleReadStatus(item) {
        item.messageContent = '';
        updateMessageIsRead(item.id, this.roleIds, this.orgId)
      }
    }
    /*data(){
      return {
        newMsg: []
      }
    }*/
  }
</script>

<style scoped>

</style>
