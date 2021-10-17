<template>
  <div class="workbench">
    <el-card class="workbench__card">
      <p class="workbench__card-time">
        <span>{{ storeGetters.user.value.time }}</span>
        <span>{{ storeGetters.user.value.week }}</span>
      </p>
      <p class="workbench__card-name">{{ storeGetters.user.value.remark }}</p>
    </el-card>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { useGetters } from '@/store/use'

  export default defineComponent({
    setup() {
      const storeGetters = useGetters('info', ['user'])
      return {
        storeGetters
      }
    }
  })
</script>
<style lang="scss" scoped>
  .workbench {
    padding: 100px;
    .workbench__card {
      width: 60%;
      margin: 0 auto;
      padding: 20px;
      .workbench__card-time {
        font-size: 35px;
        > span {
          &:nth-child(1) {
            margin-right: 30px;
          }
        }
      }
      .workbench__card-name {
        font-size: 28px;
        margin-top: 50px;
      }
    }
  }
</style>
