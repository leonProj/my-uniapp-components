<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view>
      <u-button type="primary" @click="jump">aa</u-button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: 'Hello'
    }
  },
  onLoad() {

  },
  methods: {
    jump() {
      uni.$u.route('pages/index2/index')
    },
  }
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200 rpx;
  width: 200 rpx;
  margin: 200 rpx auto 50 rpx auto;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36 rpx;
  color: #8f8f94;
}
</style>
