<template>
	<div class="default-box">
		<div class="right">
			<div class="container">
				<div v-for="(item, index) in boxsR" :key="index"
					:style="{ display: 'flex', marginLeft: `${(height - index) * triangleWidth}px` }">
					<div v-for="(box, i) in item" :key="i"
						:style="getBoxStyle(boxsR, triangleWidth, triangleHeight, '0.5px 0', index, i)"
						:class="`box ${i % 2 === 0 ? 'box-odd' : 'box-even'}`">
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

// 盒子的数据类型
interface Box {
	status: number;
	isUpdate: boolean;
}

const props = defineProps(['width', 'matrix'])
console.log('传入的数组',props.matrix)
const emit = defineEmits(['child-event'])
// 盒子的宽度
const boxWidth = ref(0)
// 盒子的高度
const boxHeight = ref(2)

// 记录盒子的容器的宽高信息
const boxRect = ref({ width: 0, height: 0 })
// 24列
const width = 24;
// 11行
const height = 11;
// 初始化boxs，每个元素都有backgroundColor属性
const boxsL = ref(Array.from(Array(height), () => Array.from(Array(width), () => ({ status: 0, isUpdate: true }))));
const boxsR = ref(Array.from(Array(height), () => Array.from(Array(width), () => ({ status: 0, isUpdate: true }))));
// 每个三角形的尺寸
const triangleWidth = ref(5)
const triangleHeight = ref(5)

// 将二维数组转换为二维对象数组
const transformBoxs = (boxArray: number[][]): Array<Array<Box>> => {
	return boxArray.map(row =>
		row.map(status => ({
			status,
			isUpdate: true
		}))
	)
};

const getBoxStyle = (boxs: Box[][], triangleWidth: number, triangleHeight: number, margin: string, i: number, j: number) => {
    return {
        width: `${triangleWidth}px`,
        height: `${triangleHeight}px`,
        backgroundColor: boxs[i][j].status === 0 ? '#49555E' : '#B7B2BA',
        margin
    };
}


const getBoxs = () => {
	console.log('传入的数组',props.matrix)
	// 盒子数据
	if (props.matrix) boxsR.value = transformBoxs(props.matrix)
	console.log('转换后的数组',boxsR.value)
	// 获取盒子的尺寸信息
	boxWidth.value = props.width || 250
	// 计算灯珠大小
	triangleWidth.value = (boxWidth.value / 2) / 35;
	triangleHeight.value = (boxWidth.value / 2) / 35;
	// 盒子高度
	boxHeight.value = triangleHeight.value * 11
}

getBoxs()

defineExpose({
	getBoxs
})

// 使用watch来观察props.rightWidth的变化
watch(() => props.width, (newVal) => {
	getBoxs()
}, { immediate: true }) // { immediate: true } 表示在watch创建时立即执行一次
</script>

<style scoped>
.default-b {
	uni-div {
		display: inline-block;
	}
}

.default-box {
	
	.right {
		/* width: 80px; */

		.container {
			position: relative;
			transform-origin: 0 0;
			color: #fff;
			font-size: 8px;


			.box-odd {
				clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
			}

			.box-even {
				clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
			}
		}
	}
}
</style>
