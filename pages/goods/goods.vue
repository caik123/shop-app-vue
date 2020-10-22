<template>
	<view class="goods_list">
		<goods-list :goodslist="goodslist" @goods-item-click='goGoodsDetail'></goods-list>
		<view class="bottom-line" v-if="flag">-----我是有底线的-----</view>
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
				pageindex: 1,
				goodslist: [],
				flag: false, //是否下拉到底部没有更多的数据
			}
		},
		onLoad() {
			this.getGoods()
		},
		methods: {
			//从服务器获取商品列表
			getGoods(callback) {
				this.$myRequest({
					url: '/api/getgoods?pageindex=' + this.pageindex
				}).then(res => {
					this.goodslist = [...this.goodslist, ...res.data.message]
				})
				callback && callback()
			},
			//点击item跳转到商品详情页
			goGoodsDetail(id) {
				uni.navigateTo({
					url: '../goods/detail/detail?id=' + id
				})
			}
		},
		onReachBottom() {
			if (this.goodslist.length < 10 * this.pageindex) {
				this.flag = true
				return
			}
			this.pageindex++
			this.getGoods()
		},
		onPullDownRefresh() {
			this.pageindex = 1
			this.goodslist = []
			setTimeout(() => {
				this.getGoods(() => {
					uni.stopPullDownRefresh()
				})
			}, 500)

		}
	}
</script>

<style lang="scss">
	.goods_list {
		background: #eee;
	}

	.bottom-line {
		text-align: center;
		margin: 10px 0;
		color: $shop-color;
	}
</style>
