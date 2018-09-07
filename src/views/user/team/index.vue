<template >
  <div style="padding:40px;" class="decorate">
    <!--头部查询-->
    <div>
      电话号码: &emsp;<el-input v-model="searchData.accountNo" placeholder="请输入" class="decorate-input"></el-input>
      &emsp;类型:&emsp;
      <el-select v-model="searchData.userType"  placeholder="请选择" class="decorate-select">
        <el-option v-for="item in optionsQuery" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      &emsp;&emsp;<el-button type="primary" @click="DecorateteamList">查询</el-button>
      &emsp;<el-button type="primary" @click="decorateAdd()">新增</el-button>
    </div>
    <!--查询列表-->
    <div>
      <el-table :data="tableData" border style="width: 100%" class="decorate-table">
        <el-table-column prop="groupInfo.realName" label="真实姓名" width="180"></el-table-column>
        <el-table-column prop="nickName" label="昵称" width="180"></el-table-column>
        <el-table-column prop="accountNo" label="电话号码" width="180"></el-table-column>
        <el-table-column prop="userType" label="类型" width="180"></el-table-column>
        <el-table-column prop="createTime" label="注册日期" width="180"></el-table-column>
        <el-table-column prop="groupInfo.status" label="认证状态" width="180"></el-table-column>
        <el-table-column prop="account.amount" label="账户余额" width="180"></el-table-column>
        <el-table-column  label="操作">
          <template slot-scope="scope" >
            <el-button class="el-icon-tickets success btn" @click="showDetail(scope.row.id)" title="查看推荐">查看推荐</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-col :span="24" class="toolbar">
        <el-pagination layout="prev,total,pager, next"
                       :page-size="10"
                       @current-change="handleSizeChange"
                       :total="total"
                       style="text-align:center;">
        </el-pagination>
      </el-col>
    </div>

    <!--新增弹框-->
    <el-dialog title="新增" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <form action="">
        <p class="font-weight">基本信息</p>
        <p>
          <span>账&emsp;&emsp;号：<el-input placeholder="请输入内容" v-model="daaList.accountNo" clearable class="decorate-form-input"></el-input></span>
          &emsp;&emsp;
          <span>类&emsp;&emsp;型：
              <el-select v-model="daaList.userType" placeholder="请选择" class="decorate-form-select">
                 <el-option v-for="item in optionsType" :key="item.value" :label="item.label" :value="item.value">
                 </el-option>
              </el-select>
          </span>
        </p>
        <div class="real-name">
          <div class="real-name-left">
            <span>真实姓名：<el-input placeholder="请输入内容" v-model="daaList.realName" clearable class="decorate-form-input"></el-input></span>
          </div>
        </div>
        <p>
          <span>所在区域： <el-cascader :options="optionsProvinces" v-model="provinces" @change="handleChange"></el-cascader></span>
        </p>
        <p>
          <span>详细地址：<el-input placeholder="请输入内容" v-model="daaList.address" clearable class="decorate-form-address"></el-input></span>
        </p>
        <p class="bank-card">银行卡信息</p>
        <p>
          <span>开户银行：<el-input placeholder="请输入内容" v-model="daaList.bankName" clearable class="decorate-form-input"></el-input></span>
          &emsp;&emsp;
          <span>银行账号：<el-input placeholder="请输入内容" v-model="daaList.cardNo" clearable class="decorate-form-input"></el-input></span>
        </p>
        <p>
          <span> &emsp;开户人：<el-input placeholder="请输入内容" v-model="daaList.accountName" clearable class="decorate-form-input"></el-input></span>
          &emsp;&emsp;
          <span>支行名称： <el-cascader :options="optionsBank" v-model="account" @change="handleBank"></el-cascader></span>
        </p>
        <p class="bank-card">认证资料</p>
        <div>
          <el-upload
            :action="uploadUrl"
            list-type="picture-card"
            :file-list="imgList"
            :on-change="endleChange">
            <i class="el-icon-plus"></i>
          </el-upload>
        </div>
      </form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUsers()">确 定</el-button>
      </span>
    </el-dialog>
    <!--新增弹框end-->

    <!--查看推荐列表弹框-->
    <el-dialog title="推荐" :visible.sync="recommended" width="80%" :before-close="handleClose">
      <el-table :data="tableList" border style="width: 100%" class="decorate-table">
        <el-table-column prop="groupInfo.realName" label="真实姓名"></el-table-column>
        <el-table-column prop="nickName" label="昵称" width="180"></el-table-column>
        <el-table-column prop="accountNo" label="电话号码" ></el-table-column>
        <el-table-column prop="userType" label="类型" ></el-table-column>
        <el-table-column prop="createTime" label="注册日期" ></el-table-column>
        <el-table-column prop="groupInfo.status" label="认证状态" ></el-table-column>
        <el-table-column prop="account.amount" label="账户余额" ></el-table-column>
      </el-table>
      <!--分页-->
      <el-col :span="24" class="toolbar">
        <el-pagination layout="prev,total,pager, next"
                       :page-size="10"
                       @current-change="pagingSizeChange"
                       :total="totalpaging"
                       style="text-align:center;">
        </el-pagination>
      </el-col>
      <span slot="footer" class="dialog-footer">
        <el-button @click="recommended = false">取 消</el-button>
        <el-button type="primary" @click="recommended = false">确 定</el-button>
      </span>
    </el-dialog>


  </div>
</template>
<script>
  import userApi from '@/api/user'

  export default {
    data() {
      return {
        uploadUrl: process.env.BASE_API + '/upload',
        imgList: [],
        provinces: [],
        account: [],
        searchData: {
          size: '10',
          current: '1'
        },
        pagingData: {
          size: '10',
          current: '1',
          id: ''
        },
        daaList: {
          accountNo: '',
          userType: '',
          realName: '',
          groupProvince: [],
          groupCity: [],
          groupCountry: [],
          address: '',
          bankName: '',
          cardNo: '',
          bankProvince: [],
          bankCity: [],
          brachName: [],
          accountName: '',
          images: []
        },
        total: 0,
        totalpaging: 0,
        input: '',
        value: '',
        dialogVisible: false,
        recommended: false,
        dialogImageUrl: '',
        recommendedUrl: '',
        tableList: [],
        tableData: [],
        optionsQuery: [0],
        optionsType: [0],
        optionsProvinces: [{
          value: 'zhinan0',
          label: '指南',
          children: [{
            value: 'zhinan1',
            label: '指南1',
            children: [{
              value: 'zhinan2',
              label: '指南1'
            }]
          }]
        }],
        optionsBank: [{
          value: 'zhinan00',
          label: '指南22',
          children: [{
            value: 'zhinan111',
            label: '指南22',
            children: [{
              value: 'zhinan222',
              label: '指南22'
            }]
          }]
        }]
      }
    },
    methods: {
      // 分页
      handleSizeChange(val) {
        this.searchData.current = val
        this.DecorateteamList()
      },
      // 推荐列表分页
      pagingSizeChange(val) {
        this.pagingData.current = val
        this.showDetail()
      },
      // 列表
      DecorateteamList() {
        userApi.DecorateteamList(this.searchData).then(res => {
          this.total = res.data.total
          this.tableData = res.data.records
        })
      },
      // 查看推荐
      showDetail(id) {
        this.pagingData.id = id
        this.recommended = true
        userApi.showDetail(this.pagingData).then(res => {
          this.totalpaging = res.data.total
          this.tableList = res.data.records
        })
      },
      // 保存弹框
      addUsers() {
        for (let i = 0, l = this.imgList.length; i < l; i++) {
          if (!this.imgList[i].id && this.imgList[i].response.code === '200') {
            this.daaList.images.push(this.imgList[i].response.data.path)
          }
        }
        this.daaList.groupProvince = this.provinces[0]
        this.daaList.groupCity = this.provinces[1]
        this.daaList.groupCountry = this.provinces[2]
        this.daaList.bankProvince = this.account[0]
        this.daaList.bankCity = this.account[1]
        this.daaList.brachName = this.account[2]
        userApi.addUsers(this.daaList).then(res => {
        })
      },
      // 新增弹框
      decorateAdd() {
        this.dialogVisible = true
      },
      // 所在区域三级联动
      handleChange(value) {
        this.provinces = value
      },
      // 银行三级联动
      handleBank(value) {
        this.account = value
        console.log(this.account)
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      },
      endleChange(file, fileList) {
        this.imgList = fileList
      }
    },
    created() {
      this.DecorateteamList()
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .decorate{
    .decorate-input{
      width: 12%;
      height: 35px;
    }
    .decorate-table{
      margin-top:20px;
    }
    .decorate-form-input,.decorate-form-select{
      width: 35%;
    }
    .decorate-form-address{
      width: 60%;
    }
    .font-weight{
      font-weight: bold;
    }
    .bank-card{
      margin-top: 20px;
      font-weight: bold;
    }
  }
</style>
