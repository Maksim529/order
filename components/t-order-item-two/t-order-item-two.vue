<template>
	<view class="box">
		<view class="row">
			<text class="col-left">{{ code == 0 ? '询价单号': '订单号'}}</text>
			<text class="col-value" style="overflow:auto">{{orderNo}}</text>
		</view>
		<view style="margin: 20rpx 0;">
			<u-line :hairline="false"></u-line>
		</view>
		<view class="row">
			<text class="col-left">数量</text>
			<text class="col-value">{{value.amount}}</text>
		</view>
		<view style="margin: 20rpx 0;">
			<u-line :hairline="false"></u-line>
		</view>
		<view class="row">
			<text class="col-left">品类</text>
			<text class="col-value" style="overflow:auto">{{value.categoryName}}</text>
		</view>
		<view v-if="code != 0">
			<view style="margin: 20rpx 0;">
				<u-line :hairline="false"></u-line>
			</view>
			<view class="row">
				<text class="col-left">状态</text>
				<text class="col-value" style="overflow:auto">{{value.statusName || ''}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "t-order-item-two",
		props: {
			value: Object,
			code: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {

			};
		},
		computed: {
			orderNo(){
				let val = this.value.orderNo
				let left 
				let right
				if(val.indexOf('XJ') != -1) {
					left = val.slice(0,2)
					right = val.slice(-3)
					return left + '********' + right
				} else {
					left = val.slice(0,4)
					right = val.slice(-4)
					return left + '****************' + right
				}
				
			}
		}
	}
</script>

<style lang="scss">
	.box {
		box-sizing: border-box;
		padding: 25rpx 35rpx;
		border: 1px solid $u-border-color;
		border-radius: 5px;
		box-shadow: 2px 2px 5px #e2e2e2;

		.row {
			display: flex;
			align-items: center;

			.col-left {
				width: 30%;
			}
		}
	}
</style>
