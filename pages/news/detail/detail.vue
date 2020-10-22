<template>
	<view class="news-detail">
		<view class='title'>{{newsInfo.title}}</view>
		<view class="info">
			<text>发表时间：{{newsInfo.add_time | formatDate}}</text>
			<text>浏览次数：{{newsInfo.click}}</text>
		</view>
		<view class="content">
			<rich-text :nodes="newsInfo.content" selectable></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 0,
				newsInfo: ''
			}
		},
		onLoad(options) {
			this.id = options.id
			this.getNewsDetails()
		},
		methods: {
			//从服务器获取资讯详情
			getNewsDetails() {
				this.$myRequest({
					url: '/api/getnew/' + this.id
				}).then(res => {
					console.log(res);
					this.newsInfo = res.data.message[0]
				})
			}
		}
	}
</script>

<style lang="scss">
	.news-detail {
		padding: 0 16rpx;

		.title {
			text-align: center;
			margin-top: 20rpx;
			font-size: 30rpx;
		}

		.info {
			display: flex;
			justify-content: space-between;
			font-size: 24rpx;
			margin-top: 20rpx;
		}
		.content{
			margin-top: 30rpx;
			padding-bottom: 30rpx;
		}
	}
</style>
