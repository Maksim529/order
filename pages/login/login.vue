<template>
	<view class="container">
		<view class="logo">
			<u-image width="200rpx" mode="widthFix" :src="logo"></u-image>
		</view>
		<!-- <view>
			<view class="box">
				<view class="btn">
					<u-input type="number" placeholder="请输入手机号码" prefixIcon="phone-fill" shape="circle"></u-input>
				</view>
				<view class="btn">
					<u-input type="number" placeholder="请输入验证码" prefixIcon="coupon-fill" shape="circle">
						<template slot="suffix">
							<u-button @click="getCode" :disabled="text != '获取验证码'" shape="circle" :text="text"
								type="primary" size="mini"></u-button>
						</template>
					</u-input>
				</view>
			</view>
			<view style="width: 100%;margin-top: 20rpx;margin-bottom: 30rpx;">
				<u--text type="primary" text="立即注册"></u--text>
			</view>
		</view> -->
		<!-- <view class="box2">
			<view style="width: 60%;">
				<u-button type="primary" shape="circle">登录</u-button>
			</view>
			<view class="box3">
				<u-checkbox-group v-model="isTure">
					<u-checkbox name="1" activeColor="#5677FC" shape="circle"></u-checkbox>
				</u-checkbox-group>
				<text style="font-size: 28rpx;">同意《协议》和《隐私协议》</text>
			</view>
		</view> -->
		<!-- <view style="width: 80%;margin-top: 50rpx;">
			<u-divider lineColor="#9a9998" text="快速登录"></u-divider>
		</view> -->
		<!-- <u-image width="100rpx" height="100rpx" @click="weLogin" mode="scaleToFill" :src="wechat"></u-image> -->
		<view style="width: 80%;">
			<u-button icon="weixin-fill" v-if="isTure.length > 0" type="success" shape="circle" iconColor="#ffffff"
				open-type="getPhoneNumber" @getphonenumber="wePhoneLogin">微信一键登录</u-button>
			<u-button icon="weixin-fill" v-else :disabled="true" type="success" shape="circle" iconColor="#ffffff">
				微信一键登录</u-button>
		</view>
		<view class="box3">
			<u-checkbox-group v-model="isTure">
				<u-checkbox name="1" activeColor="#5677FC" shape="circle"></u-checkbox>
			</u-checkbox-group>
			<view style="font-size: 28rpx;display: flex;">同意
				<u--text @click="show = true" type="primary" text="《用户使用协议》"></u--text>
			</view>
		</view>
		<u-popup :show="show" mode="center" :round="5"  @close="show = false" :safeAreaInsetBottom="false">
			<view style="width: 600rpx;height: 800rpx;overflow-y: auto;padding: 10rpx;">
				<t-xieyi></t-xieyi>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		getOpenId,
		login
	} from '../../api/api.js'
	import {
		getLoginCode
	} from '../../util/util.js'
	export default {
		data() {
			return {
				show: false,
				isAgree: false,
				lscode: null,
				logo: '/static/logo3.png',
				text: '获取验证码',
				num: 60,
				djs: '',
				isTure: '',
				wechat: '/static/wechat.png',
				phoneParams: {
					openid: '',
					ivdata: '',
					encrypdata: ''
				}
			};
		},
		onLoad() {
			getLoginCode().then((code) => {
				this.lscode = code
			})
		},
		methods: {
			// 获取手机号登录验证码
			getCode() {
				// 模拟向后端请求验证码
				uni.showLoading({
					title: '正在获取验证码'
				})
				setTimeout(() => {
					// 通知验证码组件内部开始倒计时
					this.djs = setInterval(() => {
						if (this.num === 0) {
							this.text = '获取验证码'
							this.num = 30
							clearInterval(this.djs)
							return
						}
						this.text = '倒计时' + this.num + '秒'
						this.num -= 1
					}, 1000)
					uni.$u.sleep(500).then(() => {
						uni.hideLoading();
					})
				})
			},
			// 判断是否同意协议
			isAgreeXieYi() {
				if (this.isTure[0] === undefined) {
					uni.$u.toast('请同意协议哦！')
					return false
				} else {
					return true
				}
			},
			// 微信获取手机号登录
			wePhoneLogin(e) {
				let detail = e.mp.detail
				if (detail.errMsg.indexOf('fail') !== -1) {
					uni.$u.toast('不授权，不能使用哦！')
					return
				}

				if (!this.isAgreeXieYi()) {
					return
				}



				getOpenId({
					js_code: this.lscode
				}).then(res => {
					console.log(res);
					this.phoneParams.openid = res
					this.phoneParams.encrypdata = detail.encryptedData;
					this.phoneParams.ivdata = detail.iv;
					login(this.phoneParams).then(res2 => {
						if (res2) {
							console.log(res2);
							uni.setStorageSync('token', res2)
							uni.reLaunch({
								url: '../home/home'
							})
						} else {
							uni.reLaunch({
								url: '../login/login'
							})
						}
					})
				})
			}
		},
	}
</script>

<style lang="scss">
	page {
		padding: 0;
	}

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		box-sizing: border-box;
	}

	.logo {
		margin: 80rpx 0 50rpx;
	}

	.box {
		.btn {
			height: auto;
		}

		height: 180rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.box2 {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.box3 {
		display: flex;
		align-items: center;
		margin-top: 30rpx;
	}
</style>
