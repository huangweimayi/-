<template >
  <div style="padding:40px;" class="consumers-query">
    <!--头部查询-->
    <div>
      <el-form :inline="true">
        <el-form-item label="项目编号">
          <el-input v-model="searchData.projectNo" placeholer="请输入项目编号"></el-input>
        </el-form-item>
        <el-form-item label="服务商名称">
          <el-input v-model="searchData.mechantName" placeholer="请输入服务商名称"></el-input>
        </el-form-item>
        <el-form-item label="服务类型">
          <el-select placeholder="请选择服务类型" v-model="searchData.userType">
            <el-option
              v-for="item in userType"
              :key="item.id"
              :label="item.name"
              :value="item.val">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="履约状态">
          <el-select placeholder="履约状态" v-model="searchData.fulfillStatus">
            <el-option
              v-for="item in fulfill"
              :key="item.id"
              :label="item.name"
              :value="item.val">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="getList">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--查询列表-->
    <div>
      <el-table :data="tableData" border style="width: 100%" class="query-table">
        <el-table-column prop="projectNo" label="项目编号"></el-table-column>
        <el-table-column prop="contractNo" label="合同编号"></el-table-column>
        <el-table-column prop="contact" label="签约团队"></el-table-column>
        <el-table-column prop="amount" label="签约金额"></el-table-column>
        <el-table-column prop="deposit" label="保证金额"></el-table-column>
        <el-table-column prop="settlementStatusDesp" label="结算状态"></el-table-column>
        <el-table-column prop="signDate" label="签约日期" width="180"></el-table-column>
        <el-table-column prop="finishDate" label="完成日期" width="180"></el-table-column>
        <el-table-column prop="settlementDate" label="结算日期" width="180"></el-table-column>
        <el-table-column  label="操作">
          <template slot-scope="scope" >
            <el-button size="mini" v-if="scope.row.settlementStatus == 0" @click="doSettlement(scope.row.id)">结算</el-button>
            <span v-if="scope.row.settlementStatus == 1">已结算</span>
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
  </div>
</template>
<script>
  import projectApi from '@/api/project'
  import COMMON from '@/utils/commonFun'

  export default {
    data() {
      return {
        searchData: {
          fulfillStatus: '',
          mechantName: '',
          projectNo: '',
          userType: '',
          size: '10',
          current: '1'
        },
        userType: [],
        fulfill: [],
        total: 0,
        tableData: []
      }
    },
    methods: {
      // 结算
      doSettlement(id) {
        projectApi.doSettlement({ id: id }).then(res => {
          COMMON.tipSuccess()
          this.getList()
        })
      },
      // 分页
      handleSizeChange(val) {
        this.searchData.current = val
        this.getList()
      },
      // 获取消费者列表
      getList() {
        projectApi.getSettlementInfos(this.searchData).then(res => {
          this.total = res.data.total
          this.tableData = res.data.records
        })
      }
    },
    created() {
      this.getList()
      let that = this
      COMMON.getDictionary({ 'parentTag': 'USER_TYPE' }).then(function(res) {
        that.userType = res
      })
      COMMON.getDictionary({ 'parentTag': 'FULFILL_STATUS' }).then(function(res) {
        that.fulfill = res
      })
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
