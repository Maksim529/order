<template>
	<view>
		<u--form labelPosition="left" :model="value" :rules="rules" ref="uForm">
			<u-form-item label="姓名" prop="owner">
				<u--input v-model="value.owner"></u--input>
			</u-form-item>
		</u--form>
		<view style="margin: 20rpx;">
			<button @click="submit" class="submitbtn">确认修改</button>
		</view>
	</view>
</template>

<script>
	import {
		changeUserInfo,
		getUserInfo
	} from '../../../api/api.js'
	export default {
		data() {
			return {
				value: {
					id: '',
					owner: ''
				},
				rules: {
					owner: [{
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					}]
				}
			};
		},
		onLoad() {
			getUserInfo().then(res => {
				this.value.id = res.id
				this.value.owner = res.owner
			})
		},
		methods: {
			submit() {
				this.$refs.uForm.validate().then(res => {
					changeUserInfo(this.value).then(res2 => {
						if (res2.success) {
							uni.$u.toast('修改成功')
							uni.navigateBack({})
							uni.$emit('userchange',{})
						}
					})
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			}
		}
	}
</script>

<style lang="scss">
.submitbtn,
	.cachebtn,
	.resetbtn {
		/* background-color: #60bcb6; */
		background: linear-gradient(to right, #44bcbc, #44bcbc);

		/* background: radial-gradient(220% 105% at top center,  #75517d 10%, #e96f92 65%, #f7f7b6); */
		color: #ffffff;
		border-radius: 10px;
	}
</style>
