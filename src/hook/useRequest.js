/**
 * author :唐leon
 * updateTime:2022-2-28 14:17
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
  const reFresh = (params) => {
    state.isRefresh = true// 加载状态改为加载中
    execute(params)
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
