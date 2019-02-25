<template>
  <div class="mainbox tree-box clearfixed">
    <div class="tree-one w25 dis-inline flo-left  clearfixed" >
      <ul class="menu" v-for="(item,index) in this.dictionaryData.oneDictionary">
        <li>{{item.orgName}} <i v-if="item.hasOrg" @click="openChild(item.orgId,1)" class="el-icon-caret-right flo-right"></i></li>
      </ul>
    </div>
    <div class="tree-one w25 dis-inline flo-left  clearfixed" v-if="this.dictionaryData.twoDictionary.length>0">
      <ul class="menu" v-for="(twoItem,index) in this.dictionaryData.twoDictionary">
        <li>{{twoItem.orgName}} <i v-if="twoItem.hasOrg" @click="openChild(twoItem.orgId,2)" class="el-icon-caret-right flo-right"></i></li>
      </ul>
    </div>

    <div class="tree-one w25 dis-inline flo-left  clearfixed" v-if="this.dictionaryData.threeDictionary.length>0">
      <ul class="menu" v-for="(threeItem,index) in this.dictionaryData.threeDictionary">
        <li>{{threeItem.orgName}} <i v-if="threeItem.hasOrg" @click="openChild(threeItem.orgId,3)" class="el-icon-caret-right flo-right"></i></li>
      </ul>
    </div>

    <div class="tree-one w25 dis-inline flo-left  clearfixed" v-if="this.dictionaryData.fourDictionary.length>0">
      <ul class="menu" v-for="(fourItem,index) in dictionaryData.fourDictionary">
        <li>{{fourItem.orgName}} <i v-if="fourItem.hasOrg" @click="openChild(fourItem.orgId,4)" class="el-icon-caret-right flo-right"></i></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data() {
      return {
        dictionary:{
          orgId:'',
          orgName:'',
          hasOrg:false
        },
        dictionaryData:{
          oneDictionary:[
                {
                  orgId:'DATA00000000000000454012',
                  orgName:'北京市密云区卫生和计划生育委员会',
                  hasOrg: true
                }
            ],
          twoDictionary:[],
          threeDictionary:[],
          fourDictionary:[],
          fiveDictionary:[]
        }
      }
    },
    mounted() {

    },
    methods: {

      openChild(id,number){
        if(number == 1){
          console.log("1"+number)
          this.dictionaryData.twoDictionary=[
            {
              orgId:'JSJY10000000000000290323',
              orgName:'北京市密云区大城子镇社区卫生服务中心',
              hasOrg: true
            },
            {
              orgId:'JSJY10000000000000290331',
              orgName:'北京市密云区西田各庄镇社区卫生服务中心',
              hasOrg: false
            },
            {
              orgId:'JSJY10000000000000292739',
              orgName:'北京市密云区密云镇社区卫生服务中心',
              hasOrg: true
            },
            {
              orgId:'JSJY10000000000000290335',
              orgName:'北京市密云区巨各庄镇社区卫生服务中心',
              hasOrg: true
            },
            {
              orgId:'JSJY10000000000000290326',
              orgName:'北京市密云区石城镇社区卫生服务中心',
              hasOrg: true
            },
            {
              orgId:'JSJY10000000000000290320',
              orgName:'北京市密云区鼓楼社区卫生服务中心',
              hasOrg: true
            },
            {
              orgId:'JSJY10000000000000290339',
              orgName:'北京市密云区不老屯镇社区卫生服务中心',
              hasOrg: true
            },
            {
              orgId:'JSJY10000000000000290336',
              orgName:'北京市密云区穆家峪镇社区卫生服务中心',
              hasOrg: true
            },
            {
              orgId:'JSJY10000000000000290321',
              orgName:'北京市密云区果园社区卫生服务中心',
              hasOrg: true
            },
            {
              orgId:'JSJY10000000000000290324',
              orgName:'北京市密云区新城子镇社区卫生服务中心',
              hasOrg: true
            },
            {
              orgId:'JSJY10000000000000290337',
              orgName:'北京市密云区太师屯镇社区卫生服务中心',
              hasOrg: true
            }

          ]
        }
        if(number == 2){
          console.log("2"+number)
          this.dictionaryData.threeDictionary=[
            {
              orgId:'DATA00000000000000457110',
              orgName:'柏崖村王丽君卫生室',
              hasOrg: false
            },
            {
              orgId:'DATA00000000000000457115',
              orgName:'后甸村卫生室',
              hasOrg: false
            },
            {
              orgId:'DATA00000000000000457116',
              orgName:'方耳峪村卫生室',
              hasOrg: false
            },
            {
              orgId:'DATA00000000000000457113',
              orgName:'庄户峪王洪才卫生室',
              hasOrg: false
            },
            {
              orgId:'DATA00000000000000457108',
              orgName:'苍术会村张明安村卫生室',
              hasOrg: false
            },
            {
              orgId:'DATA00000000000000457114',
              orgName:'张庄子张晓梅卫生室',
              hasOrg: false
            },
          ]
        }
        if(number == 3){
          console.log("3"+number)
          this.dictionaryData.fourDictionary=[
            {
              orgId:'DATA00000000000000457110',
              orgName:'柏崖村王丽君卫生室',
              hasOrg: false
            },
            {
              orgId:'DATA00000000000000457115',
              orgName:'后甸村卫生室',
              hasOrg: false
            },
            {
              orgId:'DATA00000000000000457116',
              orgName:'方耳峪村卫生室',
              hasOrg: false
            },
            {
              orgId:'DATA00000000000000457113',
              orgName:'庄户峪王洪才卫生室',
              hasOrg: false
            },
            {
              orgId:'DATA00000000000000457108',
              orgName:'苍术会村张明安村卫生室',
              hasOrg: false
            },
            {
              orgId:'DATA00000000000000457114',
              orgName:'张庄子张晓梅卫生室',
              hasOrg: false
            },
          ]
        }

      }
    }
  }
</script>
<style>

</style>
