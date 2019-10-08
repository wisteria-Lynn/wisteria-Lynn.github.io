// 全局过滤器
export const getTel = val => {
	return val + '55555555555'
}

export const dateFilter = p => {
	if (p === '') return ''
	return new Date(+new Date(p) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
}
