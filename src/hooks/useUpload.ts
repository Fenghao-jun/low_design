import request from '@/http/index'
import { UploadProps } from 'element-plus'

export interface UploadResponse {
  fileName: string
  fileUrl: string
}

const OSS_API_URL_SUFFIX = '/oss-api'

export const useUpload = () => {
  const limit = 1 // 设置上传数量限制
  const multiple = false // 设置是否支持多文件上传

  const fnUploadRequest: UploadProps['httpRequest'] = (options) => {
    const file = options.file // 拿到 file
    const formDatas = new FormData()
    formDatas.append('file', file)

    return new Promise<UploadResponse>((resolve, reject) => {
      request
        .post<any, UploadResponse>({
          url: `${OSS_API_URL_SUFFIX}/oss/b/objectUpload`,
          data: formDatas,
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then((res) => {
          console.log('res: ', res)
          // const data = {
          //   ...res,
          //   url: BASE_REQUEST_HOST + res.url
          // }
          // resolve(data)

          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  return {
    limit,
    multiple,
    // getUploadHeaders,
    // beforeUpload,
    // handleError,
    // handleExceed,
    // handleSuccess,
    fnUploadRequest
  }
}
