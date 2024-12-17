<template>
  <div class="login">
    <div class="title">矩阵灯后台管理系统V1.0</div>
    <div class="form">
      <h2>登录</h2>
      <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" status-icon :rules="rules"
        label-width="auto" label-position="top" class="demo-ruleForm">
        <el-form-item label="账号" prop="username">
          <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <div class="btns">
            <el-button type="primary" @click="submitForm(ruleFormRef)">
              登录
            </el-button>
            <el-button @click="resetForm(ruleFormRef)">清空</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

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
  formEl.validate((valid) => {
    if (valid) {
      // 登录处理
      console.log('登录', ruleForm)
    } else {
      console.log('登录 失败')
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