<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
@import "uview-ui/index.scss";
.newPage{
  padding: 16rpx;
}
.example-title{
  color: $u-info;
  margin-bottom: 10rpx;
}
.example-title-one{
  @extend .example-title;
  font-size: 35rpx;
}
.example-demo-area{
  margin-bottom: 20rpx;
}
</style>
