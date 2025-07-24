import request from '@/utils/request'

export function getTraderMarks(params) {
  return request({
    url: '/api/product/traderMark',
    method: 'get',
    params: params
  })
}
