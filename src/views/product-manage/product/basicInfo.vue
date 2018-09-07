<template>
  <div>
    <!--新增弹框-->
    <el-dialog
      title="基本信息"
      :visible.sync="basicInformation.isShow"
      @open="openDia"
      width="665px">
      <el-form class="two-cup-table" :inline="true" label-width="100px" label-position="right">
        <el-form-item label="产品名称">
          <el-input v-model="basicData.productName"></el-input>
        </el-form-item>
        <el-form-item label="供应商名称">
          <el-select v-model="basicData.userId" filterable  placeholder="请选择">
            <el-option
              v-for="item in supplier"
              :key="item.id"
              :label="item.nickName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品分类" class="full">
          <el-tree
            :props="defaultProps"
            :data="productCatgory"
            show-checkbox
            check-strictly
            ref="treeForm"
            @check-change="handleCheckChange"
            :default-checked-keys = 'checkdId'
            node-key="id">
          </el-tree>
        </el-form-item>
        <el-form-item label="规格" class="full">
          <el-button size="mini" icon="el-icon-plus" @click="addParent"></el-button>
        </el-form-item>
        <el-form-item label=" " class="full">
          <div class="tree-input" v-for="(item,$index) in basicData.productSpecificationsList">
            <el-input v-model="item.productSpecificationsName"></el-input>
            <el-button size="mini" icon="el-icon-minus" @click="deleteParent($index)"></el-button>
            <el-button size="mini" icon="el-icon-plus" @click="addChild($index)"></el-button>
            <div v-for="(child,$cIndex) in item.productSpecificationsTexts" class="tree-input-child" style="width: 80%;margin-left: 20%">
              <el-input v-model="child.productSpecificationsValue"></el-input>
              <el-button size="mini" icon="el-icon-minus" @click="deleteChild($index,$cIndex)"></el-button>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="详情" class="full">
          <el-input type="textarea" v-model="basicData.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sureAdd">保 存</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
  import goodsApi from '@/api/goods'
  import userApi from '@/api/user'
  import COMMON from '@/utils/commonFun'

  export default {
    name: 'basicInfo',
    props: ['basicInformation'],
    watch: {
      'basicInformation.isShow'(n, o) {
        if (!n) {
          this.basicData = {
            description: '',
            id: '',
            productCatgoryId: '',
            productName: '',
            productSpecificationsList: [],
            userId: ''
          }
          this.checkdId = [1]
          this.$refs.treeForm.setCheckedNodes([])
        }
      }
    },
    data() {
      return {
        // 供应商下拉
        supplier: [
          { name: 2, id: 2 }
        ],
        // 商品分类数据
        i: 0,
        checkdId: [],
        productCatgory: [],
        defaultProps: {
          children: 'childNode',
          label: 'catgoryName'
        },
        // 新增数据
        basicData: {
          description: '',
          id: '',
          productCatgoryId: '',
          productName: '',
          productSpecificationsList: [],
          userId: ''
        },
        isDetail: false

      }
    },
    methods: {
      // 弹窗打开的回调
      openDia() {
        if (this.basicInformation.id) {
          this.getDetail()
        }
      },
      // 删除父级规格
      deleteParent(index) {
        this.basicData.productSpecificationsList.splice(index, 1)
      },
      // 增加子集规格
      addChild(index) {
        this.basicData.productSpecificationsList[index].productSpecificationsTexts.push(
          {
            id: '',
            productSpecificationsValue: ''
          }
        )
      },
      // 删除子集规格
      deleteChild(parentIndex, cIndex) {
        delete this.basicData.productSpecificationsList[parentIndex].productSpecificationsTexts.splice(cIndex, 1)
      },
      // 增加规格
      addParent() {
        this.basicData.productSpecificationsList.push(
          {
            id: '',
            productSpecificationsName: '',
            productSpecificationsTexts: []
          }
        )
      },
      // 获取详情
      getDetail() {
        goodsApi.queryById(this.basicInformation.id).then(res => {
          this.basicData = res.data
          this.checkdId.push(res.data.productCatgoryId)
          for (let i = 0, l = this.productCatgory.length; i < l; i++) {
            if (this.productCatgory[i].id === res.data.productCatgoryId) {
              this.$refs.treeForm.setCheckedNodes([this.productCatgory[i]])
            }
          }
          console.log(this.checkdId)
        })
      },
      // 商品类型tree
      queryListTree() {
        goodsApi.queryListTree().then(res => {
          this.productCatgory = res.data
        })
      },
      // 供应商下拉
      getSupplyUsers() {
        userApi.getSupplyUsers({ current: 1, size: 9999 }).then(res => {
          this.supplier = res.data.records
        })
      },
      // 选中树
      handleCheckChange(data, checked, indeterminate) {
        this.i++
        if (this.i % 2 === 0) {
          if (checked) {
            this.$refs.treeForm.setCheckedNodes([])
            this.$refs.treeForm.setCheckedNodes([data])
            // 交叉点击节点
          } else {
            this.$refs.treeForm.setCheckedNodes([])
            // 点击已经选中的节点，置空
          }
        }
        if (this.$refs.treeForm.getCheckedNodes().length > 0) {
          this.basicData.productCatgoryId = this.$refs.treeForm.getCheckedNodes()[0].id
        }
      },
      // 新增
      sureAdd() {
        console.log(this.basicData)
        if (this.basicData.id) {
          COMMON.setHeader(1)
          goodsApi.updateProduct(JSON.stringify(this.basicData)).then(res => {
            this.successSave()
          })
        } else {
          COMMON.setHeader(1)
          goodsApi.addProduct(JSON.stringify(this.basicData)).then(res => {
            this.successSave()
          })
        }
      },
      successSave() {
        this.basicInformation.isShow = false
        COMMON.tipSuccess()
        this.$emit('sureAddBasic')
      }

    },
    updated() {

    },
    created() {
      this.queryListTree()
      this.getSupplyUsers()
    }
  }
</script>

