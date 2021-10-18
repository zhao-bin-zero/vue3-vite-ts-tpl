<template>
  <div class="login">
    <div class="login__left"></div>
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
              <template #append v-if="!isSend"> <div @click="sendCode" class="cursor-pointer">发送验证码</div> </template>
              <template #append v-else> 验证码已发送({{ codeText }}) </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login__submit" @click="onLogin" :disabled="!phoneIsValidate || !codeIsValidate"
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
  import { login, sendSms } from '@/http/modules'
  import { setCookie } from '@/common/utils'

  export default defineComponent({
    setup() {
      // form实例
      let loginFormInstance = ref<typeof ElForm>()
      // 表单数据
      const loginForm = reactive({
        phone: '',
        phone_code: '',
        sms_code: ''
      })
      const router = useRouter()
      let isSend = ref<boolean>(false) // 验证码是否已经发送
      let codeText = ref<number>(0) // 验证码是否已经发送
      let phoneIsValidate = ref<boolean>(false) // 手机号是否验证通过
      let codeIsValidate = ref<boolean>(false) // 验证码是否验证通过

      // 手机号验证回调
      const validateMobile = (rule: any, value: string, callback: (arg0?: Error) => void) => {
        if (!value || value === '') {
          return callback(new Error('手机号不能为空～'))
        }
        const RegMobile = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
        if (!RegMobile.test(value)) {
          return callback(new Error('手机号格式错误～'))
        }
        callback()
      }
      // 验证码验证回调
      const validateCode = (rule: any, value: string, callback: (arg0?: Error) => void) => {
        if (!value || value === '') {
          return callback(new Error('验证码不能为空～'))
        }
        if (value.length < 6) {
          return callback(new Error('请输入6位数验证码～'))
        }
        callback()
      }
      // 验证规则
      const rules = {
        phone: [{ validator: validateMobile, trigger: 'blur' }],
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
      // 发送验证码
      const sendCode = () => {
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
              countDown()
            }
          } catch (error) {}
        })
      }
      // 倒计时
      let timer: any
      const countDown = () => {
        if (isSend.value) return
        codeText.value = 60
        isSend.value = true
        timer = setInterval(() => {
          codeText.value--
          if (codeText.value <= 0) {
            clearInterval(timer)
            isSend.value = false
          }
        }, 1000)
      }
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
          router.replace('/')
        }
      }
      return {
        loginForm,
        isSend,
        codeText,
        rules,
        loginFormInstance,
        phoneIsValidate,
        codeIsValidate,
        validateFunc,
        sendCode,
        onLogin
      }
    }
  })
</script>
<style lang="scss" scoped>
  .login {
    height: 100vh;
    display: flex;
    background-color: $mainColor;
    .login__left {
      flex: 1;
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
      .login__form {
        margin-top: 70px;
      }
      .login__submit {
        margin-top: 130px;
      }
    }
  }
</style>
