<template>
	<view>
		<news-item :newslist='newslist' @item-click="gotoDetail"></news-item>
	</view>
</template>

<script>
	import newsItem from '../../components/news-list/news-item.vue'
	export default {
		components: {
			'news-item': newsItem
		},
		data() {
			return {
				newslist: []
			}
		},
		onLoad() {
			this.getnewslist()
		},
		methods: {
			//从服务器获取资讯列表
			getnewslist() {
				this.$myRequest({
					url: '/api/getnewslist'
				}).then(res => {
					console.log(res)
					this.newslist = res.data.message
				})
			},
			//进入详情页
			gotoDetail(id) {
				uni.navigateTo({
					url: './detail/detail?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss">
</style>
