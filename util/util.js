import {validToken} from '../api/api.js'
function sucuess(message) {
	uni.showToast({
		title: message,
		icon: "success",
		duration: 1500,
		mask: true
	})
}

let toast = {
	sucuess
}

function isLogin() {
	
	let token = uni.getStorageSync('token') || '';
	if(token == '') {
		return false
	} else {
		return true
	}
}

function getLoginCode() {
	return new Promise((resolve, reject) => {
		uni.login({
			provider: 'weixin',
			success: function(res) {
				resolve(res.code);
			},
			fail(err) {
				reject(err)
			}
		})
	})
}


export {
	toast,
	isLogin,
	getLoginCode
}
