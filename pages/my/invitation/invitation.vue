<template>
	<view>
		<view class="box1">
			<u-input type="number" placeholder="请输入被邀请人手机号" border="surround" v-model="tel"></u-input>
			<u-button :disabled="tel == '' || tel.length < 11" @click="saveInvite" :custom-style="btnStyle" type="primary" text="邀请"></u-button>
		</view>
	</view>
</template>

<script>
	import {saveInvite} from '../../../api/api.js'
	export default {
		data() {
			return {
				tel: '',
				btnStyle: {
					width: '100px',
					marginLeft: '10px'
				}
			};
		},
		methods: {
			saveInvite() {
				if(!uni.$u.test.mobile(this.tel)) {
					uni.$u.toast('不是合法手机号！')
					return
				}
				uni.showModal({
					title:'询问',
					content:`您确定要邀请${this.tel}吗？`,
					success: (res) => {
						if(res.confirm) {
							saveInvite(this.tel).then(res => {
								if(res.success) {
									uni.$u.toast('邀请成功！')
									this.tel = ''
								}
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
.box1 {
	margin-top: 15px;
	display: flex;
	align-items: center;
}
</style>
