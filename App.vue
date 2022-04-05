<script>
	
	export default {
		onLaunch: function() {
			
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
	page {
		box-sizing: border-box;
		padding-left: 24rpx;
		padding-right: 24rpx;
	}
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
