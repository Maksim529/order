<template>
	<view>
		<u--form labelPosition="left" :model="value"  ref="form" labelWidth="105"
			errorType="border-bottom" v-if="isOver">
			<u-form-item label="询价单编号" prop="askOrderNo" borderBottom>
				<text style="font-size: 32rpx;">{{value.askOrderNo ? value.askOrderNo : value.orderNo}}</text>
			</u-form-item>
			<u-form-item label="客户款号" prop="customerSku" borderBottom>
				<text style="font-size: 32rpx;">{{value.customerSku}}</text>
			</u-form-item>
			<u-form-item label="款式图">
				<image style="width: 200rpx;height: 200rpx;margin-right: 10px;" mode="scaleToFill" :src="value.stylePicStr? value.stylePicStr : value.pic"></image>
			</u-form-item>
			<u-line></u-line>
			<u-form-item label="详情图"></u-form-item>
			<block v-for="(item, index) in detailPaths" :key="index" style="display: flex; direction: row;">
				<image style="width: 200rpx;height: 200rpx;margin: 0 15rpx" mode="scaleToFill" :src="item"></image>
			</block>
			<!-- <text style="font-size: 32rpx;">{{value.id}}</text> -->
			<u-line></u-line>
			<u-form-item label="品类" prop="categoryBigId" borderBottom>
				<text style="font-size: 32rpx;">{{value.categoryName ? value.categoryName : value.strCategory}}</text>
			</u-form-item>
			<u-form-item label="生产类型" prop="produceTypeId" borderBottom>
				<text style="font-size: 32rpx;">{{produceTypeList[value.produceType-1].value}}</text>
			</u-form-item>
			<u-form-item label="订单状态" v-if="statusCode1 == 0 && statusCode2 == 2" borderBottom>
				<text style="font-size: 32rpx;">{{ askStatus }}</text>
			</u-form-item>
			<u-form-item label="订单状态" v-if="statusCode1 == 1 && statusCode2 == 6" borderBottom>
				<text style="font-size: 32rpx;">{{ needStatus }}</text>
			</u-form-item>
			<u-form-item label="材料齐套日期" borderBottom v-if="statusCode1 == 0">
				<text style="font-size: 32rpx;">{{value.materialReachDate}}</text>
			</u-form-item>
			<view v-if="statusCode1 == 1" style="margin-top: 10px;margin-bottom: 10px;">
				<t-table>
					<t-tr>
						<t-th><text>颜色</text></t-th>
						<t-th><text>尺码</text></t-th>
						<t-th><text>数量</text></t-th>
					</t-tr>
					<block v-for="(item, index) in value.orderDetailList" :key="index">
						<t-tr>
							<t-th><text>{{item.colorName}}</text></t-th>
							<t-th><text>{{item.size}}</text></t-th>
							<t-th><text>{{item.count}}</text></t-th>
						</t-tr>
					</block>
				</t-table>
			</view>
			<u-line v-if="statusCode1 == 1"></u-line>
			<u-form-item label="订单数" prop="orderNum" borderBottom>
				<text style="font-size: 32rpx;">{{value.counts ? value.counts  + '件' : value.amount + '件'}}</text>
			</u-form-item>
			<view v-if="statusCode1 == 0">
				<u-form-item label="希望交期" borderBottom>
					<text style="font-size: 32rpx;">{{value.givedate}}</text>
				</u-form-item>
				<u-form-item label="希望价格" borderBottom>
					<text style="font-size: 32rpx;">{{value.price + '元/件'}}</text>
				</u-form-item>
				<u-form-item label="备注" borderBottom>
					<text style="font-size: 32rpx;">{{value.note}}</text>
				</u-form-item>
			</view>
			<view v-if="statusCode1 == 1">
				<u-form-item label="交期" prop="orderNum" borderBottom>
					<text style="font-size: 32rpx;">{{value.givedate}}</text>
				</u-form-item>
				<u-form-item label="希望价格" borderBottom>
					<text style="font-size: 32rpx;">{{value.price + '元/件'}}</text>
				</u-form-item>
				<u-form-item label="省市县" borderBottom>
					<text style="font-size: 32rpx;">{{value.areacode}}</text>
				</u-form-item>
				<u-form-item label="详细地址" borderBottom>
					<text style="font-size: 32rpx;">{{value.receiveAddr}}</text>
				</u-form-item>
				<u-form-item label="收货电话" borderBottom>
					<text style="font-size: 32rpx;">{{value.receivePhone}}</text>
				</u-form-item>
			</view>
		</u--form>
	</view>
</template>

<script>
	import { tbimgpicInfosAsk , findListByDictTypeCode , tbcustomerOrderById } from '../../api/api.js'
	export default {
		name: "t-order-detail",
		props: {
			value: Object,
			statusCode1: String,
			statusCode2: String,
		},
		data() {
			return {
				pinlei:null,
				detailPaths: [],
				askStatus: '',
				needStatus: '',
				isOver: false,
				// detailId: this.value.id,
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
				statusType: []
			};
		},
		onReady() {
			if( this.statusCode1 == 0){
				findListByDictTypeCode('tbcustomerask_state').then(res => {
					this.statusTypeList = res
					for(let i = 0; i < this.statusTypeList.length; i++){
						if(this.statusTypeList[i].code == this.value.askStatus){
							this.askStatus = this.statusType.concat(this.statusTypeList[i].value)
						}
					}
					this.onhuoqu()
				})
				this.isOver = true
				uni.hideLoading()
			} else {
				findListByDictTypeCode('order_status').then(res => {
					this.statusTypeList = res
					console.log(this.statusTypeList);
					for(let i = 0; i < this.statusTypeList.length; i++){
						if(this.statusTypeList[i].code == this.value.status){
							this.needStatus = this.statusType.concat(this.statusTypeList[i].value)
						}
					}
					this.onhuoqu()
				})
				this.isOver = true
				uni.hideLoading()
			}
			// this.onhuoqu()
			
		},
		methods: {
			onhuoqu() {
				// console.log(this.value);
				tbimgpicInfosAsk({
					id: this.value.id
				}).then(res => {
					res.map(img => {
						this.detailPaths.push(img)
					})
					console.log(res,"tlj");
				})
				// console.log(this.detailPaths,"详情图数组");
			}
		}
	}
</script>

<style lang="scss">
</style>