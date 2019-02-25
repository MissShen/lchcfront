<template>
  <el-dialog
    title="确认主动降价"
    :append-to-body="true"
    :close-on-click-modal="false"
    :visible.sync="visible" width="35%">

    <!-- 表格 -->
    <div class="padding10">
      <!-- 表格查询表单 -->
        <el-form ref="reducedPriceDate" :model="reducedPriceDate" size="small" :inline="true" class="table-form">
            <el-form-item>
                  <el-date-picker
                    v-model="reducedPriceDate.executeDate"
                    :picker-options="pickerOptions"
                    type="datetime"
                    placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="primary" @click="insertReducedPrice()">保存</el-button>
              <el-button size="small" @click="closeForm()">返回</el-button>
            </el-form-item>
        </el-form>

    </div>
    <!-- ========================== 主内容end ========================= -->
  </el-dialog>



</template>
<script>

  // 引入用户相关请求  引自js文件
  import {insertReducedPriceHttp} from 'src/axios/contract/bargainmanagement/manufacturelowerprice/manufactureLowerPriceList'


  export default {
    data () {
      return {
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        reducedPriceDate:{executeDate:undefined},
        visible : false,
        modalId : [],
        upIds : []
      }
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      fillData(modalId,upIds) {
        console.log('productId：',modalId+"--"+"upIds"+upIds);
        this.modalId = modalId;
        this.upIds = upIds;
        this.visible = true;
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  关闭弹窗
      closeForm(){
        this.reducedPriceDate.executeDate = undefined;
        this.visible = false;
      },
      //保存窗口
      insertReducedPrice(){
        if(this.reducedPriceDate.executeDate==undefined){
          this.$message({
            message: '发起议价时间不能为空',
            type: 'warning'
          });
          return;
        }
        this.$confirm('保存后已选择的产品将对所有关联此产品的医院发起主动降价，确认保存？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          insertReducedPriceHttp(this.modalId,this.upIds,this.reducedPriceDate).then(res=>{
            this.$message({
              type : res.success == true ? "success" : "error",
              message: res.success == true ? res.data : '保存失败'
            })
            this.reducedPriceDate.executeDate = undefined;
            this.visible = false;
            this.$emit("closeFrom","");
          })
        })
      }
    }
  }
</script>

