<template>
	<view>
		<block v-for="(item, index) in list" :key="index">
			<t-order-item @zyj="zyj($event, index)" @changeCustomerOrder="changeCustomerOrder($event, index)" :statusCode1="statusCode1" :statusCode2="statusCode2" :value="item" ></t-order-item>
		</block>
		<view style="margin-top: 50rpx;" v-if="isEmpty">
			<u-empty mode="order" icon="http://cdn.uviewui.com/uview/empty/order.png">
			</u-empty>
		</view>
	</view>
</template>

<script>
	import {
		tbCustomerAskList,
		getCustomerOrderPage
	} from '../../api/api.js'
	export default {
		data() {
			return {
				statusCode1: '',
				statusCode2: '',
				isEmpty: false,
				isOver: false,
				title: '',
				pageNo: 1,
				list: [],
				totalPage: 0
			};
		},
		/**
		 * statusCode1=0 询价单  statusCode1=1 生产订单
		 */
		onLoad(options) {
			this.title = options.title
			uni.setNavigationBarTitle({
				title: this.title
			})
			if(options.num == 0) {
				this.isEmpty = true
				console.log(this.isEmpty);
			}
			this.statusCode1 = options.statusCode1
			this.statusCode2 = options.statusCode2
			this.getList()
		},
		methods: {
			getList() {
				uni.showLoading({
					title: '加载中'
				})
				let that = this
				if (this.statusCode1 == 0) {
					if (this.statusCode2 == 0) {
						this.gettbCustomerAskList('1000')
					}
					if (this.statusCode2 == 1) {
						this.gettbCustomerAskList('2000')
					}
					if (this.statusCode2 == 2) {
						this.gettbCustomerAskList(0)
					}
				} else {
					if( this.statusCode2 != 6){
						getCustomerOrderPage({
							status: this.statusCode2,
							pageNo: that.pageNo,
							pageSize: 3,
							// customerId: uni.getStorageSync('userCustomerId'),
							customerId: uni.getStorageSync('userId')
						}).then(res => {
							this.totalPage = res.totalPage
							// uni.hideLoading()
							this.list = this.list.concat(res.rows)
							if(this.list.length == 0) {
								this.isEmpty = true
							}
						})
					} else {
						this.gettbCustomerOrderPage()
					}
				}
				// if(this.isEmpty == true) {
				// 	uni.hideLoading()
				// }
				uni.$u.sleep(500).then(() => {
					uni.hideLoading()
				})
			},
			gettbCustomerAskList(index) {
				let that = this
				tbCustomerAskList({
					askStatus: index,
					accountId: uni.getStorageSync('userId'),
					pageNo: that.pageNo,
					pageSize: 3
				}).then(res => {
					// uni.hideLoading()
					// console.log(res,"res");
					this.list = this.list.concat(res.rows)
					this.totalPage = res.totalPage
					if(this.list.length == 0) {
						this.isEmpty = true
					}
				})
			},
			gettbCustomerOrderPage(index){
				let that = this
				getCustomerOrderPage({
					status: index,
					pageNo: that.pageNo,
					pageSize: 3,
					// customerId: uni.getStorageSync('userCustomerId')
					customerId: uni.getStorageSync('userId')
				}).then(res => {
					// uni.hideLoading()
					this.list = this.list.concat(res.rows)
					this.totalPage = res.totalPage
					if(this.list.length == 0) {
						this.isEmpty = true
					}
				})
			},
			changeCustomerOrder(val, index) {
				if(val.status) {
					uni.$u.toast('操作成功')
					this.list.splice(index, 1)
					if(this.list.length == 0) {
						this.isEmpty = true
					}
				}
			},
			zyj(e, index) {
				uni.showToast({
					title: "提交再议价"
				})
				setTimeout(() => {
					uni.navigateTo({
						url: `../list/list?statusCode1=0&title=询价单（未报价）&statusCode2=0&num=1`
					})
				}, 500)
				this.list.splice(index, 1)
				if(this.list.length == 0) {
					this.isEmpty = true
				}
			},
			
		},
		onPullDownRefresh() {
			this.pageNo = 1
			this.totalPage = 0
			this.list = []
			this.getList()
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 500)
		},
		onReachBottom() {
			if(this.pageNo >= this.totalPage) return
			if(this.statusCode1 == 1) {
				this.pageNo += 1
				this.getList()
			}
			if(this.statusCode1 == 0) {
				this.pageNo += 1
				this.getList()
			}
		}
	}
</script>

<style lang="scss">

</style>
