<template>
  <!-- destroy-on-close 控制是否在关闭 Drawer 之后将子元素全部销毁-->
  <div class="loyi__drawer">
    <el-drawer v-model="visible" direction="rtl" :lock-scroll="true">
      <template #title>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="item in titles" :key="item">{{ item }}</el-breadcrumb-item>
        </el-breadcrumb>
      </template>
      <slot></slot>
    </el-drawer>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  export default defineComponent({
    name: 'LoyiDrawer',
    props: {
      titles: {
        type: Array,
        default: () => []
      }
    },
    setup() {
      //弹框是否隐藏
      const visible = ref(false)
      const open = () => {
        visible.value = true
      }
      const close = () => {
        visible.value = false
      }
      return {
        visible,
        open,
        close
      }
    }
  })
</script>
<style lang="scss" scoped>
  .loyi__drawer {
    :deep(.el-drawer) {
      width: 900px !important;
      .el-drawer__body {
        overflow: auto;
      }
    }
  }
</style>
