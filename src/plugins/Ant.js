import {
  Button, Row, Col, Layout, Icon, Spin, Form,
} from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

export default {
  install(Vue) {
    Vue.use(Form)
    Vue.component('Button', Button)
    Vue.component('Row', Row)
    Vue.component('Column', Col)
    Vue.component('Layout', Layout)
    Vue.component('LayoutHeader', Layout.Header)
    Vue.component('LayoutContent', Layout.Content)
    Vue.component('LayoutFooter', Layout.Footer)
    Vue.component('Icon', Icon)
    Vue.component('Spin', Spin)
  },
}
