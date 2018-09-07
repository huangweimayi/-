<template>
  <div>
    <!--新增弹框-->
    <el-dialog title="新增" :visible.sync="addInfo.isShow" width="665px" :before-close="handleClose">
      <el-form class="two-cup-table" :inline="true" label-width="100px" label-position="right">
        <el-form-item label="项目编号">
          <el-input v-model="addInfo.projectNo"></el-input>
        </el-form-item>
        <el-form-item label="合同编号">
          <el-input v-model="saveInfo.contractNo"></el-input>
        </el-form-item>
        <el-form-item label="服务商账号">
          <el-autocomplete
            v-model="accountNo"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入服务商账号"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="服务商名称">
          <el-input v-model="saveInfo.contact" :readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="saveInfo.mobileNumber" :readonly="readonly"></el-input>
        </el-form-item>
        <!--<el-form-item label="服务类型">
          <el-select placeholder="请选择服务类型" v-model="saveInfo.userId">
            <el-option
              v-for="item in userType"
              :key="item.id"
              :label="item.name"
              :value="item.val">
            </el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item label="合同金额">
          <el-input v-model="saveInfo.amount"></el-input>
        </el-form-item>
        <el-form-item label="保证金额">
          <el-input v-model="saveInfo.deposit"></el-input>
        </el-form-item>
        <el-form-item label="上传合同" class="full">
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
        <el-button @click="addInfo.isShow = false">取 消</el-button>
        <el-button type="primary" @click="sureAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
  import projectApi from '@/api/project'
  import COMMON from '@/utils/commonFun'

  export default {
    name: 'addList',
    props: ['addInfo'],
    data() {
      return {
        readonly: true,
        accountNo: '',
        userType: [],
        uploadUrl: process.env.BASE_API + '/upload',
        imgList: [],
        saveInfo: {
          amount: '',
          contact: '',
          contractNo: '',
          deposit: '',
          mobileNumber: '',
          projectId: this.addInfo.id,
          urls: [],
          userId: ''
        },
        timeout: null,
        selectData: []
      }
    },
    watch: {
      'addInfo.isShow'(n, o) {
        if (!n) {
          this.clearInfo()
        }
      }
    },
    methods: {
      // 服务商账号下拉
      querySearchAsync(queryString, cb) {
        projectApi.getServiceProvider({ accountNo: queryString }).then((res) => {
          let result = []
          if (res.data) {
            let obj = {}
            obj.value = res.data.userTypeDesp
            obj.city = res.data.city
            obj.country = res.data.country
            obj.id = res.data.id
            obj.mobileNo = res.data.mobileNo
            obj.province = res.data.province
            obj.realName = res.data.realName
            obj.userType = res.data.userType
            result.push(obj)
          } else {
            result.push({
              uuid: '-1',
              value: '未搜索到结果！'
            })
          }
          clearTimeout(this.timeout)
          this.timeout = setTimeout(() => {
            cb(result)
          }, 100 * Math.random())
        }).catch(_ => {})
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
        }
      },
      handleSelect(item) {
        this.saveInfo.contact = item.value
        this.saveInfo.userId = item.id
        this.saveInfo.mobileNumber = item.mobileNo
      },
      // 确认新增
      sureAdd() {
        for (let i = 0, l = this.imgList.length; i < l; i++) {
          this.saveInfo.urls.push(this.imgList[i].response.data.path)
        }
        projectApi.serviceContractInsert(this.saveInfo).then(res => {
          COMMON.tipSuccess()
          this.addInfo.isShow = false
          this.$emit('sureAdd')
        })
      },
      handleRemove(file, fileList) {
        this.imgList = fileList
      },
      handleChange(file, fileList) {
        this.imgList = fileList
      },
      // 清空弹窗数据
      clearInfo() {
        this.imgList = []
        this.saveInfo = {
          amount: '',
          contact: '',
          contractNo: '',
          deposit: '',
          mobileNumber: '',
          projectId: this.addInfo.projectNo,
          urls: [],
          userId: ''
        }
      },
      // 关闭弹窗
      handleClose() {
        this.clearInfo()
        this.addInfo.isShow = false
      }
    },
    created() {
      let that = this
      COMMON.getDictionary({ 'parentTag': 'USER_TYPE' }).then(function(res) {
        that.userType = res
      })
    }
  }
</script>

<style scoped>

</style>
