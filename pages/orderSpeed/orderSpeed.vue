<template>
	<view class="box1">
		<view class="stepBox" v-show="show1">
			<u-steps :current="nodeNum" direction="column" :iconSize="20" style="height: 500px;">
				<block v-for="(item, index) in dictList" :key="index">
					<u-steps-item :title="item.title">
						<view slot="desc" style="display: flex;align-items: center;">
							<text style="font-size: 12px;">{{item.desc || ' '}}</text>
							<view style="width: 20px;margin-right: 20px;" v-if="item.isImages">
								<u-icon @click="showImg(item.businessType)" name="photo-fill" size="25" color="#2979ff"></u-icon>
							</view>
							<view v-if="item.isVideos">
								<u-icon @click="showVideo(item.businessType)" name="play-circle-fill" size="25" color="#2979ff"></u-icon>
							</view>
						</view>
					</u-steps-item>
				</block>
			</u-steps>
		</view>
		<view v-show="show2">
			<u-collapse>
				<u-collapse-item title="实裁明细">
					<view class="table">
						<!-- <view style="margin: 10px 15px;">实裁明细</view> -->
						<t-table>
							<t-tr>
								<t-th>颜色</t-th>
								<t-th>尺码</t-th>
								<t-th>下单量</t-th>
								<t-th>实裁量</t-th>
							</t-tr>
							<t-tr v-for="(item, index) in list" :key="index">
								<t-td>{{item.colorName}}</t-td>
								<t-td>{{item.size}}</t-td>
								<t-td>{{item.count}}</t-td>
								<t-td>{{item.processedNum}}</t-td>
							</t-tr>
						</t-table>
					</view>
				</u-collapse-item>
			</u-collapse>
		</view>
	</view>
</template>

<script>
	import {
		checkTailorInfo,
		checkStatusStep,
		getOrderSpeedFileList
	} from '../../api/api.js'
	export default {
		data() {
			return {
				orderId: null,
				list: [],
				show1: false,
				show2: false,
				nodeNum: 0,
				dictList: []
			}
		},
		onLoad(options) {
			this.orderId = options.orderId
			this.getvalue()
		},
		methods: {
			showVideo(businessType) {
				uni.navigateTo({
					url: `../fileList/fileList?pt=1&orderId=${this.orderId}&businessType=${businessType}&fileType=2&title=视频`
				})
			},
			showImg(businessType) {
				let data = {
					orderId: this.orderId,
					businessType,
					fileType: 1
				}
				getOrderSpeedFileList(data).then(res => {
					uni.previewImage({
						urls: res
					})
				})
			},
			getvalue() {
				uni.showLoading({
					mask: true,
					title: '加载中'
				})
				checkStatusStep(this.orderId).then(res => {
					this.nodeNum = res.nodeNum
					this.dictList = res.dictList
					this.show1 = true
					if (this.nodeNum >= 4) {
						checkTailorInfo(this.orderId).then(res2 => {
							this.list = res2
							if (this.list.length > 0) {
								this.show2 = true
							}
							uni.$u.sleep(500).then(() => {
								uni.hideLoading()
							})
						})
					} else {
						uni.$u.sleep(500).then(() => {
							uni.hideLoading()
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.stepBox {
		margin-top: 15px;
		display: flex;
		justify-content: center;
		// align-items: center;
	}

	.table {
		margin-top: 5px;
		margin-bottom: constant(safe-area-inset-bottom);
		margin-bottom: env(safe-area-inset-bottom);
		margin-bottom: 30px;
		position: relative;
	}
	page {
		padding: 0;
	}
	
</style>
