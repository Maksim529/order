const http = uni.$u.http
const uploadUrl = process.env.API_BASE
const Authorization1 = uni.getStorageSync('token')

/* 需求订单评价详情 */
export const tbtbOrderEvaluationDetail = (data) => {
	return http.get('/tbOrderEvaluation/getByOrderId', {
		params: data,
		custom: {
			token: true
		}
	})
}

/* 需求订单评价 */
export const tbOrderEvaluationAdd = (data) => {
	return http.post('/tbOrderEvaluation/add', data, {
		custom: {
			token: true
		}
	})
}


/* 询价单详情 */
export const tbcustomeraskById = (data) => {
	return http.get('/customerask/getInfo', {
		params: data,
		custom: {
			token: true
		}
	})
}

/* 需求订单详情 */
export const tbcustomerOrderById = (data) => {
	return http.get('/customerOrder/getById', {
		params: data,
		custom: {
			token: true
		}
	})
}


/* 获取图片组 */
export const tbimgpicInfosAsk = (data) => {
	return http.get('/customerask/tbCustomerAsk/picInfos', {
		params: data,
		custom: {
			token: true
		}
	})
}

/* 再议价 */
export const tbaskAgain = (data) => {
	return http.post('/customerask/askAgain', {}, {
		params: data,
		custom: {
			token: true
		}
	})
}

/* 查询工作台个数 */
export const tbcustomerOrderCounts = (data) => {
	return http.get('/customerOrder/totalCounts', {
		params: data,
		custom: {
			token: true
		}
	})
}

/* 询价单分页 */
export const tbCustomerAskList = (data) => {
	return http.get('/customerask/list', {
		params: data,
		custom: {
			token: true
		}
	})
}

/* 商品分类列表(pid) */
export const findListByPidUsingGET = (data) => {
	return http.get('/productType/findListByPid', {
		params: data,
		custom: {
			token: true
		}
	})
}

/* 商品分类列表(id) */
export const findItemByIdUsingGET = (data) => {
	return http.get('/productType/detail', {
		params: data,
		custom: {
			token: true
		}
	})
}

export const getOpenId = (data) => {
	return http.get('/wx/getKey', {
		params: data
	})
}

export const login = (data) => {
	return http.post('/wx/login', data, {})
}

export const getUserInfo = () => {
	return http.get('/user/info', {
		custom: {
			token: true
		}
	})
}

export const validToken = () => {
	return http.get('/user/validToken', {
		custom: {
			token: true
		}
	})
}

export const changeUserInfo = (data) => {
	return http.post('/tbCustomerAccount/edit', data, {
		custom: {
			token: true
		}
	})
}
/**
 * 询价单编号获取
 */
export const getIncrOrder = () => {
	return http.get('/customerask/getIncrOrder', {
		custom: {
			token: true
		}
	})
}

/**
 * 订单编号获取
 * /customerorder/getIncrOrder
 */
export const getProductionOrderId = () => {
	return http.get('/customerOrder/createOrderNo', {
		params: {
			// customeerId: uni.getStorageSync('userCustomerId')
			customeerId: uni.getStorageSync('userId')
		},
		custom: {
			token: true
		}
	})
}

export const uploadPhotoAndXjInfo = (filePath, data) => {
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: uploadUrl + '/customerask/publish/form',
			filePath,
			name: 'stylePhoto',
			formData: {
				param: data
			},
			header: {
				Authorization1: uni.getStorageSync('token'),
				APPType: 'weixin'
				// 'content-type': 'multipart/form-data'
			},
			success(res) {
				resolve(res)
			}
		})
	})
}

export const uploadPhotoByXjId = (filePath, id) => {
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: uploadUrl + '/customerask/publish/upload',
			filePath,
			name: 'uploadPhoto',
			formData: {
				id
			},
			header: {
				Authorization1: uni.getStorageSync('token'),
				APPType: 'weixin'
				// 'content-type': 'multipart/form-data'
			},
			success(res) {
				let data = JSON.parse(res.data)
				if (data.success) {
					resolve(true)
				} else {
					resolve(false)
				}
			}
		})
	})
}

/**
 * 查询尺码组信息
 */

export const getSizeListById = (id) => {
	return http.get('/sizeConfig/getSizeInforList', {
		params: {
			id
		},
		custom: {
			token: true
		}
	})
}

/**
 * 查字典
 */

export const findListByDictTypeCode = (code) => {
	return http.get('/sysDictData/findListByDictTypeCode', {
		params: {
			dictTypeCode: code
		},
		custom: {
			token: true
		}
	})
}

/**
 * 上传订单主图及信息
 */

export const uploadPhotoAndDdInfo = (filePath, data) => {
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: uploadUrl + '/customerorder/publish',
			filePath,
			name: 'stylePhoto',
			formData: {
				param: data
			},
			header: {
				Authorization1: uni.getStorageSync('token'),
				APPType: 'weixin'
				// 'content-type': 'multipart/form-data'
			},
			success(res) {
				resolve(res)
			}
		})
	})
}

export const askToOrder = (data) => {
	return http.post('/customerOrder/add', data, {
		custom: {
			token: true
		}
	})
}

export const askToOrderPhoto = (filePath, type, orderNo) => {
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: uploadUrl + '/customerOrder/uploadFile',
			filePath,
			name: 'files',
			formData: {
				orderNo,
				type
			},
			header: {
				Authorization1: uni.getStorageSync('token'),
				APPType: 'weixin'
			},
			success(res) {
				let data = JSON.parse(res.data)
				// console.log(data, type);
				if (data.success) {
					resolve(true)
				} else {
					resolve(false)
				}
			}
		})
	})
}

export const uploadPhotoByDdId = (filePath, id) => {
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: uploadUrl + '/customerorder/publish/upload',
			filePath,
			name: 'uploadPhoto',
			formData: {
				id
			},
			header: {
				Authorization1: uni.getStorageSync('token'),
				APPType: 'weixin'
				// 'content-type': 'multipart/form-data'
			},
			success(res) {
				let data = JSON.parse(res.data)
				if (data.success) {
					resolve(true)
				} else {
					resolve(false)
				}
			}
		})
	})
}

/**
 * 生产订单分页
 */

export const getCustomerOrderPage = (data) => {
	return http.get('/customerOrder/page', {
		params: data,
		custom: {
			token: true
		}
	})
}

/**
 * 修改订单状态
 */
export const saveCustomerOrderStatus = (data) => {
	return http.post('/customerOrder/saveStatus', null, {
		params: data,
		custom: {
			token: true
		}
	})
}

/**
 * 获取首页列表
 */

export const findRollInfo = (type) => {
	return http.get('/customerOrder/findRollInfo', {
		params: {
			type
		},
		custom: {
			token: true
		}
	})
}

/**
 * @businessDataId 关联值id
 * @businessType 文件类型
 * 获取文件列表
 */
export const fileList = (businessDataId, businessType) => {
	return http.get('/sysFile/list', {
		params: {
			businessDataId,
			businessType
		},
		custom: {
			token: true
		}
	})
}

/**
 * 查看剪裁详情
 */
export const checkTailorInfo = (orderId) => {
	return http.get('/customerOrder/checkTailorInfo', {
		params: {
			orderId
		},
		custom: {
			token: true
		}
	})
}

/**
 * 查看步骤图
 */
export const checkStatusStep = (orderId) => {
	return http.get('/customerOrder/checkStatusStep', {
		params: {
			orderId
		},
		custom: {
			token: true
		}
	})
}

/**
 * 邀请功能
 */
export const saveInvite = (tel) => {
	return http.post('/tbCustomerAccount/saveInvite', tel, {
		custom: {
			token: true
		}
	})
}

/**
 * 获取进度的图片或视频
 */
export const getOrderSpeedFileList = (data) => {
	return http.get('/customerOrder/orderFileUrlList', {
		params: data,
		custom: {
			token: true
		}
	})
}

/**
 * 获取同事
 */
export const getByCustomerId = () => {
	return http.get('/tbCustomerAccount/getByCustomerId', {
		params: {customerId: uni.getStorageSync('userCustomerId')},
		custom: {
			token: true
		}
	})
}
