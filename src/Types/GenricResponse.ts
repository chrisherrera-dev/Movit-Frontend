 export default interface GenricResponse<T> {
    completed: boolean
    message: string
    status: number
    data: T
}