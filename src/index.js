import './scss/nui-build.scss'

import * as components from './components'

import config, { setOptions } from './utils/config'
import { use, registerComponentProgrammatic } from './utils/plugins'

const Nui = {
    install(Vue, options = {}) {
        // Options
        setOptions(Object.assign(config, options))
        // Components
        for (let componentKey in components) {
            Vue.use(components[componentKey])
        }
        // Config component
        const NuiProgrammatic = {
            setOptions(options) {
                setOptions(Object.assign(config, options))
            }
        }
        registerComponentProgrammatic(Vue, '$nui', NuiProgrammatic)
    }
}

use(Nui)

export default Nui