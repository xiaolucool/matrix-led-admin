import axiosInstance from '@/utils/axios'

export interface ApiResult<T> {
    code: number;
    message: string;
    data: T;
    timestamp: string;
}

/**
 * 创建动画
 */
export const createAnimation = async <T>(data: any): Promise<ApiResult<T>> => {
    const response = await axiosInstance.post<ApiResult<T>>(`/animation`, data);
    return response.data;
}

/**
 * 获取动画列表
 */
export const getAnimationList = async <T>(page: number, limit: number, params?: any): Promise<ApiResult<T>> => {
    const response = await axiosInstance.get<ApiResult<T>>(`/animation?page=${page}&limit=${limit}`, { params });
    return response.data;
}
