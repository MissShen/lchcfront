import {Loading} from 'element-ui'

let loadingCount = 0;


export function tryShowLoading() {
  if (loadingCount === 0) {
    startLoading()
  }
  loadingCount++
}

export function tryCloseLoading() {
  if (loadingCount <= 0) return;
  loadingCount--;
  if (loadingCount === 0) {
    endLoading()
  }
}

export function forceCloseLoading() {
  endLoading();
}

let loading;

function startLoading() {
  loading = Loading.service({
    lock: true,
    text: '数据加载中...',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

function endLoading() {
  if (!!loading) {
    loading.close()
  }

}

