import axiosInstance from '@/utils/axios'

export interface ApiResult<T> {
    code: number;
    message: string;
    data: T;
    timestamp: string;
}

/**
 * 获取设置
 */
export const getSettings = async <T>(): Promise<ApiResult<T>> => {
    const response = await axiosInstance.get<ApiResult<T>>('/settings');
    return response.data;
}

/**
 * 获取用户数据
 */
export const getUser = async <T>(): Promise<ApiResult<T>> => {
    const response = await axiosInstance.get<ApiResult<T>>('/settings/user');
    return response.data;
}


/**
 * 更新设置
 */
export const updateSettings = async <T>(id: number, data: any): Promise<ApiResult<T>> => {
    const response = await axiosInstance.patch<ApiResult<T>>(`/settings/${id}`, data);
    return response.data;
}

