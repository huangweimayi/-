<template >
  <div style="padding:40px;" class="decorate">
    <!--头部查询-->
    <div>
      <el-form :inline="true">
        <el-form-item label="供应商名称：">
          <el-input v-model="searchData.userName" placeholer="请输入供应商名称"></el-input>
        </el-form-item>
        <el-form-item label="产品名称：">
          <el-input v-model="searchData.productName" placeholer="请输入产品名称"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="getList">查询</el-button>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="basicInformation.isShow = true">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--查询列表-->
    <div>
      <el-table :data="tableData" border style="width: 100%" class="decorate-table">
        <el-table-column prop="productName" label="产品名称"></el-table-column>
        <el-table-column prop="productCatgoryStr" label="产品分类"></el-table-column>
        <el-table-column prop="userName" label="供应商名称"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column label="是否上架">
          <template slot-scope="scope" >
            <span>{{ scope.row.hasGrounding == true? '是' : '否'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否发布">
          <template slot-scope="scope" >
            <span>{{ scope.row.hasPublish == true? '是' : '否'}}</span>
          </template>
        </el-table-column>
        <el-table-column  label="操作">
          <template slot-scope="scope" >
            <i class="el-icon-sort-down primary mb_5" v-if="scope.row.hasGrounding == true" title="下架" @click="soldOut(scope.row.id)"></i>
            <!--<el-button class="mb_5" v-if="scope.row.hasGrounding == true" size="mini" @click="soldOut(scope.row.id)">下架</el-button>-->
            <i class="el-icon-sort-up primary mb_5" v-if="scope.row.hasGrounding == false" title="上架" @click="putaway(scope.row.id)"></i>
            <!--<el-button class="mb_5" v-if="scope.row.hasGrounding == false" size="mini" @click="putaway(scope.row.id)">上架</el-button>-->
            <i class="el-icon-more primary mb_5" v-if="scope.row.hasPublish == true" title="取消发布" @click="cancelRelease(scope.row.id)"></i>
            <!--<el-button class="mb_5" v-if="scope.row.hasPublish == true" size="mini" @click="cancelRelease(scope.row.id)">取消发布</el-button>-->
            <i class="el-icon-more-outline primary mb_5" v-if="scope.row.hasPublish == false" title="发布" @click="release(scope.row.id)"></i>
            <!--<el-button class="mb_5" v-if="scope.row.hasPublish == false" size="mini" @click="release(scope.row.id)">发布</el-button>-->
            <i class="el-icon-tickets primary mb_5" title="基本信息管理" @click="basicInfo(scope.row.id)"></i>
            <!--<el-button class="mb_5" size="mini" @click="basicInfo(scope.row.id)">基本信息管理</el-button>-->
            <i class="el-icon-picture primary mb_5" title="图片管理" @click="picManage(scope.row.id, scope.row.productName, scope.row.userName)"></i>
            <!--<el-button class="mb_5" size="mini" @click="picManage(scope.row.id, scope.row.productName, scope.row.userName)">图片管理</el-button>-->
            <i class="el-icon-menu primary" title="价格管理" @click="priceManage(scope.row.id, scope.row.productName, scope.row.userName)"></i>
            <!--<el-button class="mb_5" size="mini" @click="priceManage(scope.row.id, scope.row.productName, scope.row.userName)">价格管理</el-button>-->
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
    <basicInfo :basicInformation="basicInformation" @sureAddBasic="getList"></basicInfo>
    <picInfo :picInformation="picInformation" @sureAddPic="getList"></picInfo>
    <priceInfo :priceInformation="priceInformation" @sureAddPrice="getList"></priceInfo>

  </div>
</template>
<script>
  import goodsApi from '@/api/goods'
  import basicInfo from '@/views/product-manage/product/basicInfo'
  import picInfo from '@/views/product-manage/product/picInfo'
  import priceInfo from '@/views/product-manage/product/priceInfo'
  import COMMON from '@/utils/commonFun'

  export default {
    components: { basicInfo, picInfo, priceInfo },
    data() {
      return {
        // 价格管理弹窗数据
        priceInformation: {
          id: '',
          userName: '',
          productName: '',
          isShow: false
        },
        // 图片管理弹窗数据
        picInformation: {
          id: '',
          userName: '',
          productName: '',
          isShow: false
        },
        // 基本信息弹窗数据
        basicInformation: {
          id: '',
          isShow: false
        },
        // 列表查询数据
        searchData: {
          productName: '',
          current: '1',
          size: '10',
          userName: ''
        },
        tableData: [],
        total: 0
      }
    },
    methods: {
      // 分页
      handleSizeChange(val) {
        this.searchData.current = val
        this.getList()
      },
      // 商品列表查询
      getList() {
        goodsApi.getGoodsList(this.searchData).then(res => {
          this.total = res.data.total
          this.tableData = res.data.records
        })
      },
      // 价格管理
      priceManage(id, productName, userName) {
        this.priceInformation.id = id
        this.priceInformation.productName = productName
        this.priceInformation.userName = userName
        this.priceInformation.isShow = true
      },
      // 图片管理
      picManage(id, productName, userName) {
        this.picInformation.id = id
        this.picInformation.productName = productName
        this.picInformation.userName = userName
        this.picInformation.isShow = true
      },
      // 基本信息管理
      basicInfo(id) {
        this.basicInformation.id = id
        this.basicInformation.isShow = true
      },
      // 列表按钮操作回调
      listBtnDo() {
        COMMON.tipSuccess()
        this.getList()
      },
      // 取消发布
      cancelRelease(id) {
        goodsApi.cancelRelease(id).then(res => {
          this.listBtnDo()
        })
      },
      // 发布
      release(id) {
        goodsApi.release(id).then(res => {
          this.listBtnDo()
        })
      },
      // 下架
      soldOut(id) {
        goodsApi.soldOut(id).then(res => {
          this.listBtnDo()
        })
      },
      // 上架
      putaway(id) {
        goodsApi.putaway(id).then(res => {
          this.listBtnDo()
        })
      }
    },
    created() {
      this.getList()
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
