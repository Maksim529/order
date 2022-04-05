<template>
	<view>
		<u-cell-group>
			<block v-for="(item, index) in list" :key="index">
				<u-cell @click="callPhone(item.ownerTel)" v-if="item.owner != item.ownerTel" :title="item.owner"
					:label="item.ownerTel">
					<view slot="icon" class="u-slot-title" style="margin-right: 10px;">
						<u-avatar :text="firstName(item)" fontSize="18" randomBgColor></u-avatar>
					</view>
				</u-cell>
				<u-cell @click="callPhone(item.ownerTel)" v-else :title="item.owner">
					<view slot="icon" class="u-slot-title" style="margin-right: 10px;">
						<u-avatar src="1.jpg" fontSize="18" randomBgColor></u-avatar>
					</view>
				</u-cell>
			</block>
		</u-cell-group>
	</view>
</template>

<script>
	import {
		getByCustomerId
	} from '../../../api/api.js'
	export default {
		data() {
			return {
				list: []
			};
		},
		onLoad() {
			getByCustomerId().then(res => {
				this.list = res
			})
		},
		methods: {
			callPhone(phone) {
				uni.makePhoneCall({
					phoneNumber: phone
				});
			},
			firstName(item) {
				return item.owner.substr(0, 1)
			}
		}
	}
</script>

<style lang="scss">
	page {
		padding: 0;
	}
</style>
