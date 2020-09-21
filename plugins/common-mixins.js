import Vue from 'vue'
import vueNumeralFilterInstaller from 'vue-numeral-filter'

Vue.use(vueNumeralFilterInstaller)

// export default function () {
//   Vue.mixin({
//     filters: {
//       setComma(value, format = '0,0', defaultValue) {
//         const m = numeral(`${value}`)
//         return m.format(format)
//       },
//     },
//   })
// }
