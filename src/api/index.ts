import request from '@design/http'

export function exportSaleData(id) {
  return request.get({
    url: `/presale-api/client/exportList` // 构造请求的URL
  })
}

export function importSaleData(id) {
  return request.get({
    url: `/presale-api/client/importClient` // 构造请求的URL
  })
}

export function getSaleData(id) {
  return request.get({
    url: `/presale-api/clue/page` // 构造请求的URL
  })
}

export function getSaleAreaData(id) {
  return request.get({
    url: `/presale-api/clue/getAreaClue` // 构造请求的URL
  })
}
