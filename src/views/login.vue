<template>
  <div class="login">
    <div class="title">矩阵灯后台管理系统V1.0</div>
    <div class="form">
      <h2>登录</h2>
      <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" status-icon :rules="rules"
        label-width="auto" label-position="top" class="demo-ruleForm">
        <el-form-item label="账号" prop="username">
          <el-input v-model="ruleForm.username" type="text" placeholder="管理员账号" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" type="password" placeholder="管理员密码" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <div class="btns">
            <el-button type="primary" @click="submitForm(ruleFormRef)">
              登录
            </el-button>
            <el-button @click="resetForm(ruleFormRef)">重置</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { loginAdmin } from '@/api/admin'
import { useRouter } from 'vue-router'

const router = useRouter()

const ruleFormRef = ref<FormInstance>()


const validateUsername = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入管理员账号'))
  } else {
    callback()
  }
}
const validatePassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入管理员密码'))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  username: '',
  password: '',
})

const rules = reactive<FormRules<typeof ruleForm>>({
  username: [{ validator: validatePassword, trigger: 'blur' }],
  password: [{ validator: validateUsername, trigger: 'blur' }],
})

// 登录
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      // 登录处理
      // console.log('登录', ruleForm)
      try {
        const { data } = await loginAdmin<any>(ruleForm)
        if (data === '密码错误') {
          ElMessage.error(`${data}`)
        } else if (data === '管理员不存在') {
          ElMessage.error(`${data}`)
        } else if (data.token) {
          // 登录成功
          console.log('登录成功')
          ElMessage({
            message: '登录成功',
            type: 'success',
          })
          // 存储token
          localStorage.setItem('token', data.token)
          // 跳转
          router.push('/settings')
        }
      } catch (error) {
        ElMessage.error(`异常：${error}`)
      }
    } else {
      ElMessage.error(`登录失败`)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style scoped>
.login {
  height: 100%;
  background: #293146;

  .title {
    color: #fff;
    padding: 20px;
  }

  .form {
    padding: 40px 20px;
    border-radius: 10px;
    height: auto;
    width: 400px;
    max-width: 500px;
    min-width: 300px;
    background: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    h2 {
      text-align: center;
    }

    .btns {
      margin-top: 10px;
      width: 100%;
      display: flex;
      justify-content: space-between;

      button {
        width: 45%;
      }
    }
  }
}
</style>