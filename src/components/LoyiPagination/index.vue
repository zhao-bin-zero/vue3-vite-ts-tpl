<template>
  <div class="loyi-pagination item-center">
    <div>共{{ total }}条，每页显示</div>
    <el-pagination
      class="loyi-pagination-content"
      :current-page="currentPage"
      background
      :page-sizes="pageSizesArr"
      :page-size="pageSize"
      layout="sizes, prev, pager, next"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  // interface PaginationSetupData {
  //   pageSizesArr: number[]
  //   current_page: number
  //   handleSizeChange: (val: number) => void
  //   handleCurrentChange: (val: number) => void
  // }
  export default defineComponent({
    name: 'LoyiPagination',
    props: {
      total: {
        type: Number,
        required: true
      },
      pageSize: {
        type: Number,
        required: true
      },
      currentPage: {
        type: Number,
        required: true
      }
    },
    emits: ['update:pageSize', 'getList'],
    setup(props, context) {
      //分页
      const pageSizesArr = [20, 40, 50, 80, 100]
      // let current_page = ref(props.currentPage)
      const handleSizeChange = (val: number) => {
        console.log(val)
        context.emit('update:pageSize', val)
        context.emit('getList')
      }
      const handleCurrentChange = (val: number) => {
        console.log(val)
        context.emit('getList', val)
      }
      return {
        pageSizesArr,
        // current_page,
        handleSizeChange,
        handleCurrentChange
      }
    }
  })
</script>
<style lang="scss" scoped>
  .loyi-pagination {
    font-size: 14px;
    margin-top: 20px;
    :deep(.loyi-pagination-content) {
      & .btn-next,
      & .btn-prev,
      & .el-pager li {
        background-color: #fff !important;
        border: 1px solid #dcdcdc !important;
        border-radius: 4px !important;
      }
      & .el-pager li:not(.disabled).active {
        background-color: $primaryColor !important;
        color: #fff;
        border: 0 none !important;
      }
      .el-pagination__sizes {
        margin-right: 136px;
      }
    }
  }
</style>
