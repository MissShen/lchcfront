<template>
  <div>
          <el-checkbox  v-model="checkAll" @change="handleCheckAllChange">{{secondlist.name}}</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="items in secondlist.list" :label="items.id" :key="items.id">{{items.nameChn}}</el-checkbox>
          </el-checkbox-group>
  </div>

</template>
<script>
  export default {
    props: {
      secondlist: {
        type: Object,
        required: true
      },
      index:{
        type:Number,
        required: true
      }
    },
    data() {
      return {
        checkAll: false,//大checkbox是否选中
        checkedCities: [],//选中的小checkbox的id
      };
    },
    created(){
      let checkedCities = [];
      const list =this.secondlist.list;
      for(let i=0;i<list.length;i++){
        if(list[i].regionChecked>0){
          checkedCities.push(list[i].id);
        }
      }
      //设置全选多选框是否选中
      if(list.length == checkedCities.length){
        this.checkAll = true;
      }
      //设置子多选框选中
     this.checkedCities = checkedCities;

    },
    methods: {
      handleCheckAllChange(val) {
        if(val){
          let allSelectid = [];
          for(let i=0;i<this.secondlist.list.length;i++){
            allSelectid.push(this.secondlist.list[i].id);
          }
          this.checkedCities = allSelectid;
        }else{
          this.checkedCities = [];
        }
        this.$emit("subchanged",{index:this.index,checkeds:this.checkedCities});
      },
      handleCheckedCitiesChange(value) {
        if(this.secondlist.list.length === value.length){
          this.checkAll = true;
        }else{
          this.checkAll = false;
        }
        this.$emit("subchanged",{index:this.index,checkeds:value});
      }
    }
  };
</script>
