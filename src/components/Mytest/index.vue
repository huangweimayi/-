<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="childInfo.isShow"
      width="30%"
      :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="childInfo.isShow = false">取 消</el-button>
        <el-button type="primary" @click="childInfo.isShow = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'test',
    props: ['childInfo'],
    watch: {
      'childInfo.isShow'(n, o) {
        if (!n) {
          this.$emit('close')
        }
      }
    },
    data() {
      return {
        dialogVisible: false
      }
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      }
    }
  }
</script>
