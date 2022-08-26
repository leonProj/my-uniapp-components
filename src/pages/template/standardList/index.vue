<template>
  <view class="newPage">
    <mescroll-body
        ref="mescrollRef"
        @init="mescrollInit"
        @down="downCallback"
        @up="upCallback"
        :page="{num:defaultPageNum,size:defaultPageSize}"
    >
      <view v-for="(item,index) in listData" :key="index" style="height: 100px;border: 1px solid black">
        {{ `item:${item}  --- index${index}` }}
      </view>
    </mescroll-body>
  </view>
</template>

<script>
import MescrollBody from '@/components/mescroll-uni_1.3.7/components/mescroll-body/mescroll-body';
import MescrollMixin from '@/components/mescroll-uni_1.3.7/components/mescroll-uni/mescroll-mixins';
const apiSearch =()=>{
  return new Promise(resolve => {
    setTimeout(()=>{
      resolve({
        code:0,
        records:[1,2,3,4,5,6,7,8,9,10],
        pages:2,
      })
    },1000)
  })
}
export default {
  components: {
    MescrollBody
  },
  mixins: [MescrollMixin],
  data() {
    return {
      listData: [],
      defaultPageSize: 10,
      defaultPageNum: 1,
    }
  },
  methods: {
    // 下拉刷新
    downCallback() {
      this.listData = [];
      this.mescroll.resetUpScroll();
    },
    // 上拉加载更多
    upCallback(mscroll) {
      let params = {
        pageNum: mscroll.num,
        pageSize: mscroll.size,
      }
      apiSearch(params)
          .then((res) => {
            this.listData = this.listData.concat(res.records)
            this.mescroll.endByPage(res.records.length, res.pages) //必传参数(当前页的数据个数, 总页数)
          })
          .catch((e) => {
            uni.showToast({
              title: '加载失败' + e,
              icon: 'error',
            })
            this.mescroll.endErr()
          })
    },
  }
}
</script>
