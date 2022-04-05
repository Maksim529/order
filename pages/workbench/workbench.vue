<!-- 工作台 -->
<template>
	<view>
		<view style="margin: 20rpx 0;">
			<t-card title="我的询价单" :border="0" :isFull="true" :is-shadow="true" thumbnail="/static/xj2.png">
				<u-grid :border="true" @click="click1" :col="3">
					<u-grid-item v-for="(item,index) in baseList1" :key="index" :name="index">
						<text style="margin-top: 20rpx;">{{item.num}}</text>
						<text style="margin-bottom: 20rpx;">{{item.title}}</text>
					</u-grid-item>
				</u-grid>
			</t-card>
		</view>
		<view>
			<t-card title="我的订单" :border="0" :isFull="true" :is-shadow="true" thumbnail="/static/dd2.png">
				<u-grid :border="true" @click="click2" :col="3">
					<u-grid-item v-for="(item,index) in baseList2" :key="index" :name="index">
						<text style="margin-top: 20rpx;">{{item.num}}</text>
						<text style="margin-bottom: 20rpx;">{{item.title}}</text>
					</u-grid-item>
				</u-grid>
			</t-card>
		</view>
	</view>
</template>

<script>
	import {
		tbCustomerAskList,
		tbcustomerOrderCounts
	} from '../../api/api.js'
	import {isLogin} from '../../util/util.js'
	export default {
		data() {
			return {
				list: [],
				// 询价单九宫格
				baseList1: [{
						statusCode2: 0,
						num: 0,
						title: '未报价'
					},
					{
						statusCode2: 1,
						num: 0,
						title: '已报价'
					},
					{
						statusCode2: 2,
						num: 0,
						title: '全部'
					}
				],
				// 生产订单九宫格
				baseList2: [{
						statusCode2: 0,
						num: 0,
						title: '未报价'
					},
					{
						statusCode2: 1,
						num: 0,
						title: '已报价'
					},
					{
						statusCode2: 2,
						num: 0,
						title: '已签约'
					},
					{
						statusCode2: 3,
						num: 0,
						title: '生产中'
					},
					{
						statusCode2: 4,
						num: 0,
						title: '已收货'
					},
					{
						statusCode2: 5,
						num: 0,
						title: '已关单'
					},
					{
						statusCode2: 6,
						num: 0,
						title: '全部'
					},
					{
						statusCode2: -1,
					},
				],
			}
		},
		onLoad(options) {
			
		},
		onShow() {
			if(!isLogin()) {
				uni.reLaunch({
					url: '/pages/login/login'
				})
				return
			}
			uni.showLoading({
				title:'加载中',
				mask: true
			})
			this.getValue()
			uni.$u.sleep(500).then(() => {
				uni.hideLoading()
			})
		},
		methods: {
			click1(index) {
				let statusCode2 = this.baseList1[index].statusCode2
				let title = '询价单（' + this.baseList1[index].title + '）'
				let num = this.baseList1[index].num
				uni.navigateTo({
					url: `../list/list?statusCode1=0&title=${title}&statusCode2=${statusCode2}&num=${num}`
				})
			},
			click2(index) {
				let statusCode2 = this.baseList2[index].statusCode2
				let title = '需求订单（' + this.baseList2[index].title + '）'
				let num = this.baseList2[index].num
				if (statusCode2 != -1){
					uni.navigateTo({
						url: `../list/list?statusCode1=1&title=${title}&statusCode2=${statusCode2}&num=${num}`
					})
				} 
			},
			getValue() {
				tbcustomerOrderCounts({
					accountId: uni.getStorageSync('userId'),
					customerId: uni.getStorageSync('userCustomerId')
					// customerId: uni.getStorageSync('userId')
				}).then(res => {
					this.baseList1[0].num = res.noQuotedAsk
					this.baseList1[1].num = res.quatedAsk
					this.baseList1[2].num = res.askTotal
					this.baseList2[0].num = res.noQuatedOrder
					this.baseList2[1].num = res.quatedOrder
					this.baseList2[2].num = res.writedOrder
					this.baseList2[3].num = res.workingOrder
					this.baseList2[4].num = res.shippedOrder
					this.baseList2[5].num = res.closedOrder
					this.baseList2[6].num = res.orderTotal
				})
			}
		},
		onPullDownRefresh() {
			this.getValue()
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 500)
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

</style>
