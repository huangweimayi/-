<template>
  <div>
    <!--新增弹框-->
    <el-dialog
      :title="costData.title"
      @open="openDia"
      :visible.sync="costData.isShow"
      width="665px"
      :before-close="handleClose">
      <el-form :model="detailInfo" :rules="rules" ref="detailInfo" class="two-cup-table" :inline="true" label-width="100px" label-position="right">
        <el-form-item label="项目编号">
          <el-input v-model="costData.projectNo" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="合同编号" prop="contractNo">
          <el-input :readonly="isDetail" v-model="detailInfo.contractNo"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="contact">
          <el-input v-model="detailInfo.contact" :readonly="isDetail"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="mobileNumber">
          <el-input v-model="detailInfo.mobileNumber" :readonly="isDetail"></el-input>
        </el-form-item>
        <el-form-item label="合同金额" prop="amount">
          <el-input v-model="detailInfo.amount" :readonly="isDetail"></el-input>
        </el-form-item>
        <br/>
        <el-form-item label="上传合同" class="full">
          <el-upload
            :action="uploadUrl"
            :disabled="isDetail"
            list-type="picture-card"
            :file-list="images"
            :on-change="handleChange"
            :before-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="sureAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
  import projectApi from '@/api/project'
  import COMMON from '@/utils/commonFun'
  import { validatTelephone } from '@/utils/validate'

  export default {
    name: 'costInfo',
    props: ['costData'],
    data() {
      return {
        detailInfo: {},
        saveInfo: {
          urls: []
        },
        rules: {
          contractNo: [
            { required: true, message: '请输入合同编号', trigger: 'blur' }
          ],
          contact: [
            { required: true, message: '请输入联系人', trigger: 'blur' }
          ],
          mobileNumber: [
            { required: true, message: '请输入联系电话', trigger: 'blur' }
          ],
          amount: [
            { required: true, message: '请输入合同金额', trigger: 'blur' },
            { type: 'number', min: '0', message: '合同金额必须为数字' }
          ]
        },
        isDetail: false,
        images: [],
        uploadUrl: process.env.BASE_API + '/upload'
      }
    },
    methods: {
      // 弹窗打开的回调
      openDia() {
        this.getDetail()
      },
      // 获取合同详情
      getDetail() {
        projectApi.getCustomerContract({ projectId: this.costData.id }).then(res => {
          this.detailInfo = res.data
          this.images = []
          this.isDetail = res.data.id ? true : false
          if (!this.isDetail) {
            this.getUser()
          } else {
            for (let i = 0, l = res.data.images.length; i < l; i++) {
              this.images.push(
                { id: res.data.images[i].id, url: res.data.images[i].visitUrl }
              )
            }
          }
        })
      },
      // 获取用户信息
      getUser() {
        projectApi.getCustomer({ id: this.costData.userId }).then(res => {
          this.detailInfo.contact = res.data.nickName
          this.detailInfo.mobileNumber = res.data.mobileNo
        })
      },
      // 确认新增
      sureAdd() {
        if (!this.isDetail) {
          this.closeDia()
        } else {
          let isCheck = false
          this.$refs['detailInfo'].validate((valid) => {
            if (valid) {
              if (validatTelephone(this.detailInfo.mobileNumber) && this.images.length > 0) {
                isCheck = true
              } else {
                isCheck = false
              }
            } else {
              isCheck = false
              return false
            }
            if (isCheck) {
              for (let i = 0, l = this.images.length; i < l; i++) {
                this.saveInfo.urls.push(this.images[i].response.data.path)
              }
              this.saveInfo.amount = this.detailInfo.amount
              this.saveInfo.contact = this.detailInfo.contact
              this.saveInfo.contractNo = this.detailInfo.contractNo
              this.saveInfo.mobileNumber = this.detailInfo.mobileNumber
              this.saveInfo.projectId = this.costData.id
              this.saveInfo.userId = this.costData.userId
              projectApi.insertContract(this.saveInfo).then(res => {
                this.closeDia()
                this.$emit('sureAdd')
              })
            } else {
              COMMON.tip('信息不完整！', 'error')
            }
          })
        }
      },
      // 关闭弹窗
      closeDia() {
        this.$emit('sureAdd')
        this.costData.isShow = false
      },
      handleChange(file, fileList) {
        this.images = fileList
      },
      // 图片移除
      handleRemove() {
        if (!this.isDetail) {
          return false
        }
      },
      // 关闭弹窗
      handleClose() {
        this.detailInfo = {}
        this.saveInfo = {
          urls: []
        }
        this.isDetail = false
        this.images = []
        this.costData.isShow = false
      }
    }
  }
</script>

