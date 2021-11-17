<template>
  <div class="login">
    <div class="login__left flex-center">
      <div class="login__left-con">
        <div class="login__left-head justify-center">
          <div class="login__left-welcome">WELCOME</div>
          <div class="login__left-logo"><img src="@assets/images/login/logo.png" alt="" /></div>
        </div>
        <div class="login__left-bg">
          <img src="@assets/images/login/bg.png" alt="" />
        </div>
      </div>
    </div>
    <div class="login__right flex-center">
      <div class="flex1">
        <div class="login__title">登录</div>
        <el-form class="login__form" :model="loginForm" @validate="validateFunc" :rules="rules" ref="loginFormInstance">
          <el-form-item prop="phone">
            <el-input v-model="loginForm.phone" placeholder="请输入手机号" prefix-icon="el-icon-phone" maxlength="11">
              <!-- <template #prepend>
          <el-select v-model="select" placeholder="Select" style="width: 110px">
            <el-option label="Restaurant" value="1"></el-option>
          </el-select>
        </template> -->
            </el-input>
          </el-form-item>
          <el-form-item prop="sms_code">
            <el-input v-model="loginForm.sms_code" placeholder="请输入验证码" prefix-icon="el-icon-lock" maxlength="6">
              <template #append>
                <div @click="sendCode" class="cursor-pointer">
                  <count-down
                    @endCallback="countDownEnd"
                    :endTime="59"
                    tipTextEnd="验证码已发送("
                    endText="发送验证码"
                    :isStart="countDownIsStart"
                  />
                </div>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login__submit btn btn-main btn-100" @click="onLogin" :disabled="!phoneIsValidate || !codeIsValidate"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { ElMessage, ElForm } from 'element-plus'
  import { useActions } from '@/store/use'
  import { login, LoginPostParams, sendSms } from '@/http/modules'
  import { setCookie } from '@/common/utils'
  import { validateCode, validateMobile } from '@/common/validate'
  import CountDown from '@/components/CountDown/index.vue'

  export default defineComponent({
    components: {
      CountDown
    },
    setup() {
      // form实例
      let loginFormInstance = ref<typeof ElForm>()
      // 表单数据
      const loginForm = reactive<LoginPostParams>({
        phone: '',
        // phone_code: '',
        sms_code: ''
      })
      const router = useRouter()
      let phoneIsValidate = ref<boolean>(false) // 手机号是否验证通过
      let codeIsValidate = ref<boolean>(false) // 验证码是否验证通过

      // 验证规则
      const rules = {
        phone: [{ validator: validateMobile, trigger: ['blur', 'change'] }],
        sms_code: [{ validator: validateCode, trigger: 'change' }]
      }

      // 验证回调
      const validateFunc = (prop: string, bol: boolean) => {
        switch (prop) {
          case 'phone':
            if (bol) {
              phoneIsValidate.value = true
            } else {
              phoneIsValidate.value = false
            }
            break
          case 'sms_code':
            if (bol) {
              codeIsValidate.value = true
            } else {
              codeIsValidate.value = false
            }
            break
          default:
            break
        }
      }
      let countDownIsStart = ref<boolean>(false) // 验证码是否已经发送
      const countDownEnd = () => {
        countDownIsStart.value = false
      }
      // 发送验证码
      const sendCode = () => {
        if (countDownIsStart.value) return
        loginFormInstance.value?.validateField('phone', async (err: string) => {
          console.log('validateField', err)
          if (err) return false
          try {
            const { phone } = loginForm
            const { code, message } = await sendSms({ phone })
            if (code === 10000) {
              ElMessage({
                message: message,
                type: 'success'
              })
              countDownIsStart.value = true
            }
          } catch (error) {}
        })
      }
      const storeActions = useActions('info', ['setUser'])
      const onLogin = async () => {
        const bol: boolean | undefined = await loginFormInstance.value?.validate()
        if (!bol) return
        console.log('loginForm', loginForm)
        const { code, data } = await login(loginForm)
        if (code === 10000) {
          const { token } = data
          setCookie({
            name: 'token',
            value: token
          })
          // 登录跳转之前清空数据
          storeActions.setUser()

          router.replace('/')
        }
      }
      return {
        loginForm,
        countDownIsStart,
        rules,
        loginFormInstance,
        phoneIsValidate,
        codeIsValidate,
        validateFunc,
        countDownEnd,
        sendCode,
        onLogin
      }
    }
  })
</script>
<style lang="scss" scoped>
  .login {
    min-height: 100vh;
    display: flex;
    background-color: $mainColor;
    .login__left {
      flex: 1;
      padding: 0 130px 0 67px;
      .login__left-con {
        .login__left-head {
          .login__left-welcome {
            font-size: 50px;
            font-weight: 600;
            color: #ffffff;
            line-height: 70px;
          }
          .login__left-logo {
            margin-top: 17px;
            margin-left: 30px;
            width: 158px;
          }
        }
        .login__left-bg {
          max-width: 603px;
          margin-top: 117px;
        }
      }
    }
    .login__right {
      width: 640px;
      background-color: #fff;
      border-top-left-radius: $siderRestrain;
      border-bottom-left-radius: $siderRestrain;
      padding: 70px;
      .login__title {
        font-size: 50px;
        font-weight: 600;
        color: $mainColor;
        line-height: 70px;
      }
      :deep(.login__form) {
        margin-top: 70px;
        .el-form-item {
          margin-bottom: 40px;
          .el-form-item__content {
            .el-input__inner {
              height: 68px;
              line-height: 68px;
              // border-color: $mainColor;
            }
            .el-input__prefix {
              line-height: 68px;
            }
          }
          // &.is-error {
          //   border-color: var(--el-color-danger);
          // }
        }
      }
      .login__submit {
        margin-top: 130px;
        font-size: 32px;
        font-weight: 500;
        line-height: 45px;
      }
    }
  }
</style>
