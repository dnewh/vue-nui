// import Button from './Button'

// import { use, registerComponent } from '../../utils/plugins'

// const Plugin = {
//     install(Vue) {
//         registerComponent(Vue, Button)
//     }
// }

// use(Plugin)

// export default Plugin

// export {
//     Button
// }

import nui from 'vue-nui/nui'
import Button from './Button'

export default Vue => {
    nui(Vue)
    Vue.component(Button.name, Button)
}