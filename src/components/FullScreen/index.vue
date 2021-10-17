<template>
  <div class="full-screen">
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'LoyiFullScreen',
    props: {},
    setup() {}
  })
</script>

<style lang="scss" scoped>
  .full-screen {
    height: 100vh;
    min-height: 400px;
    width: 100%;
    min-width: 700px;
  }
</style>
