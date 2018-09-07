<template >
  <div style="padding:40px;" class="consumers-query">
    <!--头部查询-->
    <div>
      <el-form :inline="true">
        <el-form-item label="项目编号:">
          <span>{{projectNo}}</span>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" size="small" @click="addInfo.isShow = true">新增服务商合同</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--查询列表-->
    <div>
      <el-table :data="tableData" border style="width: 100%" class="query-table">
        <el-table-column label="项目编号" width="180">
          <template slot-scope="scope" >
            <span>{{projectNo}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="contractNo" label="合同编号" width="180"></el-table-column>
        <el-table-column prop="contact" label="签约团队" width="180"></el-table-column>
        <el-table-column prop="amount" label="签约金额" width="180"></el-table-column>
        <el-table-column prop="deposit" label="保证金额" width="180"></el-table-column>
        <el-table-column prop="fulfillStatusDesp" label="履约状态" width="180"></el-table-column>
        <el-table-column prop="settlementDate" label="签约日期" width="180"></el-table-column>
        <el-table-column prop="settlementDate" label="完成日期" width="180"></el-table-column>
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
      <addList :addInfo="addInfo" @sureAdd="sureAdd"></addList>
    </div>
  </div>
</template>
<script>
  import projectApi from '@/api/project'
  import addList from '@/views/decorate-project/decorate-service/add'

  export default {
    components: {
      addList
    },
    data() {
      return {
        projectNo: this.$route.query.projectNo, // 项目编号
        total: 0,
        addInfo: {
          isShow: false, // 控制弹窗是否显示
          projectNo: this.$route.query.projectNo,
          id: this.$route.query.id
        },
        tableData: [],
        searchData: {
          current: 1,
          size: 10,
          projectId: this.$route.query.id
        }
      }
    },
    methods: {
      // 新增成功
      sureAdd() {
        this.getList()
      },
      // 分页
      handleSizeChange(val) {
        this.searchData.current = val
        this.getList()
      },
      // 获取列表
      getList() {
        projectApi.serviceContractList(this.searchData).then(res => {
          this.tableData = res.data.records
          this.total = res.data.total
        })
      },
      // 查看推荐
      showDetail() {
        alert('查看推荐弹窗')
      }
    },
    created() {
      this.getList()
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
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
