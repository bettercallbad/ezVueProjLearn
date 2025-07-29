import request from '@/utils/request';

export function getSpuList({page,limit,category3Id}) {
  return request({
    url: `/product/spu/list/${page}/${limit}`,
    method: 'get',
    params: { category3Id }
  });
}