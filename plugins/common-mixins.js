import Vue from 'vue'
import numeral from 'numeral'

export default function () {
  Vue.mixin({
    filters: {
      setComma(value, format = '0,0', defaultValue) {
        const m = numeral(`${value}`)
        return m.format(format)
      },
    },
  })
}
