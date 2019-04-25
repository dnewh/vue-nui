import './base/index.scss'
import Reactive from 'core/utils/Reactive'
import Theme from 'core/Theme'

const init = () => {
let nui = new Reactive({
    ripple: true,
    theming: {},
    locale: {
        startYear: 1900,
        endYear: 2099,
        dateFormat: 'YYYY-MM-DD',
        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        shorterDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        shorterMonths: ['J', 'F', 'M', 'A', 'M', 'Ju', 'Ju', 'A', 'Se', 'O', 'N', 'D'],
        firstDayOfAWeek: 0
    },
    router: {
        linkActiveClass: 'router-link-active'
    }
})

Object.defineProperties(nui.theming, {
        metaColors: {
            get: () => Theme.metaColors,
            set (metaColors) {
                Theme.metaColors = metaColors
            }
        },
        theme: {
            get: () => Theme.theme,
            set (theme) {
                Theme.theme = theme
            }
        },
        enabled: {
            get: () => Theme.enabled,
            set (enabled) {
                Theme.enabled = enabled
            }
        }
    })

  return nui
}

export default Vue => {
    if (!Vue.nui) {
        Vue.nui = init()
        Vue.prototype.$nui = Vue.nui
    }
}