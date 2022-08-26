<template>
  <TlaStateManager :watched-state="[loadData]" retry @retry="loadData.run(1)">
    <template v-if="loadData.data">
      <u-button @click="loadData.run(1)">加载数据(成功)</u-button>
      <u-button @click="loadData.run(0)">加载数据(失败)</u-button>
      <view style="text-align: center;font-weight: bold;color: #4aec50">
        {{ loadData.data }}
      </view>
    </template>
  </TlaStateManager>
</template>

<script>
import TlaStateManager from "@/components/TlaStateManager/TlaStateManager";
import {useRequest} from "@/hook/useRequest";

const api = (param) => {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      if(param){
        resolve(`加载成功√ 参数为：${param}`)
      }else {
        reject(`fail参数为：${param}`)
      }
    }, 1000)
  })
}
export default {
  components: {
    TlaStateManager
  },
  onLoad(){
    this.loadData.run(1)
  },
  data() {
    return {
      loadData: useRequest(
          (param) => {
            return api(param)
          },
          {
            manual:true,
            onError: (e) => {
              uni.showToast({
                title: e,
                icon: 'error',
              })
            }
          }),
    }
  }
}
</script>
