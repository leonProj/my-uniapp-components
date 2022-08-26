<template>
  <view class="newPage">
    <view>
      <view class="example-title-one">通用逻辑</view>
      <u-cell-group>
        <u-cell size="large" icon="level" title="useRequest" :isLink="true" @click="onCellClick(PAGES.userRequest)"></u-cell>
      </u-cell-group>
    </view>
    <view>
      <view class="example-title-one">hook组件</view>
      <u-cell-group>
        <u-cell size="large" icon="backspace" title="TlaStateManager" :isLink="true" @click="onCellClick(PAGES.TlaStateManager)"></u-cell>
      </u-cell-group>
    </view>
    <view>
      <view class="example-title-one">模板页面</view>
      <u-cell-group>
        <u-cell size="large" icon="order" title="标准下拉列表" :isLink="true" @click="onCellClick(PAGES.standardList)"></u-cell>
      </u-cell-group>
    </view>
  </view>
</template>

<script>
import {PAGES} from '@/config'

export default {
  data() {
    this.PAGES = PAGES
    return {}
  },
  onLoad() {

  },
  methods: {
    onCellClick(url) {
      uni.$u.route(url)
    },
  }
}
</script>

<style scoped lang="scss">
</style>
