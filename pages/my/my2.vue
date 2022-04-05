<template>
	<view style="display: flex;flex-direction: column;height: 100%;">
		<u-cell-group>
			<u-cell @click="showImg" title="头像">
				<image slot="value" style="width: 100rpx;" :src="user.avatar" mode="widthFix"></image>
			</u-cell>
			<u-cell @click="toChangeInfo" isLink title="姓名" :value="user.name"></u-cell>
			<u-cell v-if="user.customerName != null"  @click="toColleague" title="公司" :value="user.customerName" isLink></u-cell>
			<u-cell v-else title="公司" value="无"></u-cell>
			<u-gap height="10" bgColor="#EDEDED"></u-gap>
			<u-cell @click="toInvitation" v-if="isOpen" title="邀请" isLink></u-cell>
			<u-cell title="会员等级" :value="user.grade"></u-cell>
			<u-cell title="邮箱地址" :value="user.email"></u-cell>
			<u-cell title="其他信息" :value="user.other"></u-cell>
			<u-gap height="10" bgColor="#EDEDED"></u-gap>
			<u-cell title="关于我们" value="卓尚服饰（杭州）有限公司"></u-cell>
			<u-cell isLink @click="callPhone" title="联系客服" :value="phone"></u-cell>
		</u-cell-group>
		<view style="flex-grow: 1;background-color: #EDEDED;box-sizing: border-box;">
			<view style="margin: 20rpx;">
				<button @click="logout" class="submitbtn">退出</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getUserInfo
	} from '../../api/api.js'
	import {
		isLogin
	} from '../../util/util.js'
	export default {
		data() {
			return {
				phone: '陈琳18606527677',
				user: {
					// 用户头像
					avatar: '/static/logo.png',
					//公司名称
					customerName: '',
					// 用户名称
					name: '尚加',
					// 会员等级
					grade: 'V1',
					// 邮箱地址
					email: '未填',
					// 其他
					other: '无',
				},
				isOpen: false
			};
		},
		onShow() {
			if (isLogin()) {
				this.getUserInfo2()
			} else {
				uni.reLaunch({
					url: '/pages/login/login'
				})
				return
			}
		},
		methods: {
			toColleague() {
				uni.navigateTo({
					url: 'colleague/colleague'
				})
			},
			//跳转到邀请
			toInvitation() {
				uni.navigateTo({
					url: 'invitation/invitation'
				})
			},
			//查看头像
			showImg() {
				uni.previewImage({
					urls: [this.user.avatar]
				})
			},
			//跳转到编辑个人姓名
			toChangeInfo() {
				uni.navigateTo({
					url: 'change-info/change-info'
				})
			},
			getUserInfo2() {
				let that = this
				getUserInfo().then(res => {
					this.user.name = res.owner ? res.owner : res.account
					uni.setStorageSync('userId', res.id)
					uni.setStorageSync('userCustomerId', res.customerId || 0)
					this.user.customerName = res.customerName
					if(uni.getStorageSync('userCustomerId')) {
						that.isOpen = true
					} else {
						that.isOpen = false
					}
				})
			},
			// 退出
			logout() {
				uni.removeStorageSync('token')
				uni.removeStorageSync('userId')
				uni.removeStorageSync('userCustomerId')
				uni.reLaunch({
					url: '../login/login'
				})
			},
			//拨打客服
			callPhone() {
				uni.makePhoneCall({
					phoneNumber: this.phone
				})
			}
		},
		onShareAppMessage(res) {
			return {
				// title: '尚加智造',
				path: '/pages/home/home',
				imageUrl: '/static/logo2.png',
				success(res) {
					uni.showToast({
						title: '分享成功'
					})
				},
			}
		},
		// query: '',
		// imageUrl: '',
		onShareTimeline(res) {
			return {
				title: '尚加智造',
				success(res) {
					uni.showToast({
						title: '分享成功'
					})
				},
			}
		}
	}
</script>

<style lang="scss">
	page {
		padding: 0;
		height: 100%;
		// background-color: #EDEDED;
	}
</style>
