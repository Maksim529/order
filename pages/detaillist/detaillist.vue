<template>
	<view class="box">
		<u--form labelPosition="left" ref="form" labelWidth="105" errorType="border-bottom" v-if="isOver">
			<u-form-item label="订单号" v-if="statusCode1 == 1" borderBottom>
				<text style="font-size: 32rpx;">{{list.orderNo}}</text>
			</u-form-item>
			<u-form-item label="询价单号" v-if="statusCode1 == 0" borderBottom>
				<text style="font-size: 32rpx;">{{list.askOrderNo}}</text>
			</u-form-item>
			<u-form-item label="客户款号" borderBottom>
				<text style="font-size: 32rpx;">{{list.customerSku}}</text>
			</u-form-item>
			<u-form-item label="款式图">
				<image style="width: 200rpx;height: 200rpx;margin-right: 10px;" mode="scaleToFill"
					:src="list.stylePicStr? list.stylePicStr : list.pic"
					@click="onShowimg(list.stylePicStr? list.stylePicStr : list.pic)"></image>
			</u-form-item>
			<u-line></u-line>
			<u-form-item label="详情图"></u-form-item>
			<view v-if="statusCode1 == 0">
				<block v-for="(item, index) in detailPaths" :key="index" style="display: flex; direction: row;">
					<image style="width: 200rpx;height: 200rpx;margin: 0 15rpx" mode="scaleToFill" :src="item"
						@click="onShowimg(item)"></image>
				</block>
			</view>
			<view v-if="statusCode1 == 1">
				<block v-for="(item, index) in list.filePathList" :key="index" style="display: flex; direction: row;">
					<image style="width: 200rpx;height: 200rpx;margin: 0 15rpx" mode="scaleToFill" :src="item"
						@click="onShowimg(item)"></image>
				</block>
			</view>
			<u-line></u-line>
			<u-form-item label="品类" borderBottom>
				<text style="font-size: 32rpx;">{{list.categoryName ? list.categoryName : list.strCategory}}</text>
			</u-form-item>
			<u-form-item label="生产类型" borderBottom>
				<text style="font-size: 32rpx;">{{ linshiproduceType }}</text>
			</u-form-item>
			<u-form-item label="状态" v-if="statusCode1 == 0" borderBottom>
				<text style="font-size: 32rpx;">{{ askStatus }}</text>
			</u-form-item>
			<u-form-item label="状态" v-if="statusCode1 == 1" borderBottom>
				<text style="font-size: 32rpx;">{{ needStatus }}</text>
			</u-form-item>
			<u-form-item label="材料齐套日期" borderBottom v-if="statusCode1 == 0">
				<text style="font-size: 32rpx;">{{list.materialReachDate}}</text>
			</u-form-item>
			<!-- <view v-if="statusCode1 == 1" style="margin-top: 10px;margin-bottom: 10px;">
				<t-table>
					<t-tr>
						<t-th><text>颜色</text></t-th>
						<t-th><text>尺码</text></t-th>
						<t-th><text>数量</text></t-th>
					</t-tr>
					<block v-for="(item, index) in list.orderDetailList" :key="index">
						<t-tr>
							<t-th><text>{{item.colorName}}</text></t-th>
							<t-th><text>{{item.size}}</text></t-th>
							<t-th><text>{{item.count}}</text></t-th>
						</t-tr>
					</block>
				</t-table>
			</view> -->
			<view v-if="statusCode1 == 1" style="margin-top: 10px;margin-bottom: 10px;">
				<t-table>
					<t-tr>
						<t-th><text>颜色\n尺码</text></t-th>
						<t-th v-for="(item1, index1) in list.colorIdList" :key="item1">
							{{getColorById(item1)}}
						</t-th>
					</t-tr>
					<t-tr v-for="(item2, index2) in list.sizeList" :key="item2">
						<t-td>{{list.sizeList[index2]}}</t-td>
						<t-td v-for="(item3, index3) in list.colorIdList" :key="item3">
							{{getNumByColorAndSize(item3,list.sizeList[index2]) || '0'}}
						</t-td>
					</t-tr>
				</t-table>
			</view>
			<u-line v-if="statusCode1 == 1"></u-line>
			<u-form-item label="订单数" borderBottom>
				<text style="font-size: 32rpx;">{{list.counts ? list.counts  + '件' : list.amount + '件'}}</text>
			</u-form-item>
			<view v-if="statusCode1 == 0">
				<u-form-item label="希望交期" borderBottom>
					<text style="font-size: 32rpx;">{{list.givedate}}</text>
				</u-form-item>
				<u-form-item label="希望价格" borderBottom>
					<text style="font-size: 32rpx;">{{list.price + '元/件'}}</text>
				</u-form-item>
				<u-form-item label="备注" borderBottom>
					<text style="font-size: 32rpx;">{{list.note}}</text>
				</u-form-item>
			</view>
			<view v-if="statusCode1 == 1">
				<u-form-item label="交期" borderBottom>
					<text style="font-size: 32rpx;">{{list.givedate}}</text>
				</u-form-item>
				<u-form-item label="希望价格" v-if="statusCode2 == 0" borderBottom>
					<text style="font-size: 32rpx;">{{list.price + '元/件'}}</text>
				</u-form-item>
				<u-form-item label="生产价格" v-else borderBottom>
					<text style="font-size: 32rpx;">{{list.price + '元/件'}}</text>
				</u-form-item>
				<u-form-item label="省市县" borderBottom>
					<text style="font-size: 32rpx;">{{list.areacode}}</text>
				</u-form-item>
				<u-form-item label="详细地址" borderBottom>
					<text style="font-size: 32rpx;">{{list.receiveAddr}}</text>
				</u-form-item>
				<u-form-item label="收货人" borderBottom>
					<text style="font-size: 32rpx;">{{list.receivePerson || ''}}</text>
				</u-form-item>
				<u-form-item label="收货电话" borderBottom>
					<text style="font-size: 32rpx;">{{list.receivePhone}}</text>
				</u-form-item>
				<u-form-item label="备注" borderBottom>
					<text style="font-size: 32rpx;">{{list.remark || ''}}</text>
				</u-form-item>
				<view style="margin: 20rpx auto;" v-if="statusCode1 == 1">
					<u-button type="primary" text="查看" @click="look"></u-button>
				</view>
			</view>
		</u--form>
	</view>
</template>

<script>
	import {
		tbCustomerAskList,
		tbimgpicInfosAsk,
		findListByDictTypeCode,
		tbcustomerOrderById,
		tbcustomeraskById
	} from '../../api/api.js'
	export default {
		data() {
			return {
				statusCode1: '',
				statusCode2: '',
				indexId: '',
				isoutOver: true,
				pageNo: 1,
				list: [],
				pinlei: null,
				detailPaths: [],
				isOver: false,
				btnStyle: {
					width: '45%',
					heigth: '120px',
					margin: '0'
				},
				produceTypeList: [{
						id: 1,
						list: "FOB（包工包料）"
					},
					{
						id: 2,
						list: "CMT（来料加工）"
					}
				],
				statusTypeList: [],
				statusType: [],
				// 颜色列表
				colorList: [],
			};
		},
		/**
		 * statusCode1 0 询价单  1 生产订单
		 */
		onLoad(options) {
			// console.log(options);
			this.indexId = options.indexId
			this.statusCode1 = options.statusCode1
			this.statusCode2 = options.statusCode2
			uni.setNavigationBarTitle({
				title: options.title
			})
			findListByDictTypeCode('color').then(res => {
				this.colorList = res
			})
			findListByDictTypeCode('produce_type').then(res => {
				this.produceTypeList = res
			})
			this.getList()
		},
		onReady() {
			if (this.statusCode1 == 0) {
				findListByDictTypeCode('tbcustomerask_state').then(res => {
					this.statusTypeList = res
					this.isOver = true
					uni.hideLoading()
				})

			} else {
				findListByDictTypeCode('order_status').then(res => {
					this.statusTypeList = res
					this.isOver = true
					uni.hideLoading()
				})

			}
		},
		computed: {
			linshiproduceType() {
				let val = ''
				for (let i = 0; i < this.produceTypeList.length; i++) {
					if (this.produceTypeList[i].code == this.list.produceType) {
						val = this.produceTypeList[i].value
					}
				}
				return val
			},
			needStatus() {
				let val = ''
				for (let i = 0; i < this.statusTypeList.length; i++) {
					if (this.statusTypeList[i].code == this.list.status) {
						val = this.statusTypeList[i].value
					}
				}
				return val
			},
			needStatusCode() {
				let val = ''
				for (let i = 0; i < this.statusTypeList.length; i++) {
					if (this.statusTypeList[i].code == this.list.status) {
						val = this.statusTypeList[i].code
					}
				}
				return val
			},
			askStatus() {
				let val = ''
				for (let i = 0; i < this.statusTypeList.length; i++) {
					if (this.statusTypeList[i].code == this.list.askStatus) {
						val = this.statusTypeList[i].value
					}
				}
				return val
			}
		},
		methods: {
			look() {
				let itemList = []
				// if (this.needStatusCode >= 2 && this.needStatusCode <= 7 && this.needStatusCode != 6) {
					itemList.push('进度')
				// }
				if (this.needStatusCode == 7) {
					itemList.push('评分')
				}
				if (this.needStatusCode >= 2 && this.needStatusCode < 8 && this.needStatusCode != 6) {
					itemList.push('合同')
				}
				let that = this
				uni.showActionSheet({
					itemList,
					success(res) {
						let type = itemList[res.tapIndex]
						if (type == '进度') {
							that.lookOrderSpeed()
						} else if (type == '评分') {
							that.seeEvaluate()
						} else {
							that.toFileList()
						}
					}
				})
			},
			//查看订单进度
			lookOrderSpeed() {
				uni.navigateTo({
					url: '../orderSpeed/orderSpeed?orderId=' + this.indexId
				})
			},
			// 根据Id返回颜色值
			getColorById(id) {
				let value;
				this.colorList.map((item) => {
					if (item.id === id) {
						value = item.value
					}
				})
				return value
			},
			getNumByColorAndSize(colorId, size) {
				let value;
				this.list.orderDetailList.map((item) => {
					if (item.colorId == colorId && item.size == size) {
						value = item.count
						// console.log(123);
					}
				})
				return value
			},
			toFileList() {
				uni.navigateTo({
					url: '../fileList/fileList?id=' + this.list.id + '&type=' + 3 + '&title=合同&pt=0'
				})
			},
			onShowimg(img) {
				uni.previewImage({
					urls: [img]
				})
			},
			getList() {
				uni.showLoading({
					title: '加载中'
				})
				if (this.statusCode1 == 0) {
					console.log(this.indexId);
					tbcustomeraskById({
						id: this.indexId
					}).then(res => {
						uni.hideLoading()
						this.list = res
						// console.log(this.list);
					})
					tbimgpicInfosAsk({
						id: this.indexId
					}).then(res => {
						uni.hideLoading()
						this.detailPaths = res
						// console.log(this.detailPaths);

					})
				} else {
					tbcustomerOrderById({
						id: this.indexId
					}).then(res => {
						uni.hideLoading()
						// console.log(res);
						this.list = res.data
					})
				}
			},
			seeEvaluate() {
				uni.navigateTo({
					url: `../../pages/evaluate/evaluate?indexId=${this.list.id}&orderNo=${this.list.orderNo}&isSee=${true}`
				})
			}
		},
		onPullDownRefresh() {
			this.isoutOver = false
			this.pageNo = 0
			this.list = []
			this.getList()
			setTimeout(() => {
				uni.stopPullDownRefresh()
				this.isoutOver = true
				uni.hideLoading()
			}, 500)
		},
	}
</script>

<style lang="scss">
	.box {
		margin-bottom: constant(safe-area-inset-bottom);
		margin-bottom: env(safe-area-inset-bottom);
		margin-bottom: 30px;
	}
</style>
