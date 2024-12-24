<template>
    <div class="admin">
        <el-card class="card">
            <template #header>
                <div class="card-header">
                    <span>用户管理</span>
                    <div class="search">
                        <el-form ref="searchFormRef" class="search-form" :model="searchForm" label-width="auto"
                            status-icon :rules="rules" style="max-width: 600px">
                            <el-form-item label="搜索用户" prop="type">
                                <el-select v-model="searchForm.type" placeholder="please select your zone">
                                    <el-option label="用户UID" value="1" />
                                    <el-option label="用户名称" value="2" />
                                    <el-option label="电话号码" value="3" />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="" prop="keyword">
                                <el-input v-model="searchForm.keyword" placeholder="关键字" />
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSearch">搜索</el-button>
                                <el-button type="default" @click="resetForm(searchFormRef)">清空</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </template>
            <el-table class="table" :data="tableData" style="width: 100%;" size="small">
                <el-table-column fixed prop="uid" label="UID" />
                <el-table-column prop="username" label="用户账号" />
                <el-table-column prop="phone" label="电话" />
                <el-table-column prop="orderCount" label="订单数量" />
                <el-table-column prop="isActivated" label="状态">
                    <template #default="scope">
                        <el-check-tag :type="scope.row.isActivated === 0 ? 'success' : 'danger'" checked
                            @change="tagChange(scope.row)">{{ scope.row.isActivated ===
                                0 ? '已启用'
                                : '已停用' }}</el-check-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" />
                <el-table-column prop="updateTime" label="更新时间" />
                <el-table-column fixed="right" prop="role" label="查看订单" min-width="120">
                    <template #default="scope">
                        <el-button type="success" icon="Shop" size="small"
                            @click="router.push({ name: 'order', params: { uid: scope.row.uid } })">查看订单</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <template #footer>
                <el-pagination size="small" background layout="total, sizes, prev, pager, next, jumper" :total="total"
                    :default-page-size="limit" v-model:current-page="page" :page-sizes="[10, 50, 100, 200]"
                    @current-change="handlePageChange" class="mt-4" />
            </template>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import { onMounted, ref } from 'vue'
import { getSearchUser, getUserList, updateStatusUser } from '@/api/user'
import { useRouter } from 'vue-router'

interface User {
    uid: number
    username: string
    phone: string
    orderCount: number
    isActivated: number
    createTime: string
    updateTime: string
}

const router = useRouter()

// 分页信息
const total = ref(0)
// 每页大小
const limit = ref(10)
// 当前页码
const page = ref(1)
// 表格数据
const tableData = ref([])

// 表单元素
const searchFormRef = ref<FormInstance>()
// 搜索表单
const searchForm = ref({
    type: '1',
    keyword: ''
})

const search = ref({})

const validateType = (rule: any, value: any, callback: any) => {
    // type只能是 1 2 3
    if (value !== '1' && value !== '2' && value !== '3') {
        callback(new Error('请选择搜索方式'))
    } else if (value === '') {
        callback(new Error('请选择搜索方式'))
    } else {
        callback()
    }
}
const validateKeyword = (rule: any, value: any, callback: any) => {
    // value不能为空 只能是十位数的uid 11位的电话号码 长度是4到20的用户名字符串
    if (value === '') {
        callback(new Error('请输入关键字'))
    } else {
        callback()
    }
}

const rules = ref<FormRules<typeof searchForm>>({
    type: [{ validator: validateType, trigger: 'blur' }],
    keyword: [{ validator: validateKeyword, trigger: 'blur' }],
})

// 清空表单
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    search.value = {}
    init()
}


// 启用/停用
const tagChange = async (user: User) => {
    let { isActivated, uid } = user
    if (isActivated === 0) {
        isActivated = 1
    } else {
        isActivated = 0
    }
    try {
        const { data } = await updateStatusUser({
            uid,
            isActivated
        })
        if (data === "用户不存在") return ElMessage.error('用户不存在')
        ElMessage({
            message: '修改用户状态成功',
            type: 'success',
        })
    } catch (error) {
        ElMessage.error(`异常：${error}`)
    }
    init()
}



// 删除
const removeClick = async (id: any) => {
    try {
        ElMessage({
            message: '删除用户成功',
            type: 'success',
        })
        init()
    } catch (error) {
        ElMessage.error(`异常：${error}`)
    }
}

// 分页器
const handlePageChange = (newPage: number) => {
    page.value = newPage
    init()
}

// 搜索
const onSearch = async () => {
    console.log(searchForm.value)
    if (searchForm.value.type === '1') {
        // UID
        search.value = {
            uid: searchForm.value.keyword
        }
    } else if (searchForm.value.type === '2') {
        // 用户名
        search.value = {
            username: searchForm.value.keyword
        }
    } else if (searchForm.value.type === '3') {
        // 电话
        search.value = {
            phone: searchForm.value.keyword
        }
    }
    init()
}


// 初始化
const init = async () => {
    try {
        // 获取用户列表
        // const { data } = await getUserList<any>(page.value, limit.value)
        const { data } = await getSearchUser<any>(page.value, limit.value, search.value)
        total.value = data.total
        tableData.value = data.items
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

            .search {
                display: flex;
                align-items: center;
                margin-left: 20px;

                :deep(.el-form-item__label) {
                    color: black !important;
                }

                :deep(.el-select__wrapper) {
                    width: 100px !important;
                }

                :deep(.el-input__wrapper) {
                    width: 150px !important;
                    margin: 0 10px;
                }

                :deep(.el-form-item) {
                    margin-bottom: 0px !important;
                }

                .search-form {
                    display: flex;
                }

            }
        }


    }

    :deep(.el-card__body) {
        height: calc(100% - 120px) !important;
        overflow: hidden;
    }
}
</style>