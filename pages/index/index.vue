<template>
	<view class="home">
		<swiper indicator-dots autoplay circular>
			<swiper-item v-for="(item, index) in swipers" :key="item.id" @click="swiperClick(index)">
				<image :src="item.img"></image>
			</swiper-item>
		</swiper>
		<!--导航区域-->
		<view class="nav">
			<view class="nav_item" v-for="item in navs" :key="item.path" @click="navItem(item.path)">
				<view :class="item.icon"></view>
				<text>{{item.title}}</text>
			</view>

		</view>
		<!--推荐商品区域-->
		<view class="hot_goods">
			<view class="tit">推荐商品</view>
			<goods-list :goodslist="goodslist" @goods-item-click='goGoodsDetail'></goods-list>
		</view>
	</view>
</template>

<script>
	import goodsList from '../../components/goods-list/goods-list.vue'
	export default {
		components: {
			'goods-list': goodsList
		},
		data() {
			return {
				swipers: [],
				goodslist: [],
				//原型导航栏数据
				navs: [{
						icon: 'iconfont icon-ziyuan',
						title: '黑马超市',
						path: '/pages/goods/goods'
					},
					{
						icon: 'iconfont icon-guanyuwomen',
						title: '联系我们',
						path: '/pages/contact/contact'
					},
					{
						icon: 'iconfont icon-tupian',
						title: '社区图片',
						path: '/pages/pics/pics'
					},
					{
						icon: 'iconfont icon-shipin',
						title: '学习视频',
						path: '/pages/videos/videos'
					}
				]
			}
		},
		onLoad() {
			this.getSwipers()
			this.getHotGoods()
		},
		methods: {
			//从服务器获取swiper数据
			getSwipers() {
				this.$myRequest({
					"url": '/api/getlunbo'
				}).then((res) => {
					this.swipers = res.data.message
				})
			},

			//从服务器获取商品列表
			getHotGoods() {
				this.$myRequest({
					url: '/api/getgoods?pageindex=1'
				}).then(res => {
					this.goodslist = res.data.message
				})
			},
			//点击跳转到相关页面
			navItem(path) {
				uni.navigateTo({
					url: path
				})
			},
			//点击item跳转到商品详情页
			goGoodsDetail(id) {
				uni.navigateTo({
					url: '../goods/detail/detail?id=' + id
				})
			},
			//swiper点击事件
			swiperClick(index) {
				uni.showToast({
					title: '点击了第' + (index + 1) + '张图片'
				})
			}
		}
	}
</script>

<style lang="scss">
	.home {
		swiper {
			width: 750rpx;
			height: 380rpx;

			image {
				height: 100%;
				width: 100%
			}
		}
	}

	.nav {
		display: flex;

		.nav_item {
			flex: 1;
			text-align: center;

			text {
				font-size: 30rpx;
			}

			view {
				width: 120rpx;
				height: 120rpx;
				background-color: $shop-color;
				border-radius: 50%;
				margin: 10px auto;
				line-height: 120rpx;
				color: #fff;
				font-size: 50rpx;
			}

			.icon-tupian {
				font-size: 45rpx;
			}
		}
	}

	.hot_goods {
		background: #eee;
		overflow: hidden;
		margin-top: 15px;

		.tit {
			height: 100rpx;
			line-height: 100rpx;
			background-color: #fff;
			color: $shop-color;
			letter-spacing: 20px;
			text-align: center;
			font-size: 35rpx;
			margin: 7rpx 0;
		}
	}
</style>
