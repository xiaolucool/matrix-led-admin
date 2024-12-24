import axiosInstance from '@/utils/axios'

export interface ApiResult<T> {
    code: number;
    message: string;
    data: T;
    timestamp: string;
}

/**
 * 获取管理员列表
 */
export const getUserList = async <T>(page: number, limit: number): Promise<ApiResult<T>> => {
    const response = await axiosInstance.get<ApiResult<T>>(`/user/all?page=${page}&limit=${limit}`);
    return response.data;
}

/**
 * 搜索管理员列表
 */
export const getSearchUser = async <T>(page: number, limit: number, params?: any): Promise<ApiResult<T>> => {
    const response = await axiosInstance.get<ApiResult<T>>(`/user/search?page=${page}&limit=${limit}`, { params });
    return response.data;
}

/**
 * 更新管理员信息
 */
export const updateAdmin = async <T>(data: any): Promise<ApiResult<T>> => {
    const response = await axiosInstance.patch<ApiResult<T>>(`/admin/${data.id}`, data);
    return response.data;
}

/**
 * 更新管理员密码
 */
export const updateStatusUser = async <T>(data: any): Promise<ApiResult<T>> => {
    const response = await axiosInstance.post<ApiResult<T>>(`/user/changeStatus`, data);
    return response.data;
}

