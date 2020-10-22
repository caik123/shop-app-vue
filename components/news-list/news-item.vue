<template>
	<view>
		<view class="news-item" v-for="item in newslist" :key="item.id" @click="itemClick(item.id)">
			<view>
				<image :src="item.img_url"></image>
			</view>
			<view class="right">
				<view class="title">{{item.title}}</view>
				<view class="time">
					<text>发表时间：{{item.add_time | formatDate}}</text>
					<text>浏览次数：{{item.click}}</text>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		props: ['newslist'],
		// filters: {
		// 	formatDate(value) {
		// 		let date = new Date(value)
		// 		let year = date.getFullYear()
		// 		let month = (date.getMonth() + 1).toString().padStart(2, 0)
		// 		let day = date.getDate().toString().padStart(2, 0)
		// 		let hour = date.getHours().toString().padStart(2, '0')
		// 		let minute = date.getMinutes().toString().padStart(2, '0')
		// 		let second = date.getSeconds().toString().padStart(2, '0')
		// 		// return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
		// 		return `${year}-${month}-${day} ${hour}:${minute}:${second}`
		// 	}
		// },
		methods:{
			itemClick(id){
				//item-click不能驼峰命名，不然父组件接受不到传值
				this.$emit('item-click',id)
			}
		}
	}
</script>

<style lang="scss">
	.news-item {
		display: flex;
		padding: 8rpx 10rpx;
		border-bottom: 1px solid $shop-color;

		image {
			max-width: 200rpx;
			min-width: 200rpx;
			height: 150rpx;
		}

		.right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin-left: 15rpx;

			.title {
				font-size: 30rpx;
			}

			.time {
				font-size: 24rpx;

				text:nth-child(2) {
					margin-left: 10rpx;
				}
			}
		}
	}
</style>
