import type { IBookType, IRes } from '@/types'

export function addBookType(type: Ref<string>) {
    const url = computed(() => `classification/${type.value}`)
    return useRequest<IRes<string>>(url, {
        method: 'POST',
        success({ code, message, data }) {
            if (code !== 200)
                return ElMessage.error(message)
        },
    })
}

export function getBookType() {
    return useRequest<IRes<IBookType[]>, { searchKeyword: string }>('/classification/getAll', {
        success({ code, message, data }) {
            if (code !== 200)
                return ElMessage.error(message)
        },
        params: {
            searchKeyword: '',
        },
    })
}
export function updateBookType() {
    return useRequest<IRes<string>, {
        oldType: string
        newType: string
    }>('/classification/update', {
        success({ code, message, data }) {
            if (code !== 200)
                return ElMessage.error(message)
        },
        method: 'post',
    })
}
export function deleteBookType(type: string) {
    return useRequest<IRes<string>>(`classification/${type}`, {
        success({ code, message, data }) {
            if (code !== 200)
                return ElMessage.error(message)
        },
        immediate: true,
    })
}
