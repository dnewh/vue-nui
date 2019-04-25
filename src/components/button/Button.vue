<script>
import Component from 'core/Component'
import Focused from 'core/mixins/Focused/Focused'
import Ripple from 'core/mixins/Ripple/Ripple'
import RouterLink from 'core/mixins/RouterLink/RouterLink'
import RouterLinkProps from 'core/utils/RouterLinkProps'
import ButtonContent from './ButtonContent'
export default new Component({
name: 'Button',
data () {
    return {
    rippleActive: false
    }
},
components: {
    ButtonContent
},
mixins: [
    Ripple,
    Focused,
    RouterLink
],
props: {
    href: String,
    type: {
        type: String,
        default: 'button'
    },
    disabled: Boolean
},
computed: {
    rippleWorks () {
        return this.ripple && !this.disabled
    },
    isRouterLink () {
        return this.$router && this.to;
    }
},
render (createElement) {
    const buttonContent = createElement('button-content', {
        attrs: {
            ripple: this.ripple,
            disabled: this.disabled
        },
        props: {
            rippleActive: this.rippleActive
        },
        on: {
            'update:rippleActive': active => this.rippleActive = active,
        }
    }, this.$slots.default)
    let buttonAttrs = {
        staticClass: 'button',
        class: [
            this.$activeTheme,
            {
            'ripple-off': !this.ripple,
            'focused': this.hasFocus
            }
        ],
        attrs: {
            ...this.attrs,
            href: this.href,
            disabled: this.disabled,
            type: !this.href && (this.type || 'button')
        },
        on: {
            ...this.$listeners,
            touchstart: event => {
                if (this.rippleWorks) {
                    this.rippleActive = event
                }
                this.$listeners.touchstart && this.$listeners.touchstart(event)
            },
            touchmove: event => {
                if (this.rippleWorks) {
                    this.rippleActive = event
                }
                this.$listeners.touchmove && this.$listeners.touchmove(event)
            },
            mousedown: event => {
                if (this.rippleWorks) {
                    this.rippleActive = event
                }
                this.$listeners.mousedown && this.$listeners.mousedown(event)
            }
        }
    }
    let tag = 'button'

    if (this.href) {
        tag = 'a'
    } else if (this.isRouterLink) {
        this.$options.props = RouterLinkProps(this, this.$options.props)
        tag = 'router-link'
        const exactActiveClass = this.$props.exactActiveClass
        const activeClass = `${this.$props.activeClass || this.$material.router.linkActiveClass} active`
        buttonAttrs.props = {
            ...this.$props,
            exactActiveClass,
            activeClass
        }
        delete buttonAttrs.props.type
        delete buttonAttrs.attrs.type
        delete buttonAttrs.props.href
        delete buttonAttrs.attrs.href
    }
    return createElement(tag, buttonAttrs, [buttonContent])
}
})
</script>

<style lang="scss">
    @import "~components/Animation/variables";
    @import "~components/Elevation/mixins";
    @import "~components/Elevation/variables";
    $button-min-width: 88px;
    $button-height: 36px;
    $button-radius: 2px;
    $button-font-size: 14px;
    $button-dense-height: 32px;
    $button-icon-size: 40px;
    $button-fab-size: 56px;
    $button-fab-size-mini: $button-icon-size;
    .button-clean {
        margin: 0;
        padding: 0;
        display: inline-block;
        position: relative;
        overflow: hidden;
        outline: none;
        background: transparent;
        border: 0;
        border-radius: 0;
        transition: $transition-default;
        font-family: inherit;
        line-height: normal;
        text-decoration: none;
        vertical-align: top;
        white-space: nowrap;
    }
    .button {
        @extend .button-clean;
        min-width: $button-min-width;
        height: $button-height;
        margin: 6px 8px;
        user-select: none;
        border-radius: $button-radius;
        font-size: $button-font-size;
        font-weight: 500;
        text-transform: uppercase;

        &:active {
            outline: none;
        }

        &[disabled] {
            pointer-events: none;
        }

        &:not([disabled]) {
            cursor: pointer;
            &:hover,
            &:active,
            &.focused {
                &:before {
                background-color: currentColor;
                opacity: .12;
                }
            }
            &.focused {
                &.primary,
                &.accent {
                    &:before {
                        opacity: .2;
                    }
                }
            }
            &:active {
                &:before {
                    opacity: .2;
                }
            }
            &.ripple-off:active:before {
                opacity: .26;
            }
        }

        &.plain.button.raised:not([disabled]) {
            color: rgba(#000, .87);
            background-color: #fff;
            .icon-font {
                color: rgba(#000, .87);
            }
            .icon-image {
                fill: rgba(#000, .87);
            }
        }

        &::-moz-focus-inner {
            padding: 0;
            border: 0;
        }
        
        &:before {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 1;
            opacity: 0;
            transition: $transition-default;
            will-change: background-color, opacity;
            content: " ";
        }

        &.dense {
            height: $button-dense-height;
            font-size: 13px;
        }

        &.raised:not([disabled]) {
            @include elevation(2);

            &:active {
                @include elevation(8);
            }

            &.ripple-off:active:before {
                opacity: .2;
            }
        }
        
        + .button {
            margin-left: 0;
        }
        .ripple {
            padding: 0 8px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .button-spaced .ripple {
        padding: 0 16px;
    }

    .icon-button,
    .fab {
        border-radius: 50%;
        z-index: 10;

        &:before {
            border-radius: 50%;
        }
        .ripple {
            border-radius: 50%;
        }
    }
    .icon-button,
    .fab.mini,
    .fab.dense {
        .ripple-wave {
            top: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            left: 0 !important;
        }
    }
    .icon-button {
        width: $button-icon-size;
        min-width: $button-icon-size;
        height: $button-icon-size;
        margin: 0 6px;

        &.dense {
            width: $button-dense-height;
            min-width: $button-dense-height;
            height: $button-dense-height;
        }
        .ripple-enter-active {
            transition-duration: 1.2s;
        }
    }
    .fab {
        @include elevation(6);
        width: $button-fab-size;
        height: $button-fab-size;
        min-width: 0;
        overflow: hidden;

        &:active {
            @include elevation(12);
        }

        &.mini,
        &.dense {
            width: $button-fab-size-mini;
            height: $button-fab-size-mini;
        }

        &.fab-top-right,
        &.fab-top-left {
            position: absolute;
            top: 24px;
        }

        &.fab-bottom-right,
        &.fab-bottom-left {
            position: absolute;
            bottom: 24px;
        }

        &.fab-top-center,
        &.fab-bottom-center {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
        }

        &.fab-top-center {
            top: 24px;
        }

        &.fab-bottom-center {
            bottom: 24px;
        }

        &.fab-top-right,
        &.fab-bottom-right {
            right: 24px;
        }

        &.fab-top-left,
        &.fab-bottom-left {
            left: 24px;
        }

        &.fixed {
            position: fixed;
        }

        .ripple {
            padding: 0;
        }
    }
</style>
