<template>
	<view class="goods-detail">
		<swiper indicator-dots autoplay>
			<swiper-item v-for="(item,index) in goodsswipers" :key="index">
				<image :src="item.src"></image>
			</swiper-item>
		</swiper>
		<view class="box1">
			<view class="price">
				<text>￥{{goodsinfo.sell_price}}</text>
				<text>￥{{goodsinfo.market_price}}</text>
			</view>
			<text class="tit">{{goodsinfo.title}}</text>
		</view>
		<view class="line"></view>
		<view class="box2">
			<view>货号：{{goodsinfo.goods_no}}</view>
			<view>库存：{{goodsinfo.stock_quantity}}</view>
		</view>
		<view class="line"></view>
		<view class="box3">
			<rich-text :nodes="goodsIntro" selectable></rich-text>
		</view>
		<view class="bottom-nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue'
	export default {
		components: {
			uniGoodsNav
		},
		data() {
			return {
				id: 0,
				goodsswipers: [],
				goodsinfo: '',
				goodsIntro: '',
				options: [{
					icon: 'headphones',
					text: '客服'
				}, {
					icon: 'shop',
					text: '店铺',
					info: 2,
					infoBackgroundColor: '#007aff',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		onLoad(options) {
			this.id = options.id
			this.getGoodsSwiper()
			this.getGoodsInfo()
			this.getGoodsIntro()
		},
		methods: {
			//从服务器获取商品详情
			getGoodsSwiper() {
				this.$myRequest({
					url: '/api/getthumimages/' + this.id
				}).then(res => {
					this.goodsswipers = res.data.message
				})
			},
			getGoodsInfo() {
				this.$myRequest({
					url: '/api/goods/getinfo/' + this.id
				}).then(res => {
					this.goodsinfo = res.data.message[0]
				})
			},
			getGoodsIntro() {
				this.$myRequest({
					url: '/api/goods/getdesc/' + this.id
				}).then(res => {
					console.log(res);
					this.goodsIntro = res.data.message[0].content
				})
			},
			//客服等点击事件
			onClick(e) {
				console.log(e);
				if (e.index === 0) {
					uni.showToast({
						title: "点击了客服"
					})
				} else if (e.index === 1) {
					uni.showToast({
						title: "点击了店铺"
					})
				} else {
					uni.switchTab({
						url: '../../cart/cart'
					})
				}
			},
			//加入购物车等点击事件
			buttonClick(e) {

				const cartGoods = uni.getStorageSync('cartGoods') || []
				const cartGood = {}
				if (cartGoods.length > 0) {
					cartGoods.forEach((item, index) => {
						if (item.id.toString() === this.id) {
							item.num++
							cartGoods[index] = item
							uni.removeStorageSync('cartGoods')
							uni.setStorageSync('cartGoods', cartGoods)
							return
						}
					})
				} else {
					cartGood.id = this.id - 0
					cartGood.shopName = '网易优选旗舰店'
					cartGood.title = this.goodsinfo.title
					cartGood.img_url = this.goodsswipers[0].src
					cartGood.price = this.goodsinfo.sell_price
					cartGood.num = 1
					cartGood.check = false

					cartGoods.push(cartGood)
					uni.setStorageSync('cartGoods', cartGoods)
				}
				this.options[2].info++
			}
		}
	}
</script>

<style lang="scss">
	.goods-detail {
		swiper {
			height: 700rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.box1 {
			padding: 0 20rpx;

			.price {
				font-size: 36rpx;
				color: $shop-color;
				line-height: 60rpx;

				text:nth-child(2) {
					font-size: 28rpx;
					color: #CCCCCC;
					text-decoration: line-through;
					margin-left: 20rpx;
				}
			}

			.tit {
				font-size: 28rpx;
				line-height: 60rpx;
			}
		}

		.line {
			height: 20rpx;
			width: 100%;
			background-color: #eee;
		}

		.box2 {
			padding: 10rpx 20rpx;

			view {
				line-height: 60rpx;
				font-size: 28rpx;
			}
		}

		.box3 {
			font-size: 26rpx;
			padding-left: 10rpx;
			padding-bottom: 100rpx;
			padding-top: 10rpx;
			padding-right: 10rpx;
			line-height: 50rpx;
		}

		.bottom-nav {
			position: fixed;
			bottom: 0;
			width: 100%;
		}
	}
</style>
