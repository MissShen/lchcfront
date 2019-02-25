<template>
  <div class="tablebox">
    <el-form ref="form" :model="form" label-width="150px">
      <price-basics></price-basics>
      <el-row :gutter="24">
        <el-row :gutter="24">
          <el-col :span="4"></el-col>
          <el-col :span="20">
            <el-radio-group v-model="vadio">
              <el-radio label="0">全国最低中标价</el-radio>
              <el-radio label="1">计算价格</el-radio>
              <el-radio label="2">无最低中标价</el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-row :gutter="24">
              <el-col :span="10">
                <el-form-item label="年度:">
                  <span></span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item>
                  <el-checkbox v-model="year">变更</el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="24">
                <div v-if="year">
                  <el-form-item>
                    <div v-if="viewFlag.viewFlag==1">
                      <el-row :gutter="24">
                        <el-col :span="13">
                          <el-select placeholder="请选择">
                          </el-select>
                        </el-col>
                      </el-row>
                    </div>
                    <div v-if="viewFlag.viewFlag==2">
                      <el-row :gutter="24">
                        <el-col :span="13">
                          <el-input></el-input>
                        </el-col>
                        <el-col :span="2">
                          <el-upload
                            class="upload-demo"
                            action=""
                            multiple
                            :limit="3"
                            :file-list="fileList">
                            <el-button size="small" type="primary">上传</el-button>
                          </el-upload>
                        </el-col>
                      </el-row>
                    </div>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row :gutter="24">
              <el-col :span="10">
                <el-form-item label="省份">
                  <span></span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item>
                  <el-checkbox v-model="province">变更</el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="24">
                <div v-if="province">
                  <el-form-item>
                    <div v-if="viewFlag.viewFlag==1">
                      <el-row :gutter="24">
                        <el-col :span="13">
                          <el-select placeholder="请选择">
                          </el-select>
                        </el-col>
                      </el-row>
                    </div>
                    <div v-if="viewFlag.viewFlag==2">
                      <el-row :gutter="24">
                        <el-col :span="13">
                          <el-input></el-input>
                        </el-col>
                        <el-col :span="2">
                          <el-upload
                            class="upload-demo"
                            action=""
                            multiple
                            :limit="3"
                            :file-list="fileList">
                            <el-button size="small" type="primary">上传</el-button>
                          </el-upload>
                        </el-col>
                      </el-row>
                    </div>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-row :gutter="24">
              <el-col :span="10">
                <el-form-item label="项目名称:">
                  <span></span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item>
                  <el-checkbox v-model="objectName">变更</el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="24">
                <div v-if="objectName">
                  <el-form-item>
                    <div v-if="viewFlag.viewFlag==1">
                      <el-row :gutter="24">
                        <el-col :span="13">
                          <el-select placeholder="请选择">
                          </el-select>
                        </el-col>
                      </el-row>
                    </div>
                    <div v-if="viewFlag.viewFlag==2">
                      <el-row :gutter="24">
                        <el-col :span="13">
                          <el-input></el-input>
                        </el-col>
                        <el-col :span="2">
                          <el-upload
                            class="upload-demo"
                            action=""
                            multiple
                            :limit="3"
                            :file-list="fileList">
                            <el-button size="small" type="primary">上传</el-button>
                          </el-upload>
                        </el-col>
                      </el-row>
                    </div>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row :gutter="24">
              <el-col :span="10">
                <el-form-item label="中标价:">
                  <span></span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item>
                  <el-checkbox v-model="bidPrice">变更</el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="24">
                <div v-if="bidPrice">
                  <el-form-item>
                    <div v-if="viewFlag.viewFlag==1">
                      <el-row :gutter="24">
                        <el-col :span="13">
                          <el-select placeholder="请选择">
                          </el-select>
                        </el-col>
                      </el-row>
                    </div>
                    <div v-if="viewFlag.viewFlag==2">
                      <el-row :gutter="24">
                        <el-col :span="13">
                          <el-input></el-input>
                        </el-col>
                        <el-col :span="2">
                          <el-upload
                            class="upload-demo"
                            action=""
                            multiple
                            :limit="3"
                            :file-list="fileList">
                            <el-button size="small" type="primary">上传</el-button>
                          </el-upload>
                        </el-col>
                      </el-row>
                    </div>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-row :gutter="24">
              <el-col :span="10">
                <el-form-item label="执行日期">
                  <span></span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item>
                  <el-checkbox v-model="executeDate">变更</el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="24">
                <div v-if="executeDate">
                  <el-form-item>
                    <div v-if="viewFlag.viewFlag==1">
                      <el-row :gutter="24">
                        <el-col :span="13">
                          <el-select placeholder="请选择">
                          </el-select>
                        </el-col>
                      </el-row>
                    </div>
                    <div v-if="viewFlag.viewFlag==2">
                      <el-row :gutter="24">
                        <el-col :span="13">
                          <el-input></el-input>
                        </el-col>
                        <el-col :span="2">
                          <el-upload
                            class="upload-demo"
                            action=""
                            multiple
                            :limit="3"
                            :file-list="fileList">
                            <el-button size="small" type="primary">上传</el-button>
                          </el-upload>
                        </el-col>
                      </el-row>
                    </div>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-row>

    </el-form>
  </div>
</template>

<script>
  import priceBasics from 'src/pages/auditchanges/common/priceDetailCommon/priceBasics'

  export default {
    name: "price-checkbox-common",
    components: {
      priceBasics
    },
    data() {
      return {
        province: undefined,
        objectName: undefined,
        year: undefined,
        executeDate: undefined,
        bidPrice: undefined,
        fileList: [],
        form: {},
        vadio: '0',
      }
    },
    methods: {
      mataData(req) {
        this.viewFlag = req;
      },
    }
  }
</script>

<style scoped>

</style>
