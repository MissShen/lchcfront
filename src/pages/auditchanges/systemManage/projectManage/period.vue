<template>
    <div class="tablebox">
      <div>
        <hr/>
        <h3>申报流程设置</h3>
        <el-row :gutter="24">
          <el-form-item label="审核流程设置"
                        v-for="(domain,index) in auditForm.domains"
                        :key="index">
            <el-row :gutter="24">
              <el-col :span="3">
                <el-select v-model="domain.flowPathValue" placeholder="请选择">
                  <el-option
                    v-for="item in flowPath"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="15">
                <div v-if="domain.flowPathValue==1">
                  <el-row :gutter="24">
                    <el-col :span="10">
                      <el-input placeholder="请输入">
                        <template slot="prepend">时长</template>
                        <template slot="append">工作日</template>
                      </el-input>
                    </el-col>
                    <el-col :span="9">
                      <el-button type="text">公示字段设置</el-button>
                    </el-col>
                  </el-row>
                  <el-row :gutter="24">
                    <el-col :span="4">
                      <el-checkbox>开放质疑</el-checkbox>
                    </el-col>
                    <el-col :span="13">
                      <el-input placeholder="请输入">
                        <template slot="prepend">公示后</template>
                        <template slot="append">个工作日开放</template>
                      </el-input>
                    </el-col>
                  </el-row>
                </div>
                <div v-if="domain.flowPathValue==2">
                  <el-row :gutter="24">
                    <el-col :span="9">
                      <el-input placeholder="请输入">
                        <template slot="prepend">时长</template>
                        <template slot="append">工作日</template>
                      </el-input>
                    </el-col>
                    <el-col :span="13">
                      <el-input placeholder="请输入">
                        <template slot="prepend">上一个节点后</template>
                        <template slot="append">个工作日开放</template>
                      </el-input>
                    </el-col>
                  </el-row>
                </div>
                <div v-if="domain.flowPathValue==3">
                  <el-row :gutter="24">
                    <el-col :span="10">
                      <el-input placeholder="请输入">
                        <template slot="prepend">时长</template>
                        <template slot="append">工作日</template>
                      </el-input>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
              <el-col :span="4">
                <el-button @click.prevent="auditRemoveDomain(domain)">删除</el-button>
                <el-button @click="auditAddDomain">添加</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="10">
            <el-form-item label="企业确认时长">
              <el-input>
                <template slot="append">天</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="10">
            <el-form-item label="挂网日期">
              <el-input>
                <template slot="prepend">每月</template>
                <template slot="append">号</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div>
        <hr/>
        <h3>变更流程设置</h3>
        <el-row :gutter="24">
          <el-form-item label="审核流程设置"
                        v-for="(domain,index) in changeForm.domains"
                        :key="index">
            <el-row :gutter="24">
              <el-col :span="3">
                <el-select v-model="domain.flowPathValue" placeholder="请选择">
                  <el-option
                    v-for="item in flowPath"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="15">
                <div v-if="domain.flowPathValue==1">
                  <el-row :gutter="24">
                    <el-col :span="10">
                      <el-input placeholder="请输入">
                        <template slot="prepend">时长</template>
                        <template slot="append">工作日</template>
                      </el-input>
                    </el-col>
                    <el-col :span="9">
                      <el-button type="text">公示字段设置</el-button>
                    </el-col>
                  </el-row>
                  <el-row :gutter="24">
                    <el-col :span="4">
                      <el-checkbox>开放质疑</el-checkbox>
                    </el-col>
                    <el-col :span="13">
                      <el-input placeholder="请输入">
                        <template slot="prepend">公示后</template>
                        <template slot="append">个工作日开放</template>
                      </el-input>
                    </el-col>
                  </el-row>
                </div>
                <div v-if="domain.flowPathValue==2">
                  <el-cow :gutter="24">
                    <el-col :span="9">
                      <el-input placeholder="请输入">
                        <template slot="prepend">时长</template>
                        <template slot="append">工作日</template>
                      </el-input>
                    </el-col>
                    <el-col :span="13">
                      <el-input placeholder="请输入">
                        <template slot="prepend">上一个节点后</template>
                        <template slot="append">个工作日开放</template>
                      </el-input>
                    </el-col>
                  </el-cow>
                </div>
                <div v-if="domain.flowPathValue==3">
                  <el-row :gutter="24">
                    <el-col :span="10">
                      <el-input placeholder="请输入">
                        <template slot="prepend">时长</template>
                        <template slot="append">工作日</template>
                      </el-input>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
              <el-col :span="4">
                <el-button @click.prevent="changeRemoveDomain(domain)">删除</el-button>
                <el-button @click="changeAddDomain">添加</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="10">
            <el-form-item label="企业确认时长">
              <el-input>
                <template slot="append">天</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="10">
            <el-form-item label="挂网日期">
              <el-input>
                <template slot="prepend">每月</template>
                <template slot="append">号</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </div>
</template>

<script>
    export default {
        name: "period",
      data(){
          return{
            auditForm: {
              domains: [{}]
            },
            changeForm:{
              domains:[{}]
            },
            flowPath: [{
              value: '1',
              label: '公示'
            }, {
              value: '2',
              label: '澄清'
            }, {
              value: '3',
              label: '审核'
            },]
          }
      },
      methods:{
        changeRemoveDomain(item) {
          var index = this.changeForm.domains.indexOf(item)
          if (index !== -1) {
            this.changeForm.domains.splice(index, 1)
          }
        },
        changeAddDomain() {
          this.changeForm.domains.push({
            value: '',
            key: Date.now()
          });
        },
        auditRemoveDomain(item) {
          var index = this.auditForm.domains.indexOf(item)
          if (index !== -1) {
            this.auditForm.domains.splice(index, 1)
          }
        },
        auditAddDomain() {
          this.auditForm.domains.push({
            value: '',
            key: Date.now()
          });
        }
      }
    }
</script>

<style scoped>

</style>
