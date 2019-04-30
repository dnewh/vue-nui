<template>
    <component
        :is="tag"
        class="button"
        :type="nativeType"
        :class="[size, type, {
            'rounded': rounded,
            'loading': loading,
            'outlined': outlined,
            'inverted': inverted,
            'focused': focused,
            'active': active,
            'hovered': hovered,
            'selected': selected
        }]"
        @click="$emit('click', $event)"
    >
        <span v-if="label">{{ label }}</span>
        <span v-else-if="$slots.default">
            <slot />
        </span>
    </component>
</template>

<script>
    export default {
        name: 'Button',
        props: {
            type: [String, Object],
            size: String,
            label: String,
            rounded: Boolean,
            loading: Boolean,
            outlined: Boolean,
            inverted: Boolean,
            focused: Boolean,
            active: Boolean,
            hovered: Boolean,
            selected: Boolean,
            nativeType: {
                type: String,
                default: 'button',
                validator: (value) => {
                    return [
                        'button',
                        'submit',
                        'reset'
                    ].indexOf(value) >= 0
                }
            },
            tag: {
                type: String,
                default: 'button',
                validator: (value) => {
                    return [
                        'button',
                        'a',
                        'input'
                    ].indexOf(value) >= 0
                }
            }
        }
    }
</script>
