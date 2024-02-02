export default {
  install: (app: any) => {
    const fun = function (evt: any) {
      let target = evt.target
      if (target.nodeName === 'SPAN') {
        target = evt.target.parentNode
      }
      target.blur()
    }
    app.directive('outActiveBtn', {
      mounted(el: any) {
        el.addEventListener('focus', fun)
      },
      unmounted(el: any) {
        el.removeEventListener('focus', fun)
      }
    })
  }
}
