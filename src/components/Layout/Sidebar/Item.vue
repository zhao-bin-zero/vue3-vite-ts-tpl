<template>
  <template v-if="!item.meta?.sliderHidden">
    <el-menu-item :index="item.name" v-if="!item.children || item.children.length === 0" @click="menuItemLink">
      <i :class="item.meta.icon" v-if="item.meta.icon"></i>
      {{ item.meta.title }}
    </el-menu-item>
    <el-sub-menu :index="item.name" v-else>
      <template #title>
        <i :class="item.meta.icon" v-if="item.meta.icon"></i>
        {{ item.meta.title }}
      </template>
      <SiderItem :index="child.name" v-for="child in item.children" :key="child.name" :item="child" />
    </el-sub-menu>
  </template>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { useRouter } from 'vue-router'
  export default defineComponent({
    name: 'SiderItem',
    props: {
      item: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    setup() {
      const router = useRouter()
      const menuItemLink = ({ index }: { index: string }) => {
        // console.log(index)
        router.push({ name: index })
      }
      return {
        menuItemLink
      }
    }
  })
</script>
<style lang="scss"></style>
