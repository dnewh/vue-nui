import './scss/nui-build.scss';

import * as components from './components'
import config, { setOptions } from './utils/config'
import { use, registerComponentProps } from './utils/plugins'

const nui = {
    install(Vue, options = {}) {
        // Options
        setOptions(Object.assign(config, options))
        // Components
        for (let componentKey in components) {
            Vue.use(components[componentKey])
        }
        // Config component
        const nuiProgrammatic = {
            setOptions(options) {
                setOptions(Object.assign(config, options))
            }
        }
        registerComponentProps(Vue, '$nui', nuiProgrammatic)
    }
}

use(nui)

export default nui