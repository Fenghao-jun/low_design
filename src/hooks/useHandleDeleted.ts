import { ElMessageBox, ElMessage } from 'element-plus'

interface IUseDeleteRuleConfirmation {
  api: (params: any) => Promise<any>
  message: string
  title?: string
  confirmButtonText?: string
  cancelButtonText?: string
  successMsg?: string
}

export const useDeleteRuleConfirmation = (
  config: IUseDeleteRuleConfirmation
) => {
  const {
    api,
    message,
    title = '',
    confirmButtonText = '确定',
    cancelButtonText = '取消',
    successMsg = '删除成功'
  } = config
  const deleteRuleConfirmation = async <T>(params: T) => {
    return new Promise((resolve, reject) => {
      ElMessageBox({
        title: title,
        message: message,
        confirmButtonText: confirmButtonText,
        showCancelButton: true,
        cancelButtonText: cancelButtonText,
        center: true,
        beforeClose: async (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = confirmButtonText
            try {
              const res = await api(params)
              instance.confirmButtonLoading = false
              if (res?.code === '0') {
                done()
                resolve(true) // 在成功删除时，通过 resolve() 返回成功状态
              }
            } catch (err) {
              reject(err) // 在删除失败时，通过 reject(err) 返回错误状态
            }
          } else {
            done()
          }
        }
      })
        .then(() => {
          ElMessage({
            type: 'success',
            message: successMsg
          })
        })
        .catch((err: any) => {
          console.log(err, '=> err')
        })
    })
  }

  return { deleteRuleConfirmation }
}
