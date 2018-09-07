<template >
  <div style="padding:40px;" class="consumers-query">
    <!--头部查询-->
    <div>
      电话号码: &emsp;<el-input v-model="searchData.mobileNo" placeholder="请输入电话号码" class="query-input"></el-input>
      &emsp;&emsp;<el-button type="primary" @click="getUserList">查询</el-button>
    </div>
    <el-button type="text" @click="showDetail()">点击打开 Dialog</el-button>
    <!--查询列表-->
    <div>
      <el-table :data="tableData" border style="width: 100%" class="query-table">
        <el-table-column prop="nickName" label="昵称" width="180"></el-table-column>
        <el-table-column prop="mobileNo" label="电话号码" width="180"></el-table-column>
        <el-table-column prop="createTime" label="注册日期" width="180"></el-table-column>
        <el-table-column prop="account.amount" label="账户余额" width="180"></el-table-column>
        <el-table-column  label="操作">
          <template slot-scope="scope" >
            <!--<i class="el-icon-tickets success btn" @click="showDetail(scope.row.id)" title="查看推荐"></i>-->
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
      <!--推荐人列表弹框-->
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="80%"
        :before-close="handleClose">
        <div>
          <el-table :data="tableList" border style="width: 100%" class="query-table">
            <el-table-column prop="nickName" label="昵称" width="180"></el-table-column>
            <el-table-column prop="mobileNo" label="电话号码" width="180"></el-table-column>
            <el-table-column prop="createTime" label="注册日期" width="180"></el-table-column>
            <el-table-column prop="account.amount" label="账户余额" width="180"></el-table-column>
            <el-table-column  label="操作">
              <template slot-scope="scope" >
                <!--<i class="el-icon-tickets success btn" @click="showDetail(scope.row.id)" title="查看推荐"></i>-->
              </template>
            </el-table-column>
          </el-table>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
  <!--查看推荐列表-->
</template>
<script>
  import userApi from '@/api/user'

  export default {
    data() {
      return {
        dialogVisible: false,
        searchData: {
          mobileNo: '',
          size: '10',
          current: '1'
        },
        total: 0,
        tableData: [],
        tableList: []
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
      // 分页
      handleSizeChange(val) {
        this.searchData.current = val
        this.getUserList()
      },
      // 获取消费者列表
      getUserList() {
        userApi.getUserList(this.searchData).then(res => {
          this.total = res.data.total
          this.tableData = res.data.records
        })
      },
      // 查看推荐
      showDetail(id) {
        this.dialogVisible = true
        userApi.showDetail({ id: id, size: 10, current: 1 }).then(res => {
          this.tableList = res.data.records
        })
      }
    },
    created() {
      this.getUserList()
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .consumers-query{
    overflow: hidden;
    .query-input{
      width: 30%;
      height: 35px;
    }
    .query-table{
      margin-top:20px;
    }
  }
</style>
