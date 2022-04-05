<template>
	<view>
		
		<u--form labelPosition="left" :model="value" :rules="rules" ref="form" labelWidth="105"
			errorType="border-bottom">
			<u-form-item label="询价单编号" prop="askOrderNo" borderBottom>
				<u--input v-model="value.askOrderNo" border="none" disabled></u--input>
			</u-form-item>
			<u-form-item required label="客户款号" prop="customerSku" borderBottom>
				<u--input v-model="value.customerSku"  border="none" placeholder="请输入客户款号"></u--input>
			</u-form-item>
			<u-form-item required label="款式图"></u-form-item>
			
			<view  class="uni-picker-tips">(仅可上传一张，作为主图使用)</view>
			<u-upload accept="image" :fileList="value.fileList1" uploadText="上传款式图" name="1" :maxCount="1"
				:previewFullImage="true" @afterRead="afterRead" @delete="deletePic">
			</u-upload>
			<u-line></u-line>
			<u-form-item required label="详情图"></u-form-item>
			
			<view  class="uni-picker-tips">(请拍清楚部件工艺，最多可上传9张)</view>
			<u-upload accept="image" :fileList="value.fileList2" uploadText="上传详情图" name="2" :maxCount="9" multiple
				:previewFullImage="true" @afterRead="afterRead" @delete="deletePic">
			</u-upload>
			<u-line></u-line>
			<u-form-item required label="品类" prop="categoryBigId" borderBottom @click="showCategory = true">
				<u-picker :show="showCategory" :columns="columns" keyName="typeName" @change="changeHandler1"
					@confirm="confirmHandler1" @cancel="showCategory = false"></u-picker>
				<text style="font-size: 32rpx;">{{category}}</text>
			</u-form-item>
			<u-form-item required label="生产类型" prop="produceTypeId" borderBottom @click="showproduceType = true">
				<u-picker :show="showproduceType" :columns="columns1" keyName="value" @confirm="confirmHandler2"
					@cancel="showproduceType = false"></u-picker>
				<text style="font-size: 32rpx;">{{produceType}}</text>
			</u-form-item>
			<u-form-item required label="材料齐套日期" prop="date1" borderBottom @click="showDate1 = true">
				<u-datetime-picker ref="datetimePicker1" :show="showDate1" v-model="value.date1" mode="date" :minDate="minDate"
					:formatter="formatter" @cancel="showDate1 = false" @confirm="confirmHandler3"></u-datetime-picker>
				<text style="font-size: 32rpx;">{{value.date1 | date('yyyy年mm月dd日')}}</text>
			</u-form-item>
			<u-form-item required label="订单数" prop="orderNum" borderBottom>
				<u-input v-model.number="value.orderNum" border="none" type="number" placeholder="请输入订单数"></u-input>
			</u-form-item>
			<u-form-item required label="希望交期" prop="date2" borderBottom @click="showDate2 = true">
				<u-datetime-picker ref="datetimePicker2" :show="showDate2" v-model="value.date2" mode="date" :minDate="minDate"
					:formatter="formatter" @cancel="showDate2 = false" @confirm="confirmHandler4"></u-datetime-picker>
				<text style="font-size: 32rpx;">{{value.date2 | date('yyyy年mm月dd日')}}</text>
			</u-form-item>
			<u-form-item required label="希望价格" prop="hopePrice" borderBottom>
				<u-input v-model.number="value.hopePrice" border="none" type="number" placeholder="请输入价格">
					<template slot="suffix">
						元/件
					</template>
				</u-input>
			</u-form-item>
			<u-form-item label="备注" prop="remarks" borderBottom>
				<u-input v-model="value.remarks" border="none" placeholder="请输入备注"></u-input>
			</u-form-item>
		</u--form>
		<view style="margin: 40rpx auto;">
			<button :throttle-time="500" @click="submit" class="submitbtn">确定询价</button>
		</view>
	</view>
</template>

<script>
	import {
		getIncrOrder,
		uploadPhotoAndXjInfo,
		uploadPhotoByXjId,
		findListByPidUsingGET,
		findListByDictTypeCode
	} from '../../../api/api.js'
	export default {
		data() {
			return {
				value: {
					//询价单编号
					askOrderNo: '',
					// 客户款号
					customerSku: '',
					// 款式图
					fileList1: [],
					// 详情图
					fileList2: [],
					// 品类大类编号,
					categoryBigId: '',
					// 品类中类编号,
					categoryMediumId: '',
					// 品类小类编号,
					categorySmallId: '',
					// 生产类型编号
					produceTypeId: '',
					// 材料齐套日期
					date1: '',
					// 订单数
					orderNum: '',
					// 希望交期
					date2: '',
					// 希望价格
					hopePrice: '',
					// 备注
					remarks: ''
				},
				rules: {
					// customerSku: [{
					// 	required: true,
					// 	message: '请输入客户款号',
					// 	trigger: ['change', 'blur'],
					// }],
					orderNum: [{
						required: true,
						message: '请输入订单数',
						trigger: ['change', 'blur'],
					}],
					hopePrice: [{
						required: true,
						message: '请输入希望价格',
						trigger: ['change', 'blur'],
					}]
				},
				// 控制分类选择显示
				showCategory: false,
				// 品类选择后的显示
				category: '',
				// 品类选择器默认选项
				columns: [],
				// 品类大类列表
				categoryBigList: [],
				// 品类中类列表
				categoryMediumList: [],
				// 品类小类列表
				categorySmallList: [],
				// 控制生产分类选择显示
				showproduceType: false,
				// 分类选择后显示
				produceType: '',
				// 生产类型选择器默认选项
				columns1: [],
				// 生产类型列表
				produceTypeList: [{
						id: 1,
						value: "FOB（包工包料）"
					},
					{
						id: 2,
						value: "CMT（来料加工）"
					}
				],
				minDate: '',
				// 控制材料齐套日期选择显示
				showDate1: false,
				// 控制希望交期选择显示
				showDate2: false,
			}
		},
		onLoad() {
			getIncrOrder().then(res => {
				this.value.askOrderNo = res
			})
			findListByDictTypeCode('produce_type').then(res => {
				this.produceTypeList = res
				this.columns1[0] = this.produceTypeList
				this.produceType = this.produceTypeList[0].value
				this.value.produceTypeId = this.produceTypeList[0].code
			})
			findListByPidUsingGET({
				pid: 0
			}).then(res1 => {
				this.categoryBigList = res1
				findListByPidUsingGET({
					pid: res1[0].id
				}).then(res2 => {
					this.categoryMediumList = res2
					findListByPidUsingGET({
						pid: res2[0].id
					}).then(res3 => {
						this.categorySmallList = res3
						this.columns[0] = this.categoryBigList
						this.columns[1] = this.categoryMediumList
						this.columns[2] = this.categorySmallList
						this.category = [this.categoryBigList[0].typeName, this.categoryMediumList[
							0].typeName, this.categorySmallList[0].typeName].join(' - ')
						this.value.categoryBigId = this.categoryBigList[0].id
						this.value.categoryMediumId = this.categoryMediumList[0].id
						this.value.categorySmallId = this.categorySmallList[0].id
					})
				})
			})

			
			this.minDate = Number(new Date())
			this.value.date1 = Number(new Date())
			this.value.date2 = Number(new Date())
		},
		methods: {
			deletePic(event) {
				this.value[`fileList${event.name}`].splice(event.index, 1)
			},
			async afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this.value[`fileList${event.name}`].length
				lists.map((item) => {
					this.value[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = lists[i].thumb
					let item = this.value[`fileList${event.name}`][fileListLen]
					this.value[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			// 品类切换
			changeHandler1(e) {
				let columnIndex = e.columnIndex
				let index = e.index
				let value = e.value
				let values = e.values
				let indexs = e.indexs
				if (columnIndex == 0) {
					findListByPidUsingGET({
						pid: value[0].id
					}).then(res => {
						this.categoryMediumList = res
						this.columns[1] = this.categoryMediumList
						findListByPidUsingGET({
							pid: res[0].id
						}).then(res2 => {
							this.categorySmallList = res2
							this.columns[2] = this.categorySmallList
						})
					})
				} else if (columnIndex == 1) {
					findListByPidUsingGET({
						pid: value[1].id
					}).then(res2 => {
						this.categorySmallList = res2
						this.columns[2] = this.categorySmallList
					})
				}
			},
			// 品类确认
			confirmHandler1(e) {
				const {
					value
				} = e
				this.value.categoryBigId = value[0].id
				this.value.categoryMediumId = value[1].id
				this.value.categorySmallId = value[2].id
				this.category = [value[0].typeName, value[1].typeName, value[2].typeName].join(' - ')
				this.showCategory = false
			},
			// 生产类型确认
			confirmHandler2(e) {
				const {
					value
				} = e
				this.value.produceTypeId = value[0].code
				this.produceType = value[0].value
				this.showproduceType = false
			},
			// 材料齐套日期确认
			confirmHandler3(e) {
				this.value.date1 = e.value
				this.showDate1 = false
			},
			// 希望交期确认
			confirmHandler4(e) {
				this.value.date2 = e.value
				this.showDate2 = false
			},
			// 提交表单
			submit() {
				if (this.value.fileList1.length == 0) {
					uni.$u.toast('请上传款式图')
					return
				}
				if (this.value.fileList2.length == 0) {
					uni.$u.toast('请上传详情图')
					return
				}
				if (this.value.date1 >= this.value.date2) {
					uni.$u.toast('希望交期不能早于材料齐套日期')
					return
				}
				if (this.value.orderNum == 0) {
					uni.$u.toast('订单数不能为0')
					return
				}
				if (this.value.hopePrice == 0) {
					uni.$u.toast('希望价格不能为0')
					return
				}
				this.$refs.form.validate().then(res => {
					uni.showLoading({
						title: "请等待",
						mask: true
					})

					let data = {
						askOrderNo: this.value.askOrderNo,
						customerSku: this.value.customerSku !== '' ? this.value.customerSku : this.value
							.askOrderNo,
						category: this.value.categorySmallId,
						produceType: this.value.produceTypeId,
						materialReachDate: uni.$u.timeFormat(this.value.date1, 'yyyy-mm-dd'),
						counts: this.value.orderNum,
						givedate: uni.$u.timeFormat(this.value.date2, 'yyyy-mm-dd'),
						price: this.value.hopePrice,
						note: this.value.remarks,
						accountId: uni.getStorageSync('userId')
					}
					uploadPhotoAndXjInfo(this.value.fileList1[0].url, JSON.stringify(data)).then(res => {
						let data = JSON.parse(res.data)
						uni.hideLoading()
						if (data.success) {
							if (this.value.fileList2.length !== 0) {
								this.value.fileList2.map(item => {
									uploadPhotoByXjId(item.url, data.data).then(res => {
										if (!res) {
											uni.$u.toast('上传附图失败！')
											return
										}
									})
								})
							}
							uni.$u.toast('询价成功！')
							setTimeout(() => {
								/* uni.switchTab({
									url: '../../home/home'
								}) */
								uni.redirectTo({
									url: `../../list/list?statusCode1=0&title=询价单（未报价）&statusCode2=0&num=1`
								})
							}, 1000)
						} else {
							console.log(data);
							uni.$u.toast('生成询价单失败！')
						}
					})
				}).catch(errors => {
					uni.hideLoading()
					uni.$u.toast(errors[0].message)
				})
			},
			formatter(type, value) {
				if (type === 'year') {
					return `${value}年`
				}
				if (type === 'month') {
					return `${value}月`
				}
				if (type === 'day') {
					return `${value}日`
				}
				return value
			},
		},
	}
</script>

<style>
.submitbtn,
	.cachebtn,
	.resetbtn {
		/* background-color: #60bcb6; */
		background: linear-gradient(to right, #44bcbc, #44bcbc);

		/* background: radial-gradient(220% 105% at top center,  #75517d 10%, #e96f92 65%, #f7f7b6); */
		color: #ffffff;
		border-radius: 20px;
	}
	.uni-picker-tips {
		font-size: 12px;
		color: #666;
		margin-bottom: 15px;
		padding: 0 15px;
		/* text-align: right; */
	}
</style>
