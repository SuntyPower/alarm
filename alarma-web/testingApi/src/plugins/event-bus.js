const Eventbus = {}


Eventbus.install = function (Vue) {
  Vue.prototype.$bus = new Vue()
}

export default Eventbus
