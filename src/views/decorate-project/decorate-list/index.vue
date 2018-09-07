<template >
  <div style="padding:40px;" class="consumers-query">
    <!--头部查询-->
    <div>
      <el-form :inline="true">
        <el-form-item label="项目编号">
          <el-input v-model="searchData.projectNo" placeholer="请输入项目编号"></el-input>
        </el-form-item>
        <el-form-item label="客户姓名">
          <el-input v-model="searchData.nickName" placeholer="请输入客户姓名"></el-input>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="searchData.mobileNo" placeholer="请输入电话号码"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="getProjectList">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--查询列表-->
    <div>
      <el-table :data="tableData" border style="width: 100%" class="query-table">
        <el-table-column prop="projectNo" label="项目编号"></el-table-column>
        <el-table-column prop="nickName" label="联系人"></el-table-column>
        <el-table-column prop="mobileNo" label="联系电话"></el-table-column>
        <el-table-column prop="projectProgressDesp" label="项目进度"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column  label="操作">
          <template slot-scope="scope" >
            <i class="el-icon-view primary" title="查看需求" @click="getDemandInfo(scope.row.id)"></i>
            <i class="el-icon-tickets primary mb_5" title="消费合同" @click="detailCost(scope.row.id, scope.row.projectNo, scope.row.userId)"></i>
            <!--<el-button  class="mb_5" size="mini" @click="detailCost(scope.row.id, scope.row.projectNo, scope.row.userId)">消费合同</el-button>-->
            <router-link :to="{path:'/decorate-project/service',query:{ id:scope.row.id, projectNo:scope.row.projectNo }}">
              <!--<el-button class="mb_5" size="mini">
                服务合同
              </el-button>-->
              <i class="el-icon-document primary mb_5" title="服务合同"></i>
            </router-link>
            <router-link :to="{path:'/decorate-project/order',query:{ id:scope.row.id }}">
              <!--<el-button class="mb_5" size="mini">
                商品订单管理
              </el-button>-->
              <i class="el-icon-goods primary mb_5" title="商品订单管理"></i>
            </router-link>
            <router-link :to="{path:'/decorate-project/settlement',query:{ id:scope.row.id, projectNo:scope.row.projectNo }}">
              <!--<el-button class="mb_5" size="mini">
                项目结算管理
              </el-button>-->
              <i class="el-icon-news primary mb_5" title="项目结算管理"></i>
            </router-link>
            <!--<el-button size="mini" @click="updateProgress(scope.row.id, scope.row.projectProgress)">{{progress[scope.row.projectProgress + 1].name}}</el-button>-->
            <i class="el-icon-refresh primary mb_5" @click="updateProgress(scope.row.id, scope.row.projectProgress)" :title='progress[scope.row.projectProgress + 1].name'></i>
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
    <costInfo :costData="costData" @sureAdd="sureAdd"></costInfo>
    <demand :demandInfo="demandInfo"></demand>
  </div>
</template>
<script>
  import projectApi from '@/api/project'
  import COMMON from '@/utils/commonFun'
  import costInfo from '@/views/decorate-project/decorate-list/cost-info'
  import demand from '@/views/decorate-project/decorate-list/demand'

  export default {
    components: { costInfo, demand },
    data() {
      return {
        // 需求弹窗
        progress: [],
        progressName: '',
        demandInfo: {
          isShow: false,
          id: ''
        },
        // 消费合同弹窗
        costData: {
          isShow: false,
          isDetail: false,
          id: '',
          userId: '',
          projectNo: '',
          title: '新增'
        },
        searchData: {
          mobileNo: '',
          nickName: '',
          projectNo: '',
          size: '10',
          current: '1'
        },
        total: 0,
        tableData: [
          {
            name: 1,
            id: 1
          }
        ]
      }
    },
    methods: {
      // 需求详情
      getDemandInfo(id) {
        this.demandInfo.id = id
        this.demandInfo.isShow = true
      },
      // 消费合同函数
      costDo(id, projectNo, userId) {
        this.costData.id = id
        this.costData.projectNo = projectNo
        this.costData.userId = userId
        this.costData.isShow = true
      },
      // 点击详情消费合同
      detailCost(id, projectNo, userId) {
        this.costData.title = '消费合同'
        this.costData.isDetail = true
        this.costDo(id, projectNo, userId)
      },
      // 弹窗新增成功
      sureAdd() {
        this.getProjectList()
      },
      // 分页
      handleSizeChange(val) {
        this.searchData.current = val
        this.getProjectList()
      },
      // 获取列表
      getProjectList() {
        projectApi.getProjectList(this.searchData).then(res => {
          this.tableData = res.data.records
          this.total = res.data.total
        })
      },
      // 更新进度
      updateProgress(id, projectProgress) {
        projectApi.updateProjectProgress({ id: id, projectProgress: projectProgress + 1 }).then(res => {
          COMMON.tipSuccess()
          this.getProjectList()
        })
      }
    },
    created() {
      let that = this
      COMMON.getDictionary({ 'parentTag': 'PROJECT_PROGRESS' }).then(function(res) {
        that.progress = res
        that.getProjectList()
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
