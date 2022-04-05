<!-- 发布页面 -->
<template>
	<view class="container">
		<view class="box">
			<image src="../../static/xj.png" @click="toInquiryAdd"></image>
			<button  :custom-style="btnStyle" shape="circle" class="xj_btn"  @click="toInquiryAdd">我要询价</button>
		</view>
		<view class="box">
			<image src="../../static/dd.png" @click="toProductionAdd"></image>
			<button  :custom-style="btnStyle" shape="circle" class="dd_btn" @click="toProductionAdd">我有订单</button>
			
			
		</view>
		
	</view>
	
</template>

<script>
	import {
		isLogin
	} from '../../util/util.js'
	export default {
		data() {
			return {
				btnStyle: {
					width: '300rpx'
				}
			}
		},
		onLoad() {
			
		},
		onShow() {
			if (!isLogin()) {
				uni.reLaunch({
					url: '/pages/login/login'
				})
				return
			}
		},
		methods: {
			toInquiryAdd(){
				uni.navigateTo({
					url: '../inquiry/inquiry-add/inquiry-add'
				})
			},
			toProductionAdd() {
				uni.navigateTo({
					url: '../production/production-add/production-add'
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
	
	page,.container {
		height: 100%;
	}
	
	.container {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	
	.box {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	image{
		width: 250rpx;
		height: 250rpx;
		margin-bottom: 40rpx;
	}
	.xj_btn{
		
		
		/* background-color: #60bcb6; */
		background: linear-gradient(to right, #44bcbc, #44bcbc);
		
		/* background: radial-gradient(220% 105% at top center,  #75517d 10%, #e96f92 65%, #f7f7b6); */
		color: #ffffff;
		border-radius: 10px;
	}
	.dd_btn{
		/* background-color: #60bcb6; */
				background: linear-gradient(to right, #44bcbc, #44bcbc);
		
				/* background: radial-gradient(220% 105% at top center,  #75517d 10%, #e96f92 65%, #f7f7b6); */
				color: #ffffff;
				border-radius: 10px;
				
	}
	
	
</style>
