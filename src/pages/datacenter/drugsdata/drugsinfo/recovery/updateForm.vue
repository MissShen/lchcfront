<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <ul class="tabs-panel">
      <li class="active">修改药品回收信息</li>
    </ul>

    <div class="tablebox">
      <div style="width: 1800px">
        <el-form :model="from" ref="from" :rules="rules" label-position="left" label-width="100px" class="demo-ruleForm"
                 size="small">

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item labelWidth="170px">
                <span>药品分类</span>
                <span>药品小分类</span>
                <span>通用名</span>
                <span>剂型</span>
                <span>规格</span>
                <span>一级盐类衍生物</span>
                <span>二级盐类衍生物</span>
                <span>复方及小儿标记</span>
                <span>转换比</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="药品编码选择：" labelWidth="170px">
                <el-input v-model="form.telephone" style="width: 7%"></el-input>
                <el-input v-model="form.telephone" style="width: 7%"></el-input>
                <el-input v-model="form.telephone" style="width: 7%"></el-input>
                <el-input v-model="form.telephone" style="width: 7%"></el-input>
                <el-input v-model="form.telephone" style="width: 7%"></el-input>
                <el-input v-model="form.telephone" style="width: 7%"></el-input>
                <el-input v-model="form.telephone" style="width: 7%"></el-input>
                <el-input v-model="form.telephone" style="width: 7%"></el-input>
                <el-input v-model="form.telephone" style="width: 7%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item labelWidth="170px">
                <el-button >选择</el-button>
                <el-button >选择</el-button>
                <el-button >选择</el-button>
                <el-button >选择</el-button>
                <el-button >选择</el-button>
                <el-button >选择</el-button>
                <el-button >选择</el-button>
                <el-button >选择</el-button>
                <el-button >选择</el-button>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="7">
              <el-form-item label="药品编码：" labelWidth="170px">
                <el-input v-model="form.telephone" style="width: 60%"></el-input>
                <el-button type="warning">导入编码</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="6" offset="1">
              <el-form-item label="剂型：" labelWidth="170px">
                <el-input v-model="form.telephone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="6">
              <el-form-item label="药品大分类：" labelWidth="170px">
                <el-input v-model="form.telephone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" offset="2">
              <el-form-item label="规格：" labelWidth="170px">
                <el-input v-model="form.telephone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="6">
              <el-form-item label="药品小分类：" labelWidth="170px">
                <el-input v-model="form.telephone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" offset="2">
              <el-form-item label="一级盐类衍生物：" labelWidth="170px">
                <el-input v-model="form.telephone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="6">
              <el-form-item label="通用名：" labelWidth="170px">
                <el-input v-model="form.telephone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" offset="2">
              <el-form-item label="二级盐类衍生物：" labelWidth="170px">
                <el-input v-model="form.telephone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="6">
              <el-form-item label="转换比：" labelWidth="170px">
                <el-input v-model="form.telephone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" offset="2">
              <el-form-item label="复方及小儿标记：" labelWidth="170px">
                <el-input v-model="form.telephone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="6">
              <el-form-item label="英文名称：" labelWidth="170px">
                <el-input v-model="form.telephone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" offset="2">
              <el-form-item label="备用标识：" labelWidth="170px">
                <el-select v-model="value" placeholder="下拉框">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="6">
              <el-form-item label="含量：" labelWidth="170px">
                <el-input v-model="form.telephone" style="width: 68%"></el-input>
                <el-select v-model="value" placeholder="下拉框" style="width: 30%">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" offset="2">
              <el-form-item label="重（装）量：" labelWidth="170px">
                <el-input v-model="form.telephone" style="width: 68%"></el-input>
                <el-select v-model="value" placeholder="下拉框" style="width: 30%">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="6">
              <el-form-item label="质量标准编号：" labelWidth="170px">
                <el-input v-model="form.telephone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" offset="2">
              <el-form-item label="质量标准类别：" labelWidth="170px">
                <el-select v-model="value" placeholder="下拉框">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="6">
              <el-form-item label="质量标准有效期：" labelWidth="170px">
                <el-date-picker v-model="value" type="date"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6" offset="2">
              <el-form-item label="用法用量：" labelWidth="170px">
                <el-input v-model="form.telephone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="6">
              <el-form-item label="国家基本药物：" labelWidth="170px">
                <el-radio-group v-model="value">
                  <el-radio label="soleType">是</el-radio>
                  <el-radio label="chainType">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="6">
              <el-form-item label="国家基本医疗保险药品：" labelWidth="170px">
                <el-radio-group v-model="value">
                  <el-radio label="soleType">是</el-radio>
                  <el-radio label="chainType">否</el-radio>
                  <el-radio label="1">是</el-radio>
                  <el-radio label="2">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="6" offset="2">
              <el-form-item label="ATC中文名称：" labelWidth="170px">
                <el-input v-model="form.telephone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="6">
              <el-form-item label="OTC药品：" labelWidth="170px">
                <el-radio-group v-model="value">
                  <el-radio label="soleType">是</el-radio>
                  <el-radio label="chainType">是</el-radio>
                  <el-radio label="1">是</el-radio>
                  <el-radio label="2">是</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="6" offset="2">
              <el-form-item label="ATC编码：" labelWidth="170px">
                <el-input v-model="form.telephone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="20">
              <el-form-item label="新编药物医学分类：" labelWidth="170px">
                <el-input v-model="form.telephone" style="width: 22%"></el-input>
                <el-input v-model="form.telephone" style="width: 22%"></el-input>
                <el-input v-model="form.telephone" style="width: 22%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="" labelWidth="170px">
                <el-input v-model="form.telephone" style="width: 22%"></el-input>
                <el-input v-model="form.telephone" style="width: 22%"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="15">
              <el-form-item label="备注：" prop="name" labelWidth="170px">
                <el-input
                  type="textarea" :rows="4" v-model="textarea">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="22">
              <el-form-item labelWidth="170px">
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button>返回</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  import ElCol from "element-ui/packages/col/src/col";
  export default {
    components: {ElCol},
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

