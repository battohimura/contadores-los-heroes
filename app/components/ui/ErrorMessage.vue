<template>
  <transition name="error-fade">
    <div v-if="message" class="form__feedback" :class="`form__feedback--${variant}`">
      <Icon v-if="showIcon" :name="iconName" class="form__feedback-icon" />
      <span class="form__feedback-text">{{ message }}</span>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ErrorMessage',
  props: {
    message: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      default: 'error',
      validator: (value) => ['error', 'warning', 'info'].includes(value)
    },
    showIcon: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    iconName() {
      const icons = {
        error: 'material-symbols:error',
        warning: 'material-symbols:warning',
        info: 'material-symbols:info'
      }
      return icons[this.variant]
    }
  }
}
</script>

<style scoped>
.form__feedback {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  margin-top: 0.25rem;
  font-size: 0.75rem;
  line-height: 1.25;
}

.form__feedback--error {
  color: #dc2626;
}

.form__feedback--warning {
  color: #d97706;
}

.form__feedback--info {
  color: #2563eb;
}

.form__feedback-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

.form__feedback-text {
  flex: 1;
}

/* Transiciones */
.error-fade-enter-active,
.error-fade-leave-active {
  transition: all 0.2s ease;
}

.error-fade-enter-from,
.error-fade-leave-to {
  opacity: 0;
  transform: translateY(-0.25rem);
}
</style>
