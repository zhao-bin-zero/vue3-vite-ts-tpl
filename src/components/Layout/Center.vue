<template>
  <el-container>
    <!-- :key="activeIndex" -->
    <layout-sidebar class="layout__sider" />
    <el-main :key="routerKey" class="layout__main">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </el-main>
  </el-container>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useRoute } from 'vue-router'
  import LayoutSidebar from '@/components/Layout/Sidebar/index.vue'

  export default defineComponent({
    name: 'LayoutCenter',
    components: {
      LayoutSidebar
    },
    setup() {
      console.log('center')
      const route = useRoute()
      const routerKey = computed(() => route.path)

      return {
        routerKey
      }
    }
  })
</script>

<style lang="scss" scoped>
  .layout__sider {
    width: $siderWidth;
    background: $siderBg;
    padding: $siderRestrain $siderRestrain $siderRestrain 0;
  }
  .layout__main {
    margin-left: -$siderRestrain;
    background-color: #fff;
    border-top-left-radius: $siderRestrain;
    border-bottom-left-radius: $siderRestrain;
    padding: 30px $siderRestrain;
  }
</style>
