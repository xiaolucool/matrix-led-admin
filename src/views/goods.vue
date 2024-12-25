<template>
    <div class="goods">
        <el-card class="card">
            <template #header>
                <div class="card-header">
                    <span>动画管理</span>
                    <div class="search">
                        <el-form ref="searchFormRef" class="search-form" :model="searchForm" label-width="auto"
                            status-icon :rules="rules" style="max-width: 600px">
                            <el-form-item label="搜索动画" prop="type">
                                <el-select v-model="searchForm.type" placeholder="类型">
                                    <el-option label="动画ID" value="1" />
                                    <el-option label="动画名称" value="2" />
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
                <el-table-column fixed prop="id" label="ID" />
                <el-table-column prop="name" label="动画名称" />
                <el-table-column prop="price" label="价格" />
                <el-table-column prop="salesNumber" label="销量" />
                <el-table-column prop="image" label="图片">
                    <template #default="scope">
                        <el-image :preview-teleported="true" :src="`${imageBaseURL}${scope.row.image}`"
                            alt="图片" :preview-src-list="srcList" style="width: 40px; height: 40px;" />
                    </template>
                </el-table-column>
                <el-table-column prop="interval" label="播放间隙" />
                <el-table-column prop="frame" label="帧数" />
                <el-table-column prop="isActivated" label="状态">
                    <template #default="scope">
                        <el-check-tag :type="scope.row.isOnline === 1 ? 'success' : 'danger'" checked
                            @change="tagChange(scope.row)">{{ scope.row.isOnline ===
                                1 ? '已上架'
                                : '已下架' }}</el-check-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" />
                <el-table-column prop="updateTime" label="更新时间" />
                <el-table-column fixed="right" prop="role" label="修改" min-width="120">
                    <template #default="scope">
                        <el-button type="success" icon="Shop" size="small"
                            @click="router.push({ name: '', params: { id: scope.row.id } })">修改动画</el-button>
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
import { getAnimationList } from '@/api/animation'
import { useRouter } from 'vue-router'
import { imageBaseURL } from '@/config/config';

// 动画列表类型
interface AnimationList {
    left: number[][]
    right: number[][]
}

interface Animation {
    id: number
    name: string
    image: string
    price: number
    salesNumber: number
    isOnline: number
    interval: number
    frame: number
    frames: AnimationList[]
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
// 当前页面图片列表
const srcList = ref([])

// 表单元素
const searchFormRef = ref<FormInstance>()
// 搜索表单
const searchForm = ref({
    type: '1',
    keyword: ''
})

const search = ref({})

const validateType = (rule: any, value: any, callback: any) => {
    // type只能是 
    if (value !== '1' && value !== '2') {
        callback(new Error('请选择搜索方式'))
    } else if (value === '') {
        callback(new Error('请选择搜索方式'))
    } else {
        callback()
    }
}
const validateKeyword = (rule: any, value: any, callback: any) => {
    // value不能为空 只能是十位数的id 11位的电话号码 长度是4到20的用户名字符串
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
const tagChange = async (animation: Animation) => {
    // 1 上架 0 下架
    let { isOnline, id } = animation
    if (isOnline === 0) {
        isOnline = 1
    } else {
        isOnline = 0
    }
    try {
        const { data } = await updateStatusUser({
            id,
            isOnline
        })
        if (data === "动画不存在") return ElMessage.error('动画不存在')
        ElMessage({
            message: '修改动画状态成功',
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
            message: '删除动画成功',
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
        // ID
        search.value = {
            id: searchForm.value.keyword
        }
    } else if (searchForm.value.type === '2') {
        // name
        search.value = {
            name: searchForm.value.keyword
        }
    }
    init()
}


// 初始化
const init = async () => {
    try {
        // 获取动画列表
        const { data } = await getAnimationList<any>(page.value, limit.value, search.value)
        total.value = data.total
        tableData.value = data.items
        srcList.value = data.items.map((item: Animation) => `${imageBaseURL}${item.image}`)
    } catch (error) {
        ElMessage.error(`异常：${error}`)
    }
}

onMounted(() => {
    init()
})

</script>

<style scoped>
.goods {
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