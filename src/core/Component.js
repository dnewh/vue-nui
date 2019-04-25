import Theme from 'core/Theme'
import deepmerge from 'deepmerge'

export default function (newComponent) {
  const defaults = {
    props: {
      Theme: null
    },
    computed: {
      $activeTheme () {
        const { enabled, getThemeName, getAncestorTheme } = Theme

        if (enabled && this.Theme !== false) {
          return getThemeName(this.Theme || getAncestorTheme(this))
        }

        return null
      }
    }
  }

  return deepmerge(defaults, newComponent)
}