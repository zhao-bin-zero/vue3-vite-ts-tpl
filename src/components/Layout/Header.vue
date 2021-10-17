<template>
  <el-header class="item-center">
    <div class="header__logo"><img src="@assets/images/logo.png" alt="" /></div>
    <el-menu :default-active="activeIndex" class="header__menu flex1" mode="horizontal">
      <el-menu-item
        :index="item.path"
        v-for="item in storeGetters.authMenu.value"
        :key="item.name"
        :item="item"
        @click="menuItemLink(item.name)"
      >
        {{ item.meta.title }}
      </el-menu-item>
    </el-menu>
    <div class="header__info">
      <el-avatar class="header__info-avatar" icon="el-icon-user-solid" />
    </div>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        {{ storeGetters.user.value.admin_name }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-header>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { useGetters } from '@/store/use'
  import { ElMessageBox, ElMessage } from 'element-plus'
  import { destroyToken } from '@/http/modules/index'
  import { useRouter } from 'vue-router'
  import { delCookie } from '@/common/utils'
  export default defineComponent({
    name: 'LayoutHeader',
    props: {
      activeIndex: {
        type: String,
        default: ''
      }
    },
    setup() {
      const storeGetters = useGetters('info', ['user', 'authMenu'])
      const router = useRouter()
      const handleCommand = (command: string) => {
        console.log(command)
        if (command === 'loginout') {
          ElMessageBox.confirm('确定要退出吗', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              destroyToken().then((res) => {
                console.log(res)
                if (res.code === 10000) {
                  ElMessage({ type: 'success', message: '退出登录成功' })
                  delCookie({ name: 'token' })
                  router.replace('/login')
                }
              })
            })
            .catch(() => {})
        }
      }
      const menuItemLink = (name: string) => {
        router.push({ name })
      }
      return {
        storeGetters,
        menuItemLink,
        handleCommand
      }
    }
  })
</script>
<style lang="scss" scoped>
  .header__logo {
    margin: 0 120px 0 50px;
    height: 35px;
  }
  .header__menu {
    background-color: $headerMenuBg;
    border-bottom-width: 0;
    .el-menu-item {
      color: $headerMenuColor;
      height: $headerHeight;
      font-size: 18px;
      margin: 0 5px;
      &.is-active {
        border-bottom-width: 0;
        background-color: $headerMenuHoverBg;
        color: $headerMenuHoverColor !important;
      }
      &:not(.is-disabled):focus,
      &:not(.is-disabled):hover {
        background-color: $headerMenuHoverBg;
        color: $headerMenuHoverColor;
      }
    }
  }
  .header__info {
    margin: 0 20px;
    .header__info-avatar {
      width: 45px;
      height: 45px;
      line-height: 45px;
    }
  }
</style>
