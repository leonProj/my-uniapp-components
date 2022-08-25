<template>
  <view class="newPage">
    <view class="example-demo-area">
      <view class="example-title-one">基本使用</view>
      <u-button @click="loadData.run" style="width: 50%">加载数据</u-button>
      <view style="text-align: center;margin-bottom: 10px">
        <view v-if="loadData.loading">loading...</view>
        <view v-else-if="loadData.error">error</view>
        <view v-else>{{ loadData.data }}</view>
      </view>
      <u-line color="#2979ff"></u-line>
    </view>
    <view class="example-demo-area">
      <view class="example-title-one">手动加载</view>
      <u-button @click="loadDataManual.run" style="width: 50%">加载数据</u-button>
      <view style="text-align: center;margin-bottom: 10px">
        <view v-if="loadDataManual.loading">loading...</view>
        <view v-else-if="loadDataManual.error">error</view>
        <view v-else>{{ loadDataManual.data || '暂未加载数据' }}</view>
      </view>
      <u-line color="#2979ff"></u-line>
    </view>

    <view class="example-demo-area">
      <view class="example-title-one">静态刷新</view>
      <u-button @click="loadDataRefresh.run" style="width: 50%">加载数据</u-button>
      <u-button @click="loadDataRefresh.reFresh" style="width: 50%">静态刷新</u-button>
      <view style="text-align: center;margin-bottom: 10px">
        <view v-if="loadDataRefresh.loading">loading...</view>
        <view v-else-if="loadDataRefresh.error">error</view>
        <view v-else>{{ loadDataRefresh.data || '暂未加载数据' }}</view>
      </view>
      <u-line color="#2979ff"></u-line>
    </view>

    <view class="example-demo-area">
      <view class="example-title-one">传递参数</view>
      <u-button @click="loadDataParam.run({type:1})" style="width: 50%">加载数据(成功)</u-button>
      <u-button @click="loadDataParam.run({type:0})" style="width: 50%">加载数据(失败)</u-button>
      <view style="text-align: center;margin-bottom: 10px">
        <view v-if="loadDataParam.loading">loading...</view>
        <view v-else-if="loadDataParam.error">error</view>
        <view v-else>{{ loadDataParam.data || '暂未加载数据' }}</view>
      </view>
      <u-line color="#2979ff"></u-line>
    </view>

    <view class="example-demo-area">
      <view class="example-title-one">完全控制</view>
      <u-button @click="apiLoadDataControl.run()" style="width: 50%">加载数据</u-button>
      <view style="text-align: center;margin-bottom: 10px">
        <view v-if="loading">loading...</view>
        <view v-else-if="error">{{ error }}</view>
        <view v-else>{{ data || '暂未加载数据' }}</view>
      </view>
      <u-line color="#2979ff"></u-line>
    </view>

  </view>
</template>

<script>
import {useRequest} from "@/utils/useRequest";

const api = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("加载成功√")
    }, 1000)
  })
}
const apiTime = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const date = new Date()
      const time = `${date.getHours()} : ${date.getMinutes()}: ${date.getSeconds()}`
      resolve(`加载成功√,时间:${time}`)
    }, 1000)
  })
}
const apiParam = (param) => {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      if(param.type){
        resolve(`加载成功√ 参数为：${param.type}`)
      }else {
        reject(`加载失败 参数为：${param.type}`)
      }
    }, 1000)
  })
}

export default {
  onLoad() {

  },
  data() {
    return {
      loading: false,
      data: null,
      error: null,

      /* api */
      loadData: useRequest(
          () => {
            return api()
          }),
      loadDataManual: useRequest(
          () => {
            return api()
          },
          {
            manual: true
          }),
      loadDataRefresh: useRequest(
          () => {
            return apiTime()
          }),
      loadDataParam: useRequest(
          (param) => {
            return apiParam(param)
          },
          {
            manual: true
          }),
      apiLoadDataControl: useRequest(
          () => {
            this.loading = true
            return api()
          },
          {
            manual: true,
            onSuccess: (e) => {
              if (this.error) {
                this.error = null
              }
              this.data = e
            },
            onError: (e) => {
              this.error = e
            },
            onComplete: (e) => {
              this.loading = false
            }
          }),
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.newPage {

}
</style>
