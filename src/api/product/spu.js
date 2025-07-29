import request from '@/utils/request';

export function getSpuList({page,limit,category3Id}) {
  return request({
    url: `/product/spu/list/${page}/${limit}`,
    method: 'get',
    params: { category3Id }
  });
}
export function getSpuById(spuId) {
  return request({
    url: `/product/spu/get/${spuId}`,
    method: 'get'
  });
}
export function getTradeMarkList() {
  return request({
    url: '/product/trademark/list',
    method: 'get'
  });
}
export function getSpuImageList(spuId) {
  return request({
    url: `/product/spu/getSpuImageList/${spuId}`,
    method: 'get'
  });
}
export function getBaseSaleAttrList() {
  return request({
    url: '/product/baseSaleAttr/list',
    method: 'get'
  });
}