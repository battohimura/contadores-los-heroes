<template>
  <div class="form__field u-mb--md">
    <label :for="fieldId" class="form__label">{{ label }}</label>
    <BaseInput
      :field-id="fieldId"
      :type="type"
      :model-value="modelValue"
      :placeholder="placeholder"
      :has-error="hasError"
      @update:model-value="$emit('update:modelValue', $event)"
      @validate="$emit('validate')"
    />
    <ErrorMessage v-if="hasError" :message="error" />
  </div>
</template>

<script>
import BaseInput from './BaseInput.vue'
import ErrorMessage from './ErrorMessage.vue'

export default {
  name: 'FormField',
  components: {
    BaseInput,
    ErrorMessage
  },
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: String,
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
    error: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue', 'validate'],
  computed: {
    fieldId() {
      return `field-${Math.random().toString(36).substr(2, 9)}`
    },
    hasError() {
      return Boolean(this.error && this.error.length > 0)
    }
  }
}
</script>

<style scoped>
.form-field {
  margin-bottom: 1rem;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.form-label {
  display: block;
  margin-bottom: 0.25rem;
  font-weight: 500;
  color: var(--label-color);
  font-size: 0.875rem;
}

.required-indicator {
  color: #dc2626;
  margin-left: 0.125rem;
}

.input-wrapper {
  position: relative;
}

.form-input {
  width: 100%;
  max-width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  line-height: 1.25;
  transition: all 0.2s ease;
  background-color: #ffffff;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-input--error {
  border-color: #dc2626;
}

.form-input--error:focus {
  border-color: #dc2626;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.form-input--disabled {
  background-color: #f9fafb;
  color: #6b7280;
  cursor: not-allowed;
}

.form-input::placeholder {
  color: #9ca3af;
}
</style>
