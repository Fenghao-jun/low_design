import { ButtonProps as ElButtonProps } from 'element-plus'

export interface ButtonProps extends ElButtonProps {
  content?: string
  /**
   * 用于权限系统鉴权的code
   */
  permissionCode?: string
}
