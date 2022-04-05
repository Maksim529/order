<template>
	<view v-show="isOver">
		<view class="box" :class="isOther? 'otherStyle' : ''" @click="onDetailList(index)">
			<view v-if="statusCode1 == 0">
				<view>
					<view class="row">
						<text class="col-left">询价单号</text>
						<text class="col-value" style="width: 345rpx;word-wrap: break-word;">{{value.askOrderNo}}</text>
					</view>
					<view style="margin: 20rpx 0;">
						<u-line :hairline="false"></u-line>
					</view>
				</view>
				<view>
					<view class="row">
						<text class="col-left">客户款号</text>
						<text class="col-value"
							style="width: 345rpx;word-wrap: break-word;">{{value.customerSku}}</text>
					</view>
					<view style="margin: 20rpx 0;">
						<u-line :hairline="false"></u-line>
					</view>
				</view>
				<view>
					<view class="row">
						<text class="col-left">品类</text>
						<text class="col-value"
							style="width: 345rpx;word-wrap: break-word;">{{value.categoryName}}</text>
					</view>
					<view style="margin: 20rpx 0;">
						<u-line :hairline="false"></u-line>
					</view>
				</view>
				<view>
					<view class="row">
						<text class="col-left">订单数</text>
						<text class="col-value" style="width: 345rpx;word-wrap: break-word;">{{value.counts}}件</text>
					</view>
					<view style="margin: 20rpx 0;">
						<u-line :hairline="false"></u-line>
					</view>
				</view>
				<view>
					<view class="row">
						<text class="col-left">生产类型</text>
						<text class="col-value"
							style="width: 345rpx;word-wrap: break-word;">{{linshiproduceType}}</text>
					</view>
					<view style="margin: 20rpx 0;">
						<u-line :hairline="false"></u-line>
					</view>
				</view>
				<view v-if="statusCode2 == 1">
					<view class="row" >
						<text class="col-left price">预估报价</text>
						<text v-if="value.publisePrices.length == 1"
							class="col-value price">{{value.publisePrices[0].servicePrice + '-' + value.publisePrices[0].servicePriceHigh + '元/件'}}</text>
						<text v-if="value.publisePrices.length == 2"
							class="col-value price">{{value.publisePrices[1].servicePrice + '-' + value.publisePrices[1].servicePriceHigh + '元/件'}}</text>
					</view>
					<view style="margin: 20rpx 0;">
						<u-line :hairline="false"></u-line>
					</view>
				</view>
				<view v-if="statusCode2 == 2">
					<view class="row">
						<text class="col-left">状态</text>
						<text class="col-value">{{ askStatus }}</text>
					</view>
					<view v-if="isOther" style="margin: 20rpx 0;">
						<u-line :hairline="false"></u-line>
					</view>
				</view>
				<view v-if="statusCode2 == 6">
					<view class="row">
						<text class="col-left">状态</text>
						<text class="col-value"
							style="width: 345rpx;word-wrap: break-word;">{{askStatus}}</text>
					</view>
					<view style="margin: 20rpx 0;">
						<u-line :hairline="false"></u-line>
					</view>
				</view>
				<view v-if="isOther">
					<view class="row">
						<u-tag :text="value.customerAccountName || '无'" plain size="mini" type="warning"></u-tag>
					</view>
				</view>
				<view v-if="statusCode2 == 0 && !isOther">
					<view style="display: flex;align-items: center;justify-content: flex-end;" @tap.stop>
						<u-button type="warning" :custom-style="btnStyle" @click="talkPhone()">联系业务员</u-button>
					</view>
				</view>
				<view v-if="statusCode2 == 1 && !isOther">
					<view style="display: flex;align-items: center;justify-content: space-between;" @tap.stop>
						<u-button type="warning" :custom-style="btnStyle" :disabled="value.publisePrices.length == 2"
							@click="askAgain">
							<text>{{'再谈价' + '\n' + '(联系业务员)'}}</text>
						</u-button>
						<u-button type="success" :custom-style="btnStyle" @click="acceptPrice">
							<text>{{'接受价格' + '\n' + '(转生产单)'}}</text>
						</u-button>
					</view>
				</view>
			</view>

			<view v-if="statusCode1 == 1">
				<view>
					<view class="row">
						<text class="col-left">订单号</text>
						<text class="col-value" style="width: 345rpx;word-wrap: break-word;">{{value.orderNo}}</text>
					</view>
					<view style="margin: 20rpx 0;">
						<u-line :hairline="false"></u-line>
					</view>
				</view>
				<view>
					<view class="row">
						<text class="col-left">客户款号</text>
						<text class="col-value"
							style="width: 345rpx;word-wrap: break-word;">{{value.customerSku}}</text>
					</view>
					<view style="margin: 20rpx 0;">
						<u-line :hairline="false"></u-line>
					</view>
				</view>
				<view>
					<view class="row">
						<text class="col-left">品类</text>
						<text class="col-value"
							style="width: 345rpx;word-wrap: break-word;">{{value.strCategory}}</text>
					</view>
					<view style="margin: 20rpx 0;">
						<u-line :hairline="false"></u-line>
					</view>
				</view>
				<view>
					<view class="row">
						<text class="col-left">订单数</text>
						<text class="col-value" style="width: 345rpx;word-wrap: break-word;">{{value.amount}}件</text>
					</view>
					<view style="margin: 20rpx 0;">
						<u-line :hairline="false"></u-line>
					</view>
				</view>
				<view>
					<view class="row">
						<text class="col-left">生产类型</text>
						<text class="col-value"
							style="width: 345rpx;word-wrap: break-word;">{{linshiproduceType}}</text>
					</view>
					<view style="margin: 20rpx 0;">
						<u-line :hairline="false"></u-line>
					</view>
				</view>
				<view v-if="statusCode2 == 1">
					<view class="row">
						<text class="col-left">生产价格</text>
						<text class="col-value"
							style="width: 345rpx;word-wrap: break-word;">{{value.price + '元/件'}}</text>
					</view>
					<view style="margin: 20rpx 0;">
						<u-line :hairline="false"></u-line>
					</view>
				</view>
				<view v-if="statusCode2 == 6">
					<view class="row">
						<text class="col-left">状态</text>
						<text class="col-value"
							style="width: 345rpx;word-wrap: break-word;">{{needStatus}}</text>
					</view>
					<view style="margin: 20rpx 0;">
						<u-line :hairline="false"></u-line>
					</view>
				</view>
				<view v-if="isOther">
					<view class="row">
						<u-tag :text="value.tbCustomer.owner || '无'" plain size="mini" type="warning"></u-tag>
					</view>
				</view>
				<view v-if="(statusCode2 == 0 || statusCode2 == 2 || statusCode2 ==4) && !isOther">
					<view style="display: flex;align-items: center;justify-content: flex-end;" @tap.stop>
						<u-button type="warning" :custom-style="btnStyle" @click="talkPhone()">联系业务员</u-button>
					</view>
				</view>
				<view v-if="statusCode2 == 1 && !isOther">
					<view style="display: flex;align-items: center;justify-content: space-between;" @tap.stop>
						<u-button type="warning" :custom-style="btnStyle" @click="orderAgain">
							<text>{{'再谈价' + '\n' + '(联系业务员)'}}</text>
						</u-button>
						<u-button type="success" :custom-style="btnStyle" @click="saveCustomerOrderStatus('6')">
							<text>{{'接受价格' + '\n' + '(邮寄合同)'}}</text>
						</u-button>
					</view>
				</view>
				<view v-if="statusCode2 == 3 && !isOther">
					<view style="display: flex;align-items: center;justify-content: space-between;" @tap.stop>
						<u-button type="warning" :custom-style="btnStyle" @click="talkPhone()">联系业务员</u-button>
						<u-button type="success" :custom-style="btnStyle" @click="saveCustomerOrderStatus('4')">收货</u-button>
					</view>
				</view>
				<view v-if="statusCode2 == 5 && !isOther">
					<view style="display: flex;align-items: center;justify-content: space-between;" @tap.stop>
						<u-button type="warning" :custom-style="btnStyle" @click="talkPhone()">联系业务员</u-button>
						<u-button type="success" :custom-style="btnStyle" @click="addEvaluate()">评价</u-button>
					</view>
				</view>
				<view v-if="statusCode2 == 6">
					<view v-if="isOther" style="margin: 20rpx 0;">
						<u-line :hairline="false"></u-line>
					</view>
					<view style="display: flex;align-items: center;justify-content: flex-end;" @tap.stop>
						<u-button type="warning" :custom-style="btnStyle" @click="toOrderAginAdd()">再来一单</u-button>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		findItemByIdUsingGET,
		saveCustomerOrderStatus,
		findListByDictTypeCode,
		tbaskAgain
	} from '../../api/api.js'
	export default {
		name: "t-order-item",
		props: {
			value: Object,
			statusCode1: String,
			statusCode2: String
		},
		data() {
			return {
				biid: null,
				meid: null,
				// askStatus: '',
				// needStatus: '',
				pinlei: this.value.category,
				isOver: false,
				btnStyle: {
					width: '45%',
					heigth: '120px',
					margin: '0'
				},
				produceTypeList: [{
						id: 1,
						value: "FOB（包工包料）"
					},
					{
						id: 2,
						value: "CMT（来料加工）"
					}
				],
				statusTypeList: [],
				statusType: [],
				//控制边框样式
				isOther: false,
			};
		},
		created() {
			// findListByDictTypeCode('produce_type').then(res => {
			// 	this.produceTypeList = res
			// })

		},
		onReady() {
			if (this.statusCode1 == 0) {
				if (uni.getStorageSync('userId') == this.value.accountId) {
					this.isOther = false
				} else {
					this.isOther = true
				}
			} else {
				if (uni.getStorageSync('userId') == this.value.customerId) {
					this.isOther = false
				} else {
					this.isOther = true
				}
			}
			if (this.statusCode1 == 0 && this.linshiproduceType == '') {
				findListByDictTypeCode('produce_type').then(res => {
					this.produceTypeList = res
					if (this.statusCode2 == 2 && this.askStatus == '') {

					} else {
						this.isOver = true
						uni.hideLoading()
					}
				})
				if (this.statusCode2 == 2 && this.askStatus == '') {
					findListByDictTypeCode('tbcustomerask_state').then(res => {
						this.statusTypeList = res
						this.isOver = true
						uni.hideLoading()
					})
				}
			} else if (this.statusCode1 == 1 && this.linshiproduceType == '') {
				findListByDictTypeCode('produce_type').then(res => {
					this.produceTypeList = res
					if (this.statusCode2 == 6 && this.needStatus == '') {

					} else {
						this.isOver = true
						uni.hideLoading()
					}
				})
				if (this.statusCode2 == 6 && this.needStatus == '') {
					findListByDictTypeCode('order_status').then(res => {
						this.statusTypeList = res
						this.isOver = true
						uni.hideLoading()
					})
				}
			} else {
				this.isOver = true
				uni.hideLoading()
			}
		},
		computed: {
			linshiproduceType() {
				let val = ''
				for (let i = 0; i < this.produceTypeList.length; i++) {
					if (this.produceTypeList[i].code == this.value.produceType) {
						val = this.produceTypeList[i].value
					}
				}
				return val
			},
			needStatus() {
				let val = ''
				for (let i = 0; i < this.statusTypeList.length; i++) {
					if (this.statusTypeList[i].code == this.value.status) {
						val = this.statusTypeList[i].value
					}
				}
				return val
			},
			askStatus() {
				let val = ''
				for (let i = 0; i < this.statusTypeList.length; i++) {
					if (this.statusTypeList[i].code == this.value.askStatus) {
						val = this.statusTypeList[i].value
					}
				}
				return val
			}
		},
		methods: {
			orderAgain() {
				let that = this
				let talk = this.value.principalName + this.value.principalPhone
				uni.showActionSheet({
					itemList: [`联系业务员（${talk}）`, '确定再谈价'],
					success: function(res) {
						let index = res.tapIndex;
						if (index == 0) {
							uni.makePhoneCall({
								phoneNumber: that.value.principalPhone //仅为示例
							});
						} else {
							saveCustomerOrderStatus({
								status: '0',
								id: that.value.id
							}).then(res => {
								/* if (res.success) {
									that.$emit('changeCustomerOrder', {
										status: true
									})
								} else {
									that.$emit('changeCustomerOrder', {
										status: false
									})
								} */
								uni.showToast({
									title: "提交再议价"
								})
								setTimeout(() => {
									uni.redirectTo({
										url: `../detaillist/detaillist?statusCode1=1&statusCode2=6&title=需求订单&indexId=${that.value.id}`
									})
								}, 500)
							})
						}
					}
				});
			},
			askAgain() {
				let that = this
				uni.showActionSheet({
					itemList: ['联系业务员（陈琳18606527677）', '确定再谈价'],
					success: function(res) {
						let index = res.tapIndex
						if (index == 0) {
							uni.makePhoneCall({
								phoneNumber: '18606527677' //仅为示例
							});
						} else {
							console.log(that.value, "123");
							tbaskAgain({
								id: that.value.id,
								askStatus: '1000'
							}).then(res => {
								// that.$emit('zyj', {})
								uni.showToast({
									title: "提交再议价"
								})
								setTimeout(() => {
									uni.redirectTo({
										url: `../detaillist/detaillist?statusCode1=0&statusCode2=1&title=询价单&indexId=${that.value.id}`
									})
								}, 500)
							})
						}
					}
				});
				// console.log(this.value, "123456789")

			},
			onDetailList() {
				let title
				if (this.statusCode1 == 0) {
					title = '询价单'
				} else if (this.statusCode1 == 1) {
					title = '需求订单'
				}
				uni.navigateTo({
					url: `../detaillist/detaillist?statusCode1=${this.statusCode1}&statusCode2=${this.statusCode2}&title=${title}&indexId=${this.value.id}`
				})
			},
			acceptPrice() {
				uni.redirectTo({
					url: '../../pages/production/production-add/production-add?isInquiryToProduction=true&toaskId=' +
						this.value.askOrderNo + '&tocustomerSku=' + this.value.customerSku +
						'&tocategorySmallId=' +
						this.value.category + '&toproduceType=' + this.value.produceType + '&tostylePicStr=' + this
						.value.stylePicStr + '&toddbid=' + this.value.id
				})
				// console.log(this.value,"询价单页面value")
			},
			saveCustomerOrderStatus(status, title) {
				let that = this
				uni.showModal({
					title: '询问',
					content: '您确定要进行此操作吗？',
					success(val) {
						if (val.confirm) {
							saveCustomerOrderStatus({
								status,
								id: that.value.id
							}).then(res => {
								/* if (res.success) {
									that.$emit('changeCustomerOrder', {
										status: true
									})
								} else {
									that.$emit('changeCustomerOrder', {
										status: false
									})
								} */
								uni.showToast({
									title: "提交成功"
								})
								setTimeout(() => {
									uni.redirectTo({
										url: `../detaillist/detaillist?statusCode1=1&statusCode2=6&title=需求订单&indexId=${that.value.id}`
									})
								}, 500)
							})
						}
					}
				})
			},
			addEvaluate() {
				uni.navigateTo({
					url: `../../pages/evaluate/evaluate?indexId=${this.value.id}&orderNo=${this.value.orderNo}&isSee=${false}`
				})
			},
			toOrderAginAdd() {
				uni.redirectTo({
					url: `../../pages/production/production-add/production-add?oid=${this.value.id}`
				})
			},
			talkPhone() {
				let title
				let phone
				if (this.statusCode2 == 0) {
					title = '陈琳'
					phone = '18606527677'
				} else {
					title = this.value.principalName
					phone = this.value.principalPhone
				}
				uni.showToast({
					title: `即将联系业务员${title}`,
					duration: 1500,
					icon: 'none',
					success() {
						setTimeout(() => {
							uni.makePhoneCall({
								phoneNumber: phone //仅为示例
							});
						}, 1500)
					}
				})

			}
		}
	}
</script>

<style lang="scss">
	.box {
		width: 90%;
		margin: 35rpx auto;
		box-sizing: border-box;
		padding: 25rpx 35rpx;
		border: 1px solid #3c9cff;
		// border: 1px solid #3c9cff;
		border-radius: 5px;
		box-shadow: 2px 2px 5px #e2e2e2;

		.row {
			display: flex;
			align-items: center;

			.col-left {
				width: 38%;
			}
		}
	}

	.otherStyle {
		border: 1px solid $u-border-color !important;
	}
</style>
