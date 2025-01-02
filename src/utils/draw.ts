import type { Box } from '@/types/box'

/**
 * 镜像翻转
 * @param boxs 二维数组
 * @returns 
 */
const mirrorHorizontally = (boxs: Box[][]) => {
    // 对每一行进行反转
    return boxs.map(row => row.slice().reverse());
}


/**
 * 触摸结束事件处理函数
 * @param boxs 二维数组，存储方块状态
 */
const handleTouchEnd = (boxs: Box[][]) => {
    // 重置isUpdate
    boxs.forEach(item => {
        item.forEach(box => {
            box.isUpdate = true
        })
    })
}

/**
 * 将二维数组转换为二维对象数组
 * @param boxs 二维数组
 */
const transformBoxs = (boxs: number[][]): Box[][] => {
    return boxs.map(row =>
        row.map(status => ({
            status,
            isUpdate: true
        }))
    )
}

/**
 * 切换灯的状态
 * @param boxs 二维数组，存储方块状态
 * @param i 行索引
 * @param j 列索引
 */
const switchLed = (boxs: Box[][], i: number, j: number) => {
    boxs[i][j].status == 0 ? boxs[i][j].status = 1 : boxs[i][j].status = 0
}



/**
 * 获取盒子样式
 * @param boxs 盒子数组
 * @param triangleWidth 盒子宽度
 * @param triangleHeight 盒子高度
 * @param margin 盒子边距
 * @param i 盒子行索引
 * @param j 盒子列索引
 * @returns 盒子样式对象
 */
const getBoxStyle = (boxs: Box[][], triangleWidth: number, triangleHeight: number, margin: string, i: number, j: number) => {
    return {
        width: `${triangleWidth}px`,
        height: `${triangleHeight}px`,
        backgroundColor: boxs[i][j].status === 0 ? '#AABBCF' : '#020610',
        margin
    };
}

/**
 * 触摸移动事件处理函数
 * @param e 触摸事件对象
 * @param isMouseDown 是否触发
 * @param boxDirection 方向，0为左侧，1为右侧
 * @param boundary 边界值
 * @param triangleWidth 三角形宽度
 * @param boxs 二维数组，存储方块状态
 * @returns Box[][] | undefined
 */
const handleMouseMove = (e: any, isMouseDown: boolean, boxDirection: 0 | 1, boundary: any, triangleWidth: number, boxs: Box[][]) => {
    if (isMouseDown) {
        // 获取盒子距离左侧的宽度
        const { left, top } = boundary
        // 获取点击位置
        const x = e.clientX - left.value
        const y = e.clientY - top.value
        // 计算点击位置的行索引
        const calculatedI = boxDirection === 0 ? Math.floor(y / (triangleWidth + 4)) : Math.floor(y / (triangleWidth + 3));
        const calculatedJ = boxDirection === 0 ? Math.floor((x / triangleWidth) - calculatedI) : Math.floor((x / triangleWidth) - (11 - calculatedI))
        // 边界判断
        if (calculatedI < 0 || calculatedI >= 11 || calculatedJ < 0 || calculatedJ >= 24) return
        // 避免重复点击
        if (!boxs[calculatedI][calculatedJ].isUpdate) return
        boxs[calculatedI][calculatedJ].isUpdate = false
        // 状态取反
        boxs[calculatedI][calculatedJ].status = boxs[calculatedI][calculatedJ].status === 0 ? 1 : 0
    }
}

export {
    getBoxStyle,
    handleTouchEnd,
    switchLed,
    mirrorHorizontally,
    transformBoxs,
    handleMouseMove
}