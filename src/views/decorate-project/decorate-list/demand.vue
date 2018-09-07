<template>
  <div>
    <!--新增弹框-->
    <el-dialog
      title="需求详情"
      @open="openDia"
      :visible.sync="demandInfo.isShow"
      width="665px">
      <el-form class="two-cup-table" :inline="true" label-width="100px" label-position="right">
        <el-form-item label="联系人">
          <el-input v-model="detailInfo.nickName" :readonly="isDetail"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="detailInfo.mobileNo" :readonly="isDetail"></el-input>
        </el-form-item>
        <el-form-item label="楼盘名称">
          <el-input v-model="detailInfo.buildingName" :readonly="isDetail"></el-input>
        </el-form-item>
        <el-form-item label="房屋信息">
          <el-input class="short-select" v-model="detailInfo.bedroomCount+'室'" :readonly="isDetail"></el-input>
          <el-input class="short-select" v-model="detailInfo.parlourCount+'厅'" :readonly="isDetail"></el-input>
          <el-input class="short-select" v-model="detailInfo.toiletCount+'卫'" :readonly="isDetail"></el-input>
        </el-form-item>
        <el-form-item label="风格">
          <el-input v-model="detailInfo.styleDesp" :readonly="isDetail"></el-input>
        </el-form-item>
        <el-form-item label="预算">
          <el-input v-model="detailInfo.budgetStart+'元'" :readonly="isDetail" class="short-input"></el-input> ~
          <el-input v-model="detailInfo.budgetEnd+'元'" :readonly="isDetail" class="short-input"></el-input>
        </el-form-item>
        <el-form-item label="所在区域">
          <el-input class="short-select" v-model="detailInfo.province" :readonly="isDetail"></el-input>
          <el-input class="short-select" v-model="detailInfo.city" :readonly="isDetail"></el-input>
          <el-input class="short-select" v-model="detailInfo.country" :readonly="isDetail"></el-input>
        </el-form-item>
        <br/>
        <el-form-item label="详细地址" class="full">
          <el-input v-model="detailInfo.address" :readonly="isDetail"></el-input>
        </el-form-item>
        <el-form-item label="户型图">
          <img :src="detailInfo.housePlanImg" alt="">
        </el-form-item>
        <el-form-item label="效果图">
          <img :src="detailInfo.expectImg" alt="">
        </el-form-item>
        <el-form-item label="产品信息" class="full">
          <el-table :data="detailInfo.demandVos" border style="width: 100%" class="query-table">
            <el-table-column prop="productName" label="材料名称"></el-table-column>
            <el-table-column prop="merchantName" label="供应商名称"></el-table-column>
            <el-table-column prop="specificationsDescription" label="规格"></el-table-column>
            <el-table-column prop="price" label="单价"></el-table-column>
            <el-table-column prop="quantity" label="数量"></el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="demandInfo.isShow = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
  import projectApi from '@/api/project'
  import COMMON from '@/utils/commonFun'

  export default {
    name: 'demand',
    props: ['demandInfo'],
    data() {
      return {
        isDetail: true,
        styles: [],
        hh: '',
        detailInfo: {},
        tableData: [
          {
            name: 1,
            id: 1
          }
        ]

      }
    },
    methods: {
      // 弹窗打开的回调
      openDia() {
        this.getDetail()
      },
      // 获取需求详情
      getDetail() {
        projectApi.roomRequireDetail({ projectId: this.demandInfo.id }).then(res => {
          this.detailInfo = res.data
        })
      }

    },
    created() {
      /*
      let that = this
      COMMON.getDictionary({ 'parentTag': 'DECORATION_STYLE' }).then(function(res) {
        that.styles = res
      })*/
    }
  }
</script>

