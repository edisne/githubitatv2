export interface IServiceResponse<T> {
    data: T | null,
    success: boolean,
    message: string
}