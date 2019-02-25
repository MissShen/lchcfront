<template>
  <!-- 表格 -->
  <div class="tablebox">
    <div class="tabs-panel">
      <span class="active">个人资料</span>
    </div>
    <br/>
    <div class="left-part">
      <!--<div class="avatar item" :style="infoImage">
      </div>-->
      <img :src="userImage" class="avatar item" id="userPhoto">
      <p class="user-name item">{{dataForm.userCode}}</p>
      <p class="role-name item">{{dataForm.userName}}</p>
      <el-upload :action="action+dataForm.id"
                 :headers="headers"
                 :on-success="handleAvatarSuccess"
                 :show-file-list="false"
                 class="upload-btn item"
                 :before-upload="beforeAvatarUpload">
        <el-button size="small" type="primary" plain>上传头像</el-button>
      </el-upload>
    </div>
    <div class="right-part">
      <div class="info-title">个人信息</div>
      <div :style="infoContent">
        <el-form ref="dataForm"
                 label-width="100px"
                 label-position="left"
        >
          <el-row>
            <el-col :span="10" :offset="1">
              <el-form-item label="机构名称：">
                <span>{{dataForm.orgName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
              <el-form-item label="机构性质：">
                 <span v-for="orgType in userOrgType(dataForm.accountType)"
                       :key="orgType.value"
                 >
                {{orgType.label}}
              </span>
              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
              <el-form-item label="职位：">
                <span>{{dataForm.position}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
              <el-form-item label="手机号：">
                <span>{{dataForm.mobile}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
              <el-form-item label="电话：">
                <span>{{dataForm.telephone}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
              <el-form-item label="Email：">
                <span>{{dataForm.eMail}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
              <el-form-item label="KEY码：">
                <span>{{dataForm.userCaKey}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {userInfo, userPhoto} from "../../../axios/management/authority/sysUser";
  import {enumOrgTypeList} from "src/axios/common/common";
  import {message} from "src/axios/interceptor"

  export default {
    name: "user-info",
    computed: {
      ...mapGetters([
        'userImage',
      ]),
    },
    data() {
      return {
        dataForm: '',
        imageUrl: '',
        enumOrgType: [],
        infoContent: {
          paddingBottom: ' 40px',
          // background: 'url(' + require('../../../assets/bg/banner.png') + ') no-repeat right bottom',
        },
        infoImage: {
          paddingBottom: ' 40px',
          // background: 'url(' + require('../../../assets/bg/infoImage.gif') + ') no-repeat right bottom',
        },
        headers: {Authorization: sessionStorage.getItem('token')},
        action: "/management/user/uploadPhoto/"
      }
    },
    created() {
      userInfo().then(res => {
        this.dataForm = res.data
        // this.infoImage.background = 'url(' + require('../../../' + this.dataForm.photo.substring(3)) + ') no-repeat right bottom'
      }).then(() => {
        enumOrgTypeList().then(res => {
          this.enumOrgType = res.data
        })
      })
    },
    methods: {
      userOrgType(accountType) {
        let orgTypeNewList = [];
        this.enumOrgType.map(item => {
          if (accountType) {
            accountType.split('').forEach(
              itemValue => {
                if (itemValue === item.value) {
                  orgTypeNewList.push(item);
                }
              }
            )
          }
        });
        return orgTypeNewList;
      },
      handleAvatarSuccess(res, file) {
        if (res && res.code !== '200') {
          message("上传头像失败", "error")
        } else {
          message("上传头像成功", "success")
          this.$store.dispatch('getPhoto', URL.createObjectURL(file.raw))
        }

      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
    }
  }
</script>

<style scoped>
  .left-part {
    float: left;
    width: 270px;
    padding-top: 30px;
    box-sizing: border-box;
    line-height: 24px;
  }

  .right-part {
    height: 100%;
    margin-left: 270px;
    border-left: 1px solid #ddd;
  }

  .info-title {
    padding: 20px;
    border-bottom: 1px solid #ddd;
    font-size: 16px;
    line-height: 16px;
  }

  .left-part .item {
    display: block;
    margin: 0 auto 20px;
    text-align: center;
  }

  .left-part .avatar {
    width: 110px;
    height: 110px;
    border-radius: 50%;
  }
</style>
