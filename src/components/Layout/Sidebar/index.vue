<template>
  <el-aside class="layout__sidebar">
    <el-menu :default-active="activeIndex" :unique-opened="false">
      <SiderItem v-for="item in secondRoute" :key="item.name" :item="item" />
    </el-menu>
  </el-aside>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import SiderItem from '@/components/Layout/Sidebar/Item.vue'
  import { useRoute } from 'vue-router'
  export default defineComponent({
    name: 'LayoutSidebar',
    components: {
      SiderItem
    },
    setup() {
      console.log('sidebar')
      const route = useRoute()
      // console.log('route', route, route.matched)
      const activeIndex = computed(() => {
        console.log('route', route)
        if (route.meta.sliderHidden) {
          const routeName = route.name as string
          const routeArr = routeName.split('__')
          routeArr.pop()
          return routeArr.join('__')
        } else {
          return route.name
        }
      })
      const secondRoute = computed(() => route.matched[1].children)
      return {
        secondRoute,
        activeIndex
      }
    }
  })
</script>

<style lang="scss" scoped>
  .layout__sidebar {
    :deep(.el-menu) {
      border-right-width: 0;
      background-color: $siderBg;
      padding-top: 10px;
      .el-sub-menu {
        .el-sub-menu__title {
          color: $subMenuColor;
          &:hover {
            background-color: transparent;
          }
        }
        &.is-active {
          // color: ;
          background-color: $subMenuHoverBg;
        }
        .el-menu {
          padding-left: 15px;
        }
        .el-menu-item {
          color: $menuItemColor;
          &.is-active {
            background-color: transparent;
            color: $menuItemHoverColor;
          }
        }
      }
      .el-menu-item {
        color: $subMenuColor;
        &:hover {
          background-color: transparent;
        }
        &.is-active {
          background-color: $subMenuHoverBg;
        }
      }
    }
  }
</style>
