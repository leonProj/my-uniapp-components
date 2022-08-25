<template>
  <view class="newPage">
    <view>
      <view class="example-title-one">通用逻辑</view>
      <u-cell-group>
        <u-cell size="large" icon="level" title="useRequest" :isLink="true" @click="onCellClick"></u-cell>
      </u-cell-group>
    </view>
  </view>
</template>

<script>
import {PAGES} from '@/config'

export default {
  data() {
    return {}
  },
  onLoad() {

  },
  methods: {
    onCellClick() {
      uni.$u.route(PAGES.userRequest)
    },
  }
}
</script>

<style scoped lang="scss">
</style>
