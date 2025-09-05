<template>
  <input
    :id="fieldId"
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :min="type === 'number' ? '0' : undefined"
    class="form__input"
    :class="inputClasses"
    @input="handleInput"
    @blur="handleBlur"
    @keydown="handleKeydown"
  >
</template>

<script>
import { useInputValidation } from '~/composables/useInputValidation'

export default {
  name: 'BaseInput',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    hasError: {
      type: Boolean,
      default: false
    },
    fieldId: {
      type: String,
      required: true
    }
  },
  emits: ['update:modelValue', 'blur', 'validate'],
  setup(props, { emit }) {
    const { validateNumericKeydown, processNumericValue } = useInputValidation()

    function handleInput(event) {
      let value = event.target.value
      
      if (props.type === 'number') {
        const result = processNumericValue(value, props.modelValue)
        
        if (!result.shouldUpdate) {
          if (result.revertValue !== undefined) {
            event.target.value = result.revertValue
          }
          return
        }
        
        value = result.processedValue
      }
      
      emit('update:modelValue', value)
    }

    function handleKeydown(event) {
      if (props.type === 'number') {
        validateNumericKeydown(event)
      }
    }

    function handleBlur() {
      emit('blur')
      emit('validate')
    }

    return {
      handleInput,
      handleKeydown,
      handleBlur
    }
  },
  computed: {
    inputClasses() {
      return {
        'form__input--invalid': this.hasError,
        'form__input--valid': !this.hasError && this.modelValue
      }
    }
  }
}
</script>
