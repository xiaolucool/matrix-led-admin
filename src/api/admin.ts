import axiosInstance from '@/utils/axios'

export interface ApiResult<T> {
    code: number;
    message: string;
    data: T;
    timestamp: string;
}

export async function get<T>(url: string, params?: any): Promise<ApiResult<T>> {
    const response = await axiosInstance.get<ApiResult<T>>(url, { params });
    return response.data;
}

export async function post<T>(url: string, data?: any): Promise<ApiResult<T>> {
    const response = await axiosInstance.post<ApiResult<T>>(url, data);
    return response.data;
}

export async function put<T>(url: string, data?: any): Promise<ApiResult<T>> {
    const response = await axiosInstance.put<ApiResult<T>>(url, data);
    return response.data;
}

export async function del<T>(url: string, params?: any): Promise<ApiResult<T>> {
    const response = await axiosInstance.delete<ApiResult<T>>(url, { params });
    return response.data;
}

/**
 * 管理员登录
 */
export const loginAdmin = async <T>(data: any): Promise<ApiResult<T>> => {
    const response = await axiosInstance.post<ApiResult<T>>('/admin/login', data);
    return response.data;
}

/**
 * 创建管理员
 */
export const createAdmin = async <T>(data: any): Promise<ApiResult<T>> => {
    const response = await axiosInstance.post<ApiResult<T>>('/admin', data);
    return response.data;
}


/**
 * 获取管理员信息
 */
export const getAdminInfo = async <T>(): Promise<ApiResult<T>> => {
    const response = await axiosInstance.get<ApiResult<T>>('/admin');
    return response.data;
}

/**
 * 获取管理员列表
 */
export const getAdminList = async <T>(): Promise<ApiResult<T>> => {
    const response = await axiosInstance.get<ApiResult<T>>('/admin/list');
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
export const updatePwdAdmin = async <T>(data: any): Promise<ApiResult<T>> => {
    const response = await axiosInstance.patch<ApiResult<T>>(`/admin/pwd/${data.id}`, data);
    return response.data;
}

/**
 * 删除管理员
 */
export const deleteAdmin = async <T>(id: number): Promise<ApiResult<T>> => {
    const response = await axiosInstance.delete<ApiResult<T>>(`/admin/${id}`);
    return response.data;
}