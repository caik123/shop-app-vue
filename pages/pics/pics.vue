<template>
	<view class="pics">
		<scroll-view class="pics-left" scroll-y>
			<view :class="active===index?'active':''" v-for="(item,index) in categorylist" :key="item.id" @click="categoryClick(item.id,index)">{{item.title}}</view>
		</scroll-view>
		<scroll-view class="pics-right" scroll-y>
			<view class="right-item" v-for="item in rightData">
				<image :src="item.img_url" @click="imgPreview(item.img_url)"></image>
				<view>{{item.title}}</view>
			</view>
			<view class="right-none" v-if="rightData.length===0">暂无内容</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				categorylist: [],
				active: 0,
				rightData: []
			}
		},
		onLoad() {
			this.getCategory()
		},
		methods: {
			//从服务器获取图片分类
			getCategory() {
				this.$myRequest({
					url: '/api/getimgcategory'
				}).then(res => {
					this.categorylist = res.data.message
				})
			},
			//点击左侧分类
			categoryClick(cateId, index) {
				this.active = index
				this.$myRequest({
					url: '/api/getimages/' + cateId
				}).then(res => {
					this.rightData = res.data.message
					console.log(this.rightData);
				})
			},
			//图片预览点击事件
			imgPreview(current) {
				let urls = this.rightData.map(item => {
					return item.img_url
				})
				uni.previewImage({
					current,
					urls
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.pics {
		height: 100%;
		display: flex;
		justify-content: space-between;

		.pics-left {
			width: 200rpx;
			height: 100%;
			border-right: 1px solid #eee;

			view {
				height: 60px;
				line-height: 60px;
				border-top: 1px solid #eee;
				text-align: center;
				font-size: 30rpx;
			}

			.active {
				color: #fff;
				background-color: $shop-color;
			}
		}

		.pics-right {
			width: 535rpx;
			height: 100%;
			padding: 15rpx 7.5rpx;

			.right-item {
				margin-bottom: 20px;

				view {
					font-size: 30rpx;
					line-height: 50rpx;
					margin-left: 10px;
				}
			}

			.right-none {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100%;
			}
		}
	}
</style>
