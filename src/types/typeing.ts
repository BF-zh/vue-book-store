// 展开类型
export type Expand<T> = T extends infer R ? { [K in keyof R]: R[K] } : never
// 类数组
export type Arrayable<T> = T | T[]
