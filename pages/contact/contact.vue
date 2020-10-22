<template>
	<view class="contact">
		<image src="http://www.itcast.cn/2018czydz/images/gywmban.jpg"></image>
		<view class="txt">
			<view @click="callphone">联系电话：027-87179095（点击拨打）</view>
			<view>地址：湖北省武汉市东湖新技术开发区光谷软件园C3栋8层</view>
		</view>
		<map :longitude="longitude" :latitude="latitude" :markers="markers"></map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				longitude: 114.409955,
				latitude: 30.483327,
				markers: [{
					longitude: 114.409955,
					latitude: 30.483327,
					iconPath: '../../static/hmlogo.png',
					width: 25,
					height: 25
				}]
			}
		},
		methods: {
			callphone() {
				uni.makePhoneCall({
					phoneNumber: '027-87179095'
				})
			}
		}
	}
</script>

<style lang="scss">
	.contact {
		image {
			width: 100%;
			height: 380rpx;
		}

		.txt {
			padding: 10rpx 25rpx;
			line-height: 50rpx;
			font-size: 30rpx;
		}

		map {
			width: 100%;
			height: 750rpx;
		}

	}
</style>
