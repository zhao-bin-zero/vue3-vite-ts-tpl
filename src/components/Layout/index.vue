<template>
  <el-container class="layout__container" direction="vertical" v-if="storeGetters.user.value.remark">
    <layout-header class="layout__header" :activeIndex="activeIndex" />
    <router-view v-slot="{ Component }" :key="activeIndex">
      <component :is="Component" />
    </router-view>
  </el-container>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { useGetters, useActions } from '@/store/use'
  import LayoutHeader from '@/components/Layout/Header.vue'

  export default defineComponent({
    components: {
      LayoutHeader
    },
    setup() {
      console.log('layout')
      const storeGetters = useGetters('info', ['user'])
      const storeActions = useActions('info', ['getAreaCodeList'])
      const init = async () => {
        // storeActions.getUser()
        storeActions.getAreaCodeList()
      }
      init()
      const route = useRoute()
      const activeIndex = computed(() => route.path.split('/')[1])

      return {
        storeGetters,
        activeIndex
      }
    }
  })
</script>

<style lang="scss" scoped>
  .layout__container {
    width: 100%;
    height: 100vh;
    .layout__header {
      height: $headerHeight;
      background-color: $headerBg;
    }
  }
</style>
