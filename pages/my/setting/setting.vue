<template>
	<view>
		<view class="content">
			<view class="list">
				<view class="row">
					<view class="title">头像</view>
					<view class="right"><view class="tis">
					<image src="/static/logo.png" mode="widthFix"></image>
					</view><view class="icon xiangyou"></view></view>
				</view>
				<view class="row">
					<view class="title">昵称</view>
					<view class="right"><view class="tis">卓尚智造</view><view class="icon xiangyou"></view></view>
				</view>
				<view class="row">
					<view class="title">个性签名</view>
					<view class="right"><view class="tis">只听对的，用户至上，成就他人</view><view class="icon xiangyou"></view></view>
				</view>
				<view class="row">
					<view class="title">收货地址</view>
					<view class="right"><view class="tis">长空路一号</view><view class="icon xiangyou"></view></view>
				</view>
				<view class="row">
					<view class="title">账户安全</view>
					<view class="right"><view class="tis"></view><view class="icon xiangyou"></view></view>
				</view>
			</view>
			<view class="list">
				<view class="row">
					<view class="title">通知提醒</view>
					<view class="right"><view class="tis"></view><view class="icon xiangyou"></view></view>
				</view>
				
				<view class="row">
					<view class="title">通用</view>
					<view class="right"><view class="tis"></view><view class="icon xiangyou"></view></view>
				</view>
			</view>
			<view class="list">
				<view class="row">
					<view class="title">版本升级</view>
					<view class="right"><view class="tis">v1.0.0</view><view class="icon xiangyou"></view></view>
				</view>
				<view class="row">
					<view class="title">清除缓存</view>
					<view class="right"><view class="tis">1.2 MB</view><view class="icon xiangyou"></view></view>
				</view>
				<view class="row">
					<view class="title">问题反馈</view>
					<view class="right"><view class="tis">1783566511@qq.com</view><view class="icon xiangyou"></view></view>
				</view>
				<view class="row">
					<view class="title">关于我们</view>
					<view class="right"><view class="tis">卓尚服饰（杭州）有限公司</view><view class="icon xiangyou"></view></view>
				</view>
				<view class="row" @click="callPhoneNumber" data-number="17356510776">
					<view class="title">联系我们</view>
					<view class="right"><view class="tis cu-tag round bg-blue light">17356510776</view><view class="icon xiangyou"></view></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			showType(tbIndex){
				this.tabbarIndex = tbIndex;
				this.list = this.orderList[tbIndex];
			},
			//拨打固定电话
			callPhoneNumber() {
				uni.makePhoneCall({
					phoneNumber: "17356510776",
				});
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f3f3f3;	
}

.icon {
	font-size: 30upx;

}
.content{
	padding-bottom: 20upx;
	.list{
		width: 96%;
		padding-left: 4%;
		background-color: #fff;
		margin-bottom: 20upx;
		.row{
			widows: 100%;
			min-height: 90upx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: solid 1upx #eee;
			&:last-child{
				border-bottom: none;
			}
			.title{
				font-size: 32upx;
				color: #333;
			}
			.right{
				display: flex;
				align-items: center;
				color: #999;
				.tis{
					font-size: 26upx;
					margin-right: 5upx;
					max-height: 120upx;
					image{
						width: 100upx;
						height: 100upx;
						border-radius: 100%;
						margin: 10upx 0;
					}
				}
				.icon{
					width: 40upx;
					color: #cecece;
				}
			}
			
		}
	}
}

</style>
