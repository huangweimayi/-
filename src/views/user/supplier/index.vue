<template >
  <div style="padding:40px;" class="decorate">
    <!--头部查询-->
    <div>
      电话号码: &emsp;<el-input v-model="input" placeholder="请输入内容" class="decorate-input"></el-input>
      &emsp;类型:&emsp;
      <el-select v-model="value" placeholder="请选择" class="decorate-select">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      &emsp;&emsp;<el-button type="primary">查询</el-button>
      &emsp;<el-button type="primary" @click="dialogVisible = true">新增</el-button>
    </div>
    <!--查询列表-->
    <div>
      <el-table :data="tableData" border style="width: 100%" class="decorate-table">
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
    </div>

    <!--新增弹框-->
    <el-dialog title="新增" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <form action="">
        <p class="font-weight">基本信息</p>
        <p>
          <span>账&emsp;&emsp;号：<el-input placeholder="请输入内容" v-model="inputaccount" clearable class="decorate-form-input"></el-input></span>
          &emsp;&emsp;
          <span>类&emsp;&emsp;型：
              <el-select v-model="type" placeholder="请选择" class="decorate-form-select">
                 <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                 </el-option>
              </el-select>
            </span>
        </p>
        <div class="real-name">
          <div class="real-name-left">
            <span>真实姓名：<el-input placeholder="请输入内容" v-model="inputtype" clearable class="decorate-form-input"></el-input></span>
          </div>
        </div>
        <p>
          所在区域：
        </p>
        <p>
          <span>详细地址：<el-input placeholder="请输入内容" v-model="inputaddress" clearable class="decorate-form-address"></el-input></span>
        </p>
        <p class="bank-card">银行卡信息</p>
        <p>
          <span>开户银行：<el-input placeholder="请输入内容" v-model="inputopenanaccount" clearable class="decorate-form-input"></el-input></span>
          &emsp;&emsp;
          <span>银行账号：<el-input placeholder="请输入内容" v-model="inputnumber" clearable class="decorate-form-input"></el-input></span>
        </p>
        <p>
          <span> &emsp;开户人：<el-input placeholder="请输入内容" v-model="inputaccountperson" clearable class="decorate-form-input"></el-input></span>
          &emsp;&emsp;
          <span>支行名称：</span>
        </p>
        <p class="bank-card">认证资料</p>
        <div>
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
        </div>
      </form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!--新增弹框end-->

  </div>
</template>
<script>
  export default {
    data() {
      return {
        input: '',
        value: '',
        type: '',
        inputaccount: '',
        inputtype: '',
        inputaddress: '',
        inputopenanaccount: '',
        inputnumber: '',
        inputaccountperson: '',
        dialogVisible: false,
        dialogImageUrl: '',
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }]
      }
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      },
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      }
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
