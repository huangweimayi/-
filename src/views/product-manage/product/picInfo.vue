<template>
  <div>
    <!--新增弹框-->
    <el-dialog
      title="图片管理"
      :visible.sync="picInformation.isShow"
      @open="openDia"
      width="665px">
      <el-form label-width="0px" label-position="right">
        <h4 class="mb_20">基本信息</h4>
        <div class="mb_20">
          <span style="margin-right: 40px">产品名称：{{picInformation.productName}}</span>
          <span>供应商名称：{{picInformation.userName}}</span>
        </div>
        <h4 class="mb_20">图片信息</h4>
        <el-form-item>
          <el-upload
            :action="uploadUrl"
            list-type="picture-card"
            :file-list="imgList"
            :on-change="handleChange"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sureAdd">保 存</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
  import goodsApi from '@/api/goods'
  import COMMON from '@/utils/commonFun'

  export default {
    name: 'picInfo',
    props: ['picInformation'],
    watch: {
      'picInformation.isShow'(n, o) {
        if (!n) {
          this.picData = {
            id: '',
            urls: []
          }
          this.imgList = []
        }
      }
    },
    data() {
      return {
        imgList: [],
        uploadUrl: process.env.BASE_API + '/upload',
        picData: {
          id: '',
          urls: []
        }
      }
    },
    methods: {
      // 弹窗打开的回调
      openDia() {
        if (this.picInformation.id) {
          this.getDetail()
        }
      },
      // 获取图片列表
      getDetail() {
        goodsApi.productImgList(this.picInformation.id).then(res => {
          this.imgList = res.data
        })
      },
      // 新增
      sureAdd() {
        console.log(this.imgList)
        for (let i = 0, l = this.imgList.length; i < l; i++) {
          if (!this.imgList[i].id && this.imgList[i].response.code === '200') {
            this.picData.urls.push(this.imgList[i].response.data.path)
          }
        }
        this.picData.id = this.picInformation.id
        COMMON.setHeader(1)
        goodsApi.addProductImg(this.picData.id, JSON.stringify(this.picData.urls)).then(res => {
          this.picInformation.isShow = false
          this.$emit('sureAddPic')
        })
      },
      handleRemove(file, fileList) {
        if (file.id) {
          this.productImgDelete(file.id, fileList)
        }
      },
      handleChange(file, fileList) {
        this.imgList = fileList
      },
      // 删除图片
      productImgDelete(id, fileList) {
        goodsApi.productImgDelete(id).then(res => {
          this.imgList = fileList
        })
      }

    },
    created() {

    }
  }
</script>

