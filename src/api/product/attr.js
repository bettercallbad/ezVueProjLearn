import request from "@/utils/request";

export function getCategory1List() {
  return request({
    url: "/admin/product/getCategory1List",
    method: "get",
  });
}
export function getCategory2List(category1Id) {
  return request({
    url: `/admin/product/getCategory2List/${category1Id}`,
    method: "get",
  });
}
export function getCategory3List(category2Id) {
  return request({
    url: `/admin/product/getCategory3List/${category2Id}`,
    method: "get",
  });
}