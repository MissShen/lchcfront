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
          label: '企业确认',
          children: [{
            label: '产品信息确认',
          },{
            label: '转产信息确认',
          },{
            label: '价格变更确认',
          },{
            label: '企业信息确认',
          }]
        },{
          label: '信息变更',
          children: [{
            label: '产品信息变更'
          },{
            label: '产品转产变更'
          },{
            label: '企业信息变更'
          },{
            label: '产品转出确认'
          }]
        }, {
          label: '信息注册',
          children: [{
            label: '产品信息注册'
          }, {
            label: '企业信息注册'
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
