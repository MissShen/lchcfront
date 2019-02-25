<template>
  <ul class="breadcrumb">
    <li class="crumbs">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">权限分配</el-breadcrumb-item>
        <!--<el-breadcrumb-item>活动管理</el-breadcrumb-item>-->
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </li>
    <!--<li class="breadbar">
      <span class="bread-title">用户管理</span>

      <span class="flo-right">
        <el-button type="success" plain size="small" icon="el-icon-circle-plus" @click="handleGoAdd">
        新增
        </el-button>
        <el-button type="success" plain size="small" icon="el-icon-circle-plus" @click="toggleQuery">
          <template v-if="showQuery">隐藏</template>
          <template v-else>查询</template>
        </el-button>
      </span>
    </li>-->
  </ul>
</template>

<script>
//import mockapi from './../mock/mockapi.js'
export default {
  name: "BreadCrumbs"
  /*data(){
    return {
      crumbsData: [],
      crumbEnd: ''
    }
  },
  created(){
    mockapi.getMockData('/generalManage/breadCrumbs', '')
      .then(res => {
        let obj = res[res.length-1];
        this.crumbEnd = obj.text;
        let arr = res.slice(0, -1);
        this.crumbsData = arr;
      });
  }*/
}
</script>

<style scoped>
.crumbs {
  height: 32px;
  padding: 0 10px;
  background: #f5f5f5;
  line-height: 32px;
  border-bottom: solid 1px #eee;
}
/*.crumbs-item {
  display: inline-block;
}
.crumbs-item::after {
  content: '>';
}
.crumbs-item > a {
  margin: 0 10px;
}*/
.el-breadcrumb {
  line-height: 32px;
}
</style>
