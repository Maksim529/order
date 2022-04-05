module.exports = (vm) => {
	// 初始化请求配置
	uni.$u.http.setConfig((config) => {
		/* config 为默认全局配置*/
		config.baseURL = process.env.API_BASE;
		config.timeout = 60000
		return config
	})

	// 请求拦截
	uni.$u.http.interceptors.request.use((config) => { // 可使用async await 做异步操作
		// 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
		config.data = config.data || {}
		// 根据custom参数中配置的是否需要token，添加对应的请求头
		config.header.APPType = 'weixin'
		if (config.custom.token) {
			config.header.Authorization1 = uni.getStorageSync('token')
		}
		return config
	}, config => { // 可使用async await 做异步操作
		return Promise.reject(config)
	})

	// 响应拦截
	uni.$u.http.interceptors.response.use((response) => {
		/* 对响应成功做点什么 可使用async await 做异步操作*/
		const data = response.data

		// 自定义参数
		const custom = response.config?.custom
		if (data.code !== 200) {
			// 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
			// if (custom.toast !== false) {
			// 	uni.$u.toast(data.message)
			// }

			// 如果需要catch返回，则进行reject
			if(data.message.indexOf("token") != -1) {
				uni.$u.toast('登录已过期，请重新登录')
				uni.$u.sleep(500).then(() => {
					uni.removeStorageSync('token')
					uni.removeStorageSync('userId')
					uni.removeStorageSync('userCustomerId')
					uni.reLaunch({
						url: '/pages/login/login'
					})
				})
				return
			}
			// if (custom?.catch) {
				uni.$u.toast(data.message || '请求错误')
				return Promise.reject(data)
			// } else {
				// 否则返回一个pending中的promise，请求不会进入catch中
				// return new Promise(() => {})
			// }
		} else {
			if(data.success) {
				if(data.data === null || data.data === undefined) {
					return data
				}
				return data.data
			}  else {
				return Promise.reject(data)
			}
		}
	},(response) => {
		// 对响应错误做点什么 （statusCode !== 200）
		uni.$u.toast('请求出错')
		return Promise.reject(response)
	})
}