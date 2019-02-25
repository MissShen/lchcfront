<template>
  <div>
    <el-tree
      :data="data2"
      show-checkbox
      node-key="id"
      :props="defaultProps" class="menu-tree">
    </el-tree>
    <div class="space-20">
      <el-button type="primary" size="small ">确定</el-button>
      <el-button size="small ">返回</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        data2: [{
          label: '产品数据',
          children: [{
            label: '产品信息',
          },{
            label: '产品黄页',
          }]
        },{
          label: '认证数据',
          children: [{
            label: '基本医疗保险药品'
          },{
            label: '国家基本药物'
          },{
            label: 'OTC药品'
          },{
            label: '药品质量公告'
          }]
        }, {
          label: '资质数据',
          children: [{
            label: '企业资质'
          }, {
            label: '产品资质'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    }
  };
</script>
