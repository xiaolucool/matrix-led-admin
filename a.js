const a = [
    [
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        255,
        255,
        255,
        255,
        255,
        255
    ],
    [
        255,
        255,
        255,
        0,
        0,
        0,
        0,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        0,
        0,
        0,
        0,
        255,
        255,
        255
    ],
    [
        255,
        255,
        0,
        0,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        0,
        0,
        255,
        255
    ],
    [
        255,
        0,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        0,
        255
    ],
    [
        0,
        0,
        255,
        255,
        255,
        255,
        0,
        0,
        0,
        0,
        255,
        255,
        255,
        255,
        0,
        0,
        0,
        0,
        255,
        255,
        255,
        255,
        0,
        0
    ],
    [
        0,
        0,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        0,
        0
    ],
    [
        0,
        0,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        0,
        0
    ],
    [
        255,
        0,
        255,
        255,
        255,
        255,
        0,
        0,
        0,
        255,
        255,
        255,
        255,
        255,
        255,
        0,
        0,
        0,
        255,
        255,
        255,
        255,
        0,
        255
    ],
    [
        255,
        255,
        0,
        0,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        0,
        0,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        0,
        0,
        255,
        255
    ],
    [
        255,
        255,
        255,
        0,
        0,
        0,
        0,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        0,
        0,
        0,
        0,
        255,
        255,
        255
    ],
    [
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        255,
        255,
        255,
        255,
        255,
        255
    ]
]

// 使用嵌套的map函数转换数组
const transformedArray = a.map(row =>
    row.map(value =>
        value === 0 ? 0 : 1
    )
);

console.log(transformedArray.length, transformedArray)