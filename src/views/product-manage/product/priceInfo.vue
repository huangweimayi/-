<template>
  <div>
    <!--新增弹框-->
    <el-dialog
      title="图片管理"
      @open="openDia"
      :visible.sync="priceInformation.isShow"
      width="665px">
      <el-form label-width="0px" label-position="right">
        <h4 class="mb_20">基本信息</h4>
        <div class="mb_20">
          <span style="margin-right: 40px">产品名称：{{priceInformation.productName}}</span>
          <span>供应商名称：{{priceInformation.userName}}</span>
        </div>
        <h4 class="mb_20">价格信息</h4>
        <div class="mb_20">
          <span>单价：</span>
          <el-input class="short-input-30" v-model="allPrice"></el-input>
          <el-button type="primary" size="small" @click="allPriceChange">批量设置</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%" class="query-table">
          <el-table-column prop="str" label="规格"></el-table-column>
          <el-table-column label="商品销售价">
            <template slot-scope="scope" >
              <el-input v-model="scope.row.salePrice"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="商品价格">
            <template slot-scope="scope" >
              <el-input v-model="scope.row.productPrice"></el-input>
            </template>
          </el-table-column>
        </el-table>
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
    name: 'priceInfo',
    props: ['priceInformation'],
    data() {
      return {
        allPrice: '',
        tableData: []
      }
    },
    methods: {
      // 批量设置
      allPriceChange() {
        for (let i = 0, l = this.tableData.length; i < l; i++) {
          this.tableData[i].salePrice = this.allPrice
          this.tableData[i].productPrice = this.allPrice
        }
      },
      // 弹窗打开的回调
      openDia() {
        if (this.priceInformation.id) {
          this.getPriceList()
        }
      },
      // 价格列表
      getPriceList() {
        goodsApi.productPriceList(this.priceInformation.id).then(res => {
          this.tableData = res.data
        })
      },
      // 新增
      sureAdd() {
        COMMON.setHeader(1)
        let data = this.tableData
        for (let i = 0, l = data.length; i < l; i++) {
           delete data[i].str
           delete data[i].productId
           delete data[i].productName
           delete data[i].userName
        }
        goodsApi.productPriceSetting(JSON.stringify(data)).then(res => {
          this.priceInformation.isShow = false
          COMMON.tipSuccess()
          this.$emit('sureAddPrice')
        })
      }

    }
  }
</script>

