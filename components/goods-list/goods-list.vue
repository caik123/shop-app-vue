<template>
	<view class="goods_list">
		<view class="goods_item" v-for="(item,index) in goodslist" :key="item.id" @click="itemClick(item.id)">
			<image :src="item.img_url" @error="errorImg(index)"></image>
			<view class="price">
				<text>￥{{item.sell_price}}</text>
				<text>￥{{item.market_price}}</text>
			</view>
			<text class="name">{{item.title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['goodslist'],
		methods: {
			itemClick(id) {
				this.$emit('goods-item-click', id)
			},
			//加载图片错误占位图
			errorImg(index) {
				this.goodslist[index].img_url = '../../static/hmlogo.png'
			}
		}
	}
</script>

<style lang="scss">
	.goods_list {
		padding: 0 15rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		.goods_item {
			background: #fff;
			width: 358rpx;
			margin-bottom: 7rpx;
			padding: 15rpx;
			box-sizing: border-box;

			image {
				width: 80%;
				height: 150px;
				display: block;
				margin: auto;
			}
		}

		.price {
			color: $shop-color;
			font-size: 36rpx;

			text:nth-child(2) {
				color: #ccc;
				font-size: 28rpx;
				margin-left: 15px;
				text-decoration: line-through;
			}
		}

		.name {
			font-size: 28rpx;
			line-height: 50rpx;
			padding-top: 10rpx;
			padding-bottom: 15rpx;
		}
	}
</style>
