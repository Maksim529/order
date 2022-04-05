<template>
	<view>
		<u--form labelPosition="left" ref="form" labelWidth="105" errorType="border-bottom" v-if="isOver">
			<u-form-item label="订单id" v-if="false" borderBottom>
				<text style="font-size: 32rpx;">{{list.orderId}}</text>
			</u-form-item>
			<u-form-item label="订单号" borderBottom>
				<text style="font-size: 32rpx;">{{list.orderNo}}</text>
			</u-form-item>
			<u-form-item label="物流" borderBottom>
				<view style="display: flex;">
					<u-rate count="5" v-model="list.logistics" :disabled="isSee"></u-rate>
					<text style="text-indent: 1em;">{{list.logistics}}</text>
				</view>
			</u-form-item>
			<u-form-item label="物流备注" borderBottom>
				<u--textarea v-model="list.logisticsNote" placeholder="请输入物流备注" v-if="!isSee" autoHeight></u--textarea>
				<!-- <u--textarea v-model="list.logisticsNote" v-if="isSee" :disabled="isSee" autoHeight></u--textarea> -->
				<text v-if="isSee">{{list.logisticsNote || '未填'}}</text>
			</u-form-item>
			<u-form-item label="时效" borderBottom>
				<view style="display: flex;">
					<u-rate count="5" v-model="list.prescription" :disabled="isSee"></u-rate>
					<text style="text-indent: 1em;">{{list.prescription}}</text>
				</view>
			</u-form-item>
			<u-form-item label="时效备注" borderBottom>
				<u--textarea v-model="list.prescriptionNote" placeholder="请输入时效备注" v-if="!isSee" autoHeight></u--textarea>
				<!-- <u--textarea v-model="list.prescriptionNote" v-if="isSee" :disabled="isSee" autoHeight></u--textarea> -->
				<text v-if="isSee">{{list.prescriptionNote || '未填'}}</text>
			</u-form-item>
			<u-form-item label="品质" borderBottom>
				<view style="display: flex;">
					<u-rate count="5" v-model="list.quality" :disabled="isSee"></u-rate>
					<text style="text-indent: 1em;">{{list.quality}}</text>
				</view>
			</u-form-item>
			<u-form-item label="品质备注" borderBottom>
				<u--textarea v-model="list.qualityNote" placeholder="请输入品质备注" v-if="!isSee" autoHeight></u--textarea>
				<!-- <u--textarea v-model="list.qualityNote" v-if="isSee" :disabled="isSee" autoHeight></u--textarea> -->
				<text v-if="isSee">{{list.qualityNote || '未填'}}</text>
			</u-form-item>
			<u-form-item label="服务态度" borderBottom>
				<view style="display: flex;">
					<u-rate count="5" v-model="list.serviceAttitude" :disabled="isSee"></u-rate>
					<text style="text-indent: 1em;">{{list.serviceAttitude}}</text>
				</view>
			</u-form-item>
			<u-form-item label="服务态度备注" borderBottom>
				<u--textarea v-model="list.serviceAttitudeNote" placeholder="请输入服务态度备注" v-if="!isSee" autoHeight></u--textarea>
				<!-- <u--textarea v-model="list.serviceAttitudeNote" v-if="isSee" :disabled="isSee" autoHeight></u--textarea> -->
				<text v-if="isSee">{{list.serviceAttitudeNote || '未填'}}</text>
			</u-form-item>
			<u-form-item label="其他" borderBottom>
				<view style="display: flex;">
					<u-rate count="5" v-model="list.other" :disabled="isSee"></u-rate>
					<text style="text-indent: 1em;">{{list.other}}</text>
				</view>
			</u-form-item>
			<u-form-item label="其他备注" borderBottom>
				<u--textarea v-model="list.otherNote" placeholder="请输入其他备注" v-if="!isSee" autoHeight></u--textarea>
				<!-- <u--textarea v-model="list.otherNote" v-if="isSee" :disabled="isSee" autoHeight></u--textarea> -->
				<text v-if="isSee">{{list.otherNote || '未填'}}</text>
			</u-form-item>
			<u-button type="primary" text="提交评价" @click="onsubmit()" v-if="!isSee"></u-button>
		</u--form>
	</view>
</template>

<script>
	import {
		tbOrderEvaluationAdd,
		tbtbOrderEvaluationDetail
	} from '../../api/api.js'
	export default {
		data() {
			return {
				isSee: false,
				isOver: false,
				list: {
					orderId: null,
					orderNo: null,
					logistics: 0,
					logisticsNote: '',
					prescription: 0,
					prescriptionNote: '',
					quality: 0,
					qualityNote: '',
					serviceAttitude: 0,
					serviceAttitudeNote: '',
					other: 0,
					otherNote: ''
				},
				btnStyle: {
					width: '45%',
					heigth: '120px',
					margin: '0'
				},
			};
		},
		/**
		 * statusCode1 0 询价单  1 生产订单
		 */
		onLoad(options) {
			console.log(options);
			this.list.orderId = options.indexId
			this.list.orderNo = options.orderNo
			if(options.isSee == 'true'){
				this.isSee = true
				this.getList()
			} else {
				this.isSee = false
				this.isOver = true
				// console.log('添加');
			}
		},
		onReady() {
			uni.hideLoading()
		},
		methods: {
			getList() {
				/* uni.showLoading({
					title: '加载中'
				})
				console.log(this.list.workerOrderId);
				tbcustomeraskById({
					id: this.list.workerOrderId
				}).then(res => {
					uni.hideLoading()
					this.list = res
					// console.log(this.list);
				}) */
				uni.showLoading({
					title: '加载中'
				})
				// console.log(this.list.orderId);
				tbtbOrderEvaluationDetail({
					orderId: this.list.orderId
				}).then(res => {
					uni.hideLoading()
					this.list = res
					// console.log(res,this.list.orderId);
					this.isOver = true
				})
				
				// console.log('查看');
			},
			onsubmit() {
				if(this.list.logistics == 0){
					uni.$u.toast('请选择物流评分')
					return
				}
				if(this.list.prescription == 0){
					uni.$u.toast('请选择时效评分')
					return
				}
				if(this.list.quality == 0){
					uni.$u.toast('请选择品质评分')
					return
				}
				if(this.list.serviceAttitude == 0){
					uni.$u.toast('请选择服务态度评分')
					return
				}
				if(this.list.other == 0){
					uni.$u.toast('请选择其他评分')
					return
				}
				console.log(this.list);
				tbOrderEvaluationAdd(this.list).then(res2 => {
					if (res2.success) {
						uni.$u.toast('评价成功')
						setTimeout(() => {
							uni.switchTab({
								url: '../workbench/workbench'
							})
						}, 500)
						// uni.$emit('userchange',{})
					}
				})
			}
		}
	}
</script>

<style>
</style>
