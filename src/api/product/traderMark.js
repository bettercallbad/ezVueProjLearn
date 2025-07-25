import request from "@/utils/request";

export function getTraderMarks(params) {
  return request({
    url: "/api/product/traderMark",
    method: "get",
    params: params,
  });
}

export function addTraderMark(data) {
  if (data.id !== undefined && data.id != null) {
    return request({
      url: "/api/product/traderMark/" + data.id,
      method: "put",
      data: data,
    });
  } else {
    return request({
      url: "/api/product/traderMark",
      method: "post",
      data: data,
    });
  }
}
