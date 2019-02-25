<template>
  <div class="s-wrap">
    <supervise-header></supervise-header>

    <div class="s-tabs">
      <span class="tab-left">
       <!-- <router-link v-if="hasPerm('supervision:generalize')"  to="/supervise/superviseGeneralize" :class="navActive('superviseGeneralize')">
          监管概括
        </router-link>-->
        <!--<router-link v-if="hasPerm('supervision:transact')" to="/supervise/superviseTransact" :class="navActive('superviseTransact')">-->
          <!--交易监管-->
        <!--</router-link>-->
       <!-- <router-link v-if="hasPerm('supervise:dictionary:data')" to="/supervise/superviseDictionaryData" :class="navActive('superviseDictionaryData')">
          字典数据
        </router-link>-->
        <!--<router-link to="/">
          资审监管
        </router-link>-->
        <!--<router-link to="/supervise/superviseSelect" :class="navActive('superviseSelect')">
          遴选监管
        </router-link>-->
      </span>
      <span class="tab-right">
        <!--<router-link to="/supervise/superviseContract"  :class="navActive('superviseContract')">
          合同监管
        </router-link>-->
        <!--<router-link v-if="hasPerm('supervise:superviseSelect:hospital')" to="/supervise/superviseSelect" :class="navActive('superviseSelect')">
          遴选监管
        </router-link>-->
        <!--<router-link v-if="hasPerm('supervise:superviseDrugFlow')" to="/supervise/superviseDrugFlow" :class="navActive('superviseDrugFlow')">
          药品流向
        </router-link>-->
        <!--<router-link v-if="hasPerm('supervision:generalize')" to="/supervise/superviseNoticeBulletin" :class="navActive('superviseNoticeBulletin')">-->
          <!--通知公示-->
        <!--</router-link>-->
        <!-- <router-link to="/supervise/superviseExportData" :class="navActive('superviseExportData')">
           数据导出
         </router-link>-->
      </span>
    </div>

    <router-view/>
  </div>
</template>

<script>
  import superviseHeader from 'src/pages/supervise/common/superviseHeader'
  import superviseGeneralize from '../generalize/superviseGeneralize'
  import drugFlow from './../drugflow/drugFlow'
  import {HasPerm} from 'src/components/mixins'
  import {getSessions} from "src/utils"
  export default {
    name: "sLayout",
    mixins: [HasPerm],
    components: {
      superviseHeader,
      superviseGeneralize,
      drugFlow
    },
    created() {
      if (sessionStorage.getItem('token')) {
        getSessions();
      }
    },
    methods: {
      navActive(nav){
        const _arr = this.$route.path.split('/');
        return {
          active: _arr[2] === nav
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "scss/theme-blue";
  @import "scss/basic";
</style>
