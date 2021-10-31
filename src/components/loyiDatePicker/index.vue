<template>
  <el-date-picker
    v-model="times"
    type="monthrange"
    unlink-panels
    start-placeholder="开始"
    end-placeholder="结束"
    value-format="YYYY.MM"
    format="YYYY.MM"
    @change="changeTime"
  />
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from 'vue'
  export default defineComponent({
    name: 'LoyiDatePicker',
    props: {
      startTime: {
        type: String,
        default: ''
      },
      endTime: {
        type: String,
        default: ''
      }
    },
    emits: ['update:startTime', 'update:endTime'],
    setup(props, { emit }) {
      // const startTime = ref('2014/10')
      // const endTime = ref('2017/10')
      const times = ref<string[]>([])
      watch(
        () => [props.startTime, props.endTime],
        (n, o = []) => {
          if (n[0] !== o[0] || n[1] !== o[1]) {
            times.value = n
          }
        },
        {
          deep: true,
          immediate: true
        }
      )
      const changeTime = (times: string[]) => {
        // console.log(1, times)
        emit('update:startTime', times[0])
        emit('update:endTime', times[1])
      }
      return {
        times,
        changeTime
      }
    }
  })
</script>
<style lang="scss" scoped></style>
