/**
 * author :唐leon
 * updateTime:2022-2-28 14:17
 *
 * 描述：异步状态管理
 * 参数1 apiFunc
 *      必须是一个Promise。
 * 参数2 option
 *      manual：是否要手动出发，默认false，初始化时候就会调用一次接口，否则则需要自己手动调用run方法
 *      onSuccess:成功时候的回调，返回获取的数据
 *      onError:失败时候的回调，返回失败信息
 *      onComplete:无论成功还是失败都会执行的回调
 * 返回值
 *
 * let state = {
 *                         data: null, // 返回的数据
 *                         loading: !manual, // 是否正在加载
 *                         error: null, // 错误信息
 *                         isRefresh: false, // 是否正在局部刷新
 *                         run(params) ,调用接口，params是参数,会直接传给了apiFunc(params)，当然如果你的apifunc不接受参数，那就当然没用了。
 *                         reFresh() 局部刷新。和run的区别就是，调用的时候不会将data重新置为null，而是在加载成功后替换掉。
 *                    }
 推荐使用场景
 非toast显示loading和错误信息的时候使用。
 <div v-if="api.Loading">loading...</div>
 <div v-else-if="api.error">出错啦：{{api.error}}</div>
 <div v-else>{{api.data}}</div>
 */
function useRequest(apiFunc, option = {
  manual: false,
  onSuccess: false,
  onError: false
}) {

  const { manual, onSuccess, onError, onComplete } = option


  const state = {
    data: null,
    loading: !manual,
    error: null,
    isRefresh: false
  }

  const cancelLoading = () => {
    if (state.loading) state.loading = false
    if (state.isRefresh) state.isRefresh = false
    if (state.isReloading) state.isReloading = false
  }

  const execute = (params) => {
    try {
      apiFunc(params)
        .then((e) => {
          state.data = e
          if (onSuccess) {
            onSuccess(e)
          }
        })
        .catch((e) => {
          console.error(e)
          state.error = e

          if (onError) {
            onError(e)
          }
        })
        .finally(() => {
          if (onComplete) {
            onComplete()
          }
          cancelLoading()

        })
    } catch (e) {
      console.error(e)
      state.error = e

      cancelLoading()

      if (onError) {
        onError(e)
      }
      if (onComplete) {
        onComplete()
      }
    }
  }


  //  普通执行 会清空之前查询的数据 相当于reLoad 、
  const run = (params) => {
    state.error = null//  重置错误状态
    state.loading = true//  加载状态改为加载中
    state.data = null//  重置之前查询的数据
    // 执行
    execute(params)
  }

  //  局部刷新
  const reFresh = () => {
    state.isRefresh = true// 加载状态改为加载中
    execute()
  }

  // 如果手动触发为false，则直接run查询
  if (!manual) run()


  state.run = run
  state.reFresh = reFresh

  return state
}

export {
  useRequest
}
