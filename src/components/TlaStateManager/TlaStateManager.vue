<!--
数据加载状态控制
  依赖：
    需要使用apiControl返回的数据
  属性：
    watchedState：数组类型，元素为apiControl返回的数据
-->
<template>
  <view class="TlaStatusControl">
    <u-loading-page v-if="isLoading" :loading="true"icon-size="50"></u-loading-page>
    <u-empty
        v-else-if="isError"
        icon="/static/img/error.svg"
        :text="errorMsg"
    >
      <u-button
          v-if="retry"
          size="small"
          type="primary"
          :style="{marginTop:10+'px'}"
          text="点击重试"
          @click="retryFunc"
      >
      </u-button>
    </u-empty>
    <view v-else>
      <slot></slot>
    </view>
  </view>
</template>

<script>

export default {
  props: {
    //被监听的数据
    watchedState: {
      type: Array,
      required: true,
    },
    // 是否显示“点击重试按钮”
    retry:{
      type:Boolean,
      default:false,
    },
  },
  data() {
    return {
      errorMsg: "",
    }
  },
  computed: {
    isLoading() {
      let flag =false
      this.watchedState.map((e) => {
        flag =  flag || e.loading
      })
      return flag
    },
    isError() {
      let flag = false
      this.errorMsg=""
      this.watchedState.map((e) => {
        //如果有错误信息，错误信息打印出来
        if (e.error)
          this.errorMsg = this.errorMsg
              ? this.errorMsg + ',' + e.error
              : e.error
        flag = flag || e.error
      })
      return flag
    },
  },
  methods:{
    retryFunc(){
      this.$emit('retry')
    },
  }
}
</script>

<style lang="scss" scoped>
.TlaStatusControl {


}
</style>
