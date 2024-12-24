<template>
    <div class="admin">
        <el-card class="card">
            <template #header>
                <div class="card-header">
                    <span>管理员设置</span>
                    <el-tooltip effect="dark" content="新增管理员" placement="bottom">
                        <el-button type="primary" icon="Plus" size="small" @click="addAdmin" />
                    </el-tooltip>

                </div>
            </template>
            <el-table class="table" :data="tableData" style="width: 100%;" size="small">
                <el-table-column fixed prop="id" label="ID" />
                <el-table-column prop="username" label="管理员账号" />
                <el-table-column prop="role" label="角色">
                    <template #default="scope">
                        <el-tag :type="scope.row.role === 'super_admin' ? 'primary' : 'success'">{{ scope.row.role ===
                            'super_admin' ? '超级管理员' : '管理员' }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="isActivated" label="状态">
                    <template #default="scope">
                        <el-tag :type="scope.row.isActivated === 0 ? 'success' : 'danger'">{{ scope.row.isActivated ===
                            0 ? '已启用'
                            : '已停用' }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" />
                <el-table-column prop="updateTime" label="更新时间" />
                <el-table-column fixed="right" prop="role" label="编辑" min-width="120">
                    <template #default="scope">
                        <!-- 确认删除弹出 -->
                        <el-popconfirm width="220" icon="InfoFilled" icon-color="#626AEF" title="确定删除该管理员吗？">
                            <template #reference>
                                <el-button type="danger" :disabled="scope.row.role === 'super_admin' ? true : false"
                                    icon="Delete" circle size="small" />
                            </template>
                            <template #actions="{ confirm, cancel }">
                                <el-button size="small" @click="cancel">No</el-button>
                                <el-button type="danger" size="small" @click="removeClick(scope.row.id)">
                                    Yes
                                </el-button>
                            </template>
                        </el-popconfirm>
                        <!-- /确认删除弹出 -->
                        <el-button type="success" icon="Key" circle size="small" @click="editPwdClick(scope.row.id)" />
                        <el-button type="primary" icon="Edit" circle size="small" @click="editClick(scope.row)" />
                    </template>
                </el-table-column>
            </el-table>
            <template #footer>
                <!-- <el-pagination size="small" background layout="prev, pager, next" :total="50" class="mt-4" /> -->
            </template>
        </el-card>
        <!-- 修改信息弹窗 -->
        <el-dialog v-model="dialogInfoVisible" title="管理员编辑" width="500">
            <el-form :model="form" label-width="auto">
                <el-form-item label="ID">
                    <el-input disabled v-model="form.id" autocomplete="off" />
                </el-form-item>
                <el-form-item label="账号">
                    <el-input v-model="form.username" autocomplete="off" />
                </el-form-item>
                <el-form-item label="角色">
                    <el-radio-group v-model="form.role">
                        <el-radio value="super_admin" v-if="form.role === 'super_admin'">超级管理员</el-radio>
                        <el-radio value="admin" v-else>管理员</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="状态">
                    <el-radio-group v-model="form.isActivated">
                        <el-radio :value="0">启用</el-radio>
                        <el-radio :value="1">停用</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogInfoVisible = false">取消</el-button>
                    <el-button type="primary" @click="submitForm">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 修改密码弹窗 -->
        <el-dialog v-model="dialogPwdVisible" title="修改密码" width="500">
            <el-form :model="pwdForm" label-width="auto">
                <el-form-item label="ID">
                    <el-input disabled v-model="pwdForm.id" autocomplete="off" />
                </el-form-item>
                <el-form-item label="旧密码">
                    <el-input v-model="pwdForm.oldPwd" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input v-model="pwdForm.newPwd" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input v-model="pwdForm.confirmPwd" type="password" autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogPwdVisible = false">取消</el-button>
                    <el-button type="primary" @click="submitPwd">
                        修改
                    </el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 新增管理员弹窗 -->
        <el-dialog v-model="dialogAddVisible" title="添加管理员" width="500">
            <el-form :model="addForm" label-width="auto">
                <el-form-item label="账号">
                    <el-input v-model="addForm.username" autocomplete="off" />
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="addForm.password" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item label="角色">
                    <el-radio-group v-model="addForm.role">
                        <el-radio value="admin">管理员</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="状态">
                    <el-radio-group v-model="addForm.isActivated">
                        <el-radio :value="0">启用</el-radio>
                        <el-radio :value="1">停用</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogAddVisible = false">取消</el-button>
                    <el-button type="primary" @click="submitAddForm">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue'
import { getAdminList, getAdminInfo, updateAdmin, deleteAdmin, updatePwdAdmin, createAdmin } from '@/api/admin'
import { useRouter } from 'vue-router'

const router = useRouter()

// 管理员信息
const adminInfo = ref({
    id: '',
    username: '',
    role: '',
})

// 管理员信息弹出框
const dialogInfoVisible = ref(false)
// 修改密码弹出框
const dialogPwdVisible = ref(false)
// 新增管理员弹出框
const dialogAddVisible = ref(false)

// 管理员信息表单
const form = ref({
    id: '',
    username: '',
    role: '',
    isActivated: 0
})
// 密码修改表单
const pwdForm = ref({
    id: '',
    oldPwd: '',
    newPwd: '',
    confirmPwd: ''
})
// 新增管理员表单
const addForm = ref({
    username: '',
    password: '',
    role: 'admin',
    isActivated: 0
})

const tableData = ref([])

// 编辑管理员信息
const editClick = (item: any) => {
    dialogInfoVisible.value = true
    form.value = item
}
// 修改密码
const editPwdClick = async (id: string) => {
    pwdForm.value.id = id
    dialogPwdVisible.value = true
}
// 修改密码
const submitPwd = async () => {
    try {
        const { data } = await updatePwdAdmin<any>(pwdForm.value)
        if (data === '旧密码错误') {
            ElMessage.error(`${data}`)
        } else if (data === '管理员不存在') {
            ElMessage.error(`${data}`)
        } else if (data === '密码修改成功') {
            ElMessage({
                message: '密码修改成功',
                type: 'success',
            })
        }
        if (adminInfo.value.id === pwdForm.value.id) {
            // 是修改的字节的密码，退出登录
            localStorage.removeItem('token')
            router.push('/login')
        }
    } catch (error) {
        ElMessage.error(`异常：${error}`)
    }
    dialogPwdVisible.value = false
}
// 删除
const removeClick = async (id: any) => {
    try {
        await deleteAdmin<any>(id)
        ElMessage({
            message: '删除管理员成功',
            type: 'success',
        })
        init()
    } catch (error) {
        ElMessage.error(`异常：${error}`)
    }

}
// 保存
const submitForm = async () => {
    try {
        await updateAdmin(form.value)
        ElMessage({
            message: '管理员信息修改成功',
            type: 'success',
        })
    } catch (error) {
        ElMessage.error(`异常：${error}`)
    }
    dialogInfoVisible.value = false
}

// 新增管理员
const addAdmin = () => {
    dialogAddVisible.value = true
}
// 确认新增管理员
const submitAddForm = async () => {
    try {
        await createAdmin(addForm.value)
        ElMessage({
            message: '管理员添加成功',
            type: 'success',
        })
        init()
    } catch (error) {
        ElMessage.error(`异常：${error}`)
    }
    addForm.value = {
        username: '',
        password: '',
        role: 'admin',
        isActivated: 0
    }
    dialogAddVisible.value = false
}

// 初始化
const init = async () => {
    try {
        // 获取管理员列表
        const { data } = await getAdminList<any>()
        // 获取管理员信息
        const res = await getAdminInfo<any>()
        tableData.value = data
        adminInfo.value = res.data
        // 缓存管理员信息
        localStorage.setItem('admin', JSON.stringify(res))
    } catch (error) {
        ElMessage.error(`异常：${error}`)
    }
}

onMounted(() => {
    init()
})

</script>

<style scoped>
.admin {
    height: 100%;

    .card {
        height: 100%;

        .card-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }


    }

    :deep(.el-card__body) {
        height: calc(100% - 120px) !important;
        overflow: hidden;
    }
}
</style>