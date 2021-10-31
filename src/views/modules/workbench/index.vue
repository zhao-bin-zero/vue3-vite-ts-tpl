<template>
  <div class="workbench">
    <el-card class="workbench__card">
      <p class="workbench__card-time">
        <span>{{ storeGetters.user.value.time }}</span>
        <span>{{ storeGetters.user.value.week }}</span>
      </p>
      <p class="workbench__card-name">
        <span>{{ storeGetters.user.value.admin_name }}</span>
        , 欢迎进入DMS!
      </p>
    </el-card>
    <div class="workbench__bg">
      <img src="@assets/images/workbench/bg.png" alt="" />
    </div>
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
    padding: 81px 81px 0;
    .workbench__card {
      width: 60%;
      margin: 0 auto;
      padding: 20px;
      .workbench__card-time {
        font-size: 36px;
        line-height: 50px;
        > span {
          &:nth-child(1) {
            margin-right: 30px;
          }
        }
      }
      .workbench__card-name {
        font-size: 30px;
        line-height: 42px;
        margin-top: 40px;
        > span {
          color: $primaryColor;
        }
      }
    }
    .workbench__bg {
      padding: 60px 120px 0;
      text-align: right;
      > img {
        max-height: 500px;
      }
    }
  }
</style>
