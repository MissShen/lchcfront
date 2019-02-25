<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tablebox">
      <div class="width-600">
        <el-form :model="form" ref="form" :rules="rules" label-position="left" label-width="180px" class=""
                 size="small">
            <el-form-item label="通用名称" prop="catDrug.nameChn">
                  <el-input v-model="form.catDrug.nameChn" readonly="true" class="width-380"></el-input>
                  <a @click="aliasView()" class="blue">选择</a>
            </el-form-item>

          <el-form-item label="英文名称" prop="catDrug.nameEng">
            <el-input v-model="form.catDrug.nameEng"></el-input>
          </el-form-item>
          <el-form-item label="商品名称">
            <el-input v-model="form.catProduct.tradeName" readonly="true"></el-input>
          </el-form-item>
          <el-form-item label="汉语拼音">
            <el-input v-model="form.catDrug.spellAbbr" readonly="true"></el-input>
          </el-form-item>
          <el-form-item label="企业名称">
            <el-input v-model="form.catOrg.name" readonly="true"></el-input>
          </el-form-item>
            <el-form-item label="关联产品">
                  <el-input v-model="form.productCount" readonly="true" class="width-380"></el-input>
                  <a @click="assoProductsView()" class="blue">选择</a>
            </el-form-item>

          <el-form-item label="规格">
            <el-input v-model="form.catDrug.spec" readonly="true"></el-input>
          </el-form-item>
          <el-form-item label="批准文号">
            <el-input v-model="form.catProduct.permitNumber"></el-input>
          </el-form-item>

          <div>
            <el-form-item label="成分" prop="catManual.component">
              <el-input type="textarea" v-model="form.catManual.component"></el-input>
            </el-form-item>
            <el-form-item label="性状" prop="catManual.traits">
              <el-input type="textarea" v-model="form.catManual.traits"></el-input>
            </el-form-item>

            <el-row :gutter="24" class="marbottom15">
              <el-col >
                <div class="grid-content bg-purple">
                  <el-form-item prop="content">
                    <el-select class="select-color" slot="label" v-model="form.flag" size="small">
                      <el-option label="适应症" value="0"></el-option>
                      <el-option label="功能与主治" value="1"></el-option>
                    </el-select>
                    <el-input  type="textarea" v-model="form.content"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>

            <el-form-item label="用法用量" class="drug-instruct-editor">
              <n-editor v-model="form.catManual.usageDosage" :config="config"/>
            </el-form-item>
            <el-form-item label="不良反应" prop="catManual.adverseReaction">
              <el-input type="textarea" v-model="form.catManual.adverseReaction"></el-input>
            </el-form-item>
            <el-form-item label="禁忌" prop="catManual.taboo">
              <el-input type="textarea" v-model="form.catManual.taboo"></el-input>
            </el-form-item>
            <el-form-item label="注意事项" prop="catManual.attentionMatter">
              <el-input type="textarea" v-model="form.catManual.attentionMatter"></el-input>
            </el-form-item>
            <el-form-item label="药物相互作用" prop="catManual.drugInteraction">
              <el-input type="textarea" v-model="form.catManual.drugInteraction"></el-input>
            </el-form-item>
            <el-form-item label="药物过量" prop="catManual.drugOverdose">
              <el-input type="textarea" v-model="form.catManual.drugOverdose"></el-input>
            </el-form-item>
            <el-form-item label="药物毒理" prop="catManual.pharmacologyToxicology">
              <el-input type="textarea" v-model="form.catManual.pharmacologyToxicology"></el-input>
            </el-form-item>
            <el-form-item label="药代动力学" prop="catManual.pharmacokinetics">
              <el-input type="textarea" v-model="form.catManual.pharmacokinetics"></el-input>
            </el-form-item>
          </div>
          <el-form-item label="贮藏" prop="catManual.drugStorage">
            <el-input v-model="form.catManual.drugStorage"></el-input>
          </el-form-item>
          <el-form-item label="包装" prop="catManual.wrap">
            <el-input v-model="form.catManual.wrap"></el-input>
          </el-form-item>
          <el-form-item label="有效期">
            <el-input v-model="form.catManual.validDate"></el-input>
          </el-form-item>
          <div>
            <el-form-item label="执行标准" prop="catManual.executionStandard">
              <el-input type="textarea" v-model="form.catManual.executionStandard"></el-input>
            </el-form-item>
            <el-form-item label="生产地址" prop="catManual.address">
              <el-input type="textarea" v-model="form.catManual.address"></el-input>
            </el-form-item>
            <el-form-item label="注册地址" prop="catManual.registerAddress">
              <el-input type="textarea" v-model="form.catManual.registerAddress"></el-input>
            </el-form-item>
          </div>
          <el-form-item label="是否特殊人群用药">
            <el-radio-group v-model="form.catManual.specialFlag">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="孕妇及哺乳期妇女用药" v-if="form.catManual.specialFlag==1" prop="catManual.gravidaMedicine">
            <el-input v-model="form.catManual.gravidaMedicine">
            </el-input>
          </el-form-item>
          <el-form-item label="儿童用药" v-if="form.catManual.specialFlag==1" prop="catManual.childrenMedicine">
            <el-input v-model="form.catManual.childrenMedicine">
            </el-input>
          </el-form-item>
          <el-form-item label="老年用药" v-if="form.catManual.specialFlag==1" prop="catManual.geriatricMedicine">
            <el-input v-model="form.catManual.geriatricMedicine">
            </el-input>
          </el-form-item>
          <el-form-item label="是否委托加工">
            <el-radio-group v-model="form.catManual.consignFlag">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="受托方企业名称" v-if="form.catManual.consignFlag==1">
            <el-input v-model="form.catManual.entrustedManufactureName">
            </el-input>
          </el-form-item>
          <el-form-item label="受托方生产地址" v-if="form.catManual.consignFlag==1">
            <el-input v-model="form.catManual.entrustedAddress">
            </el-input>
          </el-form-item>
          <el-form-item label="是否有分装企业">
            <el-radio-group v-model="form.catManual.packOrgFlag">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="实际生产企业" v-if="form.catManual.packOrgFlag==1">
            <el-input v-model="form.catManual.actualManufacture">
            </el-input>
          </el-form-item>
          <el-form-item label="分装企业名称" v-if="form.catManual.packOrgFlag==1">
            <el-input v-model="form.catManual.packManufactureName">
            </el-input>
          </el-form-item>
          <el-form-item label="分装企业地址" v-if="form.catManual.packOrgFlag==1">
            <el-input v-model="form.catManual.packAddress">
            </el-input>
          </el-form-item>
          <div>
            <el-form-item label="备注" prop="catManual.remark">
              <el-input type="textarea" v-model="form.catManual.remark"></el-input>
            </el-form-item>
          </div>
          <el-form-item label="邮政编码">
            <el-input v-model="form.catManual.postCode"></el-input>
          </el-form-item>
          <el-form-item label="电话号码">
            <el-input v-model="form.catManual.tel"></el-input>
          </el-form-item>
          <el-form-item label="传真号码">
            <el-input v-model="form.catManual.fax"></el-input>
          </el-form-item>
          <el-form-item label="网址">
            <el-input v-model="form.catManual.website"></el-input>
          </el-form-item>
          <el-form-item label="服务热线">
            <el-input v-model="form.catManual.serviceHotline"></el-input>
          </el-form-item>
          <el-form-item label="核准日期">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.catManual.approvalDate"
                            style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="说明书修订日期">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.manualRevisionDate"
                            style="width: 100%;"></el-date-picker>
          </el-form-item>
            <el-form-item>
              <el-button size="small" type="primary" @click="submitForm('form')">提交</el-button>
              <el-button size="small" @click="goBack">返回</el-button>
            </el-form-item>
        </el-form>
      </div>
    </div>
    <alias v-if="aliasVisible" ref="Alias" @buttonForm="buttonForm"></alias>
    <not-asso-products v-if="showVisible" ref="NotAssoProducts" @chooseProducts="chooseProducts"></not-asso-products>
  </div>
</template>
<script>
  import ElCol from "element-ui/packages/col/src/col";
  import Alias from "./windowPanel/alias";
  import NotAssoProducts from "./windowPanel/notAssoProducts";
  import {add} from 'src/axios/datacenter/basedata/manual/manual'
  import NEditor from 'src/components/n-editor/n-editor';
  import {changeToBite,isEnglish} from 'src/utils/validateUtil'
  export default {
    components: {
      NEditor,
      NotAssoProducts,
      Alias,
      ElCol
    },
    data() {
      let checkNameEng = (rule, value, callback) => {
        if(value){
          if(changeToBite(value) > 300){
            callback(new Error('输入英文名称不超过300字节'))
          }else{
            let valueTemp = value;
            valueTemp =  valueTemp.replace(/\s/g,"");
            if(!isEnglish(valueTemp)){
              callback(new Error('请输入正确格式英文名称'))
            }else{
              callback()
            }
          }
        }else{
          callback()
        }
      }
      let checkLength = (rule, value, callback) => {
        if(value){
          if(changeToBite(value) > 4000){
            callback(new Error('输入不超过4000字节'))
          }else{
            callback()
          }
        }else{
          callback()
        }
      }
      let checkLength2 = (rule, value, callback) => {
        if(value){
          if(changeToBite(value) > 1000){
            callback(new Error('输入不超过1000字节'))
          }else{
            callback()
          }
        }else{
          callback()
        }
      }
      let checkLength3 = (rule, value, callback) => {
        if(value){
          if(changeToBite(value) > 100){
            callback(new Error('输入不超过100字节'))
          }else{
            callback()
          }
        }else{
          callback()
        }
      }
      return {
        aliasVisible: false,
        showVisible: false,
        form: {
          ids: '',
          name: '',
          productId: '',
          productCount: '',
          manualRevisionDate: undefined,
          flag: '0',
          content: '',
          catOrg: {},
          catDrug: {},
          catProduct: {},
          catManual: {
            'component': '',
            'traits': '',
            'indication': '',
            'attending': '',
            'usageDosage': '',
            'adverseReaction': '',
            'taboo': '',
            'attentionMatter': '',
            'drugInteraction': '',
            'drugOverdose': '',
            'permitNumber': '',
            'pharmacologyToxicology': '',
            'pharmacokinetics': '',
            'drugStorage': '',
            'wrap': '',
            'validDate': '',
            'executionStandard': '',
            'address': '',
            'registerAddress': '',
            'specialFlag': '0',
            'gravidaMedicine': '',
            'childrenMedicine': '',
            'geriatricMedicine': '',
            'consignFlag': '0',
            'entrustedManufactureName': '',
            'entrustedAddress': '',
            'packOrgFlag': '0',
            'actualManufacture': '',
            'packManufactureName': '',
            'packAddress': '',
            'remark': '',
            'postCode': '',
            'tel': '',
            'fax': '',
            'website': '',
            'serviceHotline': '',
            'approvalDate': undefined
          }
        },
        rules: {
          'catDrug.nameChn': {required: true, message: '必填项不能为空', trigger: 'blur'},
          'catDrug.nameEng':{required: false, validator:checkNameEng, trigger: 'blur'},
          'catManual.component':{required: false, validator:checkLength, trigger: 'blur'},
          'catManual.traits':{required: false, validator:checkLength, trigger: 'blur'},
          'content':{required: false, validator:checkLength, trigger: 'blur'},//  适应症输入验证(待解决)
          'catManual.adverseReaction':{required: false, validator:checkLength, trigger: 'blur'},
          'catManual.taboo':{required: false, validator:checkLength, trigger: 'blur'},
          'catManual.attentionMatter':{required: false, validator:checkLength, trigger: 'blur'},
          'catManual.drugInteraction':{required: false, validator:checkLength, trigger: 'blur'},
          'catManual.drugOverdose':{required: false, validator:checkLength, trigger: 'blur'},
          'catManual.pharmacologyToxicology':{required: false, validator:checkLength, trigger: 'blur'},
          'catManual.pharmacokinetics':{required: false, validator:checkLength, trigger: 'blur'},
          'catManual.drugStorage':{required: false, validator:checkLength, trigger: 'blur'},
          'catManual.wrap':{required: false, validator:checkLength, trigger: 'blur'},
          'catManual.executionStandard':{required: false, validator:checkLength2, trigger: 'blur'},
          'catManual.address':{required: false, validator:checkLength3, trigger: 'blur'},
          'catManual.registerAddress':{required: false, validator:checkLength3, trigger: 'blur'},
          'catManual.gravidaMedicine':{required: false, validator:checkLength, trigger: 'blur'},
          'catManual.childrenMedicine':{required: false, validator:checkLength, trigger: 'blur'},
          'catManual.geriatricMedicine':{required: false, validator:checkLength, trigger: 'blur'},
          'catManual.remark':{required: false, validator:checkLength2, trigger: 'blur'},
        },
        config: {
          UEDITOR_HOME_URL: "../../../../static/n-editor/",
          toolbars:
            [['fullscreen',    // 全屏
              'source',        // 源码
              'undo',          // 撤销
              'redo',          // 重做
              'bold',          // 加粗
              "italic",        // 斜体
              "underline",     // 下划线
              "indent", //首行缩进
              "justifyleft", //左对齐
              "justifycenter", //居中对齐
              "justifyright", //右对齐
              "justifyjustify",//两端对齐
              "anchor",   // 锚点
              "fontborder",    // 字符边框
              "strikethrough", // 删除线
              "removeformat",  // 清除格式
              "pasteplain",    // 纯文本
              "forecolor",      // 字体颜色
              "insertorderedlist",    // 有序列表
              "insertunorderedlist", // 无序列表
              "searchreplace", // 查找替换
              "paragraph",   // 段落格式
              "fontfamily", // 字体类型
              "fontsize", //字体大小
              "link",  //链接
              "unlink", // 取消链接
              "horizontal", //分割线
              "date",   //日期
              "time", //时间
              "inserttable", //插入表格
              "spechars", // 特殊字符
            ]],
          sourceEditor: "codemirror",
          initialFrameWidth: '100%',
          initialFrameHeight: 320,
          autoHeightEnabled:false,
          autoFloatEnabled: true,
          enableDragUpload: true,   // 启用拖拽上传
          enablePasteUpload: true,  // 启用粘贴上传
          imageScaleEnabled: true,  // 启用 图片拉伸缩放
          elementPathEnabled: false, // 关闭元素路径
          catchRemoteImageEnable: true, // 开启远程抓取图片
          allHtmlEnabled: true, //提交附带html字符串
          maximumWords:4000
        },
      }
    },
    methods: {
      submitForm(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            add(this.form).then(res => {
              this.$message({
                message: res.data,
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.goBack();
                }
              })
            })
          } else {
            return false;
          }
        });
      },
      goBack() {
        this.$router.go(-1);
      },

      //通用名称加载页面
      aliasView() {
        this.aliasVisible = true;
        this.$nextTick(() => {
          this.$refs.Alias.initWindow('');
        })
      },

      //通用名称数据同步主页面
      buttonForm(data) {
        this.form.catDrug = data.value.catDrug;
        this.form.catProduct = data.value.catProduct;
        this.form.catOrg = data.value.catOrg;
        this.form.productId = data.value.catProduct.id
      },

      //选择关联产品
      assoProductsView() {
        if (this.form.catDrug.nameChn == "" || this.form.catDrug.nameChn == undefined) {
          this.$alert('请先选择通用名称', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false
        }
        this.showVisible = true;
        this.$nextTick(() => {
          //根据选择企业名称和选择的产品ID加载剩余全部产品
          this.$refs.NotAssoProducts.fillData(this.form.catOrg.name, this.form.productId, false);
        })
      },

      //选择关联产品后同步子页面数据方法
      chooseProducts(data) {
        this.form.productCount = data.value.length;
        var idArr=[];
        for (var i = 0; i < data.value.length; i++) {
          idArr.push(data.value[i].catProduct.id)
        }
        this.form.ids = idArr.toString();
      }
    }
  }
</script>
<style>
  @import "../../../../assets/css/datacenter.css";
</style>
