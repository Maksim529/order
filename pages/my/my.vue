<template>
	<view>
		<view style="display: flex;align-items: center;justify-content: space-between;">
			<view class="userbox" >
				<view style="margin-right: 30rpx;" >
					<u-avatar size="100rpx" :src="user.avatar"></u-avatar>
				</view>
				<text>{{user.name}}</text>
			</view>
			<view style="width: 150rpx;padding-right: 20rpx;" @tap.stop>
				<button shape="circle" size="mini" class="submitbtn"  @click="logout">退出</button>
			</view>
		</view>
		<u-gap height="10" bgColor="#F3F4F6"></u-gap>
		<view>
			<view>
				<u-cell-group>
					<u-cell>
						<view slot="title" class="u-slot-title">
							<text style="margin-right: 15rpx;" class="u-cell-text">会员等级</text>
							<text>{{user.grade ? user.grade : '普通'}}</text>
						</view>
					</u-cell>
					<u-cell>
						<view slot="title" class="u-slot-title">
							<text style="margin-right: 15rpx;" class="u-cell-text">邮箱地址</text>
							<text>{{user.email ? user.email : '未填'}}</text>
						</view>
					</u-cell>
					<u-cell>
						<view slot="title" class="u-slot-title">
							<text style="margin-right: 15rpx;" class="u-cell-text">其他信息</text>
							<text>{{user.other ? user.other : '无'}}</text>
						</view>
					</u-cell>
				</u-cell-group>
			</view>
			<u-gap height="10" bgColor="#F3F4F6"></u-gap>
			<view>
				<u-grid :border="true" @click="click" :col="3">
					<u-grid-item v-for="(item,index) in baseList1" :key="index" :name="index">
						<view style="margin-top: 20rpx;margin-bottom: 5rpx;">
							<u-image width="60rpx" height="60rpx" mode="scaleToFill" :src="item.img"></u-image>
						</view>
						<text style="margin-bottom: 20rpx;">{{item.title}}</text>
					</u-grid-item>
				</u-grid>
			</view>
			<u-gap height="10" bgColor="#F3F4F6"></u-gap>
			<view>
				<u-grid :border="false" @click="click2" :col="4">
					<u-grid-item v-for="(item,index) in baseList2" :key="index" :name="index">
						<view style="margin-top: 20rpx;margin-bottom: 5rpx;">
							<u-image width="60rpx" height="60rpx" mode="scaleToFill" :src="item.img"></u-image>
						</view>
						<text style="margin-bottom: 20rpx;">{{item.title}}</text>
					</u-grid-item>
				</u-grid>
			</view>
		</view>
	</view>
</template>

<script>
	import {getUserInfo} from '../../api/api.js'
	import {isLogin} from '../../util/util.js'
	export default {
		data() {
			return {
				user : {
					// 用户头像
					avatar: '/static/logo.png',
					// 用户名称
					name: '尚加',
					// 会员等级
					grade: '',
					// 邮箱地址
					email: '',
					// 其他
					other: '',
				},
				// 第一个九宫格
				baseList1: [
					{
						img: '/static/my/service.png',
						title: '服务申请'
					},
					{
						img: '/static/my/collect.png',
						title: '我的收藏'
					},
					{
						img: '/static/my/adress.png',
						title: '地址管理'
					},
					{
						img: '/static/my/info.png',
						title: '我的消息'
					},
					{
						img: '/static/my/card.png',
						title: '银行卡'
					},
					{
						img: '/static/my/userinfo.png',
						title: '编辑个人信息'
					}
				],
				// 第二个九宫格
				baseList2: [
					{
						img: '/static/my/yjfk.png',
						title: '意见反馈'
					},
					{
						img: '/static/my/bzzx.png',
						title: '帮助中心'
					},
					{
						img: '/static/my/lxkf.png',
						title: '联系客服'
					},
					{
						img: '/static/my/sz.png',
						title: '设置'
					},
				],
			}
		},
		onShow() {
			if(isLogin()) {
				this.getUserInfo2()
			}
			uni.$on('userchange', () => {
				this.getUserInfo2()
			})
		},
		methods: {
			getUserInfo2() {
				getUserInfo().then(res => {
					this.user.name = res.owner ? res.owner : res.account
					uni.setStorageSync('userId', res.id)
					uni.setStorageSync('userCustomerId', res.customerId || 0)
				})
			},
			// 退出
			logout() {
				uni.removeStorageSync('token')
				uni.removeStorageSync('userId')
				uni.removeStorageSync('userCustomerId')
				uni.reLaunch({
					url: '../login/login'
				})
			},
			
			click(index) {
				switch (index){
					// case 0:
					// 	break;
					// case 1:
					// 	break;
					// case 2:
					// 	break;
					// case 3:
					// 	break;
					// case 4:
					// 	break;
					case 5:
						uni.navigateTo({
							url: 'change-info/change-info'
						})
						break;
					default:
						uni.$u.toast('暂未实现')
						break;
				}
			},
			click2(index) {
				switch (index){
					case 3:
						uni.navigateTo({
							url: 'setting/setting'
						})
						break;
					default:
						uni.$u.toast('暂未实现')
						break;
				}
			},
		}
	}
</script>

<style lang="scss">
	page {
		padding: 0;
	}

	.userbox {
		display: flex;
		align-items: center;
		box-sizing: border-box;
		padding: 20rpx 20rpx;
	}
	.submitbtn,
		.cachebtn,
		.resetbtn {
			/* background-color: #60bcb6; */
			background: linear-gradient(to right, #44bcbc, #44bcbc);
	
			/* background: radial-gradient(220% 105% at top center,  #75517d 10%, #e96f92 65%, #f7f7b6); */
			color: #ffffff;
			border-radius: 40px;
		}
</style>
