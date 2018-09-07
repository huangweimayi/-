<template >
  <div style="padding:40px;" class="consumers-query">
    <!--头部查询-->
    <div>
      <el-form :inline="true">
        <el-form-item label="项目编号	">
          <el-input v-model="searchData.projectNo" placeholer="请输入项目名称"></el-input>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="searchData.productName" placeholer="请输入商品名称"></el-input>
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
        <el-table-column prop="productName" label="商品名称"></el-table-column>
        <el-table-column prop="merchantName" label="厂家名称"></el-table-column>
        <el-table-column prop="quantity" label="产品数量"></el-table-column>
        <el-table-column prop="price" label="产品单价"></el-table-column>
        <el-table-column prop="customerContractDo.contact" label="联系人" width="80"></el-table-column>
        <el-table-column prop="customerContractDo.mobileNumber" label="联系电话"></el-table-column>
        <el-table-column prop="roomRequirementDo.address" label="送货地址"></el-table-column>
        <el-table-column prop="createTime" label="下单日期"></el-table-column>
        <el-table-column label="订单状态" width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.hasSent">已发货</span>
            <span v-if="!scope.row.hasSent">未发货</span>
          </template>
        </el-table-column>
        <el-table-column prop="settlementStatusCode" label="收款状态" width="80"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope" >
            <i class="el-icon-check primary mb_5" v-if="scope.row.settlementStatus == 0" title="结算" @click="doSettlement(scope.row.id)"></i>
            <!--<el-button size="mini" v-if="scope.row.settlementStatus == 0" @click="doSettlement(scope.row.id)">结算</el-button>-->
            <span v-if="scope.row.settlementStatus == 1">已结算</span>
            <i class="el-icon-printer primary mb_5" v-if="!scope.row.hasSent" title="发货" @click="updateSend(scope.row.id)"></i>
            <!--<el-button size="mini" v-if="!scope.row.hasSent" @click="doSettlement(scope.row.id)">发货</el-button>-->
            <span v-if="scope.row.hasSent">已发货</span>
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
          productName: '',
          projectNo: '',
          size: '10',
          current: '1'
        },
        total: 0,
        tableData: [{ name: '1', id: 1 }]
      }
    },
    methods: {
      // 结算
      doSettlement(id) {
        projectApi.updateOrderInf({ id: id }).then(res => {
          COMMON.tipSuccess()
          this.getList()
        })
      },
      // 发货
      updateSend(id) {
        projectApi.updateSend({ id: id }).then(res => {
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
        projectApi.getOrderInfs(this.searchData).then(res => {
          this.total = res.data.total
          this.tableData = res.data.records
        })
      }
    },
    created() {
      this.getList()
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
