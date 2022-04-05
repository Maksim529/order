<template>
	<view>
		<u-cell-group v-if="pt == 0">
			<block v-for="(item,index) in files" :key="index">
				<u-cell @click="previewFile" :name="index" size="large" value="预览" :title="item.fileOriginName"
					:label="item.fileSizeInfo" isLink>
					<image v-show="item.fileSuffix == 'jpg' || item.fileSuffix == 'jpeg'"
						style="width: 100rpx;height: 100rpx;" mode="aspectFit" slot="icon" src="/static/JPG.png">
					</image>
					<image v-show="item.fileSuffix == 'png'" style="width: 100rpx;height: 100rpx;" mode="aspectFit"
						slot="icon" src="/static/PNG.png"></image>
					<image v-show="item.fileSuffix == 'pdf'" style="width: 100rpx;height: 100rpx;" mode="aspectFit"
						slot="icon" src="/static/PDF.png"></image>
					<image v-show="item.fileSuffix == 'mp4'" style="width: 100rpx;height: 100rpx;" mode="aspectFit"
						slot="icon" src="/static/MP4.png"></image>
					<image v-show="item.fileSuffix == 'doc' || item.fileSuffix == 'docx'"
						style="width: 100rpx;height: 100rpx;" mode="aspectFit" slot="icon" src="/static/DOCX.png">
					</image>
					<image v-show="item.fileSuffix == 'zip' || item.fileSuffix == 'rar'"
						style="width: 100rpx;height: 100rpx;" mode="aspectFit" slot="icon" src="/static/ZIP.png">
					</image>
				</u-cell>
			</block>
		</u-cell-group>
		<u-cell-group v-if="pt == 1">
			<block v-for="(item,index) in files" :key="index">
				<u-cell @click="previewVideo" :name="index" size="large" value="预览" :title="index + 1 + '.mp4'" isLink>
					<image style="width: 100rpx;height: 100rpx;" mode="aspectFit" slot="icon" src="/static/MP4.png">
					</image>
				</u-cell>
			</block>
		</u-cell-group>
		<u-popup :safeAreaInsetBottom="false" :show="show" @close="close" :closeable="false" :closeOnClickOverlay="true"
			:round="10" mode="center">
			<view
				style="width: 300px;height: 250px;display: flex;flex-direction: column;justify-content: center;align-items: center;">
				<video :src="video" class="my-Video"></video>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		fileList,
		getOrderSpeedFileList
	} from '../../api/api.js'
	export default {
		data() {
			return {
				files: [],
				imgUrl: "https://images.jcxxdd.com/",
				video: '',
				show: false,
				pt: 0
			};
		},
		onLoad(options) {
			uni.setNavigationBarTitle({
				title: options.title
			})
			this.pt = options.pt
			if (options.pt == 0) {
				fileList(options.id, options.type).then(res => {
					this.files = res
				})
			} else {
				let data = {
					orderId: options.orderId,
					businessType: options.businessType,
					fileType: options.fileType
				}
				getOrderSpeedFileList(data).then(res => {
					// console.log(res);
					this.files = res
				})
			}
		},
		methods: {
			previewVideo(e) {
				let file = this.files[e.name]
				this.video = file
				this.show = true
			},
			close() {
				this.show = false
			},
			previewFile(e) {
				let that = this
				let file = this.files[e.name]
				switch (file.fileSuffix) {
					case 'jpg':
					case 'png':
					case 'jpeg':
						uni.previewImage({
							urls: [that.imgUrl + file.filePath]
						})
						break;
					case 'zip':
					case 'rar':
						uni.setClipboardData({
							data: that.imgUrl + file.filePath, //要复制的数据
							success(res) {
								// uni.$u.toast('已复制链接，请自行下载')
								uni.showModal({
									title:'提示',
									content: '链接已复制,打开浏览器下载',
									showCancel:false,
								})
							}
						})
						break;
					default:
						uni.downloadFile({
							url: that.imgUrl + file.filePath,
							success: (res) => {
								const path = res.tempFilePath;
								// if (file.fileSuffix == 'zip') {
								// 	// let fm = uni.getFileSystemManager()
								// 	// fm.saveFile({
								// 	// 	tempFilePath: path,
								// 	// 	filePath: wx.env.USER_DATA_PATH + '/' + file.fileObjectName,
								// 	// 	success:(res2) => {
								// 	// 		console.log(res2);
								// 	// 		if(res2.errMsg == "saveFile:ok") {
								// 	// 			uni.$u.toast('文件保存在' + res2.savedFilePath)
								// 	// 		}
								// 	// 	}
								// 	// })
								// 	return
								// }
								uni.openDocument({
									filePath: path,
									fileType: file.fileSuffix,
									success: (res) => {
										// uni.navigateBack({
										// 	delta: 1
										// });
									},
									fail: (err) => {
										uni.showToast({
											title: '打开文件失败',
											icon: 'error',
											duration: 2000
										});
									},
								})
							},
						})
						break;
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		padding: 0;
	}

	.my-Video {
		width: 280px;
		height: 230px;
	}
</style>
