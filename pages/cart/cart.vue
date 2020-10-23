<template>
	<view class="cart">
		<view class="cart-item" v-for="(item,index) in cartData" :key="index">
			<view class="item-header">
				<checkbox value="cb1" :checked="item.check" style="transform:scale(0.7)" />
				<view>
					<text>{{item.shopName}}</text>
				</view>
			</view>
			<view class="item-center">
				<checkbox-group @change="checkboxItemChange($event,item.id+'')">
					<checkbox :value="item.id+''" :checked="item.check" style="transform:scale(0.7)" />
				</checkbox-group>
				<image :src="item.img_url"></image>
				<view class="item-center-right">
					<text>{{item.title}}</text>
				</view>
			</view>
			<view class="item-bottom">
				<text>￥{{item.price}}</text>
				<uni-number-box :min="1" :max="9999" @change="bindChange($event,item.id+'')"></uni-number-box>
			</view>
		</view>
		<view class="total-price">
			<view class="check-view">
				<checkbox-group @change="checkboxChange">
					<checkbox value="cb1" :checked="checkAll" style="transform:scale(0.7)" />全选
				</checkbox-group>

				<text>
					合计：￥{{totalPrice}}
				</text>
			</view>
			<view class="view-btn" @click="buy">去结算({{totalNum}})</view>
		</view>
	</view>
</template>

<script>
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	export default {
		components: {
			uniNumberBox
		},
		data() {
			return {
				cartData: [],
				checkAll: false
			}
		},
		onLoad() {
			let cartGoods = uni.getStorageSync('cartGoods')
			console.log(cartGoods);
			this.cartData = cartGoods
		},
		methods: {
			//改变数量
			bindChange(value, id) {
				let result = this.cartData.find((obj) => {
					return obj.id == id
				})
				result.num = (value - 0)
				//当有数量改变的时候，前方的checkbox需要选中
				if (result.num > 1) {
					result.check = true
				}
			},
			//单个item check
			checkboxItemChange(e, id) {
				let checkCurrent = this.cartData.find(function(obj) {
					return obj.id === id
				})
				checkCurrent.check = !checkCurrent.check
				//当所有的item都被选中的时候，下面的全选按钮也需要被选中，
				//同理当所有的item都没有被选中的时候，下面的全选按钮也需要不选中
				let checkData = this.cartData.filter(item => {
					return item.check
				})
				if (checkData.length === 0) {
					this.checkAll = false
					return
				}
				if (checkData.length === this.cartData.length) {
					this.checkAll = true
					return
				}
			},
			//全选
			checkboxChange() {
				this.checkAll = !this.checkAll
				this.cartData.map(item => {
					item.check = this.checkAll
				})
			},
			//结算按钮
			buy() {
				if (!this.totalNum) {
					uni.showToast({
						title: '请选择结算商品'
					})
				} else {
					uni.showToast({
						title: '购买成功'
					})
				}
			}
		},
		//导航栏上自定义按钮的点击事件
		onNavigationBarButtonTap() {
			console.log("点击了编辑按钮");
		},
		computed: {
			totalPrice() {
				let checkCartData = this.cartData.filter(item => {
					return item.check
				})
				let total = checkCartData.reduce((totalPrice, item) => totalPrice + item.price * item.num, 0)
				return total
			},
			//结算按钮上的总数量
			totalNum() {
				let checkCartData = this.cartData.filter(item => {
					return item.check
				})
				let totalNum = checkCartData.reduce((num, item) => num + item.num, 0)
				return totalNum
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.cart {
		background-color: #eee;
		padding: 10rpx;
		margin-bottom: 164rpx;

		.cart-item {
			background-color: #fff;
			border-radius: 5px;
			border: 1px solid #CCCCCC;
			padding: 20rpx;
			margin-bottom: 16rpx;

			.item-header {
				display: flex;

				text {
					padding-left: 15rpx;
					font-size: 28rpx;
				}
			}

			.item-center {
				display: flex;
				align-items: center;
				margin-top: 16rpx;

				image {
					height: 160rpx;
					max-width: 160rpx;
					min-width: 160rpx;
					margin-left: 16rpx;
				}

				.item-center-right {
					align-self: flex-start;
					margin-left: 16rpx;
					font-size: 28rpx;
				}
			}

			.item-bottom {
				display: flex;
				justify-content: flex-end;
				align-items: center;

				text {
					margin-right: 120rpx;
					color: $shop-color;
				}
			}
		}

		.total-price {
			display: flex;
			position: fixed;
			bottom: 100rpx;
			height: 80rpx;
			width: 100%;
			padding: 0px 10px;
			background-color: #fff;
			border-top: 1px solid #eee;
			align-items: center;
			justify-content: space-between;

			text {
				margin-left: 20rpx;
				font-size: 26rpx;
			}

			.check-view {
				display: flex;
				align-items: center;
			}

			.view-btn {
				background-color: $shop-color;
				border-radius: 5px;
				padding: 8px;
				color: #FFF;
				font-size: 28rpx;
				margin-right: 40px;
			}
		}
	}
</style>
