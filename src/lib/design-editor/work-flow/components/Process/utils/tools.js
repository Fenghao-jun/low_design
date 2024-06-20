import { v4 as uuidv4 } from 'uuid'

/**
 * 获取UUID
 * @returns {*}
 */
export const getUUID = () => {
    return uuidv4()
}

/**
 * 复制对象(深拷贝)
 * @param source
 */
export const copy = (source) => {
    if (source) {
        const str = JSON.stringify(source);
        return JSON.parse(str);
    }
    return null;
}


export const loadDrawerComp = () => {
    const modules = require.context('../node', true, /.*\/.*Drawer\.vue$/)
    modules.keys().forEach((path) => {
        console.log('321', path, modules.resolve(path), modules(path))
    })

}