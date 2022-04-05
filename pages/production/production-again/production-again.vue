<template>
	<view>
		<u--form labelPosition="left" :model="value" :rules="rules" ref="form" labelWidth="105"
			errorType="border-bottom">
			<u-form-item label="订单编号" prop="orderNo" borderBottom>
				<u--input v-model="value.orderNo" border="none" disabled></u--input>
			</u-form-item>
			<u-form-item required label="客户款号" prop="customerSku" borderBottom>
				<u--input v-model="value.customerSku" placeholder="请输入客户款号"></u--input>
			</u-form-item>
			<u-form-item required label="款式图"></u-form-item>
			<view class="uni-picker-tips">(仅可上传一张，作为主图使用)</view>
			<u-upload accept="image" :fileList="value.fileList1" uploadText="上传款式图" name="1" :maxCount="1"
				:previewFullImage="true" @afterRead="afterRead" @delete="deletePic">
			</u-upload>
			<u-line></u-line>
			<u-form-item required label="详情图"></u-form-item>
			<view class="uni-picker-tips">(请拍清楚部件工艺，最多可上传9张)</view>
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
				<text style="font-size: 32rpx;">
					{{produceType}}
				</text>
			</u-form-item>
			<u-form-item required label="颜色"></u-form-item>
			<view style="margin-bottom: 10px;">
				<u-checkbox-group @change="allColor" v-model="allColorList" placement="row">
					<u-checkbox :customStyle="{marginRight: '10px'}" name="全部" label="全部"></u-checkbox>
				</u-checkbox-group>
			</view>
			<view style="margin-bottom: 10px;width: 100%;">
				<u-checkbox-group v-model="checkboxColorValue" placement="row">
					<view style="display: flex;flex-wrap: wrap;">
						<u-checkbox :customStyle="{marginBottom: '10px',width: 'auto',marginRight: '15px'}"
							v-for="(item, index) in colorList" :key="index" :name="item.id" :label="item.value">
						</u-checkbox>
					</view>
				</u-checkbox-group>
			</view>
			<u-line></u-line>
			<u-form-item required label="尺码"></u-form-item>
			<view style="margin-bottom: 10px;">
				<u-checkbox-group @change="allSize" v-model="allSizeList" placement="row" :disabled="flag">
					<u-checkbox :customStyle="{marginRight: '10px'}" name="全部" label="全部"></u-checkbox>
				</u-checkbox-group>
			</view>
			<view style="margin-bottom: 10px;width: 100%;">
				<u-checkbox-group v-model="checkboxSizeValue" placement="column" :disabled="flag">
					<view style="display: flex;flex-wrap: wrap;">
						<u-checkbox :customStyle="{marginBottom: '10px',width: 'auto',marginRight: '15px'}"
							v-for="(item, index) in sizeList" :key="index" :name="item.value" :label="item.value">
						</u-checkbox>
					</view>
				</u-checkbox-group>
			</view>
			<u-line></u-line>
			<view style="margin-top: 10px;margin-bottom: 10px;"
				v-if="checkboxColorValue.length > 0 && checkboxSizeValue.length > 0">
				<t-table>
					<t-tr>
						<t-th><text>颜色\n尺码</text></t-th>
						<t-th v-for="(item1, index1) in checkboxColorValue" :key="item1">{{getColorById(item1)}}</t-th>
					</t-tr>
					<t-tr v-for="(item2, index2) in colorAndSizeValue.data" :key="item2">
						<t-td>{{checkboxSizeValue[index2]}}</t-td>
						<t-td v-for="(item3, index3) in item2" :key="item3.key">
							<u-input border="none" inputAlign="center" :value="item3.count" type="number"
								@input="changeNum($event, index2, index3)" @focus="getFocus($event, index2, index3)"
								@blur="lostFocus($event, index2, index3)"></u-input>
						</t-td>
					</t-tr>
					<t-tr>
						<t-td>总计</t-td>
						<t-td v-for="(item4, index4) in checkboxColorValue" :key="item4">
							{{getOrderSumByColor(index4)}}
						</t-td>
					</t-tr>
				</t-table>
			</view>
			<u-line v-if="colorAndSizeValue.data.length > 0"></u-line>
			<u-form-item label="单量" borderBottom>
				<text style="font-size: 32rpx;">{{getOrderSum()}}</text>
			</u-form-item>
			<u-form-item required label="交期" borderBottom @click="showDate = true">
				<u-datetime-picker ref="datetimePicker" :show="showDate" :value="value.hopeDates[0]" mode="date"
					:minDate="minDate" :formatter="formatter" @cancel="showDate = false;"
					@confirm="confirmHandler($event, 0)"></u-datetime-picker>
				<text style="font-size: 32rpx;">{{value.hopeDates[0] | date('yyyy年mm月dd日')}}</text>
			</u-form-item>
			<u-form-item required label="希望价格" prop="hopePrice" borderBottom>
				<u-input v-model.number="value.hopePrice" border="none" type="number" placeholder="请输入价格">
					<template slot="suffix">
						元/件
					</template>
				</u-input>
			</u-form-item>
			<u-form-item required label="省市县" borderBottom>
				<t-address @change="SelectAddressEvent" :level="3">{{value.address1}}</t-address>
			</u-form-item>
			<u-form-item required label="详细地址" prop="address2" borderBottom>
				<u-input v-model="value.address2" placeholder="请输入送货详细地址"></u-input>
			</u-form-item>
			<u-form-item required label="收货人" prop="receivePerson" borderBottom>
				<u-input v-model="value.receivePerson" type="text" placeholder="请输入收货人"></u-input>
			</u-form-item>
			<u-form-item required label="收货电话" prop="phone" borderBottom>
				<u-input v-model="value.phone" type="number" placeholder="请输入收货电话"></u-input>
			</u-form-item>
			<u-form-item label="备注" prop="remark" borderBottom>
				<u-input v-model="value.remark" type="text" placeholder="请输入备注"></u-input>
			</u-form-item>
		</u--form>
		<view style="margin: 40rpx auto;">
			<button :throttle-time="500" @click="submit" class="submitbtn">确定生产</button>
		</view>
	</view>
</template>

<script>
	import {
		getProductionOrderId,
		findListByPidUsingGET,
		getSizeListById,
		findListByDictTypeCode,
		uploadPhotoAndDdInfo,
		uploadPhotoByDdId,
		findItemByIdUsingGET,
		tbcustomerOrderById,
		askToOrder,
		askToOrderPhoto
	} from '../../../api/api.js'
	export default {
		data() {
			return {
				allSizeList: [],
				allColorList: [],
				//控制尺码可选
				flag: true,
				biid: null,
				meid: null,
				toid: null,
				value: {
					//询价单编号
					askId: '',
					// 生产订单编号
					orderNo: '',
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
					// 交期数组
					hopeDates: [Number(new Date())],
					// 希望价格
					hopePrice: '',
					// 省市区
					address1: '北京市市辖区东城区',
					// 详细地址
					address2: '',
					// 收货电话
					phone: '',
					picPath: '',
					detailPaths: [],
					//收货人
					receivePerson: '',
					//备注
					remark: ''
				},
				rules: {
					customerId: [{
						required: true,
						message: '请输入客户款号',
						trigger: ['change', 'blur'],
					}],
					hopePrice: [{
						required: true,
						message: '请输入希望价格',
						trigger: ['change', 'blur'],
					}],
					address2: [{
						required: true,
						message: '请输入送货详细地址',
						trigger: ['change', 'blur'],
					}],
					receivePerson: [{
						required: true,
						message: '请输入收货人',
						trigger: ['change', 'blur'],
					}],
					phone: [{
						required: true,
						message: '请输入收货电话',
						trigger: ['change', 'blur'],
					}],
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
				// 颜色多选结果
				checkboxColorValue: [],
				// 颜色列表
				colorList: [],
				// 尺寸多选结果
				checkboxSizeValue: [],
				// 尺寸列表
				sizeList: [],
				// 表格数据
				colorAndSizeValue: {
					data: []
				},
				//控制日期选择
				showDate: false,
				// 设置当前设置的交期
				dateIndex: -1,
				// 设置最小日期
				minDate: '',
				fullAddr: ['北京市', '市辖区', '东城区'],
				aid: '',
				produceType2: ''
			};
		},
		onLoad(options) {
			getProductionOrderId().then(res => {
				this.value.orderNo = res
			})
			findListByDictTypeCode('color').then(res => {
				this.colorList = res
			})
			findListByDictTypeCode('produce_type').then(res => {
				this.produceTypeList = res
				this.columns1[0] = this.produceTypeList
			})
			
			this.minDate = Number(new Date())
			let oid = options.oid
			this.getOrderValue(oid)
		},
		methods: {
			getOrderValue(oid) {
				tbcustomerOrderById({
					id: oid
				}).then(res => {
					// console.log(res.data);
					let data = res.data
					this.value.customerSku = data.customerSku
					this.value.categorySmallId = data.category
					findListByDictTypeCode('produce_type').then(res => {
						this.produceTypeList = res
						for (let i = 0; i < this.produceTypeList.length; i++) {
							if (this.produceTypeList[i].code == data.produceType) {
								this.produceType = this.produceTypeList[i].value
								this.value.produceTypeId = this.produceTypeList[i].code
							}
						}
						// this.produceType = this.produceTypeList[data.produceType - 1].value
						// this.value.produceTypeId = this.produceTypeList[data.produceType - 1].id
					})
					
					this.downfile(data.pic).then(file => {
						this.value.fileList1.push(file)
					})
					data.filePathList.map(img => {
						this.downfile(img).then(file => {
							this.value.fileList2.push(file)
						})
					})

					findItemByIdUsingGET({
						id: this.value.categorySmallId
					}).then(res => {
						this.category = data.strCategory
						getSizeListById(res.categorySize).then(res4 => {
							for (let i = 0; i < res4.length; i++) {
								this.sizeList.push({
									id: i,
									value: res4[i]
								})
							}
						})
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
							})
						})
					})

					this.checkboxColorValue = data.colorIdList
					this.checkboxSizeValue = data.sizeList
					let areacode = data.areacode
					this.value.address1 = data.areacode.replace(/\s+/g, '').split('-').join('')
					this.value.address2 = data.receiveAddr
					this.value.receivePerson = data.receivePerson
					this.value.phone = data.receivePhone
				})
			},
			//下载文件返回file
			downfile(url) {
				return new Promise((resolve, reject) => {
					let file = {}
					uni.downloadFile({
						url,
						success: res => {
							file = {
								status: "success",
								thumb: res.tempFilePath,
								type: "image",
								url: res.tempFilePath
							}
							resolve(file)
						}
					})
				})
			},
			//颜色全选
			allColor(val) {
				if (val.length == 0) {
					this.checkboxColorValue = []
				} else {
					this.checkboxColorValue = []
					this.colorList.map(item => {
						this.checkboxColorValue.push(item.id)
					})
				}
			},
			//尺码全选
			allSize(val) {
				if (val.length == 0) {
					this.checkboxSizeValue = []
				} else {
					this.sizeList.map(item => {
						if (this.checkboxSizeValue.indexOf(item.value) == -1) {
							this.checkboxSizeValue.push(item.value)
						}
					})
					for (let i = 0; i < this.checkboxSizeValue.length; i++) {
						if (this.colorAndSizeValue.data[i]) continue;
						this.colorAndSizeValue.data.splice(i, 0, [])
						for (let j = 0; j < this.checkboxColorValue.length; j++) {
							this.colorAndSizeValue.data[i].splice(j, 0, {
								key: Math.random(),
								colorId: this.checkboxColorValue[j],
								size: this.checkboxSizeValue[i],
								count: 0
							})
						}
					}
				}
			},
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
				getSizeListById(value[2].categorySize).then(res4 => {
					this.sizeList = []
					for (let i = 0; i < res4.length; i++) {
						this.sizeList.push({
							id: i,
							value: res4[i]
						})
					}
				})
				this.checkboxColorValue = []
				this.checkboxSizeValue = []
				this.colorAndSizeValue.data = []
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
			// 根据Id返回尺码
			getSizeById(id) {
				let value;
				this.sizeList.map((item) => {
					if (item.id === id) {
						value = item.value
					}
				})
				return value
			},
			// 计算一个颜色类的总量
			getOrderSumByColor(index) {
				let val = 0
				for (let var1 in this.colorAndSizeValue.data) {
					if (this.colorAndSizeValue.data[var1][index].count != '') {
						val += parseInt(this.colorAndSizeValue.data[var1][index].count)
					}
				}
				return val
			},
			// 计算总的单量
			getOrderSum() {
				let val = 0
				this.checkboxColorValue.map((item, index) => {
					val += parseInt(this.getOrderSumByColor(index))
				})
				return val
			},
			// 显示交期选择器
			showDateEvent(index) {
				this.dateIndex = index
				uni.$u.sleep(200).then(() => {
					this.showDate = true
				})
			},
			// 添加一个交期
			addHopeDate() {
				this.value.hopeDates.push(Number(new Date()))
			},
			// 交期确认
			confirmHandler(e, index) {
				this.value.hopeDates[index] = e.value
				this.showDate = false
				this.dateIndex = -1
			},
			// 删除一个交期
			delHopeDate(index) {
				let that = this;
				uni.showModal({
					title: '询问',
					content: '确定删除吗？',
					success(res) {
						if (res.confirm) {
							that.value.hopeDates.splice(index, 1)
						}
					}
				})
			},
			// 切换省市区时
			SelectAddressEvent(res) {
				this.fullAddr = []
				let val = ''
				res.data.map(item => {
					val += item.name
					this.fullAddr.push(item.name)
				})
				this.value.address1 = val
			},
			// 表格内数字改变
			changeNum(val, index2, index3) {
				if (val.length >= 2) {
					this.colorAndSizeValue.data[index2][index3].count = val.replace(/\b(0+)/gi, "")
				} else {
					this.colorAndSizeValue.data[index2][index3].count = val
				}
				if (val === "") {
					this.colorAndSizeValue.data[index2][index3].count = 0
					return
				}
			},
			getFocus(val, index2, index3) {
				if (this.colorAndSizeValue.data[index2][index3].count == 0) {
					this.colorAndSizeValue.data[index2][index3].count = ''
					return
				}
			},
			lostFocus(val, index2, index3) {
				if (val === "") {
					this.colorAndSizeValue.data[index2][index3].count = 0
					return
				}
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
				if (this.getOrderSum() == 0) {
					uni.$u.toast('订单总量不能为0')
					return
				}
				if (this.value.hopePrice == 0) {
					uni.$u.toast('希望价格不能为0')
					return
				}

				let myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
				if (this.value.phone == '' || !myreg.test(this.value.phone)) {
					uni.$u.toast('手机号格式不对')
					return
				}

				this.$refs.form.validate().then(res => {

					uni.showLoading({
						title: "请等待",
						mask: true
					})

					let detailList = []
					this.colorAndSizeValue.data.map(item1 => {
						item1.map(item2 => {
							detailList.push(item2)
						})
					})
					let data = {
						askId: null,
						amount: this.getOrderSum(),
						areacode: this.fullAddr.join('-'),
						category: this.value.categorySmallId,
						// customerId: uni.getStorageSync('userCustomerId'),
						customerId: uni.getStorageSync('userId'),
						customerSku: this.value.customerSku ? this.value.customerSku : this.value.orderNo,
						detailList,
						givedate: uni.$u.timeFormat(this.value.hopeDates[0], 'yyyy-mm-dd'),
						orderNo: this.value.orderNo,
						price: this.value.hopePrice,
						produceType: this.value.produceTypeId,
						receiveAddr: this.value.address2,
						receivePhone: this.value.phone,
						receivePerson: this.value.receivePerson,
						remark: this.value.remark,
						status: 0,
						syscreated: 0
					}
					// console.log(data);
					askToOrder(data).then(res => {
						if (res.success) {
							if (this.value.fileList1.length == 1) {
								askToOrderPhoto(this.value.fileList1[0].url, 1, data.orderNo).then(
									res1 => {
										if (!res1) {
											uni.$u.toast('上传款式图失败！')
										}
									})
							}
							let sum = 0
							if (this.value.fileList2.length > 0) {
								for (let i = 0; i < this.value.fileList2.length; i++) {
									askToOrderPhoto(this.value.fileList2[i].url, 2, data.orderNo).then(
										res2 => {
											if (!res2) {
												sum += 1
											}
										})
								}
							}
							uni.$u.sleep(1000).then(res => {
								uni.hideLoading()
								if (sum == 0) {
									uni.$u.toast('发布订单成功！')
									setTimeout(() => {
										/* uni.switchTab({
											url: '../../workbench/workbench'
										}) */
										uni.redirectTo({
											url: '../../list/list?statusCode1=1&title=需求订单（未报价）&statusCode2=0&num=1'
										})
									}, 500)
								} else {
									uni.$u.toast('发布订单失败！')
								}
							})
						} else {
							uni.hideLoading()
							uni.$u.toast('发布订单失败！')
						}
					})
					// uploadPhotoAndDdInfo(this.value.fileList1[0].url, JSON.stringify(data)).then(res1 => {
					// 	let data = JSON.parse(res1.data)
					// 	if (data.success) {
					// 		let num = 0;
					// 		for (let i = 0; i < this.value.fileList2.length; i++) {
					// 			uploadPhotoByDdId(this.value.fileList2[i].url, data.data).then(res2 => {
					// 				if (!res2) {
					// 					num += 1
					// 				}
					// 			})
					// 		}
					// 		if (num == 0) {
					// 			uni.hideLoading()
					// 			uni.$u.toast('发布订单成功！')
					// 			setTimeout(() => {
					// 				uni.redirectTo({
					// 					url: '../../list/list?statusCode1=1&title=需求订单（未报价）&statusCode2=0&num=1'
					// 				})
					// 			}, 1000)
					// 		} else {
					// 			uni.hideLoading()
					// 			uni.$u.toast(`上传${num}张附图失败！`)
					// 		}
					// 	} else {
					// 		uni.hideLoading()
					// 		uni.$u.toast('发布订单失败！')
					// 	}
					// })
				}).catch(errors => {
					uni.hideLoading()
					console.log(errors);
				})
			}
		},
		watch: {
			checkboxColorValue(val1, val2) {
				if (val1.length == 0) {
					this.checkboxSizeValue = []
					this.allSizeList = []
					this.allColorList = []
					this.colorAndSizeValue.data = []
					this.flag = true
				} else {
					this.flag = false
					if (val1.length != this.colorList.length) {
						this.allColorList = []
					} else {
						this.allColorList = ['全部']
					}
				}
				// if(this.checkboxSizeValue.length === 0) return
				// 删除一列的
				val2.map((item, index) => {
					let idx1 = val1.indexOf(item)
					if (idx1 === -1) {
						for (let var1 in this.colorAndSizeValue.data) {
							this.colorAndSizeValue.data[var1].splice(index, 1)
						}
						return
					}
				})
				//加入一列的
				val1.map((item, index) => {
					let idx1 = val2.indexOf(item)
					if (idx1 === -1) {
						for (let var1 in this.colorAndSizeValue.data) {
							this.colorAndSizeValue.data[var1].splice(index, 0, {
								key: Math.random(),
								colorId: item,
								// color: '黑色',
								size: this.checkboxSizeValue[var1],
								// size: 'S',
								count: 0
							})
						}
						return
					}
				})
			},
			checkboxSizeValue(val1, val2) {
				if (val1.length == 0) {
					this.colorAndSizeValue.data = []
				} else {
					if (val1.length != this.sizeList.length) {
						this.allSizeList = []
					} else {
						this.allSizeList = ['全部']
					}
				}
				// 删除一行的
				val2.map((item, index) => {
					let idx1 = val1.indexOf(item)
					if (idx1 === -1) {
						this.colorAndSizeValue.data.splice(index, 1)
						return
					}
				})
				//加入一行的
				val1.map((item, index) => {
					let idx1 = val2.indexOf(item)
					if (idx1 === -1) {
						this.colorAndSizeValue.data.splice(index, 0, [])
						for (let var1 in this.checkboxColorValue) {
							this.colorAndSizeValue.data[index].splice(var1, 0, {
								key: Math.random(),
								colorId: this.checkboxColorValue[var1],
								// color: '黑色',
								size: item,
								// size: 'S',
								count: 0
							})
						}
						return
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.txtClose {
		font-size: 28rpx;
	}

	.hopeDate:first-child {
		margin-top: 0px;
	}

	.hopeDate:last-child {
		margin-bottom: 0px;
	}

	.uni-picker-tips {
		font-size: 12px;
		color: #666;
		margin-bottom: 15px;
		padding: 0 15px;
		/* text-align: right; */
	}
</style>
