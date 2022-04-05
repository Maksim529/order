<!-- 首页 -->
<template>
	<view>
		<u-notice-bar :text="noticeBar" color="#44bcbc" bgColor="#FFF"></u-notice-bar>
		<!-- <view class="top">
			<view style="display: flex;align-items: center;">
				<u-icon size="28" name="map-fill"></u-icon>
				<text style="font-size: 28rpx;">杭州</text>
			</view>
			<view style="width: 70%;">
				<u-search shape="round" :clearabled="true" :show-action="false"></u-search>
			</view>
			<u-icon size="28" name="scan"></u-icon>
		</view> -->
		<view class="banner">
			<u-swiper :list="banner" previousMargin="30" nextMargin="30" circular :autoplay="true" radius="5"
				bgColor="#ffffff"></u-swiper>
		</view>
		<view>
			<u-grid :border="false" @click="click" col="2">
				<u-grid-item v-for="(item,index) in baseList" :key="index" :name="index">
					<u-icon :customStyle="{paddingTop:20+'rpx', marginBottom: '10rpx'}" :name="item.name" :size="24">
					</u-icon>
					<text class="grid-text">{{item.title}}</text>
				</u-grid-item>
			</u-grid>
		</view>
		<view class="box2">
			<t-card title="最新询价单" :border="0" :isFull="true" :is-shadow="true" thumbnail="/static/xj2.png">
				<swiper vertical="true" circular="true" display-multiple-items="1" :autoplay="autoplay"
					:interval="interval" :duration="duration">
					<swiper-item v-for="(item,index) in list" :key="index" style="display: flex;align-items: center;">
						<t-order-item-two style="width: 100%;" class="item" :value="item"></t-order-item-two>
					</swiper-item>
				</swiper>
			</t-card>
		</view>
		<view class="box2">
			<t-card title="最新需求单" :border="0" :isFull="true" :is-shadow="true" thumbnail="/static/dd2.png">
				<swiper vertical="true" circular="true" display-multiple-items="1" :autoplay="autoplay"
					:interval="interval" :duration="duration" style="height: 200px;">
					<swiper-item v-for="(item,index) in list2" :key="index" style="display: flex;align-items: center;">
						<t-order-item-two style="width: 100%;" class="item" :code="1" :value="item"></t-order-item-two>
					</swiper-item>
				</swiper>
			</t-card>
		</view>
	</view>
</template>

<script>
	import {
		validToken,
		findRollInfo,
		getUserInfo
	} from '../../api/api.js'
	import {
		isLogin
	} from '../../util/util.js'
	export default {
		data() {
			return {
				autoplay: true,
				interval: 3000,
				duration: 2000,
				banner: [
					'http://price.hzzsfs.com:18068/prod-api/profile/apk/banner11.png',
					'http://price.hzzsfs.com:18068/prod-api/profile/apk/banner21.png',
					'http://price.hzzsfs.com:18068/prod-api/profile/apk/banner31.png',
				],
				baseList: [{
						name: 'rmb-circle-fill',

						title: '我要询价'
					},
					{
						name: 'file-text-fill',

						title: '我有订单'
					}
					/* ,
					
				{
											name: 'share-square',
											
											title: '工厂推荐'
										} */
				],
				list: [],
				list2: [],
				noticeBar: '欢迎来到尚加智造'
			}
		},
		onLoad() {
			// if(!isLogin()) {
			// 	uni.reLaunch({
			// 		url: '/pages/login/login'
			// 	})
			// 	return
			// }
		},
		onShow() {
			if (!isLogin()) {
				uni.reLaunch({
					url: '/pages/login/login'
				})
				return
			}
			if (uni.getStorageSync('userId') == '') {
				getUserInfo().then(res => {
					uni.setStorageSync('userId', res.id)
					uni.setStorageSync('userCustomerId', res.customerId || 0)
				})
			}
			uni.showLoading({
				title: '加载中',
				mask: true
			})
			// this.list = []
			findRollInfo('1').then(res => {
				this.list = res
				/* if (res.length >= 4) {
					for (let i = 0; i < 4; i++) {
						this.list.push(res[i])
					}
				} else {
					for (let i = 0; i < res.length; i++) {
						this.list.push(res[i])
					}
				} */
			})
			// this.list2 = []
			findRollInfo('2').then(res => {
				this.list2 = res
				/* if (res.length >= 4) {
					for (let i = 0; i < 4; i++) {
						if (res[i] == null) continue
						this.list2.push(res[i])
					}
				} else {
					for (let i = 0; i < res.length; i++) {
						if (res[i] == null) continue
						this.list2.push(res[i])
					}
				} */
				uni.hideLoading()
			})

		},
		methods: {
			click(index) {
				switch (index) {
					case 0:
						uni.navigateTo({
							url: '../inquiry/inquiry-add/inquiry-add'
						})
						break;
					case 1:
						uni.navigateTo({
							url: '../production/production-add/production-add'
						})
						break;
					default:
						uni.$u.toast('暂未实现')
						break;
				}
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

<style>
	page {
		padding: 0;
	}

	.top {
		display: flex;
		direction: row;
		align-items: center;
		justify-content: space-between;
		height: 45rpx;
		box-sizing: border-box;
		padding: 0 15px;
		margin: 0 auto;
	}

	.banner {
		/* height: 300rpx;
		line-height: 300rpx;
		text-align: center;
		border-bottom: 1px solid #000; */
		margin-bottom: 15rpx;
	}

	.box2 {
		width: 93%;
		margin: 40rpx auto;
	}

	.item {
		display: block;
		margin-bottom: 10rpx;
	}

	.item:last-child {
		margin-bottom: 0;
	}

	.privilege-item-pic {}
</style>
